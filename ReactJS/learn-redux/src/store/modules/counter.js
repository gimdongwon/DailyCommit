import produce from "immer";
import { createAction } from "redux-actions";

const CHANGE_COLOR = "counter/CHANGE_COLOR";
const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";
const MULTIPLY = "counter/MULTIPLY";

export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
// export const multiply = () => ({ type: MULTIPLY });
export const multiply = createAction(MULTIPLY);

const initialState = {
  color: "red",
  number: 0
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      // return { ...state, color: action.color };
      return produce(state, draft => {
        draft.color = action.color;
      });
    case INCREMENT:
      // return { ...state, number: state.number + 1 };
      return produce(state, draft => {
        draft.number++;
      });
    case DECREMENT:
      // return { ...state, number: state.number - 1 };
      return produce(state, draft => {
        draft.number--;
      });
    case MULTIPLY:
      return { ...state, number: state.number * 2 };
    // return produce(state, draft => {
    //   draft.number ** 2;
    // });
    default:
      return state;
  }
}
