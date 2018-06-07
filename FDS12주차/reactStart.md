# React

## 수업들어가기전 중간 프로젝트 리뷰

### Pure DOM API 썻을때의 문제점

- 길다
- 코드를 읽기가 힘들다
- HTML 은 '무엇을' 하고 싶은지가 명확히 눈에 보인다. 반면 DOM API 로 짜여진 코드를 보면 '어떻게' 하고 싶은지만 적혀있기 때문에, 무엇을 하고 싶은지가 한눈에 들어오지 않는다.

- 템플릿이 많은 것 => 템플릿이 한 파일에 다 모여있는 것 (indee.html)=> 여러 파일에 나누어서 작성할 수 있으면 좋겠다.
- 템플릿만 보면 뭘 하겠다는 것인지 보이지 않는다.(템플릿 + JS 코드를 한꺼번에 봐야 정확히 의도가 보인다.)
- 역할과 책임(Role & Responsibility)이 하나도 분리되어있지 않다
- '페이지를 그리는 함수'에 통신, 템플릿 로딩, 템플릿과 데이터를 합치기, DOM 트리에 병합하는 코드가 전부 들어있었다.
- 페이지의 일부분이 변경되더라도, 우리의 프레임 워크 아래에서는 전체를 다시 로딩할 수 밖에 없었다.
- 코딩을 하기에는 쉬웠다. (데이터베이스가 변경될때마다 페이지 전체를 매번 다시 그려주었기 때문에)

## React quick start

### Hello react!

```js
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));
```

## JSX 소개

JSX 를 react 와 함께 사용하면, UI 가 실제로 어덯게 보일지 서술할 수 있다. JSX 는 템플릿 언어처럼 보일수 있지만 (ejs 랑 완전다름, 템플릿 언어랑도 다름) 다르다.

### 왜 JSX 인가

렌더링 로직이 다른 UI 로직과 본질적으로 결합되어있다는 사실을 인정한다. 즉 이벤트의 처리과정, 시간에 따른 상태 변화 표시할 데이터가 어디로부터 오는지가 렌더링 로직과 결합되어있다. (이방법이 좋지 않다는 언어들도 간혹있음) react 는 별도의 파일에 마크업과 로직을 넣어서 기술을 인위적으로 분리하는 대신, 둘다 포함하는 "컴포넌트"라고 부르는 단위를 이용해 관심사를 분리한다. 이후 섹션에서 다시 컴포넌트로 돌아오겠지만 JS 에 마크업을 넣는게 익숙해지지 않는다면 이 이야기가 확신을 줄것이다.

### JSX 에 표현식 담기

컴파이링 끝나면, JSX 표현식이 일반적인 자바스크립트 함수 호출이 되고, 결과적으로 자바스크립트 객체로 평가된다
이말은 즉 if 문이나 for 문 내에서 JSX 를 사용할 수 있으며, 변수에 할당하거나 매개 별수로 전달하거나 함수에서 반환 할 수 있음을 의미한다.

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

```js
const element = <h1>Hello, {formatName(user)}!</h1>;
```

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX 어트리뷰트 정의

attribute 에서 따옴표를 사용해서 문자열 리터럴을 정의할 수 있다

`const element = <div tabIndex="0"></div>`

attribute 에서 중괄호를 사용하면, 자바스크립트 표현식을 포함시킬 수 있다.

`const element = <img src = {user.avatarUrl}></img>;`

어트리뷰트에 자바스크립트 표현식을 포함시킬 때 중괄호를 따옴표로 묶으면 안된다. 따옴표 또는 중괄호 중 하나를 사용해야하며, 하나의 어트리뷰트에 둘다 사용할 수 있는 것은 아니다.

> ### 다넣을 수 있다. 심지어객체다!!

jsx 는 다 camelCase 를 쓴다 다 js 로 바뀌어야 되기 때문에

### JSX 자식 정의

만약 태그가 비어있다면, XML 처럼 /> 를 이용해 닫아주어야 한다.

`const element = <img src={user.avatarUrl}/>`

JSX 태그는 자식을 가질 수 있다.

```js
const element = (
  <div>
    <h1>hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX 인젝션 공격 예방

사용자가 입력한 내용을 JSX 내에 포함시켜도 안전하다.

```js
const title = response.potentiallMaliciousInput;
// This is safe
const element = <h1>{title}</h1>;
```

기본적으로, React DOM 은 랜더링 되기전에 JSX 내에 포함된 모든 값을 이스케이프 한다. 따라서 어플리케이션에 명시적으로 작성되지 않은 내용은 절대 삽입할 수 없다 모든 것은 렌더링 되기전에 문자열로 변화된다. 이렇게 하면 XSS 를 막을수 있다.

### JSX 객체 표현

> tag ㅡ쓰는 거 다 객체다
> 표현식 아무거나 넣을 수 있다
> class 이름 별도의 attribute 를 사용하는 것이다.

```js
const element = <h1 className="greeting">Hello, World!</h1>;
```

React.createElemtent() 는 버그 없는 코드를 작성하는데 도움을 주는 몇가지 체크를 하지만, 기본적으로 아래와 같은 객체를 생성한다.

```js
// Note: this structure is simplified
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world"
  }
};
```

이 객체를 "React 요소" 라고 부른다. 화면에서 보고자 하는 내용에 대한 설명 내지 서술로 생각할 수 있다. React 는 이객체를 읽어들이고 이를 사용하여 DOM 을 만들어낸 뒤 최신 상태로 유지한다.

## 요소(element) 렌더링

> 강사님왈: 내 개발인생은 react 전과 후로 나뉜다.

`const element = <h1>Hello, world</h1>;`

브라우저 DOM 요소와 다르게 React 요소는 순수한 객체이며 생성비용이 저렴하다.
(ex `Const imgEl = document.getElementId(img)`애는 src 는 이미지 다운로드 하기 등등 여러가지 기능들을 가지고 있다. 하지만 react 객체는 아무것도 없다)

> element 는 component 를 만들어 내는 구성성분이다.

### DOM 에서 element 렌더링하기

react DOM 에의 해 관리되는 모든 것이 이 요소 안에 들어가므로, 이걸 루트 DOM 노드라고 부른다.
보통 react 로 구축한 어플리케이션은 root 하나만 둔다.

React 요소를 루트 DOM 노드에 렌더링하고 싶다면 ReactDOM.render()에 둘다 넘겨주면된다.

### React 는 필요한 부분만 렌더링함

![렌더링](http://reactjs-org-ko.netlify.com/granular-dom-updates-c158617ed7cc0eac8f58330e49e48224.gif)

매 깜빡임마다 전체 UI 트리를 서술하는 요소를 만들었지만 내용이 변경된 텍스트 노드만이 React DOM 에 의해서 업데이트 된다. 우리의 경험상, '시간 경과에 따라 UI 를 어떻게 변경할지'지를 생각하는 것이 아니라 '특정 순간에 UI 가 어떻게 보여져야 할지'에 대해 생각하면, 수많은 종류의 버그를 없앨 수 있다.

## 컴포넌트와 props

컴포넌트를 통해 UI 를 독립적이고 재사용 가능한 부분으로 분리하고, 각 부분을 독립적으로 생각할 수 있다.

개념상 컴포넌트는 자바스크립트의 함수와 비슷하다. "props"라는 임의의 입력을 받아들이고, 화면에 무엇이 표시되어야 하는지를 서술하는 React 요소를 반환한다.

### 함수형 및 클래스 컴포넌트

컴포넌트를 정의하는 가장 간단한 방법은 자바스크립트 함수를 작성하는 것이다.

```js
function welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

이 함수는 유효한 React 컴포넌트로, "props" 객체 인수를 받고 React element 를 반환한다. 이러한 컴포넌트는 말 그대로 js 함수이기 때문에 `함수형 컴포넌트`라고 부른다.

컴포넌트를 정의하기 위해서는 ES6 class 를 사용할 수도 있다.

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

위의 두 컴포넌트는 React 관점에서 봤을 때 동일한 기능을 한다. 클래스는 몇가지 기능을 더 가지고 있다.

### 컴포넌트 렌더링

이전에는 DOM 태그를 나타내는 React 요소만 있었다.

`const element = <div />;`

그러나, 요소는 사용자 정의 컴포넌트를 나타낼 수도 있다.

`const element = <Welcome name="Sara" />;`

React 가 사용자 정의 컴포넌트를 나타내는 요소를 처리할 때는, JSX attribute 를 하나의 객체를 통해 컴포넌트로 전달한다. 이 객체를 "props"라고 부른다.

예를 들어 이 코드는 "Hello, Sara"를 페이지에 렌더링한다.

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById("root"));
```

1.  ReactDOM.rebder 를 통해 Welcome element 가 root id 를 가진 친구를 불러와서 name="Sara" element 를 호출함
2.  Welcome 컴포넌트가 Hello Sara 를 반환
3.  ReactDOM 이 반환값과 일치하도록 DOM 을 효율적으로 업데이트함

jsx 에서 태그이름이 소문자로 시작하면 html 로 생각하여 뿌려줌 그렇기에
컴포넌트를 만들 때는 무조건 대문자로 써야된다

### 컴포넌트 조립하기

컴포넌트의 출력에서 다른 컴포넌트로 가져와 사용할 수 있다. 이를 통해 모든 세부 레벨에서 동일한 컴포넌트 추상화를 사용할 수 있다. React 앱에서 버튼, 폼, 다이얼로그, 스크린 같은 것들은 모두 일반적으로 컴포넌트로 표현된다.

일반적으로, 새롭게 작성되는 React 앱은 단일 App 컴포넌트를 최상위에 둔다. 그러나 기존 앱에 React 를 도입하는 경우, Button 같은 작은 컴포넌트부터 덩치를 키워나가기 시작하여 점차적으로 뷰 계층의 최상단으로 나아갈 수 있다.

### 컴포넌트 추출

컴포넌트를 더 작은 컴포넌트로 쪼개는 것을 두려워하지 말기!

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

이 컴포넌트는 중첩 때문에 변경하기 까다로울 수 있으며, 다시 사용하기도 어렵다.

1.  Avatar 를 추출한다.

```js
function Avatar(props){
  return {
    <img className="Avatar"
    src={props.user.avatarUrl}
    alt={props.user.name}
    />
  }
}
```

Avatar 는 자기가 Comment 내에서 렌더링되는지를 알고 있을 필요가 없다. 따라서 author 대신에 user 라는 이름이 낫다.

속성 이름 지을 때, 컴포넌트가 사용되는 상황이 아닌 컴포넌트 그 자체만 생각하는 것이 좋다.

2.  이제 Comment 를 약간 단순화 시킬 수 있다.

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{porps.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

### Props 는 읽기 전용

모든 React 컴포넌트는 props 에 대해서는 **순수 함수** 처럼 동작해야 한다.

어플리케이션 UI 는 동적이며 시간이 지남에 따라 변한다. 다음 섹션에서는 새로운 컨셉인 state 를 소개한다. state 는 react 컴포넌트가 이 규칙을 어기지 않고 유저액션, 네트워크 응답, 기타 등등에 대한 응답으로 시간 경과에 따라 출력을 변경할 수 있게 한다.

> 함수형 컴포넌트는 프록스를 받아서 리액트 앨리먼트를 반환해 주는것이다.
>
> 클래스 객체를 만들어내기위한 틀이고 속성을 지정해줄수 있었다.

## State 와 라이프 사이클

```js
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById("root"));
}

setInterval(tick, 1000);
```

Clock 이 타이머를 설정하고 매 초 UI 를 업데이트 하는 것은 Clock 의 구현 세부사항 이어야 한다.
이상적으로는 위의 세부사항을 한번만 작성하고, Clock 이 스스로 업데이트 하게 만드는 것이 좋다.

```js
ReactDOM.render(<Clock />, document.getElementById("root"));
```

이를 구현하기 위해, Clock 컴포넌트에 "state"를 추가할 필요가 있다.

State 는 props 와 비슷하지만 바깥으로 공개되지 않으며, 컴포넌트에 의해 완전히 제어된다.

클래스로 정의한 컴포넌트에는 몇가지 추가기능이 있다. 지역적인 State 가 바로 그 기능중 하나로 클레스에서만 사용가능하다.

### 함수를 클래스로 변환

Clock 같은 함수형 컴포넌트를 클래스로 변환하려면 다섯단계를 진행한다.

1.  ES6 class 를 같은 이름으로 만들고, React.Component 를 상속받는다.
2.  비어있는 render()메서드를 추가
3.  함수으 ㅣ바디를 render()안으로 옮긴다.
4.  render()바디내에서 props 를 this.props 로 바꾼다.
5.  빈함수 선언 제거

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Clock 은 이제 함수대신 클래스다 이를 통해 지역적인 state 나 라이프 사이클훅 같은 추가 기능을 사용할 수 있다.

### class 에 로컬 state 추가하기

> 밖에서 컴포넌트를 렌더링할때준 date 가아니고 컴포넌트안에서 사용해보겟음
> 위에서는 그렇게 사용했음

1.  render() 메서드 내의 this.props.date 를 this.state.date 로 바꿉니다.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2.  this.state 를 초기화 하는 클래스 생성자 를 추가합니다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

3.  <Clock /> 요소에서 date prop 을 삭제합니다.

```js
ReactDOM.render(<Clock />, document.getElementById("root"));
```

결과

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

### 클래스에 라이프사이클 메서드 추가하기

state 를 바꾼다음에 랜더 메소드가 활용이 되게끔하는게 리액트에서 화면을 그려주는 것

> - this.setState 가 하는 일은
>   1.  state 를 바꿔주고
>   2.  화면을 다시그린다

많은 컴포넌트를 가진 어플리케이션에서, 컴포넌트가 제거될 때 사용중이던 자원을 돌려놓는 작업은 아주 중요한 일이다.

Clock 이 DOM 에 최초로 렌더링 될 때 타이머를 설정 하려고 한다. React 에서 이를 “mounting” 이라고 부른다.

그리고 DOM 에서 Clock 이 삭제되었을 때 타이머를 해제 하려고 한다. React 에서 이를 “unmounting” 이라고 부른다.

컴포넌트가 마운트 (mount) 되거나 언마운트 (unmount) 되는 시점에 코드를 실행하기 위해, 컴포넌트 클래스에 특별한 메서드를 선언할 수 있다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  // componentDidMount() 훅은 컴포넌트 출력이 DOM에 렌더링 된 이후 동작한다. 이곳이 타이머를 설정하기에 좋은 곳이다.
  // 렌더링과 관련된 데이터 흐름에서, this.props는 React에 의해 설정되고 this.state는 특별한 의미를 갖고 있다. 반면 위와 같이 데이터 흐름에 참여하지 않는 무언가를 저장할 때 클래스에 직접 필드를 추가하는 것도 가능하다.

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //상태를 바꿈으로써 화면이 간접적으로 다시 그려지도록 해줌
    this.setState({
      date: new Date()
    });
  }
  // 상태로부터 화면이 어떻게 그려져야하는지를 render메소드에 서술
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

이제 시계는 매 초 깜빡인다.

어떤 작업을 했는 지와 메서드가 호출되는 순서를 간단히 요약하자.

<Clock /> 이 ReactDOM.render() 에 전달될 때, React 는 Clock 컴포넌트의 생성자 함수를 호출합니다. Clock 이 현재 시각을 화면에 보여주어야 하기 때문에, 현재 시각을 포함하는 this.state 객체를 초기화합니다. 이 state 는 추후 업데이트됩니다.

React 가 Clock 컴포넌트의 render() 메서드를 호출합니다. 이를 통해 React 는 화면에 무엇을 보여줘야 하는지 알아냅니다. 그다음 React 는 DOM 을 갱신해서 Clock 의 렌더링 출력과 일치시킵니다.

Clock 출력이 DOM 에 주입되었을 때, React 는 componentDidMount() 라이프 훅을 호출합니다. 그 안에서 Clock 컴포넌트는 브라우저에게 컴포넌트의 tick() 메서드를 초당 한 번씩 호출하는 타이머를 설정하라고 명령합니다.

브라우저에서 매 초마다 tick() 메서드를 호출합니다. 그 안에서 Clock 컴포넌트는 현재 시각을 갖고 있는 객체를 가지고 setState() 를 호출하여 UI 업데이트를 예약합니다. setState() 호출 덕분에, React 는 상태가 변경된 걸 알게 됐고, render() 메서드를 다시 한 번 호출해 화면에 무엇을 표시해야 할지 알 수 있습니다. 이번에는, render() 메서드 내의 this.state.date 가 달라지므로 바뀐 시간이 출력에 포함됩니다. React 는 그에 따라 DOM 을 업데이트합니다.

만약 Clock 컴포넌트가 DOM 에서 삭제된다면, React 는 componentWillUnmount() 라이프사이클 훅을 호출하기 때문에 타이머가 멈춥니다.

ReactDOM.render 와 setState 일때만 render 함수가 호출된다

> React 의 사고방식 : 중간고사때는 페이지 다시 그리는 함수(render)를 호출했었음. 화면을 어떻게 그려야 하는지를 일일이 코딩을 해주었었음 하지만 React 는 화면이 바꾸면 다시 그려지도록 해놨음. 두가지 절차는 상태가 있고 상태가 어떻게 그려져야 하는지만을 설명해 놓은 다음에 상태를 바꿈으로써 화면을 바꿈

> 프로그래밍에서 결합이란 단어는 굉장히 안좋은 단어이다.

## State 바르게 사용하기

SetState() 에 대해 알아야 할 것들이 3 가지 있다.

1.  State 는 직접 수정하지 말기
2.  State 업데이트는 비동기 일 수 있다.
3.  State 업데이트는 병합된다.

```md
1.
예를 들어, 이 코드는 컴포넌트를 다시 렌더링하지 않는다.

`this.state.comment = 'Hello'`

대신, setState()를 사용해라

`this.setState({commnet: 'Hello'});`

this.state 를 할당할 수 있는 유일한 장소는 생성자 함수 내부이다.
```

2.<br>
React 는 성능을 위해 여러 setState() 호출을 한번의 작업으로 묶어서 처리하는 경우가 있다.

this.props 및 this.state 가 비동기로 업데이트 될 수 있기 때문에, 다음 state 를 계산할 때 이 값을 신뢰해서는 안된다.

예를 들어, 카운터를 업데이트하는 이 코드는 실패 할 수 있다.

```js
this.setState({
  counter: this.state.counter + this.props.increment
});
```

이 문제를 해결하기 위해 객체가 아닌 함수를 받는 두 번 째 형식의 setState()를 사용할 수 있다. 함수는 이전 state 를 첫번째 인수로 받고, 두번째 인수로 업데이트가 적용 될 때 props 를 받는다.

```js
this.setSteate((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

위 예제에서는 arrow function 을 사용했지만, 평범한 함수도 동작한다.

```js
this.setState(function(preState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

3.<br>
setState()를 호출할 때, React 가 넘겨받는 객체를 혀재 state 에 병합한다.
예를 들어, state 는 여러 독립적인 변수를 가질 수 있다.

```js
coustructor(props){
  super(props);
  this.state={
    posts:[],
    coments:[]
  };
}
```

그런 다음 개별 setState()를 호출하여 아이템을 각각 업데이트 할 수 있다.

```js
componentDidMount(){
  fetchPosts()/then(response=>{
    this.setState({
      posts: response.posts
    })
  });

  fetchComments().then(response=>{
    this.setState({
      comments: response.comments
    });
  });
}
```

이때 얕은 병합을 수행하기 때문에, this.setState({comments})는 this.state.posts 는 그대로 두지만, this.state.comments 는 완전히 대체한다
