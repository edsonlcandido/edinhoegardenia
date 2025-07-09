// Gift List Data
const giftItems = [
    {
        id: 1,
        name: "Luau na praia com coquetéis tropicais",
        description: "Uma noite mágica na praia com drinks tropicais e música",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 2,
        name: "Aula de mergulho para descobrir o fundo do mar",
        description: "Explorar as belezas submarinas com instrutores especializados",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 3,
        name: "Aulas de stand-up paddle",
        description: "Aventura aquática praticando SUP em águas cristalinas",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop&auto=format"
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
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&auto=format"
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 11,
        name: "Jantar romântico em um restaurante badalado",
        description: "Experiência gastronômica refinada em ambiente romântico",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 12,
        name: "Champanhe e frutas no quarto para celebrar a chegada",
        description: "Recepção especial com champanhe e frutas frescas",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 13,
        name: "Café da manhã na cama com vista para o mar",
        description: "Manhãs especiais com café servido no quarto com vista",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format"
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
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&auto=format"
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
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 20,
        name: "Fundo para imprevistos e surpresas",
        description: "Reserva para momentos espontâneos e surpresas especiais",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format"
    }
];

// Global variables
let displayedGifts = [];
let remainingGifts = [];
let currentGift = null;

// Initialize gift list when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('gift-list')) {
        initializeGiftList();
        setupModal();
        setupFormValidation();
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

// Load more gifts
function loadMoreGifts() {
    renderGifts(remainingGifts);
    displayedGifts = [...displayedGifts, ...remainingGifts];
    remainingGifts = [];
    document.getElementById('load-more-btn').style.display = 'none';
}

// Open gift modal
function openGiftModal(giftId) {
    currentGift = giftItems.find(gift => gift.id === giftId);
    if (currentGift) {
        document.getElementById('modal-gift-name').textContent = currentGift.name;
        document.getElementById('gift-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('gift-modal');
    const closeBtn = modal.querySelector('.close');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    document.getElementById('gift-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('gift-form').reset();
}

// Setup form validation and submission
function setupFormValidation() {
    const form = document.getElementById('gift-form');
    
    // CPF formatting
    const cpfInput = document.getElementById('buyer-cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    
    // Phone formatting
    const phoneInput = document.getElementById('buyer-phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
        e.target.value = value;
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const giftData = {
            gift: currentGift.name,
            value: formData.get('gift-value'),
            name: formData.get('buyer-name'),
            cpf: formData.get('buyer-cpf'),
            phone: formData.get('buyer-phone')
        };
        
        // Validate CPF
        if (!isValidCPF(giftData.cpf)) {
            showNotification('Por favor, insira um CPF válido.');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('.btn-confirmar');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Processando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification(`Obrigado ${giftData.name}! Seu presente de R$ ${parseFloat(giftData.value).toFixed(2)} para "${giftData.gift}" foi registrado com sucesso!`);
            closeModal();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
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

console.log('Gifts script loaded successfully!');