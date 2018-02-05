import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Config } from '../Config';
import ModalPopup from '../auth/Modal.js';
import AuthUtils from '../auth/AuthUtils.js';

class CustomFields extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null,
      login_modal:false,
      options:''
    }

    this.getCustomFields=this.getCustomFields.bind(this)
    this.getCustomFields(this.props.id)

  }

  getCustomFields(id){
    axios.get( Config.api.API_ROOT_URL+"/observation/customFields?obvId="+id)
        .then((response)=>{
          console.log(response.data)
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
    this.refs.hasOwnProperty(text)?(this.refs[text].style.display="block"):null
    this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="none"):null
    this.refs.hasOwnProperty(Cfvalue)?(this.refs[Cfvalue].style.display="none"):null
    this.refs.hasOwnProperty(submit1)?(this.refs[submit1].style.display="block"):null
  }


  customFieldPost(key,cfId){
    var id=this.props.id
    var custom1="custom"+this.props.id+cfId
    var value1=this.refs[custom1].value
    var text="box"+key+this.props.id
    var Cfvalue="cfvalue"+key+this.props.id
    var edit1="edit"+key+this.props.id
    var submit1="submit"+key+this.props.id
    var options={
      method:'POST',
      url :    Config.api.API_ROOT_URL+"/observation/updateCustomField",
      params:{
        fieldValue:value1,
        cfId:cfId,
        obvId:id
      },
      headers : AuthUtils.getAuthHeaders(),
      json: 'true'
    }

    if(value1!="")
    {
    this.refs.hasOwnProperty(custom1)?(this.refs[custom1].value=""):null
    this.refs.hasOwnProperty(Cfvalue)?(this.refs[Cfvalue].style.display="block"):null
    this.refs.hasOwnProperty(text)?(this.refs[text].style.display="none"):null
    this.refs.hasOwnProperty(submit1)?(this.refs[submit1].style.display="none"):null
    this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="block"):null

    axios(options)
        .then((response)=>{
          //console.log("comment",response)
          if(response.status == 200){
            this.getCustomFields(this.props.id)
          }
        })
        .catch((error)=>{
          //console.log("response",error.response)
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
      }

    }


  render(){
      console.log(this.state.response)
      return(
        <div>
        {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getCustomFields} id={this.props.id} />):null}
        {  this.state.response?(
          this.state.response.length>0?
          (
            this.state.response.map((item,index)=>{
              return(
                <div key={index} className="row well well-sm" style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                    <div className="col-sm-2">{item.key}</div>
                    <div className="col-sm-8">
                        <div className="cfValue" ref={"cfvalue"+item.key + this.props.id} style={{display:'block'}}>
                              {item.value!= ""?
                                (<span style={{color:'#4322D8'}}>{item.value}</span>):null
                              }
                        </div>
                        <div className="cfInlineEdit" ref={"box"+item.key + this.props.id} style={{display:'none'}}>
                                    <textarea ref={"custom"+this.props.id+item.id} style={{width:'100%',borderRadius:'10px'}} name={"CustomField_" + item.key}
                                     placeholder={item.notes}
                                     title={item.notes}
                                    >
                                    </textarea>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="editCustomField btn btn-xs btn-primary" ref={"submit"+item.key + this.props.id} onClick={this.customFieldPost.bind(this,item.key,item.id)} style={{display:'none'}} >Submit</div>
                        <div className="editCustomField btn btn-xs btn-primary" ref={"edit"+item.key + this.props.id} onClick={this.show.bind(this,item.key,this.props.id,)} style={{display:'block'}}>Edit</div>
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
      )
    }
  }

  export default CustomFields;
