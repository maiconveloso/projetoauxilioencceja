// Dados dos desafios - Perguntas sobre Classes de Palavras e Funções Sintáticas
        const challenges = [
            {
                question: "Na frase 'O menino estudioso leu o livro rapidamente.', a palavra 'estudioso' exerce qual função sintática?",
                options: [
                    "Adjunto adnominal",
                    "Adjunto adverbial",
                    "Predicativo do sujeito",
                    "Complemento nominal"
                ],
                correctAnswer: "a",
                feedback: "Correto! 'Estudioso' é um adjetivo que caracteriza o substantivo 'menino', exercendo a função de adjunto adnominal."
            },
            {
                question: "Em 'Eles chegaram cedo ao cinema', qual é a classe gramatical da palavra 'cedo'?",
                options: [
                    "Adjetivo",
                    "Advérbio",
                    "Substantivo",
                    "Preposição"
                ],
                correctAnswer: "b",
                feedback: "Correto! 'Cedo' é um advérbio de tempo, pois modifica o verbo 'chegaram', indicando quando a ação ocorreu."
            },
            {
                question: "Na oração 'Faz muito tempo que não te vejo', qual é a função sintática do termo 'muito tempo'?",
                options: [
                    "Objeto direto",
                    "Adjunto adverbial",
                    "Sujeito",
                    "Predicativo"
                ],
                correctAnswer: "b",
                feedback: "Correto! 'Muito tempo' funciona como adjunto adverbial de tempo, modificando o verbo 'faz' na locução verbal 'faz tempo'."
            },
            {
                question: "Em 'Necessitamos de ajuda urgente', qual é a classe da palavra 'urgente'?",
                options: [
                    "Advérbio",
                    "Substantivo",
                    "Adjetivo",
                    "Conjunção"
                ],
                correctAnswer: "c",
                feedback: "Correto! 'Urgente' é um adjetivo que qualifica o substantivo 'ajuda', indicando uma característica."
            },
            {
                question: "Identifique o sujeito da oração: 'Choveu muito ontem à noite.'",
                options: [
                    "Choveu",
                    "Muito",
                    "Ontem à noite",
                    "Oração sem sujeito"
                ],
                correctAnswer: "d",
                feedback: "Correto! Esta é uma oração sem sujeito, pois o verbo 'chover' é impessoal, indicando fenômeno da natureza."
            },
            {
                question: "Na frase 'A notícia deixou os alunos felizes', qual é a função sintática de 'felizes'?",
                options: [
                    "Adjunto adnominal",
                    "Adjunto adverbial",
                    "Predicativo do objeto",
                    "Complemento nominal"
                ],
                correctAnswer: "c",
                feedback: "Correto! 'Felizes' é predicativo do objeto, pois caracteriza o objeto direto 'os alunos'."
            },
            {
                question: "Em 'Entreguei o livro ao professor', qual é a função sintática de 'ao professor'?",
                options: [
                    "Objeto direto",
                    "Objeto indireto",
                    "Adjunto adnominal",
                    "Adjunto adverbial"
                ],
                correctAnswer: "b",
                feedback: "Correto! 'Ao professor' funciona como objeto indireto, pois é complemento de um verbo transitivo indireto, regido pela preposição 'a'."
            },
            {
                question: "Na oração 'Maria, venha cá!', qual é a função sintática de 'Maria'?",
                options: [
                    "Sujeito",
                    "Vocativo",
                    "Aposto",
                    "Adjunto adnominal"
                ],
                correctAnswer: "b",
                feedback: "Correto! 'Maria' é um vocativo, pois é um termo que serve para chamar ou interpelar um ouvinte."
            },
            {
                question: "Em 'A casa foi vendida pelo proprietário', qual é a função sintática de 'pelo proprietário'?",
                options: [
                    "Agente da passiva",
                    "Adjunto adverbial",
                    "Objeto indireto",
                    "Complemento nominal"
                ],
                correctAnswer: "a",
                feedback: "Correto! 'Pelo proprietário' é agente da passiva, pois indica quem praticou a ação na voz passiva analítica."
            },
            {
                question: "Na frase 'É necessário cuidado ao atravessar a rua', qual é a função sintática de 'cuidado'?",
                options: [
                    "Sujeito",
                    "Objeto direto",
                    "Adjunto adnominal",
                    "Predicativo"
                ],
                correctAnswer: "a",
                feedback: "Correto! 'Cuidado' funciona como sujeito da oração, sendo o termo sobre o qual recai a afirmação de ser 'necessário'."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 10 * 60; 
        
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
            timeLeft = 10 * 60;
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