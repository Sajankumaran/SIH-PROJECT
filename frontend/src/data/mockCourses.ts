import { Course } from '../types/index';

export const MOCK_COURSES: Course[] = [
  {
    id: 'crs-01',
    igotCourseId: 'iGOT-STAT-402',
    title: 'Advanced Multi-Stage Stratified Sampling & Survey Design',
    titleHi: 'उन्नत बहु-स्तरीय स्तरीकृत प्रतिचयन एवं सर्वेक्षण अभिकल्प',
    domainId: 'statistical',
    domainName: 'Statistical & Methodological',
    provider: 'National Statistical Systems Training Academy (NSSTA)',
    durationHours: 18,
    level: 'Advanced',
    rating: 4.9,
    enrolledCount: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
    description: 'Master complex multi-stage sampling designs, probability proportional to size (PPS) selection, circular systematic sampling, and design-effect variance estimation tailored for NSSO socio-economic rounds.',
    descriptionHi: 'एनएसएसओ सामाजिक-आर्थिक दौरों हेतु बहु-स्तरीय प्रतिचयन अभिकल्प, पीपीएस चयन, वृत्ताकार व्यवस्थित प्रतिचयन तथा प्रसरण आकलन में निपुणता प्राप्त करें।',
    targetCompetencies: ['Multi-stage Stratified Sampling', 'Non-Sampling Error Quantification'],
    competencyDelta: {
      domainId: 'statistical',
      gainPoints: 16,
      targetSkillId: 'stat-01'
    },
    modulesCount: 6,
    syllabus: [
      'Foundations of Finite Population Sampling',
      'Stratification Strategies & Optimal Allocation (Neyman)',
      'Two-Stage Sampling with Unequal Probability (PPSWR & PPSWOR)',
      'Sub-sampling of Urban Frame Survey (UFS) Blocks',
      'Calculation of Multipliers & Design Weights',
      'Hands-on Case Study: NSS 79th Round Data'
    ],
    tags: ['NSSO', 'Sampling', 'Survey Design', 'ISS Benchmark', 'MoSPI Priority']
  },
  {
    id: 'crs-02',
    igotCourseId: 'iGOT-TECH-301',
    title: 'Python for Large-Scale Survey Microdata Analytics (NSSO & PLFS)',
    titleHi: 'बड़े पैमाने पर सर्वेक्षण माइक्रोडाटा विश्लेषण हेतु पायथन',
    domainId: 'technical',
    domainName: 'Technical & Data Engineering',
    provider: 'Indian Statistical Institute (ISI Kolkata) & NSSTA',
    durationHours: 24,
    level: 'Intermediate',
    rating: 4.8,
    enrolledCount: 2150,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    description: 'Practical processing of multi-gigabyte NSSO microdata using Polars, DuckDB, and Pandas. Includes survey weighting formulas, bootstrap standard error calculation, and automated report generators.',
    descriptionHi: 'पोलार्स, डकडीबी और पांडास का उपयोग करके बहु-गीगाबाइट एनएसएसओ माइक्रोडाटा का व्यावहारिक प्रसंस्करण।',
    targetCompetencies: ['Python for Official Statistics', 'Automated Data Validation Pipelines'],
    competencyDelta: {
      domainId: 'technical',
      gainPoints: 18,
      targetSkillId: 'tech-01'
    },
    modulesCount: 8,
    syllabus: [
      'Setting up Python 3.12 Data Engineering Environment',
      'Parsing NSSO Fixed-Width Layout Microdata Files',
      'Applying Multipliers & Estimation of Aggregates',
      'Variance Estimation with Taylor Linearization & Jackknife in Python',
      'Exploratory Data Analysis of PLFS & ASI Datasets',
      'Building Interactive Streamlit Dashboards for MoSPI Indicators'
    ],
    tags: ['Python', 'Microdata', 'PLFS', 'Data Engineering', 'NSSTA']
  },
  {
    id: 'crs-03',
    igotCourseId: 'iGOT-GOV-501',
    title: 'DPDP Act 2023 Compliance & Statistical Disclosure Control (SDC)',
    titleHi: 'डीपीडीपी अधिनियम 2023 अनुपालन एवं सांख्यिकीय प्रकटीकरण नियंत्रण',
    domainId: 'governance',
    domainName: 'Digital Governance & Public Policy',
    provider: 'Capacity Building Commission (CBC India) & MeitY',
    durationHours: 12,
    level: 'Advanced',
    rating: 4.7,
    enrolledCount: 3800,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
    description: 'Ensure survey collection and microdata dissemination comply with India Digital Personal Data Protection Act 2023. Covers k-anonymity, l-diversity, cell suppression, and differential privacy.',
    descriptionHi: 'सर्वेक्षण संग्रह और माइक्रोडाटा प्रसार भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 का अनुपालन सुनिश्चित करें।',
    targetCompetencies: ['DPDP Act 2023 Compliance in Surveys', 'Open Government Data (OGD) Standards'],
    competencyDelta: {
      domainId: 'governance',
      gainPoints: 14,
      targetSkillId: 'gov-01'
    },
    modulesCount: 4,
    syllabus: [
      'Statutory Provisions of the DPDP Act 2023 for Government Bodies',
      'De-identification vs Anonymization in Official Microdata',
      'Microaggregation & Noise Addition Methods',
      'Practical SDC implementation using sdcMicro in R'
    ],
    tags: ['DPDP Act', 'Data Privacy', 'SDC', 'Governance', 'Mandatory 2026']
  },
  {
    id: 'crs-04',
    igotCourseId: 'iGOT-STAT-505',
    title: 'Small Area Estimation (SAE) for District-Level Indicators',
    titleHi: 'जिला स्तरीय संकेतकों हेतु लघु क्षेत्र अनुमान (एसएई)',
    domainId: 'statistical',
    domainName: 'Statistical & Methodological',
    provider: 'Indian Agricultural Statistics Research Institute (ICAR-IASRI) & NSSTA',
    durationHours: 20,
    level: 'Mastery',
    rating: 4.9,
    enrolledCount: 890,
    thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&auto=format&fit=crop&q=80',
    description: 'Advanced empirical Bayes, Fay-Herriot area-level models, and unit-level nested error regressions for generating reliable district poverty, nutrition, and unemployment statistics.',
    descriptionHi: 'विश्वसनीय जिला गरीबी, पोषण और बेरोजगारी आंकड़े उत्पन्न करने के लिए उन्नत अनुभवजन्य बेयस और फे-हेरियट मॉडल।',
    targetCompetencies: ['Small Area Estimation (SAE)', 'Multi-stage Stratified Sampling'],
    competencyDelta: {
      domainId: 'statistical',
      gainPoints: 20,
      targetSkillId: 'stat-02'
    },
    modulesCount: 5,
    syllabus: [
      'Direct Estimators vs Indirect/Model-based Estimators',
      'Fay-Herriot Area-Level Linear Mixed Models',
      'Unit-Level Battese-Harter-Fuller Regression',
      'Spatial & Temporal SAE Formulations',
      'District Case Study: NITI Aayog Aspirational Districts'
    ],
    tags: ['SAE', 'Fay-Herriot', 'District Planning', 'NITI Aayog', 'Advanced Method']
  },
  {
    id: 'crs-05',
    igotCourseId: 'iGOT-BEH-202',
    title: 'Statistical Storytelling & Macroeconomic Dissemination',
    titleHi: 'सांख्यिकीय प्रस्तुतीकरण एवं वृहद-आर्थिक डेटा प्रसार',
    domainId: 'behavioural',
    domainName: 'Behavioural & Leadership',
    provider: 'Lal Bahadur Shastri National Academy of Administration (LBSNAA)',
    durationHours: 10,
    level: 'Foundational',
    rating: 4.8,
    enrolledCount: 1650,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    description: 'Transform complex National Accounts (SNA), CPI inflation, and Index of Industrial Production (IIP) tables into clear, visually compelling briefs for cabinet ministers, parliamentarians, and press.',
    descriptionHi: 'जटिल राष्ट्रीय लेखा (एसएनए), सीपीआई मुद्रास्फीति, और आईआईपी तालिकाओं को कैबिनेट मंत्रियों और मीडिया के लिए स्पष्ट प्रस्तुतियों में बदलें।',
    targetCompetencies: ['Statistical Dissemination & Storytelling', 'Field Enumeration Team Leadership'],
    competencyDelta: {
      domainId: 'behavioural',
      gainPoints: 12,
      targetSkillId: 'beh-02'
    },
    modulesCount: 3,
    syllabus: [
      'Cognitive Principles of Data Visualization',
      'Drafting Press Releases for GDP & CPI Releases',
      'Handling Controversial Data Queries & Media Briefings'
    ],
    tags: ['Communication', 'Data Storytelling', 'Media Briefing', 'Leadership']
  },
  {
    id: 'crs-06',
    igotCourseId: 'iGOT-TECH-404',
    title: 'GIS Spatial Mapping & Urban Frame Survey (UFS) Digitalization',
    titleHi: 'जीआईएस स्थानिक मानचित्रण एवं शहरी फ्रेम सर्वेक्षण डिजिटलीकरण',
    domainId: 'technical',
    domainName: 'Technical & Data Engineering',
    provider: 'National Remote Sensing Centre (ISRO/NRSC) & NSSO',
    durationHours: 16,
    level: 'Intermediate',
    rating: 4.7,
    enrolledCount: 1120,
    thumbnail: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80',
    description: 'Spatial analysis with QGIS and GeoPandas. Linking Census enumeration blocks (EBs), satellite imagery, and municipal GIS layers to modernize the Urban Frame Survey.',
    descriptionHi: 'क्यूजीआईएस और जियोपांडास के साथ स्थानिक विश्लेषण। शहरी फ्रेम सर्वेक्षण के आधुनिकीकरण के लिए जनगणना ब्लॉक और उपग्रह इमेजरी को जोड़ना।',
    targetCompetencies: ['GIS & Spatial Statistical Mapping', 'Automated Data Validation Pipelines'],
    competencyDelta: {
      domainId: 'technical',
      gainPoints: 15,
      targetSkillId: 'tech-03'
    },
    modulesCount: 5,
    syllabus: [
      'Introduction to Coordinate Reference Systems (CRS) in India',
      'Geo-referencing UFS Block Sketch Maps in QGIS',
      'Spatial Joins with GeoPandas and Shapely',
      'Thematic Mapping for Field Enumeration Routes'
    ],
    tags: ['GIS', 'QGIS', 'UFS', 'ISRO', 'Spatial Statistics']
  }
];
