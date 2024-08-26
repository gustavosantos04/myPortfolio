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

document.querySelector('form').addEventListener('submit', function(event) {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        event.preventDefault(); // Prevent form submission
    }
});
