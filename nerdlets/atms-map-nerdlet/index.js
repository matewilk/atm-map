import React from "react";
import { Grid, GridItem } from "nr1";

import incidents from "./data/incidents";
import AppMap from "./AppMap";
import AppTable from "./AppTable";

import { fetchAtmData } from "./nrqlQueries";

export default class AtmsMapNerdletNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      intervalHandler: null,
    };
    this.filters = [];
  }

  async componentDidMount() {
    // change id if you use different account to deploy to
    const fetchData = fetchAtmData({ id: 2674886 });
    const handler = setInterval(async () => {
      const data = await fetchData();
      console.log(JSON.stringify(data));
      this.setState({ incidents: data });
    }, 5000);
    this.setState({ intervalHandler: handler });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalHandler);
    this.setState({ intervalHandler: null });
  }

  filterByStatus(event) {
    if (event.target.checked) {
      this.filters = [...this.filters, event.target.value];
    } else {
      this.filters.splice(this.filters.indexOf(event.target.value), 1);
    }
    const filtered = incidents.filter(
      (incident) => this.filters.includes(incident.state) // && incident.type == 'BT' // GAA, KEGA
    );
    this.setState({
      incidents: this.filters.length > 0 ? filtered : incidents,
    });
  }

  render() {
    const { incidents } = this.state;
    return (
      <Grid style={{ height: "100%" }}>
        <GridItem columnSpan={6}>
          <AppMap incidents={incidents} />
        </GridItem>
        <GridItem columnSpan={6} style={{ overflow: "auto" }}>
          <AppTable
            incidents={incidents}
            filterByStatus={this.filterByStatus.bind(this)}
          />
        </GridItem>
      </Grid>
    );
  }
}
