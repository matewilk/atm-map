import React from "react";
import { connect } from "react-redux";
import { Grid, GridItem, Layout, CollapsibleLayoutItem, LayoutItem } from "nr1";

import * as actions from "./actions";

import AppMap from "./components/AppMap";
import AppTable from "./components/AppTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalHandler: null,
      interval: 30000,
      showPanel: false,
    };
  }

  async componentDidMount() {
    const { poll } = this.props;
    const { interval } = this.state;
    poll();
    const handler = setInterval(poll, interval);
    this.setState({ intervalHandler: handler });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalHandler);
    this.setState({ intervalHandler: null });
  }

  onChangeCollapsed(event, collapsed) {
    this.setState({ showPanel: !collapsed });
  }

  render() {
    // return (
    //   <Grid style={{ height: "100%" }}>
    //     <GridItem columnSpan={6}>
    //       <AppMap />
    //     </GridItem>
    //     <GridItem columnSpan={6} style={{ overflow: "auto" }}>
    //       <AppTable />
    //     </GridItem>
    //   </Grid>
    // );
    const { showPanel } = this.state;
    const classes = showPanel ? "show-side-panel" : null;
    return (
      <Layout fullHeight style={{ overflowX: "hidden" }}>
        <LayoutItem>
          <AppMap />
        </LayoutItem>

        <CollapsibleLayoutItem
          className={classes}
          triggerType={CollapsibleLayoutItem.TRIGGER_TYPE.INBUILT}
          type={CollapsibleLayoutItem.TYPE.SPLIT_RIGHT}
          defaultCollapsed={true}
          onChangeCollapsed={this.onChangeCollapsed.bind(this)}
        >
          <AppTable />
        </CollapsibleLayoutItem>
      </Layout>
    );
  }
}

export default connect(null, actions)(App);
