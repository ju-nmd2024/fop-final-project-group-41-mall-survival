let logolagerhaus;
let logolyko;
let logohm;
let logoahlens;
let logozara;
let logocervera;
let logoapotek;
let logohemtex;
let logokicks;
let gametitle;
let startbutton;
let rulesbutton;

function preload() {
  logolagerhaus = loadImage("logo-lagerhous.png");
  logolyko = loadImage("lyko-logo.png");
  logohm = loadImage("hm.png");
  logoahlens = loadImage("ahlens.png");
  logozara = loadImage("zara.png");
  logocervera = loadImage("cervera.png");
  logoapotek = loadImage("apotek.png");
  logohemtex = loadImage("hemtex.png");
  logokicks = loadImage("kicks.png");
  gametitle = loadImage("mallsurvival.png");
  startbutton = loadImage("start.png");
  rulesbutton = loadImage("rules.png");
}

function setup() {
  createCanvas(900, 700);
}

const gridLength = 60;
const gridSize = 30;
let speed = 0;
let jump = 0;
let ground = 0;
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

class Window {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    fill(174, 220, 255, 190);
    rect(
      this.x * gridSize,
      this.y * gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
}
let lagerhausWindow = new Window(1, 18, 4, 5);
let lykoWindow = new Window(9, 21, 3, 2);
let hmWindow = new Window(16, 21, 3, 2);
let ahlensWindow = new Window(24, 18, 5, 5);
let zaraWindow = new Window(1, 10, 4, 5);
let cerveraWindow = new Window(9, 14, 3, 4);
let apotekWindow = new Window(17.75, 14, 1.5, 4);
let hemtexWindow = new Window(24, 10, 5, 5);
let kicksWindow = new Window(10, 7, 8, 16);

class Door {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    fill(5, 14, 63, 110);
    rect(
      this.x * gridSize,
      this.y * gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
}
let lagerhausDoor = new Door(1.5, 19, 1.2, 3.5);
let lagerhaus2Door = new Door(3.2, 19, 1.2, 3.5);
let lykoDoor = new Door(9.4, 21.5, 0.9, 1.2);
let lyko2Door = new Door(10.7, 21.5, 0.9, 1.2);
let hmDoor = new Door(16.4, 21.5, 0.9, 1.2);
let hm2Door = new Door(17.7, 21.5, 0.9, 1.2);
let ahlensDoor = new Door(24.5, 19, 1.8, 3.5);
let ahlens2Door = new Door(26.7, 19, 1.8, 3.5);
let zaraDoor = new Door(1.5, 11, 1.2, 3.5);
let zara2Door = new Door(3.2, 11, 1.2, 3.5);
let cerveraDoor = new Door(9.4, 15, 0.9, 2.5);
let cervera2Door = new Door(10.7, 15, 0.9, 2.5);
let apotekDoor = new Door(18.13, 15.2, 0.75, 2.5);
let hemtexDoor = new Door(24.5, 11, 1.8, 3.5);
let hemtex2Door = new Door(26.7, 11, 1.8, 3.5);
let kicksDoor = new Door(10.8, 9, 2.8, 13);
let kicks2Door = new Door(14.2, 9, 2.8, 13);

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
  background(246, 249, 217);
  noStroke();
  //blue rectangle
  fill(166, 211, 216);
  rect(150, 300, 600, 400);
  //pink parts
  fill(1242, 106, 94);
  rect(315, 280, 280, 420);
  rect(190, 280, 50, 420);
  rect(660, 280, 50, 420);
  //blue part in the middle
  fill(1, 39, 63);
  rect(150, 470, 600, 50);
  //mall entrance
  fill(166, 211, 216);
  rect(345, 560, 220, 150);
  //details entrance
  fill(1, 39, 63);
  rect(345, 560, 220, 15);
  rect(450, 560, 5, 150);
  rect(395, 560, 1, 150);
  rect(510, 560, 1, 150);
  rect(345, 630, 220, 1);
  //ground
  rect(0, 680, 900, 20);

  //headline
  image(gametitle, 105, 70, 700, 200);

  //buttons
  rect(330, 300, 250, 70, 20);
  rect(330, 390, 250, 70, 20);
  image(startbutton, 355, 315, 200, 60);
  image(rulesbutton, 355, 405, 200, 60);
}
let maxJumpHeight = gridSize * 2;
function gameScreen() {
  background(166, 211, 216);
  drawGrid();

  //topshop
  kicksShop.draw();
  kicksWindow.draw();
  kicksDoor.draw();
  kicks2Door.draw();

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

  // windows all shops
  lagerhausWindow.draw();
  lykoWindow.draw();
  hmWindow.draw();
  ahlensWindow.draw();
  zaraWindow.draw();
  cerveraWindow.draw();
  apotekWindow.draw();
  hemtexWindow.draw();

  //doors all shops
  lagerhausDoor.draw();
  lagerhaus2Door.draw();
  lykoDoor.draw();
  lyko2Door.draw();
  hmDoor.draw();
  hm2Door.draw();
  ahlensDoor.draw();
  ahlens2Door.draw();
  zaraDoor.draw();
  zara2Door.draw();
  cerveraDoor.draw();
  cervera2Door.draw();
  apotekDoor.draw();
  hemtexDoor.draw();
  hemtex2Door.draw();

  //ground
  fill(53, 40, 30);
  rect(0, 690, 900, 10);

  // logo of the stores
  image(logolagerhaus, 40, 460, 100, 100);
  image(logolyko, 265, 550, 100, 100);
  image(logohm, 500, 575, 50, 50);
  image(logoahlens, 745, 485, 100, 50);
  image(logozara, 40, 245, 100, 50);
  image(logocervera, 265, 365, 100, 50);
  image(logoapotek, 530, 365, 50, 50);
  image(logohemtex, 735, 245, 120, 50);
  image(logokicks, 350, 130, 140, 70);
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

  if (keyIsDown(32)) {
    gravity = -0.8;
  } else {
    gravity = 0.5;
  }
}

function draw() {
  background(0, 0, 0);
  gameScreen();
  //startScreen();
}
