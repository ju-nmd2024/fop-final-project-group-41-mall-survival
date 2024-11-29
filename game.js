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
let rules;
let gameover;
let youwin;
let playagain;
let menu;
let backtostart;
let player1;
let angrywife;

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
  rules = loadImage("rules.png");
  gameover = loadImage("gameovernew.png");
  youwin = loadImage("winnew.png");
  playagain = loadImage("playagain.png");
  menu = loadImage("menu.png");
  backtostart = loadImage("backtostart.png");
  player1 = loadImage("player.png");
  angrywife = loadImage("angrywife.png");
}

function setup() {
  createCanvas(900, 700);
}

const gridLength = 60;
const gridSize = 30;
let speed = 0;
let ground = 0;
let gravity = 1;
let state = "Start";
let jumpReady = true;
const s = 0.09;
let direction = "forward";
let wifeX = 320;
let wifeY = 20;
let wifeWidth = 50;
let wifeHeight = 70;
let lives = 3;

function drawGrid() {
  push();
  stroke(166, 211, 216);
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
    image(
      player1,
      this.x * gridSize - gridSize,
      this.y * gridSize - gridSize * 2.5,
      gridSize * 2,
      gridSize * 2.5
    );
  }
}

let player = new Character(18, 11.3, 2, 5);

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
  hitTest2(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y - this.height &&
      y <= this.y
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

class stroller {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    noFill();
    stroke(0, 0, 0);
    strokeWeight(5);
    //right wheel
    ellipse(
      this.x * gridSize + gridSize * 1,
      this.y * gridSize + gridSize,
      this.width + gridSize / 3,
      this.height + gridSize / 3
    );
    //left wheel
    ellipse(
      this.x * gridSize + gridSize * 0.1,
      this.y * gridSize + gridSize,
      this.width + gridSize / 3,
      this.height + gridSize / 3
    );
    //body of the stroller
    rect(
      this.x * gridSize + gridSize * 0,
      this.y * gridSize + gridSize * 0.23,
      this.width + gridSize,
      this.height + gridSize / 2
    );

    //details inside stroller
    rect(
      this.x * gridSize + gridSize * 0.2,
      this.y * gridSize + gridSize / 3.4,
      this.width / 15,
      this.height + gridSize / 3
    );
    rect(
      this.x * gridSize + gridSize * 0.4,
      this.y * gridSize + gridSize / 3.4,
      this.width / 15,
      this.height + gridSize / 3
    );
    rect(
      this.x * gridSize + gridSize * 0.62,
      this.y * gridSize + gridSize / 3.4,
      this.width / 15,
      this.height + gridSize / 3
    );
    rect(
      this.x * gridSize + gridSize * 0.83,
      this.y * gridSize + gridSize / 3.4,
      this.width / 15,
      this.height + gridSize / 3
    );
    rect(
      this.x * gridSize * 1,
      this.y * gridSize * 1,
      this.width / 15,
      this.height + gridSize / 2
    );
  }
}
let stroller1 = new stroller(1, 5.7, 2, 1);
let stroller2 = new stroller(24, 13.7, 2, 1);

class Key {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    push();
    noFill();
    stroke(165, 169, 180);
    strokeWeight(5);
    ellipse(
      this.x * gridSize + gridSize,
      this.y * gridSize + gridSize,
      this.width + gridSize / 2,
      this.height + gridSize / 2
    );
    fill(165, 169, 180);
    rect(
      this.x * gridSize + gridSize * 1.3,
      this.y * gridSize + gridSize * 1.01,
      this.width + gridSize,
      this.height + gridSize / 20
    );
    rect(
      this.x * gridSize + gridSize * 1.9,
      this.y * gridSize + gridSize / 1.4,
      this.width + gridSize / 100,
      this.height + gridSize / 3
    );
    rect(
      this.x * gridSize + gridSize * 2.2,
      this.y * gridSize + gridSize / 1.4,
      this.width + gridSize / 50,
      this.height + gridSize / 3
    );
    pop();
  }
}
// let key1 = new Key(1, 5.4, 1, 1);
// let key2 = new Key(25, 13.5, 1, 1);
// let key3 = new Key(8, 9.5, 1, 1);
// let key4 = new Key(25, 5.5, 1, 1);
// let key5 = new Key(2, 13.5, 1, 1);
// let key6 = new Key(17, 16.5, 1, 1);
// let key7 = new Key(17, 9.5, 1, 1);
// let key8 = new Key(7, 16.5, 1, 1);
// let key9 = new Key(12, 1.5, 1, 1);

let keys = [
  new Key(3, 4.4, 1, 1),
  new Key(25, 13.5, 1, 1),
  new Key(8, 9.5, 1, 1),
  new Key(25, 5.5, 1, 1),
  new Key(2, 13.5, 1, 1),
  new Key(17, 16.5, 1, 1),
  new Key(17, 9.5, 1, 1),
  new Key(7, 16.5, 1, 1),
  new Key(12, 1.5, 1, 1),
];

class Wife {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    image(
      angrywife,
      this.x * gridSize - gridSize,
      this.y * gridSize - gridSize * 2.5,
      gridSize * 2,
      gridSize * 2.5
    );
  }
}

let wife = new Wife(10, 3, 2, 5);

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
  image(rules, 355, 405, 200, 60);
}

function rulesScreen() {
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

  //box with information
  rect(190, 50, 520, 400, 20);
  image(rules, 340, 80, 200, 80);

  //back to start button
  fill(246, 249, 217);
  rect(210, 370, 250, 60, 20);
  image(backtostart, 235, 372, 200, 80);
}

function exitSign(x, y) {
  noStroke();
  fill(255, 0, 0);
  rect(x, y, 100, 70);
  fill(245, 247, 219);
  textSize(30);
  text("EXIT", x + 15, y + 35);
  rect(x + 15, y + 50, 50, 2);
  triangle(x + 60, y + 40, x + 80, y + 50, x + 60, y + 60);
}

function gameScreen() {
  background(166, 211, 216);
  drawGrid();
  exitSign(800, 110);

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

  //logo of the stores
  image(logolagerhaus, 40, 460, 100, 100);
  image(logolyko, 265, 550, 100, 100);
  image(logohm, 500, 575, 50, 50);
  image(logoahlens, 745, 490, 100, 40);
  image(logozara, 40, 245, 100, 50);
  image(logocervera, 265, 370, 100, 40);
  image(logoapotek, 530, 370, 50, 40);
  image(logohemtex, 735, 255, 120, 25);
  image(logokicks, 360, 140, 120, 50);

  //player
  player.draw();

  // //all keys
  // key1.draw();
  // key2.draw();
  // key3.draw();
  // key4.draw();
  // key5.draw();
  // key6.draw();
  // key7.draw();
  // key8.draw();
  // key9.draw();

  //lives & counter
  fill(0, 0, 0);
  textSize(20);
  text("LIVES:", 700, 30);
  text(lives, 770, 30);

  //lose lives stroller1
  if (
    player.x + player.width / 2 >= stroller1.x - stroller1.width / 2 &&
    player.x - player.width / 2 <= stroller1.x + stroller1.width / 2 &&
    player.y + player.height / 2 >= stroller1.y - stroller1.height / 2 &&
    player.y - player.height / 2 <= stroller1.y + stroller1.height / 2
  ) {
    lives = lives - 1;
    player.x = 16;
    player.y = 11.3;
  }

  // lose lives stroller2
  if (
    player.x + player.width / 2 >= stroller2.x - stroller2.width / 2 &&
    player.x - player.width / 2 <= stroller2.x + stroller2.width / 2 &&
    player.y + player.height / 2 >= stroller2.y - stroller2.height / 2 &&
    player.y - player.height / 2 <= stroller2.y + stroller2.height / 2
  ) {
    lives = lives - 1;
    player.x = 16;
    player.y = 11.3;
  }

  //lose lives wife
  if (
    player.x + player.width / 2 >= wife.x - wife.width / 2 &&
    player.x - player.width / 2 <= wife.x + wife.width / 2 &&
    player.y + player.height / 2 >= wife.y - wife.height / 2 &&
    player.y - player.height / 2 <= wife.y + wife.height / 2
  ) {
    lives = lives - 1;
    player.x = 16;
    player.y = 11.3;
  }

  for (let key of keys) {
    key.draw();
  }

  //angry wife movement
  wife.draw();
  if (direction === "forward") {
    if (wife.x < 30) {
      wife.x = wife.x + 0.1;
    } else {
      direction = "backwards";
    }
  } else if (direction === "backwards") {
    if (wife.x > 10) {
      wife.x = wife.x - 0.1;
    } else {
      direction = "forward";
    }
  }

  //stroller1 movement

  stroller1.draw();
  if (direction === "forward") {
    if (stroller1.x < 5) {
      stroller1.x = stroller1.x + 0.1;
    } else {
      direction = "backwards";
    }
  } else if (direction === "backwards") {
    if (stroller1.x > 0) {
      stroller1.x = stroller1.x - 0.1;
    } else {
      direction = "forward";
    }
  }

  //stroller2 movemnet(ahlens)
  stroller2.draw();
  if (direction === "forward") {
    if (stroller2.x < 30) {
      stroller2.x = stroller2.x + 0.1;
    } else {
      direction = "backwards";
    }
  } else if (direction === "backwards") {
    if (stroller2.x > 24) {
      stroller2.x = stroller2.x - 0.1;
    } else {
      direction = "forward";
    }
  }

  //constains on the x-axis
  player.x = constrain(player.x, 0, 29);

  //player speed sideways
  player.y = player.y + gravity;

  let onRoof = false;

  for (let roof of roofs) {
    if (roof.hitTest(player.x, player.y)) {
      player.y = roof.y;
      onRoof = true;
    }
    // if (roof.hitTest2(player.x, player.y)){

    // }

    if (keyIsDown(32) && onRoof) {
      jumpReady = true;
      gravity = -5;
    } else if (!onRoof) {
      jumpReady = false;
      gravity = 0.2;
    }
  }

  player.x = player.x + speed;
  if (keyIsDown(39)) {
    speed = 0.4;
  } else if (keyIsDown(37)) {
    speed = -0.4;
  } else {
    speed = 0;
  }
}

function resultYouLoseScreen() {
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
  image(logoahlens, 745, 490, 100, 40);
  image(logozara, 40, 245, 100, 50);
  image(logocervera, 265, 370, 100, 40);
  image(logoapotek, 530, 370, 50, 40);
  image(logohemtex, 735, 255, 120, 25);
  image(logokicks, 360, 140, 120, 50);

  //grey overlay
  fill(0, 0, 0, 200);
  rect(0, 0, 900, 700);

  //gameovertext
  image(gameover, 120, -80, 700, 600);

  //buttons
  fill(190, 30, 45);
  rect(330, 440, 250, 80, 20);
  rect(330, 340, 250, 80, 20);
  image(playagain, 340, 355, 230, 100);
  image(menu, 390, 460, 130, 100);
}

function resultYouWinScreen() {
  background(246, 249, 217);
  noStroke();

  //blue rectangle
  fill(166, 211, 216);
  rect(100, 100, 700, 600);

  //pink parts
  fill(1242, 106, 94);
  rect(315, 90, 280, 720);
  rect(190, 90, 50, 600);
  rect(660, 90, 50, 600);

  //blue part in the middle
  fill(1, 39, 63);
  rect(90, 420, 720, 50);

  //mall entrance
  fill(166, 211, 216);
  rect(345, 500, 220, 180);

  //details entrance
  fill(1, 39, 63);
  rect(345, 500, 220, 15);
  rect(450, 500, 5, 180);
  rect(395, 500, 1, 180);
  rect(510, 500, 1, 180);
  rect(345, 600, 220, 1);

  //ground
  rect(0, 680, 900, 20);

  //buttons
  rect(330, 240, 250, 70, 20);
  rect(330, 340, 250, 70, 20);
  image(playagain, 355, 255, 200, 90);
  image(menu, 400, 355, 100, 90);

  //you win text
  image(youwin, 110, 30, 700, 300);
}

function draw() {
  // if (state ==="Start"){
  //   startScreen();
  // } else if (state === "Game"){
  //   gameScreen();
  // } else if (state === "ResultYouLose"){
  //   resultYouLoseScreen();
  // } else if (state === "ResultYouWin"){
  //   resultYouWinScreen();
  // }

  // startScreen();
  // rulesScreen();
  gameScreen();
  // resultYouLoseScreen();
  // resultYouWinScreen();
}
