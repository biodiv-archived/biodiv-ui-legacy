import React,{Component} from 'react';

import {NavLink,withRouter} from 'react-router-dom';
import {getGroupName} from './HeaderApi';
import _ from "lodash";
import {connect} from 'react-redux';
import axios from 'axios';


import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages} from '../../actions/index';
import AuthUtils from '../../auth/AuthUtils';
import {Config} from '../../Config'
import style from './style/headerstyle.css';

import UserGroupName from '../../util/UserGroup';




class Banner extends Component{

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
        if(this.props.PublicUrl.groupName!= "" && this.props.PublicUrl.groupName!=undefined){
            // console.log(this.props.PublicUrl.groupName);

            let groupName=this.props.PublicUrl.split("/")[1];
            UserGroupName.list().then(data=>{

                let group=data.model.userGroupInstanceList.find((item)=>{
                    return item.webaddress==groupName
                })
                this.getNewsLetters(group.id);
            })
        } else {
            this.getNewsLetters(null);
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
        let userGroup=this.props.userGroupList?this.props.userGroupList.filter((item)=>{return item.webaddress==this.props.groupName})[0]:null;
        //        userGroup = {name:'Assam Biodiversity Portal for invasive species', icon:'/4ad8d75d-7b3b-46bc-bbea-31f6c4ba93be/resources/513.gif'}
        if(true) {
            return(
                <div className="navbar navbar-default row brand-bar">

                    <div className="navbar-header">
                        <button type="button" class="navbar-toggle collapsed pull-right" data-toggle="collapse" data-target="#header_menu2" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <NavLink to="/">
                            <img className="logo pull-left"  src={userGroup?"http://indiabiodiversity.org/biodiv/userGroups/"+userGroup.icon:"http://indiabiodiversity.org/logo/IBP.png"}></img>
                        </NavLink>

                        <NavLink to="/" className="navbar-brand" style={{padding:'0px'}}>
                            <h3>{userGroup?userGroup.name:'India Biodiversity Portal'}</h3>
                        </NavLink>
                    </div>

                    <div className="navbar-collapse collapse" id="header_menu2">

                        <ul className="nav navbar-nav navbar-right">
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
                                        {<NavLink to={`/${this.props.PublicUrl}dataTable/list?type=observations`}>Observation Datatables
                                        </NavLink>}
                                    </li>
                                </ul>
                            </li>
                            <li>
                                {<NavLink className="menu-item"  to={`/${this.props.PublicUrl}map`}>Maps
                                </NavLink>}
                            </li>
                            <li>
                                {<NavLink className="menu-item"  to={`/${this.props.PublicUrl}document/list`}>Documents
                                </NavLink>}

                            </li>
                            <li>
                                {<NavLink className="menu-item"  to={`/${this.props.PublicUrl}discussion/list`}>Discussions
                                </NavLink>}
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">Datasets<span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}dataset/list?dataPackage=5136151&offset=&view=grid`}>Generic Biodiversity Datasets
                                        </NavLink>}
                                    </li>
                                    <li>
                                        {<NavLink to={`/${this.props.PublicUrl}dataset/list?dataPackage=5168239&offset=&view=grid`}>{"People's Biodiversity Registers"}
                                        </NavLink>}
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                {<NavLink className="dropdown-toggle menu-item" data-toggle="dropdown" to={`/${this.props.PublicUrl}group/list`}>Groups<span className="caret"></span></NavLink>}
                                <ul className="dropdown-menu pre-scrollable" style={{'height':'500px','width':'200px'}} role="menu">

                                    {this.props.UserGroupList?this.props.UserGroupList.map((item,index)=>{
                                        return (
                                            <div key={index} style={{'border':'1px'}}>
                                                <NavLink to={`/group/${item.webaddress}/show`}><li><img src={`/biodiv/userGroups/${item.icon}`} height="30px" width="30px"/>{item.name}</li> </NavLink >
                                            </div>
                                        )
                                    }):"Loading...."}
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">Pages
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu"  style={{'width':'200px',border:'1px solid grey'}}>
                                    {
                                        this.state.parents !=null?
                                        (
                                            this.state.parents.map((item1,index1)=>{
                                                return(
                                                    <div key={index1} >
                                                        <div style={{textDecoration: 'underline'}}>
                                                            <li style={{"marginBottom":'5px',"marginTop":'5px',borderRadius:'1px'}} key={index1} ><NavLink to={`/${this.props.PublicUrl}page/${item1.id}`}><b>{item1.title.toUpperCase()}</b></NavLink></li>
                                                        </div>
                                                        {
                                                            (this.state.children.get(item1.id) != null)?
                                                                (
                                                                    this.state.children.get(item1.id).map((item2,index2)=>{
                                                                        return(
                                                                            <div key={item2.id}>
                                                                                <li  ><NavLink to={`/${this.props.PublicUrl}page/${item2.id}`}>{item2.title}</NavLink></li>
                                                                            </div>
                                                                        )

                                                                    })
                                                                ):null
                                                        }
                                                    </div>
                                                )
                                            })
                                        ):null
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
    return {
        authenticated: state.auth.authenticated,
        userData: state.auth.userData,
        UserProfile: state.UserProfile,
        UserGroupList:state.UserGroupList,
        PublicUrl:state.PublicUrl.url,
        groupName:state.PublicUrl.groupName
    };
}


export default withRouter(connect(mapStateToProps,{fetchUserGroupList})(Banner));
