const choices = ["pedra", "papel", "tesoura"];
const images = {
    pedra: "imagens/pedra.jpg",
    papel: "imagens/papel.jpg",
    tesoura: "imagens/tesoura.jpg",
};

let player1Choice = null;
let player2Choice = null;
let player1Score = 0;
let player2Score = 0;

const statusElement = document.getElementById("status");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const image1Element = document.getElementById("image1");
const image2Element = document.getElementById("image2");
const player1Button = document.getElementById("player1-btn");
const player2Button = document.getElementById("player2-btn");
const playAgainButton = document.getElementById("play-again");
const resetButton = document.getElementById("reset");

// Função para escolher aleatoriamente uma opção
function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Função para determinar o vencedor
function determineWinner(choice1, choice2) {
  if (choice1 === choice2) return "empate";

  if (
    (choice1 === "pedra" && choice2 === "tesoura") ||
    (choice1 === "tesoura" && choice2 === "papel") ||
    (choice1 === "papel" && choice2 === "pedra")
  ) {
    return "jogador1";
  } else {
    return "jogador2";
  }
}

// Atualiza o placar
function updateScore(winner) {
  if (winner === "jogador1") {
    player1Score++;
    score1Element.textContent = player1Score;
    statusElement.textContent = "Jogador 1 venceu esta rodada!";
  } else if (winner === "jogador2") {
    player2Score++;
    score2Element.textContent = player2Score;
    statusElement.textContent = "Jogador 2 venceu esta rodada!";
  } else {
    statusElement.textContent = "Empate!";
  }
}

// Mostra as escolhas e determina o vencedor
function showChoicesAndDetermineWinner() {
  image1Element.src = images[player1Choice];
  image1Element.classList.remove("hidden");
  image2Element.src = images[player2Choice];
  image2Element.classList.remove("hidden");

  const winner = determineWinner(player1Choice, player2Choice);
  updateScore(winner);

  playAgainButton.classList.remove("hidden");
}

// Reseta o jogo
function resetGame() {
  player1Choice = null;
  player2Choice = null;
  image1Element.classList.add("hidden");
  image2Element.classList.add("hidden");
  playAgainButton.classList.add("hidden");
  statusElement.textContent = "Aguardando escolha...";
}

// Zera o placar
function resetScore() {
  player1Score = 0;
  player2Score = 0;
  score1Element.textContent = player1Score;
  score2Element.textContent = player2Score;
  resetGame();
}

// Escolha do Jogador 1
player1Button.addEventListener("click", () => {
  if (!player1Choice) {
    player1Choice = getRandomChoice();
    statusElement.textContent = "Jogador 1 fez sua escolha!";
    if (player2Choice) {
      showChoicesAndDetermineWinner();
    }
  }
});

// Escolha do Jogador 2
player2Button.addEventListener("click", () => {
  if (!player2Choice) {
    player2Choice = getRandomChoice();
    statusElement.textContent = "Jogador 2 fez sua escolha!";
    if (player1Choice) {
      showChoicesAndDetermineWinner();
    }
  }
});

// Botão de jogar novamente
playAgainButton.addEventListener("click", resetGame);

// Botão de zerar placar
resetButton.addEventListener("click", resetScore);
