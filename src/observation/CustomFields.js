import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Moment from 'react-moment'

import { Config } from '../Config';
import ModalPopup from '../auth/Modal.js';
import AuthUtils from '../auth/AuthUtils.js';
import DatePicker from '../util/customFieldUtils/PickDate.js';
import './CustomField.css'

var newArray
class CustomFields extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null,
      login_modal:false,
      options:'',
      loading:false,
      selectedValues:null,
    }
    this.customFieldMap = new Map();

    this.getCustomFields=this.getCustomFields.bind(this)
    // this.onChangeRadioDefault=this.onChangeRadioDefault.bind(this)
    // this.onChangeCheckboxDefault=this.onChangeCheckboxDefault.bind(this)
    this.pushCustomFieldDateInput=this.pushCustomFieldDateInput.bind(this)
    this.convertToDecimal=this.convertToDecimal.bind(this)
    this.clearData=this.clearData.bind(this)
    this.getFormattedValue=this.getFormattedValue.bind(this)
    this.getCustomFields(this.props.id)

  }

  getCustomFields(id){
    document.body.style.cursor = "wait";
    axios.get( Config.api.API_ROOT_URL+"/observation/customFields?obvId="+id)
        .then((response)=>{
          document.body.style.cursor = "default";
          //console.log(response.data)
          this.setState({
            response:response.data
          })
        })


  }

  show(key,obvId){
    var text="box"+key+obvId
    var edit1="edit"+key+obvId
    var submit1="submit"+key+obvId
    var Cfvalue="cfvalue"+key+obvId
    var cancel1="cancel"+key+obvId
    this.refs.hasOwnProperty(text)?(this.refs[text].style.display="block"):null
    this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="none"):null
    this.refs.hasOwnProperty(Cfvalue)?(this.refs[Cfvalue].style.display="none"):null
    this.refs.hasOwnProperty(submit1)?(this.refs[submit1].style.display="block"):null
    this.refs.hasOwnProperty(cancel1)?(this.refs[cancel1].style.display="block"):null
  }

  convertToDecimal(value){
    var val = Number(value);
    if(value !== null){

      //console.log("decimal value",value)
      var valueString = value.toString();
      var res = valueString.split(".");

      if(res.length == 1 || res[1].length < 3) {

          val = val.toFixed(2);
      }
    }
  return val;
  }

  customFieldPost(key,cfId,hasOptions,dataType){

    var proceed = true;

    if(dataType==='INTEGER' && hasOptions===null){
      var noOptionInteger1="no_option_integer"+this.props.id+cfId
      if(this.refs[noOptionInteger1].value%1 !=0 ){
        proceed = false;
        alert("This input accepts only integer values")
      }
    }

    if(dataType==='TEXT' && hasOptions===null){
      var noOptionText1="no_option_text"+this.props.id+cfId
      if(this.refs[noOptionText1].value.length>400){
        proceed = false;
        alert("This input allows only 400 characters")
      }
    }

    if(dataType==='DATE'){
      if(!this.customFieldMap.has(cfId)){
        proceed = false;
        alert("Please select a date")
      }
    }

    if(proceed === true){

      document.body.style.cursor = "wait";
      this.setState({
        loading:true
      })

      var text="box"+key+this.props.id
      var Cfvalue="cfvalue"+key+this.props.id
      var edit1="edit"+key+this.props.id
      var submit1="submit"+key+this.props.id
      var value;

      if(hasOptions===null){
        switch(dataType){
          case 'INTEGER':
              var noOptionInteger1="no_option_integer"+this.props.id+cfId
              value=this.refs[noOptionInteger1].value
              value=value.toString()
              break;
          case 'DECIMAL':
              var noOptionDecimal1="no_option_decimal"+this.props.id+cfId
              value=this.refs[noOptionDecimal1].value
              value = this.convertToDecimal(value)
              value=value.toString()
              break;
          case 'TEXT':
              var noOptionText1="no_option_text"+this.props.id+cfId
              value=this.refs[noOptionText1].value
              break;
          case 'PARAGRAPH_TEXT':
              var noOptionParagraph1="no_option_paragraph"+this.props.id+cfId
              value=this.refs[noOptionParagraph1].value
              break;
          case 'DATE':
              value=this.customFieldMap.get(cfId).toString()
              break;
        }
      }else{
              value=this.customFieldMap.get(cfId).toString()
      }


      var loggedInUserId=null;
      if(AuthUtils.getLoggedInUser() !== null){
        loggedInUserId = AuthUtils.getLoggedInUser().id;
      }
      if(loggedInUserId !== null){
        var options={
          method:'POST',
          url :    Config.api.API_ROOT_URL+"/observation/updateCustomField",
          params:{
            fieldValue:value,
            cfId:cfId,
            obvId:this.props.id,
            loggedInUserId:loggedInUserId,
            isAdmin:AuthUtils.isAdmin(),
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }
      }else{
        var options={
          method:'POST',
          url :    Config.api.API_ROOT_URL+"/observation/updateCustomField",
          params:{
            fieldValue:value,
            cfId:cfId,
            obvId:this.props.id,
            isAdmin:AuthUtils.isAdmin(),
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }
      }


      if(value!=="" && value !==null && value!==undefined)
      {
        this.clearData(dataType,hasOptions,cfId)

        //this.refs.hasOwnProperty(custom1)?(this.refs[custom1].value=""):null
        this.refs.hasOwnProperty(Cfvalue)?(this.refs[Cfvalue].style.display="block"):null
        this.refs.hasOwnProperty(text)?(this.refs[text].style.display="none"):null
        this.refs.hasOwnProperty(submit1)?(this.refs[submit1].style.display="none"):null
        this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="block"):null

        axios(options)
            .then((response)=>{
              //console.log("comment",response)
              document.body.style.cursor = "default";
              this.setState({
                loading:false
              })
              if(response.status == 200){
                this.getCustomFields(this.props.id)
              }
            })
            .catch((error)=>{
              //console.log("response",error.response)
              document.body.style.cursor = "default";
              this.setState({
                loading:false
              })
              if(error.response.status == 401)
              {
                this.setState({
                login_modal:!(this.state.login_modal),
                options:options
              })
              }else{
              console.log(error.response.statusText)
            }
            })
        }else{
          document.body.style.cursor = "default";
          this.setState({
            loading:false
          })
        }

    }

  }

  clearData(dataType,hasOptions,cfId){

    if(this.customFieldMap.has(cfId)){
      this.customFieldMap.delete(cfId)
    }

    if((dataType==='INTEGER' || dataType==='DECIMAL' || dataType==='TEXT' || dataType==='PARAGRAPH_TEXT') && hasOptions===null){

      switch(dataType){

        case 'INTEGER':
          let noOptionInteger1="no_option_integer"+this.props.id+cfId
          this.refs[noOptionInteger1]?this.refs[noOptionInteger1].value='':null
          break;

        case 'DECIMAL':
          let noOptionDecimal1="no_option_decimal"+this.props.id+cfId
          this.refs[noOptionDecimal1].value=''
          break;

        case 'TEXT':
          let noOptionText1="no_option_text"+this.props.id+cfId
          this.refs[noOptionText1].value=''
          break;

        case 'PARAGRAPH_TEXT':
          let noOptionParagraph1="no_option_paragraph"+this.props.id+cfId
          this.refs[noOptionParagraph1].value=''
          break;
      }

    }

    if((dataType==='INTEGER' || dataType==='DECIMAL' || dataType==='TEXT' || dataType==='PARAGRAPH_TEXT') && hasOptions!==null){

        hasOptions.split(",").map((list,index)=>{
          var ref1 = "cfOptions"+list+cfId
          this.refs[ref1].checked=false;
        })
    }

    if(dataType==='DATE'){
      // console.log("data type Date")
      // this.child.resetDate();
    }

  }

    onChangeRadio(cfId,cfOption){
      //console.log("radioChange")
      let array = []
      array.push(cfOption)
      this.customFieldMap.set(cfId,array)
      this.setState({
        selectedValues:this.customFieldMap
      })
        //console.log("map",this.customFieldMap)
    }
    //
    // onChangeRadioDefault(cfId,cfOption){
    //   console.log("radioChange")
    //   let array = []
    //   array.push(cfOption)
    //   this.customFieldMap.set(cfId,array)
    //   // this.setState({
    //   //   selectedValues:this.customFieldMap
    //   // })
    //     console.log("map",this.customFieldMap)
    // }

    onChangeCheckbox(cfId,cfOption){
      //console.log("checkboxChange")
      if(this.customFieldMap.get(cfId) !== undefined){
        let array = this.customFieldMap.get(cfId)
        //console.log("array",array)
        function checkIndex1(gId){
          return gId===cfOption
        }
        let index = array.findIndex(checkIndex1)
        if(index<0){
          array.push(cfOption)
        }else{
          array.splice(index,1)
        }
        //console.log("array1",array)
        this.customFieldMap.set(cfId,array)
      }else{
        let array = []
        array.push(cfOption)
        this.customFieldMap.set(cfId,array)
      }
      //console.log("map",this.customFieldMap)
      this.setState({
        selectedValues:this.customFieldMap
      })
    }

    // onChangeCheckboxDefault(cfId,cfOption){
    //   console.log("checkboxChange")
    //   if(this.customFieldMap.get(cfId) !== undefined){
    //     let array = this.customFieldMap.get(cfId)
    //     function checkIndex1(gId){
    //       return gId===cfOption
    //     }
    //     let index = array.findIndex(checkIndex1)
    //     if(index<0){
    //       array.push(cfOption)
    //     }else{
    //       //array.splice(index,1)
    //     }
    //     this.customFieldMap.set(cfId,array)
    //   }else{
    //     let array = []
    //     array.push(cfOption)
    //     this.customFieldMap.set(cfId,array)
    //   }
    //   console.log("map",this.customFieldMap)
    //   // this.setState({
    //   //   selectedValues:this.customFieldMap
    //   // })
    // }

  pushCustomFieldDateInput(cfId,date){
    // console.log("radioChange")
    // let array = []
    // array.push(cfOption)
    this.customFieldMap.set(cfId,date)
    // this.setState({
    //   selectedValues:this.customFieldMap
    // })
    //console.log("customFieldMapDatepush",this.customFieldMap)
  }

  getFormattedValue(value,dataType){

    switch(dataType){

      case 'DATE':
        value = <Moment format="DD-MM-YYYY" fromNow>{new Date(value)}</Moment>
        break;

      case 'DECIMAL':
        value = this.convertToDecimal(value)
        break;
    }

    return value;
  }

  expandHeight(){
    if(  document.getElementById('demo'+this.props.id).classList.contains('colla')){
      document.getElementById('demo'+this.props.id).classList.remove('colla')
      //document.getElementById('demo'+this.props.id).classList.add('in')
    }else{
      //document.getElementById('demo'+this.props.id).classList.remove('in')
      document.getElementById('demo'+this.props.id).classList.add('colla')
      if( !document.getElementById('demo'+this.props.id).classList.contains('min_colla')){
        document.getElementById('demo'+this.props.id).classList.add('min_colla')
      }
    }
    if(  document.getElementById('downBtn'+this.props.id).classList.contains('fa-angle-double-up')){
      document.getElementById('downBtn'+this.props.id).classList.remove('fa-angle-double-up')
      document.getElementById('downBtn'+this.props.id).classList.add('fa-angle-double-down')
    }else{
      document.getElementById('downBtn'+this.props.id).classList.remove('fa-angle-double-down')
      document.getElementById('downBtn'+this.props.id).classList.add('fa-angle-double-up')
    }

  }

  cancelEdit(key){
      var edit1="edit"+key+this.props.id;
      var submit1="submit"+key+this.props.id;
      var cancel1="cancel"+key+this.props.id;
      var box1="box"+key+this.props.id;
      var cfvalue1="cfvalue"+key+this.props.id;
      this.refs.hasOwnProperty(box1)?(this.refs[box1].style.display="none"):null
      this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="block"):null
      this.refs.hasOwnProperty(cfvalue1)?(this.refs[cfvalue1].style.display="block"):null
      this.refs.hasOwnProperty(submit1)?(this.refs[submit1].style.display="none"):null
      this.refs.hasOwnProperty(cancel1)?(this.refs[cancel1].style.display="none"):null
  }

  render(){

      return(
        <div >
        {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getCustomFields} id={this.props.id} />):null}
          <div id={"demo"+this.props.id} className="collapse colla" style={{marginBottom:'0px'}}>
        {  this.state.response?(
          this.state.response.length>0?
          (
            this.state.response.map((item,index)=>{
              return(
                <div key={index} className="row well well-sm" style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                    <div className="col-sm-3"><b>{item.key}</b></div>
                    <div className="col-sm-7">
                        <div className="cfValue" ref={"cfvalue"+item.key + this.props.id} style={{display:'block'}}>

                                <span >{item.value?this.getFormattedValue(item.value,item.dataType):null}</span>

                        </div>
                        <div className="cfInlineEdit" ref={"box"+item.key + this.props.id} style={{display:'none'}}>
                        {
                          item.options?
                          (

                              (item.dataType==='INTEGER' || item.dataType==='DECIMAL' || item.dataType==='TEXT')?
                              (
                                <div className="btn-group dropdown todos" id="todos">
                                  {
                                    item.allowedMultiple === true?
                                    (
                                      <button className="btn btn-default dropdown-toggle botn-todos" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {this.state.selectedValues?(this.state.selectedValues.get(item.id)?(this.state.selectedValues.get(item.id).length>0?this.state.selectedValues.get(item.id).toString():"Select one(or more) option"):"Select one(or more) option"):"Select one(or more) option"}
                                        <span className="caret caret-posicion"></span>
                                      </button>
                                  ):
                                  (
                                    <button className="btn btn-default dropdown-toggle botn-todos" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {this.state.selectedValues?(this.state.selectedValues.get(item.id)?(this.state.selectedValues.get(item.id).length>0?this.state.selectedValues.get(item.id).toString():"Select one option"):"Select one option"):"Select one option"}
                                      <span className="caret caret-posicion"></span>
                                    </button>
                                  )
                                  }

                                  <ul className="dropdown-menu custom_dropdown_custom_field multi-column-dropdown" aria-labelledby="dropdownMenu1">
                                  <div className="row" style={{marginLeft:'1%'}}>
                                  {
                                    item.options.split(",").map((it,index)=>{
                                      return(
                                        index%10 ===0?
                                        (
                                            <div key={index} className="col-sm-3">
                                            {
                                              item.options.split(",").splice(index,10).map((list,index)=>{

                                                return(
                                                    <div key={index} className="row">
                                                      {
                                                          item.allowedMultiple === true?
                                                          (
                                                              <li  key={index}><input onChange={this.onChangeCheckbox.bind(this,item.id,list)} ref={"cfOptions"+list+item.id} value={list} name={"radio_cf"+list} type="checkbox" className="todoss"/><span>{"       "+list}</span></li>

                                                          ):
                                                          (
                                                              <li key={index}><input onChange={this.onChangeRadio.bind(this,item.id,list)} ref={"cfOptions"+list+item.id} value={list} name="radio_cf" type="radio" className="todoss" /><span>{"       "+list}</span></li>
                                                          )
                                                      }
                                                    </div>
                                                )
                                              })
                                            }
                                            </div>

                                        ):null
                                      )

                                    })
                                  }
                                  </div>
                                  </ul>
                                </div>
                              ):null


                          ):
                          (
                            item.dataType==='INTEGER'?(
                              <div><input type="number" name="integer"  ref={"no_option_integer"+this.props.id+item.id} style={{border:'1px solid #aaa',borderRadius:'4px'}}/></div>
                            ) :null

                            ||

                            item.dataType==='DECIMAL'? (
                              <div><input type="number" name="decimal" ref={"no_option_decimal"+this.props.id+item.id}   style={{border:'1px solid #aaa',borderRadius:'4px'}}/></div>
                            ):null
                            ||
                            item.dataType==='TEXT'?(
                              <div><input type="text" name="text" ref={"no_option_text"+this.props.id+item.id}  style={{border:'1px solid #aaa',borderRadius:'4px',width:'100%'}}/></div>
                            ):null
                            ||
                            item.dataType==='PARAGRAPH_TEXT'?
                            (
                              <textarea ref={"no_option_paragraph"+this.props.id+item.id} style={{width:'100%',borderRadius:'10px'}} name={"CustomField_" + item.key}
                               placeholder={item.notes}
                               title={item.notes}
                              >
                              </textarea>
                            ):null
                            ||

                            item.dataType==='DATE'?
                            (
                            <div><DatePicker obvId={this.props.id} cfId={item.id} pushCustomFieldDateInput={this.pushCustomFieldDateInput}/></div>
                          ) :null

                          )
                        }
                        </div>
                    </div>
                    <div className="col-sm-2">
                        {
                          (item.allowedParticipation===true || (AuthUtils.isLoggedIn() && AuthUtils.getLoggedInUser().id===this.props.owner) || AuthUtils.isAdmin())?
                          (
                              <a className="editCustomField btn btn-xs btn-primary pull-right" ref={"cancel"+item.key +this.props.id} onClick={this.cancelEdit.bind(this,item.key)}  style={{display:'none',width:'50px'}} disabled={this.state.loading}>Cancel</a>
                            ):null
                        }

                          {
                            (item.allowedParticipation===true || (AuthUtils.isLoggedIn() && AuthUtils.getLoggedInUser().id===this.props.owner) || AuthUtils.isAdmin())?
                            (
                              <a className="editCustomField btn btn-xs btn-primary pull-right" ref={"submit"+item.key + this.props.id} onClick={this.customFieldPost.bind(this,item.key,item.id,item.options,item.dataType)} style={{display:'none',width:'50px'}} disabled={this.state.loading}>Submit</a>

                            ):null
                          }

                          {

                            (item.allowedParticipation===true || (AuthUtils.isLoggedIn() && AuthUtils.getLoggedInUser().id===this.props.owner) || AuthUtils.isAdmin())?
                            (
                            <a className="editCustomField btn btn-xs btn-primary pull-right" ref={"edit"+item.key + this.props.id} onClick={this.show.bind(this,item.key,this.props.id)} style={{display:'block',width:'100px'}} disabled={this.state.loading}>Edit</a>
                          ):null
                          }
                    </div>
                </div>
              )
            })

          ):(
            <h5 style={{color:'red',marginLeft:'5%',marginBottom:'0.2%'}}>No custom fields for this observation</h5>
          )
        ):null
        }
        </div>
        {
          this.state.response && this.state.response.length>0?(
            <center style={{marginBottom:'-20px'}}><span id={"downBtn"+this.props.id} className="fa fa-angle-double-down" onClick={this.expandHeight.bind(this)} data-toggle="collapse" data-target={"#demo"+this.props.id}></span></center>
          ):null
        }
        </div>
      )
    }
  }

  export default CustomFields;
