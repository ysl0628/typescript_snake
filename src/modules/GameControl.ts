import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 遊戲控制器，控制其他所有類
class GameControl {
  // 定義三個屬性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  // 建立一個屬性來儲存蛇的移動方向 (按鍵的方向)
  direction: string = "";
  // 建立紀錄遊戲是否結束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  // 遊戲初始化方法，調用後遊戲即開始
  init() {
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    // document.addEventListener("keydown", this.keydownHandler);
    // document.addEventListener("keydown", (e) => this.keydownHandler(e));
    // 調用 run 方法
    this.run();
  }

  //   keydownHandler = (event: KeyboardEvent) => {
  //     console.log(this);
  //     this.direction = event.key;
  //   };

  // 建立一個鍵盤按下的響應函數
  keydownHandler(event: KeyboardEvent) {
    // 修改 direction 屬性
    // 檢查 event.key 是否按了正確的案件
    // if (event.key !== "ArrowUp" || "ArrowDown" || "ArrowLeft" || "ArrowRight") {
    //   return;
    // }
    this.direction = event.key;
  }

  // 建立一個蛇移動的方法
  run() {
    // 根據 (this.direction) 來使蛇的位置改變
    /**
     *    向上 top 減少
     *    向下 top 增加
     *    向左 left 減少
     *    向右 left 增加
     */

    // 取得蛇現在的座標
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
    }

    // 檢查蛇是否吃到食物
    this.checkEat(X, Y);

    const timer = setTimeout(
      this.run.bind(this),
      300 - (this.scorePanel.level - 1) * 30
    );

    // 修改蛇的 X、Y 值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (err) {
      // 進入 catch，說明出現異常，遊戲結束，跳出提示
      alert((err as Error).message);
      // 將 isLive 設為 false
      this.isLive = false;
      // 撞牆時自動清除定時器且重整頁面
      clearTimeout(timer);
      location.reload();
    }

    // 開啟一個定時調用
    this.isLive && timer;
  }

  // 定義一個檢查蛇是否吃到食物的方法
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物要進行重置
      this.food.change();
      // 分數增加
      this.scorePanel.addScore();
      // 身體變長
      this.snake.addBody();
    }
  }
}

export default GameControl;
