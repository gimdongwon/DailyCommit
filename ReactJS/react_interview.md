# React interview

## 1. functional component vs class component 의 차이점 (ab180 면접질문이였음)

만약 만들 컴포넌트가 라이프사이클 API 도 state 도 사용하지 않고 그냥 props 만 전달해주면 뷰를 렌더링하는 역할이라면 함수형 컴포넌트 형식으로 컴포넌트를 정의할 수 있다.
반대로 class component 는 라이프사이클 이나 state 를 사용할 때 사용해준다.
11% functional 이 더 빠르다.

## 2. LifeCycle API (ab180 면접질문)

![LifeCycle](https://velopert.com/wp-content/uploads/2016/03/Screenshot-from-2016-12-10-00-21-26-1.png)

- 컴포넌트를 생성할 때는 constructor => componentWillMount => render=> componentDidMount 순으로 진행된다.
- 컴포넌트를 제거할 때는 componentWillUnmount 메소드만 실행된다.
- 컴포넌트의 prop 이 변경될 때엔 componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate 순으로 진행된다.

- 생성

  - constructor : 생성자 메소드로서 컴포넌트가 처음 만들어 질 때 실행된다. 이 메소드에서 기본 state 를 정할 수 있다.
  - componentWillMount : 컴포넌트가 DOM 위에 만들어지기 전에 실행된다.
  - render : 컴포넌트 렌더링을 담당한다.
  - componentDidMount : 컴포넌트가 만들억지고 첫 렌더링을 다 마친 후 실행되는 메소드이다. 이 안에서 다른 JavaScript 프레임워크를 연동하거나 setTimeout, setInterval 및 AJAX 처리 등을 넣는다.

- 변경시

  - componentWillReceiveProps : 컴포넌트가 prop 을 새로 받았을 때 실행된다. prop 에 따라 state 를 업데이트 해야할 때 사용하면 유용하다. 이 안에서 this.setState()를 해도 추가적으로 렌더링 하지 않는다.
  - shouldComponentUpdate : prop 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드이다. 위 예제에선 무조건 true 를 반환하도록 하였지만, 실제로 사용할 대는 필요한 비교를 하고 값을 반환하도록 바란다.
  - componentWillUpdate 컴포넌트가 업데이트 되기 전에 실행된다. 이 메소드 안에서는 this.setState()를 사용하면 안된다. 무한루프에 빠진다.
  - componentDidUpdate : 컴포넌트가 리렌더링을 마친 후 실행된다.

- 제거시
  - componentWillUnmount : 컴포넌트가 DOM 에서 사라진 후 실행되는 메소드이다.

## 3. React 쓰는 이유? 장점? 꼬리물기

컴포넌트 개념이 가져다 주는 이점이 많다. => why? => 조그만 UI 컴포넌트를 만들어 재사용하는 방법이 아주 간단하고 직관적이다.

Redux 왜 사용함? React 에 state 있지않니? => 물론 관리가 가능하지만 component 양이 많아지고 component 사이에서 state 를 쉐어해야 할 경우가 늘어나면 해당 컴포넌트들이 공통으로 가지고 있는 부모 component 로 소위 말하는 state up lifting 을 해야한다. (부모 component 에서 state 를 관리하고 각각의 자식 컴포넌트들에 props 로 주입해줘야 다른 두 컴포넌트 사이에 똑같은 상태를 공유할 수 있다는 의미) 이 방식은 상태를 공유해야하는 컴포넌트들이 많아지면 급속도로 복잡해진다. Redux 를 이용하면 state lifting 없이 각각의 컨테이너들에서 store 에 바로 접근이 가능하기 때문에 코딩 및 디버깅이 훨씬 쉬워진다.

## 4. 클로져는 무엇인가

클로져는 함수 안의 또 다른 함수를 이용해 하나의 독립된 스코프를 생성하는 메카니즘이다.

모듈을 만들때 가장많이 사용하는 패턴이다 다른패턴으로는 revealing 모듈패턴이 있다.

독립된 환경을 만들어서 private 함수를 만든다.

## 5. UI / UX

User Interface / User Experience

UI 는 쉽게 말하면 사용자가 앱을 사용할 때 마주하는 디자인, 레이아웃, 기술적인 부분을 말한다.

UX 는 사용자들의 경험을 실행하고 진행되는 다양한 경험을 분석하여 그것을 더 편하고 효율적인 방향으로 프로세스가 진행될 수 있도록 하는 과정.

## 6. Restful(REpresentational State Transfer ful)

ROA(Resource Oriented Architecture)설계의 중심에 Resource 가 있고 HTTP Method 를 통해 Resource 를 처리하도록 설계된 아키텍쳐를 의미한다.

HTTP Method 와 CRUD Operation 은 일반적으로 아래 표와 같이 맵핑된다.

| Method | CRUD   |
| ------ | ------ |
| post   | Create |
| Get    | Read   |
| Put    | Update |
| Delete | Delete |

- 장점
  - OpenAPI를 제공하기 쉽다.
  - 원하는 타입의 데이터를 주고 받을 수 있다.
  - 세션을 사용하지 않는다.
  - 기존 웹 인프라를 그대로 사용가능하다.
- 단점
  - 표준이 없어서 관리가 어렵다
  - 메소드가 4개밖에 없음
  - 분산환겨엥는 부적합하다.
- 특징
  - 클라이언트 / 서버 구조 : 일관적으로 독립되어야 한다.
  - 무상태 : 각 요청 간 클라이언트의 Context는 서버에 저장되어서는 안된다.
  - 캐시가능 : WWW에서아 같이 클라이언트는 응답을 Caching할 수 있어야 한다.
  - 계층화(Layered System) : 클라이언트는 보통 대상 서버에 직접 연결 또는 중간 서버를 통해 연결되는지 모른다.
  - Code on demand(option) : 자바 애플릿/ 자바스크립의 제공으로 서버가 클라이언트가 실행시킬 수 있는 로직을 전송하여, 기능을 확장 할수 있다.
  - 인터페이스 일관성 : 아키텍처를 단순화하고, 작은 단위로 분리하여, 클라이언트-서버 파트별로 독립적으로 개선 될 수 있도록 한다.
  - 자체 표현구조(Self-Descriptiveness) : API 메시지만 보고도 어떤 API인지를 이해 할수 있는 자체 표현 구조를 가진다.

## 7. React Component, PureComponent, StatelessComponent

PureComponent extends Component

쉽게 정리하자면 Component 에 shouldcomponentUpdate()가 구현되어 있다. shouldComponentUpdate() 내부에서 shallowEqual(props) || shallowEqual(state) 체크를 한다. 그래서 shouldComponentUpdate()를 구현하려고 하면 Componnet를 쓰라고 경고메세지가 뜬다.

기본 Component가 ComponentWillReceiveProps()와 setState()이후 render()로 직행한다면, PureComponent는 Shallow-Equal 체크를 하는 shouldComponentUpdate()를 한번 거쳐서 뭔가 확실히 변했을 댸만 렌더링을 하게 된다. 고로 render()의 발생빈도를 줄이게 된다.

shouldComponentUpdate()선언을 잘 안하는 습관을 가지고 있다면 Component를 PureComponent로 변경하는 것 만으로도 성능상 이점을 얻을 수 있지만 개인적으로 shouldComponentUpdate()를 선언하는 습관을 가지는게 더 좋다고 생각한다.

별개로 Shallow-Equal로 체크하기 힘든 애매한 케이스들(대표적으로 React Router)의 경우 PureComponent로 자것ㅇ하면 동작이 잘 안될 때가 있다. 

정리하자면 

- shouldComponentUpdate()선언하는 습관이 없는 경우 PureComponent로 바꾸는 것으로도 성능상 이점이 생긴다. 하지만 shouldComponentUpdate()를 선언해 주는 습관이 더 좋다.
- Shallow-Equal 로 체크하기 힘든 애매한 케이스들의 경우 동작을 하지 않을 때가 있는데, 애매한 부분들은 Component로 대체해서 쓰면 된다.

StatelessComponent

빨라보이지만 느리다. 함수 형태 Component라서 빨라보이지만 함수를 React.Component로 감싸서 동작하기 떄문에 느리다.

## 8. 라이프사이클 정리하기

### 컴포넌트 초기생성

일단 컴포넌트가 브라우저에 나타나기 전,후에 호출되는 API들이 있다.

#### contructor : 이 부분은 컴포넌트의 생성자 함수이다. 컴포넌트가 새로 만들어질 때마다 이 함수가 호출됨

#### componentWillMount

이 API는 컴포넌트가 화면에 나가기 직전에 호출되는 API이다. 예전에는 브라우저가 아닌 환경에서도 호출되는 용도로 사용되었었는데 지금은 deprecated중이다. componentDidMount가 이 API의 역할을 하는중이다.

#### componentDidMount

이 API는 컴포넌트가 화면에 나타나게 되었을 때 호출된다. DOM을 사용해야하는 외부 라이브러리를 연동하거나 해당 컴포넌트에서 필요로 하는 데이터를 요청하기 위해 axios, fetch등 ajax요청을 하거나 DOM의 속성을 읽거나 직접 변경하는 작업을 진행한다.

### 컴포넌트 업데이트

컴포넌트 업데이트는 props의 변화, 그리고 state의 변화에 따라 결정된다. 업데이트가 되기 전과 그리고 된 후에 어떠한 API가 호출 되는지 살펴보자.

#### componentWillReceiveProps

이 API는 컴포넌트가 새로운 props를 받게 됐을 떄 호출된다. 이 안에서는 주로, state가 prop에 따라 변해야 하는 로직을 작성한다. 새로 받게될 props는 nextProps로 조회할 수 있으며, 이때 this.props를 조회하면 업데이트 되기 전의 API이니 조심해야한다. 마찬가지로 지금은 deprecated중이다. 이 기능은 상황에 따라 getDerivedStateFromProps가 대체한다.

#### [NEW] static getDerivedStateFromProps()

이 API는 props로 받아온 값을 state로 동기화 하는 작업을 해줘야 하는 경우에 사용된다.

> null을 리턴하면 따로 업데이트 할것이 없다는 의미이다.

#### shouldComponentUpdate

이 API는 컴포넌트를 최적화하는 작업에서 매우 유용하게 쓰인다. 우리가 저번에 배웠을 때, React에서는 변화가 발생하면 부분만 업데이트해줘서 성능이 좋다고 하는데 사실 변화가 발생한 부분만 감지하기 위해서는 Virtual DOM에 한번 그려줘야 한다.

즉, 현재 컴포넌트의 상태가 업데이트되지 않아도 부모 컴포넌트가 리렌더링 되면, 자식 컴포넌트들도 렌더링된다. 여기서 렌더링은 render()의 호출이다.

변화가 없으면 물론 DOM조작은 하지 않게 된다. 그저 Virtual DOM에만 렌더링 될 뿐이다. 이 작업은 부하가 많은 작업은 아니지만 컴포넌트가 무수히 많이 렌더링된다면 이야기는 달라진다. 쓸데없이 낭비되는 이 CPU 처리량을 줄여주는 역할을 shouldComponentUpdate가 불필요한 경우엔 리렌더링을 방비하기 위해 활동한다.

#### componentWillUpdate

여기선 주로 애니메이션 효과를 초기화하거나, 이벤트 리스너를 없애는 작업을 하는데 마찬가지로 deprecated중이다.

#### [NEW]getSnapshotBeforeUpdate()

이 API가 발생하는 시점은 다음과 같다.

1. render()
2. getSnapshotBeforeUpdatae()
3. 실제 DOM에 변화발생
4. componentDidUpdat

이 API를 통해서, DOM변화가 일어나기 직전의 DOM상태를 가져오고 여기서 리턴하는 값은 componentDidUpdate에서 가져오면 된다.

```js
getSnapshotBeforeUpdate(preVProps, prevState){
  if (prevState.array !== this.state.array){
    const {scrollTop, scrollHeight} = this.list;
  }
  // 여기서 반환되는 값이 snapshot이다.
  return {
    scrollTop, scrollHeight
  }
}

componentDidUpdate(prevProps, prevState, snapshot){
  if(snapshot){
    const {scrollTop} = this.list;
    if (scrollTop !==snapshot.scrollTop) return; // 기능이 이미 구현되어 있다면 처리하지 않음
    const diff = this.list.scrollHeight - snapshot.scrollHeight;
    thist.list.scrollTop +=diff;
  }
}
```

#### componentDidUpdate

이 API는 커포넌트에서 render()를 호출하고 난 다음에 발생하게 된다. 이 시점에선 this.props와 this.state가 바뀌었다. 그리고 파라미터를 통해 이전의 값인 prevProps와 prevState를 조회할 수 있다. 그리고 getSnapshotBeforeUpdate에서 변환한 snapshot값은 세번째 값으로 받아온다.

### 컴포넌트 제거

#### componentWillUnmount

> will친구들 중에 마지막으로 살아남은 친구이다

컴포넌트가 더이상 필요하지 않다면 이벤트를 제거하고 외부라이브러리를 사용한 것이 있다면 dispose해주는 등 여기서 호출해주면 된다.

### 컴포넌트에 에러 발생

render 함수에서 에러가 발생한다면, 리액트 앱이 크래쉬 된다. 그러한 상황에 유용하게 사용할 수 있는 API는 componentDidCatch이다

#### componentDidCatch

```js
componentDidCatch(error, info){
  this.setState({
    error : true
  })
}
```

에러가 발생하면 이런식으로 componentDidCatch가 실행되게 되고 render함수쪽에서 이에따라 에러를 띄어주면 된다.

이 API를 사용하게 될시 컴포넌트 자신의 render 함수에서 발생해버리는 것은 잡아낼 수는 없지만, 그 대신에 컴포넌트의 자식 컴포넌트 내부에서 발생하는 에러들을 잡아낼 수 있다.
