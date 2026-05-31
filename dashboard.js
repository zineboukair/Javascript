/**
 * Dashboard Carbonely avec graphiques
 */

class DashboardManager {
    constructor() {
        this.streamingEntity = new StreamingEntity();
        this.emailsEntity = new BaseEntity('emails', 'carbonely_emails_data', []);
        this.cloudEntity = new BaseEntity('cloud', 'carbonely_cloud_data', []);
        this.devicesEntity = new BaseEntity('devices', 'carbonely_devices_data', []);
        this.tipsEntity = new BaseEntity('tips', 'carbonely_tips_data', []);
        
        this.charts = {};
        this.init();
    }
    
    init() {
        if (document.getElementById('dashboardContainer')) {
            this.renderDashboard();
            this.initCharts();
            this.initEvents();
        }
    }
    
    renderDashboard() {
        const user = authManager.getCurrentUser();
        const container = document.getElementById('dashboardContainer');
        
        container.innerHTML = `
            <div class="page-header">
                <h1>${t('dashboard.title')}</h1>
                <p>${t('dashboard.welcome', { name: user?.name || 'Utilisateur' })}</p>
            </div>
            
            <!-- Filtres -->
            <div class="filters-container mb-4">
                <div class="row g-3">
                    <div class="col-md-4">
                        <label class="form-label">${t('filter.period')}</label>
                        <select class="form-select" id="periodFilter">
                            <option value="today">${t('filter.today')}</option>
                            <option value="week">${t('filter.week')}</option>
                            <option value="month" selected>${t('filter.month')}</option>
                            <option value="year">${t('filter.year')}</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">${t('filter.category')}</label>
                        <select class="form-select" id="categoryFilter">
                            <option value="all" selected>${t('filter.all')}</option>
                            <option value="streaming">${t('nav.streaming')}</option>
                            <option value="emails">${t('nav.emails')}</option>
                            <option value="cloud">${t('nav.cloud')}</option>
                            <option value="devices">${t('nav.devices')}</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">${t('filter.type')}</label>
                        <select class="form-select" id="typeFilter">
                            <option value="all" selected>${t('filter.all')}</option>
                            <option value="co2">CO₂ Économisé</option>
                            <option value="usage">Utilisation</option>
                            <option value="comparison">Comparaison</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <!-- KPI Cards -->
            <div class="kpi-cards mb-4">
                <div class="kpi-card success">
                    <div class="kpi-value">${this.getTotalCO2Saved().toFixed(2)} kg</div>
                    <div class="kpi-label">${t('dashboard.kpi.total_co2')}</div>
                    <div class="kpi-change positive">
                        <i class="fas fa-arrow-up"></i> 12% ${t('dashboard.kpi.last_month')}
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-value">${this.streamingEntity.getStats().total}</div>
                    <div class="kpi-label">${t('dashboard.kpi.streaming')}</div>
                    <div class="kpi-change positive">
                        <i class="fas fa-arrow-up"></i> 8% ${t('dashboard.kpi.this_month')}
                    </div>
                </div>
                
                <div class="kpi-card info">
                    <div class="kpi-value">${this.emailsEntity.getStats().total}</div>
                    <div class="kpi-label">${t('dashboard.kpi.emails')}</div>
                    <div class="kpi-change negative">
                        <i class="fas fa-arrow-down"></i> 3% ${t('dashboard.kpi.this_month')}
                    </div>
                </div>
                
                <div class="kpi-card warning">
                    <div class="kpi-value">${this.cloudEntity.getStats().total}</div>
                    <div class="kpi-label">${t('dashboard.kpi.cloud')}</div>
                    <div class="kpi-change positive">
                        <i class="fas fa-arrow-up"></i> 15% ${t('dashboard.kpi.this_month')}
                    </div>
                </div>
                
                <div class="kpi-card danger">
                    <div class="kpi-value">${this.devicesEntity.getStats().total}</div>
                    <div class="kpi-label">${t('dashboard.kpi.devices')}</div>
                    <div class="kpi-change positive">
                        <i class="fas fa-arrow-up"></i> 5% ${t('dashboard.kpi.this_month')}
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-value">${this.tipsEntity.getStats().total}</div>
                    <div class="kpi-label">${t('dashboard.kpi.tips')}</div>
                    <div class="kpi-change positive">
                        <i class="fas fa-arrow-up"></i> 20% ${t('dashboard.kpi.this_month')}
                    </div>
                </div>
            </div>
            
            <!-- Charts -->
            <div class="row mb-4">
                <div class="col-lg-6">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">${t('dashboard.charts.co2_by_category')}</h5>
                            <p class="chart-subtitle">${t('dashboard.kpi.this_month')}</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="co2ByCategoryChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">${t('dashboard.charts.monthly_progress')}</h5>
                            <p class="chart-subtitle">6 derniers mois</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="monthlyProgressChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-lg-4">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">${t('dashboard.charts.device_distribution')}</h5>
                            <p class="chart-subtitle">Par type d'appareil</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="deviceDistributionChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">${t('dashboard.charts.streaming_hours')}</h5>
                            <p class="chart-subtitle">7 derniers jours</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="streamingHoursChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">${t('dashboard.charts.email_trends')}</h5>
                            <p class="chart-subtitle">Activité quotidienne</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="emailTrendsChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    initCharts() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js n\'est pas chargé');
            return;
        }
        
        this.createCO2ByCategoryChart();
        this.createMonthlyProgressChart();
        this.createDeviceDistributionChart();
        this.createStreamingHoursChart();
        this.createEmailTrendsChart();
    }
    
    createCO2ByCategoryChart() {
        const ctx = document.getElementById('co2ByCategoryChart').getContext('2d');
        
        // Données simulées
        const data = {
            labels: ['Streaming', 'Emails', 'Cloud', 'Appareils'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: Helpers.generateColors(4),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        };
        
        this.charts.co2ByCategory = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value}kg (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    createMonthlyProgressChart() {
        const ctx = document.getElementById('monthlyProgressChart').getContext('2d');
        
        // Données des 6 derniers mois
        const months = ['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'];
        const co2Saved = [12.5, 15.2, 18.7, 22.3, 25.8, 28.4];
        const target = [15, 18, 21, 24, 27, 30];
        
        this.charts.monthlyProgress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'CO₂ Économisé',
                        data: co2Saved,
                        borderColor: '#4299e1',
                        backgroundColor: 'rgba(66, 153, 225, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Objectif',
                        data: target,
                        borderColor: '#38a169',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'kg CO₂'
                        }
                    }
                }
            }
        });
    }
    
    createDeviceDistributionChart() {
        const ctx = document.getElementById('deviceDistributionChart').getContext('2d');
        
        this.charts.deviceDistribution = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Smartphone', 'Laptop', 'Tablette', 'Desktop', 'TV'],
                datasets: [{
                    data: [35, 25, 15, 15, 10],
                    backgroundColor: Helpers.generateColors(5)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    createStreamingHoursChart() {
        const ctx = document.getElementById('streamingHoursChart').getContext('2d');
        
        const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const netflix = [2.5, 3.0, 2.0, 3.5, 4.0, 5.5, 4.5];
        const youtube = [1.5, 2.0, 1.0, 2.5, 3.0, 4.0, 3.5];
        const others = [1.0, 1.5, 0.5, 1.0, 2.0, 3.0, 2.5];
        
        this.charts.streamingHours = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Netflix',
                        data: netflix,
                        backgroundColor: '#E50914',
                        borderRadius: 4
                    },
                    {
                        label: 'YouTube',
                        data: youtube,
                        backgroundColor: '#FF0000',
                        borderRadius: 4
                    },
                    {
                        label: 'Autres',
                        data: others,
                        backgroundColor: '#00A8FF',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        stacked: false
                    },
                    y: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Heures'
                        }
                    }
                }
            }
        });
    }
    
    createEmailTrendsChart() {
        const ctx = document.getElementById('emailTrendsChart').getContext('2d');
        
        // Données pour 30 jours
        const days = Array.from({ length: 30 }, (_, i) => `J${i + 1}`);
        const emailsSent = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 20);
        const emailsReceived = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 30);
        const spam = Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 5);
        
        this.charts.emailTrends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Emails envoyés',
                        data: emailsSent,
                        borderColor: '#4299e1',
                        backgroundColor: 'rgba(66, 153, 225, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: 'Emails reçus',
                        data: emailsReceived,
                        borderColor: '#38a169',
                        backgroundColor: 'rgba(56, 161, 105, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: 'Spam',
                        data: spam,
                        borderColor: '#e53e3e',
                        backgroundColor: 'rgba(229, 62, 62, 0.1)',
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre d\'emails'
                        }
                    }
                }
            }
        });
    }
    
    getTotalCO2Saved() {
        // Calculer le CO₂ total économisé
        const streamingData = this.streamingEntity.readAll();
        let total = 0;
        
        streamingData.forEach(item => {
            total += item.co2Saved || 0;
        });
        
        // Ajouter d'autres sources ici...
        
        return total;
    }
    
    initEvents() {
        // Filtres dynamiques
        document.getElementById('periodFilter')?.addEventListener('change', () => this.updateCharts());
        document.getElementById('categoryFilter')?.addEventListener('change', () => this.updateCharts());
        document.getElementById('typeFilter')?.addEventListener('change', () => this.updateCharts());
        
        // Redimensionnement des graphiques
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => {
                if (chart) chart.resize();
            });
        });
    }
    
    updateCharts() {
        // Mettre à jour les données des graphiques en fonction des filtres
        const period = document.getElementById('periodFilter')?.value || 'month';
        const category = document.getElementById('categoryFilter')?.value || 'all';
        
        // Ici, vous pouvez recalculer les données en fonction des filtres
        // Pour cet exemple, nous allons simplement mettre à jour les titres
        
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    }
}

// Initialiser le dashboard quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    if (authManager.requireAuth()) {
        new DashboardManager();
    }
});