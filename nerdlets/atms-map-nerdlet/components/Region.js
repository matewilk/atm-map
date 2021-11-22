import React from "react";
import { GeoJSON, Tooltip } from "react-leaflet";
import leafletPip from "@mapbox/leaflet-pip";
import { connect } from "react-redux";

class Region extends React.Component {
  calculateIncidents() {
    const { incidents, region } = this.props;
    const gjLayer = L.geoJSON(region);

    // find incidents in the region (finds points by long lat in polygon)
    const incidentsInRegion = incidents.reduce((acc, incident) => {
      const pointInPolygon = leafletPip.pointInLayer(
        [incident.lat, incident.long],
        gjLayer
      );
      if (pointInPolygon.length > 0) {
        acc.push(incident);
      }
      return acc;
    }, []);

    return incidentsInRegion;
  }

  alertCount(incidentsInRegion) {
    const filter = ["2", "9"]; // malfunction, unavailable
    const alerts = incidentsInRegion.filter((incident) =>
      filter.includes(incident.state)
    );
    return alerts.length;
  }

  getPercentage() {
    const incidentsCount = this.calculateIncidents();
    const alerting = this.alertCount(incidentsCount);
    const total = incidentsCount.length;
    // percentage
    return (((total - alerting) / total) * 100).toFixed(2);
  }

  getColor(percentage) {
    let color = "grey";
    if (percentage >= 99) {
      color = "green";
    } else if (percentage >= 90) {
      color = "yellow";
    } else if (percentage <= 85) {
      color = "red";
    }
    return color;
  }

  render() {
    const { region } = this.props;
    const percentage = this.getPercentage();
    const color = this.getColor(percentage);
    const style = () => ({ color: "white", fillColor: color });
    return (
      <GeoJSON data={region} style={style}>
        <Tooltip
          direction="center"
          offset={[0, 0]}
          opacity={0.8}
          permanent
          className="custom-tooltip"
        >
          {`${percentage}%`}
        </Tooltip>
      </GeoJSON>
    );
  }
}

const mapStateToProps = (state) => {
  return { incidents: state.data.filtered };
};

export default connect(mapStateToProps)(Region);
