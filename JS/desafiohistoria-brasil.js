// Dados dos desafios - Perguntas sobre a República Brasileira
        const challenges = [
            {
                question: "Em que ano foi proclamada a República no Brasil?",
                options: [
                    "1870",
                    "1889",
                    "1891",
                    "1900"
                ],
                correctAnswer: "b",
                feedback: "A República foi proclamada em 15 de novembro de 1889, por Marechal Deodoro da Fonseca, que substituiu o Império."
            },
            {
                question: "Quem foi o primeiro presidente do Brasil?",
                options: [
                    "Floriano Peixoto",
                    "Marechal Deodoro da Fonseca",
                    "Prudente de Morais",
                    "Campos Salles"
                ],
                correctAnswer: "b",
                feedback: "Marechal Deodoro da Fonseca foi o primeiro presidente do Brasil, governando de 1889 a 1891, durante o período conhecido como República da Espada."
            },
            {
                question: "O período conhecido como 'República do Café com Leite' foi caracterizado pelo domínio político de quais estados?",
                options: [
                    "Rio de Janeiro e Minas Gerais",
                    "São Paulo e Rio de Janeiro",
                    "São Paulo e Minas Gerais",
                    "Minas Gerais e Bahia"
                ],
                correctAnswer: "c",
                feedback: "A 'República do Café com Leite' (1889-1930) foi marcada pela alternância de poder entre as oligarquias de São Paulo (maior produtor de café) e Minas Gerais (maior produtor de leite)."
            },
            {
                question: "Em que contexto histórico ocorreu a Revolução de 1930?",
                options: [
                    "Crise do café e disputa eleitoral",
                    "Guerra contra países vizinhos",
                    "Abolição da escravatura",
                    "Independência do Brasil"
                ],
                correctAnswer: "a",
                feedback: "A Revolução de 1930 ocorreu em um contexto de crise econômica do café e disputa eleitoral entre Júlio Prestes e Getúlio Vargas, resultando no fim da República Oligárquica."
            },
            {
                question: "Getúlio Vargas governou o Brasil em dois períodos distintos. Quais foram eles?",
                options: [
                    "1930-1934 e 1945-1951",
                    "1930-1945 e 1951-1954",
                    "1934-1937 e 1945-1951",
                    "1937-1945 e 1951-1954"
                ],
                correctAnswer: "b",
                feedback: "Getúlio Vargas governou o Brasil em dois períodos: de 1930 a 1945 (Governo Provisório, Estado Novo) e de 1951 a 1954, quando se elegeu democraticamente presidente."
            },
            {
                question: "O que foi o Estado Novo no Brasil?",
                options: [
                    "Um período de democratização do país",
                    "Uma ditadura instaurada por Getúlio Vargas",
                    "Uma reforma administrativa do Estado",
                    "Um programa de desenvolvimento econômico"
                ],
                correctAnswer: "b",
                feedback: "O Estado Novo (1937-1945) foi uma ditadura instaurada por Getúlio Vargas, caracterizada pela centralização do poder, supressão de direitos políticos e perseguição a opositores."
            },
            {
                question: "Qual presidente ficou conhecido como o 'pai dos pobres' e construiu a primeira grande siderúrgica do Brasil?",
                options: [
                    "Juscelino Kubitschek",
                    "Getúlio Vargas",
                    "João Goulart",
                    "Eurico Gaspar Dutra"
                ],
                correctAnswer: "b",
                feedback: "Getúlio Vargas ficou conhecido como o 'pai dos pobres' devido às suas políticas trabalhistas e sociais, e durante seu governo foi construída a Companhia Siderúrgica Nacional (CSN)."
            },
            {
                question: "O Plano de Metas, com o lema 'Cinquenta anos em cinco', foi implementado por qual presidente?",
                options: [
                    "Juscelino Kubitschek",
                    "Getúlio Vargas",
                    "João Goulart",
                    "Jânio Quadros"
                ],
                correctAnswer: "a",
                feedback: "O Plano de Metas foi implementado por Juscelino Kubitschek (1956-1961) com o objetivo de promover o desenvolvimento industrial e a modernização do Brasil, incluindo a construção de Brasília."
            },
            {
                question: "O Regime Militar no Brasil teve início em qual ano?",
                options: [
                    "1961",
                    "1962",
                    "1963",
                    "1964"
                ],
                correctAnswer: "d",
                feedback: "O Regime Militar teve início em 31 de março de 1964, com um golpe militar que depôs o presidente João Goulart, dando início a um período que durou até 1985."
            },
            {
                question: "Qual foi o primeiro presidente eleito diretamente após o fim do Regime Militar?",
                options: [
                    "José Sarney",
                    "Tancredo Neves",
                    "Fernando Collor",
                    "Itamar Franco"
                ],
                correctAnswer: "c",
                feedback: "Fernando Collor foi o primeiro presidente eleito diretamente após o fim do Regime Militar, em 1989, marcando a redemocratização do Brasil."
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