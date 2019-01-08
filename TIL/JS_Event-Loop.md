# Javascript의 Event Loop

---

> 싱글 스레드 기반으로 동작하는 JS
> 이벤트 루프를 기반으로 한느 싱글 스레드 Node.js

1. **정말 싱글스레드인가?**
2. **이벤트 루프는 무엇인가**

를 간단하게 알아보기 위해서 JS가 동작하는 환경과 자바스크립트를 해석하고 실행시키는 `**엔진**`에 대해서 알아보자

> JS Engine?

일단 한가지 짚고 넘어가야 할 것이 있는데 JS를 해석하는 JS 엔진과 웹 브라우저에 화면을 그리는 Rendering 엔진은 다른 것이다. Rendering 엔진은 (또는 Layout 엔진)은 HTML, CSS로 작성도니 마크업 관련된 코드들을 콘텐츠로써 웹 페이지에 `**rendering**`하는 역할을 한다. JS엔진은 JS로 작성된 코드를 해석하고 실행하는 **인터프리터** 다. 주로 웹 브라우저에서 이용되지만 최근에는 node.js라는 녀석이 등장하면서 V8과 같은 엔진이 이용된다.

구글에서 개발한 V8을 비롯한 대부분의 JS엔진은 크게 다음의 세영역으로 나뉜다

> Call Stack, Task Queue(Event queue), Heap

그리고 추가적으로 **Event loot**라는 녀석이 존재하며 Task queue에 들어가는 task들을 관리하게 된다.

## Call Stack

JS는 단 하나의 호출 스택을 사용한다. 이러한 특징 때문에 JS의 함수가 실행되는 방식을 "Run to Completion"라고 한다. 이는 하나의 함수가 실행되면 이 함수의 실행이 끝날 때까지 다른 어떤 task도 수행될 수 없다는 의미이다. 요청이 들어올 때마다 순차적으로 호출 스택에 담아 처리한다. 메소드가 실행될 때, Call Stack에 새로운 프레임이 생기고 push 되고 메소드의 실행이 끝나면 해당 프레임은 pop되는 원리이다.

```js
function foo(b) {
  var a = 10;
  return a + b;
}
function bar(x) {
  var y = 2;
  return foo(x + y);
}
console.log(bar(1));
```

위 코드를 보면

bar라는 함수를 호출했으니 bar에 해당하는 스택 프레임이 형성되고 그 안에서는 y와 같은 local variable과 arguments가 함께 생성된다. 그리고 bar함수는 foo 함수를 호출하고 있다. 아직 bar함수는 종료되지 않았으니 pop되지 않고 호출된 foo함수가 call stack에 push된다.

foo함수에서는 a+b라는 값을 return 하면서 함수의 역할을 모두 마쳤으므로 stack에서 pop된다. 다시 bar함수로 돌아와서 foo함수로부터 받은 값을 return 하면서 bar함수도 종료되고 pop된다.

## Heap

동적으로 생선된 객체(인스턴스)는 힙(heap)에 할당된다. 대부분 구조화되지 않는 더미같은 메모리 영역을 heap이라 표현한다.

## Task Queue(Event Queue)

JS의 런타임 환경에서는 처리해야 하는 Task들을 임시 저장하는 대기 큐가 존재한다.

그 대기 큐를 Task Queue or Event Queue라고 한다. 그리고 Call Stack이 **비어졌을 때** 먼저 대기열에 들어온 순서대로 수행한다.

```js
setTimeout(function() {
  console.log("first");
}, 0);
console.log("second");

// console>>
// second
// first
```

이 코드는 first먼저 작동하지 않는다.

JS에서 비동기로 호출되는 함수들은 Call Stack에 쌓이지 않고 Task Queue에 enqueue된다. JS에서는 이벤트에 의해 실행되는 함수 들이 비동기로 실행된다. `JS엔진이 아닌 Web API영역에 따로 정의되어 있는 함수들은 비동기로 실행된다.`

```js
function test1() {
  console.log("test1");
}
function test2() {
  let timer = setTimeout(function() {
    console.log("test2");
  }, 0);
  test3();
}
function test3() {
  console.log("test3");
}
test1();
```

다음 코드를 살펴보자

일단 test1이 출력이 되고 test2가 호출되면서 setTimeout 함수가 실행되고 콜 스택에 들어간 다음, 바로 빠져 나온다. 그리고 `내부에 걸려있던 핸들러(익명함수)는 콜스텍에 들어가서 바로 실행되지 않는다.` 이 부분이 중요하다. 이 핸들러는 call stack영역이 아닌 event queue 영역으로 들어간다. 그리고 test3함수가 콜스텍에 들어간다.

test()이 실행되면서 test3이 출력되고, 작업에 마친 test3가 Call Stack에서 pop된다. 이어서 test2함수와 tset1 함수까지 Call stack에서 pop된다. 이 때 이벤트 루프의 콜스택이 비어있게 된다. 바로 이 시점에서 queue의 head에서 하나의 event를 가져와서 Call Stack으로 넣는다. 이 이벤트는 setTimeout함수 내부에 있던 익명함수이다. 이제서야 이 함수가 실행된다.

즉, test3가 끝나고 test2가 끝나고, test1이 끝나고 나서야 이벤트 루프에 의해 하나의 event가 dequeue된 다음 콜스택으로 들어가서 실행된다. `그러므로 이벤트에 걸려있는 핸들러는 절대 먼저 실행될 수 없다.`

이런 의문이 들 수 있는데 (나는 안들음 ㅠㅠ)

Q1. Event Loop는 백그라운드 스레드가 존재해서 Call Stack을 polling하면서 비어있는지 확인하는 건가?

Q2. Event queue에도 event가 있는 지 확인해야 할 것 같은데 이 때도 polling으로 검사하는 것인가?

Q3. Event Loop에 의해서 Event queue에 있던 하나의 이벤트가 Call Stack에 들어간 다음에는 그 이벤트가 끝나기 전까지 이벤트 루프는 이벤트 큐에서 이벤트를 dequeue하지 않나?

Q4. Call Stack에서 이벤트가 진행 중일 때도 Event Loop는 어떻게 확인을 하나

이 질문들에 대한 답은 MDN에서 간단한 가상의 코드로 답을 말해준다.

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

이런 식으로 이벤트 루프는 현재 실행 중인 tast가 없는지와 tast queue에 tast가 있는지를 반복적으로 확인한다. queue에 메시지, 즉 처리해야할 이벤트가 존재하면 while-loop안으로 들어가서 해당하는 이벤트를 처리하거나 작업을 수행한다. 그리고는 다시 queue로 돌아와 새로운 이벤트가 존재하는지 파악하는 것이다. 눈치챘겠지만 Event Queue에서 대기하고 있는 Event들은 한 번씩 하나씩 Call Stack으로 호출되어 처리된다.
