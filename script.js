// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            updateActiveNav(this);
        }
    });
});

// Update active navigation item
function updateActiveNav(link) {
    document.querySelectorAll('.nav a').forEach(a => {
        a.classList.remove('active');
    });
    link.classList.add('active');
}

// Update active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============= BOOKING SYSTEM =============

// Practitioners Data
const practitioners = [
    {
        name: 'Melanie',
        image: 'images/melanie.png',
        services: ['Full Body Massage', 'Pre/postnatal Massage', 'Integrative Health Treatment', 'ScarWork'],
        specialization: 'Massage Therapy'
    },
    {
        name: 'Noemi',
        image: 'images/noemi.png',
        services: ['Wellness/Swedish Massage', 'Aromatherapy Massage', 'Thai Yoga Massage', 'Pantarei Approach'],
        specialization: 'Wellness & Massage'
    },
    {
        name: 'Chloe',
        image: 'images/chloe.png',
        services: ['IFS Therapy', 'Somatic Experiencing', 'Emotional Release', 'Nervous System Regulation', 'Trauma Resolution', 'NLP', 'Breathwork', 'Coaching'],
        specialization: 'Therapy & Coaching'
    },
    {
        name: 'Robert',
        image: 'images/robert.png',
        services: ['Osteopathy', 'Trauma-sensitive Bodywork', 'Breathwork & Emotional Release'],
        specialization: 'Osteopathy'
    },
    {
        name: 'Jelena',
        image: 'images/jelena.png',
        services: ['Osteopathy', 'Movement - Stress-Release - Pregnancy', 'Lomi Lomi Massage'],
        specialization: 'Osteopathy & Massage'
    },
    {
        name: 'Verena',
        image: 'images/verena.png',
        services: ['Osteopathy', 'Naturopathy', 'Women\'s Health', 'Pelvic Floor Check-up', 'Pelvic Floor Training', 'Menopause Support', 'Mental Health Care'],
        specialization: 'Osteopathy & Women\'s Health'
    }
];

// Services Data
const services = {
    'Women\'s Health': ['Pregnancy', 'Pelvic Floor', 'Menopause', 'Women\'s Mental Health', 'Scar Therapy'],
    'Massage': ['Relaxation', 'Sports', 'Therapeutic', 'Holistic', 'Pregnancy'],
    'Osteopathy': ['Adults', 'Pregnancy', 'Babies & Children', 'Pain & Movement', 'Holistic Health'],
    'Talking Therapy': ['Psychotherapy', 'Trauma', 'Coaching', 'Couples', 'Mindfulness & Breathwork']
};

// Modal management
const modal = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeModal');

function openBookingModal() {
    modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    hideAllSteps();
    showStep('step-method');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        hideAllSteps();
        showStep('step-method');
    }
});

// Step navigation
function showStep(stepId) {
    hideAllSteps();
    document.getElementById(stepId).classList.remove('hidden');
}

function hideAllSteps() {
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.add('hidden');
    });
}

function backToMethod() {
    showStep('step-method');
}

function backToDate() {
    showStep('step-date');
}

function backToService() {
    showStep('step-service');
}

// Booking by Practitioner
function startBookingByPractitioner() {
    showStep('step-practitioner');
    renderPractitionersList();
}

function renderPractitionersList() {
    const container = document.getElementById('practitioner-list');
    container.innerHTML = '';

    practitioners.forEach(practitioner => {
        const card = document.createElement('div');
        card.className = 'booking-practitioner-card';
        card.innerHTML = `
            <div class="booking-practitioner-image">
                <img src="${practitioner.image}" alt="${practitioner.name}">
            </div>
            <div class="booking-practitioner-content">
                <h3>${practitioner.name}</h3>
                <p style="font-size: 12px; color: var(--primary-color); margin-bottom: 10px;">${practitioner.specialization}</p>
                <div class="booking-practitioner-services">
                    ${practitioner.services.map(s => `<span>${s}</span>`).join('')}
                </div>
                <a href="#" class="booking-practitioner-link">View full profile →</a>
            </div>
        `;

        card.addEventListener('click', () => {
            openPractitionerProfile(practitioner.name);
        });

        container.appendChild(card);
    });
}

function openPractitionerProfile(practitionerName) {
    const profilePageMap = {
        'Melanie': 'melanie.html',
        'Noemi': 'noemi.html',
        'Chloe': 'chloe.html',
        'Robert': 'robert.html',
        'Jelena': 'jelena.html',
        'Verena': 'verena.html'
    };

    const profilePage = profilePageMap[practitionerName];
    if (profilePage) {
        window.location.href = profilePage;
    }
}

// Booking by Date
function startBookingByDate() {
    showStep('step-date');
    renderCalendar('calendar-container', 'selectDateThenService');
}

function selectDateThenService(date) {
    document.getElementById('selected-date').textContent = formatDate(date);
    document.getElementById('date-message').classList.remove('hidden');
    showStep('step-service-after-date');
    renderServiceCategories('service-list-after-date', 'completeBooking');
}

function backToDate() {
    showStep('step-date');
}

// Booking by Service
function startBookingByService() {
    showStep('step-service');
    renderServiceCategories('service-list', 'selectServiceThenDate');
}

function selectServiceThenDate(serviceName, serviceType) {
    document.getElementById('selected-service-name').textContent = serviceType;
    showStep('step-calendar-after-service');
    renderCalendar('calendar-container-2', 'completeBooking');
}

function backToService() {
    showStep('step-service');
}

// Service rendering
function renderServiceCategories(containerId, onSelectCallback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    Object.entries(services).forEach(([category, servicesList]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'service-category';
        categoryDiv.innerHTML = `
            <h3>${category}</h3>
            <ul>
                ${servicesList.map(service => `
                    <li>
                        <button onclick="${onSelectCallback}('${service}', '${category}')">${service}</button>
                    </li>
                `).join('')}
            </ul>
        `;
        container.appendChild(categoryDiv);
    });
}

// Color mapping for categories
const categoryColors = {};
let colorIndex = 0;
const colorPalette = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52C7A1',
    '#FF85A2', '#5DADE2', '#F39C12', '#16A085', '#C0392B'
];

function getColorForCategory(category) {
    if (!categoryColors[category]) {
        categoryColors[category] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
    }
    return categoryColors[category];
}

// Mock booking data (in production, this would come from backend)
const mockBookings = {
    '2025-07-01': ['Massage'],
    '2025-07-02': ['Women\'s Health', 'Osteopathy'],
    '2025-07-03': ['Talking Therapy'],
    '2025-07-05': ['Massage', 'Talking Therapy'],
    '2025-07-07': ['Osteopathy'],
    '2025-07-08': ['Women\'s Health', 'Massage', 'Talking Therapy'],
    '2025-07-09': ['Osteopathy', 'Massage'],
    '2025-07-11': ['Women\'s Health'],
    '2025-07-12': ['Talking Therapy', 'Osteopathy'],
    '2025-07-14': ['Massage'],
    '2025-07-15': ['Women\'s Health', 'Massage'],
    '2025-07-16': ['Osteopathy', 'Talking Therapy', 'Massage'],
    '2025-07-17': ['Women\'s Health'],
    '2025-07-18': ['Osteopathy'],
    '2025-07-19': ['Massage', 'Women\'s Health'],
    '2025-07-21': ['Talking Therapy'],
    '2025-07-22': ['Talking Therapy', 'Massage', 'Osteopathy'],
    '2025-07-23': ['Women\'s Health', 'Osteopathy'],
    '2025-07-24': ['Massage'],
    '2025-07-25': ['Women\'s Health', 'Talking Therapy'],
    '2025-07-26': ['Osteopathy', 'Massage'],
    '2025-07-28': ['Talking Therapy', 'Women\'s Health'],
    '2025-07-29': ['Massage', 'Osteopathy'],
    '2025-07-30': ['Women\'s Health'],
    '2025-07-31': ['Talking Therapy', 'Massage', 'Women\'s Health'],
};

// Calendar rendering
function renderCalendar(containerId, onSelectCallback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const now = new Date();
    let currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
    let selectedDate = null;
    let selectedFilter = null;

    function drawCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get unique categories from bookings
        const allCategories = Object.values(mockBookings).flat();
        const uniqueCategories = [...new Set(allCategories)];

        let html = `
            <div class="calendar-filter">
                <button class="filter-btn active" onclick="setCalendarFilter(null, this)">All</button>
        `;

        uniqueCategories.forEach(category => {
            const color = getColorForCategory(category);
            html += `
                <button class="filter-btn" onclick="setCalendarFilter('${category}', this)"
                        style="border-color: ${color}; color: ${color};">
                    ${category}
                </button>
            `;
        });

        html += `
            </div>

            <div class="calendar">
                <div class="calendar-header">
                    <button onclick="previousMonth()">← Prev</button>
                    <div class="calendar-title">${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                    <button onclick="nextMonth()">Next →</button>
                </div>
                <div class="calendar-weekdays">
                    <div class="weekday">Sun</div>
                    <div class="weekday">Mon</div>
                    <div class="weekday">Tue</div>
                    <div class="weekday">Wed</div>
                    <div class="weekday">Thu</div>
                    <div class="weekday">Fri</div>
                    <div class="weekday">Sat</div>
                </div>
                <div class="calendar-days">
        `;

        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-day empty"></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            const dateString = dateObj.toISOString().split('T')[0];
            const isPast = dateObj < new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
            const dayBookings = mockBookings[dateString] || [];

            let shouldShow = true;
            if (selectedFilter && !dayBookings.includes(selectedFilter)) {
                shouldShow = false;
            }

            const colorDots = dayBookings.map(cat => `<div class="color-dot" style="background: ${getColorForCategory(cat)}"></div>`).join('');

            html += `
                <div class="calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'empty' : ''} ${!shouldShow ? 'hidden' : ''}"
                     onclick="${isPast || !shouldShow ? '' : `selectCalendarDate(new Date('${dateObj.toISOString()}'), '${onSelectCallback}')`}"
                     style="${!shouldShow ? 'opacity: 0.3; pointer-events: none;' : ''}">
                    <div class="calendar-day-number">${day}</div>
                    ${colorDots ? `<div class="calendar-day-colors">${colorDots}</div>` : ''}
                </div>
            `;
        }

        html += `</div></div>`;

        // Add legend
        html += '<div class="calendar-legend">';
        uniqueCategories.forEach(category => {
            html += `
                <div class="legend-item">
                    <div class="legend-color" style="background: ${getColorForCategory(category)}"></div>
                    <span>${category}</span>
                </div>
            `;
        });
        html += '</div>';

        container.innerHTML = html;
    }

    window.setCalendarFilter = function(filter, element) {
        selectedFilter = filter;
        document.querySelectorAll(`#${containerId} .filter-btn`).forEach(btn => {
            btn.classList.remove('active');
        });
        if (element) {
            element.classList.add('active');
        }
        drawCalendar(currentDate);
    };

    window.selectCalendarDate = function(date, callback) {
        selectedDate = date;
        drawCalendar(currentDate);
        setTimeout(() => {
            window[callback](date);
        }, 100);
    };

    window.previousMonth = function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        drawCalendar(currentDate);
    };

    window.nextMonth = function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        drawCalendar(currentDate);
    };

    drawCalendar(currentDate);
}

// Completion function
function completeBooking(dateOrService) {
    alert('Booking confirmed! You will be redirected to complete your booking.');
    modal.classList.add('hidden');
}

// Helper function
function formatDate(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
