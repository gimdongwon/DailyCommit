# Dom 연산자, 선택자

### document.querySelector

`var el = document.querySelector(".myclass");`

=> "myclass" 라는 클래스를 사용하는 문서의 첫 번째 element를 반환한다.
(depth-first)를 우선적으로 사용해 문서의 노드들을 탐색한다. 자식 노드의 양에 따라 첫 element를 검색하는것을 순차적으로 반복하여 탐색.
`element = document.querySelector(selectors);`

일치하는 것을 찾지 못하면 null을 반환하고 그렇지 않으면 가장 앞서 쓰인 element를 반환한다.

### document.querySelectorAll

## rgbchallenge (실제적인 예시 코드)

```js
const colorCodeEl = document.querySelector('.color-code'); // 컬러 코드의 요소를 객체로 가져온다.
// const colorCodeEl = document.queryselector('.color-code');
function randomNumber() {
  return Math.floor(256 * Math.random()); // 랜덤 컬러 코드를 출력하여서
}
function randomColorCode() { //랜덤으로 추출된 숫자 코드를 3가지 반환한다.
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

const boxes = document.querySelectorAll('.box'); // 박스의 객체들을 가져온다.

let correctAnswer; // 정답일시 의 답을 초기화 해주고
let score = 0; // 점수를 0으로 설정한다.
document.querySelector('.score').textContent = 'SCORE: ' + score; // 점수를 쌓을 준비를 한다. 객체를 설정.
function newStage(){ //새로운 게임을 시작할 때의 설정
  const colorCodes = [randomColorCode(), randomColorCode(), randomColorCode()] // 분류할 객체 생성
  boxes.forEach((el, index) => {// 뿌릴 준비를 한다.
    el.style.backgroundColor = colorCodes[index];
  });
  correctAnswer = Math.floor(Math.random() * 3);// 생성한 랜덤한 숫자를 3개로 분류한다.
  colorCodeEl.textContent = colorCodes[correctAnswer]; // 랜덤으로 생성된 컬러 코드랑 3개중 1개랑 같게 한다.
}
boxes.forEach((el, index)=>{ // 박스 클릴 했을 때 large기능으로 크게한다. 만약 답이면 다음버튼을 보여주고 답이 아닐시 현재 까지 쌓은 점수를 보여주며 점수를 0으로 돌아가게한다.
  el.addEventListener('click', ()=>{
    el.classList.add('large');
  if (correctAnswer === index) {
    document.querySelector('.modal.right').classList.add('show');
    score++;
  } else {
    document.querySelector(".modal.wrong").classList.add("show");
     document.querySelector(".score2").textContent = "SCORE: " + score;
    score = 0;
  }
  document.querySelector(".score").textContent = 'SCORE: ' + score; // 맞추거나 틀렷거나 각자의 설정을 score에 대입한다.
  // newStage();
})
})



// 선택이 끝나고 난뒤에 next를 눌렀을 때 large를 없애고 버튼을 없앤다. 질 결우도 마친가지이다.
document.querySelector('.modal.right .close').addEventListener('click', () =>{
  newStage();
  boxes.forEach(el =>{
    el.classList.remove('large');
  })
  document.querySelector('.modal.right').classList.remove('show');
});
document.querySelector(".modal.wrong .close").addEventListener("click", () => {
  newStage();
  boxes.forEach(el => {
    el.classList.remove("large");
  });
  document.querySelector(".modal.wrong").classList.remove("show");
});

newStage();
```