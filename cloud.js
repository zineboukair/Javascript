/**
 * Entité CRUD pour le stockage cloud - Version corrigée
 */

class CloudEntity extends BaseEntity {
    constructor() {
        super('cloud', 'carbonely_cloud_data', [
            {
                id: '1',
                provider: 'Google Drive',
                storageUsed: 15.5,
                filesCount: 245,
                lastBackup: '2024-03-15',
                co2Impact: 0.78,
                plan: 'Gratuit',
                costPerMonth: 0,
                region: 'Europe',
                encrypted: true,
                userId: 'user1',
                createdAt: '2024-03-15T10:00:00Z',
                updatedAt: '2024-03-15T10:00:00Z'
            },
            {
                id: '2',
                provider: 'Dropbox',
                storageUsed: 8.2,
                filesCount: 120,
                lastBackup: '2024-03-14',
                co2Impact: 0.41,
                plan: 'Professionnel',
                costPerMonth: 12.99,
                region: 'USA',
                encrypted: true,
                userId: 'user1',
                createdAt: '2024-03-14T14:30:00Z',
                updatedAt: '2024-03-14T14:30:00Z'
            },
            {
                id: '3',
                provider: 'Microsoft OneDrive',
                storageUsed: 25.8,
                filesCount: 512,
                lastBackup: '2024-03-13',
                co2Impact: 1.29,
                plan: 'Office 365',
                costPerMonth: 7.99,
                region: 'Europe',
                encrypted: true,
                userId: 'user1',
                createdAt: '2024-03-13T09:15:00Z',
                updatedAt: '2024-03-13T09:15:00Z'
            },
            {
                id: '4',
                provider: 'Amazon S3',
                storageUsed: 102.4,
                filesCount: 1200,
                lastBackup: '2024-03-12',
                co2Impact: 5.12,
                plan: 'Entreprise',
                costPerMonth: 45.50,
                region: 'Global',
                encrypted: true,
                userId: 'user1',
                createdAt: '2024-03-12T16:45:00Z',
                updatedAt: '2024-03-12T16:45:00Z'
            },
            {
                id: '5',
                provider: 'iCloud',
                storageUsed: 5.0,
                filesCount: 85,
                lastBackup: '2024-03-11',
                co2Impact: 0.25,
                plan: '50GB',
                costPerMonth: 0.99,
                region: 'Europe',
                encrypted: true,
                userId: 'user1',
                createdAt: '2024-03-11T11:20:00Z',
                updatedAt: '2024-03-11T11:20:00Z'
            }
        ]);
        
        this.providers = ['Google Drive', 'Dropbox', 'Microsoft OneDrive', 'Amazon S3', 'iCloud', 'Mega', 'Box', 'pCloud'];
        this.plans = ['Gratuit', 'Basique', 'Professionnel', 'Entreprise', 'Office 365', '50GB', '200GB', '2TB'];
        this.regions = ['Europe', 'USA', 'Asie', 'Global', 'Amérique du Sud', 'Afrique'];
        
        console.log('CloudEntity initialisé avec', this.data.length, 'éléments');
    }
    
    // CORRECTION : Ajout des méthodes manquantes qui étaient appelées dans renderList
    getTotalStorage() {
        try {
            const total = this.data.reduce((sum, item) => sum + (parseFloat(item.storageUsed) || 0), 0);
            console.log('getTotalStorage retourne:', total);
            return total;
        } catch (error) {
            console.error('Erreur dans getTotalStorage:', error);
            return 0;
        }
    }
    
    getTotalCO2() {
        try {
            const total = this.data.reduce((sum, item) => sum + (parseFloat(item.co2Impact) || 0), 0);
            return total;
        } catch (error) {
            console.error('Erreur dans getTotalCO2:', error);
            return 0;
        }
    }
    
    getTotalCost() {
        try {
            const total = this.data.reduce((sum, item) => sum + (parseFloat(item.costPerMonth) || 0), 0);
            return total;
        } catch (error) {
            console.error('Erreur dans getTotalCost:', error);
            return 0;
        }
    }
    
    calculateCO2Impact(storageUsed) {
        return parseFloat(storageUsed) * 0.05;
    }
    
    validate(data) {
        const errors = {};
        
        if (!data.provider || !this.providers.includes(data.provider)) {
            errors.provider = 'Fournisseur invalide';
        }
        
        if (!data.storageUsed || isNaN(data.storageUsed) || data.storageUsed < 0 || data.storageUsed > 10000) {
            errors.storageUsed = 'Stockage invalide (0-10000 GB)';
        }
        
        if (data.filesCount && (isNaN(data.filesCount) || data.filesCount < 0 || data.filesCount > 100000)) {
            errors.filesCount = 'Nombre de fichiers invalide';
        }
        
        if (!data.lastBackup || isNaN(Date.parse(data.lastBackup))) {
            errors.lastBackup = 'Date de sauvegarde invalide';
        }
        
        if (data.costPerMonth && (isNaN(data.costPerMonth) || data.costPerMonth < 0 || data.costPerMonth > 1000)) {
            errors.costPerMonth = 'Coût mensuel invalide';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
    
    renderList(containerId) {
        console.log('renderList appelé pour', containerId);
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container non trouvé:', containerId);
            return;
        }
        
        try {
            // CORRECTION : Appel correct des méthodes
            const totalStorage = this.getTotalStorage();
            const totalCO2 = this.getTotalCO2();
            const totalCost = this.getTotalCost();
            
            console.log('Totaux calculés:', { totalStorage, totalCO2, totalCost });
            
            const paginatedData = this.getPaginatedData();
            const stats = this.getStats();
            
            container.innerHTML = `
                <div class="row mb-4">
                    <div class="col-xl-3 col-md-6">
                        <div class="stat-card bg-primary text-white">
                            <div class="stat-value">${totalStorage.toFixed(1)} GB</div>
                            <div class="stat-label">Stockage total</div>
                            <div class="stat-icon">
                                <i class="fas fa-database"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="stat-card bg-success text-white">
                            <div class="stat-value">${totalCO2.toFixed(2)} kg</div>
                            <div class="stat-label">CO₂ mensuel</div>
                            <div class="stat-icon">
                                <i class="fas fa-leaf"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="stat-card bg-warning text-white">
                            <div class="stat-value">${totalCost.toFixed(2)} €</div>
                            <div class="stat-label">Coût mensuel</div>
                            <div class="stat-icon">
                                <i class="fas fa-euro-sign"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="stat-card bg-info text-white">
                            <div class="stat-value">${stats.total}</div>
                            <div class="stat-label">Services cloud</div>
                            <div class="stat-icon">
                                <i class="fas fa-cloud"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Barre d'actions -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-4">
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-search"></i>
                                    </span>
                                    <input type="text" 
                                           class="form-control" 
                                           id="cloudSearch" 
                                           placeholder="Rechercher un service..."
                                           value="${this.searchTerm || ''}">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row g-2">
                                    <div class="col">
                                        <select class="form-select" id="cloudProviderFilter">
                                            <option value="">Tous les fournisseurs</option>
                                            ${this.providers.map(provider => `
                                                <option value="${provider}" ${(this.filters?.provider === provider) ? 'selected' : ''}>
                                                    ${provider}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" id="cloudPlanFilter">
                                            <option value="">Tous les plans</option>
                                            ${this.plans.map(plan => `
                                                <option value="${plan}" ${(this.filters?.plan === plan) ? 'selected' : ''}>
                                                    ${plan}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-primary w-100" id="addCloudBtn">
                                    <i class="fas fa-plus me-1"></i> Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Tableau principal -->
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-cloud me-2"></i>Services Cloud
                        </h5>
                        <div class="btn-group">
                            <button class="btn btn-outline-secondary" id="optimizeCloudBtn" title="Optimiser le stockage">
                                <i class="fas fa-magic"></i>
                            </button>
                            <button class="btn btn-outline-secondary" id="analyzeCloudBtn" title="Analyser l'impact">
                                <i class="fas fa-chart-pie"></i>
                            </button>
                            <button class="btn btn-outline-secondary" id="exportCsvBtn" title="Exporter en CSV">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th width="25%">
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-server me-2"></i>
                                                <span>Fournisseur</span>
                                                <button class="btn btn-link btn-sm p-0 ms-1" id="sortProviderBtn">
                                                    <i class="fas fa-sort"></i>
                                                </button>
                                            </div>
                                        </th>
                                        <th width="15%">
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-database me-2"></i>
                                                <span>Stockage</span>
                                                <button class="btn btn-link btn-sm p-0 ms-1" id="sortStorageBtn">
                                                    <i class="fas fa-sort"></i>
                                                </button>
                                            </div>
                                        </th>
                                        <th width="10%">
                                            <i class="fas fa-file me-2"></i>Fichiers
                                        </th>
                                        <th width="15%">
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-leaf me-2"></i>
                                                <span>CO₂/mois</span>
                                                <button class="btn btn-link btn-sm p-0 ms-1" id="sortCO2Btn">
                                                    <i class="fas fa-sort"></i>
                                                </button>
                                            </div>
                                        </th>
                                        <th width="15%">
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-euro-sign me-2"></i>
                                                <span>Coût/mois</span>
                                                <button class="btn btn-link btn-sm p-0 ms-1" id="sortCostBtn">
                                                    <i class="fas fa-sort"></i>
                                                </button>
                                            </div>
                                        </th>
                                        <th width="10%">
                                            <i class="fas fa-calendar me-2"></i>Sauvegarde
                                        </th>
                                        <th width="10%" class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${paginatedData.data.length === 0 ? `
                                        <tr>
                                            <td colspan="7" class="text-center py-4">
                                                <div class="text-muted">
                                                    <i class="fas fa-cloud fa-3x mb-3"></i>
                                                    <p class="mb-0">Aucun service cloud trouvé</p>
                                                    <small>Cliquez sur "Ajouter" pour créer votre premier service</small>
                                                </div>
                                            </td>
                                        </tr>
                                    ` : paginatedData.data.map(item => `
                                        <tr data-id="${item.id}">
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="avatar avatar-sm me-3 ${this.getProviderColorClass(item.provider)}">
                                                        <i class="fas fa-cloud"></i>
                                                    </div>
                                                    <div>
                                                        <div class="fw-semibold">${item.provider}</div>
                                                        <div class="text-muted small">
                                                            ${item.plan || 'Non spécifié'} • ${item.region || 'Non spécifiée'}
                                                            ${item.encrypted ? '• <i class="fas fa-lock text-success ms-1"></i>' : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div class="fw-semibold">${item.storageUsed.toFixed(1)} GB</div>
                                                    <div class="progress mt-1" style="height: 5px;">
                                                        <div class="progress-bar ${this.getStorageColorClass(item.storageUsed)}" 
                                                             style="width: ${this.getStoragePercentage(item.storageUsed)}%">
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge bg-info bg-opacity-10 text-info border border-info">
                                                    ${item.filesCount}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="co2-badge ${this.getCO2Class(item.co2Impact)} me-2">
                                                        <i class="fas fa-leaf"></i>
                                                    </div>
                                                    <div>
                                                        <div class="fw-semibold">${item.co2Impact.toFixed(2)} kg</div>
                                                        <div class="text-muted small">${this.getCO2Equivalent(item.co2Impact)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="fw-semibold ${item.costPerMonth > 0 ? 'text-danger' : 'text-success'}">
                                                    ${item.costPerMonth > 0 ? `${item.costPerMonth.toFixed(2)} €` : 'Gratuit'}
                                                </div>
                                                <div class="text-muted small">par mois</div>
                                            </td>
                                            <td>
                                                <div class="text-nowrap">
                                                    <div class="small">${this.formatDate(item.lastBackup)}</div>
                                                    <div class="text-muted smaller">il y a ${this.getDaysSinceBackup(item.lastBackup)} jours</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex justify-content-center gap-1">
                                                    <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${item.id}" title="Voir les détails">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    <button class="btn btn-sm btn-outline-warning edit-btn" data-id="${item.id}" title="Modifier">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${item.id}" title="Supprimer">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                    <button class="btn btn-sm btn-outline-info backup-btn" data-id="${item.id}" title="Sauvegarder">
                                                        <i class="fas fa-save"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Pagination -->
                    ${paginatedData.total > 0 ? `
                        <div class="card-footer">
                            ${this.renderPagination(paginatedData)}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Modal pour formulaire -->
                <div class="modal fade" id="cloudModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="cloudModalTitle">
                                    <i class="fas fa-cloud me-2"></i>
                                    <span id="modalActionText">Créer un service cloud</span>
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <form id="cloudForm" novalidate>
                                <div class="modal-body">
                                    <input type="hidden" id="cloudId">
                                    
                                    <div class="mb-3">
                                        <label for="cloudProvider" class="form-label required">
                                            <i class="fas fa-server me-1"></i>Fournisseur
                                        </label>
                                        <select class="form-select" id="cloudProvider" required>
                                            <option value="">Sélectionnez un fournisseur</option>
                                            ${this.providers.map(provider => `
                                                <option value="${provider}">${provider}</option>
                                            `).join('')}
                                        </select>
                                        <div class="invalid-feedback" id="providerError"></div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="cloudStorage" class="form-label required">
                                                <i class="fas fa-database me-1"></i>Stockage (GB)
                                            </label>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="cloudStorage" 
                                                   min="0" 
                                                   max="10000" 
                                                   step="0.1"
                                                   required>
                                            <div class="invalid-feedback" id="storageError"></div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="cloudFiles" class="form-label">
                                                <i class="fas fa-file me-1"></i>Nombre de fichiers
                                            </label>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="cloudFiles" 
                                                   min="0" 
                                                   max="100000"
                                                   step="1">
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="cloudPlan" class="form-label">
                                                <i class="fas fa-tag me-1"></i>Plan
                                            </label>
                                            <select class="form-select" id="cloudPlan">
                                                <option value="">Non spécifié</option>
                                                ${this.plans.map(plan => `
                                                    <option value="${plan}">${plan}</option>
                                                `).join('')}
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="cloudCost" class="form-label">
                                                <i class="fas fa-euro-sign me-1"></i>Coût mensuel (€)
                                            </label>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="cloudCost" 
                                                   min="0" 
                                                   max="1000" 
                                                   step="0.01">
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="cloudRegion" class="form-label">
                                                <i class="fas fa-globe me-1"></i>Région
                                            </label>
                                            <select class="form-select" id="cloudRegion">
                                                <option value="">Non spécifié</option>
                                                ${this.regions.map(region => `
                                                    <option value="${region}">${region}</option>
                                                `).join('')}
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="cloudBackup" class="form-label required">
                                                <i class="fas fa-save me-1"></i>Dernière sauvegarde
                                            </label>
                                            <input type="date" 
                                                   class="form-control" 
                                                   id="cloudBackup" 
                                                   required>
                                            <div class="invalid-feedback" id="backupError"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="cloudCO2" class="form-label">
                                            <i class="fas fa-leaf me-1"></i>Impact CO₂ (kg/mois)
                                        </label>
                                        <div class="input-group">
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="cloudCO2" 
                                                   min="0" 
                                                   max="500" 
                                                   step="0.01"
                                                   readonly>
                                            <span class="input-group-text">kg</span>
                                        </div>
                                        <div class="form-text">Calculé automatiquement</div>
                                    </div>
                                    
                                    <div class="form-check form-switch mb-3">
                                        <input type="checkbox" 
                                               class="form-check-input" 
                                               id="cloudEncrypted" 
                                               checked>
                                        <label class="form-check-label" for="cloudEncrypted">
                                            <i class="fas fa-lock me-1"></i>Données chiffrées
                                        </label>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Annuler
                                    </button>
                                    <button type="submit" class="btn btn-primary" id="cloudSubmitBtn">
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            // Initialiser les événements
            this.initCloudEvents();
            this.initPaginationEvents();
            
            console.log('renderList terminé avec succès');
            
        } catch (error) {
            console.error('Erreur dans renderList:', error);
            container.innerHTML = `
                <div class="alert alert-danger">
                    <h5><i class="fas fa-exclamation-triangle me-2"></i>Erreur d'affichage</h5>
                    <p>Une erreur est survenue lors du chargement des données cloud:</p>
                    <pre class="bg-dark text-light p-2 rounded">${error.toString()}</pre>
                </div>
            `;
        }
    }
    
    // Méthodes utilitaires
    formatDate(dateString) {
        try {
            return new Date(dateString).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Erreur formatDate:', error);
            return dateString;
        }
    }
    
    getProviderColorClass(provider) {
        const colors = {
            'Google Drive': 'bg-primary bg-opacity-10 text-primary',
            'Dropbox': 'bg-info bg-opacity-10 text-info',
            'Microsoft OneDrive': 'bg-success bg-opacity-10 text-success',
            'Amazon S3': 'bg-warning bg-opacity-10 text-warning',
            'iCloud': 'bg-secondary bg-opacity-10 text-secondary'
        };
        return colors[provider] || 'bg-light text-dark';
    }
    
    getStorageColorClass(storage) {
        if (storage < 10) return 'bg-success';
        if (storage < 50) return 'bg-warning';
        if (storage < 100) return 'bg-orange';
        return 'bg-danger';
    }
    
    getStoragePercentage(storage) {
        return Math.min((storage / 100) * 100, 100);
    }
    
    getCO2Class(co2) {
        if (co2 < 0.5) return 'co2-low';
        if (co2 < 2) return 'co2-medium';
        return 'co2-high';
    }
    
    getCO2Equivalent(co2) {
        if (co2 < 0.1) return '≈ 1 km voiture';
        if (co2 < 1) return '≈ 10 km voiture';
        return '≈ 100+ km voiture';
    }
    
    getDaysSinceBackup(date) {
        try {
            const backupDate = new Date(date);
            const today = new Date();
            const diffTime = Math.abs(today - backupDate);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        } catch (error) {
            console.error('Erreur getDaysSinceBackup:', error);
            return 0;
        }
    }
    
    // Gestion des événements
    initCloudEvents() {
        console.log('Initialisation des événements Cloud');
        
        // Recherche
        const searchInput = document.getElementById('cloudSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.currentPage = 1;
                this.renderList('cloudContainer');
            });
        }
        
        // Filtres
        const providerFilter = document.getElementById('cloudProviderFilter');
        if (providerFilter) {
            providerFilter.addEventListener('change', (e) => {
                this.filters.provider = e.target.value || undefined;
                this.currentPage = 1;
                this.renderList('cloudContainer');
            });
        }
        
        const planFilter = document.getElementById('cloudPlanFilter');
        if (planFilter) {
            planFilter.addEventListener('change', (e) => {
                this.filters.plan = e.target.value || undefined;
                this.currentPage = 1;
                this.renderList('cloudContainer');
            });
        }
        
        // Bouton d'ajout
        const addBtn = document.getElementById('addCloudBtn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCreateForm();
            });
        }
        
        // Bouton d'optimisation
        const optimizeBtn = document.getElementById('optimizeCloudBtn');
        if (optimizeBtn) {
            optimizeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.optimizeStorage();
            });
        }
        
        // Bouton d'analyse
        const analyzeBtn = document.getElementById('analyzeCloudBtn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAnalysis();
            });
        }
        
        // Bouton d'export CSV
        const exportCsvBtn = document.getElementById('exportCsvBtn');
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportToCSV();
            });
        }
        
        // Boutons de tri
        const sortButtons = [
            { id: 'sortProviderBtn', column: 'provider' },
            { id: 'sortStorageBtn', column: 'storageUsed' },
            { id: 'sortCO2Btn', column: 'co2Impact' },
            { id: 'sortCostBtn', column: 'costPerMonth' }
        ];
        
        sortButtons.forEach(button => {
            const btn = document.getElementById(button.id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSort(button.column);
                });
            }
        });
        
        // Calcul automatique CO₂
        const storageInput = document.getElementById('cloudStorage');
        const co2Input = document.getElementById('cloudCO2');
        
        if (storageInput && co2Input) {
            storageInput.addEventListener('input', () => {
                const storage = parseFloat(storageInput.value) || 0;
                const co2 = this.calculateCO2Impact(storage);
                co2Input.value = co2.toFixed(2);
            });
        }
        
        // Soumission formulaire
        const form = document.getElementById('cloudForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Validation en temps réel
        const requiredFields = ['cloudProvider', 'cloudStorage', 'cloudBackup'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    this.validateField(fieldId);
                });
            }
        });
        
        // Événements délégués pour les boutons d'action dans le tableau
        const tableBody = document.querySelector('#cloudContainer table tbody');
        if (tableBody) {
            tableBody.addEventListener('click', (e) => {
                const target = e.target;
                const button = target.closest('button');
                
                if (!button) return;
                
                const id = button.getAttribute('data-id');
                if (!id) return;
                
                if (button.classList.contains('view-details-btn')) {
                    this.showDetails(id);
                } else if (button.classList.contains('edit-btn')) {
                    this.showEditForm(id);
                } else if (button.classList.contains('delete-btn')) {
                    this.confirmDelete(id);
                } else if (button.classList.contains('backup-btn')) {
                    this.triggerBackup(id);
                }
            });
        }
    }
    
    toggleSort(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }
        this.renderList('cloudContainer');
    }
    
    validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId.replace('cloud', '').toLowerCase() + 'Error');
        
        if (!field || !errorElement) return;
        
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            errorElement.textContent = 'Ce champ est obligatoire';
        } else {
            field.classList.remove('is-invalid');
            errorElement.textContent = '';
        }
    }
    
    showCreateForm() {
        const modalElement = document.getElementById('cloudModal');
        if (!modalElement) return;
        
        const modal = new bootstrap.Modal(modalElement);
        const form = document.getElementById('cloudForm');
        
        // Réinitialiser
        form.reset();
        document.getElementById('cloudId').value = '';
        document.getElementById('modalActionText').textContent = 'Créer un service cloud';
        document.getElementById('cloudSubmitBtn').textContent = 'Créer';
        document.getElementById('cloudBackup').value = new Date().toISOString().split('T')[0];
        document.getElementById('cloudEncrypted').checked = true;
        
        // Calcul CO₂ initial
        const storageInput = document.getElementById('cloudStorage');
        const co2Input = document.getElementById('cloudCO2');
        if (storageInput && co2Input) {
            storageInput.value = '5';
            co2Input.value = this.calculateCO2Impact(5).toFixed(2);
        }
        
        // Réinitialiser les erreurs
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
        
        modal.show();
    }
    
    showEditForm(id) {
        const item = this.read(id);
        if (!item) return;
        
        const modalElement = document.getElementById('cloudModal');
        if (!modalElement) return;
        
        const modal = new bootstrap.Modal(modalElement);
        
        // Mettre à jour le titre
        document.getElementById('modalActionText').textContent = `Modifier ${item.provider}`;
        document.getElementById('cloudSubmitBtn').textContent = 'Mettre à jour';
        
        // Remplir les champs
        document.getElementById('cloudId').value = item.id;
        document.getElementById('cloudProvider').value = item.provider || '';
        document.getElementById('cloudStorage').value = item.storageUsed || 0;
        document.getElementById('cloudFiles').value = item.filesCount || 0;
        document.getElementById('cloudPlan').value = item.plan || '';
        document.getElementById('cloudCost').value = item.costPerMonth || 0;
        document.getElementById('cloudRegion').value = item.region || '';
        document.getElementById('cloudBackup').value = item.lastBackup || new Date().toISOString().split('T')[0];
        document.getElementById('cloudCO2').value = item.co2Impact || this.calculateCO2Impact(item.storageUsed || 0);
        document.getElementById('cloudEncrypted').checked = item.encrypted || false;
        
        // Réinitialiser les erreurs
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
        
        modal.show();
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const id = document.getElementById('cloudId').value;
        const isEdit = !!id;
        
        // Validation des champs requis
        let isValid = true;
        const requiredFields = ['cloudProvider', 'cloudStorage', 'cloudBackup'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId.replace('cloud', '').toLowerCase() + 'Error');
            
            if (field && !field.value.trim()) {
                field.classList.add('is-invalid');
                if (errorElement) {
                    errorElement.textContent = 'Ce champ est obligatoire';
                }
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showToast('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        // Collecte des données
        const formData = {
            provider: document.getElementById('cloudProvider').value,
            storageUsed: parseFloat(document.getElementById('cloudStorage').value) || 0,
            filesCount: parseInt(document.getElementById('cloudFiles').value) || 0,
            plan: document.getElementById('cloudPlan').value || '',
            costPerMonth: parseFloat(document.getElementById('cloudCost').value) || 0,
            region: document.getElementById('cloudRegion').value || '',
            lastBackup: document.getElementById('cloudBackup').value,
            co2Impact: parseFloat(document.getElementById('cloudCO2').value) || 0,
            encrypted: document.getElementById('cloudEncrypted').checked,
            userId: window.authManager?.getCurrentUser()?.email || 'anonymous'
        };
        
        // Validation complète
        const validation = this.validate(formData);
        if (!validation.isValid) {
            Object.entries(validation.errors).forEach(([field, error]) => {
                const errorElement = document.getElementById(`${field}Error`);
                const inputElement = document.getElementById(`cloud${field.charAt(0).toUpperCase() + field.slice(1)}`);
                
                if (errorElement && inputElement) {
                    errorElement.textContent = error;
                    inputElement.classList.add('is-invalid');
                }
            });
            this.showToast('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }
        
        try {
            if (isEdit) {
                this.update(id, formData);
                this.showToast('Service cloud mis à jour avec succès', 'success');
            } else {
                this.create(formData);
                this.showToast('Service cloud créé avec succès', 'success');
            }
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('cloudModal'));
            if (modal) modal.hide();
            
            this.renderList('cloudContainer');
            
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            this.showToast('Une erreur est survenue: ' + error.message, 'error');
        }
    }
    
    async confirmDelete(id) {
        const item = this.read(id);
        if (!item) return;
        
        // Créer un modal de confirmation
        const modalId = 'deleteConfirmModal';
        let modalElement = document.getElementById(modalId);
        
        if (!modalElement) {
            modalElement = document.createElement('div');
            modalElement.id = modalId;
            modalElement.className = 'modal fade';
            modalElement.tabIndex = '-1';
            document.body.appendChild(modalElement);
        }
        
        modalElement.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Confirmer la suppression
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer le service <strong>${item.provider}</strong> ?</p>
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-circle me-2"></i>
                            Cette action est irréversible. Toutes les données de ce service seront perdues.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Supprimer</button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        // Gérer la confirmation
        const confirmBtn = document.getElementById('confirmDeleteBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (this.delete(id)) {
                    this.showToast('Service supprimé avec succès', 'success');
                    this.renderList('cloudContainer');
                }
                modal.hide();
            });
        }
        
        modalElement.addEventListener('hidden.bs.modal', () => {
            modalElement.remove();
        });
    }
    
    showDetails(id) {
        const item = this.read(id);
        if (!item) return;
        
        // Créer un modal de détails
        const modalId = 'cloudDetailsModal';
        let modalElement = document.getElementById(modalId);
        
        if (!modalElement) {
            modalElement = document.createElement('div');
            modalElement.id = modalId;
            modalElement.className = 'modal fade';
            modalElement.tabIndex = '-1';
            document.body.appendChild(modalElement);
        }
        
        const details = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-cloud me-2"></i>
                            Détails: ${item.provider}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6><i class="fas fa-info-circle me-2"></i>Informations générales</h6>
                                <table class="table table-sm">
                                    <tr>
                                        <td width="40%"><strong>Fournisseur:</strong></td>
                                        <td>${item.provider}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Plan:</strong></td>
                                        <td>${item.plan || 'Non spécifié'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Région:</strong></td>
                                        <td>${item.region || 'Non spécifiée'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Chiffrement:</strong></td>
                                        <td>
                                            ${item.encrypted ? 
                                                '<span class="badge bg-success"><i class="fas fa-lock me-1"></i>Activé</span>' : 
                                                '<span class="badge bg-danger"><i class="fas fa-unlock me-1"></i>Désactivé</span>'}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6><i class="fas fa-chart-bar me-2"></i>Statistiques</h6>
                                <table class="table table-sm">
                                    <tr>
                                        <td width="40%"><strong>Stockage:</strong></td>
                                        <td>${item.storageUsed.toFixed(1)} GB</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Fichiers:</strong></td>
                                        <td>${item.filesCount}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>CO₂/mois:</strong></td>
                                        <td>
                                            <span class="badge ${this.getCO2Class(item.co2Impact)}">
                                                ${item.co2Impact.toFixed(2)} kg
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Coût/mois:</strong></td>
                                        <td>
                                            <span class="badge ${item.costPerMonth > 0 ? 'bg-danger' : 'bg-success'}">
                                                ${item.costPerMonth > 0 ? item.costPerMonth.toFixed(2) + ' €' : 'Gratuit'}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        <div class="row mt-3">
                            <div class="col-12">
                                <h6><i class="fas fa-history me-2"></i>Historique</h6>
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <p class="mb-1">
                                            <strong>Dernière sauvegarde:</strong> 
                                            ${this.formatDate(item.lastBackup)} 
                                            (il y a ${this.getDaysSinceBackup(item.lastBackup)} jours)
                                        </p>
                                        <p class="mb-1">
                                            <strong>Créé le:</strong> 
                                            ${this.formatDate(item.createdAt)}
                                        </p>
                                        <p class="mb-0">
                                            <strong>Dernière modification:</strong> 
                                            ${this.formatDate(item.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="button" class="btn btn-warning edit-modal-btn" data-id="${item.id}" data-bs-dismiss="modal">
                            <i class="fas fa-edit me-2"></i>Modifier
                        </button>
                        <button type="button" class="btn btn-info backup-modal-btn" data-id="${item.id}" data-bs-dismiss="modal">
                            <i class="fas fa-save me-2"></i>Sauvegarder maintenant
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modalElement.innerHTML = details;
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        // Attacher les événements après l'affichage du modal
        setTimeout(() => {
            const editBtn = modalElement.querySelector('.edit-modal-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    this.showEditForm(item.id);
                });
            }
            
            const backupBtn = modalElement.querySelector('.backup-modal-btn');
            if (backupBtn) {
                backupBtn.addEventListener('click', () => {
                    this.triggerBackup(item.id);
                });
            }
        }, 100);
        
        modalElement.addEventListener('hidden.bs.modal', () => {
            modalElement.remove();
        });
    }
    
    async triggerBackup(id) {
        const item = this.read(id);
        if (!item) return;
        
        this.showToast(`Sauvegarde de ${item.provider} en cours...`, 'info');
        
        // Simulation d'une sauvegarde
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        item.lastBackup = new Date().toISOString().split('T')[0];
        item.updatedAt = new Date().toISOString();
        this.saveData();
        
        this.showToast(`Sauvegarde de ${item.provider} terminée avec succès`, 'success');
        this.renderList('cloudContainer');
    }
    
    optimizeStorage() {
        console.log('Optimisation du stockage...');
        
        // Ici vous pouvez ajouter la logique d'optimisation spécifique
        this.showToast('Optimisation en cours...', 'info');
        
        setTimeout(() => {
            this.showToast('Optimisation terminée - Recommandations affichées', 'success');
            // Afficher les recommandations d'optimisation
            this.showOptimizationRecommendations();
        }, 1000);
    }
    
    showAnalysis() {
        console.log('Analyse de l\'impact...');
        
        // Calcul des statistiques
        const totalStorage = this.getTotalStorage();
        const totalCO2 = this.getTotalCO2();
        const totalCost = this.getTotalCost();
        
        const analysisHTML = `
            <div class="card">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">
                        <i class="fas fa-chart-pie me-2"></i>
                        Analyse de l'impact cloud
                    </h5>
                </div>
                <div class="card-body">
                    <div class="alert alert-info">
                        <h6><i class="fas fa-chart-line me-2"></i>Synthèse</h6>
                        <p>Votre empreinte cloud actuelle représente:</p>
                        <ul>
                            <li><strong>${totalCO2.toFixed(2)} kg de CO₂</strong> par mois</li>
                            <li>Soit l'équivalent de <strong>${(totalCO2 * 10).toFixed(0)} km</strong> en voiture</li>
                            <li>Pour un coût mensuel de <strong>${totalCost.toFixed(2)} €</strong></li>
                        </ul>
                    </div>
                    
                    <div class="alert alert-success">
                        <h6><i class="fas fa-leaf me-2"></i>Recommandations</h6>
                        <ul>
                            <li>Consolidez vos services pour réduire les coûts</li>
                            <li>Supprimez les fichiers inutiles et doublons</li>
                            <li>Utilisez des fournisseurs cloud "verts"</li>
                            <li>Planifiez des sauvegardes régulières</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Afficher dans un modal ou dans une section dédiée
        const container = document.getElementById('cloudContainer');
        if (container) {
            const analysisDiv = document.createElement('div');
            analysisDiv.id = 'cloudAnalysis';
            analysisDiv.innerHTML = analysisHTML;
            container.insertBefore(analysisDiv, container.firstChild);
            
            // Supprimer après 10 secondes
            setTimeout(() => {
                const analysis = document.getElementById('cloudAnalysis');
                if (analysis) analysis.remove();
            }, 10000);
        }
    }
    
    showOptimizationRecommendations() {
        const recommendations = [];
        
        this.data.forEach(item => {
            // Recommandations basées sur les données
            if (item.storageUsed > 50) {
                recommendations.push(`Nettoyez ${item.provider} (${item.storageUsed.toFixed(1)} GB)`);
            }
            if (item.costPerMonth > 10 && item.storageUsed < 20) {
                recommendations.push(`Passez à un plan inférieur pour ${item.provider}`);
            }
            if (this.getDaysSinceBackup(item.lastBackup) > 30) {
                recommendations.push(`Sauvegardez ${item.provider} (dernière: ${this.getDaysSinceBackup(item.lastBackup)} jours)`);
            }
        });
        
        if (recommendations.length === 0) {
            recommendations.push('Vos services cloud sont bien optimisés !');
        }
        
        const modalId = 'optimizationModal';
        let modalElement = document.getElementById(modalId);
        
        if (!modalElement) {
            modalElement = document.createElement('div');
            modalElement.id = modalId;
            modalElement.className = 'modal fade';
            modalElement.tabIndex = '-1';
            document.body.appendChild(modalElement);
        }
        
        modalElement.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <h5 class="modal-title">
                            <i class="fas fa-magic me-2"></i>
                            Recommandations d'optimisation
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            ${recommendations.map(rec => `
                                <li class="list-group-item">
                                    <i class="fas fa-check-circle text-success me-2"></i>
                                    ${rec}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        modalElement.addEventListener('hidden.bs.modal', () => {
            modalElement.remove();
        });
    }
    
    showToast(message, type = 'info') {
        // Créer un toast Bootstrap
        const toastId = 'cloudToast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        const toastContainer = document.getElementById('toastContainer') || (() => {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(container);
            return container;
        })();
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
}

// Exporter pour une utilisation globale
window.CloudEntity = CloudEntity;