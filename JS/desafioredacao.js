// Definindo o tempo total em segundos (60 minutos)
        const TOTAL_TIME = 60 * 60;
        
        let timeLeft = TOTAL_TIME;
        let timeElapsed = 0;
        let timerInterval;
        let autoSaveInterval;
        let startTime = Date.now();
        
    // Elementos DOM
        const essayText = document.getElementById('essayText');
        const wordCountEl = document.getElementById('wordCount');
        const progressBarEl = document.getElementById('progressBar');
        const currentStatusEl = document.getElementById('currentStatus');
        const timeElapsedEl = document.getElementById('timeElapsed');
        const saveBtn = document.getElementById('saveBtn');
        const submitBtn = document.getElementById('submitBtn');
        const completionModal = document.getElementById('completionModal');
        const timeUpModal = document.getElementById('timeUpModal');
        const timerEl = document.getElementById('timer');
        const saveNotification = document.getElementById('saveNotification');
        
    // Inicialização
        document.addEventListener('DOMContentLoaded', function() {

        // Primeiro, carrega o rascunho se existir
            loadDraft();
            
        // Garante que o cronômetro sempre comece com 60 minutos
            timeLeft = TOTAL_TIME;
            timeElapsed = 0;
            
        // Inicia o cronômetro e outras funcionalidades
            startTimer();
            startAutoSave();
            
        // Atualiza a exibição inicial
            updateTimerDisplay();
            updateTimeElapsed();
        });
        
    // Atualizar contagem de palavras e linhas
        essayText.addEventListener('input', updateWordCount);
        
    // Salvar rascunho
        saveBtn.addEventListener('click', saveDraft);
        
    // Enviar redação
        submitBtn.addEventListener('click', submitEssay);
        
    // Reiniciar
        document.getElementById('restartBtn').addEventListener('click', restartEssay);
        document.getElementById('restartBtnTimeUp').addEventListener('click', restartEssay);
        
    // Funções
        function updateWordCount() {
            const text = essayText.value;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            const lines = text.split('\n').length;
            
            wordCountEl.textContent = `Palavras: ${words} | Linhas: ${lines}`;
            
        // Atualizar status
            if (words > 0) {
                currentStatusEl.textContent = "Status: Escrevendo";
            } else {
                currentStatusEl.textContent = "Status: Aguardando";
            }
        }
        
        function startTimer() {

        // Limpa qualquer intervalo existente para evitar múltiplos timers
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            
            updateTimerDisplay();
            
            timerInterval = setInterval(() => {
                timeLeft--;
                timeElapsed++;
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    clearInterval(autoSaveInterval);
                    saveDraft();
                    showTimeUpModal();
                    return;
                }
                
                updateTimerDisplay();
                updateTimeElapsed();
            }, 1000);
        }
        
        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
        // Atualizar barra de progresso
            const progress = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;
            progressBarEl.style.width = `${progress}%`;
            
        // Adicionar classe de alerta quando faltar 5 minutos
            if (timeLeft <= 300) {
                timerEl.classList.add('timer-warning');
            } else {
                timerEl.classList.remove('timer-warning');
            }
        }
        
        function updateTimeElapsed() {
            const minutes = Math.floor(timeElapsed / 60);
            const seconds = timeElapsed % 60;
            
            timeElapsedEl.textContent = `Tempo decorrido: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        function startAutoSave() {

        // Limpa qualquer intervalo existente para evitar múltiplos autosaves
            if (autoSaveInterval) {
                clearInterval(autoSaveInterval);
            }
            
            autoSaveInterval = setInterval(() => {
                saveDraft(true); 
            }, 30000); 
        }
        
        function saveDraft(isAuto = false) {
            const draft = {
                text: essayText.value,
                timestamp: Date.now(),
                timeLeft: timeLeft,
                timeElapsed: timeElapsed
            };
            
            localStorage.setItem('essayDraft', JSON.stringify(draft));
            
            if (!isAuto) {
                showSaveNotification();
            }
        }
        
        function loadDraft() {
            const draftData = localStorage.getItem('essayDraft');
            
            if (draftData) {
                const draft = JSON.parse(draftData);
                
            // Verifica se o rascunho é recente (menos de 24 horas)
                const now = Date.now();
                const draftAge = now - draft.timestamp;
                const maxAge = 24 * 60 * 60 * 1000; 
                
                if (draftAge < maxAge) {
                    essayText.value = draft.text;
                    updateWordCount();
                    currentStatusEl.textContent = "Status: Rascunho carregado";
                }
            }
        }
        
        function showSaveNotification() {
            saveNotification.style.display = 'block';
            
            setTimeout(() => {
                saveNotification.style.display = 'none';
            }, 3000);
        }
        
        function submitEssay() {

        // Verifica se o texto está vazio
            if (!essayText.value.trim()) {
                alert('Por favor, Escreva sua Redação antes de Enviar.');
                return;
            }
            
        // Salva a redação final
            const essay = {
                text: essayText.value,
                wordCount: essayText.value.trim().split(/\s+/).length,
                lineCount: essayText.value.split('\n').length,
                timeUsed: timeElapsed,
                timestamp: Date.now()
            };
            
        // Simula o envio
            clearInterval(timerInterval);
            clearInterval(autoSaveInterval);
            
        // Limpa o rascunho
            localStorage.removeItem('essayDraft');
            
        // Mostrar modal de conclusão
            showCompletionModal(essay);
        }
        
        function showCompletionModal(essay) {
            const minutes = Math.floor(essay.timeUsed / 60);
            const seconds = essay.timeUsed % 60;
            
            document.getElementById('timeUsed').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('finalWordCount').textContent = essay.wordCount;
            
            completionModal.style.display = 'flex';
        }
        
        function showTimeUpModal() {
            const words = essayText.value.trim() ? essayText.value.trim().split(/\s+/).length : 0;
            document.getElementById('timeUpWordCount').textContent = words;
            
            timeUpModal.style.display = 'flex';
        }
        
        function restartEssay() {

        // Limpa o texto
            essayText.value = '';
            
        // Resetar variáveis
            timeLeft = TOTAL_TIME;
            timeElapsed = 0;
            
        // Limpa o rascunho
            localStorage.removeItem('essayDraft');
            
        // Resetar UI
            updateWordCount();
            updateTimerDisplay();
            updateTimeElapsed();
            currentStatusEl.textContent = "Status: Aguardando";
            
        // Esconder modais
            completionModal.style.display = 'none';
            timeUpModal.style.display = 'none';
            
        // Reiniciar timers
            startTimer();
            startAutoSave();
        }