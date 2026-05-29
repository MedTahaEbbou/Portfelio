// ----------------------------------------
// Phone Shell Manager & Engine
// ----------------------------------------
let phoneData = null;
let activeLang = localStorage.getItem('lang') || 'en';
let enteredPasscode = '';
let correctPasscodeAttempts = 0;
const correctPasscode = '00652123';

// Resolve database path depending on folder depth
const basePath = window.activeApp ? '../' : './';
const dbPath = basePath + 'data.json';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const apiEndpoint = isLocal ? (basePath + 'data.php') : 'https://acchouse.online/mee/data.php';
const mediaBase = isLocal ? basePath : 'https://acchouse.online/mee/';

const defaultFallback = {
    "menuLinks": [
        { "id": "nav_profile", "url": "about", "text": { "en": "About Me", "fr": "À Propos", "ar": "الملف المهني" } },
        { "id": "nav_projects", "url": "projects", "text": { "en": "Projects", "fr": "Projets", "ar": "المشاريع" } },
        { "id": "nav_activities", "url": "activities", "text": { "en": "Activities", "fr": "Activités", "ar": "النشاطات والأخبار" } },
        { "id": "nav_admin", "url": "admin", "text": { "en": "Admin", "fr": "Administration", "ar": "لوحة التحكم" } }
    ],
    "translations": {
        "en": {
            "hero_role": "Software Developer & Financial Consultant",
            "back_portfolio": "Back to Home",
            "section_about": "About Me",
            "section_projects": "Projects",
            "section_activities": "Activities & News",
            "section_contact": "Contact Info",
            "section_admin": "Admin Settings",
            "no_activities": "No activities listed yet."
        },
        "fr": {
            "hero_role": "Développeur Logiciel & Consultant Financier",
            "back_portfolio": "Retour Accueil",
            "section_about": "À Propos",
            "section_projects": "Projets",
            "section_activities": "Activités & Actualités",
            "section_contact": "Contact Info",
            "section_admin": "Admin Settings",
            "no_activities": "Aucune activité listée."
        },
        "ar": {
            "hero_role": "مطور برمجيات ومستشار مالي",
            "back_portfolio": "العودة للرئيسية",
            "section_about": "الملف المهني",
            "section_projects": "المشاريع والمؤلفات",
            "section_activities": "النشاطات والأخبار",
            "section_contact": "معلومات الاتصال",
            "section_admin": "لوحة التحكم",
            "no_activities": "لا توجد نشاطات حالياً."
        }
    },
    "ventures": [
        { "id": "v1", "icon": "fas fa-building", "title": { "en": "The Accounting House", "fr": "The Accounting House", "ar": "دار المحاسبة" }, "date": { "en": "Jun 2025 - Present", "fr": "Juin 2025 - Présent", "ar": "يونيو 2025 - الحاضر" }, "desc": { "en": "Founder. Accounting firm.", "fr": "Fondateur. Cabinet comptable.", "ar": "المؤسس. مكتب استشارات ومحاسبة." } }
    ],
    "experience": [],
    "skills": [],
    "education": [],
    "certifications": [],
    "interests": [],
    "contact": { "email": "mts.mouhamedtaha@gmail.com", "whatsapp": "+22244508860", "phone": "+222 44.50.88.60", "location": { "en": "AinTalh - Nouakchott", "fr": "AinTalh - Nouakchott", "ar": "عين الطلح - نواكشوط" } },
    "activities": []
};

// ----------------------------------------
// Init Routine
// ----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    // Add layout base body class
    document.body.classList.add('phone-mode-active');
    
    // Load Database Content
    let loaded = false;
    try {
        // Try dynamic data.php endpoint first
        const response = await fetch(apiEndpoint);
        if (response.ok) {
            phoneData = await response.json();
            loaded = true;
            console.log("Loaded data dynamically from MySQL database.");
        }
    } catch (e) {
        console.warn('data.php unavailable. Trying static data.json fallback.', e);
    }
    
    if (!loaded) {
        try {
            const response = await fetch(basePath + 'data.json');
            if (response.ok) {
                phoneData = await response.json();
                loaded = true;
                console.log("Loaded data from static data.json file.");
            }
        } catch (e) {
            console.warn('Static data.json load failed. Using fallback copy.', e);
        }
    }
    
    if (!loaded) {
        phoneData = defaultFallback;
    }

    // Build the Device elements
    buildDeviceShell();
    
    // Load animations and updates
    updateLiveClock();
    setInterval(updateLiveClock, 15000);
    
    initWallpaperConstellation();
    
    // Bind Device Hardware Keys
    bindHardwareButtons();

    // Trigger Initial Page State Setup
    setPhoneLanguage(activeLang);

    if (window.activeApp) {
        // Launch Sub-App directly if routing clean URL path
        openAppView(window.activeApp, true);
    } else {
        // Render Homescreen
        renderHomeScreen();
    }
});

// ----------------------------------------
// Dynamic HTML Shell Builders
// ----------------------------------------
function buildDeviceShell() {
    // 1. Ambient Background Layer
    const ambientBg = document.createElement('canvas');
    ambientBg.className = 'phone-ambient-bg';
    ambientBg.id = 'ambient-canvas';
    document.body.appendChild(ambientBg);

    // 2. Main Phone Container
    const device = document.createElement('div');
    device.className = 'phone-device';
    device.id = 'phone-wrapper';
    
    // Casing hardware buttons
    device.innerHTML = `
        <div class="phone-button volume-up" title="Volume Up"></div>
        <div class="phone-button volume-down" title="Volume Down"></div>
        <div class="phone-button power-btn" title="Power Key"></div>
        <div class="phone-screen">
            <!-- Constellation wallpaper -->
            <canvas class="phone-wallpaper-canvas" id="wallpaper-canvas"></canvas>
            
            <!-- Specular 3D Glass Reflection Sheen -->
            <div class="phone-reflection" id="phone-reflection"></div>
            
            <!-- Status Header -->
            <div class="phone-header">
                <div class="status-bar">
                    <span class="status-time" id="status-time">09:41</span>
                    <div class="dynamic-island" id="dynamic-island">
                        <div class="dynamic-island-camera"></div>
                    </div>
                    <div class="status-icons">
                        <i class="fas fa-signal"></i>
                        <i class="fas fa-wifi"></i>
                        <i class="fas fa-battery-three-quarters"></i>
                    </div>
                </div>
            </div>

            <!-- Launcher / App Viewport -->
            <div class="phone-content" id="phone-content">
                <!-- Homescreen is loaded here -->
            </div>

            <!-- Passcode Screen (Gating Admin) -->
            <div class="passcode-screen" id="passcode-screen">
                <div class="passcode-lock-icon"><i class="fas fa-lock"></i></div>
                <div class="passcode-prompt" data-i18n="lock_passcode">Enter Passcode</div>
                <div class="passcode-dots">
                    <div class="passcode-dot"></div>
                    <div class="passcode-dot"></div>
                    <div class="passcode-dot"></div>
                    <div class="passcode-dot"></div>
                    <div class="passcode-dot"></div>
                    <div class="passcode-dot"></div>
                    <div class="passcode-dot"></div>
                    <div class="passcode-dot"></div>
                </div>
                <div class="passcode-keypad">
                    <div class="keypad-btn" onclick="pressPasscodeKey('1')">1<span class="keypad-subtitle">&nbsp;</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('2')">2<span class="keypad-subtitle">abc</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('3')">3<span class="keypad-subtitle">def</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('4')">4<span class="keypad-subtitle">ghi</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('5')">5<span class="keypad-subtitle">jkl</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('6')">6<span class="keypad-subtitle">mno</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('7')">7<span class="keypad-subtitle">pqrs</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('8')">8<span class="keypad-subtitle">tuv</span></div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('9')">9<span class="keypad-subtitle">wxyz</span></div>
                    <div class="keypad-btn action-btn" onclick="cancelPasscode()">Cancel</div>
                    <div class="keypad-btn" onclick="pressPasscodeKey('0')">0<span class="keypad-subtitle">+</span></div>
                    <div class="keypad-btn action-btn" onclick="backspacePasscode()"><i class="fas fa-backspace"></i></div>
                </div>
            </div>

            <!-- iOS Home Indicator Close pill -->
            <div class="home-indicator-bar" id="home-indicator" onclick="closeActiveApp()">
                <div class="indicator-line"></div>
            </div>
        </div>
    `;

    document.body.appendChild(device);

    // Bind tilt 3D depth to device on desktop
    bindDevice3DTilt();
}

// ----------------------------------------
// Hardware Button Interactions
// ----------------------------------------
function bindHardwareButtons() {
    const power = document.querySelector('.power-btn');
    const dynamicIsland = document.getElementById('dynamic-island');
    const volUp = document.querySelector('.volume-up');
    const volDown = document.querySelector('.volume-down');

    if (power) {
        power.addEventListener('click', () => {
            // Pulsing expand Dynamic Island notification simulation
            dynamicIsland.style.width = '240px';
            dynamicIsland.style.height = '35px';
            setTimeout(() => {
                dynamicIsland.style.width = '110px';
                dynamicIsland.style.height = '30px';
            }, 2500);
        });
    }

    if (volUp) {
        volUp.addEventListener('click', () => {
            addIslandBubble('Volume +');
        });
    }

    if (volDown) {
        volDown.addEventListener('click', () => {
            addIslandBubble('Volume -');
        });
    }
}

function addIslandBubble(text) {
    const island = document.getElementById('dynamic-island');
    if (!island) return;
    
    // Clear inner camera
    island.innerHTML = `<span style="color:white; font-size:0.68rem; font-weight:700; margin: auto; opacity:0; transition:opacity 0.2s;">${text}</span><div class="dynamic-island-camera"></div>`;
    island.style.width = '160px';
    
    const textEl = island.querySelector('span');
    setTimeout(() => { if (textEl) textEl.style.opacity = '1'; }, 100);

    setTimeout(() => {
        if (textEl) textEl.style.opacity = '0';
        setTimeout(() => {
            island.innerHTML = `<div class="dynamic-island-camera"></div>`;
            island.style.width = '110px';
        }, 150);
    }, 1800);
}

// ----------------------------------------
// Clock status bar
// ----------------------------------------
function updateLiveClock() {
    const clock = document.getElementById('status-time');
    if (!clock) return;
    
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    clock.innerText = `${hours}:${minutes}`;
}

// ----------------------------------------
// Wallpaper Constellation Animation
// ----------------------------------------
function initWallpaperConstellation() {
    const canvas = document.getElementById('wallpaper-canvas');
    const ambient = document.getElementById('ambient-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const actx = ambient ? ambient.getContext('2d') : null;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    if (ambient) {
        ambient.width = window.innerWidth;
        ambient.height = window.innerHeight;
    }

    window.addEventListener('resize', () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        if (ambient) {
            ambient.width = window.innerWidth;
            ambient.height = window.innerHeight;
        }
    });

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 2 + 1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(102, 126, 234, 0.4)';

        particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            // Connections
            for (let j = idx + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 65) {
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.12 * (1 - dist / 65)})`;
                    ctx.lineWidth = 0.65;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        // Copy ambient shadow
        if (actx && ambient) {
            actx.clearRect(0, 0, ambient.width, ambient.height);
            actx.drawImage(canvas, 0, 0, ambient.width, ambient.height);
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// ----------------------------------------
// About View Morphing Blob
// ----------------------------------------
function initAboutMorphingBlob() {
    const canvas = document.getElementById('about-blob-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let time = 0;

    window.addEventListener('resize', () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });

    function drawBlob() {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const r = Math.min(width, height) * 0.35;

        ctx.beginPath();
        const pts = 8;
        for (let i = 0; i < pts; i++) {
            const angle = (i / pts) * Math.PI * 2;
            const wave = Math.sin(time + i * 1.3) * 16 + Math.cos(time * 0.7 + i * 2.1) * 12;
            const radius = r + wave;
            
            const px = cx + Math.cos(angle) * radius;
            const py = cy + Math.sin(angle) * radius;

            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * 1.5);
        grad.addColorStop(0, 'rgba(118, 75, 162, 0.35)');
        grad.addColorStop(0.5, 'rgba(102, 126, 234, 0.15)');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fill();

        time += 0.015;
        requestAnimationFrame(drawBlob);
    }

    drawBlob();
}

// ----------------------------------------
// Render App Launch Views
// ----------------------------------------
function renderHomeScreen() {
    const container = document.getElementById('phone-content');
    if (!container) return;

    // Save pre-existing admin element if it contains dashboard markup
    const existingAdmin = document.getElementById('viewport-admin');

    const welcome = phoneData.translations[activeLang]?.hero_role || 'Developer';
    const contact = phoneData.contact || {};
    const avatarPath = phoneData.avatar || 'assets/profile image/en - fr profile.png';
    const logoUrl = avatarPath.startsWith('uploads/') ? (mediaBase + avatarPath) : (basePath + avatarPath);

    container.innerHTML = `
        <div class="homescreen" id="homescreen-view">
            <!-- Profile Card -->
            <div class="profile-widget">
                <div class="widget-avatar">
                    <img src="${logoUrl}" alt="Avatar" id="widget-avatar-img">
                </div>
                <div class="widget-info">
                    <div class="widget-name">${activeLang === 'ar' ? 'مُحَمَّد طَـٰٓه۪ 𓂆 أُبُّ' : 'Mohamed Taha EBOU'}</div>
                    <div class="widget-role">${welcome}</div>
                </div>
            </div>

            <!-- Contacts widgets -->
            <div class="contacts-widget">
                <a href="mailto:${contact.email}" class="contact-pill">
                    <i class="fas fa-envelope"></i>
                    <span>Mail</span>
                </a>
                <a href="https://wa.me/${contact.whatsapp?.replace(/\+/g, '')}" target="_blank" class="contact-pill">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </a>
            </div>

            <!-- Language Switcher widget -->
            <div class="switcher-widget">
                <span data-i18n="lang_title">Language</span>
                <div class="lang-buttons-row">
                    <button class="lang-btn ${activeLang === 'en' ? 'active' : ''}" onclick="setPhoneLanguage('en')">EN</button>
                    <button class="lang-btn ${activeLang === 'fr' ? 'active' : ''}" onclick="setPhoneLanguage('fr')">FR</button>
                    <button class="lang-btn ${activeLang === 'ar' ? 'active' : ''}" onclick="setPhoneLanguage('ar')">عربي</button>
                </div>
            </div>

            <!-- App Icon Grid -->
            <div class="app-grid">
                <div class="app-icon-wrapper" onclick="openAppView('about')">
                    <div class="app-icon icon-about"><i class="fas fa-user"></i></div>
                    <div class="app-label" data-i18n="section_about">About Me</div>
                </div>
                <div class="app-icon-wrapper" onclick="openAppView('projects')">
                    <div class="app-icon icon-projects"><i class="fas fa-briefcase"></i></div>
                    <div class="app-label" data-i18n="section_projects">Projects</div>
                </div>
                <div class="app-icon-wrapper" onclick="openAppView('activities')">
                    <div class="app-icon icon-activities"><i class="fas fa-rss"></i></div>
                    <div class="app-label" data-i18n="section_activities">Activities</div>
                </div>
                <div class="app-icon-wrapper" onclick="openAppView('admin')">
                    <div class="app-icon icon-admin"><i class="fas fa-lock"></i></div>
                    <div class="app-label" data-i18n="section_admin">Admin</div>
                </div>
            </div>
        </div>
        
        <!-- App Viewports -->
        <div class="app-viewport" id="viewport-about"></div>
        <div class="app-viewport" id="viewport-projects"></div>
        <div class="app-viewport" id="viewport-activities"></div>
        <div class="app-viewport" id="viewport-admin"></div>
    `;

    // Restore the pre-existing admin element if found
    if (existingAdmin && existingAdmin.innerHTML.trim() !== '') {
        const placeholderAdmin = document.getElementById('viewport-admin');
        if (placeholderAdmin) placeholderAdmin.remove();
        container.appendChild(existingAdmin);
    }

    // Localize dynamic texts
    applyTextTranslations();
}

// ----------------------------------------
// Launch App View logic
// ----------------------------------------
function openAppView(appName, directLaunch = false) {
    if (appName === 'admin') {
        if (window.activeApp === 'admin') {
            const passcodeScreen = document.getElementById('passcode-screen');
            if (passcodeScreen) passcodeScreen.classList.add('active');
        } else {
            window.location.href = basePath + 'admin/index.html';
        }
        return;
    }

    // Render respective content first
    if (appName === 'about') renderAboutApp();
    if (appName === 'projects') renderProjectsApp();
    if (appName === 'activities') renderActivitiesApp();

    const viewport = document.getElementById(`viewport-${appName}`);
    if (viewport) {
        // Activate
        viewport.classList.add('active');
    }
}

window.closeActiveApp = function() {
    const activeViewport = document.querySelector('.app-viewport.active');
    if (!activeViewport) {
        // Already on home screen, or passcode screen is active
        const passcode = document.getElementById('passcode-screen');
        if (passcode && passcode.classList.contains('active')) {
            cancelPasscode();
        }
        return;
    }

    const appName = activeViewport.id.replace('viewport-', '');

    // Check if clean URL subdirectory
    if (window.activeApp) {
        // Clean URL routing: Exit redirect back to home page root `/`
        activeViewport.classList.remove('active');
        activeViewport.classList.add('closing');
        setTimeout(() => {
            window.location.href = basePath + 'index.html';
        }, 300);
    } else {
        // SPA state: Anim close
        activeViewport.classList.remove('active');
        activeViewport.classList.add('closing');
        setTimeout(() => {
            activeViewport.classList.remove('closing');
        }, 350);
    }
}

// ----------------------------------------
// Render Apps Contents
// ----------------------------------------
function renderAboutApp() {
    const vp = document.getElementById('viewport-about');
    if (!vp) return;

    const t = phoneData.translations[activeLang] || {};
    const skills = phoneData.skills || [];
    const edu = phoneData.education || [];
    const certs = phoneData.certifications || [];
    const interests = phoneData.interests || [];

    vp.innerHTML = `
        <div class="app-container-inner">
            <canvas class="about-blob-canvas" id="about-blob-canvas"></canvas>
            <div class="about-scrollable">
                <div class="app-header-title">${t.section_about || 'About Me'}</div>
                <div class="app-header-subtitle">Professional profile, background and highlights</div>

                <!-- Bio description -->
                <div class="glass-card" style="padding: 16px;">
                    <p style="font-size:0.88rem; line-height:1.6; color:var(--text-color);">${t.profile_desc || ''}</p>
                </div>

                <!-- Skills -->
                <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--primary);">Skills</h4>
                    <div class="skills-grid" style="display:flex; flex-wrap:wrap; gap:8px;">
                        ${skills.map(s => `<div class="skill-tag" style="padding:6px 12px; font-size:0.75rem;">${s}</div>`).join('')}
                    </div>
                </div>

                <!-- Education -->
                <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--primary);">Education</h4>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${edu.map(e => `
                            <div class="glass-card" style="padding: 14px;">
                                <h5 style="font-size:0.85rem; font-weight:700; color:white;">${e.degree[activeLang] || e.degree.en}</h5>
                                <h6 style="font-size:0.75rem; color:var(--primary); margin-top:2px;">${e.school[activeLang] || e.school.en}</h6>
                                <p style="font-size:0.75rem; color:var(--text-muted); margin-top:6px; line-height:1.4;">${e.desc[activeLang] || e.desc.en}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Certifications -->
                <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--primary);">Certifications</h4>
                    <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px;">
                        ${certs.map(c => `
                            <div class="glass-card" style="padding: 12px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:8px;">
                                <i class="${c.icon || 'fas fa-certificate'}" style="font-size:1.4rem; color:var(--accent);"></i>
                                <span style="font-size:0.72rem; font-weight:600; line-height:1.3; color:white;">${c.name[activeLang] || c.name.en}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--primary);">Interests & Hobbies</h4>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${interests.map(i => `
                            <div class="glass-card" style="padding: 12px;">
                                <h5 style="font-size:0.8rem; font-weight:700; color:white;">${i.title[activeLang] || i.title.en}</h5>
                                <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${i.desc[activeLang] || i.desc.en}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Return Button -->
                <div style="text-align: center; margin: 30px 0 15px 0; position: relative; z-index: 10;">
                    <button class="phone-back-btn" onclick="closeActiveApp()" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 20px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-main);">
                        <i class="fas fa-arrow-left"></i>
                        <span data-i18n="back_portfolio">${t.back_portfolio || 'Back to Home'}</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Fire off the morphing blob canvas
    initAboutMorphingBlob();
}

function renderProjectsApp() {
    const vp = document.getElementById('viewport-projects');
    if (!vp) return;

    const t = phoneData.translations[activeLang] || {};
    const ventures = phoneData.ventures || [];

    vp.innerHTML = `
        <div class="app-container-inner">
            <div class="ventures-scrollable">
                <div class="app-header-title">${t.section_projects || 'Projects'}</div>
                <div class="app-header-subtitle">My professional ventures, startups and products</div>

                ${ventures.map(v => `
                    <div class="glass-card tilt-card accent-border" style="padding: 18px; margin-bottom:5px;">
                        <div class="card-icon" style="font-size:1.5rem; margin-bottom:10px; color:var(--primary);"><i class="${v.icon || 'fas fa-building'}"></i></div>
                        <h4 style="font-weight:700; font-size:0.98rem; color:white;">${v.title[activeLang] || v.title.en}</h4>
                        <span style="font-size:0.75rem; color:var(--text-muted); font-style:italic; display:block; margin: 2px 0 8px 0;">${v.date[activeLang] || v.date.en}</span>
                        <p style="font-size:0.8rem; line-height:1.5; color:var(--text-muted);">${v.desc[activeLang] || v.desc.en}</p>
                    </div>
                `).join('')}

                <!-- Return Button -->
                <div style="text-align: center; margin: 30px 0 15px 0;">
                    <button class="phone-back-btn" onclick="closeActiveApp()" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 20px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-main);">
                        <i class="fas fa-arrow-left"></i>
                        <span data-i18n="back_portfolio">${t.back_portfolio || 'Back to Home'}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderActivitiesApp() {
    const vp = document.getElementById('viewport-activities');
    if (!vp) return;

    const t = phoneData.translations[activeLang] || {};
    const acts = phoneData.activities || [];

    let feedHTML = '';
    if (acts.length === 0) {
        feedHTML = `
            <div style="text-align:center; padding:40px 10px; color:var(--text-muted);">
                <i class="far fa-calendar-times" style="font-size:2rem; margin-bottom:10px; opacity:0.5;"></i>
                <p style="font-size:0.8rem;">${t.no_activities || 'No activities found.'}</p>
            </div>
        `;
    } else {
        // Sort descending date
        const sorted = [...acts].sort((a,b) => new Date(b.date) - new Date(a.date));
        feedHTML = `
            <div class="activities-timeline-wrapper">
                ${sorted.map(act => {
                    const title = act.title[activeLang] || act.title.en;
                    const cat = act.category[activeLang] || act.category.en;
                    const desc = act.desc[activeLang] || act.desc.en;
                    
                    let dateStr = act.date;
                    try {
                        dateStr = new Date(act.date).toLocaleDateString(activeLang === 'ar' ? 'ar-EG' : (activeLang === 'fr' ? 'fr-FR' : 'en-US'), {
                            year: 'numeric', month: 'short', day: 'numeric'
                        });
                    } catch(e) {}

                    // Images
                    let imagesHTML = '';
                    if (act.images && act.images.length > 0) {
                        const images = act.images.filter(img => img && img.trim() !== '');
                        if (images.length > 0) {
                            imagesHTML = `
                                <div class="activity-gallery" style="margin-top:10px; gap:8px;">
                                    ${images.map((img, imgIdx) => {
                                        const imgUrl = img.startsWith('uploads/') ? (mediaBase + img) : (basePath + img);
                                        return `
                                            <div class="gallery-img-wrapper" style="flex: 0 0 85px; height: 60px; border-radius: 8px;" onclick="openOverlayLightbox('${act.id}', ${imgIdx})">
                                                <img src="${imgUrl}" alt="thumbnail" onerror="this.src='${basePath}assets/profile image/en - fr profile.png'; this.style.opacity='0.4';">
                                                <div class="gallery-img-overlay" style="font-size:0.8rem;"><i class="fas fa-search-plus"></i></div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            `;
                        }
                    }

                    // Links
                    let linksHTML = '';
                    if (act.links && act.links.length > 0) {
                        linksHTML = `
                            <div class="activity-links" style="margin-top:10px; gap:8px;">
                                ${act.links.map(l => `
                                    <a href="${l.url}" target="_blank" class="activity-link" style="padding:6px 12px; font-size:0.75rem;">
                                        <i class="fas fa-external-link-alt"></i>
                                        <span>${l.label[activeLang] || l.label.en}</span>
                                    </a>
                                `).join('')}
                            </div>
                        `;
                    }

                    return `
                        <div class="activity-card-wrapper">
                            <div class="activity-node"></div>
                            <div class="glass-card activity-card">
                                <div class="activity-meta" style="font-size:0.7rem; margin-bottom:8px;">
                                    <span class="activity-category" style="padding:2px 8px; font-size:0.68rem;">${cat}</span>
                                    <span class="activity-date"><i class="far fa-calendar-alt"></i> ${dateStr}</span>
                                </div>
                                <h4 class="activity-title">${title}</h4>
                                <p class="activity-desc" style="margin-top:5px; font-size:0.78rem; line-height:1.45;">${desc}</p>
                                ${imagesHTML}
                                ${linksHTML}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    vp.innerHTML = `
        <div class="app-container-inner">
            <div class="app-header-title">${t.section_activities || 'Activities'}</div>
            <div class="app-header-subtitle">Interactive feed tracking my events & milestones</div>
            ${feedHTML}

            <!-- Return Button -->
            <div style="text-align: center; margin: 30px 0 15px 0;">
                <button class="phone-back-btn" onclick="closeActiveApp()" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 20px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-main);">
                    <i class="fas fa-arrow-left"></i>
                    <span data-i18n="back_portfolio">${t.back_portfolio || 'Back to Home'}</span>
                </button>
            </div>
        </div>
    `;
}

// Global scope window connector for Lightbox triggering inside the phone
let lightboxImages = [];
let lightboxIndex = 0;

window.openOverlayLightbox = function(activityId, imgIndex) {
    const act = phoneData.activities.find(a => a.id === activityId);
    if (!act) return;

    lightboxImages = act.images.filter(img => img && img.trim() !== '');
    lightboxIndex = imgIndex;

    const modal = document.getElementById('lightbox-modal');
    if (!modal) return; // Make sure lightbox modal exists in body

    updateSharedLightbox();
    modal.classList.add('active');
};

function updateSharedLightbox() {
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (!img) return;

    const currentImg = lightboxImages[lightboxIndex];
    img.src = currentImg.startsWith('uploads/') ? (mediaBase + currentImg) : (basePath + currentImg);
    if (cap) cap.innerText = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

// Binds keys for lightbox
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Escape') modal.classList.remove('active');
    if (e.key === 'ArrowLeft') {
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateSharedLightbox();
    }
    if (e.key === 'ArrowRight') {
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        updateSharedLightbox();
    }
});

// ----------------------------------------
// Passcode Circle key verification
// ----------------------------------------
window.pressPasscodeKey = function(num) {
    if (enteredPasscode.length >= 8) return;
    
    enteredPasscode += num;
    updatePasscodeDots();

    if (enteredPasscode.length === 8) {
        // Validate passcode
        setTimeout(() => {
            if (enteredPasscode === correctPasscode) {
                if (correctPasscodeAttempts === 0) {
                    correctPasscodeAttempts = 1;
                    
                    // Shake and clear (simulated failure)
                    const dotsContainer = document.querySelector('.passcode-dots');
                    if (dotsContainer) dotsContainer.classList.add('shake');
                    
                    const prompt = document.querySelector('.passcode-prompt');
                    let originalText = 'Enter Passcode';
                    if (prompt) {
                        originalText = prompt.innerText;
                        prompt.innerText = activeLang === 'ar' ? 'الرمز غير صحيح' : (activeLang === 'fr' ? 'Code incorrect' : 'Code wrong');
                        prompt.style.color = '#ef4444';
                    }
                    
                    if (typeof addLog === 'function') {
                        addLog('Correct passcode entered, but simulated as wrong (first attempt constraint).', 'error');
                    }
                    
                    setTimeout(() => {
                        if (dotsContainer) dotsContainer.classList.remove('shake');
                        if (prompt) {
                            prompt.innerText = originalText;
                            prompt.style.color = '';
                        }
                        enteredPasscode = '';
                        updatePasscodeDots();
                    }, 1000);
                } else {
                    // Success connection, slide-up lock screen
                    const passcodeScreen = document.getElementById('passcode-screen');
                    if (passcodeScreen) passcodeScreen.classList.remove('active');
                    
                    // Launch Admin Panel settings form inside viewport
                    const viewport = document.getElementById('viewport-admin');
                    if (viewport) viewport.classList.add('active');
                    
                    // Reset correctPasscodeAttempts so it locks again on logout
                    correctPasscodeAttempts = 0;
                    
                    // Reset entered code
                    enteredPasscode = '';
                    updatePasscodeDots();
                    
                    // Initialize Admin dashboard script
                    if (window.initializeAdminApp) {
                        window.initializeAdminApp();
                    }
                }
            } else {
                // Shake and clear
                const dotsContainer = document.querySelector('.passcode-dots');
                if (dotsContainer) dotsContainer.classList.add('shake');
                
                const prompt = document.querySelector('.passcode-prompt');
                let originalText = 'Enter Passcode';
                if (prompt) {
                    originalText = prompt.innerText;
                    prompt.innerText = activeLang === 'ar' ? 'الرمز غير صحيح' : (activeLang === 'fr' ? 'Code incorrect' : 'Code wrong');
                    prompt.style.color = '#ef4444';
                }
                
                if (typeof addLog === 'function') {
                    addLog('Failed passcode attempt entered on lock screen.', 'error');
                }
                
                setTimeout(() => {
                    if (dotsContainer) dotsContainer.classList.remove('shake');
                    if (prompt) {
                        prompt.innerText = originalText;
                        prompt.style.color = '';
                    }
                    enteredPasscode = '';
                    updatePasscodeDots();
                }, 1000);
            }
        }, 200);
    }
};

window.cancelPasscode = function() {
    document.getElementById('passcode-screen').classList.remove('active');
    enteredPasscode = '';
    updatePasscodeDots();
    
    if (window.activeApp === 'admin') {
        // If clean URL was direct admin/ root, exit back home
        window.location.href = basePath + 'index.html';
    }
};

window.backspacePasscode = function() {
    if (enteredPasscode.length > 0) {
        enteredPasscode = enteredPasscode.slice(0, -1);
        updatePasscodeDots();
    }
};

function updatePasscodeDots() {
    const dots = document.querySelectorAll('.passcode-dot');
    dots.forEach((dot, index) => {
        if (index < enteredPasscode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

// ----------------------------------------
// Phone Languages & Switcher
// ----------------------------------------
window.setPhoneLanguage = function(lang) {
    activeLang = lang;
    localStorage.setItem('lang', lang);

    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', lang);
    if (lang === 'ar') {
        htmlEl.setAttribute('dir', 'rtl');
    } else {
        htmlEl.setAttribute('dir', 'ltr');
    }

    // Refresh active views
    const activeViewport = document.querySelector('.app-viewport.active');
    if (activeViewport) {
        const name = activeViewport.id.replace('viewport-', '');
        if (name === 'about') renderAboutApp();
        if (name === 'projects') renderProjectsApp();
        if (name === 'activities') renderActivitiesApp();
    }

    // Refresh widgets on Home screen if loaded
    const avatar = document.getElementById('widget-avatar-img');
    const welcomeText = document.querySelector('.widget-role');
    const widgetName = document.querySelector('.widget-name');
    if (avatar && welcomeText) {
        const avatarPath = phoneData.avatar || (lang === 'ar' ? 'assets/profile image/ar profile.png' : 'assets/profile image/en - fr profile.png');
        const logoUrl = avatarPath.startsWith('uploads/') ? (mediaBase + avatarPath) : (basePath + avatarPath);
        avatar.src = logoUrl;
        welcomeText.innerText = phoneData.translations[lang]?.hero_role || 'Developer';
    }
    if (widgetName) {
        widgetName.innerText = lang === 'ar' ? 'مُحَمَّد طَـٰٓه۪ 𓂆 أُبُّ' : 'Mohamed Taha EBOU';
    }

    // Localize buttons in segment switcher
    const switcherBtns = document.querySelectorAll('.switcher-widget .lang-btn');
    switcherBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(lang)) {
            btn.classList.add('active');
        }
    });

    // Run basic dictionary translator on static tags
    applyTextTranslations();
}

function applyTextTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (phoneData && phoneData.translations && phoneData.translations[activeLang] && phoneData.translations[activeLang][key]) {
            el.innerText = phoneData.translations[activeLang][key];
        }
    });
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// ----------------------------------------
// 3D Gyro Device Tilting on Hover (Desktop)
// ----------------------------------------
function bindDevice3DTilt() {
    const wrapper = document.getElementById('phone-wrapper');
    const reflection = document.getElementById('phone-reflection');
    if (!wrapper || window.innerWidth <= 768) return;

    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Calculate rotation variables
        const rx = (dy / cy) * -12; // Rotate X up to 12 degrees
        const ry = (dx / cx) * 12;  // Rotate Y up to 12 degrees

        wrapper.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
        
        // Specular light reflection position shift based on cursor
        const shinePos = 30 + (dx / cx) * 35; // moves shine position
        if (reflection) {
            reflection.style.background = `linear-gradient(${125 - ry * 1.5}deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) ${shinePos}%, transparent ${shinePos + 1}%, transparent 100%)`;
        }
    });

    document.addEventListener('mouseleave', () => {
        if (wrapper) {
            wrapper.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
        }
        if (reflection) {
            reflection.style.background = `linear-gradient(125deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 31%, transparent 100%)`;
        }
    });
}
