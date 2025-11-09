document.addEventListener('DOMContentLoaded', function() {
    const acceptBtn = document.getElementById('acceptBtn');
    const declineBtn = document.getElementById('declineBtn');
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationMessage = document.getElementById('notificationMessage');
    const searchInput = document.getElementById('searchInput');
    const termsContent = document.getElementById('termsContent');
    
    // Função para mostrar notificação
    function showNotification(message, type) {
        notification.className = 'notification show';
        
        if (type === 'success') {
            notification.classList.add('notification-success');
            notificationIcon.className = 'fas fa-check-circle';
        } else {
            notification.classList.add('notification-error');
            notificationIcon.className = 'fas fa-exclamation-circle';
        }
        
        notificationMessage.textContent = message;
        
        setTimeout(() => {
            notification.className = 'notification';
        }, 3000);
    }
    
    // Aceitar os termos
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('termsAccepted', 'true');
        showNotification('Termos aceitos com sucesso! Redirecionando para a página principal...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    });
    
    // Recusar os termos
    declineBtn.addEventListener('click', function() {
        showNotification('Você precisa aceitar os termos para usar o Auxílio Encceja.', 'error');
    });
    
    // Pesquisar nos termos
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // Remover todos os highlights
            const highlights = termsContent.querySelectorAll('.highlight');
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            });
            return;
        }
        
        // Remover highlights anteriores
        const highlights = termsContent.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
        
        // Adicionar novos highlights
        const textNodes = getTextNodes(termsContent);
        textNodes.forEach(node => {
            const text = node.nodeValue;
            const lowerText = text.toLowerCase();
            let startIndex = 0;
            let index;
            
            while ((index = lowerText.indexOf(searchTerm, startIndex)) > -1) {
                const before = text.substring(startIndex, index);
                const match = text.substring(index, index + searchTerm.length);
                const after = text.substring(index + searchTerm.length);
                
                const span = document.createElement('span');
                span.className = 'highlight';
                span.textContent = match;
                
                const beforeNode = document.createTextNode(before);
                const afterNode = document.createTextNode(after);
                
                const parent = node.parentNode;
                parent.insertBefore(beforeNode, node);
                parent.insertBefore(span, node);
                parent.insertBefore(afterNode, node);
                
                parent.removeChild(node);
                
                startIndex = index + match.length;
                node = afterNode;
            }
        });
    });
    
    // Função para obter todos os nós de texto dentro de um elemento
    function getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() !== '') {
                textNodes.push(node);
            }
        }
        
        return textNodes;
    }
});