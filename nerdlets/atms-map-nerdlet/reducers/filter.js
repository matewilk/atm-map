import { SET_FILTER_VALUE } from "../actions";

const initialState = ["1", "2", "3", "9"];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_VALUE:
      return action.payload.checked
        ? [...state, action.payload.value]
        : state.filter((item) => item !== action.payload.value);
    default:
      return state;
  }
};
