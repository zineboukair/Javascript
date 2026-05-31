/**
 * Utilitaires pour Carbonely
 */

class Helpers {
    // Formater les dates
    static formatDate(date, format = 'fr-FR') {
        const d = new Date(date);
        return d.toLocaleDateString(format, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // Formater les nombres
    static formatNumber(num, decimals = 2) {
        return parseFloat(num).toLocaleString('fr-FR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }
    
    // Calculer le CO₂ économisé
    static calculateCO2Savings(data) {
        const baseEmissions = {
            streaming: 0.15, // kg CO₂ par heure
            email: 0.004, // kg CO₂ par email
            cloud: 0.05, // kg CO₂ par GB
            device: 50 // kg CO₂ par appareil par an
        };
        
        return data.reduce((total, item) => {
            let savings = 0;
            
            switch(item.type) {
                case 'streaming':
                    savings = (item.duration || 0) * baseEmissions.streaming * (item.reduction || 0.3);
                    break;
                case 'email':
                    savings = (item.count || 0) * baseEmissions.email * (item.reduction || 0.4);
                    break;
                case 'cloud':
                    savings = (item.storage || 0) * baseEmissions.cloud * (item.reduction || 0.2);
                    break;
                case 'device':
                    savings = (item.count || 0) * baseEmissions.device * (item.reduction || 0.15);
                    break;
            }
            
            return total + savings;
        }, 0);
    }
    
    // Générer des couleurs pour les graphiques
    static generateColors(count) {
        const colors = [
            '#2b6cb0', '#4299e1', '#38a169', '#d69e2e',
            '#e53e3e', '#805ad5', '#d53f8c', '#319795',
            '#dd6b20', '#38a169', '#ecc94b', '#9f7aea'
        ];
        
        return colors.slice(0, count);
    }
    
    // Validation d'email
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validation de nombre
    static isValidNumber(value, min = 0, max = Infinity) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    }
    
    // Débouncing pour la recherche
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Télécharger un fichier
    static downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Générer un PDF
    static generatePDF(elementId, filename = 'document.pdf') {
        if (typeof html2pdf === 'undefined') {
            console.error('html2pdf n\'est pas chargé');
            return;
        }
        
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Élément ${elementId} non trouvé`);
            return;
        }
        
        const opt = {
            margin: 1,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    }
    
    // Afficher un message d'alerte
    static showAlert(message, type = 'info', duration = 5000) {
        // Créer l'élément d'alerte
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Ajouter au document
        const container = document.querySelector('.alert-container') || 
                         document.querySelector('main') || 
                         document.body;
        
        if (document.querySelector('.alert-container')) {
            container.prepend(alertDiv);
        } else {
            const alertContainer = document.createElement('div');
            alertContainer.className = 'alert-container position-fixed top-0 end-0 p-3';
            alertContainer.style.zIndex = '1050';
            alertContainer.appendChild(alertDiv);
            document.body.appendChild(alertContainer);
        }
        
        // Auto-fermeture
        if (duration > 0) {
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, duration);
        }
        
        return alertDiv;
    }
    
    // Confirmation modale
    static async showConfirm(message, title = 'Confirmation') {
        return new Promise((resolve) => {
            // Vérifier si SweetAlert2 est disponible
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: title,
                    text: message,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Oui',
                    cancelButtonText: 'Non'
                }).then((result) => {
                    resolve(result.isConfirmed);
                });
            } else {
                // Fallback simple
                const confirmed = confirm(`${title}\n\n${message}`);
                resolve(confirmed);
            }
        });
    }
    
    // Charger des données depuis une API
    static async fetchData(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            throw error;
        }
    }
    
    // Initialiser les tooltips Bootstrap
    static initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Initialiser les popovers Bootstrap
    static initPopovers() {
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
}

// Exporter pour une utilisation globale
window.Helpers = Helpers;