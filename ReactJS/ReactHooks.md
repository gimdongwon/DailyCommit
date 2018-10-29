# React Hooks

Hooks 는 조만간 도입될 예정인 기능으로써(18.10.29 기준), 함수형 컴포넌트에서도 상태 관리(state) 및 클래스형 컴포넌트에서만 할수 있는 다른 작업들을 구현할 수 있게 해주는 기능이다. 아직 정식릴리즈는 되지 않으며 React v16.7.0-alpha 버전에서만 가능하다 (현재 16.6v)

## state Hook: useState

State Hook 은 함수형 컴포넌트에서 변화 할 수 있는 상태를 사용할 수 있게 해준다.

### 카운터 구현하기

src/Counter.js

```js
import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <h1>{value}번 눌렀드아.</h1>
      <button onClick={() => setvalue(value + 1)}>+1</button>
      <button onClick={() => setvalue(value - 1)}>+1</button>
    </>
  );
};
```

useState 함수의 파라미터로는 사용하고 싶은 상태의 기본값을 넣어준다. useState 를 호출하면 배열을 반환하는데, 이 배열의 첫 번째 원소는 현재 상태 값과, 두 번째 원소는 이 값을 설정해주는 setter 함수이다.

### 폼 구현하기

이번에는 useState 가 여러개의 상태를 관리해야 할 땐 어떻게 하는지 살펴보자

src/Form.js

```js
import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");

  return (
    <form onSubmit={onSubmit}>
      <input
        placeHolder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeHolder="Description"
        value={Description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">보내기</button>
    </form>
  );
};

export default Form;
```

## Effect Hook: useEffect

이번에 useEffect 라는 함수다. 이 함수는, 컴포넌트가 마운트되거나 리렌더링이 마치고 나서 실행된다. conponentDidMount 와 componentDidUpdate 와 비슷하다.

counter 에 useEffect 를 사용해보면

src/Counter.js

```js
import React, {useState, useEffect} from 'react'

const Counter = () =>{
  const [value, setValue]=useState(0);

  useEffect(()=>{
    console.log("useEffect가 DidMount다")
  });

  return ...
}
```

useEffect 에 넣은 함수는 컴포넌트가 render 를 마친 다음에 실행된다. 가끔씩은 우리가 똑같은 작업을 componentDidMount 와 componentDidUpdate 에서 구현해야 할 때가 있다.

예를 들어 포스트 하단에 뜨는 다른 포스트를 누르면 같은 종류의 페이지에서 url 만 바뀌는 경우이다.

```md
Before : /@velopert/eslint-and-prettier-in-react
After : /@velopert/react-component-styling
```

때문에 컴포넌트가 언마운트 => 마운트를 거치는 것이 아니라, 주소를 가르키는 props 만 업데이트가 되는데 이에따라 포스트를 새로 불러와야 하기에 이런 로직이 구현되어 있다.

```js
componentDidMount(){
  this.initalize();
  const {hash} = this.props.location;
  if(hash !== ''){
    PostsActions.activateHeading(decodeURI(hash.split('#')[1]));
  }
}

componentDidUpdate(prevProps, prevState){
  if(prevProps.uriSlug !== this.props.uriSlug){
    PostsActions.unloadPost();
    this.initalize();
  }
}
```

컴포넌트가 새로 마운트 될때에도 this.initalize 를 호출하고, 업데이트 될때에도 urlslug 부분이 바뀌면 this.initalize 를 호출하고 있다. useEffect 를 사용하면 이러한 중복 로직을 해결해 줄수 있다. useEffect 를 사용할 때 주의할 점은 우리가 설정해준 render 가 될때마다 실행된다는 점이다. 즉, props 나 state 가 바뀌지 않고 부모 컴포넌트가 리렌더링 될때에도 호출된다. 만약 특정상황에만(props 가 바뀌었을 떄)실행되게끔하고 싶으면 useEffect 의 두번쨰 파라미터로 주시하고 싶은 값들을 배열 형태로 전달하면된다.

```js
useEffect(
  () => {
    console.log("...");
  },
  [value]
);
```

이러면 value 가 바뀔 때만 useEffect 가 호출된다.

## Hooks 의 사용 규칙

1. Hooks 를 컴포넌트의 Top-level 에서만 사용할 것.
2. React 함수에서만 사용할 것.

## Custom Hook 만들기

useState 와 useEffect 를 활용하면 정말 다양한 작업들을 할 수 있다. 그리고 재사용 되는 로직들을 우리가 따로 Custom Hook 으로 만들어서 우리들만의 Hook 을 사용할 수 있다.

src/useRequest.js

```js
import { useEffect, useState } from "react";
import axios from "axios";

function useRequest(url) {
  // loading, response, error 값을 다루는 hooks
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // 렌더링 될 때, 그리고 url 이 바뀔때만 실행됨
  useEffect(
    async () => {
      setError(null); // 에러 null 처리
      try {
        setLoading(true); // 로딩중
        const res = await axios.get(url); // 실제 요청
        setResponse(res); // response 설정
      } catch (e) {
        setError(e); // error 설정
      }
      setLoading(false); // 로딩 끝
    },
    [url] // url 이 바뀔때만 실행됨
  );
  return [response, loading, error]; // 현재 값들을 배열로 반환
}

export default useRequest;
```

src/Post.js

```js
import React from "react";
import useRequest from "./hooks/useRequest";

const Post = () => {
  const [response, loading, error] = useRequest(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  if (loading) {
    return <div>로딩중..</div>;
  }

  if (error) {
    return <div>에러 발생!</div>;
  }

  /*
    컴포넌트가 가장 처음 마운트 되는 시점은, Request 가 시작되지 않았으므로
    loading 이 false 이면서 response 도 null 이기에
    response null 체킹 필요 
  */
  if (!response) return null;

  const { title, body } = response.data;

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Post;
```

## 그 외의 React 내장 Hooks

### useContext

`const context = useContext(Context)`

useContext 는 Context API 를 Hook 을 통해 사용할 수 있게 해준다. Render Props 보다, HOC 를 사용하는 것 보다, 혹은 contextType 을 사용하는 것보다 편함

### useReducer

리덕스에서 리듀서를 사용하는 것과 유사한 방식으로 컴포넌트 상태관리 할수 있게 해준다. 따로 설치할 필요없이 컴포넌트 내부에 사용할 수 있는 리듀서다.

### useRef

useRef 는 함수형 컴포넌트에서도 ref 를 사용 할 수 있게 해주는 훅이다.

## 참고

- https://reactjs.org/docs/hooks-intro.html

- https://velog.io/@velopert/react-hooks
