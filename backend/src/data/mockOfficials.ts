export interface MicroCompetency {
  id: string;
  name: string;
  nameHi: string;
  score: number; // 0 to 100
  target: number; // Cadre benchmark score
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
  cadre: string; // e.g. "Indian Statistical Service (ISS)", "Subordinate Statistical Service (SSS)"
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

export const MOCK_OFFICIALS: Official[] = [
  {
    id: 'student-01',
    name: 'Aarav Sharma',
    nameHi: 'आरव शर्मा',
    designation: 'MoSPI Student Fellow & Research Scholar',
    designationHi: 'मोस्पी छात्र अध्येता एवं शोधार्थी',
    cadre: 'National Statistics Student Cohort (ISI / DU 2026)',
    department: 'Statistical Science & Data Analytics Wing, MoSPI Student Portal',
    departmentHi: 'सांख्यिकी विज्ञान एवं डेटा एनालिटिक्स विंग, छात्र पोर्टल',
    location: 'New Delhi / Kolkata',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    yearsOfService: 0,
    karmayogiId: 'KARM-STUDENT-2026',
    learningHoursCompleted: 34.5,
    learningStreakDays: 12,
    coursesCompletedCount: 5,
    quizzesAttemptedCount: 16,
    studentMetadata: {
      university: 'Indian Statistical Institute (ISI) Kolkata',
      degree: 'B.Stat (Hons) & Data Science Major',
      semester: '6th Semester',
      cgpa: '9.2 / 10.0',
      xpPoints: 2450,
      level: 4,
      levelTitle: 'Statistical Apprentice (Tier 4)',
      targetCareer: 'Indian Statistical Service (ISS) Officer & Survey Scientist',
      badges: [
        { id: 'b1', name: 'Sampling Prodigy', icon: '🎯', earnedDate: '2026-08-15' },
        { id: 'b2', name: 'CAPI Field Certified', icon: '📱', earnedDate: '2026-08-28' },
        { id: 'b3', name: 'Python Microdata Master', icon: '🐍', earnedDate: '2026-09-01' },
        { id: 'b4', name: '10-Day Streak Streak Flame', icon: '🔥', earnedDate: '2026-09-03' }
      ]
    },
    competencies: [
      {
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        domainNameHi: 'सांख्यिकीय एवं पद्धति संबंधी',
        color: '#06B6D4',
        overallScore: 65,
        cadreBenchmark: 85,
        skills: [
          { id: 'stat-01', name: 'Multi-stage Stratified Sampling', nameHi: 'बहु-स्तरीय स्तरीकृत प्रतिचयन', score: 70, target: 85, description: 'Sample allocation, PPS selection, and finite population correction' },
          { id: 'stat-02', name: 'Small Area Estimation (SAE)', nameHi: 'लघु क्षेत्र अनुमान (एसएई)', score: 45, target: 80, description: 'Direct vs Synthetic estimators and Fay-Herriot modeling' },
          { id: 'stat-03', name: 'National Accounts (SNA 2008)', nameHi: 'राष्ट्रीय लेखा प्रणाली (एसएनए 2008)', score: 60, target: 85, description: 'Concepts of GDP, GVA, and input-output matrices' },
          { id: 'stat-04', name: 'Time Series & Seasonal Adjustment', nameHi: 'काल श्रेणी एवं मौसमी समायोजन', score: 68, target: 85, description: 'Stationarity, ARIMA, and seasonal decomposition' },
          { id: 'stat-05', name: 'Non-Sampling Error Quantification', nameHi: 'गैर-प्रतिचयन त्रुटि परिमाणीकरण', score: 72, target: 90, description: 'Measurement error, imputation, and survey bias control' }
        ]
      },
      {
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        domainNameHi: 'तकनीकी एवं डेटा इंजीनियरिंग',
        color: '#3B82F6',
        overallScore: 78,
        cadreBenchmark: 80,
        skills: [
          { id: 'tech-01', name: 'Python for Official Statistics', nameHi: 'आधिकारिक सांख्यिकी हेतु पायथन', score: 85, target: 85, description: 'Pandas, Polars, Matplotlib for large microdata cleaning' },
          { id: 'tech-02', name: 'R for Econometrics & Survey Analysis', nameHi: 'अर्थमिति एवं सर्वेक्षण हेतु आर', score: 75, target: 80, description: 'Survey package, weighted GLMs, and bootstrapping' },
          { id: 'tech-03', name: 'GIS & Spatial Statistical Mapping', nameHi: 'जीआईएस एवं स्थानिक सांख्यिकी मानचित्रण', score: 62, target: 75, description: 'GeoPandas and choropleth district maps' },
          { id: 'tech-04', name: 'Automated Data Validation Pipelines', nameHi: 'स्वचालित डेटा सत्यापन पाइपलाइन', score: 74, target: 85, description: 'CAPI validation rules and consistency checks' }
        ]
      },
      {
        domainId: 'governance',
        domainName: 'Digital Governance & Public Policy',
        domainNameHi: 'डिजिटल गवर्नेंस एवं सार्वजनिक नीति',
        color: '#10B981',
        overallScore: 62,
        cadreBenchmark: 85,
        skills: [
          { id: 'gov-01', name: 'DPDP Act 2023 Compliance in Surveys', nameHi: 'सर्वेक्षणों में डीपीडीपी अधिनियम 2023 अनुपालन', score: 68, target: 90, description: 'Data privacy, anonymization, and k-anonymity' },
          { id: 'gov-02', name: 'National Indicator Framework (NIF) for SDGs', nameHi: 'एसडीजी हेतु राष्ट्रीय संकेतक ढांचा', score: 58, target: 88, description: 'MoSPI SDG monitoring framework' },
          { id: 'gov-03', name: 'Open Government Data (OGD) Standards', nameHi: 'ओपन गवर्नमेंट डेटा मानक', score: 60, target: 82, description: 'data.gov.in data structuring and metadata' }
        ]
      },
      {
        domainId: 'behavioural',
        domainName: 'Behavioural & Leadership',
        domainNameHi: 'व्यावहारिक एवं नेतृत्व क्षमता',
        color: '#F59E0B',
        overallScore: 70,
        cadreBenchmark: 85,
        skills: [
          { id: 'beh-01', name: 'Field Enumeration Team Leadership', nameHi: 'फील्ड प्रगणक टीम नेतृत्व', score: 65, target: 88, description: 'Field survey coordination and empathy' },
          { id: 'beh-02', name: 'Statistical Dissemination & Storytelling', nameHi: 'सांख्यिकीय प्रसार एवं प्रस्तुतीकरण', score: 80, target: 85, description: 'Data storytelling and interactive dashboards' },
          { id: 'beh-03', name: 'Inter-Departmental Data Harmonization', nameHi: 'अंतर-विभागीय डेटा समन्वय', score: 65, target: 88, description: 'Cross-discipline collaboration' }
        ]
      }
    ]
  },
  {
    id: 'off-01',
    name: 'Priya Sharma',
    nameHi: 'प्रिया शर्मा',
    designation: 'Deputy Director',
    designationHi: 'उप निदेशक',
    cadre: 'Indian Statistical Service (ISS - 2014 Batch)',
    department: 'Survey Design & Research Division (SDRD), NSSO',
    departmentHi: 'सर्वेक्षण अभिकल्प एवं अनुसंधान प्रभाग (एसडीआरडी), एनएसएसओ',
    location: 'Kolkata, West Bengal',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'learner',
    yearsOfService: 11,
    karmayogiId: 'KARM-MOSPI-7892',
    learningHoursCompleted: 46.5,
    learningStreakDays: 8,
    coursesCompletedCount: 7,
    quizzesAttemptedCount: 12,
    competencies: [
      {
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        domainNameHi: 'सांख्यिकीय एवं पद्धति संबंधी',
        color: '#06B6D4', // Cyan
        overallScore: 68,
        cadreBenchmark: 88,
        skills: [
          { id: 'stat-01', name: 'Multi-stage Stratified Sampling', nameHi: 'बहु-स्तरीय स्तरीकृत प्रतिचयन', score: 62, target: 88, description: 'Design of complex sampling schemes for all-India socioeconomic surveys' },
          { id: 'stat-02', name: 'Small Area Estimation (SAE)', nameHi: 'लघु क्षेत्र अनुमान (एसएई)', score: 55, target: 82, description: 'Fay-Herriot and empirical Bayes models for district-level indicators' },
          { id: 'stat-03', name: 'National Accounts (SNA 2008)', nameHi: 'राष्ट्रीय लेखा प्रणाली (एसएनए 2008)', score: 74, target: 85, description: 'Gross Value Added (GVA) compilation and supply-use tables' },
          { id: 'stat-04', name: 'Time Series & Seasonal Adjustment', nameHi: 'काल श्रेणी एवं मौसमी समायोजन', score: 68, target: 85, description: 'X-13ARIMA-SEATS seasonal adjustment for CPI and IIP data' },
          { id: 'stat-05', name: 'Non-Sampling Error Quantification', nameHi: 'गैर-प्रतिचयन त्रुटि परिमाणीकरण', score: 81, target: 90, description: 'Measurement error, recall bias, and imputation techniques' }
        ]
      },
      {
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        domainNameHi: 'तकनीकी एवं डेटा इंजीनियरिंग',
        color: '#3B82F6', // Blue
        overallScore: 62,
        cadreBenchmark: 80,
        skills: [
          { id: 'tech-01', name: 'Python for Official Statistics', nameHi: 'आधिकारिक सांख्यिकी हेतु पायथन', score: 58, target: 82, description: 'Pandas, Polars, and SciPy for multi-gigabyte survey microdata processing' },
          { id: 'tech-02', name: 'R for Econometrics & Survey Analysis', nameHi: 'अर्थमिति एवं सर्वेक्षण हेतु आर', score: 72, target: 80, description: 'survey and srvyr packages in R for weighted microdata variance estimation' },
          { id: 'tech-03', name: 'GIS & Spatial Statistical Mapping', nameHi: 'जीआईएस एवं स्थानिक सांख्यिकी मानचित्रण', score: 48, target: 75, description: 'QGIS, GeoPandas, and Census enumeration block boundary linking' },
          { id: 'tech-04', name: 'Automated Data Validation Pipelines', nameHi: 'स्वचालित डेटा सत्यापन पाइपलाइन', score: 70, target: 85, description: 'Rule-based validation engines for Computer Assisted Personal Interviewing (CAPI)' }
        ]
      },
      {
        domainId: 'governance',
        domainName: 'Digital Governance & Public Policy',
        domainNameHi: 'डिजिटल गवर्नेंस एवं सार्वजनिक नीति',
        color: '#10B981', // Emerald
        overallScore: 78,
        cadreBenchmark: 85,
        skills: [
          { id: 'gov-01', name: 'DPDP Act 2023 Compliance in Surveys', nameHi: 'सर्वेक्षणों में डीपीडीपी अधिनियम 2023 अनुपालन', score: 75, target: 90, description: 'Data principal consent, anonymization, and statistical disclosure control' },
          { id: 'gov-02', name: 'National Indicator Framework (NIF) for SDGs', nameHi: 'एसडीजी हेतु राष्ट्रीय संकेतक ढांचा', score: 84, target: 88, description: 'Tracking India progress across 300+ SDG indicators via MoSPI portal' },
          { id: 'gov-03', name: 'Open Government Data (OGD) Standards', nameHi: 'ओपन गवर्नमेंट डेटा मानक', score: 76, target: 82, description: 'Metadata publishing, FAIR data principles, and data.gov.in integration' }
        ]
      },
      {
        domainId: 'behavioural',
        domainName: 'Behavioural & Leadership',
        domainNameHi: 'व्यावहारिक एवं नेतृत्व क्षमता',
        color: '#F59E0B', // Amber
        overallScore: 82,
        cadreBenchmark: 86,
        skills: [
          { id: 'beh-01', name: 'Field Enumeration Team Leadership', nameHi: 'फील्ड प्रगणक टीम नेतृत्व', score: 85, target: 88, description: 'Supervision and quality audit of NSSO Field Operations Division teams' },
          { id: 'beh-02', name: 'Statistical Dissemination & Storytelling', nameHi: 'सांख्यिकीय प्रसार एवं प्रस्तुतीकरण', score: 74, target: 85, description: 'Communicating complex macroeconomic indicators to policy makers and media' },
          { id: 'beh-03', name: 'Inter-Departmental Data Harmonization', nameHi: 'अंतर-विभागीय डेटा समन्वय', score: 87, target: 88, description: 'Coordinating administrative data feeds from RBI, CBIC, and State DES' }
        ]
      }
    ]
  },
  {
    id: 'off-02',
    name: 'Rajesh Meena',
    nameHi: 'राजेश मीणा',
    designation: 'Junior Statistical Officer (JSO)',
    designationHi: 'कनिष्ठ सांख्यिकी अधिकारी (जेएसओ)',
    cadre: 'Subordinate Statistical Service (SSS - 2021 Batch)',
    department: 'Field Operations Division (FOD), NSSO',
    departmentHi: 'क्षेत्रीय कार्य प्रभाग (एफओडी), एनएसएसओ',
    location: 'Jaipur, Rajasthan',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'learner',
    yearsOfService: 4,
    karmayogiId: 'KARM-MOSPI-4109',
    learningHoursCompleted: 28.0,
    learningStreakDays: 4,
    coursesCompletedCount: 4,
    quizzesAttemptedCount: 8,
    competencies: [
      {
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        domainNameHi: 'सांख्यिकीय एवं पद्धति संबंधी',
        color: '#06B6D4',
        overallScore: 54,
        cadreBenchmark: 75,
        skills: [
          { id: 'stat-01', name: 'Multi-stage Stratified Sampling', nameHi: 'बहु-स्तरीय स्तरीकृत प्रतिचयन', score: 58, target: 75, description: 'FOD field listing and household selection procedures' },
          { id: 'stat-02', name: 'Small Area Estimation (SAE)', nameHi: 'लघु क्षेत्र अनुमान (एसएई)', score: 38, target: 65, description: 'Basic understanding of district sample limitations' },
          { id: 'stat-05', name: 'Non-Sampling Error Quantification', nameHi: 'गैर-प्रतिचयन त्रुटि परिमाणीकरण', score: 66, target: 80, description: 'Minimizing non-response and response fatigue during household visits' }
        ]
      },
      {
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        domainNameHi: 'तकनीकी एवं डेटा इंजीनियरिंग',
        color: '#3B82F6',
        overallScore: 48,
        cadreBenchmark: 70,
        skills: [
          { id: 'tech-01', name: 'Python for Official Statistics', nameHi: 'आधिकारिक सांख्यिकी हेतु पायथन', score: 42, target: 68, description: 'Introductory scripting for data cleaning' },
          { id: 'tech-04', name: 'Automated Data Validation Pipelines', nameHi: 'स्वचालित डेटा सत्यापन पाइपलाइन', score: 54, target: 75, description: 'CAPI mobile tablet error handling and offline synchronization' }
        ]
      },
      {
        domainId: 'governance',
        domainName: 'Digital Governance & Public Policy',
        domainNameHi: 'डिजिटल गवर्नेंस एवं सार्वजनिक नीति',
        color: '#10B981',
        overallScore: 65,
        cadreBenchmark: 78,
        skills: [
          { id: 'gov-01', name: 'DPDP Act 2023 Compliance in Surveys', nameHi: 'सर्वेक्षणों में डीपीडीपी अधिनियम 2023 अनुपालन', score: 60, target: 80, description: 'Informed consent protocols during field visits' }
        ]
      },
      {
        domainId: 'behavioural',
        domainName: 'Behavioural & Leadership',
        domainNameHi: 'व्यावहारिक एवं नेतृत्व क्षमता',
        color: '#F59E0B',
        overallScore: 72,
        cadreBenchmark: 75,
        skills: [
          { id: 'beh-01', name: 'Field Enumeration Team Leadership', nameHi: 'फील्ड प्रगणक टीम नेतृत्व', score: 76, target: 80, description: 'Handling respondent hesitation and local administrative liaison' }
        ]
      }
    ]
  },
  {
    id: 'off-03',
    name: 'Sunita Sundaram',
    nameHi: 'सुनीता सुंदरम',
    designation: 'Senior Statistical Officer (SSO)',
    designationHi: 'वरिष्ठ सांख्यिकी अधिकारी (एसएसओ)',
    cadre: 'Subordinate Statistical Service (SSS - 2017 Batch)',
    department: 'National Accounts Division (NAD), CSO',
    departmentHi: 'राष्ट्रीय लेखा प्रभाग (एनएडी), सीएसओ',
    location: 'New Delhi, Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'learner',
    yearsOfService: 8,
    karmayogiId: 'KARM-MOSPI-5521',
    learningHoursCompleted: 52.0,
    learningStreakDays: 14,
    coursesCompletedCount: 9,
    quizzesAttemptedCount: 15,
    competencies: [
      {
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        domainNameHi: 'सांख्यिकीय एवं पद्धति संबंधी',
        color: '#06B6D4',
        overallScore: 79,
        cadreBenchmark: 85,
        skills: [
          { id: 'stat-03', name: 'National Accounts (SNA 2008)', nameHi: 'राष्ट्रीय लेखा प्रणाली (एसएनए 2008)', score: 86, target: 90, description: 'Institutional sector accounts and capital formation' },
          { id: 'stat-04', name: 'Time Series & Seasonal Adjustment', nameHi: 'काल श्रेणी एवं मौसमी समायोजन', score: 76, target: 85, description: 'Quarterly GDP backcasting and benchmarking' }
        ]
      },
      {
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        domainNameHi: 'तकनीकी एवं डेटा इंजीनियरिंग',
        color: '#3B82F6',
        overallScore: 68,
        cadreBenchmark: 78,
        skills: [
          { id: 'tech-01', name: 'Python for Official Statistics', nameHi: 'आधिकारिक सांख्यिकी हेतु पायथन', score: 65, target: 78, description: 'MCA-21 corporate financial filing data scraping and validation' }
        ]
      },
      {
        domainId: 'governance',
        domainName: 'Digital Governance & Public Policy',
        domainNameHi: 'डिजिटल गवर्नेंस एवं सार्वजनिक नीति',
        color: '#10B981',
        overallScore: 84,
        cadreBenchmark: 85,
        skills: [
          { id: 'gov-02', name: 'National Indicator Framework (NIF) for SDGs', nameHi: 'एसडीजी हेतु राष्ट्रीय संकेतक ढांचा', score: 88, target: 88, description: 'Aligning macroeconomic aggregates with SDG target 8.1' }
        ]
      },
      {
        domainId: 'behavioural',
        domainName: 'Behavioural & Leadership',
        domainNameHi: 'व्यावहारिक एवं नेतृत्व क्षमता',
        color: '#F59E0B',
        overallScore: 78,
        cadreBenchmark: 82,
        skills: [
          { id: 'beh-03', name: 'Inter-Departmental Data Harmonization', nameHi: 'अंतर-विभागीय डेटा समन्वय', score: 82, target: 85, description: 'Reconciling GSTN tax returns with ASI industrial output' }
        ]
      }
    ]
  },
  {
    id: 'off-trainer-01',
    name: 'Prof. R. Venkatraman',
    nameHi: 'प्रो. आर. वेंकटरमन',
    designation: 'Lead Training Faculty',
    designationHi: 'मुख्य प्रशिक्षण संकाय',
    cadre: 'National Statistical Systems Training Academy (NSSTA)',
    department: 'Capacity Building & Training Division, NSSTA',
    departmentHi: 'क्षमता निर्माण एवं प्रशिक्षण प्रभाग, एनएसएसटीए',
    location: 'Greater Noida, Uttar Pradesh',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'trainer',
    yearsOfService: 24,
    karmayogiId: 'KARM-NSSTA-1002',
    learningHoursCompleted: 140.0,
    learningStreakDays: 32,
    coursesCompletedCount: 22,
    quizzesAttemptedCount: 45,
    competencies: [
      {
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        domainNameHi: 'सांख्यिकीय एवं पद्धति संबंधी',
        color: '#06B6D4',
        overallScore: 95,
        cadreBenchmark: 90,
        skills: []
      },
      {
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        domainNameHi: 'तकनीकी एवं डेटा इंजीनियरिंग',
        color: '#3B82F6',
        overallScore: 90,
        cadreBenchmark: 85,
        skills: []
      },
      {
        domainId: 'governance',
        domainName: 'Digital Governance & Public Policy',
        domainNameHi: 'डिजिटल गवर्नेंस एवं सार्वजनिक नीति',
        color: '#10B981',
        overallScore: 92,
        cadreBenchmark: 88,
        skills: []
      },
      {
        domainId: 'behavioural',
        domainName: 'Behavioural & Leadership',
        domainNameHi: 'व्यावहारिक एवं नेतृत्व क्षमता',
        color: '#F59E0B',
        overallScore: 94,
        cadreBenchmark: 88,
        skills: []
      }
    ]
  },
  {
    id: 'off-admin-01',
    name: 'Amitabh Verma, IAS',
    nameHi: 'अमिताभ वर्मा, आईएएस',
    designation: 'Joint Secretary (Capacity Building)',
    designationHi: 'संयुक्त सचिव (क्षमता निर्माण)',
    cadre: 'Ministry of Statistics & Programme Implementation (MoSPI HQ)',
    department: 'Capacity Building Commission & Statistical Administration',
    departmentHi: 'क्षमता निर्माण आयोग एवं सांख्यिकी प्रशासन',
    location: 'Sardar Patel Bhawan, New Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    yearsOfService: 22,
    karmayogiId: 'KARM-MOSPI-0012',
    learningHoursCompleted: 60.0,
    learningStreakDays: 18,
    coursesCompletedCount: 12,
    quizzesAttemptedCount: 20,
    competencies: [
      {
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        domainNameHi: 'सांख्यिकीय एवं पद्धति संबंधी',
        color: '#06B6D4',
        overallScore: 84,
        cadreBenchmark: 85,
        skills: []
      },
      {
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        domainNameHi: 'तकनीकी एवं डेटा इंजीनियरिंग',
        color: '#3B82F6',
        overallScore: 78,
        cadreBenchmark: 80,
        skills: []
      },
      {
        domainId: 'governance',
        domainName: 'Digital Governance & Public Policy',
        domainNameHi: 'डिजिटल गवर्नेंस एवं सार्वजनिक नीति',
        color: '#10B981',
        overallScore: 94,
        cadreBenchmark: 90,
        skills: []
      },
      {
        domainId: 'behavioural',
        domainName: 'Behavioural & Leadership',
        domainNameHi: 'व्यावहारिक एवं नेतृत्व क्षमता',
        color: '#F59E0B',
        overallScore: 96,
        cadreBenchmark: 90,
        skills: []
      }
    ]
  }
];
