import React, {Component} from 'react';
import Taxon_Filter from './taxon_browser/main';
import FilterPanel from './filterPanel/filter_panel';
import UserGroupNameFilter from './user_groupname_filter';
import SpeciesNameFilter from './speciesname_filter';
import FlaggedFilter from './flag_filter';
import MediaFilter from './media_filter';
import Collapsible from 'react-collapsible';
import style from './content_right.css';


class Right extends Component {
render(){
  return (
    <div>

      <Collapsible  open={true} trigger="Taxon Browser">
          <div className="pre-scrollable">
            <Taxon_Filter />

          </div>
          </Collapsible>
          <Collapsible trigger="  Species Groups Filter">
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
               <Collapsible trigger="media filter">
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                </Collapsible>
                <Collapsible trigger="Flag Filter">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                 </Collapsible>
                 <Collapsible trigger="Flag Filter">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                  </Collapsible>

                  <Collapsible trigger="Flag Filter">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                   </Collapsible>

                   <Collapsible trigger="Flag Filter">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </Collapsible>


                 {/*
                   <div className="panel-group" id="accordion">
                       <div className="panel panel-default">
                           <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">
                         <div className="panel-heading bg-primary">
                           <h4 className="panel-title">
                             Media Filter
                           </h4>
                         </div>
                         </a>
                         <div id="collapse6" className="panel-collapse collapse">
                           <div className="panel-body">
                           </div>
                         </div>
                       </div>
                 </div>

                    */}

  </div>
  )
}
}
export default Right
