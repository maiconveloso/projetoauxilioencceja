// Animação de partículas 
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        
        // Verificar se o dispositivo suporta animações
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const particles = [];
            const particleCount = 50; 
            
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 1; 
                    this.speedX = Math.random() * 2 - 1; 
                    this.speedY = Math.random() * 2 - 1;
                    this.opacity = Math.random() * 0.2 + 0.05;
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x > canvas.width) this.x = 0;
                    else if (this.x < 0) this.x = canvas.width;
                    
                    if (this.y > canvas.height) this.y = 0;
                    else if (this.y < 0) this.y = canvas.height;
                }
                
                draw() {
                    ctx.fillStyle = `rgba(0, 120, 255, ${this.opacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            function init() {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                // Conectar partículas próximas
                particles.forEach((p1, i) => {
                    particles.slice(i + 1).forEach(p2 => {
                        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                        if (distance < 100) {
                            ctx.strokeStyle = `rgba(0, 120, 255, ${0.03 * (1 - distance / 100)})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    });
                });
                
                requestAnimationFrame(animate);
            }
            
            init();
            animate();
            
            // Redimensionar canvas
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
        
        // Efeito de scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Função para o botão CTA
        document.getElementById('startJourneyBtn').addEventListener('click', function(e) {
            // Criar um efeito de onda
            const button = this;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Adicionar efeito de paralaxe ao scroll (otimizado)
        if (!prefersReducedMotion) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.animated-bg');
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.3}px)`; // Reduzido para melhor performance
                }
            });
        }
        
        // Animação de entrada dos elementos ao scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.info-card, .benefit-item').forEach(el => {
            observer.observe(el);
        });

        // Funcionalidade da sidebar
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('toggleSidebar');
        
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');

            // Atualizar o estado do aria-expanded
            const isExpanded = !sidebar.classList.contains('collapsed');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Ajustar o margin-left do main-container quando a sidebar for recolhida
            const mainContainer = document.querySelector('.main-container');
            if (window.innerWidth > 768) {
                if (sidebar.classList.contains('collapsed')) {
                    mainContainer.style.marginLeft = '0';
                } else {
                    mainContainer.style.marginLeft = '250px';
                }
            }
        });

         // Modal de configurações de acessibilidade
            const accessibilityModal = document.getElementById('accessibilityModal');
            const accessibilityModalClose = document.getElementById('accessibilityModalClose');
            const accessibilityBtn = document.getElementById('accessibilityBtn');
            
            // Abrir modal
            accessibilityBtn.addEventListener('click', function() {
                accessibilityModal.classList.add('show');
                accessibilityModal.setAttribute('aria-hidden', 'false');
            });
            
            // Fechar modal
            accessibilityModalClose.addEventListener('click', function() {
                accessibilityModal.classList.remove('show');
                accessibilityModal.setAttribute('aria-hidden', 'true');
            });
            
            // Fechar modal ao clicar fora
            accessibilityModal.addEventListener('click', function(event) {
                if (event.target === accessibilityModal) {
                    accessibilityModal.classList.remove('show');
                    accessibilityModal.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Fechar modal com a tecla ESC
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && accessibilityModal.classList.contains('show')) {
                    accessibilityModal.classList.remove('show');
                    accessibilityModal.setAttribute('aria-hidden', 'true');
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
                    // Desativar animações
                    const animatedElements = document.querySelectorAll('.animated-bg, .white-animated-bg');
                    animatedElements.forEach(el => {
                        el.style.animation = 'none';
                        el.style.display = 'none';
                    });
                    
                    // Parar a animação de partículas
                    if (canvas) {
                        canvas.style.display = 'none';
                    }
                } else {
                    // Reativar animações
                    const animatedElements = document.querySelectorAll('.animated-bg, .white-animated-bg');
                    animatedElements.forEach(el => {
                        el.style.animation = '';
                        el.style.display = '';
                    });
                    
                    // Reativar a animação de partículas
                    if (canvas) {
                        canvas.style.display = '';
                    }
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
                
                // Salvar preferências no localStorage
                const accessibilitySettings = {
                    highContrast: highContrastToggle.checked,
                    darkMode: darkModeToggle.checked,
                    readingMode: readingModeToggle.checked,
                    highContrastCursor: highContrastCursorToggle.checked,
                    visibleFocus: visibleFocusToggle.checked,
                    reduceMotion: reduceMotionToggle.checked,
                    screenReader: screenReaderToggle.checked,
                    fontSize: fontSizeRange.value,
                    lineHeight: lineHeightRange.value
                };
                
                localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
                
                // Mostrar toast de confirmação
                const toastMessage = document.getElementById('accessibilityToastMessage');
                toastMessage.textContent = 'Configurações de acessibilidade salvas com sucesso!';
                
                const accessibilityToast = new bootstrap.Toast(document.getElementById('accessibilityToast'));
                accessibilityToast.show();
                
                // Fechar o modal
                accessibilityModal.classList.remove('show');
                accessibilityModal.setAttribute('aria-hidden', 'true');
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
                
                // Remover classe do botão de acessibilidade
                document.getElementById('accessibilityBtn').classList.remove('high-contrast');
                
                // Reativar animações
                const animatedElements = document.querySelectorAll('.animated-bg, .white-animated-bg');
                animatedElements.forEach(el => {
                    el.style.animation = '';
                    el.style.display = '';
                });
                
                // Reativar a animação de partículas
                if (canvas) {
                    canvas.style.display = '';
                }
                
                // Limpar preferências do localStorage
                localStorage.removeItem('accessibilitySettings');
                
                // Mostrar toast de confirmação
                const toastMessage = document.getElementById('accessibilityToastMessage');
                toastMessage.textContent = 'Configurações de acessibilidade restauradas com sucesso!';
                
                const accessibilityToast = new bootstrap.Toast(document.getElementById('accessibilityToast'));
                accessibilityToast.show();
            });
            
            // Carregar preferências salvas
            window.addEventListener('DOMContentLoaded', function() {
                const savedSettings = localStorage.getItem('accessibilitySettings');
                if (savedSettings) {
                    const settings = JSON.parse(savedSettings);
                    
                    // Aplicar configurações salvas
                    highContrastToggle.checked = settings.highContrast || false;
                    darkModeToggle.checked = settings.darkMode || false;
                    readingModeToggle.checked = settings.readingMode || false;
                    highContrastCursorToggle.checked = settings.highContrastCursor || false;
                    visibleFocusToggle.checked = settings.visibleFocus || false;
                    reduceMotionToggle.checked = settings.reduceMotion || false;
                    screenReaderToggle.checked = settings.screenReader || false;
                    fontSizeRange.value = settings.fontSize || 2;
                    lineHeightRange.value = settings.lineHeight || 2;
                    
                    // Atualizar valores dos ranges
                    const fontValues = ['Pequeno', 'Médio', 'Grande', 'Muito Grande'];
                    fontSizeValue.textContent = fontValues[fontSizeRange.value - 1];
                    
                    const lineValues = ['Normal', 'Médio', 'Alto'];
                    lineHeightValue.textContent = lineValues[lineHeightRange.value - 1];
                    
                    
                }
            });