import React, {Component} from 'react';
import LeftSidebar from './LeftSidebar';
import  RightSidebar from './RightSidebar';
import ObservationListContainer from '../observation/ObservationListContainer';

class Content extends Component {

    constructor(){
        super();
    }

    showSidebar(){
        this.setState({
            open:true
        })
    }

    render(){
        return (
                <div>
                    <div className={`col-sm-3 hidden-xs`}>
                        <LeftSidebar />
                    </div>
                    <div  style={{backgroundColor:'#EEF9FC'}}  className="col-xs-12 col-sm-9 ">
                        <ObservationListContainer />
                    </div>
                </div>
                )
    }
}

export default Content;

