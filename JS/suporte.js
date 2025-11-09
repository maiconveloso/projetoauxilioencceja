// Botão voltar ao topo
const backToTopButton = document.getElementById('backToTop');
        
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Formulário de suporte
const supportForm = document.getElementById('supportForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

supportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulando envio de formulário
    setTimeout(() => {
        successModal.style.display = 'flex';
        supportForm.reset();
    }, 1000);
});

closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Tabs
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Chat functionality
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'message-user' : 'message-support');
    messageElement.textContent = message;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getResponse(message) {
    const responses = {
        'olá': 'Olá! Como posso ajudar você hoje?',
        'oi': 'Oi! Qual é o seu nome e como posso ajudar?',
        'quem é você?': 'Eu sou o chat de suporte do Auxílio ENCCEJA. Estou aqui para responder suas perguntas sobre o ENCCEJA e ajudar com suas dúvidas.',
        'data do exame': 'A data do próximo ENCCEJA será divulgada em breve. Por favor, consulte o site oficial do INEP para mais informações.',
        'como se inscrever': 'Para se inscrever no ENCCEJA, você precisa acessar o site do INEP (inep.gov.br), preencher o formulário de inscrição com seus dados e escolher a modalidade de certificação desejada.',
        'provas': 'As provas do ENCCEJA avaliam as áreas de conhecimento de Língua Portuguesa, Matemática, Ciências e Linguagens e Códigos para o Ensino Fundamental II, e Língua Portuguesa, Matemática, Ciências da Natureza, Ciências Humanas e Linguagens e Códigos para o Ensino Médio.',
        'material': 'Para acessar nosso material de estudo, clique na opção "Material de Estudo" no menu de suporte ou acesse diretamente em nossa seção de recursos.',
        'simulados': 'Nossos simulados estão disponíveis na seção de "Simulados e Questões". Lá você encontrará questões e provas anteriores para ajudar na sua preparação.'
    };
    
    // Convert message to lowercase for case-insensitive comparison
    const messageLower = message.toLowerCase();
    
    // Check if message contains any keyword
    for (const [keyword, response] of Object.entries(responses)) {
        if (messageLower.includes(keyword)) {
            return response;
        }
    }
    
    // Default response
    return 'Entendi sua pergunta. Por favor, consulte nossa seção de FAQs ou entre em contato com nossa equipe de suporte para obter mais informações.';
}

function handleChatMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response);
        }, 1000);
    }
}

sendMessage.addEventListener('click', handleChatMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleChatMessage();
    }
});

// Support cards functionality
const faqCard = document.getElementById('faq-card');
const videoCard = document.getElementById('video-card');
const materialCard = document.getElementById('material-card');
const contactCard = document.getElementById('contact-card');

faqCard.addEventListener('click', () => {
    document.querySelector('[data-tab="faq"]').click();
});

videoCard.addEventListener('click', () => {
    // This would typically navigate to the videos page
    alert('A página de vídeos será aberta em breve.');
});

materialCard.addEventListener('click', () => {
    // This would typically navigate to the materials page
    alert('A página de materiais será aberta em breve.');
});

contactCard.addEventListener('click', () => {
    document.querySelector('[data-tab="contact"]').click();
});