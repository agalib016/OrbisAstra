// 7 Wonders 3D Explorer - Core Logic
let currentWonder = null;
let currentTopic = null;
let currentTopicType = null;
let currentLang = 'en';
window.currentLang = currentLang;
let activeLayer = 1;
let currentImageIdx = -1;
let hoverPolygon = null;
let isAutoRotating = true;
let globeHideTimeout = null;
let topicOpenTimeout = null;

// Map wonders by id for quick lookup
const wonderMap = {};
wondersData.forEach(w => { wonderMap[w.id] = w; });

// Map geo labels by id for fast language updates
const geoLabelsMap = {};
if (typeof geoLabels !== 'undefined') {
    geoLabels.forEach(l => { geoLabelsMap[l.id] = l; });
}

// Map country labels by id for fast language updates
const countryLabelsMap = {};
const countryByNameMap = {};
if (typeof countryLabels !== 'undefined') {
    countryLabels.forEach(c => {
        countryLabelsMap[c.id] = c;
        if (c.name && c.name.en) {
            countryByNameMap[c.name.en.toLowerCase()] = c;
        }
        if (c.id) {
            countryByNameMap[c.id.toLowerCase()] = c;
        }
    });
}

// Pre-index country boundary polygons for fast point-in-polygon queries (~0.3ms)
const countryPolys = [];
if (typeof countryPaths !== 'undefined') {
    countryPaths.forEach(p => {
        if (p.coords && p.coords.length >= 3 && p.country) {
            let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
            for (let i = 0; i < p.coords.length; i++) {
                const pt = p.coords[i];
                if (pt[0] < minLat) minLat = pt[0];
                if (pt[0] > maxLat) maxLat = pt[0];
                if (pt[1] < minLng) minLng = pt[1];
                if (pt[1] > maxLng) maxLng = pt[1];
            }
            countryPolys.push({
                country: p.country,
                continent: p.continent,
                coords: p.coords,
                bbox: [minLat, maxLat, minLng, maxLng]
            });
        }
    });
}

function isPointInPoly(lat, lng, coords) {
    let inside = false;
    for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
        const xi = coords[i][0], yi = coords[i][1];
        const xj = coords[j][0], yj = coords[j][1];
        const intersect = ((yi > lng) !== (yj > lng)) &&
            (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function findCountryAtCoords(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) return null;
    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;

    // 1. Point in polygon test with fast bounding-box rejection
    for (let i = 0; i < countryPolys.length; i++) {
        const cp = countryPolys[i];
        const b = cp.bbox;
        if (lat >= b[0] && lat <= b[1] && lng >= b[2] && lng <= b[3]) {
            if (isPointInPoly(lat, lng, cp.coords)) {
                const match = countryByNameMap[cp.country.toLowerCase()];
                if (match) return match;
                return {
                    id: cp.country.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                    name: { en: cp.country, bn: cp.country },
                    continent: cp.continent,
                    lat: (b[0] + b[1]) / 2,
                    lng: (b[2] + b[3]) / 2,
                    sizeClass: 'medium'
                };
            }
        }
    }

    // 2. Proximity fallback for small island states (within 1.0 degree)
    if (typeof countryLabels !== 'undefined') {
        let bestC = null;
        let minD = 999;
        for (let i = 0; i < countryLabels.length; i++) {
            const c = countryLabels[i];
            let dLat = lat - c.lat;
            let dLng = lng - c.lng;
            if (dLng > 180) dLng -= 360;
            else if (dLng < -180) dLng += 360;
            const d = Math.sqrt(dLat * dLat + dLng * dLng);
            if (d < minD) {
                minD = d;
                bestC = c;
            }
        }
        if (minD <= 1.0 && bestC) {
            return bestC;
        }
    }

    return null;
}

// Interactive Multi-Topic Layer Controller (Continents, Countries, Oceans, 7 Wonders, Historical, Rivers, Forests, Mountains, Islands)
const activeGlobeLayers = {
    continents: true,
    countries: true,
    oceans: true,
    wonders: true,
    historical: false,
    rivers: false,
    forests: false,
    mountains: false,
    islands: false
};

function getFilteredGlobePaths() {
    const paths = [];
    if (typeof geoPaths !== 'undefined') {
        geoPaths.forEach(p => {
            if (p.type === 'continent' && activeGlobeLayers.continents) paths.push(p);
            else if (p.type === 'ocean' && activeGlobeLayers.oceans) paths.push(p);
        });
    }
    if (typeof countryPaths !== 'undefined' && activeGlobeLayers.countries) {
        paths.push(...countryPaths);
    }
    return paths;
}

function getFilteredGlobeMarkers() {
    const markers = [];
    // 7 Wonders
    if (activeGlobeLayers.wonders && typeof wondersData !== 'undefined') {
        markers.push(...wondersData.map(w => ({ ...w, markerType: 'wonder' })));
    }
    // Continents & Oceans
    if (typeof geoLabels !== 'undefined') {
        geoLabels.forEach(l => {
            if (l.type === 'continent' && activeGlobeLayers.continents) {
                markers.push({ ...l, markerType: 'continent' });
            } else if (l.type === 'ocean' && activeGlobeLayers.oceans) {
                markers.push({ ...l, markerType: 'ocean' });
            }
        });
    }
    // Countries
    if (activeGlobeLayers.countries && typeof countryLabels !== 'undefined') {
        markers.push(...countryLabels.map(c => ({ ...c, markerType: 'country' })));
    }
    // Historical Places (Top 120 most prominent landmarks on globe)
    if (activeGlobeLayers.historical && typeof historicalPlacesList !== 'undefined') {
        markers.push(...historicalPlacesList.slice(0, 120).map(h => ({ ...h, markerType: 'historical' })));
    }
    // Rivers (Top 120 major rivers on globe)
    if (activeGlobeLayers.rivers && typeof riversList !== 'undefined') {
        markers.push(...riversList.slice(0, 120).map(r => ({ ...r, markerType: 'river' })));
    }
    // Forests (Top 120 major forests on globe)
    if (activeGlobeLayers.forests && typeof forestsList !== 'undefined') {
        markers.push(...forestsList.slice(0, 120).map(f => ({ ...f, markerType: 'forest' })));
    }
    // Mountains (Top 120 prominent peaks on globe)
    if (activeGlobeLayers.mountains && typeof mountainsList !== 'undefined') {
        markers.push(...mountainsList.slice(0, 120).map(m => ({ ...m, markerType: 'mountain' })));
    }
    // Islands (Top 120 famous islands on globe)
    if (activeGlobeLayers.islands && typeof islandsList !== 'undefined') {
        markers.push(...islandsList.slice(0, 120).map(isl => ({ ...isl, markerType: 'island' })));
    }
    return markers;
}

function updateGlobeLayers() {
    if (typeof world === 'undefined' || !world) return;
    world.pathsData(getFilteredGlobePaths());
    world.htmlElementsData(getFilteredGlobeMarkers());
}

// Continent & Ocean Detailed Information for Hover HUD
const geoInfoDetails = {
    'asia': {
        icon: '🌏',
        en: { title: 'Asia', subtitle: 'Continent • 48 Sovereign Nations • Largest Landmass' },
        bn: { title: 'এশিয়া', subtitle: 'মহাদেশ • ৪৮টি সার্বভৌম দেশ • বৃহত্তম ভূখণ্ড' }
    },
    'africa': {
        icon: '🌍',
        en: { title: 'Africa', subtitle: 'Continent • 54 Sovereign Nations • Rich Biodiversity' },
        bn: { title: 'আফ্রিকা', subtitle: 'মহাদেশ • ৫৪টি সার্বভৌম দেশ • সমৃদ্ধ জীববৈচিত্র্য' }
    },
    'europe': {
        icon: '🌍',
        en: { title: 'Europe', subtitle: 'Continent • 44 Sovereign Nations • Historic Heritage' },
        bn: { title: 'ইউরোপ', subtitle: 'মহাদেশ • ৪৪টি সার্বভৌম দেশ • ঐতিহাসিক ঐতিহ্য' }
    },
    'north_america': {
        icon: '🌎',
        en: { title: 'North America', subtitle: 'Continent • 23 Sovereign Nations • Diverse Geography' },
        bn: { title: 'উত্তর আমেরিকা', subtitle: 'মহাদেশ • ২৩টি দেশ • বৈচিত্র্যময় ভূগোল' }
    },
    'south_america': {
        icon: '🌎',
        en: { title: 'South America', subtitle: 'Continent • 12 Sovereign Nations • Amazon & Andes' },
        bn: { title: 'দক্ষিণ আমেরিকা', subtitle: 'মহাদেশ • ১২টি দেশ • আমাজন ও আন্দিজ পর্বতমালা' }
    },
    'oceania': {
        icon: '🌏',
        en: { title: 'Oceania / Australia', subtitle: 'Continent • 14 Island & Continental Nations' },
        bn: { title: 'ওশেনিয়া / অস্ট্রেলিয়া', subtitle: 'মহাদেশ • ১৪টি দ্বীপ ও মহাদেশীয় রাষ্ট্র' }
    },
    'antarctica': {
        icon: '❄️',
        en: { title: 'Antarctica', subtitle: 'Continent • Earth\'s Southernmost Polar Landmass' },
        bn: { title: 'অ্যান্টার্কটিকা', subtitle: 'মহাদেশ • পৃথিবীর সর্বদক্ষিণের মেরু ভূখণ্ড' }
    },
    'north_pacific_ocean': {
        icon: '🌊',
        en: { title: 'North Pacific Ocean', subtitle: 'Ocean Basin • Deepest Ocean Waters on Earth' },
        bn: { title: 'উত্তর প্রশান্ত মহাসাগর', subtitle: 'মহাসাগরীয় অঞ্চল • পৃথিবীর গভীরতম মহাসাগর' }
    },
    'south_pacific_ocean': {
        icon: '🌊',
        en: { title: 'South Pacific Ocean', subtitle: 'Ocean Basin • Expansive Waters & Coral Archipelagos' },
        bn: { title: 'দক্ষিণ প্রশান্ত মহাসাগর', subtitle: 'মহাসাগরীয় অঞ্চল • সুবিশাল জলরাশি ও প্রবাল দ্বীপমালা' }
    },
    'north_atlantic_ocean': {
        icon: '🌊',
        en: { title: 'North Atlantic Ocean', subtitle: 'Ocean Basin • Connecting the Americas and Europe' },
        bn: { title: 'উত্তর আটলান্টিক মহাসাগর', subtitle: 'মহাসাগরীয় অঞ্চল • আমেরিকা ও ইউরোপের সংযোগস্থল' }
    },
    'south_atlantic_ocean': {
        icon: '🌊',
        en: { title: 'South Atlantic Ocean', subtitle: 'Ocean Basin • Between South America and Africa' },
        bn: { title: 'দক্ষিণ আটলান্টিক মহাসাগর', subtitle: 'মহাসাগরীয় অঞ্চল • দক্ষিণ আমেরিকা ও আফ্রিকার মধ্যবর্তী' }
    },
    'indian_ocean': {
        icon: '🌊',
        en: { title: 'Indian Ocean', subtitle: 'Ocean Basin • Warmest Ocean • Bounded by Asia & Africa' },
        bn: { title: 'ভারত মহাসাগর', subtitle: 'মহাসাগরীয় অঞ্চল • উষ্ণতম মহাসাগর • এশিয়া ও আফ্রিকা সংলগ্ন' }
    },
    'arctic_ocean': {
        icon: '🧊',
        en: { title: 'Arctic Ocean', subtitle: 'Ocean Basin • Ice-Capped Waters Surrounding the North Pole' },
        bn: { title: 'উত্তর মহাসাগর', subtitle: 'মহাসাগরীয় অঞ্চল • উত্তর মেরুর বরফাচ্ছন্ন জলরাশি' }
    },
    'southern_ocean': {
        icon: '🧊',
        en: { title: 'Southern Ocean', subtitle: 'Ocean Basin • Circumpolar Waters Encircling Antarctica' },
        bn: { title: 'দক্ষিণ মহাসাগর', subtitle: 'মহাসাগরীয় অঞ্চল • অ্যান্টার্কটিকা বেষ্টনকারী মেরু জলরাশি' }
    }
};

const geoHud = document.getElementById('geo-hud');
const geoHudIcon = document.getElementById('geo-hud-icon');
const geoHudTitle = document.getElementById('geo-hud-title');
const geoHudSubtitle = document.getElementById('geo-hud-subtitle');

// Dynamic Globe Path Color & Stroke functions reacting to continent/ocean hover
function getGlobePathColor(d) {
    if (hoverPolygon && hoverPolygon.properties) {
        const hp = hoverPolygon.properties;
        const hId = hp.id;
        const hName = hp.name ? hp.name.en : '';
        const isContinent = hp.type === 'continent';
        const isOcean = hp.type === 'ocean';

        if (isContinent) {
            // 1. Highlight the boundary outline of the hovered continent in vivid sun-gold
            if (d.type === 'continent' && (d.id === hId || d.continent === hName)) {
                return '#fff275';
            }
            // 2. Highlight country borders inside this continent in luminous white-gold
            if (d.type === 'country') {
                if (d.continent === hName) {
                    return 'rgba(255, 245, 190, 0.95)';
                } else {
                    return 'rgba(140, 185, 220, 0.16)'; // Softly dim other continents
                }
            }
            // 3. Other continents soft dim
            if (d.type === 'continent') {
                return 'rgba(255, 180, 0, 0.25)';
            }
            if (d.type === 'ocean') {
                return 'rgba(0, 215, 255, 0.12)';
            }
        } else if (isOcean) {
            // Surrounding continents map for each ocean basin
            const oceanBorderContinents = {
                'north_atlantic_ocean': ['North America', 'Europe', 'Africa', 'South America'],
                'south_atlantic_ocean': ['South America', 'Africa', 'Antarctica'],
                'north_pacific_ocean': ['Asia', 'North America', 'Oceania'],
                'south_pacific_ocean': ['Oceania', 'South America', 'Antarctica', 'Asia'],
                'indian_ocean': ['Africa', 'Asia', 'Oceania', 'Antarctica'],
                'arctic_ocean': ['Europe', 'Asia', 'North America'],
                'southern_ocean': ['Antarctica', 'South America', 'Oceania', 'Africa']
            };
            const bordering = oceanBorderContinents[hId] || [];

            // Light up the coastlines bordering this ocean in electric bioluminescent cyan!
            if (d.type === 'continent' && bordering.includes(d.continent)) {
                return '#00f5ff';
            }
            if (d.type === 'continent') {
                return 'rgba(255, 180, 0, 0.22)';
            }
            // Highlight the hovered ocean's own boundary path in vibrant cyan!
            if (d.type === 'ocean' && d.id === hId) {
                return '#00f5ff';
            }
            if (d.type === 'ocean') {
                return 'rgba(0, 215, 255, 0.15)'; // Dim other ocean basins
            }
            if (d.type === 'country') {
                return bordering.includes(d.continent) ? 'rgba(165, 230, 255, 0.75)' : 'rgba(140, 185, 220, 0.15)';
            }
        }
    }

    // Default balanced state
    if (d.type === 'continent') return 'rgba(255, 185, 0, 0.8)';
    if (d.type === 'ocean') return 'rgba(0, 215, 255, 0.35)';
    return 'rgba(160, 215, 255, 0.65)'; // Country borders
}

function getGlobePathStroke(d) {
    if (hoverPolygon && hoverPolygon.properties) {
        const hp = hoverPolygon.properties;
        const hId = hp.id;
        const hName = hp.name ? hp.name.en : '';

        if (hp.type === 'continent') {
            if (d.type === 'continent' && (d.id === hId || d.continent === hName)) return 3.2;
            if (d.type === 'country' && d.continent === hName) return 1.6;
        } else if (hp.type === 'ocean') {
            const oceanBorderContinents = {
                'north_atlantic_ocean': ['North America', 'Europe', 'Africa', 'South America'],
                'south_atlantic_ocean': ['South America', 'Africa', 'Antarctica'],
                'north_pacific_ocean': ['Asia', 'North America', 'Oceania'],
                'south_pacific_ocean': ['Oceania', 'South America', 'Antarctica', 'Asia'],
                'indian_ocean': ['Africa', 'Asia', 'Oceania', 'Antarctica'],
                'arctic_ocean': ['Europe', 'Asia', 'North America'],
                'southern_ocean': ['Antarctica', 'South America', 'Oceania', 'Africa']
            };
            const bordering = oceanBorderContinents[hId] || [];
            if (d.type === 'ocean' && d.id === hId) return 3.0;
            if (d.type === 'continent' && bordering.includes(d.continent)) return 2.6;
        }
    }
    if (d.type === 'continent') return 2.0;
    if (d.type === 'ocean') return 1.2;
    return 1.2;
}

// Geo features map by id for instant O(1) lookups
const geoFeaturesById = {};
if (typeof geoBoundaries !== 'undefined' && geoBoundaries.features) {
    geoBoundaries.features.forEach(f => {
        if (f.properties && f.properties.id) {
            geoFeaturesById[f.properties.id] = f;
        }
    });
}

let currentHoveredGeoId = null;
let hoverPolygonDirect = null;
let prevHighlightedTag = null;
let prevHighlightedContinent = null;
let cachedCountryLabels = null;

function resolveCoordsToGeoFeature(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) return null;

    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;

    let targetId = null;

    // 1. Extreme Polar regions
    if (lat >= 66.5) {
        if (lat < 84 && lng >= -75 && lng <= -10) targetId = 'north_america'; // Greenland
        else if (lat < 81 && lng >= 10 && lng <= 35) targetId = 'europe'; // Svalbard
        else targetId = 'arctic_ocean';
    } else if (lat <= -60.0) {
        if (lat <= -65.0) targetId = 'antarctica';
        else targetId = 'southern_ocean';
    }
    // 2. Specific Islands that might be outside coarse continent polygons
    else if (lat >= 63 && lat <= 67 && lng >= -25 && lng <= -13) {
        targetId = 'europe'; // Iceland
    } else if (lat >= -48 && lat <= -34 && lng >= 165 && lng <= 179) {
        targetId = 'oceania'; // New Zealand
    }
    // 3. Marginal Seas & Water Bodies
    else if (lat >= 30 && lat <= 46 && lng >= -6 && lng <= 36) {
        targetId = 'north_atlantic_ocean'; // Mediterranean Sea
    } else if (lat >= 40 && lat <= 47 && lng >= 27 && lng <= 42) {
        targetId = 'north_atlantic_ocean'; // Black Sea
    } else if (lat >= 12 && lat <= 30 && lng >= 32 && lng <= 44) {
        targetId = 'indian_ocean'; // Red Sea
    } else if (lat >= 23 && lat <= 31 && lng >= 47 && lng <= 60) {
        targetId = 'indian_ocean'; // Persian Gulf
    } else if (lat >= 8 && lat <= 31 && lng >= -98 && lng <= -59) {
        targetId = 'north_atlantic_ocean'; // Caribbean Sea & Gulf of Mexico
    } else if (lat >= 51 && lat <= 65 && lng >= -95 && lng <= -75) {
        targetId = 'north_atlantic_ocean'; // Hudson Bay
    } else if (lat >= 50 && lat <= 66.5 && lng >= -10 && lng <= 32) {
        targetId = 'north_atlantic_ocean'; // Baltic & North Sea
    } else if (lat >= 0 && lat <= 26 && lng >= 50 && lng <= 100) {
        targetId = 'indian_ocean'; // Arabian Sea & Bay of Bengal
    } else if (lat >= 0 && lat <= 24 && lng >= 100 && lng <= 122) {
        targetId = 'north_pacific_ocean'; // South China Sea
    } else if (lat >= 24 && lat <= 52 && lng >= 118 && lng <= 145) {
        targetId = 'north_pacific_ocean'; // East China Sea & Sea of Japan
    } else if (lat >= 50 && lat <= 66.5 && (lng >= 140 || lng <= -155)) {
        targetId = 'north_pacific_ocean'; // Bering Sea & Sea of Okhotsk
    } else if (lat >= -50 && lat <= -10 && lng >= 145 && lng <= 175) {
        targetId = 'south_pacific_ocean'; // Coral & Tasman Seas
    }

    if (!targetId) {
        // 4. Proximity to island nations (within 1.2 degrees of country center)
        if (typeof countryLabels !== 'undefined' && countryLabels.length > 0) {
            let minD = 999;
            let bestC = null;
            for (let i = 0; i < countryLabels.length; i++) {
                const c = countryLabels[i];
                let dLat = lat - c.lat;
                let dLng = lng - c.lng;
                if (dLng > 180) dLng -= 360;
                else if (dLng < -180) dLng += 360;
                const d = Math.sqrt(dLat * dLat + dLng * dLng);
                if (d < minD) {
                    minD = d;
                    bestC = c;
                }
            }
            if (minD <= 1.2 && bestC && bestC.continent) {
                const contMap = {
                    'Asia': 'asia', 'Africa': 'africa', 'Europe': 'europe',
                    'North America': 'north_america', 'South America': 'south_america',
                    'Oceania': 'oceania', 'Antarctica': 'antarctica'
                };
                if (contMap[bestC.continent]) {
                    targetId = contMap[bestC.continent];
                }
            }
        }
    }

    if (!targetId) {
        // 5. Open Oceans
        if (lat >= 0) {
            if (lng >= -100 && lng <= 20) targetId = 'north_atlantic_ocean';
            else if (lng > 20 && lng <= 100) targetId = 'indian_ocean';
            else targetId = 'north_pacific_ocean';
        } else {
            if (lng >= -70 && lng <= 20) targetId = 'south_atlantic_ocean';
            else if (lng > 20 && lng <= 115) targetId = 'indian_ocean';
            else targetId = 'south_pacific_ocean';
        }
    }

    return geoFeaturesById[targetId] || null;
}

function applyGeoHover(targetFeature) {
    const targetId = (targetFeature && targetFeature.properties) ? targetFeature.properties.id : null;
    
    // CRITICAL DEDUPLICATION: Do not re-traverse Three.js paths or mutate DOM if hover hasn't changed!
    if (targetId === currentHoveredGeoId) {
        return;
    }

    currentHoveredGeoId = targetId;
    hoverPolygon = targetFeature;
    globeContainer.style.cursor = targetFeature ? 'pointer' : 'default';

    world.polygonAltitude(getPolygonAltitude)
         .polygonCapColor(getPolygonCapColor)
         .polygonSideColor(getPolygonSideColor)
         .pathColor(getGlobePathColor)
         .pathStroke(getGlobePathStroke);

    updateGeoHoverUI(targetFeature);
}

function updateGeoHoverUI(hoverD) {
    if (prevHighlightedTag) {
        prevHighlightedTag.classList.remove('highlighted');
        prevHighlightedTag = null;
    }

    if (!hoverD || !hoverD.properties) {
        if (geoHud) geoHud.classList.add('hidden');
        if (prevHighlightedContinent !== null) {
            if (!cachedCountryLabels) cachedCountryLabels = document.querySelectorAll('.country-label-tag');
            cachedCountryLabels.forEach(tag => {
                tag.classList.remove('continent-highlighted', 'continent-dimmed');
            });
            prevHighlightedContinent = null;
        }
        return;
    }

    const p = hoverD.properties;
    const isContinent = p.type === 'continent';
    const isOcean = p.type === 'ocean';

    // Highlight corresponding on-globe badge tag
    const targetTag = document.querySelector(`[data-geo-id="${p.id}"]`) ||
                      document.querySelector(`[data-id="label_${p.id}"]`) ||
                      document.querySelector(`[data-id="${p.id}"]`);
    if (targetTag) {
        targetTag.classList.add('highlighted');
        prevHighlightedTag = targetTag;
    }

    // Spotlight country labels inside the hovered continent
    const continentName = (isContinent && p.name && p.name.en) ? p.name.en : null;
    if (continentName !== prevHighlightedContinent) {
        if (!cachedCountryLabels) cachedCountryLabels = document.querySelectorAll('.country-label-tag');
        if (continentName) {
            cachedCountryLabels.forEach(tag => {
                if (tag.dataset.continent === continentName) {
                    tag.classList.add('continent-highlighted');
                    tag.classList.remove('continent-dimmed');
                } else {
                    tag.classList.add('continent-dimmed');
                    tag.classList.remove('continent-highlighted');
                }
            });
        } else {
            cachedCountryLabels.forEach(tag => {
                tag.classList.remove('continent-highlighted', 'continent-dimmed');
            });
        }
        prevHighlightedContinent = continentName;
    }

    // Update Floating HUD Info Pill
    if (geoHud && geoInfoDetails[p.id]) {
        const info = geoInfoDetails[p.id];
        const langData = info[currentLang] || info.en;
        if (geoHudIcon) geoHudIcon.textContent = info.icon || (isContinent ? '🌍' : '🌊');
        if (geoHudTitle) geoHudTitle.textContent = langData.title;
        if (geoHudSubtitle) geoHudSubtitle.textContent = langData.subtitle;
        geoHud.classList.toggle('ocean-mode', isOcean);
        geoHud.classList.remove('hidden');
    } else if (geoHud) {
        geoHud.classList.add('hidden');
    }
}

// 3D Polygon Elevation, Cap Aura, and Side Rim Helpers
function getPolygonAltitude(d) {
    if (hoverPolygon && d.properties && hoverPolygon.properties && d.properties.id === hoverPolygon.properties.id) {
        if (d.properties.type === 'continent') return 0.0012;
        if (d.properties.type === 'ocean') return 0.0008; // Raised above surface to eliminate z-fighting texture flickering
    }
    return 0.0002;
}

function getPolygonCapColor(d) {
    if (hoverPolygon && d.properties && hoverPolygon.properties && d.properties.id === hoverPolygon.properties.id) {
        if (d.properties.type === 'continent') {
            return 'rgba(255, 215, 0, 0.12)'; // Ethereal golden luminous shimmer
        }
        return 'rgba(0, 220, 255, 0.16)'; // Vivid bioluminescent oceanic glow
    }
    return 'rgba(0, 0, 0, 0)';
}

function getPolygonSideColor(d) {
    // Zero side walls to eliminate blocky jagged vertical curtain artifacts!
    return 'rgba(0, 0, 0, 0)';
}

// Initialize Globe with Ultra-High-Resolution 8K Earth Map
const globeContainer = document.getElementById('globe-container');
const world = Globe()
    (globeContainer)
    .globeImageUrl('/static/images/earth_8k.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    // Continent & Ocean Border Polygons with instant (0ms) transition to eliminate animation queue lag
    .polygonsData((typeof geoBoundaries !== 'undefined' && geoBoundaries.features) ? geoBoundaries.features : [])
    .polygonGeoJsonGeometry(d => d.geometry)
    .polygonCapColor(getPolygonCapColor)
    .polygonSideColor(getPolygonSideColor)
    .polygonAltitude(getPolygonAltitude)
    .polygonsTransitionDuration(0)
    .onPolygonHover(hoverD => {
        hoverPolygonDirect = hoverD;
        if (hoverD) {
            applyGeoHover(hoverD);
        } else if (lastPointerMoveEvent && !hoverRafId) {
            hoverRafId = requestAnimationFrame(processHoverTick);
        }
    })
    // High-Resolution Country Borders & Continent/Ocean Outlines
    .pathsData(getFilteredGlobePaths())
    .pathPoints(d => d.coords)
    .pathPointLat(p => p[0])
    .pathPointLng(p => p[1])
    .pathPointAlt(p => p[2] || (d => d.type === 'continent' ? 0.0042 : (d.type === 'ocean' ? 0.004 : 0.0038)))
    .pathColor(getGlobePathColor)
    .pathStroke(getGlobePathStroke)
    // Dynamic Layers: Wonders, Continents, Oceans, Countries, Historical, Rivers, Forests, Mountains, Islands
    .htmlElementsData(getFilteredGlobeMarkers())
    .htmlLat(d => d.lat)
    .htmlLng(d => d.lng)
    .htmlAltitude(d => d.markerType === 'wonder' ? 0.015 : (d.markerType === 'country' ? 0.005 : (d.markerType === 'historical' ? 0.009 : (d.markerType === 'river' ? 0.007 : 0.008))))
    .htmlElement(d => {
        if (d.markerType === 'wonder') {
            const el = document.createElement('div');
            el.className = 'wonder-marker';
            el.dataset.id = d.id;
            el.setAttribute('title', d.name[currentLang]);
            el.innerHTML = `
                <div class="marker-card">
                    <div class="marker-img-wrap">
                        <img class="marker-thumb" src="${d.images[0]}" alt="${d.name[currentLang]}" loading="eager" />
                    </div>
                    <span class="marker-label">${d.name[currentLang]}</span>
                </div>
                <div class="marker-arrow"></div>
                <div class="marker-pin-dot"></div>
            `;
            el.onclick = () => selectWonder(d);
            return el;
        } else if (d.markerType === 'continent' || d.markerType === 'ocean') {
            const el = document.createElement('div');
            el.className = d.markerType === 'continent' ? 'continent-title-tag' : 'ocean-title-tag';
            el.dataset.id = d.id;
            el.dataset.geoId = d.geoId || d.id.replace('label_', '');
            el.dataset.type = d.markerType;
            el.innerHTML = `<span class="geo-label-text">${d.name[currentLang]}</span>`;
            
            const featureId = d.geoId || d.id.replace('label_', '');
            const featureObj = geoFeaturesById[featureId] || (
                (typeof geoBoundaries !== 'undefined' && geoBoundaries.features) 
                    ? geoBoundaries.features.find(f => f.properties.id === featureId) 
                    : null
            );
            
            el.addEventListener('mouseenter', () => {
                if (featureObj) {
                    applyGeoHover(featureObj);
                }
            });
            el.addEventListener('mouseleave', () => {
                // Do not force wipe hover here to avoid rapid flickering when moving off badge
            });
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (d.markerType === 'continent') {
                    selectContinent(featureId);
                } else {
                    selectOcean(featureId);
                }
            });
            return el;
        } else if (d.markerType === 'country') {
            const el = document.createElement('div');
            el.className = `country-label-tag size-${d.sizeClass || 'small'}`;
            el.dataset.id = d.id;
            el.dataset.continent = d.continent;
            el.innerHTML = `<span class="country-text">${d.name[currentLang] || d.name.en}</span>`;
            el.onclick = (e) => {
                e.stopPropagation();
                selectCountry(d);
            };
            return el;
        } else if (d.markerType === 'historical') {
            const el = document.createElement('div');
            el.className = 'historical-marker';
            el.dataset.id = d.id;
            const displayName = (d.name && d.name[currentLang]) ? d.name[currentLang] : (d.name ? d.name.en : '');
            el.setAttribute('title', displayName);
            el.innerHTML = `
                <div class="historical-card">
                    <span class="historical-icon">🏛️</span>
                    <span class="historical-text">${displayName}</span>
                </div>
            `;
            el.onclick = (e) => {
                e.stopPropagation();
                selectHistoricalPlace(d);
            };
            return el;
        } else if (d.markerType === 'river') {
            const el = document.createElement('div');
            el.className = 'river-marker';
            el.dataset.id = d.id;
            const displayName = (d.name && d.name[currentLang]) ? d.name[currentLang] : (d.name ? d.name.en : '');
            el.setAttribute('title', displayName);
            el.innerHTML = `
                <div class="river-card">
                    <span class="river-icon">🌊</span>
                    <span class="river-text">${displayName}</span>
                </div>
            `;
            el.onclick = (e) => {
                e.stopPropagation();
                selectRiver(d);
            };
            return el;
        } else if (d.markerType === 'forest') {
            const el = document.createElement('div');
            el.className = 'forest-marker';
            el.dataset.id = d.id;
            const displayName = (d.name && d.name[currentLang]) ? d.name[currentLang] : (d.name ? d.name.en : '');
            el.setAttribute('title', displayName);
            el.innerHTML = `
                <div class="forest-card">
                    <span class="forest-icon">🌲</span>
                    <span class="forest-text">${displayName}</span>
                </div>
            `;
            el.onclick = (e) => {
                e.stopPropagation();
                selectForest(d);
            };
            return el;
        } else if (d.markerType === 'mountain') {
            const el = document.createElement('div');
            el.className = 'mountain-marker';
            el.dataset.id = d.id;
            const displayName = (d.name && d.name[currentLang]) ? d.name[currentLang] : (d.name ? d.name.en : '');
            el.setAttribute('title', displayName);
            el.innerHTML = `
                <div class="mountain-card">
                    <span class="mountain-icon">⛰️</span>
                    <span class="mountain-text">${displayName}</span>
                </div>
            `;
            el.onclick = (e) => {
                e.stopPropagation();
                selectMountain(d);
            };
            return el;
        } else if (d.markerType === 'island') {
            const el = document.createElement('div');
            el.className = 'island-marker';
            el.dataset.id = d.id;
            const displayName = (d.name && d.name[currentLang]) ? d.name[currentLang] : (d.name ? d.name.en : '');
            el.setAttribute('title', displayName);
            el.innerHTML = `
                <div class="island-card">
                    <span class="island-icon">🏝️</span>
                    <span class="island-text">${displayName}</span>
                </div>
            `;
            el.onclick = (e) => {
                e.stopPropagation();
                selectIsland(d);
            };
            return el;
        }
    });

// Smooth 60 FPS Globe Hover Raycaster & Pointer Handler
let lastPointerMoveEvent = null;
let hoverRafId = null;

function processHoverTick() {
    hoverRafId = null;
    if (!lastPointerMoveEvent) return;

    if (hoverPolygonDirect) {
        applyGeoHover(hoverPolygonDirect);
        return;
    }

    if (typeof world.toGlobeCoords === 'function') {
        const coords = world.toGlobeCoords(lastPointerMoveEvent.clientX, lastPointerMoveEvent.clientY);
        if (!coords) {
            applyGeoHover(null);
            return;
        }

        const feature = resolveCoordsToGeoFeature(coords.lat, coords.lng);
        applyGeoHover(feature);
    }
}

globeContainer.addEventListener('pointermove', (e) => {
    lastPointerMoveEvent = e;
    if (!hoverRafId) {
        hoverRafId = requestAnimationFrame(processHoverTick);
    }
}, { passive: true });

globeContainer.addEventListener('pointerleave', () => {
    hoverPolygonDirect = null;
    lastPointerMoveEvent = null;
    if (hoverRafId) {
        cancelAnimationFrame(hoverRafId);
        hoverRafId = null;
    }
    applyGeoHover(null);
});

// Discriminate click from drag/orbit: only trigger area click if pointer moved <= 6px and < 450ms
let pointerDownPos = null;
let pointerDownTime = 0;

globeContainer.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
    pointerDownTime = Date.now();
});

globeContainer.addEventListener('pointerup', (e) => {
    if (!pointerDownPos) return;
    const dx = e.clientX - pointerDownPos.x;
    const dy = e.clientY - pointerDownPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dt = Date.now() - pointerDownTime;
    pointerDownPos = null;

    // Filter out dragging, panning, or long presses (> 6px or > 450ms)
    if (dist > 6 || dt > 450) return;

    // Filter out clicks on markers, navbars, or modals
    if (e.target.closest('.wonder-marker') || 
        e.target.closest('.continent-title-tag') || 
        e.target.closest('.ocean-title-tag') || 
        e.target.closest('.country-label-tag') ||
        e.target.closest('.historical-marker') ||
        e.target.closest('.river-marker') ||
        e.target.closest('.forest-marker') ||
        e.target.closest('.mountain-marker') ||
        e.target.closest('.island-marker') ||
        e.target.closest('.nav-container') ||
        e.target.closest('#navbar') ||
        e.target.closest('.menu-toggle-btn') ||
        e.target.closest('.developer-card') ||
        e.target.closest('.globe-toolbar') ||
        e.target.closest('.toolbar-btn')) {
        return;
    }

    handleGlobeAreaClick(e);
});

function handleGlobeAreaClick(e) {
    if (currentTopic || currentWonder) return;
    if (typeof world.toGlobeCoords !== 'function') return;

    const coords = world.toGlobeCoords(e.clientX, e.clientY);
    if (!coords) return;

    // ONLY country areas open on globe landmass click!
    // Continents & oceans only open when clicking their title (per user requirement)
    const country = findCountryAtCoords(coords.lat, coords.lng);
    if (country) {
        selectCountry(country);
    }
}

// Auto-rotate globe
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.5;

// UI Elements
const infoOverlay = document.getElementById('info-overlay');
const detailBackground = document.getElementById('detail-background');
const bgLayer1 = document.getElementById('bg-layer-1');
const bgLayer2 = document.getElementById('bg-layer-2');
const wonderTitle = document.getElementById('wonder-title');
const wonderSubtitle = document.getElementById('wonder-subtitle');
const scrollPromptText = document.getElementById('scroll-prompt-text');
const chaptersWrapper = document.getElementById('chapters-wrapper');
const backButton = document.getElementById('back-button');
const scrollArea = document.getElementById('info-scroll-area');
const trackerCurrent = document.getElementById('tracker-current');
const trackerFill = document.getElementById('tracker-fill');
const trackerNav = document.getElementById('tracker-nav');
const langToggle = document.getElementById('lang-toggle');
const rotationToggle = document.getElementById('rotation-toggle');
const rotationText = document.getElementById('rotation-text');
const rotationIcon = rotationToggle ? rotationToggle.querySelector('.rotation-icon') : null;
const globeToolbar = document.getElementById('globe-toolbar');
const toolbarBtns = document.querySelectorAll('.toolbar-btn');
const toolbarLabelText = document.getElementById('toolbar-label-text');

// Auto-Rotation Toggle Controller
function updateRotationUI() {
    if (!rotationToggle) return;
    if (isAutoRotating) {
        rotationToggle.classList.add('active');
        rotationToggle.classList.remove('paused');
        if (rotationIcon) rotationIcon.classList.add('rotating');
        if (rotationText) rotationText.textContent = currentLang === 'en' ? 'Auto Rotate: ON' : 'ঘূর্ণন: চালু';
        rotationToggle.setAttribute('title', currentLang === 'en' ? 'Pause Globe Auto-Rotation' : 'গ্লোবের ঘূর্ণন বন্ধ করুন');
        if (!currentWonder) {
            world.controls().autoRotate = true;
        }
    } else {
        rotationToggle.classList.remove('active');
        rotationToggle.classList.add('paused');
        if (rotationIcon) rotationIcon.classList.remove('rotating');
        if (rotationText) rotationText.textContent = currentLang === 'en' ? 'Auto Rotate: OFF' : 'ঘূর্ণন: বন্ধ';
        rotationToggle.setAttribute('title', currentLang === 'en' ? 'Start Globe Auto-Rotation' : 'গ্লোবের ঘূর্ণন চালু করুন');
        world.controls().autoRotate = false;
    }
}

if (rotationToggle) {
    rotationToggle.addEventListener('click', (e) => {
        e.preventDefault();
        isAutoRotating = !isAutoRotating;
        updateRotationUI();
    });
}

// Navigation Bar Elements & Dropdowns
const navSolar = document.getElementById('nav-solar');
const navTextSolar = document.getElementById('nav-text-solar');
const navTextEarth = document.getElementById('nav-text-earth');
const navPlanets = document.getElementById('nav-planets');
const navTextPlanets = document.getElementById('nav-text-planets');
const dropdownPlanetsMenu = document.getElementById('dropdown-planets-menu');
const navGlobe = document.getElementById('nav-globe');
const navWonders = document.getElementById('nav-wonders');
const navContinents = document.getElementById('nav-continents');
const navOceans = document.getElementById('nav-oceans');
const navCountries = document.getElementById('nav-countries');
const navHistorical = document.getElementById('nav-historical');
const navRivers = document.getElementById('nav-rivers');
const navForests = document.getElementById('nav-forests');
const navMountains = document.getElementById('nav-mountains');
const navDeveloper = document.getElementById('nav-developer');

const dropdownWondersMenu = document.getElementById('dropdown-wonders-menu');
const dropdownContinentsMenu = document.getElementById('dropdown-continents-menu');
const dropdownOceansMenu = document.getElementById('dropdown-oceans-menu');
const navCountrySearch = document.getElementById('nav-country-search');
const navCountryList = document.getElementById('nav-country-list');
const navHistoricalSearch = document.getElementById('nav-historical-search');
const navHistoricalList = document.getElementById('nav-historical-list');
const navRiversSearch = document.getElementById('nav-rivers-search');
const navRiversList = document.getElementById('nav-rivers-list');
const navForestsSearch = document.getElementById('nav-forests-search');
const navForestsList = document.getElementById('nav-forests-list');
const navMountainsSearch = document.getElementById('nav-mountains-search');
const navMountainsList = document.getElementById('nav-mountains-list');
const navIslands = document.getElementById('nav-islands');
const navIslandsSearch = document.getElementById('nav-islands-search');
const navIslandsList = document.getElementById('nav-islands-list');

// Organizations Navigation Elements
const navOrganizations = document.getElementById('nav-organizations');
const navTextOrganizations = document.getElementById('nav-text-organizations');
const navOrganizationsSearch = document.getElementById('nav-organizations-search');
const navOrganizationsList = document.getElementById('nav-organizations-list');
const organizationModal = document.getElementById('organization-modal');
const orgModalCloseBtn = document.getElementById('org-modal-close-btn');
const orgModalBackBtn = document.getElementById('org-modal-back-btn');
const orgModalHeader = document.getElementById('org-modal-header');
const orgModalBody = document.getElementById('org-modal-body');
const orgFlyBtn = document.getElementById('org-fly-btn');
let currentSelectedOrg = null;

// Menu Bar and 3-Dot Toggle Button
const navbar = document.getElementById('navbar');
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const siteCopyright = document.getElementById('site-copyright');
let isMenuCollapsed = false;

// Developer Modal Elements
const developerModal = document.getElementById('developer-modal');
const developerModalClose = document.getElementById('developer-modal-close');
const developerBackBtn = document.getElementById('developer-back-btn');
const devRoleBadge = document.getElementById('dev-role-badge');
const devTagline = document.getElementById('dev-tagline');
const devEmailLabel = document.getElementById('dev-email-label');
const devLinkedinLabel = document.getElementById('dev-linkedin-label');

const navTranslations = {
    solar: { en: 'Solar System', bn: 'সৌরজগৎ' },
    earth: { en: 'Earth', bn: 'পৃথিবী' },
    planets: { en: 'Planets & Moons', bn: 'গ্রহ ও চাঁদ' },
    globe: { en: 'Earth', bn: 'পৃথিবী' },
    diveText: { en: 'Deep Zoom into Earth (Explore Countries & Wonders)', bn: 'পৃথিবীতে গভীর জুম করুন (দেশ ও আশ্চর্যসমূহ)' },
    returnSolarText: { en: 'Zoom Out to Solar System', bn: 'সৌরজগতে ফিরে যান' },
    titleKeyMetrics: { en: 'Key Scientific Metrics', bn: 'প্রধান বৈজ্ঞানিক তথ্য' },
    titleMissions: { en: 'Notable Space Missions', bn: 'উল্লেখযোগ্য মহাকাশ অভিযান' },
    labelDiameter: { en: 'Diameter', bn: 'ব্যাস' },
    labelMass: { en: 'Mass', bn: 'ভর' },
    labelGravity: { en: 'Surface Gravity', bn: 'পৃষ্ঠের মাধ্যাকর্ষণ' },
    labelTemp: { en: 'Temperature', bn: 'তাপমাত্রা' },
    labelDistance: { en: 'Dist. from Sun', bn: 'সূর্য থেকে দূরত্ব' },
    labelOrbit: { en: 'Orbital Period', bn: 'কক্ষীয় পরিক্রমণ' },
    labelRotation: { en: 'Rotation Period', bn: 'ঘূর্ণনকাল' },
    labelMoons: { en: 'Moons', bn: 'উপগ্রহ / চাঁদ' },
    speedLabel: { en: 'Speed:', bn: 'গতি:' },
    toggleOrbits: { en: 'Orbits', bn: 'কক্ষপথ' },
    toggleLabels: { en: 'Labels', bn: 'লেবেল' },
    resetView: { en: 'System View', bn: 'সৌরজগৎ দর্শন' },
    wonders: { en: 'Wonders', bn: 'সপ্তাশ্চর্যাবলী' },
    continents: { en: 'Continents', bn: 'মহাদেশ' },
    oceans: { en: 'Oceans', bn: 'মহাসাগর' },
    countries: { en: 'Countries', bn: 'দেশসমূহ' },
    historical: { en: 'Historical Places', bn: 'ঐতিহাসিক স্থানসমূহ' },
    rivers: { en: 'Rivers', bn: 'নদীসমূহ' },
    forests: { en: 'Forests', bn: 'বনভূমি' },
    mountains: { en: 'Mountains', bn: 'পর্বতমালা' },
    islands: { en: 'Islands', bn: 'দ্বীপসমূহ' },
    organizations: { en: 'Organizations', bn: 'সংস্থাসমূহ' },
    developer: { en: 'Developer', bn: 'ডেভেলপার' },
    devRole: { en: '🎓 BSc Engineer', bn: '🎓 বিএসসি ইঞ্জিনিয়ার' },
    devTagline: { en: 'Architect & Creator of 3D Wonders Explorer', bn: 'লিড ডেভেলপার এবং ৩ডি ওয়ান্ডার্স এক্সপ্লোরারের নির্মাতা' },
    devEmailLabel: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
    devLinkedinLabel: { en: 'LinkedIn Profile', bn: 'লিঙ্কডইন প্রোফাইল' },
    devBackBtn: { en: '← Back to Globe', bn: '← গ্লোবে ফিরে যান' },
    menuHide: { en: 'Hide Menu Bar', bn: 'মেনু বার লুকান' },
    menuExpand: { en: 'Expand Menu Bar', bn: 'মেনু বার দেখান' },
    searchPlaceholder: { en: 'Search country...', bn: 'দেশ খুঁজুন...' },
    searchHistoricalPlaceholder: { en: 'Search historical place...', bn: 'ঐতিহাসিক স্থান খুঁজুন...' },
    searchRiversPlaceholder: { en: 'Search river...', bn: 'নদী খুঁজুন...' },
    searchForestsPlaceholder: { en: 'Search forest...', bn: 'বনভূমি খুঁজুন...' },
    searchMountainsPlaceholder: { en: 'Search mountain...', bn: 'পর্বত খুঁজুন...' },
    searchIslandsPlaceholder: { en: 'Search island...', bn: 'দ্বীপ খুঁজুন...' },
    searchOrganizationsPlaceholder: { en: 'Search organization...', bn: 'সংস্থা খুঁজুন...' }
};

const toolbarTranslations = {
    label: { en: 'Layers:', bn: 'লেয়ার:' },
    continents: { en: 'Continents', bn: 'মহাদেশ' },
    countries: { en: 'Countries', bn: 'দেশসমূহ' },
    oceans: { en: 'Oceans', bn: 'মহাসাগর' },
    wonders: { en: '7 Wonders', bn: 'সপ্তাশ্চর্যাবলী' },
    historical: { en: 'Historical Places', bn: 'ঐতিহাসিক স্থান' },
    rivers: { en: 'Rivers', bn: 'নদীসমূহ' },
    forests: { en: 'Forests', bn: 'বনভূমি' },
    mountains: { en: 'Mountains', bn: 'পর্বতমালা' },
    islands: { en: 'Islands', bn: 'দ্বীপসমূহ' }
};

const continentIcons = {
    'asia': '🌏',
    'africa': '🌍',
    'europe': '🌍',
    'north_america': '🌎',
    'south_america': '🌎',
    'oceania': '🌏',
    'antarctica': '🧊'
};

const continentNameToId = {
    'Asia': 'asia',
    'Africa': 'africa',
    'Europe': 'europe',
    'North America': 'north_america',
    'South America': 'south_america',
    'Oceania': 'oceania',
    'Antarctica': 'antarctica'
};

function closeAllDropdowns() {
    if (typeof closeDropdownTimeout !== 'undefined' && closeDropdownTimeout) {
        clearTimeout(closeDropdownTimeout);
        closeDropdownTimeout = null;
    }
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.nav-dropdown-trigger.active-trigger').forEach(t => t.classList.remove('active-trigger'));
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    if (typeof activeDropdownMenu !== 'undefined') activeDropdownMenu = null;
    if (typeof pinnedDropdownMenu !== 'undefined') pinnedDropdownMenu = null;
}

function closeWonderOverlayIfActive() {
    if (!currentWonder && !currentTopic) return;
    if (topicOpenTimeout) {
        clearTimeout(topicOpenTimeout);
        topicOpenTimeout = null;
    }
    if (globeHideTimeout) {
        clearTimeout(globeHideTimeout);
        globeHideTimeout = null;
    }
    infoOverlay.classList.remove('visible');
    hideCountryTopicsHub();
    closeCountryItemDetail();
    if (typeof closeOrganizationModal === 'function') closeOrganizationModal();
    globeContainer.classList.remove('hidden');
    void globeContainer.offsetWidth;
    globeContainer.style.opacity = 1;
    if (globeToolbar) globeToolbar.style.opacity = 1;
    if (siteCopyright) siteCopyright.style.opacity = 1;
    if (menuToggleBtn) {
        menuToggleBtn.style.opacity = 1;
        menuToggleBtn.style.pointerEvents = 'auto';
    }
    detailBackground.classList.remove('visible');
    setTimeout(() => {
        infoOverlay.classList.add('hidden');
        detailBackground.classList.add('hidden');
        bgLayer1.classList.remove('active');
        bgLayer2.classList.remove('active');
        currentWonder = null;
        currentTopic = null;
        currentTopicType = null;
    }, 900);
}


// Populate Planets & Satellites Dropdown Menu
function populatePlanetsDropdown() {
    if (!dropdownPlanetsMenu || typeof solarSystemData === 'undefined') return;
    dropdownPlanetsMenu.innerHTML = '';

    const groups = [
        {
            title: { en: 'Central Star', bn: 'প্রধান নক্ষত্র' },
            items: ['sun']
        },
        {
            title: { en: 'Terrestrial Planets', bn: 'পাথুরে গ্রহসমূহ' },
            items: ['mercury', 'venus', 'earth', 'mars']
        },
        {
            title: { en: 'Earth Satellites (Natural & Artificial)', bn: 'পৃথিবীর উপগ্রহসমূহ' },
            items: ['moon', 'iss', 'hubble', 'jwst']
        },
        {
            title: { en: 'Asteroid Belt & Moons', bn: 'গ্রহাণু বলয় ও চাঁদ' },
            items: ['ceres', 'phobos']
        },
        {
            title: { en: 'Gas & Ice Giants', bn: 'বিশাল গ্যাসীয় ও বরফ গ্রহ' },
            items: ['jupiter', 'europa', 'ganymede', 'saturn', 'titan', 'uranus', 'neptune', 'triton']
        },
        {
            title: { en: 'Dwarf Planets & Interstellar', bn: 'বামন গ্রহ ও গভীর মহাকাশ' },
            items: ['pluto', 'voyager1']
        }
    ];

    const iconMap = {
        sun: '☀️', mercury: '☿️', venus: '♀️', earth: '🌍', moon: '🌙',
        iss: '🛰️', hubble: '🔭', jwst: '✨', mars: '♂️', phobos: '🥔',
        ceres: '☄️', jupiter: '♃', europa: '🌊', ganymede: '🪐',
        saturn: '♄', titan: '🟠', uranus: '♅', neptune: '♆',
        triton: '❄️', pluto: '❤️', voyager1: '📡'
    };

    groups.forEach(g => {
        const header = document.createElement('div');
        header.className = 'celestial-dropdown-section';
        header.textContent = g.title[currentLang];
        dropdownPlanetsMenu.appendChild(header);

        g.items.forEach(id => {
            const item = solarSystemData[id];
            if (!item) return;

            const a = document.createElement('a');
            a.href = '#';
            a.className = 'dropdown-item';
            a.dataset.id = id;
            const icon = iconMap[id] || '✨';
            const name = (item.name && item.name[currentLang]) ? item.name[currentLang] : item.name.en;
            const meta = item.diameter ? item.diameter.split('(')[0].trim() : '';

            a.innerHTML = `
                <span class="dropdown-item-icon">${icon}</span>
                <span>${name}</span>
                ${meta ? `<span class="dropdown-item-meta">${meta}</span>` : ''}
            `;

            a.addEventListener('click', (e) => {
                e.preventDefault();
                closeAllDropdowns();
                if (window.SolarSystem) {
                    const globeContainer = document.getElementById('globe-container');
                    if (globeContainer && !globeContainer.classList.contains('hidden') && id !== 'earth') {
                        window.SolarSystem.zoomOutSolar();
                    }
                    setTimeout(() => {
                        window.SolarSystem.selectBody(id);
                    }, 350);
                }
            });

            dropdownPlanetsMenu.appendChild(a);
        });
    });
}

// Populate Wonders Dropdown
function populateWondersDropdown() {
    if (!dropdownWondersMenu) return;
    dropdownWondersMenu.innerHTML = '';
    wondersData.forEach(w => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'dropdown-item';
        item.dataset.id = w.id;
        const loc = w.subtitle[currentLang] ? (w.subtitle[currentLang].split('•')[1] || '').trim() : '';
        item.innerHTML = `
            <img class="dropdown-thumb" src="${w.images[0]}" alt="${w.name[currentLang]}" />
            <span>${w.name[currentLang]}</span>
            ${loc ? `<span class="dropdown-item-meta">${loc}</span>` : ''}
        `;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            selectWonder(w);
            closeAllDropdowns();
        });
        dropdownWondersMenu.appendChild(item);
    });
}

// Populate Continents Dropdown
function populateContinentsDropdown() {
    if (!dropdownContinentsMenu) return;
    dropdownContinentsMenu.innerHTML = '';
    const continents = (typeof geoLabels !== 'undefined') ? geoLabels.filter(l => l.type === 'continent') : [];
    continents.forEach(c => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'dropdown-item';
        item.dataset.id = c.geoId;
        const icon = continentIcons[c.geoId] || '🌍';
        item.innerHTML = `
            <span class="dropdown-item-icon">${icon}</span>
            <span>${c.name[currentLang]}</span>
        `;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            selectContinent(c.geoId);
            closeAllDropdowns();
        });
        dropdownContinentsMenu.appendChild(item);
    });
}

// Populate Oceans Dropdown
function populateOceansDropdown() {
    if (!dropdownOceansMenu) return;
    dropdownOceansMenu.innerHTML = '';
    const oceans = (typeof geoLabels !== 'undefined') ? geoLabels.filter(l => l.type === 'ocean') : [];
    oceans.forEach(o => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'dropdown-item';
        item.dataset.id = o.geoId;
        const isPolar = o.geoId.includes('arctic') || o.geoId.includes('southern');
        const icon = isPolar ? '🧊' : '🌊';
        item.innerHTML = `
            <span class="dropdown-item-icon">${icon}</span>
            <span>${o.name[currentLang]}</span>
        `;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            selectOcean(o.geoId);
            closeAllDropdowns();
        });
        dropdownOceansMenu.appendChild(item);
    });
}

// Populate and Filter Countries List
function renderCountryList(filterText = '') {
    if (!navCountryList) return;
    navCountryList.innerHTML = '';
    if (typeof countryLabels === 'undefined') return;

    const query = filterText.trim().toLowerCase();
    const sorted = [...countryLabels].sort((a, b) => {
        const nameA = (a.name[currentLang] || a.name.en).toLowerCase();
        const nameB = (b.name[currentLang] || b.name.en).toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const filtered = query ? sorted.filter(c => {
        const nameEn = (c.name.en || '').toLowerCase();
        const nameBn = (c.name.bn || '').toLowerCase();
        return nameEn.includes(query) || nameBn.includes(query);
    }) : sorted;

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = '12px';
        empty.style.textAlign = 'center';
        empty.style.color = 'rgba(255,255,255,0.5)';
        empty.style.fontSize = '12px';
        empty.textContent = currentLang === 'en' ? 'No countries found' : 'কোন দেশ খুঁজে পাওয়া যায়নি';
        navCountryList.appendChild(empty);
        return;
    }

    filtered.forEach(c => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'dropdown-item';
        item.dataset.id = c.id;
        const displayName = c.name[currentLang] || c.name.en;
        item.innerHTML = `
            <span class="dropdown-item-icon">📍</span>
            <span>${displayName}</span>
            <span class="dropdown-item-meta">${c.continent}</span>
        `;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            selectCountry(c);
            closeAllDropdowns();
        });
        navCountryList.appendChild(item);
    });
}

// High-Performance Chunked / Virtual Dropdown List Renderer
function setupChunkedListRenderer(listEl, getDataset, icon, selectCallback) {
    if (!listEl) return () => {};
    let currentFiltered = [];
    let currentRenderedCount = 0;
    const CHUNK_SIZE = 50;

    function renderMore() {
        if (currentRenderedCount >= currentFiltered.length) return;
        const nextBatch = currentFiltered.slice(currentRenderedCount, currentRenderedCount + CHUNK_SIZE);
        const fragment = document.createDocumentFragment();

        nextBatch.forEach(item => {
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'dropdown-item';
            a.dataset.id = item.id;
            const displayName = (item.name && item.name[currentLang]) ? item.name[currentLang] : (item.name ? item.name.en : '');
            
            let meta = '';
            if (item.country) {
                meta = (item.country[currentLang] || item.country.en || '');
            } else if (item.basin) {
                meta = (item.basin[currentLang] || item.basin.en || '');
            } else if (item.range) {
                meta = (item.range[currentLang] || item.range.en || (item.elevation ? `${item.elevation}m` : ''));
            } else if (item.type) {
                meta = (item.type[currentLang] || item.type.en || '');
            }

            a.innerHTML = `
                <span class="dropdown-item-icon">${icon}</span>
                <span>${displayName}</span>
                ${meta ? `<span class="dropdown-item-meta">${meta}</span>` : ''}
            `;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                selectCallback(item);
                closeAllDropdowns();
            });
            fragment.appendChild(a);
        });

        listEl.appendChild(fragment);
        currentRenderedCount += nextBatch.length;
    }

    listEl.addEventListener('scroll', () => {
        if (listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight - 160) {
            renderMore();
        }
    });

    return function filterAndRender(filterText = '') {
        listEl.innerHTML = '';
        currentRenderedCount = 0;
        const dataset = getDataset();
        if (!dataset || dataset.length === 0) return;

        const query = filterText.trim().toLowerCase();
        const sorted = [...dataset].sort((a, b) => {
            const nameA = ((a.name && (a.name[currentLang] || a.name.en)) || '').toLowerCase();
            const nameB = ((b.name && (b.name[currentLang] || b.name.en)) || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });

        currentFiltered = query ? sorted.filter(p => {
            const nameEn = (p.name && p.name.en || '').toLowerCase();
            const nameBn = (p.name && p.name.bn || '').toLowerCase();
            const metaEn = (p.country && p.country.en || p.basin && p.basin.en || p.range && p.range.en || p.type && p.type.en || '').toLowerCase();
            const metaBn = (p.country && p.country.bn || p.basin && p.basin.bn || p.range && p.range.bn || p.type && p.type.bn || '').toLowerCase();
            return nameEn.includes(query) || nameBn.includes(query) || metaEn.includes(query) || metaBn.includes(query);
        }) : sorted;

        if (currentFiltered.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '14px';
            empty.style.textAlign = 'center';
            empty.style.color = 'rgba(255,255,255,0.5)';
            empty.style.fontSize = '12px';
            empty.textContent = currentLang === 'en' ? 'No items found' : 'কোন তথ্য খুঁজে পাওয়া যায়নি';
            listEl.appendChild(empty);
            return;
        }

        renderMore();
    };
}

// 1000 Historical Places Dropdown Renderer
const renderHistoricalList = setupChunkedListRenderer(
    navHistoricalList,
    () => (typeof historicalPlacesData !== 'undefined' ? Object.values(historicalPlacesData) : []),
    '🏛️',
    selectHistoricalPlace
);

// 1000 Rivers Dropdown Renderer
const renderRiversList = setupChunkedListRenderer(
    navRiversList,
    () => (typeof riversData !== 'undefined' ? Object.values(riversData) : []),
    '🌊',
    selectRiver
);

// 1000 Forests Dropdown Renderer
const renderForestsList = setupChunkedListRenderer(
    navForestsList,
    () => (typeof forestsData !== 'undefined' ? Object.values(forestsData) : []),
    '🌲',
    selectForest
);

// 1000 Mountains Dropdown Renderer
const renderMountainsList = setupChunkedListRenderer(
    navMountainsList,
    () => (typeof mountainsData !== 'undefined' ? Object.values(mountainsData) : []),
    '⛰️',
    selectMountain
);

// 1000 Islands Dropdown Renderer
const renderIslandsList = setupChunkedListRenderer(
    navIslandsList,
    () => (typeof islandsData !== 'undefined' ? Object.values(islandsData) : []),
    '🏝️',
    selectIsland
);

// World Organizations Dropdown Renderer
const renderOrganizationsList = setupChunkedListRenderer(
    navOrganizationsList,
    () => (typeof OrganizationsEngine !== 'undefined' ? OrganizationsEngine.getAllOrganizations() : []),
    '🌐',
    selectOrganization
);

// Update All Navigation Labels and Dropdowns on Language Change
function updateNavTranslations() {
    if (navTextSolar) navTextSolar.textContent = navTranslations.solar[currentLang];
    if (navTextEarth) navTextEarth.textContent = navTranslations.earth[currentLang];
    if (navTextPlanets) navTextPlanets.textContent = navTranslations.planets[currentLang];

    const returnSolarText = document.getElementById('return-solar-text');
    if (returnSolarText) returnSolarText.textContent = navTranslations.returnSolarText[currentLang];

    const diveText = document.getElementById('dive-text');
    if (diveText) diveText.textContent = navTranslations.diveText[currentLang];

    const titleMetrics = document.getElementById('title-key-metrics');
    if (titleMetrics) titleMetrics.textContent = navTranslations.titleKeyMetrics[currentLang];

    const titleMissions = document.getElementById('title-missions');
    if (titleMissions) titleMissions.textContent = navTranslations.titleMissions[currentLang];

    const speedLabel = document.getElementById('solar-speed-label');
    if (speedLabel) speedLabel.textContent = navTranslations.speedLabel[currentLang];

    const toggleOrbits = document.getElementById('toggle-orbits-text');
    if (toggleOrbits) toggleOrbits.textContent = navTranslations.toggleOrbits[currentLang];

    const toggleLabels = document.getElementById('toggle-labels-text');
    if (toggleLabels) toggleLabels.textContent = navTranslations.toggleLabels[currentLang];

    const resetView = document.getElementById('reset-view-text');
    if (resetView) resetView.textContent = navTranslations.resetView[currentLang];

    populatePlanetsDropdown();
    if (window.SolarSystem && typeof window.SolarSystem.updateTranslations === 'function') {
        window.SolarSystem.updateTranslations();
    }

    const globeText = document.querySelector('#nav-globe .nav-text');
    if (globeText) globeText.textContent = navTranslations.earth[currentLang];

    const wondersText = document.querySelector('#nav-wonders .nav-text');
    if (wondersText) wondersText.textContent = navTranslations.wonders[currentLang];

    const continentsText = document.querySelector('#nav-continents .nav-text');
    if (continentsText) continentsText.textContent = navTranslations.continents[currentLang];

    const oceansText = document.querySelector('#nav-oceans .nav-text');
    if (oceansText) oceansText.textContent = navTranslations.oceans[currentLang];

    const countriesText = document.querySelector('#nav-countries .nav-text');
    if (countriesText) countriesText.textContent = navTranslations.countries[currentLang];

    const historicalText = document.querySelector('#nav-historical .nav-text');
    if (historicalText) historicalText.textContent = navTranslations.historical[currentLang];

    const riversText = document.querySelector('#nav-rivers .nav-text');
    if (riversText) riversText.textContent = navTranslations.rivers[currentLang];

    const forestsText = document.querySelector('#nav-forests .nav-text');
    if (forestsText) forestsText.textContent = navTranslations.forests[currentLang];

    const mountainsText = document.querySelector('#nav-mountains .nav-text');
    if (mountainsText) mountainsText.textContent = navTranslations.mountains[currentLang];

    const islandsText = document.querySelector('#nav-islands .nav-text');
    if (islandsText) islandsText.textContent = navTranslations.islands[currentLang];

    const orgsText = document.querySelector('#nav-organizations .nav-text');
    if (orgsText) orgsText.textContent = navTranslations.organizations[currentLang];

    const devText = document.querySelector('#nav-developer .nav-text');
    if (devText) devText.textContent = navTranslations.developer[currentLang];

    // Developer modal translations
    if (devRoleBadge) devRoleBadge.textContent = navTranslations.devRole[currentLang];
    if (devTagline) devTagline.textContent = navTranslations.devTagline[currentLang];
    if (devEmailLabel) devEmailLabel.textContent = navTranslations.devEmailLabel[currentLang];
    if (devLinkedinLabel) devLinkedinLabel.textContent = navTranslations.devLinkedinLabel[currentLang];
    if (developerBackBtn) developerBackBtn.textContent = navTranslations.devBackBtn[currentLang];

    if (navCountrySearch) {
        navCountrySearch.placeholder = navTranslations.searchPlaceholder[currentLang];
    }
    if (navHistoricalSearch) {
        navHistoricalSearch.placeholder = navTranslations.searchHistoricalPlaceholder[currentLang];
    }
    if (navRiversSearch) {
        navRiversSearch.placeholder = navTranslations.searchRiversPlaceholder[currentLang];
    }
    if (navForestsSearch) {
        navForestsSearch.placeholder = navTranslations.searchForestsPlaceholder[currentLang];
    }
    if (navMountainsSearch) {
        navMountainsSearch.placeholder = navTranslations.searchMountainsPlaceholder[currentLang];
    }
    if (navIslandsSearch) {
        navIslandsSearch.placeholder = navTranslations.searchIslandsPlaceholder[currentLang];
    }
    if (navOrganizationsSearch) {
        navOrganizationsSearch.placeholder = navTranslations.searchOrganizationsPlaceholder[currentLang];
    }

    if (toolbarLabelText) toolbarLabelText.textContent = toolbarTranslations.label[currentLang];
    ['continents', 'countries', 'oceans', 'wonders', 'historical', 'rivers', 'forests', 'mountains', 'islands'].forEach(layer => {
        const span = document.getElementById(`layer-text-${layer}`);
        if (span && toolbarTranslations[layer]) {
            span.textContent = toolbarTranslations[layer][currentLang];
        }
    });

    // Refresh 3-dot button tooltip
    updateMenuToggleUI();

    // Refresh dropdown items with current language
    populateWondersDropdown();
    populateContinentsDropdown();
    populateOceansDropdown();
    renderCountryList(navCountrySearch ? navCountrySearch.value : '');
    renderHistoricalList(navHistoricalSearch ? navHistoricalSearch.value : '');
    renderRiversList(navRiversSearch ? navRiversSearch.value : '');
    renderForestsList(navForestsSearch ? navForestsSearch.value : '');
    renderMountainsList(navMountainsSearch ? navMountainsSearch.value : '');
    renderIslandsList(navIslandsSearch ? navIslandsSearch.value : '');
    renderOrganizationsList(navOrganizationsSearch ? navOrganizationsSearch.value : '');

    // Refresh open Organization modal if currently open
    if (currentSelectedOrg && organizationModal && !organizationModal.classList.contains('hidden')) {
        openOrganizationModal(currentSelectedOrg);
    }
}

// 3-Dot Menu Bar Hide/Expand Toggle Handler
function updateMenuToggleUI() {
    if (!menuToggleBtn || !navbar) return;
    if (isMenuCollapsed) {
        navbar.classList.add('hidden-bar');
        menuToggleBtn.classList.add('collapsed');
        const tip = navTranslations.menuExpand[currentLang];
        menuToggleBtn.setAttribute('title', tip);
        menuToggleBtn.setAttribute('aria-label', tip);
    } else {
        navbar.classList.remove('hidden-bar');
        menuToggleBtn.classList.remove('collapsed');
        const tip = navTranslations.menuHide[currentLang];
        menuToggleBtn.setAttribute('title', tip);
        menuToggleBtn.setAttribute('aria-label', tip);
    }
}

if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllDropdowns();
        isMenuCollapsed = !isMenuCollapsed;
        updateMenuToggleUI();
    });
}

// Open and Close Developer Profile Modal
function openDeveloperModal() {
    if (!developerModal) return;
    closeWonderOverlayIfActive();
    closeAllDropdowns();
    developerModal.classList.remove('hidden');
}

function closeDeveloperModal() {
    if (!developerModal) return;
    developerModal.classList.add('hidden');
}

// Wire Up Navigation Listeners
if (navGlobe) {
    navGlobe.addEventListener('click', (e) => {
        e.preventDefault();
        closeWonderOverlayIfActive();
        closeDeveloperModal();
        applyGeoHover(null);
        world.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 1200);
        if (isAutoRotating) {
            world.controls().autoRotate = true;
        }
        document.querySelectorAll('.nav-links .nav-item').forEach(el => el.classList.remove('active'));
        navGlobe.classList.add('active');
        closeAllDropdowns();
        if (window.SolarSystem) window.SolarSystem.zoomInEarth();
    });
}

if (navDeveloper) {
    navDeveloper.addEventListener('click', (e) => {
        e.preventDefault();
        openDeveloperModal();
    });
}

if (developerModalClose) {
    developerModalClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeDeveloperModal();
    });
}

if (developerBackBtn) {
    developerBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDeveloperModal();
    });
}

if (developerModal) {
    developerModal.addEventListener('click', (e) => {
        if (e.target === developerModal) {
            closeDeveloperModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && developerModal && !developerModal.classList.contains('hidden')) {
        closeDeveloperModal();
    }
});

// Standalone Dropdown Popup Windows Controller
let activeDropdownMenu = null;
let pinnedDropdownMenu = null;
let closeDropdownTimeout = null;

function positionDropdownMenu(trigger, menu) {
    if (!trigger || !menu) return;
    const rect = trigger.getBoundingClientRect();
    const menuHeight = menu.offsetHeight || 380;
    const windowHeight = window.innerHeight;

    // Align top with the trigger button, clamped to viewport bounds
    const minTop = 10;
    const maxTop = Math.max(minTop, windowHeight - menuHeight - 16);
    const targetTop = Math.max(minTop, Math.min(maxTop, rect.top - 4));
    menu.style.top = targetTop + 'px';
    menu.style.left = '250px';
}

function openDropdownPopup(trigger, menu, isPin = false) {
    if (!trigger || !menu) return;
    if (closeDropdownTimeout) {
        clearTimeout(closeDropdownTimeout);
        closeDropdownTimeout = null;
    }

    // Close any other open dropdowns
    document.querySelectorAll('.dropdown-menu.open').forEach(m => {
        if (m !== menu) m.classList.remove('open');
    });
    document.querySelectorAll('.nav-dropdown-trigger.active-trigger').forEach(t => {
        if (t !== trigger) t.classList.remove('active-trigger');
    });

    positionDropdownMenu(trigger, menu);
    menu.classList.add('open');
    trigger.classList.add('active-trigger');
    activeDropdownMenu = menu;

    if (isPin) {
        pinnedDropdownMenu = menu;
        // Auto-focus search input if present inside the menu
        const searchInput = menu.querySelector('.nav-country-input');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
    }
}

function closeDropdownPopup(menu, force = false) {
    if (!menu) return;
    if (pinnedDropdownMenu === menu && !force) return;

    menu.classList.remove('open');
    const menuId = menu.id;
    const trigger = document.querySelector(`[data-menu="${menuId}"]`);
    if (trigger) trigger.classList.remove('active-trigger');

    if (activeDropdownMenu === menu) activeDropdownMenu = null;
    if (pinnedDropdownMenu === menu) pinnedDropdownMenu = null;
}

// Wire up triggers and their standalone popup windows
document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    const menuId = trigger.getAttribute('data-menu');
    const menu = menuId ? document.getElementById(menuId) : null;
    if (!menu) return;

    // Hover on trigger: show popup window
    trigger.addEventListener('mouseenter', () => {
        if (isMenuCollapsed) return;
        openDropdownPopup(trigger, menu, false);
    });

    // Leave trigger: schedule close if not entering popup menu
    trigger.addEventListener('mouseleave', () => {
        closeDropdownTimeout = setTimeout(() => {
            if (activeDropdownMenu === menu && pinnedDropdownMenu !== menu) {
                closeDropdownPopup(menu);
            }
        }, 180);
    });

    // Hover on menu: cancel close schedule
    menu.addEventListener('mouseenter', () => {
        if (closeDropdownTimeout) {
            clearTimeout(closeDropdownTimeout);
            closeDropdownTimeout = null;
        }
    });

    // Leave menu: schedule close
    menu.addEventListener('mouseleave', () => {
        closeDropdownTimeout = setTimeout(() => {
            if (activeDropdownMenu === menu && pinnedDropdownMenu !== menu) {
                closeDropdownPopup(menu);
            }
        }, 180);
    });

    // Click on trigger: toggle pin
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isMenuCollapsed) return;
        if (pinnedDropdownMenu === menu) {
            closeDropdownPopup(menu, true);
        } else {
            openDropdownPopup(trigger, menu, true);
        }
    });
});

// Auto-align popup window on window resize
window.addEventListener('resize', () => {
    if (activeDropdownMenu) {
        const trigger = document.querySelector(`[data-menu="${activeDropdownMenu.id}"]`);
        if (trigger) positionDropdownMenu(trigger, activeDropdownMenu);
    }
});

// Lock popup open when user focuses on search inputs inside any dropdown
document.querySelectorAll('.nav-country-input').forEach(input => {
    input.addEventListener('focus', () => {
        const menu = input.closest('.dropdown-menu');
        if (menu) {
            const trigger = document.querySelector(`[data-menu="${menu.id}"]`);
            if (trigger) openDropdownPopup(trigger, menu, true);
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-menu') && !e.target.closest('.nav-dropdown-trigger')) {
        closeAllDropdowns();
    }
});

// Country Search Input Listener
if (navCountrySearch) {
    navCountrySearch.addEventListener('input', (e) => {
        renderCountryList(e.target.value);
    });
    // Prevent clicking in the search input from closing the dropdown
    navCountrySearch.addEventListener('click', (e) => e.stopPropagation());
}

// Historical Places Search Input Listener
if (navHistoricalSearch) {
    navHistoricalSearch.addEventListener('input', (e) => {
        renderHistoricalList(e.target.value);
    });
    navHistoricalSearch.addEventListener('click', (e) => e.stopPropagation());
}

// Rivers Search Input Listener
if (navRiversSearch) {
    navRiversSearch.addEventListener('input', (e) => {
        renderRiversList(e.target.value);
    });
    navRiversSearch.addEventListener('click', (e) => e.stopPropagation());
}

// Forests Search Input Listener
if (navForestsSearch) {
    navForestsSearch.addEventListener('input', (e) => {
        renderForestsList(e.target.value);
    });
    navForestsSearch.addEventListener('click', (e) => e.stopPropagation());
}

// Mountains Search Input Listener
if (navMountainsSearch) {
    navMountainsSearch.addEventListener('input', (e) => {
        renderMountainsList(e.target.value);
    });
    navMountainsSearch.addEventListener('click', (e) => e.stopPropagation());
}

// Islands Search Input Listener
if (navIslandsSearch) {
    navIslandsSearch.addEventListener('input', (e) => {
        renderIslandsList(e.target.value);
    });
    navIslandsSearch.addEventListener('click', (e) => e.stopPropagation());
}

// Organizations Search Input Listener
if (navOrganizationsSearch) {
    navOrganizationsSearch.addEventListener('input', (e) => {
        renderOrganizationsList(e.target.value);
    });
    navOrganizationsSearch.addEventListener('click', (e) => e.stopPropagation());
}

// Organization Select Handler
function selectOrganization(org) {
    if (!org) return;
    currentSelectedOrg = org;
    closeWonderOverlayIfActive();
    closeDeveloperModal();
    closeCountryItemDetail();
    closeAllDropdowns();
    openOrganizationModal(org);
}

// Open Organization Detail Modal
function openOrganizationModal(org) {
    if (!organizationModal || !org) return;
    currentSelectedOrg = org;

    const displayName = (org.name && org.name[currentLang]) ? org.name[currentLang] : (org.name ? org.name.en : '');
    const orgType = (org.type && org.type[currentLang]) ? org.type[currentLang] : (org.type ? org.type.en : '');
    const hq = (org.headquarters && org.headquarters[currentLang]) ? org.headquarters[currentLang] : (org.headquarters ? org.headquarters.en : '');
    const leader = (org.leader && org.leader[currentLang]) ? org.leader[currentLang] : (org.leader ? org.leader.en : '');
    const leaderTitle = (org.leaderTitle && org.leaderTitle[currentLang]) ? org.leaderTitle[currentLang] : (org.leaderTitle ? org.leaderTitle.en : '');
    const languages = (org.languages && org.languages[currentLang]) ? org.languages[currentLang] : (org.languages ? org.languages.en : '');
    const overview = (org.overview && org.overview[currentLang]) ? org.overview[currentLang] : (org.overview ? org.overview.en : '');

    // Header
    if (orgModalHeader) {
        orgModalHeader.innerHTML = `
            <div class="org-header-badge-row">
                <span class="org-acronym-badge">${org.acronym || 'ORG'}</span>
                <span class="org-type-pill">${orgType}</span>
            </div>
            <h2 class="org-modal-title">
                <span>${org.icon || '🌐'}</span>
                <span>${displayName}</span>
            </h2>
        `;
    }

    // Body
    const membersCountVal = org.membersCount || (org.memberCountries ? org.memberCountries.length : 0);
    const membersCountText = currentLang === 'en' ? `${membersCountVal} Member Nations` : `${membersCountVal}টি সদস্য রাষ্ট্র`;

    let organsHtml = '';
    if (org.organs && org.organs.length > 0) {
        organsHtml = `
            <div class="org-section">
                <h3 class="org-section-title">🏛️ ${currentLang === 'en' ? 'Principal Organs & Specialized Bodies' : 'প্রধান শাখা ও অঙ্গসংস্থাসমূহ'}</h3>
                <div class="org-organs-list">
                    ${org.organs.map(o => `
                        <div class="org-organ-card">
                            <div class="org-organ-name">${(o.name && o.name[currentLang]) ? o.name[currentLang] : o.name.en}</div>
                            <div class="org-organ-role">${(o.role && o.role[currentLang]) ? o.role[currentLang] : o.role.en}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    let highlightsHtml = '';
    if (org.keyHighlights && org.keyHighlights.length > 0) {
        highlightsHtml = `
            <div class="org-section">
                <h3 class="org-section-title">✦ ${currentLang === 'en' ? 'Major Treaties & Global Milestones' : 'গুরুত্বপূর্ণ অর্জন ও আন্তর্জাতিক সনদ'}</h3>
                <ul class="highlights-list">
                    ${org.keyHighlights.map(h => `<li>${(h && h[currentLang]) ? h[currentLang] : h.en}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (orgModalBody) {
        orgModalBody.innerHTML = `
            <div class="org-metrics-grid">
                <div class="org-metric-card">
                    <div class="org-metric-label">${currentLang === 'en' ? 'Headquarters' : 'সদর দপ্তর'}</div>
                    <div class="org-metric-val">📍 ${hq}</div>
                </div>
                <div class="org-metric-card">
                    <div class="org-metric-label">${currentLang === 'en' ? 'Founded Date' : 'প্রতিষ্ঠা সাল'}</div>
                    <div class="org-metric-val">📅 ${org.founded || 'N/A'}</div>
                </div>
                <div class="org-metric-card">
                    <div class="org-metric-label">${leaderTitle}</div>
                    <div class="org-metric-val">👤 ${leader}</div>
                </div>
                <div class="org-metric-card">
                    <div class="org-metric-label">${currentLang === 'en' ? 'Official Languages' : 'সরকারি ভাষা'}</div>
                    <div class="org-metric-val">🗣️ ${languages}</div>
                </div>
                <div class="org-metric-card">
                    <div class="org-metric-label">${currentLang === 'en' ? 'Membership' : 'সদস্য সংখ্যা'}</div>
                    <div class="org-metric-val">🌍 ${membersCountText}</div>
                </div>
                <div class="org-metric-card">
                    <div class="org-metric-label">${currentLang === 'en' ? 'Budget / Capital' : 'বাজেট / তহবিল'}</div>
                    <div class="org-metric-val">💵 ${org.budget || 'Member Assessed'}</div>
                </div>
            </div>

            <div class="org-section">
                <h3 class="org-section-title">📜 ${currentLang === 'en' ? 'Mission & Foundational Charter' : 'উদ্দেশ্য ও প্রতিষ্ঠা সনদ'}</h3>
                <p class="org-overview-text">${overview}</p>
            </div>

            <!-- Interactive Member Countries Section -->
            <div class="org-members-box">
                <div class="org-members-toolbar">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3 class="org-section-title" style="margin:0;">👥 ${currentLang === 'en' ? 'Member States & Signatories' : 'সদস্য দেশসমূহ'}</h3>
                        <span class="org-members-count-badge">${membersCountText}</span>
                    </div>
                    <input type="text" id="org-members-search-input" class="org-members-search" placeholder="${currentLang === 'en' ? 'Filter member countries...' : 'সদস্য দেশ খুঁজুন...'}" autocomplete="off" />
                </div>
                <div class="org-members-grid" id="org-members-grid-container">
                    <!-- Populated dynamically -->
                </div>
            </div>

            ${organsHtml}
            ${highlightsHtml}
        `;

        // Render member country pills with live search
        const membersGrid = document.getElementById('org-members-grid-container');
        const memberSearch = document.getElementById('org-members-search-input');
        const membersList = org.memberCountries || [];

        function renderMemberPills(filter = '') {
            if (!membersGrid) return;
            membersGrid.innerHTML = '';
            const q = filter.trim().toLowerCase();
            const filtered = q ? membersList.filter(m => m.toLowerCase().includes(q)) : membersList;
            if (filtered.length === 0) {
                membersGrid.innerHTML = `<span style="font-size:12px; color:rgba(255,255,255,0.4); padding:8px;">${currentLang === 'en' ? 'No member countries match query' : 'কোন মিল পাওয়া যায়নি'}</span>`;
                return;
            }
            filtered.forEach(countryName => {
                const pill = document.createElement('span');
                pill.className = 'org-member-pill';
                pill.textContent = countryName;
                membersGrid.appendChild(pill);
            });
        }

        renderMemberPills();
        if (memberSearch) {
            memberSearch.addEventListener('input', (e) => renderMemberPills(e.target.value));
        }
    }

    // Update Fly Button Label
    if (orgFlyBtn) {
        orgFlyBtn.textContent = currentLang === 'en' 
            ? `📍 Fly to ${org.hqCity || 'Headquarters'} on Globe` 
            : `📍 গ্লোবে ${org.hqCity || 'সদর দপ্তরে'} যান`;
    }
    if (orgModalBackBtn) {
        orgModalBackBtn.textContent = currentLang === 'en' ? '← Close' : '← বন্ধ করুন';
    }

    organizationModal.classList.remove('hidden');
}

function closeOrganizationModal() {
    if (!organizationModal) return;
    organizationModal.classList.add('hidden');
}

if (orgModalCloseBtn) {
    orgModalCloseBtn.addEventListener('click', closeOrganizationModal);
}

if (orgModalBackBtn) {
    orgModalBackBtn.addEventListener('click', closeOrganizationModal);
}

if (organizationModal) {
    organizationModal.addEventListener('click', (e) => {
        if (e.target === organizationModal) closeOrganizationModal();
    });
}

if (orgFlyBtn) {
    orgFlyBtn.addEventListener('click', () => {
        if (!currentSelectedOrg || typeof currentSelectedOrg.lat !== 'number') return;
        closeOrganizationModal();
        if (typeof closeWonderOverlayIfActive === 'function') closeWonderOverlayIfActive();
        world.controls().autoRotate = false;
        world.pointOfView({ lat: currentSelectedOrg.lat, lng: currentSelectedOrg.lng, altitude: 0.35 }, 1500);

        const hqName = (currentSelectedOrg.headquarters && currentSelectedOrg.headquarters[currentLang]) ? currentSelectedOrg.headquarters[currentLang] : currentSelectedOrg.headquarters.en;
        const orgName = (currentSelectedOrg.name && currentSelectedOrg.name[currentLang]) ? currentSelectedOrg.name[currentLang] : currentSelectedOrg.name.en;
        applyGeoHover({
            name: { en: orgName, bn: orgName },
            subtitle: { en: `${currentSelectedOrg.acronym || ''} HQ • ${hqName}`, bn: `${currentSelectedOrg.acronym || ''} সদর দপ্তর • ${hqName}` },
            icon: currentSelectedOrg.icon || '🏛️'
        });
    });
}


// Solar System / Earth Switch Navigation
if (navSolar) {
    navSolar.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllDropdowns();
        navSolar.classList.add('active');
        if (navGlobe) navGlobe.classList.remove('active');
        if (window.SolarSystem) window.SolarSystem.zoomOutSolar();
    });
}

const siteLogo = document.getElementById('site-logo');
if (siteLogo) {
    siteLogo.addEventListener('click', (e) => {
        e.preventDefault();
        closeWonderOverlayIfActive();
        closeDeveloperModal();
        closeAllDropdowns();
        if (navSolar) navSolar.classList.add('active');
        if (navGlobe) navGlobe.classList.remove('active');
        if (window.SolarSystem) window.SolarSystem.zoomOutSolar();
    });
}

populatePlanetsDropdown();
// Initialize Navigation Dropdowns on load
populateWondersDropdown();
populateContinentsDropdown();
populateOceansDropdown();
renderCountryList();
renderHistoricalList();
renderRiversList();
renderForestsList();
renderMountainsList();
renderIslandsList();
renderOrganizationsList();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (organizationModal && !organizationModal.classList.contains('hidden')) {
            closeOrganizationModal();
        }
    }
});

// Wire up Interactive Globe Toolbar (Mark / Unmark Topic Layers)
if (toolbarBtns) {
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const layer = btn.dataset.layer;
            if (layer && typeof activeGlobeLayers[layer] !== 'undefined') {
                activeGlobeLayers[layer] = !activeGlobeLayers[layer];
                btn.classList.toggle('active', activeGlobeLayers[layer]);
                updateGlobeLayers();
            }
        });
    });
}

// Preload topic images for zero-lag transitions
function preloadTopicImages(topic) {
    if (!topic || !topic.images) return;
    topic.images.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}
const preloadWonderImages = preloadTopicImages;

// Dual-layer smooth crossfade background transition
function transitionToImage(newImgUrl, imgIdx) {
    if (currentImageIdx === imgIdx) return;
    currentImageIdx = imgIdx;

    const nextLayer = activeLayer === 1 ? bgLayer2 : bgLayer1;
    const currentLayer = activeLayer === 1 ? bgLayer1 : bgLayer2;

    // Load new image into next layer
    nextLayer.style.backgroundImage = `url("${newImgUrl}")`;

    // Crossfade: activate nextLayer, deactivate currentLayer
    nextLayer.classList.add('active');
    currentLayer.classList.remove('active');

    // Flip layer tracker
    activeLayer = activeLayer === 1 ? 2 : 1;

    // Update Tracker UI
    updateTrackerUI(imgIdx);
}

// Update Tracker Numbers, Progress Bar, and Active Dots
function updateTrackerUI(idx) {
    const formattedNum = String(idx + 1).padStart(2, '0');
    trackerCurrent.textContent = formattedNum;

    const total = (currentWonder && currentWonder.images) ? currentWonder.images.length : 10;
    const pct = ((idx + 1) / total) * 100;
    trackerFill.style.width = `${pct}%`;

    // Highlight tracker dot
    const dots = trackerNav.querySelectorAll('.tracker-dot');
    dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === idx);
    });

    // Highlight active chapter card
    const cards = chaptersWrapper.querySelectorAll('.chapter-card');
    cards.forEach((card, cIdx) => {
        card.classList.toggle('active-chapter', cIdx === idx);
    });
}

// Curated High-Definition Photography Fallbacks (10 Pure Landscapes/Architecture Per Category)
const categoryFallbackImages = {
    historical: [
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1920&q=80'
    ],
    river: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80'
    ],
    forest: [
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80'
    ],
    mountain: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1920&q=80'
    ],
    island: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1520637174865-7464a2cfef08?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80'
    ]
};

// Dynamic 10-Chapter Educational Narrative Generator for 4000 World Entities
function generateTopicChapters(topic, type) {
    const nameEn = (topic.name && topic.name.en) || 'This Location';
    const nameBn = (topic.name && topic.name.bn) || nameEn;
    const countryEn = (topic.country && (topic.country.en || topic.country)) || (topic.basin && (topic.basin.en || topic.basin)) || (topic.range && (topic.range.en || topic.range)) || 'Earth';
    const countryBn = (topic.country && (topic.country.bn || topic.country.en)) || (topic.basin && (topic.basin.bn || topic.basin.en)) || (topic.range && (topic.range.bn || topic.range.en)) || 'পৃথিবী';

    if (type === 'historical') {
        return [
            {
                num: '01',
                title: { en: 'Origins & Ancient Foundations', bn: 'উৎপত্তি ও প্রাচীন ভিত্তি' },
                fact: { en: `Established as a monumental testament in ${countryEn}`, bn: `${countryBn}-এ এক অমর ঐতিহাসিক স্মারক হিসেবে প্রতিষ্ঠিত` },
                text: {
                    en: `${nameEn} stands as an extraordinary historical monument in ${countryEn}. Its foundation dates back to eras of profound architectural ambition and civilizational ingenuity, reflecting the vibrant culture and craftsmanship of the builders who laid its initial stones.`,
                    bn: `${nameBn} ${countryBn}-এর বুকে এক অসাধারণ ঐতিহাসিক স্মারক। প্রাচীন সভ্যতা ও স্থাপত্যশৈলীর এক অনন্য নিদর্শন হিসেবে এই স্থানটি শতাব্দীর পর শতাব্দী ধরে মানব ইতিহাসের অবিচ্ছেদ্য সাক্ষী হয়ে দাঁড়িয়ে রয়েছে।`
                }
            },
            {
                num: '02',
                title: { en: 'Architectural Mastery & Design', bn: 'স্থাপত্যকলার অনন্য শ্রেষ্ঠত্ব' },
                fact: { en: 'Distinctive engineering and aesthetic proportion', bn: 'স্বতন্ত্র স্থাপত্যকলা ও নিপুণ অনুপাত' },
                text: {
                    en: `The architecture of ${nameEn} features intricate design elements, monumental geometry, and timeless craftsmanship. Builders utilized indigenous materials and specialized masonry techniques to achieve structural endurance.`,
                    bn: `${nameBn}-এর স্থাপত্যে ফুটে উঠেছে জ্যামিতিক নিখুঁত রূপ ও সূক্ষ্ম কারুকার্য। স্থানীয় সামগ্রী ও বিশেষ প্রকৌশল কৌশলের সমন্বয়ে এর কাঠামো শতাব্দীর পর শতাব্দী টিকে আছে।`
                }
            },
            {
                num: '03',
                title: { en: 'Dynasties & Imperial Eras', bn: 'রাজবংশ ও ঐতিহাসিক যুগ' },
                fact: { en: `Shaped by sovereign rulers across generations in ${countryEn}`, bn: `${countryBn}-এর বহু শতাব্দীর শাসক ও ঐতিহাসিক যুগ` },
                text: {
                    en: `Throughout its long existence, ${nameEn} bore witness to the rise and fall of great dynasties and political upheavals. Each successive era left indelible marks upon its courtyards, walls, and surrounding communities.`,
                    bn: `তার সুদীর্ঘ ইতিহাসে ${nameBn} বহু রাজবংশের উত্থান-পতন ও ঐতিহাসিক পরিবর্তনের প্রত্যক্ষদর্শী। প্রতিটি ঐতিহাসিক যুগের স্বতন্ত্র ছাপ এখনও এর দেওয়াল ও প্রাঙ্গণে দৃশ্যমান।`
                }
            },
            {
                num: '04',
                title: { en: 'Cultural & Spiritual Significance', bn: 'সাংস্কৃতিক ও আত্মিক তাৎপর্য' },
                fact: { en: 'A revered focal point of heritage and collective memory', bn: 'ঐতিহ্য ও সম্মিলিত স্মৃতির এক পবিত্র মিলনমেলা' },
                text: {
                    en: `Beyond its stone walls, ${nameEn} has inspired countless poets, scholars, and travelers throughout history. It embodies spiritual and philosophical values cherished deeply across ${countryEn} and the wider region.`,
                    bn: `পাথুরে কাঠামোর বাইরে ${nameBn} বহু কবি, পণ্ডিত ও পর্যটকের অনুপ্রেরণার উৎস। এটি ${countryBn} এবং সংলগ্ন অঞ্চলের আধ্যাত্মিক ও সাংস্কৃতিক চেতনার অন্যতম প্রতীক।`
                }
            },
            {
                num: '05',
                title: { en: 'Engineering Secrets & Defense', bn: 'প্রকৌশল রহস্য ও সুরক্ষা ব্যবস্থা' },
                fact: { en: 'Innovative defensive layout and acoustic mastery', bn: 'অভিনব প্রতিরক্ষা পরিকাঠামো ও শব্দবিজ্ঞানের কারিশমা' },
                text: {
                    en: `Engineers of ${nameEn} mastered hydraulic channels, defensive ramparts, and natural climate buffering. The intricate spatial layouts provided both majestic ceremonial spaces and resilient fortifications.`,
                    bn: `${nameBn}-এর নির্মাতারা জলপ্রবাহ নিয়ন্ত্রণ, প্রতিরক্ষা প্রাচীর এবং প্রাকৃতিক জলবায়ু সুরক্ষার ক্ষেত্রে অসাধারণ দক্ষতার পরিচয় দিয়েছিলেন।`
                }
            },
            {
                num: '06',
                title: { en: 'Myths, Legends & Folk Narratives', bn: 'পৌরাণিক উপাখ্যান ও লোকগাথা' },
                fact: { en: 'Timeless folk songs and legendary chronicles', bn: 'প্রজন্ম থেকে প্রজন্মে ছড়িয়ে থাকা কালজয়ী লোককাহিনী' },
                text: {
                    en: `Local traditions envelop ${nameEn} in tales of heroism, mystery, and romantic lore. These captivating oral histories have been passed down from generation to generation, enriching its historical aura.`,
                    bn: `${nameBn}-কে ঘিরে স্থানীয় সমাজে নানা বীরত্বগাথা, রহস্য ও লোককথা প্রচলিত রয়েছে। মুখে মুখে প্রচলিত এই উপাখ্যানগুলো এর ঐতিহাসিক গাম্ভীর্যকে আরও রহস্যময় করে তোলে।`
                }
            },
            {
                num: '07',
                title: { en: 'Archaeological Excavations', bn: 'প্রত্নতাত্ত্বিক গবেষণা ও আবিষ্কার' },
                fact: { en: 'Uncovering subterranean chambers and ancient relics', bn: 'ভূগর্ভস্থ প্রকোষ্ঠ ও প্রাচীন পুরাকীর্তির সন্ধান' },
                text: {
                    en: `Modern excavations at ${nameEn} continue to reveal forgotten chambers, carved inscriptions, and artifacts. These discoveries yield crucial insights into ancient trade routes and daily civic life.`,
                    bn: `আধুনিক প্রত্নতাত্ত্বিক খননকাজের মাধ্যমে ${nameBn}-এর লুকায়িত প্রকোষ্ঠ, প্রাচীন শিলালিপি ও শিল্পকর্ম আবিষ্কৃত হয়েছে, যা সমকালীন সমাজ ও বাণিজ্যের নতুন দিগন্ত উন্মোচন করে।`
                }
            },
            {
                num: '08',
                title: { en: 'World Heritage & Universal Value', bn: 'বিশ্ব ঐতিহ্য ও আন্তর্জাতিক স্বীকৃতি' },
                fact: { en: 'Protected global treasure of outstanding universal value', bn: 'অসামান্য সর্বজনীন মূল্যের বিশ্ব ঐতিহ্যবাহী স্থান' },
                text: {
                    en: `Recognized for its irreplaceable cultural significance, ${nameEn} represents a crowning achievement of human civilization. Conservationists work continuously to safeguard its fragile structures for future generations.`,
                    bn: `অপূরণীয় সাংস্কৃতিক তাৎপর্যের স্বীকৃতিস্বরূপ ${nameBn} মানব সভ্যতার এক অতুলনীয় অর্জন। ভবিষ্যৎ প্রজন্মের জন্য এই ঐতিহ্য রক্ষায় অবিরাম সংরক্ষণ কাজ চলছে।`
                }
            },
            {
                num: '09',
                title: { en: 'Global Tourism & Exploration', bn: 'বিশ্ব পর্যটন ও বিশ্বভ্রমণ' },
                fact: { en: 'Welcoming explorers and travelers from every continent', bn: 'প্রতি বছর বিশ্বজুড়ে পর্যটক ও গবেষকদের প্রধান আকর্ষণ' },
                text: {
                    en: `Every year, thousands of history enthusiasts and pilgrims travel across continents to experience the grandeur of ${nameEn}. Walking through its gates offers an unforgettable journey into antiquity.`,
                    bn: `প্রতিবছর হাজার হাজার পরিব্রাজক ও ভ্রমণপিপাসু মানুষ ${nameBn}-এর মহিমা স্বচক্ষে দেখতে আসেন। এর সিংহদ্বার দিয়ে প্রবেশ করা যেন ইতিহাসের জীবন্ত পাতায় পদার্পণ করা।`
                }
            },
            {
                num: '10',
                title: { en: 'Enduring Legacy for Humanity', bn: 'মানবজাতির জন্য চিরন্তন উত্তরাধিকার' },
                fact: { en: 'An immortal beacon of human achievement and heritage', bn: 'মানবজাতির সৃজনশীলতা ও ইতিহাসের চিরন্তন বাতিঘর' },
                text: {
                    en: `${nameEn} continues to inspire wonder, reminding humanity of our collective artistic potential and shared historical journey across the tapestry of time.`,
                    bn: `${nameBn} মানবজাতির সৃজনশীল মেধা ও সাংস্কৃতিক ঐক্যের এক চিরন্তন স্মারক। সময়ের বিবর্তনেও এর দীপ্তি মানবসমাজকে চিরকাল উদ্বুদ্ধ করে যাবে।`
                }
            }
        ];
    } else if (type === 'river') {
        return [
            {
                num: '01',
                title: { en: 'Origins & Headwaters', bn: 'উৎস ও পার্বত্য জলপ্রবাহ' },
                fact: { en: `Originating in the highlands of ${countryEn}`, bn: `${countryBn}-এর উচ্চভূমি ও পর্বতমালা থেকে সৃষ্ট` },
                text: {
                    en: `${nameEn} begins its epic journey as glacial melt or mountain springs in ${countryEn}. From crisp alpine torrents, it cascades downward, gathering volume and momentum to form a mighty riverine system.`,
                    bn: `${nameBn} ${countryBn}-এর পাহাড়ি হিমবাহ বা পার্বত্য ঝর্ণাধারা থেকে এর যাত্রা শুরু করে। ছোট ছোট ধারা একত্রিত হয়ে সৃষ্টি করে এক সুবিশাল ও খরস্রোতা জলপথ।`
                }
            },
            {
                num: '02',
                title: { en: 'Basin Topography & Tributaries', bn: 'অববাহিকা ও উপনদী পরিকাঠামো' },
                fact: { en: 'Draining vast landscapes and fertile floodplains', bn: 'বিশাল ভূখণ্ড ও উর্বর প্লাবনভূমি জুড়ে বিস্তৃত' },
                text: {
                    en: `The extensive catchment area of ${nameEn} branches across varied geographical terrain. Dozens of tributaries feed into its mainstream, sculpting valleys, gorges, and fertile river plains.`,
                    bn: `${nameBn}-এর বিস্তীর্ণ অববাহিকা বহু বৈচিত্র্যময় ভূখণ্ডজুড়ে বিস্তৃত। অসংখ্য উপনদী ও শাখা নদী এতে মিলিত হয়ে গভীর উপত্যকা ও পলিগঠিত উর্বর সমভূমি তৈরি করেছে।`
                }
            },
            {
                num: '03',
                title: { en: 'Hydrology & Seasonal Rhythms', bn: 'জলতত্ত্ব ও ঋতুভিত্তিক প্রবাহ' },
                fact: { en: 'Dynamic seasonal currents and alluvial sediment transport', bn: 'গতিশীল ঋতুকালীন স্রোতধারা ও বিপুল পলিমাটি পরিবহন' },
                text: {
                    en: `Seasonal rainfall and monsoon cycles dictate the dynamic volume of ${nameEn}. As currents pulse through seasons, the river carries nutrient-rich silt that nourishes agriculture for hundreds of miles.`,
                    bn: `মৌসুমি বৃষ্টিপাত ও ঋতুচক্র ${nameBn}-এর পানির স্তর ও স্রোতের তীব্রতা নির্ধারণ করে। নদীটির বয়ে আনা উর্বর পলিমাটি শত শত মাইল জুড়ে কৃষিকাজকে সমৃদ্ধ করে।`
                }
            },
            {
                num: '04',
                title: { en: 'Riparian Ecosystems & Flora', bn: 'তীরবর্তী বনভূমি ও উদ্ভিদ বৈচিত্র্য' },
                fact: { en: 'Verdant riverbanks supporting diverse plant biomes', bn: 'নদী অববাহিকায় গড়ে ওঠা সবুজ অরণ্য ও উদ্ভিদকূল' },
                text: {
                    en: `The banks of ${nameEn} sustain dense riparian vegetation, wetlands, and reed beds. These lush green corridors filter freshwater and protect the shoreline from erosion.`,
                    bn: `${nameBn}-এর তীরজুড়ে গড়ে উঠেছে সমৃদ্ধ জলজ বন, জলাভূমি ও নলখাগড়ার বন। এই সবুজ অঞ্চল নদীর পাড় রক্ষা এবং পানি পরিশোধনে প্রাকৃতিক ঢাল হিসেবে কাজ করে।`
                }
            },
            {
                num: '05',
                title: { en: 'Aquatic Life & Biodiversity', bn: 'জলজ প্রাণিবৈচিত্র্য ও বাস্তুতন্ত্র' },
                fact: { en: 'Habitat for native fish, river dolphins, and migratory birds', bn: 'স্থানীয় মাছ, জলজ স্তন্যপায়ী ও পরিযায়ী পাখির নিরাপদ আশ্রয়' },
                text: {
                    en: `${nameEn} provides a vital habitat for indigenous fish species, freshwater mammals, and diverse aquatic organisms. Flocks of migratory waterfowl rely on its sandbars and shallows during seasonal journeys.`,
                    bn: `${nameBn} বহু প্রজাতির মাছ, জলজ প্রাণী ও পাখির নিরাপদ আবাসস্থল। শীতকালে এবং পরিযানের সময় নদীটির বালুচরগুলো দেশি-বিদেশি পাখির কলকাকলিতে মুখরিত থাকে।`
                }
            },
            {
                num: '06',
                title: { en: 'Cradle of Civilizations', bn: 'মানব সভ্যতার সূতিকাগার' },
                fact: { en: `Centuries of urban settlements along ${nameEn}`, bn: `${nameBn}-এর তীরে শতাব্দীপ্রাচীন মানব বসতি ও শহর` },
                text: {
                    en: `Human settlements have flourished along ${nameEn} for millennia. Ancient trading towns, vibrant ports, and cultural hubs drew their water, sustenance, and trade routes directly from its currents.`,
                    bn: `হাজার বছর ধরে ${nameBn}-এর দুই তীর ঘেঁষে গড়ে উঠেছে প্রাচীন সভ্যতা ও সমৃদ্ধ বাণিজ্যনগরী। নদীটির জল ও যোগাযোগ ব্যবস্থার উপর ভর করেই এখানে মানব বসতির বিকাশ ঘটেছিল।`
                }
            },
            {
                num: '07',
                title: { en: 'Navigation, Trade & Bridges', bn: 'নৌ-যোগাযোগ, বাণিজ্য ও সেতু' },
                fact: { en: 'A bustling lifeline for cargo transport and passenger travel', bn: 'পণ্য ও যাত্রী পরিবহনের প্রধান নৌপথ ও ঐতিহাসিক সংযোগ' },
                text: {
                    en: `From traditional riverboats to modern cargo barges, ${nameEn} serves as an economic highway. Iconic bridges and ferries connect communities across its surging waters.`,
                    bn: `চিরাচরিত পালতোলা নৌকা থেকে আধুনিক মালবাহী জাহাজ—${nameBn} একটি অত্যন্ত গুরুত্বপূর্ণ নৌপথ। নদীটির ওপর নির্মিত সেতু ও ফেরিঘাটগুলো দুই পাড়ের মানুষের জীবনযাত্রাকে সংযুক্ত করেছে।`
                }
            },
            {
                num: '08',
                title: { en: 'Estuaries, Deltas & Ocean Outflow', bn: 'মোহনা, বদ্বীপ ও সাগরে মিলন' },
                fact: { en: 'Discharging millions of cubic meters into the sea', bn: 'সাগরে প্রবেশের মুখে বিশাল বদ্বীপ ও মোহনার সৃষ্টি' },
                text: {
                    en: `Reaching its terminus, ${nameEn} fans out into intricate distributaries, mangrove lagoons, and delta wetlands before merging gracefully into the ocean, completing Earth's hydrologic cycle.`,
                    bn: `যাত্রার শেষপ্রান্তে পৌঁছে ${nameBn} শাখা-প্রশাখায় বিভক্ত হয়ে বিশাল বদ্বীপ ও মোহনা গঠন করে অবশেষে সাগরে বিলীন হয়, যা পৃথিবীর অনন্ত জলচক্রের এক অপূর্ব নিদর্শন।`
                }
            },
            {
                num: '09',
                title: { en: 'Environmental Conservation', bn: 'পরিবেশগত সংরক্ষণ ও সচেতনতা' },
                fact: { en: 'Preserving water quality and ecological balance', bn: 'নদীর পানির বিশুদ্ধতা ও জীববৈচিত্র্য রক্ষার সংগ্রাম' },
                text: {
                    en: `Environmental organizations and local communities are actively working to restore the ecological vitality of ${nameEn}. Watershed management ensures clean water and healthy floodplains.`,
                    bn: `${nameBn}-এর পানি ও বাস্তুতন্ত্র সংরক্ষণে পরিবেশবিদ ও স্থানীয় প্রশাসন সম্মিলিতভাবে কাজ করে যাচ্ছে। দূষণ রোধ ও নদী খননের মাধ্যমে নদীটির স্বাভাবিক গতি ধরে রাখার প্রচেষ্টা চলছে।`
                }
            },
            {
                num: '10',
                title: { en: 'The Eternal River', bn: 'চিরন্তন নদী ও ভবিষ্যৎ' },
                fact: { en: 'A sacred and enduring pulse of natural majesty', bn: 'প্রকৃতির এক চিরন্তন ও প্রাণবন্ত রক্তপ্রবাহ' },
                text: {
                    en: `As long as rain falls and mountains stand, ${nameEn} will continue flowing—a timeless symbol of renewal, life, and the unstoppable momentum of nature.`,
                    bn: `যতদিন পর্বত থাকবে এবং বৃষ্টি ঝরবে, ততদিন ${nameBn} বয়ে চলবে—প্রকৃতির চিরন্তন প্রবাহ, নবজাগরণ এবং জীবনের এক অবিরাম অনুপ্রেরণা হিসেবে।`
                }
            }
        ];
    } else if (type === 'forest') {
        return [
            {
                num: '01',
                title: { en: 'Primeval Wilderness & Origins', bn: 'আদিম অরণ্য ও উৎপত্তি' },
                fact: { en: `Ancient canopy thriving in ${countryEn}`, bn: `${countryBn}-এর বুকে এক বিস্তীর্ণ ও প্রাচীন বনভূমি` },
                text: {
                    en: `${nameEn} represents one of the most magnificent woodland wildernesses in ${countryEn}. Formed over millions of years of ecological evolution, this forest preserves irreplaceable biomes and undisturbed forest floors.`,
                    bn: `${nameBn} ${countryBn}-এর এক অনন্য ও আদিম বনভূমি। লক্ষ লক্ষ বছরের প্রাকৃতিক বিবর্তনে গড়ে ওঠা এই অরণ্য পৃথিবীর অতি মূল্যবান বাস্তুতন্ত্রকে পরম যত্নে ধারণ করে রেখেছে।`
                }
            },
            {
                num: '02',
                title: { en: 'Canopy Architecture & Microclimates', bn: 'বৃক্ষবিতান ও অরণ্যের জলবায়ু' },
                fact: { en: 'Multilayered tree canopy trapping humidity and mist', bn: 'বহুস্তরবিশিষ্ট চিরসবুজ শামিয়ানা ও কুয়াশাচ্ছন্ন পরিবেশ' },
                text: {
                    en: `The towering trees of ${nameEn} create a dense upper canopy that filters sunlight and maintains a humid microclimate below. Epiphytes, mosses, and ferns flourish along its ancient branches.`,
                    bn: `${nameBn}-এর বিশালাকার বৃক্ষরাজি সূর্যের আলো আটকে দিয়ে নিচে এক আর্দ্র ও শান্ত পরিবেশ তৈরি করে। গাছের ডালে ডালে পরজীবী অর্কিড ও ফার্নের সমাহার একে আরও মনোরম করে তোলে।`
                }
            },
            {
                num: '03',
                title: { en: 'Tree Species & Botanical Diversity', bn: 'বৃক্ষ প্রজাতি ও উদ্ভিদ বৈচিত্র্য' },
                fact: { en: 'Home to hundreds of indigenous and rare plant species', bn: 'শত শত দুর্লভ উদ্ভিদ ও প্রাচীন ঔষধি গাছের ভাণ্ডার' },
                text: {
                    en: `From towering hardwood giants to medicinal herbs, the botanical diversity of ${nameEn} is staggering. Botanists have cataloged unique flowering plants found nowhere else in the world.`,
                    bn: `${nameBn}-এ রয়েছে শতবর্ষী বৃক্ষ থেকে শুরু করে নানা দুর্লভ ভেষজ উদ্ভিদ। এখানকার অনেক প্রজাতির উদ্ভিদ কেবল এই অরণ্যের বিশেষ প্রাকৃতিক পরিবেশেই বেঁচে থাকতে পারে।`
                }
            },
            {
                num: '04',
                title: { en: 'Sanctuary for Wildlife & Fauna', bn: 'বন্যপ্রাণী ও জীববৈচিত্র্যের অভয়ারণ্য' },
                fact: { en: 'Thriving predator-prey dynamics and bird colonies', bn: 'বিচিত্র স্তন্যপায়ী, দুর্লভ সরীসৃপ ও পাখির নিরাপদ নিবাস' },
                text: {
                    en: `Under the green sheltering boughs of ${nameEn} roam iconic mammals, elusive wildcats, primates, and countless species of colorful songbirds and reptiles.`,
                    bn: `${nameBn}-এর ছায়াঘেরা গহীনে বাস করে বহু প্রজাতির বন্যপ্রাণী, পাখি এবং পতঙ্গ। এটি বহু বিপন্ন প্রাণীর নিরাপদ প্রজনন ক্ষেত্র হিসেবে অত্যন্ত গুরুত্বপূর্ণ।`
                }
            },
            {
                num: '05',
                title: { en: 'The Lungs of the Biosphere', bn: 'পৃথিবীর প্রাকৃতিক ফুসফুস' },
                fact: { en: 'Massive oxygen generation and carbon sequestration', bn: 'বিপুল অক্সিজেন উৎপাদন ও কার্বন শোষণের প্রাকৃতিক কারখানা' },
                text: {
                    en: `As a vital terrestrial carbon sink, ${nameEn} absorbs millions of tons of atmospheric carbon dioxide annually, generating crisp, clean oxygen and regulating regional weather patterns.`,
                    bn: `প্রাকৃতিক কার্বন শোষক হিসেবে ${nameBn} প্রতিবছর বিপুল পরিমাণ কার্বন ডাই-অক্সাইড শোষণ করে নির্মল অক্সিজেন ছড়ায় এবং বৈশ্বিক জলবায়ুর ভারসাম্য বজায় রাখে।`
                }
            },
            {
                num: '06',
                title: { en: 'Indigenous Peoples & Forest Lore', bn: 'আদিবাসী সম্প্রদায় ও অরণ্য সংস্কৃতি' },
                fact: { en: 'Centuries of harmonious coexistence with nature', bn: 'প্রকৃতির সাথে আদিবাসীদের গভীর আধ্যাত্মিক সংযোগ' },
                text: {
                    en: `For generations, indigenous communities have lived in sacred harmony with ${nameEn}. Their traditional ecological knowledge of medicinal flora and wildlife tracking is invaluable.`,
                    bn: `প্রজন্মের পর প্রজন্ম ধরে স্থানীয় আদিবাসী সম্প্রদায়গুলো ${nameBn}-এর সঙ্গে একাত্ম হয়ে বসবাস করছে। অরণ্য সংরক্ষণে তাদের ঐতিহ্যবাহী জ্ঞান ও লোকসংস্কৃতি অত্যন্ত তাৎপর্যপূর্ণ।`
                }
            },
            {
                num: '07',
                title: { en: 'Forest Streams & Watershed Protection', bn: 'বনভূমির ঝর্ণা ও জলধারা' },
                fact: { en: 'Natural sponge purifying freshwater for millions', bn: 'প্রাকৃতিক স্পঞ্জ হিসেবে বিশুদ্ধ পানির অবিরাম সরবরাহ' },
                text: {
                    en: `The root systems of ${nameEn} act as a giant natural sponge, capturing torrential rain, preventing landslides, and releasing pristine water into crystal-clear forest streams.`,
                    bn: `${nameBn}-এর শিকড় মাটিকে শক্ত করে ধরে রাখে এবং বৃষ্টির পানি ধরে রেখে স্বচ্ছ ঝর্ণাধারা ও নদীরূপে ধীরে ধীরে প্রবাহিত করে, যা ভূগর্ভস্থ পানি রিচার্জে সাহায্য করে।`
                }
            },
            {
                num: '08',
                title: { en: 'Mysteries of the Forest Floor', bn: 'বনতলের মাটির রহস্যময় জীবন' },
                fact: { en: 'Mycelial networks and vibrant fungal kingdoms', bn: 'ছত্রাক ও অণুজীবের তৈরি বিস্ময়কর যোগাযোগ নেটওয়ার্ক' },
                text: {
                    en: `Beneath the fallen leaves of ${nameEn} lies an intricate fungal mycelium network known as the subterranean web of life, connecting trees and recycling nutrients continuously.`,
                    bn: `${nameBn}-এর মাটির নিচে রয়েছে মাইসেলিয়াম ও ছত্রাকের এক অদৃশ্য জাল, যার মাধ্যমে বৃক্ষরাজি একে অপরের সাথে পুষ্টি উপাদান আদান-প্রদান করে।`
                }
            },
            {
                num: '09',
                title: { en: 'Threats & Forest Conservation', bn: 'সংরক্ষণ উদ্যোগ ও পরিবেশগত সুরক্ষা' },
                fact: { en: 'Ranger patrols and rewilding initiatives', bn: 'বন উজাড় রোধ ও জীববৈচিত্র্য সংরক্ষণে কঠোর নজরদারি' },
                text: {
                    en: `Dedicated forest rangers and international ecological programs work round the clock to protect ${nameEn} from illegal logging and climate stress, expanding protected wildlife reserves.`,
                    bn: `${nameBn}-কে অবৈধ বন উজাড় ও মানব আগ্রাসন থেকে বাঁচাতে বন বিভাগ ও আন্তর্জাতিক প্রকৃতি সংরক্ষণ সংস্থাগুলো কঠোর নজরদারি ও বৃক্ষরোপণ কর্মসূচি পরিচালনা করছে।`
                }
            },
            {
                num: '10',
                title: { en: 'The Eternal Forest', bn: 'চিরসবুজ অরণ্যের অমর আহ্বান' },
                fact: { en: 'A living cathedral of pure green majesty', bn: 'সবুজের এক অনন্ত জীবন্ত মহাকাব্য' },
                text: {
                    en: `${nameEn} stands as an enduring monument to life on Earth. Walking beneath its grand canopy inspires humility and deep reverence for the sacred natural balance of our planet.`,
                    bn: `${nameBn} পৃথিবীর বুকে জীবনের এক অনুপম সবুজ তীর্থস্থান। এর নিস্তব্ধ ছায়াঘেরা অরণ্যপথ মানবজাতিকে প্রকৃতির প্রতি শ্রদ্ধাশীল হওয়ার শিক্ষা দেয়।`
                }
            }
        ];
    } else if (type === 'mountain') {
        const elev = topic.elevation ? `${topic.elevation}m` : 'Alpine Peak';
        return [
            {
                num: '01',
                title: { en: 'Geological Genesis & Tectonic Rise', bn: 'ভূতাত্ত্বিক উৎপত্তি ও টেকটোনিক উত্থান' },
                fact: { en: `Soaring to ${elev} in ${countryEn}`, bn: `${countryBn}-এ সমুদ্রপৃষ্ঠ থেকে প্রায় ${elev} উচ্চতায় অবস্থিত` },
                text: {
                    en: `${nameEn} was forged through titanic tectonic forces over millions of years. As continental plates collided, layers of bedrock buckled upward, forming this colossal pinnacle in ${countryEn}.`,
                    bn: `${nameBn} লক্ষ লক্ষ বছর ধরে টেকটোনিক প্লেটের প্রচণ্ড সংঘর্ষে মাটি ফুঁড়ে ওঠা এক বিশালাকার পর্বত। ${countryBn}-এর বুকে এটি ভূতাত্ত্বিক শক্তির এক পরম নিদর্শন।`
                }
            },
            {
                num: '02',
                title: { en: 'Summit Profile & Ridge Architecture', bn: 'শৃঙ্গের অবয়ব ও শৈলশিরার গঠন' },
                fact: { en: `Towering summit standing proud at ${elev}`, bn: `${elev} উচ্চতার তীক্ষ্ণ শৈলশিরা ও আকাশচুম্বী চূড়া` },
                text: {
                    en: `The profile of ${nameEn} is defined by razor-sharp ridges, precipitous sheer cliffs, and jagged horn formations carved by glacial ice and wind erosion over geological epochs.`,
                    bn: `${nameBn}-এর চূড়াটি তীক্ষ্ণ শৈলশিরা, খাড়া খাদ এবং শতাব্দীর হিমবাহ ও ঝড়ের ঘর্ষণে খোদাই হওয়া পাথুরে দেয়াল দ্বারা গঠিত, যা দেখতে অত্যন্ত দৃষ্টিনন্দন ও রোমাঞ্চকর।`
                }
            },
            {
                num: '03',
                title: { en: 'Glaciers, Icefalls & Snowpack', bn: 'হিমবাহ, বরফপ্রপাত ও চিরতুষার' },
                fact: { en: 'Perennial ice sheets feeding mountain streams', bn: 'চিরস্থায়ী তুষারপাত ও নদী সৃষ্টিকারী সুবিশাল হিমবাহ' },
                text: {
                    en: `The upper slopes of ${nameEn} are cloaked in eternal snow and glaciers. Crevasses and seracs shift slowly across the ice, carving deep cirques into the mountain flanks.`,
                    bn: `${nameBn}-এর উপরিভাগ চিরতুষারাবৃত। এর ঢালে জমে থাকা প্রাচীন হিমবাহগুলো ধীরে ধীরে সঞ্চালিত হয়ে তৈরি করেছে গভীর বরফের উপত্যকা ও তুষার ফাটল।`
                }
            },
            {
                num: '04',
                title: { en: 'Alpine Climates & Extreme Weather', bn: 'আলপাইন আবহাওয়া ও চরম জলবায়ু' },
                fact: { en: 'Sub-zero temperatures and high-altitude winds', bn: 'হিমাঙ্কের নিচের তাপমাত্রা ও প্রচণ্ড ঝড়ো বাতাস' },
                text: {
                    en: `Weather on ${nameEn} changes in minutes. Gale-force jet stream winds, blinding blizzards, and thin atmospheric air create one of the most demanding environments on Earth.`,
                    bn: `${nameBn}-এর আবহাওয়া অত্যন্ত দ্রুত পরিবর্তিত হয়। বরফশীতল ঝড়, তুষারপাত ও অক্সিজেনের স্বল্পতা এখানকার পরিবেশকে অত্যন্ত দুর্গম ও চ্যালেঞ্জিং করে তুলেছে।`
                }
            },
            {
                num: '05',
                title: { en: 'High-Altitude Ecology & Flora', bn: 'উচ্চভূমির বাস্তুতন্ত্র ও উদ্ভিদকূল' },
                fact: { en: 'Hardy alpine meadows and specialized rock mosses', bn: 'পাথরের খাঁজে জন্মানো বিরল আলপাইন গুল্ম ও শ্যাওলা' },
                text: {
                    en: `Despite the harsh conditions, life clings tenaciously to the lower slopes of ${nameEn}. Alpine wildflowers, stunted dwarf willows, and lichens blanket the rocky scree during summer months.`,
                    bn: `প্রতিকূল পরিবেশ সত্ত্বেও ${nameBn}-এর মধ্যম ও নিম্নাংশে আলপাইন ঘাস, বনফুল ও লাইকেন জন্মায়, যা গ্রীষ্মকালে পাহাড়ের রুক্ষ পাথুরে রূপকে রঙিন করে তোলে।`
                }
            },
            {
                num: '06',
                title: { en: 'Legendary Ascents & Mountaineering', bn: 'পর্বতারোহণের ইতিহাস ও দুঃসাহসিক অভিযান' },
                fact: { en: 'Challenging routes conquered by pioneering climbers', bn: 'বিশ্বসেরা পর্বতারোহীদের স্বপ্ন ও অসম সাহসের পরীক্ষা' },
                text: {
                    en: `Mountaineers from around the globe revere ${nameEn} as an ultimate test of endurance and skill. Its perilous ascents require meticulous technical mastery and unwavering bravery.`,
                    bn: `বিশ্বের সেরা পর্বতারোহীদের কাছে ${nameBn} জয় করা পরম স্বপ্নের মতো। এর দুর্গম পথ, খাড়া বরফের দেয়াল এবং বিপদসংকুল আবহাওয়া অতিক্রম করতে প্রয়োজন অসীম সাহস ও দক্ষতা।`
                }
            },
            {
                num: '07',
                title: { en: 'Sacred Summits & Mythological Lore', bn: 'পবিত্র পর্বত ও লোকবিশ্বাস' },
                fact: { en: 'Revered as a divine dwelling by surrounding cultures', bn: 'স্থানীয় জনগোষ্ঠীর কাছে দেবালয় ও শ্রদ্ধার প্রতীক' },
                text: {
                    en: `To the communities living in the shadow of ${nameEn}, the peak is more than rock and ice; it is a sacred abode of gods, featured in timeless legends and ancient folklore.`,
                    bn: `${nameBn}-এর পাদদেশে বসবাসকারী মানুষের কাছে এই পর্বত কেবল পাথর আর বরফের স্তূপ নয়, বরং এক পবিত্র দেবভূমি ও আধ্যাত্মিক শান্তির প্রতীক।`
                }
            },
            {
                num: '08',
                title: { en: 'Mountain Passes & Valleys', bn: 'গিরিপথ ও নৈসর্গিক উপত্যকা' },
                fact: { en: 'Ancient trading routes carving through the high peaks', bn: 'প্রাচীন বাণিজ্য পথ ও শান্ত পাহাড়ি উপত্যকা' },
                text: {
                    en: `Surrounding the main peak of ${nameEn} are dramatic cols, high-altitude passes, and emerald valleys where mountain rivers rush forth toward the lowlands.`,
                    bn: `${nameBn}-এর কোল ঘেঁষে রয়েছে ঐতিহাসিক গিরিপথ ও সবুজ উপত্যকা, যার মধ্য দিয়ে প্রাচীন যুগে যাযাবর দল ও বণিক কাফেলা চলাচল করত।`
                }
            },
            {
                num: '09',
                title: { en: 'Climate Barometers & Glacier Health', bn: 'জলবায়ু পরিবর্তন ও হিমবাহের স্বাস্থ্য' },
                fact: { en: 'Sentinels of global temperature shifts', bn: 'বৈশ্বিক উষ্ণায়ন ও পরিবেশ পরিবর্তনের প্রধান নির্দেশক' },
                text: {
                    en: `Glaciologists study the ice layers of ${nameEn} to monitor global climatic changes. Protecting its high-altitude water reserves is critical for millions of people living downstream.`,
                    bn: `বিজ্ঞানীরা ${nameBn}-এর বরফের স্তর পর্যবেক্ষণ করে বৈশ্বিক জলবায়ু পরিবর্তনের গতিপ্রকৃতি বিশ্লেষণ করেন। এর বরফগলা পানি নিম্নাঞ্চলের কোটি কোটি মানুষের পানীয় জলের প্রধান উৎস।`
                }
            },
            {
                num: '10',
                title: { en: 'The Crown of the Earth', bn: 'পৃথিবীর চিরন্তন মুকুট' },
                fact: { en: 'An eternal silhouette piercing the heavens', bn: 'আকাশের বুকে মাথা উঁচু করে দাঁড়িয়ে থাকা চিরন্তন শীর্ষ' },
                text: {
                    en: `${nameEn} stands immortal against the sky. Its snow-crowned summit serves as a timeless reminder of the wild grandeur and majestic power of our natural world.`,
                    bn: `${nameBn} আকাশের সীমানায় মহিমান্বিতভাবে দণ্ডায়মান। এটি পৃথিবীর চিরন্তন শৌর্য, প্রকৃতির আদিম ক্ষমতা ও মানব চেতনার অদম্য আকাঙ্খার এক অনন্য প্রতীক।`
                }
            }
        ];
    } else if (type === 'island') {
        const oceanEn = (topic.ocean && (topic.ocean.en || topic.ocean)) || 'World Ocean';
        const oceanBn = (topic.ocean && (topic.ocean.bn || topic.ocean.en)) || 'মহাসাগরীয় অঞ্চল';
        const areaStr = topic.area || 'Isolated Landmass';
        return [
            {
                num: '01',
                title: { en: 'Geographic Formation & Ocean Setting', bn: 'ভৌগোলিক অবস্থান ও মহাসাগরীয় পরিবেশ' },
                fact: { en: `Located in the waters of ${oceanEn} (${areaStr})`, bn: `${oceanBn}-এর বুকে অবস্থিত (${areaStr})` },
                text: {
                    en: `${nameEn} rises as a breathtaking terrestrial sanctuary in ${oceanEn}. Surrounded by pristine sea waters and ocean breezes, it encompasses ${areaStr} of distinct coastal landscapes and geological formations.`,
                    bn: `${nameBn} ${oceanBn}-এর সুবিশাল জলরাশির বুকে অবস্থিত এক নয়নাভিরাম দ্বীপ। চারপাশের উন্মুক্ত সাগর ও মৃদু সামুদ্রিক বাতাসের মাঝে এটি প্রায় ${areaStr} এলাকা জুড়ে বিস্তৃত।`
                }
            },
            {
                num: '02',
                title: { en: 'Coastlines, Lagoons & Beaches', bn: 'উপকূলরেখা, উপহ্রদ ও সৈকত' },
                fact: { en: 'Powder-white sand beaches and turquoise lagoons', bn: 'ধবধবে সাদা বালুকাময় সৈকত ও ফিরোজা রঙের উপহ্রদ' },
                text: {
                    en: `The shores of ${nameEn} feature picturesque crescent bays, hidden sea caves, and crystal-clear turquoise waters. Tidal rhythms gently sculpt its fine sands, creating serene coastal retreats.`,
                    bn: `${nameBn}-এর উপকূলজুড়ে ছড়িয়ে রয়েছে মনোরম অর্ধচন্দ্রাকার খাঁড়ি, সাগরের গুহা এবং স্ফটিক-স্বচ্ছ নীল জল। জোয়ার-ভাটার ছন্দ এখানকার বালুকাবেলাকে প্রতিনিয়ত নতুন রূপ দেয়।`
                }
            },
            {
                num: '03',
                title: { en: 'Marine Ecosystems & Coral Reefs', bn: 'সামুদ্রিক বাস্তুতন্ত্র ও প্রবাল প্রাচীর' },
                fact: { en: 'Teeming with vibrant coral gardens and pelagic fish', bn: 'রঙিন প্রবাল বাগান ও বিচিত্র সামুদ্রিক মাছের অভয়ারণ্য' },
                text: {
                    en: `Fringing reefs and underwater atolls encircling ${nameEn} provide a thriving habitat for clownfish, manta rays, sea turtles, and kaleidoscopic coral formations.`,
                    bn: `${nameBn}-কে ঘিরে থাকা প্রবাল প্রাচীর ও সাগরের তলদেশের রিফগুলো সামুদ্রিক কচ্ছপ, রঙিন মাছ ও বিরল জলজ প্রাণীর নিরাপদ আশ্রয় ও প্রজননক্ষেত্র।`
                }
            },
            {
                num: '04',
                title: { en: 'Endemic Flora & Island Wildlife', bn: 'স্থানীয় উদ্ভিদ ও দ্বীপের বন্যপ্রাণী' },
                fact: { en: 'Evolutionary haven harboring rare island species', bn: 'বিবর্তনের ধারায় গড়ে ওঠা বিরল প্রজাতির উদ্ভিদ ও প্রাণী' },
                text: {
                    en: `Centuries of oceanic isolation have nurtured unique ecosystems on ${nameEn}. Specialized bird colonies, coastal mangroves, and flowering flora flourish along its shores.`,
                    bn: `মূল ভূখণ্ড থেকে শত শত বছর বিচ্ছিন্ন থাকার কারণে ${nameBn}-এ গড়ে উঠেছে নিজস্ব অনন্য জীববৈচিত্র্য। নানা বিরল সামুদ্রিক পাখি, উপকূলীয় ম্যানগ্রোভ ও স্থানীয় উদ্ভিদের সমাহার এখানে চোখে পড়ে।`
                }
            },
            {
                num: '05',
                title: { en: 'Maritime Heritage & Seafaring', bn: 'নৌ-ঐতিহ্য ও নাবিকদের ইতিহাস' },
                fact: { en: 'Historic waypoint for ancient navigators and spice traders', bn: 'প্রাচীন নাবিক ও মশলা ব্যবসায়ীদের ঐতিহাসিক নোঙরস্থল' },
                text: {
                    en: `Early mariners and explorers used ${nameEn} as an essential navigational landmark across treacherous ocean waters. Its harbors sheltered wooden sailing vessels during seasonal monsoons.`,
                    bn: `প্রাচীনকালের অভিযাত্রী ও বাণিজ্য কাফেলার নাবিকরা মহাসাগর পাড়ি দেওয়ার সময় ${nameBn}-কে দিকনির্ণায়ক হিসেবে ব্যবহার করত। এর শান্ত পোতাশ্রয় ঝড়-ঝঞ্ঝার দিনে জাহাজের নিরাপদ আশ্রয় ছিল।`
                }
            },
            {
                num: '06',
                title: { en: 'Island Culture & Coastal Communities', bn: 'দ্বীপের সংস্কৃতি ও উপকূলীয় জীবনযাত্রা' },
                fact: { en: 'Warm hospitality and artisanal fishing traditions', bn: 'ঐতিহ্যবাহী মৎস্য শিকার ও দ্বীপবাসীর উষ্ণ আতিথেয়তা' },
                text: {
                    en: `The communities residing on ${nameEn} live in intimate connection with the ocean tides. Traditional fishing techniques, vibrant folk music, and seaside craftsmanship define daily island life.`,
                    bn: `${nameBn}-এর স্থায়ী বাসিন্দাদের জীবন সাগরের জোয়ার-ভাটার সঙ্গে অঙ্গাঙ্গীভাবে জড়িত। ঐতিহ্যবাহী মাছ ধরার কৌশল, লোকসংগীত এবং হস্তশিল্প দ্বীপের সমাজজীবনকে বর্ণিল করে তুলেছে।`
                }
            },
            {
                num: '07',
                title: { en: 'Volcanic Origins & Atoll Geology', bn: 'আগ্নেয়গিরির উৎপত্তি ও অ্যাটোল গঠন' },
                fact: { en: 'Formed by submarine volcanoes and oceanic hotspots', bn: 'সমুদ্রগর্ভের আগ্নেয়গিরি ও ভূতাত্ত্বিক আলোড়নে গঠিত' },
                text: {
                    en: `Geologically, ${nameEn} was forged by underwater volcanic eruptions or the slow accumulation of calcareous reef deposits over millions of years, creating dramatic sea cliffs and basalt plateaus.`,
                    bn: `ভূতাত্ত্বিক দিক থেকে ${nameBn} লক্ষ লক্ষ বছর আগে সাগরের নিচে অগ্ন্যুৎপাত অথবা প্রবাল চুনাপাথরের স্তূপ জমে সৃষ্টি হয়েছে। এর পাথুরে উপকূল ও ব্যাসাল্ট শিলাখণ্ড প্রাকৃতিক বিবর্তনের সাক্ষ্য বহন করে।`
                }
            },
            {
                num: '08',
                title: { en: 'Sustainable Living & Blue Economy', bn: 'টেকসই জীবনযাত্রা ও নীল অর্থনীতি' },
                fact: { en: 'Embracing renewable energy and ocean protection', bn: 'সৌরশক্তি ও সামুদ্রিক সম্পদের টেকসই ব্যবহার' },
                text: {
                    en: `Facing global climatic changes, ${nameEn} spearheads sustainable coastal development, rainwater harvesting, solar power, and community-led marine protected areas.`,
                    bn: `জলবায়ু পরিবর্তনের প্রভাব মোকাবেলায় ${nameBn} টেকসই উপকূলীয় ব্যবস্থাপনা, বৃষ্টির পানি সংরক্ষণ, সৌরবিদ্যুৎ এবং সামুদ্রিক অভয়ারণ্য গড়ে তোলার ক্ষেত্রে অগ্রণী ভূমিকা পালন করছে।`
                }
            },
            {
                num: '09',
                title: { en: 'Eco-Tourism & Tropical Havens', bn: 'পরিবেশবান্ধব পর্যটন ও স্বর্গীয় বিশ্রাম' },
                fact: { en: 'A tranquil sanctuary for world travelers and divers', bn: 'বিশ্বভ্রমণকারী ও স্কুবা ডাইভারদের কাছে স্বপ্নের গন্তব্য' },
                text: {
                    en: `Travelers venture across oceans to experience the untamed serenity of ${nameEn}. Snorkeling, diving along coral walls, and watching coastal sunsets offer unforgettable memories.`,
                    bn: `প্রকৃতির নির্জন প্রশান্তি অনুভব করতে বিশ্বজুড়ে পর্যটকেরা ${nameBn}-এ ছুটে আসেন। প্রবালের মাঝে স্নরকেলিং, স্কুবা ডাইভিং এবং সাগরে সূর্যাস্তের দৃশ্য এক অবিস্মরণীয় অভিজ্ঞতা তৈরি করে।`
                }
            },
            {
                num: '10',
                title: { en: 'Sanctuary in the Endless Sea', bn: 'অনন্ত সাগরের বুকে চিরন্তন আশ্রয়' },
                fact: { en: 'An immortal jewel of calm and natural wonder', bn: 'প্রশান্তি ও প্রাকৃতিক সৌন্দর্যের এক অনন্য নীলাভ রত্ন' },
                text: {
                    en: `${nameEn} remains an eternal oasis in the vast expanse of Earth's waters. It stands as a testament to the tranquil beauty, resilience, and captivating mystery of our living planet.`,
                    bn: `${nameBn} সুবিশাল মহাসাগরের মাঝে এক চিরন্তন স্বর্গভূমি। পৃথিবীর শান্ত সৌন্দর্য, স্থায়িত্ব এবং সাগরের রহস্যময় শক্তির এক উজ্জ্বল প্রতীক হিসেবে এটি চিরকাল প্রজ্বলিত থাকবে।`
                }
            }
        ];
    }

    return [];
}

// Render 10 story chapters for selected topic (Wonder, Continent, Ocean, Country, Historical, River, Forest, Mountain)
function renderChapters(topic) {
    chaptersWrapper.innerHTML = '';
    trackerNav.innerHTML = '';
    if (!topic) return;

    if (!topic.chapters || topic.chapters.length < 10) {
        topic.chapters = generateTopicChapters(topic, currentTopicType);
    }

    topic.chapters.forEach((ch, idx) => {
        // Chapter Card
        const card = document.createElement('article');
        card.className = `chapter-card ${idx === 0 ? 'active-chapter' : ''}`;
        card.dataset.index = idx;
        card.id = `chapter-section-${idx}`;

        const chapterNum = ch.num || String(idx + 1).padStart(2, '0');
        const chTitle = (ch.title && ch.title[currentLang]) ? ch.title[currentLang] : (ch.title ? ch.title.en : '');
        const chFact = (ch.fact && ch.fact[currentLang]) ? ch.fact[currentLang] : (ch.fact ? ch.fact.en : '');
        const chText = (ch.text && ch.text[currentLang]) ? ch.text[currentLang] : (ch.text ? ch.text.en : '');

        card.innerHTML = `
            <div class="chapter-badge">Chapter ${chapterNum}</div>
            <h2 class="chapter-heading">${chTitle}</h2>
            <div class="chapter-fact-pill">✦ ${chFact}</div>
            <div class="chapter-body">${chText}</div>
        `;
        chaptersWrapper.appendChild(card);

        // Tracker Dot Navigation
        const dot = document.createElement('div');
        dot.className = `tracker-dot ${idx === 0 ? 'active' : ''}`;
        dot.title = `${chapterNum}. ${chTitle}`;
        dot.dataset.index = idx;
        dot.onclick = () => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        trackerNav.appendChild(dot);
    });
}

// Unified Topic Detail View Controller (Wonders, Continents, Oceans, Countries, Historical, Rivers, Forests, Mountains)
function openTopicDetail(topic, type = 'wonder') {
    if (!topic) return;
    closeDeveloperModal();
    closeAllDropdowns();
    currentTopic = topic;
    currentTopicType = type;
    currentWonder = topic; // Backwards compatibility for scroll spy, tracker, lang toggle
    world.controls().autoRotate = false;

    // Ensure topic has full 10-chapter structure
    if (!topic.chapters || topic.chapters.length < 10) {
        topic.chapters = generateTopicChapters(topic, type);
    }

    // Ensure topic has full 10 images
    if (!topic.images || topic.images.length < 10) {
        const fallbacks = categoryFallbackImages[type] || categoryFallbackImages['historical'];
        const existing = topic.images ? [...topic.images] : [];
        for (let i = existing.length; i < 10; i++) {
            existing.push(fallbacks[i % fallbacks.length]);
        }
        topic.images = existing;
    }

    // Preload all background images immediately
    preloadTopicImages(topic);

    // Dynamic zoom altitude
    let targetAlt = 0.1;
    if (type === 'continent') {
        targetAlt = topic.zoomAltitude || 1.15;
    } else if (type === 'ocean') {
        targetAlt = topic.zoomAltitude || 1.2;
    } else if (type === 'country') {
        targetAlt = topic.zoomAltitude || (topic.sizeClass === 'large' ? 0.65 : (topic.sizeClass === 'small' ? 0.22 : 0.38));
    } else if (type === 'historical') {
        targetAlt = topic.zoomAltitude || 0.14;
    } else if (type === 'river') {
        targetAlt = topic.zoomAltitude || 0.42;
    } else if (type === 'forest') {
        targetAlt = topic.zoomAltitude || 0.35;
    } else if (type === 'mountain') {
        targetAlt = topic.zoomAltitude || 0.18;
    } else if (type === 'island') {
        targetAlt = topic.zoomAltitude || 0.28;
    } else {
        targetAlt = topic.zoomAltitude || 0.1;
    }

    // Camera fly-to animation
    world.pointOfView({ lat: topic.lat, lng: topic.lng, altitude: targetAlt }, 1400);

    if (topicOpenTimeout) clearTimeout(topicOpenTimeout);
    topicOpenTimeout = setTimeout(() => {
        topicOpenTimeout = null;
        if (!currentTopic && !currentWonder) return;

        // Reset scroll position to top
        scrollArea.scrollTop = 0;
        currentImageIdx = -1;

        // Render chapters and tracker
        renderChapters(topic);

        // Initialize first background image
        const firstImg = (topic.images && topic.images.length > 0) ? topic.images[0] : '';
        if (firstImg) {
            bgLayer1.style.backgroundImage = `url("${firstImg}")`;
            bgLayer1.classList.add('active');
            bgLayer2.classList.remove('active');
            activeLayer = 1;
            currentImageIdx = 0;
            updateTrackerUI(0);
        }

        // Show background container
        detailBackground.classList.remove('hidden');
        void detailBackground.offsetWidth;
        detailBackground.classList.add('visible');

        // Hide Globe, Legend, Copyright & 3-Dot Toggle
        globeContainer.style.opacity = 0;
        if (globeToolbar) globeToolbar.style.opacity = 0;
        if (siteCopyright) siteCopyright.style.opacity = 0;
        if (menuToggleBtn) {
            menuToggleBtn.style.opacity = 0;
            menuToggleBtn.style.pointerEvents = 'none';
        }
        if (globeHideTimeout) clearTimeout(globeHideTimeout);
        globeHideTimeout = setTimeout(() => {
            if (infoOverlay.classList.contains('visible')) {
                globeContainer.classList.add('hidden');
            }
        }, 800);

        // Update Header Titles
        wonderTitle.textContent = (topic.name && topic.name[currentLang]) ? topic.name[currentLang] : (topic.name ? topic.name.en : '');
        wonderSubtitle.textContent = (topic.subtitle && topic.subtitle[currentLang]) ? topic.subtitle[currentLang] : (topic.subtitle ? topic.subtitle.en : '');
        scrollPromptText.textContent = currentLang === 'en' 
            ? 'Scroll to explore 10 chapters & landscapes' 
            : '১০টি অধ্যায় ও দৃশ্য দেখতে নিচে স্ক্রোল করুন';
        backButton.textContent = currentLang === 'en' ? '← Back to Globe' : '← গ্লোবে ফিরে যান';

        // Country Topics Hub (for countries)
        if (type === 'country') {
            renderCountryTopicsHub(topic);
        } else {
            hideCountryTopicsHub();
        }

        // Show Info Overlay
        infoOverlay.classList.remove('hidden');
        void infoOverlay.offsetWidth;
        infoOverlay.classList.add('visible');
    }, 1400);
}

// Individual Topic Selectors
function selectWonder(wonder) {
    openTopicDetail(wonder, 'wonder');
}

function selectContinent(geoId) {
    if (typeof continentsData === 'undefined') return;
    const topic = continentsData[geoId];
    if (topic) {
        openTopicDetail(topic, 'continent');
    }
}

function selectOcean(geoId) {
    if (typeof oceansData === 'undefined') return;
    const topic = oceansData[geoId];
    if (topic) {
        openTopicDetail(topic, 'ocean');
    }
}

function selectCountry(countryOrId) {
    let cObj = null;
    if (typeof countryOrId === 'string') {
        cObj = countryLabelsMap[countryOrId] || countryByNameMap[countryOrId.toLowerCase()];
    } else {
        cObj = countryOrId;
    }
    if (!cObj) return;

    let topic = null;
    if (typeof getCountryTopic === 'function') {
        topic = getCountryTopic(cObj);
    }
    if (topic) {
        openTopicDetail(topic, 'country');
    }
}

function selectHistoricalPlace(itemOrId) {
    let place = null;
    if (typeof itemOrId === 'string') {
        place = (typeof historicalPlacesData !== 'undefined') ? historicalPlacesData[itemOrId] : null;
    } else {
        place = itemOrId;
    }
    if (place) {
        openTopicDetail(place, 'historical');
    }
}

function selectRiver(itemOrId) {
    let river = null;
    if (typeof itemOrId === 'string') {
        river = (typeof riversData !== 'undefined') ? riversData[itemOrId] : null;
    } else {
        river = itemOrId;
    }
    if (river) {
        openTopicDetail(river, 'river');
    }
}

function selectForest(itemOrId) {
    let forest = null;
    if (typeof itemOrId === 'string') {
        forest = (typeof forestsData !== 'undefined') ? forestsData[itemOrId] : null;
    } else {
        forest = itemOrId;
    }
    if (forest) {
        openTopicDetail(forest, 'forest');
    }
}

function selectMountain(itemOrId) {
    let mountain = null;
    if (typeof itemOrId === 'string') {
        mountain = (typeof mountainsData !== 'undefined') ? mountainsData[itemOrId] : null;
    } else {
        mountain = itemOrId;
    }
    if (mountain) {
        openTopicDetail(mountain, 'mountain');
    }
}

function selectIsland(itemOrId) {
    let island = null;
    if (typeof itemOrId === 'string') {
        island = (typeof islandsData !== 'undefined') ? islandsData[itemOrId] : null;
    } else {
        island = itemOrId;
    }
    if (island) {
        openTopicDetail(island, 'island');
    }
}

// Back Button Logic
backButton.addEventListener('click', () => {
    if (topicOpenTimeout) {
        clearTimeout(topicOpenTimeout);
        topicOpenTimeout = null;
    }
    if (globeHideTimeout) {
        clearTimeout(globeHideTimeout);
        globeHideTimeout = null;
    }

    // Hide Overlay
    infoOverlay.classList.remove('visible');
    hideCountryTopicsHub();
    closeCountryItemDetail();

    // Show Globe, Legend, Copyright & 3-Dot Toggle again
    globeContainer.classList.remove('hidden');
    void globeContainer.offsetWidth;
    globeContainer.style.opacity = 1;
    if (globeToolbar) globeToolbar.style.opacity = 1;
    if (siteCopyright) siteCopyright.style.opacity = 1;
    if (menuToggleBtn) {
        menuToggleBtn.style.opacity = 1;
        menuToggleBtn.style.pointerEvents = 'auto';
    }

    // Fade out background
    detailBackground.classList.remove('visible');

    setTimeout(() => {
        infoOverlay.classList.add('hidden');
        detailBackground.classList.add('hidden');

        // Reset layers
        bgLayer1.classList.remove('active');
        bgLayer2.classList.remove('active');

        // Zoom out camera to standard globe orbit
        const activeTopic = currentTopic || currentWonder;
        const returnLat = activeTopic ? activeTopic.lat : 20;
        const returnLng = activeTopic ? activeTopic.lng : 0;
        world.pointOfView({ lat: returnLat, lng: returnLng, altitude: 2.1 }, 1400);

        setTimeout(() => {
            world.controls().autoRotate = isAutoRotating;
            currentWonder = null;
            currentTopic = null;
            currentTopicType = null;
        }, 1400);
    }, 900);
});

// Smooth Scroll Spy for Image Crossfade & Chapter Highlighting
scrollArea.addEventListener('scroll', () => {
    if (!currentWonder || !currentWonder.images) return;

    const cards = chaptersWrapper.querySelectorAll('.chapter-card');
    if (!cards.length) return;

    const scrollAreaRect = scrollArea.getBoundingClientRect();
    const focalPoint = scrollAreaRect.top + scrollAreaRect.height * 0.35;

    let activeIdx = 0;
    cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= focalPoint) {
            activeIdx = idx;
        }
    });

    if (activeIdx !== currentImageIdx && currentWonder.images[activeIdx]) {
        transitionToImage(currentWonder.images[activeIdx], activeIdx);
    }
}, { passive: true });

// Language Toggle Logic
langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    currentLang = currentLang === 'en' ? 'bn' : 'en';
    window.currentLang = currentLang;
    langToggle.textContent = currentLang === 'en' ? 'বাং (BN)' : 'EN (ENG)';
    updateRotationUI();
    updateNavTranslations();

    // Update wonder marker labels and attributes
    const markerContainers = document.querySelectorAll('.wonder-marker');
    markerContainers.forEach((el) => {
        const wonderId = el.dataset.id;
        const wonder = wonderMap[wonderId];
        if (wonder) {
            el.setAttribute('title', wonder.name[currentLang]);
            const label = el.querySelector('.marker-label');
            if (label) label.textContent = wonder.name[currentLang];
            const thumb = el.querySelector('.marker-thumb');
            if (thumb) thumb.setAttribute('alt', wonder.name[currentLang]);
        }
    });

    // Update continent and ocean titles on the globe
    document.querySelectorAll('.continent-title-tag, .ocean-title-tag').forEach(el => {
        const item = geoLabelsMap[el.dataset.id];
        if (item) {
            const labelSpan = el.querySelector('.geo-label-text');
            if (labelSpan) labelSpan.textContent = item.name[currentLang];
        }
    });

    // Update country labels on the globe
    document.querySelectorAll('.country-label-tag').forEach(el => {
        const item = countryLabelsMap[el.dataset.id];
        if (item) {
            const span = el.querySelector('.country-text');
            if (span) span.textContent = item.name[currentLang] || item.name.en;
        }
    });

    // Update bottom toolbar text
    if (toolbarLabelText) toolbarLabelText.textContent = toolbarTranslations.label[currentLang];
    ['continents', 'countries', 'oceans', 'wonders', 'historical', 'rivers', 'forests', 'mountains', 'islands'].forEach(layer => {
        const span = document.getElementById(`layer-text-${layer}`);
        if (span && toolbarTranslations[layer]) {
            span.textContent = toolbarTranslations[layer][currentLang];
        }
    });

    // Update active Geo HUD info pill if hovering
    if (hoverPolygon) updateGeoHoverUI(hoverPolygon);

    // Update active overlay text if a topic is currently selected
    const activeItem = currentTopic || currentWonder;
    if (activeItem) {
        wonderTitle.textContent = (activeItem.name && activeItem.name[currentLang]) ? activeItem.name[currentLang] : (activeItem.name ? activeItem.name.en : '');
        wonderSubtitle.textContent = (activeItem.subtitle && activeItem.subtitle[currentLang]) ? activeItem.subtitle[currentLang] : (activeItem.subtitle ? activeItem.subtitle.en : '');
        scrollPromptText.textContent = currentLang === 'en' 
            ? 'Scroll to explore 10 chapters & landscapes' 
            : '১০টি অধ্যায় ও দৃশ্য দেখতে নিচে স্ক্রোল করুন';
        backButton.textContent = currentLang === 'en' ? '← Back to Globe' : '← গ্লোবে ফিরে যান';

        // Update chapters text in-place preserving current scroll position
        const cards = chaptersWrapper.querySelectorAll('.chapter-card');
        cards.forEach((card, idx) => {
            const ch = (activeItem.chapters && activeItem.chapters[idx]) ? activeItem.chapters[idx] : null;
            if (ch) {
                const heading = card.querySelector('.chapter-heading');
                if (heading) heading.textContent = (ch.title && ch.title[currentLang]) ? ch.title[currentLang] : (ch.title ? ch.title.en : '');

                const pill = card.querySelector('.chapter-fact-pill');
                if (pill) pill.textContent = `✦ ${(ch.fact && ch.fact[currentLang]) ? ch.fact[currentLang] : (ch.fact ? ch.fact.en : '')}`;

                const body = card.querySelector('.chapter-body');
                if (body) body.innerHTML = (ch.text && ch.text[currentLang]) ? ch.text[currentLang] : (ch.text ? ch.text.en : '');
            }
        });

        if (currentTopicType === 'country' && currentTopic) {
            renderCountryTopicsHub(currentTopic);
        }
    }
});

// Responsive resizing
window.addEventListener('resize', () => {
    world.width(window.innerWidth).height(window.innerHeight);
});

// Programmatic & testing hover helper
window.triggerGeoHover = function(id) {
    const f = geoFeaturesById[id] || (
        (typeof geoBoundaries !== 'undefined' && geoBoundaries.features) 
            ? geoBoundaries.features.find(item => item.properties.id === id) 
            : null
    );
    if (f) {
        applyGeoHover(f);
    }
};

// Check for test hover URL parameter
const urlParams = new URLSearchParams(window.location.search);
const initialHover = urlParams.get('hover');
if (initialHover) {
    setTimeout(() => {
        window.triggerGeoHover(initialHover);
        const f = (typeof geoBoundaries !== 'undefined' && geoBoundaries.features) 
            ? geoBoundaries.features.find(item => item.properties.id === initialHover) 
            : null;
        if (f && f.geometry) {
            // Find approximate center of geometry to orient camera
            const coords = f.geometry.coordinates;
            let samplePt = [0, 0];
            if (f.geometry.type === 'Polygon' && coords[0] && coords[0][0]) samplePt = coords[0][0];
            else if (f.geometry.type === 'MultiPolygon' && coords[0] && coords[0][0] && coords[0][0][0]) samplePt = coords[0][0][0];
            world.pointOfView({ lat: samplePt[1], lng: samplePt[0], altitude: 2.0 }, 800);
        }
    }, 600);
}

if (urlParams.get('modal') === 'developer') {
    setTimeout(openDeveloperModal, 400);
}

if (urlParams.get('menu') === 'hide') {
    setTimeout(() => {
        if (menuToggleBtn) menuToggleBtn.click();
    }, 300);
}

// ==========================================================================
// Country Topics & Governance Dropdowns Hub Controller
// ==========================================================================
const countryTopicsHub = document.getElementById('country-topics-hub');
const countryPillsBar = document.getElementById('country-pills-bar');
const countryDropdownPanelContainer = document.getElementById('country-dropdown-panel-container');
const panelTopicIcon = document.getElementById('panel-topic-icon');
const panelTopicTitle = document.getElementById('panel-topic-title');
const panelTopicSub = document.getElementById('panel-topic-sub');
const panelSearchInput = document.getElementById('panel-search-input');
const panelCloseBtn = document.getElementById('panel-close-btn');
const countryDropdownItemsList = document.getElementById('country-dropdown-items-list');
const countryItemModal = document.getElementById('country-item-modal');
const itemModalCloseBtn = document.getElementById('item-modal-close-btn');
const itemModalHeader = document.getElementById('item-modal-header');
const itemModalBody = document.getElementById('item-modal-body');
const itemModalBackBtn = document.getElementById('item-modal-back-btn');
const hubTopicsCount = document.getElementById('hub-topics-count');
const hubIntroText = document.getElementById('hub-intro-text');
const hubBadge = document.getElementById('hub-badge');

let currentCountryCategories = [];
let activeCountryTopicId = null;
let activeDropdownTopic = null;

function hideCountryTopicsHub() {
    if (countryTopicsHub) countryTopicsHub.classList.add('hidden');
    if (countryDropdownPanelContainer) countryDropdownPanelContainer.classList.add('hidden');
    activeCountryTopicId = null;
    activeDropdownTopic = null;
}

function closeCountryItemDetail() {
    if (countryItemModal) countryItemModal.classList.add('hidden');
}

function renderCountryTopicsHub(country) {
    if (!countryTopicsHub || !countryPillsBar) return;
    if (typeof CountryDetailsEngine === 'undefined') return;

    currentCountryCategories = CountryDetailsEngine.getCountryTopicCategories(country);
    if (!currentCountryCategories || currentCountryCategories.length === 0) {
        countryTopicsHub.classList.add('hidden');
        return;
    }

    countryTopicsHub.classList.remove('hidden');

    if (hubBadge) {
        hubBadge.textContent = currentLang === 'en' ? '🏛️ GOVERNANCE & NATIONAL PROFILES' : '🏛️ শাসনব্যবস্থা, জাতীয় পরিচয় ও অর্থনীতি';
    }
    if (hubTopicsCount) {
        hubTopicsCount.textContent = currentLang === 'en' 
            ? `${currentCountryCategories.length} Topics Available` 
            : `${currentCountryCategories.length}টি বিষয় উপলব্ধ`;
    }
    if (hubIntroText) {
        hubIntroText.textContent = currentLang === 'en' 
            ? 'Click any topic dropdown menu below to view full breakdown, lists, and deep details.' 
            : 'নিচের যেকোনো বিষয়ের ড্রপডাউন মেনুতে ক্লিক করে সম্পূর্ণ তালিকা ও বিস্তারিত তথ্য দেখুন।';
    }

    // Render Dropdown Trigger Pills
    countryPillsBar.innerHTML = '';
    currentCountryCategories.forEach(cat => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `country-topic-pill ${activeCountryTopicId === cat.id ? 'active' : ''}`;
        pill.dataset.topicId = cat.id;

        const catTitle = (cat.label && cat.label[currentLang]) ? cat.label[currentLang] : (cat.label ? cat.label.en : cat.id);
        const count = cat.items ? cat.items.length : 0;

        pill.innerHTML = `
            <span class="pill-icon">${cat.icon || '📌'}</span>
            <span class="pill-text">${catTitle}</span>
            <span class="pill-count-badge">${count}</span>
            <span class="pill-caret">▾</span>
        `;

        pill.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCountryTopicDropdown(cat.id);
        });

        countryPillsBar.appendChild(pill);
    });

    if (activeCountryTopicId) {
        const found = currentCountryCategories.find(c => c.id === activeCountryTopicId);
        if (found) {
            openCountryTopicDropdown(found);
        } else {
            if (countryDropdownPanelContainer) countryDropdownPanelContainer.classList.add('hidden');
            activeCountryTopicId = null;
            activeDropdownTopic = null;
        }
    } else {
        if (countryDropdownPanelContainer) countryDropdownPanelContainer.classList.add('hidden');
    }
}

function toggleCountryTopicDropdown(topicId) {
    if (activeCountryTopicId === topicId) {
        // Toggle close
        activeCountryTopicId = null;
        activeDropdownTopic = null;
        if (countryDropdownPanelContainer) countryDropdownPanelContainer.classList.add('hidden');
        document.querySelectorAll('.country-topic-pill').forEach(p => p.classList.remove('active'));
    } else {
        activeCountryTopicId = topicId;
        const topic = currentCountryCategories.find(c => c.id === topicId);
        if (topic) {
            openCountryTopicDropdown(topic);
        }
    }
}

function openCountryTopicDropdown(topic) {
    activeDropdownTopic = topic;
    activeCountryTopicId = topic.id;

    // Update pill active classes
    document.querySelectorAll('.country-topic-pill').forEach(p => {
        if (p.dataset.topicId === topic.id) {
            p.classList.add('active');
            p.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        } else {
            p.classList.remove('active');
        }
    });

    if (!countryDropdownPanelContainer) return;
    countryDropdownPanelContainer.classList.remove('hidden');

    const topicTitle = (topic.label && topic.label[currentLang]) ? topic.label[currentLang] : (topic.label ? topic.label.en : topic.id);
    if (panelTopicIcon) panelTopicIcon.textContent = topic.icon || '📌';
    if (panelTopicTitle) panelTopicTitle.textContent = topicTitle;
    if (panelTopicSub) {
        panelTopicSub.textContent = currentLang === 'en' 
            ? `${topic.items.length} items • Click any item to view detailed info` 
            : `${topic.items.length}টি তথ্য • বিস্তারিত দেখতে যেকোনোটিতে ক্লিক করুন`;
    }
    if (panelSearchInput) {
        panelSearchInput.value = '';
        panelSearchInput.placeholder = currentLang === 'en' ? `Search in ${topicTitle}...` : `${topicTitle}-এ খুঁজুন...`;
    }

    renderCountryDropdownItems('');
}

function renderCountryDropdownItems(filterText = '') {
    if (!countryDropdownItemsList || !activeDropdownTopic) return;
    countryDropdownItemsList.innerHTML = '';

    const query = filterText.trim().toLowerCase();
    const filtered = (activeDropdownTopic.items || []).filter(item => {
        if (!query) return true;
        const nameEn = (item.name && item.name.en) ? item.name.en.toLowerCase() : '';
        const nameBn = (item.name && item.name.bn) ? item.name.bn.toLowerCase() : '';
        const badgeEn = (item.badge && item.badge.en) ? item.badge.en.toLowerCase() : '';
        const badgeBn = (item.badge && item.badge.bn) ? item.badge.bn.toLowerCase() : '';
        const summaryEn = (item.summary && item.summary.en) ? item.summary.en.toLowerCase() : '';
        const summaryBn = (item.summary && item.summary.bn) ? item.summary.bn.toLowerCase() : '';
        return nameEn.includes(query) || nameBn.includes(query) || badgeEn.includes(query) || badgeBn.includes(query) || summaryEn.includes(query) || summaryBn.includes(query);
    });

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'country-dropdown-empty';
        empty.textContent = currentLang === 'en' ? 'No matching items found.' : 'কোনো তথ্য খুঁজে পাওয়া যায়নি।';
        countryDropdownItemsList.appendChild(empty);
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'country-item-card';

        const itemName = (item.name && item.name[currentLang]) ? item.name[currentLang] : (item.name ? item.name.en : '');
        const itemBadge = (item.badge && item.badge[currentLang]) ? item.badge[currentLang] : (item.badge ? item.badge.en : '');

        card.innerHTML = `
            <div class="item-card-left">
                <span class="item-card-icon">${item.icon || activeDropdownTopic.icon || '📌'}</span>
                <div class="item-card-text">
                    <div class="item-card-title">${itemName}</div>
                    <div class="item-card-badge">${itemBadge}</div>
                </div>
            </div>
            <span class="item-card-arrow">→</span>
        `;

        card.addEventListener('click', () => {
            openCountryItemDetail(item);
        });

        countryDropdownItemsList.appendChild(card);
    });
}

function openCountryItemDetail(item) {
    if (!countryItemModal || !itemModalHeader || !itemModalBody) return;

    const itemName = (item.name && item.name[currentLang]) ? item.name[currentLang] : (item.name ? item.name.en : '');
    const itemBadge = (item.badge && item.badge[currentLang]) ? item.badge[currentLang] : (item.badge ? item.badge.en : '');
    const itemIcon = item.icon || (activeDropdownTopic ? activeDropdownTopic.icon : '📌');

    itemModalHeader.innerHTML = `
        <div class="item-modal-top-row">
            <div class="item-modal-icon">${itemIcon}</div>
            <div>
                <h2 class="item-modal-title">${itemName}</h2>
                <span class="item-modal-badge">${itemBadge}</span>
            </div>
        </div>
    `;

    let bodyHTML = '';
    const details = item.details || {};

    if (details.overview) {
        const overviewText = (details.overview[currentLang]) ? details.overview[currentLang] : details.overview.en;
        bodyHTML += `<div class="item-modal-overview">${overviewText}</div>`;
    } else if (item.summary) {
        const sumText = (item.summary[currentLang]) ? item.summary[currentLang] : item.summary.en;
        bodyHTML += `<div class="item-modal-overview">${sumText}</div>`;
    }

    // Metrics Grid
    if (details.metrics && details.metrics.length > 0) {
        bodyHTML += `<div class="item-modal-metrics-grid">`;
        details.metrics.forEach(m => {
            const mLabel = (m.label && m.label[currentLang]) ? m.label[currentLang] : (m.label ? m.label.en : '');
            const mVal = (m.value && m.value[currentLang]) ? m.value[currentLang] : (m.value ? m.value.en : '');
            bodyHTML += `
                <div class="metric-card">
                    <div class="metric-label">${mLabel}</div>
                    <div class="metric-value">${mVal}</div>
                </div>
            `;
        });
        bodyHTML += `</div>`;
    }

    // Highlights Box
    if (details.highlights && details.highlights.length > 0) {
        const highlightsTitle = currentLang === 'en' ? '✦ Key Highlights & Strategic Features' : '✦ বিশেষ বৈশিষ্ট্য ও তাৎপর্য';
        bodyHTML += `
            <div class="item-modal-highlights">
                <div class="highlights-title">${highlightsTitle}</div>
                <ul class="highlights-list">
        `;
        details.highlights.forEach(h => {
            const hText = (h[currentLang]) ? h[currentLang] : (h.en || h);
            bodyHTML += `<li>${hText}</li>`;
        });
        bodyHTML += `
                </ul>
            </div>
        `;
    }

    itemModalBody.innerHTML = bodyHTML;
    countryItemModal.classList.remove('hidden');
}

// Wire Country Hub Event Listeners
if (panelCloseBtn) {
    panelCloseBtn.addEventListener('click', () => {
        if (countryDropdownPanelContainer) countryDropdownPanelContainer.classList.add('hidden');
        activeCountryTopicId = null;
        activeDropdownTopic = null;
        document.querySelectorAll('.country-topic-pill').forEach(p => p.classList.remove('active'));
    });
}

if (panelSearchInput) {
    panelSearchInput.addEventListener('input', (e) => {
        renderCountryDropdownItems(e.target.value);
    });
}

if (itemModalCloseBtn) {
    itemModalCloseBtn.addEventListener('click', closeCountryItemDetail);
}

if (itemModalBackBtn) {
    itemModalBackBtn.addEventListener('click', closeCountryItemDetail);
}

if (countryItemModal) {
    countryItemModal.addEventListener('click', (e) => {
        if (e.target === countryItemModal) {
            closeCountryItemDetail();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (countryItemModal && !countryItemModal.classList.contains('hidden')) {
            closeCountryItemDetail();
        } else if (countryDropdownPanelContainer && !countryDropdownPanelContainer.classList.contains('hidden')) {
            if (countryDropdownPanelContainer) countryDropdownPanelContainer.classList.add('hidden');
            activeCountryTopicId = null;
            activeDropdownTopic = null;
            document.querySelectorAll('.country-topic-pill').forEach(p => p.classList.remove('active'));
        }
    }
});


