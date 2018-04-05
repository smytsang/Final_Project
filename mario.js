let marioTop = 215;
let marioLeft = 220;
let marioSpeed = 1.5
let marioRight = 245;

function marioMove() {
  marioLeft += marioSpeed;

  if (isTileAtPixel(marioLeft, marioTop+TILE_H) == 1) {
    marioSpeed *= -1;
  } else if (isTileAtPixel(marioLeft + 25, marioTop+TILE_H) == 1) {
    marioSpeed *= -1;
  }
}
