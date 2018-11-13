import { createStore } from "redux";

const lightDiv = document.getElementsByClassName("light")[0];
const switchButton = document.getElementById("switch-btn");

const counterHeadings = document.getElementsByTagName("h1")[0];
const plusButton = document.getElementById("plus-btn");
const minusButton = document.getElementById("minus-btn");

// **** 액션 타입 정의
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// **** 액션 생성함수 정의
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increment = diff => ({ type: INCREMENT, diff });
const decrement = () => ({ type: DECREMENT });

// 초깃 값 설정
const initialState = {
  light: false,
  counter: 0
};

// 리듀서 설정
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 기존의 값을 그냥 두면서 leave the existing values behind
        light: !state.light // light 값 변경 시키기 change light value
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.diff
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default: {
      return state;
    }
  }
}

// create store
const store = createStore(reducer);

// create reducer function
const render = () => {
  const state = store.getState(); // 현재의 상태를 가져온다.
  const { light, counter } = state; // 편의상 비할당 구조
  if (light) {
    lightDiv.style.background = "green";
    switchButton.innerText = "turn off";
  } else {
    lightDiv.style.background = "gray";
    switchButton.innerText = "turn on";
  }
  counterHeadings.innerText = counter;
};

render();

//  subscribe
store.subscribe(render);

// create aciton 

switchButton.onclick = () =>{
  store.dispatch(toggleSwitch());
}
plusButton.onclick = () =>{
  store.dispatch(increment(5));
}
minusButton.onclick = () =>{
  store.dispatch(decrement(5));
}

