const WORD_LIST = ["REQIUEM", "SPIDER", "PHANTOM", "HUNTER", "LICENSE", "CHAIN", "LIGHTNING", "ENHANCE", "MANIPULATE", "TRANSMUTE"];
const MAX_MISTAKES = 6;

let gameState = {
    word: "",
    guessedLetters: [],
    mistakes: 0,
    status: "playing" // "playing", "won", "lost"
};

const wordDisplayUI = document.getElementById("word-display");
const keyboardUI = document.getElementById("keyboard");
const messageUI = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");
const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");

function init() {
    const savedState = localStorage.getItem("hangmanState");
    if (savedState) {
        gameState = JSON.parse(savedState);
    } else {
        startNewGame();
    }

    createKeyboard();
    updateUI();

    resetBtn.addEventListener("click", () => {
        startNewGame();
        updateUI();
    });

    document.addEventListener("keydown", (event) => {
        const letter = event.key.toUpperCase();

        if (/^[A-Z]$/.test(letter)) handleGuess(letter);
    });
}

function startNewGame() {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    gameState = {
        word: randomWord,
        guessedLetters: [],
        mistakes: 0,
        status: "playing"
    };
    saveState();
}

function handleGuess(letter) {
    if (gameState.status !== "playing" || gameState.guessedLetters.includes(letter)) return;

    gameState.guessedLetters.push(letter);

    if (!gameState.word.includes(letter)) gameState.mistakes++;

    checkWinLoss();
    saveState();
    updateUI();
}

function checkWinLoss() {
    const isWin = gameState.word.split('').every(letter => gameState.guessedLetters.includes(letter));

    if (isWin) gameState.status = "won";
    else if (gameState.mistakes >= MAX_MISTAKES) gameState.status = "lost";
}

function saveState() {
    localStorage.getItem("hangmanState", JSON.stringify(gameState));
}

function updateUI() {
    wordDisplayUI.textContent = gameState.word.split('').map(letter => gameState.guessedLetters.includes(letter) ? letter : '_').join('');

    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        const letter = key.textContent;
        key.disabled = gameState.guessedLetters.includes(letter) || gameState.status !== "playing";
    });

    if (gameState.status === "won") {
        messageUI.textContent = "You Won! 🎉";
        messageUI.style.color = "green";
    } else if (gameState.status === "lost") {
        messageUI.textContent = `You Lost! The word was ${gameState.word}`;
        messageUI.style.color = "red";
    } else {
        messageUI.textContent = `Mistakes: ${gameState.mistakes} / ${MAX_MISTAKES}`;
        messageUI.style.color = "#333";
    }

    drawHangman();
}

function createKeyboard() {
    keyboardUI.innerHTML = "";

    const keyboardLayout = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ];

    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");

        for (let letter of row) {
            const button = document.createElement("button");
            button.textContent = letter;
            button.classList.add("key");
            button.addEventListener("click", () => handleGuess(letter));
            rowDiv.appendChild(button);
        }
        keyboardUI.appendChild(rowDiv);
    });
}

function drawHangman() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.clientWidth = 4;
    ctx.strokeStyle = '#333';

    ctx.beginPath();
    ctx.moveTo(20, 230); ctx.lineTo(180, 230);
    ctx.moveTo(50, 230); ctx.lineTo(50, 20);
    ctx.moveTo(50, 20);  ctx.lineTo(120, 20);
    ctx.moveTo(120, 20); ctx.lineTo(120, 50);
    ctx.stroke();

    const m = gameState.mistakes;
    if (m > 0) {
        ctx.beginPath();
        ctx.arc(120, 70, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (m > 1) {
        ctx.beginPath();
        ctx.moveTo(120, 90);
        ctx.lineTo(120, 160);
        ctx.stroke();
    }
    if (m > 2) {
        ctx.beginPath();
        ctx.moveTo(120, 110);
        ctx.lineTo(90, 140);
        ctx.stroke();
    }
    if (m > 3) {
        ctx.beginPath();
        ctx.moveTo(120, 110);
        ctx.lineTo(150, 140);
        ctx.stroke();
    }
    if (m > 4) {
        ctx.beginPath();
        ctx.moveTo(120, 160);
        ctx.lineTo(90, 200);
        ctx.stroke();
    }
    if (m > 5) {
        ctx.beginPath();
        ctx.moveTo(120, 160);
        ctx.lineTo(150, 200);
        ctx.stroke();
    }
}

init();