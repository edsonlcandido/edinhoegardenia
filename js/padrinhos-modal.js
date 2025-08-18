/**
 * Padrinhos Modal Functionality
 * Handles opening/closing modal to display padrinho photos and names
 */

// Open padrinhos modal
function openPadrinhosModal(imageSrc, name) {
    const modal = document.getElementById('padrinhosModal');
    const modalImage = document.getElementById('padrinhosModalImage');
    const modalName = document.getElementById('padrinhosModalName');
    
    if (modal && modalImage && modalName) {
        modalImage.src = imageSrc;
        modalImage.alt = `Foto de ${name}`;
        modalName.textContent = name;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close padrinhos modal
function closePadrinhosModal() {
    const modal = document.getElementById('padrinhosModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Setup event listeners for padrinhos photos
function setupPadrinhosModalEvents() {
    // Add click listeners to all padrinho photos
    const padrinhoCards = document.querySelectorAll('.padrinho-card');
    
    padrinhoCards.forEach(card => {
        const photo = card.querySelector('.padrinho-photo img');
        const nameElement = card.querySelector('.padrinho-info h3');
        
        if (photo && nameElement) {
            photo.style.cursor = 'pointer';
            photo.addEventListener('click', function() {
                const imageSrc = this.src;
                const name = nameElement.textContent.trim();
                openPadrinhosModal(imageSrc, name);
            });
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('padrinhosModal');
            if (modal && modal.style.display === 'flex') {
                closePadrinhosModal();
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupPadrinhosModalEvents();
});

console.log('Padrinhos modal script loaded successfully!');