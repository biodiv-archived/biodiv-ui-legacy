import React, {Component} from 'react';
import  queryString from 'query-string';
import Collapsible from 'react-collapsible';
import {withRouter,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import style from './right_sidebar.css';
import TaxonBrowser from '../taxonBrowser/TaxonBrowser';
import SpeciesGroup from '../components/filterPanel/speciesGroup/SpeciesGroup';
import UserGroup from '../userGroup/UserGroup';
import ScientificNameFilter from  '../components/filterPanel/scientificName/ScientificName';
import FlaggedFilter from  '../components/filterPanel/flag/Flag';
import Media from  '../components/filterPanel/media/Media';
import SearchBar from '../taxonBrowser/SearchBar';
import ObservedOn from  '../components/filterPanel/observedOn/ObservedOn';
import CreatedOn from  '../components/filterPanel/createdOn/CreatedOn';

import Validate_Filter from  '../components/filterPanel/validate/Validate';
import Month_Filter from '../components/filterPanel/month/Month';
import Traits_Filter from  '../traits/Traits';
import UserFilter from  '../user/User';

import CustomFields from '../customFields/CustomFields';


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
    customFieldsOpen:false,
    length:null,
    dataCheckOpen:false,
    creadtedOnOpen:false,
    fromDateOpen:false,
    dateTabOpen:false

  }
  this.openFilter=this.openFilter.bind(this);
}

openFilter(){

  this.props.PublicUrl?this.refs.hide.style.display='none':null
  let fullUrl = window.location.host;
  let parts=fullUrl.split(".");
  if(parts.length>=3){
    if(parts[0]=="assambiodiversity"){

      this.refs.hide?this.refs.hide.style.display='none':null
    }
    if(parts[0]=="treesindia"){
        this.refs.hide?this.refs.hide.style.display='none':null
    }
    if(parts[0]=="thewesternghats"){
        this.refs.hide?this.refs.hide.style.display='none':null
    }
  }
   const newparams = queryString.parse(document.location.search);

   let sGroupOpen=this.state.sGroupOpen;
   let userGroupOpen=this.state.userGroupOpen;
   let userOpen=this.state.userOpen;
   let taxonOpen=this.state.taxonOpen;
   let mediaOpen=this.state.mediaOpen;
   let flagOpen=this.state.flagOpen;
   let monthOpen=this.state.monthOpen;
   let speciesOpen=this.state.speciesOpen
   let validateOpen=this.state.validateOpen;
   let traitsOpen=this.state.traitsOpen;
   let dataCheckOpen=this.state.dataCheckOpen;
   let customFieldsOpen=this.state.customFieldsOpen;
   let creadtedOnOpen=this.state.creadtedOnOpen;
   let fromDateOpen=this.state.fromDateOpen;
   let dateTabOpen=this.state.dateTabOpen;

   if(newparams.taxon ){
     taxonOpen=true;
   }
   else{
     taxonOpen=true;
   }

   if(newparams.sGroup){
     sGroupOpen=true;
   }
   if(newparams.taxon){
      taxonOpen=true
   }
   if(newparams.userGroupList){
      userGroupOpen=true
   }
   if(newparams.user){
      userOpen=true
   }
   if(newparams.mediaFilter){
      mediaOpen=true
   }
   if(newparams.isFlagged || newparams.speciesName || newparams.validate){
       dataCheckOpen=true
   }
   if(newparams.isFlagged){
      flagOpen=true
   }

   if(newparams.months){
      monthOpen=true
   }
   if(newparams.speciesName){
       speciesOpen=true
   }
   if(newparams.validate){
       validateOpen=true
   }
   Object.keys(newparams).forEach((key) =>{
     if(key.includes("custom")){
       customFieldsOpen=true
     }
   });


   Object.keys(newparams).forEach((key) =>{
     if(key.includes("trait")){
       traitsOpen=true
     }
   });
   if(newparams.createdOnMaxDate || newparams.createdOnMinDate){
     creadtedOnOpen=true;
   }
   if(newparams.maxDate || newparams.minDate){
     fromDateOpen=true;
   }
   if(newparams.createdOnMaxDate || newparams.createdOnMinDate || newparams.maxDate || newparams.minDate ){
     dateTabOpen=true;
   }

   this.setState({
     sGroupOpen,
     userGroupOpen,
     userOpen,
     taxonOpen,
     mediaOpen,
     flagOpen,
     monthOpen,
     speciesOpen,
     validateOpen,
     traitsOpen,
     dataCheckOpen,
     customFieldsOpen,
     creadtedOnOpen,
     dateTabOpen,
     fromDateOpen
   })
}
componentDidMount(){
this.openFilter();
}


render(){

  let FilterCount=this.props.FilterCount.countUrl?this.props.FilterCount.countUrl.split("?")[1]:null;
  let urlObject=queryString.parse(FilterCount);
  // let taxonElement = <div><span>Taxon Browser</span> <span className="badge badge-light">{urlObject.taxon?urlObject.taxon.split(",").length:null}</span></div>;

   this.length=0;
  if(urlObject){
    if(urlObject.taxon){
      this.length++;

    }
    if(urlObject.sGroup){
      this.length++;

    }
    if(urlObject.userGroupList){

      let fullUrl = window.location.host;
      let parts=fullUrl.split(".");
      if(parts.length>=3){
        if(parts[0]=="assambiodiversity"){
          this.refs.hide.style.display='none'
        }
        if(parts[0]=="treesindia"){
          this.refs.hide.style.display='none'
        }
        if(parts[0]=="thewesternghats"){
          this.refs.hide.style.display='none'
        }
      }
      else{
        this.props.PublicUrl?null:this.length++
      }
    }
    if(urlObject.user){
      this.length++;

    }
    if(urlObject.isFlagged ||urlObject.validate||urlObject.speciesName){
      this.length++;
    }

    if(urlObject.mediaFilter){
      this.length++;

    }
    if(urlObject.createdOnMaxDate || urlObject.createdOnMinDate || urlObject.minDate || urlObject.maxDate){
      this.length++;
    }
    if(urlObject.months){
      this.length++;

    }

      let increaseTraits=true;
    Object.keys(urlObject).forEach((key)=> {
      if(key.includes("trait")){
        if(increaseTraits){
          this.length++;
          increaseTraits=false;
        }
      }
    });
    let increaseCustom=true;
  Object.keys(urlObject).forEach((key)=> {
    if(key.includes("custom")){
      if(increaseCustom){
        this.length++;
        increaseCustom=false;
      }
    }
  });

  }

  return (
      <div id="leftSidebar" className="panel panel-success">
        <div  className="panel-heading vertical-align">
            <span  className="glyphicon glyphicon-filter" title="Filters">Filters </span>
            <NavLink  to={`${this.props.location.pathname}`} className="glyphicon glyphicon-trash">
                <span style={{marginTop:'-9px'}} className="badge badge-danger">{this.length}</span>
            </NavLink>
       </div>

        <div  className="panel-body" style={{marginRight:'-10px',marginLeft:'-10px'}}>
            <Collapsible lazyRender={true} open={this.state.taxonOpen} trigger={`Taxon Browser`}>
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
            <Collapsible lazyRender={true} open={this.state.dataCheckOpen} trigger={`Data Quality `}>
                  <Collapsible lazyRender={true} open={this.state.speciesOpen} trigger={`Identification `}>
                      <ScientificNameFilter />
                  </Collapsible>

                  <Collapsible lazyRender={true} open={this.state.flagOpen} trigger={`Flag `}>
                      <FlaggedFilter />
                  </Collapsible>

                  <Collapsible lazyRender={true} open={this.state.validateOpen} trigger={`Validation`}>
                      <Validate_Filter />
                  </Collapsible>

            </Collapsible>
            <Collapsible lazyRender={true} open={this.state.userOpen} trigger={`User `}>
              <UserFilter/>
            </Collapsible>
            <Collapsible lazyRender={true} open={this.state.mediaOpen} trigger={`Media Type`}>
              <Media />
            </Collapsible>
            <Collapsible lazyRender={true} open={this.state.dateTabOpen} trigger={`Date`}>
                <Collapsible lazyRender={true} open={this.state.fromDateOpen} trigger={`Observed On`}>
                  <ObservedOn />
                </Collapsible>
                <Collapsible lazyRender={true} open={this.state.creadtedOnOpen} trigger={`Created On`}>
                  <CreatedOn />
                </Collapsible>
            </Collapsible>


            <Collapsible lazyRender={true} open={this.state.monthOpen} trigger={`Seasonal`}>
              <Month_Filter />
            </Collapsible>
            <Collapsible lazyRender={true} open={this.state.customFieldsOpen} trigger={`Custom Fields`}>
              <CustomFields />
            </Collapsible>
            <Collapsible lazyRender={true} open={this.state.traitsOpen} trigger={`Traits`}>
              <Traits_Filter />
            </Collapsible>
            <div style={{height:'250px'}}></div>
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
