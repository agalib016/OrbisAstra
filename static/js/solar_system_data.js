// Complete Solar System Dataset - Real Physical Properties, Orbits, Moons & Spacecraft
const solarSystemData = {
    sun: {
        id: 'sun',
        name: { en: 'The Sun', bn: 'সূর্য' },
        category: 'star',
        spectralClass: 'G2V Yellow Dwarf',
        diameter: '1,392,700 km (109 × Earth)',
        mass: '1.989 × 10³⁰ kg (333,000 × Earth)',
        gravity: '274.0 m/s² (27.9 × Earth)',
        surfaceTemp: '5,500 °C (9,932 °F)',
        coreTemp: '15,000,000 °C (27,000,000 °F)',
        distance: 'Center of Solar System',
        rotation: '25.05 days (Equator) / 34.3 days (Poles)',
        orbitPeriod: '230 Million Years (Milky Way Orbit)',
        moons: '8 Planets, 5 Dwarf Planets, 1M+ Asteroids',
        atmosphere: '73.5% Hydrogen, 24.9% Helium, 0.8% Oxygen, 0.3% Carbon',
        overview: {
            en: 'The Sun is the luminous gravitational heart of our solar system, comprising 99.86% of its total mass. Powered by intense thermonuclear fusion at its core, it fuses 600 million tons of hydrogen into helium every second, generating solar wind, magnetic fields, and radiant light that fuels all life and weather across planet Earth.',
            bn: 'সূর্য আমাদের সমগ্র সৌরজগতের প্রাণকেন্দ্র এবং মহাশক্তিধর নিয়ন্ত্রক, যা সৌরজগতের মোট ভরের ৯৯.৮৬ শতাংশ ধারণ করে। এর ১৫ মিলিয়ন ডিগ্রি উত্তপ্ত কেন্দ্রে অবিরাম নিউক্লিয়ার ফিউশনের মাধ্যমে প্রতি সেকেন্ডে ৬০ কোটি টন হাইড্রোজেন হিলিয়ামে রূপান্তরিত হচ্ছে, যা পৃথিবীতে জীবনধারণের জন্য প্রয়োজনীয় আলো ও উষ্ণতার মূল উৎস।'
        },
        missions: {
            en: 'Parker Solar Probe (NASA, reached within 7M km), SOHO (ESA/NASA), Solar Orbiter (ESA), Aditya-L1 (ISRO), STEREO',
            bn: 'পার্কার সোলার প্রোব (নাসা), সোহো (ইউরোপীয় মহাকাশ সংস্থা/নাসা), সোলার অরবিটার, আদিত্য-এল১ (ইসরো)'
        },
        funFact: {
            en: 'Over 1.3 million Earths could fit inside the Sun! Light produced in its core takes 100,000+ years to escape to the surface, but only 8 minutes and 20 seconds to reach Earth.',
            bn: 'সূর্যের ভেতরে প্রায় ১৩ লক্ষ পৃথিবী এঁটে যেতে পারে! সূর্যের কেন্দ্রে উৎপন্ন আলোকের পৃষ্ঠে উঠে আসতে প্রায় ১ লক্ষ বছর সময় লাগে, অথচ পৃষ্ঠ থেকে পৃথিবীতে পৌঁছাতে লাগে মাত্র ৮ মিনিট ২০ সেকেন্ড।'
        },
        color: '#ffaa00',
        radius: 38,
        distanceVal: 0,
        orbitSpeed: 0,
        tilt: 7.25,
        rotationSpeed: 0.002,
        texture: '/static/images/planets/2k_sun.jpg',
        images: [
            '/static/images/planets/2k_sun.jpg',
            'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    mercury: {
        id: 'mercury',
        name: { en: 'Mercury', bn: 'বুধ' },
        category: 'planet',
        planetType: { en: 'Terrestrial / Rocky Planet', bn: 'পাথুরে গ্রহ' },
        diameter: '4,879 km (0.38 × Earth)',
        mass: '3.301 × 10²³ kg (0.055 × Earth)',
        gravity: '3.7 m/s² (0.38 × Earth)',
        surfaceTemp: '-180 °C to 430 °C (-290 °F to 800 °F)',
        distance: '57.9 Million km (0.387 AU)',
        orbitPeriod: '87.97 Earth Days',
        rotation: '58.65 Earth Days',
        moons: '0 Moons',
        atmosphere: 'Trace Exosphere (Oxygen, Sodium, Hydrogen, Helium, Potassium)',
        overview: {
            en: 'Mercury is the smallest planet in the solar system and closest to the Sun. Its surface is ancient and heavily cratered, resembling Earth\'s Moon. Due to lack of a substantial atmosphere to trap heat, it experiences the most extreme temperature swings in the solar system, ranging from 430°C in daylight to -180°C during the frigid nights.',
            bn: 'বুধ সৌরজগতের ক্ষুদ্রতম এবং সূর্যের নিকটতম গ্রহ। এর পৃষ্ঠভাগ প্রাচীন এবং অসংখ্য উল্কাপিণ্ডের আঘাতে সৃষ্ট গহ্বরে আবৃত, যা দেখতে চাঁদের মতোই। বায়ুমণ্ডলের অনুপস্থিতির কারণে বুধের দিনের বেলা তাপমাত্রা ৪৩০ ডিগ্রি সেলসিয়াসে পৌঁছে এবং রাতে হিমাঙ্কের নিচে মাইনাস ১৮০ ডিগ্রি সেলসিয়াসে নেমে চরম রূপ ধারণ করে।'
        },
        missions: {
            en: 'Mariner 10 (1974-1975 flybys), MESSENGER (2011-2015 orbiter), BepiColombo (ESA/JAXA, arriving 2026)',
            bn: 'মেরিনার ১০, মেসেঞ্জার (২০১১-২০১৫), বেপিকলম্বো (ইউরোপীয় মহাকাশ সংস্থা/জাক্সা)'
        },
        funFact: {
            en: 'A year on Mercury is only 88 Earth days, but one solar day (noon to noon) takes 176 Earth days—twice as long as its year!',
            bn: 'বুধের এক বছর মাত্র ৮৮ দিনে পূর্ণ হলেও, এর একটি সূর্যোদয় থেকে পরবর্তী সূর্যোদয় হতে সময় লাগে ১৭৬ পৃথিবী দিন—যা এর পুরো বছরের দ্বিগুণ!'
        },
        color: '#b5a7a7',
        radius: 4.2,
        distanceVal: 180,
        orbitSpeed: 0.040,
        tilt: 0.03,
        rotationSpeed: 0.004,
        texture: '/static/images/planets/2k_mercury.jpg',
        images: [
            '/static/images/planets/2k_mercury.jpg',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    venus: {
        id: 'venus',
        name: { en: 'Venus', bn: 'শুক্র' },
        category: 'planet',
        planetType: { en: 'Terrestrial / Greenhouse Planet', bn: 'পাথুরে / গ্রিনহাউস গ্রহ' },
        diameter: '12,104 km (0.95 × Earth)',
        mass: '4.867 × 10²⁴ kg (0.815 × Earth)',
        gravity: '8.87 m/s² (0.90 × Earth)',
        surfaceTemp: '465 °C (869 °F) Uniform Surface',
        distance: '108.2 Million km (0.723 AU)',
        orbitPeriod: '224.7 Earth Days',
        rotation: '-243.02 Earth Days (Retrograde Rotation)',
        moons: '0 Moons',
        atmosphere: '96.5% Carbon Dioxide, 3.5% Nitrogen, Clouds of Sulfuric Acid',
        overview: {
            en: 'Venus is often called Earth\'s sister planet due to similar size and mass, but it is a hellish greenhouse world. Shrouded in perpetual opaque clouds of concentrated sulfuric acid and an atmosphere 92 times denser than Earth\'s, runaway greenhouse warming makes Venus the hottest planet in the entire solar system.',
            bn: 'শুক্রকে প্রায়শই পৃথিবীর যমজ বোন বলা হয় কারণ এর আকার ও ভর প্রায় পৃথিবীর সমান। তবে এর বায়ুমণ্ডল অত্যন্ত বিষাক্ত ও ঘন, যার ৯৬.৫% কার্বন ডাই-অক্সাইড এবং সালফিউরিক অ্যাসিডের মেঘে ঢাকা। তীব্র গ্রিনহাউস প্রতিক্রিয়ার ফলে ৪৬৫ ডিগ্রি সেলসিয়াস তাপমাত্রার এই গ্রহটি সমগ্র সৌরজগতের সবচেয়ে উত্তপ্ত গ্রহ।'
        },
        missions: {
            en: 'Venera 7 & 13 (USSR landers), Magellan (NASA radar mapping), Venus Express (ESA), Akatsuki (JAXA), upcoming DAVINCI & VERITAS',
            bn: 'ভেনেরার সিরিজ (সোভিয়েত ইউনিয়ন), ম্যাগেলান (নাসা), ভেনাস এক্সপ্রেস (ইউরোপীয় মহাকাশ সংস্থা), আকাতসুকি (জাপান)'
        },
        funFact: {
            en: 'Venus spins backwards (clockwise) compared to most planets, so the Sun rises in the west and sets in the east! Its day is longer than its year.',
            bn: 'শুক্র গ্রহ অন্যান্য গ্রহের উল্টো দিকে (ঘড়ির কাঁটার দিকে) ঘোরে, তাই এখানে সূর্য পশ্চিমে উদিত হয় এবং পূর্বে অস্ত যায়! শুক্রের একটি দিন তার এক বছরের চেয়েও দীর্ঘ।'
        },
        color: '#e3bb76',
        radius: 8.8,
        distanceVal: 270,
        orbitSpeed: 0.028,
        tilt: 177.3,
        rotationSpeed: -0.002,
        texture: '/static/images/planets/2k_venus_atmosphere.jpg',
        images: [
            '/static/images/planets/2k_venus_atmosphere.jpg',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    earth: {
        id: 'earth',
        name: { en: 'Earth', bn: 'পৃথিবী' },
        category: 'planet',
        planetType: { en: 'Terrestrial / Living Oasis', bn: 'পাথুরে / জীবন্ত মরূদ্যান' },
        diameter: '12,742 km (1.00 × Earth)',
        mass: '5.972 × 10²⁴ kg (1.00 × Earth)',
        gravity: '9.807 m/s² (1.00 g)',
        surfaceTemp: '-89 °C to 57 °C (Average 15 °C)',
        distance: '149.6 Million km (1.000 AU)',
        orbitPeriod: '365.256 Days (1 Year)',
        rotation: '23.934 Hours (1 Solar Day)',
        moons: '1 Natural (Moon / Luna), 10,000+ Artificial Satellites',
        atmosphere: '78.08% Nitrogen, 20.95% Oxygen, 0.93% Argon, 0.04% Carbon Dioxide',
        overview: {
            en: 'Earth is our magnificent home planet and the only celestial body in the universe known to harbor living organisms. Covered 70.8% by liquid oceans, wrapped in a protective ozone layer and magnetic shield, Earth sustains millions of diverse species, vibrant human civilizations, 195+ sovereign countries, and awe-inspiring natural wonders.',
            bn: 'পৃথিবী আমাদের একমাত্র নীলাভ আবাসস্থল এবং মহাবিশ্বের একমাত্র জানা গ্রহ যেখানে জীবনের অস্তিত্ব রয়েছে। এর প্রায় ৭১ শতাংশ জলরাশি দ্বারা আবৃত। সুরক্ষাকারী বায়ুমণ্ডল এবং শক্তিশালী চৌম্বকক্ষেত্রের আশ্রয়ে পৃথিবীতে গড়ে উঠেছে কোটি কোটি প্রজাতির জীববৈচিত্র্য, ১৯৫টি সার্বভৌম দেশ এবং অসংখ্য বিস্ময়কর প্রাকৃতিক ও ঐতিহাসিক কীর্তি।'
        },
        missions: {
            en: 'Hubble, ISS, Terra/Aqua, Landsat, Sentinel, GOES, GPS & Galileo Constellations',
            bn: 'হাবল স্পেস টেলিস্কোপ, আন্তর্জাতিক মহাকাশ স্টেশন, জিপিএস নেটওয়ার্ক, শত শত আর্থ অবজারভেশন উপগ্রহ'
        },
        funFact: {
            en: 'Earth is the ONLY celestial body where you can deeply zoom in to inspect countries, borders, 7 wonders, and 4,000+ geographical marvels right down to the ground level!',
            bn: 'সমগ্র সৌরজগতের মধ্যে কেবল পৃথিবীর ক্ষেত্রেই আপনি গভীর জুমে প্রবেশ করে এর প্রতিটি দেশ, সীমানা, সপ্তাশ্চার্য এবং ৪,০০০+ ঐতিহাসিক ও ভৌগোলিক স্থান সরাসরি ঘুরে দেখতে পারবেন!'
        },
        color: '#2b82c9',
        radius: 9.6,
        distanceVal: 380,
        orbitSpeed: 0.020,
        tilt: 23.44,
        rotationSpeed: 0.015,
        texture: '/static/images/earth_8k.jpg',
        hasDeepZoom: true,
        images: [
            '/static/images/earth_8k.jpg',
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    moon: {
        id: 'moon',
        name: { en: 'The Moon (Luna)', bn: 'চাঁদ (লুনা)' },
        category: 'natural_satellite',
        parentBody: 'earth',
        satelliteType: { en: 'Natural Planetary Satellite', bn: 'প্রাকৃতিক উপগ্রহ' },
        diameter: '3,474.8 km (0.27 × Earth)',
        mass: '7.342 × 10²² kg (0.0123 × Earth)',
        gravity: '1.62 m/s² (0.166 × Earth)',
        surfaceTemp: '-130 °C to 120 °C (-202 °F to 248 °F)',
        distance: '384,400 km from Earth (0.00257 AU)',
        orbitPeriod: '27.32 Earth Days (Tidally Locked)',
        rotation: '27.32 Days (Synchronous Rotation)',
        moons: 'None',
        atmosphere: 'Extremely thin exosphere (Helium, Neon, Hydrogen)',
        overview: {
            en: 'The Moon is Earth\'s only natural satellite and the fifth largest moon in the solar system. Formed approximately 4.5 billion years ago likely from a giant collision between proto-Earth and a Mars-sized planetesimal named Theia, the Moon stabilizes Earth\'s axial tilt and generates the ocean tides that helped cradle early terrestrial life.',
            bn: 'চাঁদ পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ এবং সৌরজগতের পঞ্চম বৃহত্তম চাঁদ। প্রায় সাড়ে চারশো কোটি বছর আগে থিয়া নামক আদিম গ্রহের সাথে পৃথিবীর সংঘর্ষের ফলে চাঁদের উৎপত্তি হয়। চাঁদ পৃথিবীর অক্ষের ঘূর্ণন স্থিতিশীল রাখে এবং সাগরে জোয়ার-ভাটা সৃষ্টি করে পৃথিবীর জীবনচক্র পরিচালনায় গুরুত্বপূর্ণ ভূমিকা রাখে।'
        },
        missions: {
            en: 'Apollo 11–17 (12 astronauts walked on surface), Luna, Chang\'e 1–6, Chandrayaan 1–3, Artemis program',
            bn: 'অ্যাপোলো ১১-১৭ (১২ জন মানুষ পদার্পণ করেছেন), লুনা, চ্যাং\'ই ১-৬, চন্দ্রযান ১-৩, আর্টেমিস প্রোগ্রাম'
        },
        funFact: {
            en: 'The Moon is drifting away from Earth at a rate of 3.8 cm (1.5 inches) per year! Because it is tidally locked, we only ever see one side from Earth.',
            bn: 'চাঁদ প্রতি বছর পৃথিবী থেকে প্রায় ৩.৮ সেন্টিমিটার দূরে সরে যাচ্ছে! টাইডাল লকিংয়ের কারণে পৃথিবী থেকে চাঁদের কেবল একটি নির্দিষ্ট পিঠই দৃশ্যমান হয়।'
        },
        color: '#d6d6d6',
        radius: 2.8,
        orbitRadius: 26,
        orbitSpeed: 0.05,
        rotationSpeed: 0.01,
        texture: '/static/images/planets/2k_moon.jpg',
        images: [
            '/static/images/planets/2k_moon.jpg',
            'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    iss: {
        id: 'iss',
        name: { en: 'International Space Station (ISS)', bn: 'আন্তর্জাতিক মহাকাশ স্টেশন (আইএসএস)' },
        category: 'artificial_satellite',
        parentBody: 'earth',
        satelliteType: { en: 'Crewed Habitation Space Station', bn: 'মানববাহী মহাকাশ গবেষণাগার' },
        diameter: '109 m × 73 m (Football Field Size)',
        mass: '450,000 kg (990,000 lbs)',
        gravity: 'Microgravity (0.00001 g effective)',
        surfaceTemp: '-157 °C to 121 °C (External Skin)',
        distance: '420 km Altitude (Low Earth Orbit)',
        orbitPeriod: '92.9 Minutes (15.5 Orbits / Day)',
        rotation: 'Continuous Sun-Tracking Solar Arrays',
        moons: 'Docking for Crew Dragon, Soyuz, Cygnus',
        atmosphere: 'Pressurized Earth Air (78% N₂, 21% O₂ at 1 atm inside)',
        overview: {
            en: 'The International Space Station is the largest and most complex modular structure ever built in outer space. A joint collaboration of NASA, Roscosmos, ESA, JAXA, and CSA, it has been continuously occupied by international astronauts since November 2000, serving as an irreplaceable microgravity laboratory for biology, physics, and deep-space medicine.',
            bn: 'আন্তর্জাতিক মহাকাশ স্টেশন মহাশূন্যে মানুষের তৈরি সর্ববৃহৎ এবং সবচেয়ে জটিল বৈজ্ঞানিক স্থাপনা। নাসা, রসকসমস, এসা, জাক্সা এবং সিএসএ-এর যৌথ উদ্যোগে নির্মিত এই স্টেশনে ২০০০ সালের নভেম্বর থেকে নিরবচ্ছিন্নভাবে মানুষ বসবাস ও আধুনিক বিজ্ঞান গবেষণা পরিচালনা করে আসছে।'
        },
        missions: {
            en: 'Over 70 Expeditions, 270+ spacewalks (EVAs), 3,000+ scientific investigations from 100+ countries',
            bn: '৭০টিরও বেশি অভিযান, ২৭০টিরও বেশি স্পেসওয়াক এবং ৩০০০টিরও বেশি আন্তর্জাতিক বৈজ্ঞানিক পরীক্ষা'
        },
        funFact: {
            en: 'The ISS travels at 27,600 km/h (17,150 mph)—astronauts onboard experience 16 sunrises and sunsets every single day!',
            bn: 'আইএসএস ঘণ্টায় ২৭,৬০০ কিলোমিটার গতিতে পৃথিবীকে প্রদক্ষিণ করে—যার ফলে সেখানকার নভোচারীরা প্রতি ২৪ ঘণ্টায় ১৬ বার সূর্যোদয় ও সূর্যাস্ত দেখতে পান!'
        },
        color: '#00e5ff',
        radius: 1.6,
        orbitRadius: 14.5,
        orbitSpeed: 0.08,
        isCraft: true,
        images: [
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    hubble: {
        id: 'hubble',
        name: { en: 'Hubble Space Telescope', bn: 'হাবল মহাকাশ দূরবীক্ষণ যন্ত্র' },
        category: 'artificial_satellite',
        parentBody: 'earth',
        satelliteType: { en: 'Optical & UV Space Observatory', bn: 'অপটিক্যাল ও ইউভি মহাকাশ মানমন্দির' },
        diameter: '13.2 m length, 4.2 m diameter (School bus size)',
        mass: '11,110 kg',
        gravity: 'Microgravity',
        surfaceTemp: '-128 °C to 93 °C',
        distance: '540 km Altitude (Low Earth Orbit)',
        orbitPeriod: '95.4 Minutes',
        rotation: 'Gyroscopic pointing precision',
        moons: 'None',
        atmosphere: 'High Vacuum',
        overview: {
            en: 'Launched in 1990 aboard Space Shuttle Discovery, the Hubble Space Telescope revolutionized modern astrophysics. Orbiting above Earth\'s distorting atmosphere, Hubble\'s 2.4-meter primary mirror captured the iconic Deep Field images, pinned down the age of the universe to 13.8 billion years, and revealed the acceleration of cosmic expansion.',
            bn: '১৯৯০ সালে স্পেস শাটল ডিসকভারির মাধ্যমে উৎক্ষেপিত হাবল স্পেস টেলিস্কোপ আধুনিক জ্যোতির্বিজ্ঞানের মোড় ঘুরিয়ে দিয়েছে। পৃথিবীর বায়ুমণ্ডলের বাইরে থেকে এটি মহাবিশ্বের গভীরতম দৃশ্য তুলে ধরেছে এবং মহাবিশ্বের বয়স ১৩.৮ বিলিয়ন বছর নির্ধারণে প্রধান ভূমিকা পালন করেছে।'
        },
        missions: {
            en: 'Servicing Missions 1, 2, 3A, 3B, 4 (Final shuttle repair by Atlantis in 2009); 1.5 million+ observations',
            bn: '৫টি সফল শাটল সার্ভিসিং মিশন, দেড় মিলিয়নেরও বেশি ঐতিহাসিক মহাজাগতিক পর্যবেক্ষণ'
        },
        funFact: {
            en: 'Hubble has traveled more than 6.5 billion kilometers along its circular low Earth orbit—equivalent to traveling to Neptune and back!',
            bn: 'হাবল তার কক্ষপথে সাড়ে ছয়শো কোটি কিলোমিটারেরও বেশি দূরত্ব অতিক্রম করেছে—যা পৃথিবী থেকে নেপচুন ঘুরে ফিরে আসার দূরত্বের সমান!'
        },
        color: '#e0e0e0',
        radius: 1.3,
        orbitRadius: 18.0,
        orbitSpeed: 0.07,
        isCraft: true,
        images: [
            'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    jwst: {
        id: 'jwst',
        name: { en: 'James Webb Space Telescope (JWST)', bn: 'জেমস ওয়েব মহাকাশ দূরবীক্ষণ' },
        category: 'artificial_satellite',
        parentBody: 'earth',
        satelliteType: { en: 'Infrared Deep-Space Observatory', bn: 'ইনফ্রারেড গভীর মহাকাশ মানমন্দির' },
        diameter: '20 m × 14 m sunshield, 6.5 m beryllium-gold mirror',
        mass: '6,500 kg',
        gravity: 'Microgravity',
        surfaceTemp: '-233 °C (-388 °F) on cold side',
        distance: '1.5 Million km from Earth (Sun-Earth L2 Lagrange Point)',
        orbitPeriod: 'Halo Orbit around L2 Point (365 Days around Sun)',
        rotation: 'Sunshield oriented continuously to Sun',
        moons: 'None',
        atmosphere: 'Deep Space Interplanetary Vacuum',
        overview: {
            en: 'The James Webb Space Telescope is humanity\'s premier space science observatory. Equipped with an immense 6.5-meter gold-plated beryllium primary mirror and a tennis-court-sized sunshield, JWST peers into the ancient infrared cosmos to photograph the very first stars and galaxies formed after the Big Bang and analyze exoplanet atmospheres for biosignatures.',
            bn: 'জেমস ওয়েব স্পেস টেলিস্কোপ মানবজাতির সর্বাধুনিক এবং সবচেয়ে শক্তিশালী মহাকাশ দূরবীক্ষণ যন্ত্র। এর সাড়ে ছয় মিটার প্রশস্ত স্বর্ণলেপিত বেরিলিয়াম আয়না এবং ইনফ্রারেড সেন্সর বিগ ব্যাং-এর পরপরই সৃষ্টি হওয়া আদিমতম ছায়াপথ ও তারার ছবি তুলতে সক্ষম।'
        },
        missions: {
            en: 'Launched Dec 25, 2021 on Ariane 5; deployed perfectly at Second Sun-Earth Lagrange Point (L2)',
            bn: '২০২১ সালের ২৫ ডিসেম্বর আরিয়ান ৫ রকেটের মাধ্যমে উৎক্ষেপিত হয় এবং পৃথিবী থেকে ১৫ লক্ষ কিমি দূরে দ্বিতীয় ল্যাগ্রাঞ্জ পয়েন্টে অবস্থান করছে'
        },
        funFact: {
            en: 'Webb\'s primary mirror is coated with a microscopic layer of pure gold only 100 nanometers thick—using only 48 grams of gold for all 18 hexagonal segments!',
            bn: 'ওয়েবের সুবিশাল আয়নার উপর মাত্র ৪৮ গ্রাম খাঁটি সোনার একশো ন্যানোমিটার পাতলা প্রলেপ দেওয়া হয়েছে!'
        },
        color: '#ffc107',
        radius: 1.5,
        orbitRadius: 52.0,
        orbitSpeed: 0.02,
        isCraft: true,
        images: [
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    mars: {
        id: 'mars',
        name: { en: 'Mars', bn: 'মঙ্গল' },
        category: 'planet',
        planetType: { en: 'Terrestrial / The Red Planet', bn: 'পাথুরে / লাল গ্রহ' },
        diameter: '6,779 km (0.53 × Earth)',
        mass: '6.417 × 10²³ kg (0.107 × Earth)',
        gravity: '3.72 m/s² (0.38 × Earth)',
        surfaceTemp: '-125 °C to 20 °C (Average -63 °C)',
        distance: '227.9 Million km (1.524 AU)',
        orbitPeriod: '686.98 Earth Days (1.88 Years)',
        rotation: '24.62 Hours (1 Martian Sol)',
        moons: '2 Natural (Phobos & Deimos)',
        atmosphere: '95.3% Carbon Dioxide, 2.6% Nitrogen, 1.9% Argon, Trace Water Vapor',
        overview: {
            en: 'Mars, the Red Planet, is a dusty, cold desert world with a very thin atmosphere. Its rusty crimson hue comes from widespread iron oxide mineral deposits across its regolith. Mars boasts Olympus Mons—the largest volcano in the entire solar system (22 km tall)—and Valles Marineris, a canyon system that dwarfs the Grand Canyon.',
            bn: 'মঙ্গল গ্রহ তার লালচে মরুময় পৃষ্ঠের জন্য "লাল গ্রহ" নামে পরিচিত। এর মাটিতে উপস্থিত আয়রন অক্সাইড বা মরিচার কারণে গ্রহটিকে রক্তিম দেখায়। সৌরজগতের সর্ববৃহৎ আগ্নেয়গিরি অলিম্পাস মনস (উচ্চতা ২২ কিমি) এবং বিশাল গিরিখাত ভ্যালিস মেরিনারিস মঙ্গল গ্রহেই অবস্থিত।'
        },
        missions: {
            en: 'Viking 1 & 2, Pathfinder & Sojourner, Spirit & Opportunity, Curiosity, Perseverance & Ingenuity, Hope (UAE), Tianwen-1 (China)',
            bn: 'ভাইকিং ১ ও ২, কিউরিওসিটি, পারসিভিয়ারেন্স ও ইনজেনুইটি হেলিকপ্টার, তিয়ানওয়েন-১, হোপ প্রোব'
        },
        funFact: {
            en: 'Sunsets on Mars appear distinctly blue due to fine dust particles scattering reddish light, in reverse of Earth\'s sunset colors!',
            bn: 'মঙ্গল গ্রহের সূর্যাস্ত দেখতে নীল রঙের হয়! কারণ এর বায়ুমণ্ডলের অতিসূক্ষ্ম ধূলিকণা লাল আলোকে বিচ্ছুরিত করে নীল আলোকে আমাদের চোখে পৌঁছাতে দেয়।'
        },
        color: '#cc5533',
        radius: 6.2,
        distanceVal: 510,
        orbitSpeed: 0.016,
        tilt: 25.19,
        rotationSpeed: 0.014,
        texture: '/static/images/planets/2k_mars.jpg',
        images: [
            '/static/images/planets/2k_mars.jpg',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    phobos: {
        id: 'phobos',
        name: { en: 'Phobos', bn: 'ফোবোস' },
        category: 'natural_satellite',
        parentBody: 'mars',
        satelliteType: { en: 'Captured Carbonaceous Asteroid Moon', bn: 'প্রাকৃতিক উপগ্রহ / গ্রহাণু চাঁদ' },
        diameter: '22.2 km (Irregular shape)',
        mass: '1.066 × 10¹⁶ kg',
        gravity: '0.0057 m/s²',
        surfaceTemp: '-40 °C',
        distance: '9,376 km from Mars center (Closest moon to any planet!)',
        orbitPeriod: '7.66 Hours (Orbits Mars 3 times a day!)',
        rotation: 'Synchronous',
        moons: 'None',
        atmosphere: 'None',
        overview: {
            en: 'Phobos is the larger and innermost of Mars\' two tiny moons. Heavily cratered with a massive impact scar named Stickney crater, Phobos is slowly spiraling inwards toward Mars and will likely break up into a planetary ring in 30 to 50 million years.',
            bn: 'ফোবোস মঙ্গলের দুটি ক্ষুদ্র চাঁদের মধ্যে বৃহত্তম এবং নিকটতম। এটি মঙ্গলের এত কাছে যে দিনে তিনবার মঙ্গলকে প্রদক্ষিণ করে। এটি ধীরে ধীরে মঙ্গলের দিকে এগিয়ে আসছে এবং প্রায় ৩ থেকে ৫ কোটি বছর পর ভেঙে মঙ্গলের চারপাশে একটি বলয়ে পরিণত হবে।'
        },
        missions: { en: 'Mariner 9, Viking 1, Mars Express, Mars Reconnaissance Orbiter, MMX (JAXA planned)', bn: 'মেরিনার ৯, ভাইকিং ১, মার্স এক্সপ্রেস' },
        funFact: { en: 'From Mars, Phobos rises in the west, races across the sky in just 4 hours, and sets in the east!', bn: 'মঙ্গল থেকে দেখলে ফোবোস পশ্চিমে উদিত হয় এবং মাত্র ৪ ঘণ্টার মধ্যে আকাশ পাড়ি দিয়ে পূর্বে অস্ত যায়!' },
        color: '#9e968f',
        radius: 1.1,
        orbitRadius: 10.5,
        orbitSpeed: 0.07,
        images: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80']
    },
    ceres: {
        id: 'ceres',
        name: { en: 'Ceres (Asteroid Belt)', bn: 'সেরেস (গ্রহাণু বলয়)' },
        category: 'dwarf_planet',
        planetType: { en: 'Dwarf Planet / Queen of Asteroid Belt', bn: 'বামন গ্রহ / গ্রহাণু বলয়ের রানী' },
        diameter: '939 km',
        mass: '9.39 × 10²⁰ kg (1/3 of entire asteroid belt mass)',
        gravity: '0.28 m/s²',
        surfaceTemp: '-106 °C',
        distance: '414 Million km (2.77 AU)',
        orbitPeriod: '4.6 Earth Years',
        rotation: '9.07 Hours',
        moons: 'None',
        atmosphere: 'Transient water vapor plume exosphere',
        overview: {
            en: 'Ceres is the largest object in the Main Asteroid Belt between Mars and Jupiter and the only dwarf planet located inside the orbit of Neptune. Composed of rock and vast water-ice reservoirs, it features luminous reflective sodium carbonate deposits inside Occator Crater.',
            bn: 'সেরেস হলো মঙ্গল এবং বৃহস্পতির মধ্যবর্তী প্রধান গ্রহাণু বলয়ের সর্ববৃহৎ বস্তু এবং নেপচুনের কক্ষপথের ভেতরের একমাত্র বামন গ্রহ। এর বুকে প্রচুর পরিমাণে বরফ ও নোনা পানির অস্তিত্ব রয়েছে।'
        },
        missions: { en: 'Dawn (NASA orbiter from 2015 to 2018)', bn: 'ডন মিশন (নাসা, ২০১৫-২০১৮)' },
        funFact: { en: 'Ceres contains an estimated 25% water by mass—more fresh water than all of Earth\'s lakes and rivers combined!', bn: 'সেরেসের মোট ভরের প্রায় ২৫% হলো পানি—যা পৃথিবীর সমস্ত নদী ও হ্রদের মোট মিষ্টি পানির চেয়েও বেশি!' },
        color: '#a39c94',
        radius: 2.2,
        distanceVal: 650,
        orbitSpeed: 0.012,
        tilt: 4.0,
        rotationSpeed: 0.02,
        images: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80']
    },
    jupiter: {
        id: 'jupiter',
        name: { en: 'Jupiter', bn: 'বৃহস্পতি' },
        category: 'planet',
        planetType: { en: 'Gas Giant / King of Planets', bn: 'গ্যাসীয় দৈত্য / গ্রহরাজ' },
        diameter: '139,820 km (11.0 × Earth)',
        mass: '1.898 × 10²⁷ kg (317.8 × Earth)',
        gravity: '24.79 m/s² (2.53 × Earth)',
        surfaceTemp: '-110 °C at cloud tops',
        distance: '778.5 Million km (5.20 AU)',
        orbitPeriod: '11.86 Earth Years',
        rotation: '9.93 Hours (Fastest spin in solar system!)',
        moons: '95 Confirmed Moons (Io, Europa, Ganymede, Callisto)',
        atmosphere: '89.8% Hydrogen, 10.2% Helium, Traces of Methane, Ammonia, Water Ice',
        overview: {
            en: 'Jupiter is the colossus of the solar system, more than twice as massive as all other planets combined. Wrapped in dynamic alternating jet streams and pastel cloud bands, it houses the legendary Great Red Spot—a gigantic anticyclonic storm larger than Earth that has raged continuously for over 350 years.',
            bn: 'বৃহস্পতি আমাদের সৌরজগতের সর্ববৃহৎ গ্রহ এবং গ্রহরাজ। এর ভর সৌরজগতের অন্যান্য সমস্ত গ্রহের সম্মিলিত ভরের দ্বিগুণেরও বেশি। হাইড্রোজেন ও হিলিয়ামে গঠিত এই গ্যাসীয় দানবের বুকে রয়েছে বিখ্যাত "গ্রেট রেড স্পট"—পৃথিবীর চেয়েও বড় এক কালজয়ী ঘূর্ণিঝড় যা শত শত বছর ধরে অবিরাম ঘুরছে।'
        },
        missions: {
            en: 'Pioneer 10 & 11, Voyager 1 & 2, Galileo (orbiter & atmospheric probe), Cassini, New Horizons, Juno (current orbiter), JUICE (ESA en route)',
            bn: 'ভয়েজার ১ ও ২, গ্যালিলিও, জুনো (বর্তমান প্রদক্ষিণকারী), জুস (ইউরোপীয় মিশন)'
        },
        funFact: {
            en: 'Jupiter has the shortest day of any planet in the solar system—it spins completely around on its axis in less than 10 hours despite its gargantuan size!',
            bn: 'বিশাল আকৃতি সত্ত্বেও বৃহস্পতি তার অক্ষের উপর সবচেয়ে দ্রুত ঘোরে—এর একটি পুরো দিন হতে ১০ ঘণ্টারও কম সময় লাগে!'
        },
        color: '#d4a373',
        radius: 20.0,
        distanceVal: 880,
        orbitSpeed: 0.008,
        tilt: 3.13,
        rotationSpeed: 0.025,
        texture: '/static/images/planets/2k_jupiter.jpg',
        images: [
            '/static/images/planets/2k_jupiter.jpg',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    europa: {
        id: 'europa',
        name: { en: 'Europa', bn: 'ইউরোপা' },
        category: 'natural_satellite',
        parentBody: 'jupiter',
        satelliteType: { en: 'Ice-Crusted Ocean Moon', bn: 'বরফাবৃত মহাসাগরীয় চাঁদ' },
        diameter: '3,121.6 km',
        mass: '4.8 × 10²² kg',
        gravity: '1.315 m/s²',
        surfaceTemp: '-160 °C to -220 °C',
        distance: '670,900 km from Jupiter',
        orbitPeriod: '3.55 Earth Days',
        rotation: 'Synchronous',
        moons: 'None',
        atmosphere: 'Tenous molecular oxygen atmosphere',
        overview: {
            en: 'Europa is one of Jupiter\'s four Galilean moons and the prime candidate in the search for extraterrestrial life in our solar system. Underneath its smooth, crisscrossed ice shell lies a global saltwater ocean containing more than double the liquid water of all Earth\'s oceans combined, warmed by tidal flex heating from Jupiter.',
            bn: 'ইউরোপা বৃহস্পতির অন্যতম প্রধান চাঁদ এবং বহির্জাগতিক প্রাণের সন্ধানে বিজ্ঞানীদের প্রধান লক্ষ্য। এর মসৃণ বরফস্তরের নিচে রয়েছে বিশাল এক নোনা পানির মহাসাগর, যার পানির পরিমাণ পৃথিবীর সমস্ত মহাসাগরের পানির দ্বিগুণেরও বেশি!'
        },
        missions: { en: 'Galileo, New Horizons, Juno, Europa Clipper (NASA launched Oct 2024)', bn: 'গ্যালিলিও, জুনো, ইউরোপা ক্লিপার (নাসা)' },
        funFact: { en: 'Europa\'s ocean floor may feature hydrothermal vents just like Earth\'s deep ocean trenches, providing geothermal energy for life to thrive in complete darkness!', bn: 'ইউরোপার সমুদ্রের তলদেশে পৃথিবীর গভীর সমুদ্রের মতো হাইড্রোথার্মাল ভেন্ট বা উষ্ণ প্রস্রবণ থাকতে পারে, যা সূর্যালোক ছাড়াই জীবন ধারণের শক্তি জোগায়!' },
        color: '#c4d7e0',
        radius: 2.1,
        orbitRadius: 36,
        orbitSpeed: 0.04,
        images: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80']
    },
    ganymede: {
        id: 'ganymede',
        name: { en: 'Ganymede', bn: 'গ্যানিমিড' },
        category: 'natural_satellite',
        parentBody: 'jupiter',
        satelliteType: { en: 'Largest Moon in Solar System', bn: 'সৌরজগতের বৃহত্তম চাঁদ' },
        diameter: '5,268 km (Larger than Mercury & Pluto!)',
        mass: '1.48 × 10²³ kg',
        gravity: '1.428 m/s²',
        surfaceTemp: '-163 °C',
        distance: '1,070,400 km from Jupiter',
        orbitPeriod: '7.15 Earth Days',
        rotation: 'Synchronous',
        moons: 'None',
        atmosphere: 'Trace oxygen atmosphere',
        overview: {
            en: 'Ganymede is the largest moon in the solar system, so colossal that it is larger than planet Mercury and dwarf planet Pluto. It is the only known moon in the universe with its own internally generated magnetic field (magnetosphere), which produces glowing auroras around its polar caps.',
            bn: 'গ্যানিমিড সমগ্র সৌরজগতের সর্ববৃহৎ প্রাকৃতিক উপগ্রহ—যা বুধ গ্রহের চেয়েও আকারে বড়! এটি মহাবিশ্বের একমাত্র জানা চাঁদ যার নিজস্ব সক্রিয় চৌম্বকক্ষেত্র রয়েছে, যার ফলে এর মেরু অঞ্চলে সুন্দর অরোরা বা মেরুজ্যোতি দেখা যায়।'
        },
        missions: { en: 'Pioneer, Voyager, Galileo, Juno, JUICE (ESA dedicated orbiter entering orbit 2034)', bn: 'ভয়েজার, গ্যালিলিও, জুনো, জুস' },
        funFact: { en: 'If Ganymede orbited the Sun directly instead of orbiting Jupiter, it would easily be classified as a full-fledged planet!', bn: 'গ্যানিমিড যদি বৃহস্পতিকে প্রদক্ষিণ না করে সরাসরি সূর্যকে প্রদক্ষিণ করত, তবে এটিকে একটি পূর্ণাঙ্গ গ্রহ হিসেবে গণ্য করা হতো!' },
        color: '#8b8478',
        radius: 3.3,
        orbitRadius: 48,
        orbitSpeed: 0.03,
        images: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80']
    },
    saturn: {
        id: 'saturn',
        name: { en: 'Saturn', bn: 'শনি' },
        category: 'planet',
        planetType: { en: 'Gas Giant / Jewel of the Solar System', bn: 'গ্যাসীয় দৈত্য / বলয়সমৃদ্ধ গ্রহ' },
        diameter: '116,460 km (9.1 × Earth)',
        mass: '5.683 × 10²⁶ kg (95.2 × Earth)',
        gravity: '10.44 m/s² (1.06 × Earth)',
        surfaceTemp: '-140 °C at cloud tops',
        distance: '1.434 Billion km (9.58 AU)',
        orbitPeriod: '29.45 Earth Years',
        rotation: '10.7 Hours',
        moons: '146 Confirmed Moons (Titan, Enceladus, Mimas)',
        atmosphere: '96.3% Hydrogen, 3.25% Helium, Methane, Ammonia',
        overview: {
            en: 'Saturn is the undisputed crown jewel of the solar system, renowned worldwide for its majestic and complex ring system. Spanning 282,000 km across but on average only 10 meters thick, the rings consist of billions of glittering water ice particles, chunks, and boulders orbiting in synchronized celestial harmony.',
            bn: 'শনি সৌরজগতের সবচেয়ে সুন্দর ও নয়নাভিরাম গ্রহ, যা তার সুদৃশ্য বিশাল বলয়মালার জন্য বিশ্বজুড়ে পরিচিত। প্রায় ২ লক্ষ ৮২ হাজার কিলোমিটার চওড়া এই বলয় গড়ে মাত্র ১০ মিটার পুরু, যা কোটি কোটি বরফখণ্ড ও ধূলিকণার সমন্বয়ে গঠিত।'
        },
        missions: {
            en: 'Pioneer 11, Voyager 1 & 2, Cassini-Huygens (monumental 13-year orbiter mission from 2004 to 2017)',
            bn: 'পায়োনিয়ার ১১, ভয়েজার ১ ও ২, ক্যাসিনি-হাইগেনস (২০০৪-২০১৭ ঐতিহাসিক মিশন)'
        },
        funFact: {
            en: 'Saturn is the only planet in the solar system whose average density is less than liquid water (0.687 g/cm³)—if you had a bathtub large enough, Saturn would literally float!',
            bn: 'শনির গড় ঘনত্ব পানির চেয়েও কম (০.৬৮৭ গ্রাম/সিসি)—যদি এত বড় কোনো সমুদ্র পাওয়া যেত, তবে বিশাল এই শনি গ্রহটি পানিতে অবলীলায় ভেসে থাকত!'
        },
        color: '#f4d06f',
        radius: 17.0,
        distanceVal: 1220,
        orbitSpeed: 0.0055,
        tilt: 26.73,
        rotationSpeed: 0.022,
        texture: '/static/images/planets/2k_saturn.jpg',
        hasRings: true,
        ringTexture: '/static/images/planets/2k_saturn_ring_alpha.png',
        images: [
            '/static/images/planets/2k_saturn.jpg',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    titan: {
        id: 'titan',
        name: { en: 'Titan', bn: 'টাইটান' },
        category: 'natural_satellite',
        parentBody: 'saturn',
        satelliteType: { en: 'Methane Ocean Atmosphere Moon', bn: 'ঘন বায়ুমণ্ডল ও মিথেন সাগরের চাঁদ' },
        diameter: '5,149 km (Second largest in solar system)',
        mass: '1.345 × 10²³ kg',
        gravity: '1.352 m/s²',
        surfaceTemp: '-179 °C (-290 °F)',
        distance: '1,221,870 km from Saturn',
        orbitPeriod: '15.94 Earth Days',
        rotation: 'Synchronous',
        moons: 'None',
        atmosphere: '95% Nitrogen, 5% Methane (Surface pressure 1.5 × Earth)',
        overview: {
            en: 'Titan is Saturn\'s largest moon and the only moon in the solar system with a dense atmosphere and liquid lakes on its surface. Instead of water, its clouds, rivers, and seas (like Kraken Mare) are composed of liquid methane and ethane, cycling through evaporation and rain just like Earth\'s hydrological system.',
            bn: 'টাইটান শনির বৃহত্তম চাঁদ এবং সৌরজগতের একমাত্র চাঁদ যার নিজস্ব ঘন বায়ুমণ্ডল ও তরল পদার্থের হ্রদ রয়েছে। তবে পানির বদলে এর নদী ও সমুদ্রে রয়েছে তরল মিথেন ও ইথেন গ্যাস, যা বাষ্পীভূত হয়ে বৃষ্টিরূপে ঝরে পড়ে।'
        },
        missions: { en: 'Voyager 1 & 2, Cassini-Huygens (Huygens probe landed in 2005), Dragonfly rotorcraft (NASA launch 2028)', bn: 'ক্যাসিনি-হাইগেনস (হাইগেনস প্রোব ২০০৫ সালে অবতরণ করে), ড্রাগনফ্লাই মিশন' },
        funFact: { en: 'Because Titan\'s atmosphere is so thick and gravity so low, a human equipped with artificial wings could simply strap them on and fly through the air like a bird!', bn: 'টাইটানের বায়ুমণ্ডল পৃথিবীর চেয়ে ঘন কিন্তু মাধ্যাকর্ষণ কম, তাই মানুষ কেবল দুটি ডানা হাতে বেঁধে পাখির মতো উড়ে বেড়াতে পারবে!' },
        color: '#e0a953',
        radius: 3.1,
        orbitRadius: 42,
        orbitSpeed: 0.025,
        images: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80']
    },
    uranus: {
        id: 'uranus',
        name: { en: 'Uranus', bn: 'ইউরেনাস' },
        category: 'planet',
        planetType: { en: 'Ice Giant / The Sideways Planet', bn: 'বরফ দৈত্য / তির্যক ঘূর্ণন গ্রহ' },
        diameter: '50,724 km (4.0 × Earth)',
        mass: '8.681 × 10²⁵ kg (14.5 × Earth)',
        gravity: '8.69 m/s² (0.89 × Earth)',
        surfaceTemp: '-224 °C (Coldest planetary atmosphere in solar system)',
        distance: '2.871 Billion km (19.19 AU)',
        orbitPeriod: '84.02 Earth Years',
        rotation: '-17.24 Hours (Retrograde & Tilted 98°)',
        moons: '28 Known Moons (Titania, Oberon, Umbriel, Ariel, Miranda)',
        atmosphere: '82.5% Hydrogen, 15.2% Helium, 2.3% Methane (Gives aquamarine color)',
        overview: {
            en: 'Uranus is an ice giant composed of water, ammonia, and methane ices over a small rocky core. It has the most radical tilt in the solar system at 97.8 degrees—effectively rolling along its orbital path on its side like a bowling ball, resulting in extreme 42-year-long polar days and nights.',
            bn: 'ইউরেনাস একটি বরফ দৈত্য যা জল, মিথেন এবং অ্যামোনিয়া বরফে সমৃদ্ধ। গ্রহটি তার অক্ষের ওপর প্রায় ৯৮ ডিগ্রি হেলে ঘোরে, অর্থাৎ এটি প্রায় শুয়ে শুয়ে সূর্যকে প্রদক্ষিণ করে। এর ফলে এর প্রতিটি মেরুতে একটানা ৪২ বছর দিন এবং ৪২ বছর রাত থাকে।'
        },
        missions: { en: 'Voyager 2 (Historic close flyby in January 1986)', bn: 'ভয়েজার ২ (১৯৮৬ সালের ঐতিহাসিক ফ্লাইবাই)' },
        funFact: { en: 'Uranus has 13 faint, dark ring systems and held the coldest recorded atmospheric temperature of -224.2 °C (-371.5 °F)!', bn: 'ইউরেনাসের ১৩টি ক্ষীণ বলয় রয়েছে এবং এটি সৌরজগতের শীতলতম গ্রহীয় বায়ুমণ্ডল ধারণ করে (-২২৪.২ °সে)!' },
        color: '#76d7ea',
        radius: 13.0,
        distanceVal: 1580,
        orbitSpeed: 0.0035,
        tilt: 97.77,
        rotationSpeed: -0.012,
        texture: '/static/images/planets/2k_uranus.jpg',
        images: [
            '/static/images/planets/2k_uranus.jpg',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    neptune: {
        id: 'neptune',
        name: { en: 'Neptune', bn: 'নেপচুন' },
        category: 'planet',
        planetType: { en: 'Ice Giant / Supersonic Wind World', bn: 'বরফ দৈত্য / প্রচণ্ড ঝড়ের গ্রহ' },
        diameter: '49,244 km (3.86 × Earth)',
        mass: '1.024 × 10²⁶ kg (17.15 × Earth)',
        gravity: '11.15 m/s² (1.14 × Earth)',
        surfaceTemp: '-214 °C (-353 °F)',
        distance: '4.495 Billion km (30.07 AU)',
        orbitPeriod: '164.79 Earth Years (Completed first orbit since 1846 in 2011)',
        rotation: '16.11 Hours',
        moons: '16 Known Moons (Triton, Proteus, Nereid)',
        atmosphere: '80% Hydrogen, 19% Helium, 1.5% Methane, Supersonic Jet Streams',
        overview: {
            en: 'Neptune is the eighth and most distant major planet from the Sun. A vivid azure-blue ice giant, Neptune is home to the most ferocious and violent winds measured in the solar system, reaching staggering speeds of up to 2,100 km/h (1,300 mph)—faster than the speed of sound on Earth.',
            bn: 'নেপচুন সূর্য থেকে অষ্টম এবং দূরতম প্রধান গ্রহ। এটি এক রহস্যময় গাঢ় নীল রঙের বরফ দৈত্য। সৌরজগতের মধ্যে সবচেয়ে প্রচণ্ড ও বিধ্বংসী ঝড়ো বাতাস এখানে প্রবাহিত হয়, যার গতিবেগ ঘণ্টায় ২,১০০ কিলোমিটার ছাড়িয়ে যায়—যা শব্দের গতির চেয়েও দ্রুত।'
        },
        missions: { en: 'Voyager 2 (August 1989 historic flyby revealing Great Dark Spot)', bn: 'ভয়েজার ২ (১৯৮৯ সালের অবিস্মরণীয় ফ্লাইবাই)' },
        funFact: { en: 'Neptune was discovered through mathematical calculation before it was ever seen through a telescope, as astronomers noticed gravitational anomalies in Uranus\' orbit!', bn: 'টেলিস্কোপে দেখার আগেই কেবল বিশুদ্ধ গাণিতিক হিসাব-নিকাশের মাধ্যমে নেপচুন গ্রহটি আবিষ্কৃত হয়েছিল!' },
        color: '#274687',
        radius: 12.5,
        distanceVal: 1950,
        orbitSpeed: 0.0022,
        tilt: 28.32,
        rotationSpeed: 0.015,
        texture: '/static/images/planets/2k_neptune.jpg',
        images: [
            '/static/images/planets/2k_neptune.jpg',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80'
        ]
    },
    triton: {
        id: 'triton',
        name: { en: 'Triton', bn: 'ট্রাইটোন' },
        category: 'natural_satellite',
        parentBody: 'neptune',
        satelliteType: { en: 'Captured Kuiper Belt Cryovolcanic Moon', bn: 'কুইপার বেল্ট থেকে বন্দী বরফের চাঁদ' },
        diameter: '2,706.8 km (7th largest moon in solar system)',
        mass: '2.14 × 10²² kg',
        gravity: '0.779 m/s²',
        surfaceTemp: '-235 °C (-391 °F)',
        distance: '354,760 km from Neptune',
        orbitPeriod: '5.877 Earth Days (Retrograde Orbit!)',
        rotation: 'Synchronous',
        moons: 'None',
        atmosphere: 'Tenuous nitrogen atmosphere with active cryo-geysers',
        overview: {
            en: 'Triton is Neptune\'s largest moon and the only large moon in the solar system that orbits in the opposite direction of its planet\'s rotation (a retrograde orbit). This proves Triton was a dwarf planet captured gravitationally from the Kuiper Belt. It features active geysers that blast liquid nitrogen and dust 8 km into the sky.',
            bn: 'ট্রাইটোন নেপচুনের বৃহত্তম চাঁদ এবং সমগ্র সৌরজগতের একমাত্র বৃহৎ চাঁদ যা তার গ্রহের ঘূর্ণনের উল্টো দিকে ঘোরে। এর পৃষ্ঠে সক্রিয় ক্রায়ো-গিজার রয়েছে যা বরফশীতল তরল নাইট্রোজেনকে আকাশে ৮ কিলোমিটার উঁচুতে ছুড়ে দেয়।'
        },
        missions: { en: 'Voyager 2 (1989 flyby photographing cantaloupe terrain)', bn: 'ভয়েজার ২ (১৯৮৯)' },
        funFact: { en: 'Triton is one of the few geologically active moons in the solar system, with a surface so cold that nitrogen freezes into solid ice crystals!', bn: 'ট্রাইটোনের পৃষ্ঠ এতটাই চরম ঠাণ্ডা যে সেখানে নাইট্রোজেন গ্যাস জমে কঠিন বরফের স্ফটিকে পরিণত হয়!' },
        color: '#b0c4de',
        radius: 2.2,
        orbitRadius: 28,
        orbitSpeed: -0.035,
        images: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80']
    },
    pluto: {
        id: 'pluto',
        name: { en: 'Pluto & Charon', bn: 'প্লুটো ও শ্যারন' },
        category: 'dwarf_planet',
        planetType: { en: 'Dwarf Planet / King of the Kuiper Belt', bn: 'বামন গ্রহ / কুইপার বেল্টের রাজা' },
        diameter: '2,376.6 km (0.18 × Earth)',
        mass: '1.303 × 10²² kg (0.0022 × Earth)',
        gravity: '0.62 m/s² (0.06 × Earth)',
        surfaceTemp: '-230 °C (-382 °F)',
        distance: '5.906 Billion km (39.48 AU)',
        orbitPeriod: '247.94 Earth Years',
        rotation: '-6.387 Earth Days (Retrograde)',
        moons: '5 Moons (Charon, Nix, Hydra, Kerberos, Styx)',
        atmosphere: 'Thin seasonal nitrogen, methane, and carbon monoxide haze',
        overview: {
            en: 'Pluto is the beloved dwarf planet residing in the icy twilight of the Kuiper Belt. In 2015, NASA\'s New Horizons spacecraft revealed a geologically vibrant world with towering water-ice mountain ranges, glaciers of frozen nitrogen, and its famous heart-shaped plain named Tombaugh Regio.',
            bn: 'প্লুটো কুইপার বেল্টের এক বরফশীতল এবং রহস্যময় বামন গ্রহ। ২০১৫ সালে নাসার নিউ হরাইজনস মহাকাশযান প্লুটোর অভূতপূর্ব ছবি পাঠায়, যার মধ্যে বরফের সুউচ্চ পর্বতমালা এবং বিখ্যাত হৃদয়াকৃতির বরফের সমভূমি টমবাউ রেজিও উন্মোচিত হয়।'
        },
        missions: { en: 'New Horizons (Historic close flyby on July 14, 2015)', bn: 'নিউ হরাইজনস (২০১৫ সালের ১৪ জুলাই ঐতিহাসিক ফ্লাইবাই)' },
        funFact: { en: 'Pluto\'s largest moon Charon is so massive relative to Pluto (half its size) that they orbit a shared center of gravity in space outside Pluto\'s surface—acting as a true double planet!', bn: 'প্লুটোর চাঁদ শ্যারন প্লুটোর অর্ধেক আকারের! তারা একে অপরের চারপাশে এমনভাবে ঘোরে যে তাদের মহাকর্ষীয় কেন্দ্রবিন্দুটি মহাশূন্যের উন্মুক্ত স্থানে অবস্থান করে।' },
        color: '#c9bcae',
        radius: 2.7,
        distanceVal: 2280,
        orbitSpeed: 0.0014,
        tilt: 122.5,
        rotationSpeed: -0.008,
        images: ['https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80']
    },
    voyager1: {
        id: 'voyager1',
        name: { en: 'Voyager 1 (Interstellar Probe)', bn: 'ভয়েজার ১ (আন্তঃনাক্ষত্রিক মহাকাশযান)' },
        category: 'artificial_satellite',
        satelliteType: { en: 'Interstellar Deep Space Probe', bn: 'আন্তঃনাক্ষত্রিক গভীর মহাকাশ অনুসন্ধানকারী' },
        diameter: '3.7 m High-Gain Antenna, 722 kg',
        mass: '722 kg (1,592 lbs)',
        gravity: 'Microgravity',
        surfaceTemp: '-270 °C (Interstellar Cold)',
        distance: '24.4+ Billion km (163+ AU from Sun—Farthest human-made object!)',
        orbitPeriod: 'Escaping Solar System at 61,000 km/h (17 km/s)',
        rotation: 'Star tracker navigation alignment',
        moons: 'Carrying the Golden Record',
        atmosphere: 'Interstellar Plasma',
        overview: {
            en: 'Voyager 1 is humanity\'s most distant robotic emissary and the first human-made object to cross the heliopause and enter interstellar space. Launched in September 1977, it explored Jupiter and Saturn before charting a course outward into the galactic unknown, carrying the famous Golden Record containing Earth\'s sounds, languages, and music.',
            bn: 'ভয়েজার ১ মানবজাতির ইতিহাসে সর্বদূরবর্তী মানবনির্মিত বস্তু। ১৯৭৭ সালের সেপ্টেম্বর মাসে উৎক্ষেপিত এই মহাকাশযানটি সৌরজগতের সীমানা পেরিয়ে বর্তমানে আন্তঃনাক্ষত্রিক মহাশূন্যে বিচরণ করছে। এটি মানবজাতির সংস্কৃতি ও সঙ্গীতের স্মারক হিসেবে একটি স্বর্ণের রেকর্ড বহন করছে।'
        },
        missions: { en: '47+ years of continuous deep-space operation; entered interstellar space in August 2012', bn: '৪৭ বছরেরও বেশি সময় ধরে সক্রিয়; ২০১২ সালের আগস্টে আন্তঃনাক্ষত্রিক মহাকাশে প্রবেশ করে' },
        funFact: { en: 'A radio command sent from Earth at the speed of light takes more than 22.5 hours to reach Voyager 1!', bn: 'আলোর গতিতে পাঠানো একটি বেতার সংকেত পৃথিবী থেকে ভয়েজার ১-এ পৌঁছাতে ২২.৫ ঘণ্টারও বেশি সময় নেয়!' },
        color: '#ffd700',
        radius: 1.6,
        distanceVal: 2600,
        orbitSpeed: 0.0007,
        isCraft: true,
        images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80']
    }
};

const solarSystemList = Object.values(solarSystemData);
