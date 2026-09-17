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

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'doc-nsso-79',
    title: 'NSSO 79th Round Survey Methodology & Sampling Design Manual',
    filename: 'NSSO_79th_Round_Sampling_Design_Instructions.pdf',
    fileSize: '2.4 MB',
    pageCount: 38,
    category: 'Socio-Economic Survey Guidelines',
    summary: 'Official field instructions for multi-stage stratified sampling of rural villages and urban blocks, listing procedures, and non-sampling error minimization in the 79th round.',
    rawText: `
NATIONAL SAMPLE SURVEY OFFICE (NSSO)
SURVEY DESIGN AND RESEARCH DIVISION (SDRD), KOLKATA
INSTRUCTIONS TO FIELD STAFF: SOCIO-ECONOMIC SURVEY 79TH ROUND

1. INTRODUCTION AND COVERAGE
The 79th Round of NSS is devoted to the survey on Comprehensive Socio-Economic Indicators and Ayush Practices across all 28 States and 8 Union Territories of India. 
The survey covers both rural and urban sectors of India. The First Stage Units (FSUs) are Census villages (Panchayat wards in Kerala) in the rural sector and Urban Frame Survey (UFS) blocks in the urban sector. The Ultimate Stage Units (USUs) are households in both sectors.

2. STRATIFICATION AND ALLOCATION OF SAMPLE FSUs
A. Rural Sector: Each district is divided into two basic strata:
- Stratum 1: High tribal concentration (villages with >50% ST population according to Census 2011).
- Stratum 2: Remaining rural area of the district.
Within each stratum, circular systematic sampling with Probability Proportional to Size (PPS, size being population as per Census 2011) is adopted.

B. Urban Sector: In each district, towns are classified into three strata based on population:
- Stratum 1: Towns with population < 50,000.
- Stratum 2: Towns with population between 50,000 and 10 lakhs.
- Stratum 3: Million-plus cities.
Within each urban stratum, UFS blocks are selected by Simple Random Sampling Without Replacement (SRSWOR).

3. SUB-STRATIFICATION AND HAMLET-GROUP / SUB-BLOCK FORMATION
If the approximate present population of a sample village/UFS block exceeds 1,200, the FSU is divided into two or more Hamlet-Groups (hg) in rural or Sub-Blocks (sb) in urban areas of roughly equal population. Two hamlet-groups / sub-blocks are selected for detailed survey: one with the highest concentration of marginalized population (with certainty) and another selected randomly from the remaining.

4. SELECTION OF HOUSEHOLDS (SECOND STAGE STRATIFICATION)
All listed households in the selected FSU/hg/sb are stratified into three Second Stage Strata (SSS) based on Monthly Per Capita Consumer Expenditure (MPCE) and possession of cultivated land/enterprise.
- SSS 1: Top 10% affluent households.
- SSS 2: Middle 40% households.
- SSS 3: Bottom 50% vulnerable and marginalized households.
A total of 8 sample households are surveyed per FSU: 2 from SSS 1, 3 from SSS 2, and 3 from SSS 3, using linear systematic sampling.

5. NON-SAMPLING ERROR MITIGATION AND COMPUTER ASSISTED PERSONAL INTERVIEWING (CAPI)
Field officials are mandated to use CAPI tablets. Inbuilt logical consistency checks must prevent impossible entries (e.g. child age < father age, or total expenditure exceeding annual household income by >300%). When a household refuses or is temporarily absent after 3 repeat visits, formal substitution is strictly permitted only with prior written sanction of the Superintending Officer.
`
  },
  {
    id: 'doc-nas-2024',
    title: 'MoSPI National Accounts Statistics (NAS) 2024: Compilation Manual',
    filename: 'MoSPI_NAS_2024_GVA_Compilation_Manual.pdf',
    fileSize: '3.8 MB',
    pageCount: 54,
    category: 'Macroeconomic Framework',
    summary: 'Guidelines on Gross Value Added (GVA) estimation at basic prices, System of National Accounts 2008 alignment, MCA-21 corporate financial filings, and supply-use balancing.',
    rawText: `
MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION (MOSPI)
NATIONAL ACCOUNTS DIVISION (NAD), NEW DELHI
NATIONAL ACCOUNTS STATISTICS (NAS) COMPILATION MANUAL - 2024

1. THE SYSTEM OF NATIONAL ACCOUNTS (SNA 2008) ARCHITECTURE
The Indian National Accounts are compiled in strict adherence to the United Nations System of National Accounts 2008 (SNA 2008). 
Gross Value Added (GVA) at basic prices is defined as:
GVA at Basic Prices = Output at Basic Prices - Intermediate Consumption at Purchasers' Prices.
Gross Domestic Product (GDP) at Market Prices is derived as:
GDP at Market Prices = GVA at Basic Prices + Taxes on Products - Subsidies on Products.

2. CORPORATE SECTOR ESTIMATION VIA MCA-21 DATABASE
The non-financial private corporate sector GVA is estimated using annual audited balance sheet and Profit & Loss filings from the Ministry of Corporate Affairs (MCA-21) repository.
- Coverage: Active corporate filings (MGT-7, AOC-4 / XBRL format).
- Blow-up methodology: The aggregate GVA from reporting companies is inflated to the active company universe using paid-up capital (PUC) scaling factors.
- Compensation of Employees (CE) and Operating Surplus (OS) are extracted directly from institutional sector P&L statements.

3. UNINCORPORATED ENTERPRISES & INFORMAL SECTOR ESTIMATION
For the unincorporated non-agricultural sector (excluding crop production), GVA is estimated using the Benchmark-Indicator method.
- Benchmark: The Annual Survey of Unincorporated Sector Enterprises (ASUSE) provides base-year Gross Value Added Per Worker (GVAPW).
- Extrapolation: Intervening years are projected using labour input estimates from the Periodic Labour Force Survey (PLFS) combined with physical indicators (IIP, GST collections, and bank credit growth).

4. DOUBLE DEFLATION AND CHAIN BASE REBASING
To measure real GVA accurately in the manufacturing sector:
- Single Deflation Bias: Single deflation by wholesale price index (WPI) output prices introduces distortion during commodity price volatility.
- Double Deflation Procedure: Deflating gross output by product-specific WPI indices and intermediate input baskets by corresponding Input-Output commodity deflators.
- Constant price series are pegged to the Base Year (2011-12) and updated periodically to reflect changing economic structure.
`
  },
  {
    id: 'doc-dpdpa-2023',
    title: 'Digital Personal Data Protection (DPDP) Act 2023: Guidelines for Statistical Surveys',
    filename: 'MoSPI_DPDPA_2023_Compliance_Framework.pdf',
    fileSize: '1.9 MB',
    pageCount: 22,
    category: 'Digital Governance & Legal Compliance',
    summary: 'Mandatory operational procedures for MoSPI field staff, CAPI mobile applications, data anonymization, statistical disclosure control (SDC), and survey respondent consent.',
    rawText: `
GOVERNMENT OF INDIA
MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION
OFFICE MEMORANDUM: IMPLEMENTATION OF DIGITAL PERSONAL DATA PROTECTION ACT, 2023

1. OBLIGATIONS OF MOSPI AS A DATA FIDUCIARY
Under Section 8 of the DPDP Act 2023, MoSPI and all subordinate statistical directorates (NSSO, CSO, State DES) function as 'Data Fiduciaries' when collecting household and individual identifiable information.
- Purpose Limitation: Microdata collected under the Collection of Statistics Act 2008 and socio-economic rounds can ONLY be used for statistical, research, and public policy purposes.
- Notice and Explicit Consent: Every CAPI tablet interview must present a multilingual Notice explaining the purpose of data collection, followed by verbal or digital consent recorded prior to questionnaire commencement.

2. ANONYMIZATION AND STATISTICAL DISCLOSURE CONTROL (SDC)
Before public microdata dissemination on the MoSPI Data Portal (microdata.gov.in), mandatory SDC algorithms must be executed:
- De-identification of Direct Identifiers: Name of respondent, house number, Aadhaar number, mobile number, and GPS coordinates below district level must be purged.
- k-Anonymity (k=5): No combination of quasi-identifiers (e.g. age, gender, occupation, 3-digit NIC/NCO code, sub-district) should allow re-identification of fewer than 5 respondents.
- Top-coding and Bottom-coding: Extreme outliers in income, consumer expenditure, or asset valuations must be masked at the 99th percentile to prevent target re-identification.

3. SECURITY SAFEGUARDS AND LOCAL DATA RESIDENCY
All CAPI field tablets must utilize hardware-backed AES-256 encryption for locally cached survey responses. Transmission of completed schedules to the MoSPI National Data Center (NDC) in New Delhi must occur over encrypted TLS 1.3 tunnels with multi-factor biometric authentication for field supervisors.
`
  }
];
