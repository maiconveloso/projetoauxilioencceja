// Adiciona funcionalidade de clique nos itens de recursos
document.querySelectorAll('.resource-item').forEach(item => {
    item.addEventListener('click', function () {
        const title = this.querySelector('.title').textContent;
        const type = this.closest('.card').querySelector('.card-header').textContent.trim();

        // Aqui você pode adicionar a lógica para abrir o recurso
        console.log(`Abrindo ${type} - ${title}`);

        // Exemplo de toast notification
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '11';

        toastContainer.innerHTML = `
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <i class="bi bi-info-circle text-primary me-2"></i>
                            <strong class="me-auto">Informação</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            Abrindo ${type}: ${title}
                        </div>
                    </div>
                `;

        document.body.appendChild(toastContainer);

        setTimeout(() => {
            toastContainer.remove();
        }, 3000);
    });
});

// Links de redes sociais
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', function(e) {});
    });

// Adiciona funcionalidade ao botão de refresh do progresso
document.getElementById('refreshProgress').addEventListener('click', function () {
    const progressBar = document.querySelector('.progress-fill');
    const progressLabel = document.querySelector('.progress-label');

    // Gera um novo valor de progresso aleatório entre 50 e 90
    const newProgress = Math.floor(Math.random() * 41) + 50;

    // Atualiza a largura da barra de progresso e o texto
    progressBar.style.width = newProgress + '%';
    progressLabel.textContent = newProgress + '%';

    // Adiciona uma classe de animação para suavizar a transição
    progressBar.classList.add('animate-progress');

    // Remove a classe de animação após a conclusão
    setTimeout(() => {
        progressBar.classList.remove('animate-progress');
    }, 1000);
});

// Adiciona funcionalidade ao botão de adicionar plano de estudo
document.getElementById('addStudyPlan').addEventListener('click', function () {
    const modal = new bootstrap.Modal(document.getElementById('addStudyPlanModal'));
    modal.show();
});

// Adiciona funcionalidade ao botão de salvar plano de estudo
document.getElementById('saveStudyPlan').addEventListener('click', function () {
    const title = document.getElementById('activityTitle').value;
    const difficulty = document.getElementById('activityDifficulty').value;

    if (title.trim() === '') {
        alert('Por favor, insira um título para a atividade.');
        return;
    }

    // Determina a classe do badge com base na dificuldade
    let difficultyBadge = '';
    if (difficulty === 'easy') {
        difficultyBadge = '<span class="badge bg-success">Fácil</span>';
    } else if (difficulty === 'medium') {
        difficultyBadge = '<span class="badge bg-warning">Média</span>';
    } else {
        difficultyBadge = '<span class="badge bg-danger">Difícil</span>';
    }

    // Cria um novo item no plano de estudo
    const studyPlanContainer = document.querySelector('.study-plan-item:last-child');
    const newItem = studyPlanContainer.cloneNode(true);

    // Atualiza o conteúdo do novo item
    newItem.querySelector('.study-plan-title').textContent = title;
    newItem.querySelector('.study-plan-description').textContent = 'Novo conteúdo adicionado';
    newItem.querySelector('.study-plan-difficulty').innerHTML = 'Dificuldade: ' + difficultyBadge;

    // Adiciona o novo item antes do último item
    studyPlanContainer.parentNode.insertBefore(newItem, studyPlanContainer);

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addStudyPlanModal'));
    modal.hide();

    // Reseta o formulário
    document.getElementById('activityTitle').value = '';
    document.getElementById('activityDescription').value = '';
});

// Adiciona funcionalidade aos checkboxes do plano de estudo
document.querySelectorAll('.study-plan-checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const item = this.closest('.study-plan-item');
        const actions = item.querySelector('.study-plan-actions');

        if (this.checked) {
            actions.innerHTML = '<button class="btn btn-sm btn-outline-success">Revisar</button>';
        } else {
            actions.innerHTML = '<button class="btn btn-sm btn-outline-primary">Estudar</button>';
        }
    });
});

// Adiciona funcionalidade aos botões de detalhes das atividades
document.querySelectorAll('[data-bs-target="#activityDetailsModal"]').forEach(button => {
    button.addEventListener('click', function () {
        const activityType = this.getAttribute('data-activity');
        const modal = document.getElementById('activityDetailsModal');

        // Dados detalhados para cada tipo de atividade
        const activitiesData = {
            matematica: {
                type: 'Simulado de Matemática',
                date: 'Hoje, 10:30',
                duration: '45 minutos',
                status: '<span class="badge bg-success">Concluída</span>',
                score: 78,
                scoreText: '78% - Bem acima da média esperada!',
                strongAreas: ['Funções', 'Geometria', 'Estatística'],
                weakAreas: ['Álgebra', 'Trigonometria'],
                description: 'Simulado completo com 20 questões abrangendo os principais tópicos de Matemática do Ensino Médio, incluindo álgebra, geometria, estatística e trigonometria.',
                contents: [
                    'Funções lineares e quadráticas',
                    'Geometria plana e espacial',
                    'Análise combinatória e probabilidade',
                    'Trigonometria e relações trigonométricas'
                ],

                resources: [
                    { name: 'Apostila de Matemática - Capítulo 5', type: 'Referência' },
                    { name: 'Videoaula: Resolução de Equações', type: 'Suporte' },
                    { name: 'Calculadora Científica', type: 'Ferramenta' }
                ],

                questions: [
                    { number: 1, question: 'Qual é o valor de x na equação 2x + 5 = 15?', answer: 'A) 5', correct: true },
                    { number: 2, question: 'Qual é a área de um triângulo com base 6cm e altura 4cm?', answer: 'B) 12cm²', correct: true },
                    { number: 3, question: 'Qual é o valor de sen(30°)?', answer: 'C) 0.5', correct: true },
                    { number: 4, question: 'Qual é o valor de cos(45°)?', answer: 'A) 0.707', correct: false },
                    { number: 5, question: 'Qual é a equação da reta que passa pelos pontos (1,2) e (3,4)?', answer: 'B) y = x + 1', correct: false }
                ],

                recommendations: [
                    'Recomendamos focar em <strong>Álgebra</strong> e <strong>Trigonometria</strong>, que foram suas áreas com menor desempenho.',
                    'Pratique mais exercícios de equações do segundo grau e identidades trigonométricas.',
                    'Assista às videoaulas recomendadas na seção de recursos.'
                ]
            },

            portugues: {
                type: 'Videoaula: Gramática',
                date: 'Hoje, 09:15',
                duration: '30 minutos',
                status: '<span class="badge bg-success">Concluída</span>',
                score: 92,
                scoreText: '92% - Excelente desempenho!',
                strongAreas: ['Ortografia', 'Pontuação', 'Concordância'],
                weakAreas: ['Regência Verbal'],
                description: 'Videoaula sobre os principais conceitos de gramática da língua portuguesa, com foco em ortografia, pontuação, concordância e regência verbal.',
                contents: [
                    'Ortografia oficial e uso de porquês',
                    'Pontuação e seus usos',
                    'Concordância verbal e nominal',
                    'Regência verbal e nominal'
                ],

                resources: [
                    { name: 'Gramática Contemporânea da Língua Portuguesa', type: 'Referência' },
                    { name: 'Exercícios de Fixação - Módulo 3', type: 'Prática' },
                    { name: 'Dicionário Aurélio Online', type: 'Ferramenta' }
                ],

                questions: [
                    { number: 1, question: 'Assinale a alternativa em que o uso do porquê está incorreto:', answer: 'A) Não sei porquê ele não veio.', correct: true },
                    { number: 2, question: 'Em "As crianças brincavam alegremente", o termo em destaque é:', answer: 'B) Advérbio de modo', correct: true },
                    { number: 3, question: 'A frase "Todos os alunos estudaram para a prova" apresenta:', answer: 'C) Sujeito simples', correct: true },
                    { number: 4, question: 'O verbo transitivo indireto exige:', answer: 'A) Complemento com preposição', correct: false },
                    { number: 5, question: 'Em "O livro que li era interessante", o termo em destaque é:', answer: 'B) Pronome relativo', correct: false }
                ],

                recommendations: [
                    'Seu desempenho foi excelente! Continue estudando com a mesma dedicação.',
                    'Para aprimorar ainda mais, recomendamos focar em <strong>Regência Verbal</strong>, sua única área com menor desempenho.',
                    'Pratique com exercícios de regência verbal para consolidar o conhecimento.'
                ]
            },

            historia: {
                type: 'Exercícios de História',
                date: 'Ontem, 16:45',
                duration: '60 minutos',
                status: '<span class="badge bg-success">Concluída</span>',
                score: 65,
                scoreText: '65% - Dentro da média esperada!',
                strongAreas: ['Brasil Colônia', 'Brasil Império'],
                weakAreas: ['Brasil República', 'História Contemporânea'],
                description: 'Série de exercícios sobre a história do Brasil, abordando desde o período colonial até os dias atuais, com ênfase nos principais eventos e personagens.',
                contents: [
                    'Período pré-colonial e colonização',
                    'Crise do sistema colonial e processo de independência',
                    'Primeiro e Segundo Reinado',
                    'República Velha, Era Vargas e Brasil Contemporâneo'
                ],

                resources: [
                    { name: 'História do Brasil - Bóris Fausto', type: 'Referência' },
                    { name: 'Linha do Tempo Interativa', type: 'Ferramenta' },
                    { name: 'Documentários: Brasil, uma História', type: 'Suporte' }
                ],

                questions: [
                    { number: 1, question: 'As Capitanias Hereditárias foram um sistema de:', answer: 'A) Colonização', correct: true },
                    { number: 2, question: 'A chegada da Família Real ao Brasil ocorreu em:', answer: 'B) 1808', correct: true },
                    { number: 3, question: 'A Proclamação da República foi em:', answer: 'C) 1889', correct: true },
                    { number: 4, question: 'O Estado Novo foi um período da Era Vargas entre:', answer: 'A) 1937-1945', correct: false },
                    { number: 5, question: 'O Plano Real foi implementado no governo de:', answer: 'B) Itamar Franco', correct: false }
                ],

                recommendations: [
                    'Recomendamos focar em <strong>Brasil República</strong> e <strong>História Contemporânea</strong>, que foram suas áreas com menor desempenho.',
                    'Assista aos documentários recomendados e crie uma linha do tempo para visualizar melhor os eventos.',
                    'Pratique com exercícios sobre o período republicano para consolidar o conhecimento.'
                ]
            },

            geografia: {
                type: 'Simulado de Geografia',
                date: 'Ontem, 14:20',
                duration: '60 minutos',
                status: '<span class="badge bg-warning">Em andamento</span>',
                score: 71,
                scoreText: '71% - Bom desempenho, mas pode melhorar!',
                strongAreas: ['Geografia Física', 'Cartografia'],
                weakAreas: ['Geografia Humana', 'Geografia Econômica'],
                description: 'Simulado abrangendo os principais conceitos de geografia, incluindo geografia física, humana, econômica e cartografia.',
                contents: [
                    'Estrutura geológica e relevo brasileiro',
                    'Climatologia e hidrografia',
                    'População e urbanização',
                    'Atividades econômicas e globalization'
                ],

                resources: [
                    { name: 'Atlas Geográfico Escolar', type: 'Referência' },
                    { name: 'Mapas Interativos do IBGE', type: 'Ferramenta' },
                    { name: 'Videoaula: Globalização e Blocos Econômicos', type: 'Suporte' }
                ],

                questions: [
                    { number: 1, question: 'A principal bacia hidrográfica do Brasil é:', answer: 'A) Bacia Amazônica', correct: true },
                    { number: 2, question: 'O clima predominante na região Nordeste é:', answer: 'B) Tropical semiárido', correct: true },
                    { number: 3, question: 'A maior densidade populacional do Brasil encontra-se na:', answer: 'C) Região Sudeste', correct: true },
                    { number: 4, question: 'O Mercosul é um bloco econômico formado por:', answer: 'A) Brasil, Argentina, Paraguai e Uruguai', correct: false },
                    { number: 5, question: 'A urbanização acelerada no Brasil ocorreu principalmente:', answer: 'B) A partir de 1950', correct: false }
                ],

                recommendations: [
                    'Para concluir o simulado com sucesso, recomendamos focar em <strong>Geografia Humana</strong> e <strong>Geografia Econômica</strong>.',
                    'Utilize os mapas interativos do IBGE para visualizar melhor os conceitos estudados.',
                    'Assista à videoaula recomendada sobre globalização e blocos econômicos.'
                ]
            },

            ciencias: {
                type: 'Apostila de Ciências',
                date: 'Seg, 10:00',
                duration: '90 minutos',
                status: '<span class="badge bg-danger">Pendente</span>',
                score: 0,
                scoreText: 'Ainda não iniciada',
                strongAreas: [],
                weakAreas: [],
                description: 'Estudo da apostila de Ciências, abordando os principais conceitos de biologia, física e química do Ensino Fundamental II e Médio.',
                contents: [
                    'Origem da vida e evolução',
                    'Estrutura e função dos seres vivos',
                    'Ecologia e meio ambiente',
                    'Fundamentos de física e química'
                ],

                resources: [
                    { name: 'Apostila de Ciências - Volume 3', type: 'Material Principal' },
                    { name: 'Experimentos práticos para casa', type: 'Prática' },
                    { name: 'Vídeos de experimentos científicos', type: 'Suporte' }
                ],

                questions: [],
                recommendations: [
                    'Esta atividade ainda não foi iniciada. Recomendamos dedicar tempo para estudar a apostila.',
                    'Comece pelos tópicos que você tem mais dificuldade para otimizar seu tempo de estudo.',
                    'Utilize os vídeos de experimentos para tornar o aprendizado mais prático e interessante.'
                ]
            }
        };

        // Obtém os dados da atividade selecionada
        const activityData = activitiesData[activityType];

        // Atualiza o título do modal
        modal.querySelector('.modal-title').textContent = 'Detalhes de ' + activityType.charAt(0).toUpperCase() + activityType.slice(1);

        // Atualiza os detalhes básicos da atividade
        modal.querySelector('#activityType').textContent = activityData.type;
        modal.querySelector('#activityDate').textContent = activityData.date;
        modal.querySelector('#activityDuration').textContent = activityData.duration;
        modal.querySelector('#activityStatus').innerHTML = activityData.status;

        // Atualiza a descrição da atividade
        modal.querySelector('#activityDescription').textContent = activityData.description;

        // Atualiza os conteúdos abordados
        const contentsList = modal.querySelector('#activityContents ul');
        contentsList.innerHTML = '';
        activityData.contents.forEach(content => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = content;
            contentsList.appendChild(li);
        });

        // Atualiza os recursos utilizados
        const resourcesList = modal.querySelector('#activityResources ul');
        resourcesList.innerHTML = '';
        activityData.resources.forEach(resource => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                        ${resource.name}
                        <span class="badge bg-info">${resource.type}</span>
                    `;
            resourcesList.appendChild(li);
        });

        // Atualiza as questões resolvidas
        const questionsTableBody = modal.querySelector('#questionsTableBody');
        questionsTableBody.innerHTML = '';

        if (activityData.questions.length > 0) {
            activityData.questions.forEach(question => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                            <td>${question.number}</td>
                            <td>${question.question}</td>
                            <td>${question.answer}</td>
                            <td>${question.correct ? '<i class="bi bi-check-circle text-success"></i>' : '<i class="bi bi-x-circle text-danger"></i>'}</td>
                        `;
                questionsTableBody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                        <td colspan="4" class="text-center">Nenhuma questão respondida ainda</td>
                    `;
            questionsTableBody.appendChild(tr);
        }

        // Atualiza as recomendações de estudo
        const recommendationsDiv = modal.querySelector('#studyRecommendations');
        if (activityData.recommendations.length > 0) {
            let recommendationsHTML = '<div class="alert alert-info"><h6><i class="bi bi-info-circle me-2"></i>Baseado no seu desempenho:</h6><ul>';
            activityData.recommendations.forEach(recommendation => {
                recommendationsHTML += `<li>${recommendation}</li>`;
            });
            recommendationsHTML += '</ul></div>';
            recommendationsDiv.innerHTML = recommendationsHTML;
        } else {
            recommendationsDiv.innerHTML = '<div class="alert alert-warning"><h6><i class="bi bi-exclamation-triangle me-2"></i>Atenção:</h6><p>Esta atividade ainda não foi iniciada. Comece a estudar para receber recomendações personalizadas.</p></div>';
        }

        // Atualiza as áreas fortes e fracas
        const strongAreasDiv = modal.querySelector('.detail-value:nth-child(5)');
        const weakAreasDiv = modal.querySelector('.detail-value:nth-child(6)');

        if (activityData.strongAreas.length > 0) {
            let strongAreasHTML = '';
            activityData.strongAreas.forEach(area => {
                strongAreasHTML += `<span class="badge bg-primary me-1">${area}</span>`;
            });
            strongAreasDiv.innerHTML = strongAreasHTML;
        } else {
            strongAreasDiv.innerHTML = '<span class="text-muted">Ainda não disponível</span>';
        }

        if (activityData.weakAreas.length > 0) {
            let weakAreasHTML = '';
            activityData.weakAreas.forEach(area => {
                weakAreasHTML += `<span class="badge bg-warning me-1">${area}</span>`;
            });
            weakAreasDiv.innerHTML = weakAreasHTML;
        } else {
            weakAreasDiv.innerHTML = '<span class="text-muted">Ainda não disponível</span>';
        }

        // Atualiza a nota
        const scoreDiv = modal.querySelector('.detail-value:nth-child(4)');
        if (activityData.score > 0) {
            scoreDiv.innerHTML = `
                        <div class="progress mb-2">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${activityData.score}%" aria-valuenow="${activityData.score}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span>${activityData.scoreText}</span>
                    `;
        } else {
            scoreDiv.innerHTML = '<span class="text-muted">Ainda não disponível</span>';
        }
    });
});

// Modal de acessibilidade
const accessibilityModal = document.getElementById('accessibilityModal');
const accessibilityBtn = document.getElementById('accessibilityBtn');

accessibilityBtn.addEventListener('click', () => accessibilityModal.classList.add('show'));

document.getElementById('accessibilityModalClose').addEventListener('click', () =>
    accessibilityModal.classList.remove('show'));

accessibilityModal.addEventListener('click', function (event) {
    if (event.target === accessibilityModal) {
        accessibilityModal.classList.remove('show');
    }
});

// Controles de acessibilidade
const fontSizeRange = document.getElementById('fontSizeRange');
const lineHeightRange = document.getElementById('lineHeightRange');
const fontSizeValue = document.getElementById('fontSizeValue');
const lineHeightValue = document.getElementById('lineHeightValue');

fontSizeRange.addEventListener('input', function () {
    const values = ['Pequeno', 'Médio', 'Grande', 'Muito Grande'];
    fontSizeValue.textContent = values[this.value - 1];
});

lineHeightRange.addEventListener('input', function () {
    const values = ['Normal', 'Médio', 'Alto'];
    lineHeightValue.textContent = values[this.value - 1];
});

// Salvar configurações de acessibilidade
document.getElementById('saveAccessibilitySettings').addEventListener('click', function () {
    const settings = {
        highContrast: document.getElementById('highContrastToggle').checked,
        darkMode: document.getElementById('darkModeToggle').checked,
        readingMode: document.getElementById('readingModeToggle').checked,
        highContrastCursor: document.getElementById('highContrastCursorToggle').checked,
        visibleFocus: document.getElementById('visibleFocusToggle').checked,
        reduceMotion: document.getElementById('reduceMotionToggle').checked,
        fontSize: fontSizeRange.value,
        lineHeight: lineHeightRange.value
    };

    // Aplicar configurações
    document.body.classList.toggle('high-contrast', settings.highContrast);
    document.getElementById('accessibilityBtn').classList.toggle('high-contrast', settings.highContrast);
    document.body.classList.toggle('dark-mode', settings.darkMode);
    document.body.classList.toggle('reading-mode', settings.readingMode);
    document.body.classList.toggle('high-contrast-cursor', settings.highContrastCursor);
    document.body.classList.toggle('visible-focus', settings.visibleFocus);

    if (settings.reduceMotion) {
        document.body.style.setProperty('--transition-speed', '0s');
        document.querySelectorAll('.animate-in').forEach(el => el.style.animation = 'none');
    } else {
        document.body.style.setProperty('--transition-speed', '0.3s');
    }

    // Aplicar tamanho da fonte
    document.body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-xlarge');
    if (settings.fontSize === '1') document.body.classList.add('font-size-small');
    else if (settings.fontSize === '2') document.body.classList.add('font-size-medium');
    else if (settings.fontSize === '3') document.body.classList.add('font-size-large');
    else if (settings.fontSize === '4') document.body.classList.add('font-size-xlarge');

    // Aplicar espaçamento entre linhas
    document.body.classList.remove('line-height-normal', 'line-height-medium', 'line-height-large');
    if (settings.lineHeight === '1') document.body.classList.add('line-height-normal');
    else if (settings.lineHeight === '2') document.body.classList.add('line-height-medium');
    else if (settings.lineHeight === '3') document.body.classList.add('line-height-large');

    // Mostrar toast
    const toastMessage = document.getElementById('accessibilityToastMessage');
    toastMessage.textContent = 'Configurações de acessibilidade salvas com sucesso!';
    new bootstrap.Toast(document.getElementById('accessibilityToast')).show();

    accessibilityModal.classList.remove('show');
});

// Resetar configurações de acessibilidade
document.getElementById('resetAccessibilitySettings').addEventListener('click', function () {
    // Resetar controles
    document.getElementById('highContrastToggle').checked = false;
    document.getElementById('darkModeToggle').checked = false;
    document.getElementById('readingModeToggle').checked = false;
    document.getElementById('highContrastCursorToggle').checked = false;
    document.getElementById('visibleFocusToggle').checked = false;
    document.getElementById('reduceMotionToggle').checked = false;
    document.getElementById('screenReaderToggle').checked = false;
    fontSizeRange.value = 2;
    lineHeightRange.value = 2;

    // Atualizar valores
    fontSizeValue.textContent = 'Médio';
    lineHeightValue.textContent = 'Médio';

    // Remover classes
    document.body.classList.remove(
        'high-contrast', 'dark-mode', 'reading-mode', 'high-contrast-cursor',
        'visible-focus', 'font-size-small', 'font-size-medium', 'font-size-large',
        'font-size-xlarge', 'line-height-normal', 'line-height-medium', 'line-height-large'
    );

    document.body.style.setProperty('--transition-speed', '0.3s');

    // Mostrar toast
    const toastMessage = document.getElementById('accessibilityToastMessage');
    toastMessage.textContent = 'Configurações de acessibilidade restauradas com sucesso!';
    new bootstrap.Toast(document.getElementById('accessibilityToast')).show();
});