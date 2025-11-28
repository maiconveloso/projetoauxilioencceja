// Dados dos desafios - Perguntas sobre Brasil Colonial e Imperial
        const challenges = [
            {
                question: "Qual foi o principal sistema econômico implementado no Brasil durante o período colonial?",
                options: [
                    "Industrialização",
                    "Mineração",
                    "Plantation",
                    "Extrativismo vegetal"
                ],
                correctAnswer: "c",
                feedback: "O sistema de plantation foi a base da economia colonial brasileira, caracterizado por grandes latifúndios monocultores, mão de obra escrava e produção para exportação."
            },
            {
                question: "Qual foi o primeiro ciclo econômico do Brasil Colonial?",
                options: [
                    "Cana-de-açúcar",
                    "Ouro",
                    "Café",
                    "Pau-brasil"
                ],
                correctAnswer: "d",
                feedback: "O pau-brasil foi o primeiro produto explorado pelos portugueses no Brasil, dando início à colonização. Posteriormente, a cana-de-açúcar se tornou a principal atividade econômica."
            },
            {
                question: "Qual tratado estabeleceu a divisão do mundo entre Portugal e Espanha antes da chegada dos portugueses ao Brasil?",
                options: [
                    "Tratado de Tordesilhas",
                    "Tratado de Madri",
                    "Tratado de Santo Ildefonso",
                    "Tratado de Badajoz"
                ],
                correctAnswer: "a",
                feedback: "O Tratado de Tordesilhas, assinado em 1494, estabeleceu uma linha imaginária a 370 léguas a oeste de Cabo Verde, dividindo as terras recém-descobertas entre Portugal e Espanha."
            },
            {
                question: "Qual movimento ocorrido em Minas Gerais em 1789 é considerado precursor da independência do Brasil?",
                options: [
                    "Revolta dos Malês",
                    "Inconfidência Mineira",
                    "Revolução Farroupilha",
                    "Guerra dos Mascates"
                ],
                correctAnswer: "b",
                feedback: "A Inconfidência Mineira foi um movimento de elite que pretendia proclamar a independência do Brasil e estabelecer uma república, sendo liderada por Joaquim José da Silva Xavier, o Tiradentes."
            },
            {
                question: "Quem foi o regente do Brasil durante o período em que Dom Pedro I retornou a Portugal?",
                options: [
                    "José Bonifácio",
                    "Marquês de Barbacena",
                    "Diogo Antônio Feijó",
                    "Andrada Machado"
                ],
                correctAnswer: "c",
                feedback: "Diogo Antônio Feijó foi um dos regentes do Brasil durante o Período Regencial (1831-1840), que ocorreu após a abdicação de Dom Pedro I e antes da maioridade de Dom Pedro II."
            },
            {
                question: "Qual lei, promulgada em 1888, extinguiu a escravidão no Brasil?",
                options: [
                    "Lei do Ventre Livre",
                    "Lei dos Sexagenários",
                    "Lei Áurea",
                    "Lei de Terras"
                ],
                correctAnswer: "c",
                feedback: "A Lei Áurea, sancionada em 13 de maio de 1888 pela Princesa Isabel, extinguiu a escravidão no Brasil, libertando todos os escravos ainda existentes no país."
            },
            {
                question: "Qual foi a principal consequência da vinda da Corte Portuguesa para o Brasil em 1808?",
                options: [
                    "Abertura dos portos às nações amigas",
                    "Proclamação da Independência",
                    "Abolição da escravatura",
                    "Instalação da primeira indústria"
                ],
                correctAnswer: "a",
                feedback: "Com a vinda da Corte Portuguesa para o Brasil, D. João VI decretou a Abertura dos Portos às Nações Amigas, rompendo com o pacto colonial e permitindo o comércio com outras nações além de Portugal."
            },
            {
                question: "Qual foi o conflito que envolveu o Brasil contra a Confederação Argentina, o Uruguai e o Paraguai?",
                options: [
                    "Guerra dos Farrapos",
                    "Guerra do Paraguai",
                    "Revolta da Armada",
                    "Guerra de Canudos"
                ],
                correctAnswer: "b",
                feedback: "A Guerra do Paraguai (1864-1870) foi o maior conflito armado da história da América do Sul, envolvendo o Brasil, Argentina e Uruguai contra o Paraguai de Solano López."
            },
            {
                question: "Qual processo político marcou a transição do Brasil Império para a República?",
                options: [
                    "Revolução Constitucionalista",
                    "Proclamação da República",
                    "Golpe da Maioridade",
                    "Abdicação de Dom Pedro I"
                ],
                correctAnswer: "b",
                feedback: "A Proclamação da República, ocorrida em 15 de novembro de 1889, liderada pelo Marechal Deodoro da Fonseca, marcou o fim do Império e o início da República no Brasil."
            },
            {
                question: "Qual sistema político foi adotado pelo Brasil durante o Segundo Reinado (1840-1889)?",
                options: [
                    "Parlamentarismo",
                    "Presidencialismo",
                    "Monarquia absolutista",
                    "Ditadura militar"
                ],
                correctAnswer: "a",
                feedback: "Durante o Segundo Reinado, o Brasil adotou o parlamentarismo, caracterizado pelo Poder Moderador do imperador e um sistema de gabinetes ministeriais que governavam com o apoio do Parlamento."
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