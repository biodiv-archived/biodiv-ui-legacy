import React,{Component} from 'react';
import MapHolder from 'naksha-react-ui';
import { Config } from '../Config';

class ObservationMapView extends Component{

  constructor() {
    super();
    this.state={
      flag:false
    }
  }

  componentDidMount() {
    this.setState({
      flag:true
    })
  }

  map() {
    let url = Config.api.API_ROOT_URL + "/naksha" +this.props.filterUrl;
    return (
      <MapHolder url={url}
           location_field="location"
           default_zoom="3"
           map_container="map2"
           url_response_geohash_field="geohashAggregation"
           url_response_filtered_geohash_field="geohashAggregation"
           color_scheme="YlOrRd"
           legend_stops="9"
           restrict_to_bounds={[[42, 4], [117, 39]]}
      />
    )
  }

  render(){
    return(
      <div>
        {this.state.flag ? this.map() : null}
        <div id="map2" style={{height:"450px"}}>
        </div>
      </div>
    )
  }
}

export default ObservationMapView;
