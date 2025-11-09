 // Dados dos desafios - Perguntas sobre Biomas Brasileiros
        const challenges = [
            {
                question: "Qual bioma brasileiro é conhecido como o 'pulmão do mundo'?",
                options: [
                    "Amazônia",
                    "Cerrado",
                    "Mata Atlântica",
                    "Pantanal"
                ],
                correctAnswer: "a",
                feedback: "A Amazônia é conhecida como o 'pulmão do mundo' devido à sua vasta extensão florestal que produz oxigênio e absorve dióxido de carbono."
            },
            {
                question: "Qual bioma possui a maior biodiversidade do planeta?",
                options: [
                    "Caatinga",
                    "Pampa",
                    "Amazônia",
                    "Cerrado"
                ],
                correctAnswer: "c",
                feedback: "A Amazônia abriga a maior biodiversidade do planeta, com mais de 10% das espécies conhecidas do mundo."
            },
            {
                question: "O bioma Pampa está predominantemente localizado em qual região do Brasil?",
                options: [
                    "Norte",
                    "Nordeste",
                    "Centro-Oeste",
                    "Sul"
                ],
                correctAnswer: "d",
                feedback: "O Pampa está localizado principalmente no Rio Grande do Sul, com pequenas extensões em Santa Catarina e Paraná."
            },
            {
                question: "Qual bioma é caracterizado por vegetação de cerrado, com árvores de tronco retorcido e casca grossa?",
                options: [
                    "Amazônia",
                    "Cerrado",
                    "Mata Atlântica",
                    "Caatinga"
                ],
                correctAnswer: "b",
                feedback: "O Cerrado possui vegetação típica com árvores retorcidas, casca grossa e troncos tortuosos."
            },
            {
                question: "O Pantanal é o maior complexo de 湿地 (wetlands) do mundo e está localizado principalmente em qual região?",
                options: [
                    "Norte",
                    "Nordeste",
                    "Centro-Oeste",
                    "Sul"
                ],
                correctAnswer: "c",
                feedback: "O Pantanal está localizado principalmente no Mato Grosso do Sul, com partes no Mato Grosso, Paraná e Bolívia."
            },
            {
                question: "Qual bioma é conhecido por suas formações de dunas e restingas?",
                options: [
                    "Caatinga",
                    "Cerrado",
                    "Mata Atlântica",
                    "Pampa"
                ],
                correctAnswer: "c",
                feedback: "A Mata Atlântica possui formações costeiras como dunas, restingas e manguezais."
            },
            {
                question: "O bioma Mata Atlântica é considerado um dos mais ameaçados do mundo e está concentrado principalmente em qual região?",
                options: [
                    "Norte",
                    "Nordeste",
                    "Sudeste e Sul",
                    "Centro-Oeste"
                ],
                correctAnswer: "c",
                feedback: "A Mata Atlântica original está concentrada principalmente no Sudeste e Sul do Brasil, com apenas 7% de sua cobertura original remanescente."
            },
            {
                question: "Qual bioma é caracterizado por um clima semiárido, com vegetação de caatinga e cactos?",
                options: [
                    "Amazônia",
                    "Cerrado",
                    "Caatinga",
                    "Pampa"
                ],
                correctAnswer: "c",
                feedback: "A Caatinga é o único bioma exclusivamente brasileiro, com vegetação adaptada ao clima semiárido, incluindo cactos e plantas espinhosas."
            },
            {
                question: "O bioma Amazônia está distribuído principalmente em quais estados brasileiros?",
                options: [
                    "São Paulo, Rio de Janeiro, Minas Gerais",
                    "Amazonas, Pará, Acre, Rondônia",
                    "Rio Grande do Sul, Santa Catarina, Paraná",
                    "Mato Grosso, Mato Grosso do Sul, Goiás"
                ],
                correctAnswer: "b",
                feedback: "A Amazônia está distribuída principalmente nos estados do Amazonas, Pará, Acre, Rondônia, Roraima, Amapá e parte do Tocantins."
            },
            {
                question: "Qual bioma brasileiro é conhecido por suas formações de campos e coxilhas?",
                options: [
                    "Caatinga",
                    "Cerrado",
                    "Pampa",
                    "Pantanal"
                ],
                correctAnswer: "c",
                feedback: "O Pampa é caracterizado por extensas formações de campos, coxilhas e campos de altitude."
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