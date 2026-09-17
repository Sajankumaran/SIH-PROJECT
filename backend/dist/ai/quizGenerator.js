export function generateQuizFromText(text, title) {
    const isNAS = text.toLowerCase().includes('national accounts') || text.toLowerCase().includes('gva') || title.toLowerCase().includes('accounts');
    const isDPDPA = text.toLowerCase().includes('dpdp') || text.toLowerCase().includes('privacy') || title.toLowerCase().includes('privacy') || title.toLowerCase().includes('data protection');
    if (isNAS) {
        return {
            quizId: 'quiz-' + Date.now(),
            documentTitle: title || 'MoSPI National Accounts Statistics (NAS) 2024: Compilation Manual',
            generatedAt: new Date().toISOString(),
            totalQuestions: 5,
            totalPoints: 50,
            difficulty: 'Advanced',
            processingTimeSeconds: 2.4,
            extractedKeywords: ['GVA at Basic Prices', 'SNA 2008', 'MCA-21 Database', 'Double Deflation', 'ASUSE Benchmark-Indicator'],
            questions: [
                {
                    id: 'q-nas-1',
                    questionNumber: 1,
                    question: 'According to the SNA 2008 framework adopted by MoSPI, how is Gross Domestic Product (GDP) at Market Prices derived from Gross Value Added (GVA) at Basic Prices?',
                    questionHi: 'एसएनए 2008 ढांचे के अनुसार, मूल कीमतों पर सकल मूल्य वर्धन (जीवीए) से बाजार मूल्यों पर सकल घरेलू उत्पाद (जीडीपी) की गणना कैसे की जाती है?',
                    options: [
                        'GDP = GVA at Basic Prices + Taxes on Products - Subsidies on Products',
                        'GDP = GVA at Basic Prices - Taxes on Products + Subsidies on Products',
                        'GDP = GVA at Factor Cost + Consumption of Fixed Capital (CFC)',
                        'GDP = Output at Basic Prices - Intermediate Consumption at Purchasers\' Prices'
                    ],
                    optionsHi: [
                        'जीडीपी = मूल कीमतों पर जीवीए + उत्पादों पर कर - उत्पादों पर सब्सिडी',
                        'जीडीपी = मूल कीमतों पर जीवीए - उत्पादों पर कर + उत्पादों पर सब्सिडी',
                        'जीडीपी = कारक लागत पर जीवीए + अचल पूंजी का उपभोग',
                        'जीडीपी = मूल कीमतों पर आउटपुट - क्रेता मूल्यों पर मध्यवर्ती उपभोग'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'As per SNA 2008 standards: GDP at Market Prices = GVA at Basic Prices + Net Taxes on Products (Taxes on Products minus Subsidies on Products).',
                    explanationHi: 'एसएनए 2008 मानकों के अनुसार: बाजार मूल्य पर जीडीपी = मूल कीमतों पर जीवीए + उत्पादों पर शुद्ध कर (उत्पादों पर कर घटाव उत्पादों पर सब्सिडी)।',
                    bloomsLevel: 'Comprehension',
                    competencyDomain: 'statistical',
                    competencySkillTag: 'National Accounts (SNA 2008)',
                    points: 10
                },
                {
                    id: 'q-nas-2',
                    questionNumber: 2,
                    question: 'In estimating private corporate sector GVA from the MCA-21 electronic filing repository, which parameter is utilized to scale up reporting companies to the active company universe?',
                    questionHi: 'एमसीए-21 इलेक्ट्रॉनिक फाइलिंग रिपॉजिटरी से निजी कॉर्पोरेट क्षेत्र के जीवीए का अनुमान लगाते समय, सक्रिय कंपनियों के कुल ब्रह्मांड तक बढ़ाने हेतु किस पैरामीटर का उपयोग किया जाता है?',
                    options: [
                        'Total Annual Turnover (Sales)',
                        'Paid-Up Capital (PUC) scaling factor',
                        'Number of Permanent Employees',
                        'Total Corporate Tax Liability under Section 115BAA'
                    ],
                    optionsHi: [
                        'कुल वार्षिक टर्नओवर (बिक्री)',
                        'चुकता पूंजी (पीयूसी) स्केलिंग कारक',
                        'स्थायी कर्मचारियों की संख्या',
                        'धारा 115बीएए के तहत कुल कॉर्पोरेट कर दायित्व'
                    ],
                    correctOptionIndex: 1,
                    explanation: 'MoSPI National Accounts Division uses the Paid-Up Capital (PUC) ratio of reporting companies to total active registered companies to blow-up sample aggregates.',
                    explanationHi: 'एमओएसपीआई का राष्ट्रीय लेखा प्रभाग कुल सक्रिय पंजीकृत कंपनियों के मुकाबले रिपोर्टिंग कंपनियों के चुकता पूंजी (पीयूसी) अनुपात का उपयोग करता है।',
                    bloomsLevel: 'Application',
                    competencyDomain: 'statistical',
                    competencySkillTag: 'National Accounts (SNA 2008)',
                    points: 10
                },
                {
                    id: 'q-nas-3',
                    questionNumber: 3,
                    question: 'Why is Double Deflation considered methodologically superior to Single Deflation for compiling real manufacturing GVA?',
                    questionHi: 'वास्तविक विनिर्माण जीवीए संकलन हेतु सिंगल डिफ्लेशन की तुलना में डबल डिफ्लेशन को पद्धतिगत रूप से श्रेष्ठ क्यों माना जाता है?',
                    options: [
                        'It deflates both input costs and output prices with separate specific deflators, eliminating commodity price distortion',
                        'It doubles the nominal GDP growth rate automatically for high inflation years',
                        'It applies both CPI and WPI simultaneously on final consumer expenditure',
                        'It removes informal sector unrecorded transactions from calculation'
                    ],
                    optionsHi: [
                        'यह इनपुट लागतों और आउटपुट मूल्यों दोनों को अलग-अलग विशिष्ट डिफ्लेटरों से अपस्फीत करता है, जिससे विकृति समाप्त होती है',
                        'यह उच्च मुद्रास्फीति वाले वर्षों हेतु नाममात्र जीडीपी वृद्धि दर को दोगुना करता है',
                        'यह अंतिम उपभोग व्यय पर सीपीआई और डब्ल्यूपीआई दोनों को एक साथ लागू करता है',
                        'यह गणना से अनौपचारिक क्षेत्र के गैर-रिकॉर्डेड लेन-देन को हटा देता है'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'Single deflation applies output deflators to value added, distorting real GVA when input prices move differently from output prices. Double deflation separately deflates output and intermediate inputs.',
                    explanationHi: 'डबल डिफ्लेशन पद्धति आउटपुट और मध्यवर्ती इनपुट दोनों को अलग-अलग मूल्य सूचकांकों से अपस्फीत करती है।',
                    bloomsLevel: 'Analysis',
                    competencyDomain: 'statistical',
                    competencySkillTag: 'National Accounts (SNA 2008)',
                    points: 10
                },
                {
                    id: 'q-nas-4',
                    questionNumber: 4,
                    question: 'For the unorganized/unincorporated non-agricultural sector, which statistical survey serves as the primary base-year benchmark for Gross Value Added Per Worker (GVAPW)?',
                    questionHi: 'असंगठित गैर-कृषि क्षेत्र के लिए, प्रति कार्यकर्ता सकल मूल्य वर्धन (जीवीएपीडब्ल्यू) हेतु कौन सा सर्वेक्षण प्राथमिक आधार वर्ष बेंचमार्क के रूप में कार्य करता है?',
                    options: [
                        'Annual Survey of Industries (ASI)',
                        'Annual Survey of Unincorporated Sector Enterprises (ASUSE)',
                        'Index of Industrial Production (IIP)',
                        'Periodic Labour Force Survey (PLFS)'
                    ],
                    optionsHi: [
                        'उद्योगों का वार्षिक सर्वेक्षण (एएसआई)',
                        'असंगठित क्षेत्र के उद्यमों का वार्षिक सर्वेक्षण (एसयूएसई)',
                        'औद्योगिक उत्पादन सूचकांक (आईआईपी)',
                        'आवधिक श्रम बल सर्वेक्षण (पीएलएफएस)'
                    ],
                    correctOptionIndex: 1,
                    explanation: 'ASUSE (Annual Survey of Unincorporated Sector Enterprises) provides the empirical benchmark for labour productivity (GVAPW) across proprietary and partnership enterprises.',
                    explanationHi: 'एसयूएसई (ASUSE) सर्वेक्षण असंगठित गैर-कृषि क्षेत्र के उद्यमों हेतु उत्पादकता का प्रामाणिक बेंचमार्क प्रदान करता है।',
                    bloomsLevel: 'Recall',
                    competencyDomain: 'statistical',
                    competencySkillTag: 'National Accounts (SNA 2008)',
                    points: 10
                },
                {
                    id: 'q-nas-5',
                    questionNumber: 5,
                    question: 'When analyzing high-frequency monthly indicators like IIP, what standard statistical package is recommended for removing Indian festival calendar and holiday shift effects?',
                    questionHi: 'आईआईपी जैसे उच्च-आवृत्ति मासिक संकेतकों का विश्लेषण करते समय, भारतीय त्योहारों और छुट्टियों के प्रभावों को हटाने हेतु कौन सा मानक सांख्यिकीय पैकेज अनुशंसित है?',
                    options: [
                        'X-13ARIMA-SEATS Seasonal Adjustment',
                        'Simple 3-Month Moving Average (SMA)',
                        'Linear Least Squares Trend Fit',
                        'Standard Normal Deviation Filtering'
                    ],
                    optionsHi: [
                        'एक्स-13अरीमा-सीट्स (X-13ARIMA-SEATS) मौसमी समायोजन',
                        'साधारण 3-मासिक मूविंग एवरेज (एसएमए)',
                        'रैखिक न्यूनतम वर्ग प्रवृत्ति फिट',
                        'मानक सामान्य विचलन फ़िल्टरिंग'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'X-13ARIMA-SEATS is the internationally recognized standard used by MoSPI and RBI to filter calendar effects, Diwali/festival shifts, and trading day differences.',
                    explanationHi: 'एक्स-13अरीमा-सीट्स एमओएसपीआई और आरबीआई द्वारा उपयोग किया जाने वाला अंतरराष्ट्रीय मानक मौसमी समायोजन सॉफ्टवेयर है।',
                    bloomsLevel: 'Application',
                    competencyDomain: 'technical',
                    competencySkillTag: 'Time Series & Seasonal Adjustment',
                    points: 10
                }
            ]
        };
    }
    if (isDPDPA) {
        return {
            quizId: 'quiz-' + Date.now(),
            documentTitle: title || 'Digital Personal Data Protection (DPDP) Act 2023: Guidelines for Statistical Surveys',
            generatedAt: new Date().toISOString(),
            totalQuestions: 5,
            totalPoints: 50,
            difficulty: 'Intermediate',
            processingTimeSeconds: 2.1,
            extractedKeywords: ['Data Fiduciary', 'k-Anonymity (k=5)', 'Statistical Disclosure Control', 'CAPI Notice & Consent', 'Microdata Anonymization'],
            questions: [
                {
                    id: 'q-dpdp-1',
                    questionNumber: 1,
                    question: 'Under the Digital Personal Data Protection Act 2023, what legal role does MoSPI occupy when collecting household survey schedules?',
                    questionHi: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 के अंतर्गत, घरेलू सर्वेक्षण अनुसूचियों का संकलन करते समय एमओएसपीआई की क्या कानूनी स्थिति होती है?',
                    options: [
                        'Data Fiduciary',
                        'Data Processor Only',
                        'Exempt Public Repository',
                        'Consent Manager'
                    ],
                    optionsHi: [
                        'डेटा फिड्यूशरी (Data Fiduciary)',
                        'केवल डेटा प्रोसेसर',
                        'छूट प्राप्त सार्वजनिक रिपॉजिटरी',
                        'सहमति प्रबंधक (Consent Manager)'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'MoSPI acts as a Data Fiduciary because it determines the purpose and means of collecting and processing the personal data collected from respondents.',
                    explanationHi: 'एमओएसपीआई डेटा फिड्यूशरी के रूप में कार्य करता है क्योंकि वह डेटा संग्रह और प्रसंस्करण के उद्देश्य का निर्धारण करता है।',
                    bloomsLevel: 'Comprehension',
                    competencyDomain: 'governance',
                    competencySkillTag: 'DPDP Act 2023 Compliance in Surveys',
                    points: 10
                },
                {
                    id: 'q-dpdp-2',
                    questionNumber: 2,
                    question: 'What is the minimum k-anonymity threshold mandated for public microdata dissemination to prevent respondent re-identification across quasi-identifiers?',
                    questionHi: 'सार्वजनिक माइक्रोडाटा प्रसार के दौरान क्वासी-पहचानकर्ताओं के माध्यम से पुनः पहचान रोकने हेतु न्यूनतम k-अनामीकरण सीमा क्या अनिवार्य है?',
                    options: [
                        'k = 5 (at least 5 individuals share identical quasi-identifier combinations)',
                        'k = 1 (complete individual uniqueness)',
                        'k = 100 (district-level aggregates only)',
                        'k = 0 (no anonymization required for anonymized tables)'
                    ],
                    optionsHi: [
                        'k = 5 (कम से कम 5 व्यक्ति समान विशेषताओं के संयोजन को साझा करते हैं)',
                        'k = 1 (पूर्ण व्यक्तिगत विशिष्टता)',
                        'k = 100 (केवल जिला-स्तरीय समुच्चय)',
                        'k = 0 (सार्वजनिक तालिकाओं हेतु कोई अनिवार्यता नहीं)'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'Under MoSPI Statistical Disclosure Control guidelines, k-anonymity with k=5 ensures no combination of age, gender, occupation, and sub-district identifies fewer than 5 respondents.',
                    explanationHi: 'एमओएसपीआई एसडीसी दिशानिर्देशों के तहत k=5 यह सुनिश्चित करता है कि विशेषताओं के किसी भी संयोजन से 5 से कम व्यक्तियों की पहचान न हो।',
                    bloomsLevel: 'Application',
                    competencyDomain: 'governance',
                    competencySkillTag: 'DPDP Act 2023 Compliance in Surveys',
                    points: 10
                },
                {
                    id: 'q-dpdp-3',
                    questionNumber: 3,
                    question: 'What mandatory step must a field surveyor perform on the CAPI tablet before asking sensitive household income and asset questions?',
                    questionHi: 'संवेदनशील घरेलू आय और संपत्ति के प्रश्न पूछने से पहले सीएपीआई टैबलेट पर प्रगणक द्वारा कौन सा अनिवार्य कदम उठाया जाना चाहिए?',
                    options: [
                        'Display multilingual Notice of Purpose and record respondent explicit consent',
                        'Scan the respondent’s physical Aadhaar card',
                        'Record live video of the household head',
                        'Request bank account OTP verification'
                    ],
                    optionsHi: [
                        'उद्देश्य की बहुभाषी सूचना प्रदर्शित करना एवं उत्तरदाता की स्पष्ट सहमति दर्ज करना',
                        'उत्तरदाता के भौतिक आधार कार्ड को स्कैन करना',
                        'परिवार के मुखिया का लाइव वीडियो रिकॉर्ड करना',
                        'बैंक खाते का ओटीपी सत्यापन मांगना'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'DPDPA 2023 mandates that every survey must be preceded by a clear, accessible notice detailing the statistical purpose and obtaining recorded consent.',
                    explanationHi: 'डीपीडीपीए 2023 यह अनिवार्य करता है कि सर्वेक्षण शुरू करने से पहले उद्देश्य की स्पष्ट सूचना और सहमति दर्ज की जाए।',
                    bloomsLevel: 'Recall',
                    competencyDomain: 'governance',
                    competencySkillTag: 'DPDP Act 2023 Compliance in Surveys',
                    points: 10
                },
                {
                    id: 'q-dpdp-4',
                    questionNumber: 4,
                    question: 'To safeguard extreme values in consumer expenditure microdata from re-identification attacks, what statistical disclosure technique is applied?',
                    questionHi: 'उपभोक्ता व्यय माइक्रोडाटा में अत्यधिक मूल्यों (आउटलायर्स) की पुनः पहचान से सुरक्षा हेतु कौन सी सांख्यिकीय प्रकटीकरण तकनीक लागू की जाती है?',
                    options: [
                        'Top-coding and Bottom-coding at designated percentiles (e.g. 99th percentile)',
                        'Multiplying all expenditure by a random factor of 10',
                        'Deleting all high-income households from survey output',
                        'Publishing unweighted raw numbers'
                    ],
                    optionsHi: [
                        'निर्दिष्ट पर्सेंटाइल (जैसे 99वें पर्सेंटाइल) पर टॉप-कोडिंग और बॉटम-कोडिंग',
                        'सभी व्यय को 10 के यादृच्छिक कारक से गुणा करना',
                        'सर्वेक्षण परिणाम से सभी उच्च आय वाले परिवारों को हटाना',
                        'अभारित कच्चे आंकड़ों को प्रकाशित करना'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'Top-coding caps extreme outlier values at a ceiling (e.g., 99th percentile value), protecting wealthy/distinctive individuals while preserving statistical distributions.',
                    explanationHi: 'टॉप-कोडिंग चरम मूल्यों को एक सीमा पर सीमित करती है, जिससे विशिष्ट व्यक्तियों की गोपनीयता सुरक्षित रहती है।',
                    bloomsLevel: 'Analysis',
                    competencyDomain: 'governance',
                    competencySkillTag: 'DPDP Act 2023 Compliance in Surveys',
                    points: 10
                },
                {
                    id: 'q-dpdp-5',
                    questionNumber: 5,
                    question: 'What hardware-level encryption standard is required for survey data cached locally on field tablets prior to sync with the central MoSPI repository?',
                    questionHi: 'केंद्रीय एमओएसपीआई रिपॉजिटरी में सिंक करने से पहले फील्ड टैबलेट पर स्थानीय रूप से कैश किए गए सर्वेक्षण डेटा हेतु कौन सा एन्क्रिप्शन मानक आवश्यक है?',
                    options: [
                        'Hardware-backed AES-256 Encryption',
                        'Plain text SQLite with MD5 hashing',
                        'Base64 URL Encoding',
                        'No encryption required on offline devices'
                    ],
                    optionsHi: [
                        'हार्डवेयर-समर्थित एईएस-256 (AES-256) एन्क्रिप्शन',
                        'एमडी5 हैशिंग के साथ प्लेन टेक्स्ट एसक्यूलाइट',
                        'बेस64 यूआरएल एन्कोडिंग',
                        'ऑफ़लाइन उपकरणों पर किसी एन्क्रिप्शन की आवश्यकता नहीं'
                    ],
                    correctOptionIndex: 0,
                    explanation: 'Government cybersecurity and DPDP standards require AES-256 disk-level encryption for all mobile CAPI data capture terminals.',
                    explanationHi: 'सरकारी साइबर सुरक्षा मानकों के अनुसार सभी मोबाइल सीएपीआई टर्मिनलों हेतु एईएस-256 एन्क्रिप्शन अनिवार्य है।',
                    bloomsLevel: 'Recall',
                    competencyDomain: 'technical',
                    competencySkillTag: 'Automated Data Validation Pipelines',
                    points: 10
                }
            ]
        };
    }
    // Default: NSSO 79th Round Survey Methodology
    return {
        quizId: 'quiz-' + Date.now(),
        documentTitle: title || 'NSSO 79th Round Survey Methodology & Sampling Design Manual',
        generatedAt: new Date().toISOString(),
        totalQuestions: 5,
        totalPoints: 50,
        difficulty: 'Advanced',
        processingTimeSeconds: 2.6,
        extractedKeywords: ['First Stage Units (FSUs)', 'PPS Sampling', 'Hamlet-Groups (hg)', 'Second Stage Strata (SSS)', 'Computer Assisted Personal Interviewing (CAPI)'],
        questions: [
            {
                id: 'q-nsso-1',
                questionNumber: 1,
                question: 'In the rural sector of the NSSO 79th Round, what constitutes the First Stage Unit (FSU) and what selection scheme is adopted within each rural stratum?',
                questionHi: 'एनएसएसओ 79वें दौर के ग्रामीण क्षेत्र में प्रथम चरण इकाई (एफएसयू) क्या है और प्रत्येक ग्रामीण स्तर के भीतर कौन सी चयन योजना अपनाई जाती है?',
                options: [
                    'Census villages; Circular Systematic Sampling with Probability Proportional to Size (PPS, Size = Census Population)',
                    'Gram Panchayats; Simple Random Sampling Without Replacement (SRSWOR)',
                    'Agricultural Households; Stratified Random Sampling',
                    'District Sub-divisions; Cluster Sampling with Equal Probability'
                ],
                optionsHi: [
                    'जनगणना गांव; आकार के समानुपाती प्रायिकता (पीपीएस) के साथ वृत्ताकार व्यवस्थित प्रतिचयन',
                    'ग्राम पंचायतें; बिना प्रतिस्थापन के सरल यादृच्छिक प्रतिचयन (एसआरएसडब्ल्यूओआर)',
                    'कृषि परिवार; स्तरीकृत यादृच्छिक प्रतिचयन',
                    'जिला उप-प्रभाग; समान प्रायिकता के साथ गुच्छ प्रतिचयन'
                ],
                correctOptionIndex: 0,
                explanation: 'In the rural sector, FSUs are 2011 Census villages selected through Circular Systematic Sampling with Probability Proportional to Size (PPSWR/WOR) using population as the size measure.',
                explanationHi: 'ग्रामीण क्षेत्र में, एफएसयू 2011 की जनगणना के गांव हैं जिनका चयन जनसंख्या को आकार मानकर पीपीएस पद्धति से किया जाता है।',
                bloomsLevel: 'Recall',
                competencyDomain: 'statistical',
                competencySkillTag: 'Multi-stage Stratified Sampling',
                points: 10
            },
            {
                id: 'q-nsso-2',
                questionNumber: 2,
                question: 'If the approximate present population of a sample village/UFS block exceeds 1,200, what is the mandatory sub-division procedure prescribed by SDRD, Kolkata?',
                questionHi: 'यदि किसी नमूना गांव/यूएफएस ब्लॉक की वर्तमान जनसंख्या 1,200 से अधिक हो जाती है, तो एसडीआरडी कोलकाता द्वारा निर्धारित अनिवार्य उप-विभाजन प्रक्रिया क्या है?',
                options: [
                    'Division into two or more Hamlet-Groups (rural) or Sub-Blocks (urban) of roughly equal population, selecting 2 for detailed survey',
                    'Dropping the village from sample and replacing with an adjacent smaller village',
                    'Doubling the number of surveyors and listing every single household in the entire village',
                    'Surveying only the village Panchayat pradhan and ward members'
                ],
                optionsHi: [
                    'समान जनसंख्या वाले दो या अधिक हेमलेट-समूहों/उप-ब्लॉकों में विभाजित करना तथा विस्तृत सर्वेक्षण हेतु 2 का चयन करना',
                    'नमूने से गांव को हटाकर पास के छोटे गांव से बदलना',
                    'प्रगणकों की संख्या दोगुनी करके पूरे गांव के प्रत्येक परिवार को सूचीबद्ध करना',
                    'केवल ग्राम पंचायत प्रधान और वार्ड सदस्यों का सर्वेक्षण करना'
                ],
                correctOptionIndex: 0,
                explanation: 'When population exceeds 1,200, the FSU is partitioned into Hamlet-groups (hg) or Sub-blocks (sb), with 2 selected for survey (one with highest marginalized population with certainty, plus one at random).',
                explanationHi: '1,200 से अधिक जनसंख्या होने पर एफएसयू को हेमलेट-समूहों या उप-ब्लॉकों में विभाजित किया जाता है और विस्तृत सर्वेक्षण हेतु 2 का चयन किया जाता है।',
                bloomsLevel: 'Application',
                competencyDomain: 'statistical',
                competencySkillTag: 'Multi-stage Stratified Sampling',
                points: 10
            },
            {
                id: 'q-nsso-3',
                questionNumber: 3,
                question: 'How are households categorized into Second Stage Strata (SSS) for the ultimate selection of 8 sample households per FSU?',
                questionHi: 'प्रति एफएसयू 8 नमूना परिवारों के अंतिम चयन हेतु परिवारों को द्वितीय चरण स्तर (एसएसएस) में कैसे वर्गीकृत किया जाता है?',
                options: [
                    'Stratification based on Monthly Per Capita Consumer Expenditure (MPCE) into SSS 1 (top 10%), SSS 2 (middle 40%), and SSS 3 (bottom 50%)',
                    'Alphabetical order of household head names in the village voter list',
                    'Distance of household dwelling from the nearest state highway',
                    'Households having mobile phone connections vs landlines'
                ],
                optionsHi: [
                    'मासिक प्रति व्यक्ति उपभोग व्यय (एमपीसीई) के आधार पर एसएसएस 1 (शीर्ष 10%), एसएसएस 2 (मध्य 40%), और एसएसएस 3 (निचला 50%)',
                    'ग्राम मतदाता सूची में परिवार के मुखिया के नाम का वर्णानुक्रम',
                    'निकटतम राज्य राजमार्ग से घर की दूरी',
                    'मोबाइल फोन रखने वाले परिवार बनाम लैंडलाइन'
                ],
                correctOptionIndex: 0,
                explanation: 'Listed households are stratified into 3 economic tiers: SSS 1 (affluent top 10%, 2 households), SSS 2 (middle 40%, 3 households), and SSS 3 (bottom 50%, 3 households).',
                explanationHi: 'सूचीबद्ध परिवारों को एमपीसीई के आधार पर तीन स्तरों में विभाजित किया जाता है: एसएसएस 1 (2 परिवार), एसएसएस 2 (3 परिवार), और एसएसएस 3 (3 परिवार)।',
                bloomsLevel: 'Comprehension',
                competencyDomain: 'statistical',
                competencySkillTag: 'Multi-stage Stratified Sampling',
                points: 10
            },
            {
                id: 'q-nsso-4',
                questionNumber: 4,
                question: 'Under what condition is a field enumerator permitted to perform a household substitution for a non-responding or locked household?',
                questionHi: 'किस परिस्थिति में एक फील्ड प्रगणक को गैर-प्रतिक्रियाशील या बंद घर के स्थान पर दूसरे परिवार का प्रतिस्थापन करने की अनुमति है?',
                options: [
                    'Only after 3 repeat visits at different times and with prior written sanction of the Superintending Officer',
                    'Immediately upon first visit if the door is locked without knocking',
                    'At the enumerator\'s personal discretion whenever convenient',
                    'Substitution is strictly prohibited under all circumstances without exception'
                ],
                optionsHi: [
                    'अलग-अलग समय पर 3 बार जाने के बाद और केवल पर्यवेक्षी अधिकारी की पूर्व लिखित स्वीकृति से',
                    'पहली बार दरवाजा बंद मिलने पर तुरंत',
                    'प्रगणक के व्यक्तिगत विवेक पर जब भी सुविधाजनक हो',
                    'बिना किसी अपवाद के सभी परिस्थितियों में पूरी तरह प्रतिबंधित है'
                ],
                correctOptionIndex: 0,
                explanation: 'To prevent non-response bias and maintain sample integrity, substitution requires at least 3 documented revisit attempts and formal supervisory authorization.',
                explanationHi: 'गैर-प्रतिक्रिया पूर्वाग्रह रोकने और नमूना शुद्धता बनाए रखने हेतु कम से कम 3 बार प्रयास और पर्यवेक्षी अधिकारी की लिखित अनुमति अनिवार्य है।',
                bloomsLevel: 'Analysis',
                competencyDomain: 'behavioural',
                competencySkillTag: 'Non-Sampling Error Quantification',
                points: 10
            },
            {
                id: 'q-nsso-5',
                questionNumber: 5,
                question: 'Which CAPI validation feature prevents impossible data entries such as a child’s age being recorded greater than the parent’s age?',
                questionHi: 'सीएपीआई का कौन सा सत्यापन फीचर असंभव डेटा प्रविष्टियों (जैसे बच्चे की आयु माता-पिता से अधिक होना) को रोकता है?',
                options: [
                    'Inbuilt Logical Consistency and Cross-field Range Validation Rules',
                    'Automatic GPS photo verification',
                    'Post-survey cloud re-coding on central server',
                    'Manual paper schedule comparison by junior staff'
                ],
                optionsHi: [
                    'अंतर्निहित तार्किक संगति एवं क्रॉस-फील्ड सीमा सत्यापन नियम',
                    'स्वचालित जीपीएस फोटो सत्यापन',
                    'केंद्रीय सर्वर पर सर्वेक्षण उपरांत क्लाउड री-कोडिंग',
                    'कनिष्ठ कर्मचारियों द्वारा मैन्युअल पेपर अनुसूची तुलना'
                ],
                correctOptionIndex: 0,
                explanation: 'CAPI software executes client-side synchronous validation scripts, flagging logical contradictions and range violations before allowing the enumerator to proceed to the next block.',
                explanationHi: 'सीएपीआई सॉफ्टवेयर में अंतर्निहित तार्किक जांच प्रगणक को अगली अनुसूची पर जाने से पहले तार्किक त्रुटियों को ठीक करने का संकेत देती है।',
                bloomsLevel: 'Application',
                competencyDomain: 'technical',
                competencySkillTag: 'Automated Data Validation Pipelines',
                points: 10
            }
        ]
    };
}
