// Dados dos desafios - Perguntas de Geometria Plana (Áreas e Perímetros)
        const challenges = [
            {
                question: "Qual é a área de um quadrado cujo lado mede 6 cm?",
                options: ["36 cm²", "24 cm²", "12 cm²", "18 cm²"],
                correctAnswer: "a" 
            },
            {
                question: "Um retângulo possui lados que medem 5 cm e 8 cm. Qual o seu perímetro?",
                options: ["26 cm", "40 cm", "13 cm", "80 cm"],
                correctAnswer: "a" 
            },
            {
                question: "Calcule a área de um círculo com raio de 5 metros. (Considere π ≈ 3,14)",
                options: ["78,5 m²", "31,4 m²", "15,7 m²", "39,25 m²"],
                correctAnswer: "a" 
            },
            {
                question: "Qual é a área de um triângulo retângulo com base de 8 cm e altura de 6 cm?",
                options: ["24 cm²", "48 cm²", "14 cm²", "28 cm²"],
                correctAnswer: "a" 
            },
            {
                question: "Um terreno tem a forma de um trapézio com bases medindo 10 m e 6 m, e altura de 4 m. Qual a sua área?",
                options: ["32 m²", "64 m²", "40 m²", "16 m²"],
                correctAnswer: "a" 
            },
            {
                question: "O perímetro de um quadrado é de 48 cm. Qual é a área desse quadrado?",
                options: ["144 cm²", "48 cm²", "12 cm²", "24 cm²"],
                correctAnswer: "a"
            },
            {
                question: "Qual é o comprimento da circunferência de um círculo cujo diâmetro mede 10 cm? (Considere π ≈ 3,14)",
                options: ["31,4 cm", "78,5 cm", "15,7 cm", "62,8 cm"],
                correctAnswer: "a" 
            },
            {
                question: "Um paralelogramo tem base de 9 cm e altura correspondente de 5 cm. Qual a sua área?",
                options: ["45 cm²", "90 cm²", "14 cm²", "28 cm²"],
                correctAnswer: "a"
            },
            {
                question: "Uma figura é composta por um quadrado de lado 4 cm e um triângulo equilátero de lado 4 cm sobre um de seus lados. Qual a área total da figura? (Área do triângulo equilátero = (L²√3)/4)",
                options: ["16 + 4√3 cm²", "16 + 8√3 cm²", "16 cm²", "20 cm²"],
                correctAnswer: "a"
            },
            {
                question: "Um jardim retangular tem 20 m de comprimento e 15 m de largura. Deseja-se colocar uma cerca em todo o seu redor. Quantos metros de cerca serão necessários?",
                options: ["70 m", "300 m", "35 m", "50 m"],
                correctAnswer: "a" 
            }
        ];
        
        // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 15 * 60; // 15 minutos em segundos
        
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
            timeLeft = 15 * 60;
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