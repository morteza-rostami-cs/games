class Screen {
  static WIDTH = 800;
  static HEIGHT = 600;

  static LEFT = 0;
  static RIGHT = Screen.WIDTH;
  static TOP = 0;
  static BOTTOM = Screen.HEIGHT;

  constructor() {
    this.canvas;
    this.ctx;

    // pressed keys
    // this.keysDown = [];
    this.keysDown = new Set();
    // pressed once per frame
    this.keysPressed = new Set();
  }

  setup() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = Screen.WIDTH;
    this.canvas.height = Screen.HEIGHT;
    this.canvas.style.backgroundColor = "lightblue";

    // canvas focus
    this.canvas.tabIndex = 0;
    this.canvas.focus();

    // events
    this.canvas.addEventListener("keydown", (event) => {
      // prevent default browser
      event.preventDefault();

      if (event.repeat) return; // prevent repeated events

      // push the current key down
      // if: it is not already in there
      if (!this.keysDown.has(event.key)) {
        this.keysDown.add(event.key);
        this.keysPressed.add(event.key);
      }
    });

    this.canvas.addEventListener("keyup", (event) => {
      // get the index
      // const keyIndex = this.keysDown.indexOf(event.key);

      // remove from down keys
      // this.keysDown.splice(keyIndex, 1);
      this.keysDown.delete(event.key);
    });

    const app = document.getElementById("app");

    if (!app) throw new Error("no app element");

    app.appendChild(this.canvas);
  }

  isKeyDow(key) {
    return this.keysDown.has(key);
  }

  wasPressed(key) {
    return this.keysPressed.has(key);
  }

  // remove all pressed keys at the end of each frame -- so in each frame we add once and remove it
  endFrame() {
    this.keysPressed.clear();
  }
}

// block:: global_state=======

let screen = null;
// delta time
let prevTime = performance.now();
let deltaTime = 0;

// end:: global_state========

// block:: functions =====

function calcDeltaTime(timestamp) {
  // init the prevTime with timestamp before first animation loop runs
  let currentTime = timestamp;
  deltaTime = (currentTime - prevTime) / 1000;
  // update prevTime to last currentTime
  prevTime = currentTime;
}

// end:: functions ======

function loop(timestamp) {
  // deltaTime
  calcDeltaTime(timestamp);

  update();

  draw();

  // clear screen state
  screen.endFrame();
  requestAnimationFrame(loop);
}

function main() {
  screen = new Screen();

  screen.setup();

  init();

  // call it with requestAnim -- or timestamp is undefined
  requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", main);

// ====================
// ====================
// ====================

class Player {
  // player lives on a grid -- so we keep row, col values -- instead of px values
  constructor(row = 0, col = 1) {
    this.row = row;
    this.col = col;
  }

  draw(x, y) {
    screen.ctx.fillStyle = "red";
    screen.ctx.fillRect(x, y, 20, 20);
  }

  move(row, col) {
    // check for out of bound
    if (row < 0) return (this.row = 0);

    if (row >= World.ROWS) return (this.row = World.ROWS - 1);

    if (col < 0) return (this.col = 0);

    if (col >= World.COLS) return (this.col = World.COLS - 1);

    // if not out of bound
    this.row = row;
    this.col = col;
  }

  update() {
    // console.log("update player", keysDown);
    if (screen.wasPressed("ArrowUp")) {
      this.move(this.row - 1, this.col);
    }

    if (screen.wasPressed("ArrowDown")) {
      this.move(this.row + 1, this.col);
    }

    if (screen.wasPressed("ArrowLeft")) {
      this.move(this.row, this.col - 1);
    }

    if (screen.wasPressed("ArrowRight")) {
      // row = y direction
      this.move(this.row, this.col + 1);
    }
  }
}

class Cell {
  static ID = 0;
  static SIZE = 58; // px

  constructor(color = "lightgreen") {
    this.id = Cell.ID;
    this.color = color;
    // width and height
    this.size = Cell.SIZE;

    // increment for each instance
    Cell.ID++;
  }
}

class World {
  static X = 110;
  static Y = 10;

  static ROWS = 10;
  static COLS = 10;

  constructor() {
    this.grid = [
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
    ];
  }

  // get world px coordinate -- by row, col
  static getCoordinate(row, col, obj_w = 10, obj_h = 10) {
    // to center object -- add half of cell w/h and subtract object w/h
    // row = y and col = x
    const y = Cell.SIZE * row + World.Y + Cell.SIZE / 2 - obj_h;
    const x = Cell.SIZE * col + World.X + Cell.SIZE / 2 - obj_w;

    // console.log(Cell.SIZE);
    return { x, y };
  }

  draw() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        const cell = this.grid[i][j];

        screen.ctx.strokeStyle = "white";
        screen.ctx.fillStyle = cell.color;

        screen.ctx.lineWidth = 2;
        // console.log(cell.size * j);

        screen.ctx.fillRect(
          cell.size * j + World.X, // move x
          cell.size * i + World.Y, // move y
          cell.size,
          cell.size,
        );
        screen.ctx.strokeRect(
          cell.size * j + World.X, // move x
          cell.size * i + World.Y, // move y
          cell.size,
          cell.size,
        );
      }
    }
  }
}

let world;
let player;

function init() {
  world = new World();
  player = new Player();
}

function update() {
  player.update();
}

function draw() {
  // clear the canvas in each frame
  screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);

  // screen.ctx.fillStyle = "red";
  // screen.ctx.fillRect(10, 10, 10, 10);
  world.draw();

  const { x, y } = World.getCoordinate(player.row, player.col);
  // console.log(x, y);
  player.draw(x, y);
}
