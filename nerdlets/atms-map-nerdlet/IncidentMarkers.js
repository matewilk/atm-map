import React from "react";
import incidents from "./data/incidents";
import { Marker, Popup } from "react-leaflet";

export default class IncidentMarkers extends React.Component {
  render() {
    const { incidents } = this.props;
    {
      return incidents.map((incident) => {
        return (
          <Marker
            position={[parseFloat(incident.lat), parseFloat(incident.long)]}
          >
            <Popup>{incident.name}</Popup>
          </Marker>
        );
      });
    }
  }
}
