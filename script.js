// cantidad de huecos
const boardSize = 20;
// tiempo de aparición del topo
const moleAppearTime = 700;
// tiempo del juego
const gameTime = 60;
//tiempo final donde se pone más rapido
const speedupTime = 15;

const alert = () => {
  Swal.fire('Tu puntuación total es ' + score);
};
let score = 0;
let timeLeft = gameTime;
let moleInterval;
let timerInterval;

const moleImage2  = '../juego/img/depositphotos_123345966-stock-illustration-cartoon-funny-groundhog.jpg'; 
const moleHitImage = './img/Logo Moda Femenina Minimalista Negro y Rosa (2).png';

// tablero de juego donde se crea toda la estructura HTML y los 20 huecos de los topos
function createBoard() {
  const gameBoard = document.getElementById('game-board');
  for (let i = 0; i < boardSize; i++) {
    const button = document.createElement('button');
    button.addEventListener('click', () => hitMole(button));
    const moleContainer = document.createElement('div');
    moleContainer.className = 'mole-container';
    const moleImage = document.createElement('img');
    moleImage.src = moleImage2;
    moleContainer.appendChild(moleImage);
    button.appendChild(moleContainer);
    gameBoard.appendChild(button);
  }
}
// funcion cuando se le de click al topo
function hitMole(button) {
  if (button.classList.contains('mole')) {
    score++;
    button.classList.remove('mole');

    // animacion del topo golpeado
    button.classList.add('mole-hit');
    // imagen del topo golpeado
    button.querySelector('img').src = moleHitImage;

    updateScore();

    setTimeout(() => {
      button.querySelector('img').src = moleImage2;
      button.classList.remove('mole-hit');
    }, 300);
  }
}

// agrega el topo de forma random a alguno de los huecos
function showMole() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => button.classList.remove('mole'));
  
  const randomIndex = Math.floor(Math.random() * buttons.length);
  buttons[randomIndex].classList.add('mole');
}

function startGame() {
  if (moleInterval) clearInterval(moleInterval);
  if (timerInterval) clearInterval(timerInterval);

  score = 0;
  timeLeft = gameTime;
  updateScore();
  updateTimer();

  moleInterval = setInterval(showMole, moleAppearTime);
  timerInterval = setInterval(updateTimer, 700);

  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'none';
}

function updateScore() {
  document.getElementById('score').innerText = score;
}

function updateTimer() {
  const timerSpan = document.getElementById('time');
  timerSpan.innerText = timeLeft;
  timeLeft--;

  if (timeLeft < 0) {
    endGame();
    alert();
  } else if (timeLeft <= speedupTime) {
    clearInterval(moleInterval);
    moleInterval = setInterval(showMole, moleAppearTime * 0.8);
  }
}

function endGame() {
  clearInterval(moleInterval);
  clearInterval(timerInterval);

  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'block';
}

createBoard();

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', startGame);