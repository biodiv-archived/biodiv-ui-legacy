import React, {Component} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {getGroupName} from './HeaderApi';
import _ from "lodash";
import {connect} from 'react-redux';
import axios from 'axios';
import { Form, Text} from 'react-form';

import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages,fetchDataSetList,loadLocale,setLocale} from '../../actions/index';
import AuthUtils from '../../auth/AuthUtils';
import $ from 'jquery';
import {Config} from '../../Config'
//import style from './style/headerstyle.css';
import WiktropBanner from './WiktropBanner';
import {logout} from '../../auth/AuthActions';
import UserAvatar from '../../util/userIcon';

import UserGroupName from '../../util/UserGroup';
import WiktropNavigationHeader from './WiktropNavigationHeader';
import {bindActionCreators} from 'redux';
import Switch from "react-switch";
import en from '../../en.js';
import fr from '../../fr.js';

class WiktropHeader extends React.Component {
    constructor(props) {
        super(props);
        // let language;
        //  if (navigator.languages != undefined){
        //    language =  navigator.languages[0];
        //  } else {
        //    language =  navigator.language;
        //  }
         let checked
         if(sessionStorage.locale==='fr'){
           checked = true
         }else{
           checked = false
         }
         //console.log("checked",checked)
        this.state={
            PublicUrl:this.props.PublicUrl,
            parents:null,
            children:null,
            checked:checked
        }
        //console.log("swithed",this.state.checked)
        this.logout = this.logout.bind(this);
        this.children = new Map();
        this.parents = [];
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.fetchUserGroupList()
        this.props.fetchDataSetList()
        this.props.fetchSpeciesGroup()
        this.props.fetchLanguages()
        this.props.history.listen((location,action)=>{
        if(action=="POP"){
          window.location.reload()
        }
        })
    }

    logout(){
        this.props.logout();
    }
    searchTerm(submittedValues){
      if(submittedValues.query!=null && submittedValues.query!=undefined){
        this.props.history.push(`/search/select?query=${submittedValues.query}`);

      }
    }

    handleChange(checked) {
      //console.log("chchchchcchch",checked);
      if(checked){
          sessionStorage.locale="fr"
          this.props.setLocale("fr")
          this.props.loadLocale(fr)
      }else{
        sessionStorage.locale="en"
        this.props.setLocale("en")
        this.props.loadLocale(en)
      }

        this.setState({ checked });
      }


    render() {

        return (
            <div>
                <nav className="navbar navbar-default navbar-inverse" role="navigation" style={{
                    marginBottom: '0px',
                }}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed pull-right" data-toggle="collapse" data-target="#header_menu" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href={`${Config.api.IBP_URL}?lang=${sessionStorage.locale}`} className="navbar-brand">
                        {this.props.LocaleData['wikwio.portal.abbr']}
                    </a>
                </div>

                <div className="navbar-collapse collapse" id="header_menu">

                    <ul className="nav navbar-nav navbar-right">

                            {
                                AuthUtils.isLoggedIn() ?
                                    (
                                        <li>
                                            <div>
                                                <NavLink to={`/${this.props.PublicUrl}user/show/${AuthUtils.getLoggedInUser().id}?lang=${sessionStorage.locale}`}>
                                                    {
                                                        (AuthUtils.getLoggedInUser().pic) ?
                                                        (
                                                            <UserAvatar  name={AuthUtils.getLoggedInUser().name} title={AuthUtils.getLoggedInUser().name} src={Config.api.ROOT_URL+"/biodiv/users/"+AuthUtils.getLoggedInUser().pic}  size="50" />
                                                        ):
                                                        (
                                                            <UserAvatar  name={AuthUtils.getLoggedInUser().name} title={AuthUtils.getLoggedInUser().name}   size="50" />
                                                        )
                                                    }
                                                </NavLink>
                                            </div>
                                        </li>
                                    ):null
                            }
                            {
                                AuthUtils.isLoggedIn() ? (
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-cog"></i>
                                                <span className="caret"></span>
                                            </a>
                                            <ul className="dropdown-menu" role="menu">
                                                <li>
                                                    <a onClick={this.logout}>Logout</a>
                                                </li>
                                            </ul>
                                        </li>
                                ):null
                            }

                             {
                                !AuthUtils.isLoggedIn() ? (
                                <li>
                                    <NavLink to={`/${this.props.PublicUrl}login?lang=${sessionStorage.locale}`}>Login</NavLink>
                                </li>
                                ):null
                            }
                   </ul>
                   <span className="pull-right" style={{color:'white',marginTop:'12px',fontSize:'16px',marginLeft:'-1.5%',marginRight:'1%'}}><b>FRE</b></span>
                   <div className="pull-right" style={{marginTop:'0.7%',marginRight:'2%'}}>
                       <Switch
                          onChange={this.handleChange}
                          checked={this.state.checked}
                          id="normal-switch"
                          height={20}
                          width={45}
                          offColor="#e6e6e6"
                          onColor="#f5f5f5"
                          offHandleColor="#798a60"
                          onHandleColor="#798a60"
                          handleDiameter={20}
                          checkedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: 15,
                                  color: "orange",
                                  paddingRight: 12
                                }}
                              >
                                <b></b>
                              </div>
                            }
                            uncheckedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: 15,
                                  color: "orange",
                                  paddingLeft:12
                                }}
                              >
                                <b></b>
                              </div>
                            }
                        />
                   </div>
                   <span className="pull-right" style={{color:'white',marginTop:'12px',fontSize:'16px',marginRight:'0.5%'}}><b>ENG</b></span>
                      <Form   onSubmit={this.searchTerm.bind(this)}>
                       {formApi => (
                         <form className="navbar-form navbar-right" onSubmit={formApi.submitForm} >
                           <div className="form-group">
                           <Text className="form-control" field="query" id="query" />
                          </div>

                           <button type="submit" className="btn btn-link glyphicon glyphicon-search">
                           </button>
                         </form>
                       )}
                     </Form>


                </div>

            </nav>
            <WiktropBanner />
            <WiktropNavigationHeader />
        </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        userData: state.auth.userData,
        UserProfile: state.UserProfile,
        UserGroupList:state.UserGroupList,
        PublicUrl:state.PublicUrl.url,
        groupName:state.PublicUrl.groupName,
        LocaleData:state.LocaleData
    };
}

function mapDispatchToProps(dispatch){

return bindActionCreators({fetchDataSetList,logout,fetchLanguages,fetchUserGroupList,fetchSpeciesGroup,loadLocale,setLocale},dispatch);
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WiktropHeader));
