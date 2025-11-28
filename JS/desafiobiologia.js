// Dados dos desafios - Perguntas de Ecologia e Cadeias Alimentares
        const challenges = [
            {
                question: "Em uma cadeia alimentar, os organismos que produzem seu próprio alimento através da fotossíntese são conhecidos como:",
                options: [
                    "Consumidores primários",
                    "Decompositores",
                    "Produtores",
                    "Consumidores secundários"
                ],
                correctAnswer: "c",
                feedback: "Correto! Os produtores, como plantas e algas, são a base de todas as cadeias alimentares, convertendo energia solar em matéria orgânica através da fotossíntese."
            },
            {
                question: "Um animal que se alimenta de herbívoros ocupa qual nível trófico em uma cadeia alimentar?",
                options: [
                    "Produtor",
                    "Consumidor primário",
                    "Consumidor secundário",
                    "Decompositor"
                ],
                correctAnswer: "c",
                feedback: "Correto! O consumidor secundário se alimenta de consumidores primários (herbívoros), ocupando o terceiro nível trófico na cadeia alimentar."
            },
            {
                question: "Sobre o fluxo de energia em uma cadeia alimentar, é correto afirmar que:",
                options: [
                    "Aumenta a cada nível trófico",
                    "É totalmente transferido de um nível para outro",
                    "Diminui a cada nível trófico, com apenas cerca de 10% sendo transferido",
                    "É o mesmo para todos os níveis tróficos"
                ],
                correctAnswer: "c",
                feedback: "Correto! Apenas cerca de 10% da energia de um nível trófico é transferida para o próximo nível. O restante é perdido na forma de calor durante as atividades metabólicas dos organismos."
            },
            {
                question: "Qual grupo de seres vivos é responsável por reciclar a matéria orgânica morta em ecossistemas?",
                options: [
                    "Produtores",
                    "Consumidores primários",
                    "Consumidores terciários",
                    "Decompositores"
                ],
                correctAnswer: "d",
                feedback: "Correto! Os decompositores, como bactérias e fungos, atuam na decomposição da matéria orgânica morta, liberando nutrientes que serão reaproveitados pelos produtores."
            },
            {
                question: "A diferença fundamental entre uma cadeia alimentar e uma teia alimentar é que:",
                options: [
                    "A cadeia alimentar inclui apenas produtores",
                    "A teia alimentar representa múltiplas interações entre cadeias alimentares",
                    "A cadeia alimentar mostra apenas consumidores secundários",
                    "A teia alimentar não inclui decompositores"
                ],
                correctAnswer: "b",
                feedback: "Correto! Uma teia alimentar é um conjunto de cadeias alimentares interconectadas, representando de forma mais realista as complexas relações alimentares em um ecossistema."
            },
            {
                question: "Em uma pirâmide de energia, cada nível representa:",
                options: [
                    "O número de indivíduos em cada nível trófico",
                    "A biomassa total de cada nível trófico",
                    "A quantidade de energia disponível em cada nível trófico",
                    "O número de espécies em cada nível trófico"
                ],
                correctAnswer: "c",
                feedback: "Correto! A pirâmide de energia mostra a quantidade de energia disponível em cada nível trófico, sendo sempre maior na base (produtores) e menor no topo (consumidores de ordem elevada)."
            },
            {
                question: "Na cadeia alimentar: capim → gafanhoto → sapo → cobra → gavião, qual organismo ocupa o nível de consumidor terciário?",
                options: [
                    "Gafanhoto",
                    "Sapo",
                    "Cobra",
                    "Gavião"
                ],
                correctAnswer: "c",
                feedback: "Correto! A cobra ocupa o quarto nível trófico, sendo um consumidor terciário. Ela se alimenta do sapo (consumidor secundário), que por sua vez se alimenta do gafanhoto (consumidor primário)."
            },
            {
                question: "O que aconteceria com os consumidores secundários se todos os produtores de um ecossistema fossem removidos?",
                options: [
                    "Eles se tornariam produtores",
                    "Eles sobreviveriam se alimentando de decompositores",
                    "A população de consumidores secundários diminuiria até a extinção",
                    "Eles passariam a se alimentar de consumidores primários"
                ],
                correctAnswer: "c",
                feedback: "Correto! Sem produtores, não haveria energia entrando no ecossistema. Isso causaria um efeito em cascata, levando à extinção dos consumidores primários e, consequentemente, dos consumidores secundários que dependem deles."
            },
            {
                question: "O conjunto de todos os seres vivos e os fatores não vivos (como luz, água e solo) que interagem em uma determinada área forma:",
                options: [
                    "Uma comunidade biológica",
                    "Uma população",
                    "Um ecossistema",
                    "Um habitat"
                ],
                correctAnswer: "c",
                feedback: "Correto! Um ecossistema inclui tanto os componentes bióticos (seres vivos) quanto os abióticos (fatores não vivos) e as interações entre eles em uma determinada área."
            },
            {
                question: "A fonte primária de energia para a maioria dos ecossistemas terrestres é:",
                options: [
                    "O calor proveniente do interior da Terra",
                    "A energia química dos compostos orgânicos",
                    "A energia solar",
                    "A energia cinética do vento"
                ],
                correctAnswer: "c",
                feedback: "Correto! A energia solar é a fonte primária de energia para a maioria dos ecossistemas terrestres, sendo capturada pelos produtores através da fotossíntese e transferida ao longo da cadeia alimentar."
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
