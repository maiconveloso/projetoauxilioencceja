// Função para alternar entre as abas
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove a classe active de todas as abas e conteúdos
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Adiciona a classe active à aba clicada
        tab.classList.add('active');
        
        // Mostra o conteúdo correspondente à aba clicada
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Função para exibir notificação
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    notification.className = 'notification';
    notification.classList.add(type);
    notification.classList.add('show');
    
    notificationMessage.textContent = message;
    
    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para baixar prova
function downloadExam(title, year, type) {
    showNotification(`Iniciando download de: ${title}`);
    // Aqui você implementaria a lógica real de download
    console.log(`Baixando prova: ${title}, Ano: ${year}, Tipo: ${type}`);
}

// Função para visualizar prova
function viewExam(title, year, type) {
    showNotification(`Abrindo visualização de: ${title}`);
    // Aqui você implementaria a lógica para abrir a prova em visualização
    console.log(`Visualizando prova: ${title}, Ano: ${year}, Tipo: ${type}`);
}

// Função para acessar recurso adicional
function viewResource(title) {
    showNotification(`Acessando recurso: ${title}`);
    // Aqui você implementaria a lógica para abrir o recurso
    console.log(`Acessando recurso: ${title}`);
}

// Função para pesquisar
document.getElementById('searchInput').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const examCards = document.querySelectorAll('.exam-card');
    
    examCards.forEach(card => {
        const title = card.querySelector('.exam-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Função para filtrar provas
function filterExams() {
    const yearFilter = document.getElementById('yearFilter').value;
    const subjectFilter = document.getElementById('subjectFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    const examCards = document.querySelectorAll('.exam-card');
    
    examCards.forEach(card => {
        const year = card.querySelector('.exam-year').textContent;
        const info = card.querySelectorAll('.exam-info span');
        let showCard = true;
        
        // Verifica se o ano corresponde ao filtro
        if (yearFilter && !year.includes(yearFilter)) {
            showCard = false;
        }
        
        // Verifica se o tipo corresponde ao filtro
        if (typeFilter) {
            let cardType = '';
            info.forEach(item => {
                if (item.textContent.includes('Nacional') && typeFilter === 'nacional') {
                    cardType = 'nacional';
                } else if (item.textContent.includes('Especial') && typeFilter === 'especial') {
                    cardType = 'especial';
                } else if (item.textContent.includes('Digital') && typeFilter === 'digital') {
                    cardType = 'digital';
                }
            });
            
            if (cardType !== typeFilter) {
                showCard = false;
            }
        }
        
        // Verifica se a área corresponde ao filtro
        if (subjectFilter) {
            let subjectMatch = false;
            info.forEach(item => {
                if (item.textContent.toLowerCase().includes(subjectFilter)) {
                    subjectMatch = true;
                }
            });
            
            if (!subjectMatch) {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Adiciona eventos aos filtros
document.getElementById('yearFilter').addEventListener('change', filterExams);
document.getElementById('subjectFilter').addEventListener('change', filterExams);
document.getElementById('typeFilter').addEventListener('change', filterExams);