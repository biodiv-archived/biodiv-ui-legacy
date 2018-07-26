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
import RichTextEditor from '../util/richEditor/RichTextEditor.js';
import FlaggingInterface from '../util/flag/FlaggingInterface';
import ShareInterface from '../util/share/ShareInterface';

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
            rerun:false,
            allUsersWhoLiked:null,
            mountFlagComponent:false
        }
        this.ObvRenderAgain = this.ObvRenderAgain.bind(this);
        this.getObsAgain = this.getObsAgain.bind(this);
        this.closeFlagDropDown = this.closeFlagDropDown.bind(this);
        this.includesOrNot = this.includesOrNot.bind(this);
        this.goToCommentsTab = this.goToCommentsTab.bind(this)
    }

    componentDidMount(){
        this.setState({
            flag:true
        })
        //var flagdrp = "flagDropdown"+this.props.item.id;
        //console.log("flagdrp",flagdrp);
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

    getObsAgain(obvid){
      var obvId=this.props.item.id;
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

    fetchUsersWhoLiked(obvId,likes){
      //document.body.style.cursor = "wait";
      var options={
        method:"GET",
        url:Config.api.API_ROOT_URL +"/observation/findWhoLiked",
        params:{
          obvId:obvId
        },
        headers :AuthUtils.getAuthHeaders(),
        json: 'true'
      }
      if(this.state.allUsersWhoLiked!==null){
        //document.body.style.cursor = "default";
      }else{
        // axios(options)
        //     .then((response)=>{
        //       if(response.status===200){
        //         document.body.style.cursor = "default";
        //         this.setState({
        //           allUsersWhoLiked:response.data
        //         })
        //       }
        //     })
        // this.setState({
        //   allUsersWhoLiked:likes
        // })
      }
    }

    fetchFlags(id){
      var drp = "flagDropdown"+id
      this.refs[drp].classList.toggle('open')
      this.setState({
        mountFlagComponent:true
      })
    }
    closeFlagDropDown(id){

      var drp = "flagDropdown"+id
      this.refs[drp].classList.toggle('open')
    }

    likeObv(id,objslikes){
      var action = "rate"
      if(AuthUtils.isLoggedIn() && this.includesOrNot(objslikes,AuthUtils.getLoggedInUser().id)){
        action = "unrate"
      }

      var options={
        method:"POST",
        url:Config.api.ROOT_URL +"/rating/"+action+"/"+id,
        params:{
          rating:1,
          type:'observation'
        },
        headers :AuthUtils.getAuthHeaders(),
        json: 'true'
      }

      axios(options)
          .then((response)=>{
            if(response.status===200){
              document.body.style.cursor = "default";
              this.getObsAgain(id)
            }
          })
          .catch((error)=>{
            document.body.style.cursor = "default";
            if(error.response.status === 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })
          }else{
            console.log(error)
          }
          })

    }

 includesOrNot(arrayOfObj,id){
   if(arrayOfObj){
     var obj = arrayOfObj.find(function (obj) { return obj.rater_id.toString() === id; });
     if(obj) return true
     else return false
   }else{
     return false
   }

 }

 goToCommentsTab(){
  //  console.log("goToCommentsTab")
  //  console.log("child",)
   this.child.wrappedInstance.switchToCommentsTab()
 }

display(objs,selectAll){
  let imageUrl="https://indiabiodiversity.org/biodiv/group_icons/speciesGroups/birds_th1.png"

  return (
    <div   className="container-fluid">

                  <div className="row" style={{border:'1px solid #acb3bf',borderRadius: '5px',backgroundColor:'white'}}>

                      <div className="media col-md-4 col-xl-3" >
                            <div style={{position:'relative'}} className="pull-left">
                                <div  style={{marginLeft:'-10px'}} className="media-left">
                                    <ShowGallery authorid={objs.authorid} authorname={objs.authorname} authorprofilepic={objs.authorprofilepic} thumbnail={objs.thumbnail} speciesgroupname={objs.speciesgroupname} objs={objs} objid={objs.id} images={objs.imageresource} videos={objs.urlresource}/>
                                    {
                                       (AuthUtils.isUserGroupExpert() || AuthUtils.isUserGroupFounder() || AuthUtils.isAdmin())?
                                      (
                                        selectAll===true?
                                        (<span className="glyphicon glyphicon-check" id={"checkselectAll"+objs.id} ></span>)
                                        :
                                        (<input type="checkbox" name="selectAllFalse" value="selectAllFalse" style={{top:'6px', left:'3px',position:'absolute'}} className="checkbox" id={"check1SelectAll"+objs.id} onChange={this.launch.bind(this,objs.id)} defaultChecked={false} />)
                                      ):null
                                    }

                                 </div>

                            </div>
                        </div>

                        <div className="col-md-8 col-xl-9" >
                                <div  className="row" style={{marginLeft:'2%'}} >
                                      <div className="userPosition" style={{top:'25px',left:'-80px',position:'absolute'}}>
                                       <UserAvatar   title={objs.authorname} src={this.getUserPhotoUrl(objs.authorprofilepic)} name={objs.authorname} size="70"  ></UserAvatar>
                                      </div>

                                      <div className="obv-info-md">
                                        <div className="props pull-right">
                                          <div className=" groupEdit" >
                                              <div style={{display:"block"}} ref={objs.id+"1"} >
                                                <button title={objs.speciesgroupname} className={`btn species_groups_sprites ${objs.speciesgroupname.toLowerCase()}_gall_th `}>  </button> {"  "}
                                                <button onClick={this.changeStyle.bind(this,objs.id)} className="btn btn-primary btn-xs">
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

                                        <div className="props" style={{marginTop:'4px'}}>
                                            <span style={{fontSize:'15px'}}>
                                                <strong>
                                                  <i>
                                                   {objs.name?objs.name:"Unknown"} {objs.name?null: <NavLink to={`/observation/show/${objs.id}`}>Help Identify</NavLink>}
                                                 </i>
                                               </strong>
                                            </span>
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
                                          <div className=""> <span className="glyphicon glyphicon-time" aria-hidden="true"></span>  <Moment format=" MMMM DD  YYYY">{objs.fromdate }</Moment>  </div>
                                        </div>

                                       <div className="props">
                                         <div className="" > {objs.notes?<span><span className="glyphicon glyphicon-book" aria-hidden="true"></span> <Truncate lines={1}> <span style={{wordWrap:'break-word'}}  dangerouslySetInnerHTML={{ __html: objs.notes?objs.notes:"Not available"}} /></Truncate></span>:<br />}  </div>
                                       </div>
                                     </div>
                                 </div>

                                 <div className="row" style={{marginTop:'3%'}}>
                                    <Tabs  ref={instance => { this.child = instance; }}  rerun={this.state.rerun} objs={objs} ObvRenderAgain={this.ObvRenderAgain}/>
                                 </div>

                        </div>

                        <div className="row" style={{margin:'1%'}}>
                          <div className="col-sm-4">
                            <div className="row" style={{marginLeft:'1%'}}>
                              <div className="col-xs-4 dropdown" style={{paddingRight:'3px'}}>

                                  <a className={AuthUtils.isLoggedIn()? (objs.observationlikes?(this.includesOrNot(objs.observationlikes,AuthUtils.getLoggedInUser().id)?"fa fa-thumbs-up":"fa fa-thumbs-o-up"):"fa fa-thumbs-o-up"):"fa fa-thumbs-o-up"} onClick={this.likeObv.bind(this,objs.id,objs.observationlikes)}></a>
                                  {
                                    objs.observationlikes!==null && objs.observationlikes.length>0?(
                                      <span className="btn btn-xs dropdown-toggle" type="button" data-toggle="dropdown" style={{fontSize:'16px'}} onClick={this.fetchUsersWhoLiked.bind(this,objs.id,objs.observationlikes)}>{objs.observationlikes.length}</span>
                                    ):null
                                  }


                                <div className="dropdown-menu" style={{backgroundColor:'#bcdae2',borderRadius:'4px',minWidth:'200px'}} >
                                  {
                                    objs.observationlikes!==null?
                                    (

                                        objs.observationlikes.map((item,index)=>{
                                          return(
                                            <li key={index}>
                                              <NavLink to={`/${this.props.PublicUrl}user/show/${item.rater_id}`}>{item.name}</NavLink>
                                            </li>
                                          )
                                        })

                                  ):null
                                  }
                                </div>
                              </div>
                              <div className="col-xs-4 dropdown">
                                <a className="glyphicon glyphicon-share dropdown-toggle" data-toggle="dropdown"></a>
                                <div className="dropdown-menu" style={{borderRadius:'4px',minWidth:'200px',backgroundColor:'#e9f0d8'}}>
                                    <ShareInterface title={objs.name} obvId={objs.id} obvImage={objs.imageresource[0]}/>
                                </div>
                              </div>
                              <div className="col-xs-4 dropdown" ref={"flagDropdown"+objs.id} id={"flagDropdown"+objs.id}>
                                <a className={objs.flagcount>0?"glyphicon glyphicon-flag dropdown-toggle flagged":"glyphicon glyphicon-flag dropdown-toggle"}  onClick={this.fetchFlags.bind(this,objs.id)}></a>
                                <div className="dropdown-menu dropFlag" style={{borderRadius:'4px',minWidth:'600px'}} >
                                    {
                                      this.state.mountFlagComponent===true?
                                      (
                                        <FlaggingInterface type={"observation"} id={objs.id} getObsAgain={this.getObsAgain} closeFlagDropDown={this.closeFlagDropDown}/>
                                      ):null
                                    }
                                </div>
                              </div>
                              <div className="col-xs-0">
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-1" >
                            <span  style={{textAlign:'center',fontSize:'12px',color:'#333',fontWeight:'bold',marginTop:'50%',marginLeft:'0px'}}>Comment:</span>
                          </div>
                          <div className="col-sm-6 col-md-7">
                            <RichTextEditor goToCommentsTab={this.goToCommentsTab} style={{width:'100%'}} chId={objs.id} obvId={objs.id}/>
                          </div>
                        </div>
                 </div>

            <br/>
    </div>

  )

}

render(){
return(
<div>
    {this.state.login_modal===true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getObsAgain} id={this.props.item.id}/>):null}
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
