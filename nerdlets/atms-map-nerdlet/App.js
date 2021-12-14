import React from "react";
import { connect } from "react-redux";
import { Layout, CollapsibleLayoutItem, LayoutItem } from "nr1";

import * as actions from "./actions";

import AppMap from "./components/AppMap";
import AppTable from "./components/AppTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalHandler: null,
      interval: 1200000,
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
    // this forces the leaflet to rerender (center) the map in the available view
    // when the panel opens, the map re-centers in the view!
    setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
  }

  render() {
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
