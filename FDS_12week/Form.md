# Form

> 어떤 코드는 데이터가 유지되기도하고 변경되기도한다
> 프로그래밍 분야에서 상태라는 용어는 많이 쓰이는데 가장 넓은 의미로는 데이터가 유지되면서 변경되고 있을때 그것을 state 라고 부른다

## HTML 폼 요소는 그 자체가 내부 상태를 가지기 때문에, React 에서는 다른 DOM 요소들과는 조금 다르게 동작한다. 예를 들어, 순수한 HTML 에서 이 폼은 이름을 입력받는다.

```js
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value=" Submit" />>
</form>
```

위 폼에서 유저가 폼을 전송하면, 새로운 페이지로 이동하는 기본 HTML 폼 동작을 수행한다. 만약 React 에서 똑같은 동작을 원한다면, 그냥 그렇게 사용하면 된다. 그러나 대부분의 경우, 자바스크립트 함수를 만들어서 form 제출을 처리하고 form 에 입력한 데이터에 접근하도록 만드는게 좋다. 이를 널리 사용되는 방식은 "제어되는 컴포넌트"를 사용하는 것이다.

## 제어되는 컴포넌트

HTML 에서 `<input>, <textarea>, <select>` 같은 form 요소는 자기만의 상태를 가지고 사용자의 입력에 따라 업데이트 된다. 반면에 React 에서는, 변경 가능한 상태를 일반적으로 컴포넌트의 state 속성에 위치시키며, 이는 setState()로만 업데이트 할 수 있다.
React state 를 진리의 유일한 원천(single source of truth)[데이터는 한곳에!] 으로 만들어 두 세계를 결합할 수 있다. 이렇게 하면 사용자의 입력에 따라 폼에서 발생되는 일을 React 컴포넌트 측에서 제어하게 된다. 이런 방식으로, React 에 의해 제어되는 input 폼 요소를 "제어되는 컴포넌트" 라고 부른다.

위 예제를 바꾸어서 폼이 전송될 때 이름을 출력하기 위해, 폼을 제어되는 컴포넌트로 만들어 주었다.

```js
class NameForm extends React.Component {
  state = {
    value: ""
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    alert("A name was submitted: " + this.state.value);
    e.preventDefalut();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

vluae 어트리뷰트가 폼 요소에 설정되었기 때문에, 표시되는 값은 항상 this.state.value 가 된다. 즉, React state 가 진리의 유일한 원천이 된다. 키 입력이 일어날때 마다 handleChange 가 동작하고 React state 가 업데이트 되므로, 표시되는 값은 사용자의 입력에 따라 업데이트 된다.

제어되는 컴포넌트를 사용하면 모든 state 변경과 연관되는 핸들러 함수가 생긴다. 이를 통해 사용자 입력을 수정하거나 검증하는 것이 간단해 진다. 예를 들어 모든 유저의 이름을 강제로 대문자로 받고 싶다면 handleChange 를 다음과 같이 쓸수 있다.

```js
handleChange = e =>{
  this.setState({
    value: e.target.value.toUpperCase();
  });
}
```

### textarea 태그

HTML 에서, textarea 요소는 필드 내부의 텍스트를 자식으로서 지정한다.

React 에서 textarea 는 대신 value 어트리 뷰트를 사용한다. 이렇게 하면 textarea 를 사용하는 폼은 한줄 짜리 입력 필드와 매우 유사하게 작성될 수 있다.

```js
class EssayForm extends React.Component{
  state={
    value: 'Please write what you want to say to her'
  }

  handleChange = e =>{
    this.setState({
      vlaue: e.target.value
    });

    handleSubmit = e =>{
      alert('hahahahah' +this.state.value )
      e.preventDefault();
    }
    render(){
      return(
        <form onSubmit = {this.handleSubmit}>
          <label>
            Essay:
            <textarea value={this.state.value} onChnage={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )
    }
  }
}
```

this.state.value 를 생성자 함수에서 초기화하기 때문에, 텍스트를 가진 채로 textarea 를 표시해줄 수 있다.

### select 태그

HTML 에서, select 는 드롭 다운 목록을 만든다. 예를들어, 이 HTML 은 과일 드롭 다운 목록을 만든다.

```js
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">
    Coconut
  </option>
  <option value="mango">Mango</option>
</select>
```

Coconut 옵션에 selected 어트리뷰트가 있기 때문에 기본적으로 선택되는걸 주목하자. React 에서는 selected 어트리뷰트를 사용하는 대신 select 태그에 value 어트리뷰트를 사용한다. 제어되는 컴포넌트를 쓸 때는 이 방식이 더 편한데, 한 곳에서만 업데이트를 해주면 되기 때문이다.

```js
class FlavorForm extends React.Component {
  state = {
    value: "coconut"
  };

  handleChange = e => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = e => {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

이 방식을 통해 input, textarea, select 모두 비슷하게 동작한다. 즉, value 어트리뷰트를 사용해 제어되는 컴포넌트를 구현할 수 있다.

### 주의

select 태그에서 여러 개의 옵션을 사용하고 싶다면, value 어트리뷰트에 배열을 전달할 수도 있다.

`<select multiple={true} value = {['B', 'C']}>`

### 여러 Input 제어하기

여러 개의 input 요소를 제어해야 할 때, 각 요소에 name 속성을 추가하면 e.target.name 값을 기반으로 핸드럴 함수가 무엇을 해야할지를 결정할 수 있다.

```js
class Reservation extends React.Component {
  state = {
    isGoing: true,
    numberOfGuests: 2
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

input 의 name 에 해당하는 state 키를 업데이트하기 위해 ES6 computed property name 문법을 사용하고 있다.

```js
this.setstate({
  [name]: value
});
```

ES5 코드에선 이렇게 작성한다.

```js
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

또한 setState()가 자동으로 현재 상태에 객체를 병합하기 때문에, 바뀐 부분에 대해서만 setState 를 호출해주면 된다.

제어되는 입력 필드의 Null 값

제어되는 컴포넌트의 value prop 값을 지정해주면 개발자가 직접 value prop 를 변경하는 방법 외에는 사용자가 입력 필드의 값을 변경할 수 잇는 방법이 없다. value 를 정의 했지만 여전히 입력 필드가 수정 가능한 경우라면 실수로 value 를 undefined 나 null 로 설정햇을 수 있다.

다음 코드는 위와 같은 상황을 보여준다. 처음 보이는 input 은 잠겨있지만 약간의 시간이 지난 후 수정 가능하게 바뀐다.

```js
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

### 제어되는 컴포넌트에 대한 대안책

제어되는 컴포넌트를 사용하는 일은 종종 따분할 수 있는데, 왜냐하면 데이터를 변경하는 모든 방법에 대한 이벤트 헨들러를 작성해야하고 또 하나의 React 컴포넌트에 모든 input state 를 전달해야하기 때문이다. 기존 코드베이스를 React 로 변경하거나 React 어플리케이션을 React 가 아닌 라이브러리와 통합할 때 이 작업은 성가신 작업일 수 있다. 이런 상황에서는 입력 폼을 구현하기 위해 대체 기술인 제어되지 않는 컴포넌트를 사용하자.

> React 의 onChange 는 input 이벤트이다.
