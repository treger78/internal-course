class Calculator {
  constructor(shouldRoundFloor) {
    this.shouldRoundFloor = shouldRoundFloor;
  }

  sum(a, b) {
    return this.shouldRoundFloor ? Math.floor(a + b) : Math.ceil(a + b);
  }

  showResult(result) {
    console.log(result);
  }

  sumAndShowResult(a, b) {
    const result = this.sum(a, b);
    this.showResult(result);
  }
}

module.exports = Calculator;
