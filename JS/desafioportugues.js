// Dados dos desafios - Perguntas de Português (Erros Gramaticais)
        const challenges = [
            {
                question: "Qual é o erro gramatical na frase: 'O livro que você me emprestou foi muito interessante.'?",
                options: [
                    "Nenhum erro",
                    "Erro na concordância verbal",
                    "Erro na crase",
                    "Erro na regência verbal"
                ],
                correctAnswer: "a",
                feedback: "A frase está correta. Não há erros gramaticais."
            },
            {
                question: "Identifique o erro na frase: 'A flores são bonitas.'",
                options: [
                    "Erro de acentuação",
                    "Erro na crase",
                    "Erro de concordância nominal",
                    "Erro na regência verbal"
                ],
                correctAnswer: "c",
                feedback: "Incorreto! O erro é de concordância nominal. O artigo 'a' é feminino singular, mas o substantivo 'flores' é feminino plural. A forma correta seria: 'As flores são bonitas'."
            },
            {
                question: "Na frase 'Ela foi à praia com seus amigos', o que significa o termo 'à'?",
                options: [
                    "Contração de 'a' com 'a'",
                    "Contração de 'a' com 'o'",
                    "Contração de 'de' com 'a'",
                    "Nenhuma das anteriores"
                ],
                correctAnswer: "b",
                feedback: "Incorreto! O termo 'à' é a contração da preposição 'a' com o artigo definido feminino 'a'."
            },
            {
                question: "Qual das seguintes frases apresenta erro de regência verbal?",
                options: [
                    "Eu gosto de ler livros.",
                    "Ela precisa de ajuda.",
                    "Ele confia em você.",
                    "Eu duvido de que ele venha."
                ],
                correctAnswer: "d",
                feedback: "Incorreto! O verbo 'duvidar' não exige preposição. A forma correta seria: 'Eu duvido que ele venha'."
            },
            {
                question: "Na frase 'Eu vou ao mercado', o que significa o termo 'ao'?",
                options: [
                    "Contração de 'a' com 'a'",
                    "Contração de 'a' com 'o'",
                    "Contração de 'de' com 'o'",
                    "Nenhuma das anteriores"
                ],
                correctAnswer: "b",
                feedback: "Incorreto! O termo 'ao' é a contração da preposição 'a' com o artigo definido masculino 'o'."
            },
            {
                question: "Qual das seguintes frases apresenta erro de crase?",
                options: [
                    "Vou à escola amanhã.",
                    "Ela está em casa.",
                    "Ele foi ao médico.",
                    "Eu fui ao casa dela."
                ],
                correctAnswer: "d",
                feedback: "Incorreto! O erro é de crase. O termo correto seria 'à casa', pois 'casa' é feminino e precedido de verbo de movimento."
            },
            {
                question: "Qual das seguintes frases está correta?",
                options: [
                    "O livro são interessantes.",
                    "Os livros é interessante.",
                    "O livro é interessante.",
                    "A livro é interessante."
                ],
                correctAnswer: "c",
                feedback: "Incorreto! A frase correta é: 'O livro é interessante.', pois o sujeito 'livro' é singular e concorda com o verbo 'é'."
            },
            {
                question: "Na frase 'Ele se preocupa com a prova', o pronome 'se' está:",
                options: [
                    "Errado, pois deveria ser 'me'",
                    "Correto, indicando reflexividade",
                    "Errado, pois deveria ser 'te'",
                    "Correto, mas não é necessário"
                ],
                correctAnswer: "b",
                feedback: "Incorreto! O pronome 'se' está usado corretamente para indicar reflexividade no verbo 'preocupar-se'."
            },
            {
                question: "Qual das seguintes frases apresenta erro de acentuação?",
                options: [
                    "Você vai à festa?",
                    "Ela está estudando.",
                    "O país é grande.",
                    "Ela esta estudando."
                ],
                correctAnswer: "d",
                feedback: "Incorreto! O erro é de acentuação. O verbo 'estar' exige acento agudo: 'Ela está estudando'."
            },
            {
                question: "Qual das seguintes frases está incorreta?",
                options: [
                    "Eu e meu irmão vamos viajar.",
                    "Ela e eu fomos convidados.",
                    "Meu irmão e eu fomos ao cinema.",
                    "Eu e meu irmão foi viajar."
                ],
                correctAnswer: "d",
                feedback: "Incorreto! O erro é de concordância verbal. O sujeito composto exige verbo no plural: 'Eu e meu irmão fomos viajar'."
            }
        ];
        
    // Variáveis de estado
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        let selectedOption = null;
        let timerInterval;
        let timeLeft = 15 * 60; // 15 minutos em segundos
        
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