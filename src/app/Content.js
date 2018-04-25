import React, {Component} from 'react';




import LeftSidebar from './LeftSidebar';
import MobileRightSideBar from './MobileRightSidebar';

import  RightSidebar from './RightSidebar';
import ObservationListContainer from '../observation/ObservationListContainer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Footer from './footer/Footer';

class Content extends Component {

    constructor(props){
        super();
        this.state={
          hideSideBar:false
        }
    }
    resize() {
    this.setState({hideSideBar: window.innerWidth <= 760});
}
    componentDidMount(){

      window.addEventListener("resize", this.resize.bind(this));
      this.resize();
    }



    render(){
        return (
                <div>
                    <div className={`col-sm-3 hidden-xs`} id="leftSidebarWrapper">
                        <LeftSidebar />
                    </div>
                    <div className={`col-sm-3 hidden-sm hidden-md hidden-lg`}>
                        {this.state.hideSideBar?<MobileRightSideBar />:null}
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
 export default Content;
