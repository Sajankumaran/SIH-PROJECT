export const MOCK_COURSES = [
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
        igotCourseId: 'iGOT-STAT-405',
        title: 'Small Area Estimation (SAE) for District-Level SDG Monitoring',
        titleHi: 'जिला-स्तरीय एसडीजी निगरानी हेतु लघु क्षेत्र अनुमान (एसएई)',
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        provider: 'Indian Statistical Institute (ISI Kolkata)',
        durationHours: 24,
        level: 'Mastery',
        rating: 4.85,
        enrolledCount: 890,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
        description: 'Modern empirical best linear unbiased predictor (EBLUP) and hierarchical Bayes models to bridge sample size limitations for disaggregated district indicators.',
        descriptionHi: 'जिला-स्तरीय सूक्ष्म संकेतकों के सटीक आकलन हेतु आधुनिक ईबीएलयूपी (EBLUP) एवं बेयसियन मॉडलिंग पद्धतियां।',
        targetCompetencies: ['Small Area Estimation (SAE)'],
        competencyDelta: {
            domainId: 'statistical',
            gainPoints: 20,
            targetSkillId: 'stat-02'
        },
        modulesCount: 8,
        syllabus: [
            'Direct vs Indirect Estimation Limits',
            'Fay-Herriot Area-Level Linear Mixed Models',
            'Battese-Harter-Fuller Unit-Level Models',
            'Spatial and Temporal SAE Models in R (sae Package)',
            'Validation of Model Diagnostics for NITI Aayog Aspirational Districts'
        ],
        tags: ['SDG', 'SAE', 'ISI Kolkata', 'District Planning']
    },
    {
        id: 'crs-03',
        igotCourseId: 'iGOT-TECH-210',
        title: 'Python for Official Statistics: Microdata Pipelines & Polars',
        titleHi: 'आधिकारिक सांख्यिकी हेतु पायथन: माइक्रोडाटा पाइपलाइन एवं पोलार्स',
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        provider: 'Digital India Academy & MoSPI Computer Centre',
        durationHours: 15,
        level: 'Intermediate',
        rating: 4.92,
        enrolledCount: 3200,
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
        description: 'High-throughput data wrangling of massive NSSO, PLFS, and ASI survey datasets using Python, Polars, DuckDB, and Parquet formats.',
        descriptionHi: 'पायथन, पोलार्स और डकडीबी का उपयोग करके पीएलएफएस और एएसआई के विशाल सर्वेक्षण डेटासेट का त्वरित प्रसंस्करण।',
        targetCompetencies: ['Python for Official Statistics', 'Automated Data Validation Pipelines'],
        competencyDelta: {
            domainId: 'technical',
            gainPoints: 18,
            targetSkillId: 'tech-01'
        },
        modulesCount: 5,
        syllabus: [
            'Transitioning from Stata/SPSS to Modern Python',
            'Lightning fast processing with Polars DataFrame API',
            'Unit-level record linkage and deduplication algorithms',
            'Automated validation checks using Great Expectations',
            'Building exportable microdata dissemination formats'
        ],
        tags: ['Python', 'Polars', 'Data Engineering', 'PLFS', 'ASI']
    },
    {
        id: 'crs-04',
        igotCourseId: 'iGOT-TECH-330',
        title: 'GIS Integration & Geo-spatial Analytics for Statistical Surveys',
        titleHi: 'सांख्यिकीय सर्वेक्षणों हेतु जीआईएस समन्वय एवं भू-स्थानिक विश्लेषण',
        domainId: 'technical',
        domainName: 'Technical & Data Engineering',
        provider: 'National Remote Sensing Centre (ISRO) & NSSTA',
        durationHours: 20,
        level: 'Advanced',
        rating: 4.88,
        enrolledCount: 1100,
        thumbnail: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&auto=format&fit=crop&q=80',
        description: 'Geo-tagging enumeration blocks, satellite imagery validation for agricultural acreage statistics, and spatial autocorrelation with QGIS & GeoPandas.',
        descriptionHi: 'क्यूजीआईएस और जियोपांडास का उपयोग करके प्रगणना ब्लॉकों की जियो-टैगिंग और कृषि सर्वेक्षण उपग्रह सत्यापन।',
        targetCompetencies: ['GIS & Spatial Statistical Mapping'],
        competencyDelta: {
            domainId: 'technical',
            gainPoints: 22,
            targetSkillId: 'tech-03'
        },
        modulesCount: 7,
        syllabus: [
            'Fundamentals of Coordinate Reference Systems (CRS) in India',
            'Urban Frame Survey (UFS) Shapefile Management',
            'Spatial Joins and Geo-tagging of Household Surveys',
            'Satellite Remote Sensing Cross-Validation for Agricultural Statistics',
            'Publishing Interactive Geospatial Dashboards on Bhuvan / MoSPI'
        ],
        tags: ['GIS', 'GeoPandas', 'ISRO Bhuvan', 'UFS Mapping']
    },
    {
        id: 'crs-05',
        igotCourseId: 'iGOT-GOV-104',
        title: 'DPDP Act 2023: Data Privacy & Anonymization in Official Statistics',
        titleHi: 'डीपीडीपी अधिनियम 2023: आधिकारिक सांख्यिकी में डेटा गोपनीयता एवं अनामीकरण',
        domainId: 'governance',
        domainName: 'Digital Governance & Public Policy',
        provider: 'Capacity Building Commission (CBC) & Ministry of Law',
        durationHours: 10,
        level: 'Intermediate',
        rating: 4.95,
        enrolledCount: 4500,
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
        description: 'Operational compliance with India’s Digital Personal Data Protection Act 2023 for survey questionnaires, field CAPI tablets, and statistical disclosure control (SDC).',
        descriptionHi: 'सर्वेक्षण प्रश्नावली, टैबलेट और सांख्यिकीय डेटा प्रकटीकरण नियंत्रण हेतु भारत के डीपीडीपी अधिनियम 2023 का अनिवार्य अनुपालन।',
        targetCompetencies: ['DPDP Act 2023 Compliance in Surveys', 'Open Government Data (OGD) Standards'],
        competencyDelta: {
            domainId: 'governance',
            gainPoints: 14,
            targetSkillId: 'gov-01'
        },
        modulesCount: 4,
        syllabus: [
            'Key Provisions of DPDP Act 2023 for Government Agencies',
            'Informed Consent Protocols for Computer Assisted Personal Interviewing',
            'Statistical Disclosure Control (k-anonymity, l-diversity, differential privacy)',
            'Penalty Safeguards and Data Principal Rights Handling'
        ],
        tags: ['DPDPA 2023', 'Privacy', 'Compliance', 'Mandatory Karmayogi']
    },
    {
        id: 'crs-06',
        igotCourseId: 'iGOT-STAT-312',
        title: 'National Accounts Framework (SNA 2008) & Supply-Use Tables',
        titleHi: 'राष्ट्रीय लेखा ढांचा (एसएनए 2008) एवं आपूर्ति-उपयोग सारणियां',
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        provider: 'National Accounts Division (CSO) & NSSTA',
        durationHours: 22,
        level: 'Advanced',
        rating: 4.82,
        enrolledCount: 1650,
        thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format&fit=crop&q=80',
        description: 'Comprehensive compilation of Gross Value Added (GVA), institutional sector financial accounts, and Input-Output balancing under System of National Accounts 2008.',
        descriptionHi: 'राष्ट्रीय लेखा प्रणाली (एसएनए 2008) के अंतर्गत सकल मूल्य वर्धन (जीवीए) और आपूर्ति-उपयोग सारणियों का संकलन।',
        targetCompetencies: ['National Accounts (SNA 2008)'],
        competencyDelta: {
            domainId: 'statistical',
            gainPoints: 15,
            targetSkillId: 'stat-03'
        },
        modulesCount: 6,
        syllabus: [
            'SNA 2008 Sequence of Accounts and GVA Breakdown',
            'Corporate Sector Estimation using MCA-21 Database',
            'Unincorporated Enterprise Accounting via ASUSE Survey',
            'Deflators, Double Deflation, and Chain Base Indices'
        ],
        tags: ['GDP', 'SNA 2008', 'CSO', 'National Accounts']
    },
    {
        id: 'crs-07',
        igotCourseId: 'iGOT-BEH-202',
        title: 'Statistical Storytelling & High-Impact Policy Communication',
        titleHi: 'सांख्यिकीय प्रस्तुतीकरण एवं नीतिगत संवाद कौशल',
        domainId: 'behavioural',
        domainName: 'Behavioural & Leadership',
        provider: 'Lal Bahadur Shastri National Academy of Administration (LBSNAA)',
        durationHours: 12,
        level: 'Intermediate',
        rating: 4.89,
        enrolledCount: 2800,
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80',
        description: 'Transforming complex statistical tables and macroeconomic aggregates into lucid policy briefs, executive summaries, and visual narratives for ministries.',
        descriptionHi: 'जटिल सांख्यिकीय तालिकाओं को नीति निर्माताओं हेतु स्पष्ट और प्रभावशाली विजुअल आख्यानों में बदलने की कला।',
        targetCompetencies: ['Statistical Dissemination & Storytelling'],
        competencyDelta: {
            domainId: 'behavioural',
            gainPoints: 15,
            targetSkillId: 'beh-02'
        },
        modulesCount: 4,
        syllabus: [
            'Cognitive Principles of Data Visualization',
            'Drafting Press Releases for CPI, IIP, and GDP Releases',
            'Handling Media & Statistical Skepticism',
            'Interactive Dashboarding for Inter-Ministerial Review'
        ],
        tags: ['Leadership', 'Communication', 'LBSNAA', 'Policy Impact']
    },
    {
        id: 'crs-08',
        igotCourseId: 'iGOT-STAT-208',
        title: 'Time Series Econometrics & X-13ARIMA-SEATS Seasonal Adjustment',
        titleHi: 'काल श्रेणी अर्थमिति एवं एक्स-13अरीमा मौसमी समायोजन',
        domainId: 'statistical',
        domainName: 'Statistical & Methodological',
        provider: 'Reserve Bank of India (RBI) Academy & NSSTA',
        durationHours: 16,
        level: 'Intermediate',
        rating: 4.79,
        enrolledCount: 1350,
        thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80',
        description: 'Filter calendar effects, Diwali/festival holiday shifts, and trading day variations in monthly IIP and CPI inflation indexes.',
        descriptionHi: 'मासिक आईआईपी और सीपीआई मुद्रास्फीति सूचकांकों में त्यौहारों और कार्य दिवसों के प्रभावों का वैज्ञानिक मौसमी समायोजन।',
        targetCompetencies: ['Time Series & Seasonal Adjustment'],
        competencyDelta: {
            domainId: 'statistical',
            gainPoints: 16,
            targetSkillId: 'stat-04'
        },
        modulesCount: 5,
        syllabus: [
            'Stationarity, Unit Root Tests, and Cointegration',
            'ARIMA and SARIMA Modeling Fundamentals',
            'Indian Holiday Regressor Setup in X-13ARIMA-SEATS',
            'Diagnostic Tests for Residual Seasonality'
        ],
        tags: ['Time Series', 'CPI', 'IIP', 'Seasonal Adjustment']
    }
];
