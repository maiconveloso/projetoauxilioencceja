 // Dados dos desafios - Perguntas de Ciências (Células e Organelas)
        const challenges = [
            {
                question: "Qual é a unidade básica de estrutura e função de todos os seres vivos?",
                options: [
                    "Átomo",
                    "Molécula",
                    "Célula",
                    "Tecido"
                ],
                correctAnswer: "c",
                feedback: "Correto! A célula é a unidade fundamental que compõe todos os seres vivos, sendo responsável por todas as funções vitais."
            },
            {
                question: "Qual organela celular é responsável pela produção de energia na forma de ATP?",
                options: [
                    "Cloroplasto",
                    "Mitocondria",
                    "Retículo endoplasmático",
                    "Lisossomo"
                ],
                correctAnswer: "b",
                feedback: "Correto! A mitocondria é conhecida como a 'central energética' da célula, produzindo ATP através da respiração celular."
            },
            {
                question: "Onde ocorre a fotossíntese nas células vegetais?",
                options: [
                    "Mitocondria",
                    "Núcleo",
                    "Cloroplasto",
                    "Membrana plasmática"
                ],
                correctAnswer: "c",
                feedback: "Correto! Os cloroplastos contêm clorofila e são responsáveis pela fotossíntese, convertendo luz solar em energia química."
            },
            {
                question: "Qual das seguintes organelas é conhecida como o 'centro de controle' da célula?",
                options: [
                    "Mitocondria",
                    "Núcleo",
                    "Vacúolo",
                    "Ribossomo"
                ],
                correctAnswer: "b",
                feedback: "Correto! O núcleo contém o DNA e controla todas as atividades celulares, como a síntese de proteínas e a divisão celular."
            },
            {
                question: "Qual organela é responsável pelo armazenamento de água e nutrientes nas células vegetais?",
                options: [
                    "Lisossomo",
                    "Cloroplasto",
                    "Vacúolo",
                    "Retículo endoplasmático"
                ],
                correctAnswer: "c",
                feedback: "Correto! O vacúolo é uma organela que armazena água, nutrientes e produtos de resíduo, sendo especialmente grande nas células vegetais."
            },
            {
                question: "Qual das seguintes estruturas não é uma organela celular?",
                options: [
                    "Mitocondria",
                    "Ribossomo",
                    "DNA",
                    "Lisossomo"
                ],
                correctAnswer: "c",
                feedback: "Correto! O DNA é uma molécula que contém as informações genéticas, mas não é considerada uma organela celular."
            },
            {
                question: "Qual processo celular envolve a divisão do núcleo?",
                options: [
                    "Citocinese",
                    "Mitose",
                    "Meiose",
                    "Fagocitose"
                ],
                correctAnswer: "b",
                feedback: "Correto! A mitose é o processo de divisão nuclear que resulta em duas células filhas geneticamente idênticas à célula mãe."
            },
            {
                question: "Qual organela é responsável pela síntese de proteínas?",
                options: [
                    "Mitocondria",
                    "Ribossomo",
                    "Cloroplasto",
                    "Vacúolo"
                ],
                correctAnswer: "b",
                feedback: "Correto! Os ribossomos são organelas responsáveis pela síntese de proteínas, seguindo as instruções do RNA mensageiro."
            },
            {
                question: "Qual das seguintes funções não é realizada pela membrana plasmática?",
                options: [
                    "Transporte de substâncias",
                    "Proteção celular",
                    "Síntese de proteínas",
                    "Comunicação entre células"
                ],
                correctAnswer: "c",
                feedback: "Correto! A síntese de proteínas é realizada pelos ribossomos, não pela membrana plasmática. A membrana controla o que entra e sai da célula."
            },
            {
                question: "Qual é a principal função dos ribossomos?",
                options: [
                    "Produção de energia",
                    "Síntese de proteínas",
                    "Armazenamento de DNA",
                    "Digestão celular"
                ],
                correctAnswer: "b",
                feedback: "Correto! Os ribossomos são as estruturas responsáveis pela síntese de proteínas, traduzindo o código genético do RNA."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 25 * 60; // 25 minutos em segundos
        
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
            timeLeft = 25 * 60;
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