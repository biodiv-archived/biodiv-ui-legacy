import React, { Component } from "react";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import LoadingComponent from "../loadingComponent";
// import ObservationGridView from "./ObservationGridView";
import ObservationListView from "./ObservationListView";

// ---Dynamic Imports---
const ObservationMapView = Loadable({
  loader: () => import("./ObservationMapView"),
  loading: LoadingComponent
});

const ObservationGridView = Loadable({
  loader: () => import("./ObservationGridView"),
  loading: LoadingComponent
});

class ObservationListWrapper extends Component {
  render() {
    return (
      <div>
        {this.props.view === "list" ? (
          <ObservationListView
            filterUrl={this.props.filterUrl}
            selectAll={this.props.selectAll}
            resetSelectAll={this.props.resetSelectAll}
            uniqueKey={this.props.uniqueKey}
            key={this.props.key}
            launchBulk={this.props.launchBulk}
          />
        ) : this.props.view === "map" ? (
          <ObservationMapView filterUrl={this.props.filterUrl} />
        ) : this.props.view === "grid" ? (
          <ObservationGridView
            filterUrl={this.props.filterUrl}
            selectAll={this.props.selectAll}
            resetSelectAll={this.props.resetSelectAll}
            objsa={this.props.objs}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { Observation: state.Observation };
}
export default connect(mapStateToProps)(ObservationListWrapper);
