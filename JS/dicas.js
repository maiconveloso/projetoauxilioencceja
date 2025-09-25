// Função para filtrar dicas por categoria
function filterTips(category) {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Adiciona evento aos botões de categoria
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe active de todos os botões
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona a classe active ao botão clicado
        button.classList.add('active');
        
        // Filtra as dicas
        const category = button.dataset.category;
        filterTips(category);
    });
});

// Função de pesquisa
function searchTips() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const tipCards = document.querySelectorAll('.tip-card');
    const noResults = document.getElementById('no-results');
    
    let resultsFound = false;
    
    tipCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'block';
            resultsFound = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Mostra ou oculta a mensagem de "nenhum resultado"
    if (resultsFound) {
        noResults.style.display = 'none';
    } else {
        noResults.style.display = 'block';
    }
}

// Adiciona evento ao botão de pesquisa
document.getElementById('search-btn').addEventListener('click', searchTips);

// Adiciona evento ao pressionar Enter na barra de pesquisa
document.getElementById('search-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchTips();
    }
});

// Timer Pomodoro
let timerInterval;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-timer');
const resetBtn = document.getElementById('reset-timer');

function updateTimerDisplay() {
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        
        timerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
                    
                    // Alerta de tempo terminado
                    const notification = document.createElement('div');
                    notification.style.position = 'fixed';
                    notification.style.bottom = '20px';
                    notification.style.right = '20px';
                    notification.style.backgroundColor = 'var(--primary-color)';
                    notification.style.color = 'white';
                    notification.style.padding = '15px 20px';
                    notification.style.borderRadius = '5px';
                    notification.style.boxShadow = 'var(--shadow)';
                    notification.style.zIndex = '1000';
                    notification.innerHTML = '<i class="fas fa-bell"></i> Seu tempo de estudo terminou! Faça uma pausa.';
                    
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.opacity = '0';
                        notification.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 500);
                    }, 5000);
                    
                    // Reinicia o timer para a próxima sessão
                    minutes = 25;
                    seconds = 0;
                    updateTimerDisplay();
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
    startBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Inicializa o display do timer
updateTimerDisplay();