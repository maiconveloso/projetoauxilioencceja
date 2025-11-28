// Dados dos desafios - Perguntas sobre Geopolítica e Relações Internacionais
        const challenges = [
            {
                question: "Qual organização internacional foi criada após a Segunda Guerra Mundial com o objetivo de manter a paz e a segurança mundial?",
                options: [
                    "Organização das Nações Unidas (ONU)",
                    "Organização do Tratado do Atlântico Norte (OTAN)",
                    "União Europeia (UE)",
                    "Organização Mundial do Comércio (OMC)"
                ],
                correctAnswer: "a",
                feedback: "A Organização das Nações Unidas (ONU) foi fundada em 1945, após a Segunda Guerra Mundial, com o objetivo principal de manter a paz e a segurança internacional, promover o desenvolvimento social e econômico e proteger os direitos humanos."
            },
            {
                question: "O conflito entre Rússia e Ucrânia, iniciado em 2022, tem raízes históricas e geopolíticas. Qual das alternativas NÃO representa uma causa direta desse conflito?",
                options: [
                    "A expansão da OTAN para o Leste Europeu",
                    "As disputas pela península da Crimeia",
                    "As divergências sobre o fornecimento de gás natural",
                    "A adesão da Ucrânia à União Europeia em 2021"
                ],
                correctAnswer: "d",
                feedback: "A Ucrânia não aderiu à União Europeia em 2021. Embora tenha assinado um acordo de associação com a UE em 2014, o processo de adesão plena ainda está em andamento. As outras alternativas representam fatores que contribuíram para o conflito entre Rússia e Ucrânia."
            },
            {
                question: "A 'Nova Rota da Seda', também conhecida como Iniciativa do Cinturão e Rota, é um projeto estratégico liderado por qual país?",
                options: [
                    "Rússia",
                    "Estados Unidos",
                    "China",
                    "Índia"
                ],
                correctAnswer: "c",
                feedback: "A 'Nova Rota da Seda' é um projeto estratégico liderado pela China, lançado em 2013, que visa conectar a Ásia com a Europa e a África através de infraestruturas de transporte, energia e comunicação, fortalecendo a influência econômica e política chinesa globalmente."
            },
            {
                question: "O Acordo de Paris sobre Mudança Climática, estabelecido em 2015, tem como objetivo principal:",
                options: [
                    "Proibir o uso de combustíveis fósseis até 2030",
                    "Limitar o aquecimento global a bem abaixo de 2°C acima dos níveis pré-industriais",
                    "Criar um fundo multibilionário para países afetados pelo aquecimento global",
                    "Estabelecer sanções econômicas a países que não cumpram metas ambientais"
                ],
                correctAnswer: "b",
                feedback: "O principal objetivo do Acordo de Paris é limitar o aquecimento global a bem abaixo de 2°C, preferencialmente 1,5°C, acima dos níveis pré-industriais. Para isso, os países signatários estabelecem suas próprias metas de redução de emissões de gases de efeito estufa."
            },
            {
                question: "Qual bloco econômico regional é composto por Argentina, Brasil, Paraguai e Uruguai, e recentemente incorporou a Bolívia como membro pleno?",
                options: [
                    "Pacto Andino",
                    "Mercosul",
                    "Comunidade de Estados Latino-Americanos e Caribenhos (CELAC)",
                    "Aliança do Pacífico"
                ],
                correctAnswer: "b",
                feedback: "O Mercosul (Mercado Comum do Sul) é composto originalmente por Argentina, Brasil, Paraguai e Uruguai. A Bolívia está em processo de adesão e se tornou membro pleno em 2023, após anos de negociações."
            },
            {
                question: "O conflito na região de Nagorno-Karabakh, entre Armênia e Azerbaijão, está relacionado principalmente a:",
                options: [
                    "Disputas por reservas de petróleo",
                    "Questões étnicas e territoriais",
                    "Diferenças religiosas entre cristãos e muçulmanos",
                    "Rivalidades geopolíticas entre Rússia e Turquia"
                ],
                correctAnswer: "b",
                feedback: "O conflito em Nagorno-Karabakh está centrado em questões étnicas e territoriais. A região, majoritariamente habitada por armênios, é reconhecida internacionalmente como parte do Azerbaijão, mas declarou independência na década de 1990, gerando tensões e guerras entre os dois países."
            },
            {
                question: "O Brexit, termo que se refere à saída do Reino Unido da União Europeia, ocorreu em qual ano?",
                options: [
                    "2016",
                    "2018",
                    "2020",
                    "2022"
                ],
                correctAnswer: "c",
                feedback: "O Brexit foi formalmente concluído em 31 de janeiro de 2020, quando o Reino Unido deixou oficialmente a União Europeia. O referendo sobre a saída ocorreu em 2016, mas o processo de negociação e implementação durou cerca de quatro anos."
            },
            {
                question: "A Organização dos Países Exportadores de Petróleo (OPEP) é um cartel que tem grande influência no mercado energético global. Qual país NÃO é membro da OPEP?",
                options: [
                    "Arábia Saudita",
                    "Rússia",
                    "Venezuela",
                    "Nigéria"
                ],
                correctAnswer: "b",
                feedback: "A Rússia não é membro da OPEP, mas participa do grupo OPEP+, que inclui países não membros da OPEP que cooperam na redução da produção de petróleo. Os outros países listados (Arábia Saudita, Venezuela e Nigéria) são membros fundadores ou ativos da OPEP."
            },
            {
                question: "O conflito entre Israel e Palestina é uma das questões geopolíticas mais complexas do Oriente Médio. Qual evento marcou o início da ocupação israelense da Faixa de Gaza e da Cisjordânia?",
                options: [
                    "Guerra dos Seis Dias (1967)",
                    "Guerra do Yom Kippur (1973)",
                    "Primeira Intifada (1987)",
                    "Acordos de Oslo (1993)"
                ],
                correctAnswer: "a",
                feedback: "A ocupação israelense da Faixa de Gaza e da Cisjordânia começou após a Guerra dos Seis Dias em 1967, quando Israel derrotou as forças árabes e ocupou esses territórios, entre outros. Desde então, a questão da ocupação e dos assentamentos israelenses tem sido central no conflito."
            },
            {
                question: "A crise migratória na Europa, que se intensificou a partir de 2015, foi impulsionada principalmente por:",
                options: [
                    "Conflitos no Oriente Médio e na África",
                    "Mudanças climáticas no Mediterrâneo",
                    "Crises econômicas na América Latina",
                    "Políticas de imigração restritivas dos países europeus"
                ],
                correctAnswer: "a",
                feedback: "A crise migratória na Europa foi impulsionada principalmente por conflitos no Oriente Médio (especialmente a Guerra Civil Síria) e em países africanos, que forçaram milhões de pessoas a buscar refúgio na Europa. Outros fatores como instabilidade política e pobreza também contribuíram para esse fluxo migratório."
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