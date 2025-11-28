// Dados dos desafios - Perguntas sobre Climatologia
        const challenges = [
            {
                question: "Qual tipo de clima é caracterizado por altas temperaturas durante todo o ano e chuvas abundantes e bem distribuídas?",
                options: [
                    "Clima Equatorial",
                    "Clima Tropical",
                    "Clima Temperado",
                    "Clima Desértico"
                ],
                correctAnswer: "a",
                feedback: "O clima Equatorial apresenta temperaturas elevadas durante todo o ano (média acima de 25°C) e chuvas abundantes e bem distribuídas, sem estação seca definida."
            },
            {
                question: "O fenômeno El Niño está relacionado a alterações climáticas em qual região do planeta?",
                options: [
                    "Oceano Atlântico",
                    "Oceano Índico",
                    "Oceano Pacífico Equatorial",
                    "Mar Mediterrâneo"
                ],
                correctAnswer: "c",
                feedback: "O fenômeno El Niño ocorre no Oceano Pacífico Equatorial, caracterizado pelo aquecimento anormal das águas superficiais, que provoca alterações climáticas em diversas partes do mundo."
            },
            {
                question: "Qual tipo de clima é caracterizado por invernos rigorosos e verões amenos, com quatro estações bem definidas?",
                options: [
                    "Clima Tropical",
                    "Clima Subtropical",
                    "Clima Equatorial",
                    "Clima Desértico"
                ],
                correctAnswer: "b",
                feedback: "O clima Subtropical apresenta quatro estações bem definidas, com invernos frios e, em algumas regiões, rigorosos, e verões amenos. É comum no sul do Brasil e em partes da Europa e América do Norte."
            },
            {
                question: "As massas de ar que influenciam o clima brasileiro são, principalmente:",
                options: [
                    "Massa Equatorial Atlântica, Tropical Atlântica e Polar Atlântica",
                    "Massa Mediterrânea, Polar e Equatorial",
                    "Massa Continental, Marítima e de Montanha",
                    "Massa Polar, Equatorial e Continental"
                ],
                correctAnswer: "a",
                feedback: "As principais massas de ar que influenciam o clima brasileiro são: Massa Equatorial Atlântica (quente e úmida), Massa Tropical Atlântica (quente e úmida) e Massa Polar Atlântica (fria e úmida)."
            },
            {
                question: "Qual tipo de clima é caracterizado por baixíssimos índices pluviométricos e grandes amplitudes térmicas diárias?",
                options: [
                    "Clima Equatorial",
                    "Clima Tropical",
                    "Clima Desértico",
                    "Clima Mediterrâneo"
                ],
                correctAnswer: "c",
                feedback: "O clima Desértico é caracterizado por baixíssimos índices pluviométricos (menos de 250 mm anuais) e grandes amplitudes térmicas diárias, com dias muito quentes e noites muito frias."
            },
            {
                question: "O efeito estufa é um fenômeno natural que:",
                options: [
                    "Aumenta a incidência de raios ultravioleta na Terra",
                    "Retém parte do calor irradiado pela superfície terrestre",
                    "Causa o resfriamento da atmosfera",
                    "Aumenta a salinidade dos oceanos"
                ],
                correctAnswer: "b",
                feedback: "O efeito estufa é um fenômeno natural que retém parte do calor irradiado pela superfície terrestre, mantendo a temperatura do planeta em níveis adequados para a vida. O problema é o seu agravamento pela ação humana."
            },
            {
                question: "Qual tipo de clima é caracterizado por verões quentes e secos e invernos amenos e chuvosos?",
                options: [
                    "Clima Tropical",
                    "Clima Equatorial",
                    "Clima Mediterrâneo",
                    "Clima Polar"
                ],
                correctAnswer: "c",
                feedback: "O clima Mediterrâneo é caracterizado por verões quentes e secos e invernos amenos e chuvosos. Ocorre principalmente nas regiões banhadas pelo Mar Mediterrâneo, como sul da Europa, norte da África e partes da Califórnia."
            },
            {
                question: "A latitude é um dos fatores climáticos mais importantes porque:",
                options: [
                    "Determina a proximidade do mar",
                    "Influencia a altitude de um local",
                    "Define a inclinação dos raios solares e a duração do dia",
                    "Controla a direção dos ventos predominantes"
                ],
                correctAnswer: "c",
                feedback: "A latitude define a inclinação dos raios solares que atingem a superfície terrestre e a duração do dia, influenciando diretamente a temperatura e, consequentemente, as características climáticas de uma região."
            },
            {
                question: "O fenômeno La Niña é caracterizado por:",
                options: [
                    "Aquecimento anormal das águas do Oceano Pacífico",
                    "Resfriamento anormal das águas do Oceano Pacífico",
                    "Aumento da temperatura dos oceanos em todo o mundo",
                    "Diminuição da salinidade das águas oceânicas"
                ],
                correctAnswer: "b",
                feedback: "O fenômeno La Niña é caracterizado pelo resfriamento anormal das águas superficiais do Oceano Pacífico Equatorial, sendo considerado o oposto do El Niño e também provocando alterações climáticas globais."
            },
            {
                question: "Qual tipo de clima é encontrado nas regiões polares, com temperaturas sempre abaixo de 0°C e precipitação predominantemente na forma de neve?",
                options: [
                    "Clima Polar",
                    "Clima Subpolar",
                    "Clima de Montanha",
                    "Clima Temperado"
                ],
                correctAnswer: "a",
                feedback: "O clima Polar é encontrado nas regiões próximas aos polos Norte e Sul, caracterizado por temperaturas sempre muito baixas (geralmente abaixo de 0°C) e precipitação escassa, que ocorre principalmente na forma de neve."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 25 * 60; 
        
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