import { Official } from '../data/mockOfficials.js';
import { Course, MOCK_COURSES } from '../data/mockCourses.js';
import { CADRE_BENCHMARKS } from '../data/mockCompetencies.js';

export interface ExplainableRecommendation {
  course: Course;
  matchScore: number; // 0 to 100
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

export function getExplainableRecommendationsForOfficial(official: Official): ExplainableRecommendation[] {
  const recommendations: ExplainableRecommendation[] = [];

  // Match official competencies to courses
  for (const course of MOCK_COURSES) {
    const domainComp = official.competencies.find(c => c.domainId === course.domainId);
    const currentScore = domainComp ? domainComp.overallScore : 60;
    const targetBenchmark = domainComp ? domainComp.cadreBenchmark : 85;
    const gap = Math.max(0, targetBenchmark - currentScore);

    // Target specific skill gap
    let matchedSkill = domainComp?.skills.find(s => 
      course.targetCompetencies.some(tc => s.name.toLowerCase().includes(tc.toLowerCase()) || tc.toLowerCase().includes(s.name.toLowerCase()))
    );

    const skillScore = matchedSkill ? matchedSkill.score : currentScore;
    const skillTarget = matchedSkill ? matchedSkill.target : targetBenchmark;
    const specificSkillGap = Math.max(0, skillTarget - skillScore);

    let matchScore = 75;
    let urgency: 'Immediate Priority' | 'Recommended' | 'Career Growth' = 'Recommended';

    if (specificSkillGap > 20 || gap > 20) {
      matchScore = 96;
      urgency = 'Immediate Priority';
    } else if (specificSkillGap > 10 || gap > 10) {
      matchScore = 88;
      urgency = 'Recommended';
    } else {
      matchScore = 80;
      urgency = 'Career Growth';
    }

    const gapClosedPercent = Math.min(95, Math.round((course.competencyDelta.gainPoints / Math.max(1, specificSkillGap || gap)) * 100));

    const skillName = matchedSkill?.name || course.targetCompetencies[0] || 'Statistical Competency';
    const skillNameHi = matchedSkill?.nameHi || 'सांख्यिकीय दक्षता';

    recommendations.push({
      course,
      matchScore,
      urgency,
      reasoningChain: {
        gapIdentified: `Current score in "${skillName}" is ${skillScore}%, creating a ${specificSkillGap}% capability gap against your ${official.designation} benchmark (${skillTarget}%).`,
        gapIdentifiedHi: `"${skillNameHi}" में आपका वर्तमान स्कोर ${skillScore}% है, जो आपके ${official.designationHi} पद के बेंचमार्क (${skillTarget}%) से ${specificSkillGap}% कम है।`,
        cadreBenchmarkComparison: `${official.cadre} standard requires minimum ${skillTarget}% mastery for leadership and quality audit in this domain.`,
        cadreBenchmarkComparisonHi: `${official.cadre} के दिशा-निर्देशों के अनुसार इस क्षेत्र में न्यूनतम ${skillTarget}% दक्षता अनिवार्य है।`,
        missionContext: `High relevance for upcoming MoSPI initiatives, field audits, and data validation standards in ${official.department}.`,
        missionContextHi: `${official.departmentHi} में आगामी सर्वेक्षणों और डेटा सत्यापन मानकों हेतु यह अत्यंत महत्वपूर्ण है।`,
        projectedOutcome: `Completing this course delivers +${course.competencyDelta.gainPoints}% competency boost, closing ~${gapClosedPercent}% of the identified gap (${skillScore}% → ${Math.min(100, skillScore + course.competencyDelta.gainPoints)}%).`,
        projectedOutcomeHi: `इस पाठ्यक्रम को पूरा करने से +${course.competencyDelta.gainPoints}% दक्षता वृद्धि होगी, जिससे लगभग ${gapClosedPercent}% अंतर समाप्त हो जाएगा।`,
        gapClosedPercent
      }
    });
  }

  // Sort by highest match score and urgency
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}
