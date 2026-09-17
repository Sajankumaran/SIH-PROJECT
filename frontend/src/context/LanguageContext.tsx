import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const TRANSLATIONS: Translations = {
  // Brand & Header
  brandTitle: { en: 'KaushalAI', hi: 'कौशलAI' },
  brandTagline: { en: 'Official Statistical System Competency Platform', hi: 'आधिकारिक सांख्यिकी प्रणाली सक्षमता मंच' },
  navLearner: { en: 'Learner Dashboard', hi: 'अधिगमकर्ता डैशबोर्ड' },
  navTrainer: { en: 'Trainer Studio', hi: 'प्रशिक्षक स्टूडियो' },
  navAdmin: { en: 'MoSPI Intelligence', hi: 'एमओएसपीआई एनालिटिक्स' },
  navQuizGen: { en: 'AI Quiz Generator', hi: 'एआई प्रश्नोत्तरी' },
  switchRole: { en: 'Switch Role (Mock SSO)', hi: 'भूमिका बदलें (मॉक एसएसओ)' },
  
  // DNA & Competency
  competencyDnaTitle: { en: 'Competency DNA Profile', hi: 'सक्षमता डीएनए प्रोफ़ाइल' },
  competencyDnaSubtitle: { en: 'Multi-domain capability mapped against Cadre Benchmark', hi: 'कैडर बेंचमार्क के सापेक्ष बहु-डोमेन क्षमता मानचित्रण' },
  domainStatistical: { en: 'Statistical & Methodological', hi: 'सांख्यिकीय एवं पद्धति संबंधी' },
  domainTechnical: { en: 'Technical & Data Engineering', hi: 'तकनीकी एवं डेटा इंजीनियरिंग' },
  domainGovernance: { en: 'Digital Governance & DPDPA', hi: 'डिजिटल गवर्नेंस एवं डीपीडीपीए' },
  domainBehavioural: { en: 'Behavioural & Leadership', hi: 'व्यावहारिक एवं नेतृत्व' },
  cadreBenchmark: { en: 'Cadre Benchmark', hi: 'कैडर बेंचमार्क' },
  currentScore: { en: 'Current Mastery', hi: 'वर्तमान दक्षता' },
  skillGap: { en: 'Capability Gap', hi: 'क्षमता अंतर' },
  
  // Recommendations
  recommendedTitle: { en: 'iGOT Karmayogi Personalized Recommendations', hi: 'आईगॉट कर्मयोगी व्यक्तिगत पाठ्यक्रम अनुशंसाएं' },
  whyRecommended: { en: 'Why this was recommended (AI Explainability)', hi: 'यह अनुशंसा क्यों की गई (एआई स्पष्टीकरण)' },
  simulateCompletion: { en: 'Simulate Course Completion (+DNA Boost)', hi: 'कोर्स पूरा करें (+डीएनए वृद्धि)' },
  completedBadge: { en: 'Completed', hi: 'पूर्ण' },
  enrollIgot: { en: 'Enroll on iGOT', hi: 'आईगॉट पर नामांकन करें' },
  
  // Quiz Generator
  instantQuizTitle: { en: 'Instant AI Document-to-Quiz Generator', hi: 'त्वरित एआई दस्तावेज़-से-प्रश्नोत्तरी जनरेटर' },
  uploadManualPrompt: { en: 'Upload MoSPI / NSSO Manual (PDF/PPT/DOCX) or Select Preloaded Guideline', hi: 'एमओएसपीआई / एनएसएसओ नियमावली अपलोड करें या पूर्व-लोड किए गए दस्तावेज़ चुनें' },
  generateQuizBtn: { en: 'Generate AI Assessment', hi: 'एआई मूल्यांकन उत्पन्न करें' },
  scanningDoc: { en: 'AI Document Scanning in Progress...', hi: 'एआई दस्तावेज़ स्कैनिंग जारी है...' },
  launchQuiz: { en: 'Start Interactive Quiz', hi: 'प्रश्नोत्तरी प्रारंभ करें' },
  
  // Admin & Weather
  workforceWeatherTitle: { en: 'Predictive Skill Shortage Radar (Workforce Weather)', hi: 'भविष्य कहनेवाला कौशल कमी रडार (कार्यबल मौसम)' },
  forecastHorizon: { en: '6 - 12 Month Forward Deficit Projections', hi: '6 - 12 महीने का संभावित घाटा प्रक्षेपण' },
  
  // Copilot
  copilotGreeting: { en: 'How can I assist your statistical learning today?', hi: 'आज मैं आपकी सांख्यिकीय शिक्षा में कैसे सहायता कर सकता हूँ?' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][language] || TRANSLATIONS[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
