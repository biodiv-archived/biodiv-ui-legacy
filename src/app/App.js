import React from 'react';
import Content from './Content';
import MapHolder from 'naksha-react-ui';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <Content />
      </div>
      <div className="row">
        {/* <MapHolder url="http://localhost:8090/biodiv-api/maps/observation/observations?taxon=874&geoAggregationField=location"
                                   location_field="location"
                                   default_zoom="3"
                                   map_container="map"
                                   url_response_geohash_field="geohashAggregation"
                                   color_scheme="YlOrRd"
                                   legend_stops="9" /> */}


      </div>
      </div>
    );
  }
}
