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
        
        // Adiciona funcionalidade de clique nos filtros
        document.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.filter-option').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        
        // Adiciona funcionalidade de clique nos botões de play
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', function() {
                const videoCard = this.closest('.video-aula-card');
                const videoTitle = videoCard.querySelector('.video-title').textContent;
                const videoThumbnail = videoCard.querySelector('.video-thumbnail img').src;
                const videoDuration = videoCard.querySelector('.video-duration').textContent;
                
                // Extrair o ID do vídeo da URL da thumbnail (se for do YouTube)
                let videoId = '';
                if (videoThumbnail.includes('ytimg.com/vi/')) {
                    const parts = videoThumbnail.split('/vi/');
                    if (parts.length > 1) {
                        const idParts = parts[1].split('/');
                        if (idParts.length > 0) {
                            videoId = idParts[0].replace('.jpg', '');
                        }
                    }
                }
                
                // Configurar o modal de vídeo
                const videoFrame = document.getElementById('videoFrame');
                const videoTitleElement = document.getElementById('videoTitle');
                const videoDescriptionElement = document.getElementById('videoDescription');
                const viewCountElement = document.getElementById('viewCount');
                const videoDateElement = document.getElementById('videoDate');
                
                // Definir o título e descrição do vídeo
                videoTitleElement.textContent = videoTitle;
                videoDescriptionElement.textContent = `Este vídeo aborda o tema "${videoTitle}" de forma didática e prática, auxiliando no seu preparo para o Encceja. A aula é estruturada para facilitar o aprendizado e a fixação do conteúdo.}`;
                
                // Definir a data do vídeo (usando a data que está na card)
                const videoDateText = videoCard.querySelector('.video-stats span:nth-child(2)').textContent;
                videoDateElement.textContent = videoDateText.replace(' atrás', '');
                
                // Definir a contagem de visualizações
                const viewCountText = videoCard.querySelector('.video-stats span:first-child').textContent;
                const viewCount = viewCountText.replace(/[^\d]/g, '');
                viewCountElement.textContent = viewCount;
                
                // Configurar o iframe do vídeo
                if (videoId) {
                    // Se for um vídeo do YouTube
                    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
                } else {
                    // Caso contrário, use um placeholder
                    videoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"; // Vídeo padrão do YouTube
                }
                
                // Mostrar o modal
                const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
                videoModal.show();
            });
        });
        
        // Fechar o modal quando clicar fora
        document.addEventListener('click', function(event) {
            const videoModalEl = document.getElementById('videoModal');
            
            // Verifica se o clique foi fora do modal
            if (!videoModalEl.contains(event.target) && videoModalEl.classList.contains('show')) {
                const videoModal = bootstrap.Modal.getInstance(videoModalEl);
                videoModal.hide();
                
                // Parar o vídeo quando fechar o modal
                document.getElementById('videoFrame').src = '';
            }
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

                // Inicializar o modal de vídeo
                document.addEventListener('DOMContentLoaded', function() {

                // Adicionar um evento para quando o modal for fechado para parar o vídeo
                const videoModal = document.getElementById('videoModal');
                videoModal.addEventListener('hidden.bs.modal', function() {
                document.getElementById('videoFrame').src = '';
            });
        });