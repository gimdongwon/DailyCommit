# event

# List, Key

> react 에서는 element 값이었다. 객체이다.

> 배열에 데이터가 들어있으면 각 항목마다 element 를 만들어서 element 로 만들어진 배열을 만들어서 목록을 랜더링한 것이 react 방식임

배열의 자식들은 유니크한 Key 속성을 가져야 한다. (Each child in an array or iterator should have a unique 'key' prop)

## 기본적인 목록 컴포넌트

대개 컴 포넌트 안에서 목록을 랜턷링하게 된다.

바뀌는 데이터에 따라서 상태를 보여주고 싶을때는 state 를 사용할 수 잇다.

함수형 컴포넌트에서는 state 를 사용하지 못한다.

1.  map 콜백에서 반환하는 요소에는 ket props 을 꼭 넣어주어야 한다.
2.  key props 에 index 는 사용하나마나이다.

> React 는 개발자도 편하고 기계한테도 효율적인 기술이다

개발자 입장에서는 전체를 다시 그리는 것처럼 보인다.

React=> 필요한 부분만 골라내서 그것 만 업데이트함

## Key

> key 를 주면 정확히 어떤 놈을 삭제해야 되는지 알아서 지워준다.

> key 를 index 를 키로 쓰면 범위가 이상해진다.

map()에서 반환하는 요소에는 키를 넣어준다.

키는 형제 중에서 고유한 값이어야 한다.

배열 내에서 사용되는 키는 형제간에 고유해야 한다. 그러나 전체 범위에서 초과할 필요는 없다. 서로 다른 두 배열을 생성할 때는 같은 키를 사용할 수 있다.(전혀 다른 목록에서 사용됨.)

Key 는 React 에게 힌트를 제공하지만 컴포넌트로 전달되지는 않는다.
