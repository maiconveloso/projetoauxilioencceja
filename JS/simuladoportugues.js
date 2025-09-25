document.addEventListener('DOMContentLoaded', function() {
            // Elementos do DOM
            const startBtn = document.getElementById('start-btn');
            const startScreen = document.getElementById('start-screen');
            const questionContainer = document.getElementById('question-container');
            const resultContainer = document.getElementById('result-container');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const retryBtn = document.getElementById('retry-btn');
            const currentQuestionEl = document.getElementById('current-question');
            const timerEl = document.getElementById('timer');
            const scoreEl = document.querySelector('.score');
            const resultMessage = document.querySelector('.result-message');
            const warningModal = document.getElementById('warning-modal');
            const warningMessage = document.getElementById('warning-message');
            const closeWarning = document.getElementById('close-warning');
            
            // Configurações do simulado
            const totalQuestions = 10;
            let currentQuestion = 1;
            let timer;
            let seconds = 0;
            let minutes = 0;
            let userAnswers = {};
            let correctAnswers = {
                q1: 'C',
                q2: 'B',
                q3: 'C',
                q4: 'C',
                q5: 'A',
                q6: 'A',
                q7: 'C',
                q8: 'A',
                q9: 'C',
                q10: 'C'
            };
            let examStarted = false;
            let warningCount = 0;
            const maxWarnings = 1;
            
            // Iniciar o simulado
            startBtn.addEventListener('click', function() {
                startScreen.style.display = 'none';
                questionContainer.style.display = 'block';
                examStarted = true;
                startTimer();
                showQuestion(currentQuestion);
                setupTabProtection();
            });
            
            // Navegação entre questões
            prevBtn.addEventListener('click', function() {
                if (currentQuestion > 1) {
                    saveAnswer();
                    currentQuestion--;
                    showQuestion(currentQuestion);
                }
            });
            
            nextBtn.addEventListener('click', function() {
                saveAnswer();
                
                if (currentQuestion < totalQuestions) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                } else {
                    finishSimulado();
                }
            });
            
            // Tentar novamente
            retryBtn.addEventListener('click', function() {
                resetSimulado();
            });
            
            // Fechar aviso
            closeWarning.addEventListener('click', function() {
                warningModal.style.display = 'none';
                
                // Se excedeu o número máximo de avisos, encerrar o simulado
                if (warningCount >= maxWarnings) {
                    finishSimulado();
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
                        showWarning('O uso do botão direito não é permitido durante o simulado.');
                    }
                });
                
                // Bloquear atalhos de teclado comuns
                document.addEventListener('keydown', function(e) {
                    if (!examStarted) return;
                    
                    // Ctrl+N (nova janela), Ctrl+T (nova aba), Ctrl+W (fechar aba)
                    if ((e.ctrlKey || e.metaKey) && (e.key === 'n' || e.key === 't' || e.key === 'w')) {
                        e.preventDefault();
                        showWarning('Não é permitido abrir novas abas ou janelas durante o simulado.');
                    }
                    
                    // F12 (ferramentas de desenvolvedor)
                    if (e.key === 'F12') {
                        e.preventDefault();
                        showWarning('Não é permitido usar ferramentas de desenvolvedor durante o simulado.');
                    }
                    
                    // Ctrl+Shift+I (ferramentas de desenvolvedor)
                    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
                        e.preventDefault();
                        showWarning('Não é permitido usar ferramentas de desenvolvedor durante o simulado.');
                    }
                    
                    // Ctrl+Shift+J (console)
                    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
                        e.preventDefault();
                        showWarning('Não é permitido usar ferramentas de desenvolvedor durante o simulado.');
                    }
                    
                    // Ctrl+U (exibir código fonte)
                    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
                        e.preventDefault();
                        showWarning('Não é permitido exibir o código fonte durante o simulado.');
                    }
                    
                    // Alt+Setas (navegação)
                    if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                        e.preventDefault();
                        showWarning('Não é permitido usar navegação por atalhos durante o simulado.');
                    }
                });
            }
            
            // Lidar com a tentativa de mudar de aba
            function handleTabSwitch() {
                warningCount++;
                
                if (warningCount <= maxWarnings) {
                    showWarning('Você tentou sair da página do simulado. Esta ação não é permitida.');
                    
                    if (warningCount >= maxWarnings) {
                        warningMessage.textContent = 'Você tentou sair da página do simulado. Esta ação não é permitida e o simulado será encerrado automaticamente.';
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
                    
                    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }, 1000);
            }
            
            function showQuestion(number) {
                // Esconder todas as questões
                document.querySelectorAll('.question').forEach(q => {
                    q.style.display = 'none';
                });
                
                // Mostrar a questão atual
                document.getElementById(`question-${number}`).style.display = 'block';
                
                // Atualizar o contador
                currentQuestionEl.textContent = number;
                
                // Atualizar os botões de navegação
                prevBtn.disabled = (number === 1);
                nextBtn.textContent = (number === totalQuestions) ? 'Finalizar' : 'Próxima Questão';
                nextBtn.innerHTML = (number === totalQuestions) ? 'Finalizar <i class="fas fa-check"></i>' : 'Próxima Questão <i class="fas fa-arrow-right"></i>';
                
                // Selecionar a opção salva, se houver
                const savedAnswer = userAnswers[`q${number}`];
                if (savedAnswer) {
                    document.querySelector(`input[name="q${number}"][value="${savedAnswer}"]`).checked = true;
                }
                
                // Limpar feedback
                document.getElementById(`feedback-${number}`).style.display = 'none';
            }
            
            function saveAnswer() {
                const questionId = `q${currentQuestion}`;
                const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
                
                if (selectedOption) {
                    userAnswers[questionId] = selectedOption.value;
                }
            }
            
            function finishSimulado() {
                clearInterval(timer);
                examStarted = false;

                // Verificar se todas as questões foram respondidas
                let allAnswered = true;
                for (let i = 1; i <= totalQuestions; i++) {
                    if (!userAnswers[`q${i}`]) {
                        allAnswered = false;
                        break;
                    }
                }
                
                if (!allAnswered && warningCount < maxWarnings) {
                    if (!confirm('Você não respondeu a todas as questões. Deseja finalizar mesmo assim?')) {
                        examStarted = true;
                        return;
                    }
                }
                
                // Calcular a pontuação
                let score = 0;
                for (let i = 1; i <= totalQuestions; i++) {
                    const questionId = `q${i}`;
                    if (userAnswers[questionId] === correctAnswers[questionId]) {
                        score++;
                    }
                }
                
                // Atualizar a pontuação no resultado
                scoreEl.textContent = `${score}/${totalQuestions}`;
                
                // Mostrar mensagem personalizada
                if (score === totalQuestions) {
                    resultMessage.textContent = 'Parabéns! Você acertou todas as questões. Você está pronto para o Encceja!';
                } else if (score >= totalQuestions * 0.7) {
                    resultMessage.textContent = 'Ótimo desempenho! Você está bem preparado para o Encceja.';
                } else if (score >= totalQuestions * 0.5) {
                    resultMessage.textContent = 'Bom esforço! Continue estudando para melhorar sua pontuação no Encceja.';
                } else {
                    resultMessage.textContent = 'Você precisa estudar mais. Dedique mais tempo aos tópicos que você teve mais dificuldade.';
                }
                
                // Mostrar o container de resultados
                questionContainer.style.display = 'none';
                resultContainer.style.display = 'block';
            }
            
            function resetSimulado() {
                // Resetar variáveis
                currentQuestion = 1;
                seconds = 0;
                minutes = 0;
                userAnswers = {};
                warningCount = 0;
                
                // Resetar o timer
                clearInterval(timer);
                timerEl.textContent = '00:00';
                
                // Limpar todas as respostas
                document.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.checked = false;
                });
                
                // Esconder todos os feedbacks
                document.querySelectorAll('.feedback').forEach(feedback => {
                    feedback.style.display = 'none';
                });
                
                // Mostrar a tela inicial
                startScreen.style.display = 'block';
                questionContainer.style.display = 'none';
                resultContainer.style.display = 'none';
                
                // Resetar estado do exame
                examStarted = false;
            }
        });