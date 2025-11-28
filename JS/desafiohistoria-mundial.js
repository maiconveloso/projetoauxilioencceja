// Dados dos desafios - Perguntas sobre as Grandes Guerras e seus impactos
        const challenges = [
            {
                question: "Qual evento marcou o início da Primeira Guerra Mundial em 1914?",
                options: [
                    "Invasão da Polônia pela Alemanha",
                    "Atentado contra o arquiduque Francisco Ferdinando",
                    "Batalha de Stalingrado",
                    "Queda do Muro de Berlim"
                ],
                correctAnswer: "b",
                feedback: "Correto! O assassinato do arquiduque Francisco Ferdinando da Áustria-Hungria em Sarajevo em 28 de junho de 1914 foi o estopim da Primeira Guerra Mundial."
            },
            {
                question: "Quais foram os principais países da Tríplice Aliança durante a Primeira Guerra Mundial?",
                options: [
                    "França, Reino Unido e Rússia",
                    "Alemanha, Áustria-Hungria e Itália",
                    "Estados Unidos, China e Japão",
                    "Brasil, Argentina e Chile"
                ],
                correctAnswer: "b",
                feedback: "Correto! A Tríplice Aliança era formada inicialmente por Alemanha, Áustria-Hungria e Itália. Vale lembrar que a Itália mudou de lado em 1915, juntando-se à Tríplice Entente."
            },
            {
                question: "Qual tratado oficialmente encerrou a Primeira Guerra Mundial e impôs duras condições à Alemanha?",
                options: [
                    "Tratado de Versalhes",
                    "Tratado de Tordesilhas",
                    "Tratado de Paz de Westfália",
                    "Pacto de Varsóvia"
                ],
                correctAnswer: "a",
                feedback: "Correto! O Tratado de Versalhes, assinado em 1919, impôs pesadas reparações de guerra à Alemanha e é considerado um dos fatores que contribuíram para a Segunda Guerra Mundial."
            },
            {
                question: "Qual evento marcou o início da Segunda Guerra Mundial em 1939?",
                options: [
                    "Bombardeio de Pearl Harbor",
                    "Invasão da Polônia pela Alemanha",
                    "Batalha da Grã-Bretanha",
                    "Desembarque da Normandia"
                ],
                correctAnswer: "b",
                feedback: "Correto! A invasão da Polônia pela Alemanha nazista em 1º de setembro de 1939 marcou o início da Segunda Guerra Mundial, levando o Reino Unido e a França a declararem guerra à Alemanha."
            },
            {
                question: "Qual foi o principal resultado da Conferência de Yalta em 1945?",
                options: [
                    "A divisão da Alemanha em zonas de ocupação",
                    "A criação da Organização das Nações Unidas",
                    "O início da Guerra Fria",
                    "A rendição incondicional do Japão"
                ],
                correctAnswer: "a",
                feedback: "Correto! Na Conferência de Yalta, Churchill, Roosevelt e Stálin decidiram pela divisão da Alemanha em zonas de ocupação após sua derrota, além de estabelecerem planos para a reorganização da Europa pós-guerra."
            },
            {
                question: "Qual evento marcou a entrada dos Estados Unidos na Segunda Guerra Mundial?",
                options: [
                    "Invasão da França pela Alemanha",
                    "Bombardeio de Pearl Harbor pelo Japão",
                    "Assinatura do Pacto Tripartite",
                    "Queda de Paris"
                ],
                correctAnswer: "b",
                feedback: "Correto! O ataque japonês a Pearl Harbor em 7 de dezembro de 1941 levou os Estados Unidos a entrarem na Segunda Guerra Mundial, declarando guerra ao Japão e, posteriormente, à Alemanha e Itália."
            },
            {
                question: "Qual foi a principal consequência econômica das Grandes Guerras para o mundo?",
                options: [
                    "Fortalecimento do padrão-ouro",
                    "Consolidação do colonialismo europeu",
                    "Crise econômica global e ascensão dos EUA como potência",
                    "Unificação econômica europeia imediata"
                ],
                correctAnswer: "c",
                feedback: "Correto! As Grandes Guerras causaram uma profunda crise econômica global, enfraqueceram as potências europeias e fortaleceram a posição dos Estados Unidos como principal potência econômica mundial."
            },
            {
                question: "Qual organização internacional foi criada após a Segunda Guerra Mundial para manter a paz mundial?",
                options: [
                    "Liga das Nações",
                    "Organização das Nações Unidas (ONU)",
                    "União Europeia",
                    "OTAN (Organização do Tratado do Atlântico Norte)"
                ],
                correctAnswer: "b",
                feedback: "Correto! A Organização das Nações Unidas (ONU) foi fundada em 1945 para substituir a Liga das Nações e promover a paz, a cooperação internacional e os direitos humanos após as devastações da Segunda Guerra Mundial."
            },
            {
                question: "Qual foi o principal impacto social das Grandes Guerras na Europa?",
                options: [
                    "Fortalecimento das monarquias",
                    "Mudanças nos papéis de gênero e emancipação feminina",
                    "Aumento da população europeia",
                    "Expansão do colonialismo"
                ],
                correctAnswer: "b",
                feedback: "Correto! As Grandes Guerras provocaram profundas transformações sociais, incluindo mudanças nos papéis de gênero, com as mulheres assumindo novas responsabilidades no mercado de trabalho e conquistando maior autonomia e direitos políticos."
            },
            {
                question: "Qual evento marcou o fim da Segunda Guerra Mundial na Europa?",
                options: [
                    "Bombardeios atômicos em Hiroshima e Nagasaki",
                    "Rendição da Alemanha nazista em maio de 1945",
                    "Morte de Adolf Hitler",
                    "Libertação de Paris"
                ],
                correctAnswer: "b",
                feedback: "Correto! A Segunda Guerra Mundial na Europa terminou com a rendição incondicional da Alemanha nazista em 8 de maio de 1945, conhecido como Dia da Vitória na Europa."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 30 * 60; 
        
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
            
        // Adicionar classe de alerta quando faltar 5 minutos
            if (timeLeft <= 300) {
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