import { NerdGraphQuery } from "nr1";
import { FETCH_DATA } from "./index";

export const atmDataQuery = `
  nrql(
    query:
      "SELECT * FROM NewRelicPocTerminal SINCE 5 MINUTES AGO"
  )
  {
    results
  }
`;

export const fetchAtmData = ({ id }) => async (dispatch, getState) => {
  const { filter } = getState();
  const query = `
    query($id: Int!) {
      actor {
        account(id: $id) {
          ${atmDataQuery}
        }
      }
    }
  `;

  const variables = { id: parseInt(id) };
  const response = await NerdGraphQuery.query({ query, variables });

  const data = response.data.actor.account.nrql.results.map((item) => {
    item.long = item.lon;
    item.state = item.STATE;
    return item;
  });

  return dispatch({
    type: FETCH_DATA,
    payload: { data, filter },
  });
};
