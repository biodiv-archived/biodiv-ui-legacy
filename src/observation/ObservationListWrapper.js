import React, {Component} from 'react';
import {connect} from 'react-redux';

import style from './ObservationStyle.css';
import ObservationListView from './ObservationListView';
import ObservationGridView from './ObservationGridView';
import ObservationMapView from './ObservationMapView';
import {fetchObservations} from './ObservationActions';

class ObservationListWrapper extends Component{
    constructor(){
        super();
    }
    render(){
        return(
                <div>
                      {this.props.view===1?<ObservationListView filterUrl={this.props.filterUrl} selectAll={this.props.selectAll} resetSelectAll={this.props.resetSelectAll} uniqueKey={this.props.uniqueKey}  key={this.props.key} /> :
                      this.props.view===2?<ObservationMapView filterUrl={this.props.filterUrl}  /> :
                      this.props.view===0?<ObservationGridView filterUrl={this.props.filterUrl} selectAll={this.props.selectAll} resetSelectAll={this.props.resetSelectAll} objsa={this.props.objs} /> : null}
                </div>
                )
    }
}

function mapStateToProps(state){
    return {Observation:state.Observation};
}
export default connect(mapStateToProps)(ObservationListWrapper);
