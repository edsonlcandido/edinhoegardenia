// Gift List Data
const giftItems = [
    {
        id: 1,
        name: "Luau na praia com coquetéis tropicais",
        description: "Uma noite mágica na praia com drinks tropicais e música",
        image: "https://images.unsplash.com/photo-1596326270763-87f26e0f9225?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 2,
        name: "Aula de mergulho para descobrir o fundo do mar",
        description: "Explorar as belezas submarinas com instrutores especializados",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 3,
        name: "Aulas de stand-up paddle",
        description: "Aventura aquática praticando SUP em águas cristalinas",
        image: "https://images.unsplash.com/photo-1629168924019-d2ea8caf5302?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 4,
        name: "Excursão de barco ao pôr do sol",
        description: "Passeio romântico de barco com vista para o pôr do sol",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 5,
        name: "Trilha com vista panorâmica",
        description: "Caminhada em trilhas com vistas deslumbrantes da natureza",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 6,
        name: "Aula de culinária local para aprender os segredos da gastronomia",
        description: "Experiência gastronômica aprendendo pratos típicos locais",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 7,
        name: "Sessão de fotos profissional para registrar a lua de mel",
        description: "Registros profissionais dos momentos especiais da viagem",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 8,
        name: "Visita a um ponto turístico icônico",
        description: "Conhecer os principais pontos turísticos do destino",
        image: "https://plus.unsplash.com/premium_photo-1681828170050-e5c448b6bafe?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 9,
        name: "Massagem relaxante para o casal",
        description: "Momento de relaxamento e conexão com massagens especiais",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 10,
        name: "Spa day para renovar as energias",
        description: "Dia completo de cuidados e relaxamento no spa",
        image: "https://images.unsplash.com/photo-1610289982320-3891f7c9fd6d?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 11,
        name: "Jantar romântico em um restaurante badalado",
        description: "Experiência gastronômica refinada em ambiente romântico",
        image: "https://images.unsplash.com/photo-1575390130709-7b5fee2919e4?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 12,
        name: "Champanhe e frutas no quarto para celebrar a chegada",
        description: "Recepção especial com champanhe e frutas frescas",
        image: "https://images.unsplash.com/photo-1729719083582-83d296a1782f?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 13,
        name: "Café da manhã na cama com vista para o mar",
        description: "Manhãs especiais com café servido no quarto com vista",
        image: "https://images.unsplash.com/photo-1683260041390-e13c859f4b7b?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 14,
        name: "Upgrade para primeira classe no voo",
        description: "Viagem confortável em primeira classe",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 15,
        name: "Acesso completo ao frigobar do hotel (sem culpa!)",
        description: "Liberação total do frigobar para aproveitar sem preocupações",
        image: "https://images.unsplash.com/photo-1540961403310-79825242906e?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 16,
        name: "Cota para passagens aéreas (ida ou volta)",
        description: "Contribuição para as passagens aéreas da lua de mel",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 17,
        name: "Diária de hospedagem em hotel",
        description: "Noites de estadia em hotéis especiais durante a viagem",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 18,
        name: "Aluguel de carro para explorar o destino",
        description: "Liberdade para explorar o destino com carro alugado",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 19,
        name: "Ajuda para pagar o excesso de bagagem da noiva",
        description: "Porque toda noiva precisa levar aquele look extra especial!",
        image: "https://images.unsplash.com/photo-1639597786247-5a64d8c62ebe?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 20,
        name: "Fundo para imprevistos e surpresas",
        description: "Reserva para momentos espontâneos e surpresas especiais",
        image: "https://images.unsplash.com/photo-1599585183326-87b1fff61c33?w=400&h=300&fit=crop&auto=format"
    }
];

// PIX card data
const pixCard = {
    id: 'pix',
    name: "PIX - Contribuição Livre",
    description: "Faça sua contribuição diretamente via PIX",
    email: "edsonluizcandido+nubank@gmail.com",
    copiaCola:"00020126550014BR.GOV.BCB.PIX0133edsonluizcandido+nubank@gmail.com5204000053039865802BR5918Edson Luiz Candido6007Jundiai62070503***630465B5",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format"
};

// Global variables
let displayedGifts = [];
let remainingGifts = [];
let currentGift = null;

// Initialize gift list when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('gift-list')) {
        initializeGiftList();
        setupGiftModal();
        setupGiftFormValidation();
    }
});

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize gift list
function initializeGiftList() {
    const shuffledGifts = shuffleArray(giftItems);
    displayedGifts = shuffledGifts.slice(0, 10);
    remainingGifts = shuffledGifts.slice(10);
    
    renderGifts(displayedGifts);
    
    // Add PIX card at the end
    renderPixCard();
    
    if (remainingGifts.length > 0) {
        document.getElementById('load-more-btn').style.display = 'block';
    }
    
    // Setup load more button
    document.getElementById('load-more-btn').addEventListener('click', loadMoreGifts);
}

// Render gifts to the page
function renderGifts(gifts) {
    const giftList = document.getElementById('gift-list');
    
    gifts.forEach(gift => {
        const giftCard = createGiftCard(gift);
        giftList.appendChild(giftCard);
    });
}

// Create gift card element
function createGiftCard(gift) {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML = `
        <div class="gift-image">
            <img src="${gift.image}" alt="${gift.name}" loading="lazy">
        </div>
        <div class="gift-content">
            <h3 class="gift-name">${gift.name}</h3>
            <p class="gift-description">${gift.description}</p>
            <button class="btn-gift" onclick="openGiftModal(${gift.id})">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                Presentear
            </button>
        </div>
    `;
    return card;
}

// Create PIX card element
function createPixCard() {
    const card = document.createElement('div');
    card.className = 'gift-card pix-card';
    card.setAttribute('data-card-type', 'pix');
    card.innerHTML = `
        <div class="gift-content" style="display: flex; flex-direction: column; align-items: center; flex-grow: 1; justify-content: flex-end;">
            <img id="pix-qrcode-img" src="img/pix-qrcode.png" alt="QR Code Pix" style="width: 190px; height: 190px; margin-bottom: 12px; border-radius: 12px; box-shadow: 0 1px 6px rgba(0,0,0,0.08); cursor: pointer;">
            <h3 class="gift-name">PIX - Presente Livre</h3>
            <button id="pix-copia-cola-btn" class="btn-gift" style="margin-top: auto; align-self: center; border-radius: 25px;">Pix copia e cola</button>
        </div>
    `;
    // Adiciona evento de cópia ao botão
    setTimeout(() => {
        const btn = card.querySelector('#pix-copia-cola-btn');
        const img = card.querySelector('#pix-qrcode-img');
        if (btn) {
            btn.addEventListener('click', copyPixEmail);
        }
        if (img) {
            img.addEventListener('click', copyPixEmail);
        }
    }, 0);
    return card;
}

// Render PIX card
function renderPixCard() {
    const giftList = document.getElementById('gift-list');
    const pixCardElement = createPixCard();
    giftList.appendChild(pixCardElement);
}

// Load more gifts
function loadMoreGifts() {
    // Remove the existing PIX card first
    const existingPixCard = document.querySelector('[data-card-type="pix"]');
    if (existingPixCard) {
        existingPixCard.remove();
    }
    
    renderGifts(remainingGifts);
    displayedGifts = [...displayedGifts, ...remainingGifts];
    remainingGifts = [];
    
    // Add PIX card again at the end
    renderPixCard();
    
    document.getElementById('load-more-btn').style.display = 'none';
}

// Open gift modal
function openGiftModal(giftId) {
    currentGift = giftItems.find(gift => gift.id === giftId);
    if (currentGift) {
        document.getElementById('modal-gift-name').textContent = currentGift.name;
        const modal = document.getElementById('gift-modal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Setup modal functionality
function setupGiftModal() {
    const modal = document.getElementById('gift-modal');
    const closeBtn = modal.querySelector('.gift-modal-close');
    // Fecha ao clicar no X
    closeBtn.addEventListener('click', closeGiftModal);
    // Fecha ao clicar fora do conteúdo
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGiftModal();
        }
    });
    // Fecha com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeGiftModal();
        }
    });
}

// Close modal
function closeGiftModal() {
    const modal = document.getElementById('gift-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.getElementById('gift-form').reset();
}

// Setup form validation and submission
function setupGiftFormValidation() {
    const form = document.getElementById('gift-form');
    // CPF formatting
    const cpfInput = document.getElementById('buyer-cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    // Phone formatting
    const phoneInput = document.getElementById('buyer-phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/(\d*)/, '($1');
        }
        e.target.value = value;
    });
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const cpf = document.getElementById('buyer-cpf').value;
        if (!isValidCPF(cpf)) {
            showNotification('CPF inválido. Por favor, verifique e tente novamente.');
            return;
        }
        showNotification('Presente enviado com sucesso! Obrigado pelo carinho.');
        closeGiftModal();
    });
}

// CPF validation function
function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;
    
    return parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2;
}

// Copy PIX email function
function copyPixEmail() {
    navigator.clipboard.writeText(pixCard.copiaCola).then(function() {
        showNotification('PIX copiado para a área de transferência!');
    }).catch(function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = pixCard.copiaCola;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('PIX copiado para a área de transferência!');
    });
}

// Show notification function
function showNotification(message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d4af37;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

console.log('Gifts script loaded successfully!');