// Complete 3D Solar System Engine (Realistic Keplerian Orbits, Planets, Moons, Satellites & Deep Earth Zoom)
(function() {
    'use strict';

    // Solar System State
    let solarContainer = null;
    let solarScene = null;
    let solarCamera = null;
    let solarRenderer = null;
    let solarControls = null;
    let animFrameId = null;

    let simulationSpeed = 1.0;
    let isPaused = false;
    let showOrbits = true;
    let showLabels = true;
    let activeTarget = null; // Currently tracked body (Sun, Earth, Mars, ISS, etc.)
    let cameraTween = null;
    let isTransitioningToGlobe = false;
    let isSolarSystemActive = true;

    // Celestial Mesh Objects registry
    const celestialObjects = {};
    const orbitLines = [];
    const labelElements = [];
    let asteroidBelt = null;
    const asteroidsData = [];

    // Raycaster for hover/click interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Textures Cache
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = {};

    function getTexture(path) {
        if (!path) return null;
        if (!loadedTextures[path]) {
            loadedTextures[path] = textureLoader.load(path);
        }
        return loadedTextures[path];
    }

    function getLang() {
        if (typeof window.currentLang !== 'undefined') return window.currentLang;
        if (typeof currentLang !== 'undefined') return currentLang;
        return 'en';
    }

    // Initialize Solar System Scene
    function initSolarSystem() {
        solarContainer = document.getElementById('solar-container');
        if (!solarContainer) return;

        // Scene
        solarScene = new THREE.Scene();

        // Camera
        const aspect = window.innerWidth / window.innerHeight;
        solarCamera = new THREE.PerspectiveCamera(45, aspect, 1, 25000);
        solarCamera.position.set(0, 950, 1550);

        // Renderer
        solarRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        solarRenderer.setSize(window.innerWidth, window.innerHeight);
        solarRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        solarRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        solarRenderer.toneMappingExposure = 1.2;
        solarContainer.appendChild(solarRenderer.domElement);

        // OrbitControls
        if (typeof THREE.OrbitControls !== 'undefined') {
            solarControls = new THREE.OrbitControls(solarCamera, solarRenderer.domElement);
            solarControls.enableDamping = true;
            solarControls.dampingFactor = 0.05;
            solarControls.minDistance = 15;
            solarControls.maxDistance = 5500;
            solarControls.maxPolarAngle = Math.PI * 0.95;
            solarControls.target.set(0, 0, 0);
        }

        // Deep Starfield Background
        createStarfield();

        // Central Sun & Ambient Space Lighting
        createSunAndLights();

        // Build All Planets, Rings, Moons, and Satellites
        createCelestialBodies();

        // Build Asteroid Belt
        createAsteroidBelt();

        // Create 2D Interactive Holographic Labels
        createHolographicLabels();

        // Setup Event Listeners
        setupEventListeners();

        // Start 60 FPS Render Loop
        animate();
    }

    // Starfield Generator
    function createStarfield() {
        const starCount = 4500;
        const starGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);

        const colorPalette = [
            new THREE.Color(0xffffff),
            new THREE.Color(0xaad5ff),
            new THREE.Color(0xffeedd),
            new THREE.Color(0xffd29d),
            new THREE.Color(0x9db4ff)
        ];

        for (let i = 0; i < starCount; i++) {
            const r = 4000 + Math.random() * 5000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 2.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.85
        });

        const starField = new THREE.Points(starGeometry, starMaterial);
        solarScene.add(starField);
    }

    // Sun & Realistic Sunlight
    function createSunAndLights() {
        // Ambient Light for subtle planetary nightside visibility
        const ambientLight = new THREE.AmbientLight(0x334466, 0.4);
        solarScene.add(ambientLight);

        // Core Point Light from Sun illuminating all planets & moons
        const sunLight = new THREE.PointLight(0xffffff, 2.5, 0, 0.08);
        sunLight.position.set(0, 0, 0);
        solarScene.add(sunLight);

        // Sun Mesh
        const sunData = solarSystemData.sun;
        const sunGeo = new THREE.SphereGeometry(sunData.radius, 48, 48);
        const sunTex = getTexture(sunData.texture);
        const sunMat = new THREE.MeshBasicMaterial({
            map: sunTex,
            color: 0xfff4cc
        });
        const sunMesh = new THREE.Mesh(sunGeo, sunMat);
        sunMesh.name = 'sun';
        solarScene.add(sunMesh);

        // Pulsing Solar Corona Glow
        const coronaGeo = new THREE.SphereGeometry(sunData.radius * 1.15, 32, 32);
        const coronaMat = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.22,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
        sunMesh.add(coronaMesh);

        celestialObjects.sun = {
            id: 'sun',
            mesh: sunMesh,
            corona: coronaMesh,
            data: sunData,
            orbitAngle: 0
        };
    }

    // Create All Planets, Moons & Artificial Satellites
    function createCelestialBodies() {
        // 1. Planets
        const planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

        planetKeys.forEach(key => {
            const data = solarSystemData[key];
            if (!data) return;

            // Orbit Anchor Group (revolves around Sun)
            const orbitGroup = new THREE.Group();
            orbitGroup.name = `orbit_${key}`;
            solarScene.add(orbitGroup);

            // Orbit Trajectory Line (Circle/Ellipse)
            const orbitLine = createOrbitLine(data.distanceVal, data.color || '#4488ff');
            solarScene.add(orbitLine);
            orbitLines.push(orbitLine);

            // Planet Mesh
            const geom = new THREE.SphereGeometry(data.radius, 36, 36);
            const tex = getTexture(data.texture);
            const mat = new THREE.MeshStandardMaterial({
                map: tex,
                roughness: 0.8,
                metalness: 0.1
            });
            const planetMesh = new THREE.Mesh(geom, mat);
            planetMesh.name = key;
            planetMesh.position.set(data.distanceVal, 0, 0);

            // Axial Tilt
            if (data.tilt) {
                planetMesh.rotation.z = THREE.MathUtils.degToRad(data.tilt);
            }

            orbitGroup.add(planetMesh);

            // Atmosphere Rim Glow for Terrestrial & Gas Giants
            if (key === 'earth' || key === 'venus' || key === 'mars' || key === 'neptune') {
                const atmosGeo = new THREE.SphereGeometry(data.radius * 1.03, 32, 32);
                const atmosColor = key === 'earth' ? 0x00aaff : (key === 'venus' ? 0xffcc44 : (key === 'mars' ? 0xff4422 : 0x0066ff));
                const atmosMat = new THREE.MeshBasicMaterial({
                    color: atmosColor,
                    transparent: true,
                    opacity: 0.18,
                    side: THREE.BackSide,
                    blending: THREE.AdditiveBlending
                });
                planetMesh.add(new THREE.Mesh(atmosGeo, atmosMat));
            }

            // Saturn Rings
            if (data.hasRings && data.ringTexture) {
                const ringGeo = new THREE.RingGeometry(data.radius * 1.3, data.radius * 2.5, 64);
                const ringTex = getTexture(data.ringTexture);
                // Rotate ring geometry to lie flat on the equator
                ringGeo.rotateX(Math.PI / 2);
                const ringMat = new THREE.MeshStandardMaterial({
                    map: ringTex,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.92,
                    roughness: 0.7
                });
                const ringMesh = new THREE.Mesh(ringGeo, ringMat);
                ringMesh.rotation.x = THREE.MathUtils.degToRad(data.tilt || 26.7);
                planetMesh.add(ringMesh);
            }

            celestialObjects[key] = {
                id: key,
                mesh: planetMesh,
                orbitGroup: orbitGroup,
                data: data,
                orbitAngle: Math.random() * Math.PI * 2,
                orbitRadius: data.distanceVal,
                orbitSpeed: data.orbitSpeed,
                rotationSpeed: data.rotationSpeed || 0.01
            };
        });

        // 2. Earth's Natural & Artificial Satellites
        createEarthSatellites();

        // 3. Mars' Moons (Phobos)
        createMarsMoons();

        // 4. Jupiter's Galilean Moons (Europa & Ganymede)
        createJupiterMoons();

        // 5. Saturn's Moon (Titan)
        createSaturnMoons();

        // 6. Neptune's Moon (Triton)
        createNeptuneMoons();

        // 7. Interstellar Probe Voyager 1
        createVoyagerProbe();
    }

    // Earth Satellites (Moon, ISS, Hubble, JWST)
    function createEarthSatellites() {
        const earthObj = celestialObjects.earth;
        if (!earthObj) return;

        // 1. The Moon (Luna)
        const moonData = solarSystemData.moon;
        const moonGeo = new THREE.SphereGeometry(moonData.radius, 28, 28);
        const moonTex = getTexture(moonData.texture);
        const moonMat = new THREE.MeshStandardMaterial({
            map: moonTex,
            roughness: 0.9,
            metalness: 0.05
        });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.name = 'moon';
        moonMesh.position.set(moonData.orbitRadius, 0, 0);

        const moonOrbitGroup = new THREE.Group();
        earthObj.mesh.add(moonOrbitGroup);
        moonOrbitGroup.add(moonMesh);

        // Moon Orbit Ring
        const moonOrbitLine = createOrbitLine(moonData.orbitRadius, '#ffffff', 0.18);
        moonOrbitGroup.add(moonOrbitLine);
        orbitLines.push(moonOrbitLine);

        celestialObjects.moon = {
            id: 'moon',
            mesh: moonMesh,
            orbitGroup: moonOrbitGroup,
            data: moonData,
            orbitAngle: 0,
            orbitSpeed: moonData.orbitSpeed,
            parent: earthObj
        };

        // 2. ISS (International Space Station) - 3D Craft Model
        const issData = solarSystemData.iss;
        const issGroup = new THREE.Group();
        issGroup.name = 'iss';

        // Central Habitation Modules (Silver cylinders)
        const moduleGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.4, 12);
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.8, roughness: 0.3 });
        const centralModule = new THREE.Mesh(moduleGeo, metalMat);
        centralModule.rotation.z = Math.PI / 2;
        issGroup.add(centralModule);

        // Cross Truss Structure
        const trussGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8);
        const trussMesh = new THREE.Mesh(trussGeo, metalMat);
        issGroup.add(trussMesh);

        // 8 Solar Array Panels (Blue/Gold Photovoltaic Wings)
        const panelGeo = new THREE.PlaneGeometry(0.7, 1.2);
        const solarMat = new THREE.MeshStandardMaterial({
            color: 0x0044aa,
            metalness: 0.9,
            roughness: 0.2,
            side: THREE.DoubleSide
        });

        [-1.2, 1.2].forEach(xOffset => {
            [-0.7, 0.7].forEach(yOffset => {
                const panel = new THREE.Mesh(panelGeo, solarMat);
                panel.position.set(xOffset, yOffset, 0);
                issGroup.add(panel);
            });
        });

        issGroup.position.set(issData.orbitRadius, 0, 0);
        const issOrbitGroup = new THREE.Group();
        earthObj.mesh.add(issOrbitGroup);
        issOrbitGroup.add(issGroup);

        const issOrbitLine = createOrbitLine(issData.orbitRadius, '#00e5ff', 0.25);
        issOrbitGroup.add(issOrbitLine);
        orbitLines.push(issOrbitLine);

        celestialObjects.iss = {
            id: 'iss',
            mesh: issGroup,
            orbitGroup: issOrbitGroup,
            data: issData,
            orbitAngle: Math.PI / 3,
            orbitSpeed: issData.orbitSpeed,
            parent: earthObj
        };

        // 3. Hubble Space Telescope
        const hubbleData = solarSystemData.hubble;
        const hubbleGroup = new THREE.Group();
        hubbleGroup.name = 'hubble';

        // Optical Tube
        const tubeGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 12);
        const hubbleMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, metalness: 0.9, roughness: 0.2 });
        const tubeMesh = new THREE.Mesh(tubeGeo, hubbleMat);
        hubbleGroup.add(tubeMesh);

        // Solar Wings
        const hWingGeo = new THREE.PlaneGeometry(0.5, 0.9);
        [-0.7, 0.7].forEach(xOff => {
            const hWing = new THREE.Mesh(hWingGeo, solarMat);
            hWing.position.set(xOff, 0, 0);
            hubbleGroup.add(hWing);
        });

        hubbleGroup.position.set(hubbleData.orbitRadius, 0, 0);
        const hubbleOrbitGroup = new THREE.Group();
        hubbleOrbitGroup.rotation.x = THREE.MathUtils.degToRad(28.5); // 28.5° inclination
        earthObj.mesh.add(hubbleOrbitGroup);
        hubbleOrbitGroup.add(hubbleGroup);

        const hubbleOrbitLine = createOrbitLine(hubbleData.orbitRadius, '#a0d2ff', 0.22);
        hubbleOrbitGroup.add(hubbleOrbitLine);
        orbitLines.push(hubbleOrbitLine);

        celestialObjects.hubble = {
            id: 'hubble',
            mesh: hubbleGroup,
            orbitGroup: hubbleOrbitGroup,
            data: hubbleData,
            orbitAngle: Math.PI / 1.5,
            orbitSpeed: hubbleData.orbitSpeed,
            parent: earthObj
        };

        // 4. James Webb Space Telescope (JWST) - At Sun-Earth L2 Point
        const jwstData = solarSystemData.jwst;
        const jwstGroup = new THREE.Group();
        jwstGroup.name = 'jwst';

        // Silver Kite Sunshield
        const shieldGeo = new THREE.PlaneGeometry(1.6, 1.1);
        const shieldMat = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, metalness: 0.95, roughness: 0.1, side: THREE.DoubleSide });
        const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
        shieldMesh.rotation.x = Math.PI / 2;
        jwstGroup.add(shieldMesh);

        // Golden Hexagonal Mirror Segment Array
        const mirrorGeo = new THREE.CircleGeometry(0.5, 6);
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.1, side: THREE.DoubleSide });
        const mirrorMesh = new THREE.Mesh(mirrorGeo, goldMat);
        mirrorMesh.position.set(0, 0.35, 0);
        jwstGroup.add(mirrorMesh);

        jwstGroup.position.set(jwstData.orbitRadius, 0, 0);
        const jwstOrbitGroup = new THREE.Group();
        earthObj.mesh.add(jwstOrbitGroup);
        jwstOrbitGroup.add(jwstGroup);

        const jwstOrbitLine = createOrbitLine(jwstData.orbitRadius, '#ffd700', 0.2);
        jwstOrbitGroup.add(jwstOrbitLine);
        orbitLines.push(jwstOrbitLine);

        celestialObjects.jwst = {
            id: 'jwst',
            mesh: jwstGroup,
            orbitGroup: jwstOrbitGroup,
            data: jwstData,
            orbitAngle: Math.PI,
            orbitSpeed: jwstData.orbitSpeed,
            parent: earthObj
        };
    }

    // Mars' Moons (Phobos)
    function createMarsMoons() {
        const marsObj = celestialObjects.mars;
        if (!marsObj) return;

        const phobosData = solarSystemData.phobos;
        const geo = new THREE.DodecahedronGeometry(phobosData.radius, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x888078, roughness: 0.95 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.name = 'phobos';
        mesh.position.set(phobosData.orbitRadius, 0, 0);

        const orbitGroup = new THREE.Group();
        marsObj.mesh.add(orbitGroup);
        orbitGroup.add(mesh);

        const orbitLine = createOrbitLine(phobosData.orbitRadius, '#dd7755', 0.2);
        orbitGroup.add(orbitLine);
        orbitLines.push(orbitLine);

        celestialObjects.phobos = {
            id: 'phobos',
            mesh: mesh,
            orbitGroup: orbitGroup,
            data: phobosData,
            orbitAngle: 0,
            orbitSpeed: phobosData.orbitSpeed,
            parent: marsObj
        };
    }

    // Jupiter's Galilean Moons (Europa & Ganymede)
    function createJupiterMoons() {
        const jupiterObj = celestialObjects.jupiter;
        if (!jupiterObj) return;

        ['europa', 'ganymede'].forEach(key => {
            const data = solarSystemData[key];
            const geo = new THREE.SphereGeometry(data.radius, 24, 24);
            const mat = new THREE.MeshStandardMaterial({
                color: key === 'europa' ? 0xcbe2ea : 0x8c8275,
                roughness: 0.8
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.name = key;
            mesh.position.set(data.orbitRadius, 0, 0);

            const orbitGroup = new THREE.Group();
            jupiterObj.mesh.add(orbitGroup);
            orbitGroup.add(mesh);

            const orbitLine = createOrbitLine(data.orbitRadius, key === 'europa' ? '#00e5ff' : '#d4a373', 0.2);
            orbitGroup.add(orbitLine);
            orbitLines.push(orbitLine);

            celestialObjects[key] = {
                id: key,
                mesh: mesh,
                orbitGroup: orbitGroup,
                data: data,
                orbitAngle: Math.random() * Math.PI * 2,
                orbitSpeed: data.orbitSpeed,
                parent: jupiterObj
            };
        });
    }

    // Saturn's Moon Titan
    function createSaturnMoons() {
        const saturnObj = celestialObjects.saturn;
        if (!saturnObj) return;

        const data = solarSystemData.titan;
        const geo = new THREE.SphereGeometry(data.radius, 24, 24);
        const mat = new THREE.MeshStandardMaterial({ color: 0xdf9f48, roughness: 0.7 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.name = 'titan';
        mesh.position.set(data.orbitRadius, 0, 0);

        const orbitGroup = new THREE.Group();
        saturnObj.mesh.add(orbitGroup);
        orbitGroup.add(mesh);

        const orbitLine = createOrbitLine(data.orbitRadius, '#f4d06f', 0.2);
        orbitGroup.add(orbitLine);
        orbitLines.push(orbitLine);

        celestialObjects.titan = {
            id: 'titan',
            mesh: mesh,
            orbitGroup: orbitGroup,
            data: data,
            orbitAngle: Math.random() * Math.PI * 2,
            orbitSpeed: data.orbitSpeed,
            parent: saturnObj
        };
    }

    // Neptune's Moon Triton
    function createNeptuneMoons() {
        const neptuneObj = celestialObjects.neptune;
        if (!neptuneObj) return;

        const data = solarSystemData.triton;
        const geo = new THREE.SphereGeometry(data.radius, 24, 24);
        const mat = new THREE.MeshStandardMaterial({ color: 0xb5cbe4, roughness: 0.85 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.name = 'triton';
        mesh.position.set(data.orbitRadius, 0, 0);

        const orbitGroup = new THREE.Group();
        neptuneObj.mesh.add(orbitGroup);
        orbitGroup.add(mesh);

        const orbitLine = createOrbitLine(data.orbitRadius, '#66aaff', 0.2);
        orbitGroup.add(orbitLine);
        orbitLines.push(orbitLine);

        celestialObjects.triton = {
            id: 'triton',
            mesh: mesh,
            orbitGroup: orbitGroup,
            data: data,
            orbitAngle: Math.random() * Math.PI * 2,
            orbitSpeed: data.orbitSpeed,
            parent: neptuneObj
        };
    }

    // Voyager 1 Interstellar Spacecraft Probe
    function createVoyagerProbe() {
        const data = solarSystemData.voyager1;
        const group = new THREE.Group();
        group.name = 'voyager1';

        // High-Gain Parabolic White Antenna Dish
        const dishGeo = new THREE.CylinderGeometry(1.2, 0.2, 0.4, 16);
        const dishMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 });
        const dishMesh = new THREE.Mesh(dishGeo, dishMat);
        dishMesh.rotation.x = Math.PI / 2;
        group.add(dishMesh);

        // Spacecraft Bus Body
        const busGeo = new THREE.BoxGeometry(0.8, 0.8, 0.6);
        const busMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.4 });
        const busMesh = new THREE.Mesh(busGeo, busMat);
        busMesh.position.set(0, 0, -0.4);
        group.add(busMesh);

        // The Golden Record (mounted on side)
        const recordGeo = new THREE.CircleGeometry(0.3, 16);
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.1 });
        const recordMesh = new THREE.Mesh(recordGeo, goldMat);
        recordMesh.position.set(0.41, 0, -0.4);
        recordMesh.rotation.y = Math.PI / 2;
        group.add(recordMesh);

        // RTG Power Boom & Magnetometer Mast
        const boomGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.5, 6);
        const boomMesh = new THREE.Mesh(boomGeo, busMat);
        boomMesh.position.set(-1.2, 0.8, -0.4);
        boomMesh.rotation.z = Math.PI / 4;
        group.add(boomMesh);

        group.position.set(data.distanceVal, 220, 180);
        group.rotation.set(0.4, 0.8, 0);
        solarScene.add(group);

        celestialObjects.voyager1 = {
            id: 'voyager1',
            mesh: group,
            data: data,
            orbitAngle: 0,
            isStatic: true
        };
    }

    // Dense Asteroid Belt (2,000 Instanced Tumbling Asteroids between Mars & Jupiter)
    function createAsteroidBelt() {
        const count = 1800;
        const geo = new THREE.DodecahedronGeometry(1.4, 1);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x7c7365,
            roughness: 0.95,
            metalness: 0.1
        });

        asteroidBelt = new THREE.InstancedMesh(geo, mat, count);
        const dummy = new THREE.Object3D();

        const innerR = 640;
        const outerR = 760;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = innerR + Math.random() * (outerR - innerR);
            const height = (Math.random() - 0.5) * 45;
            const scale = 0.4 + Math.random() * 1.4;

            dummy.position.set(
                Math.cos(angle) * dist,
                height,
                Math.sin(angle) * dist
            );
            dummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.4), scale);
            dummy.updateMatrix();

            asteroidBelt.setMatrixAt(i, dummy.matrix);

            asteroidsData.push({
                angle: angle,
                dist: dist,
                height: height,
                speed: 0.001 + (1 / dist) * 2.5,
                rotX: (Math.random() - 0.5) * 0.02,
                rotY: (Math.random() - 0.5) * 0.02,
                scale: scale
            });
        }

        asteroidBelt.instanceMatrix.needsUpdate = true;
        solarScene.add(asteroidBelt);
    }

    // Helper: Create Glowing Orbit Line
    function createOrbitLine(radius, colorHex = '#3388ff', opacity = 0.28) {
        const segments = 128;
        const points = [];
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
        }
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
            color: new THREE.Color(colorHex),
            transparent: true,
            opacity: opacity,
            blending: THREE.AdditiveBlending
        });
        return new THREE.LineLoop(geom, mat);
    }

    // Holographic 2D Labels Floating Over Objects in 3D
    function createHolographicLabels() {
        const labelsContainer = document.getElementById('solar-labels-container');
        if (!labelsContainer) return;
        labelsContainer.innerHTML = '';

        const iconMap = {
            sun: '☀️',
            mercury: '☿️',
            venus: '♀️',
            earth: '🌍',
            moon: '🌙',
            iss: '🛰️',
            hubble: '🔭',
            jwst: '✨',
            mars: '♂️',
            phobos: '🥔',
            ceres: '☄️',
            jupiter: '♃',
            europa: '🌊',
            ganymede: '🪐',
            saturn: '♄',
            titan: '🟠',
            uranus: '♅',
            neptune: '♆',
            triton: '❄️',
            pluto: '❤️',
            voyager1: '📡'
        };

        Object.keys(celestialObjects).forEach(id => {
            const obj = celestialObjects[id];
            const data = obj.data;
            if (!data) return;

            const labelEl = document.createElement('div');
            labelEl.className = `solar-label tag-${id}`;
            labelEl.dataset.id = id;
            const icon = iconMap[id] || '✨';
            const lang = getLang();
            const name = (data.name && data.name[lang]) ? data.name[lang] : data.name.en;

            labelEl.innerHTML = `
                <span class="solar-label-icon">${icon}</span>
                <span class="solar-label-text">${name}</span>
            `;

            labelEl.addEventListener('click', (e) => {
                e.stopPropagation();
                selectCelestialBody(id);
            });

            labelsContainer.appendChild(labelEl);
            labelElements.push({ id, el: labelEl, obj });
        });
    }

    // Update Holographic Labels Positions on Screen (Screen Projection)
    const tempVec = new THREE.Vector3();
    function updateHolographicLabels() {
        if (!showLabels) return;
        const widthHalf = window.innerWidth / 2;
        const heightHalf = window.innerHeight / 2;

        labelElements.forEach(item => {
            const mesh = item.obj.mesh;
            if (!mesh) return;

            mesh.getWorldPosition(tempVec);

            // Add slight vertical offset above the sphere
            const r = (item.obj.data && item.obj.data.radius) ? item.obj.data.radius : 10;
            tempVec.y += r * 1.35;

            // Project 3D coordinate to 2D screen coordinate
            tempVec.project(solarCamera);

            // Is behind the camera?
            if (tempVec.z > 1.0) {
                item.el.style.display = 'none';
                return;
            }

            const x = (tempVec.x * widthHalf) + widthHalf;
            const y = -(tempVec.y * heightHalf) + heightHalf;

            item.el.style.display = 'inline-flex';
            item.el.style.left = `${x}px`;
            item.el.style.top = `${y}px`;
        });
    }

    // Update Dynamic Planetary Motions & Rotations
    function updateCelestialMotion(delta) {
        if (isPaused) return;

        const effectiveSpeed = delta * simulationSpeed * 0.75;

        // 1. Orbit Planets Around Sun
        Object.keys(celestialObjects).forEach(id => {
            const obj = celestialObjects[id];
            if (obj.isStatic) return;

            // If orbits around Sun
            if (obj.orbitRadius && obj.orbitGroup && !obj.parent) {
                obj.orbitAngle += obj.orbitSpeed * effectiveSpeed;
                obj.mesh.position.x = Math.cos(obj.orbitAngle) * obj.orbitRadius;
                obj.mesh.position.z = Math.sin(obj.orbitAngle) * obj.orbitRadius;
            }

            // If orbits around a parent planet (Moons, ISS, Hubble, JWST)
            if (obj.parent && obj.orbitGroup && obj.data.orbitRadius) {
                obj.orbitAngle += obj.orbitSpeed * effectiveSpeed * 2.5;
                obj.mesh.position.x = Math.cos(obj.orbitAngle) * obj.data.orbitRadius;
                obj.mesh.position.z = Math.sin(obj.orbitAngle) * obj.data.orbitRadius;
            }

            // Axial Rotation
            if (obj.mesh && obj.rotationSpeed) {
                obj.mesh.rotation.y += obj.rotationSpeed * effectiveSpeed * 3.0;
            }
        });

        // 2. Animate Asteroids
        if (asteroidBelt) {
            const dummy = new THREE.Object3D();
            for (let i = 0; i < asteroidsData.length; i++) {
                const a = asteroidsData[i];
                a.angle += a.speed * effectiveSpeed * 0.6;

                dummy.position.set(
                    Math.cos(a.angle) * a.dist,
                    a.height,
                    Math.sin(a.angle) * a.dist
                );
                dummy.rotation.x += a.rotX;
                dummy.rotation.y += a.rotY;
                dummy.scale.set(a.scale, a.scale, a.scale);
                dummy.updateMatrix();

                asteroidBelt.setMatrixAt(i, dummy.matrix);
            }
            asteroidBelt.instanceMatrix.needsUpdate = true;
        }

        // 3. Pulse Sun Corona
        if (celestialObjects.sun && celestialObjects.sun.corona) {
            const time = performance.now() * 0.002;
            const s = 1.0 + Math.sin(time) * 0.035;
            celestialObjects.sun.corona.scale.set(s, s, s);
        }
    }

    // Camera Focus and Tracking Controller
    function updateCameraTracking() {
        if (!activeTarget) return;

        const targetObj = celestialObjects[activeTarget];
        if (!targetObj || !targetObj.mesh) return;

        targetObj.mesh.getWorldPosition(tempVec);

        if (cameraTween) {
            // Animating towards target
            const now = performance.now();
            const progress = Math.min((now - cameraTween.startTime) / cameraTween.duration, 1.0);
            const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            solarControls.target.lerpVectors(cameraTween.startTarget, tempVec, ease);

            const desiredPos = new THREE.Vector3().copy(tempVec).add(cameraTween.offset);
            solarCamera.position.lerpVectors(cameraTween.startPos, desiredPos, ease);

            if (progress >= 1.0) {
                cameraTween = null;
            }
        } else {
            // Locked tracking while object orbits
            solarControls.target.copy(tempVec);
        }

        // Check for Earth Deep Zoom Transition Condition:
        if (activeTarget === 'earth' && !isTransitioningToGlobe && !cameraTween) {
            const distToEarth = solarCamera.position.distanceTo(tempVec);
            // If user scrolls closely into Earth (< 36 units)
            if (distToEarth < 36) {
                triggerDeepZoomIntoEarth();
            }
        }
    }

    // Smooth Fly-To Celestial Object
    function flyToCelestialBody(id) {
        const obj = celestialObjects[id];
        if (!obj || !obj.mesh) return;

        activeTarget = id;

        obj.mesh.getWorldPosition(tempVec);

        const r = (obj.data && obj.data.radius) ? obj.data.radius : 10;
        // Optimal observation distance based on body radius
        let distMult = 3.6;
        if (id === 'sun') distMult = 4.2;
        else if (id === 'saturn') distMult = 4.8; // Space for rings
        else if (id === 'earth') distMult = 3.4;
        else if (obj.data.isCraft) distMult = 5.0;

        const targetDist = Math.max(r * distMult, 18);
        const offset = new THREE.Vector3(targetDist * 0.8, targetDist * 0.45, targetDist * 0.9);

        cameraTween = {
            startTime: performance.now(),
            duration: 1400,
            startPos: solarCamera.position.clone(),
            startTarget: solarControls.target.clone(),
            offset: offset
        };

        // Open Celestial Info Panel
        openCelestialInfo(id);
    }

    // Deep Zoom Transition into Earth (Countries, Cities, Boundaries, 7 Wonders & 4000 Items)
    function triggerDeepZoomIntoEarth() {
        if (isTransitioningToGlobe) return;
        isTransitioningToGlobe = true;

        const earthSurfaceBtn = document.getElementById('btn-explore-earth-surface');
        if (earthSurfaceBtn) earthSurfaceBtn.classList.add('diving');

        // Atmospheric hyperspace dive animation
        const flashOverlay = document.getElementById('solar-dive-overlay');
        if (flashOverlay) {
            flashOverlay.classList.add('active');
        }

        setTimeout(() => {
            // Activate Globe view
            isSolarSystemActive = false;
            if (solarContainer) solarContainer.classList.add('hidden');
            const labelsContainer = document.getElementById('solar-labels-container');
            if (labelsContainer) labelsContainer.style.display = 'none';
            const solarToolbar = document.getElementById('solar-toolbar');
            if (solarToolbar) solarToolbar.classList.add('hidden');

            const navSolar = document.getElementById('nav-solar');
            const navGlobe = document.getElementById('nav-globe');
            if (navSolar) navSolar.classList.remove('active');
            if (navGlobe) navGlobe.classList.add('active');

            const globeContainer = document.getElementById('globe-container');
            if (globeContainer) {
                globeContainer.classList.remove('hidden');
                globeContainer.style.opacity = 1;
            }

            // Show Earth Toolbar and Return-to-Space Badge
            const globeToolbar = document.getElementById('globe-toolbar');
            if (globeToolbar) globeToolbar.classList.remove('hidden');
            const spaceReturnBtn = document.getElementById('btn-return-solar');
            if (spaceReturnBtn) spaceReturnBtn.classList.remove('hidden');

            // Close solar info modal
            closeCelestialInfo();

            // Set globe camera to orbital altitude
            if (typeof world !== 'undefined' && world) {
                world.pointOfView({ lat: 20, lng: 0, altitude: 2.1 }, 1200);
            }

            if (flashOverlay) {
                setTimeout(() => flashOverlay.classList.remove('active'), 400);
            }
            isTransitioningToGlobe = false;
        }, 600);
    }

    // Zoom Back Out into Solar System
    function zoomOutToSolarSystem() {
        const flashOverlay = document.getElementById('solar-dive-overlay');
        if (flashOverlay) flashOverlay.classList.add('active');

        setTimeout(() => {
            // Hide Globe view & return badge
            const globeContainer = document.getElementById('globe-container');
            if (globeContainer) globeContainer.classList.add('hidden');
            const globeToolbar = document.getElementById('globe-toolbar');
            if (globeToolbar) globeToolbar.classList.add('hidden');
            const spaceReturnBtn = document.getElementById('btn-return-solar');
            if (spaceReturnBtn) spaceReturnBtn.classList.add('hidden');

            const navSolar = document.getElementById('nav-solar');
            const navGlobe = document.getElementById('nav-globe');
            if (navGlobe) navGlobe.classList.remove('active');
            if (navSolar) navSolar.classList.add('active');

            // Show Solar System
            isSolarSystemActive = true;
            if (solarContainer) solarContainer.classList.remove('hidden');
            const labelsContainer = document.getElementById('solar-labels-container');
            if (labelsContainer) labelsContainer.style.display = showLabels ? 'block' : 'none';
            const solarToolbar = document.getElementById('solar-toolbar');
            if (solarToolbar) solarToolbar.classList.remove('hidden');

            // Position solar camera smoothly orbiting Earth in space
            if (celestialObjects.earth) {
                activeTarget = 'earth';
                celestialObjects.earth.mesh.getWorldPosition(tempVec);
                solarControls.target.copy(tempVec);
                solarCamera.position.set(tempVec.x + 40, tempVec.y + 25, tempVec.z + 55);
            }

            if (flashOverlay) {
                setTimeout(() => flashOverlay.classList.remove('active'), 500);
            }
        }, 500);
    }

    // Display Comprehensive Celestial Information Modal
    function openCelestialInfo(id) {
        const data = solarSystemData[id];
        if (!data) return;

        const infoPanel = document.getElementById('celestial-info-panel');
        if (!infoPanel) return;

        // Populate Details
        const nameEl = document.getElementById('celestial-name');
        const badgeEl = document.getElementById('celestial-badge');
        const descEl = document.getElementById('celestial-desc');
        const statDiameter = document.getElementById('stat-diameter');
        const statMass = document.getElementById('stat-mass');
        const statGravity = document.getElementById('stat-gravity');
        const statTemp = document.getElementById('stat-temp');
        const statDistance = document.getElementById('stat-distance');
        const statOrbit = document.getElementById('stat-orbit');
        const statRotation = document.getElementById('stat-rotation');
        const statMoons = document.getElementById('stat-moons');
        const missionsEl = document.getElementById('celestial-missions');
        const funFactEl = document.getElementById('celestial-fun-fact');
        const exploreEarthBtn = document.getElementById('btn-explore-earth-surface');

        const lang = getLang();
        if (nameEl) nameEl.textContent = (data.name && data.name[lang]) ? data.name[lang] : data.name.en;
        if (badgeEl) {
            const cat = data.category === 'star' ? (lang === 'en' ? 'Central Star' : 'কেন্দ্রীয় নক্ষত্র') :
                       (data.category === 'natural_satellite' ? (lang === 'en' ? 'Natural Moon' : 'প্রাকৃতিক উপগ্রহ') :
                       (data.category === 'artificial_satellite' ? (lang === 'en' ? 'Artificial Satellite / Craft' : 'কৃত্রিম উপগ্রহ / মহাকাশযান') :
                       (lang === 'en' ? 'Planet' : 'গ্রহ')));
            badgeEl.textContent = cat;
        }

        if (descEl) descEl.textContent = (data.overview && data.overview[lang]) ? data.overview[lang] : data.overview.en;
        if (statDiameter) statDiameter.textContent = data.diameter || 'N/A';
        if (statMass) statMass.textContent = data.mass || 'N/A';
        if (statGravity) statGravity.textContent = data.gravity || 'N/A';
        if (statTemp) statTemp.textContent = data.surfaceTemp || 'N/A';
        if (statDistance) statDistance.textContent = data.distance || 'N/A';
        if (statOrbit) statOrbit.textContent = data.orbitPeriod || 'N/A';
        if (statRotation) statRotation.textContent = data.rotation || 'N/A';
        if (statMoons) statMoons.textContent = data.moons || 'None';

        if (missionsEl) missionsEl.textContent = (data.missions && data.missions[lang]) ? data.missions[lang] : (data.missions ? data.missions.en : 'N/A');
        if (funFactEl) funFactEl.textContent = (data.funFact && data.funFact[lang]) ? data.funFact[lang] : (data.funFact ? data.funFact.en : '');

        // Show "Deep Zoom into Earth" button ONLY for Earth!
        if (exploreEarthBtn) {
            if (id === 'earth') {
                exploreEarthBtn.classList.remove('hidden');
                exploreEarthBtn.style.display = 'inline-flex';
            } else {
                exploreEarthBtn.classList.add('hidden');
                exploreEarthBtn.style.display = 'none';
            }
        }

        infoPanel.classList.remove('hidden');
        void infoPanel.offsetWidth;
        infoPanel.classList.add('visible');
    }

    function closeCelestialInfo() {
        const infoPanel = document.getElementById('celestial-info-panel');
        if (infoPanel) {
            infoPanel.classList.remove('visible');
            setTimeout(() => infoPanel.classList.add('hidden'), 350);
        }
    }

    // Select Celestial Body Handler
    function selectCelestialBody(id) {
        if (!celestialObjects[id]) return;
        flyToCelestialBody(id);
    }

    // Raycaster Click Handler on 3D Meshes
    function onPointerDown(e) {
        if (!isSolarSystemActive) return;

        // Check if clicked inside UI panel
        if (e.target.closest('#celestial-info-panel') ||
            e.target.closest('#solar-toolbar') ||
            e.target.closest('.navbar') ||
            e.target.closest('.solar-label') ||
            e.target.closest('.developer-card')) {
            return;
        }

        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, solarCamera);

        // Collect all interactive meshes
        const meshes = [];
        Object.keys(celestialObjects).forEach(id => {
            const obj = celestialObjects[id];
            if (obj.mesh) {
                // If group, push its children
                if (obj.mesh.isGroup) {
                    obj.mesh.traverse(child => {
                        if (child.isMesh) {
                            child.userData.celestialId = id;
                            meshes.push(child);
                        }
                    });
                } else {
                    obj.mesh.userData.celestialId = id;
                    meshes.push(obj.mesh);
                }
            }
        });

        const intersects = raycaster.intersectObjects(meshes, true);
        if (intersects.length > 0) {
            const hit = intersects[0].object;
            const targetId = hit.userData.celestialId || hit.name;
            if (targetId && celestialObjects[targetId]) {
                selectCelestialBody(targetId);
            }
        }
    }

    // Setup UI & Control Event Listeners
    function setupEventListeners() {
        window.addEventListener('pointerdown', onPointerDown);

        // Window Resize
        window.addEventListener('resize', () => {
            if (!solarCamera || !solarRenderer) return;
            solarCamera.aspect = window.innerWidth / window.innerHeight;
            solarCamera.updateProjectionMatrix();
            solarRenderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Close Celestial Info Button
        const closeBtn = document.getElementById('btn-close-celestial-info');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCelestialInfo);
        }

        // Explore Earth Surface Deep Zoom Button
        const exploreEarthBtn = document.getElementById('btn-explore-earth-surface');
        if (exploreEarthBtn) {
            exploreEarthBtn.addEventListener('click', () => {
                triggerDeepZoomIntoEarth();
            });
        }

        // Return from Earth to Solar System Badge Button
        const returnSolarBtn = document.getElementById('btn-return-solar');
        if (returnSolarBtn) {
            returnSolarBtn.addEventListener('click', () => {
                zoomOutToSolarSystem();
            });
        }

        // Speed Buttons
        const speedButtons = document.querySelectorAll('.solar-speed-btn');
        speedButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                speedButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const speed = parseFloat(btn.dataset.speed || '1.0');
                if (speed === 0) {
                    isPaused = true;
                } else {
                    isPaused = false;
                    simulationSpeed = speed;
                }
            });
        });

        // Orbits Toggle Button
        const orbitToggle = document.getElementById('btn-toggle-orbits');
        if (orbitToggle) {
            orbitToggle.addEventListener('click', () => {
                showOrbits = !showOrbits;
                orbitToggle.classList.toggle('active', showOrbits);
                orbitLines.forEach(line => {
                    line.visible = showOrbits;
                });
            });
        }

        // Labels Toggle Button
        const labelToggle = document.getElementById('btn-toggle-labels');
        if (labelToggle) {
            labelToggle.addEventListener('click', () => {
                showLabels = !showLabels;
                labelToggle.classList.toggle('active', showLabels);
                const container = document.getElementById('solar-labels-container');
                if (container) container.style.display = showLabels ? 'block' : 'none';
            });
        }

        // Reset View Button
        const resetViewBtn = document.getElementById('btn-reset-solar-view');
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => {
                activeTarget = null;
                cameraTween = {
                    startTime: performance.now(),
                    duration: 1200,
                    startPos: solarCamera.position.clone(),
                    startTarget: solarControls.target.clone(),
                    offset: new THREE.Vector3(0, 950, 1550)
                };
                closeCelestialInfo();
            });
        }
    }

    // 60 FPS Animation & Physics Loop
    let lastTime = performance.now();
    function animate() {
        animFrameId = requestAnimationFrame(animate);

        const now = performance.now();
        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        if (isSolarSystemActive) {
            // Update Orbit Speeds & Rotations
            updateCelestialMotion(delta);

            // Update Camera Tracking & Fly-to
            updateCameraTracking();

            // Update OrbitControls
            if (solarControls) {
                solarControls.update();
            }

            // Project 3D Labels to Screen
            updateHolographicLabels();

            // Render 3D Scene
            solarRenderer.render(solarScene, solarCamera);
        }
    }

    // Expose Public API to Window
    window.SolarSystem = {
        init: initSolarSystem,
        selectBody: selectCelestialBody,
        zoomInEarth: triggerDeepZoomIntoEarth,
        zoomOutSolar: zoomOutToSolarSystem,
        setSpeed: (s) => { simulationSpeed = s; },
        pause: () => { isPaused = true; },
        play: () => { isPaused = false; },
        updateTranslations: () => {
            createHolographicLabels();
            if (activeTarget) openCelestialInfo(activeTarget);
        }
    };

    // Auto-init on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSolarSystem);
    } else {
        initSolarSystem();
    }
})();
