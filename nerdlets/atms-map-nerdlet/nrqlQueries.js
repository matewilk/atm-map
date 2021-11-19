import { NerdGraphQuery } from "nr1";

export const atmDataQuery = `
  nrql(
    query:
      "SELECT * FROM NewRelicPocTerminal SINCE 5 MINUTES AGO"
  )
  {
    results
  }
`;

export const fetchAtmData = ({ id }) => async () => {
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

  return response.data.actor.account.nrql.results.map((item) => {
    item.long = item.lon;
    item.state = item.STATE;
    return item;
  });
};
