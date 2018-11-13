import { createAction, handleActions } from "redux-actions";
import { List, Map } from "immutable";

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

const initialState = Map({
  input: "",
  list: List([
    Map({
      id: 0,
      name: "홍길동",
      entered: true
    }),
    Map({
      id: 1,
      name: "콩쥐",
      entered: false
    }),
    Map({
      id: 2,
      name: "팥쥐",
      entered: false
    })
  ])
});

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => state.set("input", action.payload),
    [CREATE]: (state, action) =>
      state.update("list", list =>
        list.push(
          Map({
            id: action.payload.id,
            name: action.payload.text,
            entered: false
          })
        )
      ),
    [ENTER]: (state, action) => {
      const index = state
        .get("list")
        .findIndex(item => item.get("id") === action.payload);
      return state.updateIn(["list", index, "entered"], entered => !entered);
    },
    [LEAVE]: (state, action) => {
      const index = state
        .get("list")
        .findIndex(item => item.get("id") === action.payload);
      return state.deleteIn(["list", index]);
    }
  },
  initialState
);
