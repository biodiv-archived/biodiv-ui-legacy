import React, {Component} from 'react';
import  queryString from 'query-string';
import Collapsible from 'react-collapsible';

import style from './right_sidebar.css';

import TaxonBrowser from '../taxonBrowser/TaxonBrowser';
import SpeciesGroup from '../components/filterPanel/speciesGroup/SpeciesGroup';
import UserGroup from '../userGroup/UserGroup';
import ScientificNameFilter from  '../components/filterPanel/scientificName/ScientificName';
import FlaggedFilter from  '../components/filterPanel/flag/Flag';
import Media_Filter from  '../components/filterPanel/media/Media';
import SearchBar from '../taxonBrowser/SearchBar';
import Year_Filter from  '../components/filterPanel/year/Year';
import Day_Filter from  '../components/filterPanel/day/Day';
import Month_Filter from '../components/filterPanel/month/Month';
import Traits_Filter from  '../traits/Traits';
import UserFilter from  '../user/User';

class Right extends Component {
constructor(){
  super();
  this.state={
    sGroupOpen:false,
    userGroupOpen:false,
    userOpen:false,
    taxonOpen:false,
    length:null
  }
}

openFilter(){
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
        <button className="btn btn-large" style={{width:'100%',background:'#00ac9d'}} >
          <p className="pull-left" style={{fontSize:'15px'}} >Filter Panel </p>
          <i className="fa fa-trash-o fa-2x pull-right" aria-hidden="true"> {this.state.length}</i>
        </button>
        <Collapsible open={true} trigger="Taxon Browser">
          <div>
            <TaxonBrowser />
             <SearchBar />
          </div>
          </Collapsible>
          <Collapsible open={this.state.sGroupOpen} trigger="Species Groups">
            <SpeciesGroup />
          </Collapsible>
          <Collapsible open={this.state.userGroupOpen} trigger=" User Group">
            <div className="pre-scrollable">
              <UserGroup />
            </div>
          </Collapsible>
          <Collapsible trigger="SpeciesName ">
            <ScientificNameFilter />
          </Collapsible>
          <Collapsible trigger="Flag">
            <FlaggedFilter />
          </Collapsible>
          <Collapsible open={this.state.userOpen} trigger="User ">
            <UserFilter/>
          </Collapsible>
          <Collapsible trigger="Media Type">
          <Media_Filter />
          </Collapsible>
          <Collapsible trigger="Year ">
          <Year_Filter />
          </Collapsible>

          <Collapsible trigger="Month ">
          <Month_Filter />
          </Collapsible>
          <Collapsible trigger="Days">
          <Day_Filter />
          </Collapsible>


           <Collapsible trigger="Traits">
          <Traits_Filter />
          </Collapsible>
  </div>
  )
}
}
export default Right
