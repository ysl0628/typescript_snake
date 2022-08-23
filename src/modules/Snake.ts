class Snake {
  // 蛇頭的元素
  head: HTMLElement;
  // 蛇的身體 (包括蛇頭)
  bodies: HTMLCollectionOf<HTMLElement>;
  // 蛇的元素
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div")!;
    this.bodies = this.element.getElementsByTagName("div");
  }

  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  set X(value: number) {
    if (this.X === value) {
      return;
    }

    // X 的值範圍應在 0 - 290
    if (value < 0 || value > 290) {
      // 當蛇撞牆，拋出一個錯誤
      throw new Error("撞牆啦 ~ GAME OVER");
    }

    // 水平座標，蛇左右移動，不可往回走
    if (this.bodies[1] && this.bodies[1].offsetLeft === value) {
      console.log("迴轉了");
      // 如果發生迴轉，讓蛇向反方向繼續移動
      if (value > this.X) {
        value = this.X - 10;
        return;
      }
      value = this.X + 10;
    }

    // 移動身體
    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadBody();
  }

  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    // Y 的值範圍應在 0 - 290
    if (value < 0 || value > 290) {
      // 當蛇撞牆，拋出一個錯誤
      throw new Error("撞牆啦");
    }

    if (this.bodies[1] && this.bodies[1].offsetTop === value) {
      console.log("迴轉了");
      // 如果發生迴轉，讓蛇向反方向繼續移動
      if (value > this.Y) {
        value = this.Y - 10;
        return;
      }
      value = this.Y + 10;
    }

    // 移動身體
    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadBody();
  }

  // 蛇增加身體的方法
  addBody() {
    // beforeend 只在該元素當中，在該元素最後一個 child 後面
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // 增加蛇身移動的方法
  moveBody() {
    /**
     *  將後面身體的位置設為前面身體的位置
     *    第四節 = 第三節位置
     *    第三節 = 第二節位置
     *    第二節 = 第一節位置
     */

    // 遍歷獲取所有身體
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 取得前面身體的位置
      let X = this.bodies[i - 1].offsetLeft;
      let Y = this.bodies[i - 1].offsetTop;

      // 將值設置到當前的身體
      this.bodies[i].style.left = X + "px";
      this.bodies[i].style.top = Y + "px";
    }
  }

  checkHeadBody() {
    // 取得所有身體，檢查其是否和蛇頭座標重疊
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i];
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("撞到自己了！GAME OVER");
      }
    }
  }
}

export default Snake;
