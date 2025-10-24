// Função para mostrar preview da apostila
        function showPreview(apostila) {
            const apostilaModal = new bootstrap.Modal(document.getElementById('apostilaModal'));
            document.getElementById('previewTitle').textContent = apostila;
            
            // Conteúdo específico para cada apostila
            let content = '';
            switch(apostila) {
                case 'Física Básica':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de física para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Movimento e suas grandezas: posição, deslocamento, velocidade e aceleração</li>
                            <li>Leis de Newton e dinâmica</li>
                            <li>Energia: potencial, cinética e conservação</li>
                            <li>Temperatura e calor: termometria e transferência de calor</li>
                            <li>Pressão e fluidos</li>
                            <li>Movimento harmônico simples</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Química':
                    content = `
                        <p>Esta apostila aborda os principais conceitos de química para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Átomo e estrutura atômica: modelos atômicos e distribuição eletrônica</li>
                            <li>Períodos e grupos na tabela periódica</li>
                            <li>Reações químicas e equilíbrio químico: leis de estequiometria</li>
                            <li>Soluções e equilíbrio ácido-base: pH e buffers</li>
                            <li>Química orgânica: hidrocarbonetos e seus derivados</li>
                            <li>Química inorgânica: ácidos, bases e sais</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Biologia':
                    content = `
                        <p>Esta apostila aborda os conceitos fundamentais de biologia para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Célula e suas estruturas: procarióticas e eucarióticas</li>
                            <li>Nutrição e respiração celular: tipos e processos</li>
                            <li>Genética e hereditariedade: lei de Mendel e DNA</li>
                            <li>Ecologia e conservação ambiental: ecossistemas e biodiversidade</li>
                            <li>Sistemas biológicos: circulatorio, respiratório e digestivo</li>
                            <li>Desenvolvimento humano e reprodutividade</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Física Avançada':
                    content = `
                        <p>Esta apostila aborda os conceitos avançados de física para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Óptica: propagação da luz, reflexão e refração</li>
                            <li>Eletromagnetismo: leis de Faraday e Lenz</li>
                            <li>Corrente elétrica: circuitos, resistência e potência elétrica</li>
                            <li>Ondas mecânicas e eletromagnéticas</li>
                            <li>Física moderna: dualidade onda-partícula</li>
                            <li>Relatividade especial: princípios e consequências</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Bioquímica':
                    content = `
                        <p>Esta apostila aborda os conceitos de bioquímica para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Biomoléculas e sua estrutura: proteínas, carboidratos e lipídios</li>
                            <li>Enzimologia e catálise enzimática: mecanismos e fatores reguladores</li>
                            <li>Metabolismo celular: glicólise, ciclo de Krebs e fosforilação oxidativa</li>
                            <li>Processos bioquímicos de sistemas biológicos: fotosíntese</li>
                            <li>Genética molecular: expressão gênica</li>
                            <li>Imunologia: sistema imunológico e resposta imune</li>
                        </ul>
                        <p>A apostila contém exemplos práticos e exercícios resolvidos para ajudar na fixação do conteúdo.</p>
                    `;
                    break;
                case 'Química Orgânica':
                    content = `
                        <p>Esta apostila aborda os conceitos avançados de química orgânica para o ENCCEJA.</p>
                        <p>Conheça os principais tópicos abordados:</p>
                        <ul>
                            <li>Compostos orgânicos e nomenclatura: regras IUPAC</li>
                            <li>Alcanos, alquenos e alquinos: estruturas e propriedades</li>
                            <li>Hidrocarbonetos aromáticos: benzeno e seus derivados</li>
                            <li>Funções orgânicas: álcoois, aldeídos e cetônicos</li>
                            <li>Reações orgânicas e mecanismos: substituição e adição</li>
                            <li>Polímeros orgânicos: tipos e aplicações</li>
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
        
        // Scroll suave para seções
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });