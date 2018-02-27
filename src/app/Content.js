import React, {Component} from 'react';
import LeftSidebar from './LeftSidebar';
import  RightSidebar from './RightSidebar';
import ObservationListContainer from '../observation/ObservationListContainer';
import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Footer from './footer/Footer';

class Content extends Component {

    constructor(props){
        super();
    }

    componentDidMount(){
      // this.props.fetchLanguages()
      // this.props.fetchUserGroupList()
      // this.props.fetchSpeciesGroup()
    }

    showSidebar(){
        this.setState({
            open:true
        })
    }

    render(){
        return (
                <div className="viewContent">
                    <div className={`col-sm-3 hidden-xs`} id="leftSidebarWrapper">
                        <LeftSidebar />
                    </div>
                    <div className="col-xs-12 col-sm-9 pull-right" id="contentColumnWrapper">
                        <div id="contentColumn">
                            <ObservationListContainer />
                            <div id="footerWrapper">
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
                )
    }
}
 export default connect(null,{fetchLanguages,fetchUserGroupList,fetchSpeciesGroup})(Content);
