class Navigation {
    constructor() {
        this.currentPage = 'dashboard'; // страница по умолчанию
        this.pages = {
            dashboard: 'pages/dashboard.html',
            'call-analysis': 'pages/call-analysis.html',
            'virtual-trainer': 'pages/virtual-trainer.html',
            reports: 'pages/reports.html',
            analytics: 'pages/analytics.html',
            settings: 'pages/settings.html'
        };
        
        this.mainContent = document.getElementById('main-content');
        this.initNavigation();
        this.loadPage(this.currentPage);
    }

    initNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.dataset.page;
                this.navigate(page);
            });
        });

        // Обработка кнопки "назад" в браузере
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });
    }

    navigate(page) {
        if (page === this.currentPage) return;
        
        // Обновляем URL без перезагрузки страницы
        window.history.pushState({ page }, '', `#${page}`);
        this.loadPage(page);
    }

    async loadPage(page, updateHistory = true) {
        try {
            // Обновляем активную ссылку
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === page) {
                    link.classList.add('active');
                }
            });

            // Загружаем содержимое страницы
            const response = await fetch(this.pages[page]);
            const content = await response.text();
            
            // Обновляем содержимое
            this.mainContent.innerHTML = content;
            this.currentPage = page;

            // Инициализируем скрипты для новой страницы
            this.initPageScripts(page);
        } catch (error) {
            console.error('Ошибка загрузки страницы:', error);
            this.mainContent.innerHTML = '<h1>Ошибка загрузки страницы</h1>';
        }
    }

    initPageScripts(page) {
        // Инициализация специфичных скриптов для каждой страницы
        switch(page) {
            case 'dashboard':
                if (window.initDashboard) window.initDashboard();
                break;
            case 'virtual-trainer':
                if (window.vectorTrainer) new window.vectorTrainer();
                break;
            case 'analytics':
                if (window.initAnalytics) window.initAnalytics();
                break;
            // Добавьте другие страницы по необходимости
        }
    }
} 