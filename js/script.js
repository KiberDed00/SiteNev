// Навигация между страницами
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeScrollEffects();
});

// Инициализация навигации
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            
            // Прокрутка к верху страницы
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Показать страницу
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Скрыть все страницы
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Убрать активный класс со всех ссылок
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Показать целевую страницу
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Добавить активный класс к соответствующей ссылке
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Анимировать навыки если открыта страница "Обо мне"
        if (pageId === 'about') {
            animateSkills();
        }
    }
}

// Анимация навыков
function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        if (level && !skill.style.width) {
            skill.style.width = level + '%';
        }
    });
}

// Обработка формы
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Данные формы:', data);
    
    // Показать сообщение об успехе
    showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
    
    // Сбросить форму
    form.reset();
}

// Показать уведомление
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Эффекты при скролле
function initializeScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        // Эффект скрытия/показа шапки
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
        
        // Параллакс эффект для героя
        const hero = document.querySelector('.hero');
        if (hero && window.scrollY < hero.offsetHeight) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Добавление CSS анимаций для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #3498db !important;
        border-bottom: 2px solid #3498db;
    }
`;
document.head.appendChild(style);

// Обработка ошибок изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x200/ecf0f1/7f8c8d?text=Изображение+не+загружено';
            this.alt = 'Изображение не загружено';
        });
    });
});