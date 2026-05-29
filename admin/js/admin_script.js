/* ==========================================
   PORTFELIO ADMIN CONTROL PANEL LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFormLanguageSwitchers();
    initModals();
    initDropzones();
});

// ----------------------------------------
// 1. Tab Switching
// ----------------------------------------
function initTabs() {
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabs = document.querySelectorAll('.tab-content');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetTabId = link.getAttribute('data-tab');
            if (!targetTabId) return;
            
            menuLinks.forEach(l => l.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            
            link.classList.add('active');
            const targetTab = document.getElementById(targetTabId);
            if (targetTab) targetTab.classList.add('active');
            
            // Save active tab in local storage
            localStorage.setItem('admin_active_tab', targetTabId);
        });
    });
    
    // Restore active tab
    const savedTab = localStorage.getItem('admin_active_tab');
    if (savedTab) {
        const matchingLink = document.querySelector(`.menu-link[data-tab="${savedTab}"]`);
        if (matchingLink) matchingLink.click();
    }
}

// ----------------------------------------
// 2. Form Language switcher
// ----------------------------------------
function initFormLanguageSwitchers() {
    // Dynamic binding to support modals loaded in DOM
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('form-lang-btn')) {
            const btn = e.target;
            const container = btn.closest('.modal-body, .glass-panel');
            if (!container) return;
            
            const lang = btn.getAttribute('data-form-lang');
            const btns = container.querySelectorAll('.form-lang-btn');
            const panes = container.querySelectorAll('.lang-pane');
            
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('data-lang') === lang) {
                    pane.classList.add('active');
                }
            });
        }
    });
}

// ----------------------------------------
// 3. Modal Managers
// ----------------------------------------
let currentModal = null;

function initModals() {
    window.openModal = function(modalId, action = 'create', id = null) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        currentModal = modal;
        modal.classList.add('active');
        
        // Reset form
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            // Clear dynamic arrays (like images and links for activities)
            const mediaGrid = form.querySelector('.media-preview-grid');
            if (mediaGrid) mediaGrid.innerHTML = '';
            
            const linkEditor = form.querySelector('#activity-links-list');
            if (linkEditor) linkEditor.innerHTML = '';
            
            // Set default random ID for new creations
            const idInput = form.querySelector('input[name="id"]');
            if (idInput && action === 'create') {
                const prefix = modalId.replace('modal-', '');
                idInput.value = prefix + '_' + Math.random().toString(36).substr(2, 9);
            }
        }
        
        // If edit mode, fetch data
        if (action === 'edit' && id) {
            const titleEl = modal.querySelector('.modal-title');
            if (titleEl) titleEl.innerText = titleEl.innerText.replace('Add', 'Edit');
            
            fetchItemData(modalId, id);
        } else {
            const titleEl = modal.querySelector('.modal-title');
            if (titleEl) titleEl.innerText = titleEl.innerText.replace('Edit', 'Add');
        }
    };
    
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            currentModal = null;
        }
    };
    
    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                currentModal = null;
            }
        });
    });
}

// ----------------------------------------
// 4. AJAX CRUD Calls
// ----------------------------------------
async function fetchItemData(modalId, id) {
    const section = modalId.replace('modal-', '');
    try {
        const response = await fetch(`index.php?action=fetch&section=${section}&id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch item data.");
        const data = await response.json();
        
        // Populate inputs matching JSON keys
        const form = document.querySelector(`#${modalId} form`);
        if (!form) return;
        
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object' && value !== null) {
                // Multi-language object (en/fr/ar)
                for (const [lang, val] of Object.entries(value)) {
                    const input = form.querySelector(`[name="${key}_${lang}"]`);
                    if (input) input.value = val;
                }
            } else {
                // Standard flat value
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = !!value;
                    } else {
                        input.value = value;
                    }
                }
            }
        }
        
        // Special case: Activities images
        if (section === 'activities' && data.images) {
            const previewGrid = form.querySelector('.media-preview-grid');
            if (previewGrid) {
                previewGrid.innerHTML = '';
                data.images.forEach(img => addMediaPreview(previewGrid, img));
            }
        }
        
        // Special case: Activities links
        if (section === 'activities' && data.links) {
            const linksContainer = form.querySelector('#activity-links-list');
            if (linksContainer) {
                linksContainer.innerHTML = '';
                data.links.forEach(lnk => addLinkRow(linksContainer, lnk.label.en, lnk.label.fr, lnk.label.ar, lnk.url));
            }
        }
        
    } catch (e) {
        showToast(e.message, 'error');
        closeModal(modalId);
    }
}

// Global submit handler for dynamic CRUD forms
window.handleFormSubmit = async function(event, actionName, modalId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('action', actionName);
    
    // Special case: Collect activity images
    if (modalId === 'modal-activities') {
        const images = [];
        form.querySelectorAll('.media-preview-item').forEach(item => {
            images.push(item.getAttribute('data-path'));
        });
        formData.append('images_json', JSON.stringify(images));
        
        // Special case: Collect activity links
        const links = [];
        form.querySelectorAll('.link-editor-row').forEach(row => {
            const labelEn = row.querySelector('.lnk-label-en').value;
            const labelFr = row.querySelector('.lnk-label-fr').value;
            const labelAr = row.querySelector('.lnk-label-ar').value;
            const url = row.querySelector('.lnk-url').value;
            if (url) {
                links.push({
                    label: { en: labelEn, fr: labelFr, ar: labelAr },
                    url: url
                });
            }
        });
        formData.append('links_json', JSON.stringify(links));
    }
    
    try {
        const response = await fetch('index.php', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        const result = await response.json();
        if (result.success) {
            showToast(result.message || "Saved successfully!", 'success');
            if (modalId) closeModal(modalId);
            
            // Reload page sections or reload location to refresh listing
            setTimeout(() => { location.reload(); }, 600);
        } else {
            showToast(result.error || "Save operation failed.", 'error');
        }
    } catch (e) {
        showToast("An unexpected request error occurred.", 'error');
    }
};

window.deleteItem = async function(section, id, csrfToken) {
    if (!confirm(`Are you sure you want to delete this ${section}?`)) return;
    
    const formData = new FormData();
    formData.append('action', `delete_${section}`);
    formData.append('id', id);
    formData.append('csrf_token', csrfToken);
    
    try {
        const response = await fetch('index.php', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        const result = await response.json();
        if (result.success) {
            showToast(result.message || "Deleted successfully!", 'success');
            setTimeout(() => { location.reload(); }, 600);
        } else {
            showToast(result.error || "Delete operation failed.", 'error');
        }
    } catch (e) {
        showToast("Request error occurred.", 'error');
    }
};

// ----------------------------------------
// 5. Drag & Drop Media Uploads
// ----------------------------------------
function initDropzones() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.dropzone') && !e.target.closest('.media-preview-remove')) {
            const dropzone = e.target.closest('.dropzone');
            const fileInput = dropzone.querySelector('input[type="file"]');
            if (fileInput) fileInput.click();
        }
    });
    
    document.addEventListener('change', (e) => {
        if (e.target.matches('.dropzone input[type="file"]')) {
            const fileInput = e.target;
            const dropzone = fileInput.closest('.dropzone');
            if (fileInput.files.length > 0) {
                uploadMediaFile(fileInput.files[0], dropzone);
            }
        }
    });
    
    // Bind Drag and Drop events
    document.addEventListener('dragover', (e) => {
        const dropzone = e.target.closest('.dropzone');
        if (dropzone) {
            e.preventDefault();
            dropzone.classList.add('dragover');
        }
    });
    
    document.addEventListener('dragleave', (e) => {
        const dropzone = e.target.closest('.dropzone');
        if (dropzone) {
            dropzone.classList.remove('dragover');
        }
    });
    
    document.addEventListener('drop', (e) => {
        const dropzone = e.target.closest('.dropzone');
        if (dropzone) {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                uploadMediaFile(files[0], dropzone);
            }
        }
    });
}

function uploadMediaFile(file, dropzone) {
    const progressContainer = dropzone.querySelector('.progress-bar-container');
    const progressBar = dropzone.querySelector('.progress-bar-fill');
    const targetInputName = dropzone.getAttribute('data-target-input'); // for single uploads (avatar)
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Retrieve CSRF token from active form
    const form = dropzone.closest('form');
    if (form) {
        const tokenInput = form.querySelector('input[name="csrf_token"]');
        if (tokenInput) formData.append('csrf_token', tokenInput.value);
    }
    
    if (progressContainer) progressContainer.style.display = 'block';
    if (progressBar) progressBar.style.width = '0%';
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && progressBar) {
            const pct = (e.loaded / e.total) * 100;
            progressBar.style.width = pct + '%';
        }
    };
    
    xhr.onload = () => {
        if (progressContainer) progressContainer.style.display = 'none';
        
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            if (res.success) {
                showToast("File uploaded successfully!", 'success');
                
                if (targetInputName) {
                    // Single image upload (like profile avatar)
                    const input = form.querySelector(`input[name="${targetInputName}"]`);
                    if (input) input.value = res.filePath;
                    
                    // Show small visual indicator
                    let indicator = dropzone.querySelector('.single-avatar-indicator');
                    if (!indicator) {
                        indicator = document.createElement('img');
                        indicator.className = 'single-avatar-indicator';
                        indicator.style.width = '50px';
                        indicator.style.height = '50px';
                        indicator.style.borderRadius = '50%';
                        indicator.style.objectFit = 'cover';
                        indicator.style.marginTop = '10px';
                        dropzone.appendChild(indicator);
                    }
                    indicator.src = '../' + res.filePath;
                } else {
                    // Multi image upload (like activity gallery)
                    const previewGrid = dropzone.closest('.form-group').querySelector('.media-preview-grid');
                    if (previewGrid) {
                        addMediaPreview(previewGrid, res.filePath);
                    }
                }
            } else {
                showToast(res.error || "Upload failed.", 'error');
            }
        } else {
            try {
                const res = JSON.parse(xhr.responseText);
                showToast(res.error || "Upload failed.", 'error');
            } catch(err) {
                showToast("Server returned error code " + xhr.status, 'error');
            }
        }
    };
    
    xhr.onerror = () => {
        if (progressContainer) progressContainer.style.display = 'none';
        showToast("Network upload error.", 'error');
    };
    
    xhr.send(formData);
}

function addMediaPreview(gridElement, path) {
    const item = document.createElement('div');
    item.className = 'media-preview-item';
    item.setAttribute('data-path', path);
    item.innerHTML = `
        <img src="../${path}" alt="upload preview">
        <div class="media-preview-remove" onclick="this.closest('.media-preview-item').remove()"><i class="fas fa-times"></i></div>
    `;
    gridElement.appendChild(item);
}

// ----------------------------------------
// 6. Dynamic Layout Control: Sort ordering
// ----------------------------------------
window.changeOrder = async function(section, id, direction, csrfToken) {
    const formData = new FormData();
    formData.append('action', 'reorder');
    formData.append('section', section);
    formData.append('id', id);
    formData.append('direction', direction);
    formData.append('csrf_token', csrfToken);
    
    try {
        const response = await fetch('index.php', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        const result = await response.json();
        if (result.success) {
            showToast("Order updated!", 'success');
            setTimeout(() => { location.reload(); }, 400);
        } else {
            showToast(result.error || "Reordering failed.", 'error');
        }
    } catch (e) {
        showToast("Request error occurred during reorder.", 'error');
    }
};

// ----------------------------------------
// 7. Activity Links Editor Add/Remove row
// ----------------------------------------
window.addActivityLinkRow = function() {
    const container = document.getElementById('activity-links-list');
    if (container) {
        addLinkRow(container);
    }
};

function addLinkRow(container, labelEn = '', labelFr = '', labelAr = '', url = '') {
    const row = document.createElement('div');
    row.className = 'link-editor-row';
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.gap = '8px';
    row.style.marginBottom = '10px';
    row.style.background = 'rgba(0,0,0,0.15)';
    row.style.padding = '10px';
    row.style.borderRadius = '10px';
    row.style.border = '1px solid var(--card-border)';
    
    row.innerHTML = `
        <input type="text" class="lnk-label-en" placeholder="Label EN" value="${escapeHTML(labelEn)}" style="flex: 1 1 120px; font-size:0.8rem; padding:8px;">
        <input type="text" class="lnk-label-fr" placeholder="Label FR" value="${escapeHTML(labelFr)}" style="flex: 1 1 120px; font-size:0.8rem; padding:8px;">
        <input type="text" class="lnk-label-ar lang-ar-input" placeholder="عنوان AR" value="${escapeHTML(labelAr)}" style="flex: 1 1 120px; font-size:0.8rem; padding:8px;">
        <input type="text" class="lnk-url" placeholder="URL (https://...)" value="${escapeHTML(url)}" style="flex: 2 1 180px; font-size:0.8rem; padding:8px;">
        <button type="button" class="btn-icon delete" onclick="this.closest('.link-editor-row').remove()" style="align-self: center;"><i class="fas fa-trash"></i></button>
    `;
    container.appendChild(row);
}

// ----------------------------------------
// 8. Static Sync trigger
// ----------------------------------------
window.syncStaticFile = async function() {
    const btn = document.getElementById('btn-sync-static');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    }
    
    try {
        const response = await fetch('export.php', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        const result = await response.json();
        if (result.success) {
            showToast("Sync successful! data.json is fully updated.", 'success');
        } else {
            showToast(result.error || "Static sync failed.", 'error');
        }
    } catch (e) {
        showToast("Request error occurred during static sync.", 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Export to data.json';
        }
    }
};

// ----------------------------------------
// 9. Toast Notification Handler
// ----------------------------------------
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse forwards';
        setTimeout(() => { toast.remove(); }, 300);
    }, 3500);
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
