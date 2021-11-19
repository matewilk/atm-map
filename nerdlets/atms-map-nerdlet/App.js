import React from "react";
import { connect } from "react-redux";
import { Grid, GridItem } from "nr1";

import * as actions from "./actions"

import AppMap from "./components/AppMap";
import AppTable from "./components/AppTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalHandler: null,
    };
    this.filters = [];
  }

  async componentDidMount() {
    const { poll } = this.props;
    poll();
    const handler = setInterval(poll, 10000);
    this.setState({ intervalHandler: handler })
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
    return (
      <Grid style={{ height: "100%" }}>
        <GridItem columnSpan={6}>
          <AppMap />
        </GridItem>
        <GridItem columnSpan={6} style={{ overflow: "auto" }}>
          <AppTable
            filterByStatus={this.filterByStatus.bind(this)}
          />
        </GridItem>
      </Grid>
    );
  }
}

export default connect(null, actions)(App)
