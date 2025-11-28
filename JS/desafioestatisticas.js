// Dados dos desafios - Perguntas de Estatística
        const challenges = [
            {
                question: "Para o conjunto de dados {8, 10, 12, 15, 20}, qual é a mediana?",
                image: null,
                options: ["10", "12", "15", "13"],
                correctAnswer: "b" 
            },
            {
                question: "Uma pesquisa sobre o número de livros lidos por mês em um grupo de 5 pessoas resultou em: {2, 2, 3, 4, 5}. Qual é a moda desse conjunto?",
                image: null,
                options: ["2", "3", "4", "5"],
                correctAnswer: "a" 
            },
            {
                question: "O gráfico de barras abaixo mostra as vendas semanais de uma loja. Qual foi a média de vendas na semana?",
                image: "grafico-barras-vendas.png", // Crie esta imagem
                options: ["R$ 400,00", "R$ 500,00", "R$ 600,00", "R$ 700,00"],
                correctAnswer: "b" 
            },
            {
                question: "Qual é a média aritmética do conjunto de números {4, 6, 8, 10}?",
                image: null,
                options: ["6", "7", "8", "9"],
                correctAnswer: "b" 
            },
            {
                question: "O gráfico de linhas representa a temperatura média de uma cidade ao longo do dia. Em qual horário houve a maior variação de temperatura em relação à hora anterior?",
                image: "grafico-linhas-temperatura.png", // Crie esta imagem
                options: ["Das 8h às 10h", "Das 10h às 12h", "Das 12h às 14h", "Das 14h às 16h"],
                correctAnswer: "c"
            },
            {
                question: "Para o conjunto de dados {5, 7, 9, 11, 13, 15}, qual é a mediana?",
                image: null,
                options: ["9", "10", "11", "12"],
                correctAnswer: "b" 
            },
            {
                question: "Um grupo de amigos tem as seguintes idades: {18, 20, 20, 22, 25, 30}. Qual a moda desse grupo?",
                image: null,
                options: ["18", "20", "22", "Não existe moda"],
                correctAnswer: "b" 
            },
            {
                question: "O gráfico de pizza mostra a distribuição das preferências de música em uma turma. Se a turma tem 40 alunos, quantos preferem Rock?",
                image: "grafico-pizza-musica.png", // Crie esta imagem (Rock = 25%)
                options: ["8 alunos", "10 alunos", "15 alunos", "20 alunos"],
                correctAnswer: "b"
            },
            {
                question: "Em um conjunto de dados, a soma de todos os valores é 120 e há 8 valores. Qual é a média?",
                image: null,
                options: ["10", "12", "15", "20"],
                correctAnswer: "c" 
            },
            {
                question: "O gráfico mostra o número de visitantes em um parque durante a semana. Qual dia teve o dobro de visitantes em comparação à terça-feira?",
                image: "grafico-barras-parque.png", // Crie esta imagem (Terça=50, Sábado=100)
                options: ["Quarta-feira", "Quinta-feira", "Sábado", "Domingo"],
                correctAnswer: "c" 
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
        const imageEl = document.getElementById('questionImage');
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
            
        // Controla a exibição da imagem
            if (challenge.image) {
                imageEl.src = challenge.image;
                imageEl.style.display = 'block';
            } else {
                imageEl.style.display = 'none';
            }
            
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
                feedbackEl.innerHTML = '<strong>Correto!</strong> Parabéns, você acertou esta questão.';
                score++;
            } else {
                feedbackEl.classList.add('incorrect');
                feedbackEl.classList.remove('correct');
                feedbackEl.innerHTML = `<strong>Incorreto!</strong> A resposta correta é a opção ${challenge.correctAnswer.toUpperCase()}.`;
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