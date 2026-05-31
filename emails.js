/**
 * Entité CRUD pour les emails
 */

class EmailsEntity extends BaseEntity {
    constructor() {
        super('emails', 'carbonely_emails_data', [
            {
                id: '1',
                sender: 'contact@entreprise.com',
                recipient: 'user@example.com',
                subject: 'Confirmation de commande',
                body: 'Votre commande a été confirmée...',
                size: 2.5,
                attachments: 1,
                status: 'received',
                date: '2024-03-15',
                co2Impact: 0.01,
                isSpam: false,
                category: 'professionnel',
                userId: 'user1',
                createdAt: '2024-03-15T09:30:00Z',
                updatedAt: '2024-03-15T09:30:00Z'
            },
            {
                id: '2',
                sender: 'newsletter@ecologie.org',
                recipient: 'user@example.com',
                subject: 'Conseils écologiques',
                body: 'Découvrez nos conseils...',
                size: 1.8,
                attachments: 0,
                status: 'received',
                date: '2024-03-14',
                co2Impact: 0.008,
                isSpam: false,
                category: 'newsletter',
                userId: 'user1',
                createdAt: '2024-03-14T11:45:00Z',
                updatedAt: '2024-03-14T11:45:00Z'
            },
            {
                id: '3',
                sender: 'promo@shop.com',
                recipient: 'user@example.com',
                subject: 'Soldes exceptionnelles',
                body: '-50% sur tous les produits...',
                size: 3.2,
                attachments: 3,
                status: 'received',
                date: '2024-03-13',
                co2Impact: 0.015,
                isSpam: true,
                category: 'promotion',
                userId: 'user1',
                createdAt: '2024-03-13T14:20:00Z',
                updatedAt: '2024-03-13T14:20:00Z'
            },
            {
                id: '4',
                sender: 'user@example.com',
                recipient: 'support@service.com',
                subject: 'Demande d\'assistance',
                body: 'Bonjour, j\'ai un problème...',
                size: 1.5,
                attachments: 0,
                status: 'sent',
                date: '2024-03-12',
                co2Impact: 0.007,
                isSpam: false,
                category: 'professionnel',
                userId: 'user1',
                createdAt: '2024-03-12T10:15:00Z',
                updatedAt: '2024-03-12T10:15:00Z'
            },
            {
                id: '5',
                sender: 'collegue@entreprise.com',
                recipient: 'user@example.com',
                subject: 'Réunion de projet',
                body: 'Points à aborder...',
                size: 2.0,
                attachments: 2,
                status: 'received',
                date: '2024-03-11',
                co2Impact: 0.012,
                isSpam: false,
                category: 'professionnel',
                userId: 'user1',
                createdAt: '2024-03-11T16:30:00Z',
                updatedAt: '2024-03-11T16:30:00Z'
            }
        ]);
        
        this.statuses = ['received', 'sent', 'draft', 'deleted'];
        this.categories = ['professionnel', 'personnel', 'newsletter', 'promotion', 'spam', 'important'];
        this.senders = ['contact@entreprise.com', 'newsletter@ecologie.org', 'promo@shop.com', 'collegue@entreprise.com'];
    }
    
    validate(data) {
        const errors = {};
        
        if (!data.sender || !this.isValidEmail(data.sender)) {
            errors.sender = 'Email expéditeur invalide';
        }
        
        if (!data.recipient || !this.isValidEmail(data.recipient)) {
            errors.recipient = 'Email destinataire invalide';
        }
        
        if (!data.subject || data.subject.length < 3) {
            errors.subject = 'Le sujet doit contenir au moins 3 caractères';
        }
        
        if (data.size && (data.size < 0 || data.size > 100)) {
            errors.size = 'Taille invalide (0-100 MB)';
        }
        
        if (data.attachments && (data.attachments < 0 || data.attachments > 20)) {
            errors.attachments = 'Nombre de pièces jointes invalide';
        }
        
        if (!data.status || !this.statuses.includes(data.status)) {
            errors.status = 'Statut invalide';
        }
        
        if (!data.date || isNaN(Date.parse(data.date))) {
            errors.date = 'Date invalide';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
    
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    calculateCO2Impact(size, attachments) {
        // Estimation: 4g CO₂ par MB + 5g par pièce jointe
        return (size * 4 + attachments * 5) / 1000; // Convertir en kg
    }
    
    renderList(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const paginatedData = this.getPaginatedData();
        
        container.innerHTML = `
            <div class="filters-container mb-4">
                <div class="row g-3">
                    <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="fas fa-search"></i>
                            </span>
                            <input type="text" 
                                   class="form-control" 
                                   id="emailsSearch" 
                                   placeholder="${t('actions.search')}..."
                                   value="${this.searchTerm}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="emailsStatusFilter">
                            <option value="">${t('filter.all')} ${t('emails.status')}</option>
                            ${this.statuses.map(status => `
                                <option value="${status}" ${this.filters.status === status ? 'selected' : ''}>
                                    ${t(`emails.status_${status}`) || status}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="emailsCategoryFilter">
                            <option value="">${t('filter.all')} ${t('emails.category')}</option>
                            ${this.categories.map(category => `
                                <option value="${category}" ${this.filters.category === category ? 'selected' : ''}>
                                    ${t(`emails.category_${category}`) || category}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="col-md-2">
                        <select class="form-select" id="emailsSpamFilter">
                            <option value="">Tous</option>
                            <option value="true" ${this.filters.isSpam === 'true' ? 'selected' : ''}>Spam</option>
                            <option value="false" ${this.filters.isSpam === 'false' ? 'selected' : ''}>Non spam</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">${t('emails.title')} (${paginatedData.total})</h5>
                    <div class="btn-group">
                        <button class="btn btn-primary" id="addEmailBtn">
                            <i class="fas fa-plus"></i> ${t('actions.create')}
                        </button>
                        <button class="btn btn-outline-secondary" id="exportEmailsBtn">
                            <i class="fas fa-download"></i> CSV
                        </button>
                        <button class="btn btn-outline-danger" id="cleanEmailsBtn" title="Nettoyer les emails">
                            <i class="fas fa-trash-alt"></i> Nettoyer
                        </button>
                    </div>
                </div>
                
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th class="sortable" data-column="sender">
                                        <i class="fas fa-user me-1"></i>${t('emails.sender')}
                                    </th>
                                    <th class="sortable" data-column="subject">
                                        <i class="fas fa-envelope me-1"></i>${t('emails.subject')}
                                    </th>
                                    <th class="sortable" data-column="date">
                                        <i class="fas fa-calendar me-1"></i>${t('emails.date')}
                                    </th>
                                    <th class="sortable" data-column="size">
                                        <i class="fas fa-weight me-1"></i>${t('emails.size')}
                                    </th>
                                    <th class="sortable" data-column="co2Impact">
                                        <i class="fas fa-leaf me-1"></i>CO₂
                                    </th>
                                    <th>${t('emails.status')}</th>
                                    <th>${t('actions.view')}</th>
                                </tr>
                            </thead>
                            <tbody id="emailsTableBody">
                                ${paginatedData.data.length > 0 ? paginatedData.data.map(item => `
                                    <tr data-id="${item.id}" class="${item.isSpam ? 'table-warning' : ''}">
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="avatar me-2">
                                                    <div class="avatar-circle ${this.getAvatarColor(item.sender)}">
                                                        ${item.sender.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="fw-medium text-truncate" style="max-width: 150px;">
                                                        ${item.sender}
                                                    </div>
                                                    <small class="text-muted">
                                                        ${t('emails.to')}: ${item.recipient}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="email-subject">
                                                <strong>${item.subject}</strong>
                                                ${item.isSpam ? '<span class="badge bg-danger ms-2">SPAM</span>' : ''}
                                                ${item.attachments > 0 ? `
                                                    <span class="badge bg-info ms-1">
                                                        <i class="fas fa-paperclip"></i> ${item.attachments}
                                                    </span>
                                                ` : ''}
                                            </div>
                                            <small class="text-muted d-block mt-1">
                                                ${item.body?.substring(0, 50)}...
                                            </small>
                                        </td>
                                        <td>
                                            ${Helpers.formatDate(item.date)}
                                            <small class="text-muted d-block">
                                                ${new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </small>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="progress flex-grow-1 me-2" style="height: 6px;">
                                                    <div class="progress-bar ${this.getSizeClass(item.size)}" 
                                                         style="width: ${Math.min(item.size * 2, 100)}%">
                                                    </div>
                                                </div>
                                                <span>${item.size.toFixed(1)} MB</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="co2-badge ${this.getCO2Class(item.co2Impact)}">
                                                ${item.co2Impact.toFixed(3)} kg
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge ${this.getStatusBadgeClass(item.status)}">
                                                ${t(`emails.status_${item.status}`) || item.status}
                                            </span>
                                            ${item.category ? `
                                                <span class="badge bg-secondary mt-1 d-block">
                                                    ${t(`emails.category_${item.category}`) || item.category}
                                                </span>
                                            ` : ''}
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <button class="btn btn-outline-primary view-email" data-id="${item.id}">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn btn-outline-warning edit-email" data-id="${item.id}">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-outline-danger delete-email" data-id="${item.id}">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="7" class="text-center py-5">
                                            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                                            <h5>Aucun email trouvé</h5>
                                            <p class="text-muted">Commencez par ajouter votre premier email</p>
                                            <button class="btn btn-primary" id="addFirstEmailBtn">
                                                <i class="fas fa-plus"></i> Ajouter un email
                                            </button>
                                        </td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                ${paginatedData.total > 0 ? `
                    <div class="card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-muted">
                                    Total CO₂: <strong>${this.getTotalCO2().toFixed(3)} kg</strong>
                                </span>
                                <span class="ms-3 text-muted">
                                    Emails spam: <strong>${this.getSpamCount()}</strong>
                                </span>
                            </div>
                            <div class="text-muted">
                                ${this.getStorageUsage()} de stockage utilisé
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
            
            ${paginatedData.total > 0 ? this.renderPagination(paginatedData) : ''}
            
            <!-- Modal pour créer/modifier -->
            <div class="modal fade" id="emailModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="emailModalTitle">
                                ${t('actions.create')} ${t('emails.title')}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form id="emailForm">
                            <div class="modal-body">
                                <input type="hidden" id="emailId">
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="emailSender" class="form-label">
                                                <i class="fas fa-user me-1"></i>${t('emails.sender')}
                                            </label>
                                            <input type="email" 
                                                   class="form-control" 
                                                   id="emailSender" 
                                                   required>
                                            <div class="invalid-feedback" id="senderError"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="emailRecipient" class="form-label">
                                                <i class="fas fa-users me-1"></i>${t('emails.recipient')}
                                            </label>
                                            <input type="email" 
                                                   class="form-control" 
                                                   id="emailRecipient" 
                                                   required>
                                            <div class="invalid-feedback" id="recipientError"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="emailSubject" class="form-label">
                                        <i class="fas fa-tag me-1"></i>${t('emails.subject')}
                                    </label>
                                    <input type="text" 
                                           class="form-control" 
                                           id="emailSubject" 
                                           required>
                                    <div class="invalid-feedback" id="subjectError"></div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="emailBody" class="form-label">
                                        <i class="fas fa-align-left me-1"></i>Contenu
                                    </label>
                                    <textarea class="form-control" 
                                              id="emailBody" 
                                              rows="4"
                                              placeholder="Contenu de l'email..."></textarea>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="emailSize" class="form-label">
                                                <i class="fas fa-weight me-1"></i>${t('emails.size')} (MB)
                                            </label>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="emailSize" 
                                                   min="0" 
                                                   max="100" 
                                                   step="0.1"
                                                   value="1.0">
                                            <div class="invalid-feedback" id="sizeError"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="emailAttachments" class="form-label">
                                                <i class="fas fa-paperclip me-1"></i>${t('emails.attachments')}
                                            </label>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="emailAttachments" 
                                                   min="0" 
                                                   max="20" 
                                                   step="1"
                                                   value="0">
                                            <div class="invalid-feedback" id="attachmentsError"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="emailCO2" class="form-label">
                                                <i class="fas fa-leaf me-1"></i>Impact CO₂ (kg)
                                            </label>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="emailCO2" 
                                                   min="0" 
                                                   max="1" 
                                                   step="0.001"
                                                   readonly>
                                            <small class="text-muted">Calculé automatiquement</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="emailStatus" class="form-label">
                                                <i class="fas fa-info-circle me-1"></i>${t('emails.status')}
                                            </label>
                                            <select class="form-select" id="emailStatus" required>
                                                <option value="">${t('form.required')}</option>
                                                ${this.statuses.map(status => `
                                                    <option value="${status}">
                                                        ${t(`emails.status_${status}`) || status}
                                                    </option>
                                                `).join('')}
                                            </select>
                                            <div class="invalid-feedback" id="statusError"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="emailCategory" class="form-label">
                                                <i class="fas fa-folder me-1"></i>${t('emails.category')}
                                            </label>
                                            <select class="form-select" id="emailCategory">
                                                <option value="">${t('filter.all')}</option>
                                                ${this.categories.map(category => `
                                                    <option value="${category}">
                                                        ${t(`emails.category_${category}`) || category}
                                                    </option>
                                                `).join('')}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="emailDate" class="form-label">
                                                <i class="fas fa-calendar me-1"></i>${t('emails.date')}
                                            </label>
                                            <input type="date" 
                                                   class="form-control" 
                                                   id="emailDate" 
                                                   required>
                                            <div class="invalid-feedback" id="dateError"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <div class="form-check mt-4 pt-2">
                                                <input type="checkbox" 
                                                       class="form-check-input" 
                                                       id="emailIsSpam">
                                                <label class="form-check-label" for="emailIsSpam">
                                                    <i class="fas fa-ban me-1"></i>Marquer comme spam
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    
    getAvatarColor(email) {
        const colors = [
            'avatar-primary', 'avatar-secondary', 'avatar-success',
            'avatar-danger', 'avatar-warning', 'avatar-info'
        ];
        const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    }
    
    getSizeClass(size) {
        if (size < 1) return 'bg-success';
        if (size < 5) return 'bg-warning';
        return 'bg-danger';
    }
    
    getCO2Class(co2) {
        if (co2 < 0.005) return 'co2-low';
        if (co2 < 0.01) return 'co2-medium';
        return 'co2-high';
    }
    
    getStatusBadgeClass(status) {
        const classes = {
            'received': 'bg-primary',
            'sent': 'bg-success',
            'draft': 'bg-secondary',
            'deleted': 'bg-danger'
        };
        return classes[status] || 'bg-secondary';
    }
    
    getTotalCO2() {
        return this.data.reduce((total, item) => total + (item.co2Impact || 0), 0);
    }
    
    getSpamCount() {
        return this.data.filter(item => item.isSpam).length;
    }
    
    getStorageUsage() {
        const totalSize = this.data.reduce((total, item) => total + (item.size || 0), 0);
        return `${totalSize.toFixed(1)} MB`;
    }
    
    initListEvents() {
        // Recherche
        const searchInput = document.getElementById('emailsSearch');
        if (searchInput) {
            searchInput.addEventListener('input', Helpers.debounce((e) => {
                this.searchTerm = e.target.value;
                this.renderList('emailsContainer');
            }, 300));
        }
        
        // Filtres
        ['status', 'category', 'spam'].forEach(filterType => {
            const filter = document.getElementById(`emails${filterType.charAt(0).toUpperCase() + filterType.slice(1)}Filter`);
            if (filter) {
                filter.addEventListener('change', (e) => {
                    if (filterType === 'spam') {
                        this.filters.isSpam = e.target.value || undefined;
                    } else {
                        this.filters[filterType] = e.target.value || undefined;
                    }
                    this.currentPage = 1;
                    this.renderList('emailsContainer');
                });
            }
        });
        
        // Tri
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const column = th.getAttribute('data-column');
                if (this.sortColumn === column) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sortColumn = column;
                    this.sortDirection = 'asc';
                }
                this.renderList('emailsContainer');
            });
        });
        
        // Boutons d'action
        document.getElementById('addEmailBtn')?.addEventListener('click', () => this.showCreateForm());
        document.getElementById('addFirstEmailBtn')?.addEventListener('click', () => this.showCreateForm());
        document.getElementById('exportEmailsBtn')?.addEventListener('click', () => this.exportToCSV());
        document.getElementById('cleanEmailsBtn')?.addEventListener('click', () => this.cleanEmails());
        
        // Événements délégués
        document.getElementById('emailsTableBody')?.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            
            const id = target.getAttribute('data-id') || 
                       target.closest('[data-id]')?.getAttribute('data-id');
            
            if (target.classList.contains('view-email')) {
                this.showDetails(id);
            } else if (target.classList.contains('edit-email')) {
                this.showEditForm(id);
            } else if (target.classList.contains('delete-email')) {
                this.confirmDelete(id);
            }
        });
        
        // Soumission du formulaire
        const form = document.getElementById('emailForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Calcul automatique du CO₂
        const sizeInput = document.getElementById('emailSize');
        const attachmentsInput = document.getElementById('emailAttachments');
        const co2Input = document.getElementById('emailCO2');
        
        if (sizeInput && attachmentsInput && co2Input) {
            const calculateCO2 = () => {
                const size = parseFloat(sizeInput.value) || 0;
                const attachments = parseInt(attachmentsInput.value) || 0;
                const co2 = this.calculateCO2Impact(size, attachments);
                co2Input.value = co2.toFixed(3);
            };
            
            sizeInput.addEventListener('input', calculateCO2);
            attachmentsInput.addEventListener('input', calculateCO2);
        }
    }
    
    async cleanEmails() {
        const confirmed = await Helpers.showConfirm(
            'Voulez-vous nettoyer les emails spam et les supprimer définitivement ?',
            'Nettoyage des emails'
        );
        
        if (confirmed) {
            const spamEmails = this.data.filter(item => item.isSpam);
            let deletedCount = 0;
            let co2Saved = 0;
            
            spamEmails.forEach(email => {
                if (this.delete(email.id)) {
                    deletedCount++;
                    co2Saved += email.co2Impact || 0;
                }
            });
            
            Helpers.showAlert(
                `${deletedCount} emails spam supprimés. CO₂ économisé: ${co2Saved.toFixed(3)} kg`,
                'success'
            );
            
            this.renderList('emailsContainer');
        }
    }
    
    showCreateForm() {
        const modal = new bootstrap.Modal(document.getElementById('emailModal'));
        const form = document.getElementById('emailForm');
        
        // Réinitialiser le formulaire
        form?.reset();
        document.getElementById('emailModalTitle').textContent = 
            `${t('actions.create')} ${t('emails.title')}`;
        document.getElementById('emailId').value = '';
        
        // Définir la date d'aujourd'hui
        document.getElementById('emailDate').value = 
            new Date().toISOString().split('T')[0];
        
        // Calculer le CO₂ initial
        const sizeInput = document.getElementById('emailSize');
        const attachmentsInput = document.getElementById('emailAttachments');
        const co2Input = document.getElementById('emailCO2');
        
        if (sizeInput && attachmentsInput && co2Input) {
            const co2 = this.calculateCO2Impact(
                parseFloat(sizeInput.value) || 0,
                parseInt(attachmentsInput.value) || 0
            );
            co2Input.value = co2.toFixed(3);
        }
        
        modal.show();
    }
    
    showEditForm(id) {
        const item = this.read(id);
        if (!item) return;
        
        const modal = new bootstrap.Modal(document.getElementById('emailModal'));
        const form = document.getElementById('emailForm');
        
        // Remplir le formulaire
        document.getElementById('emailModalTitle').textContent = 
            `${t('actions.edit')} ${t('emails.title')}`;
        document.getElementById('emailId').value = item.id;
        document.getElementById('emailSender').value = item.sender || '';
        document.getElementById('emailRecipient').value = item.recipient || '';
        document.getElementById('emailSubject').value = item.subject || '';
        document.getElementById('emailBody').value = item.body || '';
        document.getElementById('emailSize').value = item.size || 0;
        document.getElementById('emailAttachments').value = item.attachments || 0;
        document.getElementById('emailCO2').value = item.co2Impact || 0;
        document.getElementById('emailStatus').value = item.status || '';
        document.getElementById('emailCategory').value = item.category || '';
        document.getElementById('emailDate').value = item.date || '';
        document.getElementById('emailIsSpam').checked = item.isSpam || false;
        
        modal.show();
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const id = document.getElementById('emailId').value;
        const isEdit = !!id;
        
        // Récupérer les données du formulaire
        const formData = {
            sender: document.getElementById('emailSender').value,
            recipient: document.getElementById('emailRecipient').value,
            subject: document.getElementById('emailSubject').value,
            body: document.getElementById('emailBody').value,
            size: parseFloat(document.getElementById('emailSize').value) || 0,
            attachments: parseInt(document.getElementById('emailAttachments').value) || 0,
            co2Impact: parseFloat(document.getElementById('emailCO2').value) || 0,
            status: document.getElementById('emailStatus').value,
            category: document.getElementById('emailCategory').value || null,
            date: document.getElementById('emailDate').value,
            isSpam: document.getElementById('emailIsSpam').checked,
            userId: authManager.getCurrentUser()?.email || 'anonymous'
        };
        
        // Valider les données
        const validation = this.validate(formData);
        if (!validation.isValid) {
            // Afficher les erreurs
            Object.entries(validation.errors).forEach(([field, error]) => {
                const errorElement = document.getElementById(`${field}Error`);
                const inputElement = document.getElementById(`email${field.charAt(0).toUpperCase() + field.slice(1)}`);
                
                if (errorElement && inputElement) {
                    errorElement.textContent = error;
                    inputElement.classList.add('is-invalid');
                }
            });
            return;
        }
        
        // Enlever les classes d'erreur
        form.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        // Sauvegarder
        try {
            if (isEdit) {
                this.update(id, formData);
                window.carbonelyApp?.showToast(
                    t('message.success_update'),
                    'success'
                );
            } else {
                this.create(formData);
                window.carbonelyApp?.showToast(
                    t('message.success_create'),
                    'success'
                );
            }
            
            // Fermer le modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('emailModal'));
            modal.hide();
            
            // Recharger la liste
            this.renderList('emailsContainer');
            
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            Helpers.showAlert(
                t('message.error_general'),
                'error'
            );
        }
    }
    
    async confirmDelete(id) {
        const item = this.read(id);
        if (!item) return;
        
        const confirmed = await Helpers.showConfirm(
            `Êtes-vous sûr de vouloir supprimer l'email "${item.subject}" ?`,
            'Confirmation de suppression'
        );
        
        if (confirmed) {
            if (this.delete(id)) {
                window.carbonelyApp?.showToast(
                    t('message.success_delete'),
                    'success'
                );
                this.renderList('emailsContainer');
            }
        }
    }
    
    showDetails(id) {
        const item = this.read(id);
        if (!item) return;
        
        // Créer un modal de détails
        const detailsHTML = `
            <div class="modal fade" id="emailDetailsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-envelope me-2"></i>Détails de l'email
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <h6>${t('emails.sender')}</h6>
                                    <p class="text-break">
                                        <i class="fas fa-user me-2"></i>
                                        ${item.sender}
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <h6>${t('emails.recipient')}</h6>
                                    <p class="text-break">
                                        <i class="fas fa-users me-2"></i>
                                        ${item.recipient}
                                    </p>
                                </div>
                            </div>
                            
                            <div class="mb-4">
                                <h6>${t('emails.subject')}</h6>
                                <p class="fw-bold">${item.subject}</p>
                            </div>
                            
                            ${item.body ? `
                                <div class="mb-4">
                                    <h6>Contenu</h6>
                                    <div class="email-content p-3 bg-light rounded">
                                        ${item.body}
                                    </div>
                                </div>
                            ` : ''}
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Informations techniques</h6>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <i class="fas fa-weight me-2"></i>
                                            Taille: <strong>${item.size?.toFixed(1)} MB</strong>
                                        </li>
                                        <li class="mb-2">
                                            <i class="fas fa-paperclip me-2"></i>
                                            Pièces jointes: <strong>${item.attachments || 0}</strong>
                                        </li>
                                        <li class="mb-2">
                                            <i class="fas fa-leaf me-2"></i>
                                            Impact CO₂: <strong>${(item.co2Impact || 0).toFixed(3)} kg</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h6>Métadonnées</h6>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <i class="fas fa-calendar me-2"></i>
                                            Date: <strong>${Helpers.formatDate(item.date)}</strong>
                                        </li>
                                        <li class="mb-2">
                                            <i class="fas fa-info-circle me-2"></i>
                                            Statut: <span class="badge ${this.getStatusBadgeClass(item.status)}">
                                                ${t(`emails.status_${item.status}`) || item.status}
                                            </span>
                                        </li>
                                        ${item.category ? `
                                            <li class="mb-2">
                                                <i class="fas fa-folder me-2"></i>
                                                Catégorie: <span class="badge bg-secondary">
                                                    ${t(`emails.category_${item.category}`) || item.category}
                                                </span>
                                            </li>
                                        ` : ''}
                                        <li class="mb-2">
                                            <i class="fas fa-clock me-2"></i>
                                            Créé le: <strong>${Helpers.formatDate(item.createdAt)}</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                ${t('actions.cancel')}
                            </button>
                            <button type="button" class="btn btn-outline-primary" id="exportEmailPDFBtn">
                                <i class="fas fa-file-pdf"></i> Exporter PDF
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
        modalContainer.innerHTML = detailsHTML;
        if (!document.getElementById('modalContainer')) {
            document.body.appendChild(modalContainer);
        }
        
        const modal = new bootstrap.Modal(document.getElementById('emailDetailsModal'));
        modal.show();
        
        // Bouton d'export PDF
        document.getElementById('exportEmailPDFBtn')?.addEventListener('click', () => {
            this.exportEmailAsPDF(item);
        });
        
        // Nettoyer après fermeture
        document.getElementById('emailDetailsModal')?.addEventListener('hidden.bs.modal', () => {
            document.getElementById('emailDetailsModal')?.remove();
        });
    }
    
    exportEmailAsPDF(item) {
        if (typeof html2pdf === 'undefined') {
            Helpers.showAlert('La fonction PDF n\'est pas disponible', 'warning');
            return;
        }
        
        const content = `
            <div id="emailPDFContent" style="padding: 20px;">
                <h2 style="color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 10px;">
                    <i class="fas fa-envelope"></i> Détails de l'email
                </h2>
                
                <div style="margin: 20px 0;">
                    <h4>Informations de base</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd; width: 30%;">
                                <strong>${t('emails.sender')}</strong>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${item.sender}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                <strong>${t('emails.recipient')}</strong>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${item.recipient}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                <strong>${t('emails.subject')}</strong>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${item.subject}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="margin: 20px 0;">
                    <h4>Impact environnemental</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd; width: 30%;">
                                <strong>CO₂ généré</strong>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                ${(item.co2Impact || 0).toFixed(3)} kg
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                <strong>Taille</strong>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                ${item.size?.toFixed(1)} MB
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
                    <p>Généré par Carbonely - ${new Date().toLocaleDateString()}</p>
                    <p>https://carbonely.app</p>
                </div>
            </div>
        `;
        
        const element = document.createElement('div');
        element.innerHTML = content;
        document.body.appendChild(element);
        
        const opt = {
            margin: 1,
            filename: `email_${item.id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save().then(() => {
            element.remove();
            window.carbonelyApp?.showToast('PDF exporté avec succès', 'success');
        });
    }
}

// Exporter pour une utilisation globale
window.EmailsEntity = EmailsEntity;