// Função para o sidebar
            document.getElementById('toggleSidebar').addEventListener('click', function() {
                const sidebar = document.getElementById('sidebar');
                const content = document.getElementById('content');
                const icon = this.querySelector('i');
                
                sidebar.classList.toggle('collapsed');
                content.classList.toggle('expanded');
                
                if (sidebar.classList.contains('collapsed')) {
                    icon.classList.remove('bi-chevron-left');
                    icon.classList.add('bi-chevron-right');
                } else {
                    icon.classList.remove('bi-chevron-right');
                    icon.classList.add('bi-chevron-left');
                }
            });
            
            // Função para o botão mobile
            document.getElementById('mobileToggle').addEventListener('click', function() {
                const sidebar = document.getElementById('sidebar');
                const content = document.getElementById('content');
                
                sidebar.classList.toggle('expanded');
                content.classList.toggle('shifted');
            });
            
            // Adiciona funcionalidade de filtro às caixas de matérias
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active de todos os botões no mesmo grupo
                    const group = this.closest('.btn-group');
                    group.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                
                    // Adiciona active ao botão clicado
                    this.classList.add('active');
                
                    // Filtra as matérias
                    const filter = this.getAttribute('data-filter');
                
                    document.querySelectorAll('.subject-box').forEach(box => {
                        if (filter === 'all') {
                            box.closest('.col-md-6').style.display = 'block';
                        } else {
                            const title = box.querySelector('.subject-title').textContent.toLowerCase();
                            if (title.includes(filter)) {
                                box.closest('.col-md-6').style.display = 'block';
                            } else {
                                box.closest('.col-md-6').style.display = 'none';
                            }
                        }
                    });
                });
            });
            
            // Função para animar os elementos
            function animateElements() {
                const elements = document.querySelectorAll('.animate-in');
                elements.forEach(element => {
                    setTimeout(() => {
                        element.classList.add('show');
                    }, 100);
                });
            }
            
            // Chama a função de animação quando a página carrega
            window.addEventListener('DOMContentLoaded', animateElements);
            
            // Função para abrir o modal de exercício
            function openExerciseModal() {
                const modal = new bootstrap.Modal(document.getElementById('exerciseModal'));
                modal.show();
            }
            
            // Adiciona funcionalidade aos botões de exercício
            document.querySelectorAll('.btn-start-study').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openExerciseModal();
                });
            });
            
            // Adiciona funcionalidade aos opções do exercício
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected de todas as opções
                    document.querySelectorAll('.option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                
                    // Adiciona selected à opção clicada
                    this.classList.add('selected');
                
                    // Verifica se a resposta está correta
                    const correctOption = document.querySelector('.option[data-value="a"]');
                    const feedback = document.getElementById('feedback');
                    const explanation = document.getElementById('explanation');
                
                    if (this === correctOption) {
                        feedback.classList.add('correct');
                        feedback.classList.remove('incorrect');
                        feedback.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong>Correto!</strong> Você acertou a resposta.';
                        feedback.style.display = 'block';
                        explanation.style.display = 'block';
                
                        // Marca a opção como correta
                        this.classList.add('correct');
                    } else {
                        feedback.classList.add('incorrect');
                        feedback.classList.remove('correct');
                        feedback.innerHTML = '<i class="bi bi-x-circle-fill me-2"></i><strong>Incorreto!</strong> A resposta correta é a alternativa A.';
                        explanation.style.display = 'block';
                
                        // Marca a opção como incorreta
                        this.classList.add('incorrect');
                
                        // Marca a opção correta
                        correctOption.classList.add('correct');
                    }
                });
            });
            
            // Adiciona funcionalidade ao botão de exercício
            document.getElementById('nextExercise').addEventListener('click', function() {
                const modal = bootstrap.Modal.getInstance(document.getElementById('exerciseModal'));
                modal.hide();
                
                // Aqui você pode adicionar lógica para carregar o próximo exercício
                setTimeout(() => {
                    openExerciseModal();
                }, 500);
            });
            
            // Adiciona funcionalidade aos botões da tabela de últimos exercícios
            document.querySelectorAll('.table button').forEach(btn => {
                btn.addEventListener('click', function() {
                    openExerciseModal();
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