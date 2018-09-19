import BullsAndCows from './BullsAndCows';

const inputBoxEl = document.querySelector('.input-box');
const tryButtonEl = document.querySelector('.input-box__try');
const digitInputEls = document.querySelectorAll('.input-box__digit');
const turnListEl = document.querySelector('.turn-list');
const resetButtonEl = document.querySelector('.input-box__reset');
const answerEl = document.querySelector('.answer');

let game = new BullsAndCows();

function appendTurnResult({digits, strike, ball, turn}) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('turn-list__turn-item');

  const digitsEl = document.createElement('div');
  digitsEl.classList.add('turn-item__turn-digits');

  const turnNumEl = document.createElement('div');
  turnNumEl.classList.add('tur-item__num');
  turnNumEl.textContent = `${turn}회`;
  digitsEl.appendChild(turnNumEl);

  digits.forEach(d => {
    const digitEl = document.createElement('div');
    digitEl.classList.add('turn-digits__digit');
    digitEl.textContent = d;
    digitsEl.appendChild(digitEl);
  })

  itemEl.appendChild(digitsEl);

  const resultEl = document.createElement('div');
  resultEl.classList.add('turn-item__turn-result');
  const resultText = (
    strike === 0 && ball === 0 ?
    'OUT' :
    `${ball}B ${strike}S`
  );
  resultEl.textContent = resultText;
  itemEl.appendChild(resultEl);

  turnListEl.appendChild(itemEl);
}

digitInputEls.forEach((el, index) => {
  el.addEventListener('keypress', e => {
    // FIXME: 한글 입력시 적용 안됨
    e.preventDefault();
    if (!/\d/.test(e.key)) {
      return;
    }
    el.value = e.key;
    if (digitInputEls[index + 1]) {
      digitInputEls[index + 1].focus();
    } else {
      tryButtonEl.focus();
    }
  });
});

inputBoxEl.addEventListener('submit', e => {
  e.preventDefault();
  const digits = Array.from(digitInputEls).map(el => el.value);
  const turnResultEl = document.createElement('div');
  const turnResult = {
    digits,
    ...game.nextTurn(digits)
  };
  appendTurnResult(turnResult);
  if (turnResult.clear || turnResult.fail) {
    const answer = game._answerDigits.join(', ');
    answerEl.textContent = (
      turnResult.clear ?
      `정답을 맞추셨습니다: ${answer}` :
      `정답은 ${answer} 입니다.`
    );
    tryButtonEl.setAttribute('disabled', '');
    resetButtonEl.focus();
  } else {
    digitInputEls.forEach(el => {
      el.value = '';
    });
    digitInputEls[0].focus();
  }
});

resetButtonEl.addEventListener('click', e => {
  e.preventDefault();
  game = new BullsAndCows();
  digitInputEls.forEach(el => {
    el.value = '';
  })
  turnListEl.textContent = '';
  digitInputEls[0].focus();
  answerEl.textContent = '';
  tryButtonEl.removeAttribute('disabled');
})

/* FIXME */
window.Game = BullsAndCows;
digitInputEls[0].focus();