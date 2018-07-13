import React,{Component} from 'react';
import Naksha from 'naksha-react-ui';
import axios from 'axios';

import { Config } from '../Config';
import style from './ObservationMapPopup.css';

class ObservationMapView extends Component{

  constructor(props) {
    super(props);
    this.state={
      flag:false
    }
    window.popupUrl = Config.api.API_ROOT_URL + "/naksha" +this.props.filterUrl;
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
           restrict_to_bounds={window.map_hardbounds}
           url_response_geohash_field="geohashAggregation"
           url_response_filtered_geohash_field="viewFilteredGeohashAggregation"
           color_scheme="YlOrRd"
           no_legend_stops="6"
           is_legend_stops_data_driven={true}
           on_click={window.map_getPopup}
      />
    )
  }

  render(){
    return(
      <div style={{position:'relative'}}>
        {this.state.flag ? this.map() : null}
        <div id="map2" style={{height:'672px'}}>
        </div>
      </div>
    )
  }
}

function getNextSpecies(e, direction) {
  let documents = window.map_speciesDocs;
  let html = "";

  window.map_speciesTabOffset = direction === 1 ? window.map_speciesTabOffset + 10 : window.map_speciesTabOffset - 10;
  let limit = Math.min(window.map_speciesTabOffset + 10, documents.length);
  for (var i = window.map_speciesTabOffset; i < limit ; i++)
    html += "<div>" + documents[i].key + "&nbsp;&nbsp;(" + documents[i].doc_count + ")" + "</div>";

  if(window.map_speciesTabOffset !== 0)
    html += "<span style='float:left;cursor:pointer' onclick='window.map_getNextSpecies(event.target.parentNode, -1)'><i class='fa fa-arrow-circle-left' style='color:black'></i></span>"

  if(window.map_speciesTabOffset +10 < documents.length) {
    html += "<span style='float:right;cursor:pointer' onclick='window.map_getNextSpecies(event.target.parentNode, 1)'><i class='fa fa-arrow-circle-right' style='color:black'></i></span>"
  }

  e.parentNode.innerHTML = html;
}

function getSpHtml(documents) {
  documents = JSON.parse(documents);
  documents = documents["sterms#name.keyword"]["buckets"];
  window.map_speciesDocs = documents;
  let html = "";
  for (var i = 0; i < 10 && i < documents.length; i++)
    html += "<div>" + documents[i].key + "&nbsp;&nbsp;(" + documents[i].doc_count + ")" + "</div>";

  //right arrow button
  if(documents.length > 10) {
    html += "<span style='float:right;cursor:pointer' onclick='window.map_getNextSpecies(event.target.parentNode, 1)'><i class='fa fa-arrow-circle-right' style='color:black'></i></span>"
  }

  return html;
}

function getObvHtml(documents) {

  let getObservationNameHtml = function(document) {
    let getObservationUrl = function(document) {
      return Config.api.ROOT_URL + "/observation/show/" + document.id + "?pos=";
    }
    let getObservationName = function(document) {
      let name = document.name;
      if(!name || name === "null") name = "Unidentified";
      return name;
    }
    return "<a class='red' target='_blank' href='" + getObservationUrl(document) + "'>" + getObservationName(document) + "</a>";
  }

  let getImageUrl = function(document) {
    return "/images/group/" + document.speciesgroupid + ".png";
  }

  let html = "";
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

  return html;
}

function getTab(evt, index) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabscontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // document.getElementById(cityName).style.display = "block";
    tabcontent[index].style.display = "block";
    evt.currentTarget.className += " active";
    window.map_popupIndex = index;
}

function getHtml(data) {
  let html = "<div class='tab'>"
  html += "<button class='tablinks active' onclick='window.map_getTab(event, 0)'>Observations</button>"
  html += "<button class='tablinks' onclick='window.map_getTab(event, 1)'>&nbsp;&nbsp;Species&nbsp;&nbsp;</button>"
  html += "<div id='observations' class='tabscontent' style='display:block'>"
  html += getObvHtml(data.documents);
  html += "</div>"
  html += "<div id='species' class='tabscontent'>"
  html += getSpHtml(data.termsAggregation);
  html += "</div>"
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

  return getHtmlPopupData(e, direction, top, bottom, right, left)
}

function getHtmlPopupData(e, direction, top, bottom, right, left) {
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
        geoAggregationField: "location",
        termsAggregationField: "name.keyword"
      }})
        .then(({
          data
        }) => {
          var html;
          if(!direction) {
            html = getHtml(data);
          }
          else if (window.map_popupIndex === 0) {
            html = getObvHtml(data.documents);
          }
          else {
            html = getSpHtml(data.termsAggregation);
          }

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
window.map_getPopup = getPopup;
window.map_getTab = getTab;
window.map_popupIndex = 0;
window.map_speciesTabOffset = 0;
window.map_getNextSpecies = getNextSpecies;
