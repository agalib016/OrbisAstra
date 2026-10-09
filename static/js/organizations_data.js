// Comprehensive International & World Organizations Data Engine
// Over 30 Major Global Organizations with Headquarters, Member Countries, Leadership, and Charters

(function () {
    'use strict';

    const worldOrganizationsData = [
        {
            id: 'un',
            name: { en: 'United Nations (UN)', bn: 'জাতিসংঘ (UN)' },
            acronym: 'UN',
            icon: '🇺🇳',
            flag: '🇺🇳',
            type: { en: 'Global Intergovernmental Organization', bn: 'আন্তর্জাতিক আন্তঃরাষ্ট্রীয় সংস্থা' },
            headquarters: { en: 'New York City, United States', bn: 'নিউ ইয়র্ক সিটি, মার্কিন যুক্তরাষ্ট্র' },
            hqCity: 'New York',
            lat: 40.7499,
            lng: -73.9674,
            founded: 'October 24, 1945',
            treaty: { en: 'Charter of the United Nations (San Francisco)', bn: 'জাতিসংঘ সনদ (সান ফ্রান্সিসকো সম্মেলন)' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'António Guterres', bn: 'আন্তোনিও গুতেরেস' },
            languages: { en: 'Arabic, Chinese, English, French, Russian, Spanish', bn: 'আরবি, চীনা, ইংরেজি, ফরাসি, রুশ, স্প্যানিশ' },
            budget: '$3.59 Billion (Annual Regular) + $6.1B Peacekeeping',
            membersCount: 193,
            summary: {
                en: 'Premier global organization dedicated to preserving international peace, human rights, economic cooperation, and international law.',
                bn: 'বিশ্বশান্তি রক্ষা, আন্তর্জাতিক নিরাপত্তা, মানবাধিকার সংরক্ষণ ও টেকসই উন্নয়নে গঠিত সর্ববৃহৎ আন্তর্জাতিক সংস্থা।'
            },
            overview: {
                en: 'The United Nations (UN) is an intergovernmental organization established following the conclusion of World War II to prevent future world conflicts. With 193 member states and 2 permanent observer states (Holy See and State of Palestine), the UN works through six principal organs to tackle climate change, armed conflict, poverty eradication, and international justice.',
                bn: 'দ্বিতীয় বিশ্বযুদ্ধের ধ্বংসস্তূপের পর ১৯৪৫ সালে বিশ্বশান্তি ও নিরাপত্তার অঙ্গীকার নিয়ে জাতিসংঘ প্রতিষ্ঠিত হয়। বিশ্বের ১৯৩টি সার্বভৌম রাষ্ট্র এর পূর্ণ সদস্য এবং ২টি পর্যবেক্ষক রাষ্ট্র রয়েছে। সাধারণ পরিষদ, নিরাপত্তা পরিষদসহ ৬টি প্রধান শাখার মাধ্যমে এটি পরিচালিত।'
            },
            organs: [
                { name: { en: 'General Assembly (UNGA)', bn: 'সাধারণ পরিষদ' }, role: { en: 'Main deliberative policy-making assembly of all 193 members', bn: 'সকল ১৯৩ সদস্যের প্রধান নীতি নির্ধারণী সভা' } },
                { name: { en: 'Security Council (UNSC)', bn: 'নিরাপত্তা পরিষদ' }, role: { en: 'Responsible for peace and security; 5 permanent members (P5) with veto power and 10 elected members', bn: 'আন্তর্জাতিক শান্তি ও নিরাপত্তা রক্ষক; ৫ স্থায়ী ভেটো ক্ষমতাপ্রাপ্ত ও ১০ অস্থায়ী সদস্য' } },
                { name: { en: 'International Court of Justice (ICJ)', bn: 'আন্তর্জাতিক বিচার আদালত' }, role: { en: 'Principal judicial organ based at the Peace Palace in The Hague, Netherlands', bn: 'নেদারল্যান্ডসের দ্য হেগে অবস্থিত প্রধান বিচার বিভাগীয় অঙ্গ' } },
                { name: { en: 'Economic and Social Council (ECOSOC)', bn: 'অর্থনৈতিক ও সামাজিক পরিষদ' }, role: { en: 'Coordinates international economic, social, environmental, and cultural work', bn: 'অর্থনৈতিক, সামাজিক ও টেকসই উন্নয়ন কাজের সমন্বয়কারী' } },
                { name: { en: 'Secretariat', bn: 'সচিবালয়' }, role: { en: 'Executive staff led by the Secretary-General carrying out substantive and administrative duties', bn: 'মহাসচিবের নেতৃত্বে দৈনন্দিন কার্যনির্বাহী প্রশাসনিক শাখা' } }
            ],
            keyHighlights: [
                { en: 'Oversees 17 Sustainable Development Goals (SDGs) for 2030', bn: '২০৩০ সালের মধ্যে ১৭টি টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDG) বাস্তবায়ন' },
                { en: 'Awarded the Nobel Peace Prize multiple times across its agencies (UNHCR, UNICEF, WFP)', bn: 'ইউএনএইচসিআর, ইউনিসেফ, ডব্লিউএফপিসহ একাধিক অঙ্গসংস্থার নোবেল শান্তি পুরস্কার লাভ' },
                { en: 'Deploys over 70,000 blue helmets across global peacekeeping missions', bn: 'বিশ্বের সংঘাতময় অঞ্চলে ৭০,০০০-এর বেশি ব্লু হেলমেট শান্তিরক্ষী মোতায়েন' }
            ],
            memberCountries: [
                'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
                'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
                'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
                'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
                'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
                'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
                'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
                'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
                'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
                'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
                'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
                'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
                'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
                'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent', 'Samoa',
                'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia',
                'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
                'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
                'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam',
                'Yemen', 'Zambia', 'Zimbabwe'
            ]
        },
        {
            id: 'who',
            name: { en: 'World Health Organization (WHO)', bn: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO)' },
            acronym: 'WHO',
            icon: '🩺',
            flag: '🌐',
            type: { en: 'Specialized UN Health Agency', bn: 'জাতিসংঘের বিশেষায়িত স্বাস্থ্য সংস্থা' },
            headquarters: { en: 'Geneva, Switzerland', bn: 'জেনেভা, সুইজারল্যান্ড' },
            hqCity: 'Geneva',
            lat: 46.2330,
            lng: 6.1332,
            founded: 'April 7, 1948',
            treaty: { en: 'Constitution of the World Health Organization', bn: 'বিশ্ব স্বাস্থ্য সংস্থার সংবিধান' },
            leaderTitle: { en: 'Director-General', bn: 'মহাপরিচালক' },
            leader: { en: 'Dr. Tedros Adhanom Ghebreyesus', bn: 'ড. টেড্রোস আধানম গ্যাব্রিয়েসুস' },
            languages: { en: 'Arabic, Chinese, English, French, Russian, Spanish', bn: 'আরবি, চীনা, ইংরেজি, ফরাসি, রুশ, স্প্যানিশ' },
            budget: '$6.72 Billion (Biennial Programme Budget)',
            membersCount: 194,
            summary: {
                en: 'Directing and coordinating authority for health within the United Nations system, leading disease eradication and pandemic responses.',
                bn: 'বিশ্বজুড়ে জনস্বাস্থ্য রক্ষা, মহামারী নিয়ন্ত্রণ এবং রোগ নির্মূলে জাতিসংঘ ব্যবস্থার শীর্ষ কর্তৃপক্ষ।'
            },
            overview: {
                en: 'The World Health Organization (WHO) is a specialized agency of the United Nations responsible for international public health. Its core priorities include universal healthcare coverage, health emergency response, disease eradication (such as smallpox and polio), and mental health advocacy.',
                bn: 'বিশ্ব স্বাস্থ্য সংস্থা (ডব্লিউএইচও) আন্তর্জাতিক জনস্বাস্থ্যের সর্বোচ্চ বৈশ্বিক প্রতিষ্ঠান। গুটিবসন্ত নির্মূল, পোলিও নির্মূল এবং কোভিড-১৯ সহ বিশ্বমহামারীতে আন্তর্জাতিক সমন্বয় সাধনে এর ভূমিকা অনন্য।'
            },
            organs: [
                { name: { en: 'World Health Assembly (WHA)', bn: 'বিশ্ব স্বাস্থ্য পরিষদ' }, role: { en: 'Supreme decision-making body meeting annually in Geneva', bn: 'জেনেভায় প্রতি বছর অনুষ্ঠিত সর্বোচ্চ নীতি নির্ধারণী সভা' } },
                { name: { en: 'Executive Board', bn: 'নির্বাহী বোর্ড' }, role: { en: '34 technically qualified members implementing decisions', bn: '৩৪ জন যোগ্য স্বাস্থ্য বিশেষজ্ঞ সমন্বয়ে গঠিত বাস্তবায়ন বোর্ড' } }
            ],
            keyHighlights: [
                { en: 'Historically eradicated smallpox worldwide in 1980', bn: '১৯৮০ সালে বিশ্ব থেকে গুটিবসন্ত সম্পূর্ণ নির্মূল ঘোষণা' },
                { en: 'Reduced wild poliovirus transmission by 99.9% globally', bn: 'বিশ্বব্যাপী পোলিও রোগের সংক্রমণ ৯৯.৯% হ্রাসকরণ' },
                { en: 'Maintains International Health Regulations (IHR) governing pandemic surveillance', bn: 'আন্তর্জাতিক স্বাস্থ্য বিধিমালা (IHR) অনুযায়ী বিশ্ব স্বাস্থ্য সতর্কতা জারি' }
            ],
            memberCountries: [
                'Bangladesh', 'United States', 'United Kingdom', 'India', 'China', 'Germany', 'France', 'Japan', 'Brazil', 'Canada',
                'Australia', 'South Africa', 'Saudi Arabia', 'Indonesia', 'Nigeria', 'Pakistan', 'Russia', 'Egypt', 'Turkey', 'Mexico'
            ]
        },
        {
            id: 'world_bank',
            name: { en: 'World Bank Group (WBG)', bn: 'বিশ্ব ব্যাংক গোষ্ঠী (WBG)' },
            acronym: 'WBG',
            icon: '🏦',
            flag: '🏛️',
            type: { en: 'International Financial Institution', bn: 'আন্তর্জাতিক অর্থনৈতিক উন্নয়ন প্রতিষ্ঠান' },
            headquarters: { en: 'Washington, D.C., United States', bn: 'ওয়াশিংটন, ডি.সি., মার্কিন যুক্তরাষ্ট্র' },
            hqCity: 'Washington',
            lat: 38.8987,
            lng: -77.0427,
            founded: 'July 1944 (Bretton Woods)',
            treaty: { en: 'Bretton Woods Agreement', bn: 'ব্রেটন উডস চুক্তি' },
            leaderTitle: { en: 'President', bn: 'প্রেসিডেন্ট' },
            leader: { en: 'Ajay Banga', bn: 'অজয় বাঙ্গা' },
            languages: { en: 'English, French, Spanish, Arabic, Russian, Chinese', bn: 'ইংরেজি, ফরাসি, স্প্যানিশ' },
            budget: '$70+ Billion annual financing commitments',
            membersCount: 189,
            summary: {
                en: 'Provides low-interest loans, credits, and developmental grants to developing countries to end extreme poverty.',
                bn: 'চরম দারিদ্র্য দূরীকরণ এবং উন্নয়নশীল দেশসমূহে অবকাঠামো ও সামাজিক উন্নয়নে স্বল্প সুদে ঋণ ও অনুদান প্রদানকারী।'
            },
            overview: {
                en: 'The World Bank Group is an international development partnership of 189 member countries. It comprises five institutions: IBRD, IDA, IFC, MIGA, and ICSID, working collectively to foster shared prosperity and eliminate extreme poverty globally.',
                bn: 'বিশ্ব ব্যাংক গোষ্ঠী হলো ৫টি আন্তর্জাতিক উন্নয়ন প্রতিষ্ঠানের একটি সমন্বিত রূপ (আইবিআরডি, আইডিএ, আইএফসি, মিগা ও ইকসিড)। বিশ্বব্যাপী দারিদ্র্য নিরসন এবং জীবনযাত্রার মানোন্নয়নে এটি অর্থায়ন করে।'
            },
            organs: [
                { name: { en: 'IBRD', bn: 'আইবিআরডি' }, role: { en: 'Lends to middle-income and creditworthy low-income governments', bn: 'মধ্যম আয়ের দেশসমূহে উন্নয়ন ঋণ প্রদান' } },
                { name: { en: 'IDA', bn: 'আইডিএ' }, role: { en: 'Provides interest-free loans (credits) and grants to the poorest nations', bn: 'দরিদ্রতম দেশসমূহে সুদহীন দীর্ঘমেয়াদী ঋণ ও অনুদান' } },
                { name: { en: 'IFC', bn: 'আইএফসি' }, role: { en: 'Private sector investment wing in developing nations', bn: 'উন্নয়নশীল দেশে বেসরকারি খাতে বিনিয়োগকারী শাখা' } }
            ],
            keyHighlights: [
                { en: 'Major financier of Bangladesh mega projects (Padma Bridge rail, clean energy)', bn: 'বাংলাদেশের বিদ্যুৎ, শিক্ষা ও অবকাঠামো খাতের বৃহত্তম উন্নয়ন সহযোগী' },
                { en: 'Targeting zero extreme poverty under $2.15 per day by 2030', bn: '২০৩০ সালের মধ্যে দৈনিক ২.১৫ ডলারের নিচে বসবাসকারী চরম দারিদ্র্য শূন্যে নামিয়ে আনার লক্ষ্য' }
            ],
            memberCountries: [
                'United States', 'Japan', 'China', 'Germany', 'United Kingdom', 'France', 'India', 'Bangladesh', 'Saudi Arabia', 'Canada'
            ]
        },
        {
            id: 'imf',
            name: { en: 'International Monetary Fund (IMF)', bn: 'আন্তর্জাতিক মুদ্রা তহবিল (IMF)' },
            acronym: 'IMF',
            icon: '🪙',
            flag: '🌐',
            type: { en: 'International Monetary Organization', bn: 'আন্তর্জাতিক মুদ্রা ও আর্থিক সংস্থা' },
            headquarters: { en: 'Washington, D.C., United States', bn: 'ওয়াশিংটন, ডি.সি., মার্কিন যুক্তরাষ্ট্র' },
            hqCity: 'Washington',
            lat: 38.8994,
            lng: -77.0436,
            founded: 'July 1944 (Operational Dec 1945)',
            treaty: { en: 'Articles of Agreement of the International Monetary Fund', bn: 'আইএমএফ আর্টিকেলস অব এগ্রিমেন্ট' },
            leaderTitle: { en: 'Managing Director', bn: 'ব্যবস্থাপনা পরিচালক' },
            leader: { en: 'Kristalina Georgieva', bn: 'ক্রিস্টালিনা জর্জিয়েভা' },
            languages: { en: 'English, French, Spanish', bn: 'ইংরেজি, ফরাসি, স্প্যানিশ' },
            budget: 'Total Quotas & Resources: Approx. $1 Trillion',
            membersCount: 190,
            summary: {
                en: 'Promotes global financial stability, facilitates international trade, prevents balance-of-payments crises, and manages Special Drawing Rights (SDRs).',
                bn: 'বৈশ্বিক আর্থিক স্থিতিশীলতা, মুদ্রার বিনিময় হার নিয়ন্ত্রণ এবং বৈদেশিক লেনদেনের ভারসাম্য সংকটে আর্থিক সহায়তা প্রদানকারী।'
            },
            overview: {
                en: 'The International Monetary Fund (IMF) works to foster global monetary cooperation, secure financial stability, facilitate international trade, promote high employment and sustainable economic growth, and reduce poverty around the world.',
                bn: 'আন্তর্জাতিক মুদ্রা তহবিল বিশ্বব্যাপী মুদ্রানীতির ভারসাম্য, বৈদেশিক মুদ্রার রিজার্ভ সহায়তা এবং অর্থনৈতিক সংকটে জরুরি ঋণ সহায়তা দিয়ে থাকে।'
            },
            organs: [
                { name: { en: 'Board of Governors', bn: 'বোর্ড অব গভর্নর' }, role: { en: 'Highest decision-making body comprising one Governor from each member country', bn: 'প্রতিটি সদস্য দেশের অর্থমন্ত্রী বা কেন্দ্রীয় ব্যাংক গভর্নরের সমন্বয়ে গঠিত সর্বোচ্চ পরিষদ' } },
                { name: { en: 'Executive Board', bn: 'নির্বাহী বোর্ড' }, role: { en: '24 Executive Directors overseeing daily economic surveillance', bn: '২৪ জন নির্বাহী পরিচালক দ্বারা পরিচালিত অর্থনৈতিক নজরদারি' } }
            ],
            keyHighlights: [
                { en: 'Creates and allocates Special Drawing Rights (SDR) currency basket', bn: 'এসডিআর (স্পেশাল ড্রয়িং রাইটস) আন্তর্জাতিক মুদ্রা বাস্কেট পরিচালনা' },
                { en: 'Provides balance-of-payment stabilization support packages worldwide', bn: 'অর্থনৈতিক অস্থিতিশীলতায় বিভিন্ন দেশের মুদ্রামান ও রিজার্ভ স্থিতিশীল রাখতে সহায়তা' }
            ],
            memberCountries: [
                'United States', 'Japan', 'China', 'Germany', 'France', 'United Kingdom', 'India', 'Bangladesh', 'Italy', 'Canada'
            ]
        },
        {
            id: 'unesco',
            name: { en: 'UNESCO', bn: 'ইউনেস্কো (UNESCO)' },
            acronym: 'UNESCO',
            icon: '🏛️',
            flag: '🏛️',
            type: { en: 'UN Educational, Scientific and Cultural Organization', bn: 'জাতিসংঘ শিক্ষা, বিজ্ঞান ও সংস্কৃতি সংস্থা' },
            headquarters: { en: 'Paris, France', bn: 'প্যারিস, ফ্রান্স' },
            hqCity: 'Paris',
            lat: 48.8500,
            lng: 2.3060,
            founded: 'November 16, 1945',
            treaty: { en: 'UNESCO Constitution (London Conference)', bn: 'ইউনেস্কো সংবিধান' },
            leaderTitle: { en: 'Director-General', bn: 'মহাপরিচালক' },
            leader: { en: 'Audrey Azoulay', bn: 'অড্রে আজৌলে' },
            languages: { en: 'English, French, Spanish, Russian, Arabic, Chinese', bn: 'ইংরেজি, ফরাসি, স্প্যানিশ' },
            budget: '$535 Million (Regular biennial)',
            membersCount: 194,
            summary: {
                en: 'Protects cultural heritage, promotes scientific innovation, literacy, freedom of expression, and designates World Heritage Sites.',
                bn: 'বিশ্ব ঐতিহ্যবাহী স্থানসমূহ সংরক্ষণ, শিক্ষা বিস্তার, বৈজ্ঞানিক গবেষণা ও সাংস্কৃতিক ঐতিহ্য সংরক্ষণে নিয়োজিত।'
            },
            overview: {
                en: 'The United Nations Educational, Scientific and Cultural Organization (UNESCO) aims to promote world peace and security through international cooperation in education, sciences, culture, communication and information.',
                bn: 'শিক্ষা, বিজ্ঞান ও সংস্কৃতির ক্ষেত্রে আন্তর্জাতিক সহযোগিতার মাধ্যমে বিশ্বশান্তি নিশ্চিত করতে ইউনেস্কো গঠিত হয়। সুন্দরবন, পাহাড়পুর বৌদ্ধ বিহার ও ঐতিহাসিক ষাট গম্বুজ মসজিদকে এটি বিশ্ব ঐতিহ্য ঘোষণা করেছে।'
            },
            organs: [
                { name: { en: 'World Heritage Committee', bn: 'বিশ্ব ঐতিহ্য কমিটি' }, role: { en: 'Selects cultural and natural World Heritage Sites', bn: 'বিশ্ব ঐতিহ্যবাহী সাংস্কৃতিক ও প্রাকৃতিক স্থান নির্বাচন' } }
            ],
            keyHighlights: [
                { en: 'Recognized 21st February as International Mother Language Day in 1999 honoring Bangla language martyrs', bn: '১৯৯৯ সালে ২১শে ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে ঐতিহাসিক স্বীকৃতি প্রদান' },
                { en: 'Protects over 1,199 World Heritage Sites worldwide (including Sundarbans)', bn: 'সুন্দরবনসহ বিশ্বব্যাপী ১১৯৯টির বেশি বিশ্ব ঐতিহ্যবাহী স্থান সংরক্ষণ' }
            ],
            memberCountries: [
                'Bangladesh', 'France', 'United Kingdom', 'India', 'Japan', 'Egypt', 'Italy', 'Spain', 'Germany', 'Greece'
            ]
        },
        {
            id: 'unicef',
            name: { en: 'UNICEF', bn: 'ইউনিসেফ (UNICEF)' },
            acronym: 'UNICEF',
            icon: '👶',
            flag: '🌐',
            type: { en: 'UN Children\'s Fund', bn: 'জাতিসংঘ শিশু তহবিল' },
            headquarters: { en: 'New York City, United States', bn: 'নিউ ইয়র্ক সিটি, মার্কিন যুক্তরাষ্ট্র' },
            hqCity: 'New York',
            lat: 40.7503,
            lng: -73.9686,
            founded: 'December 11, 1946',
            treaty: { en: 'UN General Assembly Resolution 57(I)', bn: 'জাতিসংঘ সাধারণ পরিষদ প্রস্তাবনা' },
            leaderTitle: { en: 'Executive Director', bn: 'নির্বাহী পরিচালক' },
            leader: { en: 'Catherine M. Russell', bn: 'ক্যাথরিন রাসেল' },
            languages: { en: 'English, French, Spanish, Arabic', bn: 'ইংরেজি, ফরাসি, স্প্যানিশ' },
            budget: '$8.8 Billion annual contributions',
            membersCount: 192,
            summary: {
                en: 'Advocates for children\'s rights, child protection, maternal health, primary education, and emergency humanitarian relief in 190+ countries.',
                bn: 'বিশ্বের ১৯০টিরও বেশি দেশে শিশুদের অধিকার রক্ষা, পুষ্টি, প্রাথমিক শিক্ষা ও টিকাদান কর্মসূচিতে নিয়োজিত।'
            },
            overview: {
                en: 'The United Nations Children\'s Fund (UNICEF) provides humanitarian and developmental aid to children worldwide, prioritizing child survival, clean water access, polio vaccines, and education.',
                bn: 'ইউনিসেফ বিশ্বব্যাপী শিশুদের জীবনরক্ষা, শিশুশ্রম প্রতিরোধ, সার্বজনীন টিকাদান এবং কন্যাশিশুদের শিক্ষায় কাজ করে।'
            },
            organs: [
                { name: { en: 'Executive Board', bn: 'নির্বাহী বোর্ড' }, role: { en: '36 government representatives managing policies and budgets', bn: '৩৬টি সদস্য দেশের সরকারি প্রতিনিধির সমন্বয়ে গঠিত নীতি নির্ধারণী পর্ষদ' } }
            ],
            keyHighlights: [
                { en: 'Procures and distributes over 2 billion vaccine doses annually for children', bn: 'প্রতি বছর শিশুদের জন্য ২০০ কোটির বেশি ভ্যাকসিনের ডোজ সরবরাহ' },
                { en: 'Awarded the Nobel Peace Prize in 1965', bn: '১৯৬৫ সালে নোবেল শান্তি পুরস্কার অর্জন' }
            ],
            memberCountries: [
                'Bangladesh', 'United States', 'United Kingdom', 'Canada', 'Sweden', 'Norway', 'India', 'Germany', 'Japan', 'Australia'
            ]
        },
        {
            id: 'wto',
            name: { en: 'World Trade Organization (WTO)', bn: 'বিশ্ব বাণিজ্য সংস্থা (WTO)' },
            acronym: 'WTO',
            icon: '📦',
            flag: '🌐',
            type: { en: 'International Trade Organization', bn: 'আন্তর্জাতিক বাণিজ্য নিয়ন্ত্রক সংস্থা' },
            headquarters: { en: 'Geneva, Switzerland', bn: 'জেনেভা, সুইজারল্যান্ড' },
            hqCity: 'Geneva',
            lat: 46.2238,
            lng: 6.1472,
            founded: 'January 1, 1995',
            treaty: { en: 'Marrakesh Agreement (superseding GATT 1947)', bn: 'ম্যারাকেশ চুক্তি (মরক্কো)' },
            leaderTitle: { en: 'Director-General', bn: 'মহাপরিচালক' },
            leader: { en: 'Ngozi Okonjo-Iweala', bn: 'এনগোজি ওকোঞ্জো-আইওয়েলা' },
            languages: { en: 'English, French, Spanish', bn: 'ইংরেজি, ফরাসি, স্প্যানিশ' },
            budget: '205 Million Swiss Francs',
            membersCount: 164,
            summary: {
                en: 'Regulates international trade, negotiates global tariff agreements, and resolves commercial disputes between sovereign trading partners.',
                bn: 'আন্তর্জাতিক বাণিজ্যের নিয়মকানুন প্রণয়ন, শুল্ক হ্রাস এবং বাণিজ্যিক বিরোধ নিষ্পত্তিতে নিয়োজিত।'
            },
            overview: {
                en: 'The World Trade Organization (WTO) is the only global international organization dealing with the rules of trade between nations. It operates agreements negotiated and signed by the bulk of the world\'s trading nations.',
                bn: 'বিশ্ব বাণিজ্য সংস্থা বিশ্বের প্রধান বাণিজ্যিক দেশগুলোর মধ্যে মুক্ত বাণিজ্য, শুল্কমুক্ত সুবিধা ও বাণিজ্যিক বিরোধ নিষ্পত্তি তদারকি করে।'
            },
            organs: [
                { name: { en: 'Dispute Settlement Body (DSB)', bn: 'বিরোধ নিষ্পত্তি শাখা' }, role: { en: 'Adjudicates international trade disputes between sovereign nations', bn: 'সার্বভৌম দেশসমূহের মধ্যে বাণিজ্যিক বিরোধের বিচারিক নিষ্পত্তি' } }
            ],
            keyHighlights: [
                { en: 'Governs over 98% of world trade and international shipping transactions', bn: 'বিশ্বের ৯৮% বাণিজ্যিক লেনদেন ডব্লিউটিও-এর নীতিমালার আওতায় পরিচালিত' }
            ],
            memberCountries: [
                'United States', 'China', 'Germany', 'Japan', 'United Kingdom', 'India', 'Bangladesh', 'South Korea', 'Brazil', 'France'
            ]
        },
        {
            id: 'nato',
            name: { en: 'North Atlantic Treaty Organization (NATO)', bn: 'উত্তর আটলান্টিক চুক্তি সংস্থা (NATO)' },
            acronym: 'NATO',
            icon: '🛡️',
            flag: '⚔️',
            type: { en: 'Military Defense Alliance', bn: 'সামরিক প্রতিরক্ষা জোট' },
            headquarters: { en: 'Brussels, Belgium', bn: 'ব্রাসেলস, বেলজিয়াম' },
            hqCity: 'Brussels',
            lat: 50.8778,
            lng: 4.4256,
            founded: 'April 4, 1949',
            treaty: { en: 'North Atlantic Treaty (Washington Treaty)', bn: 'উত্তর আটলান্টিক চুক্তি (ওয়াশিংটন চুক্তি)' },
            leaderTitle: { en: 'Secretary General', bn: 'মহাসচিব' },
            leader: { en: 'Mark Rutte', bn: 'মার্ক রুটে' },
            languages: { en: 'English, French', bn: 'ইংরেজি, ফরাসি' },
            budget: '$3.8 Billion (Civil & Military HQ Budgets); $1.4T collective military spending',
            membersCount: 32,
            summary: {
                en: 'Collective security alliance of 32 North American and European nations bound by Article 5 mutual defense.',
                bn: 'উত্তর আমেরিকা ও ইউরোপের ৩২টি দেশের পারস্পরিক সামরিক প্রতিরক্ষা জোট, যার মূল ভিত্তি অনুচ্ছেদ ৫ (একজনের ওপর আক্রমণ সকলের ওপর আক্রমণ)।'
            },
            overview: {
                en: 'NATO is an intergovernmental military alliance consisting of 32 member states (30 European and 2 North American). Article 5 states that an armed attack against one member in Europe or North America is considered an attack against them all.',
                bn: 'ন্যাটো হলো উত্তর আমেরিকা ও ইউরোপীয় দেশসমূহের যৌথ সামরিক জোট। স্নায়ুযুদ্ধের সময় গঠিত এই জোটের অনুচ্ছেদ ৫ অনুযায়ী কোনো সদস্য আক্রান্ত হলে যৌথভাবে প্রতিরোধ গড়ে তোলা হয়।'
            },
            organs: [
                { name: { en: 'North Atlantic Council (NAC)', bn: 'উত্তর আটলান্টিক কাউন্সিল' }, role: { en: 'Principal political decision-making body', bn: 'প্রধান রাজনৈতিক নীতি নির্ধারণী পরিষদ' } },
                { name: { en: 'Military Committee', bn: 'মিলিটারি কমিটি' }, role: { en: 'Advises the Council on military policy and doctrine', bn: 'সামরিক নীতি ও কৌশল নির্ধারণী কমিটি' } }
            ],
            keyHighlights: [
                { en: 'Invoked Article 5 collective defense for the first time following 9/11 attacks in 2001', bn: '২০০১ সালের ১১ সেপ্টেম্বরের হামলার পর ইতিহাসে প্রথমবারের মতো অনুচ্ছেদ ৫ কার্যকর করা হয়' },
                { en: 'Expanded in 2023–2024 with the historic admissions of Finland (31st) and Sweden (32nd)', bn: '২০২৩ ও ২০২৪ সালে ফিনল্যান্ড ও সুইডেনের অন্তর্ভুক্তির মাধ্যমে ৩২ সদস্যে উন্নীত' }
            ],
            memberCountries: [
                'United States', 'United Kingdom', 'France', 'Germany', 'Canada', 'Italy', 'Turkey', 'Poland', 'Spain', 'Netherlands',
                'Belgium', 'Norway', 'Denmark', 'Finland', 'Sweden', 'Greece', 'Portugal', 'Czech Republic', 'Hungary', 'Romania',
                'Bulgaria', 'Slovakia', 'Croatia', 'Estonia', 'Latvia', 'Lithuania', 'Slovenia', 'Albania', 'Montenegro', 'North Macedonia', 'Iceland', 'Luxembourg'
            ]
        },
        {
            id: 'eu',
            name: { en: 'European Union (EU)', bn: 'ইউরোপীয় ইউনিয়ন (EU)' },
            acronym: 'EU',
            icon: '🇪🇺',
            flag: '🇪🇺',
            type: { en: 'Supranational Political & Economic Union', bn: 'ইউরোপীয় রাজনৈতিক ও অর্থনৈতিক ইউনিয়ন' },
            headquarters: { en: 'Brussels, Belgium', bn: 'ব্রাসেলস, বেলজিয়াম' },
            hqCity: 'Brussels',
            lat: 50.8430,
            lng: 4.3820,
            founded: 'November 1, 1993 (Maastricht Treaty)',
            treaty: { en: 'Treaty on European Union (Maastricht)', bn: 'মাস্ট্রিখট চুক্তি' },
            leaderTitle: { en: 'President of the European Commission', bn: 'ইউরোপীয় কমিশনের প্রেসিডেন্ট' },
            leader: { en: 'Ursula von der Leyen', bn: 'উরসুলা ভন ডার লিয়েন' },
            languages: { en: '24 Official Languages (English, French, German, etc.)', bn: '২৪টি সরকারি ভাষা' },
            budget: '€186 Billion (Annual budget); Combined GDP: Approx. $19.3 Trillion',
            membersCount: 27,
            summary: {
                en: 'Supranational economic and political union of 27 European member states operating the single market and Schengen free movement.',
                bn: '২৭টি ইউরোপীয় দেশের একক অর্থনৈতিক বাজার, শেঞ্জেন ভিসা মুক্ত চলাচল এবং ইউরো মুদ্রা পরিচালনাকারী সর্ববৃহৎ ইউনিয়ন।'
            },
            overview: {
                en: 'The European Union (EU) is a unique economic and political union between 27 EU countries that together cover much of the European continent. It operates an internal single market, free movement of goods and persons (Schengen Zone), and the Euro (€) currency shared by 20 Eurozone nations.',
                bn: 'ইউরোপীয় ইউনিয়ন হলো ইউরোপের ২৭টি সার্বভৌম দেশের রাজনৈতিক ও অর্থনৈতিক ঐক্যজোট। একক বাজার ব্যবস্থা, ২০টি দেশে একক মুদ্রা ইউরো (€) এবং শেনজেন অঞ্চলের মাধ্যমে এটি বিশ্বের অন্যতম অর্থনৈতিক পরাশক্তি।'
            },
            organs: [
                { name: { en: 'European Commission', bn: 'ইউরোপীয় কমিশন' }, role: { en: 'Executive branch proposing legislation and implementing decisions', bn: 'আইন প্রস্তাব ও বাস্তবায়নকারী প্রধান নির্বাহী অঙ্গ' } },
                { name: { en: 'European Parliament', bn: 'ইউরোপীয় পার্লামেন্ট' }, role: { en: 'Directly elected legislative body based in Strasbourg & Brussels (720 MEPs)', bn: 'সরাসরি ভোটে নির্বাচিত ইউরোপীয় আইনসভা' } },
                { name: { en: 'European Central Bank (ECB)', bn: 'ইউরোপীয় সেন্ট্রাল ব্যাংক' }, role: { en: 'Frankfurt-based monetary authority managing the Euro currency', bn: 'জার্মানির ফ্রাঙ্কফুর্টে অবস্থিত ইউরো মুদ্রার কেন্দ্রীয় ব্যাংক' } }
            ],
            keyHighlights: [
                { en: 'Single market of 450 million consumers with free movement of goods and services', bn: '৪৫০ মিলিয়ন ভোক্তার একক উন্মুক্ত বাজার ও মুক্ত বাণিজ্য' },
                { en: 'Awarded the Nobel Peace Prize in 2012 for advancing peace and reconciliation in Europe', bn: '২০১২ সালে ইউরোপে শান্তি ও গণতন্ত্র প্রতিষ্ঠায় নোবেল শান্তি পুরস্কার লাভ' }
            ],
            memberCountries: [
                'Germany', 'France', 'Italy', 'Spain', 'Poland', 'Netherlands', 'Belgium', 'Sweden', 'Austria', 'Denmark',
                'Finland', 'Ireland', 'Portugal', 'Greece', 'Czech Republic', 'Romania', 'Hungary', 'Slovakia', 'Bulgaria', 'Croatia',
                'Lithuania', 'Slovenia', 'Latvia', 'Estonia', 'Cyprus', 'Luxembourg', 'Malta'
            ]
        },
        {
            id: 'brics',
            name: { en: 'BRICS', bn: 'ব্রিকস (BRICS)' },
            acronym: 'BRICS',
            icon: '🌐',
            flag: '🌍',
            type: { en: 'Geopolitical & Economic Bloc', bn: 'উদীয়মান অর্থনৈতিক পরাশক্তি জোট' },
            headquarters: { en: 'Shanghai, China (New Development Bank HQ)', bn: 'সাংহাই, চীন (নিউ ডেভেলপমেন্ট ব্যাংক সদর দপ্তর)' },
            hqCity: 'Shanghai',
            lat: 31.2304,
            lng: 121.4737,
            founded: 'June 16, 2009 (Yekaterinburg, Russia)',
            treaty: { en: 'BRICS Summit Declarations', bn: 'ব্রিকস শীর্ষ সম্মেলন সনদ' },
            leaderTitle: { en: 'Rotating Annual Presidency', bn: 'বার্ষিক ঘূর্ণায়মান সভাপতিত্ব' },
            leader: { en: 'Current Chair (Summit Host)', bn: 'শীর্ষ সম্মেলন সভাপতি' },
            languages: { en: 'English, Russian, Hindi, Mandarin, Portuguese, Arabic', bn: 'ইংরেজি, রুশ, হিন্দি, ম্যান্ডারিন, পর্তুগিজ, আরবি' },
            budget: 'New Development Bank (NDB) Capital: $100 Billion',
            membersCount: 9,
            summary: {
                en: 'Major emerging market economic bloc representing over 45% of world population and 28% of global nominal GDP.',
                bn: 'বিশ্ব জনসংখ্যার ৪৫% এবং বৈশ্বিক অর্থনীতির ২৮% নিয়ন্ত্রণকারী উদীয়মান বৃহৎ অর্থনৈতিক পরাশক্তি জোট।'
            },
            overview: {
                en: 'BRICS is an intergovernmental organization comprising Brazil, Russia, India, China, South Africa, and recent 2024 entrants Egypt, Ethiopia, Iran, and the United Arab Emirates. It aims to foster a multipolar world order, challenge Western financial dominance, and promote trade in national currencies.',
                bn: 'ব্রিকস হলো ব্রাজিল, রাশিয়া, ভারত, চীন ও দক্ষিণ আফ্রিকার সমন্বয়ে গঠিত জোট। ২০২৪ সালে এতে মিশর, ইথিওপিয়া, ইরান ও সংযুক্ত আরব আমিরাত যুক্ত হয়। এটি বহুমুখী বিশ্বব্যবস্থা এবং নিজস্ব মুদ্রায় বাণিজ্যে ভূমিকা রাখছে।'
            },
            organs: [
                { name: { en: 'New Development Bank (NDB)', bn: 'নিউ ডেভেলপমেন্ট ব্যাংক' }, role: { en: 'Multilateral development bank funding infrastructure and sustainability', bn: 'অবকাঠামো উন্নয়নে অর্থায়নকারী বৈশ্বিক উন্নয়ন ব্যাংক' } },
                { name: { en: 'Contingent Reserve Arrangement (CRA)', bn: 'রিজার্ভ সহায়তা চুক্তি' }, role: { en: '$100 Billion liquidity framework protecting member currencies', bn: 'সদস্য দেশের মুদ্রার মান রক্ষায় ১০০ বিলিয়ন ডলারের তারল্য তহবিল' } }
            ],
            keyHighlights: [
                { en: 'Represents 45% of humanity and over 35% of global crude oil production', bn: 'বিশ্বের প্রায় অর্ধেক জনসংখ্যা এবং ৩৫% তেল উৎপাদনের নিয়ন্ত্রক' },
                { en: 'Championing de-dollarization and local currency bilateral settlements', bn: 'আন্তর্জাতিক বাণিজ্যে নিজস্ব মুদ্রার ব্যবহার বৃদ্ধিতে অগ্রণী ভূমিকা' }
            ],
            memberCountries: [
                'Brazil', 'Russia', 'India', 'China', 'South Africa', 'Egypt', 'Ethiopia', 'Iran', 'United Arab Emirates'
            ]
        },
        {
            id: 'saarc',
            name: { en: 'SAARC', bn: 'সার্ক (SAARC)' },
            acronym: 'SAARC',
            icon: '🤝',
            flag: '🌏',
            type: { en: 'Regional South Asian Intergovernmental Union', bn: 'দক্ষিণ এশীয় আঞ্চলিক সহযোগিতা সংস্থা' },
            headquarters: { en: 'Kathmandu, Nepal', bn: 'কাঠমান্ডু, নেপাল' },
            hqCity: 'Kathmandu',
            lat: 27.7172,
            lng: 85.3240,
            founded: 'December 8, 1985 (Dhaka, Bangladesh)',
            treaty: { en: 'SAARC Charter (Signed in Dhaka)', bn: 'সার্ক সনদ (ঢাকা শীর্ষ সম্মেলনে স্বাক্ষরিত)' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'Golam Sarwar (Bangladesh)', bn: 'মো. গোলাম সারোয়ার' },
            languages: { en: 'English', bn: 'ইংরেজি' },
            budget: 'Funded proportionally by member state contributions',
            membersCount: 8,
            summary: {
                en: 'Regional union of 8 South Asian nations founded in Dhaka in 1985 to accelerate economic growth and social progress.',
                bn: '১৯৮৫ সালে ঢাকায় প্রতিষ্ঠিত দক্ষিণ এশিয়ার ৮টি দেশের আঞ্চলিক সহযোগিতা ও অর্থনৈতিক জোট।'
            },
            overview: {
                en: 'The South Asian Association for Regional Cooperation (SAARC) was founded in Dhaka, Bangladesh in December 1985 on the visionary diplomatic initiative of Bangladesh. Comprising 8 nations, its member states represent roughly 21% of the world population across South Asia.',
                bn: 'সার্ক হলো দক্ষিণ এশিয়ার ৮টি দেশের আঞ্চলিক সংস্থা। বাংলাদেশের স্বপ্নদর্শী উদ্যোগে ১৯৮৫ সালে ঢাকায় এর আনুষ্ঠানিক যাত্রা শুরু হয়। কৃষি, বাণিজ্য, সংস্কৃতি ও দারিদ্র্য বিমোচনে পারস্পরিক সহযোগিতাই এর উদ্দেশ্য।'
            },
            organs: [
                { name: { en: 'SAARC Secretariat', bn: 'সার্ক সচিবালয়' }, role: { en: 'Permanent coordinating executive body located in Kathmandu, Nepal', bn: 'নেপালের কাঠমান্ডুতে অবস্থিত স্থায়ী প্রশাসনিক কেন্দ্র' } },
                { name: { en: 'South Asian University (SAU)', bn: 'সাউথ এশিয়ান ইউনিভার্সিটি' }, role: { en: 'International university established in New Delhi', bn: 'নয়াদিল্লিতে প্রতিষ্ঠিত যৌথ আন্তর্জাতিক বিশ্ববিদ্যালয়' } },
                { name: { en: 'SAARC Agriculture Centre (SAC)', bn: 'সার্ক কৃষি কেন্দ্র' }, role: { en: 'Located in Dhaka, Bangladesh promoting regional agricultural research', bn: 'ঢাকায় অবস্থিত আঞ্চলিক কৃষি গবেষণা কেন্দ্র' } }
            ],
            keyHighlights: [
                { en: 'Founded in Dhaka in 1985 through the pioneering initiative of Bangladesh', bn: '১৯৮৫ সালে বাংলাদেশের রাজধানী ঢাকায় ঐতিহাসিক শীর্ষ সম্মেলনের মাধ্যমে আত্মপ্রকাশ' },
                { en: 'Administers the South Asian Free Trade Area (SAFTA) agreement', bn: 'সাফটা (SAFTA) শুল্কমুক্ত বাণিজ্য চুক্তি তদারকি' }
            ],
            memberCountries: [
                'Bangladesh', 'India', 'Pakistan', 'Sri Lanka', 'Nepal', 'Bhutan', 'Maldives', 'Afghanistan'
            ]
        },
        {
            id: 'asean',
            name: { en: 'ASEAN', bn: 'আসিয়ান (ASEAN)' },
            acronym: 'ASEAN',
            icon: '🌾',
            flag: '🌏',
            type: { en: 'Southeast Asian Political & Economic Union', bn: 'দক্ষিণ-পূর্ব এশীয় দেশসমূহের সংস্থা' },
            headquarters: { en: 'Jakarta, Indonesia', bn: 'জাকার্তা, ইন্দোনেশিয়া' },
            hqCity: 'Jakarta',
            lat: -6.2383,
            lng: 106.8025,
            founded: 'August 8, 1967 (Bangkok)',
            treaty: { en: 'Bangkok Declaration (ASEAN Declaration)', bn: 'ব্যাংকক ঘোষণা' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'Kao Kim Hourn', bn: 'কাও কিম হোর্ন' },
            languages: { en: 'English (working language)', bn: 'ইংরেজি' },
            budget: 'Combined GDP: Approx. $3.8 Trillion (670M Population)',
            membersCount: 10,
            summary: {
                en: 'Premier political and economic union of 10 Southeast Asian nations driving regional security and free trade.',
                bn: 'দক্ষিণ-পূর্ব এশিয়ার ১০টি দেশের ঐক্যজোট, যা অর্থনৈতিক প্রবৃদ্ধি ও আঞ্চলিক স্থিতিশীলতায় বিশ্বের অন্যতম সফল মডেল।'
            },
            overview: {
                en: 'The Association of Southeast Asian Nations (ASEAN) brings together 10 member nations in Southeast Asia. Operating under the "ASEAN Way" of consensus diplomacy, it manages the ASEAN Free Trade Area (AFTA) and Regional Comprehensive Economic Partnership (RCEP).',
                bn: 'আসিয়ান দক্ষিণ-পূর্ব এশিয়ার ১০টি রাষ্ট্র নিয়ে গঠিত একটি শক্তিশালী সংস্থা। এটি সদস্য দেশসমূহের অর্থনৈতিক প্রবৃদ্ধি, সামাজিক অগ্রগতি এবং সাংস্কৃতিক উন্নয়নে কার্যকর ভূমিকা পালন করছে।'
            },
            organs: [
                { name: { en: 'ASEAN Secretariat', bn: 'আসিয়ান সচিবালয়' }, role: { en: 'Executive coordinating headquarters based in Jakarta', bn: 'জাকার্তায় অবস্থিত নির্বাহী সদর দপ্তর' } }
            ],
            keyHighlights: [
                { en: 'Created the world\'s largest free-trade pact: Regional Comprehensive Economic Partnership (RCEP)', bn: 'বিশ্বের বৃহত্তম বাণিজ্যিক চুক্তি আরসিইপি (RCEP) এর নেতৃত্বদান' },
                { en: 'Represents 670 million citizens and a $3.8 trillion dynamic economic zone', bn: '৬৭০ মিলিয়ন মানুষের বাজার ও দ্রুত বর্ধনশীল ৩.৮ ট্রিলিয়ন ডলারের অর্থনীতি' }
            ],
            memberCountries: [
                'Indonesia', 'Malaysia', 'Singapore', 'Thailand', 'Philippines', 'Vietnam', 'Myanmar', 'Cambodia', 'Laos', 'Brunei'
            ]
        },
        {
            id: 'african_union',
            name: { en: 'African Union (AU)', bn: 'আফ্রিকান ইউনিয়ন (AU)' },
            acronym: 'AU',
            icon: '🌍',
            flag: '🌍',
            type: { en: 'Continental Pan-African Union', bn: 'সমগ্র আফ্রিকা মহাদেশীয় ইউনিয়ন' },
            headquarters: { en: 'Addis Ababa, Ethiopia', bn: 'আদ্দিস আবাবা, ইথিওপিয়া' },
            hqCity: 'Addis Ababa',
            lat: 9.0054,
            lng: 38.7496,
            founded: 'July 9, 2002 (Durban, South Africa)',
            treaty: { en: 'Constitutive Act of the African Union', bn: 'আফ্রিকান ইউনিয়ন সংবিধান' },
            leaderTitle: { en: 'Chairperson of the AU Commission', bn: 'কমিশনের চেয়ারম্যান' },
            leader: { en: 'Moussa Faki Mahamat', bn: 'মুসা ফাকি মাহামাত' },
            languages: { en: 'Arabic, English, French, Portuguese, Spanish, Kiswahili', bn: 'আরবি, ইংরেজি, ফরাসি, সোয়াহিলি' },
            budget: '$650 Million Annual Budget (55 Member States)',
            membersCount: 55,
            summary: {
                en: 'Continental union comprising all 55 countries on the African continent driving Agenda 2063 integration.',
                bn: 'সমগ্র আফ্রিকা মহাদেশের ৫৫টি দেশের সমন্বয়ে গঠিত রাজনৈতিক ও অর্থনৈতিক ঐক্যজোট।'
            },
            overview: {
                en: 'The African Union (AU) succeeded the Organisation of African Unity (OAU) to spearhead Africa\'s rapid socio-economic transformation, eradicate colonialism, resolve conflicts, and establish the African Continental Free Trade Area (AfCFTA).',
                bn: 'আফ্রিকান ইউনিয়ন (এইউ) আফ্রিকার ৫৫টি সার্বভৌম দেশের সম্মিলিত মঞ্চ। মহাদেশীয় শান্তি, গণতন্ত্রায়ন ও একক আফ্রিকান মুক্ত বাণিজ্য এলাকা (AfCFTA) বাস্তবায়নে এটি নিবেদিত।'
            },
            organs: [
                { name: { en: 'Pan-African Parliament', bn: 'প্যান-আফ্রিকান পার্লামেন্ট' }, role: { en: 'Legislative consultative assembly based in Midrand, South Africa', bn: 'দক্ষিণ আফ্রিকায় অবস্থিত মহাদেশীয় পরামর্শ সভা' } },
                { name: { en: 'Peace and Security Council', bn: 'শান্তি ও নিরাপত্তা পরিষদ' }, role: { en: 'Standing decision-making organ for the prevention of conflicts', bn: 'সংঘাত নিরসনে সার্বক্ষণিক কার্যকর পরিষদ' } }
            ],
            keyHighlights: [
                { en: 'Launched the African Continental Free Trade Area (AfCFTA), the largest free trade area by countries', bn: '৫৫ দেশের বিশ্বের সর্ববৃহৎ একক আঞ্চলিক মুক্ত বাণিজ্য এলাকা (AfCFTA) চালু' },
                { en: 'Admitted as a permanent member of the Group of Twenty (G20) in 2023', bn: '২০২৩ সালে আনুষ্ঠানিকভাবে জি২০ (G20) এর স্থায়ী সদস্য হিসেবে অন্তর্ভুক্তি' }
            ],
            memberCountries: [
                'South Africa', 'Egypt', 'Nigeria', 'Ethiopia', 'Kenya', 'Morocco', 'Algeria', 'Ghana', 'Tanzania', 'Uganda',
                'Rwanda', 'Senegal', 'Angola', 'Ivory Coast', 'Tunisia', 'Cameroon', 'Zimbabwe', 'Zambia', 'Mali', 'Mozambique'
            ]
        },
        {
            id: 'arab_league',
            name: { en: 'Arab League', bn: 'আরব লীগ (Arab League)' },
            acronym: 'LAS',
            icon: '🕌',
            flag: '🟢',
            type: { en: 'Regional Union of Arab States', bn: 'আরব দেশসমূহের আঞ্চলিক সংস্থা' },
            headquarters: { en: 'Cairo, Egypt', bn: 'কায়রো, মিশর' },
            hqCity: 'Cairo',
            lat: 30.0444,
            lng: 31.2357,
            founded: 'March 22, 1945',
            treaty: { en: 'Pact of the League of Arab States (Cairo)', bn: 'কায়রো চুক্তি' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'Ahmed Aboul Gheit', bn: 'আহমেদ আবুল গেইত' },
            languages: { en: 'Arabic', bn: 'আরবি' },
            budget: 'Funded by member quotas (Total Arab GDP: $3.5 Trillion)',
            membersCount: 22,
            summary: {
                en: 'Charter alliance of 22 Arab nations across North Africa, the Horn of Africa, and the Arabian Peninsula.',
                bn: 'উত্তর আফ্রিকা ও মধ্যপ্রাচ্যের ২২টি আরব দেশের রাজনৈতিক, অর্থনৈতিক ও সাংস্কৃতিক ঐক্যজোট।'
            },
            overview: {
                en: 'The League of Arab States is a regional organization of Arab countries in and around North Africa, the Horn of Africa and Arabia. It facilitates political coordination, economic cooperation, and solidarity with Palestine.',
                bn: 'আরব লীগ ১৯৪৫ সালে কায়রোতে প্রতিষ্ঠিত হয়। আরব বিশ্বের স্বাধীনতা, ফিলিস্তিনি অধিকার ও অভিন্ন স্বার্থ সংরক্ষণে এটি কাজ করে।'
            },
            organs: [
                { name: { en: 'Council of the Arab League', bn: 'আরব লীগ কাউন্সিল' }, role: { en: 'Supreme authority drawing foreign policy directives', bn: 'পররাষ্ট্র নীতি নির্ধারণী শীর্ষ পরিষদ' } }
            ],
            keyHighlights: [
                { en: 'One of the oldest post-WWII regional international alliances (founded March 1945)', bn: 'জাতিসংঘ প্রতিষ্ঠার পূর্বেই ১৯৪৫ সালের মার্চে প্রতিষ্ঠিত অন্যতম প্রাচীন জোট' }
            ],
            memberCountries: [
                'Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Iraq', 'Jordan', 'Morocco', 'Algeria', 'Kuwait', 'Oman',
                'Bahrain', 'Tunisia', 'Lebanon', 'Libya', 'Sudan', 'Yemen', 'Syria', 'Palestine', 'Somalia', 'Mauritania', 'Djibouti', 'Comoros'
            ]
        },
        {
            id: 'commonwealth',
            name: { en: 'Commonwealth of Nations', bn: 'কমনওয়েলথ (Commonwealth)' },
            acronym: 'CW',
            icon: '👑',
            flag: '🌐',
            type: { en: 'Voluntary Association of Sovereign States', bn: 'সার্বভৌম দেশসমূহের ঐচ্ছিক আন্তর্জাতিক সংস্থা' },
            headquarters: { en: 'Marlborough House, London, United Kingdom', bn: 'মার্লবোরো হাউস, লন্ডন, যুক্তরাজ্য' },
            hqCity: 'London',
            lat: 51.5050,
            lng: -0.1360,
            founded: 'December 11, 1931 (Modern Commonwealth 1949)',
            treaty: { en: 'London Declaration of 1949', bn: 'লন্ডন ঘোষণা (১৯৪৯)' },
            leaderTitle: { en: 'Head of the Commonwealth', bn: 'কমনওয়েলথ প্রধান' },
            leader: { en: 'King Charles III (Symbolic Head) / Patricia Scotland (Sec-Gen)', bn: 'রাজা তৃতীয় চার্লস (সাংবিধানিক প্রধান)' },
            languages: { en: 'English', bn: 'ইংরেজি' },
            budget: 'Financed voluntarily (2.6 Billion citizens)',
            membersCount: 56,
            summary: {
                en: 'Global association of 56 independent member countries bound by shared democratic principles and the Commonwealth Games.',
                bn: 'বিশ্বের ৫৬টি স্বাধীন দেশের আন্তর্জাতিক সংস্থা, যা গণতন্ত্র, মানবাধিকার ও কমনওয়েলথ গেমসের মাধ্যমে সংহতি বজায় রাখে।'
            },
            overview: {
                en: 'The Commonwealth of Nations is a voluntary association of 56 sovereign states, most of which were territories of the former British Empire. Member nations span six continents, representing 2.6 billion people.',
                bn: 'কমনওয়েলথ হলো ৫৬টি স্বাধীন দেশের একটি সংস্থা। বাংলাদেশ ১৯৭২ সালে জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের নেতৃত্বে এর সদস্যপদ লাভ করে।'
            },
            organs: [
                { name: { en: 'Commonwealth Secretariat', bn: 'কমনওয়েলথ সচিবালয়' }, role: { en: 'Administers programs supporting democracy and youth development', bn: 'গণতন্ত্র, সুশাসন ও যুব উন্নয়নে সহায়তা প্রদানকারী সচিবালয়' } }
            ],
            keyHighlights: [
                { en: 'Includes 2.6 billion people (one-third of global population)', bn: 'বিশ্ব জনসংখ্যার এক-তৃতীয়াংশ (২৬০ কোটি মানুষ) এই জোটের অন্তর্ভুক্ত' },
                { en: 'Organizes the quadrennial Commonwealth Games athletics championship', bn: 'প্রতি চার বছর পর পর মর্যাদাপূর্ণ কমনওয়েলথ গেমস ক্রীড়া প্রতিযোগিতা আয়োজন' }
            ],
            memberCountries: [
                'Bangladesh', 'United Kingdom', 'India', 'Canada', 'Australia', 'South Africa', 'New Zealand', 'Pakistan', 'Malaysia', 'Nigeria',
                'Kenya', 'Ghana', 'Singapore', 'Sri Lanka', 'Jamaica', 'Barbados', 'Maldives', 'Uganda', 'Tanzania', 'Rwanda'
            ]
        },
        {
            id: 'opec',
            name: { en: 'OPEC', bn: 'ওপেক (OPEC)' },
            acronym: 'OPEC',
            icon: '🛢️',
            flag: '🛢️',
            type: { en: 'Petroleum Exporting Cartel', bn: 'তেল রপ্তানিকারক দেশসমূহের সংস্থা' },
            headquarters: { en: 'Vienna, Austria', bn: 'ভিয়েনা, অস্ট্রিয়া' },
            hqCity: 'Vienna',
            lat: 48.2162,
            lng: 16.3688,
            founded: 'September 14, 1960 (Baghdad)',
            treaty: { en: 'Baghdad Conference Statute', bn: 'বাগদাদ চুক্তি' },
            leaderTitle: { en: 'Secretary General', bn: 'মহাসচিব' },
            leader: { en: 'Haitham Al Ghais (Kuwait)', bn: 'হাইথাম আল ঘাইস' },
            languages: { en: 'English', bn: 'ইংরেজি' },
            budget: 'Member contributions; Oversees 80% of world proven oil reserves',
            membersCount: 12,
            summary: {
                en: 'Cartel of major oil-exporting nations coordinating petroleum policies and securing market stability.',
                bn: 'বিশ্বের প্রায় ৮০% প্রমাণিত খনিজ তেল মজুদের নিয়ন্ত্রণকারী তেল রপ্তানিকারক দেশগুলোর সমন্বয়কারী সংস্থা।'
            },
            overview: {
                en: 'The Organization of the Petroleum Exporting Countries (OPEC) coordinates petroleum production policies among member countries to secure fair prices for petroleum producers and a regular supply to consuming nations.',
                bn: 'ওপেক আন্তর্জাতিক বাজারে অপরিশোধিত জ্বালানি তেলের দাম নিয়ন্ত্রণ এবং সরবরাহ স্থিতিশীল রাখতে নীতি প্রণয়ন করে।'
            },
            organs: [
                { name: { en: 'OPEC Ministerial Conference', bn: 'ওপেক মন্ত্রী পর্যায়ের সম্মেলন' }, role: { en: 'Sets binding crude oil production quotas', bn: 'সদস্য দেশগুলোর তেল উত্তোলন কোটা নির্ধারণ' } }
            ],
            keyHighlights: [
                { en: 'Controls approximately 80% of the world\'s proven petroleum reserves', bn: 'বিশ্বের মোট খনিজ তেল মজুদের প্রায় ৮০ শতাংশের নিয়ন্ত্রক' }
            ],
            memberCountries: [
                'Saudi Arabia', 'Iraq', 'United Arab Emirates', 'Kuwait', 'Iran', 'Algeria', 'Nigeria', 'Libya', 'Venezuela', 'Congo', 'Gabon', 'Equatorial Guinea'
            ]
        },
        {
            id: 'icj',
            name: { en: 'International Court of Justice (ICJ)', bn: 'আন্তর্জাতিক বিচার আদালত (ICJ)' },
            acronym: 'ICJ',
            icon: '⚖️',
            flag: '🏛️',
            type: { en: 'Principal Judicial Organ of the United Nations', bn: 'জাতিসংঘের প্রধান বিচারিক অঙ্গ (বিশ্ব আদালত)' },
            headquarters: { en: 'Peace Palace, The Hague, Netherlands', bn: 'পিস প্যালেস, দ্য হেগ, নেদারল্যান্ডস' },
            hqCity: 'The Hague',
            lat: 52.0866,
            lng: 4.2956,
            founded: 'June 1945 (Commenced April 1946)',
            treaty: { en: 'Statute of the International Court of Justice', bn: 'আন্তর্জাতিক বিচার আদালত সংবিধি' },
            leaderTitle: { en: 'President of the Court', bn: 'আদালতের সভাপতি' },
            leader: { en: 'Nawal Salam', bn: 'নাওয়াল সালাম' },
            languages: { en: 'English, French', bn: 'ইংরেজি, ফরাসি' },
            budget: '$30 Million (Allocated via UN Regular Budget)',
            membersCount: 193,
            summary: {
                en: 'Principal judicial body of the UN, resolving legal disputes between sovereign nations and providing advisory opinions.',
                bn: 'জাতিসংঘের শীর্ষ আদালত, যা সার্বভৌম রাষ্ট্রসমূহের পারস্পরিক আইনি বিরোধ এবং আন্তর্জাতিক আইন ব্যাখ্যায় রায় প্রদান করে।'
            },
            overview: {
                en: 'The International Court of Justice (ICJ), sometimes known as the World Court, is one of the six principal organs of the United Nations. Composed of 15 judges elected for nine-year terms, it settles legal disputes submitted to it by states.',
                bn: 'আন্তর্জাতিক বিচার আদালত (আইসিজে) নেদারল্যান্ডসের দ্য হেগের ঐতিহাসিক পিস প্যালেসে অবস্থিত। এটি ১৫ জন আন্তর্জাতিক বিচারকের সমন্বয়ে গঠিত এবং আন্তর্জাতিক বিরোধের চূড়ান্ত আইনি মীমাংসা দেয়।'
            },
            organs: [
                { name: { en: 'Bench of 15 Judges', bn: '১৫ জন বিচারকের বেঞ্চ' }, role: { en: 'Elected by the UN General Assembly and Security Council', bn: 'সাধারণ পরিষদ ও নিরাপত্তা পরিষদ কর্তৃক ৯ বছরের জন্য নির্বাচিত' } }
            ],
            keyHighlights: [
                { en: 'Settled historic maritime boundary delimitation disputes in the Bay of Bengal', bn: 'বঙ্গোপসাগরে সমুদ্রসীমা সংক্রান্ত ঐতিহাসিক বিরোধের আন্তর্জাতিক মীমাংসা' }
            ],
            memberCountries: [
                'All 193 UN Member States are automatically parties to the ICJ Statute'
            ]
        },
        {
            id: 'interpol',
            name: { en: 'Interpol', bn: 'ইন্টারপোল (Interpol)' },
            acronym: 'INTERPOL',
            icon: '👮',
            flag: '🌐',
            type: { en: 'International Criminal Police Organization', bn: 'আন্তর্জাতিক অপরাধ পুলিশ সংস্থা' },
            headquarters: { en: 'Lyon, France', bn: 'লিয়ন, ফ্রান্স' },
            hqCity: 'Lyon',
            lat: 45.7820,
            lng: 4.8570,
            founded: 'September 7, 1923 (Vienna)',
            treaty: { en: 'Constitution of the ICPO-INTERPOL', bn: 'ইন্টারপোল সংবিধান' },
            leaderTitle: { en: 'Secretary General', bn: 'মহাসচিব' },
            leader: { en: 'Valdecy Urquiza', bn: 'ভালদেসি উরকুইজা' },
            languages: { en: 'Arabic, English, French, Spanish', bn: 'আরবি, ইংরেজি, ফরাসি, স্প্যানিশ' },
            budget: '€180 Million Annual Operating Budget',
            membersCount: 196,
            summary: {
                en: 'World\'s largest international police organization facilitating cross-border cooperation and issuing Red Notices.',
                bn: 'বিশ্বের বৃহত্তম আন্তর্জাতিক পুলিশ সংস্থা, যা আন্তঃসীমান্ত অপরাধ দমন ও রেড নোটিশ জারিতে কাজ করে।'
            },
            overview: {
                en: 'INTERPOL facilitates worldwide police cooperation and crime control. Headquartered in Lyon, France, it provides investigative support, forensic databases, and issues color-coded international notices (including Red Notices for wanted fugitives).',
                bn: 'ইন্টারপোল বিশ্বজুড়ে আন্তর্জাতিক অপরাধী, মাদক পাচারকারী ও পলাতক আসামিদের শনাক্ত করতে ১৯6টি দেশের পুলিশ বাহিনীকে সংযুক্ত করে।'
            },
            organs: [
                { name: { en: 'General Assembly', bn: 'সাধারণ পরিষদ' }, role: { en: 'Supreme governing body meeting annually', bn: 'বার্ষিক নীতি নির্ধারণী শীর্ষ সম্মেলন' } },
                { name: { en: 'National Central Bureaus (NCB)', bn: 'জাতীয় কেন্দ্রীয় ব্যুরো (NCB)' }, role: { en: 'Focal points in each member country (e.g., NCB Dhaka in Bangladesh Police)', bn: 'বাংলাদেশ পুলিশের এনসিবি ঢাকাসহ প্রতিটি দেশে স্থাপিত শাখা' } }
            ],
            keyHighlights: [
                { en: 'Maintains global criminal databases containing over 125 million police records', bn: '১২৫ মিলিয়নের বেশি আন্তর্জাতিক অপরাধমূলক ডাটাবেস পরিচালনা' },
                { en: 'Issues Red Notices requesting worldwide apprehension of wanted fugitives', bn: 'পলাতক শীর্ষ অপরাধীদের গ্রেফতারে আন্তর্জাতিক রেড নোটিশ জারি' }
            ],
            memberCountries: [
                'Bangladesh', 'United States', 'United Kingdom', 'France', 'India', 'Japan', 'Germany', 'Canada', 'Australia', 'Brazil'
            ]
        },
        {
            id: 'g20',
            name: { en: 'G20 (Group of Twenty)', bn: 'জি২০ (G20)' },
            acronym: 'G20',
            icon: '🌐',
            flag: '🏛️',
            type: { en: 'Premier Forum for International Economic Cooperation', bn: 'আন্তর্জাতিক অর্থনৈতিক সহযোগিতার শীর্ষ ফোরাম' },
            headquarters: { en: 'Rotating Annual Presidency (No permanent HQ)', bn: 'ঘূর্ণায়মান বার্ষিক সভাপতিত্ব (স্থায়ী সদর দপ্তর নেই)' },
            hqCity: 'Rotating',
            lat: 28.6139,
            lng: 77.2090,
            founded: 'September 26, 1999',
            treaty: { en: 'G20 Leaders\' Declarations', bn: 'জি২০ শীর্ষ ঘোষণা' },
            leaderTitle: { en: 'President (Troika System)', bn: 'প্রেসিডেন্ট (ট্রোইকা)' },
            leader: { en: 'Current Summit Host Leader', bn: 'বর্তমান শীর্ষ সম্মেলন প্রধান' },
            languages: { en: 'English', bn: 'ইংরেজি' },
            budget: 'Represents 85% of Global GDP, 75% of Global Trade, 67% of World Population',
            membersCount: 21,
            summary: {
                en: 'Strategic forum of 19 sovereign states, the European Union, and the African Union commanding 85% of global GDP.',
                bn: 'বিশ্বের ১৯টি বৃহৎ অর্থনীতি, ইউরোপীয় ইউনিয়ন ও আফ্রিকান ইউনিয়নের শীর্ষ ফোরাম, যা বিশ্বের ৮৫% জিডিপি নিয়ন্ত্রণ করে।'
            },
            overview: {
                en: 'The G20 is the premier intergovernmental forum for international economic cooperation, comprising 19 leading countries, the European Union, and the newly admitted African Union. It addresses global issues such as financial stability, climate change, and sustainable debt.',
                bn: 'জি২০ হলো বৈশ্বিক অর্থনীতির মূল চালিকাশক্তি। বিশ্বের মোট বাণিজ্যের ৭৫% এবং মোট উৎপাদনের ৮৫% এর নিয়ন্ত্রণে।'
            },
            organs: [
                { name: { en: 'Finance Track & Sherpa Track', bn: 'ফাইন্যান্স ট্র্যাক ও শেরপা ট্র্যাক' }, role: { en: 'Working groups drafting policy commitments on finance and climate', bn: 'বিশ্ব অর্থব্যবস্থা ও জলবায়ু বিষয়ে মন্ত্রী পর্যায়ের ওয়ার্কিং গ্রুপ' } }
            ],
            keyHighlights: [
                { en: 'Represents 85% of the world\'s total gross domestic product (GDP)', bn: 'বিশ্বের মোট অভ্যন্তরীণ উৎপাদনের ৮৫% প্রতিনিধিত্বকারী' },
                { en: 'Admitted the 55-nation African Union as a permanent member in 2023', bn: '২০২৩ সালে ৫৫ দেশের আফ্রিকান ইউনিয়নকে স্থায়ী সদস্য হিসেবে গ্রহণ' }
            ],
            memberCountries: [
                'United States', 'China', 'Germany', 'Japan', 'India', 'United Kingdom', 'France', 'Italy', 'Brazil', 'Canada',
                'Russia', 'South Korea', 'Australia', 'Mexico', 'Indonesia', 'Saudi Arabia', 'Turkey', 'Argentina', 'South Africa',
                'European Union', 'African Union'
            ]
        },
        {
            id: 'g7',
            name: { en: 'G7 (Group of Seven)', bn: 'জি৭ (G7)' },
            acronym: 'G7',
            icon: '🌟',
            flag: '🏛️',
            type: { en: 'Forum of Advanced Industrial Democracies', bn: 'উন্নত শিল্পোন্নত গণতান্ত্রিক রাষ্ট্রসমূহের জোট' },
            headquarters: { en: 'Rotating Annual Presidency (No permanent secretariat)', bn: 'ঘূর্ণায়মান বার্ষিক সভাপতিত্ব' },
            hqCity: 'Rotating',
            lat: 48.8566,
            lng: 2.3522,
            founded: '1975 (Rambouillet, France)',
            treaty: { en: 'G7 Summit Communiqués', bn: 'জি৭ শীর্ষ ঘোষণা' },
            leaderTitle: { en: 'Annual Summit Host', bn: 'বার্ষিক শীর্ষ সম্মেলন প্রধান' },
            leader: { en: 'Rotating Head of Government', bn: 'ঘূর্ণায়মান রাষ্ট্রপ্রধান' },
            languages: { en: 'English, French, German, Italian, Japanese', bn: 'ইংরেজি, ফরাসি' },
            budget: 'Combined wealth represents over 50% of global net wealth',
            membersCount: 8,
            summary: {
                en: 'Informal forum of seven of the world\'s advanced economies (USA, UK, Germany, France, Japan, Italy, Canada) plus the EU.',
                bn: 'বিশ্বের শীর্ষ ৭টি উন্নত শিল্পোন্নত অর্থনীতি এবং ইউরোপীয় ইউনিয়নের সমন্বয়ে গঠিত অর্থনৈতিক ও নিরাপত্তা ফোরাম।'
            },
            overview: {
                en: 'The Group of Seven (G7) is an intergovernmental political and economic forum consisting of Canada, France, Germany, Italy, Japan, the United Kingdom, and the United States, with the European Union participating as a non-enumerated member.',
                bn: 'জি৭ বিশ্বের প্রধান শিল্পোন্নত গণতান্ত্রিক রাষ্ট্রগুলোর বাৎসরিক সম্মেলন, যেখানে বিশ্ব নিরাপত্তা, মুক্ত বাণিজ্য ও বৈশ্বিক সংকট নিয়ে যৌথ সিদ্ধান্ত গ্রহণ করা হয়।'
            },
            organs: [
                { name: { en: 'Annual Leaders Summit', bn: 'বার্ষিক শীর্ষ সম্মেলন' }, role: { en: 'Heads of state convening to harmonize security and economic policy', bn: 'নিরাপত্তা ও অর্থনৈতিক নীতি সমন্বয়ে রাষ্ট্রপ্রধানদের বৈঠক' } }
            ],
            keyHighlights: [
                { en: 'Drives global financial sanctions, energy transitions, and advanced tech policy', bn: 'বৈশ্বিক আর্থিক নীতি, জ্বালানি রূপান্তর ও কৃত্রিম বুদ্ধিমত্তা নীতিমালায় প্রধান চালিকাশক্তি' }
            ],
            memberCountries: [
                'United States', 'Japan', 'Germany', 'United Kingdom', 'France', 'Italy', 'Canada', 'European Union'
            ]
        },
        {
            id: 'icrc',
            name: { en: 'International Committee of the Red Cross (ICRC)', bn: 'রেড ক্রস (ICRC)' },
            acronym: 'ICRC',
            icon: '🏥',
            flag: '➕',
            type: { en: 'Humanitarian Institution', bn: 'আন্তর্জাতিক মানবিক প্রতিষ্ঠান' },
            headquarters: { en: 'Geneva, Switzerland', bn: 'জেনেভা, সুইজারল্যান্ড' },
            hqCity: 'Geneva',
            lat: 46.2280,
            lng: 6.1360,
            founded: 'February 17, 1863',
            treaty: { en: 'Geneva Conventions of 1949 and Additional Protocols', bn: 'জেনেভা কনভেনশন' },
            leaderTitle: { en: 'President', bn: 'প্রেসিডেন্ট' },
            leader: { en: 'Mirjana Spoljaric Egger', bn: 'মিরজানা স্পোলজারিক' },
            languages: { en: 'English, French, Spanish, Arabic', bn: 'ইংরেজি, ফরাসি, স্প্যানিশ' },
            budget: 'Approx. 2.4 Billion Swiss Francs',
            membersCount: 196,
            summary: {
                en: 'Custodian of the Geneva Conventions providing impartial humanitarian protection and assistance to victims of armed conflict.',
                bn: 'জেনেভা কনভেনশনের অভিভাবক, যা যুদ্ধ ও সশস্ত্র সংঘাতের শিকার মানুষদের নিরপেক্ষ মানবিক সহায়তা ও চিকিৎসা প্রদান করে।'
            },
            overview: {
                en: 'The International Committee of the Red Cross (ICRC) is a humanitarian institution based in Geneva, Switzerland, and a three-time Nobel Peace Prize laureate. State parties to the Geneva Conventions have mandated the ICRC to protect victims of international and internal armed conflicts.',
                bn: 'রেড ক্রস বিশ্বের প্রাচীনতম ও সবচেয়ে সম্মানিত মানবিক সংস্থা। জেনেভা কনভেনশনের রক্ষক হিসেবে এটি যুদ্ধবন্দী বিনিময়, আহতদের চিকিৎসা ও যুদ্ধবিধ্বস্ত অঞ্চলে খাবার পৌঁছে দেয়।'
            },
            organs: [
                { name: { en: 'Assembly of the ICRC', bn: 'আইসিআরসি পরিষদ' }, role: { en: 'Supreme governing body ensuring strict neutrality and independence', bn: 'নিরপেক্ষতা ও স্বাধীনতা নিশ্চিতকারী সর্বোচ্চ পরিষদ' } }
            ],
            keyHighlights: [
                { en: 'Only organization to win the Nobel Peace Prize three times (1917, 1944, 1963)', bn: 'ইতিহাসের একমাত্র প্রতিষ্ঠান যা তিনবার নোবেল শান্তি পুরস্কার অর্জন করেছে (১৯১৭, ১৯৪৪, ১৯৬৩)' },
                { en: 'Legal custodian of the Geneva Conventions safeguarding prisoners of war', bn: 'যুদ্ধবন্দীদের সুরক্ষা ও চিকিৎসার আইনি অভিভাবক' }
            ],
            memberCountries: [
                'Universally recognized across all 196 signatory states to the Geneva Conventions'
            ]
        },
        {
            id: 'oecd',
            name: { en: 'OECD', bn: 'অর্থনৈতিক সহযোগিতা ও উন্নয়ন সংস্থা (OECD)' },
            acronym: 'OECD',
            icon: '📊',
            flag: '🏛️',
            type: { en: 'Intergovernmental Economic Organization', bn: 'অর্থনৈতিক নীতি ও উন্নয়ন সংস্থা' },
            headquarters: { en: 'Château de la Muette, Paris, France', bn: 'প্যারিস, ফ্রান্স' },
            hqCity: 'Paris',
            lat: 48.8600,
            lng: 2.2690,
            founded: 'September 30, 1961',
            treaty: { en: 'Convention on the Organisation for Economic Co-operation and Development', bn: 'ওইসিডি কনভেনশন' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'Mathias Cormann', bn: 'ম্যাথিয়াস কর্মান' },
            languages: { en: 'English, French', bn: 'ইংরেজি, ফরাসি' },
            budget: '€340 Million Annual Budget',
            membersCount: 38,
            summary: {
                en: 'Organization of 38 democratic market economies collaborating on economic policies, anti-corruption, and taxation standards.',
                bn: '৩৮টি গণতান্ত্রিক ও মুক্তবাজার অর্থনীতির দেশের সংস্থা, যা কর নীতি, দুর্নীতি দমন ও অর্থনৈতিক মানদণ্ড নির্ধারণ করে।'
            },
            overview: {
                en: 'The Organisation for Economic Co-operation and Development (OECD) is an intergovernmental organization with 38 member countries, founded to stimulate economic progress and world trade. It is renowned for authoritative policy data and global minimum tax frameworks.',
                bn: 'ওইসিডি বৈশ্বিক কর ফাঁকি রোধ, পিআইএসএ (PISA) শিক্ষা মূল্যায়ন এবং মুক্তবাজার অর্থনীতির মানদণ্ড নির্ধারণে শীর্ষ প্রতিষ্ঠান।'
            },
            organs: [
                { name: { en: 'OECD Council', bn: 'কাউন্সিল' }, role: { en: 'Overarching decision-making body comprising ambassadors from member states', bn: 'সদস্য রাষ্ট্রসমূহের রাষ্ট্রদূতদের সমন্বয়ে গঠিত পরিষদ' } }
            ],
            keyHighlights: [
                { en: 'Negotiated the historic 136-country Global Minimum Corporate Tax of 15%', bn: '১৩৬টি দেশের সম্মতিতে ১৫% বৈশ্বিক ন্যূনতম কর কাঠামো প্রণয়ন' }
            ],
            memberCountries: [
                'United States', 'United Kingdom', 'Germany', 'Japan', 'France', 'Canada', 'Australia', 'South Korea', 'Italy', 'Netherlands'
            ]
        },
        {
            id: 'bimstec',
            name: { en: 'BIMSTEC', bn: 'বিমসটেক (BIMSTEC)' },
            acronym: 'BIMSTEC',
            icon: '🌊',
            flag: '🌐',
            type: { en: 'Bay of Bengal Regional Initiative', bn: 'বঙ্গোপসাগরীয় আঞ্চলিক অর্থনৈতিক উদ্যোগ' },
            headquarters: { en: 'Gulshan, Dhaka, Bangladesh', bn: 'গুলশান, ঢাকা, বাংলাদেশ' },
            hqCity: 'Dhaka',
            lat: 23.7925,
            lng: 90.4078,
            founded: 'June 6, 1997 (Bangkok)',
            treaty: { en: 'BIMSTEC Charter (Operationalized in Dhaka)', bn: 'বিমসটেক সনদ' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'Indra Mani Pandey', bn: 'ইন্দ্র মনি পান্ডে' },
            languages: { en: 'English', bn: 'ইংরেজি' },
            budget: 'Member contributions; Bridges South and Southeast Asia',
            membersCount: 7,
            summary: {
                en: 'Regional initiative of 7 Bay of Bengal littoral and contiguous nations headquartered permanently in Dhaka, Bangladesh.',
                bn: 'বাংলাদেশের রাজধানী ঢাকায় স্থায়ী সদর দপ্তর অবস্থিত বঙ্গোপসাগর উপকূলীয় ৭টি দেশের আঞ্চলিক সহযোগিতা জোট।'
            },
            overview: {
                en: 'The Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation (BIMSTEC) connects five South Asian nations (Bangladesh, Bhutan, India, Nepal, Sri Lanka) with two Southeast Asian nations (Myanmar, Thailand). Its permanent secretariat is proudly hosted in Dhaka, Bangladesh.',
                bn: 'বিমসটেক হলো দক্ষিণ এশিয়া ও দক্ষিণ-পূর্ব এশিয়ার মধ্যে সংযোগকারী ৭টি দেশের জোট। এর স্থায়ী সচিবালয় বাংলাদেশের রাজধানী ঢাকায় অবস্থিত। বাণিজ্য, বিদ্যুৎ ও সমুদ্র অর্থনীতির বিকাশে এটি নিবেদিত।'
            },
            organs: [
                { name: { en: 'Permanent Secretariat', bn: 'স্থায়ী সচিবালয়' }, role: { en: 'Established in Dhaka, Bangladesh in 2014 to coordinate regional initiatives', bn: '২০১৪ সালে ঢাকায় প্রতিষ্ঠিত সমন্বয়কারী স্থায়ী সচিবালয়' } }
            ],
            keyHighlights: [
                { en: 'Permanent Secretariat proudly hosted in Dhaka, Bangladesh', bn: 'স্থায়ী সচিবালয় বাংলাদেশের রাজধানী ঢাকায় অবস্থিত' },
                { en: 'Unites 1.8 billion people living around the vital Bay of Bengal basin', bn: 'বঙ্গোপসাগর তীরবর্তী ১৮০ কোটি মানুষের আঞ্চলিক সমৃদ্ধির প্ল্যাটফর্ম' }
            ],
            memberCountries: [
                'Bangladesh', 'Bhutan', 'India', 'Myanmar', 'Nepal', 'Sri Lanka', 'Thailand'
            ]
        },
        {
            id: 'oic',
            name: { en: 'Organisation of Islamic Cooperation (OIC)', bn: 'ইসলামী সহযোগিতা সংস্থা (OIC)' },
            acronym: 'OIC',
            icon: '🕌',
            flag: '🟢',
            type: { en: 'Collective Voice of the Muslim World', bn: 'মুসলিম বিশ্বের দ্বিতীয় বৃহত্তম আন্তঃরাষ্ট্রীয় সংস্থা' },
            headquarters: { en: 'Jeddah, Saudi Arabia', bn: 'জেদ্দা, সৌদি আরব' },
            hqCity: 'Jeddah',
            lat: 21.5433,
            lng: 39.1728,
            founded: 'September 25, 1969 (Rabat, Morocco)',
            treaty: { en: 'Charter of the Organisation of Islamic Cooperation', bn: 'ওআইসি সনদ' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'Hissein Brahim Taha', bn: 'হুসেইন ব্রাহিম তাহা' },
            languages: { en: 'Arabic, English, French', bn: 'আরবি, ইংরেজি, ফরাসি' },
            budget: 'Member contributions; 57 Member States across 4 continents',
            membersCount: 57,
            summary: {
                en: 'Second-largest intergovernmental organization after the UN, comprising 57 member states spanning four continents.',
                bn: 'জাতিসংঘের পর বিশ্বের দ্বিতীয় বৃহত্তম আন্তঃরাষ্ট্রীয় সংস্থা, যার সদস্য সংখ্যা ৪টি মহাদেশের ৫৭টি রাষ্ট্র।'
            },
            overview: {
                en: 'The Organisation of Islamic Cooperation (OIC) is the collective voice of the Muslim world, endeavoring to safeguard the interests of its 1.8 billion inhabitants, promote international peace, and support Palestinian statehood.',
                bn: 'ওআইসি ৫৭টি মুসলিম প্রধান দেশের অধিকার ও স্বার্থ সংরক্ষণে নিবেদিত। জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান ১৯৭৪ সালে লাহোরে ঐতিহাসিক সম্মেলনে যোগ দিয়ে বাংলাদেশকে ওআইসির অন্তর্ভুক্ত করেন।'
            },
            organs: [
                { name: { en: 'Islamic Summit', bn: 'ইসলামিক শীর্ষ সম্মেলন' }, role: { en: 'Heads of State gathering triennially to determine high-level policies', bn: 'প্রতি ৩ বছর পর পর রাষ্ট্রপ্রধানদের শীর্ষ সম্মেলন' } },
                { name: { en: 'Islamic Development Bank (IsDB)', bn: 'ইসলামিক ডেভেলপমেন্ট ব্যাংক' }, role: { en: 'Jeddah-based multilateral development bank financing infrastructure', bn: 'জেদ্দায় অবস্থিত বৃহৎ অবকাঠামো অর্থায়নকারী ব্যাংক' } }
            ],
            keyHighlights: [
                { en: 'Bangladesh is an influential member since joining under Bangabandhu in 1974', bn: '১৯৭৪ সালে লাহোর শীর্ষ সম্মেলনে বঙ্গবন্ধুর নেতৃত্বে বাংলাদেশের অন্তর্ভুক্তি' }
            ],
            memberCountries: [
                'Bangladesh', 'Saudi Arabia', 'Turkey', 'Pakistan', 'Indonesia', 'Egypt', 'Malaysia', 'United Arab Emirates', 'Qatar', 'Morocco',
                'Iran', 'Algeria', 'Nigeria', 'Kuwait', 'Oman', 'Jordan', 'Tunisia', 'Senegal', 'Kazakhstan', 'Uzbekistan'
            ]
        },
        {
            id: 'iaea',
            name: { en: 'International Atomic Energy Agency (IAEA)', bn: 'আন্তর্জাতিক পরমাণু শক্তি সংস্থা (IAEA)' },
            acronym: 'IAEA',
            icon: '⚛️',
            flag: '🌐',
            type: { en: 'World Nuclear Watchdog Organization', bn: 'বিশ্বের পারমাণবিক তদারকি সংস্থা' },
            headquarters: { en: 'Vienna International Centre, Vienna, Austria', bn: 'ভিয়েনা, অস্ট্রিয়া' },
            hqCity: 'Vienna',
            lat: 48.2340,
            lng: 16.4170,
            founded: 'July 29, 1957',
            treaty: { en: 'Statute of the International Atomic Energy Agency', bn: 'আইএইএ সংবিধি' },
            leaderTitle: { en: 'Director General', bn: 'মহাপরিচালক' },
            leader: { en: 'Rafael Mariano Grossi', bn: 'রাফায়েল মারিয়ানো গ্রসি' },
            languages: { en: 'Arabic, Chinese, English, French, Russian, Spanish', bn: 'ইংরেজি, ফরাসি, রুশ' },
            budget: '€400+ Million Annual Budget',
            membersCount: 178,
            summary: {
                en: 'Autonomous intergovernmental organization promoting the peaceful use of nuclear energy and verifying non-proliferation safeguards.',
                bn: 'পারমাণবিক শক্তির শান্তিপূর্ণ ব্যবহার নিশ্চিতকরণ এবং পরমাণু অস্ত্রের বিস্তার রোধে জাতিসংঘের সহযোগী সংস্থা।'
            },
            overview: {
                en: 'The IAEA serves as the global forum for scientific and technical cooperation in the peaceful use of nuclear technology and nuclear safety. It conducts inspections under the Nuclear Non-Proliferation Treaty (NPT).',
                bn: 'আন্তর্জাতিক পরমাণু শক্তি সংস্থা (আইএইএ) পারমাণবিক বিদ্যুৎ কেন্দ্রের নিরাপত্তা পরিদর্শন এবং পারমাণবিক অস্ত্রের বিস্তার রোধে কাজ করে। এটি রূপপুর পারমাণবিক বিদ্যুৎ প্রকল্পের আন্তর্জাতিক মান তদারকি করে।'
            },
            organs: [
                { name: { en: 'Department of Safeguards', bn: 'নিরাপত্তা সুরক্ষা বিভাগ' }, role: { en: 'Inspectors conducting on-site nuclear audits worldwide', bn: 'বিশ্বজুড়ে পরমাণু স্থাপনা পরিদর্শনকারী পরিদর্শক দল' } }
            ],
            keyHighlights: [
                { en: 'Oversees safety and fuel safeguards at Bangladesh\'s Rooppur Nuclear Power Plant', bn: 'বাংলাদেশের রূপপুর পারমাণবিক বিদ্যুৎ প্রকল্পের নিরাপত্তা ও জ্বালানি তদারকি' },
                { en: 'Awarded the Nobel Peace Prize in 2005 jointly with Mohamed ElBaradei', bn: '২০০৫ সালে পারমাণবিক নিরাপত্তা রক্ষায় নোবেল শান্তি পুরস্কার লাভ' }
            ],
            memberCountries: [
                'Bangladesh', 'United States', 'Russia', 'France', 'United Kingdom', 'China', 'Germany', 'Japan', 'India', 'Canada'
            ]
        },
        {
            id: 'sco',
            name: { en: 'Shanghai Cooperation Organisation (SCO)', bn: 'সাংহাই সহযোগিতা সংস্থা (SCO)' },
            acronym: 'SCO',
            icon: '🌐',
            flag: '🏛️',
            type: { en: 'Eurasian Security & Economic Alliance', bn: 'ইউরেশীয় নিরাপত্তা ও অর্থনৈতিক জোট' },
            headquarters: { en: 'Beijing, China', bn: 'বেইজিং, চীন' },
            hqCity: 'Beijing',
            lat: 39.9042,
            lng: 116.4074,
            founded: 'June 15, 2001',
            treaty: { en: 'SCO Charter (Saint Petersburg)', bn: 'সাংহাই সনদ' },
            leaderTitle: { en: 'Secretary-General', bn: 'মহাসচিব' },
            leader: { en: 'Zhang Ming', bn: 'ঝাং মিং' },
            languages: { en: 'Chinese, Russian', bn: 'চীনা, রুশ' },
            budget: 'Shared regional security budget',
            membersCount: 10,
            summary: {
                en: 'Eurasian political, economic, international security and defence organization spanning 80% of Eurasia.',
                bn: 'ইউরেশিয়ার প্রায় ৮০% অঞ্চল ও বিশ্ব জনসংখ্যার ৪০% নিয়ন্ত্রণকারী রাজনৈতিক ও নিরাপত্তা জোট।'
            },
            overview: {
                en: 'The Shanghai Cooperation Organisation (SCO) is a trans-regional Eurasian security and economic alliance, including China, Russia, India, Pakistan, Iran, and Central Asian states.',
                bn: 'সাংহাই সহযোগিতা সংস্থা ইউরেশিয়ার নিরাপত্তা, সন্ত্রাসবাদ দমন এবং অর্থনৈতিক বাণিজ্যে সমন্বয় সাধন করে।'
            },
            organs: [
                { name: { en: 'RATS (Regional Anti-Terrorist Structure)', bn: 'আঞ্চলিক সন্ত্রাস দমন শাখা (RATS)' }, role: { en: 'Tashkent-based permanent counter-terrorism intelligence organ', bn: 'তাসখন্দে অবস্থিত স্থায়ী সন্ত্রাস দমন সমন্বয় কেন্দ্র' } }
            ],
            keyHighlights: [
                { en: 'Covers over 80% of the Eurasian landmass and 42% of the world population', bn: 'ইউরেশিয়ার ৮০% ভূখণ্ড এবং বৈশ্বিক জনসংখ্যার ৪২% এর নিয়ন্ত্রক' }
            ],
            memberCountries: [
                'China', 'Russia', 'India', 'Pakistan', 'Iran', 'Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Uzbekistan', 'Belarus'
            ]
        },
        {
            id: 'ioc',
            name: { en: 'International Olympic Committee (IOC)', bn: 'আন্তর্জাতিক অলিম্পিক কমিটি (IOC)' },
            acronym: 'IOC',
            icon: '🏅',
            flag: '🏆',
            type: { en: 'Supreme Authority of the Olympic Movement', bn: 'বিশ্ব অলিম্পিক আন্দোলনের সর্বোচ্চ কর্তৃপক্ষ' },
            headquarters: { en: 'Olympic House, Lausanne, Switzerland', bn: 'লুজান, সুইজারল্যান্ড' },
            hqCity: 'Lausanne',
            lat: 46.5197,
            lng: 6.6323,
            founded: 'June 23, 1894 (Sorbonne, Paris)',
            treaty: { en: 'Olympic Charter', bn: 'অলিম্পিক সনদ' },
            leaderTitle: { en: 'President', bn: 'সভাপতি' },
            leader: { en: 'Thomas Bach', bn: 'থমাস বাখ' },
            languages: { en: 'French, English', bn: 'ফরাসি, ইংরেজি' },
            budget: '$7.6 Billion per 4-year Olympic cycle',
            membersCount: 206,
            summary: {
                en: 'Supreme governing body of modern athletics organizing Summer and Winter Olympic Games across 206 National Olympic Committees.',
                bn: 'গ্রীষ্মকালীন ও শীতকালীন অলিম্পিক ক্রীড়া প্রতিযোগিতার প্রধান নিয়ন্ত্রক ও ২০৬টি দেশের জাতীয় অলিম্পিক কমিটির অভিভাবক।'
            },
            overview: {
                en: 'Founded by Pierre de Coubertin in 1894, the IOC is the non-governmental organization responsible for organizing the modern Olympic Games and spreading the Olympic values of excellence, respect, and friendship worldwide.',
                bn: '১৮৯৪ সালে প্রতিষ্ঠিত আন্তর্জাতিক অলিম্পিক কমিটি বিশ্বের সর্ববৃহৎ ক্রীড়া উৎসব অলিম্পিক গেমস আয়োজন করে থাকে।'
            },
            organs: [
                { name: { en: 'IOC Session', bn: 'আইওসি সাধারণ সভা' }, role: { en: 'Elects host cities for upcoming Olympic Games', bn: 'ভবিষ্যত অলিম্পিক গেমসের স্বাগতিক শহর নির্বাচনকারী' } }
            ],
            keyHighlights: [
                { en: 'Unites 206 National Olympic Committees (more nations than the UN)', bn: '২০৬টি দেশের ক্রীড়াবিদদের অন্তর্ভুক্তকারী (জাতিসংঘের থেকেও বেশি সদস্য)' }
            ],
            memberCountries: [
                'All 206 recognized National Olympic Committees worldwide'
            ]
        }
    ];

    // Expose globally
    window.OrganizationsEngine = {
        getAllOrganizations: function () {
            return worldOrganizationsData;
        },
        getOrganizationById: function (id) {
            return worldOrganizationsData.find(o => o.id === id);
        }
    };

})();
