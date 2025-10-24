// Função para mostrar preview da apostila
        function showPreview(materia, titulo) {
            const apostilaModal = new bootstrap.Modal(document.getElementById('apostilaModal'));
            document.getElementById('previewTitle').textContent = `${materia} - ${titulo}`;
            
            // Conteúdo específico para cada apostila
            let content = '';
            switch(materia) {
                case 'Matemática':
                    if (titulo === 'Aritmética Básica') {
                        content = `
                            <p>Esta apostila aborda os fundamentos da aritmética para o ENCCEJA, com foco nos números inteiros, frações e operações básicas.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Números inteiros</strong>: Propriedades, operações e aplicações</li>
                                <li><strong>Frações</strong>: Tipos de frações, equivalência, comparação e operações</li>
                                <li><strong>Decimais</strong>: Representação, comparação e operações</li>
                                <li><strong>Porcentagens</strong>: Conceito, cálculos e aplicações</li>
                                <li><strong>Razões e proporções</strong>: Conceitos e aplicações</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Geometria Plana') {
                        content = `
                            <p>Esta apostila aborda os conceitos de geometria plana para o ENCCEJA, com foco nos polígonos, círculos e cálculo de áreas.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Polígonos</strong>: Classificação, propriedades e características</li>
                                <li><strong>Círculos</strong>: Elementos, propriedades e relações</li>
                                <li><strong>Áreas e perímetros</strong>: Fórmulas e aplicações</li>
                                <li><strong>Teorema de Pitágoras</strong>: Demonstração e aplicações</li>
                                <li><strong>Geometria no cotidiano</strong>: Aplicações práticas</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Estatística e Probabilidade') {
                        content = `
                            <p>Esta apostila aborda os fundamentos de estatística e probabilidade para o ENCCEJA, com foco na análise de dados.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Coleta e organização de dados</strong>: Tabelas, gráficos e tipos de dados</li>
                                <li><strong>Medidas de centralidade</strong>: Média, mediana e moda</li>
                                <li><strong>Medidas de dispersão</strong>: Amplitude, variância e desvio padrão</li>
                                <li><strong>Conceitos básicos de probabilidade</strong>: Espaço amostral, eventos e cálculo de probabilidades</li>
                                <li><strong>Aplicações práticas</strong>: Exemplos de uso da estatística no cotidiano</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    }
                    break;
                case 'Português':
                    if (titulo === 'Gramática Básica') {
                        content = `
                            <p>Esta apostila aborda os fundamentos da gramática para o ENCCEJA, com foco nos fonética, morfologia e sintaxe.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Fonética e fonologia</strong>: Sons da língua portuguesa e suas representações</li>
                                <li><strong>Classes de palavras</strong>: Substantivos, adjetivos, verbos, pronomes, advérbios, preposições, conjunções e interjeições</li>
                                <li><strong>Concordância verbal e nominal</strong>: Regras e exceções</li>
                                <li><strong>Regência verbal e nominal</strong>: Classes de regência e exemplos</li>
                                <li><strong>Uso da crase</strong>: Regras e aplicações</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Literatura Brasileira') {
                        content = `
                            <p>Esta apostila aborda os principais movimentos literários e autores brasileiros para o ENCCEJA, com foco na compreensão dos contextos históricos e culturais.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Período colonial</strong>: Poesia barroca e arcádica, prosa colonial</li>
                                <li><strong>Romantismo</strong>: Características, autores e obras representativas</li>
                                <li><strong>Realismo e Naturalismo</strong>: Diferenças e principais autores</li>
                                <li><strong>Modernismo</strong>: Vanguardas e principais manifestações</li>
                                <li><strong>Pós-Modernismo e contemporaneidade</strong>: Principais tendências e autores</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Redação e Texto Argumentativo') {
                        content = `
                            <p>Esta apostila aborda técnicas e estratégias para elaborar textos argumentativos para o ENCCEJA, com foco na construção de argumentos e na organização do texto.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Tipos de texto</strong>: Classificação e características</li>
                                <li><strong>Estrutura do texto argumentativo</strong>: Introdução, desenvolvimento e conclusão</li>
                                <li><strong>Argumentação e persuasão</strong>: Técnicas e recursos</li>
                                <li><strong>Coerência e coesão textual</strong>: Elementos e funções</li>
                                <li><strong>Revisão e correção</strong>: Passos e dicas</li>
                                <li><strong>Exemplos de textos argumentativos</strong>: Análise e comentários</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    }
                    break;
                case 'Ciências':
                    if (titulo === 'Biologia Básica') {
                        content = `
                            <p>Esta apostila aborda os fundamentos da biologia para o ENCCEJA, com foco nos sistemas vivos e suas interações.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Células e tecidos</strong>: Estrutura, função e tipos</li>
                                <li><strong>Sistema digestivo</strong>: Órgãos, função e processos</li>
                                <li><strong>Sistema circulatório</strong>: Órgãos, função e processos</li>
                                <li><strong>Reprodução e desenvolvimento</strong>: Tipos, processos e adaptações</li>
                                <li><strong>Ecologia básica</strong>: Relações entre organismos e ambientes</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Física e Química') {
                        content = `
                            <p>Esta apostila aborda os fundamentos de física e química para o ENCCEJA, com foco nos conceitos básicos e suas aplicações.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Leis de Newton</strong>: Primeira, segunda e terceira lei</li>
                                <li><strong>Energia e transformações</strong>: Tipos de energia e conversão</li>
                                <li><strong>Estados da matéria</strong>: Características e transformações</li>
                                <li><strong>Reações químicas</strong>: Tipos, equilíbrio e velocidade</li>
                                <li><strong>Ácidos e bases</strong>: Conceitos e aplicações</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Ecologia e Meio Ambiente') {
                        content = `
                            <p>Esta apostila aborda os fundamentos de ecologia e preservação ambiental para o ENCCEJA, com foco nos processos e na sustentabilidade.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Ecossistemas</strong>: Componentes, ciclos e equilíbrio</li>
                                <li><strong>Ciclos biogeoquímicos</strong>: Água, carbono, nitrogênio e fósforo</li>
                                <li><strong>Biodiversidade</strong>: Tipos, importância e ameaças</li>
                                <li><strong>Poluição e sustentabilidade</strong>: Tipos de poluição e soluções</li>
                                <li><strong>Meio ambiente e sociedade</strong>: Relações e impactos</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    }
                    break;
                case 'História':
                    if (titulo === 'História Antiga e Medieval') {
                        content = `
                            <p>Esta apostila aborda os principais períodos da história antiga e medieval para o ENCCEJA, com foco nas civilizações e seus legados.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Civilizações mesopotâmicas</strong>: Sumérios, acadianos, babilônicos e assírios</li>
                                <li><strong>Egito antigo</strong>: Sociedade, política, religião e cultura</li>
                                <li><strong>Grécia antiga</strong>: Polis, democracia, filosofia e cultura</li>
                                <li><strong>Império Romano</strong>: Expansão, governo e cultura</li>
                                <li><strong>Idade Média</strong>: Feudalismo, igreja e cultura</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Idade Moderna e Contemporânea') {
                        content = `
                            <p>Esta apostila aborda os principais eventos e movimentos da Idade Moderna e Contemporânea para o ENCCEJA, com foco nos processos históricos.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Descobrimento da América</strong>: Impactos e consequências</li>
                                <li><>Revoluções burguesas</strong>: Inglesa, americana e francesa</li>
                                <li><strong>Guerras mundiais</strong>: Causas, desenvolvimentos e consequências</li>
                                <li><strong>Guerra Fria</strong>: Conflitos ideológicos e geopolíticos</li>
                                <li><strong>Globalização</strong>: Processos e impactos</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'História do Brasil') {
                        content = `
                            <p>Esta apostila aborda os principais períodos e eventos da história do Brasil para o ENCCEJA, com foco nos processos de formação nacional.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Período colonial</strong>: Exploração, ocupação e sociedade</li>
                                <li><strong>Império</strong>: Independência, monarquia e sociedade</li>
                                <li><strong>República Velha</strong>: Proclamação da República e primeiros governos</li>
                                <li><strong>Ditadura militar</strong>: Golpe de 1964 e regime militar</li>
                                <li><strong>Transição democrática</strong>: Redemocratização e constituição de 1988</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    }
                    break;
                case 'Geografia':
                    if (titulo === 'Geografia Física') {
                        content = `
                            <p>Esta apostila aborda os fundamentos de geografia física para o ENCCEJA, com foco nos processos naturais e suas manifestações.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Formações geológicas</strong>: Rochas, processos e relevo</li>
                                <li><strong>Climas do mundo</strong>: Tipos, características e distribuição</li>
                                <li><strong>Hidrografia</strong>: Tipos de corpos d'água e processos</li>
                                <li><strong>Populações e densidades</strong>: Distribuição e características</li>
                                <li><strong>Mapas e representações geográficas</strong>: Tipos e leitura</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Geografia Humana') {
                        content = `
                            <p>Esta apostila aborda os fundamentos de geografia humana para o ENCCEJA, com foco nos processos sociais e econômicos.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Urbanização</strong>: Tipos de cidades e processos urbanos</li>
                                <li><strong>Agricultura</strong>: Tipos, distribuição e processos</li>
                                <li><strong>Indústria</strong>: Tipos, distribuição e processos</li>
                                <li><strong>Transporte e comunicação</strong>: Redes e processos</li>
                                <li><strong>Desenvolvimento e desenvolvimento sustentável</strong>: Conceitos e aplicações</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    } else if (titulo === 'Regiões Geográficas') {
                        content = `
                            <p>Esta apostila aborda as principais regiões geográficas do Brasil e do mundo para o ENCCEJA, com foco nas características e na organização territorial.</p>
                            <p>Conheça os principais tópicos abordados:</p>
                            <ul>
                                <li><strong>Regiões do Brasil</strong>: Características, economia e sociedade</li>
                                <li><strong>America Latina</strong>: Características, economia e sociedade</li>
                                <li><strong>Europa</strong>: Características, economia e sociedade</li>
                                <li><strong>Ásia</strong>: Características, economia e sociedade</li>
                                <li><strong>Africa</strong>: Características, economia e sociedade</li>
                            </ul>
                            <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                        `;
                    }
                    break;
                default:
                        content = '<p>Conteúdo da apostila não disponível.</p>';
            }
            
            document.getElementById('previewContent').innerHTML = content;
            
            // Configurar o botão de download na modal
            document.getElementById('downloadFromModal').onclick = function() {
                apostilaModal.hide();
                downloadApostila(materia, titulo);
            };
            
            apostilaModal.show();
        }
        
        // Função para baixar apostila
        function downloadApostila(materia, titulo) {
            showToast('Download Iniciado', `A apostila de ${materia} - ${titulo} está sendo baixada. Por favor, aguarde.`, 'success');
            // Simulação de download
            setTimeout(() => {
                showToast('Download Concluído', `A apostila de ${materia} - ${titulo} foi baixada com sucesso!`, 'success');
            }, 3000);
        }
        
        // Função para mostrar toast
        function showToast(title, message, type) {
            const toastContainer = document.querySelector('.toast-container');
            const toastId = 'toast-' + Date.now();
            const iconClass = type === 'success' ? 'bi-check-circle-fill' : 
                             type === 'info' ? 'bi-info-circle" class="text-primary' : 
                             type === 'warning' ? 'bi-exclamation-triangle-fill" class="text-warning' : 'bi-x-circle-fill" class="text-danger';
            
            const toastHtml = `
                <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <i class="bi ${iconClass} me-2"></i>
                        <strong class="me-auto">${title}</strong>
                        <small>Agora</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Fechar"></button>
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
            showToast('Mensagem Enviada', `Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Respondiremos em breve!`, 'success');
            this.reset();
        });
        
        // Scroll suave para seções
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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