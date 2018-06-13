import React,{Component} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import EllipsisText  from 'react-ellipsis-text';
import Moment from 'react-moment';
import axios from 'axios';
import { connect } from 'react-redux';
import isAbsoluteUrl  from 'is-absolute-url';
import Truncate from 'react-truncate';

import createHistory from 'history/createBrowserHistory';
import style from './ObservationStyle.css';
import ShowGallery from './imageGallery/ImageShows';
import Tabs from './Tabs';
import {Config} from '../Config';
import UserGroup from '../util/UserGroup';
import Navigate from '../bulk/Navigation.js'
import AuthUtils from '../auth/AuthUtils.js';
import ModalPopup from '../auth/Modal.js';
import UserAvatar from '../util/userIcon';

const history = createHistory();

function getList(Observation,id,flag) {
    if(flag){
        let item=Observation.filter((item)=>item.id==id)[0];
        return item
    }
    else{
        return Observation;
    }

}
class ListComponent extends Component{

    constructor(){
        super();
        this.state={
            AllUserGroup:"",
            updateUserGroup:"",
            ObservationId:"",
            bulk:false,
            bulkId:[],
            flag:false,
            login_modal:false,
            rerun:false
        }
        this.ObvRenderAgain = this.ObvRenderAgain.bind(this);
        this.getObsAgain = this.getObsAgain.bind(this);
    }

    componentDidMount(){
        this.setState({
            flag:true
        })

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

    handleEditUserGroupButton(){
        let obj = this.props.SpeciesGroup.find(x => x.name === this.state.updateUserGroup);
        if(obj) {
            let url= `${Config.api.API_ROOT_URL}/observation/updategroup?newGroupId=${obj.id}&objectIds=${this.state.ObservationId.toString()}`;
            let options={
                method:'POST',
                url : url,
                headers:AuthUtils.getAuthHeaders(),
                json: 'true'
            }

            axios(options)
                .then((response)=>{
                  this.getObsAgain(this.state.ObservationId)

                    let sid2=this.props.item.id+"2";
                    let sid1=this.props.item.id+"1";

                    this.refs[sid2].style.display='none';
                    this.refs[sid1].style.display='block';
                })
                .catch((error)=>{
                    if(error.response.status === 401){
                        this.setState({
                            login_modal:!(this.state.login_modal),
                            options:options
                        })
                    } else {
                        console.log(error.response);
                    }
                })
        }
    }

    ObvRenderAgain(response){
      //console.log("called from tabs")
      Object.assign(this.props.item,response.data.document)
      this.setState({
          rerun:!this.state.rerun
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



    launch(id){
      this.props.launchBulk(id);
    }

    getUserPhotoUrl(images){
        if(images){
          if(isAbsoluteUrl(images)){
            return images;
          }
          else{
            let url=`${Config.api.IBP_URL}/biodiv/users${images}`;
            return url;
          }
        }
        else{
          return null;
        }
    }

    getObsAgain(obvId){
      document.body.style.cursor = "wait";
      var options={
        method:"GET",
        url:Config.api.API_ROOT_URL +"/naksha/search/observation/observation/"+obvId,
        headers :AuthUtils.getAuthHeaders(),
        json: 'true'
      }
      axios(options)
          .then((response)=>{
            document.body.style.cursor = "default";
            this.ObvRenderAgain(response);
          })
    }

display(objs,selectAll){
  let imageUrl="https://indiabiodiversity.org/biodiv/group_icons/speciesGroups/birds_th1.png"

  return (
    <div   className="container-fluid">

                  <div className="row" style={{border:'1px solid #acb3bf',borderRadius: '5px',backgroundColor:'white'}}>

                      <div className="media">
                            <div style={{padding:'4px',position:'relative'}} className="pull-left">
                              <div  style={{marginLeft:'-10px'}} className="media-left">
                                  <ShowGallery authorid={objs.authorid} authorname={objs.authorname} authorprofilepic={objs.authorprofilepic} thumbnail={objs.thumbnail} speciesgroupname={objs.speciesgroupname} objs={objs} objid={objs.id} images={objs.imageresource} videos={objs.urlresource}/>
                                  {
                                     (AuthUtils.isUserGroupExpert() || AuthUtils.isUserGroupFounder() || AuthUtils.isAdmin())?
                                    (
                                      selectAll===true?
                                      (<span className="glyphicon glyphicon-check" id={"checkselectAll"+objs.id} ></span>)
                                      :
                                      (<input type="checkbox" name="selectAllFalse" value="selectAllFalse" style={{top:'4px', left:'7px',position:'absolute'}} className="checkbox" id={"check1SelectAll"+objs.id} onChange={this.launch.bind(this,objs.id)} defaultChecked={false} />)
                                    ):null
                                  }
                              </div>
                            </div>
                              <div className="media-body" >

                                <div className="props">
                                  <div className="pull-right groupEdit" >
                                    <div style={{display:"block"}} ref={objs.id+"1"} >
                                      <button title={objs.speciesgroupname} className={`btn species_groups_sprites ${objs.speciesgroupname.toLowerCase()}_gall_th `}>  </button> {"  "}
                                      <button onClick={this.changeStyle.bind(this,objs.id)} className="btn btn-danger btn-xs">
                                       <span className="glyphicon glyphicon-edit"></span>
                                      </button>
                                    </div>
                                    <div  style={{display:"none"}} ref={objs.id+"2"}>
                                      <div className="form-group form-inline">
                                        <select  onChange={this.fetchChange.bind(this,objs.id)} ref={objs.id+"3"} defaultValue={objs.speciesgroupname}  className="form-control" >
                                          {this.props.SpeciesGroup?this.props.SpeciesGroup.map((item)=>{
                                          return   <option key={item.name}  style={{backgroundImage: 'url('+ imageUrl + ') noRepeat center center fixed',backgroundSize: '15px 150px'}} value={item.name}> {item.name}</option>
                                          }):null}
                                        </select> {" "}
                                          <button className={"btn btn-warning btn-xs"}  onClick={this.changeStyle2.bind(this,objs.id)}> <span className="glyphicon glyphicon-remove-sign"></span></button> {"  "}
                                          <button className={"btn btn-success btn-xs"}  onClick={this.handleEditUserGroupButton.bind(this)} type="submit"><span className="glyphicon glyphicon-saved"></span></button>
                                      </div>
                                  </div>
                                  </div>
                                </div>


                                  <div className="props"><b><i> {objs.name?objs.name:"Unknown"} {objs.name?null: <NavLink to={`/observation/show/${objs.id}`}>Help Identify</NavLink>}</i></b>
                                    <span style={{borderRadius:'5px'}} className={`${objs.position==="WORKING"?"showWorking":
                                     objs.position==="CLEAN"?"showClean":
                                     objs.position==="RAW"?"showRaw":null}`} >
                                     <NavLink to={`/namelist/index?taxon=${objs.taxonconceptid}`}> {"  "}<span style={{color:'#2B2929',textTransform:'capitalize'}}>{objs.status?objs.status.toLowerCase():null}</span></NavLink>
                                    </span>
                                   </div>

                                 <div className="props" >
                                   <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> <Truncate lines={1}>{objs.placename?objs.placename:"Not available"}</Truncate>
                                 </div>

                                <div className="props">
                                  <div className=""><strong>Observed On </strong>  <Moment format=" MMMM DD  YYYY">{objs.fromdate }</Moment> </div>
                                </div>
                             <div className="props">
                               <div className="" > <b> Notes</b> <Truncate lines={1}> <span style={{wordWrap:'break-word'}}  dangerouslySetInnerHTML={{ __html: objs.notes?objs.notes:"Not available"}} /></Truncate>  </div>
                            </div>
                      </div>
                  </div>
                <Tabs rerun={this.state.rerun} objs={objs} ObvRenderAgain={this.ObvRenderAgain}/>
                <br />
            </div>
            <br />
        </div>
  )

}

render(){
return(
<div>
    {this.state.login_modal===true?(<ModalPopup key={this.state.options} options={this.state.options} />):null}
    {/*(this.state.bulk==true || this.props.selectAll==true)?(<Navigate filterUrl={this.props.filterUrl} ids={this.state.bulkId} selectAll={this.props.selectAll} resetBulk={this.resetBulk.bind(this)} resetSelectAll={this.props.resetSelectAll}/>):null */}
    {this.display(this.props.item,this.props.selectAll)}
</div>
)
}
}


function mapStateToProps(state,ownProps) {

  return {
    authenticated: state.auth.authenticated,
    userData:state.auth.userData,
    PublicUrl:state.PublicUrl.url,
    SpeciesGroup:state.SpeciesGroup,
    item:getList(state.Observation.all,ownProps.uniqueKey,true)
  };
}

export default withRouter(connect(mapStateToProps)(ListComponent));
