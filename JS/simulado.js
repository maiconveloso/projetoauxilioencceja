// Função para toggle do sidebar
        document.getElementById('toggleSidebar').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');
        const toggleIcon = this.querySelector('i');
    
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('expanded');
    
        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.classList.remove('bi-chevron-right');
            toggleIcon.classList.add('bi-chevron-left');
            
        } else {
            toggleIcon.classList.remove('bi-chevron-left');
            toggleIcon.classList.add('bi-chevron-right');
        }
    });

        // Função para toggle do sidebar em mobile
        document.getElementById('mobileToggle').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');
    
        sidebar.classList.toggle('expanded');
        content.classList.toggle('shifted');
    });

        // Adiciona funcionalidade de clique nos itens do menu
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
        item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
        item.classList.remove('active');
    });
        this.classList.add('active');
        
        // No desktop, fechar o sidebar ao selecionar um item
        if (window.innerWidth < 992) {
            document.getElementById('sidebar').classList.remove('expanded');
            document.getElementById('content').classList.remove('shifted');
        }
    });
});

        // Atualização
        function handleResize() {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');
    
        if (window.innerWidth < 992) {
            sidebar.classList.remove('expanded');
            content.classList.remove('expanded');
            content.classList.remove('shifted');
            document.getElementById('toggleSidebar').style.display = 'block';
        } else {
            document.getElementById('toggleSidebar').style.display = 'block';
        }
    }

            window.addEventListener('resize', handleResize);
            handleResize(); // Chama inicialização

        // Adiciona funcionalidade aos botões de iniciar simulado
        document.querySelectorAll('[id^="startSimuladoBtn"]').forEach(btn => {
        btn.addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('simuladoModal'));
        modal.show();
    });
});

        // Adiciona funcionalidade ao botão de fechar o modal
        document.querySelector('.modal-header .btn-close').addEventListener('click', function() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('simuladoModal'));
        modal.hide();
    });

        // Adiciona funcionalidade ao botão de visualizar simulado
        document.querySelector('.modal-footer .btn-primary').addEventListener('click', function() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('simuladoModal'));
        modal.hide();
    
        // Exibe o modal de resultados
        setTimeout(() => {
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
    }, 500);
});

        // Adiciona funcionalidade ao botão de controle de tempo
        document.getElementById('timerBtn').addEventListener('click', function() {
        const timerModal = new bootstrap.Modal(document.getElementById('timerModal'));
        timerModal.show();
    });

        // Adiciona funcionalidade aos botões do timer
        document.getElementById('startTimerBtn').addEventListener('click', function() {
        this.style.display = 'none';
        document.getElementById('pauseTimerBtn').style.display = 'inline-block';

        // Lógica para iniciar o timer
        console.log('Timer iniciado');
    });

        document.getElementById('pauseTimerBtn').addEventListener('click', function() {
        this.style.display = 'none';
        document.getElementById('startTimerBtn').style.display = 'inline-block';

        // Lógica para pausar o timer
        console.log('Timer pausado');
    });

        document.getElementById('resetTimerBtn').addEventListener('click', function() {

        // Lógica para reiniciar o timer
        document.getElementById('timerValue').textContent = '60:00';
        console.log('Timer reiniciado');
    });

         // Modal de configurações de acessibilidade
            const accessibilityModal = document.getElementById('accessibilityModal');
            const accessibilityModalClose = document.getElementById('accessibilityModalClose');
            const accessibilityBtn = document.getElementById('accessibilityBtn');
            
            // Abrir modal
            accessibilityBtn.addEventListener('click', function() {
                accessibilityModal.classList.add('show');
            });
            
            // Fechar modal
            accessibilityModalClose.addEventListener('click', function() {
                accessibilityModal.classList.remove('show');
            });
            
            // Fechar modal ao clicar fora
            accessibilityModal.addEventListener('click', function(event) {
                if (event.target === accessibilityModal) {
                    accessibilityModal.classList.remove('show');
                }
            });
            
            // Controles de acessibilidade
            const highContrastToggle = document.getElementById('highContrastToggle');
            const darkModeToggle = document.getElementById('darkModeToggle');
            const readingModeToggle = document.getElementById('readingModeToggle');
            const highContrastCursorToggle = document.getElementById('highContrastCursorToggle');
            const visibleFocusToggle = document.getElementById('visibleFocusToggle');
            const reduceMotionToggle = document.getElementById('reduceMotionToggle');
            const screenReaderToggle = document.getElementById('screenReaderToggle');
            const fontSizeRange = document.getElementById('fontSizeRange');
            const lineHeightRange = document.getElementById('lineHeightRange');
            const fontSizeValue = document.getElementById('fontSizeValue');
            const lineHeightValue = document.getElementById('lineHeightValue');
            
            // Atualizar valores dos ranges
            fontSizeRange.addEventListener('input', function() {
                const values = ['Pequeno', 'Médio', 'Grande', 'Muito Grande'];
                fontSizeValue.textContent = values[this.value - 1];
            });
            
            lineHeightRange.addEventListener('input', function() {
                const values = ['Normal', 'Médio', 'Alto'];
                lineHeightValue.textContent = values[this.value - 1];
            });
            
            // Salvar configurações de acessibilidade
            document.getElementById('saveAccessibilitySettings').addEventListener('click', function() {
                // Aplicar modo de alto contraste
                if (highContrastToggle.checked) {
                    document.body.classList.add('high-contrast');
                    document.getElementById('accessibilityBtn').classList.add('high-contrast');
                } else {
                    document.body.classList.remove('high-contrast');
                    document.getElementById('accessibilityBtn').classList.remove('high-contrast');
                }
                
                // Aplicar modo escuro
                if (darkModeToggle.checked) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
                
                // Aplicar modo de leitura
                if (readingModeToggle.checked) {
                    document.body.classList.add('reading-mode');
                } else {
                    document.body.classList.remove('reading-mode');
                }
                
                // Aplicar cursor de alto contraste
                if (highContrastCursorToggle.checked) {
                    document.body.classList.add('high-contrast-cursor');
                } else {
                    document.body.classList.remove('high-contrast-cursor');
                }
                
                // Aplicar foco visível
                if (visibleFocusToggle.checked) {
                    document.body.classList.add('visible-focus');
                } else {
                    document.body.classList.remove('visible-focus');
                }
                
                // Reduzir movimentos
                if (reduceMotionToggle.checked) {
                    document.body.style.setProperty('--transition-speed', '0s');
                    document.querySelectorAll('.animate-in').forEach(el => {
                        el.style.animation = 'none';
                    });
                } else {
                    document.body.style.setProperty('--transition-speed', '0.3s');
                }
                
                // Aplicar tamanho da fonte
                document.body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-xlarge');
                if (fontSizeRange.value === '1') {
                    document.body.classList.add('font-size-small');
                } else if (fontSizeRange.value === '2') {
                    document.body.classList.add('font-size-medium');
                } else if (fontSizeRange.value === '3') {
                    document.body.classList.add('font-size-large');
                } else if (fontSizeRange.value === '4') {
                    document.body.classList.add('font-size-xlarge');
                }
                
                // Aplicar espaçamento entre linhas
                document.body.classList.remove('line-height-normal', 'line-height-medium', 'line-height-large');
                if (lineHeightRange.value === '1') {
                    document.body.classList.add('line-height-normal');
                } else if (lineHeightRange.value === '2') {
                    document.body.classList.add('line-height-medium');
                } else if (lineHeightRange.value === '3') {
                    document.body.classList.add('line-height-large');
                }
                
                // Mostrar toast de confirmação
                const toastMessage = document.getElementById('accessibilityToastMessage');
                toastMessage.textContent = 'Configurações de acessibilidade salvas com sucesso!';
                
                const accessibilityToast = new bootstrap.Toast(document.getElementById('accessibilityToast'));
                accessibilityToast.show();
                
                // Fechar o modal
                accessibilityModal.classList.remove('show');
            });
            
            // Resetar configurações de acessibilidade
            document.getElementById('resetAccessibilitySettings').addEventListener('click', function() {
                // Resetar todos os controles
                highContrastToggle.checked = false;
                darkModeToggle.checked = false;
                readingModeToggle.checked = false;
                highContrastCursorToggle.checked = false;
                visibleFocusToggle.checked = false;
                reduceMotionToggle.checked = false;
                screenReaderToggle.checked = false;
                fontSizeRange.value = 2;
                lineHeightRange.value = 2;
                
                // Atualizar valores dos ranges
                fontSizeValue.textContent = 'Médio';
                lineHeightValue.textContent = 'Médio';
                
                // Remover todas as classes de acessibilidade
                document.body.classList.remove(
                    'high-contrast', 
                    'dark-mode', 
                    'reading-mode', 
                    'high-contrast-cursor', 
                    'visible-focus',
                    'font-size-small', 
                    'font-size-medium', 
                    'font-size-large', 
                    'font-size-xlarge',
                    'line-height-normal', 
                    'line-height-medium', 
                    'line-height-large'
                );
                
                // Resetar transições
                document.body.style.setProperty('--transition-speed', '0.3s');
                
                // Mostrar toast de confirmação
                const toastMessage = document.getElementById('accessibilityToastMessage');
                toastMessage.textContent = 'Configurações de acessibilidade restauradas com sucesso!';
                
                const accessibilityToast = new bootstrap.Toast(document.getElementById('accessibilityToast'));
                accessibilityToast.show();
            });
