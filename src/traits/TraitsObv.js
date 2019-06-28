import "./TraitsObvStyle.css";

import axios from "axios";
import $ from "jquery";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";

import AuthUtils from "../auth/AuthUtils.js";
import ModalPopup from "../auth/Modal.js";
import { Config } from "../Config";
import ColorTrait from "../util/traitUtils/MultipleCategoricalColor.js";
import DatePicker from "../util/traitUtils/RangeDate.js";

class Traits extends Component {
  constructor(props) {
    super(props);
    this.state={
      response:null,
      numericTraitMinMax:null,
      login_modal:false,
      options:'',
      loading:false
    }
    this.fact= new Map();
    this.traitIdMap = new Map();
    this.myMap= new Map();
    this.getTraits=this.getTraits.bind(this)
    this.getTraits(this.props.id,this.props.sGroup)
    this.pushTraitsCheckboxDefault =  this.pushTraitsCheckboxDefault.bind(this);
    this.pushTraitsRadioDefault = this.pushTraitsRadioDefault.bind(this);
    this.pushTraitsDateRange = this.pushTraitsDateRange.bind(this);
    this.updateMultipleColorSelection =  this.updateMultipleColorSelection.bind(this);
    this.getFormattedValue = this.getFormattedValue.bind(this);
    this.clearData = this.clearData.bind(this);

     this.child =  React.createRef()
}

   getTraits(id,sGroup){
     document.body.style.cursor = "wait";
     var options={
       method:'GET',
       url: Config.api.ROOT_URL+"/trait/list",
       params:{
         objectId:id,
         objectType:"species.participation.Observation",
         sGroup:sGroup,
         isObservationTrait:true,
         ifOwns:false,
         showInObservation:true,
         loadMore:true,
         displayAny:false,
         editable:true,
         fromObservationShow:"show",
         filterable:false
       },
         json: 'true'
     }
    axios(options)
        .then((response)=>{
          //console.log("traityy",response)
          document.body.style.cursor = "default";
          if(response.status === 200){
            // let numericTrait = new Map();
          //  testTraitData.model.numericTraitMinMax.map((item,index)=>{
          //     let minMax= new Map();
          //     minMax.set("min",item.min);
          //     minMax.set("max",item.max);
          //     numericTrait.set(item.id,minMax);
          //   })

            this.setState({
              response:response.data.model
              //response:testTraitData.model,
              //numericTraitMinMax:numericTrait
            })

          }
        })
}

pushTraitsRadio(traitId,value){
  //console.log("fired")
  if(this.traitIdMap.get(traitId) !== undefined){
    if(this.traitIdMap.get(traitId).get(value))
    {
      this.traitIdMap.get(traitId).clear()
      var radioActive1= "radioActive"+traitId+value;

      this.refs[radioActive1].classList.remove("active")

    }
    else
    {
      this.traitIdMap.get(traitId).clear()
      let x = new Map()
      x.set(value,value)
      this.traitIdMap.set(traitId,x)
    }
  }else{
    let x = new Map()
    x.set(value,value)
    this.traitIdMap.set(traitId,x)
  }
  //this.myMap.clear()

  //this.myMap.set(value,value)

  //console.log(this.myMap)
  //console.log(this.traitIdMap)
}
pushTraitsRadioDefault(traitId,value){
  if(this.traitIdMap.get(traitId) !== undefined){
    this.traitIdMap.get(traitId).clear();
  }
  var x = new Map();
  //this.myMap.set(value,value)
  x.set(value,value)
  this.traitIdMap.set(traitId,x);
}
pushTraitsCheckbox(traitId,value){
  //console.log("fired")
  //console.log(this.traitIdMap.get(traitId))
  if(this.traitIdMap.get(traitId) ===undefined){
    var x = new Map();
    x.set(value,value);
    this.traitIdMap.set(traitId,x);
  }else{
    if(this.traitIdMap.get(traitId).get(value)){
      this.traitIdMap.get(traitId).delete(value)
      var checkboxActive1 = "checkboxActive"+traitId+value
      this.refs[checkboxActive1].classList.remove("active")
    }else{
      this.traitIdMap.get(traitId).set(value,value);
    }
  }
  //console.log(this.traitIdMap.get(traitId))
  //this.myMap.get(value)?this.myMap.delete(value):this.myMap.set(value,value)
  //console.log(this.myMap)
  //his.traitIdMap.get(traitId).get(value)?this.traitIdMap.get(traitId).delete(value):this.traitIdMap.get(traitId).set(value,value);
}

pushTraitsCheckboxDefault(traitId,value){
  if(this.traitIdMap.get(traitId) ===undefined){
    this.traitIdMap.set(traitId,new Map());
  }
  this.traitIdMap.get(traitId).set(value,value);
}

submitTraits(id1,id2,traitType,dataType){
  var proceed = true;

  console.log("traitType",traitType,"dataType",dataType)
  var x = this.traitIdMap.get(id1);

  if(dataType==='DATE'){
    if(!this.traitIdMap.has(id1)){
      proceed = false;
      alert("Please select date");
    }
  }

  if(dataType==='COLOR'){
    if(!this.traitIdMap.has(id1)){
      proceed = false;
      alert("Please select a color");
    }
  }



  if(proceed===true){

    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    //console.log("hdhhfdhf",x)
    //console.log("size ",x.size,x.length,x)
    var arr=[]
    if(x.size>0 || x.length>0){

      switch(dataType){

        case 'DATE':
            x.forEach(function(value){
              arr=arr.concat(value)
            })
           var list = arr[0]+":"+arr[1];
           break;

        case 'COLOR':
            for (var key in x){
              //console.log(key,x[key])
              arr=arr.concat(x[key].id)
            }
            // var list=arr.toString()
            break;

        default:
            x.forEach(function(value){
              arr=arr.concat(value)
            })
            // var list=arr.toString()
      }

      var list1=id1+":"+list+";"
    }else{
      // var list1=arr.toString()
    }

    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/fact/update",
      params:{
        traits:list1,
        traitId:id1,
        objectId:id2,
        objectType:"species.participation.Observation"
      },
      headers : AuthUtils.getAuthHeaders(),
      json: 'true'
    }

    // if(traitType === 'RANGE' && dataType === 'NUMERIC'){
    //   if(this.state.numericTraitMinMax.get(id1)){
    //     let min = this.state.numericTraitMinMax.get(id1).get("min")
    //     let max = this.state.numericTraitMinMax.get(id1).get("max")
    //
    //     if(arr[0] < min || arr[0] > max){
    //       proceed = false;
    //       alert("Input value must lie between "+min+" and "+max)
    //       document.body.style.cursor = "default";
    //       this.setState({
    //         loading:false
    //       })
    //     }
    //   }
    // }


      //this.myMap.clear()
      //this.traitIdMap.delete(id1);
      this.clearData(dataType,id1)
      //console.log(this.traitIdMap)
      //console.log(options)
      this.hide(id2,id1);
      axios(options)
            .then((response)=>{
              //console.log("traitpost",response)
              document.body.style.cursor = "default";
              this.setState({
                loading:false
              })
              if(response.status === 200){
                this.getTraits(this.props.id,this.props.sGroup)
              }
            })
            .catch((error)=>{
              document.body.style.cursor = "default";
              this.setState({
                loading:false
              })
              if(error.response.status === 401){
                this.setState({
                login_modal:!(this.state.login_modal),
                options:options
              })
            }else{
              console.log(error)
            }
            })

  }

  }

  pushTraitsNumericRange(traitId){
    var rangeNumeric1="rangeNumeric"+traitId+this.props.id;
    var value = this.refs[rangeNumeric1].value;
    // var min = this.state.numericTraitMinMax.get(traitId).get("min")
    // var max = this.state.numericTraitMinMax.get(traitId).get("max")
    // if(value>= min  && value<= max){
      if(this.traitIdMap.get(traitId) !== undefined){
        if(this.traitIdMap.get(traitId).get(value))
        {
          this.traitIdMap.get(traitId).clear()
        }
        else
        {
          this.traitIdMap.get(traitId).clear()
          var x = new Map()
          x.set(value,value)
          this.traitIdMap.set(traitId,x)
        }
      }else{
        var x = new Map()
        x.set(value,value)
        this.traitIdMap.set(traitId,x)
      }
    // }else{
    //   //alert("Input value must lie between "+min+" and "+max)
    // }

  }

  pushTraitsDateRange(traitId,minDate,maxDate){
    if(this.traitIdMap.get(traitId) !== undefined){
        this.traitIdMap.get(traitId).clear()
        var x = new Map()
        x.set("min",minDate)
        x.set("max",maxDate)
        this.traitIdMap.set(traitId,x)

    }else{
      var x = new Map()
      x.set("min",minDate)
      x.set("max",maxDate)
      this.traitIdMap.set(traitId,x)
    }
  }

  updateMultipleColorSelection(traitId,a){
    //console.log("traitId",traitId)
    //console.log(a)
      //this.traitIdMap.get(traitId).clear()
      this.traitIdMap.set(traitId,a)

    //console.log("map console",this.traitIdMap)
  }

  show(uni,item){

    var fact1='fact_'+uni+item
    var edit1='edit_'+uni+item
    var onclick_edit1='onclick_edit_'+uni+item
    var sub1='sub_'+uni+item
    var cancel1='cancel_'+uni+item
    if(this.refs.hasOwnProperty(fact1)){(this.refs[fact1].style.display="none")}

    if(this.refs.hasOwnProperty(edit1)){(this.refs[edit1].style.display="none")}
    if(this.refs.hasOwnProperty(onclick_edit1)){(this.refs[onclick_edit1].style.display="block")}
    if(this.refs.hasOwnProperty(sub1)){(this.refs[sub1].style.display="block")}
    if(this.refs.hasOwnProperty(cancel1)){(this.refs[cancel1].style.display="block")}

}

  hide(uni,item){
    this.myMap.clear()
    var fact1='fact_'+uni+item
    var edit1='edit_'+uni+item
    var onclick_edit1='onclick_edit_'+uni+item
    var sub1='sub_'+uni+item
    var cancel1='cancel_'+uni+item
    if(this.refs.hasOwnProperty(fact1)){this.refs[fact1].style.display="block"}
    if(this.refs.hasOwnProperty(edit1)){this.refs[edit1].style.display="block"}
    if(this.refs.hasOwnProperty(onclick_edit1)){this.refs[onclick_edit1].style.display="none"}
    if(this.refs.hasOwnProperty(sub1)){this.refs[sub1].style.display="none"}
    if(this.refs.hasOwnProperty(cancel1)){this.refs[cancel1].style.display="none"}
  }

 getFormattedValue(value,dataType,traitType,units){
    if(value.length ===0) return;
    var ret;
    switch(dataType){
      case 'DATE':
        var a = value[0].split(";")
        //console.log("splitted",a)
        //console.log("tretst",a[0],a[1])
        if(units === 'MONTH'){
          var fromDate = moment(a[0],"DD-MM-YYYY").format('MMM')

          var toDate =  moment(a[1],"DD-MM-YYYY").format('MMM')
        }else{
          var fromDate = moment(a[0],"DD-MM-YYYY").format('MMM DD')

          var toDate =  moment(a[1],"DD-MM-YYYY").format('MMM DD')
        }

        //console.log(fromDate,toDate)
        ret = fromDate + " - "+toDate
        break;

      case 'COLOR':
          ret =

            value.map((item,index)=>{
              return(
                <div className="color_chip_value" title={item} key={index} style={{backgroundColor:item}} >
                </div>
              )
            })

        break;

      case 'NUMERIC':
        var a = value[0].split(":")
        if(a[0] === a[1]){
          ret = a[0];
        }else{
          ret = value[0];
        }
        break;
    }
    return ret;
 }

 clearData(dataType,traitId){

   if(this.traitIdMap.has(traitId)){
     this.traitIdMap.delete(traitId)
   }

   switch(dataType){

     case 'NUMERIC':
        var rangeNumeric1 = "rangeNumeric"+traitId+this.props.id;
        this.refs[rangeNumeric1].value='';
        break;

     case 'COLOR':
        this.child.current.clearData();
        //console.log(this.child)
        break;
   }
 }


  render(){
    //console.log(this.state)
    var fact1=this.state.response
    return(    <div className="pre-scrollable">
        {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getTraits} id={this.props.id} sGroup={this.props.sGroup}/>):null}
        {
            (this.state.response!==null)?(this.state.response.instanceList.map((item,index)=>{
                    if(item.isParticipatory===true){
                        return(
                        <div key={index} className="well well-sm" style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                            <div className="name-and-button row">
                                <div className="name col-sm-8" style={{margin:'0%'}}>
                                    <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait."+item.id+"=any&max=&offset=0&lang="+sessionStorage.locale} >
                                         <span>{item.name}</span>
                                     </a>
                                </div>
                                <div className="buttons col-sm-4">
                                    <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'block',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                    <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                    <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                </div>
                            </div>
                            <div className="traits ">
                                  <div className="fact_instance " ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                  {
                                     this.state.response.factInstance.hasOwnProperty(item.id)?
                                     ( <div className="row" style={{width:'100%'}}>{
                                       ( item.dataTypes.name === 'DATE' || item.dataTypes.name === 'COLOR' || item.dataTypes.name === 'NUMERIC')?
                                       (
                                         <span style={{marginLeft:'0.5%'}}>{this.getFormattedValue(this.state.response.factInstance[item.id],item.dataTypes.name,item.traitTypes.name,item.units)}</span>
                                       ):
                                       (
                                         this.state.response.factInstance[item.id].map((it,index)=>{
                                           if(this.fact.get(item.id)){
                                             this.fact.get(item.id).push(it.value)
                                           }else{
                                             this.fact.set(item.id,[it.value])
                                           }
                                         return(  <button key={index} title={it.description} type="button"  className="btn  btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts" >
                                                  <div className="snippet tablet">
                                                  <div className="figure pull-left">
                                                  <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                  </div>
                                                  <span>{it.value}</span>
                                                  </div>
                                                  </button>
                                                )
                                         })
                                       )

                                     }
                                       </div>
                                     )
                                     :null
                                   }
                                 </div>
                                 <div className="edit_data"  ref={"onclick_edit_"+this.props.id+item.id} style={{display:'none',marginLeft:'2%'}}>{
                                       item.traitTypes.name==='MULTIPLE_CATEGORICAL'?
                                        (
                                           item.dataTypes.name==='COLOR'?
                                           (
                                             <ColorTrait ref={this.child} traitId={item.id} traitCategory={item.traitTypes.name} updateMultipleColorSelection={this.updateMultipleColorSelection}/>
                                           ):
                                           (
                                             <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                             {

                                                 item.values.map((possible,index)=>{

                                                   if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0)
                                                   {
                                                     this.pushTraitsCheckboxDefault(item.id,possible.value)
                                                     return(

                                                 <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                   <input type="checkbox"  name={possible.value} autoComplete="off"  defaultChecked/ >
                                                   <div className="snippet tablet">
                                                       <div className="figure pull-left">

                                                           <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>
                                                       </div>
                                                       <span>{possible.value}</span>
                                                   </div>
                                                 </label>

                                               )}
                                                 else{
                                                 return(

                                               <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                 <input type="checkbox" name={possible.value} autoComplete="off" / >
                                                 <div className="snippet tablet">
                                                     <div className="figure pull-left">

                                                         <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                     </div>
                                                     <span>{possible.value}</span>
                                                 </div>
                                               </label>

                                             )}
                                                 })
                                             }
                                             </div>
                                           )

                                     ):(
                                          item.traitTypes.name==='SINGLE_CATEGORICAL'?
                                            (
                                              <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                              {
                                                  item.values.map((possible,index)=>{

                                                  if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0){
                                                    this.pushTraitsRadioDefault(item.id,possible.value);
                                                    return(

                                                  <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                    <input type="radio" name="trait_edit"  id={possible.value}  defaultChecked/ >
                                                    <div className="snippet tablet">
                                                        <div className="figure pull-left">

                                                            <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                        </div>
                                                        <span>{possible.value}</span>
                                                    </div>
                                                  </label>

                                                )}
                                                  else{
                                                  return(

                                                <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                  <input type="radio" name="trait_edit" id={possible.value} / >
                                                  <div className="snippet tablet">
                                                      <div className="figure pull-left">

                                                          <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                      </div>
                                                      <span>{possible.value}</span>
                                                  </div>
                                                </label>

                                              )}
                                                  })
                                            }
                                            </div>
                                          ):
                                          (
                                              item.dataTypes.name==='NUMERIC'?
                                              (
                                                <div className="row" style={{marginTop:'0.7%'}}>
                                                  {
                                                    <div>
                                                    <input type="number" className="col-sm-4 col-xs-6" ref={"rangeNumeric"+item.id+this.props.id} onChange={this.pushTraitsNumericRange.bind(this,item.id)} name={item.name}   style={{border:'1px solid #aaa',borderRadius:'4px'}}/>
                                                    </div>

                                                  }
                                                </div>
                                              ):
                                              (
                                                <div>
                                                <DatePicker  pushTraitsDateRange={this.pushTraitsDateRange} traitId={item.id} units={"month"}/>
                                                </div>
                                              )
                                          )
                                     )
                                }</div>
                            </div>
                        </div>
                      )
                    }
                    else{
                        if(AuthUtils.isLoggedIn()){
                              if(this.state.response.factInstance.hasOwnProperty(item.id)){
                                 return(
                                   <div key={index} className="well well-sm " style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                                       <div className="name-and-button row">
                                           <div className="name col-sm-8" style={{margin:'0%'}}>
                                               <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait.12=any&max=&offset=0&lang="+sessionStorage.locale}>
                                                    <span>{item.name}</span>
                                                </a>
                                           </div>
                                           <div className="buttons col-sm-4">
                                               {
                                                 ((AuthUtils.isLoggedIn() && AuthUtils.getLoggedInUser().id===this.props.owner) || AuthUtils.isAdmin())?
                                                 (
                                                   <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'block',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                                 ):null
                                               }
                                               <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                               <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                           </div>
                                       </div>
                                       <div className="traits">
                                             <div className="fact_instance" ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                             {
                                                this.state.response.factInstance.hasOwnProperty(item.id)?
                                                ( <div className="row" style={{width:'100%'}}>{
                                                  ( item.dataTypes.name === 'DATE' || item.dataTypes.name === 'COLOR' || item.dataTypes.name === 'NUMERIC')?
                                                  (
                                                    <span style={{marginLeft:'0.5%'}}>{this.getFormattedValue(this.state.response.factInstance[item.id],item.dataTypes.name,item.traitTypes.name,item.units)}</span>
                                                  ):
                                                  (
                                                    this.state.response.factInstance[item.id].map((it,index)=>{
                                                      if(this.fact.get(item.id)){
                                                        this.fact.get(item.id).push(it.value)
                                                      }else{
                                                        this.fact.set(item.id,[it.value])
                                                      }
                                                    return(  <button key={index} title={it.description} type="button" className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts"  >
                                                             <div className="snippet tablet">
                                                             <div className="figure pull-left">
                                                             <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                             </div>
                                                             <span>{it.value}</span>
                                                             </div>
                                                             </button>
                                                           )
                                                    })
                                                  )

                                                }
                                                  </div>
                                                )
                                                :null
                                              }
                                            </div>
                                            <div className="edit_data"  ref={"onclick_edit_"+this.props.id+item.id} style={{display:'none',marginLeft:'2%'}}>{
                                                  item.traitTypes.name==='MULTIPLE_CATEGORICAL'?
                                                  (
                                                    item.dataTypes.name==='COLOR'?
                                                    (
                                                      <ColorTrait ref={this.child} traitId={item.id} traitCategory={item.traitTypes.name} updateMultipleColorSelection={this.updateMultipleColorSelection}/>
                                                    ):
                                                    (
                                                      <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                                      {

                                                          item.values.map((possible,index)=>{

                                                            if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0)
                                                            {
                                                              this.pushTraitsCheckboxDefault(item.id,possible.value)
                                                              return(

                                                          <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                            <input type="checkbox"  name={possible.value} autoComplete="off"  defaultChecked/ >
                                                            <div className="snippet tablet">
                                                                <div className="figure pull-left">

                                                                    <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                            </div>
                                                          </label>

                                                        )}
                                                          else{
                                                          return(

                                                        <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                          <input type="checkbox" name={possible.value} autoComplete="off" / >
                                                          <div className="snippet tablet">
                                                              <div className="figure pull-left">

                                                                  <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                              </div>
                                                              <span>{possible.value}</span>
                                                          </div>
                                                        </label>

                                                      )}
                                                          })
                                                      }
                                                      </div>
                                                    )
                                                ):(
                                                    item.traitTypes.name==='SINGLE_CATEGORICAL'?
                                                    (
                                                      <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}} >
                                                      {
                                                          item.values.map((possible,index)=>{

                                                          if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0){
                                                            this.pushTraitsRadioDefault(item.id,possible.value);
                                                            return(

                                                          <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn  btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                            <input type="radio" name="trait_edit"  id={possible.value}  defaultChecked/ >
                                                            <div className="snippet tablet">
                                                                <div className="figure pull-left">

                                                                    <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                            </div>
                                                          </label>

                                                        )}
                                                          else{
                                                          return(

                                                        <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                          <input type="radio" name="trait_edit" id={possible.value} / >
                                                          <div className="snippet tablet">
                                                              <div className="figure pull-left">

                                                                  <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                              </div>
                                                              <span>{possible.value}</span>
                                                          </div>
                                                        </label>

                                                      )}
                                                          })
                                                    }
                                                    </div>
                                                  ):
                                                  (
                                                      item.dataTypes.name==='NUMERIC'?
                                                      (
                                                        <div className="row" style={{marginTop:'0.7%'}}>
                                                          {
                                                            <div>
                                                            <input type="number" className="col-sm-4 col-xs-6" ref={"rangeNumeric"+item.id+this.props.id} onChange={this.pushTraitsNumericRange.bind(this,item.id)} name={item.name}   style={{border:'1px solid #aaa',borderRadius:'4px'}}/>
                                                            </div>

                                                          }
                                                        </div>
                                                      ):
                                                      (
                                                        <div><DatePicker  pushTraitsDateRange={this.pushTraitsDateRange} traitId={item.id} units={"month"}/></div>
                                                      )
                                                  )

                                                )
                                           }</div>
                                       </div>
                                   </div>
                                 )
                              }
                              else{
                                 if((AuthUtils.isLoggedIn() && AuthUtils.getLoggedInUser().id===this.props.owner) || AuthUtils.isAdmin()) {
                                    return(
                                      <div key={index} className="well well-sm " style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                                          <div className="name-and-button row" >
                                              <div className="name col-sm-8" style={{margin:'0%'}}>
                                                  <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait.12=any&max=&offset=0&lang="+sessionStorage.locale}>
                                                       <span>{item.name}</span>
                                                   </a>
                                              </div>
                                              <div className="buttons col-sm-4">
                                                  <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'block',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                                  <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                                  <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                              </div>
                                          </div>
                                          <div className="traits">
                                                <div className="fact_instance" ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                                {
                                                   this.state.response.factInstance.hasOwnProperty(item.id)?
                                                   ( <div className="row" style={{width:'100%'}}>{
                                                     ( item.dataTypes.name === 'DATE' || item.dataTypes.name === 'COLOR' || item.dataTypes.name === 'NUMERIC')?
                                                     (
                                                       <span style={{marginLeft:'0.5%'}}>{this.getFormattedValue(this.state.response.factInstance[item.id],item.dataTypes.name,item.traitTypes.name,item.units)}</span>
                                                     ):
                                                     (
                                                       this.state.response.factInstance[item.id].map((it,index)=>{
                                                         if(this.fact.get(item.id)){
                                                           this.fact.get(item.id).push(it.value)
                                                         }else{
                                                           this.fact.set(item.id,[it.value])
                                                         }
                                                       return(  <button key={index} title={it.description} type="button" className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts" >
                                                                <div className="snippet tablet">
                                                                <div className="figure pull-left">
                                                                <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                                </div>
                                                                <span>{it.value}</span>
                                                                </div>
                                                                </button>
                                                              )
                                                       })
                                                     )
                                                   }
                                                     </div>
                                                   )
                                                   :null
                                                 }
                                               </div>
                                               <div className="edit_data"  ref={"onclick_edit_"+this.props.id+item.id} style={{display:'none',marginLeft:'2%'}}>{
                                                     item.traitTypes.name==='MULTIPLE_CATEGORICAL'?
                                                     (
                                                       item.dataTypes.name==='COLOR'?
                                                       (
                                                         <ColorTrait ref={this.child} traitId={item.id} traitCategory={item.traitTypes.name} updateMultipleColorSelection={this.updateMultipleColorSelection}/>
                                                       ):
                                                       (
                                                         <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                                         {

                                                             item.values.map((possible,index)=>{

                                                               if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0)
                                                               {
                                                                 this.pushTraitsCheckboxDefault(item.id,possible.value)
                                                                 return(

                                                             <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                               <input type="checkbox"  name={possible.value} autoComplete="off"  defaultChecked/ >
                                                               <div className="snippet tablet">
                                                                   <div className="figure pull-left">

                                                                       <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                   </div>
                                                                    <span>{possible.value}</span>
                                                               </div>
                                                             </label>

                                                           )}
                                                             else{
                                                             return(

                                                           <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                             <input type="checkbox" name={possible.value} autoComplete="off" / >
                                                             <div className="snippet tablet">
                                                                 <div className="figure pull-left">

                                                                     <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                 </div>
                                                                 <span>{possible.value}</span>
                                                             </div>
                                                           </label>

                                                         )}
                                                             })
                                                         }
                                                         </div>
                                                       )

                                                   ):(
                                                      item.traitTypes.name==='SINGLE_CATEGORICAL'?
                                                      (
                                                        <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                                        {
                                                            item.values.map((possible,index)=>{

                                                            if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0){
                                                              this.pushTraitsRadioDefault(item.id,possible.value);
                                                              return(

                                                            <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                              <input type="radio" name="trait_edit"  id={possible.value}  defaultChecked/ >
                                                              <div className="snippet tablet">
                                                                  <div className="figure pull-left">

                                                                      <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                              </div>
                                                            </label>

                                                          )}
                                                            else{
                                                            return(

                                                          <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                            <input type="radio" name="trait_edit" id={possible.value} / >
                                                            <div className="snippet tablet">
                                                                <div className="figure pull-left">

                                                                    <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                            </div>
                                                          </label>

                                                        )}
                                                            })
                                                      }
                                                      </div>
                                                      ):
                                                      (
                                                        item.dataTypes.name==='NUMERIC'?
                                                        (
                                                          <div className="row" style={{marginTop:'0.7%'}}>
                                                            {
                                                              <div>
                                                              <input type="number" className="col-sm-4 col-xs-6" ref={"rangeNumeric"+item.id+this.props.id} onChange={this.pushTraitsNumericRange.bind(this,item.id)} name={item.name}   style={{border:'1px solid #aaa',borderRadius:'4px'}}/>
                                                              </div>

                                                            }
                                                          </div>
                                                        ):
                                                        (
                                                          <div>
                                                          <DatePicker  pushTraitsDateRange={this.pushTraitsDateRange} traitId={item.id} units={"month"}/>
                                                          </div>
                                                        )
                                                      )

                                                   )
                                              }</div>
                                          </div>
                                      </div>
                                    )
                                 }
                              }
                        }
                        else {
                              if(this.state.response.factInstance.hasOwnProperty(item.id))
                              {
                                return(
                                  <div className="well well-sm " style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                                      <div className="name-and-button row" >
                                          <div className="name col-sm-8" style={{margin:'0%'}}>
                                              <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait.12=any&max=&offset=0&lang="+sessionStorage.locale}>
                                                   <span>{item.name}</span>
                                               </a>
                                          </div>
                                          <div className="buttons col-sm-4">
                                              <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                              <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                              <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                          </div>
                                      </div>
                                      <div className="traits">
                                            <div className="fact_instance" ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                            {
                                               this.state.response.factInstance.hasOwnProperty(item.id)?
                                               ( <div className="row" style={{width:'100%'}}>{
                                                 ( item.dataTypes.name === 'DATE' || item.dataTypes.name === 'COLOR' || item.dataTypes.name === 'NUMERIC')?
                                                 (
                                                   <span style={{marginLeft:'0.5%'}}>{this.getFormattedValue(this.state.response.factInstance[item.id],item.dataTypes.name,item.traitTypes.name,item.units)}</span>
                                                 ):
                                                 (
                                                   this.state.response.factInstance[item.id].map((it,index)=>{
                                                     if(this.fact.get(item.id)){
                                                       this.fact.get(item.id).push(it.value)
                                                     }else{
                                                       this.fact.set(item.id,[it.value])
                                                     }
                                                   return(  <button key={index} title={it.description} type="button" className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts" >
                                                            <div className="snippet tablet">
                                                            <div className="figure pull-left">
                                                            <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                            </div>
                                                            <span>{it.value}</span>
                                                            </div>
                                                            </button>
                                                          )
                                                   })
                                                 )
                                               }
                                                 </div>
                                               )
                                               :null
                                             }
                                           </div>
                                      </div>
                                  </div>
                                )
                              }
                        }
                    }
                })
              ):null
       }
       </div>
       )
   }

}
function mapStateToProps(state){
return {Login:state.Login};
}

function mapDispatchToProps(dispatch){


}

 export default connect(mapStateToProps,null)(Traits);
