// Countdown Timer - Versão Simplificada
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando countdown...');
    
    // Data do casamento: 07 de Fevereiro de 2026 às 11:00
    const weddingDate = new Date('2026-02-07T11:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        console.log('Wedding date:', new Date(weddingDate));
        console.log('Current date:', new Date(now));
        console.log('Distance:', distance);
        
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
            
            console.log('Countdown updated:', {days, hours, minutes, seconds});
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
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Copy PIX key functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

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
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Galeria de Fotos
let photos = [
    {
        src: 'https://picsum.photos/800/800?random=1',
        caption: 'Nosso primeiro encontro ❤️ Foi amor à primeira vista!',
        date: '3 semanas atrás',
        likes: 157
    },
    {
        src: 'https://picsum.photos/800/800?random=2',
        caption: 'Viagem inesquecível para a praia 🏖️ Momentos como este são eternos',
        date: '2 semanas atrás',
        likes: 234
    },
    {
        src: 'https://picsum.photos/800/800?random=3',
        caption: 'Jantar romântico no nosso restaurante favorito 🍷✨',
        date: '1 semana atrás',
        likes: 189
    },
    {
        src: 'https://picsum.photos/800/800?random=4',
        caption: 'Caminhada no parque em um domingo perfeito 🌸',
        date: '6 dias atrás',
        likes: 176
    },
    {
        src: 'https://picsum.photos/800/800?random=5',
        caption: 'Fazendo biscoitos juntos na cozinha 👩‍🍳👨‍🍳',
        date: '4 dias atrás',
        likes: 203
    },
    {
        src: 'https://picsum.photos/800/800?random=6',
        caption: 'Nosso amor cresce a cada dia que passa 💕',
        date: '2 dias atrás',
        likes: 298
    },
    {
        src: 'https://picsum.photos/800/800?random=7',
        caption: 'Sessão de fotos pré-casamento 📸 Que nervosismo gostoso!',
        date: '1 dia atrás',
        likes: 445
    },
    {
        src: 'https://picsum.photos/800/800?random=8',
        caption: 'Escolhendo as alianças juntos 💍 O momento mais especial!',
        date: '1 dia atrás',
        likes: 523
    },
    {
        src: 'https://picsum.photos/800/800?random=9',
        caption: 'Ensaiando para o grande dia 💃🕺',
        date: '12 horas atrás',
        likes: 367
    }
];

let currentPhotoIndex = 0;

function loadPhotos() {
    const fotoGrid = document.getElementById('fotoGrid');
    if (!fotoGrid) return;

    fotoGrid.innerHTML = '';

    photos.forEach((photo, index) => {
        const fotoItem = document.createElement('div');
        fotoItem.className = 'foto-item';
        fotoItem.onclick = () => openModal(index);

        fotoItem.innerHTML = `
            <img src="${photo.src}" alt="Foto do casal" loading="lazy">
            <div class="foto-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
            </div>
        `;

        fotoGrid.appendChild(fotoItem);
    });
}

function openModal(photoIndex) {
    currentPhotoIndex = photoIndex;
    const modal = document.getElementById('instagramModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalDate = document.getElementById('modalDate');
    const likesCount = document.getElementById('likesCount');

    if (modal && photos[photoIndex]) {
        const photo = photos[photoIndex];
        
        modalImage.src = photo.src;
        modalCaption.textContent = photo.caption;
        modalDate.textContent = photo.date;
        likesCount.textContent = `${photo.likes} curtidas`;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('instagramModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function previousPhoto() {
    if (currentPhotoIndex > 0) {
        openModal(currentPhotoIndex - 1);
    }
}

function nextPhoto() {
    if (currentPhotoIndex < photos.length - 1) {
        openModal(currentPhotoIndex + 1);
    }
}

function toggleLike() {
    const likeBtn = document.querySelector('.like-btn');
    const likesCount = document.getElementById('likesCount');
    
    if (likeBtn && likesCount) {
        const isLiked = likeBtn.classList.contains('liked');
        
        if (isLiked) {
            likeBtn.classList.remove('liked');
            photos[currentPhotoIndex].likes--;
        } else {
            likeBtn.classList.add('liked');
            photos[currentPhotoIndex].likes++;
        }
        
        likesCount.textContent = `${photos[currentPhotoIndex].likes} curtidas`;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar galeria de fotos
    loadPhotos();

    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Navegação do modal com setas do teclado
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('instagramModal');
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                previousPhoto();
            } else if (e.key === 'ArrowRight') {
                nextPhoto();
            }
        }
    });
});

console.log('Wedding script loaded successfully!');
