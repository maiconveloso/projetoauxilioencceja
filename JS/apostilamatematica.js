// Função para mostrar preview da apostila
        function showPreview(apostila) {
            const apostilaModal = new bootstrap.Modal(document.getElementById('apostilaModal'));
            document.getElementById('previewTitle').textContent = apostila;
            
            // Conteúdo específico para cada apostila
            let content = '';
            switch(apostila) {
                case 'Álgebra Básica':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de álgebra necessários para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Operações algébricas básicas e avançadas</li>
                            <li>Equações lineares e quadráticas</li>
                            <li>Inequações e sistemas de inequações</li>
                            <li>Polinômios e suas operações</li>
                            <li>Fatores e produtos notáveis</li>
                            <li>Funções e suas representações</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Geometria':
                    content = `
                        <p>Esta apostila aborda os conceitos de geometria necessários para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Geometria plana: triângulos, quadriláteros, círculos e suas propriedades</li>
                            <li>Geometria espacial: sólidos geométricos, suas características e cálculos</li>
                            <li>Trigonometria: funções trigonométricas, identidades e aplicações</li>
                            <li>Geometria analítica: retas, circunferências e parábolas no plano cartesiano</li>
                            <li>Áreas e volumes de figuras geométricas</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Funções e Derivadas':
                    content = `
                        <p>Esta apostila aborda os conceitos de funções e derivadas necessários para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Tipos de funções: polinomiais, racionais, exponenciais e logarítmicas</li>
                            <li>Gráficos de funções e suas transformações</li>
                            <li>Limites e continuidade de funções</li>
                            <li>Derivadas e suas propriedades</li>
                            <li>Aplicações das derivadas: máximos e mínimos, taxas de variação</li>
                            <li>Estudo da concavidade e pontos de inflexão</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Probabilidades':
                    content = `
                        <p>Esta apostila aborda os conceitos de probabilidade e estatística necessários para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Conceitos básicos de probabilidade</li>
                            <li>Eventos e suas probabilidades</li>
                            <li>Probabilidade condicional</li>
                            <li>Combinatória e permutação</li>
                            <li>Variáveis aleatórias e suas distribuições</li>
                            <li>Distribuições de probabilidade: binomial, normal e poisson</li>
                            <li>Testes de hipóteses e intervalos de confiança</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Estatística':
                    content = `
                        <p>Esta apostila aborda os conceitos de estatística necessários para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Coleta e organização de dados</li>
                            <li>Representação gráfica de dados</li>
                            <li>Medidas de tendência central: média, mediana e moda</li>
                            <li>Medidas de dispersão: variância, desvio padrão e amplitude</li>
                            <li>Medidas de posição: quartis, decis e percentis</li>
                            <li>Análise de séries temporais</li>
                            <li>Correlação e regressão linear</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Cálculo Integral':
                    content = `
                        <p>Esta apostila aborda os conceitos de cálculo integral necessários para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Integração indefinida: antiderivadas e suas propriedades</li>
                            <li>Integração definida: interpretação geométrica e aplicações</li>
                            <li>Métodos de integração: substituição, partes e frações parciais</li>
                            <li>Aplicações do cálculo integral: área entre curvas, volume de sólidos de revolução</li>
                            <li>Integração por partes e integração trigonométrica</li>
                            <li>Integrais improprias</li>
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