# redux

상태를 담는 통 & 외부세계와의 연동 이 2 가지를 위해서 context 를 사용하였다.

redux 도 context 의 목적이 동일하다.

차이점은 단 하나의 객체 store 에 저장되고 state 를 사용하지 않는다. 값이나 함수를 내려주기 위해서 HOC 를 사용한다.

> 뷰 앵귤러랑도 쓸수 있음.

외부세계와 연동하는 것도 따로 배워야됨.

## 역사에 대해서 설명을 드리면..

```md
위에있는 애를 밑으로 내려주려면 방법이 필요하다.

fasebook 에서 react 만들때 상태관리 기법으로 Flux 라는 기법을 제시했다.

여러가지 기법이 나왔다.. Flux, Flumnox, reflux...하지만 Redux 가 선택받음

나머지들은 상태를 여러군데에 저장을 하였다.

만든 사람은 Dan Abramov
```

> 질문 : react 를 사용하는 회사는 다 redux 를 사용하는가?
>
> 답변 : 70,80% 는 redux, 10% context, 10% modux 등을 사용할걸요!?

## Redux 공식문서

### 액션

context 에서는 함수를 내려줘서 인수를 호출

redux 에서는

```js
store.dispatch({
  type: "CREATE_TODO",
  body: "새할일"
});
```

dispatch = 상태를 어떻게 바꿀지를 표현하는 객체

액션은 애플리케이션에서 스토어로 보내는 데이터 묶음 이다. 데이터의 유일한 정보원이다. 정보를 바꾸는 유일한 방법이다.

### 액션 생성자 = Action creater

액션을 만들 때는 type 라는 속성이 항상 있어야된다.

생타를 어떻게 바꿔야 되는지를 표현하는 객체가 action 이다.

액션을 투입한다고 해서 상태를 어떻게 바꾸는지 표시해야되는데 그 절차를 Reducer 라고 부른다

### Reducer

액션은 무언가 일어난다는 사실을 기술하지만, 그 결과 애플리 케이션의 상태가 어떻게 바뀌는지는 특정하지 않는다. 그것이 Reducer 의 역할이다.

리듀서는 이전 상태와 액션을 받아서 다음 상태를 반환하는 순수 함수이다.

```js
import { VisibilityFilters } from "./actions";

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  // 지금은 아무 액션도 다루지 않고
  // 주어진 상태를 그대로 반환합니다.
  return state;
}
```

이게 리듀서다

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state;
  }
}
```

새 객체를 반환하는 것이 Reducer 이다.

```js
카운터 만들기

const INCR = 'INCR'
const ZERO = 'ZERO'

function incr(amount){// action creater
  return {
    type: INCR,
    amount
  }
}

function zero(){
  return {
    type: ZERO
  }
}
// redux store는 초기상태를 만들 때
// state에 undefined,
// action에 빈 객체를 넣어 리듀서를 호출한다.
const initialState = 0;

function counter(state=initialState, action){
  switch(action.type){
    case INCR:
    return state+action.amount;
    case ZERO:
    return 0;
    default: // 관례
    return state;
  }
}
```

#### 리듀서 내에서 절대로 하지 말아야 할일

- 인수들을 변경하기
- API 호추리안 라우팅 전환같은 사이드 이펙트를 일으키기
- Date.now()나 Math.random() 같이 순수하지 않은 함수 호출하기

이 세가지를 합하면 => 순수함수를 사용해야한다. 외부세계와는 1 도 연결되서는 안된다.

쉬는시간이후

```js
todo를 추가하고 ...state추가로 count안 사라지게함
const INCR = 'INCR'
const ZERO = 'ZERO'

const ADD_TODO = 'ADD_TODO';


function incr(amount){// action creater
  return {
    type: INCR,
    amount
  }
}

function zero(){
  return {
    type: ZERO
  }
}

function addTodo(body){
  return {
    type: ADD_TODO,
    body
  }
}

// redux store는 초기상태를 만들 때
// state에 undefined,
// action에 빈 객체를 넣어 리듀서를 호출한다.
const initialState = {
 count: 0,
 todos:[]
}
function rootReducer(state=initialState, action){
  switch(action.type){
    case INCR:
    return {
      ...state,
      count: state.count + action.amount
    }
    case ZERO:
    return {
      ...state,
      count: 0
    }

    case ADD_TODO:
    return {
      ...state,
      todos: [...state.todos, {body: action.body, complete: false}]
      // reducer에서는 항상 새배열, 새객체여야 한다.
    }
    default: // 관례
    return state;
  }
}
```

## 쪼갤수 있띠ㅏ

```js
const INCR = "INCR";
const ZERO = "ZERO";

const ADD_TODO = "ADD_TODO";

function incr(amount) {
  // action creater
  return {
    type: INCR,
    amount
  };
}

function zero() {
  return {
    type: ZERO
  };
}

function addTodo(body) {
  return {
    type: ADD_TODO,
    body
  };
}

function count(state = 0, action) {
  switch (action.type) {
    case INCR:
      return state + action.amount;
    case ZERO:
      return 0;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          body: action.body,
          complete: false
        }
      ];
    default:
      return state;
  }
}
// redux store는 초기상태를 만들 때
// state에 undefined,
// action에 빈 객체를 넣어 리듀서를 호출한다.
const initialState = {
  count: 0,
  todos: []
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case INCR:
    case ZERO:
      return {
        ...state,
        count: count(state.count, action)
      };
    case ADD_TODO:
      return {
        ...state,
        todos: todos(state.todos, action)
        // reducer에서는 항상 새배열, 새객체여야 한다.
      };
    default:
      // 관례
      return state;
  }
}
```

이제부터 Redux 라이브러리를 사용하겠음

```js
let { combineReducers } = require("redux");
const INCR = "INCR";
const ZERO = "ZERO";

const ADD_TODO = "ADD_TODO";

function incr(amount) {
  // action creater
  return {
    type: INCR,
    amount
  };
}

function zero() {
  return {
    type: ZERO
  };
}

function addTodo(body) {
  return {
    type: ADD_TODO,
    body
  };
}

function count(state = 0, action) {
  switch (action.type) {
    case INCR:
      return state + action.amount;
    case ZERO:
      return 0;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          body: action.body,
          complete: false
        }
      ];
    default:
      return state;
  }
}
// redux store는 초기상태를 만들 때
// state에 undefined,
// action에 빈 객체를 넣어 리듀서를 호출한다.
const initialState = {
  count: 0,
  todos: []
};
// function rootReducer(state=initialState, action){
//   switch(action.type){
//     case INCR:
//     case ZERO:
//       return{
//         ...state,
//         count: count(state.count, action)
//       }
//     case ADD_TODO:
//     return {
//       ...state,
//       todos: todos(state.todos, action)
//       // reducer에서는 항상 새배열, 새객체여야 한다.
//     }
//     default: // 관례
//     return state;
//   }
// }

// 작은 리듀서 여러개를 만든다음
// combineReducers 를 사용해 합칠 수 있다.
const rootReducer = combineReducers({
  todos,
  count
});
```

## Store

```js
let { combineReducers, createStore } = require("redux");

const INCR = "INCR";
const ZERO = "ZERO";

const ADD_TODO = "ADD_TODO";

function incr(amount) {
  // action creater
  return {
    type: INCR,
    amount
  };
}

function zero() {
  return {
    type: ZERO
  };
}

function addTodo(body) {
  return {
    type: ADD_TODO,
    body
  };
}

function count(state = 0, action) {
  switch (action.type) {
    case INCR:
      return state + action.amount;
    case ZERO:
      return 0;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          body: action.body,
          complete: false
        }
      ];
    default:
      return state;
  }
}
// redux store는 초기상태를 만들 때
// state에 undefined,
// action에 빈 객체를 넣어 리듀서를 호출한다.
const initialState = {
  count: 0,
  todos: []
};

// 작은 리듀서 여러개를 만든다음
// combineReducers 를 사용해 합칠 수 있다.
const rootReducer = combineReducers({
  todos,
  count
});

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
});
```

React 와 Redux 의 연결

store 를 통해 컴포넌트에서 전달을 해준다음에 setstate 를 사용해야한다

store - subscribe - setState

## React 와 함께 사용하기

Redux 는 React 와 관계가 없음을 강조했다.

데이터를 그리는 어떤 라이브러리랑도 같이 사용할 수 있다.

`npm install --save react-redux`라는 라이브러리를 추가로 설치하여야 한다.

Presentation Componet vs Container Component

> connect 는 consumer 역할을 한다. Provider 는 react provider 랑 역할이 같다.

## 새로 궁금해서 알게된점

npm install --save react-redux 하다가

--save 가 뭐지에 대해 궁금해 졌다. 구글링 결과

그냥 install 하면 ./node_modules 디렉터리에 패키지 설치를 하고 끝. --save, --save-dev 옵션은 ./package.json 업데이트를 같이해준다.

어디에 패키지 정보를 추가하느냐가 다른데,

--save 옵션은 dependencies object 에 추가하고 --save-dev 옵션은 devDepenencies object 에 추가한다.

dependencies 와 devDepenencies 차이는 npm install 을 할 때 나타난다.

dependencies 는 항상 설치되고 devDepenencies 는 --production 옵션을 붙이면 빠진다.

npm install “$package” 명령어로 설치할 때는 --dev 옵션을 붙여야지만 설치된다.

# 180705 시작

1.  redux 복습
2.  ducks 패턴 연습하기
3.  redux 를 이용한 비동기 액션 사용

## Redux 의 특징 : 하나의 객체에서 관리한다

store 하나에 전부 저장할수 없으니깐

좀 나누자 하고 여러가지 패턴이 나왓는데 그중 하나가 ducks

## ducks

ducks 의 약점 : 여러 리듀서에 영향을 미치는 관리를 하기가 쉽지 않다.

# 비동기 액션

## 서버랑 연동하기 => 서버랑 통신하는 것은 항상 비동기로 진행해라

비동기를 호출할 때 매우 중요한 순간은 호출을 시작할 때와, 응답을 받앗을 때(아니면 타임 아웃) 이다.

- 리듀서에게 요처이 시작되엇음을 알리는 액션
- 리듀서에게 요청이 성공적으로 완료되었다고 알리는 액션
- 리듀서에게 요청이 실패했음을 알리는 액션(부가적 부분)

## 비동기 액션 생산자

redux-thunk

# 참고 사이트

[리덕스 한국어 번역문서](https://deminoth.github.io/redux/)
