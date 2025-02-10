document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});

function startCounter() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            let currentValue = Math.floor(progress * target);
            
            if (counter.classList.contains('percentage')) {
                counter.textContent = currentValue + '%';
            } else {
                counter.textContent = currentValue.toLocaleString() + '+';
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statistics = document.querySelector('.statistics');
observer.observe(statistics);

document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const targetForm = tab.getAttribute('data-tab');
        document.getElementById('Giriş-form').style.display = targetForm === 'login' ? 'block' : 'none';
        document.getElementById('Kayıt ol-form').style.display = targetForm === 'register' ? 'block' : 'none';
    });
});

document.querySelectorAll('.şifre-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const passwordInput = toggle.closest('.input-group').querySelector('input');
        
        if (passwordInput.type === 'şifre') {
            passwordInput.type = 'text';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'Şifre';
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye');
        }
    });
});

// Parçacık efekti oluşturma
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Rastgele boyut
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Rastgele başlangıç pozisyonu
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Rastgele hareket yönü
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--moveX', `${moveX}%`);
        particle.style.setProperty('--moveY', `${moveY}%`);
        
        container.appendChild(particle);
        
        // Animasyon bitince parçacığı yeniden konumlandır
        particle.addEventListener('animationend', () => {
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            const newMoveX = (Math.random() - 0.5) * 200;
            const newMoveY = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--moveX', `${newMoveX}%`);
            particle.style.setProperty('--moveY', `${newMoveY}%`);
        });
    }
}

// Slide efektleri için yeni fonksiyonlar
function initSlideAnimations() {
    // Hero içeriğini animasyonlu hale getir
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animated');
    }

    // Slide efektleri için elementleri seç
    const elements = document.querySelectorAll('.statistics, .features, .faq, .feature-item, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // İstatistik sayaçlarını başlat
                if (entry.target.classList.contains('statistics')) {
                    startCounter();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    elements.forEach(element => {
        // Elementlere slide sınıflarını ekle
        if (element.classList.contains('statistics') || 
            element.classList.contains('features') || 
            element.classList.contains('faq')) {
            element.classList.add('slide-in');
        }
        
        if (element.classList.contains('feature-item')) {
            if (Math.random() > 0.5) {
                element.classList.add('slide-in-left');
            } else {
                element.classList.add('slide-in-right');
            }
        }
        
        if (element.classList.contains('stat-item')) {
            element.classList.add('slide-in');
        }

        observer.observe(element);
    });
}

// Smooth scroll fonksiyonu
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Header yüksekliğini hesaba katarak scroll pozisyonunu ayarla
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initSlideAnimations();
    initSmoothScroll();
});

// Scroll olayını dinle ve header'ı güncelle
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Aşağı scroll
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Yukarı scroll
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});