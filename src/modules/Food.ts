class Food {
  // 定義一個屬性表示食物所對應的元素
  element: HTMLElement;
  constructor() {
    // 獲取頁面中的 food 元素，並將其賦值給 element
    this.element = document.getElementById("food")!;
  }

  // 定義一個獲取食物 x 軸座標的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 定義一個獲取食物 y 軸座標的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成一個隨機的位置
    // 食物位置最小是 0 最大是 300 - 10 = 290
    // 蛇移動一次就是一格，一格大小是 10
    // Math.random 回傳一個偽隨機小數，介於 0 到 1 之間(包含 0，不包含 1)

    const top = Math.round(Math.random() * 29) * 10;
    const left = Math.round(Math.random() * 29) * 10;
    // Math.floor(Math.random() * 30) * 10;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
}

// 測試
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);

export default Food;
