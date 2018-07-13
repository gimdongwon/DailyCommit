# part 3 JSX

지금까지 React 엘리먼트와 컴포넌트를 생성해서 사용자 정의 엘리먼트를 이용하고 더 나은 UI 구성 방법도 살펴봤다. HTMl 을 다루는 대신 자바스크립트를 사용해서 React 엘리먼트를 생성했다. 다음 코드에는 문제가 있는데 살펴보자

```js
render(){
  return React.createElement(
    'div',
    {style: this.styles},
    React.createElement(
      'p',
      null,
      React.createElement(
        reactRouter.Link,
        { to: this.props.returnTo},
        'Back'
      )
    ),
    this.props.childeren
  );
}
```

이 코드는 여기에 중첩된 엘리먼트가 3 개 있으며, React Router 의 컴포넌트를 사용하고 있다는 사실을 이야기 할수 있을까? 평범한 HTMl 과 비교했을 때 가독싱이 좋은가? React 팀도 React.creaeteaElment()를 계속해서 읽거나 작성하는 것이 즐겁지 않다는 점에 동의한다

이 부분을 JSX 가 해결해 준다.

## 3.1 JSX 의 정의와 장점

JSX 는 함수 호출과 객체 생성을 위한 문법적 편의를 제공하는 자바스크립트의 확장으로, 특히 React.createElemtne()호출을 반복해야 하는 불편을 해소한다. 템플릿 엔진이나 HTMl 처럼 보일 수도 있지만 그렇지 않다. JSX 는 React 엘리먼트를 생성하면서 자바스크립트의 모든 기능을 쓸 수 있도록 도와준다.

JSX 는 React 컴포넌트를 생성하는 좋은 방법이다.

- 개발자 경험(DX) 개선 : 표현력이 뛰어나 코드를 읽기 쉽다. XML 과 문법이 유사하여 중첩된 선언형 구조를 더 잘 나타낸다.
- 팀의 생산성 향상 : 전문 개발자 외에도 개발 지식이 있는 팀원이 있다면 직접 코드를 수정할 수도 있다. JSX 는 HTMl 과 비스샇여 이들에게도 친숙하다.
- 문법 오류와 코드량 감소 : 작성해야할 코드가 줄어들며, 이는 곧 실수나 반복으로 인한 스트레스를 줄여준다.

JSX 가 React 에 필수적이지는 않지만 React 에 잘 어울린다. React 를 만드는 제작자들도 사용을 매우 권장한다.

JSX 의 뛰어난 표현력을 보기위해 HelloWorld 예제를 바꿔보자

```js
<div>
  <HelloWorld />
  <br />
  <a href="http://webapplog.com"> Great JS Resource</a>
</div>
```

이렇게 쉬운코드가 자바스크립트로 작성하면

```js
React.createElement(
  "div",
  null,
  React.createElement(HelloWorld, null),
  React.createElement("br", null),
  React.createElement(
    "a",
    { href: "http://webapplog.com" },
    "Greate JS Resource"
  )
);
```

JSX 로 작성한 예제를 Babel 버전 6 을 사용해서 자바스크립트로 변환하면 다음과 같다.

```js
"use strict";

React.createElement(
  "div",
  null,
  "",
  React.createElement(HelloWorld, null),
  "",
  React.createElment("br", null),
  "",
  React.createElement(
    "a",
    { href: "http://webapplog.com" },
    "Greate JS Resource"
  ),
  ""
);
```

JSX 는 본질적으로 XML 과 문법이 비슷한 간단한 언어다. 그렇지만 JSX 는 사람들이 UI 컴포넌트를 작성하는 방법을 바꿔놓았다. 예전에는 개발자들이 HTMl 을 작성하고 MVC 처럼 컨트롤러와 뷰에 해당하는 자바스크립트 코드를 작성하면서 여러 파일들을 열어놓고 오락가락 하곤했다. 그 시절에는 UI 개발에 대한 관심사 분리가 여러 개의 파일을 작성하는 방식으로 이뤄졌다. 정적인 HTMl, 약간의 CSS, 자바스크립트 몇줄로 만든 반짝이는 글자로 구성된 웹서비스를 훌륭하게 제공했다.

이제 이런 방식은 찾아보기 어렵다. 요즘 우리가 개발하는 UI 는 상호작용이 많고, 자바스크립트와 HTMl 이 강하게 결합되어 여러 기능을 개발한다.
React 는 UI 와 자바스크립트 로직에 대한 설명을 한 곳으로 모아, 기존의 어긋난 관심사 분리를 고쳐 놓았다. JSX 를 사용하면 코드가 HTMl 처럼 보이므로 읽고 쓰기가 간편하다. 특별한 이유가 없다면 당연히 React 와 JSX 를 이용한 새로운 방식으로 UI 를 개발할 것이다.

JSX 는 여러가지 도구를 사용해서 표준 ECMAScript 로 컴파일 할 수 있다. 자바스크립트가 ECMAScript 라는 것을 이미 알고 있을것이다. 그러나 JSX 는 ECMAScript 명세의 일부가 아니므로 기존에 정의된 의미 체계가 없다.

```md
## Note

소스간 컴파일러는 트랜스컴파일러 또는 트랜스 파일러 라고도 하며, 한 가지 프로그래밍 언어로 작성된 프로그램의 소스코드를 가지고 다른 프로그래밍 언어로 된 동일한 소스코드를 생성하는 컴파일러를 말한다.
```

아마도 왜 JSX 때문에 골치가 아파야 하나?라고 궁금해할것인데 처음 JSX 를 접하면 직관적으로 받아들이기 힘든 모습이므로 많은 개발자가 이 대단한 기술을 포기하는 것은 놀라운 일이 아니다. 예를들어 JSX 는 자바스크립트 코드사이에 화살괄호가 있어 처음에는 이상하게 보인다.

`ReactDOM.render(<h1>Hello</h1>, document.getElementById('content'))`

이는 JSX 의 장점중 하나로, React.createElement(NAME, ...)로 함수 호출을 반복해서 작성하는 대신 <NAME/> 으로 작성해서 입력할 내용을 줄일 수 있다. 앞에서도 언급했지만 적게 작성할 수록 실수가 줄어든다.

**JSX 는 사용자 경험만큼이나 개발자 경험을 중요하게 여긴다.**

JSX 를 사용해야 하는 주된 이유는 대부분의 사람들이 React.createElement()가 많은 고드보다 화살괄호가 있는 코드를 더 편하게 읽기 때문이다. <NAME/>을 XML 이 아니라 같은 내용의 자바스크립트 코드라고 생각하는 습관을 들이면, JSX 문법이 주는 이상한 느낌을 극복할 수 있을 것이다. JSX 를 알고 사용하게 되면, React 컴포넌트를 시작으로 React 의 기반의 애플리케이션을 개발하는 과정에 있어 큰 이득을 얻을 수 있다.

```md
## Note

JSX 외에 코드를 줄일수 있는 방법

사실 JSX 외에도 React.createElement()호출 대신 사용할 수 있는 방법이 있다. 그중 하나는 React.DOM.\*를 사용하는 것이다. 예를 들어 React.createElement()로 h1 엘리먼트를 생성한다면 다음과 같다.

React.createElement('h1', null, 'Hey')

다음 코드는 위의 코드와 결과가 같으나 작성하는 시간을 줄일 수 있다.

React.DOM.h1(null, 'Hey')

React.DOM 객체에는 표준 HTML 요소에 대한 엘리먼트가 준비되어 있다. 다음처럼 객체에 어떤 요소가 있는지 확인해 볼 수도 있다.

console.log(React.DOM)

React.DOM 을 개발자 도구의 콘솔에 직접 입력해도 된다.(참고로 React.DOM 과 ReactDOM 은 전혀 다른 객체이므로 혼동하거나 바꾸어 사용하지 않기를 바란다.)

공식문서에서 추천하는 다른 방법은 JSx 를 사용할 수 없는 경우에 짧은 변수를 사용하는 것이다.(빌드 과정을 거칠 수 없는 경우를 예로 들 수 있다) 다음 예제처럼 변수 E 를 생성할 수 있다.

const E = React.createElement
E('h1', null, 'Hey')
```

앞에서도 이야기 했지만 JSX 를 사용하려면 브라우저에서 실행하기 전에 컴파일 또는 트랜스파일과정을 거쳐 일반적인 자바스크립트로 변환해야 한다. 여러가지 변환 방법과 그중 권장하는 방법은 3.3 절에서 보자.

## 3.2 JSX 의 이해

JSX 사용법을 본격적으로 살펴보자. 이 절의 내용을 읽고 참고하기 위해 책갈피를 꽂는것을 추천한다고한다(;;) 컴퓨터에서 예제코드를 살펴보는 것이 더 편하다면 다음과 같은 방법이 있다.

- 각자의 컴퓨터에 3.3 절의 설명을 참고하여 Babel 을 설치해서 JSX 변환을 할 수 있게 한다.
- 브라우저에서 JSX 를 자바스크립트로 변환할 수 있는 Babel REPL 서비스를 이용하낟.

먼저 JSX 의 주요 개념을 살펴보고, 컴퓨터에 Babel 을 실행 할 수 있는 개발 환경을 갖추는 것을 추천한다.

### 3.2.1 JSX 로 React 엘리먼트 생성하기

JSX 로 React 엘리먼트 객체를 생성하는 것은 간단하다. 예를 들어 다음 예제 코드처럼 자바스크립트를 작성하는 대신 JSX 를 작성할 수 있다. 다음중 name 은 'h1'처럼 HTMl 태그명을 담은 문자열이거나 HelloWorld 같은 컴포넌트 객체다.

```js
React.createElement(
  name,
  {key1: value1, key2: value2, ...},
  child1, child2, child3, ..., childN
)
```

이것을 JSX 로 옮기면 다음과 같다.

```js
<name key1=value1 key2=value2 ...>
  <child1 />
  <child2 />
  <child3 />
  ...
  <childN />
</name>
```

JSX 코드에서 key1 = value1 같은 속성과 값의 쌍은 createElement() 에 전달하는 두번째 인자와 동일하다. JSX 에서 속성을 다루는 방법은 3 장 뒷부분에서 좀 더 살펴볼 것이다. 일단은 속성이 없는 경우를 먼저 살펴보기로 한다. 다음은 우리의 오랜 친구인 HelloWorld 를 자바스크립트로 작성한 예제이다.

```js
ReactDOM.render(
  React.createElement("h1", null, "HelloWorld"),
  docuement.getElementById("content")
);
```

JSX 로 작성한 쪽이 훨씬 더 간단하다.

```js
ReactDOM.render(<h1>Hello world!</h1>, document.getElementById("content"));
```

JSX 문법으로 작성한 객체도 변수에 저장할 수 있다. JSX 는 React.createElement()를 문법적으로 개선한 것일 뿐이기 때문이다. 다음 코드에서는 React 엘리먼트 객체를 변수에 담는다.

```js
let helloWorldReactElement = <h1>Hello World</h1>;
ReactDOM.render(helloWorldReactElement, document.getElementById("content"));
```

### 3.2.2 React 컴포넌트에 JSX 사용하기

이전 예제에서 다룬 h1 JSX 태그는 표준 HTML 태그 이름이기도 하다. 컴포넌트를 다룰때도 같은 문법을 사용한다. 다른 점은 컴포넌트 클래스의 이름이 <HelloWorld /> 의 경우처럼 반드시 대문자로 시작한다는 점이다.

다음 코드는 JSX 로 다시 작성한 개선된 Hello World 이다. 여기서는 새롭게 생성한 컴포넌트로부터 엘리먼트를 생성하기 위해서 JSX 를 사용했다.

```js
class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <h1>1. HelloWorld</h1>
        <h1>2. HelloWorld</h1>
      </div>
    );
  }
}
ReactDOM.render(<HelloWolrd />, document.getElement("content"));
```

자바스크립트로만 작성한 다음 코드에 비해 위의 코드가 읽기 편한 것이 느껴지는가?

```js
class HelloWorld extends React.Component{
  render(){
    return React.createElement('div',
    null,
    React.createElement('h1', null, '1. Hello World!'))
    React.createElement('h1', null, '2. Hello World!'))
  }
}
ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('content')
)
```

```md
## Note

앞에서도 이야기 했지만, 경험이 있는 자바스크립트 개발자 입장에서는 자바스크립트 코드에서 화살괄호를 보는 것이 이상할 것이다. 오랜 기간 동안 자바스크립트 문법오류를 찾아내기 위해 스스로 수련해왔기 때문인데, 화살괄호는 JSX 에 관한 대표적인 논쟁거리이다. JSX 를 거부하는 이유중의 하나이다. 이런 이유로 이 책의 앞부분에서 일찍 JSX 를 다뤄서 가능한 더 많이 JSX 를 경험하게 해놓았다.
```

예제코드 위위의 예제코드에서 return 문에 소괄호를 사용한 것을 확인할 수 있다. return 문의 같은 행에 이후로 아무것도 적지 않는 경우에는 반드시 괄호를 넣어야한다. 예를 들어 최상위 엘리먼트인 div 를 새로운 행에 작성한다면 이를 감싸는 괄호를 사용해야 한다. 그렇지 않으면 자바스크립트는 return 을 마치고 아무것도 반환하지 않는다.

```js
render(){
  return(
    <div>
    </div>
  )
}
```

괄호를 작성하는 대신, 최상의 엘리먼트를 작성할 때 return 문과 같은 줄에서 시작해서 괄호를 생략할 수도 있다. 예를 들어 다음 예제 코드도 유효하다.

```js
render(){
  return <div>
    </div>
}
```

두 번째로 소개한 방법의 단점은 여는 div 태그가 눈에 잘 띄지 않는다는 점이다. 코드에서 놓칠 가능성이 있다. 선택은 각자의 몫이다. 이 책에서는 두가지 방식을 모두 소개하여 좀더 깊이있는 시각을 전달한다.

### 3.2.3 JSX 에서 변수 출력하기

컴포넌트를 작성할 때, 약간의 코드를 통해 자체적으로 뷰를 변경할 수 있는 영리한 컴포넌트를 만들고 싶을 수 있다. 예를 들어 현재 날짜/시간 컴포넌트에 하드 코딩된 값이 아닌 현재 날짜와 시간을 사용한다면 매우 유용할 것이다.

JSX 없이 React 를 사용할 때는 +를 이용해서 연결하거나, 만약 ES6+/ES2015+를 사용한다면 백틱(`)과 ${varName}로 표시한 문자열 템플릿을 사용할 수 있다. 여기서 varName 은 변수 이름이다.
명세에서는 이 기능의 공식적인 이름을 **템플릿 리터럴**이라고 한다. 예를 들어 일반적인 자바스크립트만으로 작성한 DateTimeNow 컴포넌트에서 속성을 텍스트로 사용하려면 다음과 같은 코드를 작성해야한다.

```js
class DateTimeNow extends React.Component {
  render() {
    let dateTimeNow = new Date().toLocaleString();
    return React.createElement(
      "span",
      null,
      `Current date and time is ${dateTimeNow}`
    );
  }
}
```

이와 다르게 JSX 에서는 중괄호({}) 표기법을 사용하여 변수를 동적으로 출력할 수 잇으므로 코드가 늘어나는 것을 상당히 줄일 수 있다.

```js
class DateTimeNow extends React.Component {
  render() {
    let dateTimeNow = new Date().toLocalString();
    return <span>Current date and time is {dateTimeNow}</span>;
  }
}
```

지역변수 뿐만 아니라 속성도 출력할 수 있다.

`<span>Hello {this.props.userName}, your current date and time is {dateTimeNow}.</span>`

그뿐만 아니라 자바스크립트 표현식이나 그 외 어떤 자바스크립트 코드라도 중괄호 안에서 실행시킬 수 있다.
예를 들어 다음 예제 코드처럼 날짜 형식을 적용할 수도 있다.

`<p>Current time in your locale is {new Date(Date.now()).toLocaleTimeString()}</p>`

이제 JSX 가 변수에 담는 동적 데이터를 사용해서 HelloWorld 클래스를 JSX 로 다시 작성할 수 있다.

```js
let helloWorldReactElement = <h1>Hello World</h1>
class HelloWorld extends React.Component{
  render(){
    return <div>
      {helloWorldReactElement}
      {helloWorldReactElement}
    </div>
  }
}
ReactDOM.render(
  <HelloWolrd/>
  document.getElementById('content')
)
```

### 3.2.4 JSX 에서 속성 사용하기

엘리먼트 속성을 정의할 때는 속성 문법을 사용한다. 즉, JSX 태그안에 key1=value1 key2=value2... 같은 표기법을 사용하여 HTML 속성과 React 컴포넌트 속성을 정의한다. 이것은 HTML/XML 의 속성 문법과 유사하다. 다시말해 JSX 에서 속성을 전달하는 방법은 일반 HTML 을 작성하는 방법과 같다. 또한, 엘리먼트 속성을 입력해서 표준 HTML 속성을 렌더링한다. 이 부분은 2.3 절에서도 살펴 보았다. 예를 들어 다음 예제 코드는 앵커 요소에 표준 HTML 속성 href 를 입력하는 경우이다.

```js
ReactDOM.render(
  <div>
    <a href="http://reactquickly.com">Time for React?</a>// 표준 HTML속성인 href를
    렌더링한다.
    <DateTimeNow userName="Azat" /> // userName 속성의 값을 설정한다.
  </div>,
  document.getElementById("content")
);
```

속성에 하드 코딩한 값을 사용하는 것은 유연하지 않다. 링크 컴포넌트를 재사용하려면 href 가 매번 다른 주소를 반영하도록 변경해야 한다. 이를 하드 코딩한 값이 아닌 동적으로 설정한 값이라고 부른다. 다음으로, 속성에 동적으로 생성한 값을 사용할 수 있는 컴포넌트에 대해 살펴보면 이 값은 컴포넌트 속성에서 가져올 수 있다. 이후로는 어려울 것이 없다. 화살괄호 안에 중괄호를 작성하여 속성에 동적으로 생성한 값을 엘리먼트에 전달하면 된다.

예를들어 사용자 계정에 연결할 때 사용할 컴포넌트를 만든다고 가정하자. href 와 title 은 사용자에 따라 달라져야 하므로 하드코딩할 필요가 없다. 동적 컴포넌트인 ProfileLink 는 a 태그에 href 와 title 을 렌더링하기 위해 각각 url 과 label 을 속성으로 사용한다. ProfileLink 에 중괄호를 사용하여 a 에 속성을 전달한다.

```js
class ProfileLink extends React.Component {
  render() {
    return (
      <a href={this.props.url} title={this.props.label} target="_blank">
        Profile
      </a>
    );
  }
}
```

속성 값은 어디서 전달한 것일까? 속성 값은 ProfileLink 생성시에 정의된다. 즉, ProfileLink 를 생성하는 부모 컴포넌트에서 이 값을 정의하는 것이다. 예를 들면 이 방법으로 ProfileLink 인스턴스 생성시에 url 과 label 값이 전달되어 그 결과 a 태그에 해당갑을 렌더링한다.

`<ProfileLink url="/user/azat" label='Profile for Azat"/>`

이전 장에서 살펴본것 처럼 React가 표준 HTML 요소 (h, p, div, a 태그등)를 렌더링 할때, HTML명세에 존재하는속성만 렌더링하고, 표준 속성이 아닌 이외의 속성은 제외한다는 점을 기억하고 있을 것이다. 이것은 JSX의 특성이 아니라 React의 동작 방식이다.

그러나 때로는 사용자 지정 데이터를 속성으로 추가해야 할 수도 있다. 목록 데이터가 있다고 가정해보자. 데이터 중에 앱에는 필수적이지만 사용자에게는 필요하지 않은 것도 있다. 이런 정보를 DOM요소에 속성으로 넣는 것은 흔히 사용하는 방식이다. 다음 예제 코드는 react-is-awesome과 id 속성을 사용하고 있다.

`<li react-is-awesome="true" id="320">React is awesome!</li>`

DOM의 HTML 비표준 속성에 데이터를 저장하는 것은 일반적으로 안티패턴으로 여겨진다. DOM을 데이터베이스나 프론트엔드 데이터 저장소로 사용하는 것이 적절하지 않기 때문이다. DOM에서 데이터를 가져오는 것은 메모리 상의 가상 저장소에서 데이터를 가져오는 것보다 느리다.

 JSX를 사용할 때 데이터를 반드시 HTML요소의 속성으로 저장해야 하는 경우에는 data-* 속성을 사용한다. 에를 들어 속성에서 li요소에 this.reactIsAwesome값을 렌더링하려면 다음과 같이 작성할 수 있다.

 `<li data-react-is-awesome={this.reactIsAwesome}>React is awesome!</li>`

 this.reactIsAwesome의 값이 true라면 HTML렌더링 결과는 다음과 같다.

 `<li data-react-is-awesome="ture">React is awesome!</li>`

그렇지만 앞서 2.3절에서 다룬 것처럼 표준 HTML 요소에 비표준 HTML 속성을 전달하면 해당 HTML 속성이 렌더링되지 않는다.

`<li data-react-is-awesome={this.reactIsAwesome}>React is orange!</li>`

`<li data-reactIsAwesome={this.reactIsAwesome}>React is orange!</li>`

두 경우 모두 결과는 같다.

`<li>React is orange</li>`

확실히, 사용자 지정 컴포넌트 클래스에는 내장 렌더러가 없고, 표준 HTML요소나 다른 사용자 지정 엘리먼트에 의존하므로 데이터를 다루기 위해 data-* 속성을 사용할 필요는 없다. this.props를 통해서 입력한 모든 속성에 접근할 수 있기 때문이다.

2.3절에서 살펴본 자바스크립트 HelloWorld 컴포넌트를 다시 한번 살펴보자.

```js
class HelloWorld extends React.Component{
  render(){
    return React.createElement(
      'h1',
      this.props,
      'Helllo ' + this.props.frameworkName + ' world!!'
    )
  }
}
```

HelloWorld 컴포넌트는 어떤 속성이든 h1으로 전달한다. JSX에서는 이것을 어떻게 구현할 수 있을까? 각 속성을 개별적으로 전달하면 코드가 더 많아진다. 또한, 속성을 변경해야 하는 경우에도 개선해야할 코드가 밀접하게 결합된다. 각 속성을 수동으로 전달해야 하는 경우를 상상해보자. 두 단계 또는 세 댄계의 컴포넌트를 거쳐 일일이 전달해야 한다면 어떨까? 그렇게 하는 것은 안티패턴이다. 다음과 같은 방법은 추천하지 않는다.

```js
class HelloWorld extends React.Component{
  render(){
    return <h1 title={this.props.title} id={this.props.id}>
    Hello {this.props.freameworkName} world!!
    </h1>
  }
}
```

모든 속성을 전다랳야 한다면, 개별 속성을 따로 전달하지 말자. JSX에서는 이에대한 해결책으로 생략부호 처럼 생긴 펼침 연산자를 사용할수 있다. 다음코드를 보자

```js
class HelloWolrd extends React.Component{
  render(){
    return <h1 {this.props}>Hello{this.props.frameworkName} world!!</h1>
  }
}

ReactDOM.render(
  <div>
    <HelloWorld
      id="ember"
      frameworkName="Ember.js"
      title="A framework for createing ambitious web applications." />
    <HelloWorld
      id="backbone"
      frameworkName="Backbone.js"
      title="A Backbone for createing ambitious web applications."/>
    <HelloWorld
      id="angular"
      frameworkName="Angular.js"
      title="A Angular for createing ambitious web applications."/>
  </div>,
  document.getElementById('content')
)
```

{...this.props}를 이용하면 모든 속성을 자식 엘리먼트로 전달할 수 있다. 이 외의 코드는 2.3절에서 살펴본 코드를 JSX로 옮긴것이다.

```md
## note

펼침 연산자는 간단히 말해 다음 위치에서 인자나 변수를 펼칠 수 있다.

- 함수호출: 예를 들면 push()메서드에서 arr1.push(...arr2)처럼 사용
- 배열 리터럴: 예를 들면 array2 = [...arr1, x, y, z]처럼 사용
- new 연산자를 이용하여 인스턴스 생성시 : var d = new Date(...dates)
```

