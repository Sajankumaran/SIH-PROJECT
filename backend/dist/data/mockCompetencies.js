export const CADRE_BENCHMARKS = [
    {
        cadreId: 'jso',
        cadreName: 'Junior Statistical Officer (JSO)',
        description: 'Entry-level field enumeration and primary data validation cadre',
        benchmarks: { statistical: 70, technical: 65, governance: 75, behavioural: 72 }
    },
    {
        cadreId: 'sso',
        cadreName: 'Senior Statistical Officer (SSO)',
        description: 'Supervisory survey operations and institutional accounting cadre',
        benchmarks: { statistical: 80, technical: 75, governance: 82, behavioural: 80 }
    },
    {
        cadreId: 'deputy-director',
        cadreName: 'Deputy Director (ISS Cadre)',
        description: 'Methodology design, sample frame maintenance, and index release leadership',
        benchmarks: { statistical: 88, technical: 80, governance: 85, behavioural: 86 }
    },
    {
        cadreId: 'joint-director',
        cadreName: 'Joint Director / Director (ISS Cadre)',
        description: 'Strategic statistical policy, inter-ministerial data harmonisation, and international reporting',
        benchmarks: { statistical: 92, technical: 85, governance: 90, behavioural: 92 }
    }
];
export const DEPARTMENT_METRICS = [
    {
        id: 'nsso-sdrd',
        name: 'Survey Design & Research Division (SDRD), Kolkata',
        shortName: 'NSSO SDRD',
        totalOfficers: 420,
        avgScores: { statistical: 74, technical: 62, governance: 80, behavioural: 78 },
        forecastDeficit: {
            riskLevel: 'Medium',
            weather: 'Cloudy',
            shortageDomain: 'Technical & Machine Learning',
            gapMonths: 6,
            projectedShortagePercent: 24,
            recommendedIntervention: 'Enroll 85 Officers in iGOT Python & Automated Validation track before NSS 80th Round.'
        }
    },
    {
        id: 'nsso-fod',
        name: 'Field Operations Division (FOD), 6 Zonal Offices',
        shortName: 'NSSO FOD',
        totalOfficers: 2150,
        avgScores: { statistical: 62, technical: 48, governance: 72, behavioural: 76 },
        forecastDeficit: {
            riskLevel: 'Critical',
            weather: 'Stormy',
            shortageDomain: 'Technical (CAPI / GIS Mapping)',
            gapMonths: 3,
            projectedShortagePercent: 42,
            recommendedIntervention: 'Mandatory crash certification in Geo-tagging and CAPI tablet offline sync.'
        }
    },
    {
        id: 'cso-nad',
        name: 'National Accounts Division (NAD), CSO New Delhi',
        shortName: 'CSO NAD',
        totalOfficers: 280,
        avgScores: { statistical: 84, technical: 70, governance: 86, behavioural: 82 },
        forecastDeficit: {
            riskLevel: 'Low',
            weather: 'Sunny',
            shortageDomain: 'Time Series Seasonal Adjustment',
            gapMonths: 12,
            projectedShortagePercent: 12,
            recommendedIntervention: 'Schedule advanced X-13ARIMA workshop at NSSTA for upcoming GDP base revision.'
        }
    },
    {
        id: 'mospi-esd',
        name: 'Economic Statistics Division (ESD - CPI/IIP)',
        shortName: 'MoSPI ESD',
        totalOfficers: 340,
        avgScores: { statistical: 78, technical: 66, governance: 82, behavioural: 80 },
        forecastDeficit: {
            riskLevel: 'Medium',
            weather: 'Cloudy',
            shortageDomain: 'High-Frequency Big Data Scrapers',
            gapMonths: 8,
            projectedShortagePercent: 28,
            recommendedIntervention: 'Deploy web-scraping and e-commerce price monitoring iGOT certification.'
        }
    },
    {
        id: 'state-des',
        name: 'State Directorates of Economics & Statistics (DES)',
        shortName: 'State DES',
        totalOfficers: 5800,
        avgScores: { statistical: 58, technical: 44, governance: 68, behavioural: 70 },
        forecastDeficit: {
            riskLevel: 'Critical',
            weather: 'Stormy',
            shortageDomain: 'Small Area Estimation & DPDPA 2023',
            gapMonths: 4,
            projectedShortagePercent: 48,
            recommendedIntervention: 'Pan-India Karmayogi State DES modernization campaign covering 28 states.'
        }
    }
];
