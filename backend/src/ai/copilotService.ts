import { Official } from '../data/mockOfficials.js';
import { MOCK_COURSES, Course } from '../data/mockCourses.js';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  textHi?: string;
  suggestedActions?: {
    label: string;
    labelHi: string;
    actionType: 'open_course' | 'open_quiz' | 'simulate_skill' | 'query';
    payload: string;
  }[];
  recommendedCourses?: Course[];
}

export function handleCopilotQuery(query: string, official: Official, lang: 'en' | 'hi' = 'en'): CopilotMessage {
  const q = query.toLowerCase();

  if (q.includes('learn next') || q.includes('recommend') || q.includes('अगला क्या') || q.includes('सुझाव')) {
    const recommended = MOCK_COURSES.slice(0, 2);
    return {
      id: 'copilot-' + Date.now(),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Namaste ${official.name}! Based on your current Competency DNA profile as **${official.designation}**, I identified your primary skill deficit in **Multi-stage Stratified Sampling (62% vs 88% benchmark)**. I strongly recommend starting with **"${recommended[0].title}"** on iGOT Karmayogi to prepare for the NSSO 80th Round kickoff.`,
      textHi: `नमस्ते ${official.nameHi}! आपके **${official.designationHi}** प्रोफ़ाइल के अनुसार, आपका मुख्य कौशल अंतर **बहु-स्तरीय स्तरीकृत प्रतिचयन (62% बनाम 88% बेंचमार्क)** में पाया गया है। मैं अनुशंसा करता हूँ कि आप आईगॉट कर्मयोगी पर **"${recommended[0].titleHi}"** पाठ्यक्रम से शुरुआत करें।`,
      recommendedCourses: recommended,
      suggestedActions: [
        {
          label: 'Enroll in ' + recommended[0].igotCourseId,
          labelHi: recommended[0].igotCourseId + ' में नामांकन करें',
          actionType: 'open_course',
          payload: recommended[0].id
        },
        {
          label: 'Generate Practice Quiz for NSSO 79th Round',
          labelHi: 'एनएसएसओ 79वें दौर हेतु अभ्यास प्रश्नोत्तरी बनाएं',
          actionType: 'open_quiz',
          payload: 'doc-nsso-79'
        }
      ]
    };
  }

  if (q.includes('gap') || q.includes('competency') || q.includes('dna') || q.includes('कमी') || q.includes('डीएनए')) {
    return {
      id: 'copilot-' + Date.now(),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Here is your Competency DNA breakdown across MoSPI domains:
- 📊 **Statistical & Methodological**: 68% (Cadre Benchmark: 88% — Gap: 20%)
- 💻 **Technical & Data Engineering**: 62% (Cadre Benchmark: 80% — Gap: 18%)
- ⚖️ **Digital Governance & DPDPA**: 78% (Cadre Benchmark: 85% — Gap: 7%)
- 🤝 **Behavioural & Leadership**: 82% (Cadre Benchmark: 86% — Gap: 4%)

Your highest priority growth area is **Small Area Estimation (55%)** and **GIS Spatial Mapping (48%)**.`,
      textHi: `यहाँ आपका एमओएसपीआई डोमेन में सक्षमता डीएनए विवरण है:
- 📊 **सांख्यिकीय एवं पद्धति संबंधी**: 68% (बेंचमार्क: 88% — अंतर: 20%)
- 💻 **तकनीकी एवं डेटा इंजीनियरिंग**: 62% (बेंचमार्क: 80% — अंतर: 18%)
- ⚖️ **डिजिटल गवर्नेंस एवं डीपीडीपीए**: 78% (बेंचमार्क: 85% — अंतर: 7%)
- 🤝 **व्यावहारिक एवं नेतृत्व**: 82% (बेंचमार्क: 86% — अंतर: 4%)

आपकी सर्वोच्च प्राथमिकता **लघु क्षेत्र अनुमान (55%)** और **जीआईएस मैपिंग (48%)** में सुधार करना है।`,
      suggestedActions: [
        {
          label: 'View Small Area Estimation Course',
          labelHi: 'लघु क्षेत्र अनुमान पाठ्यक्रम देखें',
          actionType: 'open_course',
          payload: 'crs-02'
        },
        {
          label: 'View Python for Official Statistics Course',
          labelHi: 'पायथन पाठ्यक्रम देखें',
          actionType: 'open_course',
          payload: 'crs-03'
        }
      ]
    };
  }

  if (q.includes('dpdp') || q.includes('privacy') || q.includes('गोपनीयता') || q.includes('कानून')) {
    const dpdpCourse = MOCK_COURSES.find(c => c.id === 'crs-05') || MOCK_COURSES[0];
    return {
      id: 'copilot-' + Date.now(),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Under the **DPDP Act 2023**, MoSPI operates as a *Data Fiduciary*. All field staff are mandated to collect explicit consent via CAPI tablets, execute **k-anonymity (k=5)** before releasing microdata, and maintain AES-256 encrypted local caches. Would you like to review the official MoSPI DPDPA guidelines or take the compliance assessment?`,
      textHi: `**डीपीडीपी अधिनियम 2023** के तहत, एमओएसपीआई एक *डेटा फिड्यूशरी* के रूप में कार्य करता है। सभी फील्ड कर्मचारियों को सीएपीआई टैबलेट के माध्यम से सहमति प्राप्त करना, माइक्रोडाटा जारी करने से पहले **k-अनामीकरण (k=5)** लागू करना अनिवार्य है।`,
      recommendedCourses: [dpdpCourse],
      suggestedActions: [
        {
          label: 'Generate DPDPA 2023 Quiz',
          labelHi: 'डीपीडीपीए 2023 प्रश्नोत्तरी बनाएं',
          actionType: 'open_quiz',
          payload: 'doc-dpdpa-2023'
        },
        {
          label: 'Open DPDPA Karmayogi Course',
          labelHi: 'डीपीडीपीए कर्मयोगी कोर्स खोलें',
          actionType: 'open_course',
          payload: 'crs-05'
        }
      ]
    };
  }

  // Default intelligent assistant response
  const topCourse = MOCK_COURSES[0];
  return {
    id: 'copilot-' + Date.now(),
    sender: 'assistant',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: `I'm your **Karmayogi AI Sahayak**, specialized in the Indian Official Statistical System. I can help you analyze your competency gaps against ISS / SSS cadre benchmarks, auto-generate quizzes from MoSPI survey manuals, or recommend accredited courses from NSSTA, ISI, and IIPS.`,
    textHi: `मैं आपका **कर्मयोगी एआई सहायक** हूँ, जो भारतीय आधिकारिक सांख्यिकीय प्रणाली में विशेषज्ञता रखता है। मैं आपकी सक्षमता की कमियों का विश्लेषण करने, सर्वेक्षण नियमावली से प्रश्नोत्तरी बनाने तथा एनएसएसटीए और आईएसआई के पाठ्यक्रमों की सिफारिश करने में आपकी सहायता कर सकता हूँ।`,
    recommendedCourses: [topCourse],
    suggestedActions: [
      {
        label: 'What should I learn next?',
        labelHi: 'मुझे आगे क्या सीखना चाहिए?',
        actionType: 'query',
        payload: 'What should I learn next?'
      },
      {
        label: 'Explain my Competency DNA gaps',
        labelHi: 'मेरे सक्षमता डीएनए की कमियां बताएं',
        actionType: 'query',
        payload: 'Explain my Competency DNA gaps'
      }
    ]
  };
}
