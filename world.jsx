// world.jsx — Floating island 3D diorama
// Exports: window.World3D (React component), window.WORLD_HOTSPOTS (metadata)

// ────────────────────────────────────────────────────────────
// CONTENT — hotspot definitions (also rendered in side panels)
const WORLD_HOTSPOTS = [
  {
    id: 'about',
    num: '01',
    title: 'About Husin',
    em: 'Husin',
    tagline: "Hi, I'm Husin.",
    short: "Final-year CS student at Universitas Indonesia. Click to know me.",
    lead: "I'm a Software Engineer and final-year Computer Science student building full-stack and mobile applications with disciplined engineering practices.",
    connect: [
      { label:'GitHub', href:'https://github.com/HusinHakim', icon:'github' },
      { label:'LinkedIn', href:'https://www.linkedin.com/in/husinhakim/', icon:'linkedin' },
      { label:'Email', href:'mailto:husinhidayatul@gmail.com', icon:'mail' }
    ],
    experience: [
      { role:'Software Engineering Intern',
        org:'Open for opportunity',
        date:'Soon' },
      { role:'Chairman',
        org:'UKM Flag Football, Universitas Indonesia',
        date:'Present' },
      { role:'Vice Person In Charge · Seminar',
        org:'COMPFEST · Faculty of CS, UI',
        date:'2025' }
    ],
    education: [
      { role:'Bachelor of Computer Science',
        org:'Universitas Indonesia · Depok',
        date:'2023 – 2027' }
    ]
  },
  {
    id: 'projects',
    num: '02',
    title: 'Selected Work',
    em: 'Work',
    tagline: 'A few projects worth showing.',
    short: 'Coursework and side builds — fullstack, mobile, and ML.',
    lead: 'Selected projects from coursework and side builds — fullstack platforms, mobile apps, and machine-learning experiments.',
    projects: [
      { n:'01', y:'2026', t:'GBM · ', em:'Guru Besar Mengajar',
        d:'Multi-role professor-supervision platform built with strict TDD (~100% coverage), SOLID design, SonarQube in GitLab CI, OWASP secure coding, and django-silk profiling.',
        tags:['Django REST','Next.js','PostgreSQL','GitLab CI','SonarQube'],
        role:'Fullstack Developer · Backend & QA',
        course:'Software Project (PPL) · UI' },
      { n:'02', y:'2025', t:'', em:'Rizzerve',
        d:'Spring Boot backend services with SOLID design patterns, clean code, secure coding, ≥80% test coverage, and CI/CD deployment with monitoring and rollback.',
        tags:['Spring Boot','Next.js','PostgreSQL','CI/CD','Monitoring'],
        role:'Developer & DevOps',
        course:'Advanced Programming · UI' },
      { n:'03', y:'2024', t:'', em:'Ngaji Kuy',
        d:'Cross-platform Flutter mobile app with Provider state management, integrated with a Django REST backend for cookie-session auth and JSON models.',
        tags:['Flutter','Dart','Provider','Django REST','HTTP/JSON'],
        role:'Mobile Developer',
        course:'Platform-Based Programming · UI' },
      { n:'04', y:'2026', t:'', em:'DropDude',
        d:'Lalamove-style logistics platform built for a security course — threat modeling, secure authentication & authorization, secure coding, and penetration testing.',
        tags:['Django','PostgreSQL','PenTest','Threat Modeling'],
        role:'Developer',
        course:'Software Security (PKPL) · UI' },
      { n:'05', y:'2024', t:'Pet Clinic · ', em:'Management',
        d:'Normalized PostgreSQL schema with constraints & triggers, role-based authentication, server-side validation, medical-record workflows, and tuned SQL queries.',
        tags:['Django','PostgreSQL','SQL','Triggers'],
        role:'Backend Developer',
        course:'Database Systems · UI' },
      { n:'06', y:'2025', t:'ATP Tennis · ', em:'Prediction',
        d:'End-to-end ML models (classification & regression) predicting ATP tennis outcomes. R² 0.81 — ranked 1st across all competing teams in the course Kaggle competition.',
        tags:['Python','scikit-learn','Pandas','Kaggle'],
        role:'Solo · 1st Place',
        course:'Foundations of AI & Data Science · UI' }
    ]
  },
  {
    id: 'skills',
    num: '03',
    title: 'Tools & Stack',
    em: 'Stack',
    tagline: 'What lives on my shelf.',
    short: 'Languages, frameworks, and tooling I reach for first.',
    lead: 'A small library of tools — each picked because it earned its place in shipped work.',
    groups: [
      { n:'01', t:'Engineering Practice',
        items:['Test-Driven Development','SOLID Design','Secure Coding','DevOps · CI/CD','Database Design','Machine Learning'] },
      { n:'02', t:'Languages',
        items:['Python','Java','Dart','TypeScript','JavaScript','Rust','C / C++','SQL'] },
      { n:'03', t:'Frameworks',
        items:['Django · DRF','Spring Boot','Flutter','Next.js · React','Node.js'] },
      { n:'04', t:'Testing & QA',
        items:['Jest','Mutation Testing','BDD · Cucumber','JMeter · k6','SonarQube','SAST / DAST'] },
      { n:'05', t:'Tools & DevOps',
        items:['Git · GitLab CI/CD','REST APIs','django-silk','Error Monitoring','Scrum · Jira','Code Review'] }
    ]
  },
  {
    id: 'contact',
    num: '04',
    title: 'Say Hello',
    em: 'Hello',
    tagline: 'Drop a letter.',
    short: 'Email, phone, or any social — pick one.',
    lead: 'The way in. Email is fastest, but the rest work too.',
    rows: [
      { k:'email', v:'husinhidayatul@gmail.com', href:'mailto:husinhidayatul@gmail.com' },
      { k:'phone', v:'+62 813-1047-0120', href:'tel:+6281310470120' },
      { k:'github', v:'github.com / HusinHakim', href:'https://github.com/HusinHakim' },
      { k:'linkedin', v:'husin hidayatul hakim', href:'https://www.linkedin.com/in/husinhakim/' },
      { k:'location', v:'Jakarta, Indonesia', href:null },
      { k:'availability', v:'open · 2026 internship', href:null }
    ]
  }
];
window.WORLD_HOTSPOTS = WORLD_HOTSPOTS;

// ────────────────────────────────────────────────────────────
// PALETTES — time-of-day variations
const WORLD_PALETTES = {
  sunset: {
    label:'Sunset',
    skyTop:   '#f5d3a3',
    skyBot:   '#e8a072',
    fog:      0xf0b890,
    keyLight: 0xffcc88,
    keyInt:   2.6,
    rimLight: 0xff8a55,
    rimInt:   1.0,
    ambLight: 0xc89968,
    ambInt:   0.55,
    hemiSky:  0xffd5a8,
    hemiGround:0x4a2814,
    grass:    0xc9925d,
    grassDark:0xa97240,
    cliff:    0x6b3a20,
    cliffDark:0x4a2510,
    mountain: 0x8a4520,
    mountainDark: 0x5a2810,
    snow:     0xf4e0bc,
    treeTrunk:0x4b2a16,
    treeLeaves1: 0x6a7a3a,
    treeLeaves2: 0x8a5a28,
    treeLeaves3: 0xa6502a,
    pathStone:0xa9805a,
    house:    0xf2dba8,
    houseRoof:0xc44a1f,
    deskWood: 0x6b3520,
    deskTop:  0x8b5a35,
    book1:    0xc44a1f, book2:0xe8893d, book3:0xddb86a, book4:0x6b8e4e,
    laptop:   0x3a2b1f,
    laptopGlow:0xffd58a,
    mailbox:  0xc44a1f,
    skin:     0xddb88a,
    shirt:    0xc44a1f,
    pants:    0x3a2814,
    hair:     0x2a1a10
  },
  morning: {
    label:'Morning',
    skyTop:   '#fbe9c8',
    skyBot:   '#f1c896',
    fog:      0xf2d4a6,
    keyLight: 0xfff0c8,
    keyInt:   2.3,
    rimLight: 0xfff0d0,
    rimInt:   0.6,
    ambLight: 0xd4b290,
    ambInt:   0.7,
    hemiSky:  0xffedce,
    hemiGround:0x6a4828,
    grass:    0xd8a872,
    grassDark:0xb88555,
    cliff:    0x7a4828,
    cliffDark:0x5a3018,
    mountain: 0x9a5a32,
    mountainDark: 0x6a3818,
    snow:     0xfaf0d8,
    treeTrunk:0x5b3a26,
    treeLeaves1: 0x8a9a4a,
    treeLeaves2: 0xb6884a,
    treeLeaves3: 0xc88752,
    pathStone:0xc09872,
    house:    0xfbeec5,
    houseRoof:0xd06030,
    deskWood: 0x7b4530,
    deskTop:  0xa66a44,
    book1:    0xd06030, book2:0xed984e, book3:0xe6c47a, book4:0x86a058,
    laptop:   0x4a3b2f,
    laptopGlow:0xfff0c8,
    mailbox:  0xd06030,
    skin:     0xe5c89a,
    shirt:    0xd06030,
    pants:    0x4a3824,
    hair:     0x322218
  },
  dusk: {
    label:'Dusk',
    skyTop:   '#3d2818',
    skyBot:   '#a04525',
    fog:      0x7a3818,
    keyLight: 0xff7038,
    keyInt:   2.4,
    rimLight: 0x9a3a8a,
    rimInt:   1.1,
    ambLight: 0x5a3020,
    ambInt:   0.5,
    hemiSky:  0xa04525,
    hemiGround:0x281008,
    grass:    0x6a4030,
    grassDark:0x4a2818,
    cliff:    0x3a1c10,
    cliffDark:0x200c06,
    mountain: 0x4a1c10,
    mountainDark: 0x250c06,
    snow:     0xd9b890,
    treeTrunk:0x2a1610,
    treeLeaves1: 0x3a4220,
    treeLeaves2: 0x4a2818,
    treeLeaves3: 0x6a2818,
    pathStone:0x5a3a28,
    house:    0xc89870,
    houseRoof:0x8b2810,
    deskWood: 0x3a2014,
    deskTop:  0x4a2818,
    book1:    0x8b2810, book2:0xb05028, book3:0x8a6838, book4:0x40502a,
    laptop:   0x1a1208,
    laptopGlow:0xff8050,
    mailbox:  0x8b2810,
    skin:     0xa07858,
    shirt:    0x8b2810,
    pants:    0x1a1008,
    hair:     0x100806
  }
};
window.WORLD_PALETTES = WORLD_PALETTES;

// ────────────────────────────────────────────────────────────
// THREE.js builders
function buildScene(THREE, palette) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(palette.fog, 22, 60);

  // ── Lighting ──
  const hemi = new THREE.HemisphereLight(palette.hemiSky, palette.hemiGround, 0.9);
  scene.add(hemi);

  const amb = new THREE.AmbientLight(palette.ambLight, palette.ambInt);
  scene.add(amb);

  const key = new THREE.DirectionalLight(palette.keyLight, palette.keyInt);
  key.position.set(8, 12, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -14;
  key.shadow.camera.right = 14;
  key.shadow.camera.top = 14;
  key.shadow.camera.bottom = -14;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 40;
  key.shadow.bias = -0.0005;
  scene.add(key);

  const rim = new THREE.DirectionalLight(palette.rimLight, palette.rimInt);
  rim.position.set(-6, 4, -8);
  scene.add(rim);

  // ── Floating island ──
  const islandGrp = new THREE.Group();
  scene.add(islandGrp);

  // Top disc (grass)
  const grassMat = new THREE.MeshStandardMaterial({ color: palette.grass, flatShading: true, roughness: 0.95 });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(9, 8.6, 0.5, 56), grassMat);
  top.position.y = -0.25;
  top.receiveShadow = true;
  islandGrp.add(top);

  // Cliff (tapered cone underside)
  const cliffMat = new THREE.MeshStandardMaterial({ color: palette.cliff, flatShading: true, roughness: 1 });
  const cliff = new THREE.Mesh(new THREE.CylinderGeometry(8.6, 4.2, 5, 56), cliffMat);
  cliff.position.y = -3.0;
  islandGrp.add(cliff);

  // Bottom tip (sharper cone)
  const tipMat = new THREE.MeshStandardMaterial({ color: palette.cliffDark, flatShading: true });
  const tip = new THREE.Mesh(new THREE.ConeGeometry(4.2, 4, 36), tipMat);
  tip.position.y = -7.5;
  tip.rotation.y = Math.PI / 36;
  islandGrp.add(tip);

  // Subtle dirt patches on grass
  const dirtMat = new THREE.MeshStandardMaterial({ color: palette.grassDark, flatShading: true, roughness: 0.95 });
  for (let i = 0; i < 6; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 2 + Math.random() * 5.5;
    const patch = new THREE.Mesh(new THREE.CircleGeometry(0.5 + Math.random() * 0.8, 8), dirtMat);
    patch.rotation.x = -Math.PI / 2;
    patch.position.set(Math.cos(a) * r, 0.01, Math.sin(a) * r);
    patch.receiveShadow = true;
    islandGrp.add(patch);
  }

  // Path stones leading around
  const stoneMat = new THREE.MeshStandardMaterial({ color: palette.pathStone, flatShading: true });
  const pathPoints = [
    [0, 2.8], [1.2, 3.0], [2.4, 2.6], [3.2, 1.4], [3.0, 0.2], [2.0, -0.6],
    [0.6, -0.4], [-0.8, 0.2], [-2.2, 0.4], [-3.0, 1.4], [-2.6, 2.6], [-1.4, 3.0]
  ];
  pathPoints.forEach(([x, z]) => {
    const stone = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.08, 0.4),
      stoneMat
    );
    stone.position.set(x + (Math.random() - 0.5) * 0.2, 0.04, z + (Math.random() - 0.5) * 0.2);
    stone.rotation.y = Math.random() * Math.PI;
    stone.receiveShadow = true;
    islandGrp.add(stone);
  });

  // ── Mountain ──
  const mountainMat = new THREE.MeshStandardMaterial({ color: palette.mountain, flatShading: true, roughness: 1 });
  const mountain = new THREE.Mesh(new THREE.ConeGeometry(2.6, 4.6, 7), mountainMat);
  mountain.position.set(-3.6, 2.3, -4.5);
  mountain.rotation.y = 0.4;
  mountain.castShadow = true;
  mountain.receiveShadow = true;
  islandGrp.add(mountain);

  // smaller back-up mountain
  const mountain2 = new THREE.Mesh(new THREE.ConeGeometry(1.8, 3.0, 6), 
    new THREE.MeshStandardMaterial({ color: palette.mountainDark, flatShading: true }));
  mountain2.position.set(-5.6, 1.5, -3.2);
  mountain2.castShadow = true;
  mountain2.receiveShadow = true;
  islandGrp.add(mountain2);

  // Snow cap
  const snowMat = new THREE.MeshStandardMaterial({ color: palette.snow, flatShading: true });
  const snow = new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.3, 7), snowMat);
  snow.position.set(-3.6, 4.1, -4.5);
  snow.rotation.y = 0.4;
  islandGrp.add(snow);

  // ── Trees ──
  function makeTree(x, z, scale, leafColor) {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.13, 0.55, 5),
      new THREE.MeshStandardMaterial({ color: palette.treeTrunk, flatShading: true })
    );
    trunk.position.y = 0.275;
    const top1 = new THREE.Mesh(
      new THREE.ConeGeometry(0.55, 1.1, 6),
      new THREE.MeshStandardMaterial({ color: leafColor, flatShading: true })
    );
    top1.position.y = 1.0;
    const top2 = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 0.9, 6),
      new THREE.MeshStandardMaterial({ color: leafColor, flatShading: true })
    );
    top2.position.y = 1.55;
    g.add(trunk, top1, top2);
    g.position.set(x, 0, z);
    g.scale.setScalar(scale);
    g.rotation.y = Math.random() * Math.PI * 2;
    g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  // Scatter trees (avoid hotspot zones in front)
  const treeColors = [palette.treeLeaves1, palette.treeLeaves2, palette.treeLeaves3];
  const treeSpots = [
    [-1.5, -3.5], [0.6, -4.2], [2.4, -3.4], [4.2, -3], [5.7, -1.6],
    [6.2, 0.8], [5.4, 2.6], [-4.4, -1.6], [-5.4, 0.6], [-4.8, 2.6],
    [-3.6, 4.4], [-1.6, 5.4], [3.2, 5.0], [4.8, 3.6], [-3.0, -3.0],
    [1.6, -5.2], [-6.0, -0.6], [4.2, 4.6], [2.4, 3.4]
  ];
  treeSpots.forEach(([x, z]) => {
    const s = 0.7 + Math.random() * 0.55;
    const c = treeColors[Math.floor(Math.random() * treeColors.length)];
    islandGrp.add(makeTree(x, z, s, c));
  });

  // ── Rocks ──
  function makeRock(x, z, scale) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.35, 0),
      new THREE.MeshStandardMaterial({ color: palette.cliff, flatShading: true })
    );
    rock.position.set(x, 0.15 * scale, z);
    rock.scale.setScalar(scale);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.castShadow = true; rock.receiveShadow = true;
    return rock;
  }
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 4 + Math.random() * 4;
    islandGrp.add(makeRock(Math.cos(a) * r, Math.sin(a) * r, 0.4 + Math.random() * 0.6));
  }

  // small flowers/pebbles dots
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 1.5 + Math.random() * 6;
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 6, 6),
      new THREE.MeshStandardMaterial({ color: i % 3 === 0 ? palette.snow : palette.grassDark, flatShading: true })
    );
    dot.position.set(Math.cos(a) * r, 0.06, Math.sin(a) * r);
    islandGrp.add(dot);
  }

  // ── Hotspots ──
  const hotspots = []; // list of THREE.Group with userData.hotspot

  function tagHotspot(group, id, anchorY) {
    const meta = WORLD_HOTSPOTS.find(h => h.id === id);
    group.userData.hotspot = { ...meta, anchorY: anchorY };
    hotspots.push(group);

    // glow ring under hotspot
    const ringMat = new THREE.MeshBasicMaterial({
      color: palette.houseRoof, transparent: true, opacity: 0.0, side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.85, 32), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    ring.userData.isRing = true;
    ring.raycast = function(){}; // disable raycast for invisible ring
    group.add(ring);
    group.userData.ring = ring;

    // make every mesh inside aware of the hotspot
    group.traverse(o => {
      if (o.isMesh && !o.userData.isRing) {
        o.userData.hotspotId = id;
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }

  // — Character (ABOUT) — front-center
  function makeCharacter() {
    const g = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: palette.skin, flatShading: true });
    const shirtMat = new THREE.MeshStandardMaterial({ color: palette.shirt, flatShading: true });
    const pantsMat = new THREE.MeshStandardMaterial({ color: palette.pants, flatShading: true });
    const hairMat = new THREE.MeshStandardMaterial({ color: palette.hair, flatShading: true });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.22), shirtMat);
    body.position.y = 0.72;
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.24), skinMat);
    head.position.y = 1.08;
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.26), hairMat);
    hair.position.y = 1.22;
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.45, 0.15), pantsMat);
    legL.position.set(-0.09, 0.28, 0);
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.45, 0.15), pantsMat);
    legR.position.set(0.09, 0.28, 0);
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.12), shirtMat);
    armL.position.set(-0.22, 0.72, 0);
    armL.rotation.z = 0.1;
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.12), shirtMat);
    armR.position.set(0.22, 0.72, 0);
    armR.rotation.z = -0.1;
    // little feet
    const footL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.2), pantsMat);
    footL.position.set(-0.09, 0.03, 0.03);
    const footR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.2), pantsMat);
    footR.position.set(0.09, 0.03, 0.03);
    g.add(body, head, hair, legL, legR, armL, armR, footL, footR);
    g.userData.bobAmp = 0.04;
    return g;
  }
  const character = makeCharacter();
  character.position.set(0.5, 0, 4.5);
  character.rotation.y = -0.2;
  character.scale.setScalar(1.25);
  // default rotation faces +z which is toward camera — perfect
  islandGrp.add(character);
  tagHotspot(character, 'about', 1.4);

  // — Laptop on desk (PROJECTS) — right side
  function makeDeskLaptop() {
    const g = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: palette.deskWood, flatShading: true });
    const topMat = new THREE.MeshStandardMaterial({ color: palette.deskTop, flatShading: true });

    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.9), topMat);
    deskTop.position.y = 0.74;
    g.add(deskTop);
    [[-0.6, -0.4], [0.6, -0.4], [-0.6, 0.4], [0.6, 0.4]].forEach(([x, z]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.08), woodMat);
      leg.position.set(x, 0.35, z);
      g.add(leg);
    });

    // Laptop base
    const lapMat = new THREE.MeshStandardMaterial({ color: palette.laptop, flatShading: true });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.46), lapMat);
    base.position.set(0, 0.8, 0);
    g.add(base);

    // Laptop screen — pivot
    const screenPivot = new THREE.Group();
    screenPivot.position.set(0, 0.82, -0.22);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.04), lapMat);
    screen.position.y = 0.225;
    screenPivot.add(screen);
    // glow
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.6, 0.36),
      new THREE.MeshBasicMaterial({ color: palette.laptopGlow })
    );
    glow.position.set(0, 0.225, 0.025);
    screenPivot.add(glow);
    // tilt
    screenPivot.rotation.x = -0.15;
    g.add(screenPivot);

    // small mug on desk
    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.12, 12),
      new THREE.MeshStandardMaterial({ color: palette.house, flatShading: true })
    );
    mug.position.set(0.45, 0.84, 0.2);
    g.add(mug);

    // notebook
    const nb = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.02, 0.36),
      new THREE.MeshStandardMaterial({ color: palette.book2, flatShading: true })
    );
    nb.position.set(-0.45, 0.79, 0.18);
    nb.rotation.y = 0.2;
    g.add(nb);

    return g;
  }
  const desk = makeDeskLaptop();
  desk.position.set(3.5, 0, 0.5);
  desk.rotation.y = -0.6;
  islandGrp.add(desk);
  tagHotspot(desk, 'projects', 1.4);

  // — Bookshelf / library (SKILLS) — left side
  function makeBookshelf() {
    const g = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: palette.deskWood, flatShading: true });
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.8, 0.08), woodMat);
    back.position.y = 0.9;
    g.add(back);
    const sL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 0.45), woodMat);
    sL.position.set(-0.66, 0.9, 0.22);
    g.add(sL);
    const sR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 0.45), woodMat);
    sR.position.set(0.66, 0.9, 0.22);
    g.add(sR);
    for (let i = 0; i < 4; i++) {
      const sh = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.05, 0.42), woodMat);
      sh.position.set(0, 0.15 + i * 0.45, 0.22);
      g.add(sh);
    }
    // books
    const colors = [palette.book1, palette.book2, palette.book3, palette.book4];
    for (let row = 0; row < 4; row++) {
      let x = -0.56;
      while (x < 0.5) {
        const w = 0.07 + Math.random() * 0.07;
        const h = 0.28 + Math.random() * 0.08;
        const c = colors[Math.floor(Math.random() * colors.length)];
        const book = new THREE.Mesh(
          new THREE.BoxGeometry(w, h, 0.3),
          new THREE.MeshStandardMaterial({ color: c, flatShading: true })
        );
        book.position.set(x + w / 2, 0.18 + row * 0.45 + h / 2, 0.22);
        g.add(book);
        x += w + 0.006;
      }
    }
    // roof
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.08, 0.55),
      new THREE.MeshStandardMaterial({ color: palette.houseRoof, flatShading: true })
    );
    roof.position.set(0, 1.84, 0.22);
    g.add(roof);
    return g;
  }
  const shelf = makeBookshelf();
  shelf.position.set(-3.2, 0, 1);
  shelf.rotation.y = 0.7;
  islandGrp.add(shelf);
  tagHotspot(shelf, 'skills', 2.2);

  // — Mailbox (CONTACT) — front-right
  function makeMailbox() {
    const g = new THREE.Group();
    const post = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.85, 0.09),
      new THREE.MeshStandardMaterial({ color: palette.deskWood, flatShading: true })
    );
    post.position.y = 0.425;
    g.add(post);
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.32, 0.36),
      new THREE.MeshStandardMaterial({ color: palette.mailbox, flatShading: true })
    );
    box.position.y = 1.0;
    g.add(box);
    // roof — half cylinder
    const roof = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.55, 20, 1, false, 0, Math.PI),
      new THREE.MeshStandardMaterial({ color: palette.mailbox, flatShading: true })
    );
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.18;
    g.add(roof);
    // flag
    const flag = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.1, 0.02),
      new THREE.MeshStandardMaterial({ color: palette.snow, flatShading: true })
    );
    flag.position.set(0.34, 1.08, 0);
    g.add(flag);
    // slot
    const slot = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.04, 0.005),
      new THREE.MeshStandardMaterial({ color: 0x1a1008, flatShading: true })
    );
    slot.position.set(0, 1.02, 0.181);
    g.add(slot);
    g.userData.bobAmp = 0;
    return g;
  }
  const mailbox = makeMailbox();
  mailbox.position.set(-2.6, 0, 4.0);
  mailbox.rotation.y = 0.4;
  islandGrp.add(mailbox);
  tagHotspot(mailbox, 'contact', 1.5);

  // ── Floating dust particles ──
  const pCount = 60;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i*3]   = (Math.random() - 0.5) * 18;
    pPos[i*3+1] = Math.random() * 6 + 0.5;
    pPos[i*3+2] = (Math.random() - 0.5) * 18;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: palette.snow, size: 0.06, transparent: true, opacity: 0.55, sizeAttenuation: true
  });
  const dust = new THREE.Points(pGeo, pMat);
  scene.add(dust);

  // ── Birds (a couple drifting) ──
  function makeBird(angle, radius, h, dir) {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: palette.cliffDark });
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.04), mat);
    g.add(v);
    g.userData = { angle, radius, h, dir, mat };
    return g;
  }
  const birds = [
    makeBird(0, 12, 5, 1),
    makeBird(Math.PI, 14, 6, 1),
    makeBird(Math.PI * 0.5, 11, 4.5, -1)
  ];
  birds.forEach(b => scene.add(b));

  return { scene, hotspots, islandGrp, dust, birds, lights: { key, rim, amb, hemi } };
}

// ────────────────────────────────────────────────────────────
// Main React component
function World3D({ palette, autoRotate, onHover, onSelect, focusId }) {
  const wrapRef = React.useRef(null);
  const stateRef = React.useRef({
    rotY: 0, targetRotY: 0,
    dragging: false, startX: 0, startRot: 0, totalMove: 0,
    autoRotate, hovered: null, selectedId: null,
    raycaster: null, mouse: { x: 9999, y: 9999, has: false }
  });
  // keep autoRotate in sync without re-init
  React.useEffect(() => { stateRef.current.autoRotate = autoRotate; }, [autoRotate]);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !window.THREE) return;
    const THREE = window.THREE;

    const w = wrap.clientWidth, h = wrap.clientHeight;

    const camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 100);
    camera.position.set(0, 7.2, 17);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);

    const { scene, hotspots, islandGrp, dust, birds } = buildScene(THREE, palette);

    // pivot rotates the entire island for drag-to-explore
    // We rotate islandGrp instead — same effect.

    const raycaster = new THREE.Raycaster();
    stateRef.current.raycaster = raycaster;

    // ── Pointer handling ──
    const canvas = renderer.domElement;
    const onPointerDown = (e) => {
      const s = stateRef.current;
      s.dragging = true;
      s.startX = e.clientX;
      s.startRot = islandGrp.rotation.y;
      s.totalMove = 0;
      try { if (e.pointerId != null) canvas.setPointerCapture?.(e.pointerId); } catch(_) {}
      wrap.classList.add('grabbing');
    };
    const onPointerMove = (e) => {
      const s = stateRef.current;
      // update mouse normalized coords for raycaster
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      s.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      s.mouse.has = true;
      s.mouse.clientX = e.clientX;
      s.mouse.clientY = e.clientY;

      if (s.dragging) {
        const dx = e.clientX - s.startX;
        s.totalMove += Math.abs(dx);
        s.targetRotY = s.startRot + dx * 0.008;
        // fire first-drag event
        if (!s._everDragged) {
          s._everDragged = true;
          if (onSelect) onSelect.__firstDrag?.();
        }
      }
    };
    const onPointerUp = (e) => {
      const s = stateRef.current;
      if (!s.dragging) return;
      s.dragging = false;
      wrap.classList.remove('grabbing');
      // click if not dragged
      if (s.totalMove < 5 && s.hovered) {
        if (onSelect) onSelect(s.hovered);
      }
    };
    const onPointerLeave = () => {
      const s = stateRef.current;
      s.mouse.has = false;
      if (s.hovered) {
        s.hovered = null;
        if (onHover) onHover(null, 0, 0);
      }
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);

    // touch (basic)
    const onTouchStart = (e) => {
      if (!e.touches[0]) return;
      onPointerDown({ clientX: e.touches[0].clientX, pointerId: 1 });
    };
    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      onPointerMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    };
    const onTouchEnd = () => onPointerUp({ pointerId: 1 });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // ── Animation loop ──
    let raf, t0 = performance.now();
    const tmpVec = new THREE.Vector3();
    const tmp2 = new THREE.Vector3();

    const animate = () => {
      const t = (performance.now() - t0) / 1000;
      const s = stateRef.current;

      // auto-rotate slowly when not dragging
      if (s.autoRotate && !s.dragging) {
        s.targetRotY += 0.0008;
      }
      // ease
      s.rotY += (s.targetRotY - s.rotY) * 0.12;
      islandGrp.rotation.y = s.rotY;

      // bob hotspots gently
      hotspots.forEach((hg, i) => {
        const amp = hg.userData.bobAmp ?? 0.025;
        hg.position.y = Math.sin(t * 1.5 + i * 1.7) * amp;
        // animate ring on hover/select
        const ring = hg.userData.ring;
        if (ring) {
          const isHov = s.hovered === hg || s.selectedId === hg.userData.hotspot.id;
          const targetOp = isHov ? 0.55 : 0.0;
          ring.material.opacity += (targetOp - ring.material.opacity) * 0.15;
          ring.scale.setScalar(1 + Math.sin(t * 3) * 0.05);
        }
      });

      // dust drift
      dust.rotation.y = t * 0.02;
      const dpos = dust.geometry.attributes.position;
      for (let i = 0; i < dpos.count; i++) {
        const y = dpos.array[i * 3 + 1];
        dpos.array[i * 3 + 1] = y + Math.sin(t * 0.5 + i) * 0.0008;
      }
      dpos.needsUpdate = true;

      // birds drift
      birds.forEach((b, i) => {
        b.userData.angle += 0.003 * b.userData.dir;
        b.position.set(
          Math.cos(b.userData.angle) * b.userData.radius,
          b.userData.h + Math.sin(t * 0.6 + i) * 0.3,
          Math.sin(b.userData.angle) * b.userData.radius
        );
        b.lookAt(
          Math.cos(b.userData.angle + 0.1 * b.userData.dir) * b.userData.radius,
          b.userData.h,
          Math.sin(b.userData.angle + 0.1 * b.userData.dir) * b.userData.radius
        );
      });

      // raycast for hover
      if (s.mouse.has) {
        raycaster.setFromCamera(s.mouse, camera);
        const intersects = raycaster.intersectObjects(hotspots, true);
        let hovered = null;
        if (intersects.length > 0) {
          let o = intersects[0].object;
          while (o && !o.userData.hotspot) o = o.parent;
          hovered = o || null;
        }
        if (hovered !== s.hovered) {
          s.hovered = hovered;
          canvas.style.cursor = hovered ? 'pointer' : (s.dragging ? 'grabbing' : 'grab');
          if (onHover) {
            if (hovered) {
              onHover(hovered.userData.hotspot, s.mouse.clientX, s.mouse.clientY);
            } else {
              onHover(null, 0, 0);
            }
          }
        } else if (hovered && onHover) {
          // keep position updated even when same hotspot
          onHover(hovered.userData.hotspot, s.mouse.clientX, s.mouse.clientY);
        }
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // resize
    const onResize = () => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Expose imperative focus
    stateRef.current.focusHotspot = (id) => {
      const hg = hotspots.find(h => h.userData.hotspot.id === id);
      if (!hg) return;
      const local = hg.position;
      const targetAngle = -Math.atan2(local.x, local.z);
      // pick shortest path from current rotY
      const TWO_PI = Math.PI * 2;
      const current = stateRef.current.rotY;
      let t = targetAngle;
      while (t - current > Math.PI) t -= TWO_PI;
      while (t - current < -Math.PI) t += TWO_PI;
      stateRef.current.targetRotY = t;
      stateRef.current.selectedId = id;
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      // dispose
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose?.();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose?.());
          else o.material.dispose?.();
        }
      });
      renderer.dispose();
      if (canvas.parentNode === wrap) wrap.removeChild(canvas);
    };
  }, [palette]); // rebuild on palette change

  // focus when focusId changes
  React.useEffect(() => {
    if (focusId && stateRef.current.focusHotspot) {
      stateRef.current.focusHotspot(focusId);
    }
    stateRef.current.selectedId = focusId;
  }, [focusId]);

  return <div ref={wrapRef} className="world-canvas-wrap" />;
}

window.World3D = World3D;
