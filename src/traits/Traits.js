import React from 'react';
import InputRange from 'react-input-range';
import Collapsible from 'react-collapsible';
import '../../node_modules/react-input-range/lib/css/index.css'
import {getObservationTraits} from './TraitsApiCall';
import queryString from 'query-string';

import Sex from './traitValues/Sex';
import Abundance from './traitValues/Abundance';
import Habitat from './traitValues/Habitat';
import LifeStageC from './traitValues/LifeStageC';
import LifeStageI from './traitValues/LifeStageI';
import Phonology from './traitValues/Phonology';
class Traits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observationTraitList:[],
      trait_9:false,
      trait_8:false,
      trait_10:false,
      trait_11:false,
      trait_12:false,
      trait_13:false,
      trait_15:false
    };
  }

  componentWillMount(){
    this.setParameter();
    getObservationTraits().then(data=>{
    this.setState({
      observationTraitList:data
    })
    })
  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    if (newparams.trait_8) {
    this.setState({
      trait_8:true
    })
    }
    if (newparams.trait_9) {
    this.setState({
      trait_9:true
    })
    }
    if (newparams.trait_10) {
    this.setState({
      trait_10:true
    })
    }
    if (newparams.trait_11) {
    this.setState({
      trait_11:true
    })
    }
    if(newparams.trait_12) {
    this.setState({
      trait_12:true
    })
    }
    if (newparams.trait_13) {
    this.setState({
      trait_13:true
    })
    }
    if (newparams.trait_15) {
    this.setState({
      trait_15:true
    })
    }
  }


  render() {
    let observationTraitList=this.state.observationTraitList;
    return (
      <div>
          {observationTraitList.data?observationTraitList.data.map((item,index)=>{
            return(
              <div key={index}>
                {item.name==="Sex"?  <Collapsible open={this.state.trait_8?true:false} trigger={item.name}>
                    <Sex id={item.id} />
                  </Collapsible>:null}
                {item.name==="Life Stage (Complete Metamorphosis)"? <Collapsible open={this.state.trait_9?true:false}  trigger={item.name}>
                    <LifeStageC id={item.id} />
                  </Collapsible>:null}
                {item.name==="Phenology State"? <Collapsible open={this.state.trait_11?true:false} trigger={item.name}>
                    <Phonology id={item.id} />
                  </Collapsible>:null}
                {item.name==="Habitat Type"? <Collapsible open={this.state.trait_12?true:false} trigger={item.name}>
                    <Habitat id={item.id} />
                  </Collapsible>:null}
                {item.name==="Abundance"? <Collapsible open={this.state.trait_13?true:false} trigger={item.name}>
                    <Abundance id={item.id} />
                  </Collapsible>:null}
                {item.name==="Life Stage (Incomplete Metamorphosis)"? <Collapsible open={this.state.trait_10?true:false}  trigger={item.name}>
                    <LifeStageI id={item.id} />
                  </Collapsible>:null}
              </div>

            )
          }):null}
    </div>
          );
  }
}

export default Traits
