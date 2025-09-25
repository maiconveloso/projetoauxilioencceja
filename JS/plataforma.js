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
                    console.log(`Acessando ${type} - ${title}`);
                    
                    // Exemplo de toast notification
                    const toastContainer = document.createElement('div');
                    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                    toastContainer.style.zIndex = '11';
                    
                    toastContainer.innerHTML = `
                        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <i class="bi bi-info-circle text-primary me-2"></i>
                                <strong class="me-auto">Informação</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Fechar"></button>
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
                    document.getElementById('toggleSidebar').style.display = 'none';
                } else {
                    document.getElementById('toggleSidebar').style.display = 'block';
                }
            }
            
            window.addEventListener('resize', handleResize);
            handleResize(); // Chama na inicialização
            
            // Adiciona funcionalidade ao botão de Entrar
            document.getElementById('loginBtn').addEventListener('click', function() {
                window.location.href = 'escolha.html';
            });
            
            // Função para detectar o scroll e ocultar/mostrar o botão de login
            window.addEventListener('scroll', function() {
                const loginBtn = document.getElementById('loginBtn');
                const scrollPosition = window.scrollY;
                
                // Se o usuário rolar mais de 100px para baixo, oculta o botão
                if (scrollPosition > 100) {
                    loginBtn.classList.add('hidden');
                } else {
                    loginBtn.classList.remove('hidden');
                }
            });
            
            // Função para detectar o scroll e mostrar o perfil
            window.addEventListener('scroll', function() {
                const userProfile = document.getElementById('userProfile');
                const scrollPosition = window.scrollY;
                
                // Se o usuário rolar mais de 100px para baixo, mostra o perfil
                if (scrollPosition > 100) {
                    userProfile.classList.remove('hidden');
                } else {
                    userProfile.classList.add('hidden');
                }
            });
            
            // Toggle do menu do perfil
            document.getElementById('userMenuToggle').addEventListener('click', function() {
                const userMenu = document.getElementById('userMenu');
                userMenu.classList.toggle('show');
            });
            
            // Toggle do popover do perfil
            document.getElementById('userProfile').addEventListener('click', function() {
                const userPopover = document.getElementById('userPopover');
                userPopover.classList.toggle('show');
                
                // Fecha o menu se estiver aberto
                const userMenu = document.getElementById('userMenu');
                if (userMenu.classList.contains('show')) {
                    userMenu.classList.remove('show');
                }
            });
            
            // Fecha o popover quando clicar fora
            document.addEventListener('click', function(event) {
                const userPopover = document.getElementById('userPopover');
                const userProfile = document.getElementById('userProfile');
                
                // Verifica se o clique foi fora do perfil
                if (!userProfile.contains(event.target) && userPopover.classList.contains('show')) {
                    userPopover.classList.remove('show');
                }
            });
            
            // Adiciona funcionalidade aos itens do menu do perfil
            document.querySelectorAll('.user-menu-item, .profile-menu-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const menuText = this.textContent.trim();
                    console.log(`Acessando: ${menuText}`);
                    
                    // Fecha o menu
                    document.getElementById('userMenu').classList.remove('show');
                    document.getElementById('userPopover').classList.remove('show');
                });
            });
            
            // Adiciona funcionalidade ao botão de logout
            document.querySelectorAll('.logout-btn, .logout-btn-profile').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Mostra um toast de confirmação
                    const toastContainer = document.createElement('div');
                    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                    toastContainer.style.zIndex = '11';
                    
                    toastContainer.innerHTML = `
                        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                <strong class="me-auto">Sucesso</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Fechar"></button>
                            </div>
                            <div class="toast-body">
                                Você foi deslogado com sucesso!
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(toastContainer);
                    
                    setTimeout(() => {
                        toastContainer.remove();
                        
                        // Redireciona para a página de login
                        window.location.href = 'index.html';
                    }, 2000);
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
            
            // Efeito de digitação na barra de busca
            const searchInput = document.getElementById('searchInput');
            const typingCursor = document.getElementById('typingCursor');
            
            // Textos para simular digitação
            const placeholderTexts = [
                "Buscar recursos, aulas, exercícios...",
            ];
            
            let currentTextIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function typeText() {
                const currentText = placeholderTexts[currentTextIndex];
                
                if (isDeleting) {
                    // Deletando texto
                    searchInput.setAttribute('placeholder', currentText.substring(0, currentCharIndex - 1));
                    currentCharIndex--;
                    typingSpeed = 50;
                } else {
                    // Digitando texto
                    searchInput.setAttribute('placeholder', currentText.substring(0, currentCharIndex + 1));
                    currentCharIndex++;
                    typingSpeed = 100;
                }
                
                // Mudar direção quando terminar de digitar ou deletar
                if (!isDeleting && currentCharIndex === currentText.length) {
                    // Pausa antes de deletar
                    isDeleting = true;
                    typingSpeed = 1500; // Pausa de 1.5 segundos
                } else if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
                }
                
                setTimeout(typeText, typingSpeed);
            }
            
            // Inicia o efeito de digitação
            window.addEventListener('load', () => {
                typeText();
            });
            
            // Mostra o cursor quando o usuário foca na barra
            searchInput.addEventListener('focus', () => {
                typingCursor.style.display = 'none';
            });
            
            // Esconde o cursor quando o usuário digita
            searchInput.addEventListener('input', () => {
                typingCursor.style.display = 'none';
            });
            
            // Mostra o cursor quando o usuário sai da barra
            searchInput.addEventListener('blur', () => {
                if (searchInput.value === '') {
                    typingCursor.style.display = 'block';
                }
            });
            
            function updateClock() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
    
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
    
          // Usa setTimeout recursivo em vez de setInterval
          setTimeout(updateClock, 1000 - (now.getTime() % 1000));
          }

         // Inicia o relógio
         updateClock();