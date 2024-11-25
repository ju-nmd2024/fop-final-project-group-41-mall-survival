function setup() {
  createCanvas(900, 700);
}
const gridLength = 60;
const gridSize = 30;
let speed = 0;
let jump = 0;
let ground = 0;
let jumpReady = true;
let isOnRoofs = false;
let gravity = 1;

function drawGrid() {
  push();
  stroke(0, 0, 0);
  noFill();
  for (let x = 0; x < gridLength; x++) {
    for (let y = 0; y < gridLength; y++) {
      rect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
  pop();
}
class Character {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    fill(255, 0, 0);

    rect(
      this.x * gridSize - gridSize,
      this.y * gridSize - gridSize * 2,
      gridSize * 2
    );
  }
}
let player = new Character(15, 16, 2, 2);

class Roof {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    fill(216, 142, 4);
    rect(
      this.x * gridSize,
      this.y * gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
  hitTest(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
let lagerhausRoof = new Roof(-1, 15, 7, 1);
let ahlensRoof = new Roof(23, 15, 7, 1);
let lykoRoof = new Roof(8, 18, 5, 1);
let hmRoof = new Roof(15, 18, 5, 1);
let zaraRoof = new Roof(-1, 7, 7, 1);
let hemtexRoof = new Roof(23, 7, 7, 1);
let cerveraRoof = new Roof(8, 11, 5, 1);
let apotekRoof = new Roof(17, 11, 3, 1);
let kicksRoof = new Roof(9, 3, 10, 1);

//roofs array
let roofs = [
  lagerhausRoof,
  ahlensRoof,
  lykoRoof,
  hmRoof,
  zaraRoof,
  hemtexRoof,
  cerveraRoof,
  apotekRoof,
  kicksRoof,
];

class Frontshop {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    fill(242, 106, 94);
    rect(
      this.x * gridSize + gridSize,
      this.y * gridSize + gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
}

let lagerhausShop = new Frontshop(-1, 15, 6, 7);
let lykoShop = new Frontshop(7, 18, 5, 4);
let hmShop = new Frontshop(14, 18, 5, 4);
let ahlensShop = new Frontshop(22, 15, 8, 7);

class Middleshop {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    fill(30, 140, 78);
    rect(
      this.x * gridSize + gridSize,
      this.y * gridSize + gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
}

let zaraShop = new Middleshop(-1, 7, 6, 14);
let cerveraShop = new Middleshop(7, 11, 5, 10);
let apotekShop = new Middleshop(16, 11, 3, 10);
let hemtexShop = new Middleshop(22, 7, 7, 15);

class Topshop {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    fill(242, 188, 29);
    rect(
      this.x * gridSize + gridSize,
      this.y * gridSize + gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
}
let kicksShop = new Topshop(8, 3, 10, 19);

function startScreen() {
  background(166, 211, 216);
  drawGrid();
  //topshop
  kicksShop.draw();

  //middle shops
  zaraShop.draw();
  cerveraShop.draw();
  apotekShop.draw();
  hemtexShop.draw();

  //roofs shops
  lagerhausRoof.draw();
  ahlensRoof.draw();
  lykoRoof.draw();
  hmRoof.draw();
  zaraRoof.draw();
  hemtexRoof.draw();
  cerveraRoof.draw();
  apotekRoof.draw();
  kicksRoof.draw();

  //front shops
  lagerhausShop.draw();
  lykoShop.draw();
  hmShop.draw();
  ahlensShop.draw();
}

function gameScreen() {
  background(166, 211, 216);
  drawGrid();
  //topshop
  kicksShop.draw();

  //middle shops
  zaraShop.draw();
  cerveraShop.draw();
  apotekShop.draw();
  hemtexShop.draw();

  //roofs shops
  lagerhausRoof.draw();
  ahlensRoof.draw();
  lykoRoof.draw();
  hmRoof.draw();
  zaraRoof.draw();
  hemtexRoof.draw();
  cerveraRoof.draw();
  apotekRoof.draw();
  kicksRoof.draw();

  //front shops
  lagerhausShop.draw();
  lykoShop.draw();
  hmShop.draw();
  ahlensShop.draw();

  //player
  player.draw();

  //constains on the x-axis
  player.x = constrain(player.x, -1, 27);

  //player speed sideways
  player.x = player.x + speed;
  if (keyIsDown(39)) {
    speed = 0.4;
  } else if (keyIsDown(37)) {
    speed = -0.4;
  } else {
    speed = 0;
  }

  player.y = player.y + gravity;

  for (let roof of roofs) {
    if (roof.hitTest(player.x, player.y)) {
      player.y = roof.y;
    }
  }

  function draw() {
    background(0, 0, 0);
    gameScreen();
    // startScreen();
  }
}
