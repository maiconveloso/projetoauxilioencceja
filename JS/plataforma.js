document.addEventListener('DOMContentLoaded', function() {
    // QR Code
    new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Itens de recursos
    document.querySelectorAll('.resource-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.title').textContent;
            const type = this.closest('.card').querySelector('.card-header').textContent.trim();
            
            const toastContainer = document.createElement('div');
            toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '11';
            toastContainer.innerHTML = `
                <div class="toast show" role="alert">
                    <div class="toast-header">
                        <i class="bi bi-info-circle text-primary me-2"></i>
                        <strong class="me-auto">Informação</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">Abrindo ${type}: ${title}</div>
                </div>
            `;
            
            document.body.appendChild(toastContainer);
            setTimeout(() => toastContainer.remove(), 3000);
        });
    });

    // Links de redes sociais
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', function(e) {});
    });

    // Modal de acessibilidade
    const accessibilityModal = document.getElementById('accessibilityModal');
    const accessibilityBtn = document.getElementById('accessibilityBtn');
    
    accessibilityBtn.addEventListener('click', () => accessibilityModal.classList.add('show'));
    
    document.getElementById('accessibilityModalClose').addEventListener('click', () => 
        accessibilityModal.classList.remove('show'));
    
    accessibilityModal.addEventListener('click', function(event) {
        if (event.target === accessibilityModal) {
            accessibilityModal.classList.remove('show');
        }
    });

    // Controles de acessibilidade
    const fontSizeRange = document.getElementById('fontSizeRange');
    const lineHeightRange = document.getElementById('lineHeightRange');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const lineHeightValue = document.getElementById('lineHeightValue');
    
    fontSizeRange.addEventListener('input', function() {
        const values = ['Pequeno', 'Médio', 'Grande', 'Muito Grande'];
        fontSizeValue.textContent = values[this.value - 1];
    });
    
    lineHeightRange.addEventListener('input', function() {
        const values = ['Normal', 'Médio', 'Alto'];
        lineHeightValue.textContent = values[this.value - 1];
    });

    // Salvar configurações de acessibilidade
    document.getElementById('saveAccessibilitySettings').addEventListener('click', function() {
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
    document.getElementById('resetAccessibilitySettings').addEventListener('click', function() {
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

    // Efeito de digitação na barra de busca
    const searchInput = document.getElementById('searchInput');
    const typingCursor = document.getElementById('typingCursor');
    const placeholderTexts = ["Buscar recursos, aulas, exercícios..."];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = placeholderTexts[currentTextIndex];
        
        if (isDeleting) {
            searchInput.setAttribute('placeholder', currentText.substring(0, currentCharIndex - 1));
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            searchInput.setAttribute('placeholder', currentText.substring(0, currentCharIndex + 1));
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    typeText();
    
    searchInput.addEventListener('focus', () => typingCursor.style.display = 'none');
    searchInput.addEventListener('input', () => typingCursor.style.display = 'none');
    searchInput.addEventListener('blur', () => {
        if (searchInput.value === '') typingCursor.style.display = 'block';
    });

    // Relógio
    function updateClock() {
        const now = new Date();
        document.getElementById('hours').textContent = now.getHours().toString().padStart(2, '0');
        document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
        setTimeout(updateClock, 1000 - (now.getTime() % 1000));
    }
    
    updateClock();
});