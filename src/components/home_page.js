import React from 'react';
import Content from './content';
import axios from 'axios';
import {fetchHomeTotalCount} from '../actions/index';
import {connect} from 'react-redux';
import HomeMainContent from './home_main_content';

class HomeContent extends React.Component {
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
            <HomeMainContent  data={this.props.HomeTotalCount}/>
          </div>
      </div>
    );
  }
}
function mapStateToProps(state){
return {HomeTotalCount:state.HomeTotalCount};
}
export default connect(mapStateToProps,{fetchHomeTotalCount})(HomeContent);
