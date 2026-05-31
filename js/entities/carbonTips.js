/**
 * Entité CRUD pour les conseils de réduction carbone
 */

class TipsEntity extends BaseEntity {
    constructor() {
        super('tips', 'carbonely_tips_data', [
            {
                id: '1',
                category: 'streaming',
                title: 'Réduisez la qualité vidéo',
                description: 'Passez de la 4K à la HD pour économiser 70% de données',
                impact: 1.2,
                difficulty: 'facile',
                estimatedTime: '5 minutes',
                completed: true,
                completedDate: '2024-03-10',
                userId: 'user1',
                createdAt: '2024-03-01T10:00:00Z',
                updatedAt: '2024-03-10T15:30:00Z'
            },
            {
                id: '2',
                category: 'email',
                title: 'Nettoyez votre boîte mail',
                description: 'Supprimez les vieux emails et désabonnez-vous des newsletters inutiles',
                impact: 0.8,
                difficulty: 'moyen',
                estimatedTime: '30 minutes',
                completed: false,
                completedDate: null,
                userId: 'user1',
                createdAt: '2024-03-01T10:00:00Z',
                updatedAt: '2024-03-01T10:00:00Z'
            },
            {
                id: '3',
                category: 'cloud',
                title: 'Archivez les anciens fichiers',
                description: 'Déplacez les fichiers inutilisés vers un stockage local',
                impact: 2.5,
                difficulty: 'moyen',
                estimatedTime: '1 heure',
                completed: true,
                completedDate: '2024-03-05',
                userId: 'user1',
                createdAt: '2024-03-01T10:00:00Z',
                updatedAt: '2024-03-05T14:20:00Z'
            },
            {
                id: '4',
                category: 'device',
                title: 'Activez le mode économie d\'énergie',
                description: 'Configurez vos appareils pour qu\'ils consomment moins',
                impact: 3.0,
                difficulty: 'facile',
                estimatedTime: '10 minutes',
                completed: false,
                completedDate: null,
                userId: 'user1',
                createdAt: '2024-03-01T10:00:00Z',
                updatedAt: '2024-03-01T10:00:00Z'
            },
            {
                id: '5',
                category: 'general',
                title: 'Utilisez le Wi-Fi au lieu de la 4G/5G',
                description: 'Le Wi-Fi consomme jusqu\'à 10 fois moins d\'énergie',
                impact: 1.5,
                difficulty: 'facile',
                estimatedTime: '2 minutes',
                completed: true,
                completedDate: '2024-03-08',
                userId: 'user1',
                createdAt: '2024-03-01T10:00:00Z',
                updatedAt: '2024-03-08T09:15:00Z'
            }
        ]);
        
        this.categories = ['streaming', 'email', 'cloud', 'device', 'general', 'browsing', 'social', 'gaming'];
        this.difficulties = ['très facile', 'facile', 'moyen', 'difficile', 'très difficile'];
        this.estimatedTimes = ['5 minutes', '15 minutes', '30 minutes', '1 heure', '2 heures', '1 journée'];
    }
    
    validate(data) {
        const errors = {};
        
        if (!data.category || !this.categories.includes(data.category)) {
            errors.category = 'Catégorie invalide';
        }
        
        if (!data.title || data.title.length < 5) {
            errors.title = 'Titre trop court (min 5 caractères)';
        }
        
        if (!data.description || data.description.length < 10) {
            errors.description = 'Description trop courte';
        }
        
        if (!data.impact || data.impact < 0 || data.impact > 100) {
            errors.impact = 'Impact invalide (0-100 kg CO₂)';
        }
        
        if (!data.difficulty || !this.difficulties.includes(data.difficulty)) {
            errors.difficulty = 'Difficulté invalide';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
    
    renderList(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const paginatedData = this.getPaginatedData();
        const stats = this.getTipsStats();
        
        container.innerHTML = `
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="stat-card">
                        <div class="stat-value">${stats.total}</div>
                        <div class="stat-label">Conseils disponibles</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card success">
                        <div class="stat-value">${stats.completed}</div>
                        <div class="stat-label">Conseils appliqués</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card warning">
                        <div class="stat-value">${stats.impact.toFixed(1)} kg</div>
                        <div class="stat-label">CO₂ économisé</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card info">
                        <div class="stat-value">${stats.completionRate}%</div>
                        <div class="stat-label">Taux de complétion</div>
                    </div>
                </div>
            </div>
            
            <div class="filters-container mb-4">
                <div class="row g-3">
                    <div class="col-md-3">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="fas fa-search"></i>
                            </span>
                            <input type="text" 
                                   class="form-control" 
                                   id="tipsSearch" 
                                   placeholder="${t('actions.search')}..."
                                   value="${this.searchTerm}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="tipsCategoryFilter">
                            <option value="">${t('filter.all')} ${t('tips.category')}</option>
                            ${this.categories.map(category => `
                                <option value="${category}" ${this.filters.category === category ? 'selected' : ''}>
                                    ${t(`tips.category_${category}`) || category}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="tipsDifficultyFilter">
                            <option value="">${t('filter.all')} ${t('tips.difficulty')}</option>
                            ${this.difficulties.map(difficulty => `
                                <option value="${difficulty}" ${this.filters.difficulty === difficulty ? 'selected' : ''}>
                                    ${t(`tips.difficulty_${difficulty}`) || difficulty}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="tipsCompletedFilter">
                            <option value="">Tous</option>
                            <option value="true" ${this.filters.completed === 'true' ? 'selected' : ''}>Complétés</option>
                            <option value="false" ${this.filters.completed === 'false' ? 'selected' : ''}>À faire</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="fas fa-lightbulb me-2"></i>${t('tips.title')}
                    </h5>
                    <div class="btn-group">
                        <button class="btn btn-primary" id="addTipBtn">
                            <i class="fas fa-plus"></i> ${t('actions.create')}
                        </button>
                        <button class="btn btn-outline-success" id="generateTipsBtn">
                            <i class="fas fa-magic"></i> Générer des conseils
                        </button>
                        <button class="btn btn-outline-info" id="tipsReportBtn">
                            <i class="fas fa-chart-bar"></i> Rapport
                        </button>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="row" id="tipsContainer">
                        ${paginatedData.data.length > 0 ? paginatedData.data.map(tip => `
                            <div class="col-md-6 col-lg-4 mb-4">
                                <div class="tip-card ${tip.completed ? 'tip-completed' : ''}">
                                    <div class="tip-header">
                                        <div class="tip-category ${this.getCategoryColor(tip.category)}">
                                            <i class="${this.getCategoryIcon(tip.category)}"></i>
                                            ${t(`tips.category_${tip.category}`) || tip.category}
                                        </div>
                                        <div class="tip-actions">
                                            <button class="btn btn-sm ${tip.completed ? 'btn-success' : 'btn-outline-success'} toggle-tip" 
                                                    data-id="${tip.id}"
                                                    title="${tip.completed ? 'Marquer comme non complété' : 'Marquer comme complété'}">
                                                <i class="fas fa-${tip.completed ? 'check' : 'check'}"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-primary edit-tip" 
                                                    data-id="${tip.id}"
                                                    title="${t('actions.edit')}">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger delete-tip" 
                                                    data-id="${tip.id}"
                                                    title="${t('actions.delete')}">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="tip-body">
                                        <h6 class="tip-title">${tip.title}</h6>
                                        <p class="tip-description">${tip.description}</p>
                                        
                                        <div class="tip-meta">
                                            <div class="tip-impact">
                                                <span class="impact-value">
                                                    <i class="fas fa-leaf"></i>
                                                    ${tip.impact} kg CO₂
                                                </span>
                                                <small class="text-muted">Économie potentielle</small>
                                            </div>
                                            
                                            <div class="tip-difficulty">
                                                <span class="badge ${this.getDifficultyBadgeClass(tip.difficulty)}">
                                                    ${t(`tips.difficulty_${tip.difficulty}`) || tip.difficulty}
                                                </span>
                                                <small class="text-muted">Difficulté</small>
                                            </div>
                                        </div>
                                        
                                        ${tip.estimatedTime ? `
                                            <div class="tip-time">
                                                <i class="fas fa-clock"></i>
                                                ${tip.estimatedTime}
                                            </div>
                                        ` : ''}
                                    </div>
                                    
                                    <div class="tip-footer">
                                        ${tip.completed ? `
                                            <div class="completed-info">
                                                <i class="fas fa-check-circle text-success"></i>
                                                Complété le ${Helpers.formatDate(tip.completedDate)}
                                            </div>
                                        ` : `
                                            <button class="btn btn-sm btn-outline-primary apply-tip" data-id="${tip.id}">
                                                <i class="fas fa-play"></i> Appliquer maintenant
                                            </button>
                                        `}
                                    </div>
                                </div>
                            </div>
                        `).join('') : `
                            <div class="col-12 text-center py-5">
                                <i class="fas fa-lightbulb fa-4x text-muted mb-3"></i>
                                <h5>Aucun conseil trouvé</h5>
                                <p class="text-muted">Commencez par ajouter votre premier conseil</p>
                                <button class="btn btn-primary" id="addFirstTipBtn">
                                    <i class="fas fa-plus"></i> Ajouter un conseil
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
            
            ${paginatedData.total > 0 ? this.renderPagination(paginatedData) : ''}
            
            <!-- Modal pour créer/modifier -->
            <div class="modal fade" id="tipModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="tipModalTitle">
                                <i class="fas fa-lightbulb me-2"></i>
                                ${t('actions.create')} ${t('tips.title')}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form id="tipForm">
                            <div class="modal-body">
                                <input type="hidden" id="tipId">
                                
                                <div class="mb-3">
                                    <label for="tipCategory" class="form-label">
                                        <i class="fas fa-folder me-1"></i>${t('tips.category')}
                                    </label>
                                    <select class="form-select" id="tipCategory" required>
                                        <option value="">${t('form.required')}</option>
                                        ${this.categories.map(category => `
                                            <option value="${category}">
                                                ${t(`tips.category_${category}`) || category}
                                            </option>
                                        `).join('')}
                                    </select>
                                    <div class="invalid-feedback" id="categoryError"></div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="tipTitle" class="form-label">
                                        <i class="fas fa-heading me-1"></i>Titre du conseil
                                    </label>
                                    <input type="text" 
                                           class="form-control" 
                                           id="tipTitle" 
                                           required>
                                    <div class="invalid-feedback" id="titleError"></div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="tipDescription" class="form-label">
                                        <i class="fas fa-align-left me-1"></i>Description
                                    </label>
                                    <textarea class="form-control" 
                                              id="tipDescription" 
                                              rows="3"
                                              required></textarea>
                                    <div class="invalid-feedback" id="descriptionError"></div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="tipImpact" class="form-label">
                                                <i class="fas fa-leaf me-1"></i>${t('tips.impact')} (kg CO₂)
                                            </label>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="tipImpact" 
                                                   min="0" 
                                                   max="100" 
                                                   step="0.1"
                                                   required>
                                            <div class="invalid-feedback" id="impactError"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="tipDifficulty" class="form-label">
                                                <i class="fas fa-tachometer-alt me-1"></i>${t('tips.difficulty')}
                                            </label>
                                            <select class="form-select" id="tipDifficulty" required>
                                                <option value="">${t('form.required')}</option>
                                                ${this.difficulties.map(difficulty => `
                                                    <option value="${difficulty}">
                                                        ${t(`tips.difficulty_${difficulty}`) || difficulty}
                                                    </option>
                                                `).join('')}
                                            </select>
                                            <div class="invalid-feedback" id="difficultyError"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="tipTime" class="form-label">
                                                <i class="fas fa-clock me-1"></i>Temps estimé
                                            </label>
                                            <select class="form-select" id="tipTime">
                                                <option value="">Non spécifié</option>
                                                ${this.estimatedTimes.map(time => `
                                                    <option value="${time}">${time}</option>
                                                `).join('')}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <div class="form-check mt-4 pt-2">
                                                <input type="checkbox" 
                                                       class="form-check-input" 
                                                       id="tipCompleted">
                                                <label class="form-check-label" for="tipCompleted">
                                                    <i class="fas fa-check me-1"></i>${t('tips.completed')}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                ${this.showAdvancedFields ? `
                                    <div class="mb-3">
                                        <label for="tipResources" class="form-label">
                                            <i class="fas fa-link me-1"></i>Ressources (URLs, séparées par des virgules)
                                        </label>
                                        <textarea class="form-control" 
                                                  id="tipResources" 
                                                  rows="2"
                                                  placeholder="https://example.com, https://example2.com"></textarea>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="tipTags" class="form-label">
                                            <i class="fas fa-tags me-1"></i>Tags (séparés par des virgules)
                                        </label>
                                        <input type="text" 
                                               class="form-control" 
                                               id="tipTags"
                                               placeholder="énergie, streaming, économie">
                                    </div>
                                ` : ''}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    ${t('actions.cancel')}
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    ${t('actions.save')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        this.initListEvents();
    }
    
    getCategoryIcon(category) {
        const icons = {
            'streaming': 'fas fa-tv',
            'email': 'fas fa-envelope',
            'cloud': 'fas fa-cloud',
            'device': 'fas fa-laptop',
            'general': 'fas fa-globe',
            'browsing': 'fas fa-search',
            'social': 'fas fa-share-alt',
            'gaming': 'fas fa-gamepad'
        };
        return icons[category] || 'fas fa-lightbulb';
    }
    
    getCategoryColor(category) {
        const colors = {
            'streaming': 'category-streaming',
            'email': 'category-email',
            'cloud': 'category-cloud',
            'device': 'category-device',
            'general': 'category-general',
            'browsing': 'category-browsing',
            'social': 'category-social',
            'gaming': 'category-gaming'
        };
        return colors[category] || 'category-general';
    }
    
    getDifficultyBadgeClass(difficulty) {
        const classes = {
            'très facile': 'bg-success',
            'facile': 'bg-info',
            'moyen': 'bg-warning',
            'difficile': 'bg-orange',
            'très difficile': 'bg-danger'
        };
        return classes[difficulty] || 'bg-secondary';
    }
    
    getTipsStats() {
        const total = this.data.length;
        const completed = this.data.filter(tip => tip.completed).length;
        const impact = this.data
            .filter(tip => tip.completed)
            .reduce((sum, tip) => sum + (tip.impact || 0), 0);
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return {
            total,
            completed,
            impact,
            completionRate
        };
    }
    
    initListEvents() {
        // Recherche
        const searchInput = document.getElementById('tipsSearch');
        if (searchInput) {
            searchInput.addEventListener('input', Helpers.debounce((e) => {
                this.searchTerm = e.target.value;
                this.renderList('tipsContainer');
            }, 300));
        }
        
        // Filtres
        ['category', 'difficulty', 'completed'].forEach(filterType => {
            const filter = document.getElementById(`tips${filterType.charAt(0).toUpperCase() + filterType.slice(1)}Filter`);
            if (filter) {
                filter.addEventListener('change', (e) => {
                    this.filters[filterType] = e.target.value || undefined;
                    this.currentPage = 1;
                    this.renderList('tipsContainer');
                });
            }
        });
        
        // Événements délégués pour les cartes de conseils
        document.getElementById('tipsContainer')?.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            
            const id = target.getAttribute('data-id') || 
                       target.closest('[data-id]')?.getAttribute('data-id');
            
            if (target.classList.contains('toggle-tip')) {
                this.toggleTipCompletion(id);
            } else if (target.classList.contains('edit-tip')) {
                this.showEditForm(id);
            } else if (target.classList.contains('delete-tip')) {
                this.confirmDelete(id);
            } else if (target.classList.contains('apply-tip')) {
                this.applyTip(id);
            }
        });
        
        // Boutons d'action
        document.getElementById('addTipBtn')?.addEventListener('click', () => this.showCreateForm());
        document.getElementById('addFirstTipBtn')?.addEventListener('click', () => this.showCreateForm());
        document.getElementById('generateTipsBtn')?.addEventListener('click', () => this.generateSmartTips());
        document.getElementById('tipsReportBtn')?.addEventListener('click', () => this.generateTipsReport());
        
        // Soumission du formulaire
        const form = document.getElementById('tipForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }
    
    async toggleTipCompletion(id) {
        const tip = this.read(id);
        if (!tip) return;
        
        tip.completed = !tip.completed;
        tip.completedDate = tip.completed ? new Date().toISOString().split('T')[0] : null;
        tip.updatedAt = new Date().toISOString();
        
        this.saveData();
        
        window.carbonelyApp?.showToast(
            tip.completed ? 'Conseil marqué comme complété !' : 'Conseil marqué comme non complété',
            'success'
        );
        
        this.renderList('tipsContainer');
    }
    
    async applyTip(id) {
        const tip = this.read(id);
        if (!tip) return;
        
        // Simulation de l'application du conseil
        window.carbonelyApp?.showToast(`Application du conseil: ${tip.title}`, 'info');
        
        // Marquer comme complété après un délai
        setTimeout(() => {
            tip.completed = true;
            tip.completedDate = new Date().toISOString().split('T')[0];
            tip.updatedAt = new Date().toISOString();
            this.saveData();
            
            window.carbonelyApp?.showToast(
                `Conseil appliqué ! CO₂ économisé: ${tip.impact} kg`,
                'success'
            );
            
            this.renderList('tipsContainer');
        }, 2000);
    }
    
    async generateSmartTips() {
        // Générer des conseils intelligents basés sur les données existantes
        const userTips = this.data.filter(tip => tip.userId === authManager.getCurrentUser()?.email);
        const categories = new Set(userTips.map(tip => tip.category));
        
        const smartTips = [];
        const allCategories = ['streaming', 'email', 'cloud', 'device', 'general'];
        
        // Conseils manquants par catégorie
        allCategories.forEach(category => {
            if (!categories.has(category)) {
                smartTips.push(this.generateCategoryTip(category));
            }
        });
        
        // Conseils avancés
        if (userTips.filter(t => t.completed).length >= 3) {
            smartTips.push({
                category: 'general',
                title: 'Partagez vos bonnes pratiques',
                description: 'Encouragez vos amis et collègues à réduire leur empreinte numérique',
                impact: 5.0,
                difficulty: 'moyen',
                estimatedTime: '15 minutes'
            });
        }
        
        if (smartTips.length === 0) {
            Helpers.showAlert('Vous avez déjà des conseils pour toutes les catégories principales !', 'info');
            return;
        }
        
        // Afficher les conseils générés
        let message = `<strong>Conseils générés pour vous :</strong><br><br>`;
        
        smartTips.forEach((tip, index) => {
            message += `
                <div class="mb-3 p-3 border rounded">
                    <strong>${tip.title}</strong><br>
                    <small class="text-muted">${tip.description}</small><br>
                    <div class="mt-2">
                        <span class="badge ${this.getDifficultyBadgeClass(tip.difficulty)}">
                            ${t(`tips.difficulty_${tip.difficulty}`) || tip.difficulty}
                        </span>
                        <span class="badge bg-success ms-2">
                            <i class="fas fa-leaf"></i> ${tip.impact} kg CO₂
                        </span>
                    </div>
                </div>
            `;
        });
        
        const modalHTML = `
            <div class="modal fade" id="smartTipsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-magic me-2"></i>
                                Conseils intelligents générés
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${message}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Annuler
                            </button>
                            <button type="button" class="btn btn-primary" id="addSmartTipsBtn">
                                <i class="fas fa-plus"></i> Ajouter tous les conseils
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter le modal au DOM
        const modalContainer = document.getElementById('modalContainer') || 
                               document.createElement('div');
        modalContainer.id = 'modalContainer';
        modalContainer.innerHTML = modalHTML;
        if (!document.getElementById('modalContainer')) {
            document.body.appendChild(modalContainer);
        }
        
        const modal = new bootstrap.Modal(document.getElementById('smartTipsModal'));
        modal.show();
        
        // Ajouter les conseils générés
        document.getElementById('addSmartTipsBtn')?.addEventListener('click', () => {
            smartTips.forEach(tip => {
                this.create({
                    ...tip,
                    userId: authManager.getCurrentUser()?.email || 'anonymous'
                });
            });
            
            modal.hide();
            Helpers.showAlert(`${smartTips.length} nouveaux conseils ajoutés !`, 'success');
            this.renderList('tipsContainer');
        });
        
        // Nettoyer après fermeture
        document.getElementById('smartTipsModal')?.addEventListener('hidden.bs.modal', () => {
            document.getElementById('smartTipsModal')?.remove();
        });
    }
    
    generateCategoryTip(category) {
        const tipsByCategory = {
            'streaming': {
                title: 'Téléchargez au lieu de streamer',
                description: 'Téléchargez vos contenus lors des heures creuses pour réduire la charge réseau',
                impact: 2.0,
                difficulty: 'facile',
                estimatedTime: '10 minutes'
            },
            'email': {
                title: 'Compressez les pièces jointes',
                description: 'Utilisez des outils de compression avant d\'envoyer des fichiers lourds',
                impact: 1.5,
                difficulty: 'moyen',
                estimatedTime: '5 minutes'
            },
            'cloud': {
                title: 'Utilisez le stockage local pour les fichiers sensibles',
                description: 'Réduisez votre dépendance au cloud pour les données personnelles',
                impact: 3.0,
                difficulty: 'facile',
                estimatedTime: '15 minutes'
            },
            'device': {
                title: 'Éteignez vos appareils la nuit',
                description: 'Ne laissez pas vos appareils en veille inutilement',
                impact: 4.0,
                difficulty: 'très facile',
                estimatedTime: '2 minutes'
            },
            'general': {
                title: 'Utilisez des moteurs de recherche écologiques',
                description: 'Des alternatives comme Ecosia plantent des arbres avec vos recherches',
                impact: 1.0,
                difficulty: 'très facile',
                estimatedTime: '5 minutes'
            }
        };
        
        return {
            category,
            ...tipsByCategory[category] || {
                title: 'Optimisez vos habitudes numériques',
                description: 'Prenez conscience de votre consommation numérique',
                impact: 2.0,
                difficulty: 'facile',
                estimatedTime: 'variable'
            }
        };
    }
    
    generateTipsReport() {
        const stats = this.getTipsStats();
        const categories = {};
        
        this.data.forEach(tip => {
            if (!categories[tip.category]) {
                categories[tip.category] = {
                    total: 0,
                    completed: 0,
                    impact: 0
                };
            }
            
            categories[tip.category].total++;
            if (tip.completed) {
                categories[tip.category].completed++;
                categories[tip.category].impact += tip.impact || 0;
            }
        });
        
        let reportHTML = `
            <div id="tipsReportContent">
                <div class="text-center mb-4">
                    <h3 style="color: #2b6cb0;">
                        <i class="fas fa-leaf"></i> Rapport des Conseils Carbonely
                    </h3>
                    <p>Généré le ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="mb-4">
                    <h4>Vue d'ensemble</h4>
                    <table class="table table-bordered" style="width: 100%;">
                        <tr>
                            <td style="padding: 10px;"><strong>Conseils disponibles</strong></td>
                            <td style="padding: 10px;">${stats.total}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;"><strong>Conseils appliqués</strong></td>
                            <td style="padding: 10px;">${stats.completed}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;"><strong>Taux de complétion</strong></td>
                            <td style="padding: 10px;">${stats.completionRate}%</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;"><strong>CO₂ total économisé</strong></td>
                            <td style="padding: 10px;">${stats.impact.toFixed(1)} kg</td>
                        </tr>
                    </table>
                </div>
                
                <div class="mb-4">
                    <h4>Performance par catégorie</h4>
                    <table class="table table-bordered" style="width: 100%;">
                        <thead>
                            <tr>
                                <th style="padding: 10px;">Catégorie</th>
                                <th style="padding: 10px;">Conseils</th>
                                <th style="padding: 10px;">Complétés</th>
                                <th style="padding: 10px;">CO₂ économisé</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(categories).map(([category, data]) => `
                                <tr>
                                    <td style="padding: 10px;">${t(`tips.category_${category}`) || category}</td>
                                    <td style="padding: 10px;">${data.total}</td>
                                    <td style="padding: 10px;">${data.completed}</td>
                                    <td style="padding: 10px;">${data.impact.toFixed(1)} kg</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="mb-4">
                    <h4>Conseils récemment appliqués</h4>
                    <ul>
                        ${this.data
                            .filter(tip => tip.completed)
                            .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
                            .slice(0, 5)
                            .map(tip => `
                                <li>
                                    <strong>${tip.title}</strong> - ${tip.impact} kg CO₂
                                    <br><small>Appliqué le ${Helpers.formatDate(tip.completedDate)}</small>
                                </li>
                            `).join('')}
                    </ul>
                </div>
                
                <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
                    <p>Rapport généré par Carbonely - Plateforme de réduction d'empreinte carbone numérique</p>
                    <p>https://carbonely.app</p>
                </div>
            </div>
        `;
        
        // Créer un élément pour le rapport
        const reportElement = document.createElement('div');
        reportElement.innerHTML = reportHTML;
        reportElement.style.padding = '20px';
        document.body.appendChild(reportElement);
        
        // Générer le PDF
        if (typeof html2pdf !== 'undefined') {
            const opt = {
                margin: 1,
                filename: `rapport_conseils_${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            
            html2pdf().set(opt).from(reportElement).save().then(() => {
                reportElement.remove();
                window.carbonelyApp?.showToast('Rapport PDF généré avec succès', 'success');
            });
        } else {
            // Fallback si html2pdf n'est pas disponible
            window.carbonelyApp?.showToast('Fonction PDF non disponible', 'warning');
            reportElement.remove();
        }
    }
    
    showCreateForm() {
        const modal = new bootstrap.Modal(document.getElementById('tipModal'));
        const form = document.getElementById('tipForm');
        
        form?.reset();
        document.getElementById('tipModalTitle').innerHTML = `
            <i class="fas fa-plus me-2"></i>
            ${t('actions.create')} ${t('tips.title')}
        `;
        document.getElementById('tipId').value = '';
        document.getElementById('tipCompleted').checked = false;
        
        modal.show();
    }
    
    showEditForm(id) {
        const tip = this.read(id);
        if (!tip) return;
        
        const modal = new bootstrap.Modal(document.getElementById('tipModal'));
        const form = document.getElementById('tipForm');
        
        document.getElementById('tipModalTitle').innerHTML = `
            <i class="fas fa-edit me-2"></i>
            ${t('actions.edit')} ${t('tips.title')}
        `;
        
        // Remplir le formulaire
        Object.keys(tip).forEach(key => {
            const input = document.getElementById(`tip${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = tip[key] || false;
                } else {
                    input.value = tip[key] || '';
                }
            }
        });
        
        modal.show();
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const id = document.getElementById('tipId').value;
        const isEdit = !!id;
        
        // Récupérer les données
        const formData = {
            category: document.getElementById('tipCategory').value,
            title: document.getElementById('tipTitle').value,
            description: document.getElementById('tipDescription').value,
            impact: parseFloat(document.getElementById('tipImpact').value) || 0,
            difficulty: document.getElementById('tipDifficulty').value,
            estimatedTime: document.getElementById('tipTime').value || null,
            completed: document.getElementById('tipCompleted').checked,
            completedDate: document.getElementById('tipCompleted').checked ? 
                          new Date().toISOString().split('T')[0] : null,
            userId: authManager.getCurrentUser()?.email || 'anonymous'
        };
        
        // Validation
        const validation = this.validate(formData);
        if (!validation.isValid) {
            Object.entries(validation.errors).forEach(([field, error]) => {
                const errorElement = document.getElementById(`${field}Error`);
                const inputElement = document.getElementById(`tip${field.charAt(0).toUpperCase() + field.slice(1)}`);
                
                if (errorElement && inputElement) {
                    errorElement.textContent = error;
                    inputElement.classList.add('is-invalid');
                }
            });
            return;
        }
        
        // Sauvegarder
        try {
            if (isEdit) {
                this.update(id, formData);
                window.carbonelyApp?.showToast('Conseil mis à jour', 'success');
            } else {
                this.create(formData);
                window.carbonelyApp?.showToast('Conseil créé', 'success');
            }
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('tipModal'));
            modal.hide();
            
            this.renderList('tipsContainer');
            
        } catch (error) {
            console.error('Erreur:', error);
            Helpers.showAlert('Une erreur est survenue', 'error');
        }
    }
}

// Exporter pour une utilisation globale
window.TipsEntity = TipsEntity;