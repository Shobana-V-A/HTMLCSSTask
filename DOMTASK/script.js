const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

const cardValues = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍍", "🍓", "🍉"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

/* Shuffle function */
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

/* Create game */
function createGame() {
    gameBoard.innerHTML = "";
    cards = shuffle([...cardValues, ...cardValues]);

    cards.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${value}</div>
                <div class="card-back">?</div>
            </div>
        `;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

/* Flip card */
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

/* Check for match */
function checkMatch() {
    const isMatch =
        firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();
}

/* Keep matched cards flipped */
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

/* Flip back if not match */
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 800);
}

/* Reset board state */
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

/* Restart Game */
restartBtn.addEventListener("click", createGame);

/* Start game on load */
createGame();
