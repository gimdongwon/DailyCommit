# controlled vs unControlled

## 제어되지 않는 컴포넌트

폼을 구현할 때는 되도록 제어되는 컴포넌트를 사용하는 것을 권한다.

controlled Component 는 form data 가 React 에 의해 절적히 제어될 수 있지만

반면 unControlled Component 는 폼 데이터는 DOM 의 자체 기능에 의해 제어된다.

아래 코드는 제어되지 않는 컴포넌트를 통해 이름을 입력받는다.

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={input => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

제어되지 않는 컴포넌트는 진리의 원천을 DOM 에 두기 때문에, React 를 사용한 코드와 사용하지 않은 코드를 통합하는 작업을 좀 더 쉽게 만들어 줄 수 있다. 그리고 코드의 양이 상대적으로 적다.

## The Uncontrolled

```js
class Form extends Component {
  handleSubmitClick = () => {
    const name = this._name.value;
    // do something with `name`
  };

  render() {
    return (
      <div>
        <input type="text" ref={input => (this._name = input)} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}
```

## The Controlled

```js
class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

제어되지 않는 컴포넌트는 진리의 원천을 DOM 에 두기 때문에, React 를 사용한 코드와 사용하지 않은 코드를 통합하는 작업을 좀 더 쉽게 만들어 줄 수 있다. 그리고 코드의 양이 상대적으로 적다. 지저분하지만 빠른 해결책을 원한다면 제어되지 않는 컴포넌트를 사용해라 그렇지 않으면 제어되는 컴포넌트를 사용해라

## 기본값 지정하기

React 의 렌더링 라이프사이클에서는, 폼 엘리먼트에 지정된 value 어트리뷰트가 DOM 의 값을 덮어쓸 것이다. 반면 제어되지 않는 컴포넌트를 사용할 때 DOM 의 상태 변화는 제어되지 않는 상태로 두면서도 초기값을 지정해주어야 하는 경우도 있다. 이런 경우를 위해, defaultValue 어트리뷰트를 value 대신 사용할 수 있다.

```js
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

비슷하게 <input type="checkbox"> 와 <input type="radio">엘리먼트는 defalutChecked 어트리뷰트를, <select>, <textarea>는 defalutValue 어트리뷰트를 지원한다.
