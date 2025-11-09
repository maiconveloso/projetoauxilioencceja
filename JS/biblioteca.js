// Efeito de hover nas categorias
        const categories = document.querySelectorAll('.category');
        
        categories.forEach(category => {
            category.addEventListener('click', () => {
                // Remove a classe active de todas as categorias
                categories.forEach(c => c.classList.remove('active'));
                // Adiciona a classe active na categoria clicada
                category.classList.add('active');
            });
        });

        // Simulação de download dos PDFs
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const bookTitle = this.closest('.book-card').querySelector('.book-title').textContent;
                
                // Criar uma notificação
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.background = '#3a7bd5';
                notification.style.color = 'white';
                notification.style.padding = '1rem';
                notification.style.borderRadius = '5px';
                notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
                notification.style.zIndex = '1000';
                notification.style.transition = 'all 0.3s ease';
                notification.innerHTML = `<i class="fas fa-check-circle"></i> Download do "${bookTitle}" iniciado!`;
                
                document.body.appendChild(notification);
                
                // Remover a notificação após 3 segundos
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            });
        });

        // Efeito de digitação no placeholder da busca
        const searchInput = document.querySelector('.search-bar input');
        const placeholderText = "Buscar por livros, matérias ou tópicos...";
        let index = 0;
        
        function typePlaceholder() {
            if (index < placeholderText.length) {
                searchInput.setAttribute('placeholder', placeholderText.substring(0, index + 1) + '|');
                index++;
                setTimeout(typePlaceholder, 100);
            } else {
                setTimeout(() => {
                    searchInput.setAttribute('placeholder', placeholderText);
                    setTimeout(() => {
                        index = 0;
                        typePlaceholder();
                    }, 2000);
                }, 500);
            }
        }
        
        // Iniciar o efeito de digitação
        setTimeout(typePlaceholder, 1000);