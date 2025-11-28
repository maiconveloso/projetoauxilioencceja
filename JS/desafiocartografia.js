// Dados dos desafios - Perguntas sobre Cartografia e Coordenadas Geográficas
        const challenges = [
            {
                question: "Qual é a principal função das linhas de latitude em um mapa?",
                options: [
                    "Medir distâncias leste-oeste",
                    "Medir distâncias norte-sul",
                    "Indicar fusos horários",
                    "Delimitar fronteiras políticas"
                ],
                correctAnswer: "b",
                feedback: "As linhas de latitude (paralelos) medem distâncias norte-sul, variando de 0° na Linha do Equador a 90° nos polos Norte e Sul."
            },
            {
                question: "A projeção de Mercator é amplamente utilizada para qual tipo de mapa?",
                options: [
                    "Mapas de navegação marítima",
                    "Mapas de distribuição populacional",
                    "Mapas topográficos de montanhas",
                    "Mapas de fusos horários"
                ],
                correctAnswer: "a",
                feedback: "A projeção de Mercator é ideal para navegação marítima pois representa as rotas como linhas retas, preservando os ângulos e a forma das áreas pequenas."
            },
            {
                question: "O que representa a escala 1:50.000 em um mapa?",
                options: [
                    "1 cm no mapa equivale a 50.000 cm no terreno",
                    "1 cm no mapa equivale a 50.000 km no terreno",
                    "1 km no mapa equivale a 50.000 cm no terreno",
                    "50.000 cm no mapa equivale a 1 cm no terreno"
                ],
                correctAnswer: "a",
                feedback: "A escala 1:50.000 significa que cada 1 centímetro no mapa corresponde a 50.000 centímetros (ou 500 metros) no terreno real."
            },
            {
                question: "Qual das seguintes coordenadas representa uma localização no Hemisfério Sul e Ocidental?",
                options: [
                    "15°N, 45°O",
                    "30°S, 60°L",
                    "20°S, 30°O",
                    "10°N, 20°L"
                ],
                correctAnswer: "c",
                feedback: "A coordenada 20°S, 30°O representa uma localização no Hemisfério Sul (latitude Sul) e Ocidental (longitude Oeste)."
            },
            {
                question: "O Brasil está localizado entre quais coordenadas geográficas aproximadas?",
                options: [
                    "5°N e 33°S de latitude; 34°O e 73°O de longitude",
                    "0° e 30°S de latitude; 30°O e 60°O de longitude",
                    "10°N e 40°S de latitude; 40°O e 75°O de longitude",
                    "15°N e 25°S de latitude; 35°O e 65°O de longitude"
                ],
                correctAnswer: "a",
                feedback: "O território brasileiro está compreendido aproximadamente entre 5°16'N e 33°45'S de latitude e 34°47'O e 73°59'O de longitude."
            },
            {
                question: "Qual é a principal característica da projeção de Peters?",
                options: [
                    "Preserva as formas das áreas",
                    "Preserva as áreas, mas distorce as formas",
                    "Preserva as distâncias",
                    "Preserva os ângulos e as direções"
                ],
                correctAnswer: "b",
                feedback: "A projeção de Peters preserva as áreas (projeção equivalente), mas distorce as formas, especialmente nas regiões polares."
            },
            {
                question: "O que são coordenadas UTM (Universal Transversa de Mercator)?",
                options: [
                    "Um sistema de coordenadas geográficas baseado em latitude e longitude",
                    "Um sistema de coordenadas planas que divide a Terra em 60 fusos de 6°",
                    "Um sistema de coordenadas polares usado para navegação aérea",
                    "Um sistema de coordenadas baseado em constelações estelares"
                ],
                correctAnswer: "b",
                feedback: "UTM é um sistema de coordenadas planas que divide a Terra em 60 fusos de 6° de longitude cada, minimizando deformações em cada fuso."
            },
            {
                question: "Qual é a função do Meridiano de Greenwich?",
                options: [
                    "Dividir o planeta em Hemisférios Norte e Sul",
                    "Marcar o ponto de latitude zero",
                    "Servir como referência para a contagem dos fusos horários",
                    "Definir a Linha do Equador"
                ],
                correctAnswer: "c",
                feedback: "O Meridiano de Greenwich (longitude 0°) serve como referência para a contagem dos fusos horários e para medir as longitudes a leste (L) e oeste (O)."
            },
            {
                question: "Em um mapa topográfico, o que representam as curvas de nível muito próximas umas das outras?",
                options: [
                    "Terrenos planos",
                    "Terrenos com declive acentuado",
                    "Rios e lagos",
                    "Áreas urbanas"
                ],
                correctAnswer: "b",
                feedback: "Curvas de nível muito próximas indicam terrenos com declive acentuado, como morros ou montanhas íngremes."
            },
            {
                question: "Qual é a principal vantagem dos mapas temáticos?",
                options: [
                    "Mostrar com precisão as fronteiras políticas",
                    "Representar a topografia do terreno",
                    "Destacar informações específicas sobre um tema",
                    "Indicar exatamente as coordenadas geográficas"
                ],
                correctAnswer: "c",
                feedback: "Mapas temáticos são projetados para destacar informações específicas sobre um tema particular, como densidade populacional, clima, vegetação, entre outros."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 20 * 60; 
        
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