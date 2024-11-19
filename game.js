function setup() {
  createCanvas(900, 700);
}
const gridLength = 60;
const gridSize = 30;
let characterY = 10;
let characterX = 15;
let speed = 0;
let jump = 0;
let ground = 16;
let jumpReady = true;

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
      this.x * gridSize + gridSize,
      this.y * gridSize + gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
}
let lagerhausRoof = new Roof(-1, 15, 7, 1);
let ahlensRoof = new Roof(22, 15, 7, 1);
let lykoRoof = new Roof(8, 18, 5, 1);
let hmRoof = new Roof(15, 18, 5, 1);
let zaraRoof = new Roof(-1, 7, 7, 1);
let hemtexRoof = new Roof(22, 7, 7, 1);
let cerveraRoof = new Roof(8, 11, 5, 1);
let apotekRoof = new Roof(17, 11, 3, 1);
let kicksRoof = new Roof(9, 3, 10, 1);

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

let lagerhausShop = new Frontshop(-1, 16, 7, 6);
let lykoShop = new Frontshop(8, 19, 5, 3);
let hmShop = new Frontshop(15, 19, 5, 3);
let ahlensShop = new Frontshop(22, 16, 7, 6);

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

let zaraShop = new Middleshop(-1, 8, 7, 14);
let cerveraShop = new Middleshop(8, 12, 5, 10);
let apotekShop = new Middleshop(17, 12, 3, 10);
let hemtexShop = new Middleshop(22, 8, 7, 14);

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
let kicksShop = new Topshop(9, 4, 10, 18);

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
  drawCharacter();
  characterX = characterX + speed;

  if (keyIsDown(39)) {
    speed = 0.3;
  } else if (keyIsDown(37)) {
    speed = -0.3;
  } else {
    speed = 0;
  }

  characterY = characterY + jump;

  if (characterY >= ground) {
    jumpReady = true;
    jump = 0;
    characterY = ground;
  } else {
    jumpReady = false;
    jump = jump + 0.12;
  }
  if (jumpReady === true) {
    if (keyIsDown(32)) {
      jump = -1;
    }
  } else if (keyIsDown(32) && keyIsDown(39)) {
    jump = -0.5;
    speed = 0.5;
  } else if (keyIsDown(32) && keyIsDown(37)) {
    jump = -0.5;
    speed = -0.5;
  }
}

function drawCharacter() {
  push();
  fill(255, 0, 0);
  noStroke();
  rect(
    characterX * gridSize + gridSize,
    characterY * gridSize + gridSize,
    gridSize * 2
  );
  pop();
}

function draw() {
  background(0, 0, 0);

  gameScreen();
}
