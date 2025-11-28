// Dados dos desafios - Perguntas de Física (Mecânica e Eletricidade)
        const challenges = [
            {
                question: "Um carro percorre uma distância de 150 km em 2 horas. Qual é a sua velocidade escalar média?",
                options: [
                    "65 km/h",
                    "75 km/h",
                    "85 km/h",
                    "300 km/h"
                ],
                correctAnswer: "b",
                feedback: "Correto! A velocidade escalar média é calculada pela divisão da distância percorrida pelo tempo gasto: Vm = Δs/Δt = 150 km / 2 h = 75 km/h."
            },
            {
                question: "Um bloco de 10 kg está em repouso sobre uma superfície horizontal. Aplica-se uma força horizontal de 50 N. Considerando o atrito desprezível, qual é a aceleração do bloco?",
                options: [
                    "0 m/s²",
                    "5 m/s²",
                    "10 m/s²",
                    "500 m/s²"
                ],
                correctAnswer: "b",
                feedback: "Correto! Usando a Segunda Lei de Newton (Força = massa × aceleração), temos: a = F/m = 50 N / 10 kg = 5 m/s²."
            },
            {
                question: "Uma pedra é lançada verticalmente para cima com uma velocidade inicial de 20 m/s. Desprezando a resistência do ar e considerando g = 10 m/s², qual a altura máxima atingida pela pedra?",
                options: [
                    "10 m",
                    "20 m",
                    "40 m",
                    "200 m"
                ],
                correctAnswer: "b",
                feedback: "Correto! No ponto mais alto, a velocidade final é zero. Usando a equação de Torricelli: v² = v₀² + 2aΔs. 0 = (20)² + 2(-10)Δs. 400 = 20Δs, logo Δs = 20 m."
            },
            {
                question: "Um resistor de 20 Ω é conectado a uma bateria de 12 V. Qual é a corrente elétrica que passa pelo resistor?",
                options: [
                    "0,24 A",
                    "0,6 A",
                    "2,4 A",
                    "32 A"
                ],
                correctAnswer: "b",
                feedback: "Correto! Aplicando a Lei de Ohm (V = R × i), temos: i = V/R = 12 V / 20 Ω = 0,6 A."
            },
            {
                question: "Qual é a energia cinética de um objeto de 2 kg que se move com uma velocidade de 3 m/s?",
                options: [
                    "3 J",
                    "6 J",
                    "9 J",
                    "18 J"
                ],
                correctAnswer: "c",
                feedback: "Correto! A energia cinética (Ec) é calculada pela fórmula Ec = ½mv². Ec = ½ × 2 kg × (3 m/s)² = 1 × 9 = 9 J."
            },
            {
                question: "Dois resistores, um de 10 Ω e outro de 20 Ω, são associados em paralelo. Qual é a resistência equivalente dessa associação?",
                options: [
                    "5 Ω",
                    "6,67 Ω",
                    "15 Ω",
                    "30 Ω"
                ],
                correctAnswer: "b",
                feedback: "Correto! Para resistores em paralelo, a resistência equivalente (Req) é dada por 1/Req = 1/R1 + 1/R2. 1/Req = 1/10 + 1/20 = 2/20 + 1/20 = 3/20. Invertendo, Req = 20/3 ≈ 6,67 Ω."
            },
            {
                question: "Uma força de 30 N é aplicada para mover um caixote por uma distância de 4 metros. Qual o trabalho realizado por essa força?",
                options: [
                    "7,5 J",
                    "34 J",
                    "120 J",
                    "750 J"
                ],
                correctAnswer: "c",
                feedback: "Correto! O trabalho (τ) é calculado pelo produto da força pela distância na mesma direção: τ = F × d = 30 N × 4 m = 120 J."
            },
            {
                question: "Um chuveiro elétrico tem uma potência de 4400 W e é ligado a uma rede de 220 V. Qual é a sua resistência elétrica?",
                options: [
                    "0,05 Ω",
                    "11 Ω",
                    "20 Ω",
                    "968000 Ω"
                ],
                correctAnswer: "b",
                feedback: "Correto! Usando a relação de potência (P = V²/R), podemos isolar a resistência: R = V²/P = (220 V)² / 4400 W = 48400 / 4400 = 11 Ω."
            },
            {
                question: "Uma carga de 2 C é transportada através de uma diferença de potencial de 9 V. Qual é o trabalho realizado sobre essa carga?",
                options: [
                    "4,5 J",
                    "9 J",
                    "18 J",
                    "162 J"
                ],
                correctAnswer: "c",
                feedback: "Correto! O trabalho (ou energia potencial elétrica) é calculado por τ = q × ΔV. τ = 2 C × 9 V = 18 J."
            },
            {
                question: "Um objeto de massa 5 kg está a uma altura de 10 m acima do solo. Considerando g = 10 m/s², qual é sua energia potencial gravitacional em relação ao solo?",
                options: [
                    "25 J",
                    "50 J",
                    "250 J",
                    "500 J"
                ],
                correctAnswer: "d",
                feedback: "Correto! A energia potencial gravitacional (Epg) é calculada por Epg = mgh. Epg = 5 kg × 10 m/s² × 10 m = 500 J."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 35 * 60; 
        
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
                feedbackEl.innerHTML = `<strong>Correto!</strong> ${challenge.feedback}`;
                score++;
            } else {
                feedbackEl.classList.add('incorrect');
                feedbackEl.classList.remove('correct');
                feedbackEl.innerHTML = `<strong>Incorreto!</strong> ${challenge.feedback}`;
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
            timeLeft = 35 * 60;
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