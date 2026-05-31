/**
 * Système d'authentification Carbonely
 */

class AuthManager {
    constructor() {
        this.users = [
            {
                email: 'admin@app.com',
                password: 'admin123',
                name: 'Admin Carbonely',
                role: 'admin',
                avatar: '👨‍💼'
            },
            {
                email: 'user@app.com',
                password: 'user123',
                name: 'Utilisateur Test',
                role: 'user',
                avatar: '👤'
            }
        ];
        
        this.currentUser = null;
        this.init();
    }
    
    init() {
        // Vérifier si l'utilisateur est déjà connecté
        const userData = localStorage.getItem('carbonely_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
        
        // Gérer le formulaire de connexion
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Validation basique
        if (!email || !password) {
            this.showError('Veuillez remplir tous les champs');
            return;
        }
        
        // Recherche de l'utilisateur
        const user = this.users.find(u => 
            u.email === email && u.password === password
        );
        
        if (user) {
            this.login(user);
        } else {
            this.showError('Email ou mot de passe incorrect');
        }
    }
    
    login(user) {
        // Stocker les informations de session
        const userData = {
            ...user,
            loginTime: new Date().toISOString(),
            token: btoa(JSON.stringify({ email: user.email, time: Date.now() }))
        };
        
        localStorage.setItem('carbonely_user', JSON.stringify(userData));
        localStorage.setItem('carbonely_token', userData.token);
        
        // Redirection vers le dashboard
        window.location.href = 'dashboard.html';
    }
    
    logout() {
        localStorage.removeItem('carbonely_user');
        localStorage.removeItem('carbonely_token');
        window.location.href = 'login.html';
    }
    
    isAuthenticated() {
        const token = localStorage.getItem('carbonely_token');
        const user = localStorage.getItem('carbonely_user');
        return !!(token && user);
    }
    
    getCurrentUser() {
        if (!this.currentUser) {
            const userData = localStorage.getItem('carbonely_user');
            this.currentUser = userData ? JSON.parse(userData) : null;
        }
        return this.currentUser;
    }
    
    showError(message) {
        const errorAlert = document.getElementById('errorAlert');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorAlert && errorMessage) {
            errorMessage.textContent = message;
            errorAlert.classList.remove('d-none');
            
            // Cacher l'erreur après 5 secondes
            setTimeout(() => {
                errorAlert.classList.add('d-none');
            }, 5000);
        } else {
            alert(message);
        }
    }
    
    // Middleware pour protéger les pages
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Initialiser l'authentification
const auth = new AuthManager();

// Exporter pour une utilisation globale
window.authManager = auth;