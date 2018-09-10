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
