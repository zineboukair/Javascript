
/**
 * Application principale Carbonely
 */

class CarbonelyApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.entities = {
            streaming: null,
            emails: null,
            cloud: null,
            devices: null,
            tips: null
        };
        this.init();
    }
    
    init() {
        // Vérifier l'authentification
        if (!authManager.requireAuth()) {
            return;
        }
        
        // Initialiser l'internationalisation
        this.i18n = window.i18n;
        
        // Initialiser les utilitaires
        this.helpers = window.Helpers;
        
        // Initialiser les entités
        this.initEntities();
        
        // Initialiser la navigation
        this.initNavigation();
        
        // Initialiser les événements globaux
        this.initGlobalEvents();
        
        // Charger la page actuelle
        this.loadPage();
    }
    
    initEntities() {
        // Initialiser chaque entité CRUD
        this.entities.streaming = new StreamingEntity();
        this.entities.emails = new EmailsEntity();
        this.entities.cloud = new CloudEntity();
        this.entities.devices = new DevicesEntity();
        this.entities.tips = new TipsEntity();
        
        // Stocker pour un accès global
        window.appEntities = this.entities;
    }
    
    initNavigation() {
        // Navigation dans le menu latéral
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page') || link.getAttribute('href');
                this.navigateTo(page);
            });
        });
        
        // Bouton de déconnexion
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            authManager.logout();
        });
        
        // Toggle du menu latéral (responsive)
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('show');
        });
        
        // Sélecteur de langue
        document.getElementById('languageSelect')?.addEventListener('change', (e) => {
            const lang = e.target.value;
            this.i18n.setLanguage(lang);
        });
        
        // Redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    initGlobalEvents() {
        // Gestion des modales
        document.addEventListener('click', (e) => {
            // Fermer les modales en cliquant à l'extérieur
            if (e.target.classList.contains('modal')) {
                const modal = bootstrap.Modal.getInstance(e.target);
                if (modal) modal.hide();
            }
            
            // Fermer les dropdowns en cliquant à l'extérieur
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
        
        // Écouter les changements de langue
        document.addEventListener('languageChanged', (e) => {
            this.updateUIForLanguage(e.detail.language);
        });
        
        // Prévenir la fermeture des formulaires non sauvegardés
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }
    
    navigateTo(page) {
        // Fermer le menu latéral sur mobile
        if (window.innerWidth < 1024) {
            document.querySelector('.sidebar')?.classList.remove('show');
        }
        
        // Mettre à jour l'URL sans rechargement
        window.history.pushState({ page }, '', page);
        
        // Changer de page
        this.currentPage = page;
        this.loadPage();
        
        // Mettre à jour le menu actif
        this.updateActiveMenu();
    }
    
    loadPage() {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;
        
        switch(this.currentPage) {
            case 'dashboard':
                this.loadDashboard(contentArea);
                break;
            case 'streaming':
                this.loadEntityPage('streaming', contentArea);
                break;
            case 'emails':
                this.loadEntityPage('emails', contentArea);
                break;
            case 'cloud':
                this.loadEntityPage('cloud', contentArea);
                break;
            case 'devices':
                this.loadEntityPage('devices', contentArea);
                break;
            case 'tips':
                this.loadEntityPage('tips', contentArea);
                break;
            default:
                this.loadDashboard(contentArea);
        }
    }
    
    loadDashboard(container) {
        container.innerHTML = `
            <div id="dashboardContainer">
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        `;
        
        // Charger le dashboard de manière asynchrone
        setTimeout(() => {
            new DashboardManager();
        }, 100);
    }
    
    loadEntityPage(entityName, container) {
        const entity = this.entities[entityName];
        if (!entity) return;
        
        container.innerHTML = `
            <div class="page-header">
                <h1>${t(`${entityName}.title`)}</h1>
                <p>Gérez vos activités de ${t(`${entityName}.title`).toLowerCase()}</p>
            </div>
            
            <div id="${entityName}Container"></div>
        `;
        
        // Rendre la liste de l'entité
        entity.renderList(`${entityName}Container`);
    }
    
    updateActiveMenu() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page') || link.getAttribute('href');
            if (page === this.currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    updateUIForLanguage(lang) {
        // Mettre à jour le sélecteur de langue
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = lang;
        }
        
        // Mettre à jour la direction du texte
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
        
        // Recharger la page actuelle
        this.loadPage();
    }
    
    handleResize() {
        // Fermer le menu latéral sur grand écran
        if (window.innerWidth >= 1024) {
            document.querySelector('.sidebar')?.classList.remove('show');
        }
    }
    
    hasUnsavedChanges() {
        // Vérifier les formulaires non soumis
        const forms = document.querySelectorAll('form');
        return Array.from(forms).some(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            return Array.from(inputs).some(input => {
                return input.hasAttribute('data-modified') && input.getAttribute('data-modified') === 'true';
            });
        });
    }
    
    // Méthodes utilitaires globales
    showLoading() {
        const loading = document.createElement('div');
        loading.id = 'globalLoading';
        loading.className = 'global-loading';
        loading.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                </div>
            </div>
        `;
        document.body.appendChild(loading);
    }
    
    hideLoading() {
        const loading = document.getElementById('globalLoading');
        if (loading) {
            loading.remove();
        }
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-body">
                <i class="fas fa-${this.getToastIcon(type)} me-2"></i>
                ${message}
                <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        const container = document.querySelector('.toast-container') || this.createToastContainer();
        container.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }
    
    getToastIcon(type) {
        const icons = {
            'info': 'info-circle',
            'success': 'check-circle',
            'warning': 'exclamation-triangle',
            'error': 'exclamation-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '1060';
        document.body.appendChild(container);
        return container;
    }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.carbonelyApp = new CarbonelyApp();
});

// Gérer la navigation avant/arrière
window.addEventListener('popstate', (event) => {
    if (window.carbonelyApp && event.state) {
        window.carbonelyApp.navigateTo(event.state.page);
    }
});                                                                                     



