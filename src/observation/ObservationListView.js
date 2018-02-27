import React,{Component} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import EllipsisText  from 'react-ellipsis-text';
import Moment from 'react-moment';
import axios from 'axios';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';


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

    handleEditUserGroupButton(previous_id){


        let obj = this.props.SpeciesGroup.find(x => x.name === this.state.updateUserGroup);
        if(obj) {
            let url= `${Config.api.API_ROOT_URL}/observation/updategroup?newGroupId=${obj.id}&oldGroupId=${previous_id}&objectid=${this.state.ObservationId}`;
            let options={
                method:'POST',
                url : url,
                headers:AuthUtils.getAuthHeaders(),
                json: 'true'
            }

            axios(options)
                .then((response)=>{
                    Object.assign(this.props.item,response.data.document)

                    this.setState({
                        rerun:true
                    })
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

    launchBulk(obvId){
        let _bulkId=this.state.bulkId
        function checkIndex(id){
            return id==obvId
        }
        let index = _bulkId.findIndex(checkIndex)
        if(index<0)
        {
            _bulkId=_bulkId.concat(obvId)
            this.setState({
                bulkId:_bulkId,
            })
        }
        else{
            _bulkId.splice(index,1)
            this.setState({
                bulkId:_bulkId,
            })
        }
        this.setState({
            bulk:true,
        })

    }

    resetBulk(){
        this.setState({
            bulk:false
        })
    }

display(objs,selectAll){
  return (
    <div   className="container-fluid">

          <div className="row" style={{border:'1px solid #acb3bf',borderRadius: '5px',backgroundColor:'white'}}>

                <div className="media">
                  <div style={{padding:'4px'}} className="pull-left">
                    <div  style={{marginLeft:'-10px'}} className="media-left">
                        <ShowGallery thumbnail={objs.thumbnail} objs={objs} objid={objs.id} images={objs.imageresource} />
                        {
                          (AuthUtils.isUserGroupExpert() || AuthUtils.isUserGroupFounder() || AuthUtils.isAdmin())?
                          (
                            selectAll==true?
                            (<input type="checkbox" style={{"top":'-200px',left:'1px',position:'inherit'}} className="checkbox" id={"check1"+objs.id} onChange={this.launchBulk.bind(this,objs.id)} checked={selectAll} disabled/>)
                            :
                            (<input type="checkbox" style={{"top":'-200px',left:'1px',position:'inherit'}} className="checkbox" id={"check1"+objs.id} onChange={this.launchBulk.bind(this,objs.id)}/>)
                          ):null
                        }
                    </div>
                  </div>
                  <div className="">
                    <div className="media-body" >

                            <div className="props">
                                <div className="key"> <span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span> <b>Name</b></div>
                                {/* <td className="col-sm-4" dangerouslySetInnerHTML={{__html:objs.name}}></td> */}
                                <div className="values"><b><i> {objs.name?objs.name:"Unknown"} {objs.name?null: <NavLink to={`/observation/show/${objs.id}`}>Help Identify</NavLink>}</i></b>
                                  <span style={{borderRadius:'5px'}} className={`${objs.position==="WORKING"?"showWorking":
                                   objs.position==="CLEAN"?"showClean":
                                   objs.position==="RAW"?"showRaw":null}`} >
                                   <NavLink to={`/namelist/index?taxon=${objs.taxonconceptid}`}> {"  "}<span style={{color:'#2B2929',textTransform:'capitalize'}}>{objs.status?objs.status.toLowerCase():null}</span></NavLink>
                                  </span>
                                </div>
                            </div>
                            <div className="props">
                              <div className="key"> <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span><b> Place</b> </div>
                              <div className="values" > <Truncate lines={1}>{objs.placename?objs.placename:"Not available"}</Truncate> </div>
                            </div>
                          <div className="props">
                            <div className="key"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span><b> Observed On </b> </div>
                            <div className="values"><Moment format=" Do MMMM YYYY">{objs.fromdate }</Moment></div>
                         </div>
                         <div className="props" style={{height:'30px'}}>
                           <div className="key" > <span className="glyphicon glyphicon-time" aria-hidden="true"></span><b> Notes</b> </div>
                           <div className="values" > <Truncate lines={1} >{(objs.notes?objs.notes:"Not available")}</Truncate>  </div>
                        </div>

                          <div className="">
                            <div className="pull-left" >
                              <NavLink to={`/${this.props.PublicUrl}user/show/${objs.authorid}`}> <UserAvatar  title={objs.authorname} src={objs.authorprofilepic} name={objs.authorname} size="35"  ></UserAvatar>
                              </NavLink>
                            </div>

                            <div className="pull-right groupEdit" >
                              <div style={{display:"block"}} ref={objs.id+"1"} >
                                <strong>{objs.speciesgroupname}</strong> {"  "}
                                <button onClick={this.changeStyle.bind(this,objs.id)} className="btn btn-danger btn-xs">
                                 <span className="glyphicon glyphicon-edit"></span>
                                </button>
                              </div>
                              <div  style={{display:"none"}} ref={objs.id+"2"}>
                                <div className="form-group form-inline">
                                  <select onChange={this.fetchChange.bind(this,objs.id)} ref={objs.id+"3"} defaultValue={objs.speciesgroupname}  className="bg-primary form-control-sm" >
                                    {this.props.SpeciesGroup?this.props.SpeciesGroup.map((item)=>{
                                    return   <option key={item.name}   value={item.name}>{item.name}</option>
                                    }):null}
                                  </select> {" "}
                                    <button className={"btn btn-warning btn-xs"}  onClick={this.changeStyle2.bind(this,objs.id)}> <span className="glyphicon glyphicon-remove-sign"></span></button> {"  "}
                                    <button className={"btn btn-success btn-xs"}  onClick={this.handleEditUserGroupButton.bind(this,objs.speciesgroupid)} type="submit"><span className="glyphicon glyphicon-saved"></span></button>
                                </div>
                            </div>
                            </div>
                            {/* <div className="pull-right speciesCallIcons">
                                <span className="glyphicon glyphicon-check" aria-hidden="true" title={`species call: ${objs.noofidentifications}`}></span>
                                <span  title={`Submitted On: ${objs.createdon}` }  className="glyphicon glyphicon-time" aria-hidden="true"></span>
                                {"  speciesCallIcons"}
                                <span title={`Updated On: ${objs.lastrevised}` } className="glyphicon glyphicon-hourglass" aria-hidden="true"></span>
                            </div> */}
                          </div>

                      </div>
                 </div>
              </div>
                <Tabs objs={objs} />
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
    {(this.state.bulk==true || this.props.selectAll==true)?(<Navigate filterUrl={this.props.filterUrl} ids={this.state.bulkId} selectAll={this.props.selectAll} resetBulk={this.resetBulk.bind(this)} resetSelectAll={this.props.resetSelectAll}/>):null }
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
