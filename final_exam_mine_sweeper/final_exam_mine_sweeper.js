/*====================================
   CONFIGURACIÓN DEL CANVAS
====================================*/
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const canvasSize = 800;
const blockSize = 40;
const rows = canvasSize / blockSize;
const cols = canvasSize / blockSize;

/*====================================
   ELEMENTOS DEL DOM
====================================*/
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const timerText = document.getElementById("timer");
const livesText = document.getElementById("lives");

/*====================================
   RECURSOS DEL JUEGO
====================================*/
const bomberman = new Image();
bomberman.src = "images/bomberman.png";

const bomba = new Image();
bomba.src = "images/bomba.png";

const collectibleImg = new Image();
collectibleImg.src = "images/item.png";

const fondoJuego = new Image();
fondoJuego.src = "images/fondojuego.png";

const eatSound = new Audio("sonidos/eat.wav");
const levelUpSound = new Audio("sonidos/level-up.mp3");
const gameOverSound = new Audio("sonidos/game-over.mp3");

/*====================================
   DATOS DEL JUGADOR
====================================*/
let player = {
   x: Math.floor(cols / 2),
   y: Math.floor(rows / 2)
};

/*====================================
   VARIABLES DEL JUEGO
====================================*/
let collectible = {};
let bombs = [];
let score = 0;
let level = 1;
let collectedThisLevel = 0;
let timeLeft = 30;
let gameOver = false;
let lives = 3; 
let timerInterval;
let moveBombInterval;

/*====================================
   GENERAR POSICION ALEATORIA
====================================*/
function randomPosition() {
   return {
       x: Math.floor(Math.random() * cols),
       y: Math.floor(Math.random() * rows)
   };
}

function isCollision(obj1, obj2) {
   return obj1.x === obj2.x && obj1.y === obj2.y;
}

/*====================================
   CREAR OBJETO COLECCIONABLE
====================================*/
function createCollectible() {
   let validPosition = false;
   while (!validPosition) {
       let newPosition = randomPosition();
       validPosition = true;
       if (isCollision(newPosition, player)) {
           validPosition = false;
       }
       bombs.forEach(bomb => {
           if (isCollision(newPosition, bomb)) {
               validPosition = false;
           }
       });
       if (validPosition) {
           collectible = newPosition;
       }
   }
}

/*====================================
   CREAR BOMBAS
====================================*/
function createBombs() {
   bombs = [];
   let bombAmount = level * 2;
   while (bombs.length < bombAmount) {
       let newBomb = randomPosition();
       let validPosition = true;
       if (isCollision(newBomb, player)) validPosition = false;
       if (isCollision(newBomb, collectible)) validPosition = false;
       bombs.forEach(bomb => {
           if (isCollision(newBomb, bomb)) {
               validPosition = false;
           }
       });
       if (validPosition) {
           bombs.push(newBomb);
       }
   }
}

/*====================================
   MOVER BOMBA ALEATORIA
====================================*/
function moveRandomBomb() {
   if (bombs.length === 0 || gameOver) return;
   const bombIndex = Math.floor(Math.random() * bombs.length);
   let validPosition = false;
   let newPosition;
   while (!validPosition) {
       newPosition = randomPosition();
       validPosition = true;
       if (isCollision(newPosition, player)) validPosition = false;
       if (isCollision(newPosition, collectible)) validPosition = false;
       bombs.forEach((bomb, index) => {
           if (index !== bombIndex && isCollision(newPosition, bomb)) {
               validPosition = false;
           }
       });
   }
   
   bombs[bombIndex] = newPosition;
   if (isCollision(player, bombs[bombIndex])) {
       loseLife();
   }
   render();
}

/*====================================
   DIBUJAR CUADRICULA
====================================*/
function drawGrid() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   if (fondoJuego.complete && fondoJuego.naturalWidth !== 0) {
       ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height);
   } else {
       ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
       for (let i = 0; i <= cols; i++) {
           ctx.beginPath();
           ctx.moveTo(i * blockSize, 0);
           ctx.lineTo(i * blockSize, canvas.height);
           ctx.stroke();
       }
       for (let i = 0; i <= rows; i++) {
           ctx.beginPath();
           ctx.moveTo(0, i * blockSize);
           ctx.lineTo(canvas.width, i * blockSize);
           ctx.stroke();
       }
   }
}

/*====================================
   DIBUJAR ENTIDAD
====================================*/
function drawEntity(image, x, y, color, scale = 1) {
   let size = blockSize * scale;
   let offset = (size - blockSize) / 2;

   if (image.complete && image.naturalWidth !== 0) {
       ctx.drawImage(image, (x * blockSize) - offset, (y * blockSize) - offset, size, size);
   } else {
       ctx.beginPath();
       ctx.arc((x * blockSize) + blockSize / 2, (y * blockSize) + blockSize / 2, (blockSize * scale) / 2.2, 0, Math.PI * 2);
       ctx.fillStyle = color;
       ctx.fill();
   }
}

/*====================================
  DIBUJAR ESCENA
====================================*/
function render() {
   drawGrid();
   
   drawEntity(collectibleImg, collectible.x, collectible.y, "#facc15", 1);
   
   bombs.forEach(bomb => {
       drawEntity(bomba, bomb.x, bomb.y, "#ef4444", 1.3);
   });
   
   drawEntity(bomberman, player.x, player.y, "#3b82f6", 1.5);
}

/*====================================
   MOVIMIENTO
====================================*/
document.addEventListener("keydown", (e) => {
   if (gameOver) return;
   let nextX = player.x;
   let nextY = player.y;
   if (e.key === "ArrowUp") nextY--;
   else if (e.key === "ArrowDown") nextY++;
   else if (e.key === "ArrowLeft") nextX--;
   else if (e.key === "ArrowRight") nextX++;
   
   if (nextX >= 0 && nextX < cols && nextY >= 0 && nextY < rows) {
       player.x = nextX;
       player.y = nextY;
       checkInteractions();
       render();
   }
});

/*====================================
   INTERACCIONES
====================================*/
function checkInteractions() {
   if (isCollision(player, collectible)) {
       eatSound.play().catch(() => {});
       score += 10;
       collectedThisLevel++;
       scoreText.innerText = score;
       if (collectedThisLevel >= 5) {
           levelUp();
       } else {
           createCollectible();
       }
   }
   bombs.forEach(bomb => {
       if (isCollision(player, bomb)) {
           loseLife();
       }
   });
}

/*====================================
   SISTEMA DE VIDAS
====================================*/
function loseLife() {
    lives--;
    if (livesText) {
        livesText.innerText = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
    }
    
    if (lives <= 0) {
        triggerGameOver();
    } else {
        player.x = Math.floor(cols / 2);
        player.y = Math.floor(rows / 2);
        render();
    }
}

/*====================================
   SUBIR DE NIVEL
====================================*/
function levelUp() {
   levelUpSound.play().catch(() => {});
   level++;
   collectedThisLevel = 0;
   timeLeft += 15;
   levelText.innerText = level;
   timerText.innerText = timeLeft + "s";
   createCollectible();
   createBombs();
}

/*====================================
   TEMPORIZADOR
====================================*/
function updateTimer() {
   if (gameOver) return;
   timeLeft--;
   timerText.innerText = timeLeft + "s";
   if (timeLeft <= 0) {
       triggerGameOver();
   }
}

/*====================================
   GAME OVER
====================================*/
function triggerGameOver() {
   gameOver = true;
   gameOverSound.play().catch(() => {});
   clearInterval(timerInterval);
   clearInterval(moveBombInterval);
   
   setTimeout(() => {
       const restart = confirm(
           "💀 GAME OVER 💀\n\n" +
           "Puntos: " + score +
           "\nNivel: " + level +
           "\n\n¿Deseas volver a jugar?"
       );
       if (restart) {
           location.reload();
       }
   }, 100);
}

/*====================================
   INICIAR JUEGO
====================================*/
function init() {
   score = 0;
   level = 1;
   timeLeft = 30;
   lives = 3;

   scoreText.innerText = score;
   levelText.innerText = level;
   timerText.innerText = timeLeft + "s";
   
   if (livesText) {
       livesText.innerText = "❤️❤️❤️";
   }

   createBombs();
   createCollectible();
   render();
   
   timerInterval = setInterval(updateTimer, 1000);
   moveBombInterval = setInterval(moveRandomBomb, 2000);
}

window.onload = init;