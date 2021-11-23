import React from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import leafletPip from "@mapbox/leaflet-pip";
leafletPip.bassackwards = true;

import allGeoRegions from "../geo/all-geo-regions";
import Regions from "./Regions";
import IncidentMarkers from "./IncidentMarkers";

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
        lat: "51.1657",
        long: "10.4515",
      },
      currentZoom: 6,
      mapChangeZoom: 6,
    };
  }

  // change tooltip font size on initial render
  componentDidMount() {
    setTimeout(
      () => this.onViewportChanged({ zoom: this.state.currentZoom }),
      0
    );
  }

  setTooltipFontSize(zoomLevel) {
    const tooltips = document.getElementsByClassName("custom-tooltip");
    for (let i = 0; i < tooltips.length; i++) {
      const tooltip = tooltips[i];
      tooltip.style.fontSize = zoomLevel * 3 + "px";
    }
  }

  // change tooltip font size on zoom in/out
  onViewportChanged = (viewport) => {
    const { center } = this.state;
    const [lat, long] = viewport.center
      ? viewport.center
      : [center.lat, center.long];

    const zoomLevel = viewport.zoom;
    this.setTooltipFontSize(zoomLevel);

    this.setState({ currentZoom: zoomLevel, center: { lat, long } });
  };

  render() {
    const { center, currentZoom, mapChangeZoom } = this.state;
    const changeLayers = currentZoom > mapChangeZoom;
    const url = changeLayers
      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    return (
      <Map
        ref={(ref) => {
          this.map = ref;
        }}
        viewport={{
          center: [parseFloat(center.lat), parseFloat(center.long)],
          zoom: currentZoom,
        }}
        onViewportChanged={this.onViewportChanged}
        className="container-map"
      >
        <TileLayer
          url={url}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {changeLayers ? <IncidentMarkers /> : null}
        <Regions regions={allGeoRegions} />
      </Map>
    );
  }
}
