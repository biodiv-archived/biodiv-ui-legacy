import React, {Component} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {getGroupName} from './HeaderApi';
import _ from "lodash";
import {connect} from 'react-redux';
import axios from 'axios';
import { Form, Text} from 'react-form';

import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages} from '../../actions/index';
import AuthUtils from '../../auth/AuthUtils';
import $ from 'jquery';
import {Config} from '../../Config'
import style from './style/headerstyle.css';
import Banner from './Banner';
import {logout} from '../../auth/AuthActions';
import UserAvatar from '../../util/userIcon';

import UserGroupName from '../../util/UserGroup';
import NavigationHeader from './NavigationHeader';

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
        this.props.fetchLanguages()
        this.props.fetchUserGroupList()
        this.props.fetchSpeciesGroup()
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
                <nav className="navbar navbar-default navbar-inverse row" role="navigation" style={{
                    marginBottom: '0px',
                }}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed pull-right" data-toggle="collapse" data-target="#header_menu" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <NavLink to="/" className="navbar-brand">
                        India Biodiversity Portal
                    </NavLink>
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
        groupName:state.PublicUrl.groupName
    };
}


export default withRouter(connect(mapStateToProps,{logout,fetchLanguages,fetchUserGroupList,fetchSpeciesGroup})(Header));
