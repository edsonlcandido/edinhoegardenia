// Photo Upload and Camera Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Photo upload script loaded');

    // Elements
    const startCameraBtn = document.getElementById('startCamera');
    const selectFilesBtn = document.getElementById('selectFiles');
    const fileInput = document.getElementById('fileInput');
    const cameraContainer = document.getElementById('cameraContainer');
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    const capturePhotoBtn = document.getElementById('capturePhoto');
    const stopCameraBtn = document.getElementById('stopCamera');
    const photoGrid = document.getElementById('photoGrid');
    const photosPreview = document.getElementById('photosPreview');
    const previewActions = document.querySelector('.preview-actions');
    const clearPhotosBtn = document.getElementById('clearPhotos');
    const savePhotosBtn = document.getElementById('savePhotos');

    // Variables
    let mediaStream = null;
    let capturedPhotos = [];

    // Camera functionality
    async function startCamera() {
        try {
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'environment' // Use back camera by default
                }
            };

            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            cameraVideo.srcObject = mediaStream;
            cameraContainer.style.display = 'block';
            
            // Scroll to camera
            cameraContainer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
        }
    }

    function stopCamera() {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        cameraContainer.style.display = 'none';
        cameraVideo.srcObject = null;
    }

    function capturePhoto() {
        if (!mediaStream) return;

        const canvas = cameraCanvas;
        const video = cameraVideo;
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to blob and add to photos array
        canvas.toBlob(function(blob) {
            const photoData = {
                blob: blob,
                url: URL.createObjectURL(blob),
                timestamp: new Date().toLocaleString('pt-BR'),
                type: 'camera'
            };
            
            capturedPhotos.push(photoData);
            displayPhoto(photoData, capturedPhotos.length - 1);
            updatePreviewVisibility();
        }, 'image/jpeg', 0.8);
    }

    // File upload functionality
    function handleFileSelection() {
        const files = Array.from(fileInput.files);
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const photoData = {
                    file: file,
                    url: URL.createObjectURL(file),
                    timestamp: new Date().toLocaleString('pt-BR'),
                    type: 'upload',
                    name: file.name
                };
                
                capturedPhotos.push(photoData);
                displayPhoto(photoData, capturedPhotos.length - 1);
            }
        });
        
        updatePreviewVisibility();
        fileInput.value = ''; // Reset input
    }

    // Display photo in grid
    function displayPhoto(photoData, index) {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        photoDiv.innerHTML = `
            <img src="${photoData.url}" alt="Foto ${index + 1}" class="photo-thumbnail">
            <div class="photo-info">
                <small>${photoData.timestamp}</small>
                <button class="btn-remove" onclick="removePhoto(${index})">🗑️</button>
            </div>
        `;
        
        photoGrid.appendChild(photoDiv);
        
        // Scroll to photos section
        photosPreview.scrollIntoView({ behavior: 'smooth' });
    }

    // Remove photo
    window.removePhoto = function(index) {
        if (capturedPhotos[index]) {
            // Revoke object URL to free memory
            URL.revokeObjectURL(capturedPhotos[index].url);
            
            // Remove from array
            capturedPhotos.splice(index, 1);
            
            // Rebuild grid
            rebuildPhotoGrid();
            updatePreviewVisibility();
        }
    };

    // Rebuild photo grid
    function rebuildPhotoGrid() {
        photoGrid.innerHTML = '';
        capturedPhotos.forEach((photoData, index) => {
            displayPhoto(photoData, index);
        });
    }

    // Update preview section visibility
    function updatePreviewVisibility() {
        if (capturedPhotos.length > 0) {
            photosPreview.style.display = 'block';
            previewActions.style.display = 'flex';
        } else {
            photosPreview.style.display = 'none';
            previewActions.style.display = 'none';
        }
    }

    // Clear all photos
    function clearAllPhotos() {
        if (confirm('Tem certeza que deseja remover todas as fotos?')) {
            capturedPhotos.forEach(photoData => {
                URL.revokeObjectURL(photoData.url);
            });
            capturedPhotos = [];
            photoGrid.innerHTML = '';
            updatePreviewVisibility();
        }
    }

    // Save photos (simulate save - in real implementation, this would upload to server)
    function savePhotos() {
        if (capturedPhotos.length === 0) {
            alert('Não há fotos para salvar!');
            return;
        }

        // For now, just show confirmation
        alert(`${capturedPhotos.length} foto(s) foram salvas com sucesso! Obrigado por compartilhar seus momentos conosco! ❤️`);
        
        // In a real implementation, you would:
        // 1. Create FormData with all photos
        // 2. Send to server endpoint
        // 3. Handle response
        
        console.log('Photos to save:', capturedPhotos);
    }

    // Event listeners
    startCameraBtn.addEventListener('click', startCamera);
    stopCameraBtn.addEventListener('click', stopCamera);
    capturePhotoBtn.addEventListener('click', capturePhoto);
    selectFilesBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelection);
    clearPhotosBtn.addEventListener('click', clearAllPhotos);
    savePhotosBtn.addEventListener('click', savePhotos);

    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        
        // Clean up object URLs
        capturedPhotos.forEach(photoData => {
            URL.revokeObjectURL(photoData.url);
        });
    });

    // Initial state
    updatePreviewVisibility();
});