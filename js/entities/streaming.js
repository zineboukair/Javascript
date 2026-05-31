/**
 * Entité CRUD pour les activités de streaming
 */

class StreamingEntity extends BaseEntity {
    constructor() {
        super('streaming', 'carbonely_streaming_data', [
            {
                id: '1',
                platform: 'Netflix',
                duration: 2.5,
                quality: 'HD',
                date: '2024-03-15',
                co2Saved: 0.8,
                category: 'Film',
                createdAt: '2024-03-15T10:30:00Z',
                updatedAt: '2024-03-15T10:30:00Z'
            }
        ]);

        this.platforms = ['Netflix', 'YouTube', 'Disney+', 'Amazon Prime', 'Twitch'];
        this.qualities = ['SD', 'HD', 'Full HD', '4K', 'UHD'];
        this.categories = ['Film', 'Série', 'Musique', 'Documentaire', 'Gaming'];
    }

    /* ================= LIST ================= */

    renderList(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const paginated = this.getPaginatedData();

        container.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5>Streaming</h5>
                <div>
                    <button class="btn btn-success me-2" id="exportStreamingCSV">
                        Export CSV
                    </button>
                    <button class="btn btn-primary" id="addStreamingBtn">
                        + Ajouter
                    </button>
                </div>
            </div>

            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Plateforme</th>
                            <th>Durée (h)</th>
                            <th>Qualité</th>
                            <th>Date</th>
                            <th>CO₂ (kg)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="streamingTableBody">
                        ${paginated.data.map(item => `
                            <tr>
                                <td>${item.platform}</td>
                                <td>${item.duration}</td>
                                <td>${item.quality}</td>
                                <td>${item.date}</td>
                                <td>${item.co2Saved.toFixed(2)}</td>
                                <td>
                                    <button class="btn btn-sm btn-warning edit" data-id="${item.id}">✏️</button>
                                    <button class="btn btn-sm btn-danger delete" data-id="${item.id}">🗑️</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                ${this.renderPagination(paginated)}
            </div>
        </div>

        <!-- MODAL -->
        <div class="modal fade" id="streamingModal">
            <div class="modal-dialog">
                <form class="modal-content" id="streamingForm">
                    <div class="modal-header">
                        <h5 id="streamingModalTitle">Streaming</h5>
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <input type="hidden" id="streamingId">

                        <select id="streamingPlatform" class="form-select mb-2">
                            <option value="">Plateforme</option>
                            ${this.platforms.map(p => `<option value="${p}">${p}</option>`).join('')}
                        </select>

                        <input type="number" id="streamingDuration" class="form-control mb-2" placeholder="Durée (h)">

                        <select id="streamingQuality" class="form-select mb-2">
                            <option value="">Qualité</option>
                            ${this.qualities.map(q => `<option value="${q}">${q}</option>`).join('')}
                        </select>

                        <input type="date" id="streamingDate" class="form-control mb-2">
                        <input type="number" id="streamingCO2" class="form-control" placeholder="CO₂">
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button class="btn btn-primary" type="submit">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
        `;

        this.initEvents();
        this.initPaginationEvents();
    }

    /* ================= EVENTS ================= */

    initEvents() {
        document.getElementById('addStreamingBtn')
            ?.addEventListener('click', () => this.showCreateForm());

        document.getElementById('exportStreamingCSV')
            ?.addEventListener('click', () => this.exportCSV());

        document.getElementById('streamingTableBody')
            ?.addEventListener('click', e => {
                const id = e.target.dataset.id;
                if (e.target.classList.contains('edit')) this.showEditForm(id);
                if (e.target.classList.contains('delete')) this.confirmDelete(id);
            });

        document.getElementById('streamingForm')
            ?.addEventListener('submit', e => this.handleFormSubmit(e));

        const d = document.getElementById('streamingDuration');
        const q = document.getElementById('streamingQuality');
        const c = document.getElementById('streamingCO2');

        const autoCO2 = () => {
            if (d.value && q.value) {
                c.value = this.calculateCO2(+d.value, q.value).toFixed(2);
            }
        };

        d?.addEventListener('input', autoCO2);
        q?.addEventListener('change', autoCO2);
    }

    /* ================= FORMS ================= */

    showCreateForm() {
        document.getElementById('streamingForm').reset();
        document.getElementById('streamingId').value = '';
        new bootstrap.Modal(document.getElementById('streamingModal')).show();
    }

    showEditForm(id) {
        const item = this.read(id);
        if (!item) return;

        streamingId.value = item.id;
        streamingPlatform.value = item.platform;
        streamingDuration.value = item.duration;
        streamingQuality.value = item.quality;
        streamingDate.value = item.date;
        streamingCO2.value = item.co2Saved;

        new bootstrap.Modal(document.getElementById('streamingModal')).show();
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const id = streamingId.value;

        const data = {
            platform: streamingPlatform.value,
            duration: +streamingDuration.value,
            quality: streamingQuality.value,
            date: streamingDate.value,
            co2Saved: +streamingCO2.value
        };

        if (!this.validate(data).isValid) {
            alert('Formulaire invalide');
            return;
        }

        id ? this.update(id, data) : this.create(data);

        bootstrap.Modal.getInstance(streamingModal).hide();
        this.renderList('streamingContainer');
    }

    /* ================= EXPORT CSV ================= */

    exportCSV() {
        if (!this.data.length) {
            alert('Aucune donnée à exporter');
            return;
        }

        const headers = ['platform', 'duration', 'quality', 'date', 'co2Saved'];
        const rows = [
            headers.join(','),
            ...this.data.map(item =>
                headers.map(h => `"${item[h]}"`).join(',')
            )
        ];

        const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'streaming.csv';
        link.click();
    }
}

window.StreamingEntity = StreamingEntity;
