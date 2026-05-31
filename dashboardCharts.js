/**
 * Gestionnaire de graphiques pour le dashboard Carbonely
 */

class DashboardCharts {
    constructor(containerId) {
        this.containerId = containerId;
        this.charts = {};
        this.data = this.getChartData();
        this.init();
    }
    
    init() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js n\'est pas chargé');
            return;
        }
        
        this.renderCharts();
        this.initEvents();
    }
    
    getChartData() {
        // Données simulées pour les graphiques
        return {
            co2ByCategory: {
                labels: ['Streaming', 'Emails', 'Cloud', 'Appareils', 'Général'],
                data: [45, 25, 15, 10, 5],
                colors: ['#2b6cb0', '#4299e1', '#38a169', '#d69e2e', '#e53e3e']
            },
            monthlyProgress: {
                labels: ['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'],
                actual: [12.5, 15.2, 18.7, 22.3, 25.8, 28.4],
                target: [15, 18, 21, 24, 27, 30]
            },
            deviceDistribution: {
                labels: ['Smartphone', 'Laptop', 'Tablet', 'Desktop', 'TV'],
                data: [35, 25, 15, 15, 10],
                colors: ['#2b6cb0', '#4299e1', '#38a169', '#d69e2e', '#e53e3e']
            },
            streamingHours: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                netflix: [2.5, 3.0, 2.0, 3.5, 4.0, 5.5, 4.5],
                youtube: [1.5, 2.0, 1.0, 2.5, 3.0, 4.0, 3.5],
                others: [1.0, 1.5, 0.5, 1.0, 2.0, 3.0, 2.5]
            },
            emailTrends: {
                labels: Array.from({ length: 30 }, (_, i) => `J${i + 1}`),
                sent: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 20),
                received: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 30),
                spam: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 5)
            },
            areaChart: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                data: [12, 19, 3, 5, 2, 3, 15],
                color: 'rgba(75, 192, 192, 0.2)'
            },
            scatterPlot: {
                data: Array.from({ length: 50 }, () => ({
                    x: Math.random() * 100,
                    y: Math.random() * 100
                }))
            }
        };
    }
    
    renderCharts() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="row mb-4">
                <div class="col-lg-6">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">CO₂ par Catégorie (Diagramme circulaire)</h5>
                            <p class="chart-subtitle">Répartition des économies de CO₂</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="pieChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">Progrès Mensuel (Diagramme en anneau)</h5>
                            <p class="chart-subtitle">Objectifs vs Réalisation</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="donutChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-lg-8">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">Heures de Streaming (Diagramme en barres)</h5>
                            <p class="chart-subtitle">7 derniers jours par plateforme</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="barChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">Répartition des Appareils (Graphique en aires)</h5>
                            <p class="chart-subtitle">Types d'appareils électroniques</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="areaChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">Tendances des Emails (Graphique linéaire)</h5>
                            <p class="chart-subtitle">Activité sur 30 jours</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="lineChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-lg-6">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">Corrélation CO₂/Énergie (Nuage de points)</h5>
                            <p class="chart-subtitle">Relation entre consommation et émissions</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="scatterChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">Distribution des Consommations (Histogramme)</h5>
                            <p class="chart-subtitle">Fréquence des niveaux de consommation</p>
                        </div>
                        <div class="chart-body">
                            <canvas id="histogramChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.createPieChart();
        this.createDonutChart();
        this.createBarChart();
        this.createAreaChart();
        this.createLineChart();
        this.createScatterChart();
        this.createHistogramChart();
    }
    
    createPieChart() {
        const ctx = document.getElementById('pieChart').getContext('2d');
        const data = this.data.co2ByCategory;
        
        this.charts.pie = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: data.colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
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
    
    createDonutChart() {
        const ctx = document.getElementById('donutChart').getContext('2d');
        const data = this.data.monthlyProgress;
        
        const totalActual = data.actual.reduce((a, b) => a + b, 0);
        const totalTarget = data.target.reduce((a, b) => a + b, 0);
        const completionRate = Math.round((totalActual / totalTarget) * 100);
        
        this.charts.donut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Réalisé', 'Reste à faire'],
                datasets: [{
                    data: [totalActual, Math.max(0, totalTarget - totalActual)],
                    backgroundColor: ['#38a169', '#e2e8f0'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}kg CO₂`;
                            }
                        }
                    }
                }
            }
        });
        
        // Ajouter le texte au centre
        Chart.register({
            id: 'centerText',
            afterDraw: (chart) => {
                const { ctx, chartArea: { width, height } } = chart;
                ctx.save();
                ctx.font = 'bold 24px sans-serif';
                ctx.fillStyle = '#2d3748';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${completionRate}%`, width / 2, height / 2);
                
                ctx.font = '12px sans-serif';
                ctx.fillStyle = '#718096';
                ctx.fillText('Objectif', width / 2, height / 2 + 24);
                ctx.restore();
            }
        });
    }
    
    createBarChart() {
        const ctx = document.getElementById('barChart').getContext('2d');
        const data = this.data.streamingHours;
        
        this.charts.bar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Netflix',
                        data: data.netflix,
                        backgroundColor: '#E50914',
                        borderRadius: 4
                    },
                    {
                        label: 'YouTube',
                        data: data.youtube,
                        backgroundColor: '#FF0000',
                        borderRadius: 4
                    },
                    {
                        label: 'Autres',
                        data: data.others,
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
                        stacked: false,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Heures'
                        },
                        grid: {
                            borderDash: [2, 2]
                        }
                    }
                }
            }
        });
    }
    
    createAreaChart() {
        const ctx = document.getElementById('areaChart').getContext('2d');
        const data = this.data.areaChart;
        
        this.charts.area = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Consommation',
                    data: data.data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [2, 2]
                        }
                    }
                }
            }
        });
    }
    
    createLineChart() {
        const ctx = document.getElementById('lineChart').getContext('2d');
        const data = this.data.emailTrends;
        
        this.charts.line = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Emails envoyés',
                        data: data.sent,
                        borderColor: '#4299e1',
                        backgroundColor: 'rgba(66, 153, 225, 0.1)',
                        tension: 0.3,
                        borderWidth: 2
                    },
                    {
                        label: 'Emails reçus',
                        data: data.received,
                        borderColor: '#38a169',
                        backgroundColor: 'rgba(56, 161, 105, 0.1)',
                        tension: 0.3,
                        borderWidth: 2
                    },
                    {
                        label: 'Spam',
                        data: data.spam,
                        borderColor: '#e53e3e',
                        backgroundColor: 'rgba(229, 62, 62, 0.1)',
                        tension: 0.3,
                        borderWidth: 2
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
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre d\'emails'
                        },
                        grid: {
                            borderDash: [2, 2]
                        }
                    }
                }
            }
        });
    }
    
    createScatterChart() {
        const ctx = document.getElementById('scatterChart').getContext('2d');
        const data = this.data.scatterPlot;
        
        this.charts.scatter = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Points de données',
                    data: data.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `x: ${context.parsed.x.toFixed(1)}, y: ${context.parsed.y.toFixed(1)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Consommation d\'énergie (kWh)'
                        },
                        grid: {
                            borderDash: [2, 2]
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Émissions CO₂ (kg)'
                        },
                        grid: {
                            borderDash: [2, 2]
                        }
                    }
                }
            }
        });
    }
    
    createHistogramChart() {
        const ctx = document.getElementById('histogramChart').getContext('2d');
        
        // Générer des données d'histogramme
        const bins = 10;
        const data = Array.from({ length: 100 }, () => Math.random() * 100);
        const histogramData = Array(bins).fill(0);
        
        data.forEach(value => {
            const binIndex = Math.min(Math.floor(value / (100 / bins)), bins - 1);
            histogramData[binIndex]++;
        });
        
        this.charts.histogram = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: bins }, (_, i) => `${i * 10}-${(i + 1) * 10}`),
                datasets: [{
                    label: 'Fréquence',
                    data: histogramData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Niveau de consommation'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Fréquence'
                        },
                        grid: {
                            borderDash: [2, 2]
                        }
                    }
                }
            }
        });
    }
    
    initEvents() {
        // Redimensionnement
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => {
                if (chart) chart.resize();
            });
        });
        
        // Filtres dynamiques
        document.getElementById('periodFilter')?.addEventListener('change', () => this.updateCharts());
        document.getElementById('categoryFilter')?.addEventListener('change', () => this.updateCharts());
    }
    
    updateCharts() {
        // Mettre à jour les données en fonction des filtres
        const period = document.getElementById('periodFilter')?.value || 'month';
        const category = document.getElementById('categoryFilter')?.value || 'all';
        
        // Ici, vous pourriez recharger les données depuis les entités
        // Pour cet exemple, nous allons simplement animer les mises à jour
        
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.data && chart.data.datasets) {
                // Animation de mise à jour
                chart.data.datasets.forEach(dataset => {
                    if (Array.isArray(dataset.data)) {
                        dataset.data = dataset.data.map(value => 
                            value * (0.9 + Math.random() * 0.2)
                        );
                    }
                });
                chart.update('none');
            }
        });
    }
    
    // Méthodes pour exporter les graphiques
    exportChartAsImage(chartId, filename = 'graphique.png') {
        const chart = this.charts[chartId];
        if (!chart) return;
        
        const link = document.createElement('a');
        link.download = filename;
        link.href = chart.toBase64Image();
        link.click();
    }
    
    exportAllCharts() {
        const zip = new JSZip();
        
        Object.entries(this.charts).forEach(([name, chart]) => {
            if (chart) {
                const imageData = chart.toBase64Image().split(',')[1];
                zip.file(`${name}.png`, imageData, { base64: true });
            }
        });
        
        zip.generateAsync({ type: 'blob' }).then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `carbonely_charts_${new Date().toISOString().split('T')[0]}.zip`;
            link.click();
            URL.revokeObjectURL(link.href);
        });
    }
}

// Initialiser les graphiques quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('chartsContainer')) {
        window.dashboardCharts = new DashboardCharts('chartsContainer');
    }
});