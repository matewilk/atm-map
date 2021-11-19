import React from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import leafletPip from "@mapbox/leaflet-pip";
leafletPip.bassackwards = true;

import allGeoRegions from "./geo/all-geo-regions";
import Regions from "./Regions";
import IncidentMarkers from "./IncidentMarkers";

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default class AppMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        // Germany
        long: "51.1657",
        lat: "10.4515",
      },
      zoom: 6,
    };
  }

  // change tooltip font size on initial render
  componentDidMount() {
    setTimeout(() => this.onViewportChanged({ zoom: this.state.zoom }), 0);
  }

  // change tooltip font size on zoom
  onViewportChanged = (viewport) => {
    const zoomLevel = viewport.zoom;
    const tooltips = document.getElementsByClassName("custom-tooltip");

    for (let i = 0; i < tooltips.length; i++) {
      const tooltip = tooltips[i];
      const size = zoomLevel * 3 + "px";
      tooltip.style.fontSize = size;
    }
  };

  render() {
    const { center, zoom } = this.state;
    const { incidents } = this.props;
    return (
      <Map
        ref={(ref) => {
          this.map = ref;
        }}
        viewport={{
          center: [parseFloat(center.long), parseFloat(center.lat)],
          zoom: zoom,
        }}
        onViewportChanged={this.onViewportChanged}
        className="container-map"
      >
        <TileLayer
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} // "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <IncidentMarkers incidents={incidents} />
        <Regions regions={allGeoRegions} incidents={incidents} />
      </Map>
    );
  }
}
