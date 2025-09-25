// Timer functionality
const timerDisplay = document.getElementById('timer-display');
const startTimerBtn = document.getElementById('start-timer-btn');
const pauseTimerBtn = document.getElementById('pause-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');

let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isTimerRunning = false;
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isTimerRunning = false;
                showNotification('Tempo de estudo concluído! Faça uma pausa.');
            }
        }, 1000);
    }
}
function pauseTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}
function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}
startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);
// Modal functionality
const postModal = document.getElementById('post-modal');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

const createPostBtn = document.getElementById('create-post-btn');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const startStudyingBtn = document.getElementById('start-studying-btn');

const closePostModal = document.getElementById('close-post-modal');
const closeLoginModal = document.getElementById('close-login-modal');
const closeSignupModal = document.getElementById('close-signup-modal');

const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
function openModal(modal) {
    modal.style.display = 'flex';
}
function closeModal(modal) {
    modal.style.display = 'none';
}
createPostBtn.addEventListener('click', () => openModal(postModal));
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));
startStudyingBtn.addEventListener('click', () => {
    showNotification('Bom estudo! Boa sorte no seu preparo para o ENCCEJA.');
});
closePostModal.addEventListener('click', () => closeModal(postModal));
closeLoginModal.addEventListener('click', () => closeModal(loginModal));
closeSignupModal.addEventListener('click', () => closeModal(signupModal));
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});
switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});
// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === postModal) closeModal(postModal);
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
});
// Form submissions
const postForm = document.getElementById('post-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const category = document.getElementById('post-category').value;
    
    // Here you would normally send this data to a server
    console.log('Post submitted:', { title, content, category });
    
    closeModal(postModal);
    showNotification('Postagem criada com sucesso!');
    postForm.reset();
});
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Here you would normally authenticate with a server
    console.log('Login attempt:', { email, password });
    
    closeModal(loginModal);
    showNotification('Login realizado com sucesso!');
    loginForm.reset();
});
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password !== confirmPassword) {
        showNotification('As senhas não coincidem!');
        return;
    }
    
    // Here you would normally register with a server
    console.log('Signup attempt:', { name, email, password });
    
    closeModal(signupModal);
    showNotification('Cadastro realizado com sucesso!');
    signupForm.reset();
});
// Notification functionality
const notification = document.getElementById('notification');
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
// Initialize timer display
updateTimerDisplay();