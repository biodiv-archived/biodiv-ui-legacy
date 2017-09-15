import React, {Component} from 'react';
import Taxon_Filter from './taxon_browser/main';
import FilterPanel from './filterPanel/filter_panel';
import UserGroupNameFilter from './user_groupname_filter';
import SpeciesNameFilter from './speciesname_filter';
import FlaggedFilter from './flag_filter';
import MediaFilter from './media_filter';
import Collapsible from 'react-collapsible';
import style from './content_right.css';
import Search_bar from './taxon_browser/search_bar';
import Year_Filter from './year_filter';
import Month_Filter from './month_filter';
import Traits_Filter from './traits_filter';
import  queryString from 'query-string';
import UserFilter from './User_Filter/user_filter';

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
