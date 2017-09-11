import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class YearFilter extends React.Component {
  constructor(){
    super();
  }

  
  render() {
    return (
      <div >
        
      </div>
    );
  }
}


function mapStateToProps(state){
return {HomeTotalCount:state.HomeTotalCount};
}
export default connect(mapStateToProps)(YearFilter);
