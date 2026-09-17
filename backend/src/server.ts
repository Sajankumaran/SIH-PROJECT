import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { MOCK_OFFICIALS, Official } from './data/mockOfficials.js';
import { MOCK_COURSES } from './data/mockCourses.js';
import { DEPARTMENT_METRICS, CADRE_BENCHMARKS } from './data/mockCompetencies.js';
import { SAMPLE_DOCUMENTS } from './data/mockDocuments.js';
import { generateQuizFromText, GeneratedQuiz } from './ai/quizGenerator.js';
import { getExplainableRecommendationsForOfficial } from './ai/explainability.js';
import { handleCopilotQuery } from './ai/copilotService.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// In-memory mutable store for the session
let officials = [...MOCK_OFFICIALS];
let courses = [...MOCK_COURSES];
let trainerAssignments: any[] = [
  {
    id: 'asg-01',
    title: 'Mandatory DPDPA 2023 Compliance Certification',
    assignedToCadre: 'NSSO Field Operations Division (All JSOs)',
    assignedBy: 'Prof. R. Venkatraman (NSSTA)',
    dueDate: '2026-09-30',
    totalEnrolled: 850,
    completionRate: 68,
    status: 'In Progress'
  },
  {
    id: 'asg-02',
    title: 'NSSO 80th Round Multi-Stage Sampling Workshop',
    assignedToCadre: 'Survey Design & Research Division (SDRD)',
    assignedBy: 'Prof. R. Venkatraman (NSSTA)',
    dueDate: '2026-10-15',
    totalEnrolled: 320,
    completionRate: 44,
    status: 'In Progress'
  }
];

// File upload configuration for PDF/DOCX/PPTX
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ==========================================================================
   OFFICIALS & COMPETENCY DNA ROUTES
   ========================================================================== */

app.get('/api/officials', (req: Request, res: Response) => {
  res.json({ success: true, count: officials.length, data: officials });
});

app.get('/api/officials/:id', (req: Request, res: Response) => {
  const official = officials.find(o => o.id === req.params.id);
  if (!official) {
    return res.status(404).json({ success: false, message: 'Official not found' });
  }
  res.json({ success: true, data: official });
});

// Update or boost official competency (Simulate Course Completion or Quiz Result)
app.post('/api/officials/:id/simulate-completion', (req: Request, res: Response) => {
  const { courseId, scoreBoost, skillId } = req.body;
  const officialIndex = officials.findIndex(o => o.id === req.params.id);
  if (officialIndex === -1) {
    return res.status(404).json({ success: false, message: 'Official not found' });
  }

  const official = { ...officials[officialIndex] };
  const course = courses.find(c => c.id === courseId);

  const boost = scoreBoost || (course ? course.competencyDelta.gainPoints : 10);
  const targetDomain = course ? course.competencyDelta.domainId : 'statistical';

  // Apply boost to domain and sub-skills
  official.competencies = official.competencies.map(comp => {
    if (comp.domainId === targetDomain) {
      const newOverall = Math.min(100, comp.overallScore + boost);
      const updatedSkills = comp.skills.map(s => {
        if (!skillId || s.id === skillId || (course && course.targetCompetencies.includes(s.name))) {
          return { ...s, score: Math.min(100, s.score + boost) };
        }
        return s;
      });
      return { ...comp, overallScore: newOverall, skills: updatedSkills };
    }
    return comp;
  });

  official.learningHoursCompleted += course ? course.durationHours : 4;
  official.coursesCompletedCount += 1;
  official.learningStreakDays += 1;

  officials[officialIndex] = official;

  res.json({
    success: true,
    message: `Successfully completed! +${boost}% Competency boost applied to ${targetDomain.toUpperCase()} domain.`,
    updatedOfficial: official
  });
});

/* ==========================================================================
   COURSES & AI EXPLAINABILITY RECOMMENDATIONS
   ========================================================================== */

app.get('/api/courses', (req: Request, res: Response) => {
  const { domain, level } = req.query;
  let filtered = [...courses];
  if (domain) {
    filtered = filtered.filter(c => c.domainId === domain);
  }
  if (level) {
    filtered = filtered.filter(c => c.level === level);
  }
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/courses/recommendations/:officialId', (req: Request, res: Response) => {
  const official = officials.find(o => o.id === req.params.officialId) || officials[0];
  const recommendations = getExplainableRecommendationsForOfficial(official);
  res.json({
    success: true,
    officialId: official.id,
    officialName: official.name,
    recommendationsCount: recommendations.length,
    data: recommendations
  });
});

/* ==========================================================================
   DOCUMENT PARSER & INSTANT QUIZ GENERATION
   ========================================================================== */

app.get('/api/documents/samples', (req: Request, res: Response) => {
  res.json({ success: true, data: SAMPLE_DOCUMENTS });
});

app.post('/api/quiz/generate', upload.single('documentFile'), (req: Request, res: Response) => {
  try {
    let rawText = '';
    let documentTitle = req.body.title || 'Official MoSPI Survey Guidelines';

    if (req.file) {
      // Buffer from uploaded file
      const buffer = req.file.buffer;
      rawText = buffer.toString('utf-8', 0, Math.min(buffer.length, 10000));
      documentTitle = req.file.originalname;
    } else if (req.body.sampleDocId) {
      const sample = SAMPLE_DOCUMENTS.find(d => d.id === req.body.sampleDocId);
      if (sample) {
        rawText = sample.rawText;
        documentTitle = sample.title;
      }
    } else if (req.body.rawText) {
      rawText = req.body.rawText;
    } else {
      rawText = SAMPLE_DOCUMENTS[0].rawText;
      documentTitle = SAMPLE_DOCUMENTS[0].title;
    }

    const generatedQuiz = generateQuizFromText(rawText, documentTitle);
    res.json({ success: true, data: generatedQuiz });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Quiz generation failed', error: error.message });
  }
});

app.post('/api/quiz/submit', (req: Request, res: Response) => {
  const { officialId, quizId, score, totalPoints, answers } = req.body;
  const officialIndex = officials.findIndex(o => o.id === officialId);
  
  if (officialIndex !== -1) {
    const official = { ...officials[officialIndex] };
    official.quizzesAttemptedCount += 1;
    // Boost statistical & technical domains slightly upon quiz completion
    const pointsGained = Math.round((score / Math.max(1, totalPoints)) * 6);
    official.competencies = official.competencies.map(c => {
      if (c.domainId === 'statistical') {
        return { ...c, overallScore: Math.min(100, c.overallScore + pointsGained) };
      }
      return c;
    });
    officials[officialIndex] = official;
  }

  res.json({
    success: true,
    message: `Quiz completed with score ${score}/${totalPoints}!`,
    earnedPoints: score,
    competencyBoost: '+6% to Statistical Domain'
  });
});

/* ==========================================================================
   ADMIN ANALYTICS & PREDICTIVE WORKFORCE WEATHER
   ========================================================================== */

app.get('/api/analytics/departments', (req: Request, res: Response) => {
  res.json({
    success: true,
    totalOfficialsAcrossIndia: 42350,
    competenciesMapped: 148,
    activeKarmayogiEnrollments: 28400,
    avgCompletionRate: 78.4,
    departments: DEPARTMENT_METRICS,
    cadreBenchmarks: CADRE_BENCHMARKS
  });
});

/* ==========================================================================
   TRAINER ASSIGNMENTS & BATCH METRICS
   ========================================================================== */

app.get('/api/trainer/assignments', (req: Request, res: Response) => {
  res.json({ success: true, data: trainerAssignments });
});

app.post('/api/trainer/assignments', (req: Request, res: Response) => {
  const newAssignment = {
    id: 'asg-' + Date.now(),
    title: req.body.title || 'New Cadre Assessment Track',
    assignedToCadre: req.body.assignedToCadre || 'All Statistical Officers',
    assignedBy: req.body.assignedBy || 'Lead Trainer (NSSTA)',
    dueDate: req.body.dueDate || '2026-11-30',
    totalEnrolled: req.body.totalEnrolled || 150,
    completionRate: 0,
    status: 'Active'
  };
  trainerAssignments.unshift(newAssignment);
  res.json({ success: true, message: 'Assignment created successfully', data: newAssignment });
});

/* ==========================================================================
   CONVERSATIONAL AI COPILOT ROUTE
   ========================================================================== */

app.post('/api/copilot/chat', (req: Request, res: Response) => {
  const { query, officialId, language } = req.body;
  const official = officials.find(o => o.id === officialId) || officials[0];
  const reply = handleCopilotQuery(query || '', official, language || 'en');
  res.json({ success: true, data: reply });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), service: 'KaushalAI Backend' });
});

app.listen(PORT, () => {
  console.log(`⚡ KaushalAI Backend Server running on http://localhost:${PORT}`);
});
