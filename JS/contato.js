document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const helpOptions = document.querySelectorAll('.help-option');
    const subjectSelect = document.getElementById('subject');
    
    // Adicionar evento de clique aos itens de ajuda
    helpOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionText = this.querySelector('span').textContent;
            
            // Mapear opções para valores do select
            let value;
            switch(optionText) {
                case 'Dúvidas sobre o conteúdo':
                    value = 'duvida';
                    break;
                case 'Informações sobre datas':
                    value = 'data';
                    break;
                case 'Localização de provas':
                    value = 'local';
                    break;
                case 'Documentação e certificados':
                    value = 'documentacao';
                    break;
                default:
                    value = 'outro';
            }
            
            subjectSelect.value = value;
            
            // Rolagem suave para o formulário
            document.querySelector('.contact-form').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
    
    // Evento de envio do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio (em um app real, você faria uma requisição AJAX)
        setTimeout(() => {
            // Mostrar toast de sucesso
            toast.classList.add('show');
            
            // Resetar formulário
            contactForm.reset();
            
            // Remover toast após 5 segundos
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }, 1000);
    });
});