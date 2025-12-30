// Navigation State
let activeSection = 'intro';
let selectedBatesonLevel = null;

// Bateson Levels Data
const batesonLevels = [
    {
        id: 5,
        title: 'Zingeving',
        subtitle: 'Waarom ik besta en handel',
        emoji: '🧭',
        color: '#10b981',
        description: 'Bijdragen aan begrip, schoonheid en authenticiteit. Oprecht en bewust aanwezig zijn.',
        radius: 80
    },
    {
        id: 4,
        title: 'Identiteit',
        subtitle: 'Wie ik ben',
        emoji: '👤',
        color: '#f59e0b',
        description: 'Waarden meedragen, betekenisvolle bijdragen leveren, verantwoordelijkheid nemen.',
        radius: 140
    },
    {
        id: 3,
        title: 'Overtuigingen',
        subtitle: 'Wat ik geloof dat juist is',
        emoji: '❤️',
        color: '#ec4899',
        description: 'Authenticiteit, menselijkheid, eerlijkheid en betekenis boven uiterlijk succes.',
        radius: 200
    },
    {
        id: 2,
        title: 'Vaardigheden',
        subtitle: 'Wat ik kan en hoe ik dat inzet',
        emoji: '💡',
        color: '#84cc16',
        description: 'Creatief denken, empathisch luisteren, verhalen vertalen, out-of-the-box oplossingen.',
        radius: 260
    },
    {
        id: 1,
        title: 'Gedrag',
        subtitle: 'Wat ik concreet doe',
        emoji: '🤲',
        color: '#14b8a6',
        description: 'Dagelijkse handelingen, eerlijke communicatie, respectvolle omgang, empathie tonen.',
        radius: 320
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavigation();
    drawBatesonCircles();
    // Normalize the Bateson info panel so buttons render with the same markup as after toggling
    showBatesonWelcome();
    
    // Scroll tracking
    window.addEventListener('scroll', handleScroll);
});

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        activeSection = sectionId;
        updateActiveNavigation();
        
        // Close mobile menu
        const mobileNav = document.getElementById('mobile-nav');
        mobileNav.classList.remove('show');
        document.getElementById('menu-icon').style.display = 'block';
        document.getElementById('close-icon').style.display = 'none';
    }
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileNav.classList.toggle('show');
    
    if (mobileNav.classList.contains('show')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

function handleScroll() {
    const sections = [
        'intro',
        'personality',
        'career',
        'worldview',
        'bateson',
        'moral-code',
        'swot',
        'future',
        'conclusion'
    ];

    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                activeSection = sectionId;
                updateActiveNavigation();
                break;
            }
        }
    }
}

function updateActiveNavigation() {
    // Update desktop nav
    const desktopButtons = document.querySelectorAll('.nav-desktop button');
    desktopButtons.forEach(button => {
        if (button.dataset.section === activeSection) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Update mobile nav
    const mobileButtons = document.querySelectorAll('.nav-mobile button');
    mobileButtons.forEach(button => {
        if (button.dataset.section === activeSection) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Bateson Circle Functions
function drawBatesonCircles() {
    const svg = document.getElementById('bateson-svg');
    const centerX = 350;
    const centerY = 350;

    // Draw circles
    batesonLevels.forEach(level => {
        // Create group
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'bateson-circle');
        g.setAttribute('data-level', level.id);
        g.style.cursor = 'pointer';
        g.onclick = () => selectBatesonLevel(level.id);

        // Main ring
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', centerX);
        circle.setAttribute('cy', centerY);
        circle.setAttribute('r', level.radius);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', level.color);
        circle.setAttribute('stroke-width', '3');
        g.appendChild(circle);

        // Icon background
        const iconBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        iconBg.setAttribute('cx', centerX);
        iconBg.setAttribute('cy', centerY - level.radius);
        iconBg.setAttribute('r', '28');
        iconBg.setAttribute('fill', 'white');
        g.appendChild(iconBg);

        // Icon text (emoji)
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        icon.setAttribute('x', centerX);
        icon.setAttribute('y', centerY - level.radius + 8);
        icon.setAttribute('text-anchor', 'middle');
        icon.setAttribute('font-size', '24');
        icon.textContent = level.emoji;
        g.appendChild(icon);

        // Level number
        const levelNum = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        levelNum.setAttribute('x', centerX);
        // Pull the level label closer to its ring so it sits inside the circle
        levelNum.setAttribute('y', centerY - level.radius + 20);
        levelNum.setAttribute('text-anchor', 'middle');
        levelNum.setAttribute('font-size', '12');
        levelNum.setAttribute('fill', level.color);
        levelNum.textContent = `Niveau ${level.id}`;
        g.appendChild(levelNum);

        svg.appendChild(g);
    });

    // Center label
    const centerLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerLabel.setAttribute('x', centerX);
    centerLabel.setAttribute('y', centerY + 5);
    centerLabel.setAttribute('text-anchor', 'middle');
    centerLabel.setAttribute('font-size', '14');
    centerLabel.setAttribute('fill', '#064e3b');
    centerLabel.textContent = 'Bateson';
    svg.appendChild(centerLabel);
}

function selectBatesonLevel(levelId) {
    if (selectedBatesonLevel === levelId) {
        selectedBatesonLevel = null;
        showBatesonWelcome();
    } else {
        selectedBatesonLevel = levelId;
        showBatesonDetail(levelId);
    }
    updateBatesonCircles();
}

function updateBatesonCircles() {
    const circles = document.querySelectorAll('.bateson-circle');
    circles.forEach(circle => {
        const levelId = parseInt(circle.dataset.level);
        const circleElement = circle.querySelector('circle[stroke]');
        
        if (selectedBatesonLevel === null) {
            // All visible
            circle.style.opacity = '1';
            circleElement.setAttribute('stroke-width', '3');
            circleElement.style.filter = 'none';
        } else if (selectedBatesonLevel === levelId) {
            // Selected
            circle.style.opacity = '1';
            circleElement.setAttribute('stroke-width', '6');
            circleElement.style.filter = 'drop-shadow(0 0 10px currentColor)';
        } else {
            // Dimmed
            circle.style.opacity = '0.3';
            circleElement.setAttribute('stroke-width', '3');
            circleElement.style.filter = 'none';
        }
    });
}

function showBatesonDetail(levelId) {
    const level = batesonLevels.find(l => l.id === levelId);
    const content = document.getElementById('bateson-info-content');
    
    content.innerHTML = `
        <div class="bateson-detail">
            <div class="detail-header">
                <div class="detail-icon">${level.emoji}</div>
                <div>
                    <div class="detail-meta">Niveau ${level.id}</div>
                    <h3 style="color: ${level.color}; margin: 0;">${level.title}</h3>
                </div>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <p style="color: #1c1917; margin-bottom: 0.5rem;"><strong>${level.subtitle}</strong></p>
                <p style="color: #78716c; font-size: 0.875rem; line-height: 1.6;">${level.description}</p>
            </div>

            <button class="back-btn" onclick="selectBatesonLevel(${levelId})">
                ← Terug naar overzicht
            </button>
        </div>
    `;
}

function showBatesonWelcome() {
    const content = document.getElementById('bateson-info-content');
    
    content.innerHTML = `
        <div class="bateson-welcome">
            <h3>Ontdek de lagen</h3>
            <p>
                Dit model toont hoe ethisch handelen voortkomt uit verschillende lagen, 
                van zichtbaar gedrag aan de buitenkant naar zingeving in het centrum.
            </p>
            
            <div class="level-buttons">
                ${batesonLevels.slice().reverse().map(level => `
                    <button onclick="selectBatesonLevel(${level.id})" class="level-btn">
                        <span class="level-emoji">${level.emoji}</span>
                        <div class="level-text">
                            <div class="level-title">${level.title}</div>
                            <div class="level-sub">${level.subtitle}</div>
                        </div>
                        <span class="level-num">Niveau ${level.id}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}
