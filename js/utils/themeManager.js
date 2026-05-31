export class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('carbonely_theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.createToggleButton();
    }

    createToggleButton() {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.innerHTML = this.theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        toggleBtn.addEventListener('click', () => this.toggle());
        
        // Ajouter au header
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(toggleBtn);
        }
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('carbonely_theme', this.theme);
        
        // Mettre à jour l'icône
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = this.theme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
        
        // Rafraîchir les graphiques si nécessaire
        this.updateChartsTheme();
    }

    updateChartsTheme() {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(chart => {
            const chartInstance = Chart.getChart(chart);
            if (chartInstance) {
                const isDark = this.theme === 'dark';
                chartInstance.options.scales.x.grid.color = isDark ? '#495057' : '#dee2e6';
                chartInstance.options.scales.y.grid.color = isDark ? '#495057' : '#dee2e6';
                chartInstance.update();
            }
        });
    }
}