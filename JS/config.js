// Função para exibir toast de notificação
        function showToast(message, type = 'success') {
            const toastContainer = document.querySelector('.toast-container');
            
            const toast = document.createElement('div');
            toast.className = `toast show align-items-center text-white bg-${type} border-0`;
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            
            // Remove o toast após 3 segundos
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
        
        // Função para salvar configurações
        function saveSettings(section, message) {
            // Simula uma operação assíncrona
            setTimeout(() => {
                showToast(`${message} salvas com sucesso!`, 'success');
            }, 500);
        }
        
        // Função para abrir modal de confirmação
        function openConfirmModal(message, confirmAction) {
            const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
            document.getElementById('confirmModalText').textContent = message;
            
            // Limpar qualquer evento anterior
            const confirmBtn = document.getElementById('confirmModalBtn');
            const newConfirmBtn = confirmBtn.cloneNode(true);
            confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
            
            // Adicionar novo evento
            newConfirmBtn.addEventListener('click', function() {
                modal.hide();
                confirmAction();
            });
            
            modal.show();
        }
        
        // Adiciona eventos aos botões de salvamento
        document.querySelectorAll('.btn-action').forEach(button => {
            button.addEventListener('click', function() {
                const section = this.closest('.card-header').querySelector('i').className;
                const sectionName = section.includes('person-circle') ? 'perfil' : 
                                  section.includes('sliders') ? 'preferências' : 
                                  section.includes('book') ? 'configurações de estudo' : 
                                  section.includes('bell') ? 'notificações' : 
                                  section.includes('shield-lock') ? 'privacidade' : 'conta';
                saveSettings(sectionName, 'Configurações');
            });
        });
        
        // Botão de logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            showToast('Você foi deslogado com sucesso!', 'info');
            setTimeout(() => {
                window.location.href = 'plataforma.html';
            }, 2000);
        });
        
        // Botão de excluir conta
        document.getElementById('deleteAccountBtn').addEventListener('click', function() {
            openConfirmModal('Tem certeza que deseja excluir sua conta? Esta ação é permanente e não pode ser desfeita.', function() {
                showToast('Sua conta foi excluída com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            });
        });
        
        // Adiciona animações ao trocar de aba
        document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
            tab.addEventListener('shown.bs.tab', function(event) {
                const targetId = event.target.getAttribute('data-bs-target');
                const targetPane = document.querySelector(targetId);
                
                // Adiciona a classe animate-in com delay específico para o painel ativo
                const delayClass = `delay-${Math.floor(Math.random() * 8) + 1}`;
                targetPane.classList.add('animate-in');
                targetPane.classList.add(delayClass);
            });
        });