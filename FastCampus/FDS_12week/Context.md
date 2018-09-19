# Context

Context 를 사용하면 일일이 props 를 내려주지 않아도 데이터를 컴포넌트 트리 아래쪽으로 전달할 수 있다.

전형적인 React 애플리케이션에서는, 데이터는 props 를 통해 위에서 아래로 (부모에서 자식으로 전달된다. 하지만 이런 방식은 몇몇 유형의 props 에 대해서는 굉장히 번거로운 방식일 수도 있다. (예를 들어 언어설정, UI 테마 등)어플리켕션의 많은 컴포넌트들에서 이를 필요로 하기 때문이다. Context 를 사용하면 prop 을 통해 트리의 모든 부분에 직접 값을 넘겨주지 않고도, 값을 공유할 수 있다.

- API

  - React.createContext
  - Provider
  - Consumer

- Examples
  - 값이 변하는 Context
  - 중첩된 컴포넌트에서 context 갱신하기
  - 여러 context 에서 값 넘겨 받기
  - 라이프사이클 메소드에서 context 에 접근하기
  - Consuming Context with a HOC
  - Forwarding Refs to Context Consumers

## 언제 Context 를 사용해야 할까

Context 는 React 컴포넌트 트리 전체에 걸쳐 데이터를 공유하기 위해 만들어 졌다.
그러한 데이터로는 로그인 된 사용자의 정보, 테마, 언어 설정등이 있을 수 있겠죠.
예를 들어, 아래 코드에서는 Button 컴포넌트의 스타일링을 위해 theme prop 을 일일이 엮어주고 있다.

```js
class App extends React.Component{
  render(){
    return <Toolbar theme="dark"/>;
  }
}
function Toolbar(props){
  return (
    <div>
      <ThemeButton theme={props.theme}  
    </div>
  )
}

function ThemeButton(props){
  return <Button theme={props.theme}/>
}
```

Context 를 사용하면, 중간 계층에 위치하는 엘리먼트에 props 를 넘겨주는 작업을 피할 수 있다.

```js
// Context를 사용하면 prop를 일일이 엮어주지 않고도
// 컴포넌트 트리의 깊은 곳에 값을 ㄴ머겨줄 수 있다.
// 테마에 대한 context를 만들자
const ThemeContext = React.createContext("light");

class App extends React.Component {
  render() {
    // Provider를 사용해서 현재 테마를 트리 아래쪽으로 넘겨준다.
    // 어떤 컴포넌트는 이 값을 읽을 수 있다. 아주 같은 곳에 위치해 있떠라도 안된다.
    //아래쪽에서는, 'darr'라는 값을 넘겨주자.
    return (
      <ThemeContext.Propvider value="dark">
        <Toolbar />
      </ThemeContext.Propvider>
    );
  }
}
// 이제 더이상 중간 계층에 있는 컴포넌트에서
// theme prop을 넘겨줄 필요가 없다.
function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}

function ThemeButton(props) {
  // 테마 context를 읽어오려면 Consumer를 사용하라
  // React는 가장 가까운 Provider를 찾아서 그 값을 사용할 것이다.
  // 이 예제에서, theme값은 "dark" 가 된다.
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}
```

## 주의

단지 몇 단계의 prop 전달을 건너뛰기 위해 context 를 사용하지는 않는것이 좋다. 여러계층의 여러 컴포넌트에서 같은 데이터를 필요로 할 때에만 context 를 사용해라

## API

### React.createContext

`const {Provider, Consumer} = React.createContext(defaultValue);`

{Provider, Consumer} 쌍을 만든다. React 가 context Consumer 를 렌더링하면, 같은 context 로부터 생성된 가장 가까운 상위 Provider 에서 현재 context 의 값을 읽어온다.

defalutValue 인수는 오직 상위에 같은 context 로 부터 생성된 Provider 가 없을 경우에만 사용된다. 이 기능을 통해 Provider 없이도 컴포넌트를 손쉽게 테스트해볼 수 있다. 주의: Provider 에서 undefined 를 넘겨줘도 Consumer 에서 defalutValue 를 사용되지는 않는다.

### Provider

`<Provider value={/*some value*/}>`

Context 의 변화를 Consumer 에게 통지하는 React 컴포넌트이다.

value prop 을 받아서 이 Provider 의ㅣ 자손인 Consumer 에서 그 값을 전달한다. 하나의 Provider 는 여러 Consumer 에 연결될 수 있다. 그리고 Provider 를 중첩해서 트리의 상위에서 제공해준 값을 덮어쓸 수 있다.

### Consumer

```js
<Consumer>
  {value=> /* render something based on the context value*/}
</Consumer>
```

Context 의 변화를 수신하는 React 컴포넌트이다.

function as a child 패턴을 사용한다. 함수는 현재 context 의 값을 받아서 React 노드를 반환해야한다. 트리 상위의 가장 가까이 있는 Provider 의 value prop 이 이 함수에 전달된다. 만약 트리 상위에 Provider 가 없다면, createConetext()에 넘겨진 defaultValue 값이 대신 전달된다.
