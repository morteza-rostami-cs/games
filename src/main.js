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
    this.keysDown = [];
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

      // push the current key down
      // if: it is not already in there
      if (!this.keysDown.includes(event.key)) {
        this.keysDown.push(event.key);
      }
    });

    this.canvas.addEventListener("keyup", (event) => {
      // get the index
      const keyIndex = this.keysDown.indexOf(event.key);

      // just a check for index not found
      if (keyIndex === -1) {
        console.log("key not found");
        return;
      }

      // remove from down keys
      this.keysDown.splice(keyIndex, 1);
    });

    const app = document.getElementById("app");

    if (!app) throw new Error("no app element");

    app.appendChild(this.canvas);
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
  constructor() {
    this.x = screen.canvas.width / 2;
    this.y = screen.canvas.height / 2;
    this.width = 50;
    this.height = 50;
    this.speed = 150; // 20 px
  }

  update() {
    // player edges
    // so: x,y is for top left of player
    this.leftEdge = this.x;
    this.rightEdge = this.x + this.width;
    this.topEdge = this.y;
    this.bottomEdge = this.y + this.height;
  }

  draw() {
    screen.ctx.fillStyle = "red";
    screen.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    // they can happen at the same time -- for diagonal move
    if (screen.keysDown.includes("ArrowUp")) {
      if (this.topEdge <= Screen.TOP) {
        // clamp
        this.y = Screen.TOP;
      } else {
        this.y = this.y - this.speed * deltaTime;
      }
    }

    if (screen.keysDown.includes("ArrowDown")) {
      if (this.bottomEdge >= Screen.BOTTOM) {
        // this.y is the top-left
        this.y = Screen.BOTTOM - this.height;
      } else {
        this.y += this.speed * deltaTime;
      }
    }

    if (screen.keysDown.includes("ArrowLeft")) {
      if (this.leftEdge <= Screen.LEFT) {
        this.x = Screen.LEFT;
      } else {
        this.x -= this.speed * deltaTime;
      }
    }

    if (screen.keysDown.includes("ArrowRight")) {
      if (this.rightEdge >= Screen.RIGHT) {
        // pull it back
        this.x = Screen.RIGHT - this.width;
      } else {
        this.x += this.speed * deltaTime;
      }
    }
  }
}

class Enemy {
  constructor(w, h) {
    this.x = 0;
    this.y = 0;

    this.vx = 100;
    this.vy = 100;

    this.w = w;
    this.h = h;

    // this.speed = 100;
  }

  // separate the idea of move and direction
  move() {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }

  update() {
    // console.log(this.vx, this.vy);
    if (this.y + this.h >= Screen.BOTTOM) {
      this.vy *= -1;
      this.y = Screen.BOTTOM - this.h;
    }

    if (this.y <= Screen.TOP) {
      this.vy *= -1;
      this.y = Screen.TOP;
    }

    // left
    if (this.x <= Screen.LEFT) {
      this.vx *= -1;
      this.x = Screen.LEFT;
    }

    // console.log(this.x + this.w, Screen.)
    if (this.x + this.w >= Screen.RIGHT) {
      // console.log(this.vx);
      this.vx *= -1;
      this.x = Screen.RIGHT - this.w;
    }
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    screen.ctx.fillStyle = "yellow";
    screen.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

let player;
let enemy;

function init() {
  player = new Player();
  enemy = new Enemy(20, 20);
  // center of screen
  enemy.setPos(Screen.WIDTH / 2 - enemy.w, Screen.HEIGHT / 2 - enemy.h);
  // enemy.init();
}

function update() {
  // x += 10 * deltaTime;
  // console.log(screen.keysDown);

  // player.update();
  // player.move();

  enemy.move();
  enemy.update();
}

function draw() {
  // clear the canvas in each frame
  screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);

  // player.draw();
  enemy.draw();
}
