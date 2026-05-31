// js/dark-mode.js - Version simplifiée
document.addEventListener('DOMContentLoaded', function() {
    // Trouver le bouton - plusieurs IDs possibles
    let darkModeBtn = document.getElementById('darkModeBtn') || 
                     document.getElementById('darkModeToggle') ||
                     document.getElementById('darkModeFallback');
    
    // Créer le bouton s'il n'existe pas
    if (!darkModeBtn) {
        darkModeBtn = document.createElement('button');
        darkModeBtn.id = 'darkModeBtn';
        darkModeBtn.className = 'nav-link';
        darkModeBtn.innerHTML = `
            <i class="fas fa-moon"></i>
            <span>Mode sombre</span>
        `;
        darkModeBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            padding: 10px;
            background: #1d5c8f;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        document.body.appendChild(darkModeBtn);
    }
    
    // Vérifier le thème enregistré
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // Appliquer le mode initial
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Mettre à jour l'icône
    function updateIcon() {
        const icon = darkModeBtn.querySelector('i');
        const text = darkModeBtn.querySelector('span');
        const isDark = document.body.classList.contains('dark-mode');
        
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        if (text) {
            text.textContent = isDark ? 'Mode clair' : 'Mode sombre';
        }
    }
    
    updateIcon();
    
    // Gérer le clic
    darkModeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Bascule du mode sombre
        document.body.classList.toggle('dark-mode');
        
        // Sauvegarder la préférence
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        
        // Mettre à jour l'icône
        updateIcon();
        
        // Afficher un message
        showNotification(isDark ? 'Mode sombre activé' : 'Mode clair activé');
    });
    
    function showNotification(message) {
        // Notification simple
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 10px 20px;
            background: #1d5c8f;
            color: white;
            border-radius: 5px;
            z-index: 9999;
            animation: fadeInOut 2s ease;
        `;
        
        // Style d'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-10px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Supprimer après l'animation
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 2000);
    }
    
    console.log('Dark mode script chargé');
});