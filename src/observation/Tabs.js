import React, {Component} from 'react';
import RecoName from './RecoName.js'
import CustomFields from './CustomFields.js'
import Groups from '../userGroup/Groups.js'
import Traits from '../traits/TraitsObv.js'
import CommentsFeeds from '../activityFeed/CommentsFeeds.js'
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Tabs extends React.Component {
  constructor(props){
    super(props);
    this.state={
      Traitflag:0,
      Customflag:0,
      Groupsflag:0,
      ActivityFlag:0,
    }
  }

  setTrait(){
  this.setState({Traitflag:1});
  }

  setCustom(){
  this.setState({Customflag:1});
  }

  setGroup(){
  this.setState({Groupsflag:1});
  }

  setActivity(){
    this.setState({ActivityFlag:1})
  }

  render(){
    return(
<div>
            <ul className="nav nav-tabs">
                <li className="active"><a href={"#"+this.props.objs.id+"_tab1"} data-toggle="tab">Suggest id</a></li>
                <li><a href={"#"+this.props.objs.id+"_tab2"} data-toggle="tab" onClick={this.setGroup.bind(this)}>Groups</a></li>
                <li><a  href={"#"+this.props.objs.id+"_tab3"}  data-toggle="tab" data-tab-url={"#"+this.props.objs.id+"_tab3"} onClick={this.setTrait.bind(this)} >Traits</a></li>
                <li><a href={"#"+this.props.objs.id+"_tab4"} data-toggle="tab" onClick={this.setCustom.bind(this)} >Custom fields</a></li>
                <li><a href={"#"+this.props.objs.id+"_tab5"} data-toggle="tab" onClick={this.setActivity.bind(this)}>Comments</a></li>
            </ul>

               <div className="tab-content">
                  <div className="tab-pane fade in active" id={this.props.objs.id+"_tab1"}>
                        <div>
                          {
                            (this.props.Recommendations && Object.keys(this.props.Recommendations).length>0 && this.props.Recommendations[this.props.objs.id] != null)?<RecoName id={this.props.objs.id} islocked={this.props.objs.islocked} recos={this.props.Recommendations[this.props.objs.id]}/>:null
                          }
                        </div>
                  </div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab2"}>{this.state.Groupsflag===1?<Groups id={this.props.objs.id}/>:null}</div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab3"}>{this.state.Traitflag===1?<Traits id={this.props.objs.id} sGroup={this.props.objs.group.id} owner={this.props.objs.author.id}/>:null}</div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab4"}>{this.state.Customflag===1?<CustomFields id={this.props.objs.id}/>:null}</div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab5"}>{this.state.ActivityFlag==1?<CommentsFeeds id={this.props.objs.id}/>:null}</div>
               </div>
             </div>


    )
  }
}
function mapStateToProps(state){
return {
  Recommendations:state.Recommendations
};
}
export default  withRouter(connect(mapStateToProps, null)(Tabs));
