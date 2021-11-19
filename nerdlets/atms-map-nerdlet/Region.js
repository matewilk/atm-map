import React from "react";
import { GeoJSON, Tooltip } from "react-leaflet";
import leafletPip from "@mapbox/leaflet-pip";

export default class Region extends React.Component {
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
        acc.push(pointInPolygon[0]);
      }
      return acc;
    }, []);

    return incidentsInRegion;
  }

  getPercentage() {
    const incidentsCount = this.calculateIncidents();
    const incidentsNumber = incidentsCount.length;
    // fake total
    const total = 10;

    // percentage
    return (total - incidentsNumber) / total * 100;
  }

  getColor(percentage) {
    let color = 'grey'
    if(percentage >= 99) {
      color = 'green';
    } else if (percentage >= 90) {
      color = 'yellow';
    } else if (percentage <= 85) {
      color = 'red'
    }
    return color;
  }

  render() {
    const { region } = this.props;
    const percentage = this.getPercentage();
    const color = this.getColor(percentage);
    return (
      <GeoJSON data={region} style={{ color: "white", fillColor: color }}>
        <Tooltip
          direction="center"
          offset={[0, 0]}
          opacity={0.8}
          permanent
          className="custom-tooltip"
        >
          {percentage + "%"}
        </Tooltip>
      </GeoJSON>
    );
  }
}
