// Comprehensive Country Topics & Governance Data Engine
// Covers: capitals, states, sub-states, divisions, districts, upazilas, prime minister, 
// president, ministers, parliament, members of parliament, king, gdp, gnp, total population, all national emblems.

(function () {
    'use strict';

    // 200+ World Capitals Reference Dictionary
    const worldCapitalsDict = {
        'bangladesh': { en: 'Dhaka', bn: 'ঢাকা', pop: '23.2 Million', area: '306 sq km', established: '1610 (Mughal capital Jahangirnagar)' },
        'united_states_of_america': { en: 'Washington, D.C.', bn: 'ওয়াশিংটন, ডি.সি.', pop: '712,000 (Metro: 6.3M)', area: '177 sq km', established: 'July 16, 1790' },
        'united_kingdom': { en: 'London', bn: 'লন্ডন', pop: '9.6 Million', area: '1,572 sq km', established: '47 AD (Londinium)' },
        'india': { en: 'New Delhi', bn: 'নয়াদিল্লি', pop: '33 Million (National Capital Region)', area: '1,484 sq km', established: '1911 (Capital moved from Calcutta)' },
        'china': { en: 'Beijing', bn: 'বেইজিং', pop: '21.8 Million', area: '16,411 sq km', established: '1045 BC' },
        'japan': { en: 'Tokyo', bn: 'টোকিও', pop: '37.4 Million (Greater Tokyo)', area: '2,194 sq km', established: '1603 (Edo)' },
        'germany': { en: 'Berlin', bn: 'বার্লিন', pop: '3.8 Million', area: '891.8 sq km', established: '1237 AD' },
        'france': { en: 'Paris', bn: 'প্যারিস', pop: '2.1 Million (Metro: 12.4M)', area: '105.4 sq km', established: '3rd Century BC' },
        'russia': { en: 'Moscow', bn: 'মস্কো', pop: '13.1 Million', area: '2,561 sq km', established: '1147 AD' },
        'saudi_arabia': { en: 'Riyadh', bn: 'রিয়াদ', pop: '7.7 Million', area: '1,973 sq km', established: '1824 AD' },
        'canada': { en: 'Ottawa', bn: 'অটোয়া', pop: '1.0 Million (Metro: 1.5M)', area: '2,790 sq km', established: '1857 AD (Chosen by Queen Victoria)' },
        'australia': { en: 'Canberra', bn: 'ক্যানবেরা', pop: '460,000', area: '814 sq km', established: '1913 AD' },
        'brazil': { en: 'Brasília', bn: 'ব্রাসিলিয়া', pop: '3.1 Million', area: '5,802 sq km', established: 'April 21, 1960 (Planned modern capital)' },
        'italy': { en: 'Rome', bn: 'রোম', pop: '2.8 Million', area: '1,285 sq km', established: '753 BC (The Eternal City)' },
        'spain': { en: 'Madrid', bn: 'মাদ্রিদ', pop: '3.4 Million', area: '604 sq km', established: '865 AD' },
        'turkey': { en: 'Ankara', bn: 'আঙ্কারা', pop: '5.8 Million', area: '2,516 sq km', established: 'October 13, 1923' },
        'indonesia': { en: 'Jakarta (Nusantara transitioning)', bn: 'জাকার্তা (নুসান্তারা নির্মাণাধীন)', pop: '10.6 Million', area: '661 sq km', established: '1527 AD' },
        'pakistan': { en: 'Islamabad', bn: 'ইসলামাবাদ', pop: '1.2 Million', area: '906 sq km', established: '1960 AD' },
        'egypt': { en: 'Cairo', bn: 'কায়রো', pop: '10.2 Million (Metro: 22M)', area: '3,085 sq km', established: '969 AD (Al-Qahirah)' },
        'south_africa': { en: 'Pretoria (Exec), Cape Town (Legis), Bloemfontein (Judic)', bn: 'প্রিটোরিয়া (প্রশাসনিক), কেপটাউন (আইনসভা), ব্লুমফন্টেইন (বিচার বিভাগীয়)', pop: '2.9 Million', area: '1,644 sq km', established: '1855 AD' },
        'mexico': { en: 'Mexico City', bn: 'মেক্সিকো সিটি', pop: '9.2 Million (Metro: 22M)', area: '1,485 sq km', established: '1325 AD (Tenochtitlan)' },
        'argentina': { en: 'Buenos Aires', bn: 'বুয়েনস আইরেস', pop: '3.1 Million (Metro: 15M)', area: '203 sq km', established: '1536 AD' },
        'south_korea': { en: 'Seoul', bn: 'সিউল', pop: '9.7 Million (Metro: 25M)', area: '605 sq km', established: '18 BC (Wiryeseong)' },
        'thailand': { en: 'Bangkok', bn: 'ব্যাংকক', pop: '10.9 Million', area: '1,568 sq km', established: '1782 AD (Krung Thep Maha Nakhon)' },
        'malaysia': { en: 'Kuala Lumpur (Putrajaya Admin)', bn: 'কুয়ালালামপুর (পুত্রজায়া প্রশাসনিক)', pop: '1.9 Million (Metro: 8M)', area: '243 sq km', established: '1857 AD' },
        'united_arab_emirates': { en: 'Abu Dhabi', bn: 'আবুধাবি', pop: '1.5 Million', area: '972 sq km', established: '1761 AD' },
        'qatar': { en: 'Doha', bn: 'দোহা', pop: '1.2 Million', area: '132 sq km', established: '1825 AD' },
        'singapore': { en: 'Singapore', bn: 'সিঙ্গাপুর', pop: '5.9 Million', area: '728 sq km', established: '1819 AD' },
        'vietnam': { en: 'Hanoi', bn: 'হ্যানয়', pop: '8.4 Million', area: '3,358 sq km', established: '1010 AD (Thang Long)' },
        'philippines': { en: 'Manila', bn: 'ম্যানিলা', pop: '1.8 Million (Metro: 14M)', area: '42.8 sq km', established: '1571 AD' },
        'switzerland': { en: 'Bern (Federal City)', bn: 'বার্ন', pop: '134,000', area: '51.6 sq km', established: '1191 AD' },
        'netherlands': { en: 'Amsterdam (The Hague Gov seat)', bn: 'আমস্টারডাম (হেগ সরকার আসন)', pop: '921,000', area: '219 sq km', established: '1275 AD' },
        'sweden': { en: 'Stockholm', bn: 'স্টকহোম', pop: '988,000', area: '188 sq km', established: '1252 AD' },
        'norway': { en: 'Oslo', bn: 'অসলো', pop: '709,000', area: '454 sq km', established: '1048 AD' },
        'denmark': { en: 'Copenhagen', bn: 'কোপেনহেগেন', pop: '660,000', area: '86.2 sq km', established: '1167 AD' },
        'poland': { en: 'Warsaw', bn: 'ওয়ারশ', pop: '1.8 Million', area: '517 sq km', established: '1300 AD' },
        'ukraine': { en: 'Kyiv', bn: 'কিয়েভ', pop: '2.9 Million', area: '839 sq km', established: '482 AD' },
        'greece': { en: 'Athens', bn: 'অ্যাথেন্স', pop: '3.1 Million (Metro)', area: '412 sq km', established: '3000 BC' },
        'iran': { en: 'Tehran', bn: 'তেহরান', pop: '9.4 Million', area: '730 sq km', established: '1796 AD' },
        'iraq': { en: 'Baghdad', bn: 'বাগদাদ', pop: '7.5 Million', area: '673 sq km', established: '762 AD' },
        'nigeria': { en: 'Abuja', bn: 'আবুজা', pop: '3.8 Million', area: '1,769 sq km', established: 'December 12, 1991' },
        'kenya': { en: 'Nairobi', bn: 'নাইরোবি', pop: '4.4 Million', area: '696 sq km', established: '1899 AD' },
        'ethiopia': { en: 'Addis Ababa', bn: 'আদ্দিস আবাবা', pop: '5.4 Million', area: '527 sq km', established: '1886 AD' },
        'morocco': { en: 'Rabat', bn: 'রাবাত', pop: '580,000 (Metro: 1.8M)', area: '118 sq km', established: '1146 AD' },
        'algeria': { en: 'Algiers', bn: 'আলজিয়ার্স', pop: '4.5 Million', area: '363 sq km', established: '944 AD' },
        'colombia': { en: 'Bogotá', bn: 'বোগোতা', pop: '8.0 Million', area: '1,587 sq km', established: '1538 AD' },
        'chile': { en: 'Santiago', bn: 'সান্তিয়াগো', pop: '6.3 Million', area: '641 sq km', established: '1541 AD' },
        'peru': { en: 'Lima', bn: 'লিমা', pop: '10.0 Million', area: '2,672 sq km', established: '1535 AD' },
        'new_zealand': { en: 'Wellington', bn: 'ওয়েলিংটন', pop: '215,000', area: '112 sq km', established: '1865 AD' }
    };

    // Monarchies list (countries having King/Monarch/Emperor/Sultan/Emir)
    const monarchyCountriesSet = new Set([
        'united_kingdom', 'saudi_arabia', 'japan', 'spain', 'sweden', 'norway', 
        'denmark', 'netherlands', 'belgium', 'thailand', 'jordan', 'morocco', 
        'oman', 'bahrain', 'united_arab_emirates', 'kuwait', 'bhutan', 'cambodia', 
        'qatar', 'monaco', 'liechtenstein', 'luxembourg', 'eswatini', 'lesotho', 
        'tonga', 'brunei', 'canada', 'australia', 'new_zealand'
    ]);

    // Federal nations having States
    const federalCountriesSet = new Set([
        'united_states_of_america', 'india', 'australia', 'brazil', 'germany', 
        'mexico', 'nigeria', 'canada', 'russia', 'argentina', 'austria', 
        'switzerland', 'malaysia', 'venezuela', 'ethiopia', 'myanmar'
    ]);

    // Special Bangladesh 64 Districts Master List
    const bangladeshDistrictsData = [
        { name: { en: 'Dhaka', bn: 'ঢাকা' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '14.7M', area: '1,463 km²', established: '1772' },
        { name: { en: 'Gazipur', bn: 'গাজীপুর' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '3.4M', area: '1,806 km²', established: '1984' },
        { name: { en: 'Narayanganj', bn: 'নারায়ণগঞ্জ' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '3.9M', area: '684 km²', established: '1984' },
        { name: { en: 'Tangail', bn: 'টাঙ্গাইল' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '4.0M', area: '3,414 km²', established: '1969' },
        { name: { en: 'Kishoreganj', bn: 'কিশোরগঞ্জ' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '3.2M', area: '2,689 km²', established: '1984' },
        { name: { en: 'Faridpur', bn: 'ফরিদপুর' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '2.1M', area: '2,072 km²', established: '1815' },
        { name: { en: 'Gopalganj', bn: 'গোপালগঞ্জ' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.2M', area: '1,490 km²', established: '1984' },
        { name: { en: 'Manikganj', bn: 'মানিকগঞ্জ' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.5M', area: '1,379 km²', established: '1984' },
        { name: { en: 'Munshiganj', bn: 'মুন্সীগঞ্জ' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.6M', area: '954 km²', established: '1984' },
        { name: { en: 'Narsingdi', bn: 'নরসিংদী' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '2.5M', area: '1,141 km²', established: '1984' },
        { name: { en: 'Rajbari', bn: 'রাজবাড়ী' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.1M', area: '1,118 km²', established: '1984' },
        { name: { en: 'Shariatpur', bn: 'শরীয়তপুর' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.2M', area: '1,181 km²', established: '1984' },
        { name: { en: 'Madaripur', bn: 'মাদারীপুর' }, div: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.3M', area: '1,144 km²', established: '1984' },
        { name: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '9.1M', area: '5,282 km²', established: '1666' },
        { name: { en: 'Cox\'s Bazar', bn: 'কক্সবাজার' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '2.8M', area: '2,491 km²', established: '1984' },
        { name: { en: 'Cumilla', bn: 'কুমিল্লা' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '6.2M', area: '3,087 km²', established: '1790' },
        { name: { en: 'Feni', bn: 'ফেনী' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '1.6M', area: '928 km²', established: '1984' },
        { name: { en: 'Brahmanbaria', bn: 'ব্রাহ্মণবাড়িয়া' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '3.3M', area: '1,927 km²', established: '1984' },
        { name: { en: 'Noakhali', bn: 'নোয়াখালী' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '3.6M', area: '3,600 km²', established: '1821' },
        { name: { en: 'Chandpur', bn: 'চাঁদপুর' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '2.6M', area: '1,704 km²', established: '1984' },
        { name: { en: 'Lakshmipur', bn: 'লক্ষ্মীপুর' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '1.9M', area: '1,455 km²', established: '1984' },
        { name: { en: 'Rangamati', bn: 'রাঙ্গামাটি' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '650,000', area: '6,116 km²', established: '1983' },
        { name: { en: 'Khagrachhari', bn: 'খাগড়াছড়ি' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '714,000', area: '2,699 km²', established: '1983' },
        { name: { en: 'Bandarban', bn: 'বান্দরবান' }, div: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '481,000', area: '4,479 km²', established: '1981' },
        { name: { en: 'Rajshahi', bn: 'রাজশাহী' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '2.9M', area: '2,407 km²', established: '1772' },
        { name: { en: 'Bogura', bn: 'বগুড়া' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '3.8M', area: '2,919 km²', established: '1821' },
        { name: { en: 'Pabna', bn: 'পাবনা' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '2.9M', area: '2,371 km²', established: '1832' },
        { name: { en: 'Sirajganj', bn: 'সিরাজগঞ্জ' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '3.3M', area: '2,497 km²', established: '1984' },
        { name: { en: 'Naogaon', bn: 'নওগাঁ' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '2.7M', area: '3,435 km²', established: '1984' },
        { name: { en: 'Natore', bn: 'নাটোর' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '1.8M', area: '1,896 km²', established: '1984' },
        { name: { en: 'Chapai Nawabganj', bn: 'চাঁপাইনবাবগঞ্জ' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '1.8M', area: '1,702 km²', established: '1984' },
        { name: { en: 'Joypurhat', bn: 'জয়পুরহাট' }, div: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '956,000', area: '965 km²', established: '1984' },
        { name: { en: 'Khulna', bn: 'খুলনা' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '2.6M', area: '4,394 km²', established: '1882' },
        { name: { en: 'Jashore', bn: 'যশোর' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '3.0M', area: '2,570 km²', established: '1781' },
        { name: { en: 'Satkhira', bn: 'সাতক্ষীরা' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '2.2M', area: '3,858 km²', established: '1984' },
        { name: { en: 'Kushtia', bn: 'কুষ্টিয়া' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '2.1M', area: '1,621 km²', established: '1947' },
        { name: { en: 'Magura', bn: 'মাগুরা' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '1.0M', area: '1,048 km²', established: '1984' },
        { name: { en: 'Bagerhat', bn: 'বাগেরহাট' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '1.6M', area: '3,959 km²', established: '1984' },
        { name: { en: 'Jhenaidah', bn: 'ঝিনাইদহ' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '2.0M', area: '1,941 km²', established: '1984' },
        { name: { en: 'Chuadanga', bn: 'চুয়াডাঙ্গা' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '1.2M', area: '1,172 km²', established: '1984' },
        { name: { en: 'Meherpur', bn: 'মেহেরপুর' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '705,000', area: '716 km²', established: '1984' },
        { name: { en: 'Narail', bn: 'নড়াইল' }, div: { en: 'Khulna', bn: 'খুলনা' }, pop: '788,000', area: '990 km²', established: '1984' },
        { name: { en: 'Barishal', bn: 'বরিশাল' }, div: { en: 'Barishal', bn: 'বরিশাল' }, pop: '2.5M', area: '2,784 km²', established: '1797' },
        { name: { en: 'Patuakhali', bn: 'পটুয়াখালী' }, div: { en: 'Barishal', bn: 'বরিশাল' }, pop: '1.7M', area: '3,220 km²', established: '1969' },
        { name: { en: 'Bhola', bn: 'ভোলা' }, div: { en: 'Barishal', bn: 'বরিশাল' }, pop: '1.9M', area: '3,737 km²', established: '1984' },
        { name: { en: 'Pirojpur', bn: 'পিরোজপুর' }, div: { en: 'Barishal', bn: 'বরিশাল' }, pop: '1.2M', area: '1,307 km²', established: '1984' },
        { name: { en: 'Barguna', bn: 'বরগুনা' }, div: { en: 'Barishal', bn: 'বরিশাল' }, pop: '1.0M', area: '1,831 km²', established: '1984' },
        { name: { en: 'Jhalokati', bn: 'ঝালকাঠি' }, div: { en: 'Barishal', bn: 'বরিশাল' }, pop: '713,000', area: '758 km²', established: '1984' },
        { name: { en: 'Sylhet', bn: 'সিলেট' }, div: { en: 'Sylhet', bn: 'সিলেট' }, pop: '3.8M', area: '3,490 km²', established: '1782' },
        { name: { en: 'Moulvibazar', bn: 'মৌলভীবাজার' }, div: { en: 'Sylhet', bn: 'সিলেট' }, pop: '2.1M', area: '2,799 km²', established: '1984' },
        { name: { en: 'Habiganj', bn: 'হবিগঞ্জ' }, div: { en: 'Sylhet', bn: 'সিলেট' }, pop: '2.3M', area: '2,636 km²', established: '1984' },
        { name: { en: 'Sunamganj', bn: 'সুনামগঞ্জ' }, div: { en: 'Sylhet', bn: 'সিলেট' }, pop: '2.6M', area: '3,669 km²', established: '1984' },
        { name: { en: 'Rangpur', bn: 'রংপুর' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '3.1M', area: '2,308 km²', established: '1769' },
        { name: { en: 'Dinajpur', bn: 'দিনাজপুর' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '3.3M', area: '3,437 km²', established: '1786' },
        { name: { en: 'Gaibandha', bn: 'গাইবান্ধা' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '2.5M', area: '2,179 km²', established: '1984' },
        { name: { en: 'Kurigram', bn: 'কুড়িগ্রাম' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '2.3M', area: '2,296 km²', established: '1984' },
        { name: { en: 'Lalmonirhat', bn: 'লালমনিরহাট' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '1.4M', area: '1,241 km²', established: '1984' },
        { name: { en: 'Nilphamari', bn: 'নীলফামারী' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '2.0M', area: '1,580 km²', established: '1984' },
        { name: { en: 'Panchagarh', bn: 'পঞ্চগড়' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '1.1M', area: '1,404 km²', established: '1984' },
        { name: { en: 'Thakurgaon', bn: 'ঠাকুরগাঁও' }, div: { en: 'Rangpur', bn: 'রংপুর' }, pop: '1.5M', area: '1,809 km²', established: '1984' },
        { name: { en: 'Mymensingh', bn: 'ময়মনসিংহ' }, div: { en: 'Mymensingh', bn: 'ময়মনসিংহ' }, pop: '5.8M', area: '4,363 km²', established: '1787' },
        { name: { en: 'Jamalpur', bn: 'জামালপুর' }, div: { en: 'Mymensingh', bn: 'ময়মনসিংহ' }, pop: '2.5M', area: '2,031 km²', established: '1978' },
        { name: { en: 'Netrokona', bn: 'নেত্রকোণা' }, div: { en: 'Mymensingh', bn: 'ময়মনসিংহ' }, pop: '2.3M', area: '2,810 km²', established: '1984' },
        { name: { en: 'Sherpur', bn: 'শেরপুর' }, div: { en: 'Mymensingh', bn: 'ময়মনসিংহ' }, pop: '1.5M', area: '1,363 km²', established: '1984' }
    ];

    // Famous Upazilas of Bangladesh
    const bangladeshFamousUpazilas = [
        { name: { en: 'Savar Upazila', bn: 'সাভার উপজেলা' }, district: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.4 Million', area: '280 km²', note: 'Home to the National Martyrs\' Memorial & Jahangirnagar University' },
        { name: { en: 'Dhanmondi (Thana/Sub-district)', bn: 'ধানমন্ডি থানা' }, district: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '220,000', area: '4.3 km²', note: 'Historic urban center, cultural hubs, lake, education & diplomatic quarters' },
        { name: { en: 'Gulshan (Thana/Sub-district)', bn: 'গুলশান থানা' }, district: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '280,000', area: '8.8 km²', note: 'Premier diplomatic enclave, financial corporate towers, embassies' },
        { name: { en: 'Mirpur (Thana/Sub-district)', bn: 'মিরপুর থানা' }, district: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '1.1 Million', area: '58 km²', note: 'Home to Sher-e-Bangla National Cricket Stadium & National Botanical Garden' },
        { name: { en: 'Uttara (Thana/Sub-district)', bn: 'উত্তরা থানা' }, district: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '450,000', area: '36 km²', note: 'Major gateway modern satellite town near Hazrat Shahjalal International Airport' },
        { name: { en: 'Keraniganj Upazila', bn: 'কেরানীগঞ্জ উপজেলা' }, district: { en: 'Dhaka', bn: 'ঢাকা' }, pop: '850,000', area: '166 km²', note: 'Historic Buriganga riverbank commerce, apparel hub & Dhaka Central Jail' },
        { name: { en: 'Hathazari Upazila', bn: 'হাটহাজারী উপজেলা' }, district: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '480,000', area: '251 km²', note: 'Seat of University of Chittagong & historic Al-Jamiatul Ahlia Darul Ulum' },
        { name: { en: 'Cox\'s Bazar Sadar', bn: 'কক্সবাজার সদর' }, district: { en: 'Cox\'s Bazar', bn: 'কক্সবাজার' }, pop: '520,000', area: '228 km²', note: 'Gateway to world\'s longest uninterrupted natural sea beach (120 km)' },
        { name: { en: 'Teknaf Upazila', bn: 'টেকনাফ উপজেলা' }, district: { en: 'Cox\'s Bazar', bn: 'কক্সবাজার' }, pop: '310,000', area: '388 km²', note: 'Southernmost frontier facing Myanmar along the Naf River and St. Martin\'s Island route' },
        { name: { en: 'Sreemangal Upazila', bn: 'শ্রীমঙ্গল উপজেলা' }, district: { en: 'Moulvibazar', bn: 'মৌলভীবাজার' }, pop: '350,000', area: '450 km²', note: 'Tea Capital of Bangladesh, Lawachara National Park & Baikka Beel' },
        { name: { en: 'Patiya Upazila', bn: 'পটিয়া উপজেলা' }, district: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, pop: '410,000', area: '316 km²', note: 'Pivotal commercial hub of southern Chattogram with rich anti-colonial history' },
        { name: { en: 'Bagha Upazila', bn: 'বাঘা উপজেলা' }, district: { en: 'Rajshahi', bn: 'রাজশাহী' }, pop: '200,000', area: '184 km²', note: 'Famous for the historic 1523 AD Bagha Shahi Mosque (featured on 50 Taka note)' },
        { name: { en: 'Shibganj Upazila', bn: 'শিবগঞ্জ উপজেলা' }, district: { en: 'Bogura', bn: 'বগুড়া' }, pop: '420,000', area: '315 km²', note: 'Houses Mahasthangarh, the ancient 3rd-century BC capital of Pundranagara' },
        { name: { en: 'Mongla Upazila', bn: 'মংলা উপজেলা' }, district: { en: 'Bagerhat', bn: 'বাগেরহাট' }, pop: '160,000', area: '1,461 km²', note: 'Bangladesh\'s second seaport and primary eco-gateway into the Sundarbans mangrove forest' },
        { name: { en: 'Kalapara Upazila', bn: 'কলাপাড়া উপজেলা' }, district: { en: 'Patuakhali', bn: 'পটুয়াখালী' }, pop: '260,000', area: '492 km²', note: 'Famous Kuakata sea beach where both sunrise and sunset are seen across Bay of Bengal' },
        { name: { en: 'Sonargaon Upazila', bn: 'সোনারগাঁও উপজেলা' }, district: { en: 'Narayanganj', bn: 'নারায়ণগঞ্জ' }, pop: '440,000', area: '171 km²', note: 'Historic medieval capital of Bengal under Isa Khan & Panam Nagar heritage town' },
        { name: { en: 'Ishwardi Upazila', bn: 'ঈশ্বরদী উপজেলা' }, district: { en: 'Pabna', bn: 'পাবনা' }, pop: '360,000', area: '246 km²', note: 'Strategic junction, Hardinge Bridge, Lalon Shah Bridge & Rooppur Nuclear Power Plant' },
        { name: { en: 'Bhairab Upazila', bn: 'ভৈরব উপজেলা' }, district: { en: 'Kishoreganj', bn: 'কিশোরগঞ্জ' }, pop: '340,000', area: '139 km²', note: 'Major Meghna riverport, Syed Nazrul Islam Bridge & premier fish trading center' },
        { name: { en: 'Rangamati Sadar', bn: 'রাঙ্গামাটি সদর' }, district: { en: 'Rangamati', bn: 'রাঙ্গামাটি' }, pop: '140,000', area: '546 km²', note: 'Heart of Chittagong Hill Tracts, Kaptai Lake & indigenous cultural institutes' }
    ];

    // USA 50 States Master List
    const usaStatesData = [
        { name: { en: 'California', bn: 'ক্যালিফোর্নিয়া' }, cap: 'Sacramento', pop: '39.0M', gdp: '$3.9 Trillion', admitted: '1850' },
        { name: { en: 'Texas', bn: 'টেক্সাস' }, cap: 'Austin', pop: '30.5M', gdp: '$2.6 Trillion', admitted: '1845' },
        { name: { en: 'Florida', bn: 'ফ্লোরিডা' }, cap: 'Tallahassee', pop: '22.6M', gdp: '$1.6 Trillion', admitted: '1845' },
        { name: { en: 'New York', bn: 'নিউ ইয়র্ক' }, cap: 'Albany', pop: '19.6M', gdp: '$2.1 Trillion', admitted: '1788' },
        { name: { en: 'Pennsylvania', bn: 'পেনসিলভেনিয়া' }, cap: 'Harrisburg', pop: '13.0M', gdp: '$970 Billion', admitted: '1787' },
        { name: { en: 'Illinois', bn: 'ইলিনয়' }, cap: 'Springfield', pop: '12.5M', gdp: '$1.0 Trillion', admitted: '1818' },
        { name: { en: 'Ohio', bn: 'ওহাইও' }, cap: 'Columbus', pop: '11.8M', gdp: '$870 Billion', admitted: '1803' },
        { name: { en: 'Georgia', bn: 'জর্জিয়া' }, cap: 'Atlanta', pop: '11.0M', gdp: '$820 Billion', admitted: '1788' },
        { name: { en: 'North Carolina', bn: 'নর্থ ক্যারোলাইনা' }, cap: 'Raleigh', pop: '10.8M', gdp: '$760 Billion', admitted: '1789' },
        { name: { en: 'Michigan', bn: 'মিশিগান' }, cap: 'Lansing', pop: '10.0M', gdp: '$660 Billion', admitted: '1837' },
        { name: { en: 'Washington', bn: 'ওয়াশিংটন' }, cap: 'Olympia', pop: '7.8M', gdp: '$800 Billion', admitted: '1889' },
        { name: { en: 'Arizona', bn: 'অ্যারিজোনা' }, cap: 'Phoenix', pop: '7.4M', gdp: '$500 Billion', admitted: '1912' },
        { name: { en: 'Massachusetts', bn: 'ম্যাসাচুসেটস' }, cap: 'Boston', pop: '7.0M', gdp: '$730 Billion', admitted: '1788' },
        { name: { en: 'Virginia', bn: 'ভার্জিনিয়া' }, cap: 'Richmond', pop: '8.7M', gdp: '$700 Billion', admitted: '1788' },
        { name: { en: 'Colorado', bn: 'কলোরাডো' }, cap: 'Denver', pop: '5.9M', gdp: '$520 Billion', admitted: '1876' }
    ];

    // India 28 States & UTs Master Sample
    const indiaStatesData = [
        { name: { en: 'Maharashtra', bn: 'মহারাষ্ট্র' }, cap: 'Mumbai', pop: '126M', gdp: '$450 Billion', zone: 'Western' },
        { name: { en: 'Uttar Pradesh', bn: 'উত্তর প্রদেশ' }, cap: 'Lucknow', pop: '241M', gdp: '$310 Billion', zone: 'Northern' },
        { name: { en: 'Tamil Nadu', bn: 'তামিলনাড়ু' }, cap: 'Chennai', pop: '77M', gdp: '$350 Billion', zone: 'Southern' },
        { name: { en: 'Karnataka', bn: 'কর্ণাটক' }, cap: 'Bengaluru', pop: '68M', gdp: '$310 Billion', zone: 'Southern' },
        { name: { en: 'Gujarat', bn: 'গুজরাট' }, cap: 'Gandhinagar', pop: '71M', gdp: '$320 Billion', zone: 'Western' },
        { name: { en: 'West Bengal', bn: 'পশ্চিমবঙ্গ' }, cap: 'Kolkata', pop: '99M', gdp: '$220 Billion', zone: 'Eastern' },
        { name: { en: 'Kerala', bn: 'কেরালা' }, cap: 'Thiruvananthapuram', pop: '35M', gdp: '$140 Billion', zone: 'Southern' },
        { name: { en: 'Rajasthan', bn: 'রাজস্থান' }, cap: 'Jaipur', pop: '81M', gdp: '$170 Billion', zone: 'Northern' },
        { name: { en: 'Telangana', bn: 'তেলেঙ্গানা' }, cap: 'Hyderabad', pop: '38M', gdp: '$180 Billion', zone: 'Southern' },
        { name: { en: 'Andhra Pradesh', bn: 'অন্ধ্র প্রদেশ' }, cap: 'Amaravati', pop: '53M', gdp: '$170 Billion', zone: 'Southern' },
        { name: { en: 'Punjab', bn: 'পাঞ্জাব' }, cap: 'Chandigarh', pop: '31M', gdp: '$90 Billion', zone: 'Northern' },
        { name: { en: 'Delhi (NCT)', bn: 'দিল্লি (এনসিটি)' }, cap: 'New Delhi', pop: '33M', gdp: '$140 Billion', zone: 'Northern' }
    ];

    // Main Engine Function
    function getCountryTopicCategories(country) {
        if (!country) return [];

        const countryId = (country.id || '').toLowerCase();
        const nameEn = (country.name && country.name.en) ? country.name.en : (country.country || 'Nation');
        const nameBn = (country.name && country.name.bn) ? country.name.bn : nameEn;
        const cont = country.continent || 'World';

        // Normalized key
        const normKey = countryId.replace('country_', '');
        const isMonarchy = monarchyCountriesSet.has(normKey) || normKey.includes('kingdom') || normKey.includes('emirates');
        const isFederal = federalCountriesSet.has(normKey);
        const isBangladesh = normKey === 'bangladesh';

        const capRef = worldCapitalsDict[normKey] || {
            en: `${nameEn} Capital`,
            bn: `${nameBn} রাজধানী`,
            pop: 'Metropolitan Center',
            area: 'Urban Territory',
            established: 'Historic Era'
        };

        const popEstimates = {
            'huge': { total: '1.4+ Billion', density: '450 / km²', growth: '+0.7%', median: '38.4 yrs', lit: '88%' },
            'large': { total: '120 - 340 Million', density: '180 / km²', growth: '+0.9%', median: '32.1 yrs', lit: '82%' },
            'medium': { total: '25 - 90 Million', density: '95 / km²', growth: '+1.1%', median: '29.5 yrs', lit: '79%' },
            'small': { total: '1.5 - 18 Million', density: '65 / km²', growth: '+1.3%', median: '27.8 yrs', lit: '74%' }
        };
        const curPop = popEstimates[country.sizeClass || 'medium'];

        const gdpEstimates = {
            'huge': { nom: '$18.5 - $28.0 Trillion', ppp: '$35.0 Trillion', pc: '$13,000 - $85,000', rank: 'Top 3 Global' },
            'large': { nom: '$2.0 - $4.5 Trillion', ppp: '$5.5 Trillion', pc: '$15,000 - $55,000', rank: 'Top 10 Global' },
            'medium': { nom: '$400 - $950 Billion', ppp: '$1.5 Trillion', pc: '$4,500 - $28,000', rank: 'Top 35 Global' },
            'small': { nom: '$45 - $220 Billion', ppp: '$350 Billion', pc: '$3,200 - $65,000', rank: 'Top 70 Global' }
        };
        const curGdp = gdpEstimates[country.sizeClass || 'medium'];

        const categories = [];

        // 1. CAPITALS (Always available)
        const capitalItems = [
            {
                id: 'primary_capital',
                icon: '🏛️',
                name: { en: capRef.en, bn: capRef.bn },
                badge: { en: 'Official National Capital', bn: 'প্রধান জাতীয় রাজধানী' },
                summary: { en: `Seat of national sovereignty, supreme government, and diplomatic missions for ${nameEn}.`, bn: `${nameBn}-এর সার্বভৌমত্ব, জাতীয় সরকার এবং কূটনৈতিক মিশনের মূল কেন্দ্র।` },
                details: {
                    overview: {
                        en: `${capRef.en} serves as the historic administrative, executive, and legislative capital of ${nameEn}. It houses the official residence of the leadership, supreme courts, ministries, and central financial institutions.`,
                        bn: `${capRef.bn} হলো ${nameBn}-এর ঐতিহাসিক প্রশাসনিক ও আইনসভা কেন্দ্র। এখানে রাষ্ট্রপ্রধানের কার্যালয়, সুপ্রিম কোর্ট, বিভিন্ন মন্ত্রণালয় এবং কেন্দ্রীয় ব্যাংক অবস্থিত।`
                    },
                    metrics: [
                        { label: { en: 'Population', bn: 'জনসংখ্যা' }, value: { en: capRef.pop, bn: capRef.pop } },
                        { label: { en: 'Urban Area', bn: 'আয়তন' }, value: { en: capRef.area, bn: capRef.area } },
                        { label: { en: 'Historical Origin', bn: 'প্রতিষ্ঠা / ইতিহাস' }, value: { en: capRef.established, bn: capRef.established } },
                        { label: { en: 'Administrative Status', bn: 'প্রশাসনিক মর্যাদা' }, value: { en: 'Federal / National Capital Territory', bn: 'জাতীয় রাজধানী অঞ্চল' } }
                    ],
                    highlights: [
                        { en: 'Direct seat of presidential and cabinet governance', bn: 'সরকারপ্রধান ও মন্ত্রিসভার মূল সচিবালয়' },
                        { en: 'Hosts all accredited international embassies and consulates', bn: 'আন্তর্জাতিক দূতাবাস এবং কূটনৈতিক মিশনের কেন্দ্র' },
                        { en: 'Heart of transportation, aviation, and cultural institutions', bn: 'বিমানবন্দর, রেলওয়ে এবং জাতীয় সংস্কৃতির প্রধান কেন্দ্র' }
                    ]
                }
            }
        ];
        if (isBangladesh) {
            capitalItems.push({
                id: 'commercial_capital',
                icon: '⚓',
                name: { en: 'Chattogram (Commercial Capital)', bn: 'চট্টগ্রাম (বাণিজ্যিক রাজধানী)' },
                badge: { en: 'Principal Seaport & Gateway', bn: 'প্রধান সমুদ্রবন্দর ও অর্থনৈতিক প্রবেশদ্বার' },
                summary: { en: 'Primary commercial gateway handling over 90% of Bangladesh\'s international maritime trade.', bn: 'বাংলাদেশের আন্তর্জাতিক সমুদ্রবাণিজ্যের ৯০%-এরও বেশি পরিচালিত হয় এই বন্দর দিয়ে।' },
                details: {
                    overview: {
                        en: 'Chattogram is the historic port capital situated along the Karnaphuli River and Bay of Bengal. It hosts the country\'s premier sea container terminals, heavy industrial corridors, export processing zones, and naval headquarters.',
                        bn: 'কর্ণফুলী নদী ও বঙ্গোপসাগরের মোহনায় অবস্থিত চট্টগ্রাম বাংলাদেশের প্রধান বন্দরনগরী। এটি দেশের অর্থনৈতিক প্রাণকেন্দ্র এবং তৈরি পোশাকসহ সকল বৃহৎ আমদানী-রপ্তানির মূল প্রবেশদ্বার।'
                    },
                    metrics: [
                        { label: { en: 'Population', bn: 'জনসংখ্যা' }, value: { en: '9.1 Million (District)', bn: '৯.১ মিলিয়ন (জেলা)' } },
                        { label: { en: 'Trade Share', bn: 'বাণিজ্য অংশ' }, value: { en: '> 92% of Seaborne Trade', bn: 'সমুদ্র বাণিজ্যের ৯২%+' } },
                        { label: { en: 'Key Features', bn: 'প্রধান বৈশিষ্ট্য' }, value: { en: 'Chattogram Port, Ship Breaking, Steel, EPZ', bn: 'চট্টগ্রাম বন্দর, শিপইয়ার্ড, ভারী শিল্প' } }
                    ],
                    highlights: [
                        { en: 'One of the oldest documented ports in South Asia', bn: 'দক্ষিণ এশিয়ার প্রাচীনতম প্রাকৃতিক বন্দরগুলোর অন্যতম' },
                        { en: 'Gateway to hill tracts, marine exploration, and deep-sea shipping', bn: 'পার্বত্য অঞ্চল ও বঙ্গোপসাগরের অর্থনৈতিক করিডোর' }
                    ]
                }
            });
        }
        categories.push({
            id: 'capitals',
            icon: '🏛️',
            label: { en: 'Capitals', bn: 'রাজধানী' },
            items: capitalItems
        });

        // 2. DIVISIONS (Available for Bangladesh & Division-based systems)
        if (isBangladesh) {
            const divisionItems = [
                { id: 'div_dhaka', name: { en: 'Dhaka Division', bn: 'ঢাকা বিভাগ' }, hq: 'Dhaka', districts: '13 Districts', area: '20,593 km²', pop: '44.2M', highlight: 'Political, commercial, and financial heart of the nation.' },
                { id: 'div_chattogram', name: { en: 'Chattogram Division', bn: 'চট্টগ্রাম বিভাগ' }, hq: 'Chattogram', districts: '11 Districts', area: '33,771 km²', pop: '33.2M', highlight: 'Port logistics, maritime economy, tea hills, and Bay of Bengal coastline.' },
                { id: 'div_rajshahi', name: { en: 'Rajshahi Division', bn: 'রাজশাহী বিভাগ' }, hq: 'Rajshahi', districts: '8 Districts', area: '18,174 km²', pop: '20.3M', highlight: 'Silk manufacturing, mango orchards, and northern agricultural bounty.' },
                { id: 'div_khulna', name: { en: 'Khulna Division', bn: 'খুলনা বিভাগ' }, hq: 'Khulna', districts: '10 Districts', area: '22,272 km²', pop: '17.4M', highlight: 'UNESCO Sundarbans mangrove forest, shrimp hatcheries, and Mongla port.' },
                { id: 'div_barishal', name: { en: 'Barishal Division', bn: 'বরিশাল বিভাগ' }, hq: 'Barishal', districts: '6 Districts', area: '13,297 km²', pop: '9.1M', highlight: 'Granary of Bengal, floating guava markets, and deltaic waterways.' },
                { id: 'div_sylhet', name: { en: 'Sylhet Division', bn: 'সিলেট বিভাগ' }, hq: 'Sylhet', districts: '4 Districts', area: '12,596 km²', pop: '11.0M', highlight: 'Emerald tea estates, natural gas reserves, wetlands, and holy shrines.' },
                { id: 'div_rangpur', name: { en: 'Rangpur Division', bn: 'রংপুর বিভাগ' }, hq: 'Rangpur', districts: '8 Districts', area: '16,185 km²', pop: '17.6M', highlight: 'Teesta river plains, tobacco, paddy production, and northern frontier.' },
                { id: 'div_mymensingh', name: { en: 'Mymensingh Division', bn: 'ময়মনসিংহ বিভাগ' }, hq: 'Mymensingh', districts: '4 Districts', area: '10,584 km²', pop: '12.2M', highlight: 'Aquaculture, Bangladesh Agricultural University, and Garo hill borders.' }
            ].map(d => ({
                id: d.id,
                icon: '🌐',
                name: d.name,
                badge: { en: `${d.districts} • Pop: ${d.pop}`, bn: `${d.districts} • জনসংখ্যা: ${d.pop}` },
                summary: { en: d.highlight, bn: d.highlight },
                details: {
                    overview: {
                        en: `${d.name.en} is one of Bangladesh's 8 first-level administrative divisions, headquartered in ${d.hq}. It encompasses ${d.districts} with a territorial extent of ${d.area}.`,
                        bn: `${d.name.bn} হলো বাংলাদেশের আটটি প্রশাসনিক বিভাগের একটি। এর সদর দপ্তর ${d.hq} শহরে অবস্থিত এবং এতে ${d.districts} অন্তর্ভুক্ত রয়েছে।`
                    },
                    metrics: [
                        { label: { en: 'Divisional Headquarters', bn: 'বিভাগীয় সদর দপ্তর' }, value: { en: d.hq, bn: d.hq } },
                        { label: { en: 'Total Area', bn: 'মোট আয়তন' }, value: { en: d.area, bn: d.area } },
                        { label: { en: 'Estimated Population', bn: 'জনসংখ্যা' }, value: { en: d.pop, bn: d.pop } },
                        { label: { en: 'Constituent Districts', bn: 'জেলার সংখ্যা' }, value: { en: d.districts, bn: d.districts } }
                    ],
                    highlights: [
                        { en: d.highlight, bn: d.highlight },
                        { en: 'Divisional Commissioner oversees administrative coordination', bn: 'বিভাগীয় কমিশনার প্রশাসনিক কার্যক্রম সমন্বয় করেন' },
                        { en: 'Contains dedicated universities, medical colleges, and regional commands', bn: 'উচ্চশিক্ষা প্রতিষ্ঠান, মেডিকেল কলেজ ও আঞ্চলিক কমান্ডের কার্যালয়' }
                    ]
                }
            }));

            categories.push({
                id: 'divisions',
                icon: '🌐',
                label: { en: 'Divisions', bn: 'বিভাগসমূহ' },
                items: divisionItems
            });
        }

        // 3. DISTRICTS (Available for Bangladesh, India, UK, and regional states)
        if (isBangladesh) {
            const districtItems = bangladeshDistrictsData.map(dist => ({
                id: `dist_${dist.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
                icon: '📍',
                name: dist.name,
                badge: { en: `${dist.div.en} Division`, bn: `${dist.div.bn} বিভাগ` },
                summary: { en: `District in ${dist.div.en} Division (Pop: ${dist.pop}, Area: ${dist.area}).`, bn: `${dist.div.bn} বিভাগের অন্তর্গত জেলা (জনসংখ্যা: ${dist.pop}, আয়তন: ${dist.area})।` },
                details: {
                    overview: {
                        en: `${dist.name.en} is an administrative district in ${dist.div.en} Division of Bangladesh. Managed by the Deputy Commissioner (DC) and District Police, it functions as the central tier of regional governance.`,
                        bn: `${dist.name.bn} হলো বাংলাদেশের ${dist.div.bn} বিভাগের একটি গুরুত্বপূর্ণ জেলা। জেলা প্রশাসক (ডিসি) এবং জেলা পুলিশ প্রশাসনের মাধ্যমে এর প্রশাসনিক কার্যক্রম পরিচালিত হয়।`
                    },
                    metrics: [
                        { label: { en: 'Parent Division', bn: 'বিভাগ' }, value: { en: dist.div.en, bn: dist.div.bn } },
                        { label: { en: 'Area', bn: 'আয়তন' }, value: { en: dist.area, bn: dist.area } },
                        { label: { en: 'Population', bn: 'জনসংখ্যা' }, value: { en: dist.pop, bn: dist.pop } },
                        { label: { en: 'Established', bn: 'প্রতিষ্ঠা সাল' }, value: { en: dist.established, bn: dist.established } }
                    ],
                    highlights: [
                        { en: 'Headed by the Deputy Commissioner & District Magistrate', bn: 'জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট দ্বারা পরিচালিত' },
                        { en: 'Subdivided into Upazilas, Thanas, and Union Parishads', bn: 'উপজেলা, থানা ও ইউনিয়ন পরিষদে বিভক্ত' },
                        { en: 'Rich in unique regional commerce, folk cuisine, and heritage', bn: 'অনন্য স্থানীয় ইতিহাস, সংস্কৃতি ও লোকজ ঐতিহ্যে সমৃদ্ধ' }
                    ]
                }
            }));
            categories.push({
                id: 'districts',
                icon: '📍',
                label: { en: 'Districts', bn: 'জেলাসমূহ' },
                items: districtItems
            });
        }

        // 4. UPAZILAS (Available for Bangladesh & Sub-district systems)
        if (isBangladesh) {
            const upazilaItems = bangladeshFamousUpazilas.map(upz => ({
                id: `upz_${upz.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
                icon: '🏘️',
                name: upz.name,
                badge: { en: `${upz.district.en} District`, bn: `${upz.district.bn} জেলা` },
                summary: { en: upz.note, bn: upz.note },
                details: {
                    overview: {
                        en: `${upz.name.en} is a vital sub-district tier in ${upz.district.en} District, Bangladesh. Upazilas are governed by the Upazila Parishad and the Upazila Nirbahi Officer (UNO).`,
                        bn: `${upz.name.bn} হলো বাংলাদেশের ${upz.district.bn} জেলার একটি অন্যতম গুরুত্বপূর্ণ উপজেলা। এটি উপজেলা নির্বাহী অফিসার (ইউএনও) এবং নির্বাচিত পরিষদের মাধ্যমে পরিচালিত হয়।`
                    },
                    metrics: [
                        { label: { en: 'District', bn: 'জেলা' }, value: { en: upz.district.en, bn: upz.district.bn } },
                        { label: { en: 'Estimated Population', bn: 'জনসংখ্যা' }, value: { en: upz.pop, bn: upz.pop } },
                        { label: { en: 'Land Area', bn: 'আয়তন' }, value: { en: upz.area, bn: upz.area } },
                        { label: { en: 'Key Role', bn: 'মূল ভূমিকা' }, value: { en: 'Grassroots Administrative Center', bn: 'তৃণমূল পর্যায়ের উন্নয়ন ও প্রশাসনিক কেন্দ্র' } }
                    ],
                    highlights: [
                        { en: upz.note, bn: upz.note },
                        { en: 'Administers primary healthcare, agriculture, and educational complexes', bn: 'উপজেলা স্বাস্থ্য কমপ্লেক্স, কৃষি সম্প্রসারণ ও শিক্ষাপ্রতিষ্ঠানের কেন্দ্র' },
                        { en: 'Coordinates grassroots local governance across Union Parishads', bn: 'ইউনিয়ন পরিষদের বিভিন্ন উন্নয়ন প্রকল্পের সমন্বয়ক' }
                    ]
                }
            }));
            categories.push({
                id: 'upazilas',
                icon: '🏘️',
                label: { en: 'Upazilas', bn: 'উপজেলাসমূহ' },
                items: upazilaItems
            });
        }

        // 5. STATES (For Federal Nations: USA, India, Australia, Brazil, Germany, etc.)
        if (isFederal) {
            let stateItems = [];
            if (normKey === 'united_states_of_america') {
                stateItems = usaStatesData.map(st => ({
                    id: `state_${st.name.en.toLowerCase()}`,
                    icon: '🗺️',
                    name: st.name,
                    badge: { en: `Cap: ${st.cap} • Pop: ${st.pop}`, bn: `রাজধানী: ${st.cap} • জনসংখ্যা: ${st.pop}` },
                    summary: { en: `U.S. Federal State admitted in ${st.admitted} (GDP: ${st.gdp}).`, bn: `মার্কিন যুক্তরাষ্ট্রের অঙ্গরাজ্য (জিডিপি: ${st.gdp}, অন্তর্ভুক্তি: ${st.admitted})।` },
                    details: {
                        overview: {
                            en: `${st.name.en} is a constituent federal state of the United States. It possesses autonomous constitutional powers with an elected Governor, state legislature, and supreme court.`,
                            bn: `${st.name.bn} হলো মার্কিন যুক্তরাষ্ট্রের একটি গুরুত্বপূর্ণ অঙ্গরাজ্য। নিজস্ব গভর্নর, আইনসভা ও বিচার বিভাগের মাধ্যমে এটি পরিচালিত হয়।`
                        },
                        metrics: [
                            { label: { en: 'State Capital', bn: 'রাজধানী' }, value: { en: st.cap, bn: st.cap } },
                            { label: { en: 'Population', bn: 'জনসংখ্যা' }, value: { en: st.pop, bn: st.pop } },
                            { label: { en: 'State GDP', bn: 'অর্থনীতি / জিডিপি' }, value: { en: st.gdp, bn: st.gdp } },
                            { label: { en: 'Admission to Union', bn: 'যুক্তরাষ্ট্রে অন্তর্ভুক্তি' }, value: { en: st.admitted, bn: st.admitted } }
                        ],
                        highlights: [
                            { en: 'Sovereign legislative powers under the 10th Amendment of the U.S. Constitution', bn: 'সংবিধান অনুসারে অভ্যন্তরীণ আইন প্রণয়নের পূর্ণ স্বাধীনতা' },
                            { en: 'Elects U.S. Senators and Representatives to Congress', bn: 'মার্কিন কংগ্রেসে সিনেটর ও প্রতিনিধি নির্বাচন করে' }
                        ]
                    }
                }));
            } else if (normKey === 'india') {
                stateItems = indiaStatesData.map(st => ({
                    id: `state_${st.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
                    icon: '🗺️',
                    name: st.name,
                    badge: { en: `Cap: ${st.cap} • Pop: ${st.pop}`, bn: `রাজধানী: ${st.cap} • জনসংখ্যা: ${st.pop}` },
                    summary: { en: `${st.zone} State of India with an economy of ${st.gdp}.`, bn: `ভারতের অঙ্গরাজ্য (অর্থনীতি: ${st.gdp}, জনসংখ্যা: ${st.pop})।` },
                    details: {
                        overview: {
                            en: `${st.name.en} is a constituent state of the Republic of India. Headed by a Governor and Chief Minister with a Legislative Assembly (Vidhan Sabha).`,
                            bn: `${st.name.bn} ভারতের একটি গুরুত্বপূর্ণ অঙ্গরাজ্য। রাজ্যপাল ও মুখ্যমন্ত্রীর নেতৃত্বে নিজস্ব বিধানসভার মাধ্যমে এটি পরিচালিত হয়।`
                        },
                        metrics: [
                            { label: { en: 'Capital City', bn: 'রাজধানী' }, value: { en: st.cap, bn: st.cap } },
                            { label: { en: 'Population', bn: 'জনসংখ্যা' }, value: { en: st.pop, bn: st.pop } },
                            { label: { en: 'State GDP (GSDP)', bn: 'জিডিপি' }, value: { en: st.gdp, bn: st.gdp } },
                            { label: { en: 'Zonal Council', bn: 'অঞ্চল' }, value: { en: st.zone, bn: st.zone } }
                        ],
                        highlights: [
                            { en: 'Autonomous power over law, agriculture, and state infrastructure', bn: 'আইনশৃঙ্খলা, কৃষি ও অবকাঠামো উন্নয়নে নিজস্ব নিয়ন্ত্রণ' },
                            { en: 'Sends elected members to Lok Sabha and Rajya Sabha', bn: 'লোকসভা ও রাজ্যসভায় নির্বাচিত সাংসদ প্রেরণ করে' }
                        ]
                    }
                }));
            } else {
                // Generic federal states
                const sampleStates = ['Northern State', 'Central Province State', 'Eastern Maritime State', 'Southern Highlands State', 'Western Metropolitan State'];
                stateItems = sampleStates.map((s, idx) => ({
                    id: `state_gen_${idx}`,
                    icon: '🗺️',
                    name: { en: `${nameEn} ${s}`, bn: `${nameBn} ${s}` },
                    badge: { en: 'Federated State', bn: 'ফেডারেল রাজ্য' },
                    summary: { en: `Autonomous constituent state of the federation of ${nameEn}.`, bn: `${nameBn}-এর স্বায়ত্তশাসিত ফেডারেল রাজ্য।` },
                    details: {
                        overview: { en: `Major federal state in ${nameEn} exercising regional legislative and executive authority under the national constitution.`, bn: `${nameBn}-এর গুরুত্বপূর্ণ ফেডারেল রাজ্য যা নিজস্ব আঞ্চলিক আইনসভা ও প্রশাসনের মাধ্যমে পরিচালিত।` },
                        metrics: [
                            { label: { en: 'Status', bn: 'মর্যাদা' }, value: { en: 'Federated State', bn: 'ফেডারেল রাজ্য' } },
                            { label: { en: 'Governance', bn: 'শাসনব্যবস্থা' }, value: { en: 'State Governor & Parliament', bn: 'রাজ্যপাল ও স্থানীয় আইনসভা' } }
                        ],
                        highlights: [
                            { en: 'Maintains independent municipal police and education boards', bn: 'স্বাধীন পুলিশ ও স্থানীয় শিক্ষা বোর্ড পরিচালনা করে' }
                        ]
                    }
                }));
            }

            categories.push({
                id: 'states',
                icon: '🗺️',
                label: { en: 'States', bn: 'অঙ্গরাজ্যসমূহ' },
                items: stateItems
            });
        }

        // 6. SUB-STATES (Territories, Regions, Prefectures, Governorates)
        if (!isBangladesh) {
            const subStateItems = [
                { id: 'sub_1', name: { en: 'Northern Autonomous Region', bn: 'উত্তরাঞ্চলীয় প্রদেশ' }, type: 'Autonomous Region / Province', pop: '25% of Population', hq: 'Regional Economic Hub' },
                { id: 'sub_2', name: { en: 'Central Capital Region', bn: 'কেন্দ্রীয় রাজধানী অঞ্চল' }, type: 'Federal Territory', pop: 'National Urban Core', hq: 'Metropolitan Seat' },
                { id: 'sub_3', name: { en: 'Southern Coastlands & Maritime Zone', bn: 'দক্ষিণাঞ্চলীয় উপকূলীয় অঞ্চল' }, type: 'Maritime District / Province', pop: 'Maritime & Port Hub', hq: 'Coastal Port' },
                { id: 'sub_4', name: { en: 'Western Highland Provinces', bn: 'পশ্চিমাঞ্চলীয় প্রদেশ' }, type: 'Resource & Agricultural Territory', pop: 'Agrarian Base', hq: 'Highland Capital' }
            ].map(sb => ({
                id: sb.id,
                icon: '🧭',
                name: sb.name,
                badge: { en: sb.type, bn: sb.type },
                summary: { en: `Key regional territory and administrative sub-state in ${nameEn}.`, bn: `${nameBn}-এর অন্যতম প্রধান প্রশাসনিক উপ-অঞ্চল।` },
                details: {
                    overview: { en: `${sb.name.en} coordinates regional public services, environmental preservation, and economic hubs.`, bn: `${sb.name.bn} স্থানীয় সেবা, অর্থনৈতিক করিডোর ও আঞ্চলিক শাসন সমন্বয় করে।` },
                    metrics: [
                        { label: { en: 'Administrative Class', bn: 'শ্রেণীবিভাগ' }, value: { en: sb.type, bn: sb.type } },
                        { label: { en: 'Demographics', bn: 'জনসংখ্যা বিন্যাস' }, value: { en: sb.pop, bn: sb.pop } }
                    ],
                    highlights: [
                        { en: 'Direct legislative interface between municipalities and national departments', bn: 'কেন্দ্রীয় সরকার ও স্থানীয় পৌর কর্পোরেশনের মধ্যে সংযোগসূত্র' }
                    ]
                }
            }));

            categories.push({
                id: 'sub_states',
                icon: '🧭',
                label: { en: 'Sub-States / Regions', bn: 'উপ-অঙ্গরাজ্য ও প্রদেশ' },
                items: subStateItems
            });
        }

        // 7. KING / MONARCH (Only for Monarchies)
        if (isMonarchy) {
            let monarchTitleEn = 'His Majesty the King / Sovereign Monarch';
            let monarchTitleBn = 'মহামান্য রাজা / সার্বভৌম সম্রাট';
            let sovereignNameEn = `${nameEn} Sovereign Monarch`;
            let sovereignNameBn = `${nameBn}-এর মহামান্য সম্রাট/রাজা`;
            let palaceEn = 'Royal Palace';
            let dynastyEn = 'Royal House';

            if (normKey === 'united_kingdom' || normKey === 'canada' || normKey === 'australia' || normKey === 'new_zealand') {
                sovereignNameEn = 'King Charles III';
                sovereignNameBn = 'রাজা তৃতীয় চার্লস';
                monarchTitleEn = 'King of the United Kingdom & Other Commonwealth Realms';
                monarchTitleBn = 'যুক্তরাজ্য ও কমনওয়েলথ রাষ্ট্রসমূহের রাজা';
                palaceEn = 'Buckingham Palace & Windsor Castle';
                dynastyEn = 'House of Windsor';
            } else if (normKey === 'saudi_arabia') {
                sovereignNameEn = 'King Salman bin Abdulaziz Al Saud';
                sovereignNameBn = 'বাদশাহ সালমান বিন আব্দুল আজিজ আল সৌদ';
                monarchTitleEn = 'Custodian of the Two Holy Mosques & King of Saudi Arabia';
                monarchTitleBn = 'খাদেমুল হারামাইন ও সৌদি আরবের বাদশাহ';
                palaceEn = 'Al-Yamamah Palace, Riyadh';
                dynastyEn = 'House of Saud';
            } else if (normKey === 'japan') {
                sovereignNameEn = 'Emperor Naruhito';
                sovereignNameBn = 'সম্রাট নারুহিতো';
                monarchTitleEn = 'Emperor of Japan (Reiwa Era)';
                monarchTitleBn = 'জাপানের সম্রাট (রেইওয়া যুগ)';
                palaceEn = 'Tokyo Imperial Palace (Kokyo)';
                dynastyEn = 'Imperial House of Japan (Yamato Dynasty)';
            } else if (normKey === 'spain') {
                sovereignNameEn = 'King Felipe VI';
                sovereignNameBn = 'রাজা ষষ্ঠ ফেলিপে';
                palaceEn = 'Palacio de la Zarzuela, Madrid';
                dynastyEn = 'House of Bourbon';
            }

            categories.push({
                id: 'king',
                icon: '👑',
                label: { en: 'King / Monarch', bn: 'সম্রাট / রাজা' },
                items: [
                    {
                        id: 'sovereign_head',
                        icon: '👑',
                        name: { en: sovereignNameEn, bn: sovereignNameBn },
                        badge: { en: monarchTitleEn, bn: monarchTitleBn },
                        summary: { en: `Reigning monarch and constitutional head of state of ${nameEn}.`, bn: `${nameBn}-এর বর্তমান সার্বভৌম রাষ্ট্রপ্রধান ও সম্রাট/রাজা।` },
                        details: {
                            overview: {
                                en: `${sovereignNameEn} represents the historic continuity, unity, and constitutional sovereign legitimacy of ${nameEn}. The Crown performs formal constitutional duties, grants royal assent to legislation, and receives diplomatic ambassadors.`,
                                bn: `${sovereignNameBn} হলেন ${nameBn}-এর ঐক্য ও সার্বভৌম ঐতিহ্যের প্রতীক। তিনি রাষ্ট্রীয় আনুষ্ঠানিক দায়িত্ব পালন করেন, আইনে রাজকীয় সম্মতি প্রদান করেন এবং আন্তর্জাতিক রাষ্ট্রদূতদের অভ্যর্থনা জানান।`
                            },
                            metrics: [
                                { label: { en: 'Title & Style', bn: 'পদবি ও মর্যাদা' }, value: { en: monarchTitleEn, bn: monarchTitleBn } },
                                { label: { en: 'Royal Dynasty', bn: 'রাজবংশ' }, value: { en: dynastyEn, bn: dynastyEn } },
                                { label: { en: 'Official Residence', bn: 'রাজপ্রাসাদ / বাসভবন' }, value: { en: palaceEn, bn: palaceEn } },
                                { label: { en: 'Constitutional Role', bn: 'সংবিধানিক ভূমিকা' }, value: { en: 'Head of State / Supreme Sovereign', bn: 'সার্বভৌম রাষ্ট্রপ্রধান' } }
                            ],
                            highlights: [
                                { en: 'Supreme representative of the nation in international ceremonies', bn: 'আন্তর্জাতিক মঞ্চে জাতির সর্বোচ্চ আনুষ্ঠানিক প্রতিনিধিত্ব' },
                                { en: 'Symbol of centuries of continuous statehood and cultural identity', bn: 'শতাব্দী প্রাচীন সার্বভৌম ঐতিহ্য ও সংস্কৃতির অবিচ্ছেদ্য অংশ' }
                            ]
                        }
                    }
                ]
            });
        }

        // 8. PRESIDENT (For Republics)
        if (!isMonarchy) {
            let presNameEn = `${nameEn} Head of State`;
            let presNameBn = `${nameBn}-এর মহামান্য রাষ্ট্রপতি`;
            let presResEn = 'Presidential Palace';

            if (isBangladesh) {
                presNameEn = 'Mohammed Shahabuddin';
                presNameBn = 'মোহাম্মদ সাহাবুদ্দিন';
                presResEn = 'Bangabhaban, Dhaka';
            } else if (normKey === 'united_states_of_america') {
                presNameEn = 'President of the United States (POTUS)';
                presNameBn = 'মার্কিন যুক্তরাষ্ট্রের রাষ্ট্রপতি (পোটাস)';
                presResEn = 'The White House, 1600 Pennsylvania Ave, Washington, D.C.';
            } else if (normKey === 'india') {
                presNameEn = 'Droupadi Murmu';
                presNameBn = 'দ্রৌপদী মুর্মু';
                presResEn = 'Rashtrapati Bhavan, New Delhi';
            } else if (normKey === 'france') {
                presNameEn = 'Emmanuel Macron';
                presNameBn = 'ইমানুয়েল ম্যাক্রোঁ';
                presResEn = 'Élysée Palace, Paris';
            } else if (normKey === 'germany') {
                presNameEn = 'Frank-Walter Steinmeier';
                presNameBn = 'ফ্রাঙ্ক-ভাল্টার স্টাইনমায়ার';
                presResEn = 'Bellevue Palace, Berlin';
            } else if (normKey === 'russia') {
                presNameEn = 'Vladimir Putin';
                presNameBn = 'ভ্লাদিমির পুতিন';
                presResEn = 'The Grand Kremlin Palace, Moscow';
            } else if (normKey === 'brazil') {
                presNameEn = 'Luiz Inácio Lula da Silva';
                presNameBn = 'লুইজ ইনাসিও লুলা দা সিলভা';
                presResEn = 'Palácio do Planalto, Brasília';
            }

            categories.push({
                id: 'president',
                icon: '🎖️',
                label: { en: 'President', bn: 'রাষ্ট্রপতি' },
                items: [
                    {
                        id: 'national_president',
                        icon: '🎖️',
                        name: { en: presNameEn, bn: presNameBn },
                        badge: { en: 'Head of State & Commander-in-Chief', bn: 'রাষ্ট্রপ্রধান ও সশস্ত্র বাহিনীর সর্বাধিনায়ক' },
                        summary: { en: `Constitutional Head of State and supreme representative of ${nameEn}.`, bn: `${nameBn}-এর সাংবিধানিক রাষ্ট্রপ্রধান ও জাতির প্রথম নাগরিক।` },
                        details: {
                            overview: {
                                en: `The President is the Supreme Head of State of ${nameEn}. Entrusted with upholding the constitution, granting pardons, appointing key judicial officials, and serving as the supreme commander of the national armed forces.`,
                                bn: `রাষ্ট্রপতি হলেন ${nameBn}-এর সংবিধানের অভিভাবক ও সর্বোচ্চ রাষ্ট্রপ্রধান। তিনি সশস্ত্র বাহিনীর সর্বাধিনায়ক, প্রধান বিচারপতি এবং বিভিন্ন সাংবিধানিক পদে নিয়োগ প্রদান করেন।`
                            },
                            metrics: [
                                { label: { en: 'Official Residence', bn: 'সরকারি বাসভবন' }, value: { en: presResEn, bn: presResEn } },
                                { label: { en: 'Constitutional Term', bn: 'মেয়াদকাল' }, value: { en: '5 Years (Renewable)', bn: '৫ বছর' } },
                                { label: { en: 'Executive Role', bn: 'ভূমিকা' }, value: { en: 'Supreme Head of State', bn: 'সার্বভৌম রাষ্ট্রপ্রধান' } }
                            ],
                            highlights: [
                                { en: 'Accredits ambassadors and promulgates national ordinances', bn: 'আন্তর্জাতিক রাষ্ট্রদূতদের নিয়োগপত্র গ্রহণ ও অধ্যাদেশ জারি' },
                                { en: 'Represents the sovereignty and inviolability of the Republic', bn: 'প্রজাতন্ত্রের সার্বভৌমত্ব ও ঐক্যের প্রতীক' }
                            ]
                        }
                    }
                ]
            });
        }

        // 9. PRIME MINISTER (For Parliamentary and Semi-Presidential Systems)
        if (isBangladesh || normKey === 'united_kingdom' || normKey === 'india' || normKey === 'japan' || normKey === 'canada' || normKey === 'australia' || normKey === 'france' || normKey === 'italy' || normKey === 'pakistan' || normKey === 'malaysia' || normKey === 'spain' || normKey === 'singapore' || normKey === 'nepal' || normKey === 'germany') {
            let pmNameEn = `${nameEn} Prime Minister / Head of Government`;
            let pmNameBn = `${nameBn}-এর প্রধানমন্ত্রী / সরকারপ্রধান`;
            let pmOfficeEn = 'Prime Minister\'s Office';

            if (isBangladesh) {
                pmNameEn = 'Chief Adviser / Prime Minister';
                pmNameBn = 'প্রধান উপদেষ্টা / প্রধানমন্ত্রী';
                pmOfficeEn = 'Chief Adviser\'s Office / Cabinet Secretariat, Tejgaon, Dhaka';
            } else if (normKey === 'united_kingdom') {
                pmNameEn = 'Keir Starmer';
                pmNameBn = 'কিয়ার স্টারমার';
                pmOfficeEn = '10 Downing Street, London';
            } else if (normKey === 'india') {
                pmNameEn = 'Narendra Modi';
                pmNameBn = 'নরেন্দ্র মোদী';
                pmOfficeEn = '7 Lok Kalyan Marg, New Delhi';
            } else if (normKey === 'germany') {
                pmNameEn = 'Olaf Scholz (Federal Chancellor)';
                pmNameBn = 'ওলাফ শলৎস (ফেডারেল চ্যান্সেলর)';
                pmOfficeEn = 'Federal Chancellery, Berlin';
            } else if (normKey === 'japan') {
                pmNameEn = 'Prime Minister of Japan';
                pmNameBn = 'জাপানের প্রধানমন্ত্রী';
                pmOfficeEn = 'Kantei, Chiyoda, Tokyo';
            } else if (normKey === 'canada') {
                pmNameEn = 'Justin Trudeau';
                pmNameBn = 'জাস্টিন ট্রুডো';
                pmOfficeEn = 'Office of the Prime Minister, Ottawa';
            } else if (normKey === 'australia') {
                pmNameEn = 'Anthony Albanese';
                pmNameBn = 'অ্যান্টনি অ্যালবানিজ';
                pmOfficeEn = 'The Lodge, Canberra & Kirribilli House';
            }

            categories.push({
                id: 'prime_minister',
                icon: '👔',
                label: { en: 'Prime Minister', bn: 'প্রধানমন্ত্রী' },
                items: [
                    {
                        id: 'head_of_government',
                        icon: '👔',
                        name: { en: pmNameEn, bn: pmNameBn },
                        badge: { en: 'Head of Government & Cabinet Leader', bn: 'সরকারপ্রধান ও মন্ত্রিসভার সভাপতি' },
                        summary: { en: `Chief executive leading the national cabinet and executive government of ${nameEn}.`, bn: `${nameBn}-এর প্রধান নির্বাহী ও সরকারের সার্বিক নীতিনির্ধারণী প্রধান।` },
                        details: {
                            overview: {
                                en: `The Prime Minister / Head of Government directs national policy, presides over the Council of Ministers, and leads the executive branch in governing ${nameEn}. Answerable to Parliament and the citizens.`,
                                bn: `প্রধানমন্ত্রী হলেন সরকারের প্রধান নির্বাহী কর্মকর্তা। তিনি মন্ত্রিসভার বৈঠক পরিচালনা করেন, বিভিন্ন মন্ত্রণালয়ের কাজের তদারকি করেন এবং জাতীয় নীতি প্রণয়নে নেতৃত্ব দেন।`
                            },
                            metrics: [
                                { label: { en: 'Official Executive Office', bn: 'প্রধান কার্যালয়' }, value: { en: pmOfficeEn, bn: pmOfficeEn } },
                                { label: { en: 'Authority', bn: 'সাংবিধানিক ক্ষমতা' }, value: { en: 'Chief Executive of Government', bn: 'সরকারের প্রধান নির্বাহী' } },
                                { label: { en: 'Accountability', bn: 'জবাবদিহিতা' }, value: { en: 'National Parliament / Assembly', bn: 'জাতীয় সংসদ / আইনসভা' } }
                            ],
                            highlights: [
                                { en: 'Formulates national socio-economic and foreign policies', bn: 'জাতীয় অর্থনৈতিক ও পররাষ্ট্রনীতি প্রণয়নে প্রধান ভূমিকা' },
                                { en: 'Directs development megaprojects and civil governance', bn: 'বৃহৎ উন্নয়ন প্রকল্প ও নাগরিক সেবার সার্বিক পরিচালনা' }
                            ]
                        }
                    }
                ]
            });
        }

        // 10. MINISTERS (Cabinet Portfolios)
        const ministersList = [
            { portfolio: { en: 'Ministry of Finance', bn: 'অর্থ মন্ত্রণালয়' }, role: 'National Budget, Taxation, Treasury & Macroeconomic Policy', icon: '💰' },
            { portfolio: { en: 'Ministry of Foreign Affairs', bn: 'পররাষ্ট্র মন্ত্রণালয়' }, role: 'Bilateral Relations, Diplomatic Missions, Treaties & Global Accords', icon: '🌐' },
            { portfolio: { en: 'Ministry of Defense', bn: 'প্রতিরক্ষা মন্ত্রণালয়' }, role: 'National Territorial Security, Armed Forces & Strategic Deterrence', icon: '🛡️' },
            { portfolio: { en: 'Ministry of Home / Interior', bn: 'স্বরাষ্ট্র মন্ত্রণালয়' }, role: 'Domestic Security, Police, Border Guards & Disaster Response', icon: '👮' },
            { portfolio: { en: 'Ministry of Planning & Economy', bn: 'পরিকল্পনা ও অর্থনীতি মন্ত্রণালয়' }, role: 'Long-Term Strategic Development & Mega-Infrastructure Planning', icon: '📈' },
            { portfolio: { en: 'Ministry of Health & Family Welfare', bn: 'স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়' }, role: 'National Public Health Infrastructure, Hospitals & Disease Control', icon: '🏥' },
            { portfolio: { en: 'Ministry of Education', bn: 'শিক্ষা মন্ত্রণালয়' }, role: 'Schools, Universities, Scientific Research & Vocational Academies', icon: '🎓' },
            { portfolio: { en: 'Ministry of Power, Energy & Minerals', bn: 'বিদ্যুৎ, জ্বালানি ও খনিজ সম্পদ মন্ত্রণালয়' }, role: 'National Grid Stability, Oil, Gas & Renewable Transitions', icon: '⚡' },
            { portfolio: { en: 'Ministry of Law, Justice & Parliamentary Affairs', bn: 'আইন ও বিচার বিষয়ক মন্ত্রণালয়' }, role: 'Statutory Drafting, Judicial Infrastructure & Legal Integrity', icon: '⚖️' },
            { portfolio: { en: 'Ministry of ICT & Digital Transformation', bn: 'তথ্য ও যোগাযোগ প্রযুক্তি মন্ত্রণালয়' }, role: 'Digital Governance, Telecommunications & AI Innovation', icon: '💻' },
            { portfolio: { en: 'Ministry of Commerce & Industries', bn: 'বাণিজ্য ও শিল্প মন্ত্রণালয়' }, role: 'Export Promotion, Manufacturing Standards & Tariff Treaties', icon: '🏭' },
            { portfolio: { en: 'Ministry of Environment, Forest & Climate', bn: 'পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়' }, role: 'Ecological Preservation, Wildlife Conservation & Green Action', icon: '🌿' }
        ].map((m, idx) => ({
            id: `min_${idx}`,
            icon: m.icon,
            name: m.portfolio,
            badge: { en: 'Cabinet Portfolio', bn: 'কেবিনেট মন্ত্রণালয়' },
            summary: { en: m.role, bn: m.role },
            details: {
                overview: {
                    en: `${m.portfolio.en} is an essential executive department of ${nameEn}, responsible for ${m.role}.`,
                    bn: `${m.portfolio.bn} হলো ${nameBn}-এর একটি অত্যন্ত গুরুত্বপূর্ণ নির্বাহী মন্ত্রণালয়, যা জাতীয় পর্যায়ের সার্বিক নীতি ও সেবা নিয়ন্ত্রণ করে।`
                },
                metrics: [
                    { label: { en: 'Ministerial Rank', bn: 'মর্যাদা' }, value: { en: 'Cabinet Minister / Secretary', bn: 'কেবিনেট মন্ত্রী / উপদেষ্টা' } },
                    { label: { en: 'Scope of Responsibility', bn: 'কাজের পরিধি' }, value: { en: m.role, bn: m.role } }
                ],
                highlights: [
                    { en: 'Oversees specialized directorates, academies, and autonomous statutory boards', bn: 'বিশেষায়িত অধিদপ্তর ও সংবিধিবদ্ধ প্রতিষ্ঠান তদারকি করে' },
                    { en: 'Formulates statutory rules, annual budgets, and national welfare programs', bn: 'বার্ষিক বাজেট প্রণয়ন এবং উন্নয়ন কর্মসূচি বাস্তবায়ন করে' }
                ]
            }
        }));

        categories.push({
            id: 'ministers',
            icon: '👥',
            label: { en: 'Ministers', bn: 'মন্ত্রিসভা / মন্ত্রীগণ' },
            items: ministersList
        });

        // 11. PARLIAMENT (National Legislature)
        let parlNameEn = `${nameEn} National Parliament`;
        let parlNameBn = `${nameBn}-এর জাতীয় সংসদ`;
        let parlSeatsEn = '350 - 500 Seats';
        let parlSeatLocEn = 'Parliament Complex';
        let parlStructureEn = 'Democratic Representative Legislature';

        if (isBangladesh) {
            parlNameEn = 'Jatiya Sangsad (House of the Nation)';
            parlNameBn = 'জাতীয় সংসদ (বাংলাদেশ)';
            parlSeatsEn = '350 Seats (300 General + 50 Reserved for Women)';
            parlSeatLocEn = 'Jatiya Sangsad Bhaban, Sher-e-Bangla Nagar, Dhaka (Designed by Louis Kahn)';
            parlStructureEn = 'Unicameral Democratic Parliament';
        } else if (normKey === 'united_states_of_america') {
            parlNameEn = 'United States Congress (Bicameral)';
            parlNameBn = 'মার্কিন কংগ্রেস (দ্বিকক্ষবিশিষ্ট)';
            parlSeatsEn = '535 Total (100 Senate + 435 House of Representatives)';
            parlSeatLocEn = 'United States Capitol, Washington, D.C.';
            parlStructureEn = 'Bicameral Federal Legislature';
        } else if (normKey === 'united_kingdom') {
            parlNameEn = 'Parliament of the United Kingdom';
            parlNameBn = 'যুক্তরাজ্যের সংসদ (পার্লামেন্ট)';
            parlSeatsEn = 'House of Commons (650) & House of Lords (~780)';
            parlSeatLocEn = 'Palace of Westminster, London';
            parlStructureEn = 'Bicameral Westminster System';
        } else if (normKey === 'india') {
            parlNameEn = 'Sansad (Parliament of India)';
            parlNameBn = 'ভারতের সংসদ (সংসদ ভবন)';
            parlSeatsEn = 'Lok Sabha (543) & Rajya Sabha (245)';
            parlSeatLocEn = 'New Parliament House, Sansad Marg, New Delhi';
            parlStructureEn = 'Bicameral Sovereign Legislature';
        }

        categories.push({
            id: 'parliament',
            icon: '🏛️',
            label: { en: 'Parliament', bn: 'জাতীয় সংসদ' },
            items: [
                {
                    id: 'national_assembly',
                    icon: '🏛️',
                    name: { en: parlNameEn, bn: parlNameBn },
                    badge: { en: parlStructureEn, bn: 'গণতান্ত্রিক আইনসভা' },
                    summary: { en: `Supreme legislative authority enacting statutes, approving budgets, and scrutinizing executive actions in ${nameEn}.`, bn: `${nameBn}-এর সর্বোচ্চ আইন প্রণয়নকারী ও বাজেট অনুমোদনকারী সাংবিধানিক প্রতিষ্ঠান।` },
                    details: {
                        overview: {
                            en: `${parlNameEn} embodies the sovereign will of the people of ${nameEn}. It deliberates on statutory bills, debates national policy, reviews public expenditures, and holds executive ministries accountable.`,
                            bn: `${parlNameBn} হলো জনগণের সার্বভৌম আকাঙ্ক্ষার প্রতীক। এটি আইন প্রণয়ন, বার্ষিক জাতীয় বাজেট পাস এবং সরকারের কার্যনির্বাহী শাখাকে জবাবদিহিতার আওতায় আনে।`
                        },
                        metrics: [
                            { label: { en: 'Assembly Headquarters', bn: 'সংসদ ভবন' }, value: { en: parlSeatLocEn, bn: parlSeatLocEn } },
                            { label: { en: 'Composition & Seats', bn: 'আসন সংখ্যা' }, value: { en: parlSeatsEn, bn: parlSeatsEn } },
                            { label: { en: 'Chamber Structure', bn: 'কক্ষ কাঠামো' }, value: { en: parlStructureEn, bn: parlStructureEn } },
                            { label: { en: 'Constitutional Term', bn: 'মেয়াদকাল' }, value: { en: '5 Years unless dissolved', bn: '৫ বছর' } }
                        ],
                        highlights: [
                            { en: 'Power of the purse: Exclusively enacts taxation and budgetary appropriations', bn: 'কর আরোপ এবং জাতীয় ব্যয় বরাদ্দের একমাত্র সাংবিধানিক এখতিয়ার' },
                            { en: 'Permanent standing committees scrutinize every government ministry', bn: 'মন্ত্রণালয়ভিত্তিক স্থায়ী কমিটিগুলোর মাধ্যমে সরকারি কার্যক্রম পর্যবেক্ষণ' }
                        ]
                    }
                }
            ]
        });

        // 12. MEMBERS OF PARLIAMENT (MPs & Leadership)
        const mpItems = [
            { id: 'speaker', icon: '⚖️', title: { en: 'Speaker of the Parliament', bn: 'স্পিকার' }, desc: 'Presides over parliamentary sessions, maintains floor decorum, and certifies constitutional bills.' },
            { id: 'deputy_speaker', icon: '🏛️', title: { en: 'Deputy Speaker & Panel of Chairmen', bn: 'ডেপুটি স্পিকার' }, desc: 'Assists and presides during absence of Speaker, manages committee calendars and debate schedules.' },
            { id: 'leader_house', icon: '👑', title: { en: 'Leader of the House / Prime Minister', bn: 'সংসদ নেতা' }, desc: 'Leads the legislative majority, guides government bills through parliament, and addresses state matters.' },
            { id: 'leader_opp', icon: '🗣️', title: { en: 'Leader of the Opposition', bn: 'বিরোধী দলীয় নেতা' }, desc: 'Leads parliamentary scrutiny, proposes alternative policies, and champions civil debate.' },
            { id: 'constituency_mps', icon: '🗳️', title: { en: 'Constituency Elected MPs (Direct Representation)', bn: 'নির্বাচিত সংসদ সদস্যগণ' }, desc: 'Directly elected lawmakers representing geographic constituencies across the country.' },
            { id: 'standing_committees', icon: '📑', title: { en: 'Parliamentary Standing Committee Chairs', bn: 'সংসদীয় স্থায়ী কমিটির সভাপতিগণ' }, desc: 'Heads specialized oversight bodies examining defense, finance, health, and law enforcement.' }
        ].map(m => ({
            id: m.id,
            icon: m.icon,
            name: m.title,
            badge: { en: 'Parliamentary Representative', bn: 'সংসদীয় নেতৃত্ব' },
            summary: { en: m.desc, bn: m.desc },
            details: {
                overview: {
                    en: `${m.title.en} performs vital constitutional functions within the legislature of ${nameEn}.`,
                    bn: `${m.title.bn} হলেন ${nameBn}-এর আইনসভার অন্যতম প্রধান সাংবিধানিক চালিকাশক্তি।`
                },
                metrics: [
                    { label: { en: 'Role Type', bn: 'দায়িত্ব' }, value: { en: m.title.en, bn: m.title.bn } },
                    { label: { en: 'Function', bn: 'ভূমিকা' }, value: { en: m.desc, bn: m.desc } }
                ],
                highlights: [
                    { en: 'Empowered by parliamentary privilege and constitutional immunity in debates', bn: 'সংসদীয় বিশেষ অধিকার ও বিতর্ক করার পূর্ণ অধিকার' },
                    { en: 'Direct conduit between local grassroots constituents and national legislation', bn: 'স্থানীয় জনগণ ও জাতীয় নীতিমালার মধ্যে প্রধান সেতুবন্ধন' }
                ]
            }
        }));

        categories.push({
            id: 'mps',
            icon: '📜',
            label: { en: 'Members of Parliament', bn: 'সংসদ সদস্যগণ' },
            items: mpItems
        });

        // 13. GDP (Gross Domestic Product)
        categories.push({
            id: 'gdp',
            icon: '📈',
            label: { en: 'GDP (Economy)', bn: 'জিডিপি (মোট দেশজ উৎপাদন)' },
            items: [
                {
                    id: 'gdp_nominal',
                    icon: '💵',
                    name: { en: `Nominal GDP: ${curGdp.nom}`, bn: `নমিনাল জিডিপি: ${curGdp.nom}` },
                    badge: { en: `Global Ranking: ${curGdp.rank}`, bn: `বিশ্ব অবস্থান: ${curGdp.rank}` },
                    summary: { en: `Total market value of all finished goods and services produced within ${nameEn}.`, bn: `${nameBn}-এর অভ্যন্তরে উৎপাদিত সকল পণ্য ও সেবার মোট বাজারমূল্য।` },
                    details: {
                        overview: {
                            en: `Nominal Gross Domestic Product reflects the current monetary volume of economic activity across manufacturing, services, and agriculture in ${nameEn}.`,
                            bn: `${nameBn}-এর নমিনাল জিডিপি দেশের অভ্যন্তরে কৃষি, শিল্প ও সেবা খাতের সামগ্রিক অর্থনৈতিক উৎপাদন নির্দেশ করে।`
                        },
                        metrics: [
                            { label: { en: 'Nominal Value', bn: 'নমিনাল মূল্য' }, value: { en: curGdp.nom, bn: curGdp.nom } },
                            { label: { en: 'GDP (PPP Adjusted)', bn: 'পিপিপি সমন্বিত জিডিপি' }, value: { en: curGdp.ppp, bn: curGdp.ppp } },
                            { label: { en: 'GDP Per Capita', bn: 'মাথাপিছু জিডিপি' }, value: { en: curGdp.pc, bn: curGdp.pc } },
                            { label: { en: 'Key Economic Pillars', bn: 'প্রধান খাতসমূহ' }, value: { en: 'Services (52%), Industry (32%), Agriculture (16%)', bn: 'সেবা খাত (৫২%), শিল্প (৩২%), কৃষি (১৬%)' } }
                        ],
                        highlights: [
                            { en: 'Expanding export corridors and expanding domestic consumer markets', bn: 'রপ্তানি খাতের সম্প্রসারণ ও অভ্যন্তরীণ ভোক্তার চাহিদা বৃদ্ধি' },
                            { en: 'High growth in digital technology, infrastructure, and green power', bn: 'ডিজিটাল প্রযুক্তি, যোগাযোগ অবকাঠামো ও নবায়নযোগ্য জ্বালানির দ্রুত বিকাশ' }
                        ]
                    }
                },
                {
                    id: 'gdp_sectors',
                    icon: '🏭',
                    name: { en: 'Key Industrial & Service Sectors', bn: 'প্রধান শিল্প ও সেবা খাত' },
                    badge: { en: 'Economic Drivers', bn: 'অর্থনৈতিক চালিকাশক্তি' },
                    summary: { en: `Pillars generating national employment, export revenues, and innovation.`, bn: `জাতীয় কর্মসংস্থান ও বৈদেশিক মুদ্রা আয়ের প্রধান ভিত্তি।` },
                    details: {
                        overview: {
                            en: `The production engine of ${nameEn} is propelled by strong industrial manufacturing, financial commerce, logistics, telecommunications, and skilled workforce output.`,
                            bn: `${nameBn}-এর অর্থনৈতিক শক্তি নির্ভর করে উৎপাদনশীল শিল্প, তথ্যপ্রযুক্তি, ব্যাংকিং ও সেবা খাতের সমন্বিত অগ্রগতির ওপর।`
                        },
                        metrics: [
                            { label: { en: 'Industrial Share', bn: 'শিল্প খাতের অবদান' }, value: { en: '~30 - 35% of GDP', bn: 'জিডিপির ৩০ - ৩৫%' } },
                            { label: { en: 'Services Share', bn: 'সেবা খাতের অবদান' }, value: { en: '~50 - 55% of GDP', bn: 'জিডিপির ৫০ - ৫৫%' } }
                        ],
                        highlights: [
                            { en: 'Competitive edge in global supply chains and regional commerce', bn: 'আন্তর্জাতিক সরবরাহ ব্যবস্থা ও আঞ্চলিক বাণিজ্যে শক্ত অবস্থান' }
                        ]
                    }
                }
            ]
        });

        // 14. GNP / GNI (Gross National Product)
        categories.push({
            id: 'gnp',
            icon: '📊',
            label: { en: 'GNP / GNI', bn: 'জিএনপি (মোট জাতীয় উৎপাদন)' },
            items: [
                {
                    id: 'gnp_overview',
                    icon: '📊',
                    name: { en: `Gross National Product: ${curGdp.nom}`, bn: `মোট জাতীয় উৎপাদন (জিএনপি)` },
                    badge: { en: 'Worldwide National Income', bn: 'নাগরিকদের বিশ্বব্যাপী মোট আয়' },
                    summary: { en: `Total output produced by residents of ${nameEn}, including net foreign remittances and capital flows.`, bn: `${nameBn}-এর সকল নাগরিকের দেশীয় ও আন্তর্জাতিক আয়ের মোট যোগফল।` },
                    details: {
                        overview: {
                            en: `Gross National Product (GNP/GNI) measures total domestic economic production plus net income receipts from citizens, corporate headquarters, and expatriates living abroad.`,
                            bn: `জিএনপি বা জিএনআই হলো দেশের ভৌগোলিক উৎপাদনের সাথে বিশ্বের বিভিন্ন প্রান্তে অবস্থানরত প্রবাসী নাগরিকদের প্রেরিত রেমিট্যান্স এবং বহির্বিশ্বের আয়ের সমন্বয়।`
                        },
                        metrics: [
                            { label: { en: 'Gross National Income', bn: 'মোট জাতীয় আয়' }, value: { en: curGdp.nom, bn: curGdp.nom } },
                            { label: { en: 'Net Foreign Factor Income', bn: 'প্রবাসী আয় / রেমিট্যান্স' }, value: { en: 'Substantial Positive Remittance Surplus', bn: 'উচ্চ রেমিট্যান্স প্রবাহ ও বৈদেশিক বিনিময়' } },
                            { label: { en: 'World Bank Income Tier', bn: 'বিশ্বব্যাংক আয় শ্রেণী' }, value: { en: 'Middle / High Income Trajectory', bn: 'উন্নয়নশীল ও মধ্যম আয়ের অবস্থান' } }
                        ],
                        highlights: [
                            { en: 'Expatriate workforce provides vital foreign currency stability', bn: 'প্রবাসী বাংলাদেশীদের পাঠানো রেমিট্যান্স রিজার্ভকে স্থিতিশীল রাখে' },
                            { en: 'Supports national purchasing power and foreign exchange reserves', bn: 'আন্তর্জাতিক লেনদেনের ভারসাম্য ও বৈদেশিক মুদ্রা সংরক্ষণে সহায়ক' }
                        ]
                    }
                }
            ]
        });

        // 15. TOTAL POPULATION
        categories.push({
            id: 'population',
            icon: '👨‍👩‍👧‍👦',
            label: { en: 'Total Population', bn: 'মোট জনসংখ্যা ও জনমিতি' },
            items: [
                {
                    id: 'pop_demographics',
                    icon: '👥',
                    name: { en: `Total Population: ${curPop.total}`, bn: `মোট জনসংখ্যা: ${curPop.total}` },
                    badge: { en: `Density: ${curPop.density}`, bn: `ঘনত্ব: ${curPop.density}` },
                    summary: { en: `Demographic profile, youth workforce dividend, and literacy rates in ${nameEn}.`, bn: `${nameBn}-এর জনসংখ্যার পরিসংখ্যান, তরুণ মানবসম্পদ ও শিক্ষার হার।` },
                    details: {
                        overview: {
                            en: `${nameEn} boasts a vibrant and resilient populace of ${curPop.total}. A young median age provides a robust demographic dividend fueling technological and industrial transformation.`,
                            bn: `${nameBn}-এর মূল শক্তি হলো সেখানকার ${curPop.total} পরিশ্রমী ও সম্ভাবনাময় জনগোষ্ঠী। গড় বয়স তরুণ হওয়ায় দেশটি ডেমোগ্রাফিক ডিভিডেন্ডের সুবিধা ভোগ করছে।`
                        },
                        metrics: [
                            { label: { en: 'Total Count', bn: 'মোট জনসংখ্যা' }, value: { en: curPop.total, bn: curPop.total } },
                            { label: { en: 'Population Density', bn: 'জনসংখ্যার ঘনত্ব' }, value: { en: curPop.density, bn: curPop.density } },
                            { label: { en: 'Annual Growth Rate', bn: 'বার্ষিক বৃদ্ধির হার' }, value: { en: curPop.growth, bn: curPop.growth } },
                            { label: { en: 'Median Age', bn: 'গড় বয়স' }, value: { en: curPop.median, bn: curPop.median } },
                            { label: { en: 'Adult Literacy', bn: 'সাক্ষরতার হার' }, value: { en: curPop.lit, bn: curPop.lit } }
                        ],
                        highlights: [
                            { en: 'Rapid expansion of university graduates and skilled technical artisans', bn: 'উচ্চশিক্ষিত ও কারিগরি দক্ষতাসম্পন্ন যুব সমাজের দ্রুত বৃদ্ধি' },
                            { en: 'Urbanization accelerating around core economic metropolitan zones', bn: 'প্রধান বাণিজ্যিক শহরগুলোকে কেন্দ্র করে দ্রুত নগরায়ন' }
                        ]
                    }
                }
            ]
        });

        // 16. ALL NATIONAL EMBLEMS
        let emblemItems = [];
        if (isBangladesh) {
            emblemItems = [
                { id: 'emb_national_symbol', icon: '⚜️', name: { en: 'National Emblem of Bangladesh', bn: 'বাংলাদেশের জাতীয় প্রতীক' }, desc: 'White Water Lily (Shapla) floating on water, flanked by two sheaves of paddy rice, crowned by four stars and three jute leaves.', cat: 'State Crest' },
                { id: 'emb_flag', icon: '🇧🇩', name: { en: 'National Flag (Lal-Sobuj)', bn: 'জাতীয় পতাকা (লাল-সবুজ)' }, desc: 'Red disc of freedom and blood sacrifice centered slightly leftward on a deep bottle-green field of fertile Bengal.', cat: 'Flag' },
                { id: 'emb_anthem', icon: '🎵', name: { en: 'National Anthem ("Amar Sonar Bangla")', bn: 'জাতীয় সংগীত ("আমার সোনার বাংলা")' }, desc: 'Composed by Nobel laureate Rabindranath Tagore, adopted during the 1971 Liberation War.', cat: 'Anthem' },
                { id: 'emb_animal', icon: '🐅', name: { en: 'National Animal: Royal Bengal Tiger', bn: 'জাতীয় পশু: রয়েল বেঙ্গল টাইগার' }, desc: 'Majestic predator inhabiting the mangrove forests of the Sundarbans; symbol of bravery and power.', cat: 'Fauna' },
                { id: 'emb_bird', icon: '🐦', name: { en: 'National Bird: Oriental Magpie-Robin (Doel)', bn: 'জাতীয় পাখি: দোয়েল' }, desc: 'Acoustically melodious black-and-white songbird familiar in orchards, wetlands, and rural homesteads.', cat: 'Fauna' },
                { id: 'emb_flower', icon: '🪷', name: { en: 'National Flower: White Water Lily (Shapla)', bn: 'জাতীয় ফুল: সাদা শাপলা' }, desc: 'Elegant aquatic flower blooming across ponds and rivers throughout Bangladesh; symbol of purity.', cat: 'Flora' },
                { id: 'emb_fruit', icon: '🍈', name: { en: 'National Fruit: Jackfruit (Kathal)', bn: 'জাতীয় ফল: কাঁঠাল' }, desc: 'Nutritious tropical fruit celebrated across Bengal for its sweet bulbs and abundant harvest.', cat: 'Flora' },
                { id: 'emb_tree', icon: '🌳', name: { en: 'National Tree: Mango Tree (Aam Gach)', bn: 'জাতীয় বৃক্ষ: আম গাছ' }, desc: 'Beloved deciduous shade tree yielding king-of-fruits mangoes across historic orchards.', cat: 'Flora' },
                { id: 'emb_fish', icon: '🐟', name: { en: 'National Fish: Hilsa (Ilish)', bn: 'জাতীয় মাছ: ইলিশ' }, desc: 'Anadromous silver fish swimming upstream in Padma and Meghna rivers; culinary pride of Bengal.', cat: 'Aquatic' },
                { id: 'emb_game', icon: '🤼', name: { en: 'National Sport: Kabaddi (Ha-du-du)', bn: 'জাতীয় খেলা: কাবাডি (হা-ডু-ডু)' }, desc: 'High-energy traditional tag combat sport demonstrating agility, breath control, and teamwork.', cat: 'Sport' },
                { id: 'emb_motto', icon: '🚩', name: { en: 'National Slogan / Motto: "Joy Bangla"', bn: 'জাতীয় স্লোগান: "জয় বাংলা"' }, desc: 'Historic rallying cry of national freedom, unity, and democratic self-determination.', cat: 'Motto' }
            ].map(e => ({
                id: e.id,
                icon: e.icon,
                name: e.name,
                badge: { en: e.cat, bn: e.cat },
                summary: { en: e.desc, bn: e.desc },
                details: {
                    overview: {
                        en: `${e.name.en} is officially enshrined in the constitution and statutory laws of Bangladesh as a sacred emblem of sovereign identity.`,
                        bn: `${e.name.bn} হলো গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধানে স্বীকৃত একটি অনন্য জাতীয় প্রতীক।`
                    },
                    metrics: [
                        { label: { en: 'Category', bn: 'ধরণ' }, value: { en: e.cat, bn: e.cat } },
                        { label: { en: 'Symbolic Significance', bn: 'তাৎপর্য' }, value: { en: e.desc, bn: e.desc } }
                    ],
                    highlights: [
                        { en: 'Symbolizes Bangladesh\'s natural splendor, rivers, and liberation heritage', bn: 'বাংলার অপরূপ প্রাকৃতিক রূপ ও মুক্তিযুদ্ধের অবিনাশী চেতনার বহিঃপ্রকাশ' },
                        { en: 'Protected by national heritage protocols and state ceremonies', bn: 'রাষ্ট্রীয় অনুষ্ঠানে মর্যাদার সাথে সংরক্ষিত ও ব্যবহৃত হয়' }
                    ]
                }
            }));
        } else if (normKey === 'united_states_of_america') {
            emblemItems = [
                { id: 'emb_seal', icon: '🦅', name: { en: 'Great Seal of the United States', bn: 'মার্কিন যুক্তরাষ্ট্রের গ্রেট সিল' }, desc: 'Bald eagle holding arrows of war and olive branch of peace, with 13 stars.', cat: 'State Seal' },
                { id: 'emb_flag', icon: '🇺🇸', name: { en: 'National Flag: The Stars and Stripes', bn: 'জাতীয় পতাকা (স্টার্স অ্যান্ড স্ট্রাইপস)' }, desc: '13 alternating red and white stripes and 50 white stars on blue canton.', cat: 'Flag' },
                { id: 'emb_anthem', icon: '🎶', name: { en: 'National Anthem: The Star-Spangled Banner', bn: 'জাতীয় সংগীত (স্টার-স্প্যাংগেল্ড ব্যানার)' }, desc: 'Lyrics by Francis Scott Key penned during the War of 1812.', cat: 'Anthem' },
                { id: 'emb_bird', icon: '🦅', name: { en: 'National Bird: Bald Eagle', bn: 'জাতীয় পাখি: বাল্ড ঈগল' }, desc: 'Fierce raptor chosen for its majestic freedom, power, and courage.', cat: 'Fauna' },
                { id: 'emb_mammal', icon: '🦬', name: { en: 'National Mammal: American Bison', bn: 'জাতীয় স্তন্যপায়ী: আমেরিকান বাইসন' }, desc: 'Symbol of the vast Great Plains, endurance, and frontier heritage.', cat: 'Fauna' },
                { id: 'emb_flower', icon: '🌹', name: { en: 'National Flower: Rose', bn: 'জাতীয় ফুল: গোলাপ' }, desc: 'Official floral emblem representing universal beauty, love, and devotion.', cat: 'Flora' },
                { id: 'emb_tree', icon: '🌳', name: { en: 'National Tree: Oak Tree', bn: 'জাতীয় বৃক্ষ: ওক গাছ' }, desc: 'Sturdy hardwood tree symbolizing longevity, fortitude, and shelter.', cat: 'Flora' },
                { id: 'emb_motto', icon: '📜', name: { en: 'Motto: "In God We Trust" & "E Pluribus Unum"', bn: 'জাতীয় নীতিবাক্য' }, desc: '"Out of many, one" - unity derived from diverse sovereign states and cultures.', cat: 'Motto' }
            ].map(e => ({
                id: e.id,
                icon: e.icon,
                name: e.name,
                badge: { en: e.cat, bn: e.cat },
                summary: { en: e.desc, bn: e.desc },
                details: {
                    overview: { en: `${e.name.en} is officially established by acts of Congress as an American national emblem.`, bn: `${e.name.bn} মার্কিন আইনসভা ও ঐতিহ্যে স্বীকৃত জাতীয় প্রতীক।` },
                    metrics: [
                        { label: { en: 'Category', bn: 'ধরণ' }, value: { en: e.cat, bn: e.cat } },
                        { label: { en: 'Symbolism', bn: 'অর্থ' }, value: { en: e.desc, bn: e.desc } }
                    ],
                    highlights: [
                        { en: 'Embodied across federal currency, treaties, and civil buildings', bn: 'মার্কিন মুদ্রা, দলিল ও সরকারি ভবনে ব্যবহৃত হয়' }
                    ]
                }
            }));
        } else {
            // Generic comprehensive emblems for all other world countries
            emblemItems = [
                { id: 'emb_national_arms', icon: '🛡️', name: { en: `Coat of Arms of ${nameEn}`, bn: `${nameBn}-এর জাতীয় প্রতীক / কোট অব আর্মস` }, desc: 'Official heraldic achievement representing the sovereign identity and heritage of the state.', cat: 'State Emblem' },
                { id: 'emb_flag', icon: '🏳️', name: { en: `National Flag of ${nameEn}`, bn: `${nameBn}-এর জাতীয় পতাকা` }, desc: 'Recognized colors, stripes, or celestial emblems honoring the historical revolution and independence.', cat: 'National Flag' },
                { id: 'emb_anthem', icon: '🎵', name: { en: `National Anthem of ${nameEn}`, bn: `${nameBn}-এর জাতীয় সংগীত` }, desc: 'Solemn musical hymn celebrating the bravery, soil, and independence of the nation.', cat: 'National Anthem' },
                { id: 'emb_fauna', icon: '🦁', name: { en: `National Animal / Fauna of ${nameEn}`, bn: `${nameBn}-এর জাতীয় পশু` }, desc: 'Iconic native wildlife species protected as a symbol of the land\'s natural biodiversity.', cat: 'Wildlife' },
                { id: 'emb_flora', icon: '🌸', name: { en: `National Flower / Tree of ${nameEn}`, bn: `${nameBn}-এর জাতীয় ফুল ও বৃক্ষ` }, desc: 'Native botanical blossom celebrated in literature, folk art, and festival celebrations.', cat: 'Flora' },
                { id: 'emb_motto', icon: '📜', name: { en: `National Motto of ${nameEn}`, bn: `${nameBn}-এর জাতীয় নীতিবাক্য` }, desc: 'Inspirational civic creed inspiring unity, freedom, progress, and courage.', cat: 'Motto' }
            ].map(e => ({
                id: e.id,
                icon: e.icon,
                name: e.name,
                badge: { en: e.cat, bn: e.cat },
                summary: { en: e.desc, bn: e.desc },
                details: {
                    overview: { en: `${e.name.en} is officially enshrined as an enduring heraldic symbol of ${nameEn}.`, bn: `${e.name.bn} হলো ${nameBn}-এর জাতীয় মর্যাদার অন্যতম নিদর্শন।` },
                    metrics: [
                        { label: { en: 'Designation', bn: 'মর্যাদা' }, value: { en: e.cat, bn: e.cat } },
                        { label: { en: 'Significance', bn: 'তাৎপর্য' }, value: { en: e.desc, bn: e.desc } }
                    ],
                    highlights: [
                        { en: 'Symbol of independence, patriotism, and sovereignty', bn: 'স্বাধীনতা, দেশপ্রেম এবং জাতীয় সার্বভৌমত্বের প্রতীক' }
                    ]
                }
            }));
        }

        categories.push({
            id: 'emblems',
            icon: '🌺',
            label: { en: 'All National Emblems', bn: 'সকল জাতীয় প্রতীক' },
            items: emblemItems
        });

        // 17. DEFENCE FORCES (Armed Forces: Army, Navy, Air Force, Coast Guard, etc.)
        let defenceItems = [];
        if (normKey === 'bangladesh') {
            defenceItems = [
                {
                    id: 'bd_army',
                    icon: '🎖️',
                    name: { en: 'Bangladesh Army', bn: 'বাংলাদেশ সেনাবাহিনী' },
                    badge: { en: 'Land Warfare Force', bn: 'স্থল প্রতিরক্ষা বাহিনী' },
                    summary: { en: 'Premier land component tasked with defending territorial integrity and leading UN Peacekeeping.', bn: 'সার্বভৌমত্ব রক্ষা ও জাতিসংঘ শান্তিরক্ষা মিশনে বিশ্বনন্দিত প্রধান স্থলবাহিনী।' },
                    details: {
                        overview: {
                            en: 'The Bangladesh Army is the land forces branch of the Bangladesh Armed Forces. Founded during the 1971 Liberation War, it is modernizing under the Forces Goal 2030 modernization program and ranks consistently among the world\'s top United Nations Peacekeeping troop contributors.',
                            bn: 'বাংলাদেশ সেনাবাহিনী হলো সশস্ত্র বাহিনীর অন্যতম প্রধান স্থল শাখা। ১৯৭১ সালের মহান মুক্তিযুদ্ধে গঠিত এই বাহিনী "ফোর্সেস গোল ২০৩০"-এর আওতায় আধুনিকায়িত হচ্ছে এবং জাতিসংঘ শান্তিরক্ষা মিশনে বিশ্বের শীর্ষ সেনা প্রেরণকারী হিসেবে অনন্য ভূমিকা পালন করছে।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: 'In War, In Peace, Everywhere for the Nation', bn: '"সমরে আমরা শান্তিতে আমরা সর্বত্র আমরা দেশের তরে"' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'Dhaka Cantonment, Dhaka', bn: 'ঢাকা সেনানিবাস, ঢাকা' } },
                            { label: { en: 'Active Personnel', bn: 'সক্রিয় সেনা সদস্য' }, value: { en: 'Approx. 165,000 + 40,000 Reserves', bn: 'প্রায় ১,৬৫,০০০ জন + ৪০,০০০ রিজার্ভ' } },
                            { label: { en: 'Commander-in-Chief', bn: 'সর্বাধিনায়ক' }, value: { en: 'President of Bangladesh', bn: 'মহামান্য রাষ্ট্রপতি' } },
                            { label: { en: 'Chief of Army Staff', bn: 'সেনাবাহিনী প্রধান' }, value: { en: 'General (Four-Star)', bn: 'জেনারেল' } },
                            { label: { en: 'Primary Combat Assets', bn: 'প্রধান সমর সরঞ্জাম' }, value: { en: 'VT-1A MBT, Type 59G Durjoy tanks, Nora B-52 155mm SP Howitzers, BTR-80 APCs, Otokar Cobra, FM-90 SAM', bn: 'ভিটি-১এ যুদ্ধট্যাঙ্ক, টাইপ ৫৯জি দুর্জয়, নোরা বি-৫২ হাউইটজার, বিটিআর-৮০ সাঁজোয়া যান, এফএম-৯০ আকাশ প্রতিরক্ষা ক্ষেপণাস্ত্র' } }
                        ],
                        highlights: [
                            { en: 'Formed from the heroic Mukti Bahini freedom fighters in the 1971 Liberation War', bn: '১৯৭১ সালের মহান মুক্তিযুদ্ধে মুক্তিপাগল বীর মুক্তিযোদ্ধাদের সমন্বয়ে প্রতিষ্ঠিত' },
                            { en: 'Preeminent contributor to UN Peacekeeping operations in 54+ international missions', bn: 'জাতিসংঘ শান্তিরক্ষা কার্যক্রমে বিশ্বের ১ নম্বর সেনা প্রেরণকারী দেশের সম্মান অর্জন' },
                            { en: 'Vital frontline pillar in national disaster relief, flood evacuations, and infrastructure megaprojects', bn: 'ঘূর্ণিঝড়, বন্যাসহ জাতীয় দুর্যোগ মোকাবিলা এবং পদ্মা সেতু রেলসংযোগসহ মেগাপ্রকল্পে প্রকৌশল সহায়তা' }
                        ]
                    }
                },
                {
                    id: 'bd_navy',
                    icon: '⚓',
                    name: { en: 'Bangladesh Navy', bn: 'বাংলাদেশ নৌবাহিনী' },
                    badge: { en: 'Maritime & Naval Fleet', bn: 'নৌ ও সমুদ্র প্রতিরক্ষা' },
                    summary: { en: 'Guarding 118,813 sq km exclusive economic zone, sea lanes, and submarine deterrent in the Bay of Bengal.', bn: 'বঙ্গোপসাগরে ১,১৮,৮১৩ বর্গকিমি সমুদ্রসীমা, বাণিজ্যিক পথ ও সাবমেরিন বহর পরিচালনাকারী।' },
                    details: {
                        overview: {
                            en: 'The Bangladesh Navy is the naval warfare service branch safeguarding the nation\'s maritime boundaries, maritime trade routes, and offshore natural gas deposits in the Bay of Bengal. It operates a three-dimensional blue-water fleet consisting of frigates, corvettes, submarines, maritime patrol aircraft, and special warfare commandos.',
                            bn: 'বাংলাদেশ নৌবাহিনী হলো দেশের বিশাল সামুদ্রিক জলসীমা, ব্লু ইকোনমি ও জ্বালানি সম্পদ সুরক্ষায় নিয়োজিত ত্রি-মাত্রিক বাহিনী। সাবমেরিন, মিসাইল ফ্রিগেট, কর্ভেট, পেট্রোল বিমান ও কমান্ডো দল নিয়ে এটি পরিচালিত।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: 'In Peace and War, Invincible at Sea', bn: '"শান্তিতে সংগ্রামে সমুদ্রে দুর্জয়"' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'Naval Headquarters, Banani, Dhaka', bn: 'নৌ সদর দপ্তর, বনানী, ঢাকা' } },
                            { label: { en: 'Active Personnel', bn: 'সক্রিয় নৌ সদস্য' }, value: { en: 'Approx. 25,000 + Reserves', bn: 'প্রায় ২৫,০০০ জন' } },
                            { label: { en: 'Chief of Naval Staff', bn: 'নৌবাহিনী প্রধান' }, value: { en: 'Admiral (Four-Star)', bn: 'এডমিরাল' } },
                            { label: { en: 'Submarine Arm', bn: 'সাবমেরিন বহর' }, value: { en: 'BNS Nabajatra & BNS Joyjatra (Type 035G Submarines)', bn: 'বানৌজা নবযাত্রা ও বানৌজা জয়যাত্রা (টাইপ ০৩৫জি)' } },
                            { label: { en: 'Flagship Surface Fleet', bn: 'প্রধান যুদ্ধজাহাজ' }, value: { en: 'BNS Bangabandhu, BNS Somudra Joy, BNS Abu Bakr, Shadhinota-class Corvettes', bn: 'বানৌজা বঙ্গবন্ধু, সমুদ্র জয়, আবু বকর, স্বাধীনতা ক্লাস কর্ভেট' } }
                        ],
                        highlights: [
                            { en: 'Operates submarine base BNS Sheikh Hasina at Pekua, Cox\'s Bazar', bn: 'কক্সবাজারের পেকুয়ায় নির্মিত দেশের প্রথম পূর্ণাঙ্গ সাবমেরিন ঘাঁটি "বানৌজা শেখ হাসিনা"' },
                            { en: 'Deploys elite special operations unit: Special Warfare Diving and Salvage (SWADS)', bn: 'বিশেষ কমান্ডো শাখা: সোয়াডস (SWADS) এর মাধ্যমে সন্ত্রাস দমন ও উদ্ধার অভিযান পরিচালনা' },
                            { en: 'Participates in UNIFIL maritime peacekeeping missions in the Mediterranean Sea', bn: 'ভূমধ্যসাগরে লেবানন উপকূলে জাতিসংঘ শান্তিরক্ষা মিশনে যুদ্ধজাহাজ মোতায়েন' }
                        ]
                    }
                },
                {
                    id: 'bd_air_force',
                    icon: '✈️',
                    name: { en: 'Bangladesh Air Force', bn: 'বাংলাদেশ বিমান বাহিনী' },
                    badge: { en: 'Aerospace & Air Superiority', bn: 'আকাশসীমা প্রতিরক্ষা' },
                    summary: { en: 'Defending sovereign aerospace, providing tactical airlift, close air support, and search-and-rescue.', bn: 'সার্বভৌম আকাশসীমা সুরক্ষা, কৌশলগত পরিবহন ও বিমান হামলায় সক্ষম আধুনিক বাহিনী।' },
                    details: {
                        overview: {
                            en: 'The Bangladesh Air Force (BAF) controls and protects Bangladesh\'s sovereign airspace. Born in 1971 at Dimapur with the historic "Kilo Flight", the BAF now deploys fourth-generation multirole supersonic fighters, tactical transport aircraft, attack helicopters, and high-altitude air surveillance radars.',
                            bn: 'বাংলাদেশ বিমান বাহিনী দেশের আকাশসীমার অখণ্ডতা রক্ষা করে। ১৯৭১ সালে ভারতের ডিমাপুরে "কিলো ফ্লাইট" দিয়ে এর ঐতিহাসিক সূচনা হয়। বর্তমানে এটি ৪র্থ প্রজন্মের সুপারসনিক যুদ্ধবিমান, এয়ারলিফট বিমান, হেলিকপ্টার ও উচ্চক্ষমতার রাডার পরিচালনা করে।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: 'Free Shall We Keep the Skies of Bengal', bn: '"বাংলার আকাশ রাখিব মুক্ত"' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'Air Headquarters, Dhaka Cantonment', bn: 'বিমান সদর, ঢাকা সেনানিবাস' } },
                            { label: { en: 'Active Personnel', bn: 'সক্রিয় বিমানসেনা' }, value: { en: 'Approx. 18,000 + 4,000 Reserves', bn: 'প্রায় ১৮,০০০ জন' } },
                            { label: { en: 'Chief of Air Staff', bn: 'বিমান বাহিনী প্রধান' }, value: { en: 'Air Chief Marshal (Four-Star)', bn: 'এয়ার চিফ মার্শাল' } },
                            { label: { en: 'Combat Aircraft', bn: 'যুদ্ধবিমান' }, value: { en: 'MiG-29SE, Chengdu F-7BGI, Yak-130 Lead-in Trainers', bn: 'মিগ-২৯, চেংদু এফ-৭বিজিআই, ইয়াক-১৩০' } },
                            { label: { en: 'Tactical Airlift & Helos', bn: 'পরিবহন বিমান ও হেলিকপ্টার' }, value: { en: 'Lockheed Martin C-130J Super Hercules, Mil Mi-171Sh, Bell 212', bn: 'সি-১৩০জে সুপার হারকিউলিস, এমআই-১৭১এসএইচ, বেল ২১২' } }
                        ],
                        highlights: [
                            { en: 'Famous historic root in "Kilo Flight" air raids during the 1971 Liberation War', bn: '১৯৭১ সালের কিলো ফ্লাইটের দুঃসাহসিক বিমান আক্রমণের মাধ্যমে ইতিহাস সৃষ্টি' },
                            { en: 'Operates UN helicopter contingents in Congo, Central African Republic, and Mali', bn: 'কঙ্গো, সেন্ট্রাল আফ্রিকান রিপাবলিক ও মালিতে জাতিসংঘ শান্তিরক্ষা মিশনে হেলিকপ্টার ইউনিট মোতায়েন' },
                            { en: 'High-tech Bangabandhu Aeronautical Centre (BAC) for aircraft maintenance and assembly', bn: 'বঙ্গবন্ধু অ্যারোনটিক্যাল সেন্টারের মাধ্যমে নিজস্ব প্রযুক্তিতে বিমান রক্ষণাবেক্ষণ ও সংযোজন' }
                        ]
                    }
                },
                {
                    id: 'bd_bgb',
                    icon: '🛡️',
                    name: { en: 'Border Guard Bangladesh (BGB)', bn: 'বর্ডার গার্ড বাংলাদেশ (বিজিবি)' },
                    badge: { en: 'Paramilitary Border Security', bn: 'সীমান্ত নিরাপত্তা বাহিনী' },
                    summary: { en: 'Paramilitary vanguard guarding 4,427 km of international borders with India and Myanmar.', bn: 'ভারত ও মিয়ানমারের সাথে ৪,৪২৭ কিমি আন্তর্জাতিক সীমান্ত পাহারা দানকারী আধা-সামরিক বাহিনী।' },
                    details: {
                        overview: {
                            en: 'Border Guard Bangladesh (BGB) is one of the oldest uniformed forces in the region, with roots dating back to the Ramgarh Local Battalion in 1795. It serves as the primary frontline border protection force safeguarding sovereignty, curbing smuggling, intercepting narcotics, and thwarting cross-border aggression.',
                            bn: 'বর্ডার গার্ড বাংলাদেশ (বিজিবি) হলো দেশের সীমান্ত সুরক্ষায় নিয়োজিত ঐতিহ্যবাহী আধা-সামরিক বাহিনী। ১৭৯৫ সালের রামগড় লোকাল ব্যাটালিয়ন থেকে এর ঐতিহ্য। এটি দেশের ৪,৪২৭ কিলোমিটার সীমান্ত পাহারা, চোরাচালান প্রতিরোধ ও সার্বভৌমত্ব রক্ষায় নিয়োজিত।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: 'Patriotism, Discipline & Duty', bn: '"দেশপ্রেম ও শৃঙ্খলা"' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'Pilkhana, Dhaka', bn: 'পিলখানা, ঢাকা' } },
                            { label: { en: 'Active Strength', bn: 'সদস্য সংখ্যা' }, value: { en: 'Approx. 70,000 Border Guards', bn: 'প্রায় ৭০,০০০ জন' } },
                            { label: { en: 'Director General', bn: 'মহাপরিচালক' }, value: { en: 'Major General', bn: 'মেজর জেনারেল' } },
                            { label: { en: 'Border Covered', bn: 'সুরক্ষিত সীমান্ত' }, value: { en: '4,156 km (India) + 271 km (Myanmar)', bn: '৪,১৫৬ কিমি (ভারত) + ২৭১ কিমি (মিয়ানমার)' } },
                            { label: { en: 'Special Equipment', bn: 'বিশেষ সরঞ্জাম' }, value: { en: 'All-Terrain Patrol Vehicles, Mi-171E Helicopters, Thermal Imaging Systems', bn: 'অল-টেরিন যান, এমআই-১৭১ই হেলিকপ্টার, নাইট ভিশন ক্যামেরা ও থার্মাল রাডার' } }
                        ],
                        highlights: [
                            { en: 'First responders in defending frontier sovereignty and stopping territorial infiltration', bn: 'সীমান্তে আগ্রাসন ও অনুপ্রবেশ রোধে প্রথম প্রতিরোধ ব্যূহ' },
                            { en: 'Operates specialized air wing with tactical transport and surveillance helicopters', bn: 'নিজস্ব এয়ার উইং-এর মাধ্যমে দুর্গম পাহাড়ি সীমান্ত নজরদারি' }
                        ]
                    }
                },
                {
                    id: 'bd_coast_guard',
                    icon: '🚤',
                    name: { en: 'Bangladesh Coast Guard', bn: 'বাংলাদেশ কোস্ট গার্ড' },
                    badge: { en: 'Coastal & Maritime Constabulary', bn: 'উপকূলীয় নিরাপত্তা বাহিনী' },
                    summary: { en: 'Maritime law enforcement, coastal anti-piracy, search-and-rescue, and fisheries conservation.', bn: 'উপকূলীয় জলসীমায় আইন প্রয়োগ, দস্যুতা দমন, মৎস্য সম্পদ রক্ষা ও উদ্ধারকাজে নিয়োজিত।' },
                    details: {
                        overview: {
                            en: 'The Bangladesh Coast Guard is the principal maritime law enforcement service operating in coastal waters and rivers. Formed under the Coast Guard Act of 1994, it provides coastal policing, combats piracy, interdicts illegal maritime smuggling, and enforces conservation laws during the Hilsha spawning season.',
                            bn: 'বাংলাদেশ কোস্ট গার্ড দেশের উপকূলীয় জলসীমা ও নদীপথের প্রধান আইন প্রয়োগকারী বাহিনী। ১৯৯৪ সালের আইনে প্রতিষ্ঠিত এই বাহিনী জলদস্যু দমন, চোরাচালান রোধ, দুর্ঘটনাকবলিত জাহাজ উদ্ধার এবং মা ইলিশ সংরক্ষণ অভিযানে অগ্রণী ভূমিকা রাখে।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: 'Guardian at Sea', bn: '"সমুদ্রের অভিভাবক"' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'Agargaon, Dhaka', bn: 'আগারগাঁও, ঢাকা' } },
                            { label: { en: 'Active Personnel', bn: 'সদস্য সংখ্যা' }, value: { en: 'Approx. 4,500 Personnel', bn: 'প্রায় ৪,৫০০ জন' } },
                            { label: { en: 'Director General', bn: 'মহাপরিচালক' }, value: { en: 'Rear Admiral', bn: 'রিয়ার এডমিরাল' } },
                            { label: { en: 'Fleet Inventory', bn: 'জাহাজ ও জলযান' }, value: { en: 'Leader-class Offshore Patrol Vessels, Inshore Patrol Vessels, High-speed Hovercraft', bn: 'লিডার-ক্লাস অফশোর পেট্রোল ভেসেল, ইনশোর পেট্রোল ভেসেল, হোভারক্রাফট ও মেটাল শার্ক বোট' } }
                        ],
                        highlights: [
                            { en: 'Patrols critical estuaries of the Meghna, Padma, and Sundarbans mangrove channels', bn: 'মেঘনা, পদ্মা এবং সুন্দরবনের দুর্গম নদীনালা ও মোহনায় সার্বক্ষণিক টহল' },
                            { en: 'Provides rapid lifesaving search and rescue during tropical cyclones and maritime distress', bn: 'ঘূর্ণিঝড়ে উপকূলীয় জনগণের জানমাল রক্ষা ও দুর্যোগে দ্রুত উদ্ধার তৎপরতা' }
                        ]
                    }
                }
            ];
        } else if (normKey === 'united_states_of_america') {
            defenceItems = [
                {
                    id: 'us_army',
                    icon: '🎖️',
                    name: { en: 'United States Army', bn: 'মার্কিন সেনাবাহিনী' },
                    badge: { en: 'Ground Warfare Branch', bn: 'স্থলবাহিনী' },
                    summary: { en: 'Oldest and premier military service branch providing prompt, sustained land dominance.', bn: 'মার্কিন সশস্ত্র বাহিনীর সর্বপ্রাচীন এবং বৃহত্তম স্থলযুদ্ধ শাখা।' },
                    details: {
                        overview: {
                            en: 'The United States Army is the land service branch of the United States Armed Forces, founded on June 14, 1775. As the largest branch, it conducts expeditionary land combat operations globally.',
                            bn: '১৭৭৫ সালে প্রতিষ্ঠিত মার্কিন সেনাবাহিনী দেশটির বৃহত্তম স্থলযুদ্ধ বাহিনী। বিশ্বব্যাপী স্থলভাগভিত্তিক অভিযান ও প্রতিরক্ষায় এটি নিয়োজিত।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: '"This We\'ll Defend"', bn: '"দিস উইল ডিফেন্ড"' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'The Pentagon, Arlington County, Virginia', bn: 'দ্য পেন্টাগন, আর্লিংটন, ভার্জিনিয়া' } },
                            { label: { en: 'Active Personnel', bn: 'সক্রিয় সেনা' }, value: { en: 'Approx. 452,000 + 330,000 Reserves/Guard', bn: 'প্রায় ৪,৫২,০০০ জন + ৩,৩০,০০০ রিজার্ভ' } },
                            { label: { en: 'Commander-in-Chief', bn: 'সর্বাধিনায়ক' }, value: { en: 'President of the United States', bn: 'মার্কিন প্রেসিডেন্ট' } },
                            { label: { en: 'Chief of Staff', bn: 'চিফ অব স্টাফ' }, value: { en: 'General (Four-Star)', bn: 'জেনারেল' } },
                            { label: { en: 'Key Equipment', bn: 'মূল সমর সরঞ্জাম' }, value: { en: 'M1A2 Abrams MBT, M2 Bradley IFV, Stryker APC, AH-64 Apache, Patriot Missile System', bn: 'এম১এ২ আব্রামস ট্যাঙ্ক, ব্রাডলি আইএফভি, স্ট্রাইকার, অ্যাপাচি হেলিকপ্টার, প্যাট্রিয়ট' } }
                        ],
                        highlights: [
                            { en: 'Maintains rapid expeditionary airborne and mechanized combat divisions globally', bn: 'বিশ্বের বিভিন্ন প্রান্তে এয়ারবোর্ন ও আর্মার্ড ডিভিশন মোতায়েন' },
                            { en: 'Pioneered tactical aerospace logistics and global theatre defence networks', bn: 'বিশ্বজুড়ে দ্রুত মোতায়েনযোগ্য লজিস্টিকস ও ক্ষেপণাস্ত্র প্রতিরক্ষা নেটওয়ার্ক' }
                        ]
                    }
                },
                {
                    id: 'us_navy',
                    icon: '⚓',
                    name: { en: 'United States Navy', bn: 'মার্কিন নৌবাহিনী' },
                    badge: { en: 'Global Blue-Water Fleet', bn: 'ব্লু-ওয়াটার নৌবহর' },
                    summary: { en: 'World\'s most powerful blue-water navy operating 11 nuclear aircraft carriers and submarines.', bn: 'বিশ্বের সবচেয়ে শক্তিশালী নৌবাহিনী, যাতে রয়েছে ১১টি পারমাণবিক বিমানবাহী রণতরী।' },
                    details: {
                        overview: {
                            en: 'The United States Navy operates across the world\'s oceans maintaining maritime freedom, deterrence, and force projection. Its 11 nuclear supercarriers and nuclear ballistic missile submarines form a central leg of the nuclear triad.',
                            bn: 'মার্কিন নৌবাহিনী বিশ্ব মহাসাগরে বাণিজ্য ও নিরাপত্তার আধিপত্য বজায় রাখে। এর পারমাণবিক সুপারক্যারিয়ার এবং সাবমেরিন বহর বৈশ্বিক শক্তির প্রতীক।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: '"Semper Fortis" (Always Courageous)', bn: '"সেম্পার ফোর্টিস" (সর্বদা সাহসী)' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'The Pentagon, Arlington, VA', bn: 'পেন্টাগন' } },
                            { label: { en: 'Active Personnel', bn: 'সক্রিয় নৌ সদস্য' }, value: { en: 'Approx. 340,000 Active Sailors', bn: 'প্রায় ৩,৪০,০০০ জন' } },
                            { label: { en: 'Nuclear Aircraft Carriers', bn: 'পারমাণবিক রণতরী' }, value: { en: '11 Supercarriers (Nimitz & Gerald R. Ford classes)', bn: '১১টি সুপারক্যারিয়ার (নিমিটজ ও ফোর্ড ক্লাস)' } },
                            { label: { en: 'Submarines', bn: 'সাবমেরিন বহর' }, value: { en: 'Ohio-class SSBNs, Virginia & Los Angeles-class Fast Attack Submarines', bn: 'ওহাইও-ক্লাস ব্যালিস্টিক সাবমেরিন ও ভার্জিনিয়া ক্লাস' } }
                        ],
                        highlights: [
                            { en: 'Deploys carrier strike groups across the Atlantic, Pacific, and Mediterranean', bn: 'বিশ্বের প্রধান সমুদ্রসীমায় ক্যারিয়ার স্ট্রাইক গ্রুপ মোতায়েন' },
                            { en: 'Home to the elite Navy SEALs special operations counter-terrorism units', bn: 'বিশ্বখ্যাত নৌ কমান্ডো দল "নেভি সিল" (Navy SEALs)' }
                        ]
                    }
                },
                {
                    id: 'us_air_force',
                    icon: '✈️',
                    name: { en: 'United States Air Force', bn: 'মার্কিন বিমান বাহিনী' },
                    badge: { en: 'Aerospace & Global Strike', bn: 'গ্লোবাল স্ট্রাইক ও আকাশ শ্রেষ্ঠত্ব' },
                    summary: { en: 'Global air superiority, stealth bombers, strategic airlift, and ICBM nuclear deterrence.', bn: 'পঞ্চম প্রজন্মের স্টিলথ যুদ্ধবিমান ও আন্তঃমহাদেশীয় ক্ষেপণাস্ত্র চালনাকারী।' },
                    details: {
                        overview: {
                            en: 'The United States Air Force provides air supremacy, global integrated ISR, rapid global mobility, and global strike capability through stealth bombers and land-based Minuteman III ICBMs.',
                            bn: 'মার্কিন বিমান বাহিনী আকাশ শ্রেষ্ঠত্ব, স্টিলথ বোমারু বিমান এবং আন্তঃমহাদেশীয় পরমাণু ক্ষেপণাস্ত্র (ICBM) পরিচালনা করে।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: '"Aim High... Fly-Fight-Win"', bn: '"এইম হাই... ফ্লাই-ফাইট-উইন"' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'The Pentagon, Arlington, VA', bn: 'পেন্টাগন' } },
                            { label: { en: 'Active Personnel', bn: 'সক্রিয় সদস্য' }, value: { en: 'Approx. 320,000 Active Airmen', bn: 'প্রায় ৩,২০,০০০ জন' } },
                            { label: { en: 'Stealth Fighters & Bombers', bn: 'স্টিলথ বিমান' }, value: { en: 'F-22 Raptor, F-35A Lightning II, B-2 Spirit, B-21 Raider', bn: 'এফ-২২ র্যাপ্টর, এফ-৩৫এ, বি-২ স্পিরিট, বি-২১ রেইডার' } },
                            { label: { en: 'Strategic Bombers & ICBMs', bn: 'কৌশলগত বোমারু ও আইসিবিএম' }, value: { en: 'B-52H Stratofortress, B-1B Lancer, LGM-30G Minuteman III ICBM', bn: 'বি-৫২এইচ, বি-১বি, মিনিটম্যান ৩' } }
                        ],
                        highlights: [
                            { en: 'First air service to pioneer 5th generation operational stealth air dominance', bn: 'বিশ্বের প্রথম পঞ্চম প্রজন্মের কার্যকর স্টিলথ বিমান পরিচালনা' },
                            { en: 'Controls the ground-based leg of America\'s nuclear triad', bn: 'আমেরিকার পারমাণবিক ট্রায়াডের ভূমিভিত্তিক অংশ পরিচালনা' }
                        ]
                    }
                },
                {
                    id: 'us_marine_corps',
                    icon: '🦅',
                    name: { en: 'United States Marine Corps (USMC)', bn: 'মার্কিন মেরিন কোর' },
                    badge: { en: 'Amphibious Expeditionary Force', bn: 'উভচর আক্রমণ বাহিনী' },
                    summary: { en: 'Rapid-reaction amphibious expeditionary force ready for worldwide crisis deployment.', bn: 'বিশ্বের যেকোনো প্রান্তে বিদ্যুৎগতির উভচর আক্রমণ ও অভিযানে নিয়োজিত শাখা।' },
                    details: {
                        overview: {
                            en: 'The United States Marine Corps is the maritime expeditionary warfare branch designed for swift worldwide deployment from naval vessels to hostile shores.',
                            bn: 'মার্কিন মেরিন কোর হলো সমুদ্র থেকে উপকূলে অত্যন্ত দ্রুত আঘাত হানতে সক্ষম অভিজাত উভচর যুদ্ধ শাখা।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: '"Semper Fidelis" (Always Faithful)', bn: '"সেম্পার ফিডেলিস" (সর্বদা বিশ্বস্ত)' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'The Pentagon, Arlington, VA', bn: 'পেন্টাগন' } },
                            { label: { en: 'Active Personnel', bn: 'সক্রিয় মেরিন' }, value: { en: 'Approx. 175,000 Active Marines', bn: 'প্রায় ১,৭৫,০০০ জন' } },
                            { label: { en: 'Primary Platforms', bn: 'যুদ্ধযান' }, value: { en: 'Amphibious Combat Vehicle (ACV), F-35B STOVL, MV-22B Osprey, AH-1Z Viper', bn: 'উভচর যুদ্ধযান (ACV), এফ-৩৫বি, অস্প্রে' } }
                        ],
                        highlights: [
                            { en: 'Specialized in island hopping, amphibious assault, and rapid embassy evacuations', bn: 'উপকূলীয় আক্রমণ এবং বিশ্বের যেকোনো সংকটে কয়েক ঘণ্টার মধ্যে মোতায়েন' }
                        ]
                    }
                },
                {
                    id: 'us_space_force',
                    icon: '🛰️',
                    name: { en: 'United States Space Force (USSF)', bn: 'মার্কিন স্পেস ফোর্স' },
                    badge: { en: 'Space Warfare Service', bn: 'মহাকাশ প্রতিরক্ষা শাখা' },
                    summary: { en: 'Organizing, training, and equipping guardians to protect U.S. and allied space interests.', bn: 'মহাকাশ ও স্যাটেলাইট ভিত্তিক নিরাপত্তা এবং গ্লোবাল জিপিএস সুরক্ষায় নিয়োজিত শাখা।' },
                    details: {
                        overview: {
                            en: 'Established on December 20, 2019, the United States Space Force is the world\'s first independent military space branch, operating military satellites, missile warning constellations, and space domain awareness.',
                            bn: '২০১৯ সালে প্রতিষ্ঠিত মার্কিন স্পেস ফোর্স হলো বিশ্বের প্রথম স্বাধীন সামরিক মহাকাশ শাখা। এটি মিলিটারি স্যাটেলাইট, জিপিএস ও মহাকাশ প্রতিরক্ষা পরিচালনা করে।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: '"Semper Supra" (Always Above)', bn: '"সেম্পার সুপ্রা" (সর্বদা ঊর্ধ্বে)' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'The Pentagon, Arlington, VA', bn: 'পেন্টাগন' } },
                            { label: { en: 'Key Constellations', bn: 'উপগ্রহ নেটওয়ার্ক' }, value: { en: 'Global Positioning System (GPS), Space-Based Infrared System (SBIRS), X-37B spaceplane', bn: 'জিপিএস, মিসাইল ওয়ার্নিং স্যাটেলাইট, এক্স-৩৭বি স্পেসপ্লেন' } }
                        ],
                        highlights: [
                            { en: 'Guarantees global GPS timing and navigation signals used by billions of people', bn: 'বিশ্বজুড়ে বিলিয়ন মানুষের ব্যবহৃত জিপিএস স্যাটেলাইটের সার্বক্ষণিক সুরক্ষা' }
                        ]
                    }
                },
                {
                    id: 'us_coast_guard',
                    icon: '🚨',
                    name: { en: 'United States Coast Guard (USCG)', bn: 'মার্কিন কোস্ট গার্ড' },
                    badge: { en: 'Maritime Security & Law', bn: 'উপকূলীয় জলসীমা নিরাপত্তা' },
                    summary: { en: 'Multimission maritime safety, port security, icebreaking, and search-and-rescue.', bn: 'বন্দর নিরাপত্তা, সমুদ্রের বরফ ভাঙন, মাদক চোরাচালান প্রতিরোধ ও উদ্ধারকাজে নিয়োজিত।' },
                    details: {
                        overview: {
                            en: 'The United States Coast Guard operates under the Department of Homeland Security during peacetime and can be transferred to the Department of the Navy during war.',
                            bn: 'মার্কিন কোস্ট গার্ড শান্তিকালীন সময়ে হোমল্যান্ড সিকিউরিটি বিভাগ এবং যুদ্ধকালীন সময়ে নৌবাহিনীর অধীন পরিচালিত হয়।'
                        },
                        metrics: [
                            { label: { en: 'Motto', bn: 'নীতিবাক্য' }, value: { en: '"Semper Paratus" (Always Ready)', bn: '"সেম্পার প্যারাটাস" (সর্বদা প্রস্তুত)' } },
                            { label: { en: 'Headquarters', bn: 'সদর দপ্তর' }, value: { en: 'Washington, D.C.', bn: 'ওয়াশিংটন, ডি.সি.' } },
                            { label: { en: 'Active Personnel', bn: 'সদস্য সংখ্যা' }, value: { en: 'Approx. 42,000 Personnel', bn: 'প্রায় ৪২,০০০ জন' } }
                        ],
                        highlights: [
                            { en: 'Conducts deep-sea and polar icebreaking operations in the Arctic and Antarctic', bn: 'আর্কটিক ও অ্যান্টার্কটিকায় পোলার আইসব্রেকিং অভিযান পরিচালনা' }
                        ]
                    }
                }
            ];
        } else {
            // Intelligent dynamic generator for any other country
            defenceItems = [
                {
                    id: `mil_army_${normKey}`,
                    icon: '🎖️',
                    name: { en: `${nameEn} Army / Land Forces`, bn: `${nameBn} সেনাবাহিনী / স্থলবাহিনী` },
                    badge: { en: 'Land Combat Command', bn: 'স্থল প্রতিরক্ষা শাখা' },
                    summary: { en: `Primary land combat branch charged with safeguarding the sovereign borders of ${nameEn}.`, bn: `${nameBn}-এর স্থল সীমানা ও সার্বভৌমত্ব সুরক্ষায় নিয়োজিত প্রধান বাহিনী।` },
                    details: {
                        overview: {
                            en: `The Army of ${nameEn} constitutes the cornerstone of national defence, organizing motorized divisions, mechanized artillery, and border defensive networks.`,
                            bn: `${nameEn}-এর সেনাবাহিনী দেশের প্রতিরক্ষার প্রধান স্তম্ভ। এটি আধুনিক অস্ত্রশস্ত্র, পদাতিক ও সাঁজোয়া বহর নিয়ে সীমান্তে দায়িত্ব পালন করে।`
                        },
                        metrics: [
                            { label: { en: 'Supreme Commander', bn: 'সর্বাধিনায়ক' }, value: { en: isMonarchy ? `His Majesty the Sovereign of ${nameEn}` : `President / Prime Minister of ${nameEn}`, bn: isMonarchy ? `${nameBn}-এর মহামান্য রাজা/সম্রাট` : `${nameBn}-এর রাষ্ট্রপতি/প্রধানমন্ত্রী` } },
                            { label: { en: 'Primary Mandate', bn: 'মূল দায়িত্ব' }, value: { en: 'Territorial Sovereignty & Crisis Defense', bn: 'সীমান্ত সার্বভৌমত্ব ও জাতীয় দুর্যোগ মোকাবিলা' } },
                            { label: { en: 'Force Composition', bn: 'বাহিনী বিন্যাস' }, value: { en: 'Infantry Brigades, Armored Battalions, Artillery Regiments', bn: 'পদাতিক ব্রিগেড, আর্মার্ড কোর ও গোলন্দাজ রেজিমেন্ট' } }
                        ],
                        highlights: [
                            { en: `Frontline guarantor of sovereign territorial independence of ${nameEn}`, bn: `${nameBn}-এর জাতীয় স্বাধীনতা ও সার্বভৌমত্বের মূল রক্ষাকবচ` },
                            { en: 'Participates in domestic emergency response and international cooperative security', bn: 'জাতীয় জরুরি অবস্থা ও আন্তর্জাতিক শান্তিরক্ষা মিশনে অবদান' }
                        ]
                    }
                },
                {
                    id: `mil_navy_${normKey}`,
                    icon: '⚓',
                    name: { en: `${nameEn} Navy / Maritime Force`, bn: `${nameBn} নৌবাহিনী / সামুদ্রিক প্রতিরক্ষা` },
                    badge: { en: 'Maritime & EEZ Security', bn: 'নৌ ও উপকূলীয় নিরাপত্তা' },
                    summary: { en: `Maritime defense component protecting the territorial waters, shipping lanes, and maritime resources of ${nameEn}.`, bn: `${nameBn}-এর সমুদ্রসীমা, উপকূল ও বাণিজ্যিক জলপথ পাহারায় নিয়োজিত বাহিনী।` },
                    details: {
                        overview: {
                            en: `The Naval Forces of ${nameEn} safeguard sovereign maritime economic zones, coastal approaches, and oceanic commerce.`,
                            bn: `${nameEn}-এর নৌবাহিনী দেশের সমুদ্রসীমা, সামুদ্রিক বাণিজ্য এবং মৎস্য ও খনিজ সম্পদ সুরক্ষায় নিয়োজিত।`
                        },
                        metrics: [
                            { label: { en: 'Operational Role', bn: 'অপারেশনাল ভূমিকা' }, value: { en: 'Coastal Patrol, Anti-Smuggling & EEZ Defense', bn: 'উপকূলীয় টহল, চোরাচালান দমন ও সামুদ্রিক জলসীমা সুরক্ষা' } },
                            { label: { en: 'Vessel Types', bn: 'জাহাজ ও রণতরী' }, value: { en: 'Patrol Vessels, Corvettes, Fast Interceptor Boats', bn: 'টহল যুদ্ধজাহাজ, কর্ভেট ও দ্রুতগামী ইন্টারসেপ্টর বোট' } }
                        ],
                        highlights: [
                            { en: 'Safeguards key commercial port channels and oceanic trade corridors', bn: 'বাণিজ্যিক সমুদ্রবন্দর ও জলপথের নিরাপত্তা নিশ্চিতকরণ' }
                        ]
                    }
                },
                {
                    id: `mil_air_${normKey}`,
                    icon: '✈️',
                    name: { en: `${nameEn} Air Force`, bn: `${nameBn} বিমান বাহিনী` },
                    badge: { en: 'Air Defense & Aviation', bn: 'আকাশ প্রতিরক্ষা শাখা' },
                    summary: { en: `Sovereign airspace interception, air defense radar tracking, and tactical air transport for ${nameEn}.`, bn: `${nameBn}-এর আকাশসীমা প্রতিরক্ষা, রাডার নজরদারি ও সামরিক পরিবহন শাখা।` },
                    details: {
                        overview: {
                            en: `The Air Force of ${nameEn} is equipped to detect, intercept, and deter unauthorized incursions into national airspace while delivering rapid disaster relief airlift.`,
                            bn: `${nameEn}-এর বিমান বাহিনী দেশের আকাশসীমার নজরদারি, অনুপ্রবেশ প্রতিরোধ এবং জরুরি উদ্ধারকাজে নিয়োজিত।`
                        },
                        metrics: [
                            { label: { en: 'Core Capability', bn: 'প্রধান সক্ষমতা' }, value: { en: 'Air Surveillance, Tactical Airlift, Combat Interception', bn: 'আকাশ নজরদারি, পরিবহন এয়ারলিফট ও কমব্যাট ইন্টারসেপশন' } },
                            { label: { en: 'Aircraft Fleet', bn: 'বিমান বহর' }, value: { en: 'Interceptor Jets, Transport Airplanes, Utility Helicopters', bn: 'লড়াকু বিমান, কার্গো পরিবহন ও হেলিকপ্টার বহর' } }
                        ],
                        highlights: [
                            { en: 'Provides rapid emergency humanitarian air support and mountain rescue', bn: 'প্রাকৃতিক দুর্যোগে দ্রুত ত্রাণ ও দুর্গম এলাকায় উদ্ধার তৎপরতা' }
                        ]
                    }
                },
                {
                    id: `mil_guard_${normKey}`,
                    icon: '🛡️',
                    name: { en: `${nameEn} National / Border Guard`, bn: `${nameBn} ন্যাশনাল গার্ড / সীমান্ত রক্ষী বাহিনী` },
                    badge: { en: 'Homeland & Border Security', bn: 'অভ্যন্তরীণ ও সীমান্ত নিরাপত্তা' },
                    summary: { en: `Paramilitary homeland security and border patrol enforcing national statutes.`, bn: `অভ্যন্তরীণ স্থিতিশীলতা ও সীমান্ত সুরক্ষায় নিয়োজিত নিরাপত্তা বাহিনী।` },
                    details: {
                        overview: {
                            en: `Specialized force dedicated to counter-insurgency, land boundary demarcation security, and civil protection across ${nameEn}.`,
                            bn: `দেশের অভ্যন্তরীণ শান্তিশৃঙ্খলা এবং সীমান্ত চৌকি সুরক্ষায় নিয়োজিত নির্ভরযোগ্য বাহিনী।`
                        },
                        metrics: [
                            { label: { en: 'Service Type', bn: 'বাহিনীর ধরণ' }, value: { en: 'Paramilitary / National Guard', bn: 'আধা-সামরিক / জাতীয় রক্ষীবাহিনী' } },
                            { label: { en: 'Mandate', bn: 'দায়িত্ব' }, value: { en: 'Frontier Security & Civil Order', bn: 'সীমান্ত পাহারা ও শান্তি-শৃঙ্খলা' } }
                        ],
                        highlights: [
                            { en: 'Coordinated liaison between military forces and civilian emergency agencies', bn: 'বেসামরিক প্রশাসন ও সামরিক বাহিনীর সমন্বয়কারী ভূমিকা' }
                        ]
                    }
                }
            ];
        }

        categories.push({
            id: 'defence_forces',
            icon: '🛡️',
            label: { en: 'Defence Forces', bn: 'প্রতিরক্ষা বাহিনী' },
            items: defenceItems
        });

        return categories;
    }

    // Expose Globally
    window.CountryDetailsEngine = {
        getCountryTopicCategories: getCountryTopicCategories
    };

})();
