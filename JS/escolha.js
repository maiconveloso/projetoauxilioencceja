document.addEventListener('DOMContentLoaded', function() {
    const studentCard = document.getElementById('student-card');
    const teacherCard = document.getElementById('teacher-card');
    const continueLink = document.getElementById('continue-link');
    const backButton = document.getElementById('back-button');
    
    let selectedRole = null;
    
    function selectRole(role, card) {
        // Remove seleção anterior
        if (selectedRole) {
            document.getElementById(`${selectedRole}-card`).classList.remove('selected');
        }
        
        // Define nova seleção
        selectedRole = role;
        card.classList.add('selected');
        continueLink.disabled = false;
        
        // Atualiza o href do link
        if (role === 'student') {
            continueLink.href = 'login.html';
        } else if (role === 'teacher') {
            continueLink.href = 'login.html';
        }
    }
    
    studentCard.addEventListener('click', function() {
        selectRole('student', studentCard);
    });
    
    teacherCard.addEventListener('click', function() {
        selectRole('teacher', teacherCard);
    });
    
    continueLink.addEventListener('click', function(event) {
        if (!selectedRole) {
            event.preventDefault();
            return;
        }
        
        // Mostrar toast de sucesso
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '11';
        
        toastContainer.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-success text-white">
                    <i class="bi bi-check-circle me-2"></i>
                    <strong class="me-auto">Sucesso</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Redirecionando para a página de login como ${selectedRole === 'student' ? 'aluno' : 'professor'}
                </div>
            </div>
        `;
        
        document.body.appendChild(toastContainer);
        
        setTimeout(() => {
            toastContainer.remove();
        }, 3000);
        
        // Redireciona para a página correspondente
        window.location.href = 'login.html';
    });
    
    // Adiciona evento de clique para o botão de voltar
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Mostrar toast de confirmação
            const toastContainer = document.createElement('div');
            toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '11';
            
            toastContainer.innerHTML = `
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header bg-info text-white">
                        <i class="bi bi-info-circle me-2"></i>
                        <strong class="me-auto">Informação</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Voltando para a página inicial...
                    </div>
                </div>
            `;
            
            document.body.appendChild(toastContainer);
            
            setTimeout(() => {
                toastContainer.remove();
            }, 3000);
            
            // Redireciona para a página inicial
            window.location.href = 'index.html';
        });
    }
});