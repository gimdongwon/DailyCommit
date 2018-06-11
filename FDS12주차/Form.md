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
React state 를 진리의 유일한 원천(single source of truth)[데이터는 한곳에!] 으로 만들어 2 세계를 결합할 수 있다.

React 의 onChange 는 input 이벤트이다.
