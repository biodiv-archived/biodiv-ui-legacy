import React,{Component} from 'react';
import Naksha from 'naksha-react-ui';
import { Config } from '../Config';
import axios from 'axios';

class ObservationMapView extends Component{

  constructor(props) {
    super(props);
    this.state={
      flag:false
    }
    window.popupUrl = Config.api.PAMBA_API_ROOT_URL + "/naksha" +this.props.filterUrl;
  }

  componentDidMount() {
    this.setState({
      flag:true
    })
  }

  map() {
    return (
      <Naksha.MapHolder url={window.popupUrl}
           location_field="location"
           map_container="map2"
           restrict_to_bounds={[[68, 5.75], [98, 37.5]]}
           url_response_geohash_field="geohashAggregation"
           url_response_filtered_geohash_field="viewFilteredGeohashAggregation"
           color_scheme="YlOrBr"
           no_legend_stops="6"
           is_legend_stops_data_driven={true}
           on_click={window.map_getPopup}
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

function getHtml(documents) {

  let getObservationNameHtml = function(document) {
    let getObservationUrl = function(document) {
      return Config.api.ROOT_URL + "/observation/show/" + document.id + "?pos=";
    }
    let getObservationName = function(document) {
      let name = document.name;
      if(!name || name === "null") name = "Unidentified";
      return name;
    }
    return "<a target='_blank' href='" + getObservationUrl(document) + "'>" + getObservationName(document) + "</a>";
  }

  let getImageUrl = function(document) {
    return "/images/group/" + document.speciesgroupid + ".png";
  }

  let html = "<div>"

  // get observation's species group image and observation's hyperlinked name
  for (var i = 0; i < documents.length; i++) {
      let document = documents[i];
      html += "<span><img style='width:20px;height:20px' src='" + getImageUrl(document) + "'>" + getObservationNameHtml(document) + "</img></span><br>"
  }

  // left arrow button
  if(window.map_offset !== 0)
    html += "<span style='float:left;cursor:pointer' onclick='window.map_getPopup(event.target.parentNode, undefined, -1)'><i class='fa fa-arrow-circle-left' style='color:black'></i></span>"
  //right arrow button
  if(documents.length === 10)
    html += "<span style='float:right;cursor:pointer' onclick='window.map_getPopup(event.target.parentNode, undefined, 1)'><i class='fa fa-arrow-circle-right' style='color:black'></i></span>"

  html += "</div>"

  return html;
}

function getPopup(e, coordinates, direction) {

  if(!coordinates) {
    coordinates = window.coordinates;
  }
  else {
    window.map_offset = 0;
  }
  if(!coordinates)
    return;

  window.coordinates = coordinates;
  if(direction) {
    let offset = direction === 1 ? window.map_offset + 10 : window.map_offset - 10;
    window.map_offset = Math.max(offset, 0);
  }

  let top = Math.max(coordinates[0][0][1], coordinates[0][1][1], coordinates[0][2][1]);
  let bottom = Math.min(coordinates[0][0][1], coordinates[0][1][1], coordinates[0][2][1]);
  let left = Math.min(coordinates[0][0][0], coordinates[0][1][0], coordinates[0][2][0]);
  let right = Math.max(coordinates[0][0][0], coordinates[0][1][0], coordinates[0][2][0]);

  return new Promise( (resolve, reject) => {
    let url = window.popupUrl;
    url = url.replace(/offset=[0-9]+/,'offset=' + window.map_offset);
    let params = {
      top: top,
      bottom: bottom,
      right: right,
      left: left
    }

    axios
      .get(url, {params : {
        top: top,
        bottom: bottom,
        right: right,
        left: left,
        geoAggregationField: "location"
      }})
        .then(({
          data
        }) => {
          var html = getHtml(data.documents);
          if(direction) {
            e.parentNode.innerHTML = html;
          }
          resolve(html);
        })
        .catch((err) => {
          console.log('error ' + err);
          reject(err);
        })
  })
}

export default ObservationMapView;
window.map_getPopup = getPopup
