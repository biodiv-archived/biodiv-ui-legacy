import React from 'react';
import InputRange from 'react-input-range';
import Collapsible from 'react-collapsible';
import '../../node_modules/react-input-range/lib/css/index.css'
import {getObservationTraits} from './TraitsApiCall';
import queryString from 'query-string';
import TraitValues from './TraitValues';

class Traits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observationTraitList:[],
      traitIdwithValues:new Map()
    };
    this.passToTraitValues=this.passToTraitValues.bind(this)
  }
  setParameter(){
    let newparams = queryString.parse(document.location.search);
    let traitIdwithValues=this.state.traitIdwithValues;
    Object.keys(newparams).forEach((key)=> {
      if(key.includes("trait")){
        traitIdwithValues.set(key.split("_")[1],newparams[key].split(","));
      }
    });

      console.log(traitIdwithValues);
      this.setState({
        traitIdwithValues
      })

  }
  componentDidMount(){
      this.setParameter()
    getObservationTraits().then(data=>{
    this.setState({
      observationTraitList:data
    })
    })
  }
  callFilter(traitIdwithValues){
      var events = new CustomEvent("traits",{ "detail":{
        traitsMap:traitIdwithValues
      }
      });
       document.dispatchEvent(events);
  }

  passToTraitValues(type,id,values){
    let traitIdwithValues=this.state.traitIdwithValues;
    let newid=id+"."+type;
  traitIdwithValues.set(newid,values);

  this.setState({
  traitIdwithValues
  })
  this.callFilter(traitIdwithValues)
  }
  render() {
    let observationTraitList=this.state.observationTraitList;
    let traitIdwithValues=this.state.traitIdwithValues;
    let Comkeys = Array.from( traitIdwithValues.keys());
    let keys=[];
      Comkeys?Comkeys.map((item)=>{
        keys.push(item.split(".")[0])
      }):null;
    return (
      <div>
          {observationTraitList.data?observationTraitList.data.map((item,index)=>{
            return(
              <div key={index}>
                <Collapsible  open={keys.includes(item.id.toString())} trigger={item.name}>
                    <TraitValues alues  passToTraitValues={this.passToTraitValues} traitId={item.id}  traitName={item.name} traitType={item.traitTypes} traitDataType={item.dataTypes}/>
                </Collapsible>
              </div>

            )
          }):null}
    </div>
          );
  }
}

export default Traits
