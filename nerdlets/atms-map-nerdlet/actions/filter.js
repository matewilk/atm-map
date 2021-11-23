import {APPLY_FILTER, SET_FILTER_VALUE} from "./index";

export const setFilterValue = (value, checked) => (dispatch) => {
  dispatch({
    type: SET_FILTER_VALUE,
    payload: { value, checked },
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
