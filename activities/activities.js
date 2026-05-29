// ----------------------------------------
// Fallback Data (loaded if data.json is blocked by CORS/file://)
// ----------------------------------------
const fallbackData = {
    "translations": {
        "en": {
            "back_portfolio": "Back to Portfolio",
            "section_activities": "Activities & News"
        },
        "fr": {
            "back_portfolio": "Retour au Portfolio",
            "section_activities": "Activités & Actualités"
        },
        "ar": {
            "back_portfolio": "العودة للرئيسية",
            "section_activities": "النشاطات والأخبار"
        }
    },
    "activities": [
        {
            "id": "act_1",
            "title": {
                "en": "Launch of The Accounting House",
                "fr": "Lancement de The Accounting House",
                "ar": "إطلاق دار المحاسبة"
            },
            "date": "2025-06-01",
            "category": {
                "en": "Entrepreneurship",
                "fr": "Entrepreneuriat",
                "ar": "ريادة الأعمال"
            },
            "desc": {
                "en": "Successfully founded and launched The Accounting House, providing top-tier accounting, tax planning, and corporate finance advisory services to small and medium enterprises.",
                "fr": "Fondation et lancement avec succès de The Accounting House, fournissant des services haut de gamme de comptabilité, de planification fiscale et de conseil en finance d'entreprise aux PME.",
                "ar": "تأسيس وإطلاق دار المحاسبة بنجاح، وتقديم خدمات محاسبية متميزة وتخطيط ضريبي واستشارات مالية للمؤسسات الصغيرة والمتوسطة."
            },
            "images": [],
            "links": [
                {
                    "label": {
                        "en": "Official Site",
                        "fr": "Site Officiel",
                        "ar": "الموقع الرسمي"
                    },
                    "url": "https://theaccountinghouse.com"
                }
            ]
        }
    ]
};

let siteData = null;
let currentLang = localStorage.getItem('lang') || 'en';
let activeImagesList = [];
let activeImageIndex = 0;

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const apiEndpoint = isLocal ? '../data.php' : 'https://acchouse.online/mee/data.php';
const mediaBase = isLocal ? '../' : 'https://acchouse.online/mee/';

// Extra translation keys for this page
const activitiesTranslations = {
    en: {
        back_portfolio: "Back to Portfolio",
        section_activities: "Activities & News",
        no_activities: "No activities found."
    },
    fr: {
        back_portfolio: "Retour au Portfolio",
        section_activities: "Activités & Actualités",
        no_activities: "Aucune activité trouvée."
    },
    ar: {
        back_portfolio: "العودة للرئيسية",
        section_activities: "النشاطات والأخبار",
        no_activities: "لا توجد نشاطات حالياً."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    async function loadActivitiesData() {
        let loaded = false;
        try {
            const res = await fetch(apiEndpoint);
            if (res.ok) {
                siteData = await res.json();
                loaded = true;
                console.log('Activities content loaded dynamically from MySQL.');
            }
        } catch (e) {
            console.warn('data.php unavailable. Trying static data.json fallback.', e);
        }
        
        if (!loaded) {
            try {
                const res = await fetch('../data.json');
                if (res.ok) {
                    siteData = await res.json();
                    loaded = true;
                    console.log('Activities content loaded from static data.json.');
                }
            } catch (e) {
                console.warn('Could not load data.json. Falling back to memory.', e);
            }
        }
        
        if (!loaded) {
            siteData = fallbackData;
        }

        initTheme();
        setLanguage(currentLang);
        initInteractionListeners();
        initLightbox();
    }

    loadActivitiesData();
});

// ----------------------------------------
// Theme Setup
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
// Localization & Rendering
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

    // Render Timeline
    renderActivities(lang);

    // Apply translations to static elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        // Check this page's translations first
        if (activitiesTranslations[lang] && activitiesTranslations[lang][key]) {
            el.innerText = activitiesTranslations[lang][key];
        } else if (siteData.translations && siteData.translations[lang] && siteData.translations[lang][key]) {
            el.innerText = siteData.translations[lang][key];
        }
    });

    // Update Language Buttons Active State
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    localStorage.setItem('lang', lang);
}

function renderActivities(lang) {
    const container = document.getElementById('activities-container');
    if (!container) return;

    if (!siteData.activities || siteData.activities.length === 0) {
        const noActText = activitiesTranslations[lang].no_activities;
        container.innerHTML = `
            <div class="empty-activities">
                <i class="fas fa-calendar-times"></i>
                <p>${noActText}</p>
            </div>
        `;
        return;
    }

    // Sort activities by date descending
    const sortedActivities = [...siteData.activities].sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sortedActivities.map((act, index) => {
        const title = act.title[lang] || act.title['en'] || '';
        const category = act.category[lang] || act.category['en'] || '';
        const desc = act.desc[lang] || act.desc['en'] || '';
        
        // Date formatting based on locale
        let formattedDate = act.date;
        try {
            const dateObj = new Date(act.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            formattedDate = dateObj.toLocaleDateString(lang === 'ar' ? 'ar-EG' : (lang === 'fr' ? 'fr-FR' : 'en-US'), options);
        } catch(e) {}

        // Image Gallery HTML
        let galleryHTML = '';
        if (act.images && act.images.length > 0) {
            // Filter out empty images
            const images = act.images.filter(img => img && img.trim() !== '');
            if (images.length > 0) {
                galleryHTML = `
                    <div class="activity-gallery">
                        ${images.map((img, imgIndex) => {
                            const imgUrl = img.startsWith('uploads/') ? (mediaBase + img) : ('../' + img);
                            return `
                                <div class="gallery-img-wrapper" onclick="openGalleryLightbox('${act.id}', ${imgIndex})">
                                    <img src="${imgUrl}" alt="${title} image" onerror="this.src='../assets/profile image/en - fr profile.png'; this.style.opacity='0.5';">
                                    <div class="gallery-img-overlay">
                                        <i class="fas fa-search-plus"></i>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }
        }

        // Links HTML
        let linksHTML = '';
        if (act.links && act.links.length > 0) {
            linksHTML = `
                <div class="activity-links">
                    ${act.links.map(link => {
                        const label = link.label[lang] || link.label['en'] || 'Visit';
                        return `
                            <a href="${link.url}" target="_blank" class="activity-link">
                                <i class="fas fa-external-link-alt"></i>
                                <span>${label}</span>
                            </a>
                        `;
                    }).join('')}
                </div>
            `;
        }

        return `
            <div class="activity-card-wrapper">
                <div class="activity-node"></div>
                <div class="glass-card activity-card tilt-card">
                    <div class="card-glow"></div>
                    <div class="activity-meta">
                        <span class="activity-category">${category}</span>
                        <span class="activity-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                    </div>
                    <h3 class="activity-title">${title}</h3>
                    <p class="activity-desc">${desc}</p>
                    ${galleryHTML}
                    ${linksHTML}
                </div>
            </div>
        `;
    }).join('');

    // Bind tilt effect to cards
    initializeTilt();
}

// ----------------------------------------
// 3D Tilt effect
// ----------------------------------------
function initializeTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
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

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

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
// Lightbox Gallery Viewer
// ----------------------------------------
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = modal.querySelector('.lightbox-close');
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', navigatePrev);
    nextBtn.addEventListener('click', navigateNext);

    // Close when clicking background outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-content')) {
            if (e.target !== modal.querySelector('.lightbox-content')) {
                closeLightbox();
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            if (currentLang === 'ar') navigateNext(); else navigatePrev();
        }
        if (e.key === 'ArrowRight') {
            if (currentLang === 'ar') navigatePrev(); else navigateNext();
        }
    });
}

window.openGalleryLightbox = function(activityId, imageIndex) {
    const activity = siteData.activities.find(act => act.id === activityId);
    if (!activity || !activity.images || activity.images.length === 0) return;

    activeImagesList = activity.images.filter(img => img && img.trim() !== '');
    activeImageIndex = imageIndex;

    const modal = document.getElementById('lightbox-modal');
    updateLightboxImage();
    modal.classList.add('active');
};

function updateLightboxImage() {
    const imgEl = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');

    const imagePath = activeImagesList[activeImageIndex];
    imgEl.src = imagePath.startsWith('uploads/') ? (mediaBase + imagePath) : ('../' + imagePath);
    captionEl.innerText = `${activeImageIndex + 1} / ${activeImagesList.length}`;

    // Hide navigation arrows if there is only 1 image
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    if (activeImagesList.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

function navigatePrev() {
    activeImageIndex--;
    if (activeImageIndex < 0) {
        activeImageIndex = activeImagesList.length - 1;
    }
    updateLightboxImage();
}

function navigateNext() {
    activeImageIndex++;
    if (activeImageIndex >= activeImagesList.length) {
        activeImageIndex = 0;
    }
    updateLightboxImage();
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('active');
}

// ----------------------------------------
// Navbar drawer listener
// ----------------------------------------
function initInteractionListeners() {
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

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}
