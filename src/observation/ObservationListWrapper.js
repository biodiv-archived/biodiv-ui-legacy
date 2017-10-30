import React, {Component} from 'react';
import {connect} from 'react-redux';

import style from './ObservationStyle.css';

import ObservationListView from './ObservationListView';
import ObservationGridView from './ObservationGridView';

class ObservationListWrapper extends Component{

    constructor(){
        super();
        this.state={
            count:0
        }
    }

    render(){
        return(
                <div>
                    {
                    this.props.view?<ObservationListView   objsa={this.props.objs} />:<ObservationGridView objsa={this.props.objs} />
                    }
                    {this.props.Observation.count?null :<div style={{height:'600px',width:'660x'}} className="container-fluid">
                        <div className="row">
                            <div className="col-sm-5">
                            </div>
                            <div className={`col-sm-2 loader`}>
                            </div>
                            <div className="col-sm-5">
                            </div>
                        </div>
                    </div>}
                </div>
                )
    }
}


function mapStateToProps(state){
    return {Observation:state.Observation};
}

export default connect(mapStateToProps)(ObservationListWrapper);
