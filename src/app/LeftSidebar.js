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
   let length=0;
   if(newparams.sGroup){
     length++;
    this.setState({
      sGroupOpen:true
    })
   }
   if(newparams.taxon){
     length++;
    this.setState({
      taxonOpen:true
    })
   }
   if(newparams.userGroupList){
     length++;
    this.setState({
      userGroupOpen:true
    })
   }
   if(newparams.user){
     length++;
    this.setState({
      userOpen:true
    })
   }
   if(newparams.mediaFilter){
     length++;
    this.setState({
      mediaOpen:true
    })
   }
   if(newparams.isFlagged){
     length++;
    this.setState({
      flagOpen:true
    })
   }
   if(newparams.months){
     length++;
    this.setState({
      monthOpen:true
    })
   }
   if(newparams.speciesName){
     length++;
     this.setState({
       speciesOpen:true
     })
   }
   if(newparams.validate){
     length++;
     this.setState({
       validateOpen:true
     })
   }
   if(newparams.trait_8 || newparams.trait_9 ||newparams.trait_10 || newparams.trait_11 || newparams.trait_12 || newparams.trait_13 || newparams.trait_15){
     length++;
     this.setState({
       traitsOpen:true
     })
   }

   this.setState({
     length
   })

}
componentDidMount(){
this.openFilter();
}

render(){
  return (
    <div>
        <Collapsible open={true} trigger="Taxon Browser">
          <div>
            <TaxonBrowser />
             <SearchBar />
          </div>
          </Collapsible>

          <Collapsible  lazyRender={true} open={this.state.sGroupOpen} trigger="Species Groups">
            <SpeciesGroup />
          </Collapsible>
          <div ref="hide" style={{display:'block'}}>
          <Collapsible lazyRender={true} open={this.state.userGroupOpen} trigger=" User Group">
            <UserGroup />
          </Collapsible>
          </div>
          <Collapsible open={this.state.speciesOpen} trigger="SpeciesName ">
            <ScientificNameFilter />
          </Collapsible>

          <Collapsible open={this.state.flagOpen} trigger="Flag">
            <FlaggedFilter />
          </Collapsible>

          <Collapsible open={this.state.userOpen} trigger="User ">
            <UserFilter/>
          </Collapsible>

          <Collapsible open={this.state.mediaOpen} trigger="Media Type">
          <Media_Filter />
          </Collapsible>

          <Collapsible trigger="Date">
          <Year_Filter />
          </Collapsible>

          <Collapsible open={this.state.monthOpen} trigger="Seasonal">
          <Month_Filter />
          </Collapsible>

          <Collapsible open={this.state.validateOpen} trigger="Validate">
          <Validate_Filter />
          </Collapsible>

          <Collapsible  open={this.state.traitsOpen} trigger="Traits">
          <Traits_Filter />
          </Collapsible>
  </div>
  )
}
}
function mapStateToProps(state) {
  return {
    PublicUrl:state.PublicUrl.url,
    groupName:state.PublicUrl.groupName
  };
}

export default withRouter(connect(mapStateToProps)(Right));
