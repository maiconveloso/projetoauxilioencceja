// Função para mostrar preview da apostila
        function showPreview(apostila) {
            const apostilaModal = new bootstrap.Modal(document.getElementById('apostilaModal'));
            document.getElementById('previewTitle').textContent = apostila;
            
            // Conteúdo específico para cada apostila
            let content = '';
            switch(apostila) {
                case 'Cálculo Superior':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de cálculo superior, essenciais para cursos de engenharia, física e matemática.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Funções de várias variáveis e suas derivadas</li>
                            <li>Derivadas parciais e gradientes</li>
                            <li>Integrais duplas e triplas</li>
                            <li>Cálculo vetorial e campos</li>
                            <li>Séries de Taylor e MacLaurin</li>
                            <li>Transformadas de Laplace e Fourier</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Física Avançada':
                    content = `
                        <p>Esta apostila aborda os conceitos avançados de física, essenciais para cursos de engenharia, física e áreas afins.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Mecânica quântica e equação de Schrödinger</li>
                            <li>Eletromagnetismo e equações de Maxwell</li>
                            <li>Termodinâmica e estatística molecular</li>
                            <li>Óptica e fenômenos ondulatórios</li>
                            <li>Física de partículas e relatividade</li>
                            <li>Física de materiais e semicondutores</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Química Orgânica':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de química orgânica, essenciais para cursos de química, biologia, farmácia e áreas afins.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Estrutura e propriedades de compostos orgânicos</li>
                            <li>Reações de substituição e eliminação</li>
                            <li>Reações de adição e rearranjo</li>
                            <li>Esterificação e hidrólise</li>
                            <li>Síntese orgânica e mecanismos de reação</li>
                            <li>Química de biomoléculas e biopolímeros</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Biologia Molecular':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de biologia molecular, essenciais para cursos de biologia, medicina, farmácia e áreas afins.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Estrutura e função do DNA e RNA</li>
                            <li>Replicação, transcrição e tradução</li>
                            <li>Expressão gênica e controle</li>
                            <li>Técnicas de clonagem e engenharia genética</li>
                            <li>Genética molecular e mutações</li>
                            <li>Bioinformática e genômica</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Estatística':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de estatística, essenciais para cursos de ciências, engenharia, medicina e áreas afins.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Probabilidade e variáveis aleatórias</li>
                            <li>Distribuições de probabilidade (Normal, Binomial, Poisson)</li>
                            <li>Inferência estatística e testes de hipótese</li>
                            <li>Regressão linear e análise de variância</li>
                            <li>Testes de correlação e regressão múltipla</li>
                            <li>Design de experimentos e análise de dados</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Álgebra Linear': // Novo conteúdo para a apostila de Álgebra Linear
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de álgebra linear, essenciais para cursos de engenharia, física, matemática e ciência da computação.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Sistemas de equações lineares e matrizes</li>
                            <li>Determinantes e propriedades</li>
                            <li>Espaços vetoriais e subespaços</li>
                            <li>Transformações lineares e núcleo e imagem</li>
                            <li>Autovalores, autovetores e diagonalização</li>
                            <li>Aplicações da álgebra linear em diversas áreas</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                default:
                    content = '<p>Conteúdo da apostila não disponível.</p>';
            }
            
            document.getElementById('previewContent').innerHTML = content;
            
            // Configurar o botão de download na modal
            document.getElementById('downloadFromModal').onclick = function() {
                apostilaModal.hide();
                downloadApostila(apostila);
            };
            
            apostilaModal.show();
        }
        
        // Função para baixar apostila
        function downloadApostila(apostila) {
            showToast('Download Iniciado', `A apostila de ${apostila} está sendo baixada. Por favor, aguarde.`, 'success');
            // Simulação de download
            setTimeout(() => {
                showToast('Download Concluído', `A apostila de ${apostila} foi baixada com sucesso!`, 'success');
            }, 3000);
        }
        
        // Função para mostrar toast
        function showToast(title, message, type) {
            const toastContainer = document.querySelector('.toast-container');
            const toastId = 'toast-' + Date.now();
            const iconClass = type === 'success' ? 'bi-check-circle-fill' : 
                             type === 'info' ? 'bi-info-circle-fill' : 
                             type === 'warning' ? 'bi-exclamation-triangle-fill' : 'bi-x-circle-fill';
            
            const toastHtml = `
                <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <i class="bi ${iconClass} me-2 text-${type === 'info' ? 'primary' : type}"></i>
                        <strong class="me-auto">${title}</strong>
                        <small>Agora</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            `;
            
            toastContainer.insertAdjacentHTML('beforeend', toastHtml);
            const toastElement = document.getElementById(toastId);
            const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 5000 });
            toast.show();
            
            // Remove o toast do DOM após fechar
            toastElement.addEventListener('hidden.bs.toast', function () {
                toastElement.remove();
            });
        }
        
        // Formulário de contato
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            showToast('Mensagem Enviada', `Obrigado, ${name}! Sua mensagem foi enviada com sucesso. responderemos em breve.`, 'success');
            this.reset();
        });
        
        // Animação suave para links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });