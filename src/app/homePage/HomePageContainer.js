import React from 'react';
import {fetchHomeTotalCount} from './HomePageActions';
import {connect} from 'react-redux';
import HomePage from './HomePage';

class HomePageContainer extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.fetchHomeTotalCount();
    }
    render() {
        return (
                <div className="container-fluid">
                <div>
                <HomePage  data={this.props.HomeTotalCount}/>
                </div>
                </div>
               );
    }
}
function mapStateToProps(state){
    return {HomeTotalCount:state.HomeTotalCount};
}
export default connect(mapStateToProps,{fetchHomeTotalCount})(HomePageContainer);
