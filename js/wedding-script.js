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
        z-index: 30000;
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
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const quantidade_pessoas = document.getElementById('acompanhantes').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            // Validação básica
            if (!nome || !quantidade_pessoas) {
                showNotification('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const submitButton = form.querySelector('.btn-confirmar');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            try {
                const res1 = await fetch('/api/collections/confirmacao/records', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome,
                        quantidade_pessoas: quantidade_pessoas
                    })
                });

                const res2 = await fetch('/api/collections/messages/records', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome,
                        message: mensagem
                    })
                });

                if (res1.ok && res2.ok) {
                    showNotification('Confirmação enviada com sucesso!');
                    form.reset();
                } else {
                    showNotification('Ocorreu um erro ao enviar sua confirmação. Tente novamente.');
                }
            } catch (err) {
                showNotification('Erro de conexão. Tente novamente mais tarde.');
            }
            submitButton.textContent = originalText;
            submitButton.disabled = false;
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
        location:'Balneario Camburiu, SC',
        src: 'img/20211101 - balneario.jpeg',
        caption: 'Viagem inesquecível para a praia 🏖️ Momentos como este são eternos',
        date: 'novembro de 2021',
        likes: 157
    },
    {
        location:'Balneario Camburiu, SC',
        src: 'img/20211102 - balneario.jpg',
        caption: 'Sempre na melhor companhia ❤️',
        date: 'novembro de 2021',
        likes: 234
    },
    {
        location:'Sorocaba, SP',
        src: 'img/20211201 - sorocaba.jpg',
        caption: 'Sol e piscina com o amor da minha vida ☀️💦',
        date: 'dezembro de 2021',
        likes: 189
    },
    {
        location:'Alfenas, MG',
        src: 'img/20220401 - alfenas.jpg',
        caption: 'No role pois nós também somos jovens 😎, RIP carneiro',
        date: 'abril de 2022',
        likes: 176
    },
    {
        location:'Guassussê, CE',
        src: 'img/20220601 - guassusse.jpg',
        caption: 'O beijo mais gostoso do mundo 😘',
        date: 'junho de 2022',
        likes: 203
    },
    {
        location:'Campina Grande, PB',
        src: 'img/20220622 - campina.jpg',
        caption: 'No maior são joão do mundo 🎉',
        date: 'junho de 2022',
        likes: 298
    },
    {
        location:'Paris, França 😹',
        src: 'img/20230107 - paris.jpeg',
        caption: 'Na cidade luz, invejosos dirão que é mentira 😏',
        date: 'janeiro de 2023',
        likes: 445
    },
    {
        location:'Rio de Janeiro, RJ',
        src: 'img/20230213 - rio.jpg',
        caption: 'Jesus Cristo, eu estou aqui! 😍',
        date: 'fevereiro de 2023',
        likes: 523
    },
    {
        location:'São Paulo, SP',
        src: 'img/20230820 - sao paulo.jpg',
        caption: 'O amor é rosa ❤️',
        date: 'agosto de 2023',
        likes: 367
    },
    {
        location:'Jundiaí, SP',
        src: 'img/20241215 - jundiai.jpg',
        caption: 'Nas corridas da vida, pois também somo fitness 🏃‍♂️💨',
        date: 'dezembro de 2024',
        likes: 367
    },
    {
        location:'Arraial do Cabo, RJ',
        src: 'img/20250215 - arraial.jpg',
        caption: 'Já falei que gostamos de praia? 🏖️. Não me leve a mal, me leve para arraial.',
        date: 'fevereiro de 2025',
        likes: 412
    },
    {
        location:'São Paulo, SP',
        src: 'img/20250405 - sao paulo.jpg',
        caption: 'O tão esperado sim! 💍',
        date: 'abril de 2025',
        likes: 589
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
    const location = document.getElementById('photo-location');
    const modal = document.getElementById('instagramModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalDate = document.getElementById('modalDate');
    const likesCount = document.getElementById('likesCount');



    if (modal && photos[photoIndex]) {
        const photo = photos[photoIndex];
        location.textContent = photo.location;
        modalCaption.textContent = photo.caption;
        modalDate.textContent = photo.date;
        likesCount.textContent = `${photo.likes} curtidas`;

        // Ajuste dinâmico ao carregar a imagem
        modalImage.onload = function() {
            adjustModalImageSize(this);
        };
        modalImage.src = photo.src;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}



function adjustModalImageSize(img) {
    const container = img.parentElement;
    const containerRect = container.getBoundingClientRect();
    const imgAspectRatio = img.naturalWidth / img.naturalHeight;
    const containerAspectRatio = containerRect.width / containerRect.height;

    // Reset estilos
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';

    // Ajuste para caber a maior dimensão
    if (imgAspectRatio > containerAspectRatio) {
        // Imagem paisagem: limitar pela largura
        img.style.width = '100%';
        img.style.height = 'auto';
    } else {
        // Imagem retrato: limitar pela altura
        img.style.height = '100%';
        img.style.width = 'auto';
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

    // Ajustar imagem ao redimensionar janela
    window.addEventListener('resize', function() {
        const modal = document.getElementById('instagramModal');
        const modalImage = document.getElementById('modalImage');
        if (modal && modal.style.display === 'flex' && modalImage && modalImage.src) {
            setTimeout(() => adjustModalImageSize(modalImage), 100);
        }
    });
});

console.log('Wedding script loaded successfully!');
