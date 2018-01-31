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
    let url = Config.api.API_ROOT_URL + "/maps" +this.props.filterUrl;
    return (
      <MapHolder url={url}
           location_field="location"
           map_container="map"
           default_zoom="3.5"
           map_container="map"
           url_response_geohash_field="geohashAggregation"
           url_response_filtered_geohash_field="geohashAggregation"
           color_scheme="YlOrRd"
           legend_stops="9"
      />
    )
  }

  render(){
    return(
      <div style={{height:'50px'}}>
        {this.state.flag ? this.map() : null}
        <div id="map" style={{height:"400px",marginTop:"100px"}}>
        </div>
      </div>
    )
  }
}

export default ObservationMapView;
