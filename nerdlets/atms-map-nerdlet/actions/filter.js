import {APPLY_FILTER, SET_FILTER_VALUE} from "./index";

export const setFilterValue = (type, value, checked) => (dispatch) => {
  dispatch({
    type: SET_FILTER_VALUE,
    payload: { type, value, checked },
  });

  dispatch(applyFilter())
};

export const applyFilter = () => (dispatch, getState) => {
  const { filter } = getState();

  dispatch({
    type: APPLY_FILTER,
    payload: { filter }
  })
}
