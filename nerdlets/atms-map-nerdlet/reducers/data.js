import { APPLY_FILTER, FETCH_DATA } from "../actions";

const initialState = {
  data: [],
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        data: action.payload.data,
        filtered: action.payload.data.filter((incident) =>
          action.payload.filter.includes(incident.state)
        ),
      };
    case APPLY_FILTER:
      return {
        data: state.data,
        filtered: state.data.filter((incident) =>
          action.payload.filter.includes(incident.state)
        ),
      };
    default:
      return state;
  }
};
