import { fetchAtmData } from "./data";

export const FETCH_DATA = "FETCH_DATA";

export const poll = () => async (dispatch) => {
  dispatch(fetchAtmData({ id: 2674886 }));
};

export { fetchAtmData };
