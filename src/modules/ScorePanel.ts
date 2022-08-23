// 定義表示計分牌的類
class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 設置變數限制等級
  maxLevel: number;
  // 設置每升一級的變數
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 增加分數的方法
  addScore() {
    // 分數自增
    // innerHTML 是 string，++this.score 後必須加個 string 才符合類型
    this.scoreEle.innerHTML = ++this.score + "";
    // 判斷分數是多少
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 提升等級的方法
  levelUp() {
    if (this.level >= this.maxLevel) {
      return;
    }
    this.levelEle.innerHTML = ++this.level + "";
  }
}
// 測試
// const scorePanel = new ScorePanel();
// for (let index = 0; index < 200; index++) {
//   scorePanel.addScore();
// }

export default ScorePanel;
