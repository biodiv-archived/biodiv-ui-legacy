import React, {Component} from 'react';
import {connect} from 'react-redux';

import style from './ObservationStyle.css';

import ObservationListView from './ObservationListView';
import ObservationGridView from './ObservationGridView';

class ObservationListWrapper extends Component{
    constructor(){
        super();
    }
    render(){
        return(
                <div>
                    {this.props.view?
                      <ObservationListView filterUrl={this.props.filterUrl} selectAll={this.props.selectAll} resetSelectAll={this.props.resetSelectAll}  objsa={this.props.objs} />
                      :<ObservationGridView objsa={this.props.objs} />}
                </div>
                )
    }
}
function mapStateToProps(state){
    return {Observation:state.Observation};
}
export default connect(mapStateToProps)(ObservationListWrapper);
