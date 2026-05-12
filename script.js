document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Referencias a elementos
const tableBody = document.getElementById('table-body');
const btnAddRow = document.getElementById('btn-add-row');
const btnExportPdf = document.getElementById('btn-export-pdf');
const btnReset = document.getElementById('btn-reset');
const taxRateInput = document.getElementById('tax-rate');
const companyLogo = document.getElementById('company-logo');

// Event Listeners
btnAddRow.addEventListener('click', addRow);
btnExportPdf.addEventListener('click', exportToPDF);
btnReset.addEventListener('click', resetForm);
taxRateInput.addEventListener('input', calculateTotals);

// Escuchar cambios en todo el documento para guardar autómaticamente
document.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        saveToLocalStorage();
        
        // Si cambia cantidad o precio, recalcular
        if (e.target.classList.contains('input-qty') || e.target.classList.contains('input-price')) {
            // Prevenir valores negativos
            if (e.target.type === 'number' && e.target.value < 0) {
                e.target.value = 0;
            }
            calculateTotals();
        }
    }
});

// Inicialización
function init() {
    // Si no hay datos, inicializamos con fechas por defecto y 1 fila
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);
    const dueDateStr = dueDate.toISOString().split('T')[0];

    document.getElementById('quote-date').value = today;
    document.getElementById('due-date').value = dueDateStr;

    if (!loadFromLocalStorage()) {
        addRow();
    }
    
    calculateTotals();
}

// Agregar fila a la tabla
function addRow(data = {}) {
    const qty = data.qty || 1;
    const desc = data.desc || '';
    const price = data.price || 0;
    
    const tr = document.createElement('tr');
    tr.className = 'item-row';
    
    tr.innerHTML = `
        <td class="cell-qty">
            <input type="number" class="transparent-input input-qty" value="${qty}" min="0" step="1">
        </td>
        <td class="cell-desc">
            <input type="text" class="transparent-input input-desc" value="${desc}" placeholder="Descripción del producto o servicio">
        </td>
        <td class="cell-price">
            <input type="number" class="transparent-input input-price" value="${price}" min="0" step="0.01">
        </td>
        <td class="cell-total" data-value="0">$ 0</td>
        <td class="cell-action no-print">
            <button class="btn-remove" title="Eliminar fila">&times;</button>
        </td>
    `;
    
    tr.querySelector('.btn-remove').addEventListener('click', (e) => {
        removeRow(e.target.closest('tr'));
    });
    
    tableBody.appendChild(tr);
    calculateTotals();
    saveToLocalStorage();
}

// Eliminar fila
function removeRow(row) {
    if (tableBody.querySelectorAll('tr').length > 1) {
        row.remove();
        calculateTotals();
        saveToLocalStorage();
    } else {
        alert('Debe haber al menos un producto en la cotización.');
    }
}

// Calcular totales
function calculateTotals() {
    let subtotal = 0;
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.input-qty').value) || 0;
        const price = parseFloat(row.querySelector('.input-price').value) || 0;
        const lineTotal = qty * price;
        
        row.querySelector('.cell-total').textContent = formatCurrency(lineTotal);
        row.querySelector('.cell-total').setAttribute('data-value', lineTotal);
        
        subtotal += lineTotal;
    });
    
    const taxRate = parseFloat(taxRateInput.value) || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const finalTotal = subtotal + taxAmount;
    
    document.getElementById('summary-subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('summary-tax').textContent = formatCurrency(taxAmount);
    document.getElementById('summary-total').textContent = formatCurrency(finalTotal);
}

// Formatear moneda
function formatCurrency(value) {
    if (isNaN(value)) value = 0;
    return '$ ' + value.toLocaleString('es-CO', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    });
}

// Exportar a PDF usando html2pdf
function exportToPDF() {
    const element = document.getElementById('quote-document');
    const quoteNumber = document.getElementById('quote-number').value || 'COTIZACION';
    const clientName = document.getElementById('client-name').value || 'Cliente';

    const opt = {
        margin:       0.3,
        filename:     `${quoteNumber}_${clientName}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0, width: 750 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    {
            mode: ['avoid-all', 'css'],
            avoid: ['.summary-section', '.totals-block', '.quote-header', '.info-section', '.quote-footer']
        }
    };

    // Forzar layout de escritorio (funciona en mobile y desktop)
    document.documentElement.classList.add('exporting-pdf');

    // Esperar al reflow antes de capturar
    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            document.documentElement.classList.remove('exporting-pdf');
        });
    }, 300);
}

// Persistencia de datos en localStorage
function saveToLocalStorage() {
    const data = {
        inputs: {},
        items: []
    };
    
    // Guardar todos los inputs e textareas que no estén en la tabla
    document.querySelectorAll('input:not(.input-qty):not(.input-desc):not(.input-price), textarea').forEach(el => {
        if (el.id && el.type !== 'file') {
            data.inputs[el.id] = el.value;
        }
    });
    
    // Guardar filas de la tabla
    tableBody.querySelectorAll('tr').forEach(row => {
        data.items.push({
            qty: row.querySelector('.input-qty').value,
            desc: row.querySelector('.input-desc').value,
            price: row.querySelector('.input-price').value
        });
    });
    
    localStorage.setItem('quote_data', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('quote_data');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Cargar inputs
            for (const id in data.inputs) {
                const el = document.getElementById(id);
                if (el) {
                    el.value = data.inputs[id];
                }
            }
            
            // Cargar filas
            if (data.items && data.items.length > 0) {
                tableBody.innerHTML = ''; // Limpiar filas por defecto
                data.items.forEach(item => {
                    addRow(item);
                });
            } else {
                addRow();
            }
            return true;
        } catch (e) {
            console.error("Error al cargar datos", e);
            return false;
        }
    }
    return false;
}

// Limpiar formulario y localStorage
function resetForm() {
    if (confirm('¿Está seguro de limpiar todos los datos? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('quote_data');
        
        // Recargar página para limpiar estado
        window.location.reload();
    }
}
