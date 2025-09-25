// Função para mostrar preview da apostila
        function showPreview(apostila) {
            const apostilaModal = new bootstrap.Modal(document.getElementById('apostilaModal'));
            document.getElementById('previewTitle').textContent = apostila;
            
            // Conteúdo específico para cada apostila
            let content = '';
            switch(apostila) {
                case 'Álgebra':
                    content = `
                        <p>Esta apostila aborda os fundamentos da álgebra para o ensino médio, incluindo equações, inequações e funções.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Equações lineares e quadráticas</li>
                            <li>Sistemas de equações</li>
                            <li>Funções e gráficos</li>
                            <li>Progressões aritméticas e geométricas</li>
                            <li>Matrizes e determinantes</li>
                            <li>Probabilidade e estatística</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Geometria':
                    content = `
                        <p>Esta apostila aborda os princípios da geometria plana e espacial, com foco em teoremas e demonstrações.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Teoremas de Pitágoras e Tales</li>
                            <li>Geometria analítica: coordenadas e equações</li>
                            <li>Ángulos e suas propriedades</li>
                            <li>Teoremas de congruência e semelhança</li>
                            <li>Geometria espacial: volumes e áreas</li>
                            <li>Trigonometria aplicada à geometria</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Trigonometria':
                    content = `
                        <p>Esta apostila aborda os fundamentos da trigonometria e suas aplicações em problemas geométricos e físicos.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Funções trigonométricas: seno, cosseno e tangente</li>
                            <li>Identidades trigonométricas</li>
                            <li>Triângulos e trigonometria</li>
                            <li>Trigonometria no círculo trigonométrico</li>
                            <li>Aplicações da trigonometria em física e engenharia</li>
                            <li>Funções trigonométricas inversas</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Gramática Básica':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de gramática para o ensino médio, incluindo fonética, morfologia e sintaxe.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Fonética e fonologia: sons da língua portuguesa</li>
                            <li>Classes de palavras: substantivos, adjetivos, verbos, etc.</li>
                            <li>Concordância verbal e nominal</li>
                            <li>Regência verbal e nominal</li>
                            <li>Tempo e modo verbal</li>
                            <li> Pontuação e parênteses</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Literatura Brasileira':
                    content = `
                        <p>Esta apostila aborda os principais movimentos literários e autores brasileiros para o ensino médio.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Período colonial: poesia barroca e arcádica</li>
                            <li>Romantismo: gêneros, temas e autores representativos</li>
                            <li>Realismo e Naturalismo: características e principais autores</li>
                            <li>Modernismo: Vanguardas e principais manifestações</li>
                            <li>Pós-Modernismo e contemporaneidade</li>
                            <li>Análise de textos literários com foco no ensino médio</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Redação e Texto Argumentativo':
                    content = `
                        <p>Esta apostila aborda técnicas e estratégias para elaborar textos argumentativos para o ensino médio.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Tipos de texto e seus elementos constitutivos</li>
                            <li>Estrutura do texto argumentativo: introdução, desenvolvimento e conclusão</li>
                            <li>Argumentação e persuasão: tipos de argumentos e técnicas de persuasão</li>
                            <li>Coerência e coesão textual</li>
                            <li>Revisão e correção de texto</li>
                            <li>Exemplos de textos argumentativos com análise crítica</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Mecânica':
                    content = `
                        <p>Esta apostila aborda os fundamentos da mecânica clássica, incluindo movimento, forças e energia.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Movimento e vetores: tipos de movimento e análise vetorial</li>
                            <li>Leis de Newton: primeira, segunda e terceira lei</li>
                            <li>Trabalho e energia: conceitos e aplicações</li>
                            <li>Dinâmica e conservação de energia: princípios fundamentais</li>
                            <li>Impulso e quantidade de movimento</li>
                            <li>Gravitação e movimento circular</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Eletricidade':
                    content = `
                        <p>Esta apostila aborda os princípios da eletricidade estática e dinâmica, com foco em circuitos elétricos.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Eletricidade estática: cargas elétricas e campos elétricos</li>
                            <li>Leis de Coulomb e Gauss</li>
                            <li>Eletricidade dinâmica: corrente elétrica e tensão</li>
                            <li>Circuitos elétricos: resistência, Ohm e lei de Joule</li>
                            <li>Circuitos em série e paralelo</li>
                            <li>Fontes de energia elétrica</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Óptica':
                    content = `
                        <p>Esta apostila aborda o estudo da luz, suas propriedades e aplicações em sistemas ópticos.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Propriedades da luz: natureza e velocidade</li>
                            <li>Reflexão e refração: leis e aplicações</li>
                            <li>Lentes e espelhos: tipos e propriedades</li>
                            <li>Instrumentos ópticos: microscópio, telescópio, etc.</li>
                            <li>Óptica física: interferência e difração</li>
                            <li>Óptica moderna: lasers e fibra óptica</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Química Orgânica':
                    content = `
                        <p>Esta apostila aborda os fundamentos da química orgânica, com foco em compostos orgânicos e reações.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Estrutura da matéria orgânica: ligação química</li>
                            <li>Hidrocarbonetos: propriedades e classificação</li>
                            <li>Funções orgânicas: álcoois, ácidos carboxílicos, etc.</li>
                            <li>Reações orgânicas: mecanismos e tipos</li>
                            <li>Química farmacêutica: compostos orgânicos de interesse medicinal</li>
                            <li>Química ambiental: poluição e soluções</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Química Inorgânica':
                    content = `
                        <p>Esta apostila aborda o estudo dos elementos químicos, suas propriedades e compostos inorgânicos.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Tabela periódica: organização e leitura</li>
                            <li>Reações químicas: tipos e equilíbrio</li>
                            <li>Ácidos e bases: teorias e propriedades</li>
                            <li>Sais e oxidação-redução: mecanismos e aplicações</li>
                            <li>Química do meio ambiente: poluição e soluções</li>
                            <li>Química industrial: processos e aplicações</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Química Analítica':
                    content = `
                        <p>Esta apostila aborda os métodos e técnicas para análise química de substâncias e compostos.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Métodos de análise química: quantitativos e qualitativos</li>
                            <li>Técnicas de titulação: ácido-base, complexométrica, etc.</li>
                            <li>Análise espectrométrica: UV-Vis, IR, etc.</li>
                            <li>Análise de água: parâmetros e métodos</li>
                            <li>Análise de solo: componentes e características</li>
                            <li>Análise de alimentos: nutrientes e aditivos</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'História Antiga':
                    content = `
                        <p>Esta apostila aborda as civilizações antigas e seus legados para a humanidade.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Civilizações mesopotâmicas: Sumérios, Acadianos, Babilônicos</li>
                            <li>Egito antigo: dinastias, pirâmides e religião</li>
                            <li>Grécia antiga: democracia, filosofia e ciência</li>
                            <li>Roma antiga: república, império e direito</li>
                            <li>Impérios da Ásia: Persa, Indiano e Chinês</li>
                            <li>Religiões e mitologias antigas</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'História Medieval':
                    content = `
                        <p>Esta apostila aborda o período medieval e suas transformações sociais, políticas e culturais.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Feudalismo: estrutura social e política</li>
                            <li>Impérios islâmicos: Califado e ciência</li>
                            <li>Cruzadas: causas e consequências</li>
                            <li>Universidades medievais: desenvolvimento do conhecimento</li>
                            <li>Arte e arquitetura medieval: estilos e características</li>
                            <li>Declínio do feudalismo e surgimento do capitalismo</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'História Moderna e Contemporânea':
                    content = `
                        <p>Esta apostila aborda as transformações do mundo moderno e contemporâneo, com foco em movimentos sociais e políticos.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Revoluções burguesas: Inglesa, Americana e Francesa</li>
                            <li>Imperialismo e colonialismo: expansão européia</li>
                            <li>Guerras mundiais: causas, eventos e consequências</li>
                            <li>Guerra Fria: confronto ideológico e geopolítico</li>
                            <li>Globalização e suas consequências</li>
                            <li>Descolonização e movimentos de independência</li>
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