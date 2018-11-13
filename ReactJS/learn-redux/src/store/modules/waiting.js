import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = "waiting/CHANGE_INPUT";
const CREATE = "waiting/CREATE";
const ENTER = "waiting/ENTER";
const LEAVE = "waiting/LEAVE";

// export const changeInput = text => ({ type: CHANGE_INPUT, payload: text });
// export const create = text => ({ type: CREATE, payload: text });
// export const enter = id => ({ type: ENTER, payload: id });
// export const leave = id => ({ type: LEAVE, payload: id });

let id = 3;
// use createAction
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

const initialState = {
  input: "",
  list: [
    {
      id: 0,
      name: "홍길동",
      entered: true
    },
    {
      id: 1,
      name: "콩쥐",
      entered: false
    },
    {
      id: 2,
      name: "팥쥐",
      entered: false
    }
  ]
};

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false
      })
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(item =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item
      )
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.payload)
    })
  },
  initialState
);
