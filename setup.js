const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
let keyLeft = false;
let keyRight = false;

let winScreen = false;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  setupInput();
  playerReset();
  loadLevel(levelOne);
}

function setupInput () {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  document.addEventListener('mousedown', mouseClick);
}

function setKeyTo (key, setTo) {
  if (key == LEFT_ARROW) {
    keyLeft = setTo;
  }

  if (key == RIGHT_ARROW) {
    keyRight = setTo;
  }

  if (key == UP_ARROW) {
    if(playerOnGround) {
      playerSpeedY = -JUMP_HEIGHT;
    }
  }
}

function keyPressed (event) {
  // event.preventDefault();
  setKeyTo(event.keyCode, true);
}

function keyReleased (event) {
  setKeyTo(event.keyCode, false);
}

function mouseClick (event) {
  if (winScreen) {
    loadLevel(levelOne);
    playerReset();
    winScreen = false;
  }
}

function updateAll() {
  movePlayer();
  drawAll();
  platformMove();
}

function loadLevel(level) {
  tileGrid = level.slice();
}

function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  if (winScreen) {
    colorText('You win!', 380, 250, 'white');
    colorText(`Final score: ${playerScore}`, 370, 275, 'white');
    colorText('Click to play again', 360, 350, 'white');
    return;
  }

  drawTiles()
  colorCircle(playerX, playerY, 10, 'white');
  colorText(`Score: ${playerScore}`, 25, 25, 'white');
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function colorArc(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}
