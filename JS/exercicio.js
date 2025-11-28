// Adiciona funcionalidade de filtro às caixas de matérias
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active de todos os botões no mesmo grupo
        const group = this.closest('.btn-group');
        group.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
        });

        // Adiciona active ao botão clicado
        this.classList.add('active');

        // Filtra as matérias
        const filter = this.getAttribute('data-filter');

        document.querySelectorAll('.subject-box').forEach(box => {
            if (filter === 'all') {
                box.closest('.col-md-6').style.display = 'block';
            } else {
                const title = box.querySelector('.subject-title').textContent.toLowerCase();
                if (title.includes(filter)) {
                    box.closest('.col-md-6').style.display = 'block';
                } else {
                    box.closest('.col-md-6').style.display = 'none';
                }
            }
        });
    });
});

// Função para animar os elementos
function animateElements() {
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach(element => {
        setTimeout(() => {
            element.classList.add('show');
        }, 100);
    });
}

// Links de redes sociais
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', function(e) {});
    });

// Chama a função de animação quando a página carrega
window.addEventListener('DOMContentLoaded', animateElements);

// Função para abrir o modal de exercício
function openExerciseModal() {
    const modal = new bootstrap.Modal(document.getElementById('exerciseModal'));
    modal.show();
}

// Adiciona funcionalidade aos botões de exercício
document.querySelectorAll('.btn-start-study').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        openExerciseModal();
    });
});

// Adiciona funcionalidade aos opções do exercício
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function () {
        // Remove selected de todas as opções
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Adiciona selected à opção clicada
        this.classList.add('selected');

        // Verifica se a resposta está correta
        const correctOption = document.querySelector('.option[data-value="a"]');
        const feedback = document.getElementById('feedback');
        const explanation = document.getElementById('explanation');

        if (this === correctOption) {
            feedback.classList.add('correct');
            feedback.classList.remove('incorrect');
            feedback.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong>Correto!</strong> Você acertou a resposta.';
            feedback.style.display = 'block';
            explanation.style.display = 'block';

            // Marca a opção como correta
            this.classList.add('correct');
        } else {
            feedback.classList.add('incorrect');
            feedback.classList.remove('correct');
            feedback.innerHTML = '<i class="bi bi-x-circle-fill me-2"></i><strong>Incorreto!</strong> A resposta correta é a alternativa A.';
            explanation.style.display = 'block';

            // Marca a opção como incorreta
            this.classList.add('incorrect');

            // Marca a opção correta
            correctOption.classList.add('correct');
        }
    });
});

// Adiciona funcionalidade ao botão de exercício
document.getElementById('nextExercise').addEventListener('click', function () {
    const modal = bootstrap.Modal.getInstance(document.getElementById('exerciseModal'));
    modal.hide();

    // Aqui você pode adicionar lógica para carregar o próximo exercício
    setTimeout(() => {
        openExerciseModal();
    }, 500);
});

// Adiciona funcionalidade aos botões da tabela de últimos exercícios
document.querySelectorAll('.table button').forEach(btn => {
    btn.addEventListener('click', function () {
        openExerciseModal();
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