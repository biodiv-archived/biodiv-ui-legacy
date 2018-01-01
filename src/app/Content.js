import React, {Component} from 'react';
import LeftSidebar from './LeftSidebar';
import  RightSidebar from './RightSidebar';
import ObservationListContainer from '../observation/ObservationListContainer';
import {fetchLanguages} from '../actions/index';
import {fetchUserGroupList} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Content extends Component {

    constructor(){
        super();
    }

    componentDidMount(){
      {this.props?this.props.fetchLanguages():null}
      {this.props?this.props.fetchUserGroupList():null}
    }

    showSidebar(){
        this.setState({
            open:true
        })
    }

    render(){
      console.log("conteeeeeeeeeeeeeeeeeeeeeeeeeent",this.props)
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

function mapStateToProps(state){
return {Languages:state.Languages,UserGroupList:state.UserGroupList,authenticated: state.auth.authenticated};
}

function mapDispatchToProps(dispatch){

return bindActionCreators({fetchLanguages,fetchUserGroupList},dispatch);
}

 export default connect(mapStateToProps,mapDispatchToProps)(Content);
