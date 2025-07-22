// Photo Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cameraBtn = document.getElementById('cameraBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const cameraInput = document.getElementById('cameraInput');
    const previewArea = document.getElementById('previewArea');
    const previewGrid = document.getElementById('previewGrid');
    const clearBtn = document.getElementById('clearBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    let selectedFiles = [];

    // Camera button click handler
    if (cameraBtn && cameraInput) {
        cameraBtn.addEventListener('click', function() {
            cameraInput.click();
        });
        
        cameraInput.addEventListener('change', function(e) {
            handleFileSelection(e.target.files);
        });
    }

    // Upload button click handler
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function(e) {
            handleFileSelection(e.target.files);
        });
    }

    // Handle file selection
    function handleFileSelection(files) {
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    showNotification('Apenas arquivos de imagem são permitidos.');
                    continue;
                }
                
                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                    showNotification('Arquivo muito grande. Máximo 5MB por foto.');
                    continue;
                }
                
                selectedFiles.push(file);
            }
            
            updatePreview();
        }
    }

    // Update preview area
    function updatePreview() {
        if (selectedFiles.length === 0) {
            previewArea.style.display = 'none';
            return;
        }
        
        previewArea.style.display = 'block';
        previewGrid.innerHTML = '';
        
        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview ${index + 1}">
                    <button class="preview-remove" onclick="removeFile(${index})" type="button">×</button>
                `;
                
                previewGrid.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }

    // Remove file from selection
    window.removeFile = function(index) {
        selectedFiles.splice(index, 1);
        updatePreview();
    };

    // Clear all files
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            selectedFiles = [];
            updatePreview();
            // Reset file inputs
            if (fileInput) fileInput.value = '';
            if (cameraInput) cameraInput.value = '';
        });
    }

    // Submit photos
    if (submitBtn) {
        submitBtn.addEventListener('click',async function() {
            if (selectedFiles.length === 0) {
                showNotification('Selecione pelo menos uma foto para enviar.');
                return;
            }
            
            // Simulate upload process
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
                        // Envia cada foto individualmente para a coleção "fotos" do PocketBase
            let sucesso = 0;
            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append('foto', file); // "foto" é o nome do campo da coleção no PocketBase

                try {
                    const resp = await fetch(apiConfig.getBaseURL() + '/api/collections/fotos/records', {
                        method: 'POST',
                        body: formData
                    });

                    if (resp.ok) {
                        sucesso++;
                    } else {
                        const erro = await resp.json();
                        showNotification('Erro ao enviar: ' + (erro?.message || 'Tente novamente.'));
                    }
                } catch (err) {
                    showNotification('Falha de rede ao enviar foto.');
                }
            }

            if (sucesso > 0) {
                showNotification(`${sucesso} foto(s) enviada(s) com sucesso! Obrigado por compartilhar seus momentos conosco! ❤️`);
                selectedFiles = [];
                updatePreview();
                if (fileInput) fileInput.value = '';
                if (cameraInput) cameraInput.value = '';
                
                // Refresh gallery to show new photos immediately
                if (window.photoGallery) {
                    setTimeout(() => {
                        window.photoGallery.refresh();
                    }, 1000); // Small delay to ensure upload is processed
                }
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
});

// Drag and drop functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadSection = document.querySelector('.upload-section');
    
    if (uploadSection) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadSection.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadSection.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadSection.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        uploadSection.addEventListener('drop', handleDrop, false);
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        uploadSection.classList.add('drag-over');
    }
    
    function unhighlight() {
        uploadSection.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        handleFileSelection(files);
    }
});

// Add CSS for drag and drop visual feedback
const style = document.createElement('style');
style.textContent = `
    .upload-section.drag-over {
        background: #f0f8ff;
        border: 2px dashed #d4af37;
        border-radius: 15px;
        transition: all 0.3s ease;
    }
    
    .upload-section.drag-over .upload-btn {
        transform: scale(1.05);
        border-color: #b8941f;
        background: rgba(212, 175, 55, 0.1);
    }
`;
document.head.appendChild(style);

console.log('Photo upload script loaded successfully!');