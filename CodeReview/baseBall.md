```js
const answer = document.querySelector('.answer'); // 사용할 변수들 정리
const btnTry = document.querySelector(".input-box__try");
const btnReset = document.querySelector('.input-box__reset');
const num1 = document.getElementsByName('userNumber')[0];
const num2 = document.getElementsByName('userNumber')[1];
const num3 = document.getElementsByName('userNumber')[2];
const trial = document.getElementsByName('btnTry')[0];
const turnList = document.querySelector('.turn-list');
let count = 0;



class baseBallGame { // class 를 정의합니다/
  answerArr = [];
  randomNumCreate() {
    // 랜덤으로 컴퓨터에 저장되는 수 생성
    randomNumber1 = Math.round(Math.random() * 9);
    do randomNumber2 = Math.round(Math.random() * 9);
    while (randomNumber1 === randomNumber2);
    do randomNumber3 = Math.round(Math.random() * 9);
    while (randomNumber2 === randomNumber3 || randomNumber3 === randomNumber1);
    answerArr = [randomNumber1,randomNumber2,randomNumber3]
    return answerArr;
  }

  // 스코프 오류
  // randomNumber = [randomNumber1, randomNumber2, randomNumber3]; // 배열로 사용하여 비교하기 위해 배열로 정의
 
  // 정답숫자 변수에 저장.
  randomNumber = this.randomNumCreate();
  userNumber = document.getElementsByName('userNumber');

  // userNumber = [userNumber1, userNumber2, userNumber3]; // random number와 비교하기 위해 배열로 지정

  checker() {
    // 비교시작
    let s = 0, b = 0, c='OUT'; // 이중포문을 통해 인수값과 결과같이 같으면 strike, 결과값만 같으면 ball 둘다 같지 않으면 아웃으로 처리.
    let answerMsg = '';
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (this.randomNumber[i].toString() === this.userNumber[j].value && i === j) {
          s++;
        } else if (this.randomNumber[i].toString() === this.userNumber[j].value && i !== j) {
          b++;
        }
        if(s === 3){
          answer.textContent = '정답입니다! 정답은' + this.randomNumber + ' 입니다.';
        }
      }
    }
    return [s + "S " + b + "B", s, b]; // 변수를 가져오기 위해 배열로 설정
  }

}

const game = new baseBallGame();

// 변경사항



btnTry.addEventListener('click', function () {

  let iDiv = document.createElement('div');
  iDiv.className = 'score-box';
  let iCount = document.createElement('div');
  iCount.className = 'count';
  let iScore = document.createElement('div');
  iScore.className = 'score';
  let iNumber1 = document.createElement('span');
  let iNumber2 = document.createElement('span');
  let iNumber3 = document.createElement('span');
  iNumber1.className = 'inumber';
  iNumber2.className = 'inumber';
  iNumber3.className = 'inumber';
  count++;
  document.querySelector('.turn-list').appendChild(iDiv); // css를 위한 자식 노드 생성
  iDiv.appendChild(iCount);
  iDiv.appendChild(iScore);
  iDiv.appendChild(iNumber1);
  iDiv.appendChild(iNumber2);
  iDiv.appendChild(iNumber3);

  iCount.textContent = count + '회';
  iNumber1.textContent = num1.value;
  iNumber2.textContent = num2.value;
  iNumber3.textContent = num3.value;

  iScore.textContent = game.checker()[0]; // 스코어 체크 실시

  // strike가 3개 일시 정답을 return 합니다
  if (game.checker()[1] === 3){ 
    alert("정답입니다");
    answer.className += 'on';
    answer.textContent = "정답은 " + game.randomNumber + " 입니다.";
    btnTry.setAttribute("disabled", "disabled");
  }
  if (game.checker()[1] === 0 && game.checker()[2] === 0) { // strike와 ball이 한개도 없을 시 out을 return합니다.
    iScore.textContent = 'OUT';
  }
  num1.value = "";
  num2.value = "";
  num3.value = "";
  num1.focus();

  if(count === 9){ // 9회가 넘어갈시 종료
    answer.className += ' on';
    answer.textContent = '정답은 ' + game.randomNumber + ' 입니다.'
    alert("게임이 끝났습니다 그만 하시죠 사장님");
    btnTry.setAttribute("disabled", "disabled");
  }
 
});

num1.addEventListener('keypress', function () { // focus 옮겨가는 부분입니다.
  numTest = /^[0-9]/g;
  if(num1.value !== '' || num1.value !== null || num1.value === numTest){
    num2.focus();
  }
 });
 num2.addEventListener('keypress', function(){
  if(num2.value !== '' || num2.value !== null){
    num3.focus();
  }
});
num3.addEventListener('keyup', function () {
  if (num3.value !== '' || num3.value === null) {
    
    trial.focus();
    }
});
//새로고침
btnReset.addEventListener('click', function(){
  location.replace('');
});
```

<br>

```
 # 끝나고 나서 코드리뷰

 그래도 다 완성을 다해서 기쁘다.

 처음에는 완성할 수 있을까라는 생각이 많이 들었었는데

 맨처음 생각했던 것이 두 가지 logic 이었다.

 1. 처음으로 랜덤숫자를 생성하여서 컴퓨터에 그 수를 저장하는 것.

 2. 랜덤으로 만들어진 숫자와 user가 넣은 숫자랑 비교하는 논리를 만들고 해당하는 score를 출력하는 것.

 다행히 첫날에 이 2가지 logic을 해결하였다. 2가지 로직을 해결 하였으나 리터럴이 굉장히 많이 틀렸었다.

 지금 와서 비교해보면 ${}을 사용한것, 스코프 문제를 인식하지 못한것, do 앞에 ()를 써서 do의 리터럴을 인지하지 못한점( 사실 이건쫌.. 쓰기도 하는 것 같다)

 가장 큰 것은 코드간의 유기적으로 동작하는 흐름을 이해하지 못하였다. 그게 가장 아쉽다

 물론 그게 가장 어려운 거지만 내가 그것들을 다 파악하는 날이 오길 기대한다.

 그것을 다 파악 한다면 조금 더 나은 내가 되어 있을 것이다.

 화이팅!! 최고보다는 최강이 되자`

아 끝나고 근환이형이랑 이런 저런 코드에 대한 애기를 하였는데

훔.. do while에 대한 이야기를 하였다. 총 배열로 만들어서 그 숫자를 빼가면서 추가하는 로직 이런생각도 하는구나 나보다 잘하는 사람의 애기고 하니까 알아듣도록 하자

두번째 checker()는 괜찮게 짰는데 마찬가지로 literal이 아쉽다. 조금 더 많은 사용을 해보자

```