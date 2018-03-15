const TILE_W = 40;
const TILE_H = 40;
const TILE_GAP = 1;
const TILE_COLS = 20;
const TILE_ROWS = 15;

let tileGrid = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

// Adds an index to all values in the grid
function tileGridIndex(tileCol, tileRow) {
  return (tileCol + TILE_COLS*tileRow);
}

function isTileHere(tileCol, tileRow) {
  let tileIndex = tileGridIndex(tileCol, tileRow);
  // returns true if there is a tile of any kind
  return (tileGrid[tileIndex] != 0);
}

function isTileAtPixel(pixelX, pixelY) {
  let tileCol = Math.floor(pixelX / TILE_W);
  let tileRow = Math.floor(pixelY / TILE_H);

  if(tileCol < 0 || tileCol >= TILE_COLS || tileRow < 0 || tileRow >= TILE_ROWS) {
    return false;
  }

  let tileIndex = tileGridIndex(tileCol, tileRow);
  return (tileGrid[tileIndex] == 1);
}

function drawTiles() {
  for (let col = 0; col < TILE_COLS; col++) {
    for (let row = 0; row < TILE_ROWS; row++) {
      if (isTileHere(col, row)) {
        let tileLeftEdge = col * TILE_W;
        let tileTopEdge = row * TILE_H;

        let tileIndex = tileGridIndex(col, row)
        if (tileGrid[tileIndex] == 1) {
          colorRect(tileLeftEdge, tileTopEdge, TILE_W-TILE_GAP, TILE_H-TILE_GAP, 'brown')
        } else if (tileGrid[tileIndex] == 2) {
          colorRect(tileLeftEdge, tileTopEdge, TILE_W, TILE_H-TILE_GAP, 'blue')
        }
      }
    }
  }
}
