// ----------------------------------------
// Fallback Data (loaded if data.json is blocked by CORS/file://)
// ----------------------------------------
const fallbackData = {
  "menuLinks": [
    { "id": "nav_profile", "url": "#about", "text": { "en": "Profile", "fr": "Profil", "ar": "الملف المهني" } },
    { "id": "nav_experience", "url": "#experience", "text": { "en": "Experience", "fr": "Expérience", "ar": "الخبرة المهنية" } },
    { "id": "nav_activities", "url": "/activities/", "text": { "en": "Activities", "fr": "Activités", "ar": "النشاطات والأخبار" } },
    { "id": "nav_contact", "url": "#contact", "text": { "en": "Contact", "fr": "Contact", "ar": "اتصل بي" } }
  ],
  "translations": {
    "en": {
      "hero_greeting": "Hello, I'm",
      "hero_role": "Software Developer & Financial Consultant",
      "hero_bio": "Expert in Accounting, Finance, Fintech, and Project Management. Blending technical coding skills with deep financial expertise to optimize organizational performance.",
      "btn_contact": "Contact Me",
      "section_profile": "Professional Profile",
      "profile_desc": "Accounting, Finance, Management, Banking and insurance Techniques, Fintech, Financial Analysis, project Manegment and fesabilty studies, with a solid academic background reinforced by recognized certifications and concrete experience across various projects. Expert in financial data analysis, project management, and the integration of digital solutions to optimize organizational performance.",
      "section_ventures": "My company and its products",
      "section_experience": "Professional Experience",
      "section_skills": "Skills",
      "section_education": "Education",
      "section_certifications": "Certifications",
      "section_interests": "Interests",
      "section_contact": "Get In Touch",
      "contact_loc": "AinTalh - Nouakchott North"
    },
    "fr": {
      "hero_greeting": "Bonjour, je suis",
      "hero_role": "Développeur Logiciel & Consultant Financier",
      "hero_bio": "Expert en Comptabilité, Finance, Fintech et Gestion de Projet. Alliant compétences techniques en codage et expertise financière approfondie pour optimiser la performance organisationnelle.",
      "btn_contact": "Contactez-moi",
      "section_profile": "Profil Professionnel",
      "profile_desc": "Comptabilité, Finance, Gestion, Techniques Bancaires et Assurance, Fintech, Analyse Financière, Gestion de Projet et études de faisabilité, avec un solide bagage académique renforcé par des certifications reconnues et une expérience concrète. Expert en analyse de données financières et intégration de solutions numériques.",
      "section_ventures": "Mon entreprise et ses produits",
      "section_experience": "Expérience Professionnelle",
      "section_skills": "Compétences",
      "section_education": "Éducation",
      "section_certifications": "Certifications",
      "section_interests": "Intérêts",
      "section_contact": "Me Contacter",
      "contact_loc": "AinTalh - Nouakchott Nord"
    },
    "ar": {
      "hero_greeting": "السلام عليكم، أعرّفكم بنفسي:",
      "hero_role": "مطور برمجيات ومستشار مالي",
      "hero_bio": "خبير في المحاسبة والمالية والتكنولوجيا المالية وإدارة المشاريع. أجمع بين المهارات التقنية في البرمجة والخبرة المالية العميقة لتحسين الأداء المؤسسي.",
      "btn_contact": "تواصل معي",
      "section_profile": "الملف المهني",
      "profile_desc": "المحاسبة، المالية، الإدارة، التقنيات المصرفية والتأمين، التكنولوجيا المالية، التحليل المالي، إدارة المشاريع ودراسات الجدوى، مع خلفية أكاديمية قوية معززة بشهادات معترف بها وخبرة عملية. خبير في تحليل البيانات المالية ودمج الحلول الرقمية.",
      "section_ventures": "شركتي ومشاريعها",
      "section_experience": "الخبرة المهنية",
      "section_skills": "المهارات",
      "section_education": "التعليم",
      "section_certifications": "الشهادات",
      "section_interests": "الاهتمامات",
      "section_contact": "اتصل بي",
      "contact_loc": "عين الطلح - نواكشوط الشمالية"
    }
  },
  "ventures": [
    {
      "id": "venture_1",
      "icon": "fas fa-building",
      "title": { "en": "The Accounting House", "fr": "The Accounting House", "ar": "دار المحاسبة" },
      "date": { "en": "Jun 2025 - Present", "fr": "Juin 2025 - Présent", "ar": "يونيو 2025 - الحاضر" },
      "desc": {
        "en": "Founder. A firm specialized in accounting, tax, financial monitoring, and advisory services.",
        "fr": "Fondateur. Cabinet spécialisé en comptabilité, fiscalité, suivi financier et conseil.",
        "ar": "المؤسس. شركة متخصصة في المحاسبة والضرائب والمراقبة المالية والخدمات الاستشارية."
      }
    },
    {
      "id": "venture_2",
      "icon": "fas fa-laptop-code",
      "title": { "en": "Errayd - The Expere", "fr": "Errayd - The Expere", "ar": "الرايد" },
      "date": { "en": "Product", "fr": "Produit", "ar": "منتج" },
      "desc": {
        "en": "An affordable integrated management software for HR, accounting, inventory, and more.",
        "fr": "Logiciel de gestion intégré abordable pour RH, comptabilité, inventaire, etc.",
        "ar": "برنامج إدارة متكامل بأسعار معقولة للموارد البشرية والمحاسبة والمخزون."
      }
    }
  ],
  "experience": [
    {
      "id": "exp_1",
      "title": { "en": "Regional Supervisor", "fr": "Superviseur Régional", "ar": "مشرف إقليمي" },
      "company": { "en": "Ministry of Youth & National Gendarmerie", "fr": "Ministère de la Jeunesse & Gendarmerie Nationale", "ar": "وزارة تمكين الشباب والرياضة والخدمة المدنيّة والعمل الطوعيّ" },
      "date": { "en": "Oct 2025 - Dec 2025", "fr": "Oct 2025 - Déc 2025", "ar": "أكتوبر 2025 - ديسمبر 2025" },
      "desc": { "en": "Youth & School Protection Program & Drug Prevention. Supervision of activities.", "fr": "Programme de protection de la jeunesse et prévention des drogues.", "ar": "برنامج حماية الشباب والوقاية من المخدرات." }
    },
    {
      "id": "exp_2",
      "title": { "en": "Partnerships Supervisor", "fr": "Superviseur des Partenariats", "ar": "مشرف الشراكات" },
      "company": { "en": "Noujoum Mauritania Sarl", "fr": "Noujoum Mauritania Sarl", "ar": "نجوم موريتانيا ش.م.م" },
      "date": { "en": "Jun 2025 - Sep 2025", "fr": "Juin 2025 - Sep 2025", "ar": "يونيو 2025 - سبتمبر 2025" },
      "desc": { "en": "Supervision of inter-company partnerships and projects.", "fr": "Supervision des partenariats inter-entreprises et des projets.", "ar": "الإشراف على الشراكات والمشاريع بين الشركات." }
    },
    {
      "id": "exp_3",
      "title": { "en": "Intern - Banking Supervision", "fr": "Stagiaire - Supervision Bancaire", "ar": "متدرب - الرقابة المصرفية" },
      "company": { "en": "Central Bank of Mauritania", "fr": "Banque Centrale de Mauritanie", "ar": "البنك المركزي الموريتاني" },
      "date": { "en": "Jul 2024 - Sep 2024", "fr": "Juil 2024 - Sep 2024", "ar": "يوليو 2024 - سبتمبر 2024" },
      "desc": { "en": "Collection and monitoring of information, data analysis, and recommendations.", "fr": "Collecte et suivi des informations, analyse des données et recommandations.", "ar": "جمع ومراقبة المعلومات وتحليل البيانات وتقديم التوصيات." }
    },
    {
      "id": "exp_4",
      "title": { "en": "Board Member", "fr": "Membre du Conseil", "ar": "عضو مجلس الإدارة" },
      "company": { "en": "ISCAE", "fr": "ISCAE", "ar": "المعهد العالي للمحاسبة (ISCAE)" },
      "date": { "en": "Apr 2024 - May 2025", "fr": "Avr 2024 - Mai 2025", "ar": "أبريل 2024 - مايو 2025" },
      "desc": { "en": "Elected student member on the Board of Directors.", "fr": "Membre élu représentant les étudiants au Conseil d'Administration.", "ar": "عضو منتخب ممثل للطلاب في مجلس الإدارة." }
    }
  ],
  "skills": [
    "Accounting Techniques", "Financial Analysis", "Fintech", "Project Management",
    "Banking Softwares", "Risk Management", "Sage 100", "HTML / CSS", "PHP / SQL",
    "Communication", "Critical Thinking"
  ],
  "education": [
    {
      "id": "edu_1",
      "degree": { "en": "Professional Bachelor's in Management Sciences", "fr": "Licence Professionnelle en Sciences de Gestion", "ar": "ليسانس مهني في علوم التسيير" },
      "school": { "en": "ISCAE", "fr": "ISCAE", "ar": "ISCAE" },
      "desc": { "en": "Specializing in Banking and Insurance.", "fr": "Spécialisation en Banque et Assurance.", "ar": "تخصص بنوك وتأمين." }
    },
    {
      "id": "edu_2",
      "degree": { "en": "Highschool Degree in Mathematics", "fr": "Baccalauréat Mathématiques", "ar": "بكالوريا رياضيات" },
      "school": { "en": "Lycée d'Excellence 1", "fr": "Lycée d'Excellence 1", "ar": "ثانوية الامتياز 1" },
      "desc": { "en": "Top-performing students program.", "fr": "Formation des meilleurs élèves.", "ar": "مؤسسة وطنية لتدريب المتفوقين." }
    }
  ],
  "certifications": [
    { "id": "cert_1", "icon": "fas fa-language", "name": { "en": "EF SET English (C2/B2)", "fr": "Certificat Anglais EF SET", "ar": "شهادة اللغة الإنجليزية EF SET" } },
    { "id": "cert_2", "icon": "fas fa-chart-line", "name": { "en": "Data Analysis (Open University)", "fr": "Analyse de Données", "ar": "تحليل البيانات (Open University)" } },
    { "id": "cert_3", "icon": "fas fa-piggy-bank", "name": { "en": "Save and Invest (Grenoble)", "fr": "Épargne et Investissement", "ar": "الادخار والاستثمار" } },
    { "id": "cert_4", "icon": "fas fa-rocket", "name": { "en": "Business Growth (Semrush)", "fr": "Croissance des Affaires", "ar": "نمو الأعمال (Semrush)" } },
    { "id": "cert_5", "icon": "fas fa-cogs", "name": { "en": "Operation Management", "fr": "Gestion des Opérations", "ar": "إدارة العمليات" } },
    { "id": "cert_6", "icon": "fas fa-university", "name": { "en": "Liquidity Management", "fr": "Gestion de la Liquidité", "ar": "إدارة السيولة" } }
  ],
  "interests": [
    { "id": "interest_1", "title": { "en": "Sports", "fr": "Sports", "ar": "الرياضة" }, "desc": { "en": "Founding member of Al-Badaa club.", "fr": "Membre fondateur du club Al-Badaa.", "ar": "عضو مؤسس لنادي البداع في بوتيلميت." } },
    { "id": "interest_2", "title": { "en": "Continuous Learning", "fr": "Apprentissage Continu", "ar": "التعلم المستمر" }, "desc": { "en": "Developing skills and improving levels.", "fr": "Développer mes compétences et m'améliorer.", "ar": "أحب تعلم أشياء جديدة لتطوير مهاراتي." } }
  ],
  "contact": {
    "email": "mts.mouhamedtaha@gmail.com",
    "whatsapp": "+22244508860",
    "phone": "+222 44.50.88.60",
    "location": { "en": "AinTalh - Nouakchott North", "fr": "AinTalh - Nouakchott Nord", "ar": "عين الطلح - نواكشوط الشمالية" }
  }
};

let siteData = null;
let currentLang = localStorage.getItem('lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Fetch Data & Initial Rendering
    // ----------------------------------------
    async function loadPortfolioData() {
        try {
            const res = await fetch('data.json');
            if (!res.ok) throw new Error('data.json returned status ' + res.status);
            siteData = await res.json();
            console.log('Portfolio content successfully loaded dynamically.');
        } catch (e) {
            console.warn('Could not load data.json due to CORS/relative path in file:// protocol. Falling back to local script memory.', e);
            siteData = fallbackData;
        }
        
        // Initialize layout and themes
        initTheme();
        setLanguage(currentLang);
        initInteractionListeners();
    }

    loadPortfolioData();
});

// ----------------------------------------
// Theme Toggling
// ----------------------------------------
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// ----------------------------------------
// Dynamic Layout Rendering
// ----------------------------------------
function renderNavigation(lang) {
    const container = document.getElementById('nav-links-container');
    if (!container || !siteData.menuLinks) return;

    container.innerHTML = siteData.menuLinks.map(link => {
        const title = link.text[lang] || link.text['en'] || '';
        return `<a href="${link.url}" class="nav-link">${title}</a>`;
    }).join('');

    // Re-bind menu click listener for mobile drawer close
    const navLinks = container.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function renderHeroAndAbout(lang) {
    const roleEl = document.getElementById('hero-role');
    const bioEl = document.getElementById('hero-bio');
    const profileDescEl = document.getElementById('profile-desc');
    const nameEl = document.querySelector('.name');
    const profileImg = document.getElementById('profile-img');

    // Name translation
    if (lang === 'ar') {
        if (nameEl) nameEl.innerText = "مُحَمَّد طَـٰٓه۪ 𓂆 أُبُّ";
        if (profileImg) profileImg.src = 'assets/profile image/ar profile.png';
    } else {
        if (nameEl) nameEl.innerText = "Mohamed Taha EBOU";
        if (profileImg) profileImg.src = 'assets/profile image/en - fr profile.png';
    }

    // Dynamic strings lookup
    if (roleEl && siteData.translations[lang]?.hero_role) {
        roleEl.innerText = siteData.translations[lang].hero_role;
    }
    if (bioEl && siteData.translations[lang]?.hero_bio) {
        bioEl.innerText = siteData.translations[lang].hero_bio;
    }
    if (profileDescEl && siteData.translations[lang]?.profile_desc) {
        profileDescEl.innerText = siteData.translations[lang].profile_desc;
    }
}

function renderVentures(lang) {
    const container = document.getElementById('ventures-container');
    if (!container || !siteData.ventures) return;

    container.innerHTML = siteData.ventures.map(venture => {
        const title = venture.title[lang] || venture.title['en'] || '';
        const date = venture.date[lang] || venture.date['en'] || '';
        const desc = venture.desc[lang] || venture.desc['en'] || '';
        return `
            <div class="glass-card tilt-card accent-border">
                <div class="card-glow"></div>
                <div class="card-icon"><i class="${venture.icon || 'fas fa-building'}"></i></div>
                <h3>${title}</h3>
                <p class="date">${date}</p>
                <p>${desc}</p>
            </div>
        `;
    }).join('');
}

function renderExperience(lang) {
    const container = document.getElementById('experience-container');
    if (!container || !siteData.experience) return;

    container.innerHTML = siteData.experience.map(exp => {
        const title = exp.title[lang] || exp.title['en'] || '';
        const company = exp.company[lang] || exp.company['en'] || '';
        const date = exp.date[lang] || exp.date['en'] || '';
        const desc = exp.desc[lang] || exp.desc['en'] || '';
        return `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="glass-card tilt-card">
                    <div class="card-glow"></div>
                    <h3>${title}</h3>
                    <h4>${company}</h4>
                    <p class="date">${date}</p>
                    <p>${desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !siteData.skills) return;

    container.innerHTML = siteData.skills.map(skill => {
        return `<div class="skill-tag">${skill}</div>`;
    }).join('');
}

function renderEducation(lang) {
    const container = document.getElementById('education-container');
    if (!container || !siteData.education) return;

    container.innerHTML = siteData.education.map(edu => {
        const degree = edu.degree[lang] || edu.degree['en'] || '';
        const school = edu.school[lang] || edu.school['en'] || '';
        const desc = edu.desc[lang] || edu.desc['en'] || '';
        return `
            <div class="glass-card tilt-card">
                <div class="card-glow"></div>
                <h3>${degree}</h3>
                <h4>${school}</h4>
                <p>${desc}</p>
            </div>
        `;
    }).join('');
}

function renderCertifications(lang) {
    const container = document.getElementById('certifications-container');
    if (!container || !siteData.certifications) return;

    container.innerHTML = siteData.certifications.map(cert => {
        const name = cert.name[lang] || cert.name['en'] || '';
        return `
            <div class="glass-card small-card tilt-card">
                <div class="card-glow"></div>
                <i class="${cert.icon || 'fas fa-certificate'} cert-icon"></i>
                <span>${name}</span>
            </div>
        `;
    }).join('');
}

function renderInterests(lang) {
    const container = document.getElementById('interests-container');
    if (!container || !siteData.interests) return;

    container.innerHTML = siteData.interests.map(interest => {
        const title = interest.title[lang] || interest.title['en'] || '';
        const desc = interest.desc[lang] || interest.desc['en'] || '';
        return `
            <div class="glass-card tilt-card">
                <div class="card-glow"></div>
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `;
    }).join('');
}

function renderContact(lang) {
    const container = document.getElementById('contact-container');
    if (!container || !siteData.contact) return;

    const contact = siteData.contact;
    const locText = contact.location[lang] || contact.location['en'] || '';

    container.innerHTML = `
        <a href="mailto:${contact.email}" class="glass-card contact-card tilt-card">
            <div class="card-glow"></div>
            <i class="fas fa-envelope"></i>
            <span>${contact.email}</span>
        </a>
        <a href="https://wa.me/${contact.whatsapp.replace(/\+/g, '')}" target="_blank" class="glass-card contact-card tilt-card">
            <div class="card-glow"></div>
            <i class="fab fa-whatsapp"></i>
            <span>${contact.phone}</span>
        </a>
        <div class="glass-card contact-card tilt-card">
            <div class="card-glow"></div>
            <i class="fas fa-map-marker-alt"></i>
            <span>${locText}</span>
        </div>
    `;
}

// ----------------------------------------
// Localization System
// ----------------------------------------
function setLanguage(lang) {
    currentLang = lang;
    const htmlEl = document.documentElement;

    htmlEl.setAttribute('lang', lang);
    if (lang === 'ar') {
        htmlEl.setAttribute('dir', 'rtl');
    } else {
        htmlEl.setAttribute('dir', 'ltr');
    }

    // Render database sections
    renderNavigation(lang);
    renderHeroAndAbout(lang);
    renderVentures(lang);
    renderExperience(lang);
    renderSkills();
    renderEducation(lang);
    renderCertifications(lang);
    renderInterests(lang);
    renderContact(lang);

    // Apply translations to static text fields with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (siteData.translations && siteData.translations[lang] && siteData.translations[lang][key]) {
            el.innerText = siteData.translations[lang][key];
        }
    });

    // Update switcher UI buttons active state
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    localStorage.setItem('lang', lang);
    initializeTilt(); // Bind 3D tilt effects to newly generated HTML elements
}

// ----------------------------------------
// 3D Tilt Interaction
// ----------------------------------------
function initializeTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });
}

function handleMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Maximum rotation 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glow = card.querySelector('.card-glow');
    if (glow) {
        glow.style.transform = `translate(${x}px, ${y}px)`;
    }
}

function handleMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

    const glow = card.querySelector('.card-glow');
    if (glow) {
        glow.style.transform = `translate(-150px, -150px)`;
    }
}

// ----------------------------------------
// UI Event Bindings
// ----------------------------------------
function initInteractionListeners() {
    // Mobile Drawer Hamburgers
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('close-menu');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });

    // Language switcher buttons listeners
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}
