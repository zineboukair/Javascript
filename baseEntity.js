/**
 * Classe de base pour les entités CRUD - VERSION COMPLÉTÉE
 */

class BaseEntity {
    constructor(entityName, storageKey, defaultData = []) {
        this.entityName = entityName;
        this.storageKey = storageKey;
        this.data = this.loadData(defaultData);
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortColumn = 'id';
        this.sortDirection = 'asc';
        this.filters = {};
        this.searchTerm = '';
    }
    
    loadData(defaultData) {
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
            return JSON.parse(storedData);
        }
        
        // Initialiser avec les données par défaut
        this.data = defaultData;
        this.saveData();
        return this.data;
    }
    
    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
    
    // Opérations CRUD
    create(item) {
        const newItem = {
            ...item,
            id: this.generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.data.push(newItem);
        this.saveData();
        return newItem;
    }
    
    read(id) {
        return this.data.find(item => item.id === id);
    }
    
    readAll() {
        return this.data;
    }
    
    update(id, updates) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = {
                ...this.data[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveData();
            return this.data[index];
        }
        return null;
    }
    
    delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }
    
    // Génération d'ID unique
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // Pagination
    getPaginatedData() {
        let filteredData = this.getFilteredData();
        
        // Tri
        filteredData.sort((a, b) => {
            let valA = a[this.sortColumn];
            let valB = b[this.sortColumn];
            
            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            
            if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        
        // Pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        
        return {
            data: filteredData.slice(startIndex, endIndex),
            total: filteredData.length,
            totalPages: Math.ceil(filteredData.length / this.itemsPerPage),
            currentPage: this.currentPage
        };
    }
    
    // Filtrage
    getFilteredData() {
        return this.data.filter(item => {
            // Recherche globale
            if (this.searchTerm) {
                const searchLower = this.searchTerm.toLowerCase();
                const matchesSearch = Object.values(item).some(value => 
                    String(value).toLowerCase().includes(searchLower)
                );
                if (!matchesSearch) return false;
            }
            
            // Filtres spécifiques
            for (const [key, value] of Object.entries(this.filters)) {
                if (value && item[key] !== value) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    // Export CSV
    exportToCSV() {
        if (this.data.length === 0) {
            alert('Aucune donnée à exporter');
            return;
        }
        
        const headers = Object.keys(this.data[0] || {});
        const csvRows = [
            headers.join(','),
            ...this.data.map(row => 
                headers.map(header => {
                    const value = row[header];
                    return typeof value === 'string' && value.includes(',') 
                        ? `"${value}"` 
                        : value;
                }).join(',')
            )
        ];
        
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.entityName}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    // Statistiques
    getStats() {
        const total = this.data.length;
        const today = new Date().toISOString().split('T')[0];
        const todayCount = this.data.filter(item => 
            item.createdAt && item.createdAt.startsWith(today)
        ).length;
        
        return {
            total,
            todayCount,
            lastUpdated: this.data.reduce((latest, item) => 
                item.updatedAt > latest ? item.updatedAt : latest, ''
            )
        };
    }
    
    // Méthode de pagination (NOUVELLE MÉTHODE)
    renderPagination(paginatedData) {
        return `
            <div class="d-flex justify-content-between align-items-center mt-3">
                <div class="text-muted">
                    ${t('pagination.show')} 
                    <select class="form-select form-select-sm d-inline-block w-auto mx-1" 
                            id="${this.entityName}ItemsPerPage">
                        <option value="10" ${this.itemsPerPage === 10 ? 'selected' : ''}>10</option>
                        <option value="25" ${this.itemsPerPage === 25 ? 'selected' : ''}>25</option>
                        <option value="50" ${this.itemsPerPage === 50 ? 'selected' : ''}>50</option>
                    </select>
                    ${t('pagination.entries')}
                </div>
                
                <nav>
                    <ul class="pagination mb-0">
                        <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                            <a class="page-link" href="#" data-page="${this.currentPage - 1}">
                                ${t('pagination.previous')}
                            </a>
                        </li>
                        
                        ${Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1)
                            .filter(page => 
                                page === 1 || 
                                page === paginatedData.totalPages || 
                                Math.abs(page - this.currentPage) <= 2
                            )
                            .map(page => `
                                <li class="page-item ${page === this.currentPage ? 'active' : ''}">
                                    <a class="page-link" href="#" data-page="${page}">${page}</a>
                                </li>
                            `).join('')}
                        
                        <li class="page-item ${this.currentPage === paginatedData.totalPages ? 'disabled' : ''}">
                            <a class="page-link" href="#" data-page="${this.currentPage + 1}">
                                ${t('pagination.next')}
                            </a>
                        </li>
                    </ul>
                </nav>
                
                <div class="text-muted">
                    ${t('pagination.page')} ${this.currentPage} ${t('pagination.of')} ${paginatedData.totalPages}
                </div>
            </div>
        `;
    }
    
    // Méthode pour initialiser les événements de pagination (NOUVELLE MÉTHODE)
    initPaginationEvents() {
        // Changer le nombre d'éléments par page
        const itemsPerPageSelect = document.getElementById(`${this.entityName}ItemsPerPage`);
        if (itemsPerPageSelect) {
            itemsPerPageSelect.addEventListener('change', (e) => {
                this.itemsPerPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.renderList(`${this.entityName}Container`);
            });
        }
        
        // Gestion des clics sur la pagination
        document.addEventListener('click', (e) => {
            if (e.target.matches('.page-link')) {
                e.preventDefault();
                const page = parseInt(e.target.getAttribute('data-page'));
                if (page && page >= 1 && page <= this.getPaginatedData().totalPages) {
                    this.currentPage = page;
                    this.renderList(`${this.entityName}Container`);
                }
            }
        });
    }
    
    // Méthode pour confirmer la suppression (NOUVELLE MÉTHODE)
    async confirmDelete(id) {
        const item = this.read(id);
        if (!item) return;
        
        const confirmed = await Helpers.showConfirm(
            `Êtes-vous sûr de vouloir supprimer cet élément ?`,
            'Confirmation de suppression'
        );
        
        if (confirmed) {
            if (this.delete(id)) {
                window.carbonelyApp?.showToast(
                    t('message.success_delete'),
                    'success'
                );
                this.renderList(`${this.entityName}Container`);
            }
        }
    }
    
    // Méthode pour afficher le formulaire de création (à implémenter dans les classes filles)
    showCreateForm() {
        console.warn('showCreateForm doit être implémenté dans la classe enfant');
    }
    
    // Méthode pour afficher le formulaire de modification (à implémenter dans les classes filles)
    showEditForm(id) {
        console.warn('showEditForm doit être implémenté dans la classe enfant');
    }
    
    // Méthode pour afficher les détails (à implémenter dans les classes filles)
    showDetails(id) {
        console.warn('showDetails doit être implémenté dans la classe enfant');
    }
    
    // Méthode pour rendre la liste (à implémenter dans les classes filles)
    renderList(containerId) {
        console.warn('renderList doit être implémenté dans la classe enfant');
    }
    
    // Méthode pour valider les données (à implémenter dans les classes filles)
    validate(data) {
        return { isValid: true, errors: {} };
    }
    
    // Méthode pour gérer la soumission du formulaire (à implémenter dans les classes filles)
    async handleFormSubmit(e) {
        console.warn('handleFormSubmit doit être implémenté dans la classe enfant');
    }
}

// Exporter pour une utilisation globale
window.BaseEntity = BaseEntity;

