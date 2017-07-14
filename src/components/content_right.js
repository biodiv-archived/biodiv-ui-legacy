import React, {Component} from 'react';
import Right_bar from './taxon_browser/main';
import SpeciesChart from '../containers/species_chart';
class Right extends Component {

render(){

  return (
    <div>

      <h4>Taxon Browser</h4>
      <div className="pre-scrollable">
        <Right_bar />
      </div>

      <div>
        <h4>Species Chart</h4>
        <SpeciesChart />
      </div>


    </div>
  )
}
}
export default Right
