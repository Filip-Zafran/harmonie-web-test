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
        specialization: 'Massage Therapy',
        categories: ['Massage', 'Women\'s Health']
    },
    {
        name: 'Noemi',
        image: 'images/noemi.png',
        services: ['Wellness/Swedish Massage', 'Aromatherapy Massage', 'Thai Yoga Massage', 'Pantarei Approach'],
        specialization: 'Wellness & Massage',
        categories: ['Massage']
    },
    {
        name: 'Chloe',
        image: 'images/chloe.png',
        services: ['IFS Therapy', 'Somatic Experiencing', 'Emotional Release', 'Nervous System Regulation', 'Trauma Resolution', 'NLP', 'Breathwork', 'Coaching'],
        specialization: 'Therapy & Coaching',
        categories: ['Talking Therapy']
    },
    {
        name: 'Robert',
        image: 'images/robert.png',
        services: ['Osteopathy', 'Trauma-sensitive Bodywork', 'Breathwork & Emotional Release'],
        specialization: 'Osteopathy',
        categories: ['Osteopathy', 'Talking Therapy']
    },
    {
        name: 'Jelena',
        image: 'images/jelena.png',
        services: ['Osteopathy', 'Movement - Stress-Release - Pregnancy', 'Lomi Lomi Massage'],
        specialization: 'Osteopathy & Massage',
        categories: ['Osteopathy', 'Massage', 'Women\'s Health']
    },
    {
        name: 'Verena',
        image: 'images/verena.png',
        services: ['Osteopathy', 'Naturopathy', 'Women\'s Health', 'Pelvic Floor Check-up', 'Pelvic Floor Training', 'Menopause Support', 'Mental Health Care'],
        specialization: 'Osteopathy & Women\'s Health',
        categories: ['Osteopathy', 'Women\'s Health']
    },
    {
        name: 'Deniz',
        image: 'images/deniz.png',
        services: ['Full Body Massage', 'Trigger Point Massage', 'Sports Massage', 'Manual Therapy Techniques & Pain Point Treatment'],
        specialization: 'Massage Therapy',
        categories: ['Massage']
    },
    {
        name: 'Tina',
        image: 'images/tina.png',
        services: ['Osteopathy for Adults', 'Osteopathy During Pregnancy', 'Osteopathy for Babies and Children', 'Treatment for Scars'],
        specialization: 'Osteopathy',
        categories: ['Osteopathy', 'Women\'s Health']
    },
    {
        name: 'Fernando',
        image: 'images/fernando.png',
        services: ['Humanistic–Transpersonal Psychology', 'Psychological Counseling', 'Emotional Freedom Technique (EFT – Tapping)', 'Ra-Haraktys Reiki', 'Shamanic Breathwork (Andean Tradition)', 'Shamanic & Vedic Practices', 'Life & Business Coaching'],
        specialization: 'Psychology & Coaching',
        categories: ['Talking Therapy']
    },
    {
        name: 'Agnieszka',
        image: 'images/agnieszka.png',
        services: ['Full-Body Massage', 'Back & Neck Massage', 'Foot Reflexology', 'Lomi Lomi Nui Massage', 'Sound Therapy', 'Wellness & Sound Massage', 'Alexander Technique Bodywork'],
        specialization: 'Massage & Sound Therapy',
        categories: ['Massage']
    },
    {
        name: 'Ulrike',
        image: 'images/ulrike.png',
        services: ['Couples Therapy', 'Couples Coaching'],
        specialization: 'Couples Therapy & Coaching',
        categories: ['Talking Therapy']
    },
    {
        name: 'Ilke',
        image: 'images/ilke.png',
        services: ['Coaching', 'Reiki'],
        specialization: 'Coaching & Reiki',
        categories: ['Talking Therapy']
    },
    {
        name: 'Chin Ling',
        image: 'images/ching-ling.png',
        services: ['Signature Full Body Massage', 'Deep Tissue Upper Body & Neck', 'Face & Neck Massage', 'Lymphatic Drainage Massage', 'Lomi Lomi Nui Massage (Women Only)', 'Foot Reflexology', 'Pregnancy Massage'],
        specialization: 'Massage Therapy',
        categories: ['Massage', 'Women\'s Health']
    },
    {
        name: 'Žaneta',
        image: 'images/zaneta.png',
        services: ['Balinese Massage', 'Hot Stone Massage', 'Zenthai Shiatsu'],
        specialization: 'Massage Therapy',
        categories: ['Massage']
    },
    {
        name: 'Susan',
        image: 'images/susan.png',
        services: ['Psychotherapeutic Support for Women', 'Pregnancy & Perinatal Mental Health', 'Trauma-sensitive Therapy'],
        specialization: 'Women\'s Mental Health',
        categories: ['Talking Therapy', 'Women\'s Health']
    },
    {
        name: 'Maria',
        image: 'images/maria.png',
        services: ['Full Body Massage'],
        specialization: 'Massage Therapy',
        categories: ['Massage']
    },
    {
        name: 'Nadine',
        image: 'images/nadine.png',
        services: ['Somatic Experiencing®', 'Coaching', 'NLP (Neuro-Linguistic Programming)', 'Nervous System Regulation', 'Yoga', 'Mindfulness Training', 'Meditation'],
        specialization: 'Somatic & Mind Coaching',
        categories: ['Talking Therapy']
    },
    {
        name: 'Martina',
        image: 'images/martina.png',
        services: ['Business Coaching'],
        specialization: 'Business Coaching',
        categories: ['Talking Therapy']
    },
    {
        name: 'Nico',
        image: 'images/nico.png',
        services: ['Full Body Massage'],
        specialization: 'Massage Therapy',
        categories: ['Massage']
    }
];

// Services Data - Main Categories
const services = {
    'Women\'s Health': ['Pregnancy', 'Pelvic Floor', 'Menopause', 'Women\'s Mental Health', 'Scar Therapy'],
    'Massage': ['Relaxation', 'Sports', 'Therapeutic', 'Holistic', 'Pregnancy'],
    'Osteopathy': ['Adults', 'Pregnancy', 'Babies & Children', 'Pain & Movement', 'Holistic Health'],
    'Talking Therapy': ['Psychotherapy', 'Trauma', 'Coaching', 'Couples', 'Mindfulness & Breathwork']
};

// Service to Subcategory Mapping
const serviceSubcategoryMap = {
    // Massage Subcategories
    'Relaxation': ['Full Body Massage', 'Wellness/Swedish Massage', 'Aromatherapy Massage', 'Thai Yoga Massage', 'Lomi Lomi Massage'],
    'Sports': ['Sports Massage', 'Trigger Point Massage', 'Manual Therapy Techniques & Pain Point Treatment'],
    'Therapeutic': ['Integrative Health Treatment'],
    'Holistic': ['Pantarei Approach'],
    'Pregnancy': ['Pre/postnatal Massage', 'Movement - Stress-Release - Pregnancy'],
    // Women's Health Subcategories
    'Pregnancy': ['Pre/postnatal Massage', 'Movement - Stress-Release - Pregnancy', 'Pregnancy & Perinatal Mental Health'],
    'Pelvic Floor': ['Pelvic Floor Check-up', 'Pelvic Floor Training'],
    'Menopause': ['Menopause Support'],
    'Scar Therapy': ['ScarWork'],
    'Women\'s Mental Health': ['Psychotherapeutic Support for Women', 'Pregnancy & Perinatal Mental Health', 'Trauma-sensitive Therapy'],
    // Osteopathy Subcategories
    'Adults': ['Osteopathy'],
    'Babies & Children': ['Osteopathy'],
    'Pain & Movement': ['Osteopathy'],
    'Holistic Health': ['Osteopathy', 'Naturopathy'],
    // Talking Therapy Subcategories
    'Psychotherapy': ['IFS Therapy', 'Somatic Experiencing', 'Somatic Experiencing®', 'Emotional Release', 'Nervous System Regulation', 'Trauma Resolution'],
    'Trauma': ['Trauma-sensitive Bodywork', 'Trauma-sensitive Therapy'],
    'Coaching': ['Coaching', 'Business Coaching', 'NLP', 'NLP (Neuro-Linguistic Programming)'],
    'Mindfulness & Breathwork': ['Breathwork', 'Breathwork & Emotional Release', 'Yoga', 'Mindfulness Training', 'Meditation']
};

// Current filter state
let currentMainCategory = null;
let currentSubcategory = null;
let currentDateForFilter = null;

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
        'Melanie': './practitioners-pages/practitioner-melanie.html',
        'Noemi': './practitioners-pages/practitioner-noemi.html',
        'Chloe': './practitioners-pages/practitioner-chloe.html',
        'Robert': './practitioners-pages/practitioner-robert.html',
        'Jelena': './practitioners-pages/practitioner-jelena.html',
        'Verena': './practitioners-pages/practitioner-verena.html',
        'Deniz': './practitioners-pages/practitioner-deniz.html',
        'Tina': './practitioners-pages/practitioner-tina.html',
        'Fernando': './practitioners-pages/practitioner-fernando.html',
        'Agnieszka': './practitioners-pages/practitioner-agnieszka.html',
        'Ulrike': './practitioners-pages/practitioner-ulrike.html',
        'Ilke': './practitioners-pages/practitioner-ilke.html',
        'Chin Ling': './practitioners-pages/practitioner-chin-ling.html',
        'Žaneta': './practitioners-pages/practitioner-zaneta.html',
        'Susan': './practitioners-pages/practitioner-susan.html',
        'Maria': './practitioners-pages/practitioner-maria.html',
        'Nadine': './practitioners-pages/practitioner-nadine.html',
        'Martina': './practitioners-pages/practitioner-martina.html',
        'Nico': './practitioners-pages/practitioner-nico.html'
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

        // Get practitioners for this category
        const practitionersInCategory = practitioners.filter(p => p.categories.includes(category));

        let html = `<h3>${category}</h3>`;

        // Show practitioner circles for this category
        if (practitionersInCategory.length > 0) {
            html += '<div class="practitioners-circles">';
            practitionersInCategory.forEach(practitioner => {
                html += `
                    <div class="practitioner-circle" title="${practitioner.name}" onclick="selectServiceAndPractitioner('${category}', '${practitioner.name}')">
                        <img src="${practitioner.image}" alt="${practitioner.name}">
                        <span class="practitioner-name">${practitioner.name}</span>
                    </div>
                `;
            });
            html += '</div>';
        }

        // Show individual services
        html += `
            <ul>
                ${servicesList.map(service => `
                    <li>
                        <button onclick="${onSelectCallback}('${service}', '${category}')">${service}</button>
                    </li>
                `).join('')}
            </ul>
        `;

        categoryDiv.innerHTML = html;
        container.appendChild(categoryDiv);
    });
}

// Select service and practitioner
function selectServiceAndPractitioner(category, practitionerName) {
    alert(`Selected: ${practitionerName} for ${category} services`);
    // In a real implementation, this would filter the calendar to show only this practitioner's availability
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

// Mock booking data with specific services by date
const mockBookings = {
    '2026-07-14': ['Massage'],
    '2026-07-15': ['Massage'],
    '2026-07-16': [],
    '2026-07-17': ['Massage', 'Women\'s Health'],
    '2026-07-18': ['Massage', 'Women\'s Health', 'Osteopathy', 'Talking Therapy'],
    '2026-07-19': [],
    '2026-07-20': ['Talking Therapy', 'Osteopathy'],
    '2026-07-21': ['Massage', 'Women\'s Health'],
    '2026-07-22': ['Talking Therapy', 'Massage'],
    '2026-07-23': ['Women\'s Health', 'Osteopathy'],
    '2026-07-24': ['Massage', 'Talking Therapy'],
    '2026-07-25': ['Osteopathy'],
    '2026-07-26': ['Women\'s Health', 'Massage'],
    '2026-07-27': ['Talking Therapy'],
    '2026-07-28': ['Massage', 'Osteopathy'],
    '2026-07-29': ['Women\'s Health', 'Talking Therapy'],
    '2026-07-30': ['Massage'],
    '2026-07-31': ['Talking Therapy', 'Women\'s Health', 'Osteopathy'],
};

// Mock time slots for each category (in production, would come from backend)
const mockSlots = {
    'Massage': ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'],
    'Women\'s Health': ['09:30 AM', '10:30 AM', '11:30 AM', '01:00 PM', '02:30 PM', '03:30 PM'],
    'Osteopathy': ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'],
    'Talking Therapy': ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
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
            const escapedCategory = category.replace(/'/g, "\\'");
            html += `
                <button class="filter-btn" onclick="setCalendarFilter('${escapedCategory}', this)"
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
        console.log('setCalendarFilter called with filter:', filter, 'element:', element);
        selectedFilter = filter;

        const buttons = document.querySelectorAll(`#${containerId} .filter-btn`);
        console.log('Found buttons:', buttons.length);

        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.color = '';
            btn.style.borderColor = '';
            btn.style.backgroundColor = '';
            btn.style.fontWeight = '';
            console.log('Cleared styles from:', btn.textContent);
        });

        if (element) {
            console.log('Setting active styles on:', element.textContent);
            element.classList.add('active');
            element.style.backgroundColor = '#e74c3c';
            element.style.color = 'white';
            element.style.borderColor = '#e74c3c';
            element.style.fontWeight = '700';
            console.log('Applied styles - backgroundColor:', element.style.backgroundColor, 'color:', element.style.color);
            // Hide practitioner dropdown when any filter is clicked
            hidePractitionerDropdown();
        }
        drawCalendar(currentDate);

        // Reapply active state after redrawing calendar
        if (selectedFilter !== null) {
            const buttons = document.querySelectorAll(`#${containerId} .filter-btn`);
            buttons.forEach(btn => {
                if (btn.textContent.trim() === selectedFilter) {
                    btn.classList.add('active');
                }
            });
        }
    };

    window.selectCalendarDate = function(date, callback) {
        selectedDate = date;
        drawCalendar(currentDate);
        showTimeSlots(date, containerId);
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

// Time slots display
function showTimeSlots(date, containerId) {
    const dateString = date.toISOString().split('T')[0];
    const dayBookings = mockBookings[dateString] || [];

    const slotsPanel = document.querySelector('.time-slots-panel');
    if (!slotsPanel) return;

    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    let html = `
        <div class="slots-header">
            <h3>${formattedDate}</h3>
            <button class="close-slots" onclick="closeTimeSlots()">×</button>
        </div>
    `;

    if (dayBookings.length === 0) {
        html += '<p class="no-slots">No services available on this date</p>';
    } else {
        dayBookings.forEach(category => {
            const color = getColorForCategory(category);
            const slots = mockSlots[category] || [];

            html += `
                <div class="category-slots">
                    <div class="slots-category-title" style="border-left: 4px solid ${color}; background: rgba(${hexToRgb(color)}, 0.1);">
                        <div class="category-dot" style="background: ${color}"></div>
                        <span>${category}</span>
                    </div>
                    <div class="slots-grid">
                        ${slots.map(time => `
                            <button class="time-slot" style="border-color: ${color}; color: ${color};" onclick="selectTimeSlot('${category}', '${time}')">
                                ${time}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        });
    }

    slotsPanel.innerHTML = html;
    slotsPanel.classList.remove('hidden');
}

function closeTimeSlots() {
    const slotsPanel = document.querySelector('.time-slots-panel');
    if (slotsPanel) {
        slotsPanel.classList.add('hidden');
    }
}

function selectTimeSlot(category, time) {
    alert(`Selected: ${category} at ${time}`);
    closeTimeSlots();
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
}

// Make services clickable on practitioner pages
document.addEventListener('DOMContentLoaded', function() {
    const bookableServices = document.querySelectorAll('.bookable-services li');
    bookableServices.forEach(service => {
        service.style.cursor = 'pointer';
        service.addEventListener('click', function() {
            const serviceName = this.textContent.trim();
            bookServiceByName(serviceName);
        });
    });
});

// Book a specific service
function bookServiceByName(serviceName) {
    // Get practitioner name from the page heading
    const practitionerName = document.querySelector('.practitioner-profile h1').textContent;
    openServiceBookingModal(practitionerName, serviceName);
}

// Open service booking modal
function openServiceBookingModal(practitionerName, serviceName) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('serviceBookingModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'serviceBookingModal';
        modal.className = 'service-booking-modal';
        modal.innerHTML = `
            <div class="service-booking-header">
                <h2>Book Service</h2>
                <button class="close" onclick="closeServiceBookingModal()">×</button>
            </div>
            <div class="service-booking-content">
                <div class="service-booking-info">
                    <div>
                        <div class="info-label">Practitioner</div>
                        <div class="info-value" id="serviceBookingPractitioner"></div>
                    </div>
                    <div style="margin-top: 15px;">
                        <div class="info-label">Service</div>
                        <div class="info-value" id="serviceBookingService"></div>
                    </div>
                </div>

                <div class="duration-selector">
                    <h4>Select Duration</h4>
                    <div class="duration-options">
                        <button class="duration-btn" onclick="selectDuration(30)">30 min</button>
                        <button class="duration-btn" onclick="selectDuration(60)">60 min</button>
                        <button class="duration-btn" onclick="selectDuration(90)">90 min</button>
                    </div>
                </div>

                <div id="serviceBookingCalendar"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Update modal with selected service and practitioner
    document.getElementById('serviceBookingPractitioner').textContent = practitionerName;
    document.getElementById('serviceBookingService').textContent = serviceName;

    // Show modal
    modal.classList.remove('hidden');

    // Reset duration selection
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Generate calendar
    generateServiceCalendar();
}

function closeServiceBookingModal() {
    const modal = document.getElementById('serviceBookingModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function selectDuration(minutes) {
    // Mark selected duration
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Generate simple calendar for service booking
function generateServiceCalendar() {
    const container = document.getElementById('serviceBookingCalendar');
    const now = new Date();
    let currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
    let selectedDate = null;

    function drawCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let html = `
            <div class="calendar">
                <div class="calendar-header">
                    <button onclick="changeServiceMonth(-1)">← Prev</button>
                    <div class="calendar-title">${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                    <button onclick="changeServiceMonth(1)">Next →</button>
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
            const isPast = dateObj < new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
            html += `
                <div class="calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'empty' : ''}"
                     onclick="${isPast ? '' : `selectServiceDate(new Date('${dateObj.toISOString()}'))`}">
                    ${day}
                </div>
            `;
        }

        html += `</div></div>`;
        container.innerHTML = html;
    }

    window.changeServiceMonth = function(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        drawCalendar(currentDate);
    };

    window.selectServiceDate = function(date) {
        selectedDate = date;
        drawCalendar(currentDate);
        // Show available practitioners for this service and date
        showAvailablePractitioners(date);
    };

    drawCalendar(currentDate);
}

// Show available practitioners for selected service and date
function showAvailablePractitioners(selectedDate) {
    const serviceName = document.getElementById('serviceBookingService').textContent;
    const currentPractitioner = document.getElementById('serviceBookingPractitioner').textContent;

    // Find all practitioners who offer this service (exclude current one)
    const availablePractitioners = practitioners.filter(p =>
        p.services.includes(serviceName) && p.name !== currentPractitioner
    );

    // Create or get the practitioners panel
    let panel = document.getElementById('practitionersPanel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'practitionersPanel';
        panel.className = 'practitioners-availability-panel';
        document.body.appendChild(panel);
    }

    // Get all unique categories from available practitioners
    const allCategories = [...new Set(availablePractitioners.flatMap(p => p.categories))];

    // Build HTML for available practitioners
    let html = `
        <div class="practitioners-panel-header">
            <div>
                <h3>Available Practitioners</h3>
                <p class="availability-date">${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <button class="close" onclick="closePractitionersPanel()">×</button>
        </div>
        <div class="category-filters">
    `;

    // Add category filter buttons
    html += `<button class="category-filter-btn active" onclick="filterPractitionersByCategory(null, '${selectedDate.toISOString()}')">All</button>`;
    allCategories.forEach(category => {
        html += `<button class="category-filter-btn" onclick="filterPractitionersByCategory('${category}', '${selectedDate.toISOString()}')">${category}</button>`;
    });

    html += `
        </div>
        <div class="subcategory-filters hidden" id="subcategoryFilters"></div>
        <div class="practitioners-panel-content" id="practitionersContent">
    `;

    html += `<div class="no-available">Select a category and subcategory to see practitioners</div></div>`;
    panel.innerHTML = html;
    panel.classList.remove('hidden');
}

// Filter practitioners by category
function filterPractitionersByCategory(category, dateISOString) {
    const serviceName = document.getElementById('serviceBookingService').textContent;
    const currentPractitioner = document.getElementById('serviceBookingPractitioner').textContent;

    // Store current state
    currentMainCategory = category;
    currentSubcategory = null;
    currentDateForFilter = dateISOString;

    // Update active button styling
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((category === null && btn.textContent === 'All') || btn.textContent === category) {
            btn.classList.add('active');
        }
    });

    // Show subcategory filters if a category is selected
    const subcategoryContainer = document.getElementById('subcategoryFilters');
    if (category && services[category]) {
        let subcategoryHtml = '';
        services[category].forEach(sub => {
            subcategoryHtml += `<button class="subcategory-filter-btn" onclick="filterPractitionersBySubcategory('${sub}', '${dateISOString}')">${sub}</button>`;
        });

        if (subcategoryContainer) {
            subcategoryContainer.innerHTML = subcategoryHtml;
            subcategoryContainer.classList.remove('hidden');
        }

        // Clear practitioners - only show after subcategory is selected
        document.getElementById('practitionersContent').innerHTML = '<div class="no-available">Select a subcategory to see practitioners</div>';
    } else if (subcategoryContainer) {
        subcategoryContainer.classList.add('hidden');
        // Clear practitioners when "All" is selected
        document.getElementById('practitionersContent').innerHTML = '<div class="no-available">Select a category and subcategory to see practitioners</div>';
    }
}

// Filter practitioners by subcategory
function filterPractitionersBySubcategory(subcategory, dateISOString) {
    const serviceName = document.getElementById('serviceBookingService').textContent;
    const currentPractitioner = document.getElementById('serviceBookingPractitioner').textContent;

    // Store current state
    currentSubcategory = subcategory;

    // Find all practitioners who offer this service (exclude current one)
    let practitioners_to_show = practitioners.filter(p =>
        p.services.includes(serviceName) && p.name !== currentPractitioner
    );

    // Filter by main category if specified
    if (currentMainCategory) {
        practitioners_to_show = practitioners_to_show.filter(p => p.categories.includes(currentMainCategory));
    }

    // Filter by specific services in this subcategory
    if (serviceSubcategoryMap[subcategory]) {
        practitioners_to_show = practitioners_to_show.filter(p =>
            p.services.some(service => serviceSubcategoryMap[subcategory].includes(service))
        );
    }

    // Update active button styling for subcategory
    document.querySelectorAll('.subcategory-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === subcategory) {
            btn.classList.add('active');
        }
    });

    // Update practitioners content
    updatePractitionersDisplay(practitioners_to_show);
}

// Helper function to update practitioners display
function updatePractitionersDisplay(practitioners_to_show) {
    let html = '';
    if (practitioners_to_show.length === 0) {
        html = `<div class="no-available">No practitioners available in this category.</div>`;
    } else {
        practitioners_to_show.forEach(practitioner => {
            html += `
                <div class="practitioner-availability-card">
                    <div class="card-image">
                        <img src="/${practitioner.image}" alt="${practitioner.name}">
                    </div>
                    <div class="card-details">
                        <h4>${practitioner.name}</h4>
                        <p class="specialization">${practitioner.specialization}</p>
                        <button class="btn-select" onclick="selectPractitioner('${practitioner.name}')">Select</button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('practitionersContent').innerHTML = html;
}

function closePractitionersPanel() {
    const panel = document.getElementById('practitionersPanel');
    if (panel) {
        panel.classList.add('hidden');
    }
}

function selectPractitioner(practitionerName) {
    const selectedDate = document.querySelector('.availability-date')?.textContent;
    alert(`Booked with ${practitionerName} for ${selectedDate}`);
    closeServiceBookingModal();
    closePractitionersPanel();
}

// Close modal on background click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('serviceBookingModal');
    if (modal && e.target === modal) {
        closeServiceBookingModal();
    }
});

// Practitioner Dropdown
function showPractitionerDropdown(category, element) {
    const practitionersInCategory = practitioners.filter(p => p.categories.includes(category));

    // Remove existing dropdown
    let existingDropdown = document.querySelector('.practitioners-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    const dropdown = document.createElement('div');
    dropdown.className = 'practitioners-dropdown';

    const color = getColorForCategory(category);

    let html = `
        <div class="dropdown-header" style="border-bottom-color: ${color}; color: ${color};">
            <h4>${category} Practitioners</h4>
            <button class="dropdown-close" style="color: ${color};" onclick="hidePractitionerDropdown()">×</button>
        </div>
        <div class="dropdown-content">
    `;

    if (practitionersInCategory.length === 0) {
        html += '<p class="no-practitioners">No practitioners available for this category</p>';
    } else {
        practitionersInCategory.forEach(practitioner => {
            html += `
                <div class="practitioner-dropdown-card" onclick="openPractitionerProfile('${practitioner.name}')">
                    <div class="card-image">
                        <img src="${practitioner.image}" alt="${practitioner.name}">
                    </div>
                    <div class="card-info">
                        <h5>${practitioner.name}</h5>
                        <p class="card-specialization">${practitioner.specialization}</p>
                        <p class="card-services">${practitioner.services.slice(0, 2).join(', ')}</p>
                        <a href="${practitioner.name.toLowerCase()}.html" class="card-link">Profile →</a>
                    </div>
                </div>
            `;
        });
    }

    html += '</div>';
    dropdown.innerHTML = html;

    // Insert dropdown before the calendar in the calendar container
    const calendarContainer = document.querySelector('#calendar-container, #calendar-container-2');
    if (calendarContainer && calendarContainer.parentElement) {
        calendarContainer.parentElement.insertBefore(dropdown, calendarContainer);
    } else {
        // Fallback: append to body
        document.body.appendChild(dropdown);
    }
}

function hidePractitionerDropdown() {
    const dropdown = document.querySelector('.practitioners-dropdown');
    if (dropdown) {
        dropdown.classList.add('hidden');
        setTimeout(() => dropdown.remove(), 300);
    }
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
