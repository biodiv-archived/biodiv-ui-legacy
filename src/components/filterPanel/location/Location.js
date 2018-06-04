import React from 'react';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
var mapboxgl = require('mapbox-gl');
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
import {Config} from '../../../Config';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFuc2h1LWEiLCJhIjoiY2phMmQ1bTFvNzRjZDMzcGdiNmQ5a3k5YSJ9.cpBkEIu8fQFAgx1cYuTQVg';
var Draw = new MapboxDraw({
 // displayControlsDefault: false,
 // controls: {
 //     polygon: true,
 //     trash: true
 // }
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
    let points;
    if(newparams.points){
      points=newparams.points;
    }
    this.setState({
      Points:points
    })
  }
  getMapPointsParameters(draw){
  var data = Draw.getAll();
  console.log(data.features["0"].geometry.coordinates);
  }
  componentDidMount(){
    this.setParameter();
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

  }


  render() {
    return (
      <div  style={{width:'350px',height:'300px'}} ref={el => this.mapContainer = el} >
      </div>
    )
  }
}

export default withRouter(LocationFilter);
