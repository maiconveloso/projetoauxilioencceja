// Dados dos desafios - Perguntas de Matemática (Álgebra)
        const challenges = [
            {
                question: "A soma de um número com o seu triplo é igual a 48. Qual é esse número?",
                options: ["12", "16", "24", "36"],
                correctAnswer: "a" 
            },
            {
                question: "Resolva a equação: 3x - 5 = 16.",
                options: ["3", "5", "7", "21"],
                correctAnswer: "c" 
            },
            {
                question: "As raízes da equação x² - 5x + 6 = 0 são:",
                options: ["{1, 6}", "{2, 3}", "{-1, -6}", "{-2, -3}"],
                correctAnswer: "b" 
            },
            {
                question: "Num sistema de equações, x + y = 10 e x - y = 4. Qual o valor de x?",
                options: ["7", "3", "14", "5"],
                correctAnswer: "a" 
            },
            {
                question: "Seja a função f(x) = 2x - 1. O valor de f(5) é:",
                options: ["9", "10", "11", "12"],
                correctAnswer: "a" 
            },
            {
                question: "A idade de um pai é o triplo da idade de seu filho. Daqui a 5 anos, a soma de suas idades será 70. Quantos anos tem o filho hoje?",
                options: ["10 anos", "12 anos", "15 anos", "18 anos"],
                correctAnswer: "c"
            },
            {
                question: "Qual é o valor de x na equação: (x/2) - 4 = 8?",
                options: ["6", "12", "24", "32"],
                correctAnswer: "c" 
            },
            {
                question: "Um retângulo tem perímetro de 40 cm e seu comprimento é o dobro de sua largura. Qual é a largura do retângulo?",
                options: ["5 cm", "6,67 cm", "10 cm", "13,33 cm"],
                correctAnswer: "b" 
            },
            {
                question: "A equação do 2º grau ax² + bx + c = 0 tem como raízes 2 e -3. O valor de a + b + c é:",
                options: ["-5", "0", "5", "10"],
                correctAnswer: "b"
            },
            {
                question: "Uma loja vende um produto por R$ 120,00, obtendo um lucro de 20% sobre o preço de custo. Qual era o preço de custo desse produto?",
                options: ["R$ 96,00", "R$ 100,00", "R$ 104,00", "R$ 144,00"],
                correctAnswer: "b" 
            }
        ];
        
        // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 30 * 60; // 30 minutos em segundos
        
        // Elementos DOM
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const feedbackEl = document.getElementById('feedback');
        const progressBarEl = document.getElementById('progressBar');
        const currentQuestionEl = document.getElementById('currentQuestion');
        const scoreEl = document.getElementById('score');
        const prevBtn = document.getElementById('prevBtn');
        const checkBtn = document.getElementById('checkBtn');
        const nextBtn = document.getElementById('nextBtn');
        const completionModal = document.getElementById('completionModal');
        const timeUpModal = document.getElementById('timeUpModal');
        const finalScoreEl = document.getElementById('finalScore');
        const timeUpScoreEl = document.getElementById('timeUpScore');
        const timerEl = document.getElementById('timer');
        
        // Inicialização
        loadQuestion();
        startTimer();
        
        // Carregar pergunta atual
        function loadQuestion() {
            const challenge = challenges[currentQuestion];
            questionEl.textContent = challenge.question;
            
            // Limpar opções anteriores
            optionsEl.innerHTML = '';
            
            // Adicionar opções
            challenge.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.classList.add('option');
                optionEl.setAttribute('data-value', String.fromCharCode(97 + index)); // a, b, c, d
                optionEl.textContent = `${String.fromCharCode(97 + index)}) ${option}`;
                optionEl.addEventListener('click', selectOption);
                optionsEl.appendChild(optionEl);
            });
            
            // Resetar estado
            answered = false;
            selectedOption = null;
            feedbackEl.style.display = 'none';
            checkBtn.disabled = false;
            nextBtn.disabled = true;
            
            // Atualizar UI
            updateUI();
        }
        
        // Selecionar opção
        function selectOption(e) {
            if (answered) return;
            
            // Remover seleção anterior
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Selecionar nova opção
            e.target.classList.add('selected');
            selectedOption = e.target.getAttribute('data-value');
        }
        
        // Verificar resposta
        function checkAnswer() {
            if (!selectedOption) return;
            
            answered = true;
            checkBtn.disabled = true;
            nextBtn.disabled = false;
            
            const challenge = challenges[currentQuestion];
            const options = document.querySelectorAll('.option');
            
            options.forEach(option => {
                const value = option.getAttribute('data-value');
                
                if (value === challenge.correctAnswer) {
                    option.classList.add('correct');
                }
                
                if (value === selectedOption && selectedOption !== challenge.correctAnswer) {
                    option.classList.add('incorrect');
                }
            });
            
            // Exibir feedback
            if (selectedOption === challenge.correctAnswer) {
                feedbackEl.classList.add('correct');
                feedbackEl.classList.remove('incorrect');
                feedbackEl.innerHTML = '<strong>Correto!</strong> Parabéns, você acertou esta questão.';
                score++;
            } else {
                feedbackEl.classList.add('incorrect');
                feedbackEl.classList.remove('correct');
                feedbackEl.innerHTML = `<strong>Incorreto!</strong> A resposta correta é a opção ${challenge.correctAnswer.toUpperCase()}.`;
            }
            
            feedbackEl.style.display = 'block';
            updateUI();
        }
        
        // Próxima pergunta
        function nextQuestion() {
            if (currentQuestion < challenges.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                showCompletionModal();
            }
        }
        
        // Pergunta anterior
        function prevQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        }
        
        // Atualizar UI
        function updateUI() {
            // Atualizar progresso
            const progress = ((currentQuestion + 1) / challenges.length) * 100;
            progressBarEl.style.width = `${progress}%`;
            
            // Atualizar informações
            currentQuestionEl.textContent = `Questão ${currentQuestion + 1} de ${challenges.length}`;
            scoreEl.textContent = `Acertos: ${score}/${currentQuestion + (answered ? 1 : 0)}`;
            
            // Botões de navegação
            prevBtn.disabled = currentQuestion === 0;
            nextBtn.disabled = !answered;
        }
        
        // Mostrar modal de conclusão
        function showCompletionModal() {
            finalScoreEl.textContent = `${score}/${challenges.length}`;
            completionModal.style.display = 'flex';
            clearInterval(timerInterval);
        }
        
        // Mostrar modal de tempo esgotado
        function showTimeUpModal() {
            timeUpScoreEl.textContent = `${score}/${challenges.length}`;
            timeUpModal.style.display = 'flex';
            clearInterval(timerInterval);
        }
        
        // Reiniciar desafios
        function restartChallenges() {
            currentQuestion = 0;
            score = 0;
            timeLeft = 30 * 60;
            loadQuestion();
            completionModal.style.display = 'none';
            timeUpModal.style.display = 'none';
            startTimer();
        }
        
        // Cronômetro
        function startTimer() {
            updateTimerDisplay();
            
            timerInterval = setInterval(() => {
                timeLeft--;
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    showTimeUpModal();
                    return;
                }
                
                updateTimerDisplay();
            }, 1000);
        }
        
        // Atualizar display do cronômetro
        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Adicionar classe de alerta quando faltar 2 minutos
            if (timeLeft <= 120) {
                timerEl.classList.add('timer-warning');
            } else {
                timerEl.classList.remove('timer-warning');
            }
        }
        
        // Event listeners
        checkBtn.addEventListener('click', checkAnswer);
        nextBtn.addEventListener('click', nextQuestion);
        prevBtn.addEventListener('click', prevQuestion);
        restartBtn.addEventListener('click', restartChallenges);
        restartBtnTimeUp.addEventListener('click', restartChallenges);