import React, {Component} from 'react';
import  queryString from 'query-string';
import Collapsible from 'react-collapsible';

import style from './right_sidebar.css';

import TaxonBrowser from '../taxonBrowser/TaxonBrowser';
import SpeciesGroup from '../components/filterPanel/speciesGroup/SpeciesGroup';
import UserGroup from '../userGroup/UserGroup';
import ScientificNameFilter from  '../components/filterPanel/scientificName/ScientificName';
import FlaggedFilter from  '../components/filterPanel/flag/Flag';
import MediaFilter from  '../components/filterPanel/media/Media';
import SearchBar from '../taxonBrowser/SearchBar';
import Year_Filter from  '../components/filterPanel/year/Year';
import Month_Filter from '../components/filterPanel/month/Month';
import Traits_Filter from  '../traits/Traits';
import UserFilter from  '../user/User';

class Right extends Component {
constructor(){
  super();
  this.state={
    sGroupOpen:false
  }
}

openFilter(){
   const newparams = queryString.parse(document.location.search);
   if(newparams.sGroup){
    this.setState({
      sGroupOpen:true
    })
   }

}

componentDidMount(){
this.openFilter();
}



render(){
  return (
    <div>

      <Collapsible open={true} trigger="Taxon Browser">
          <div>
            <div  >
            <TaxonBrowser />
            </div>
             <SearchBar />
          </div>
          </Collapsible>
          <Collapsible open={this.state.sGroupOpen} trigger="Species Groups">
            <SpeciesGroup />
          </Collapsible>

           <Collapsible trigger=" User Group">
             <UserGroup />
          </Collapsible>

          <Collapsible trigger="SpeciesName ">
            <ScientificNameFilter />
          </Collapsible>
          <Collapsible trigger="Flag">
            <FlaggedFilter />
          </Collapsible>

          <Collapsible trigger="User ">
          <UserFilter/>
          </Collapsible>

          <Collapsible trigger="Year ">
          <Year_Filter />
          </Collapsible>
          <Collapsible trigger="Month ">
          <Month_Filter />
          </Collapsible>
           <Collapsible trigger="Traits">
          <Traits_Filter />
          </Collapsible>


  </div>
  )
}
}
export default Right
