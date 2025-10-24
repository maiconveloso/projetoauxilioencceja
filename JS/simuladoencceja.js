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
            const timerDisplay = document.getElementById('timer-display');
            const scoreEl = document.querySelector('.score');
            const resultMessage = document.querySelector('.result-message');
            const warningModal = document.getElementById('warning-modal');
            const warningMessage = document.getElementById('warning-message');
            const closeWarning = document.getElementById('close-warning');
            
            // Elementos de pontuação por matéria
            const mathScoreEl = document.getElementById('math-score');
            const portugueseScoreEl = document.getElementById('portuguese-score');
            const scienceScoreEl = document.getElementById('science-score');
            const historyScoreEl = document.getElementById('history-score');
            const geographyScoreEl = document.getElementById('geography-score');
            const sociologyScoreEl = document.getElementById('sociology-score');
            
            // Configurações do simulado
            const totalQuestions = 30;
            let currentQuestion = 1;
            let timer;
            let timeLeft = 120 * 60; // 120 minutos em segundos
            let userAnswers = {};
            let correctAnswers = {
                q1: 'D',
                q2: 'A',
                q3: 'C',
                q4: 'A',
                q5: 'A',
                q6: 'A',
                q7: 'A',
                q8: 'C',
                q9: 'B',
                q10: 'C',
                q11: 'C',
                q12: 'C',
                q13: 'C',
                q14: 'D',
                q15: 'D',
                q16: 'C',
                q17: 'B',
                q18: 'D',
                q19: 'C',
                q20: 'C',
                q21: 'C',
                q22: 'A',
                q23: 'D',
                q24: 'C',
                q25: 'C',
                q26: 'C',
                q27: 'C',
                q28: 'A',
                q29: 'A',
                q30: 'B'
            };
            let examStarted = false;
            let warningCount = 0;
            const maxWarnings = 2;
            
            // Configurar proteção contra mudança de aba
            setupTabProtection();
            
            // Iniciar o simulado
            startBtn.addEventListener('click', function() {
                startScreen.style.display = 'none';
                questionContainer.style.display = 'block';
                examStarted = true;
                startTimer();
                showQuestion(currentQuestion);
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
                updateTimerDisplay();
                
                timer = setInterval(function() {
                    timeLeft--;
                    updateTimerDisplay();
                    
                    // Adicionar aviso visual quando faltar pouco tempo
                    if (timeLeft <= 300) { // 5 minutos
                        timerDisplay.classList.add('warning');
                    }
                    
                    // Encerrar o simulado quando o tempo acabar
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        finishSimulado();
                    }
                }, 1000);
            }
            
            function updateTimerDisplay() {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
            
            function calculateSubjectScores() {
                const mathQuestions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
                const portugueseQuestions = ['q11', 'q12', 'q13', 'q14', 'q15'];
                const scienceQuestions = ['q16', 'q17', 'q18', 'q19', 'q20'];
                const historyQuestions = ['q21', 'q22', 'q23', 'q24'];
                const geographyQuestions = ['q25', 'q26', 'q27', 'q28', 'q29'];
                const sociologyQuestions = ['q30'];
                
                let mathScore = 0;
                let portugueseScore = 0;
                let scienceScore = 0;
                let historyScore = 0;
                let geographyScore = 0;
                let sociologyScore = 0;
                
                mathQuestions.forEach(q => {
                    if (userAnswers[q] === correctAnswers[q]) mathScore++;
                });
                
                portugueseQuestions.forEach(q => {
                    if (userAnswers[q] === correctAnswers[q]) portugueseScore++;
                });
                
                scienceQuestions.forEach(q => {
                    if (userAnswers[q] === correctAnswers[q]) scienceScore++;
                });
                
                historyQuestions.forEach(q => {
                    if (userAnswers[q] === correctAnswers[q]) historyScore++;
                });
                
                geographyQuestions.forEach(q => {
                    if (userAnswers[q] === correctAnswers[q]) geographyScore++;
                });
                
                sociologyQuestions.forEach(q => {
                    if (userAnswers[q] === correctAnswers[q]) sociologyScore++;
                });
                
                return {
                    math: `${mathScore}/${mathQuestions.length}`,
                    portuguese: `${portugueseScore}/${portugueseQuestions.length}`,
                    science: `${scienceScore}/${scienceQuestions.length}`,
                    history: `${historyScore}/${historyQuestions.length}`,
                    geography: `${geographyScore}/${geographyQuestions.length}`,
                    sociology: `${sociologyScore}/${sociologyQuestions.length}`
                };
            }
            
            function finishSimulado() {
                clearInterval(timer);
                examStarted = false;
                
                // Calcular a pontuação
                let score = 0;
                for (let i = 1; i <= totalQuestions; i++) {
                    const questionId = `q${i}`;
                    if (userAnswers[questionId] === correctAnswers[questionId]) {
                        score++;
                    }
                }
                
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
                
                // Calcular pontuações por matéria
                const subjectScores = calculateSubjectScores();
                
                // Atualizar a pontuação no resultado
                scoreEl.textContent = `${score}/${totalQuestions}`;
                mathScoreEl.textContent = subjectScores.math;
                portugueseScoreEl.textContent = subjectScores.portuguese;
                scienceScoreEl.textContent = subjectScores.science;
                historyScoreEl.textContent = subjectScores.history;
                geographyScoreEl.textContent = subjectScores.geography;
                sociologyScoreEl.textContent = subjectScores.sociology;
                
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
                
                // Mostrar as respostas corretas
                for (let i = 1; i <= totalQuestions; i++) {
                    const questionId = `q${i}`;
                    const feedbackEl = document.getElementById(`feedback-${i}`);
                    
                    if (userAnswers[questionId]) {
                        if (userAnswers[questionId] === correctAnswers[questionId]) {
                            feedbackEl.innerHTML = '<i class="fas fa-check-circle"></i> Resposta correta!';
                            feedbackEl.className = 'feedback correct';
                        } else {
                            feedbackEl.innerHTML = `<i class="fas fa-times-circle"></i> Resposta incorreta. A resposta correta é ${correctAnswers[questionId]}.`;
                            feedbackEl.className = 'feedback incorrect';
                        }
                        feedbackEl.style.display = 'block';
                    } else {
                        feedbackEl.innerHTML = `<i class="fas fa-info-circle"></i> Você não respondeu esta questão. A resposta correta é ${correctAnswers[questionId]}.`;
                        feedbackEl.className = 'feedback incorrect';
                        feedbackEl.style.display = 'block';
                    }
                }
                
                // Mostrar o container de resultados
                questionContainer.style.display = 'none';
                resultContainer.style.display = 'block';
            }
            
            function resetSimulado() {
                // Resetar variáveis
                currentQuestion = 1;
                timeLeft = 120 * 60; // 120 minutos em segundos
                userAnswers = {};
                warningCount = 0;
                examStarted = false;
                
                // Resetar o timer
                clearInterval(timer);
                updateTimerDisplay();
                timerDisplay.classList.remove('warning');
                
                // Limpar todas as respostas selecionadas
                document.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.checked = false;
                });
                
                // Esconder todos os feedbacks
                document.querySelectorAll('.feedback').forEach(feedback => {
                    feedback.style.display = 'none';
                });
                
                // Mostrar o container de início e esconder os outros
                startScreen.style.display = 'block';
                questionContainer.style.display = 'none';
                resultContainer.style.display = 'none';
            }
        });