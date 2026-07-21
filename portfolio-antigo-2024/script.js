document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "Desenvolvedor Front-end",
        "estudante de Ciências da Computação",
    ];
    let phraseIndex = 0;

    function typeText(text, callback) {
        textElement.textContent = '';
        let index = 0;
        let interval = setInterval(() => {
            if (index < text.length) {
                textElement.textContent += text[index];
                index++;
            } else {
                clearInterval(interval);
                setTimeout(callback, 1000); // Aguarda 1 segundo antes de chamar o callback
            }
        }, 100);
    }

    function deleteText(callback) {
        let currentText = textElement.textContent;
        let length = currentText.length;
        let interval = setInterval(() => {
            if (length > 0) {
                textElement.textContent = currentText.substring(0, length - 1);
                length--;
            } else {
                clearInterval(interval);
                setTimeout(callback, 500); // Aguarda 0,5 segundo antes de chamar o callback
            }
        }, 100);
    }

    function loopThroughPhrases() {
        typeText(phrases[phraseIndex], () => {
            deleteText(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                loopThroughPhrases();
            });
        });
    }

    loopThroughPhrases();
});

function showContent(option) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    const activeContent = document.getElementById(option);
    activeContent.classList.add('active');
}

// Mostrar a primeira opção por padrão
document.addEventListener('DOMContentLoaded', () => {
    showContent('option1');
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('active');
        });

        card.addEventListener('mouseout', () => {
            card.classList.remove('active');
        });
    });
});

document.querySelectorAll('.menu_bar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scroll({
            top: targetElement.offsetTop - document.querySelector('.menu_bar').offsetHeight,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.abilities');

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top <= windowHeight && rect.bottom >= 0) {
                element.classList.add('abilities-visible');
            } else {
                element.classList.remove('abilities-visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility); // Revalida ao redimensionar a janela
    checkVisibility(); // Verifica a visibilidade ao carregar a página
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.projects');

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top <= windowHeight && rect.bottom >= 0) {
                element.classList.add('projects-visible');
            } else {
                element.classList.remove('projects-visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility); // Revalida ao redimensionar a janela
    checkVisibility(); // Verifica a visibilidade ao carregar a página
});

document.getElementById('download-btn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1nE2Y_RlQyfNJwqx1D9dU_PTwzqJNbtY6zrR7fHQxPos';  // Substitua pelo caminho do seu arquivo
    link.download = 'Currículo_Gustavo_Santos.pdf';  // Substitua pelo nome desejado do arquivo
    link.click();
  });
