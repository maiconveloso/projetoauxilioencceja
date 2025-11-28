// Dados dos desafios - Perguntas de Química (Equações e Reações)
        const challenges = [
            {
                question: "Na equação não balanceada Fe + O₂ → Fe₂O₃, os coeficientes estequiométricos corretos para balanceá-la são:",
                options: [
                    "1, 1, 1",
                    "2, 3, 1",
                    "4, 3, 2",
                    "3, 2, 1"
                ],
                correctAnswer: "c",
                feedback: "Correto! Para balancear, precisamos de 4 átomos de Fe e 6 de O em ambos os lados. A equação 4Fe + 3O₂ → 2Fe₂O₃ atende a esse requisito, respeitando a Lei de Lavoisier."
            },
            {
                question: "A reação N₂ + 3H₂ → 2NH₃ é classificada como:",
                options: [
                    "Síntese ou combinação",
                    "Decomposição",
                    "Simples deslocamento",
                    "Dupla troca"
                ],
                correctAnswer: "a",
                feedback: "Correto! Reações de síntese (ou combinação) ocorrem quando duas ou mais substâncias simples formam uma substância composta, como no caso da formação da amônia (NH₃)."
            },
            {
                question: "A decomposição térmica do carbonato de cálcio (CaCO₃) é representada por qual equação?",
                options: [
                    "CaO + CO₂ → CaCO₃",
                    "CaCO₃ → CaO + CO₂",
                    "Ca + C + O₂ → CaCO₃",
                    "CaCO₃ + HCl → CaCl₂ + H₂O + CO₂"
                ],
                correctAnswer: "b",
                feedback: "Correto! Na decomposição, uma única substância composta se decompõe em duas ou mais substâncias simples. O carbonato de cálcio se decompõe em óxido de cálcio e dióxido de carbono."
            },
            {
                question: "Na reação Zn + 2HCl → ZnCl₂ + H₂, o zinco metálico desloca qual elemento?",
                options: [
                    "Cloro",
                    "Zinco",
                    "Hidrogênio",
                    "Nenhum elemento"
                ],
                correctAnswer: "c",
                feedback: "Correto! Esta é uma reação de simples deslocamento, onde um elemento mais reativo (zinco) substitui outro elemento menos reativo (hidrogênio) em um composto."
            },
            {
                question: "Qual equação abaixo representa uma reação de dupla troca?",
                options: [
                    "2H₂ + O₂ → 2H₂O",
                    "Zn + CuSO₄ → ZnSO₄ + Cu",
                    "AgNO₃ + NaCl → AgCl + NaNO₃",
                    "2HgO → 2Hg + O₂"
                ],
                correctAnswer: "c",
                feedback: "Correto! Em uma reação de dupla troca, dois compostos trocam íons entre si para formar dois novos compostos. Neste caso, os íons Ag⁺ e Na⁺ trocam de lugar."
            },
            {
                question: "A equação balanceada para a combustão completa do metano (CH₄) é:",
                options: [
                    "CH₄ + O₂ → CO₂ + H₂O",
                    "CH₄ + 2O₂ → CO₂ + 2H₂O",
                    "2CH₄ + 3O₂ → 2CO₂ + 4H₂O",
                    "CH₄ + O₂ → CO + H₂O"
                ],
                correctAnswer: "b",
                feedback: "Correto! Na combustão completa, um hidrocarboneto reage com oxigênio para produzir dióxido de carbono e água. A equação balanceada é CH₄ + 2O₂ → CO₂ + 2H₂O."
            },
            {
                question: "Para balancear a equação Al + H₂SO₄ → Al₂(SO₄)₃ + H₂, os coeficientes corretos são:",
                options: [
                    "1, 3, 1, 3",
                    "2, 3, 1, 3",
                    "2, 3, 1, 2",
                    "1, 2, 1, 1"
                ],
                correctAnswer: "b",
                feedback: "Correto! A equação balanceada é 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂. É necessário prestar atenção aos íons poliatômicos como o sulfato (SO₄) que se comportam como uma unidade."
            },
            {
                question: "A reação que ocorre em uma pilha, onde um metal oxida e outro íon se reduz, é um exemplo de:",
                options: [
                    "Síntese",
                    "Decomposição",
                    "Simples deslocamento",
                    "Dupla troca"
                ],
                correctAnswer: "c",
                feedback: "Correto! Em uma pilha, ocorre uma reação de oxirredução que é classicamente representada como uma reação de simples deslocamento, onde um metal doa elétrons (oxidação) e um cátion os recebe (redução)."
            },
            {
                question: "Na equação 2Mg + O₂ → 2MgO, os produtos são:",
                options: [
                    "Mg e O₂",
                    "Apenas Mg",
                    "Apenas O₂",
                    "MgO"
                ],
                correctAnswer: "d",
                feedback: "Correto! Em uma equação química, os reagentes (substâncias que reagem) ficam à esquerda da seta, e os produtos (substâncias formadas) ficam à direita. Neste caso, o óxido de magnésio (MgO) é o produto."
            },
            {
                question: "O princípio fundamental que justifica a necessidade de balancear equações químicas é a:",
                options: [
                    "Lei da Ação das Massas",
                    "Lei da Conservação da Massa",
                    "Lei dos Gases Ideais",
                    "Lei de Coulomb"
                ],
                correctAnswer: "b",
                feedback: "Correto! A Lei da Conservação da Massa, estabelecida por Lavoisier, afirma que na natureza nada se cria, nada se perde, tudo se transforma. Por isso, o número de átomos de cada elemento deve ser o mesmo nos reagentes e nos produtos."
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