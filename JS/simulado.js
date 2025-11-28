// Adiciona funcionalidade aos botões de iniciar simulado
document.querySelectorAll('[id^="startSimuladoBtn"]').forEach(btn => {
    btn.addEventListener('click', function () {
        const modal = new bootstrap.Modal(document.getElementById('simuladoModal'));
        modal.show();
    });
});

// Adiciona funcionalidade ao botão de fechar o modal
document.querySelector('.modal-header .btn-close').addEventListener('click', function () {
    const modal = bootstrap.Modal.getInstance(document.getElementById('simuladoModal'));
    modal.hide();
});

// Adiciona funcionalidade ao botão de visualizar simulado
document.querySelector('.modal-footer .btn-primary').addEventListener('click', function () {
    const modal = bootstrap.Modal.getInstance(document.getElementById('simuladoModal'));
    modal.hide();

    // Exibe o modal de resultados
    setTimeout(() => {
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
    }, 500);
});

// Adiciona funcionalidade ao botão de controle de tempo
document.getElementById('timerBtn').addEventListener('click', function () {
    const timerModal = new bootstrap.Modal(document.getElementById('timerModal'));
    timerModal.show();
});

// Adiciona funcionalidade aos botões do timer
document.getElementById('startTimerBtn').addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('pauseTimerBtn').style.display = 'inline-block';

    // Lógica para iniciar o timer
    console.log('Timer iniciado');
});

document.getElementById('pauseTimerBtn').addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('startTimerBtn').style.display = 'inline-block';

    // Lógica para pausar o timer
    console.log('Timer pausado');
});

document.getElementById('resetTimerBtn').addEventListener('click', function () {

    // Lógica para reiniciar o timer
    document.getElementById('timerValue').textContent = '60:00';
    console.log('Timer reiniciado');
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