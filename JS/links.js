 // Efeito de digitação na barra de busca
        const searchBar = document.getElementById('searchBar');
        const placeholderTexts = [
            "Busque por recursos educacionais...",
            "Encontre links úteis para o Encceja...",
            "Pesquise por ajuda para o Encceja...",
            "Digite para buscar simulados e videoaulas..."
        ];
        
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentText = placeholderTexts[currentTextIndex];
            
            if (isDeleting) {
                searchBar.placeholder = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                searchBar.placeholder = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pausa antes de apagar
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
                typingSpeed = 500; // Pausa antes de começar a escrever o próximo texto
            }
            
            setTimeout(typeEffect, typingSpeed);
        }

        // Iniciar o efeito de digitação quando a página carregar
        window.onload = function() {
            typeEffect();
        };

        // Funcionalidade da barra de busca
        searchBar.addEventListener('focus', function() {
            this.placeholder = "";
        });

        searchBar.addEventListener('blur', function() {
            if (this.value === "") {
                this.placeholder = placeholderTexts[currentTextIndex].substring(0, currentCharIndex);
            }
        });