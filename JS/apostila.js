// Função para toggle do menu lateral
        document.getElementById('toggleSidebar').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const content = document.getElementById('content');
            const toggleIcon = this.querySelector('i');
            
            sidebar.classList.toggle('collapsed');
            content.classList.toggle('expanded');
            
            if (sidebar.classList.contains('collapsed')) {
                toggleIcon.classList.remove('bi-chevron-left');
                toggleIcon.classList.add('bi-chevron-right');
            } else {
                toggleIcon.classList.remove('bi-chevron-right');
                toggleIcon.classList.add('bi-chevron-left');
            }
        });
        
        // Função para toggle do menu em dispositivos móveis
        document.getElementById('mobileToggle').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const content = document.getElementById('content');
            
            sidebar.classList.toggle('expanded');
            content.classList.toggle('shifted');
        });
        
        // Função para responsividade
        function handleResize() {
            const sidebar = document.getElementById('sidebar');
            const content = document.getElementById('content');
            
            if (window.innerWidth < 992) {
                sidebar.classList.remove('collapsed');
                content.classList.remove('expanded');
                sidebar.classList.remove('expanded');
                content.classList.remove('shifted');
                document.getElementById('toggleSidebar').style.display = 'none';
            } else {
                document.getElementById('toggleSidebar').style.display = 'block';
            }
        }
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Chama na inicialização
        
        // Adiciona funcionalidade aos itens de apostilas
        document.querySelectorAll('.resource-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.title').textContent;
                const level = this.querySelector('.badge').textContent;
                
                // Mostra um toast notification
                const toastContainer = document.createElement('div');
                toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                toastContainer.style.zIndex = '11';
                
                document.body.appendChild(toastContainer);
                
                // Remove o toast após 3 segundos
                setTimeout(() => {
                    toastContainer.remove();
                }, 3000);
                
                // Abre o modal com detalhes da apostila
                const modal = new bootstrap.Modal(document.getElementById('apostilaDetailsModal'));
                modal.show();
            });
        });
        
        // Adiciona funcionalidade aos ícones de redes sociais
        document.querySelectorAll('.social-icons a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('title');
                console.log(`Redirecionando para ${platform}`);
                
                // Aqui você pode adicionar o redirecionamento para as redes sociais
                // Exemplo: window.open('https://www.linkedin.com', '_blank');
            });
        });
        
        // Responsividade
        function handleResize() {
            const sidebar = document.getElementById('sidebar');
            const content = document.getElementById('content');
            
            if (window.innerWidth < 992) {
                sidebar.classList.remove('collapsed');
                content.classList.remove('expanded');
                sidebar.classList.remove('expanded');
                content.classList.remove('shifted');
                document.getElementById('toggleSidebar').style.display = 'none';
            } else {
                document.getElementById('toggleSidebar').style.display = 'block';
            }
        }
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Chama na inicialização
        
        // Adiciona funcionalidade aos links de detalhes das apostilas
        document.querySelectorAll('[data-bs-target="#apostilaDetailsModal"]').forEach(link => {
            link.addEventListener('click', function() {
                const apostilaType = this.closest('.card').querySelector('.card-header h4').textContent;
                const level = this.closest('.card').querySelector('.badge').textContent;
                
                // Atualiza o título do modal
                document.getElementById('apostilaDetailsModalLabel').textContent = `Detalhes da Apostila - ${apostilaType}`;
                
                // Atualiza o conteúdo do modal com base no tipo de apostila
                const modal = document.getElementById('apostilaDetailsModal');
                
                // Atualiza o conteúdo do modal com base no tipo de apostila
                if (apostilaType.includes('Matemática')) {
                    modal.querySelector('.modal-body .text-center h5').textContent = `Apostila de ${apostilaType}`;
                    modal.querySelector('.modal-body .badge').textContent = level;
                }
            });
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