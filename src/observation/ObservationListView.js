import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import EllipsisText  from 'react-ellipsis-text';
import Moment from 'react-moment';
import axios from 'axios';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';

import style from './ObservationStyle.css';

import ShowGallery from './imageGallery/ImageShows';
import Tabs from './Tabs';
import {Config} from '../Config';
import UserGroup from '../util/UserGroup';
import SpeciesGroup from '../util/SpeciesGroup';
import {isLoggedIn} from '../components/auth/roles';


class ListComponent extends Component{

constructor(){
  super();
  this.state={
    data:[],
    AllUserGroup:"",
    updateUserGroup:"",
    ObservationId:""
  }

}
getEditUserGroupMethod() {
       let me = this;
           //UserGroup.fetch().then((response)=>{
           UserGroup.list(function(values) {
               me.setState({
                   AllUserGroup:values//response.model.userGroupInstanceList
               });
           });
   }

   showEditGroupList() {
       let me = this;
       //SpeciesGroup.fetch().then((data)=>{
       SpeciesGroup.list(function(values) {
           me.setState({
               data:values
           });
       });
   }

componentDidMount(){
  this.showEditGroupList();
  this.getEditUserGroupMethod()

}

submitUserGroup(id){
   let sid=id+"3";

}
fetchChange(id,event){
  this.setState({
     updateUserGroup:event.target.value,
     ObservationId:id
  })
}

handleEditUserGroupButton(previous_id){

!isLoggedIn()?this.props.history.push("/login"):null;

 let obj = this.state.data.find(x => x.name === this.state.updateUserGroup);
 console.log(obj)
 let url= `${Config.api.ROOT_URL}/api/observation/updateSpeciesGrp?group_id=${obj.id}&prev_group=${previous_id}&observationId=${this.state.ObservationId}`;
let options={
    method:'POST',
    url : url,
    headers :{
      'X-Auth-Token' :localStorage.getItem('token'),
      'X-AppKey'     :"62723036-3f09-41ef-a9d6-87a8afe76f24",
      'Accept'       :"application/json"
    },
    json: 'true'
  }
  axios(options)
      .then((response)=>{

      })
      .catch((response)=>{

      })
}

changeStyle(id){

  let sid1=id+"1";
  let sid2=id+"2"
this.refs[sid1].style.display='none';
this.refs[sid2].style.display='block';
}
changeStyle2(id){

  let sid1=id+"1";
  let sid2=id+"2"
this.refs[sid1].style.display='block';
this.refs[sid2].style.display='none';

}


display(objs,index){
  const imageArray=[];
objs.resource.map((images)=>{
  imageArray.push(images.url);
})

  return (
    <div key= {index} className="container-fluid">
          <div className="row" style={{border:'1px solid #acb3bf',borderRadius: '25px'}}>
                <div className="media">
                  <div className="col-xs-12 col-sm-3">
                    <div className="media-left">
                        <ShowGallery thumbnail={objs.thumbnail} objs={objs} pos={index} objid={objs.id} imageArray={imageArray} noofimages={imageArray.length} />
                    </div>
                  </div>
                  <div className=" col-xs-12 col-sm-9">
                    <div className="media-body">
                      <table className="table table-hover-success pull-right">
                           <tbody>
                            <tr>
                                <td className="col-sm-4"> <span className="glyphicon glyphicon-share-alt" aria-hidden="true">Name</span></td>
                                <td className="col-sm-4" dangerouslySetInnerHTML={{__html:objs.title}}></td>
                                <td  className={` col-sm-2 ${objs.recoVotes.length?objs.recoVotes[0].recommendation.taxonomyDefinition?objs.recoVotes[0].recommendation.taxonomyDefinition.position==="Working"?"showWorking":
                                   objs.recoVotes[0].recommendation.taxonomyDefinition.position==="Clean"?"showClean":
                                   objs.recoVotes[0].recommendation.taxonomyDefinition.position==="Raw"?"showRaw":null:null:null}`} >
                                  {objs.recoVotes.length?objs.recoVotes[0].recommendation.taxonomyDefinition?objs.recoVotes[0].recommendation.taxonomyDefinition.nameStatus:null:null}
                                </td>
                            </tr>
                            <tr>
                              <td className="col-sm-4"> <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Place </td>
                              <td className="col-sm-8"> <EllipsisText text={objs.placeName} length={30} /> </td>
                            </tr>
                          <tr>
                            <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Observed On </td>
                            <td className="col-sm-8"><Moment format=" Do MMMM YYYY">{objs.fromDate }</Moment></td>
                         </tr>
                         <tr>
                           <td className="col-sm-4" > <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Notes </td>
                           <td id ="hatethis" className="col-sm-8" > {Parser(objs.notes?objs.notes:"Not provided")}  </td>
                        </tr>
                      </tbody>
                      </table>
                      <table  className="table table-hover-success ">
                        <tbody>
                          <tr>
                            <td className="col-xs-3 col-sm-6" >
                              <img className="img-circle" src={objs.author.icon} style={{height:'30px',width:'30px',padding:'2px'}} title={objs.author.name} />
                            </td>
                            <td className="col-xs-1 col-sm-1">
                             <span className="glyphicon glyphicon-check" aria-hidden="true" title={`species call: ${objs.recoVotes.length}`}></span>
                            </td>
                            <td className="col-xs-1 col-sm-1"> <span  title={`Submitted On: ${objs.createdOn}` }  className="glyphicon glyphicon-time" aria-hidden="true"></span>  </td>
                            <td className="col-xs-1 col-sm-1"> <span title={`Updated On: ${objs.lastRevised}` } className="glyphicon glyphicon-hourglass" aria-hidden="true"></span> </td>
                            <td className="col-xs-6 col-sm-2">
                                      <div style={{display:"block"}} ref={objs.id+"1"} >
                                        <strong>{objs.group.name}</strong> {"  "}
                                        <button onClick={this.changeStyle.bind(this,objs.id)} className="btn btn-danger btn-xs">
                                         <span className="glyphicon glyphicon-edit"></span>
                                        </button>
                                      </div>
                                      <div  style={{display:"none"}} ref={objs.id+"2"}>
                                        <div className="form-group form-inline">
                                          <select onChange={this.fetchChange.bind(this,objs.id)} ref={objs.id+"3"} defaultValue={objs.group.name}  className="bg-primary form-control-sm" >
                                            {this.state.data?this.state.data.map((item)=>{
                                            return   <option key={item.name}   value={item.name}>{item.name}</option>
                                            }):null}
                                          </select> {" "}
                                            <button className={"btn btn-warning btn-xs"}  onClick={this.changeStyle2.bind(this,objs.id)}> <span className="glyphicon glyphicon-remove-sign"></span></button> {"  "}
                                            <button className={"btn btn-success btn-xs"}  onClick={this.handleEditUserGroupButton.bind(this,objs.group.id)} type="submit"><span className="glyphicon glyphicon-saved"></span></button>
                                        </div>
                                    </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                 </div>
              </div>
            
            </div>

          <br />
        </div>
  )
}

render(){
return(
<div>
    {this.props.objsa.map(this.display.bind(this))}
</div>
)
}
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userData:state.auth.userData
  };
}
export default  withRouter(connect(mapStateToProps)(ListComponent));
