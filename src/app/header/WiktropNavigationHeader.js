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

class WiktropNavigationHeader extends Component{

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
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">{this.props.LocaleData['default.species.label']}
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href= {`/${this.props.PublicUrl}species/list`}>{this.props.LocaleData['default.speciesPage.label']}</a>
                                    </li>
                                    <li>
                                        { <a href= {`/${this.props.PublicUrl}namelist/index/?taxon=872&parentId=872&classificationId=265799&ranksToFetch=0,1&statusToFetch=ACCEPTED,SYNONYM&positionsToFetch=RAW,WORKING,CLEAN`}>{this.props.LocaleData['default.taxonNamelist.label']}</a>}
                                    </li>
                                    <li>
                                        <a href= {`/${this.props.PublicUrl}trait/list/?max=&offset=0`}>{this.props.LocaleData['default.speciesTrait.label']}</a>
                                    </li>
                                    <li>
                                        <a href= {`/${this.props.PublicUrl}dataTable/list?type=species`}>{this.props.LocaleData['default.speciesDatatables.label']}</a>
                                    </li>

                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">{this.props.LocaleData['default.observation.label']}
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href= {`/${this.props.PublicUrl}observation/list`}>{this.props.LocaleData['default.observation.label']}
                                        </a>
                                    </li>
                                    <li>
                                        <a href= {`/${this.props.PublicUrl}checklist/index`}>{this.props.LocaleData['default.checklist.label']}
                                        </a>
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}datasource/list`}>{this.props.LocaleData['default.datasource.label']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}observation/traits/`}>{this.props.LocaleData['default.observationTraits.label']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}dataTable/list?type=observations`}>{this.props.LocaleData['default.observationDatatables.label']}
                                        </a>}
                                    </li>
                                </ul>
                            </li>
                            <li>
                                {<a href= {`/${this.props.PublicUrl}map`} className="menu-item"  >{this.props.LocaleData['button.maps']}
                                </a>}
                            </li>
                            <li className="dropdown">
                              <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">{this.props.LocaleData['default.document.label']}<span className="caret"></span>
                              </a>
                              <ul className="dropdown-menu" role="menu">
                                <li>
                                {<a href={`/${this.props.PublicUrl}document/list`}  className="menu-item">{this.props.LocaleData['default.document.label']}
                                </a>}
                                </li>
                                <li>
                                {<a href= {`/${this.props.PublicUrl}dataTable/list?type=documents`} className="menu-item"  >{this.props.LocaleData['default.documentDatatables.label']}
                                </a>}
                                </li>
                              </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.props.LocaleData['button.contribute']}<span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}species/contribute`}>{this.props.LocaleData['link.contribute.to']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}observation/create`}>{this.props.LocaleData['link.add.observation']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}observation/bulkCreate`}>  {this.props.LocaleData['title.add.multiple']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}dataTable/create`}>{this.props.LocaleData['link.add.list']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}document/create`}>
                                            {this.props.LocaleData['link.add.document']}</a>}
                                    </li>

                                    <li>
                                            {<a href= {`/${this.props.PublicUrl}dataset/create`}>{this.props.LocaleData['button.create.dataset']}
                                            </a>}
                                    </li>

                                    {
                                      AuthUtils.isAdmin() === true?
                                      (
                                        <li>
                                            {<a href= {`/${this.props.PublicUrl}trait/create`}> {this.props.LocaleData['title.trait.add']}
                                            </a>}
                                        </li>
                                      ):null
                                    }
                                    {
                                      AuthUtils.isAdmin() === true?
                                      (
                                        <li>
                                            {<a href= {`/${this.props.PublicUrl}fact/upload`}>{this.props.LocaleData['title.fact.add']}
                                            </a>}
                                        </li>
                                      ):null
                                    }
                                    {
                                      AuthUtils.isAdmin() === true?
                                      (
                                        <li>
                                            {<a href= {`/${this.props.PublicUrl}dataPackage/create`}>
                                                {this.props.LocaleData['title.dataPackage.add']}</a>}
                                        </li>
                                      ):null
                                    }
                                </ul>
                            </li>
                            <li>
                                {<a href= {`/${this.props.PublicUrl}discussion/list`} className="menu-item"  >{this.props.LocaleData['default.pagetitle.discussions']}
                                </a>}
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">{this.props.LocaleData['default.datasource.label']}<span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                  {this.props.DataSetList.length>0?this.props.DataSetList.map((item)=>{
                                    return (
                                    <li key={item.id}>
                                        {<a href= {`/${this.props.PublicUrl}dataset/list?dataPackage=${item.id}&offset=&view=grid`}>{item.title}
                                        </a>}
                                    </li>
                                  )
                                  }):<div className="loader"></div>}

                                </ul>
                            </li>
                            <li className="dropdown">
                                {<a href=  {`/${this.props.PublicUrl}group/list`} className="dropdown-toggle menu-item" data-toggle="dropdown">{this.props.LocaleData['default.groups.label']}<span className="caret"></span></a>}
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
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">{this.props.LocaleData['default.pages.label']}
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    {
                                        this.state.parents != null ?
                                            this.state.parents.map((item1,index1)=>{
                                                return(
                                                    <li key={index1}>
                                                        <a href= {`/${this.props.PublicUrl}page/${item1.id}`}>{item1.title}</a>
                                                        <ul>
                                                            {
                                                                this.state.children.get(item1.id) != null ?
                                                                    this.state.children.get(item1.id).map((item2,index2)=>{
                                                                        return(
                                                                            <li key={item2.id}>
                                                                                <a href= {`/${this.props.PublicUrl}page/${item2.id}`}>{item2.title}</a>
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
                                <a href="#" className="dropdown-toggle menu-item" data-toggle="dropdown">{this.props.LocaleData['link.moree']}
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}activityFeed/list`}>{this.props.LocaleData['button.activity']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}user/list`}>{this.props.LocaleData['default.members.label']}
                                        </a>}
                                    </li>
                                    <li>
                                        {<a href= {`/${this.props.PublicUrl}chart/show`}>{this.props.LocaleData['button.dashboard']}
                                        </a>}
                                    </li>
                                    <li>
                                        <a href= {`/${this.props.PublicUrl}about`}>{this.props.LocaleData['button.about.us']}
                                        </a>

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
        DataSetList:state.DataSetList,
        LocaleData:state.LocaleData
    };
}


export default withRouter(connect(mapStateToProps,{fetchUserGroupList})(WiktropNavigationHeader));
