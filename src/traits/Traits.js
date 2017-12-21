import React from 'react';
import InputRange from 'react-input-range';

import '../../node_modules/react-input-range/lib/css/index.css'

import {getObservationTraits} from './TraitsApiCall';
import {Accordion,Panel} from 'react-bootstrap';

import TraitValue from './TraitValue';



class Traits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      observationTraitList:[]
    };


  }
  componentWillMount(){
    getObservationTraits().then(data=>{
    this.setState({
      observationTraitList:data
    })
    })


  }



  render() {
    let observationTraitList=this.state.observationTraitList;

    return (
        <Accordion>
          {observationTraitList.data?observationTraitList.data.map((item,index)=>{
            return <Panel key={index}  header={item.name}  eventKey={index}><TraitValue id={item.id} /> </Panel>
          }):null}
        </Accordion>
          );
  }
}

export default Traits
