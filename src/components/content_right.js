import React, {Component} from 'react';
import Right_bar from './taxon_browser/main';
import FilterPanel from './filterPanel/filter_panel';
import GroupNameFilter from './groupname_filter';
import AllFilter from './all_filter';
class Right extends Component {
render(){
  return (
    <div>
      <div className="panel-group" id="accordion">
          <div className="panel">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
            <div className="panel-heading bg-primary">
              <h4 className="panel-title">
                Taxon Browser
              </h4>
            </div>
            </a>
            <div id="collapse1" className="panel-collapse collapse in">
              <div className="panel-body">
                <div className="pre-scrollable">
                  <Right_bar />
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                    <span></span><i className="fa fa-search" aria-hidden="true"></i>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="panel">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
            <div className="panel-heading bg-primary">
              <h4 className="panel-title">
              Species Groups Filter
              </h4>
            </div>
            </a>
            <div id="collapse2" className="panel-collapse collapse">
              <div className="panel-body">

                <FilterPanel />
              </div>
            </div>
          </div>
          <div className="panel">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
            <div className="panel-heading bg-primary">
              <h4 className="panel-title ">
                Group Filter
              </h4>
            </div>
            </a>
            <div id="collapse3" className="panel-collapse collapse">
              <div className="panel-body">
                <GroupNameFilter />
              </div>
            </div>
          </div>
          <div className="panel panel-default">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">
            <div className="panel-heading bg-primary">
              <h4 className="panel-title">
              All Filters
              </h4>
            </div>
            </a>
            <div id="collapse4" className="panel-collapse collapse">
              <div className="panel-body">
                <AllFilter />
              </div>
            </div>
          </div>
          <div className="panel panel-default">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">
            <div className="panel-heading bg-primary">
              <h4 className="panel-title">
                Habitat Filter
              </h4>
            </div>
            </a>
            <div id="collapse5" className="panel-collapse collapse">
              <div className="panel-body">
              </div>
            </div>
          </div>
          <div className="panel panel-default">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">
            <div className="panel-heading bg-primary">
              <h4 className="panel-title">
                Habitat Filter
              </h4>
            </div>
            </a>
            <div id="collapse6" className="panel-collapse collapse">
              <div className="panel-body">
              </div>
            </div>
          </div>
    </div>
  </div>
  )
}
}
export default Right
