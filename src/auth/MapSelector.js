import './style.css';
var GoogleMapsLoader = require('google-maps')
var map;

GoogleMapsLoader.KEY = 'AIzaSyCFan9y3E6XCb_3HE6kbbghfmRTmIgVJ9M';
GoogleMapsLoader.LIBRARIES = ['places'];
export default function () {
    GoogleMapsLoader.load(function(google) {
	var mapDiv = document.getElementById('gmap')
    map = new google.maps.Map(mapDiv, {
        center: {lat: 12.972442, lng: 77.580643}, // Bangalore
        zoom: 13
      });
    var input = document.getElementById('pac-input');

    map.controls[google.maps.ControlPosition.TOP].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input, {placeIdOnly: true});
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow({maxWidth: 300});
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var geocoder = new google.maps.Geocoder;
    var marker;
    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      var marker_position;
      geocoder.geocode({'placeId': place.place_id}, function(results, status) {

	// get the location of selected place and then find all
	// available addresses around it.
	var latLng = results[0].geometry.location;

	// remove the previous marker
	if(marker)
	  marker.setMap(null);
      	marker = new google.maps.Marker({
            map: map,
	    position: results[0].geometry.location,
            draggable:true,
      	});
          marker.setVisible(true);
          //mapDiv.val({'lat':latLng.lat(), 'lng':latLng.lng()});
          mapDiv.value = latLng;
          geocodePosition(infowindowContent, infowindow, marker, geocoder, place, latLng);
          google.maps.event.addListener(marker, 'dragend', function() {
              var latLng = marker.getPosition();
              //mapDiv.val({'lat':latLng.lat(), 'lng':latLng.lng()});
              mapDiv.value=latLng;
              geocodePosition(infowindowContent, infowindow, marker, geocoder, null, latLng);
          });
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
	});
      });
    });
  });
}

function geocodePosition(infowindowContent, infowindow, marker, geocoder, place, latLng) {
	geocoder.geocode({'location': latLng}, function(results, status) {
	    console.log(results);
            if (status !== 'OK') {
              window.alert('Geocoder failed due to: ' + status);
              return;
            }
	    setPopupContent(infowindowContent, place, results);
            infowindow.open(map, marker);
        });

}

function useTitle(listItem) {
	var title = listItem.parentElement.getElementsByTagName('span')[0].innerText;
  var element = document.getElementById('location-name');
  let lastValue = element.value;
  element.value = title;

  let event = new Event('input', { bubbles: true });
  let tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }

  // Dispatch it.
  element.dispatchEvent(event);
}

function setPopupContent(contentDiv, place, results) {
	var html = "<ul class='title-list'>";
	var listItems = []
	if (place)
	  listItems.push(place.name);
	for (var i = 0; i < 3; i++){
	  if (listItems.length == 3)
	    break;
	  listItems.push(results[i].formatted_address);
	}
	for (var i = 0; i < listItems.length; i++){
	  html += "<li> <span class='title'>" + listItems[i] + "</span>"
		  + "<a onclick=useTitle(this) class='use-as-title'>Use as title</a>"
		"</li>"
	}
	html += "</ul>"
	contentDiv.innerHTML = html;
}

window.useTitle = useTitle;
