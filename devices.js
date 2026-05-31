/**
 * Entité CRUD pour les appareils électroniques - Version complète corrigée
 */

class DevicesEntity extends BaseEntity {
    constructor() {
        super('devices', 'carbonely_devices_data', [
            {
                id: '1',
                type: 'Smartphone',
                model: 'iPhone 13',
                manufacturer: 'Apple',
                purchaseDate: '2022-01-15',
                energyConsumption: 7.3,
                usageHours: 4,
                status: 'active',
                co2Impact: 65.5,
                lifespan: 4,
                recyclable: true,
                userId: 'user1',
                createdAt: '2024-03-15T09:00:00Z',
                updatedAt: '2024-03-15T09:00:00Z'
            },
            {
                id: '2',
                type: 'Laptop',
                model: 'MacBook Pro',
                manufacturer: 'Apple',
                purchaseDate: '2021-06-20',
                energyConsumption: 45.2,
                usageHours: 8,
                status: 'active',
                co2Impact: 250.8,
                lifespan: 5,
                recyclable: true,
                userId: 'user1',
                createdAt: '2024-03-14T11:30:00Z',
                updatedAt: '2024-03-14T11:30:00Z'
            },
            {
                id: '3',
                type: 'Tablet',
                model: 'iPad Air',
                manufacturer: 'Apple',
                purchaseDate: '2023-03-10',
                energyConsumption: 12.5,
                usageHours: 3,
                status: 'active',
                co2Impact: 98.7,
                lifespan: 4,
                recyclable: true,
                userId: 'user1',
                createdAt: '2024-03-13T14:15:00Z',
                updatedAt: '2024-03-13T14:15:00Z'
            },
            {
                id: '4',
                type: 'Desktop',
                model: 'Custom Gaming PC',
                manufacturer: 'Custom',
                purchaseDate: '2020-11-05',
                energyConsumption: 350.0,
                usageHours: 6,
                status: 'needs_upgrade',
                co2Impact: 1250.0,
                lifespan: 6,
                recyclable: false,
                userId: 'user1',
                createdAt: '2024-03-12T16:45:00Z',
                updatedAt: '2024-03-12T16:45:00Z'
            },
            {
                id: '5',
                type: 'TV',
                model: 'Samsung QLED 55"',
                manufacturer: 'Samsung',
                purchaseDate: '2021-09-12',
                energyConsumption: 85.7,
                usageHours: 5,
                status: 'active',
                co2Impact: 420.3,
                lifespan: 7,
                recyclable: true,
                userId: 'user1',
                createdAt: '2024-03-11T10:20:00Z',
                updatedAt: '2024-03-11T10:20:00Z'
            }
        ]);
        
        this.types = ['Smartphone', 'Laptop', 'Tablet', 'Desktop', 'TV', 'Monitor', 'Router', 'Smart Speaker', 'Gaming Console', 'Smart Watch'];
        this.manufacturers = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Microsoft', 'Google', 'Sony', 'LG', 'Custom'];
        this.statuses = ['active', 'inactive', 'needs_repair', 'needs_upgrade', 'recycled', 'sold'];
        
        console.log('DevicesEntity initialisé avec', this.data.length, 'appareils');
    }
    
    // ============================================
    // MÉTHODES MANQUANTES - CORRECTION
    // ============================================
    
    /**
     * Obtenir l'analyse des appareils - CORRECTION DE L'ERREUR
     */
    getDevicesAnalysis() {
        try {
            const totalDevices = this.data.length;
            const totalEnergy = this.data.reduce((sum, item) => sum + (parseFloat(item.energyConsumption) || 0), 0);
            const totalCO2 = this.data.reduce((sum, item) => sum + (parseFloat(item.co2Impact) || 0), 0);
            const recyclableCount = this.data.filter(item => item.recyclable).length;
            const recyclablePercentage = totalDevices > 0 ? Math.round((recyclableCount / totalDevices) * 100) : 0;
            
            console.log('Analyse des appareils:', { totalDevices, totalEnergy, totalCO2, recyclablePercentage });
            
            return {
                totalDevices,
                totalEnergy,
                totalCO2,
                recyclableCount,
                recyclablePercentage
            };
        } catch (error) {
            console.error('Erreur dans getDevicesAnalysis:', error);
            return {
                totalDevices: 0,
                totalEnergy: 0,
                totalCO2: 0,
                recyclableCount: 0,
                recyclablePercentage: 0
            };
        }
    }
    
    /**
     * Obtenir le texte du statut
     */
    getStatusText(status) {
        const statusMap = {
            'active': 'Actif',
            'inactive': 'Inactif',
            'needs_repair': 'Besoin de réparation',
            'needs_upgrade': 'Besoin de mise à niveau',
            'recycled': 'Recyclé',
            'sold': 'Vendu'
        };
        return statusMap[status] || status;
    }
    
    /**
     * Obtenir l'icône de l'appareil
     */
    getDeviceIcon(type) {
        const icons = {
            'Smartphone': 'fas fa-mobile-alt',
            'Laptop': 'fas fa-laptop',
            'Tablet': 'fas fa-tablet-alt',
            'Desktop': 'fas fa-desktop',
            'TV': 'fas fa-tv',
            'Monitor': 'fas fa-desktop',
            'Router': 'fas fa-wifi',
            'Smart Speaker': 'fas fa-volume-up',
            'Gaming Console': 'fas fa-gamepad',
            'Smart Watch': 'fas fa-clock'
        };
        return icons[type] || 'fas fa-microchip';
    }
    
    /**
     * Obtenir la classe CSS de l'icône
     */
    getDeviceIconClass(type) {
        const colors = {
            'Smartphone': 'text-primary',
            'Laptop': 'text-info',
            'Tablet': 'text-success',
            'Desktop': 'text-warning',
            'TV': 'text-danger',
            'Monitor': 'text-secondary',
            'Router': 'text-primary',
            'Smart Speaker': 'text-info',
            'Gaming Console': 'text-success',
            'Smart Watch': 'text-warning'
        };
        return colors[type] || 'text-muted';
    }
    
    /**
     * Obtenir la classe CSS de la ligne du tableau
     */
    getDeviceRowClass(item) {
        if (item.status === 'needs_repair') return 'table-warning';
        if (item.status === 'needs_upgrade') return 'table-danger';
        if (item.status === 'recycled') return 'table-success';
        if (item.status === 'sold') return 'table-secondary';
        return '';
    }
    
    /**
     * Vérifier si l'appareil est ancien
     */
    isOldDevice(item) {
        const age = this.getDeviceAge(item);
        const lifespan = item.lifespan || this.calculateLifespan(item.type);
        return age > lifespan;
    }
    
    /**
     * Obtenir l'âge de l'appareil
     */
    getDeviceAge(item) {
        try {
            const purchaseDate = new Date(item.purchaseDate);
            const today = new Date();
            const age = today.getFullYear() - purchaseDate.getFullYear();
            const monthDiff = today.getMonth() - purchaseDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < purchaseDate.getDate())) {
                return age - 1;
            }
            return age;
        } catch (error) {
            console.error('Erreur getDeviceAge:', error);
            return 0;
        }
    }
    
    /**
     * Obtenir le pourcentage de durée de vie utilisée
     */
    getLifespanPercentage(item) {
        const age = this.getDeviceAge(item);
        const lifespan = item.lifespan || this.calculateLifespan(item.type);
        return Math.min((age / lifespan) * 100, 100);
    }
    
    /**
     * Obtenir la couleur de la barre de durée de vie
     */
    getLifespanColor(item) {
        const percentage = this.getLifespanPercentage(item);
        if (percentage < 50) return 'bg-success';
        if (percentage < 80) return 'bg-warning';
        return 'bg-danger';
    }
    
    /**
     * Obtenir la classe CSS pour le CO₂
     */
    getCO2Class(co2) {
        if (co2 < 50) return 'co2-low';
        if (co2 < 200) return 'co2-medium';
        return 'co2-high';
    }
    
    /**
     * Obtenir l'équivalent CO₂
     */
    getCO2Equivalent(co2) {
        if (co2 < 10) return '≈ 50 km voiture';
        if (co2 < 100) return '≈ 500 km voiture';
        return '≈ 5000+ km voiture';
    }
    
    /**
     * Obtenir la classe CSS du badge de statut
     */
    getStatusBadgeClass(status) {
        const classes = {
            'active': 'bg-success',
            'inactive': 'bg-secondary',
            'needs_repair': 'bg-warning',
            'needs_upgrade': 'bg-danger',
            'recycled': 'bg-info',
            'sold': 'bg-dark'
        };
        return classes[status] || 'bg-secondary';
    }
    
    // ============================================
    // MÉTHODES DE BASE
    // ============================================
    
    validate(data) {
        const errors = {};
        
        if (!data.type || !this.types.includes(data.type)) {
            errors.type = 'Type d\'appareil invalide';
        }
        
        if (!data.model || data.model.length < 2) {
            errors.model = 'Modèle invalide';
        }
        
        if (!data.purchaseDate || isNaN(Date.parse(data.purchaseDate))) {
            errors.purchaseDate = 'Date d\'achat invalide';
        }
        
        if (!data.energyConsumption || data.energyConsumption < 0 || data.energyConsumption > 1000) {
            errors.energyConsumption = 'Consommation invalide (0-1000 kWh/an)';
        }
        
        if (data.usageHours && (data.usageHours < 0 || data.usageHours > 24)) {
            errors.usageHours = 'Heures d\'utilisation invalides';
        }
        
        if (!data.status || !this.statuses.includes(data.status)) {
            errors.status = 'Statut invalide';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
    
    calculateCO2Impact(energyConsumption, usageHours = 0) {
        // Estimation: 0.233 kg CO₂ par kWh (mix électrique moyen France)
        const annualEnergy = energyConsumption * (usageHours / 24) * 365;
        return parseFloat((annualEnergy * 0.233).toFixed(1));
    }
    
    calculateLifespan(type) {
        const lifespans = {
            'Smartphone': 3,
            'Laptop': 5,
            'Tablet': 4,
            'Desktop': 6,
            'TV': 7,
            'Monitor': 6,
            'Router': 5,
            'Smart Speaker': 4,
            'Gaming Console': 6,
            'Smart Watch': 3
        };
        return lifespans[type] || 4;
    }
    
    // ============================================
    // RENDERLIST - VERSION CORRIGÉE
    // ============================================
    
    renderList(containerId) {
        console.log('renderList appelé pour:', containerId);
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container non trouvé:', containerId);
            return;
        }
        
        try {
            // CORRECTION: Appel correct des méthodes
            const analysis = this.getDevicesAnalysis();
            const paginatedData = this.getPaginatedData();
            
            console.log('Données de pagination:', paginatedData);
            console.log('Analyse:', analysis);
            
            container.innerHTML = `
                <style>
                    .stat-card {
                        border-radius: 10px;
                        padding: 20px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        transition: transform 0.3s ease;
                        min-height: 120px;
                    }
                    .stat-card:hover {
                        transform: translateY(-5px);
                    }
                    .stat-value {
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .stat-label {
                        font-size: 14px;
                        opacity: 0.9;
                    }
                    .stat-icon {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        font-size: 40px;
                        opacity: 0.2;
                    }
                    .device-icon {
                        width: 40px;
                        height: 40px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                    }
                    .co2-low { color: #28a745; }
                    .co2-medium { color: #ffc107; }
                    .co2-high { color: #dc3545; }
                    .economy-card {
                        padding: 15px;
                        border-radius: 8px;
                        background: #f8f9fa;
                        text-align: center;
                    }
                    .economy-value {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .economy-label {
                        font-size: 12px;
                        color: #6c757d;
                    }
                </style>
                
                <div class="row mb-4">
                    <div class="col-xl-3 col-md-6 mb-3">
                        <div class="stat-card bg-primary text-white">
                            <div class="stat-value">${analysis.totalDevices}</div>
                            <div class="stat-label">Appareils total</div>
                            <div class="stat-icon">
                                <i class="fas fa-laptop"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 mb-3">
                        <div class="stat-card bg-warning text-white">
                            <div class="stat-value">${analysis.totalEnergy.toFixed(0)}</div>
                            <div class="stat-label">Énergie/an (kWh)</div>
                            <div class="stat-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 mb-3">
                        <div class="stat-card bg-danger text-white">
                            <div class="stat-value">${analysis.totalCO2.toFixed(0)}</div>
                            <div class="stat-label">CO₂/an (kg)</div>
                            <div class="stat-icon">
                                <i class="fas fa-leaf"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 mb-3">
                        <div class="stat-card bg-success text-white">
                            <div class="stat-value">${analysis.recyclablePercentage}%</div>
                            <div class="stat-label">Recyclables</div>
                            <div class="stat-icon">
                                <i class="fas fa-recycle"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Barre d'actions -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-search"></i>
                                    </span>
                                    <input type="text" 
                                           class="form-control" 
                                           id="devicesSearch" 
                                           placeholder="Rechercher un appareil..."
                                           value="${this.searchTerm || ''}">
                                </div>
                            </div>
                            <div class="col-md-6 mb-3 mb-md-0">
                                <div class="row g-2">
                                    <div class="col-6">
                                        <select class="form-select" id="devicesTypeFilter">
                                            <option value="">Tous les types</option>
                                            ${this.types.map(type => `
                                                <option value="${type}" ${this.filters?.type === type ? 'selected' : ''}>
                                                    ${type}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <select class="form-select" id="devicesStatusFilter">
                                            <option value="">Tous les statuts</option>
                                            ${this.statuses.map(status => `
                                                <option value="${status}" ${this.filters?.status === status ? 'selected' : ''}>
                                                    ${this.getStatusText(status)}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-primary w-100" id="addDeviceBtn">
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
                            <i class="fas fa-laptop me-2"></i>Appareils Électroniques
                        </h5>
                        <div class="btn-group">
                            <button class="btn btn-outline-success" id="ecoDeviceBtn" title="Éco-conseils">
                                <i class="fas fa-leaf"></i>
                            </button>
                            <button class="btn btn-outline-warning" id="optimizeDevicesBtn" title="Optimiser">
                                <i class="fas fa-magic"></i>
                            </button>
                            <button class="btn btn-outline-info" id="exportCsvBtn" title="Exporter CSV">
                                <i class="fas fa-file-csv"></i>
                            </button>
                            <button class="btn btn-outline-danger" id="exportPdfBtn" title="Exporter PDF">
                                <i class="fas fa-file-pdf"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th width="20%">
                                            <i class="fas fa-mobile-alt me-2"></i>Type
                                        </th>
                                        <th width="20%">
                                            <i class="fas fa-tag me-2"></i>Modèle
                                        </th>
                                        <th width="15%">
                                            <i class="fas fa-calendar me-2"></i>Achat
                                        </th>
                                        <th width="15%">
                                            <i class="fas fa-bolt me-2"></i>Énergie
                                        </th>
                                        <th width="15%">
                                            <i class="fas fa-leaf me-2"></i>CO₂/an
                                        </th>
                                        <th width="10%">
                                            <i class="fas fa-info-circle me-2"></i>Statut
                                        </th>
                                        <th width="5%" class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${paginatedData.data.length === 0 ? `
                                        <tr>
                                            <td colspan="7" class="text-center py-4">
                                                <div class="text-muted">
                                                    <i class="fas fa-laptop fa-3x mb-3"></i>
                                                    <p class="mb-0">Aucun appareil trouvé</p>
                                                    <small>Cliquez sur "Ajouter" pour créer votre premier appareil</small>
                                                </div>
                                            </td>
                                        </tr>
                                    ` : paginatedData.data.map(item => `
                                        <tr data-id="${item.id}" class="${this.getDeviceRowClass(item)}">
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="device-icon ${this.getDeviceIconClass(item.type)} me-2">
                                                        <i class="${this.getDeviceIcon(item.type)}"></i>
                                                    </div>
                                                    <div>
                                                        <div class="fw-semibold">${item.type}</div>
                                                        <div class="text-muted small">${item.manufacturer || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="fw-semibold">${item.model}</div>
                                                ${this.isOldDevice(item) ? `
                                                    <span class="badge bg-warning mt-1">
                                                        <i class="fas fa-exclamation-triangle"></i> Ancien
                                                    </span>
                                                ` : ''}
                                            </td>
                                            <td>
                                                <div>${this.formatDate(item.purchaseDate)}</div>
                                                <div class="text-muted small">
                                                    ${this.getDeviceAge(item)} an(s)
                                                    <div class="progress mt-1" style="height: 4px;">
                                                        <div class="progress-bar ${this.getLifespanColor(item)}" 
                                                             style="width: ${this.getLifespanPercentage(item)}%">
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="fw-semibold">${parseFloat(item.energyConsumption).toFixed(1)} kWh</div>
                                                <div class="text-muted small">${item.usageHours || 0} h/j</div>
                                            </td>
                                            <td>
                                                <div class="fw-semibold ${this.getCO2Class(parseFloat(item.co2Impact))}">
                                                    ${parseFloat(item.co2Impact).toFixed(1)} kg
                                                </div>
                                                <div class="text-muted small">${this.getCO2Equivalent(parseFloat(item.co2Impact))}</div>
                                            </td>
                                            <td>
                                                <span class="badge ${this.getStatusBadgeClass(item.status)}">
                                                    ${this.getStatusText(item.status)}
                                                </span>
                                                ${item.recyclable ? `
                                                    <span class="badge bg-success mt-1 d-block">
                                                        <i class="fas fa-recycle"></i> Recyclable
                                                    </span>
                                                ` : ''}
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
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    ${paginatedData.total > 0 ? `
                        <div class="card-footer">
                            ${this.renderPagination(paginatedData)}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Modal pour formulaire -->
                <div class="modal fade" id="deviceModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="deviceModalTitle">
                                    <i class="fas fa-laptop me-2"></i>
                                    Créer un appareil
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <form id="deviceForm" novalidate>
                                <div class="modal-body">
                                    <input type="hidden" id="deviceId">
                                    
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="deviceType" class="form-label required">
                                                    <i class="fas fa-mobile-alt me-1"></i>Type
                                                </label>
                                                <select class="form-select" id="deviceType" required>
                                                    <option value="">Sélectionnez un type</option>
                                                    ${this.types.map(type => `
                                                        <option value="${type}">${type}</option>
                                                    `).join('')}
                                                </select>
                                                <div class="invalid-feedback" id="typeError"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="deviceManufacturer" class="form-label">
                                                    <i class="fas fa-industry me-1"></i>Fabricant
                                                </label>
                                                <select class="form-select" id="deviceManufacturer">
                                                    <option value="">Non spécifié</option>
                                                    ${this.manufacturers.map(manufacturer => `
                                                        <option value="${manufacturer}">${manufacturer}</option>
                                                    `).join('')}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="deviceModel" class="form-label required">
                                            <i class="fas fa-tag me-1"></i>Modèle
                                        </label>
                                        <input type="text" 
                                               class="form-control" 
                                               id="deviceModel" 
                                               required>
                                        <div class="invalid-feedback" id="modelError"></div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="devicePurchaseDate" class="form-label required">
                                                    <i class="fas fa-calendar me-1"></i>Date d'achat
                                                </label>
                                                <input type="date" 
                                                       class="form-control" 
                                                       id="devicePurchaseDate" 
                                                       required>
                                                <div class="invalid-feedback" id="purchaseDateError"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="deviceLifespan" class="form-label">
                                                    <i class="fas fa-hourglass-half me-1"></i>Durée de vie (années)
                                                </label>
                                                <input type="number" 
                                                       class="form-control" 
                                                       id="deviceLifespan" 
                                                       min="1" 
                                                       max="10" 
                                                       step="1">
                                                <small class="text-muted">Laissé vide pour estimation automatique</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="deviceEnergy" class="form-label required">
                                                    <i class="fas fa-bolt me-1"></i>Énergie (kWh/an)
                                                </label>
                                                <input type="number" 
                                                       class="form-control" 
                                                       id="deviceEnergy" 
                                                       min="0" 
                                                       max="1000" 
                                                       step="0.1"
                                                       required>
                                                <div class="invalid-feedback" id="energyError"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="deviceUsage" class="form-label">
                                                    <i class="fas fa-clock me-1"></i>Utilisation (heures/jour)
                                                </label>
                                                <input type="number" 
                                                       class="form-control" 
                                                       id="deviceUsage" 
                                                       min="0" 
                                                       max="24" 
                                                       step="0.5"
                                                       value="8">
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="deviceCO2" class="form-label">
                                                    <i class="fas fa-leaf me-1"></i>Impact CO₂ (kg/an)
                                                </label>
                                                <input type="number" 
                                                       class="form-control" 
                                                       id="deviceCO2" 
                                                       min="0" 
                                                       max="5000" 
                                                       step="0.1"
                                                       readonly>
                                                <small class="text-muted">Calculé automatiquement</small>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="deviceStatus" class="form-label required">
                                                    <i class="fas fa-info-circle me-1"></i>Statut
                                                </label>
                                                <select class="form-select" id="deviceStatus" required>
                                                    <option value="">Sélectionnez un statut</option>
                                                    ${this.statuses.map(status => `
                                                        <option value="${status}">
                                                            ${this.getStatusText(status)}
                                                        </option>
                                                    `).join('')}
                                                </select>
                                                <div class="invalid-feedback" id="statusError"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-check mb-3">
                                        <input type="checkbox" 
                                               class="form-check-input" 
                                               id="deviceRecyclable" checked>
                                        <label class="form-check-label" for="deviceRecyclable">
                                            <i class="fas fa-recycle me-1"></i>Appareil recyclable
                                        </label>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Annuler
                                    </button>
                                    <button type="submit" class="btn btn-primary" id="deviceSubmitBtn">
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            this.initListEvents();
            this.initPaginationEvents();
            
            console.log('renderList terminé avec succès');
            
        } catch (error) {
            console.error('Erreur dans renderList:', error);
            container.innerHTML = `
                <div class="alert alert-danger">
                    <h5><i class="fas fa-exclamation-triangle me-2"></i>Erreur d'affichage</h5>
                    <p>Une erreur est survenue lors du chargement des appareils:</p>
                    <pre class="bg-dark text-light p-2 rounded">${error.toString()}</pre>
                    <button class="btn btn-primary mt-2" onclick="location.reload()">
                        <i class="fas fa-redo me-2"></i>Recharger la page
                    </button>
                </div>
            `;
        }
    }
    
    // ============================================
    // MÉTHODE FORMATDATE MANQUANTE
    // ============================================
    
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
    
    // ============================================
    // GESTION DES ÉVÉNEMENTS
    // ============================================
    
    initListEvents() {
        console.log('Initialisation des événements Devices');
        
        // Recherche
        const searchInput = document.getElementById('devicesSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.currentPage = 1;
                this.renderList('devicesContainer');
            });
        }
        
        // Filtres
        const typeFilter = document.getElementById('devicesTypeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.filters.type = e.target.value || undefined;
                this.currentPage = 1;
                this.renderList('devicesContainer');
            });
        }
        
        const statusFilter = document.getElementById('devicesStatusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filters.status = e.target.value || undefined;
                this.currentPage = 1;
                this.renderList('devicesContainer');
            });
        }
        
        // Bouton d'ajout
        const addBtn = document.getElementById('addDeviceBtn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCreateForm();
            });
        }
        
        // NOUVEAUX BOUTONS
        // Éco-conseils
        const ecoBtn = document.getElementById('ecoDeviceBtn');
        if (ecoBtn) {
            ecoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showEcoTips();
            });
        }
        
        // Optimiser
        const optimizeBtn = document.getElementById('optimizeDevicesBtn');
        if (optimizeBtn) {
            optimizeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.optimizeDevices();
            });
        }
        
        // Export CSV
        const exportCsvBtn = document.getElementById('exportCsvBtn');
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportToCSV();
            });
        }
        
        // Export PDF
        const exportPdfBtn = document.getElementById('exportPdfBtn');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportToPDF();
            });
        }
        
        // Calcul automatique CO₂
        const typeSelect = document.getElementById('deviceType');
        const energyInput = document.getElementById('deviceEnergy');
        const usageInput = document.getElementById('deviceUsage');
        const lifespanInput = document.getElementById('deviceLifespan');
        const co2Input = document.getElementById('deviceCO2');
        
        if (typeSelect && energyInput && usageInput && lifespanInput && co2Input) {
            const updateCalculations = () => {
                const type = typeSelect.value;
                const energy = parseFloat(energyInput.value) || 0;
                const usage = parseFloat(usageInput.value) || 0;
                
                // Calcul CO₂
                const co2 = this.calculateCO2Impact(energy, usage);
                co2Input.value = co2.toFixed(1);
                
                // Calcul durée de vie si vide
                if (type && !lifespanInput.value) {
                    const lifespan = this.calculateLifespan(type);
                    lifespanInput.value = lifespan;
                }
            };
            
            typeSelect.addEventListener('change', updateCalculations);
            energyInput.addEventListener('input', updateCalculations);
            usageInput.addEventListener('input', updateCalculations);
        }
        
        // Soumission formulaire
        const form = document.getElementById('deviceForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Événements délégués pour les boutons d'action
        const tableBody = document.querySelector('#devicesContainer table tbody');
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
                }
            });
        }
    }
    
    // ============================================
    // FONCTIONNALITÉS CSV/PDF - VERSION SIMPLIFIÉE
    // ============================================
    
    /**
     * Export CSV simplifié
     */
    exportToCSV() {
        try {
            if (this.data.length === 0) {
                this.showToast('Aucune donnée à exporter', 'warning');
                return;
            }
            
            const headers = ['Type', 'Modèle', 'Fabricant', 'Date achat', 'Énergie (kWh)', 'CO₂ (kg)', 'Statut', 'Recyclable'];
            const csvRows = [headers.join(',')];
            
            this.data.forEach(item => {
                const row = [
                    `"${item.type}"`,
                    `"${item.model}"`,
                    `"${item.manufacturer || ''}"`,
                    `"${item.purchaseDate}"`,
                    item.energyConsumption,
                    item.co2Impact,
                    `"${this.getStatusText(item.status)}"`,
                    item.recyclable ? 'Oui' : 'Non'
                ];
                csvRows.push(row.join(','));
            });
            
            const csvContent = csvRows.join('\n');
            const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `appareils_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showToast('Export CSV réussi !', 'success');
            
        } catch (error) {
            console.error('Erreur export CSV:', error);
            this.showToast('Erreur lors de l\'export CSV', 'error');
        }
    }
    
    /**
     * Export PDF simplifié (sans dépendances)
     */
    async exportToPDF() {
        try {
            if (this.data.length === 0) {
                this.showToast('Aucune donnée à exporter', 'warning');
                return;
            }
            
            // Créer un document texte formaté
            let pdfContent = `RAPPORT DES APPAREILS ÉLECTRONIQUES\n`;
            pdfContent += `Date: ${new Date().toLocaleDateString('fr-FR')}\n`;
            pdfContent += `============================================\n\n`;
            
            const analysis = this.getDevicesAnalysis();
            pdfContent += `SYNTHÈSE:\n`;
            pdfContent += `- Nombre d'appareils: ${analysis.totalDevices}\n`;
            pdfContent += `- Consommation totale: ${analysis.totalEnergy.toFixed(1)} kWh/an\n`;
            pdfContent += `- CO₂ total: ${analysis.totalCO2.toFixed(1)} kg/an\n`;
            pdfContent += `- Recyclables: ${analysis.recyclablePercentage}%\n\n`;
            
            pdfContent += `DÉTAIL DES APPAREILS:\n`;
            pdfContent += `=====================\n\n`;
            
            this.data.forEach((item, index) => {
                pdfContent += `${index + 1}. ${item.type} - ${item.model}\n`;
                pdfContent += `   Fabricant: ${item.manufacturer || 'N/A'}\n`;
                pdfContent += `   Date achat: ${this.formatDate(item.purchaseDate)}\n`;
                pdfContent += `   Âge: ${this.getDeviceAge(item)} ans\n`;
                pdfContent += `   Énergie: ${item.energyConsumption} kWh/an\n`;
                pdfContent += `   CO₂: ${item.co2Impact} kg/an\n`;
                pdfContent += `   Statut: ${this.getStatusText(item.status)}\n`;
                pdfContent += `   Recyclable: ${item.recyclable ? 'Oui' : 'Non'}\n\n`;
            });
            
            // Créer un fichier texte (simulation PDF)
            const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `rapport_appareils_${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showToast('Rapport exporté (format texte)', 'success');
            
        } catch (error) {
            console.error('Erreur export PDF:', error);
            this.showToast('Erreur lors de l\'export', 'error');
        }
    }
    
    // ============================================
    // FONCTIONNALITÉS D'OPTIMISATION ET ÉCO-CONSEILS
    // ============================================
    
    /**
     * Optimisation des appareils (version simplifiée)
     */
    optimizeDevices() {
        console.log('Optimisation des appareils...');
        
        const optimizations = [];
        let totalSavings = 0;
        
        this.data.forEach(device => {
            if (device.status !== 'active') return;
            
            // Vérifier les optimisations possibles
            if (this.isOldDevice(device)) {
                optimizations.push({
                    device: device,
                    type: 'remplacement',
                    description: `${device.type} ${device.model} a dépassé sa durée de vie`,
                    savings: device.energyConsumption * 0.3 // 30% d'économie
                });
                totalSavings += device.energyConsumption * 0.3;
            }
            
            if (device.energyConsumption > 100) {
                optimizations.push({
                    device: device,
                    type: 'efficacité',
                    description: `${device.type} consomme beaucoup d'énergie`,
                    savings: device.energyConsumption * 0.15 // 15% d'économie
                });
                totalSavings += device.energyConsumption * 0.15;
            }
        });
        
        if (optimizations.length === 0) {
            this.showToast('Aucune optimisation nécessaire', 'info');
            return;
        }
        
        this.showSimpleOptimizationResults(optimizations, totalSavings);
    }
    
    /**
     * Afficher les résultats d'optimisation simplifiés
     */
    showSimpleOptimizationResults(optimizations, totalSavings) {
        const modalId = 'simpleOptimizationModal';
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
                            Optimisations recommandées
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-info mb-3">
                            <h6><i class="fas fa-lightbulb me-2"></i>Économies potentielles</h6>
                            <p class="mb-0">Vous pourriez économiser <strong>${totalSavings.toFixed(1)} kWh/an</strong></p>
                        </div>
                        
                        <h6 class="mb-3">Recommandations:</h6>
                        <div class="list-group">
                            ${optimizations.map((opt, index) => `
                                <div class="list-group-item">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">${opt.device.type} ${opt.device.model}</h6>
                                        <span class="badge ${opt.type === 'remplacement' ? 'bg-danger' : 'bg-warning'}">
                                            ${opt.type === 'remplacement' ? 'Remplacement' : 'Optimisation'}
                                        </span>
                                    </div>
                                    <p class="mb-1">${opt.description}</p>
                                    <small class="text-muted">Économie: ${opt.savings.toFixed(1)} kWh/an</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="button" class="btn btn-success" id="applyOptimizationsBtn">
                            <i class="fas fa-check me-2"></i>Appliquer
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        // Appliquer les optimisations
        const applyBtn = document.getElementById('applyOptimizationsBtn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyOptimizations(optimizations);
                modal.hide();
                this.showToast('Optimisations appliquées !', 'success');
                this.renderList('devicesContainer');
            });
        }
        
        modalElement.addEventListener('hidden.bs.modal', () => {
            modalElement.remove();
        });
    }
    
    /**
     * Appliquer les optimisations
     */
    applyOptimizations(optimizations) {
        optimizations.forEach(opt => {
            const device = this.read(opt.device.id);
            if (device) {
                if (opt.type === 'efficacité') {
                    // Réduction de 15% de la consommation
                    device.energyConsumption *= 0.85;
                    device.co2Impact = this.calculateCO2Impact(device.energyConsumption, device.usageHours || 0);
                    device.updatedAt = new Date().toISOString();
                }
            }
        });
        
        this.saveData();
    }
    
    /**
     * Afficher les éco-conseils (version simplifiée)
     */
    showEcoTips() {
        const tips = [
            {
                title: 'Activer les modes économie d\'énergie',
                description: 'Réduisez la consommation de 20% sur tous vos appareils',
                icon: 'fas fa-bolt',
                color: 'warning'
            },
            {
                title: 'Nettoyer régulièrement les appareils',
                description: 'Améliore l\'efficacité et prolonge la durée de vie',
                icon: 'fas fa-wind',
                color: 'info'
            },
            {
                title: 'Programmer la mise en veille',
                description: 'Configurez la veille automatique après 15 minutes',
                icon: 'fas fa-clock',
                color: 'primary'
            },
            {
                title: 'Recycler les anciens appareils',
                description: 'Déposez-les dans les points de collecte agréés',
                icon: 'fas fa-recycle',
                color: 'success'
            }
        ];
        
        const modalId = 'simpleEcoTipsModal';
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
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-leaf me-2"></i>
                            Éco-conseils pour vos appareils
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-success mb-3">
                            <h6 class="mb-0"><i class="fas fa-lightbulb me-2"></i>Bonnes pratiques</h6>
                        </div>
                        
                        <div class="row">
                            ${tips.map(tip => `
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body text-center">
                                            <div class="mb-3">
                                                <i class="${tip.icon} fa-2x text-${tip.color}"></i>
                                            </div>
                                            <h6>${tip.title}</h6>
                                            <p class="small text-muted">${tip.description}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
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
    
    // ============================================
    // MÉTHODES DE FORMULAIRES ET DÉTAILS
    // ============================================
    
    showCreateForm() {
        const modalElement = document.getElementById('deviceModal');
        if (!modalElement) return;
        
        const modal = new bootstrap.Modal(modalElement);
        const form = document.getElementById('deviceForm');
        
        // Réinitialiser
        form.reset();
        document.getElementById('deviceId').value = '';
        document.getElementById('deviceModalTitle').innerHTML = `
            <i class="fas fa-plus me-2"></i>
            Créer un appareil
        `;
        document.getElementById('deviceSubmitBtn').textContent = 'Créer';
        document.getElementById('devicePurchaseDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('deviceUsage').value = '8';
        document.getElementById('deviceRecyclable').checked = true;
        
        modal.show();
    }
    
    showEditForm(id) {
        const device = this.read(id);
        if (!device) return;
        
        const modalElement = document.getElementById('deviceModal');
        if (!modalElement) return;
        
        const modal = new bootstrap.Modal(modalElement);
        
        // Mettre à jour le titre
        document.getElementById('deviceModalTitle').innerHTML = `
            <i class="fas fa-edit me-2"></i>
            Modifier ${device.model}
        `;
        document.getElementById('deviceSubmitBtn').textContent = 'Mettre à jour';
        
        // Remplir les champs
        document.getElementById('deviceId').value = device.id;
        document.getElementById('deviceType').value = device.type || '';
        document.getElementById('deviceManufacturer').value = device.manufacturer || '';
        document.getElementById('deviceModel').value = device.model || '';
        document.getElementById('devicePurchaseDate').value = device.purchaseDate || new Date().toISOString().split('T')[0];
        document.getElementById('deviceLifespan').value = device.lifespan || '';
        document.getElementById('deviceEnergy').value = device.energyConsumption || 0;
        document.getElementById('deviceUsage').value = device.usageHours || 8;
        document.getElementById('deviceCO2').value = device.co2Impact || 0;
        document.getElementById('deviceStatus').value = device.status || 'active';
        document.getElementById('deviceRecyclable').checked = device.recyclable || false;
        
        modal.show();
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const id = document.getElementById('deviceId').value;
        const isEdit = !!id;
        
        // Validation des champs requis
        let isValid = true;
        const requiredFields = ['deviceType', 'deviceModel', 'devicePurchaseDate', 'deviceEnergy', 'deviceStatus'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId.replace('device', '').toLowerCase() + 'Error');
            
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
            type: document.getElementById('deviceType').value,
            manufacturer: document.getElementById('deviceManufacturer').value || null,
            model: document.getElementById('deviceModel').value,
            purchaseDate: document.getElementById('devicePurchaseDate').value,
            lifespan: parseInt(document.getElementById('deviceLifespan').value) || null,
            energyConsumption: parseFloat(document.getElementById('deviceEnergy').value) || 0,
            usageHours: parseFloat(document.getElementById('deviceUsage').value) || 0,
            co2Impact: parseFloat(document.getElementById('deviceCO2').value) || 0,
            status: document.getElementById('deviceStatus').value,
            recyclable: document.getElementById('deviceRecyclable').checked,
            userId: window.authManager?.getCurrentUser()?.email || 'anonymous'
        };
        
        // Calculer la durée de vie si non spécifiée
        if (!formData.lifespan) {
            formData.lifespan = this.calculateLifespan(formData.type);
        }
        
        // Validation complète
        const validation = this.validate(formData);
        if (!validation.isValid) {
            Object.entries(validation.errors).forEach(([field, error]) => {
                const errorElement = document.getElementById(`${field}Error`);
                const inputElement = document.getElementById(`device${field.charAt(0).toUpperCase() + field.slice(1)}`);
                
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
                this.showToast('Appareil mis à jour avec succès', 'success');
            } else {
                this.create(formData);
                this.showToast('Appareil créé avec succès', 'success');
            }
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('deviceModal'));
            if (modal) modal.hide();
            
            this.renderList('devicesContainer');
            
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            this.showToast('Une erreur est survenue: ' + error.message, 'error');
        }
    }
    
    async confirmDelete(id) {
        const device = this.read(id);
        if (!device) return;
        
        const confirmed = confirm(`Êtes-vous sûr de vouloir supprimer l'appareil "${device.model}" ?`);
        
        if (confirmed) {
            if (this.delete(id)) {
                this.showToast('Appareil supprimé avec succès', 'success');
                this.renderList('devicesContainer');
            }
        }
    }
    
    /**
     * Afficher les détails d'un appareil (méthode requise par BaseEntity)
     */
    showDetails(id) {
        const device = this.read(id);
        if (!device) return;
        
        const age = this.getDeviceAge(device);
        const lifespan = device.lifespan || this.calculateLifespan(device.type);
        const remainingYears = Math.max(0, lifespan - age);
        const annualCost = (device.energyConsumption * 0.15).toFixed(2);
        
        const modalId = 'deviceDetailsModal';
        let modalElement = document.getElementById(modalId);
        
        if (!modalElement) {
            modalElement = document.createElement('div');
            modalElement.id = modalId;
            modalElement.className = 'modal fade';
            modalElement.tabIndex = '-1';
            document.body.appendChild(modalElement);
        }
        
        modalElement.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="${this.getDeviceIcon(device.type)} me-2"></i>
                            ${device.type} - ${device.model}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-light">
                                        <h6 class="mb-0"><i class="fas fa-info-circle me-2"></i>Informations</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr>
                                                <td width="40%"><strong>Type:</strong></td>
                                                <td>${device.type}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Modèle:</strong></td>
                                                <td>${device.model}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Fabricant:</strong></td>
                                                <td>${device.manufacturer || 'Non spécifié'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Date achat:</strong></td>
                                                <td>${this.formatDate(device.purchaseDate)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Âge:</strong></td>
                                                <td>
                                                    ${age} an(s)
                                                    <span class="badge ${age > lifespan ? 'bg-danger' : 'bg-success'} ms-2">
                                                        ${age > lifespan ? 'Dépassé' : 'Correct'}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-light">
                                        <h6 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Impact</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr>
                                                <td width="40%"><strong>Consommation:</strong></td>
                                                <td>
                                                    <div>${device.energyConsumption.toFixed(1)} kWh/an</div>
                                                    <small class="text-muted">${device.usageHours || 0} h/jour</small>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>CO₂ annuel:</strong></td>
                                                <td>
                                                    <span class="badge ${this.getCO2Class(device.co2Impact)}">
                                                        ${device.co2Impact.toFixed(1)} kg
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Coût annuel:</strong></td>
                                                <td>
                                                    <strong>${annualCost} €</strong>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header bg-light">
                                        <h6 class="mb-0"><i class="fas fa-life-ring me-2"></i>Durée de vie</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="text-center mb-3">
                                            <div class="display-4 ${remainingYears < 2 ? 'text-danger' : 'text-success'}">
                                                ${remainingYears}
                                            </div>
                                            <div class="text-muted">année(s) restante(s)</div>
                                        </div>
                                        <div class="progress" style="height: 20px;">
                                            <div class="progress-bar ${this.getLifespanColor(device)}" 
                                                 style="width: ${this.getLifespanPercentage(device)}%">
                                                <span>${this.getLifespanPercentage(device).toFixed(0)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header bg-light">
                                        <h6 class="mb-0"><i class="fas fa-cogs me-2"></i>Statut</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <div class="d-flex justify-content-between align-items-center mb-2">
                                                <strong>Statut:</strong>
                                                <span class="badge ${this.getStatusBadgeClass(device.status)}">
                                                    ${this.getStatusText(device.status)}
                                                </span>
                                            </div>
                                            ${device.recyclable ? `
                                                <div class="alert alert-success py-2 mb-2">
                                                    <i class="fas fa-recycle me-2"></i>
                                                    Cet appareil est recyclable
                                                </div>
                                            ` : `
                                                <div class="alert alert-warning py-2 mb-2">
                                                    <i class="fas fa-exclamation-triangle me-2"></i>
                                                    Cet appareil n'est pas recyclable
                                                </div>
                                            `}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="button" class="btn btn-warning" onclick="window.devicesEntity.showEditForm('${device.id}')" data-bs-dismiss="modal">
                            <i class="fas fa-edit me-2"></i>Modifier
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
    
    /**
     * Afficher une notification toast
     */
    showToast(message, type = 'info') {
        const toastId = 'deviceToast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                                      type === 'error' ? 'fa-exclamation-circle' : 
                                      type === 'warning' ? 'fa-exclamation-triangle' : 
                                      'fa-info-circle'} me-2"></i>
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

// Exporter et créer une instance globale
window.DevicesEntity = DevicesEntity;
window.devicesEntity = new DevicesEntity();