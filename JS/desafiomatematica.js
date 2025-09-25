// Dados dos desafios - Perguntas de Matemática (Porcentagem e Juros Compostos)
        const challenges = [
            {
                question: "Qual é 25% de 200?",
                options: ["50", "75", "100", "150"],
                correctAnswer: "b" 
            },
            {
                question: "Um produto custa R$ 150 e está com 20% de desconto. Qual o valor do desconto?",
                options: ["R$ 20", "R$ 30", "R$ 40", "R$ 50"],
                correctAnswer: "c" 
            },
            {
                question: "Uma dívida de R$ 1000 com juros compostos de 5% ao mês. Qual o valor após 3 meses?",
                options: ["R$ 1157,63", "R$ 1100,00", "R$ 1050,00", "R$ 1150,00"],
                correctAnswer: "b" 
            },
            {
                question: "Qual é o valor de x na equação: 15% de x = 30?",
                options: ["150", "200", "250", "300"],
                correctAnswer: "c" 
            },
            {
                question: "Um capital de R$ 2000 rende juros compostos de 2% ao mês. Qual o montante após 4 meses?",
                options: ["R$ 2164,86", "R$ 2080,00", "R$ 2120,00", "R$ 2160,00"],
                correctAnswer: "c" 
            },
            {
                question: "Se você investe R$ 500 a uma taxa de juros compostos de 10% ao ano, qual será o montante após 2 anos?",
                options: ["R$ 605", "R$ 550", "R$ 500", "R$ 650"],
                correctAnswer: "d"
            },
            {
                question: "Qual é 30% de 300?",
                options: ["60", "90", "120", "150"],
                correctAnswer: "d" 
            },
            {
                question: "Um produto foi vendido por R$ 440,00 com um lucro de 10%. Qual o preço de custo?",
                options: ["R$ 400,00", "R$ 380,00", "R$ 420,00", "R$ 460,00"],
                correctAnswer: "b" 
            },
            {
                question: "Qual é o resultado de 120% de 50?",
                options: ["60", "70", "80", "90"],
                correctAnswer: "c"
            },
            {
                question: "Um capital de R$ 1000 rende juros compostos de 1% ao mês. Qual o montante após 12 meses?",
                options: ["R$ 1126,83", "R$ 1100,00", "R$ 1200,00", "R$ 1120,00"],
                correctAnswer: "d" 
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 20 * 60; // 20 minutos em segundos
        
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
            timeLeft = 20 * 60;
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