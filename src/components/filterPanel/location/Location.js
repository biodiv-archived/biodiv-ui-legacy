import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import queryString from "query-string";
import MapGL from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { REACT_APP_MAPBOX_TOKEN, getMapCenterArray } from "../../../Config";

const LocationFilter = () => {
  const [lat, lng] = getMapCenterArray();
  const [polygonControl, setPolygonControl] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 3
  });

  const [data, setData] = useState({
    type: "FeatureCollection",
    features: (() => {
      const { location } = queryString.parse(document.location.search);
      return location
        ? [
            {
              type: "Feature",
              properties: {},
              geometry: {
                coordinates: [
                  location
                    .split(",")
                    .reduce(function(result, value, index, array) {
                      if (index % 2 === 0) {
                        const [_lat, _lng] = array.slice(index, index + 2);
                        result.push([parseFloat(_lat), parseFloat(_lng)]);
                      }
                      return result;
                    }, [])
                ],
                type: "Polygon"
              }
            }
          ]
        : [];
    })()
  });

  useEffect(() => {
    let hasPolygon = false;
    data.features.forEach(feature => {
      if (feature.geometry.type === "Polygon") {
        dispatchEvent(feature.geometry.coordinates.flat().toString());
        hasPolygon = true;
      }
    });
    setPolygonControl(!hasPolygon);
  }, [data]);

  const dispatchEvent = (latlngs = "") => {
    document.dispatchEvent(
      new CustomEvent("location-filter", {
        detail: {
          location: latlngs
        }
      })
    );
  };

  const onDrawDelete = () => {
    setData({
      type: "FeatureCollection",
      features: []
    });
    dispatchEvent();
  };

  return (
    <MapGL
      style={{ width: "100%", height: "360px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      accessToken={REACT_APP_MAPBOX_TOKEN}
      scrollZoom={true}
      onViewportChange={setViewport}
      {...viewport}
    >
      {!polygonControl && (
        <div
          title="Please clear other polygons first"
          className="locationFilterOverlay"
        />
      )}
      <Draw
        data={data}
        boxSelect={false}
        pointControl={false}
        combineFeaturesControl={false}
        uncombineFeaturesControl={false}
        lineStringControl={false}
        polygonControl={true}
        onDrawDelete={onDrawDelete}
        onChange={setData}
      />
    </MapGL>
  );
};

export default withRouter(LocationFilter);
