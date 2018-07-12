# 2 장 React 첫걸음

이 장은 React 를 다루는 기초적인 단계로, 뒤에 이어질 내용을 이해하기 위한 기초를 다진다.

React 의 엘리먼트나 컴포넌트 같은 개념을 이해하는 것이 중요하다. 간단히 말해 엘리먼트는 컴포넌트의 인스턴스이며, 컴포넌트 클래스 라고도 한다.

## 2.1 엘리먼트 중첩

```js
let linkReactElement = React.createElement(
  "a",
  { href: "http://webapplog.com" },
  "Webapplog.com"
);
```

문제는 대부분의 UI 가 여러개의 HTML 요소로 이루어져 있다는 점이다. 메뉴 내부에 링크가 있는 것처럼 말이다. 예를 들어 한영역 안에 버튼 여러개, 비디오 썸네일, 유투브 플레이어가 있다.
계층적 방시긍로 더 복잡한 구조를 만드는 방법은 엘리먼트를 중첩하는 것이다.

**ReactDOm.render()에는 하나의 React 엘리먼트만 인자로 전달할 수 있다.**

동일한 DOM 계층에 h1 요소 두개를 렌더링해야하는 경우에 문제가 발생하는데 영향을 끼치지 않는 요소로 두 요소를 감싸는 방법이 있다. div 혹은 span 을 사용하는 것이 일반적인 좋은 선택이다.

createElement()에 전달하는 매개 변수의 수는 제한이 없다. 두 번째 매개변수 이후의 모든 매개변수는 자식 엘리먼트가 된다.

```md
## Note

React 개발자 도구

랜더링 결과를 자세히 살펴볼 수 있고 컴포넌트 계층 구조, 이름, 속성, 상태도 확인할 수 있다.
```

createElement()를 사용해서 div 와 자식 엘리먼트 h1 두개를 생성해 보자.

```js
let h1 = React.createElement("h1", null, "Hello world!"); // createElement()의 세번째 매개 변수가 문자열이면, 이는 생성하는 엘리먼트의 텍스트 값이다.
ReactDOM.render(
  React.createElement("div", null, h1, h1), // 세번재 또는 그 이후의 매개변수가 문자열이 아니라면, 이는 새로 생성하는 엘리먼트의 자식 엘리먼트다.
  document.getElementById("content")
);
```

지금까지는 createElement()의 첫 번째 매개변수로 문자열만 입력했다. 사실 첫 번째 매개 변수로 두가지 자료형을 입력할 수 있다.

- 문자열로 작성한 일반적인 HTML 태그. 예를 들면, h1, div, p 처럼 화살괄호가 없는 문자열이다. 이름은 소문자로 작성한다.
- React 컴포넌트 클랙스 객체. HelloWorld 를 예로 들 수 있다. React 컴포넌트 클래스의 이름은 대문자로 시작한다.

첫번째 방법은 표준 HTML 요소를 렌더링 하는 것이다. React 는 표준 HTML 요소를 탐색해서 일치하는 것이 있으면 해당 React 엘리먼트의 유형으로 사용한다. 예를 들어 'p' 를 남겼다면 p 는 문단 태그이므로 이에 일치하는 것을 찾을 수 있다. 이렇게 해서 React 엘리먼트를 렌더링하면 DOM 에 p 가 생성된다.

createElement()의 첫 번째 매개변수로 문자열 외에도 사용자 정의 컴포넌트 클래스도 사용할 수 있다. 사용자 정의 컴포넌트 클래스의 생성과 전달 방법에 대해서 알아보자.

## 2.2 React 컴포넌트 클래스 생성

React 엘리먼트를 중첩하고 나면, 곧 입력할 엘리먼트가 굉장히 많다는, 다음 문제에 봉착하게 된다. 1 장에서 설명한 것처럼 컴포넌트 아키텍처를 활용해야 한다. 컴포넌트 클래스를 이용하면 기능을 느슨하게 결합된 부분으로 분리하여 코드를 재사용할 수 있다. 컴포넌트 클래스는 **컴포넌트** 라고 부르기도 한다.(웹 컴포넌트랑은 다르다.)

표준 HTMl 태그를 블록이라고 생각해보자. React 컴포넌트 클래스를 구성하는데, 이 블록들을 사용해서 클래스의 인스턴스인 사용자 정의 엘리먼트를 생성할 수 있다. 사용자 정의 엘리먼트를 이용하면 이식 가능한 클래스(구성할수 있고, 재사용할 수 있는 컴포넌트)에 논리를 추상화하고 캡슐화 할수 있다. 이런 추상화는 여러 팀이 거대하고 복잡한 애플리케이션에 UI 를 재사용하는 것은 물론이고, 다른 프로젝트에서도 재사용할 수 있게 해준다. 자동완성 컴포넌트, 도구상자, 메뉴 등을 예로 들 수 있다.

createElement('h1', null, 'Hello World!') 메서드를 사용해서 'Hello World!'를 HTML 에 담아 렌더링하는 것은 어렵지 않았다. 그렇다면 HelloWorld 를 별도의 클래스로 분리하려면 어덯게 해야될까? 서로 다른 프로젝트 열개에 HelloWorld 를 사용해야 한다고 가정해 보자!

흥미롭게도 ES6 문법을 이용하면 React.Component 클래스를 상속받아서 React 컴포넌트 클래스를 생성할 수 있다. class CHILD extends PARENT 같은 형식으로 작성한다. HelloWorld 컴포넌트를 생성하는 경우에는

`class HelloWorld extends React.Component` 라고 작성한다.

새로운 컴포넌트 클래스를 구현할 때는 render()메서드를 반드시 작성해야 한다. 이 메서드는 다른 사용자 정의 컴포넌트 클래스나 HTML 태그로 만든 React 엘리먼트를 반환해야 한다. 엘리먼트를 중첩하는 것도 가능하다.

예제코드 2.3 은 중첩된 HelloWorld 예제를 어떻게 하면 HelloWorld 컴포넌트로 리팩토링 할 수 있는지를 보여준다. 사용자 정의 클래스를 사용하면 UI 재사용을 더 잘 할 수 있다. HelloWorld 사용자 정의 클래스를 생성한 후 ReactDom.render()에 문자열이 아닌 사용자 정의 클래스 객체를 전달할 수 있다.

```js
예제코드 2.3

let h1 = React.createElement('h1', null, 'HelloWolrd!')
class HelloWorld extends React.Component{ // React 컴포넌트 클래스 정의 (이름은 대문자로 시작)
  render(){ // 엘리먼트 하나를 반환하는 함수인 render()메서드를 생성한다.
    return React.crateElement('div', null, h1, h1)// return 문에는 React엘리먼트를 반환하도록 구현하여 React클래스가 render()를 실행하면 두개의 <h1/>엘리먼트를 감싼 <div/>엘리먼트를 받을 수 잇따.
  }
}

ReactDom.render( // React 엘리먼트를 ID가 content인 실제 DOM에 넣어준다.
 React.crateElement(HelloWold, null), // 첫번째 인자로 HelloWorld 클래스를 전달하여 엘리먼트를 생성한다. 이때 HelloWorld클래스는 문자열이 아닌 객체다.
 document.getElementbyd('content')
)
```

규칙에 따라 React 컴포넌트를 담는 변수의 이름은 대문자로 시작한다. JSX 없이 자바스크립트만 사용하는 경우에는 이런규칙을 따르지 않아도 되지만 JSX 를 사용할 경우에는 이 규칙을 따라야 하므로 여기서 부터 이 규칙을 적용할 것을 추천한다. (JSX 에서 React 는 일반 h1 같은 HTML 요소와 <HelloWolrd //> 같은 사용자 정의 컴포넌트를 대소문자로 구분한다. 반면에, 자바스크립트만 사용하는 경우에는 h1 이나 HelloWorld 처럼 전달하는 변수에 따라 구분한다. 지금부터 사용자 정의 컴포넌트 이름을 지을때 대문자 규칙을 따르는 것은 좋은 생각이다.)

```md
## note

ES6+/ ES2015+와 React

위에서 살펴본 컴포넌트 클래스 예제는 render()메서드를 ES6 문법으로 정의한다. 콜론(:)과 function 키워드를 입력하지 않았다. 이것은 함수를 값으로 하는 속성(키 또는 객체 프로퍼티)을 선언하는 것과 동일하다. 즉 render:function()을 작성하는 것과 같다. ES6 의 메서드 작성법을 사용하는 것은 내가 선호하기도 하고, 추천하고 싶은 방법이기도 하다. 이 방법이 코드가 더 짧고, 짧게 작성할수록 실수할 가능성이 줄어든다.

예전에는 React 에 컴포넌트 클래스를 생성하기 위해 사용하는 React.createClass()라는 자체 메서드가 있었다. React.createClass()를 사용하는 것과 ES6 클래스를 사용해서 React.Component 를 상속받는 것에는 약간의 차이가 있다. 일반적으로 둘중에 한가지 방법을 택하는 것도 좋고, 둘을 동시에 사용하는 것은 추천되지 않는다. React 버전 15.5.4 이후부터 createClass()메서드는 지원종료가 되었다.

여전히 createClass() 를 사용하는 팀도 있겠지만, 대체로 ES6 클래스를 사용하는 방법이 일반적인 표준이다. 이책은 향후 흐름에 맞게 가장 많이 사용하는 도구와 방법을 소개하고자 하므로 ES6 에 중점을 둘것이다.
```

ReactDom.render()와 유사하게 컴포넌트 클래스의 render()메서드는 엘리먼트 하나만 반화한다.
여러개의 동일 계층 엘리먼트를 반환하려면 div 나 span 요소처럼 스타일에 영향을 주지않는 엘리먼트로 감싸야 한다.

아마도 리팩토링으로 얻은 것이 많지 않다고 생각할 수도 있다. 그렇지만 만약 HelloWorld 를 여러번 노출해야 한다면 어떨까? HelloWorld 컴포넌트를 여러번 재사용하고 div 컨테이너로 감싸며 ㄴ이문제를 해결 할 수 있다.

```js
ReactDOM.render(
  React.createElement(
    "div",
    null,
    React.createElement(HelloWorld),
    "div",
    null,
    React.createElement(HelloWorld),
    "div",
    null,
    React.createElement(HelloWorld)
  ),
  document.getElementById("content")
);
```

이것이 컴포넌트 재사용성의 힘이다! 개발 속도를 높여주고 버그도 줄일 수 있다. 컴포넌트가 재공하는 라이프 사이클 이벤트, 상태 DOM 이벤트 등 여러가지 기능을 활용하면 독립적이면서도 애플리케이션의 다른 영역과 함께 잘 동작하는 컴포넌트를 만들 수 있다. 이에대해서는 뒤에서 더 자세히 설명하겠다. HelloWorld 엘리먼트가 모두 똑같은 것이 다소 아쉽다. 속성을 입력해서 내용이나 동작을 변경할 수 있다면 어떨까? 다음은 속성이다.

## 2.3 React 속성 사용하기

React 컴포넌트의 속성(properties)은 React 선언형 스타일의 기초라고 할 수 있다. 속성은 엘리먼트 내의 변경할 수 없는 값이라고 생각하자. 속성을 통해 React 엘리먼트가 다양한 모습을 가질수 있다.

다음 코드 처럼 속성에 새로운 값을 전달해서 링크 URL 을 변경할 수 있다.

`React.createElemtent('a', {href: 'http://node.university'})`

**속성은 컴포넌트 내부에서는 변경할 수 없는 값이라는 점을 기억** 하자. 부모 컴포넌트는 자식의 생성시점에 속성을 할당한다. 자식 엘리먼트에서는 속성을 수정하지 않아야 한다.(여기서 말하는 자식 엘리먼트는 다른 엘리먼트의 안에 중첩된 엘리먼트를 말한다. 앞서 살펴본 HelloWorld 의 h1 같은 경우다.) 예를 등어 다음 코드처럼 속성명(property_name)에 값(value)을 입력하는 방식으로 속성을 전달할 수 있다.

`<TAG_NAME PROPERTY_NAME=VALUE/>`

React 의 속성은 HTMl 속성을 작성하는 것과 비슷하다. React 속성을 작성하는 목적은 HTML 속성을 작성하는 것도 있지만, 다른 목적도 있다. 엘리먼트의 속성을 코드에서 원하는 대로 사용하는 것도 가능하다. 속성은 다음과 같은 용도로 쓸 수 있다.

- 일반적인 HTML 요소의 속성 : href, title, style, class 등
- React 컴포넌트의 클래스의 자바스크립트 코드에서 this.props 의 값. 예를 들어 this.props.PROPERTY_NAME(PROPERTY_NAME 을 임의의 값으로 정할 수 있음)

내부적으로 React 는 속성 이름 을 HTML 표준 속성과 대조한다. 대조한 결과에 따라, 첫 번째 경우로, 일치하는 HTML 속성이 있으면 해당 엘리먼트의 HTML 속성으로 사용한다. 입력한 속성의 이름이 PROPERTY_NAME 이라면 컴포넌트 클래스 코드에서는 this.props.PROPERTY_NAME 으로 접근할 수도 있다.

두번째 경우로, 표준 HTML 속성명과 일치하지 않는다면 속성명이 표준 속성이 아닌 것이다. 이때는 HTML 에 렌더링 하지 않는다. 그렇지만 이 값은 this.props 객체에서 this.props.PROPERTY_NAME 같은 방식으로 접근 할 수 있다. render() 메서드에서 입력하여 렌더링하거나 코드에서 활용할 수 있다. 이 방법을 이용하면 같은 클래스의 서로다른 인스턴스에 각각 다른 데이터를 넘겨줄 수 있다. 이렇게 컴포넌트를 재사용할 수 있는데, 엘리먼트마다 다른 속성을 제공해서 서로 다르게 렌더링하도록 프로그래밍 방식으로 변경할 수 있기 때문이다.

```md
## note

Object.freeze()와 Object.isFrozen()

내부적으로 React 는 ES5 표준인 Object.freeze()를 사용하여 this.props 객체를 불변 객체로 만든다. 객체에 Objtect.freeze()가 적용되었는지 확인하려면 Object.isFrozen()메서드를 사용할 수 있다. 예를 들면 다음 문장을 실행했을 때 true 를 확인할 수 있을지 생각해보자.

class HelloWorld extends React.Component{
render(){
console.log(Object.isFrozen(this.props))
return React.createElement('div', null, h1, h1)
}
}
이에 대해 더 자세히 알고 싶으면 React 의 변경 사항이나 깃헙 저장소 살펴보기
```

속성의 기능을 활용해서 속성갑에 따라 렌더링하는 엘리먼트를 아예 다른 모습으로 바꿀수도 있다. 예를 들면 다음 예제처럼 this.props.heading 이 true 이면 Hello 를 H1 으로 렌더링 하고 false 이면 문단으로 렌더링할수 있다

```js
render(){
  if(this.props.heading)return <h1>Hello</h1>
  else return <p>Hello</p>
}
```

다시 정리하면 같은 컴포넌트에 다른 속성값을 입력하면 컴포넌트가 렌더링한 엘리먼트의 모습을 다르게 할 수 있다는 점이다. 속성은 render()메서드를 통해 렌더링할 수 있고, 컴포넌트 클래스의 코드에서 사용할 수 있으며, HTMl 속성으로도 사용할 수 있다.

컴포넌트의 속성을 이해하기 위해서 HelloWorld 컴포넌트에 속성을 약간 변경해 보자. 목표는 HelloWorld 컴포넌트를 재사용해서 각 인스턴스가 서로 다른 텍스트와 HTml 속성을 갖도록 하는 것이다.
HelloWorld 제목인 h1 태그에 다음처럼 세가지 속성을 추가할 것이다.

- id: HTMl 표준 속성 Id 와 일치하고, React 가 자동으로 렌더링 한다.
- frameworkName: h1 의 표준 속성이 아니지만, 제목 텍스트로 표시할 때 사용하는 값이다.
- title: HTML 표준 속성인 title 과 일치하고, React 가 자동으로 렌더링 한다.

React 는 속성명이 표준 HTML 속성과 일치함녀 h1 요소의 속성으로 렌더링한다. id 와 title 은 h1 요소의 속성으로 렌더링하고 frameworkName 은 렌더링하지 않는다. frameworkName 이 표준 속성이 아니므로 경고메시지도 확인할 수 있다.

div 엘리먼트의 구현을 자세히 살펴보면 분명히 HelloWorld 클래스의 자식 엘리먼트 세개를 렌더링해야 하지만, 실제 h1 텍스트와 속성은 각각 달라야 한다. 예를 들면 id, frameworkName, title 을 전달하는데 이 셋이 HelloWorld 클래스의 일부가 된다.

### NOTE

> DOM 요소에 표준이 아닌 속성을 적용하려면 소문자로만 작성하라와 함게 부모 컴포넌트에 작성해야 하는 속성을 실수로 작성했다면 제거하라

h1 을 구현하기 전에 HelloWorld 클래스의 속성을 전달해야 한다. div 컨테이너 내부에 HelloWorld 엘리먼트를 생성한는 시점에 createElement()의 두번째 인자로 객체 리터럴로 속성을 작성하여 넘겨준다.

예제코드 2.4 에서 HelloWorld 컴포넌트의 구현을 살펴보자. 컴포넌트의 render() 메서드 내에서 this.props 객체에 접근하면 createElement()의 두번째 매개변수로 전달한 객체에 접근할 수 있다. 예를 들면 {id: 'ember'...}와 같은 객체다. 다음 코드처럼 frameworkName 으로 넘긴 값에 접근할 수 있다.

```js
class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      "h1",
      null,
      "Hello" + this.props.frameworkName + "Wolrd!"
    );
  }
}
```

this.props 객체의 키는 crateElement()의 두번째 매개변수로 전달한 객체의 키와 같다. this.props 의 키로 id, frameworkName, title 을 확인할 수 있다. React.createElement()의 두 번째 인자로 전달하는 키-값 쌍의 수는 제한이 없다.
덧붙여서 이미 눈치챘겠지만 HelloWorld 컴포넌트의 모든 속성은 자식 엘리먼트인 h1 에 넘겨 주는 것도 가능하다. 컴포넌트에 어떤 속성이 전달되는 지 확실하지 않을 때 매우 유용한 방법이다. 예를 들면 HelloWolrd 컴포넌트로 인스턴스를 생성하는 개발자가 스타일 속성을 직접 입력할 수 있도록 해야하는 경우가 있다. 따라서 h1 에 렌더링할 HTML 속성에 제한을 두지 않는것이다.

```js
class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      "h1",
      this.props, // 모든 속성을 자식 엘리먼트에 전달한다.
      "Hello" + this.props.frameworkName + "Wolrd!"
    );
  }
}
```

세가지 HelloWorld 엘리먼트를 컨테이너 div 에 렌더링한다.

```js
class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      "h1",
      this.props, // HelloWolrd 컴포넌트로 전달한 모든 속성을 createElement를 호출할 때 h1엘리먼트로 전달한다.
      "Hello" + this.props.frameworkName + "Wolrd!" // frameworkName속성은 h1의 텍스트로 노출된다.
    );
  }
}
ReactDOM.render(
  React.createElement(
    "div",
    null,
    React.createElement(HelloWorld, {
      id: "ember",
      frameworkName: "Ember.js",
      title: "A framework for createing ambitious web applications"
    }),
    React.createElement(HelloWorld, {
      id: "backbone",
      frameworkName: "Backbone.js",
      title: "A Backbone.js gives structure to web applications..."
    }),
    React.createElement(HelloWorld, {
      id: "angular",
      frameworkName: "Angular.js",
      title: "Superheroci JavaScirpt MVW Framework"
    })
  ),
  document.getElementById("content")
);
```

1 장과 마찬가지로로컬 환경에서 개발 서버를 실행한 후 코드를 실행해보자. 서로다른 h1 요소를 세번 렌더링하기 위해 HelloWorld 컴포넌트 클래스를 재사용한 결과다. 각각 제목에 서로다른 텍스트를 표시하도록 this.props 를 사용했다. 또한, 서로 다른 title 과 id 를 속성으로 넘겨주어 렌더링하도록 했다. 대부분의 코드를 효과적으로 재사용했고, HelloWorld 컴포넌트 클래스를 성공적으로 사용했다고 할 수 있다.

2 장에서는 여러가지 방식의 HelloWolrd 앱을 다뤘다. 그렇다고는 해도 여전히 지루하고 뻔해 보이는 것이 사실이다. 시작은 미미하지만, 장차 더 어려운 주제를 다루기 위해 기초를 다지는 과정이라고 생각하다. 컴포넌트 클래스를 이용하면 훨씬 더 대단한 것도 만들어 낼수 있다.

다음장에서 살펴볼 JSX 를 사용하려면 React 코드를 일반적인 자바스크립트로 작성하는 방법도 알아둬야 한다. 결과적으로 브라우저가 실행하는 것은 일반적인 자바스크립트이므로 JSW 를 자바스크립트로 변환하면 어떤 코드가 생성되는지 알고 있다면 가끔 도움이 될 수도 있다.

## 2.4 퀴즈

1.  class NAME extends React.Component 를 통해 React 컴포넌트 클래스를 만든다.
2.  React 컴포넌트 클래스를 구현할 때 render 는 필수다
3.  컴포넌트 속성중 url 이 있다면 접근할때 this.props.url 을 통해 접근해야한다.
4.  React 의 속성은 해당 컴포넌트의 문맥에서 변경할 수 없다.
5.  React 컴포넌트 클래스를 사용하면 재사용 가능한 UI 를 생성할 수 있다.

## 2.5 요약

- React 엘리먼트를 중첩하여 자식 엘리먼트로 추가하려면 createElement()의 세번재 인자로 계속해서 전달하면 된다.
- React 엘리먼트를 생성할 때 사용자 정으 ㅣ컴포넌트 클래스를 사용한다.
- 속성을 사용하여 React 엘리먼트의 속성을 전달할 수도 있다.
- 부모 컴포넌트는 자식 엘리먼트에 속성을 전달할 수도 있다.
- React 컴포넌트를 통해 컴포넌트 기반 아키텍처를 구현할 수 있다.
