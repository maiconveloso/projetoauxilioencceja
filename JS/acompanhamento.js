// Função para toggle do sidebar
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
        
        // Função para toggle do sidebar em mobile
        document.getElementById('mobileToggle').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const content = document.getElementById('content');
            
            sidebar.classList.toggle('expanded');
            content.classList.toggle('shifted');
        });
        
        // Adiciona funcionalidade de clique nos itens do menu
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.sidebar .nav-link').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                
                // No mobile, fecha o sidebar após selecionar um item
                if (window.innerWidth < 992) {
                    document.getElementById('sidebar').classList.remove('expanded');
                    document.getElementById('content').classList.remove('shifted');
                }
            });
        });
        
        // Adiciona funcionalidade de clique nos itens de recursos
        document.querySelectorAll('.resource-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.title').textContent;
                const type = this.closest('.card').querySelector('.card-header').textContent.trim();
                
                // Aqui você pode adicionar a lógica para abrir o recurso
                console.log(`Abrindo ${type} - ${title}`);
                
                // Exemplo de toast notification
                const toastContainer = document.createElement('div');
                toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                toastContainer.style.zIndex = '11';
                
                toastContainer.innerHTML = `
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <i class="bi bi-info-circle text-primary me-2"></i>
                            <strong class="me-auto">Informação</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            Abrindo ${type}: ${title}
                        </div>
                    </div>
                `;
                
                document.body.appendChild(toastContainer);
                
                setTimeout(() => {
                    toastContainer.remove();
                }, 3000);
            });
        });
        
        // Adiciona funcionalidade aos links de redes sociais
        document.querySelectorAll('.social-icons a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('title');
                console.log(`Redirecionando para ${platform}`);
                
                // Aqui você pode adicionar o redirecionamento para as redes sociais
                // Exemplo: window.open('https://facebook.com', '_blank');
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
        
        // Adiciona funcionalidade ao botão de refresh do progresso
        document.getElementById('refreshProgress').addEventListener('click', function() {
            const progressBar = document.querySelector('.progress-fill');
            const progressLabel = document.querySelector('.progress-label');
            
            // Gera um novo valor de progresso aleatório entre 50 e 90
            const newProgress = Math.floor(Math.random() * 41) + 50;
            
            // Atualiza a largura da barra de progresso e o texto
            progressBar.style.width = newProgress + '%';
            progressLabel.textContent = newProgress + '%';
            
            // Adiciona uma classe de animação para suavizar a transição
            progressBar.classList.add('animate-progress');
            
            // Remove a classe de animação após a conclusão
            setTimeout(() => {
                progressBar.classList.remove('animate-progress');
            }, 1000);
        });
        
        // Adiciona funcionalidade ao botão de adicionar plano de estudo
        document.getElementById('addStudyPlan').addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('addStudyPlanModal'));
            modal.show();
        });
        
        // Adiciona funcionalidade ao botão de salvar plano de estudo
        document.getElementById('saveStudyPlan').addEventListener('click', function() {
            const title = document.getElementById('activityTitle').value;
            const difficulty = document.getElementById('activityDifficulty').value;
            
            if (title.trim() === '') {
                alert('Por favor, insira um título para a atividade.');
                return;
            }
            
            // Determina a classe do badge com base na dificuldade
            let difficultyBadge = '';
            if (difficulty === 'easy') {
                difficultyBadge = '<span class="badge bg-success">Fácil</span>';
            } else if (difficulty === 'medium') {
                difficultyBadge = '<span class="badge bg-warning">Média</span>';
            } else {
                difficultyBadge = '<span class="badge bg-danger">Difícil</span>';
            }
            
            // Cria um novo item no plano de estudo
            const studyPlanContainer = document.querySelector('.study-plan-item:last-child');
            const newItem = studyPlanContainer.cloneNode(true);
            
            // Atualiza o conteúdo do novo item
            newItem.querySelector('.study-plan-title').textContent = title;
            newItem.querySelector('.study-plan-description').textContent = 'Novo conteúdo adicionado';
            newItem.querySelector('.study-plan-difficulty').innerHTML = 'Dificuldade: ' + difficultyBadge;
            
            // Adiciona o novo item antes do último item
            studyPlanContainer.parentNode.insertBefore(newItem, studyPlanContainer);
            
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addStudyPlanModal'));
            modal.hide();
            
            // Reseta o formulário
            document.getElementById('activityTitle').value = '';
            document.getElementById('activityDescription').value = '';
        });
        
        // Adiciona funcionalidade aos checkboxes do plano de estudo
        document.querySelectorAll('.study-plan-checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const item = this.closest('.study-plan-item');
                const actions = item.querySelector('.study-plan-actions');
                
                if (this.checked) {
                    actions.innerHTML = '<button class="btn btn-sm btn-outline-success">Revisar</button>';
                } else {
                    actions.innerHTML = '<button class="btn btn-sm btn-outline-primary">Estudar</button>';
                }
            });
        });
        
        // Adiciona funcionalidade aos botões de detalhes das atividades
        document.querySelectorAll('[data-bs-target="#activityDetailsModal"]').forEach(button => {
            button.addEventListener('click', function() {
                const activityType = this.getAttribute('data-activity');
                const modal = document.getElementById('activityDetailsModal');
                
                // Atualiza o título do modal com base no tipo de atividade
                modal.querySelector('.modal-title').textContent = 'Detalhes de ' + activityType.charAt(0).toUpperCase() + activityType.slice(1);
                
                // Atualiza os detalhes da atividade com base no tipo
                if (activityType === 'matematica') {
                    modal.querySelector('#activityType').textContent = 'Simulado de Matemática';
                    modal.querySelector('#activityDate').textContent = 'Hoje, 10:30';
                    modal.querySelector('#activityDuration').textContent = '45 minutos';
                    modal.querySelector('#activityStatus').innerHTML = '<span class="badge bg-success">Concluída</span>';
                } else if (activityType === 'portugues') {
                    modal.querySelector('#activityType').textContent = 'Videoaula de Gramática';
                    modal.querySelector('#activityDate').textContent = 'Hoje, 09:15';
                    modal.querySelector('#activityDuration').textContent = '30 minutos';
                    modal.querySelector('#activityStatus').innerHTML = '<span class="badge bg-success">Concluída</span>';
                } else if (activityType === 'historia') {
                    modal.querySelector('#activityType').textContent = 'Exercícios de História';
                    modal.querySelector('#activityDate').textContent = 'Ontem, 16:45';
                    modal.querySelector('#activityDuration').textContent = '60 minutos';
                    modal.querySelector('#activityStatus').innerHTML = '<span class="badge bg-success">Concluída</span>';
                } else if (activityType === 'geografia') {
                    modal.querySelector('#activityType').textContent = 'Simulado de Geografia';
                    modal.querySelector('#activityDate').textContent = 'Ontem, 14:20';
                    modal.querySelector('#activityDuration').textContent = '60 minutos';
                    modal.querySelector('#activityStatus').innerHTML = '<span class="badge bg-warning">Em andamento</span>';
                } else if (activityType === 'ciencias') {
                    modal.querySelector('#activityType').textContent = 'Apostila de Ciências';
                    modal.querySelector('#activityDate').textContent = 'Seg, 10:00';
                    modal.querySelector('#activityDuration').textContent = '90 minutos';
                    modal.querySelector('#activityStatus').innerHTML = '<span class="badge bg-danger">Pendente</span>';
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