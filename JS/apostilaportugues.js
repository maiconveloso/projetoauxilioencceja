// Função para mostrar preview da apostila
        function showPreview(apostila) {
            const apostilaModal = new bootstrap.Modal(document.getElementById('apostilaModal'));
            document.getElementById('previewTitle').textContent = apostila;
            
            // Conteúdo específico para cada apostila
            let content = '';
            switch(apostila) {
                case 'Gramática Básica':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de gramática para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Fonética: sons da língua portuguesa e suas representações</li>
                            <li>Morfologia: classes de palavras e suas funções</li>
                            <li>Sintaxe: estrutura das frases e orações</li>
                            <li>Concordância verbal e nominal</li>
                            <li>Regência verbal e nominal</li>
                            <li>Uso de pronomes e advérbios</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Literatura Brasileira':
                    content = `
                        <p>Esta apostila aborda os principais movimentos literários e autores brasileiros para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Período colonial: poesia barroca e arcádica</li>
                            <li>Romantismo: gêneros, temas e autores representativos</li>
                            <li>Realismo e Naturalismo: características e principais autores</li>
                            <li>Modernismo: Vanguardas e principais manifestações</li>
                            <li>Pós-Modernismo e contemporaneidade</li>
                            <li>Análise de textos literários com foco no ENCCEJA</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Redação e Texto Argumentativo':
                    content = `
                        <p>Esta apostila aborda técnicas e estratégias para elaborar textos argumentativos para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Tipos de texto e seus elementos constitutivos</li>
                            <li>Estrutura do texto argumentativo: introdução, desenvolvimento e conclusão</li>
                            <li>Argumentação: tipos de argumentos e técnicas de persuasão</li>
                            <li>Coerência e coesão textual</li>
                            <li>Revisão e correção de texto</li>
                            <li>Exemplos de textos argumentativos com análise crítica</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Análise Textual':
                    content = `
                        <p>Esta apostila aborda os conceitos e técnicas para análise de textos variados para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Tipos textuais e suas características</li>
                            <li>Estrutura e funcionamento dos textos</li>
                            <li>Linguagem e registro: formal, informal e técnico-científico</li>
                            <li>Figuras de linguagem e recursos estilísticos</li>
                            <li>Discurso direto e indireto</li>
                            <li>Análise de gêneros textuais variados</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Crítica Literária':
                    content = `
                        <p>Esta apostila aborda as abordagens e métodos para análise crítica de obras literárias para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Teorias literárias: formalismo, estruturalismo, pós-estruturalismo</li>
                            <li>Análise de gêneros literários: romance, conto, poesia, teatro</li>
                            <li>Interpretação de textos literários: métodos e técnicas</li>
                            <li>Relação entre texto e contexto: histórico, social e cultural</li>
                            <li>Leitura crítica de textos literários</li>
                            <li>Exemplos de análises críticas de obras literárias</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Gramática Avançada':
                    content = `
                        <p>Esta apostila aborda os conceitos avançados de gramática para o ENCCEJA, com foco em questões complexas.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Sintaxe complexa: orações subordinadas e suas funções</li>
                            <li>Concordância e regência complexas: casos especiais e exceções</li>
                            <li>Uso de verbos e tempos verbais: perfeição, aspecto e modo</li>
                            <li>Pontuação e uso de parênteses, colchetes e chaves</li>
                            <li>Uso de crase</li>
                            <li>Gramática textual: conexões e relações entre orações</li>
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