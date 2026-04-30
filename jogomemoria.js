const cartas = document.querySelectorAll(".carta");
const scoreEl = document.getElementById("score");
const movesEl = document.getElementById("moves");
const resetBtn = document.getElementById("reset");

let primeiraCarta = null;
let segundaCarta = null;
let travar = false;
let score = 0;
let moves = 0;

// Corrigir automaticamente o "par" das cartas
cartas.forEach((carta, index) => {
    const classes = carta.classList;
    const numero = [...classes].find(c => !isNaN(c));
    carta.dataset.par = numero;
});

// embaralhar
function embaralhar() {
    cartas.forEach(carta => {
        let random = Math.floor(Math.random() * 1000);
        carta.style.order = random;
    });
}

// clique
cartas.forEach(carta => {
    carta.addEventListener("click", () => {
        if (travar || carta === primeiraCarta) return;

        carta.classList.add("virada");

        if (!primeiraCarta) {
            primeiraCarta = carta;
            return;
        }

        segundaCarta = carta;
        moves++;
        movesEl.textContent = moves;

        checarMatch();
    });
});

function checarMatch() {
    let match = primeiraCarta.dataset.par === segundaCarta.dataset.par;

    if (match) {
        primeiraCarta.classList.add("acertou");
        segundaCarta.classList.add("acertou");
        score++;
        scoreEl.textContent = score;
        resetarJogada();
    } else {
        travar = true;
        setTimeout(() => {
            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");
            resetarJogada();
        }, 1000);
    }
}

function resetarJogada() {
    [primeiraCarta, segundaCarta] = [null, null];
    travar = false;
}

// reset
resetBtn.addEventListener("click", () => {
    score = 0;
    moves = 0;
    scoreEl.textContent = 0;
    movesEl.textContent = 0;

    cartas.forEach(carta => {
        carta.classList.remove("virada", "acertou");
    });

    embaralhar();
});

// iniciar
embaralhar();