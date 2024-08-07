document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "Desenvolvedor Júnior",
        "estudante de Ciência da Computação",
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