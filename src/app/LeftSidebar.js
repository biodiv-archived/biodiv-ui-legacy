import React, {Component} from 'react';
import  queryString from 'query-string';
import Collapsible from 'react-collapsible';

import style from './right_sidebar.css';

import Taxon_Filter from '../components/taxon_browser/main';
import FilterPanel from '../components/filterPanel/filter_panel';
import UserGroupNameFilter from '../components/user_groupname_filter';
import SpeciesNameFilter from '../components/speciesname_filter';
import FlaggedFilter from '../components/flag_filter';
import MediaFilter from '../components/media_filter';
import Search_bar from '../components/taxon_browser/search_bar';
import Year_Filter from '../components/year_filter';
import Month_Filter from '../components/month_filter';
import Traits_Filter from '../components/traits_filter';
import UserFilter from '../components/User_Filter/user_filter';

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
            <Taxon_Filter />
            </div>
             <Search_bar />
          </div>
          </Collapsible>

          <Collapsible open={this.state.sGroupOpen} trigger="Species Groups Filter">

            <FilterPanel />

          </Collapsible>

           <Collapsible trigger=" Group Filter">
             <UserGroupNameFilter />
          </Collapsible>

          <Collapsible trigger="SpeciesName Filter">
            <SpeciesNameFilter />
          </Collapsible>
          <Collapsible trigger="Flag Filter">
            <SpeciesNameFilter />
          </Collapsible>

          <Collapsible trigger="User Filter">
          <UserFilter/>
          </Collapsible>  

          <Collapsible trigger="Year Filter">
          <Year_Filter />
          </Collapsible>   
          <Collapsible trigger="Month Filter">
          <Month_Filter />
          </Collapsible>  
           <Collapsible trigger="Traits Filter">
          <Traits_Filter />
          </Collapsible>  


                

  </div>
  )
}
}
export default Right
