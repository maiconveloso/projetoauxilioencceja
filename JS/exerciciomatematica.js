// Variáveis globais
        let score = 0;
        let totalExercises = 24;
        let answeredExercises = 0;
        let tabSwitchCount = 0;
        const MAX_TAB_SWITCHES = 3;
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            // Contar total de exercícios
            const exercises = document.querySelectorAll('.exercise');
            totalExercises = exercises.length;
            document.getElementById('total').textContent = totalExercises;
            
            // Configurar tabs
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remover active de todas as tabs e conteúdo
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                    
                    // Adicionar active na tab clicada e conteúdo correspondente
                    this.classList.add('active');
                    document.getElementById(this.getAttribute('data-tab')).classList.add('active');
                });
            });
            
            // Configurar opções dos exercícios
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    // Remover seleção de todas as opções no mesmo exercício
                    const exerciseId = this.parentElement.parentElement.id;
                    const exerciseOptions = document.querySelectorAll(`#${exerciseId} .option`);
                    exerciseOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Selecionar a opção clicada
                    this.classList.add('selected');
                });
            });
            
            // Configurar monitoramento de mudança de guia
            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('blur', handleWindowBlur);
            
            // Bloquear atalhos de teclado para abrir novas guias
            document.addEventListener('keydown', handleKeyDown);
            
            // Exibir aviso inicial sobre mudança de guia
            setTimeout(() => {
                document.getElementById('tabWarning').classList.add('active');
            }, 1000);
        });
        
        // Função para lidar com mudança de visibilidade da página
        function handleVisibilityChange() {
            if (document.hidden) {
                // A página ficou invisível (usuário mudou de guia)
                incrementTabSwitchCount();
            }
        }
        
        // Função para lidar com perda de foco da janela
        function handleWindowBlur() {
            // A janela perdeu o foco (usuário pode ter mudado de guia)
            incrementTabSwitchCount();
        }
        
        // Função para incrementar o contador de mudança de guia
        function incrementTabSwitchCount() {
            tabSwitchCount++;
            
            // Exibir aviso
            document.getElementById('warningCount').textContent = tabSwitchCount;
            document.getElementById('warningContainer').style.display = 'flex';
            
            // Exibir aviso na aba
            document.getElementById('tabWarning').classList.add('active');
            
            // Verificar se excedeu o limite
            if (tabSwitchCount >= MAX_TAB_SWITCHES) {
                // Anular o teste
                invalidateTest();
            }
        }
        
        // Função para fechar o aviso de violação
        function closeWarning() {
            document.getElementById('warningContainer').style.display = 'none';
        }
       
        function handleKeyDown(e) {
            // Bloquear Ctrl+T (nova guia)
            if (e.ctrlKey && e.keyCode === 84) {
                e.preventDefault();
                incrementTabSwitchCount();
                return false;
            }
            
            // Bloquear Ctrl+N (nova janela)
            if (e.ctrlKey && e.keyCode === 78) {
                e.preventDefault();
                incrementTabSwitchCount();
                return false;
            }
            
            // Bloquear Ctrl+W (fechar guia)
            if (e.ctrlKey && e.keyCode === 87) {
                e.preventDefault();
                return false;
            }
            
            // Bloquear Alt+Setas (navegação)
            if (e.altKey && (e.keyCode === 37 || e.keyCode === 39)) {
                e.preventDefault();
                incrementTabSwitchCount();
                return false;
            }
            
            // Bloquear F12 (ferramentas de desenvolvedor)
            if (e.keyCode === 123) {
                e.preventDefault();
                incrementTabSwitchCount();
                return false;
            }
            
            // Bloquear Ctrl+Shift+I (ferramentas de desenvolvedor)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                incrementTabSwitchCount();
                return false;
            }
            
            // Bloquear Ctrl+Shift+J (console)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
                incrementTabSwitchCount();
                return false;
            }
            
            // Bloquear Ctrl+U (visualizar código fonte)
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                incrementTabSwitchCount();
                return false;
            }
        }
        
        function invalidateTest() {
            // Esconder todos os exercícios
            document.querySelectorAll('.exercise').forEach(exercise => {
                exercise.style.display = 'none';
            });
            
            // Esconder tabs e outros elementos
            document.querySelector('.tabs').style.display = 'none';
            document.querySelector('.score').style.display = 'none';
            document.querySelector('.progress-container').style.display = 'none';
            document.getElementById('tabWarning').style.display = 'none';
            
            // Fechar aviso de violação
            closeWarning();
            
            // Exibir mensagem de teste anulado
            document.getElementById('resultContainer').style.display = 'block';
            document.getElementById('finalScore').textContent = '0';
            document.getElementById('finalTotal').textContent = totalExercises;
            document.getElementById('resultMessage').textContent = 
                `TESTE ANULADO! Você excedeu o limite de ${MAX_TAB_SWITCHES} mudanças de guia permitidas.`;
            document.getElementById('resultMessage').style.color = 'var(--danger-color)';
            document.getElementById('resultMessage').style.fontWeight = 'bold';
            
            // Desabilitar botão de reiniciar
            document.querySelector('.btn-restart').disabled = true;
            document.querySelector('.btn-restart').style.backgroundColor = '#cccccc';
            document.querySelector('.btn-restart').style.cursor = 'not-allowed';
        }
        
        // Função para verificar a resposta
        function checkAnswer(exerciseId, correctAnswer) {
            const exercise = document.getElementById(exerciseId);
            const selectedOption = exercise.querySelector('.option.selected');
            const feedback = exercise.querySelector('.feedback');
            const explanation = exercise.querySelector('.explanation');
            const options = exercise.querySelectorAll('.option');
            const nextButton = exercise.querySelector('.btn-next');
            
            // Verificar se uma opção foi selecionada
            if (!selectedOption) {
                feedback.textContent = 'Por favor, selecione uma resposta.';
                feedback.className = 'feedback incorrect';
                feedback.style.display = 'block';
                return;
            }
            
            // Verificar se a resposta está correta
            const selectedValue = selectedOption.getAttribute('data-value');
            const isCorrect = selectedValue === correctAnswer;
            
            // Atualizar pontuação
            if (isCorrect && !selectedOption.classList.contains('correct')) {
                score++;
                document.getElementById('score').textContent = score;
            }
            
            // Atualizar contador de exercícios respondidos
            answeredExercises++;
            updateProgress();
            
            // Marcar opções como corretas ou incorretas
            options.forEach(option => {
                const optionValue = option.getAttribute('data-value');
                if (optionValue === correctAnswer) {
                    option.classList.add('correct');
                } else if (option === selectedOption && !isCorrect) {
                    option.classList.add('incorrect');
                }
            });
            
            // Mostrar feedback
            if (isCorrect) {
                feedback.textContent = 'Correto! Parabéns.';
                feedback.className = 'feedback correct';
            } else {
                feedback.textContent = 'Incorreto. Tente novamente.';
                feedback.className = 'feedback incorrect';
            }
            feedback.style.display = 'block';
            
            // Mostrar explicação
            explanation.style.display = 'block';
            
            // Desabilitar botão de verificar
            const checkButton = exercise.querySelector('.btn-check');
            checkButton.disabled = true;
            checkButton.textContent = 'Verificado';
            
            // Mostrar botão de próximo
            if (nextButton) {
                nextButton.style.display = 'inline-block';
            } else {
                // Criar botão de próximo se não existir
                const newNextButton = document.createElement('button');
                newNextButton.className = 'btn btn-next';
                newNextButton.textContent = 'Próximo Exercício';
                newNextButton.onclick = function() {
                    // Rolar para o próximo exercício
                    const allExercises = Array.from(document.querySelectorAll('.exercise'));
                    const currentIndex = allExercises.indexOf(exercise);
                    if (currentIndex < allExercises.length - 1) {
                        allExercises[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
                    }
                };
                exercise.appendChild(newNextButton);
            }
            
            // Verificar se todos os exercícios foram respondidos
            if (answeredExercises === totalExercises) {
                setTimeout(showResults, 1000);
            }
        }
        
        // Função para atualizar a barra de progresso
        function updateProgress() {
            const percentage = (answeredExercises / totalExercises) * 100;
            document.getElementById('progress').style.width = `${percentage}%`;
        }
        
        // Função para mostrar os resultados finais
        function showResults() {
            document.querySelectorAll('.exercise').forEach(exercise => {
                exercise.style.display = 'none';
            });
            
            document.querySelector('.tabs').style.display = 'none';
            document.querySelector('.score').style.display = 'none';
            document.querySelector('.progress-container').style.display = 'none';
            
            document.getElementById('resultContainer').style.display = 'block';
            document.getElementById('finalScore').textContent = score;
            document.getElementById('finalTotal').textContent = totalExercises;
            
            // Mensagem personalizada com base na pontuação
            let message = '';
            
            if (score === totalExercises) {
                message = 'Parabéns! Você acertou todas as questões. Você tem um excelente conhecimento das áreas de álgebra, geometria e estatística.';
            } else if (score >= totalExercises * 0.8) {
                message = 'Excelente! Você tem um bom domínio das áreas de álgebra, geometria e estatística. Continue praticando para perfeccionar seus conhecimentos.';
            } else if (score >= totalExercises * 0.6) {
                message = 'Bom trabalho! Você tem um conhecimento razoável nas áreas de álgebra, geometria e estatística. Continue estudando e praticando para melhorar ainda mais.';
            } else if (score >= totalExercises * 0.4) {
                message = 'Você está no caminho certo. Continue estudando e praticando para aprimorar seu conhecimento nas áreas de álgebra, geometria e estatística.';
            } else {
                message = 'Recomendamos que você revise os conceitos básicos de álgebra, geometria e estatística. Continue praticando para melhorar seu desempenho.';
            }
            
            document.getElementById('resultMessage').textContent = message;
            
            // Desativar o bloqueio de tela quando todos os exercícios forem respondidos
            disableTabLock();
        }
        
        // Função para reiniciar o quiz
        function restartQuiz() {
            // Resetar pontuação e contadores
            score = 0;
            answeredExercises = 0;
            tabSwitchCount = 0;
            document.getElementById('score').textContent = score;
            document.getElementById('progress').style.width = '0%';
            
            // Exibir novamente os exercícios e componentes
            document.querySelectorAll('.exercise').forEach(exercise => {
                exercise.style.display = 'block';
                exercise.querySelectorAll('.option').forEach(option => {
                    option.classList.remove('selected', 'correct', 'incorrect');
                });
                exercise.querySelector('.feedback').style.display = 'none';
                exercise.querySelector('.explanation').style.display = 'none';
                
                // Resetar botão de verificar
                const checkButton = exercise.querySelector('.btn-check');
                checkButton.disabled = false;
                checkButton.textContent = 'Verificar';
                
                // Remover botão de próximo se existir
                const nextButton = exercise.querySelector('.btn-next');
                if (nextButton) {
                    nextButton.remove();
                }
            });
            
            document.querySelector('.tabs').style.display = 'flex';
            document.querySelector('.score').style.display = 'block';
            document.querySelector('.progress-container').style.display = 'block';
            document.getElementById('resultContainer').style.display = 'none';
            
            // Ativar a primeira tab
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelector('.tab').classList.add('active');
            document.getElementById('algebra').classList.add('active');
            
            // Reabilitar botão de reiniciar se foi desabilitado
            const restartButton = document.querySelector('.btn-restart');
            restartButton.disabled = false;
            restartButton.style.backgroundColor = '';
            restartButton.style.cursor = '';
            
            // Reativar o bloqueio de tela ao reiniciar o quiz
            enableTabLock();
        }
        
        // Função para desativar o bloqueio de tela
        function disableTabLock() {
            
            // Remover event listeners de mudança de aba
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleWindowBlur);
            document.removeEventListener('keydown', handleKeyDown);

            // Esconder aviso sobre mudança de aba
            document.getElementById('tabWarning').classList.remove('active');
        }
        
        // Função para reativar o bloqueio de tela (usada ao reiniciar o quiz)
        function enableTabLock() {

            // Adicionar novamente os event listeners
            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('blur', handleWindowBlur);
            document.addEventListener('keydown', handleKeyDown);

            // Exibir aviso sobre mudança de aba
            document.getElementById('tabWarning').classList.add('active');
        }