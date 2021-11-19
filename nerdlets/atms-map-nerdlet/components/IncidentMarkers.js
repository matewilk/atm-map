import React from "react";
import {connect} from "react-redux";
import { Marker, Popup } from "react-leaflet";

class IncidentMarkers extends React.Component {
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

const mapStateToProps = (state) => {
  return { incidents: state.data }
}

export default connect(mapStateToProps)(IncidentMarkers)
