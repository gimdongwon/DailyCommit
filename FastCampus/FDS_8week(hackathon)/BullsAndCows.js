export default class BullsAndCows {
  _answerDigits = this.randomDigits();
  _clear = false;
  _fail = false;
  _turn = 0;

  nextTurn(digits) {
    if (this._clear || this._fail) throw new Error('이미 게임이 끝났습니다.');
    this._turn++;
    const checkResult = this.checkDigits(digits);
    if (checkResult.strike === 3) {
      this._clear = true;
    } else if (this._turn >= 9) {
      this._fail = true;
    }
    return {
      ...checkResult,
      clear: this._clear,
      fail: this._fail,
      turn: this._turn
    };
  }

  randomDigit() {
    return Math.floor(Math.random() * 10).toString();
  }

  randomDigits() {
    const digits = [];
    for (let i = 0; i < 3; i++) {
      let digit;
      do {
        digit = this.randomDigit();
      } while (digits.includes(digit));
      digits.push(digit);
    }
    return digits;
  }

  checkDigits(digits) {
    return digits.reduce((acc, item, index) => {
      if (item === this._answerDigits[index]) acc.strike++;
      else if (this._answerDigits.includes(item)) acc.ball++;
      return acc;
    }, {
      strike: 0,
      ball: 0
    })
  }
}