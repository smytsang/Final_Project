const GRAVITY = 2;
const FRICTION = 0.8;

let playerX = 0;
let playerY = 0;
let playerSpeedX = 0;
let playerSpeedY = 0;
let playerOnGround = false;
let playerScore = 0;

const PLAYER_RADIUS = 10;
const JUMP_HEIGHT = 15;
const PLAYER_SPEED = 5;

function movePlayer() {
  // If player is not on ground, go down until it hits tile
  if(!playerOnGround) {
    playerSpeedY += GRAVITY;
    if(playerSpeedY > JUMP_HEIGHT) {
      playerSpeedY = JUMP_HEIGHT;
    }
  }

  // If no keys held, player eventually slows down
  if(playerOnGround) {
    playerSpeedX *= FRICTION;
  }

  if(keyLeft) {
    playerSpeedX = -PLAYER_SPEED;
  }

  if(keyRight) {
    playerSpeedX = PLAYER_SPEED;
  }

  // Checks if player is on top of a tile
  if (playerSpeedY > 0 && isTileAtPixel(playerX, playerY+ 2 * PLAYER_RADIUS) == 1) {
    // debugger;
    playerY = (1+Math.floor(playerY / TILE_H)) * TILE_H - PLAYER_RADIUS;
    playerSpeedY = 0;
    playerOnGround = true;
  } else if(isTileAtPixel(playerX, playerY+PLAYER_RADIUS+2) != 1) {
    playerOnGround = false;
  }

  // Checks if player hits a tile from below
  if (playerSpeedY < 0 && isTileAtPixel(playerX, playerY-PLAYER_RADIUS) == 1) {
    playerY = (Math.floor(playerY / TILE_H)) * TILE_H + PLAYER_RADIUS;
    playerSpeedY = 0;
  }

  // Checks if player hits on right side
  if (playerSpeedX > 0 && isTileAtPixel(playerX+PLAYER_RADIUS, playerY) == 1) {
    playerX = (1+Math.floor(playerX / TILE_W)) * TILE_W - PLAYER_RADIUS;
    playerSpeedX = 0;
  } else if (playerSpeedX > 0 && playerX+PLAYER_RADIUS >= canvas.width) {
    playerSpeedX = 0;
  }

  // Checks if player hits on left side
  if (playerSpeedX < 0 && isTileAtPixel(playerX-(PLAYER_RADIUS+1), playerY) == 1) {
    playerX = (Math.floor(playerX / TILE_W)) * TILE_W + PLAYER_RADIUS;
    playerSpeedX = 0;
  } else if (playerSpeedX < 0 && playerX-PLAYER_RADIUS <= 0) {
    playerSpeedX = 0;
  }

  // If player falls off bottom of screen
  if(playerY-PLAYER_RADIUS > canvas.height) {
    loadLevel(levelOne);
    playerReset();
  }

  collectCoins();
  winLevel();

  playerX += playerSpeedX;
  playerY += playerSpeedY;
}

function playerReset() {
  playerX = 75;
  playerY = 475;
  playerSpeedX = 0;
  playerScore = 0;
}

function collectCoins() {
  if (isTileAtPixel(playerX, playerY) == 3) {
    let tileCol = Math.floor(playerX / TILE_W);
    let tileRow = Math.floor(playerY / TILE_H);

    let tileIndex = Math.floor(tileGridIndex(tileCol, tileRow));
    tileGrid[tileIndex] = 0;
    playerScore += 10;
  }
}

function winLevel() {
  if (isTileAtPixel(playerX, playerY) == 4) {
    winScreen = true;
  }
}
