import React, { Component } from "react";
import { Form, Text } from "react-form";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import { fetchDataSetList, fetchLanguages, fetchSpeciesGroup, fetchUserGroupList } from "../../actions";
import { logout } from "../../auth/AuthActions";
import AuthUtils from "../../auth/AuthUtils";
import { Config } from "../../Config";
import UserAvatar from "../../util/userIcon";
import Banner from "./Banner";
import NavigationHeader from "./NavigationHeader";

//import style from './style/headerstyle.css';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            PublicUrl:this.props.PublicUrl,
            parents:null,
            children:null
        }
        this.logout = this.logout.bind(this);
        this.children = new Map();
        this.parents = [];
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
                    <a href={`${Config.api.IBP_URL}`} className="navbar-brand">
                        India Biodiversity Portal
                    </a>
                </div>

                <div className="navbar-collapse collapse" id="header_menu">

                    <ul className="nav navbar-nav navbar-right">

                            {
                                AuthUtils.isLoggedIn() ?
                                    (
                                        <li>
                                            <div>
                                                <NavLink to={`/${this.props.PublicUrl}user/show/${AuthUtils.getLoggedInUser().id}`}>
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
                                    <NavLink to={`/${this.props.PublicUrl}login`}>Login</NavLink>
                                </li>
                                ):null
                            }
                   </ul>

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
            <Banner />
            <NavigationHeader />
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
    };
}


export default withRouter(connect(mapStateToProps,{fetchDataSetList,logout,fetchLanguages,fetchUserGroupList,fetchSpeciesGroup})(Header));
