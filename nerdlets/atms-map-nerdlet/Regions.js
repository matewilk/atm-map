import React from "react";
import Region from "./Region";

export default class Regions extends React.Component {
  render() {
    const { regions, incidents } = this.props;
    {
      return regions.map((region) => {
        return (
          <Region
            region={region}
            incidents={incidents}
          />
        );
      });
    }
  }
}
