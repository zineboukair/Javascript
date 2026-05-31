/**
 * Système d'internationalisation pour Carbonely
 */

class I18nManager {
    constructor() {
        this.translations = {
            fr: {
                // Navigation
                'nav.dashboard': 'Tableau de bord',
                'nav.streaming': 'Streaming',
                'nav.emails': 'Emails',
                'nav.cloud': 'Cloud',
                'nav.devices': 'Appareils',
                'nav.tips': 'Conseils Carbone',
                'nav.logout': 'Déconnexion',
                'nav.profile': 'Profil',
                'nav.settings': 'Paramètres',
                
                // Dashboard
                'dashboard.title': 'Tableau de Bord',
                'dashboard.welcome': 'Bienvenue, {name}',
                'dashboard.kpi.total_co2': 'Total CO₂ Économisé',
                'dashboard.kpi.streaming': 'Streaming',
                'dashboard.kpi.emails': 'Emails',
                'dashboard.kpi.cloud': 'Cloud',
                'dashboard.kpi.devices': 'Appareils',
                'dashboard.kpi.tips': 'Conseils Suivis',
                'dashboard.kpi.this_month': 'Ce mois-ci',
                'dashboard.kpi.last_month': 'Mois dernier',
                'dashboard.charts.co2_by_category': 'CO₂ par Catégorie',
                'dashboard.charts.monthly_progress': 'Progrès Mensuel',
                'dashboard.charts.device_distribution': 'Répartition des Appareils',
                'dashboard.charts.streaming_hours': 'Heures de Streaming',
                'dashboard.charts.email_trends': 'Tendances des Emails',
                
                // Actions
                'actions.view': 'Voir',
                'actions.edit': 'Modifier',
                'actions.delete': 'Supprimer',
                'actions.save': 'Enregistrer',
                'actions.cancel': 'Annuler',
                'actions.create': 'Créer',
                'actions.update': 'Mettre à jour',
                'actions.filter': 'Filtrer',
                'actions.search': 'Rechercher',
                'actions.export': 'Exporter',
                'actions.import': 'Importer',
                'actions.reset': 'Réinitialiser',
                
                // Messages
                'message.confirm_delete': 'Êtes-vous sûr de vouloir supprimer cet élément ?',
                'message.success_create': 'Élément créé avec succès',
                'message.success_update': 'Élément mis à jour avec succès',
                'message.success_delete': 'Élément supprimé avec succès',
                'message.error_general': 'Une erreur est survenue',
                
                // Formulaires
                'form.required': 'Ce champ est requis',
                'form.invalid_email': 'Email invalide',
                'form.invalid_number': 'Nombre invalide',
                'form.save_success': 'Enregistrement réussi',
                
                // Streaming
                'streaming.title': 'Activités de Streaming',
                'streaming.platform': 'Plateforme',
                'streaming.duration': 'Durée (heures)',
                'streaming.quality': 'Qualité',
                'streaming.date': 'Date',
                'streaming.co2_saved': 'CO₂ Économisé (kg)',
                
                // Emails
                'emails.title': 'Emails',
                'emails.sender': 'Expéditeur',
                'emails.recipient': 'Destinataire',
                'emails.subject': 'Sujet',
                'emails.size': 'Taille (MB)',
                'emails.attachments': 'Pièces jointes',
                'emails.status': 'Statut',
                
                // Cloud
                'cloud.title': 'Stockage Cloud',
                'cloud.provider': 'Fournisseur',
                'cloud.storage_used': 'Stockage Utilisé (GB)',
                'cloud.files_count': 'Nombre de Fichiers',
                'cloud.last_backup': 'Dernière Sauvegarde',
                
                // Appareils
                'devices.title': 'Appareils Électroniques',
                'devices.type': 'Type',
                'devices.model': 'Modèle',
                'devices.purchase_date': 'Date d\'achat',
                'devices.energy_consumption': 'Consommation (kWh/an)',
                'devices.status': 'Statut',
                
                // Conseils
                'tips.title': 'Conseils de Réduction Carbone',
                'tips.category': 'Catégorie',
                'tips.description': 'Description',
                'tips.impact': 'Impact (kg CO₂)',
                'tips.difficulty': 'Difficulté',
                'tips.completed': 'Complété',
                
                // Filtres
                'filter.all': 'Tous',
                'filter.today': 'Aujourd\'hui',
                'filter.week': 'Cette semaine',
                'filter.month': 'Ce mois',
                'filter.year': 'Cette année',
                
                // Pagination
                'pagination.show': 'Afficher',
                'pagination.entries': 'entrées',
                'pagination.page': 'Page',
                'pagination.of': 'sur',
                'pagination.previous': 'Précédent',
                'pagination.next': 'Suivant'
            },
            
            en: {
                // Navigation
                'nav.dashboard': 'Dashboard',
                'nav.streaming': 'Streaming',
                'nav.emails': 'Emails',
                'nav.cloud': 'Cloud',
                'nav.devices': 'Devices',
                'nav.tips': 'Carbon Tips',
                'nav.logout': 'Logout',
                'nav.profile': 'Profile',
                'nav.settings': 'Settings',
                
                // Dashboard
                'dashboard.title': 'Dashboard',
                'dashboard.welcome': 'Welcome, {name}',
                'dashboard.kpi.total_co2': 'Total CO₂ Saved',
                'dashboard.kpi.streaming': 'Streaming',
                'dashboard.kpi.emails': 'Emails',
                'dashboard.kpi.cloud': 'Cloud',
                'dashboard.kpi.devices': 'Devices',
                'dashboard.kpi.tips': 'Tips Followed',
                'dashboard.kpi.this_month': 'This Month',
                'dashboard.kpi.last_month': 'Last Month',
                'dashboard.charts.co2_by_category': 'CO₂ by Category',
                'dashboard.charts.monthly_progress': 'Monthly Progress',
                'dashboard.charts.device_distribution': 'Device Distribution',
                'dashboard.charts.streaming_hours': 'Streaming Hours',
                'dashboard.charts.email_trends': 'Email Trends',
                
                // Actions
                'actions.view': 'View',
                'actions.edit': 'Edit',
                'actions.delete': 'Delete',
                'actions.save': 'Save',
                'actions.cancel': 'Cancel',
                'actions.create': 'Create',
                'actions.update': 'Update',
                'actions.filter': 'Filter',
                'actions.search': 'Search',
                'actions.export': 'Export',
                'actions.import': 'Import',
                'actions.reset': 'Reset',
                
                // Messages
                'message.confirm_delete': 'Are you sure you want to delete this item?',
                'message.success_create': 'Item created successfully',
                'message.success_update': 'Item updated successfully',
                'message.success_delete': 'Item deleted successfully',
                'message.error_general': 'An error occurred',
                
                // Formulaires
                'form.required': 'This field is required',
                'form.invalid_email': 'Invalid email',
                'form.invalid_number': 'Invalid number',
                'form.save_success': 'Save successful',
                
                // Streaming
                'streaming.title': 'Streaming Activities',
                'streaming.platform': 'Platform',
                'streaming.duration': 'Duration (hours)',
                'streaming.quality': 'Quality',
                'streaming.date': 'Date',
                'streaming.co2_saved': 'CO₂ Saved (kg)',
                
                // Emails
                'emails.title': 'Emails',
                'emails.sender': 'Sender',
                'emails.recipient': 'Recipient',
                'emails.subject': 'Subject',
                'emails.size': 'Size (MB)',
                'emails.attachments': 'Attachments',
                'emails.status': 'Status',
                
                // Cloud
                'cloud.title': 'Cloud Storage',
                'cloud.provider': 'Provider',
                'cloud.storage_used': 'Storage Used (GB)',
                'cloud.files_count': 'Files Count',
                'cloud.last_backup': 'Last Backup',
                
                // Appareils
                'devices.title': 'Electronic Devices',
                'devices.type': 'Type',
                'devices.model': 'Model',
                'devices.purchase_date': 'Purchase Date',
                'devices.energy_consumption': 'Energy Consumption (kWh/year)',
                'devices.status': 'Status',
                
                // Conseils
                'tips.title': 'Carbon Reduction Tips',
                'tips.category': 'Category',
                'tips.description': 'Description',
                'tips.impact': 'Impact (kg CO₂)',
                'tips.difficulty': 'Difficulty',
                'tips.completed': 'Completed',
                
                // Filtres
                'filter.all': 'All',
                'filter.today': 'Today',
                'filter.week': 'This Week',
                'filter.month': 'This Month',
                'filter.year': 'This Year',
                
                // Pagination
                'pagination.show': 'Show',
                'pagination.entries': 'entries',
                'pagination.page': 'Page',
                'pagination.of': 'of',
                'pagination.previous': 'Previous',
                'pagination.next': 'Next'
            },
            
            ar: {
                // Navigation
                'nav.dashboard': 'لوحة القيادة',
                'nav.streaming': 'البث',
                'nav.emails': 'البريد الإلكتروني',
                'nav.cloud': 'السحابة',
                'nav.devices': 'الأجهزة',
                'nav.tips': 'نصائح الكربون',
                'nav.logout': 'تسجيل الخروج',
                'nav.profile': 'الملف الشخصي',
                'nav.settings': 'الإعدادات',
                
                // Dashboard
                'dashboard.title': 'لوحة القيادة',
                'dashboard.welcome': 'مرحبًا، {name}',
                'dashboard.kpi.total_co2': 'إجمالي CO₂ المحفوظ',
                'dashboard.kpi.streaming': 'البث',
                'dashboard.kpi.emails': 'البريد الإلكتروني',
                'dashboard.kpi.cloud': 'السحابة',
                'dashboard.kpi.devices': 'الأجهزة',
                'dashboard.kpi.tips': 'النصائح المتبعة',
                'dashboard.kpi.this_month': 'هذا الشهر',
                'dashboard.kpi.last_month': 'الشهر الماضي',
                'dashboard.charts.co2_by_category': 'CO₂ حسب الفئة',
                'dashboard.charts.monthly_progress': 'التقدم الشهري',
                'dashboard.charts.device_distribution': 'توزيع الأجهزة',
                'dashboard.charts.streaming_hours': 'ساعات البث',
                'dashboard.charts.email_trends': 'اتجاهات البريد الإلكتروني',
                
                // Actions
                'actions.view': 'عرض',
                'actions.edit': 'تعديل',
                'actions.delete': 'حذف',
                'actions.save': 'حفظ',
                'actions.cancel': 'إلغاء',
                'actions.create': 'إنشاء',
                'actions.update': 'تحديث',
                'actions.filter': 'تصفية',
                'actions.search': 'بحث',
                'actions.export': 'تصدير',
                'actions.import': 'استيراد',
                'actions.reset': 'إعادة تعيين',
                
                // Messages
                'message.confirm_delete': 'هل أنت متأكد من حذف هذا العنصر؟',
                'message.success_create': 'تم إنشاء العنصر بنجاح',
                'message.success_update': 'تم تحديث العنصر بنجاح',
                'message.success_delete': 'تم حذف العنصر بنجاح',
                'message.error_general': 'حدث خطأ',
                
                // Formulaires
                'form.required': 'هذا الحقل مطلوب',
                'form.invalid_email': 'البريد الإلكتروني غير صالح',
                'form.invalid_number': 'رقم غير صالح',
                'form.save_success': 'تم الحفظ بنجاح',
                
                // Streaming
                'streaming.title': 'أنشطة البث',
                'streaming.platform': 'المنصة',
                'streaming.duration': 'المدة (ساعات)',
                'streaming.quality': 'الجودة',
                'streaming.date': 'التاريخ',
                'streaming.co2_saved': 'CO₂ المحفوظ (كجم)',
                
                // Emails
                'emails.title': 'البريد الإلكتروني',
                'emails.sender': 'المرسل',
                'emails.recipient': 'المستلم',
                'emails.subject': 'الموضوع',
                'emails.size': 'الحجم (ميجابايت)',
                'emails.attachments': 'المرفقات',
                'emails.status': 'الحالة',
                
                // Cloud
                'cloud.title': 'التخزين السحابي',
                'cloud.provider': 'المزود',
                'cloud.storage_used': 'المساحة المستخدمة (جيجابايت)',
                'cloud.files_count': 'عدد الملفات',
                'cloud.last_backup': 'آخر نسخ احتياطي',
                
                // Appareils
                'devices.title': 'الأجهزة الإلكترونية',
                'devices.type': 'النوع',
                'devices.model': 'الموديل',
                'devices.purchase_date': 'تاريخ الشراء',
                'devices.energy_consumption': 'استهلاك الطاقة (كيلوواط/ساعة سنويا)',
                'devices.status': 'الحالة',
                
                // Conseils
                'tips.title': 'نصائح تقليل الكربون',
                'tips.category': 'الفئة',
                'tips.description': 'الوصف',
                'tips.impact': 'التأثير (كجم CO₂)',
                'tips.difficulty': 'الصعوبة',
                'tips.completed': 'مكتمل',
                
                // Filtres
                'filter.all': 'الكل',
                'filter.today': 'اليوم',
                'filter.week': 'هذا الأسبوع',
                'filter.month': 'هذا الشهر',
                'filter.year': 'هذا العام',
                
                // Pagination
                'pagination.show': 'عرض',
                'pagination.entries': 'إدخالات',
                'pagination.page': 'الصفحة',
                'pagination.of': 'من',
                'pagination.previous': 'السابق',
                'pagination.next': 'التالي'
            }
        };
        
        this.currentLang = this.getSavedLanguage();
        this.init();
    }
    
    getSavedLanguage() {
        return localStorage.getItem('preferredLanguage') || 'fr';
    }
    
    init() {
        // Appliquer la langue courante
        document.documentElement.lang = this.currentLang;
        
        if (this.currentLang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        
        // Traduire tout le document
        this.translateDocument();
        
        // Écouter les changements de langue
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-lang]')) {
                e.preventDefault();
                this.setLanguage(e.target.getAttribute('data-lang'));
            }
        });
    }
    
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            document.documentElement.lang = lang;
            
            if (lang === 'ar') {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = 'ltr';
            }
            
            this.translateDocument();
            
            // Déclencher un événement personnalisé pour les composants
            document.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: lang } 
            }));
        }
    }
    
    translateDocument() {
        // Traduire les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Traduire les attributs title et alt
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.translate(key);
            if (translation) element.title = translation;
        });
        
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.translate(key);
            if (translation) element.alt = translation;
        });
        
        // Traduire les options de sélection
        document.querySelectorAll('[data-i18n-option]').forEach(element => {
            const key = element.getAttribute('data-i18n-option');
            const translation = this.translate(key);
            if (translation) element.textContent = translation;
        });
    }
    
    translate(key, params = {}) {
        let translation = this.translations[this.currentLang][key] || 
                         this.translations.fr[key] || 
                         key;
        
        // Remplacer les paramètres
        if (params && typeof params === 'object') {
            Object.keys(params).forEach(param => {
                translation = translation.replace(`{${param}}`, params[param]);
            });
        }
        
        return translation;
    }
    
    // Fonction d'aide pour obtenir la traduction depuis n'importe où
    static t(key, params = {}) {
        return window.i18n?.translate(key, params) || key;
    }
    
    // Obtenir la langue courante
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    // Obtenir la liste des langues disponibles
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
}

// Initialiser et exporter
const i18n = new I18nManager();
window.i18n = i18n;

// Fonction d'aide globale
window.t = (key, params) => i18n.translate(key, params);