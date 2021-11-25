import { SET_FILTER_VALUE } from "../actions";

const initialState = { status: ["1", "2", "3", "9"], device: ["KEGA", "BT", "GAA"] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_VALUE:
      // depending on whether the status is checked or not
      return action.payload.checked
        ? {
            ...state,
            // set filter value based on filter type (status or device)
            [action.payload.type]: [
              ...state[action.payload.type],
              action.payload.value,
            ],
          }
        : {
            ...state,
            // unset filter value based on filter type (status or device)
            [action.payload.type]: state[action.payload.type].filter(
              (item) => item !== action.payload.value
            ),
          };
    default:
      return state;
  }
};
