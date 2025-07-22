/**
 * Photo Gallery with Lazy Loading, Pagination, and Lightbox
 */
class PhotoGallery {
    constructor() {
        this.currentPage = 1;
        this.perPage = 30;
        this.totalPages = 1;
        this.totalItems = 0;
        this.photos = [];
        this.isLoading = false;
        
        this.galeriaGrid = document.getElementById('galeriaGrid');
        this.paginationContainer = this.createPaginationContainer();
        this.lightbox = this.createLightbox();
        
        this.init();
    }
    
    init() {
        this.loadPhotos();
        this.setupIntersectionObserver();
        this.setupLightboxEvents();
    }
    
    createPaginationContainer() {
        const container = document.createElement('div');
        container.className = 'pagination-container';
        container.innerHTML = `
            <div class="pagination-info">
                <span id="paginationInfo">Carregando...</span>
            </div>
            <div class="pagination-controls">
                <button id="prevPage" class="pagination-btn" disabled>← Anterior</button>
                <span id="pageInfo" class="page-info">Página 1 de 1</span>
                <button id="nextPage" class="pagination-btn" disabled>Próxima →</button>
            </div>
        `;
        
        // Insert after the gallery grid
        this.galeriaGrid.parentNode.insertBefore(container, this.galeriaGrid.nextSibling);
        
        // Setup pagination event listeners
        document.getElementById('prevPage').addEventListener('click', () => this.goToPreviousPage());
        document.getElementById('nextPage').addEventListener('click', () => this.goToNextPage());
        
        return container;
    }
    
    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img class="lightbox-image" src="" alt="Foto">
                    <div class="lightbox-nav">
                        <button class="lightbox-prev">‹</button>
                        <button class="lightbox-next">›</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
        return lightbox;
    }
    
    setupLightboxEvents() {
        const closeBtn = this.lightbox.querySelector('.lightbox-close');
        const overlay = this.lightbox.querySelector('.lightbox-overlay');
        const prevBtn = this.lightbox.querySelector('.lightbox-prev');
        const nextBtn = this.lightbox.querySelector('.lightbox-next');
        
        closeBtn.addEventListener('click', () => this.closeLightbox());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeLightbox();
        });
        
        prevBtn.addEventListener('click', () => this.showPreviousImage());
        nextBtn.addEventListener('click', () => this.showNextImage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPreviousImage();
                    break;
                case 'ArrowRight':
                    this.showNextImage();
                    break;
            }
        });
    }
    
    setupIntersectionObserver() {
        // Lazy loading observer
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        this.imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });
    }
    
    async loadPhotos(page = 1) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            const response = await fetch(
                `${apiConfig.getBaseURL()}/api/collections/fotos/records?page=${page}&perPage=${this.perPage}&sort=-created`
            );
            
            if (!response.ok) {
                throw new Error('Erro ao carregar fotos');
            }
            
            const data = await response.json();
            
            this.currentPage = data.page || 1;
            this.perPage = data.perPage || 30;
            this.totalPages = data.totalPages || 1;
            this.totalItems = data.totalItems || 0;
            this.photos = data.items || [];
            
            this.renderPhotos();
            this.updatePagination();
            
        } catch (error) {
            console.error('Erro ao carregar fotos:', error);
            this.showError('Erro ao carregar fotos. Tente novamente.');
        } finally {
            this.isLoading = false;
        }
    }
    
    renderPhotos() {
        if (this.photos.length === 0) {
            this.galeriaGrid.innerHTML = '<p class="no-photos">Nenhuma foto enviada ainda.</p>';
            return;
        }
        
        this.galeriaGrid.innerHTML = '';
        
        this.photos.forEach((photo, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.className = 'gallery-image lazy';
            img.alt = 'Foto enviada';
            
            // Use thumbnail for grid display
            const thumbUrl = `${apiConfig.getBaseURL()}/api/files/${photo.collectionId}/${photo.id}/${photo.foto}?thumb=300x300`;
            const fullUrl = `${apiConfig.getBaseURL()}/api/files/${photo.collectionId}/${photo.id}/${photo.foto}`;
            
            // Set up lazy loading
            img.dataset.src = thumbUrl;
            img.dataset.fullSrc = fullUrl;
            img.dataset.index = index;
            
            // Placeholder while loading
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2NjYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhcnJlZ2FuZG8uLi48L3RleHQ+PC9zdmc+';
            
            // Click handler for lightbox
            img.addEventListener('click', () => this.openLightbox(index));
            
            imgContainer.appendChild(img);
            this.galeriaGrid.appendChild(imgContainer);
            
            // Observe for lazy loading
            this.imageObserver.observe(img);
        });
    }
    
    updatePagination() {
        const infoElement = document.getElementById('paginationInfo');
        const pageInfoElement = document.getElementById('pageInfo');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        // Update info text
        if (this.totalItems > 0) {
            const startItem = (this.currentPage - 1) * this.perPage + 1;
            const endItem = Math.min(this.currentPage * this.perPage, this.totalItems);
            infoElement.textContent = `Mostrando ${startItem}-${endItem} de ${this.totalItems} fotos`;
        } else {
            infoElement.textContent = 'Nenhuma foto encontrada';
        }
        
        // Update page info
        pageInfoElement.textContent = `Página ${this.currentPage} de ${this.totalPages}`;
        
        // Update button states
        prevBtn.disabled = this.currentPage <= 1;
        nextBtn.disabled = this.currentPage >= this.totalPages;
    }
    
    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.loadPhotos(this.currentPage - 1);
        }
    }
    
    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.loadPhotos(this.currentPage + 1);
        }
    }
    
    openLightbox(index) {
        this.currentImageIndex = index;
        const photo = this.photos[index];
        const fullUrl = `${apiConfig.getBaseURL()}/api/files/${photo.collectionId}/${photo.id}/${photo.foto}`;
        
        const lightboxImage = this.lightbox.querySelector('.lightbox-image');
        lightboxImage.src = fullUrl;
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update navigation button states
        this.updateLightboxNavigation();
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    showPreviousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.updateLightboxImage();
        }
    }
    
    showNextImage() {
        if (this.currentImageIndex < this.photos.length - 1) {
            this.currentImageIndex++;
            this.updateLightboxImage();
        }
    }
    
    updateLightboxImage() {
        const photo = this.photos[this.currentImageIndex];
        const fullUrl = `${apiConfig.getBaseURL()}/api/files/${photo.collectionId}/${photo.id}/${photo.foto}`;
        
        const lightboxImage = this.lightbox.querySelector('.lightbox-image');
        lightboxImage.src = fullUrl;
        
        this.updateLightboxNavigation();
    }
    
    updateLightboxNavigation() {
        const prevBtn = this.lightbox.querySelector('.lightbox-prev');
        const nextBtn = this.lightbox.querySelector('.lightbox-next');
        
        prevBtn.style.display = this.currentImageIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = this.currentImageIndex < this.photos.length - 1 ? 'block' : 'none';
    }
    
    showLoading() {
        this.galeriaGrid.innerHTML = '<p class="loading">Carregando fotos...</p>';
    }
    
    showError(message) {
        this.galeriaGrid.innerHTML = `<p class="error">${message}</p>`;
    }
    
    // Public method to refresh gallery (called after upload)
    refresh() {
        this.loadPhotos(this.currentPage);
    }
}

// Global gallery instance
let photoGallery;

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on fotos.html page
    if (document.getElementById('galeriaGrid')) {
        photoGallery = new PhotoGallery();
        // Make it globally available
        window.photoGallery = photoGallery;
    }
});