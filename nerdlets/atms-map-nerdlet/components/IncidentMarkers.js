import React from "react";
import { connect } from "react-redux";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

class IncidentMarkers extends React.Component {
  render() {
    const { incidents } = this.props;
    return (
      <MarkerClusterGroup singleMarkerMode={true}>
        {incidents.map((incident) => {
          return (
            <Marker
              position={[parseFloat(incident.lat), parseFloat(incident.long)]}
            >
              <Popup>
                {`Name: ${incident.name} `}
                <br /> {`Status: ${incident.state}`}
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return { incidents: state.data.filtered };
};

export default connect(mapStateToProps)(IncidentMarkers);
