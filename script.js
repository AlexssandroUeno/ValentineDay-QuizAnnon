let userAnswers = [];
let currentQuestion = 0;

const quizData = [
    {
        question: "Qual é o seu tipo de filme preferido?",
        answers: ["Romance", "Ação", "Comédia", "Drama/Terror"]
    },
    {
        question: "Qual é o seu lugar preferido para um encontro?",
        answers: ["Restaurante Japa", "Barzinho Chique", "Cineminha", "Parque (Apesar que por aqui nem existe parque hehe)"]
    },
    {
        question: "O que você mais valoriza em um encontro?",
        answers: ["Companhia", "Aventura", "Diversão", "Compreensão"]
    }
];

function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    clickSound.currentTime = 0;
    clickSound.play();
}

function playNopeSound() {
    const nopeSound = document.getElementById('nope-sound');
    nopeSound.currentTime = 0;
    nopeSound.play();
}

function showQuestion() {
    const questionObj = quizData[currentQuestion];
    document.querySelector(".question-container .question").innerText = questionObj.question;

    const buttons = document.querySelectorAll(".answer");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = questionObj.answers[i];
        buttons[i].onclick = () => nextQuestion(questionObj.answers[i]);
    }
}

function nextQuestion(answer) {
    playClickSound();
    userAnswers.push(answer);
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        document.querySelector(".question-container").style.display = "none";
        document.querySelector(".final-question").style.display = "block";
    }
}

function getResult(answers) {
    document.getElementById("header-quiz", "space-header").remove();
    document.getElementById("space-header").remove();
    return `Suas respostas foram:\n
    Filme preferido: ${answers[0]}\n
    Lugar preferido: ${answers[1]}\n
    O que valoriza: ${answers[2]}`;
}

function showResult() {
    let resultText = getResult(userAnswers);
    document.getElementById("result-text").innerText = resultText;

    document.querySelector(".final-question").style.display = "none";
    document.querySelector(".quiz").style.display = "none";
    document.querySelector(".result").style.display = "block";

    const audio = document.getElementById('success-sound');
    audio.play();
}

const noButton = document.getElementById('no-button');
let isFirstMove = true;

function moveNoButton() {
    playNopeSound();
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    if (isFirstMove) {
        const rect = noButton.getBoundingClientRect();
        noButton.style.position = 'fixed';
        noButton.style.width = `${buttonWidth}px`;
        noButton.style.height = `${buttonHeight}px`;
        noButton.style.left = `${rect.left}px`;
        noButton.style.top = `${rect.top}px`;
        isFirstMove = false;
    }

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

noButton.addEventListener('click', moveNoButton);
noButton.addEventListener('mouseover', moveNoButton);

// Gerador de emojis flutuantes
const emojis = ["❤️", "💖", "🌹", "💘", "💕", "💞", "💓", "😍"];
const floatingContainer = document.getElementById("floating-emojis");

function createEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("floating-emoji");
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = (5 + Math.random() * 5) + "s";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    floatingContainer.appendChild(emoji);

    setTimeout(() => {
        floatingContainer.removeChild(emoji);
    }, 10000);
}

setInterval(createEmoji, 500);

// Controle da tela inicial e música de fundo
document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("main-quiz").style.display = "block";

    const music = document.getElementById("background-music");
    music.volume = 0.4;
    music.play();

    showQuestion();
});