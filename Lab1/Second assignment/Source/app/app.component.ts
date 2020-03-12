import { Component } from '@angular/core';
import { Box_size, Colours, Keyboard,  Game_mode} from './app.constant';
/* import colors, board_size and game_modes */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'HandlingKeyboardEvents($event)'
  }
})
 /* declaring all the variables requires for the game */
export class AppComponent {
  title = 'snake-game';
  private inter: number;
  private tempDir: number;
  private DefaultMode = 'classic';
  private GameFinish = false;
  public GetAllKeys = Object.keys;
  public box = [];
  public score = 0;
  public newBScore = 0;
  public obstacles = [];
  public gameStarted = false;
  public showMenuBox = false;
  public BestScore = 0;
  public ALLModes = Game_mode;
  private Snake = {
    direction: Keyboard.LT,
    prop: [
      {
        a: -1,
        b: -1
      }
    ]
  };
  private fruits = {
    a: -1,
    b: -1
  };
  constructor(

  ) {
    this.setBoxSize();
  }
/*  keyboard events givng up and down*/
  HandlingKeyboardEvents(keys: KeyboardEvent) {
    if (keys.keyCode === Keyboard.LT && this.Snake.direction !== Keyboard.RT) {
      this.tempDir = Keyboard.LT;
    } else if (keys.keyCode === Keyboard.UP && this.Snake.direction !== Keyboard.DN) {
      this.tempDir = Keyboard.UP;
    } else if (keys.keyCode === Keyboard.RT && this.Snake.direction !== Keyboard.LT) {
      this.tempDir = Keyboard.RT;
    } else if (keys.keyCode === Keyboard.DN && this.Snake.direction !== Keyboard.UP) {
      this.tempDir = Keyboard.DN;
    }
  }
/* set colors */
  ColorSetting(column: number, rows: number): string {
    if (this.GameFinish) {
      return Colours.Game_finishes;
    } else if (this.fruits.a === rows && this.fruits.b === column) {
      return Colours.Obstacle;
    } else if (this.Snake.prop[0].a === rows && this.Snake.prop[0].b === column) {
      return Colours.front;
    } else if (this.box[column][rows] === true) {
      return Colours.Body;
    }
    return Colours.Box;
  }
/* update the position of the fruit*/
  updateFruitPosition(): void {
    let new_front = this.RepositionHeadSnake();
    let current = this;

    if (this.DefaultMode === 'classic' && this.SnakeboxCollision(new_front)) {
      return this.gFinish();
    }
    if (this.obstacleFruitCollision(new_front)) {
      return this.gFinish();
    }
    if (this.SnakeCollisionSelf(new_front)) {
      return this.gFinish();
    } else if (this.SnakeFruitCollision(new_front)) {
      this.eatFruitSnake();
    }

    let old_obstacle = this.Snake.prop.pop();
    this.box[old_obstacle.b][old_obstacle.a] = false;

    this.Snake.prop.unshift(new_front);
    this.box[new_front.b][new_front.a] = true;

    this.Snake.direction = this.tempDir;

    setTimeout(() => {
      current.updateFruitPosition();
    }, this.inter);
  }
  checkFruitObstacles(a, b): boolean {
    let res = false;

    this.obstacles.forEach((val) => {
      if (val.a === a && val.b === b) {
        res = true;
      }
    });

    return res;
  }
  /* repostion head */
  RepositionHeadSnake(): any {
    let new_front = Object.assign({}, this.Snake.prop[0]);

    if (this.tempDir === Keyboard.RT) {
      new_front.a += 1;
    } else if (this.tempDir === Keyboard.LT) {
      new_front.a -= 1;
    } else if (this.tempDir === Keyboard.DN) {
      new_front.b += 1;
    } else if (this.tempDir === Keyboard.UP) {
      new_front.b -= 1;
    }

    return new_front;
  }
  /* when snake hits object*/
  obstacleFruitCollision(part: any): boolean {
    return this.checkFruitObstacles(part.a, part.b);
  }
  SnakeboxCollision(part: any): boolean {
    return part.a === Box_size || part.a === -1 || part.b === Box_size || part.b === -1;
  }
  SnakeCollisionSelf(part: any): boolean {
    return this.box[part.b][part.a] === true;
  }

  SnakeFruitCollision(part: any): boolean {
    return part.a === this.fruits.a && part.b === this.fruits.b;
  }
/* when game get over reseting the obstacle*/
  resetObstacle(): void {
    let a = this.randomNumber();
    let b = this.randomNumber();

    if (this.box[b][a] === true || this.checkFruitObstacles(a, b)) {
      return this.resetObstacle();
    }

    this.fruits = {
      a: a,
      b: b
    };
  }
/* when snake eating that object*/
  eatFruitSnake(): void {
    this.score++;

    let last = Object.assign({}, this.Snake.prop[this.Snake.prop.length - 1]);

    this.Snake.prop.push(last);
    this.resetObstacle();

    if (this.score % 5 === 0) {
      this.inter -= 15;
    }
  }
/* game get over and update the best score */
  gFinish(): void {
    this.GameFinish = true;
    this.gameStarted = false;
    let curr = this;

    if (this.score > this.BestScore) {
      this.BestScore = this.score;
      this.newBScore = this.score;
    }

    setTimeout(() => {
      curr.GameFinish = false;
    }, 500);

    this.setBoxSize();
  }

  randomNumber(): any {
    return Math.floor(Math.random() * Box_size);
  }
/* setting the board */
  setBoxSize(): void {
    this.box = [];
    for (let i = 0; i < Box_size; i++) {
      this.box[i] = [];
      for (let j = 0; j < Box_size; j++) {
        this.box[i][j] = false;
      }
    }
  }

  showMenuStart(): void {
    this.showMenuBox = !this.showMenuBox;
  }
/* whenever game got reset */
  newGameStart(mode:string): void {
    this.DefaultMode = 'classic';
    this.showMenuBox = false;
    this.newBScore = 0;
    this.gameStarted = true;
    this.score = 0;
    this.tempDir = Keyboard.LT;
    this.GameFinish = false;
    this.inter = 150;
    this.Snake = {
      direction: Keyboard.LT,
      prop: []
    };
    let j = 0;
    while (j < 3) {
      this.Snake.prop.push({ a: 8 + j, b: 8 });
      j++;
    }

    this.resetObstacle();
    this.updateFruitPosition();
  }
}


