import React from 'react';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import {Config} from '../../../Config';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
let mapboxgl = require('mapbox-gl');
let MapboxDraw = require('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw');


mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFuc2h1LWEiLCJhIjoiY2phMmQ1bTFvNzRjZDMzcGdiNmQ5a3k5YSJ9.cpBkEIu8fQFAgx1cYuTQVg';
let Draw = new MapboxDraw({
 displayControlsDefault: false,
 controls: {
     polygon: true,
     trash: true
 }
});
class LocationFilter extends React.Component {

   constructor(){
    super();
    this.state={
      Points:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let location;
    if(newparams.location){
      location=newparams.location;
      let points=location.split(",");
      for(let i=0;i<points.length;i++){

      }
      this.map.on('load', function () {

       this.addLayer({
           'id': 'maine',
           'type': 'line',
           'source': {
               'type': 'geojson',
               'data': {
                   'type': 'Feature',
                   'geometry': {
                       'type': 'Polygon',
                       'coordinates': [[[76.88000000001534,23.961818441121636],
                       [81.80000000001462,19.50449191133316],[77.60000000001463,16.537954499784675],
                       [75.20000000002511,19.50449191133316],[76.88000000001534,23.96181844112163]]]
                   }
               }
           }

       });
    });
    }

  }
  getMapPointsParameters(draw){
    let locationParams="";
  var data = Draw.getAll();
  data.features.map(parents=>{
    parents.geometry.coordinates.map((item,index)=>{
      item.map(item1=>{
        locationParams=locationParams+item1+",";
      })
      locationParams=locationParams.substring(0,locationParams.length-2);

    });

  })
  let events = new CustomEvent("location-filter",{ "detail":{
      location:locationParams
  }
  });
  document.dispatchEvent(events);
  }
  componentDidMount(){
    this.map = new mapboxgl.Map({
     container: this.mapContainer,
     style: 'mapbox://styles/mapbox/streets-v9'

   });
   this.map.fitBounds(Config.map.RESTRICTED_EXTENT, {linear: true, duration: 0});
   this.map.setMaxBounds(this.map.getBounds());
   this.map.addControl(Draw, 'top-left');
   this.map.on('draw.create', this.getMapPointsParameters);
   this.map.on('draw.delete', this.getMapPointsParameters);
   this.map.on('draw.update', this.getMapPointsParameters);
   this.setParameter();
  }


  render() {
    return (
      <div  style={{'height':'300px','width':'250px'}} ref={el => this.mapContainer = el} >
      </div>
    )
  }
}

export default withRouter(LocationFilter);
