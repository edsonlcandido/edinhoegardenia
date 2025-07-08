// Countdown Timer
function initCountdown() {
    // Data do casamento: 07 de Fevereiro de 2025 às 16:00
    const weddingDate = new Date('February 7, 2026 10:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Verificar se os elementos existem
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('Elementos do countdown não encontrados');
            return;
        }
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // O casamento já aconteceu
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.innerHTML = '<div class="countdown-finished"><h3>O grande dia chegou!</h3><p>🎉 Parabéns aos noivos! 🎉</p></div>';
            }
        }
    }
    
    // Executar imediatamente
    updateCountdown();
    
    // Atualizar a cada segundo
    setInterval(updateCountdown, 1000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Copy PIX key functionality
function initCopyPix() {
    const copyButton = document.querySelector('.btn-copy');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const pixKey = 'casamento@edinhogardenia.com';
            
            // Try to use the Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(pixKey).then(() => {
                    showNotification('Chave PIX copiada!');
                }).catch(err => {
                    console.error('Erro ao copiar:', err);
                    fallbackCopyTextToClipboard(pixKey);
                });
            } else {
                fallbackCopyTextToClipboard(pixKey);
            }
        });
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Chave PIX copiada!');
        } else {
            showNotification('Erro ao copiar chave PIX');
        }
    } catch (err) {
        console.error('Fallback: Erro ao copiar:', err);
        showNotification('Erro ao copiar chave PIX');
    }
    
    document.body.removeChild(textArea);
}

// Show notification
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d4af37;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
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
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form submission
function initFormSubmission() {
    const form = document.querySelector('.confirmacao-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Basic validation
            if (!data.nome || !data.email || !data.telefone || !data.acompanhantes) {
                showNotification('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulate form submission
            const submitButton = form.querySelector('.btn-confirmar');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Confirmação enviada com sucesso!');
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .evento-card, .presente-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .timeline-item, .evento-card, .presente-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .timeline-item.animate-in, .evento-card.animate-in, .presente-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing countdown...');
    
    // Debug: verificar se os elementos existem
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    console.log('Countdown elements found:', countdownElements);
    
    initCountdown();
    initSmoothScrolling();
    initHeaderScroll();
    initCopyPix();
    initFormSubmission();
    initScrollAnimations();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to couple photo
    const couplePhoto = document.querySelector('.couple-photo');
    if (couplePhoto) {
        couplePhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        couplePhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Add floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    heartsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    const heartStyles = document.createElement('style');
    heartStyles.textContent = `
        .floating-hearts {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        
        .heart {
            position: absolute;
            color: rgba(212, 175, 55, 0.6);
            font-size: 20px;
            animation: float-heart 8s linear infinite;
        }
        
        @keyframes float-heart {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartStyles);
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    document.body.appendChild(heartsContainer);
    
    // Create hearts periodically
    setInterval(createHeart, 3000);
}
