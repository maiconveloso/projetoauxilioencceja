document.addEventListener('DOMContentLoaded', function() {
            // Elementos do DOM
            const startBtn = document.getElementById('start-btn');
            const startScreen = document.getElementById('start-screen');
            const redacaoContainer = document.getElementById('redacao-container');
            const resultContainer = document.getElementById('result-container');
            const finishBtn = document.getElementById('finish-btn');
            const retryBtn = document.getElementById('retry-btn');
            const timerEl = document.getElementById('timer');
            const lineCountEl = document.getElementById('line-count');
            const finalLineCountEl = document.getElementById('final-line-count');
            const finalArea = document.getElementById('final-area');
            const wordCountWarning = document.getElementById('word-count-warning');
            const warningModal = document.getElementById('warning-modal');
            const warningMessage = document.getElementById('warning-message');
            const closeWarning = document.getElementById('close-warning');
            
            // Configurações da prova
            let timer;
            let seconds = 0;
            let minutes = 0;
            let examStarted = false;
            let warningCount = 0;
            const maxWarnings = 1; // Número de avisos antes de encerrar a prova
            
            // Iniciar a prova
            startBtn.addEventListener('click', function() {
                startScreen.style.display = 'none';
                redacaoContainer.style.display = 'block';
                examStarted = true;
                startTimer();
                setupTabProtection();
                setupWordCount();
            });
            
            // Finalizar a prova
            finishBtn.addEventListener('click', function() {
                finishRedacao();
            });
            
            // Tentar novamente
            retryBtn.addEventListener('click', function() {
                resetRedacao();
            });
            
            // Fechar aviso
            closeWarning.addEventListener('click', function() {
                warningModal.style.display = 'none';
                
                // Se excedeu o número máximo de avisos, encerrar a prova
                if (warningCount >= maxWarnings) {
                    finishRedacao();
                }
            });
            
            // Configurar proteção contra mudança de aba
            function setupTabProtection() {
                // Evento para detectar quando a aba perde o foco
                document.addEventListener('visibilitychange', function() {
                    if (document.hidden && examStarted) {
                        handleTabSwitch();
                    }
                });
                
                // Evento para detectar quando a janela perde o foco
                window.addEventListener('blur', function() {
                    if (examStarted) {
                        handleTabSwitch();
                    }
                });
                
                // Bloquear menu de contexto (botão direito)
                document.addEventListener('contextmenu', function(e) {
                    if (examStarted) {
                        e.preventDefault();
                        showWarning('O uso do botão direito não é permitido durante a prova.');
                    }
                });
                
                // Bloquear atalhos de teclado comuns
                document.addEventListener('keydown', function(e) {
                    if (!examStarted) return;
                    
                    // Ctrl+N (nova janela), Ctrl+T (nova aba), Ctrl+W (fechar aba)
                    if ((e.ctrlKey || e.metaKey) && (e.key === 'n' || e.key === 't' || e.key === 'w')) {
                        e.preventDefault();
                        showWarning('Não é permitido abrir novas abas ou janelas durante a prova.');
                    }
                    
                    // F12 (ferramentas de desenvolvedor)
                    if (e.key === 'F12') {
                        e.preventDefault();
                        showWarning('Não é permitido usar ferramentas de desenvolvedor durante a prova.');
                    }
                    
                    // Ctrl+Shift+I (ferramentas de desenvolvedor)
                    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
                        e.preventDefault();
                        showWarning('Não é permitido usar ferramentas de desenvolvedor durante a prova.');
                    }
                    
                    // Ctrl+Shift+J (console)
                    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
                        e.preventDefault();
                        showWarning('Não é permitido usar ferramentas de desenvolvedor durante a prova.');
                    }
                    
                    // Ctrl+U (exibir código fonte)
                    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
                        e.preventDefault();
                        showWarning('Não é permitido exibir o código fonte durante a prova.');
                    }
                    
                    // Alt+Setas (navegação)
                    if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                        e.preventDefault();
                        showWarning('Não é permitido usar navegação por atalhos durante a prova.');
                    }
                });
            }
            
            // Configurar contador de linhas
            function setupWordCount() {
                finalArea.addEventListener('input', function() {
                    const text = this.value;
                    const lines = text.split('\n').length;
                    lineCountEl.textContent = lines;
                    
                    // Verificar se está dentro do limite
                    if (lines < 7 || lines > 30) {
                        wordCountWarning.style.display = 'block';
                    } else {
                        wordCountWarning.style.display = 'none';
                    }
                });
            }
            
            // Lidar com a tentativa de mudar de aba
            function handleTabSwitch() {
                warningCount++;
                
                if (warningCount <= maxWarnings) {
                    showWarning('Você tentou sair da página da redação. Esta ação não é permitida.');
                    
                    if (warningCount >= maxWarnings) {
                        warningMessage.textContent = 'Você tentou sair da página da redação. Esta ação não é permitida e a prova será encerrada automaticamente.';
                    }
                }
            }
            
            // Mostrar aviso
            function showWarning(message) {
                warningMessage.textContent = message;
                warningModal.style.display = 'flex';
            }
            
            // Funções auxiliares
            function startTimer() {
                timer = setInterval(function() {
                    seconds++;
                    if (seconds === 60) {
                        minutes++;
                        seconds = 0;
                    }
                    
                    // Verificar se o tempo excedeu 60 minutos
                    if (minutes >= 60) {
                        clearInterval(timer);
                        finishRedacao();
                    }
                    
                    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }, 1000);
            }
            
            function finishRedacao() {
                clearInterval(timer);
                examStarted = false;
                
                // Verificar se a redação foi escrita
                const text = finalArea.value;
                const lines = text.split('\n').length;
                
                if (lines < 7 && warningCount < maxWarnings) {
                    if (!confirm('Sua redação tem menos de 7 linhas. Deseja finalizar mesmo assim?')) {
                        examStarted = true;
                        return;
                    }
                }
                
                // Atualizar o contador de linhas no resultado
                finalLineCountEl.textContent = lines;
                
                // Mostrar o container de resultados
                redacaoContainer.style.display = 'none';
                resultContainer.style.display = 'block';
            }
            
            function resetRedacao() {
                // Resetar variáveis
                seconds = 0;
                minutes = 0;
                examStarted = false;
                warningCount = 0;
                
                // Resetar o timer
                clearInterval(timer);
                timerEl.textContent = '00:00';
                
                // Resetar as áreas de texto
                document.getElementById('draft-area').value = '';
                finalArea.value = '';
                
                // Resetar o contador de linhas
                lineCountEl.textContent = '0';
                wordCountWarning.style.display = 'none';
                
                // Mostrar o container de início e esconder o de resultados
                startScreen.style.display = 'block';
                redacaoContainer.style.display = 'none';
                resultContainer.style.display = 'none';
            }
        });