import React, {Component} from 'react';
import  queryString from 'query-string';
import Collapsible from 'react-collapsible';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import style from './right_sidebar.css';

import TaxonBrowser from '../taxonBrowser/TaxonBrowser';
import SpeciesGroup from '../components/filterPanel/speciesGroup/SpeciesGroup';
import UserGroup from '../userGroup/UserGroup';
import ScientificNameFilter from  '../components/filterPanel/scientificName/ScientificName';
import FlaggedFilter from  '../components/filterPanel/flag/Flag';
import Media_Filter from  '../components/filterPanel/media/Media';
import SearchBar from '../taxonBrowser/SearchBar';
import Year_Filter from  '../components/filterPanel/year/Year';
import Validate_Filter from  '../components/filterPanel/validate/Validate';
import Month_Filter from '../components/filterPanel/month/Month';
import Traits_Filter from  '../traits/Traits';
import UserFilter from  '../user/User';
import MapHolder from 'naksha-react-ui';



class Right extends Component {

constructor(){
  super();
  this.state={
    sGroupOpen:false,
    userGroupOpen:false,
    userOpen:false,
    taxonOpen:false,
    mediaOpen:false,
    flagOpen:false,
    monthOpen:false,
    speciesOpen:false,
    validateOpen:false,
    traitsOpen:false,
    length:null,

  }
}

openFilter(){
  this.props.PublicUrl?this.refs.hide.style.display='none':null
   const newparams = queryString.parse(document.location.search);
   if(newparams.sGroup){
    this.setState({
      sGroupOpen:true
    })
   }
   if(newparams.taxon){
    this.setState({
      taxonOpen:true
    })
   }
   if(newparams.userGroupList){
    this.setState({
      userGroupOpen:true
    })
   }
   if(newparams.user){
    this.setState({
      userOpen:true
    })
   }
   if(newparams.mediaFilter){
    this.setState({
      mediaOpen:true
    })
   }
   if(newparams.isFlagged){
    this.setState({
      flagOpen:true
    })
   }
   if(newparams.months){

    this.setState({
      monthOpen:true
    })
   }
   if(newparams.speciesName){

     this.setState({
       speciesOpen:true
     })
   }
   if(newparams.validate){

     this.setState({
       validateOpen:true
     })
   }
   if(newparams.trait_8 || newparams.trait_9 ||newparams.trait_10 || newparams.trait_11 || newparams.trait_12 || newparams.trait_13 || newparams.trait_15){

     this.setState({
       traitsOpen:true
     })
   }



}
componentDidMount(){
this.openFilter();
}
clearFilter(){
  this.props.history.push(`${this.props.location.pathname}`)
}



render(){

  let FilterCount=this.props.FilterCount.countUrl?this.props.FilterCount.countUrl.split("?")[1]:null;
  let urlObject=queryString.parse(FilterCount);
  let taxonElement = <div><span>Taxon Browser</span> <span className="badge badge-light">{urlObject.taxon?urlObject.taxon.split(",").length:null}</span></div>;

   this.length=0;
  if(urlObject){
    if(urlObject.taxon){
      this.length++;

    }
    if(urlObject.sGroup){
      this.length++;

    }
    if(urlObject.userGroupList){
      this.length++;

    }
    if(urlObject.user){
      this.length++;

    }
    if(urlObject.isFlagged){
      this.length++;

    }
    if(urlObject.speciesName){
      this.length++;

    }
    if(urlObject.mediaFilter){
      this.length++;

    }
    if(urlObject.minDate || urlObject.maxDate){
      this.length++;

    }
    if(urlObject.months){
      this.length++;

    }
    if(urlObject.validate){
      this.length++;

    }
    if(urlObject.trait_8 || urlObject.trait_9 || urlObject.trait_10|| urlObject.trait_11|| urlObject.trait_12|| urlObject.trait_13|| urlObject.trait_15){
      this.length++;

    }


  }

  return (
      <div id="leftSidebar" className="panel panel-success">

        <div className="panel-heading vertical-align">
            <span onClick={this.clearFilter.bind(this)} className="glyphicon glyphicon-filter" title="Filters">Filters</span>
            <span className="badge badge-light">{this.length}</span>
       </div>

        <div className="panel-body" style={{marginRight:'-10px',marginLeft:'-10px'}}>
            <Collapsible open={true} trigger={`Taxon Browser`}>
            <div>
                <TaxonBrowser />
                <SearchBar />
            </div>
            </Collapsible>

            <Collapsible  lazyRender={true} open={this.state.sGroupOpen} trigger={`Species Groups`}>
                <SpeciesGroup />
            </Collapsible>
            <div ref="hide" style={{display:'block'}}>
            <Collapsible lazyRender={true} open={this.state.userGroupOpen} trigger={`User Group`}>
                <UserGroup />
            </Collapsible>
            </div>
            <Collapsible lazyRender={true} open={this.state.speciesOpen} trigger={`Data Validation `}>
                <ScientificNameFilter />
            </Collapsible>

            <Collapsible lazyRender={true} open={this.state.flagOpen} trigger={`Flag `}>
                <FlaggedFilter />
            </Collapsible>

            <Collapsible lazyRender={true} open={this.state.userOpen} trigger={`User `}>
                <UserFilter/>
            </Collapsible>

            <Collapsible lazyRender={true} open={this.state.mediaOpen} trigger={`Media Type`}>
            <Media_Filter />
            </Collapsible>

            <Collapsible lazyRender={true} trigger={`Date`}>
            <Year_Filter />
            </Collapsible>

            <Collapsible lazyRender={true} open={this.state.monthOpen} trigger={`Seasonal`}>
            <Month_Filter />
            </Collapsible>

            <Collapsible lazyRender={true} open={this.state.validateOpen} trigger={`Validation`}>
            <Validate_Filter />
            </Collapsible>

            <Collapsible lazyRender={true} open={this.state.traitsOpen} trigger={`Traits`}>
            <Traits_Filter />
            </Collapsible>
            <div style={{height:'107px'}}></div>
        </div>
    </div>
    )
    }
}
function mapStateToProps(state) {

  return {
    PublicUrl:state.PublicUrl.url,
    groupName:state.PublicUrl.groupName,
    FilterCount:state.FilterCount
  };
}

export default withRouter(connect(mapStateToProps)(Right));
