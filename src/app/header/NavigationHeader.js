import React,{Component} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {getGroupName} from './HeaderApi';
import _ from "lodash";
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages} from '../../actions/index';
import AuthUtils from '../../auth/AuthUtils';
import {Config} from '../../Config'
//import style from './style/headerstyle.css';
import UserGroupName from '../../util/UserGroup';

class NavigationHeader extends Component{

    constructor(props){
        super(props);
        this.state={
            PublicUrl:this.props.PublicUrl,
            parents:null,
            children:null
        }
        this.children = new Map();
        this.parents = [];
    }

    componentDidMount(){
      let fullUrl = window.location.host;
      let parts=fullUrl.split(".");

        if(this.props.groupName!= "" && this.props.groupName!=undefined){
            let groupName=this.props.PublicUrl.split("/")[1];
            UserGroupName.list().then(data=>{

                let group=data.find((item)=>{
                    return item.webaddress==groupName
                })
                console.log(group);
                this.getNewsLetters(group.id);
            })
        } else {
          if(parts.length>=3){
            if(parts[0]=="assambiodiversity"){
              this.getNewsLetters(4087136);
            }
            if(parts[0]=="treesindia"){
              this.getNewsLetters(18);
            }
            if(parts[0]=="thewesternghats"){
            this.getNewsLetters(1);
            }
          }
          else{
            this.getNewsLetters(null);

          }
        }
    }


    getNewsLetters(ugId){
        var options;
        if(ugId == null){
            options={
                method: 'GET',
                url :   Config.api.API_ROOT_URL+"/newsletters/pages",
                json: 'true'
            }
        }else{
            options={
                method: 'GET',
                url :   Config.api.API_ROOT_URL+"/newsletters/pages",
                params:{
                    userGroupId:ugId
                },
                json: 'true'
            }
        }

        axios(options)
            .then((response)=>{
                if(response.status == 200){
                    var grouped = _.orderBy((_.groupBy(response.data, 'parentId')),['displayOrder'],['desc'])
                    for(var i=0;i<response.data.length;i++){
                        if(response.data[i].parentId == 0){
                            this.parents.push(response.data[i])
                        }else{
                            if(this.children.get(response.data[i].parentId) == null){
                                this.children.set(response.data[i].parentId,[response.data[i]])
                            }else{
                                var array=this.children.get(response.data[i].parentId);
                                array.push(response.data[i])
                                this.children.set(response.data[i].paraentId,array);
                            }
                        }
                    }
                    this.setState({
                        parents:this.parents,
                        children:this.children
                    })
                }
            })
    }


    render(){
        let userGroup=this.props.UserGroupList?this.props.UserGroupList.filter((item)=>{return item.webaddress==this.props.PublicUrl.split("/")[1]})[0]:null;
        //        userGroup = {name:'Assam Biodiversity Portal for invasive species', icon:'/4ad8d75d-7b3b-46bc-bbea-31f6c4ba93be/resources/513.gif'}
        if(true) {
            return(
                <div style={{background:'white'}} className="navbar navbar-default row brand-bar">

                    <div className="navbar-header" >
                        <button type="button" className="navbar-toggle collapsed pull-right" data-toggle="collapse" data-target="#header_menu3" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                    </div>

                    <div className="navbar-collapse collapse" id="header_menu3">

                        <ul className="nav navbar-nav navbar-center">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">Species
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <NavLink to={`/${this.props.PublicUrl}species/list`}>Species Pages</NavLink>
                                    </li>
                                    <li>
                                        { <NavLink to={`/${this.props.PublicUrl}namelist/index/?taxon=872&parentId=872&classificationId=265799&ranksToFetch=0,1&statusToFetch=ACCEPTED,SYNONYM&positionsToFetch=RAW,WORKING,CLEAN`}>Taxon Namelist</NavLink>}
                                    </li>
                                    <li>
                                        <NavLink to={`/${this.props.PublicUrl}trait/list/?max=&offset=0`}>Species Traits</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/${this.props.PublicUrl}dataTable/list?type=species`}>Species Datatables</NavLink>
                                    </li>

                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">Observation
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <NavLink to={`/${this.props.PublicUrl}observation/list`}>Observations
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/${this.props.PublicUrl}checklist/index`}>Checklists
                                        </NavLink>
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}datasource/list`}>Datasets
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}observation/traits/`}>Observation Traits
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}dataTable/list?type=observations`}>Observation Datatables
                                        </NavLink>}
                                    </li>
                                </ul>
                            </li>
                            <li>
                                {<NavLink className="menu-item"  to={`/${this.props.PublicUrl}map`}>Maps
                                </NavLink>}
                            </li>
                            <li className="dropdown">
                              <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">Documents<span className="caret"></span>
                              </a>
                              <ul className="dropdown-menu" role="menu">
                                <li>
                                {<NavLink className="menu-item"  to={`/${this.props.PublicUrl}document/list`}>Documents
                                </NavLink>}
                                </li>
                                <li>
                                {<NavLink className="menu-item"  to={`/${this.props.PublicUrl}dataTable/list?type=documents`}>Document Datatables
                                </NavLink>}
                                </li>
                              </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute<span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}species/contribute`}>Contribute to Species page
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}observation/create`}>Add Observation
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}observation/bulkCreate`}>  Add Multiple Observations
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}dataTable/create`}>Add a list
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}document/create`}>
                                            Add Documents</NavLink>}
                                    </li>

                                    <li>
                                            {<NavLink to={`/${this.props.PublicUrl}dataset/create`}>Add Dataset
                                            </NavLink>}
                                    </li>

                                    {
                                      AuthUtils.isAdmin() === true?
                                      (
                                        <li>
                                            {<NavLink to={`/${this.props.PublicUrl}trait/create`}> Add Trait/Value
                                            </NavLink>}
                                        </li>
                                      ):null
                                    }
                                    {
                                      AuthUtils.isAdmin() === true?
                                      (
                                        <li>
                                            {<NavLink to={`/${this.props.PublicUrl}fact/upload`}>Add Fact
                                            </NavLink>}
                                        </li>
                                      ):null
                                    }
                                    {
                                      AuthUtils.isAdmin() === true?
                                      (
                                        <li>
                                            {<NavLink to={`/${this.props.PublicUrl}dataPackage/create`}>
                                                Add Data Package</NavLink>}
                                        </li>
                                      ):null
                                    }
                                </ul>
                            </li>
                            <li>
                                {<NavLink className="menu-item"  to={`/${this.props.PublicUrl}discussion/list`}>Discussions
                                </NavLink>}
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">Datasets<span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                  {this.props.DataSetList.length>0?this.props.DataSetList.map((item)=>{
                                    return (
                                    <li key={item.id}>
                                        {<NavLink to={`/${this.props.PublicUrl}dataset/list?dataPackage=${item.id}&offset=&view=grid`}>{item.title}
                                        </NavLink>}
                                    </li>
                                  )
                                  }):<div className="loader"></div>}

                                </ul>
                            </li>
                            <li className="dropdown">
                                {<NavLink className="dropdown-toggle menu-item" data-toggle="dropdown" to={`/${this.props.PublicUrl}group/list`}>Groups<span className="caret"></span></NavLink>}
                                <ul className="dropdown-menu pre-scrollable" style={{'height':'auto','width':'200px'}} role="menu">
                                    {this.props.UserGroupList.length>0?
                                      (
                                        <li style={{background:'#294EA7'}}>
                                          <a href={`${Config.api.IBP_URL}/group/list`} ><span style={{textAlign:'center',marginLeft:'55px'}} > {"See All"}</span> </a >
                                        </li>
                                      )
                                      :null}
                                    {this.props.UserGroupList.length>0?this.props.UserGroupList.map((item,index)=>{
                                        return (
                                            <li key={index} style={{'border':'1px'}}>
                                                {item.domainName?<a href={`${item.domainName}`}><img src={`/biodiv/userGroups/${item.icon}`} height="30px" width="30px"/>{item.name}</a>:<a href={`${Config.api.IBP_URL}/group/${item.webaddress}/show`}><img src={`/biodiv/userGroups/${item.icon}`} height="30px" width="30px"/>{item.name}</a>}
                                            </li>
                                        )
                                    }):<div className="loader"></div>}
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">Pages
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    {
                                        this.state.parents != null ?
                                            this.state.parents.map((item1,index1)=>{
                                                return(
                                                    <li key={index1}>
                                                        <NavLink to={`/${this.props.PublicUrl}page/${item1.id}`}>{item1.title}</NavLink>
                                                        <ul>
                                                            {
                                                                this.state.children.get(item1.id) != null ?
                                                                    this.state.children.get(item1.id).map((item2,index2)=>{
                                                                        return(
                                                                            <li key={item2.id}>
                                                                                <NavLink to={`/${this.props.PublicUrl}page/${item2.id}`}>{item2.title}</NavLink>
                                                                            </li>
                                                                        )
                                                                    })
                                                                    :null
                                                            }

                                                        </ul>
                                                    </li>

                                                )
                                            }):null
                                    }
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">More
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}activityFeed/list`}>Activity
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}user/list`}>Participants
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}chart/show`}>Dashboard
                                        </NavLink>}
                                    </li>
                                    <li>
                                        <NavLink to={`/${this.props.PublicUrl}theportal`}>About
                                        </NavLink>

                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>

                </div>
            )
        } else {
            return null;
        }
    }
}
function mapStateToProps(state) {
  console.log(state.DataSetList);
    return {
        authenticated: state.auth.authenticated,
        userData: state.auth.userData,
        UserProfile: state.UserProfile,
        UserGroupList:state.UserGroupList,
        PublicUrl:state.PublicUrl.url,
        groupName:state.PublicUrl.groupName,
        DataSetList:state.DataSetList
    };
}


export default withRouter(connect(mapStateToProps,{fetchUserGroupList})(NavigationHeader));
