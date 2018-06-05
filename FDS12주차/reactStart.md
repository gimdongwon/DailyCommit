# React

## 수업들어가기전 중간 프로젝트 리뷰

### Pure DOM API 썻을때의 문제점

* 길다
* 코드를 읽기가 힘들다
* HTML은 '무엇을' 하고 싶은지가 명확히 눈에 보인다. 반면 DOM API로 짜여진 코드를 보면 '어떻게' 하고 싶은지만 적혀있기 때문에, 무엇을 하고 싶은지가 한눈에 들어오지 않는다.

* 템플릿이 많은 것 => 템플릿이 한 파일에 다 모여있는 것 (indee.html)=> 여러 파일에 나누어서 작성할 수 있으면 좋겠다.
* 템플릿만 보면 뭘 하겠다는 것인지 보이지 않는다.(템플릿 + JS코드를 한꺼번에 봐야 정확히 의도가 보인다.)
* 역할과 책임(Role & Responsibility)이 하나도 분리되어있지 않다
* '페이지를 그리는 함수'에 통신, 템플릿 로딩, 템플릿과 데이터를 합치기, DOM트리에 병합하는 코드가 전부 들어있었다.
* 페이지의 일부분이 변경되더라도, 우리의 프레임 워크 아래에서는 전체를 다시 로딩할 수 밖에 없었다.
* 코딩을 하기에는 쉬웠다. (데이터베이스가 변경될때마다 페이지 전체를 매번 다시 그려주었기 때문에)

## React quick start

### hello react!

### JSX소개

JSX를 react와 함께 사용하면, UI가 실제로 어덯게 보일지 서술할 수 있다. JSX는 템플릿 언어처럼 보일수 있지만 (ejs랑 완전다름, 템플릿 언어랑도 다름) 다르다.

#### 왜 JSX인가

렌더링 로직이 다른 UI로직과 본질적으로 결합되어있다는 사실을 인정한다. (이방법이 좋지 않다는 언어들도 간혹있음) react는 별도의 파일에 마크업과 로직을 넣음

#### JSX에 표현식 담기

```js
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
)
```

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### > 다넣을 수 있다. 심지어객체다!!

jsx는 다 camelCase를 쓴다 다 js로 바뀌어야 되기 때문에

#### JSX 자식 정의



#### JSX 인젝션 공격 예방


#### JSX 객체 표현

> tag ㅡ쓰는 거 다 객체다
> 표현식 아무거나 넣을 수 있다
> class이름 별도의 attribute를 사용하는 것이다.

### 요소(element) 렌더링

> 강사님왈: 내 개발인생은 react전과 후로 나뉜다.

`const element = <h1>Hello, world</h1>;`

브라우저 DOM요소와 다르게 React요소는 순수한 객체다
(ex `Const imgEl = document.getElementId(img)`애는 src는 이미지 다운로드 하기 등등 여러가지 기능들을 가지고 있다. 하지만 react객체는 아무것도 없다)

#### DOM 에서 element 렌더링하기

react DOM에의 해 관리되는 모든 것이 이 요소 안에 들어가므로, 이걸 루트 DOM노드라고 부른다.
보통 react로 구축한 어플리케이션은 root하나만 둔다.

React요소를 루트 DOM노드에 렌더링하고 싶다면 ReactDOM.render()에 둘다 넘겨주면된다.

#### React는 필요한 부분만 렌더링함

우리의 경험상, '시간 경과에 따라 UI를 어떻게 변경할지'지를 생각하는 것이 아니라 '특정 순간에 UI가 어떻게 보여져야 할지'에 대해 생각하면, 수많은 종류의 버그를 없앨 수 있다.

### 컴포넌트와 props

컴포넌트를 통해 UI를 독립적이고 재사용 가능한 부분으로 분리하고, 각 부분을 독립적으로 생각할 수 있다.

jsx 에서 태그이름이 소문자로 시작하면 html 로 생각하여 뿌려줌 그렇기에
컴포넌트를 만들 때는 무조건 대문자로 써야된다

#### 컴포넌트 추출

#### Props 는 읽기 전용

모든 React컴포넌트는 props에 대해서는 **순수 함수** 처럼 동작해야 한다.

어플리케이션 UI는 동적이며 시간이 지남에 따라 변한다. 다음 섹션에서는 새로운 컨셉인 state를 소개한다. state는 react컴포넌트가 이 규칙을 어기지 않고 유저액션, 네트워크 응답, 기타 등등에 대한 응답으로 시간 경과에 따라 출력을 변경할 수 있게 한다.

>함수형 컴포넌트는 프록스를 받아서 리액트 앨리먼트를 반환해 주는것이다.

클래스 객체를 만들어내기위한 틀이고 속성을 지정해줄수 있었다.

class에 로컬 state추가하기

> 밖에서 컴포넌트를 렌더링할때준 date가아니고 컴포넌트안에서 사용해보겟음
> 위에서는 그렇게 사용했음

1. render() 메서드 내의 this.props.date 를 this.state.date 로 바꿉니다.

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

1. this.state 를 초기화 하는 클래스 생성자 를 추가합니다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
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

3. <Clock /> 요소에서 date prop을 삭제합니다.

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

결과

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
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

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### 클래스에 라이프사이클 메서드 추가하기

state를 바꾼다음에 랜더 메소드가 활용이 되게끔하는게 리액트에서 화면을 그려주는 것

* this.setState가 하는 일은
    1. state를 바꿔주고
    2. 2. 화면을 다시그린다

많은 컴포넌트를 가진 어플리케이션에서, 컴포넌트가 제거될 때 사용중이던 자원을 돌려놓는 작업은 아주 중요한 일입니다.

Clock 이 DOM에 최초로 렌더링 될 때 타이머를 설정 하려고 합니다. React에서 이를 “mounting” 이라고 부릅니다.

그리고 DOM에서 Clock 이 삭제되었을 때 타이머를 해제 하려고 합니다. React에서 이를 “unmounting” 이라고 부릅니다.

컴포넌트가 마운트 (mount) 되거나 언마운트 (unmount) 되는 시점에 코드를 실행하기 위해, 컴포넌트 클래스에 특별한 메서드를 선언할 수 있습니다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

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

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

이제 시계는 매 초 깜빡입니다.

어떤 작업을 했는 지와 메서드가 호출되는 순서를 간단히 요약해봅시다.

<Clock /> 이 ReactDOM.render() 에 전달될 때, React는 Clock 컴포넌트의 생성자 함수를 호출합니다. Clock이 현재 시각을 화면에 보여주어야 하기 때문에, 현재 시각을 포함하는 this.state 객체를 초기화합니다. 이 state는 추후 업데이트됩니다.

React가 Clock 컴포넌트의 render() 메서드를 호출합니다. 이를 통해 React는 화면에 무엇을 보여줘야 하는지 알아냅니다. 그다음 React는 DOM을 갱신해서 Clock 의 렌더링 출력과 일치시킵니다.

Clock 출력이 DOM에 주입되었을 때, React는 componentDidMount() 라이프 훅을 호출합니다. 그 안에서 Clock 컴포넌트는 브라우저에게 컴포넌트의 tick() 메서드를 초당 한 번씩 호출하는 타이머를 설정하라고 명령합니다.

브라우저에서 매 초마다 tick() 메서드를 호출합니다. 그 안에서 Clock 컴포넌트는 현재 시각을 갖고 있는 객체를 가지고 setState() 를 호출하여 UI 업데이트를 예약합니다. setState() 호출 덕분에, React는 상태가 변경된 걸 알게 됐고, render() 메서드를 다시 한 번 호출해 화면에 무엇을 표시해야 할지 알 수 있습니다. 이번에는, render() 메서드 내의 this.state.date 가 달라지므로 바뀐 시간이 출력에 포함됩니다. React는 그에 따라 DOM을 업데이트합니다.

만약 Clock 컴포넌트가 DOM에서 삭제된다면, React는 componentWillUnmount() 라이프사이클 훅을 호출하기 때문에 타이머가 멈춥니다.

ReactDOM.render 와 setState일때만 render 함수가 호출된다

React의 사고방식 : 중간고사때는 페이지 다시 그리는 함수(render)를 호출했었음. 화면을 어떻게 그려야 하는지를 일일이 코딩을 해주었었음 하지만 React는 화면이 바꾸면 다시 그려지도록 해놨음. 두가지 절차는 상태가 있고 상태가 어떻게 그려져야 하는지만을 설명해 놓은 다음에 상태를 바꿈으로써 화면을 바꿈

프로그래밍에서 결합이란 단어는 굉장히 안좋은 단어이다. 