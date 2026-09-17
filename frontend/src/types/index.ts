export interface MicroCompetency {
  id: string;
  name: string;
  nameHi: string;
  score: number;
  target: number;
  description: string;
}

export interface DomainCompetency {
  domainId: 'statistical' | 'technical' | 'governance' | 'behavioural';
  domainName: string;
  domainNameHi: string;
  color: string;
  overallScore: number;
  cadreBenchmark: number;
  skills: MicroCompetency[];
}

export interface Official {
  id: string;
  name: string;
  nameHi: string;
  designation: string;
  designationHi: string;
  cadre: string;
  department: string;
  departmentHi: string;
  location: string;
  avatarUrl: string;
  role: 'student' | 'learner' | 'trainer' | 'admin';
  yearsOfService: number;
  karmayogiId: string;
  learningHoursCompleted: number;
  learningStreakDays: number;
  coursesCompletedCount: number;
  quizzesAttemptedCount: number;
  competencies: DomainCompetency[];
  studentMetadata?: {
    university: string;
    degree: string;
    semester: string;
    cgpa: string;
    xpPoints: number;
    level: number;
    levelTitle: string;
    targetCareer: string;
    badges: { id: string; name: string; icon: string; earnedDate: string }[];
  };
}

export interface Course {
  id: string;
  igotCourseId: string;
  title: string;
  titleHi: string;
  domainId: 'statistical' | 'technical' | 'governance' | 'behavioural';
  domainName: string;
  provider: string;
  durationHours: number;
  level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Mastery';
  rating: number;
  enrolledCount: number;
  thumbnail: string;
  description: string;
  descriptionHi: string;
  targetCompetencies: string[];
  competencyDelta: {
    domainId: 'statistical' | 'technical' | 'governance' | 'behavioural';
    gainPoints: number;
    targetSkillId?: string;
  };
  modulesCount: number;
  syllabus: string[];
  tags: string[];
}

export interface ExplainableRecommendation {
  course: Course;
  matchScore: number;
  urgency: 'Immediate Priority' | 'Recommended' | 'Career Growth';
  reasoningChain: {
    gapIdentified: string;
    gapIdentifiedHi: string;
    cadreBenchmarkComparison: string;
    cadreBenchmarkComparisonHi: string;
    missionContext: string;
    missionContextHi: string;
    projectedOutcome: string;
    projectedOutcomeHi: string;
    gapClosedPercent: number;
  };
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  question: string;
  questionHi: string;
  options: string[];
  optionsHi?: string[];
  correctOptionIndex: number;
  explanation: string;
  explanationHi?: string;
  bloomsLevel: 'Recall' | 'Comprehension' | 'Application' | 'Analysis';
  competencyDomain: 'statistical' | 'technical' | 'governance' | 'behavioural';
  competencySkillTag: string;
  points: number;
}

export interface GeneratedQuiz {
  quizId: string;
  documentTitle: string;
  generatedAt: string;
  totalQuestions: number;
  totalPoints: number;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  processingTimeSeconds: number;
  extractedKeywords: string[];
  questions: QuizQuestion[];
}

export interface SampleDocument {
  id: string;
  title: string;
  filename: string;
  fileSize: string;
  pageCount: number;
  category: string;
  summary: string;
  rawText: string;
}

export interface DepartmentMetric {
  id: string;
  name: string;
  shortName: string;
  totalOfficers: number;
  avgScores: {
    statistical: number;
    technical: number;
    governance: number;
    behavioural: number;
  };
  forecastDeficit: {
    riskLevel: 'Low' | 'Medium' | 'Critical';
    weather: 'Sunny' | 'Cloudy' | 'Stormy';
    shortageDomain: string;
    gapMonths: number;
    projectedShortagePercent: number;
    recommendedIntervention: string;
  };
}
