import { fetchAtmData } from "./data";
import { setFilterValue } from "./filter";

export const FETCH_DATA = "FETCH_DATA";

export const SET_FILTER_VALUE = "SET_FILTER_VALUE";
export const APPLY_FILTER = "APPLY_FILTER";

export const FILTER_TYPE_STATUS = "status";
export const FILTER_TYPE_DEVICE = "device";

export const STATE_MAP = {
  1: 'Available',
  2: 'Malfunction',
  3: 'In Service',
  9: 'Unavailable'
}

export const poll = () => async (dispatch) => {
  dispatch(fetchAtmData({ id: 2674886 }));
};

export { fetchAtmData, setFilterValue };
