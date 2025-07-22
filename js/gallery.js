/**
 * Photo Gallery with Lazy Loading, Infinite Scroll, and Lightbox
 */
class PhotoGallery {
    constructor() {
        this.currentPage = 1;
        this.perPage = 30;
        this.totalPages = 1;
        this.totalItems = 0;
        this.photos = [];
        this.isLoading = false;
        this.hasMorePhotos = true;
        
        this.galeriaGrid = document.getElementById('galeriaGrid');
        this.lightbox = this.createLightbox();
        
        this.init();
    }
    
    init() {
        this.loadPhotos();
        this.setupIntersectionObserver();
        this.setupInfiniteScroll();
        this.setupLightboxEvents();
    }
    
    setupInfiniteScroll() {
        // Create a sentinel element to trigger loading more photos
        this.sentinel = document.createElement('div');
        this.sentinel.className = 'scroll-sentinel';
        this.sentinel.style.height = '20px';
        this.sentinel.style.margin = '20px 0';
        
        // Insert sentinel after the gallery grid
        this.galeriaGrid.parentNode.insertBefore(this.sentinel, this.galeriaGrid.nextSibling);
        
        // Observe sentinel for infinite scroll
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && this.hasMorePhotos && !this.isLoading) {
                    this.loadMorePhotos();
                }
            });
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        });
        
        this.scrollObserver.observe(this.sentinel);
    }
    
    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img class="lightbox-image" src="" alt="Foto">
                    <button class="lightbox-prev">‹</button>
                    <button class="lightbox-next">›</button>
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
    
    async loadPhotos(page = 1, append = false) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        
        if (!append) {
            this.showLoading();
        }
        
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
            
            // Check if there are more photos to load
            this.hasMorePhotos = this.currentPage < this.totalPages;
            
            if (append) {
                // Append new photos to existing ones
                this.photos = [...this.photos, ...(data.items || [])];
            } else {
                // Replace photos (initial load or refresh)
                this.photos = data.items || [];
            }
            
            this.renderPhotos(append);
            
        } catch (error) {
            console.error('Erro ao carregar fotos:', error);
            this.showError('Erro ao carregar fotos. Tente novamente.');
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadMorePhotos() {
        if (!this.hasMorePhotos || this.isLoading) return;
        
        const nextPage = this.currentPage + 1;
        await this.loadPhotos(nextPage, true);
    }
    
    renderPhotos(append = false) {
        if (this.photos.length === 0) {
            this.galeriaGrid.innerHTML = '<p class="no-photos">Nenhuma foto enviada ainda.</p>';
            return;
        }
        
        if (!append) {
            this.galeriaGrid.innerHTML = '';
        }
        
        this.photos.forEach((photo, index) => {
            // Skip already rendered photos when appending
            if (append && index < this.galeriaGrid.children.length) {
                return;
            }
            
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
        // Reset for fresh load
        this.currentPage = 1;
        this.photos = [];
        this.hasMorePhotos = true;
        this.loadPhotos(1, false);
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