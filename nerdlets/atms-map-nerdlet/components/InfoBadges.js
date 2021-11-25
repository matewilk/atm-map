import React from "react";
import { Badge, Spacing } from "nr1";
import { connect } from "react-redux";

class AppTable extends React.Component {
  available() {
    const { incidents } = this.props;
    return incidents.filter((incident) => {
      return incident.state === "1" || incident.state === "3";
    });
  }

  critical() {
    const { incidents } = this.props;
    return incidents.filter((incident) => {
      return incident.state === "2" || incident.state === "9";
    });
  }

  render() {
    const { incidents } = this.props;
    const available = this.available();
    const critical = this.critical();
    return (
      <>
        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Badge type={Badge.TYPE.INFO}>{`Total: ${incidents.length}`}</Badge>
        </Spacing>
        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Badge
            type={Badge.TYPE.SUCCESS}
          >{`Available: ${available.length}`}</Badge>
        </Spacing>
        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Badge
            type={Badge.TYPE.CRITICAL}
          >{`Critical: ${critical.length}`}</Badge>
        </Spacing>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { incidents: state.data.filtered };
};

export default connect(mapStateToProps)(AppTable);
