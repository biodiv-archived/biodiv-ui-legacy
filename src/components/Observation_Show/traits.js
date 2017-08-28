import React, {Component} from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../actions/index.js'
import './traits.css'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery'

class Traits extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null
    }
    this.fact=[];
    this.getTraits=this.getTraits.bind(this)
    this.getTraits(this.props.id,this.props.sGroup)
}

   getTraits(id,sGroup){
    axios.get(ROOT_URL+"/trait/list?objectId="+id+"&objectType=species.participation.Observation&sGroup="+sGroup+"&isObservationTrait=true&ifOwns=false&showInObservation=true&loadMore=true&displayAny=false&editable=true&fromObservationShow=show&filterable=false&_=1500873700939&format=json")
        .then((response)=>{

          this.setState({
            response:response.data.model
          })

        })

}
  show(uni,item){

    console.log("agdambadam")
    console.log(this.refs)
    var fact1='fact_'+uni+item


    var edit1='edit_'+uni+item
    var onclick_edit1='onclick_edit_'+uni+item
    var sub1='sub_'+uni+item
    var cancel1='cancel_'+uni+item
   this.refs.hasOwnProperty(fact1)?(this.refs[fact1].style.display="none"):null

   this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="none"):null
   this.refs.hasOwnProperty(onclick_edit1)?(this.refs[onclick_edit1].style.display="block"):null
   this.refs.hasOwnProperty(sub1)?(this.refs[sub1].style.display="block"):null
   this.refs.hasOwnProperty(cancel1)?(this.refs[cancel1].style.display="block"):null

}

  hide(uni,item){
    var fact1='fact_'+uni+item
    var edit1='edit_'+uni+item
    var onclick_edit1='onclick_edit_'+uni+item
    var sub1='sub_'+uni+item
    var cancel1='cancel_'+uni+item
    this.refs.hasOwnProperty(fact1)?(this.refs[fact1].style.display="block"):null
    this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="block"):null
    this.refs.hasOwnProperty(onclick_edit1)?(this.refs[onclick_edit1].style.display="none"):null
    this.refs.hasOwnProperty(sub1)?(this.refs[sub1].style.display="none"):null
    this.refs.hasOwnProperty(cancel1)?(this.refs[cancel1].style.display="none"):null
  }




  render(){
    console.log(this.state)
    var fact1=this.state.response
    return(    <div className="pre-scrollable">
        {
            this.state.response?(this.state.response.instanceList.map((item)=>{

                         return(
                        <div className="well well-sm ">
                            <div className="name-and-button row">
                                <div className="name col-sm-8">
                                    <a href={ROOT_URL+"/trait/show/"+item.id+"/?trait.12=any&max=&offset=0"}>
                                         <h4>{item.name}  </h4>
                                     </a>
                                </div>
                                <div className="buttons col-sm-4">
                                    {
                                      this.props.owner?
                                      (
                                        <a className="btn btn-small btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'block'}} onClick={this.show.bind(this,this.props.id,item.id)}>edit</a>
                                      ):null
                                    }
                                    <a className="btn btn-small btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none'}} onClick={this.hide.bind(this,this.props.id,item.id)}>cancel</a>
                                    <input className="btn btn-small btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none'}} />
                                </div>
                            </div>
                            <hr/>
                            <div className="traits row">
                                  <div className="fact_instance col-sm-12 col-xs-12 col-md-12 col-lg-12" ref={"fact_"+this.props.id+item.id} style={{display:'block'}}>
                                  {
                                     this.state.response.factInstance.hasOwnProperty(item.id)?
                                     (
                                       this.state.response.factInstance[item.id].map((it)=>{
                                         this.fact.push(it.value)
                                       return(  <button type="button" className="btn btn-info col-sm-4 col-xs-12 col-md-2 active" data-toggle="button" aria-pressed="false" id="trait_fatcs" clicked>
                                                <div className="snippet tablet">
                                                <div className="figure pull-left">
                                                <img src={ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                <span>{it.value}</span>
                                                </div>
                                                </div>
                                                </button>
                                              )
                                       })
                                     )
                                     :null
                                   }
                                 </div>
                                 <div className="edit_data col-sm-12 col-xs-12 col-md-12 col-lg-12" ref={"onclick_edit_"+this.props.id+item.id} style={{display:'none'}}>{
                                       item.traitTypes.name==='MULTIPLE_CATEGORICAL'?
                                       (

                                         <div className="btn-group row" data-toggle="buttons" style={{margin:'2%'}}>
                                         {

                                             item.values.map((possible)=>{
                                               console.log(this.fact,possible.value)
                                               if($.inArray(possible.value,this.fact)>=0)
                                               {return(

                                             <label className="btn btn-info col-sm-4 col-xs-12 col-md-3 active" id="checkbox_select" >
                                               <input type="checkbox"  name={possible.value} autoComplete="off" checked/ >
                                               <div className="snippet tablet">
                                                   <div className="figure pull-left">

                                                       <img className="pull-left" src={ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>
                                                       <span>{possible.value}</span>

                                                   </div>
                                               </div>
                                             </label>

                                           )}
                                             else{
                                             return(

                                           <label className="btn btn-info col-sm-4 col-xs-12 col-md-3 " id="checkbox_select" >
                                             <input type="checkbox" name={possible.value} autoComplete="off" / >
                                             <div className="snippet tablet">
                                                 <div className="figure pull-left">

                                                     <img className="pull-left" src={ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>
                                                     <span>{possible.value}</span>

                                                 </div>
                                             </div>
                                           </label>

                                         )}
                                             })
                                         }
                                         </div>

                                     ):(
                                           <div className="btn-group row" data-toggle="buttons" style={{margin:'2%'}}>
                                           {
                                               item.values.map((possible)=>{
                                                 console.log(this.fact,possible.value)
                                               if($.inArray(possible.value,this.fact)>=0){
                                                 return(

                                               <label className="btn btn-info col-sm-6 col-xs-12 col-md-6 active" id="radio_select">
                                                 <input type="radio" name="trait_edit" id={possible.value} checked/ >
                                                 <div className="snippet tablet">
                                                     <div className="figure pull-left">

                                                         <img src={ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>
                                                         <span>{possible.value}</span>

                                                     </div>
                                                 </div>
                                               </label>

                                             )}
                                               else{
                                               return(

                                             <label className="btn btn-info col-sm-6 col-xs-12 col-md-6" id="radio_select">
                                               <input type="radio" name="trait_edit" id={possible.value}/ >
                                               <div className="snippet tablet">
                                                   <div className="figure pull-left">

                                                       <img src={ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>
                                                       <span>{possible.value}</span>

                                                   </div>
                                               </div>
                                             </label>

                                           )}
                                               })
                                         }
                                         </div>
                                     )
                                }</div>
                            </div>
                        </div>
                       )
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

 export default connect(mapStateToProps,mapDispatchToProps)(Traits);
