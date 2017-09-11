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
class Right extends Component {
render(){
  return (
    <div>

      <Collapsible  open={true} trigger="Taxon Browser">
          <div>
            <div  >
            <Taxon_Filter />
            </div>
             <Search_bar />
          </div>
          </Collapsible>
          <Collapsible open={true} trigger="Species Groups Filter">
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

                <Collapsible trigger="Year Filter">

                    <Year_Filter />
                    
                    </Collapsible>   


                

  </div>
  )
}
}
export default Right
