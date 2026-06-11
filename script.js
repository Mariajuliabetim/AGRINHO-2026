// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Ativar link ativo no scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animação dos números das estatísticas
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.hero-stats');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                setTimeout(updateNumber, 30);
            } else {
                stat.textContent = target;
            }
        };
        updateNumber();
    });
    animated = true;
}

// Intersection Observer para números
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) observer.observe(statsSection);

// Gráficos com Chart.js
// Gráfico de CO2
const co2Ctx = document.getElementById('co2Chart')?.getContext('2d');
if (co2Ctx) {
    new Chart(co2Ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'CO₂ evitado (milhões ton)',
                data: [12, 18, 25, 33, 40],
                borderColor: '#d4a373',
                backgroundColor: 'rgba(212, 163, 115, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#d4a373',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

// Gráfico de Área Preservada
const areaCtx = document.getElementById('areaChart')?.getContext('2d');
if (areaCtx) {
    new Chart(areaCtx, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Milhões de hectares',
                data: [15, 22, 28, 35, 40],
                backgroundColor: '#40916c',
                borderRadius: 10,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

// Gráfico de Produtividade
const prodCtx = document.getElementById('produtividadeChart')?.getContext('2d');
if (prodCtx) {
    new Chart(prodCtx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Toneladas/hectare',
                data: [3.2, 3.5, 3.8, 4.1, 4.5],
                borderColor: '#d4a373',
                backgroundColor: 'rgba(212, 163, 115, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

// Newsletter Form
const form = document.getElementById('newsletterForm');
const messageEl = document.getElementById('formMessage');

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome')?.value;
    const email = document.getElementById('email')?.value;
    const interesse = document.getElementById('interesse')?.value;
    
    if (nome && email && interesse) {
        messageEl.textContent = `Obrigado ${nome}! Em breve enviaremos novidades sobre ${interesse}.`;
        messageEl.style.color = '#2d6a4f';
        messageEl.style.fontWeight = '500';
        form.reset();
        
        setTimeout(() => {
            messageEl.textContent = '';
        }, 5000);
    } else {
        messageEl.textContent = 'Por favor, preencha todos os campos.';
        messageEl.style.color = '#d4a373';
        
        setTimeout(() => {
            messageEl.textContent = '';
        }, 3000);
    }
});

// Botão Descubra Mais
document.getElementById('btnDescubra')?.addEventListener('click', () => {
    document.getElementById('praticas')?.scrollIntoView({ behavior: 'smooth' });
});

// Botão Assistir Vídeo
document.getElementById('btnVideo')?.addEventListener('click', () => {
    alert('🎥 Em breve: documentário completo sobre práticas sustentáveis no agro brasileiro!');
});

// Scroll reveal suave para cards
const cards = document.querySelectorAll('.sobre-card, .pratica-item, .dashboard-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    revealObserver.observe(card);
});

// Efeito de header no scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});
