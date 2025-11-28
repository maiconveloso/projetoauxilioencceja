// Dados dos desafios - Perguntas sobre Pré-História e Primeiras Civilizações
        const challenges = [
            {
                question: "Qual período da pré-história é caracterizado pelo surgimento da agricultura e da domesticação de animais?",
                options: [
                    "Paleolítico",
                    "Neolítico",
                    "Mesolítico",
                    "Idade dos Metais"
                ],
                correctAnswer: "b",
                feedback: "O Neolítico, também conhecido como Idade da Pedra Polida, foi marcado pela Revolução Agrícola, quando os seres humanos começaram a cultivar plantas e domesticar animais, abandonando o nomadismo."
            },
            {
                question: "Qual foi a principal invenção que permitiu aos humanos do Paleolítico controlar o fogo?",
                options: [
                    "Machado de pedra",
                    "Arco e flecha",
                    "Técnica de fricção",
                    "Lente de aumento"
                ],
                correctAnswer: "c",
                feedback: "A técnica de fricção, que envolve esfregar dois pedaços de madeira até gerar calor suficiente para produzir fogo, foi uma das primeiras formas de controle do fogo pelos humanos pré-históricos."
            },
            {
                question: "As pinturas rupestres encontradas em cavernas como Lascaux, na França, e Altamira, na Espanha, datam de qual período?",
                options: [
                    "Paleolítico Superior",
                    "Neolítico",
                    "Idade do Bronze",
                    "Idade do Ferro"
                ],
                correctAnswer: "a",
                feedback: "As famosas pinturas rupestres de Lascaux e Altamira foram criadas durante o Paleolítico Superior, há aproximadamente 15.000 a 17.000 anos, representando principalmente animais e cenas de caça."
            },
            {
                question: "Qual das seguintes características NÃO está associada às primeiras civilizações da Mesopotâmia?",
                options: [
                    "Desenvolvimento da escrita cuneiforme",
                    "Construção de zigurates",
                    "Criação do Código de Hamurabi",
                    "Invenção do papel"
                ],
                correctAnswer: "d",
                feedback: "O papel foi inventado na China por volta de 105 d.C., muito tempo após o surgimento das civilizações mesopotâmicas. As outras opções são características marcantes das civilizações da Mesopotâmia."
            },
            {
                question: "O que caracteriza a Revolução Urbana ocorrida no quarto milênio a.C.?",
                options: [
                    "A migração das pessoas do campo para as cidades",
                    "A construção de muralhas defensivas",
                    "O surgimento de cidades planejadas com centros administrativos",
                    "O desenvolvimento de sistemas de transporte público"
                ],
                correctAnswer: "c",
                feedback: "A Revolução Urbana foi marcada pelo surgimento das primeiras cidades, que eram centros administrativos, religiosos e econômicos, com planejamento urbano básico e divisão social do trabalho."
            },
            {
                question: "Qual foi a primeira civilização a desenvolver um sistema de escrita alfabética?",
                options: [
                    "Egípcios",
                    "Fenícios",
                    "Mesopotâmicos",
                    "Gregos"
                ],
                correctAnswer: "b",
                feedback: "Os fenícios desenvolveram o primeiro alfabeto por volta de 1050 a.C., composto por 22 consoantes. Este sistema foi posteriormente adaptado pelos gregos, que adicionaram as vogais."
            },
            {
                question: "Qual das seguintes inovações foi fundamental para a transição do Paleolítico para o Neolítico?",
                options: [
                    "Criação de ferramentas de metal",
                    "Desenvolvimento da cerâmica",
                    "Domesticação de plantas e animais",
                    "Invenção da roda"
                ],
                correctAnswer: "c",
                feedback: "A domesticação de plantas e animais foi a principal inovação que marcou a transição do Paleolítico para o Neolítico, permitindo que os humanos se tornassem sedentários e formassem as primeiras comunidades agrícolas."
            },
            {
                question: "Qual civilização antiga é creditada com a criação dos primeiros sistemas de irrigação em larga escala?",
                options: [
                    "Egípcia",
                    "Mesopotâmica",
                    "Harappa (Vale do Indo)",
                    "Chinesa"
                ],
                correctAnswer: "b",
                feedback: "Os mesopotâmicos desenvolveram sofisticados sistemas de irrigação para controlar as cheias dos rios Tigre e Eufrates, permitindo a agricultura em larga escala e o desenvolvimento de cidades-estado."
            },
            {
                question: "O que eram os megálitos encontrados em diversas partes da Europa durante o Neolítico?",
                options: [
                    "Grandes estruturas de pedra usadas como túmulos ou templos",
                    "Ferramentas de caça gigantes",
                    "Esculturas representando deuses",
                    "Marcadores de território tribais"
                ],
                correctAnswer: "a",
                feedback: "Os megálitos eram grandes estruturas de pedra construídas durante o Neolítico, incluindo menires (pedras isoladas), dólmens (túmulos) e círculos de pedra como Stonehenge, provavelmente usados para fins religiosos ou como túmulos coletivos."
            },
            {
                question: "Qual foi a principal consequência da descoberta da metalurgia durante a Idade dos Metais?",
                options: [
                    "O fim das sociedades nômades",
                    "A criação de ferramentas mais eficientes e armas mais resistentes",
                    "O desenvolvimento da escrita",
                    "A formação dos primeiros impérios"
                ],
                correctAnswer: "b",
                feedback: "A metalurgia permitiu a criação de ferramentas mais eficientes para agricultura e construção, além de armas mais resistentes, o que resultou em maior produtividade e em mudanças significativas nas relações de poder entre as comunidades."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 15 * 60; 
        
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