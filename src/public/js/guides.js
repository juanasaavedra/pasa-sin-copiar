// Guides page JavaScript
let currentGuideId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadGuides();
    
    const purchaseForm = document.getElementById('purchaseForm');
    purchaseForm.addEventListener('submit', handlePurchaseSubmit);
});

async function loadGuides() {
    try {
        const response = await fetch('/api/guides');
        const data = await response.json();
        
        const container = document.getElementById('guidesList');
        container.innerHTML = '';
        
        if (data.guides && data.guides.length > 0) {
            data.guides.forEach(guide => {
                const card = createGuideCard(guide);
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p class="text-center">No hay guías disponibles en este momento.</p>';
        }
    } catch (error) {
        console.error('Error loading guides:', error);
        document.getElementById('guidesList').innerHTML = 
            '<p class="text-center message error">Error al cargar guías.</p>';
    }
}

function createGuideCard(guide) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const previewButton = guide.preview_url 
        ? `<button class="btn btn-small btn-secondary" onclick="viewPreview(${guide.id})">
            Ver Vista Previa
        </button>` 
        : '';
    
    const category = guide.category ? `<p><strong>Categoría:</strong> ${guide.category}</p>` : '';
    
    card.innerHTML = `
        <h3>${guide.title}</h3>
        <p>${guide.description}</p>
        ${category}
        <p class="price">$${guide.price}</p>
        <div class="flex gap-1" style="flex-wrap: wrap;">
            ${previewButton}
            <button class="btn btn-small" onclick="openPurchaseModal(${guide.id}, '${guide.title}')">
                Comprar
            </button>
        </div>
    `;
    return card;
}

async function viewPreview(guideId) {
    try {
        const response = await fetch(`/api/guides/${guideId}/preview`);
        const data = await response.json();
        
        if (response.ok && data.preview_url) {
            window.open(data.preview_url, '_blank');
        } else {
            showMessage('Vista previa no disponible', 'error');
        }
    } catch (error) {
        console.error('Error viewing preview:', error);
        showMessage('Error al cargar vista previa', 'error');
    }
}

function openPurchaseModal(guideId, guideName) {
    currentGuideId = guideId;
    document.getElementById('modal_guide_id').value = guideId;
    document.getElementById('modalGuideName').textContent = guideName;
    
    const modal = document.getElementById('purchaseModal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function closePurchaseModal() {
    const modal = document.getElementById('purchaseModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.getElementById('purchaseForm').reset();
}

async function handlePurchaseSubmit(e) {
    e.preventDefault();
    
    const formData = {
        guide_id: parseInt(document.getElementById('modal_guide_id').value),
        buyer_name: document.getElementById('modal_buyer_name').value,
        buyer_email: document.getElementById('modal_buyer_email').value
    };
    
    try {
        const response = await fetch('/api/guides/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            closePurchaseModal();
            showMessage('¡Compra exitosa! Revisa tu correo para el enlace de descarga.', 'success');
        } else {
            showMessage(data.error || 'Error al comprar guía', 'error');
        }
    } catch (error) {
        console.error('Error purchasing guide:', error);
        showMessage('Error al comprar guía. Por favor intenta nuevamente.', 'error');
    }
}

function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
