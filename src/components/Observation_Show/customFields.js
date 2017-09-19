import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ROOT_URL} from '../../actions/index.js'
import ModalPopup from '../auth/modal.js';

class CustomFields extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null,
      login_modal:false,
      options:''
    }
    console.log("custom called",this.props.id)
    this.getCustomFields=this.getCustomFields.bind(this)
    this.getCustomFields(this.props.id)

  }

  getCustomFields(id){
    axios.get(ROOT_URL+"/observation/customFields?objectId="+id)
        .then((response)=>{
          console.log(response.data)
          this.setState({
            response:response.data.customFields
          })
        })


  }

  show(key,obvId)
  {
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
      url :   ROOT_URL+"/api/observation/updateCustomField?fieldValue="+value1+"&cfId="+cfId+"&obvId="+id,
      headers :{
        'X-Auth-Token' : localStorage.getItem('token'),
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288",
        'Accept'        :"application/json"
      },
      json: 'true'
    }

    this.refs.hasOwnProperty(custom1)?(this.refs[custom1].value=""):null
    this.refs.hasOwnProperty(Cfvalue)?(this.refs[Cfvalue].style.display="block"):null
    this.refs.hasOwnProperty(text)?(this.refs[text].style.display="none"):null
    this.refs.hasOwnProperty(submit1)?(this.refs[submit1].style.display="none"):null
    this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="block"):null

    axios(options)
        .then((response)=>{
          console.log("comment",response)
          this.getCustomFields(this.props.id)
        })
        .catch((response)=>{
          (response=="Error: Request failed with status code 401")?
          (
            this.setState({
            login_modal:!(this.state.login_modal),
            options:options
          })

          ):console.log("fofoofof")
        })


    }


  render(){
      console.log(this.state.response)
      return(
        <div>
        {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getCustomFields} id={this.props.id}/>):null}
        {  this.state.response?(
          Object.keys(this.state.response).length>0?
          (
            Object.keys(this.state.response).map((item)=>{
              return(
                <div className="row well well-sm">
                    <div className="col-sm-2">{this.state.response[item].key}</div>
                    <div className="col-sm-8">
                        <div className="cfValue" ref={"cfvalue"+this.state.response[item].key + this.props.id} style={{display:'block'}}>
                              {this.state.response[item].value!==null?
                                (<h4 style={{color:'#4322D8'}}>{this.state.response[item].value}</h4>):null
                              }
                        </div>
                        <div className="cfInlineEdit" ref={"box"+this.state.response[item].key + this.props.id} style={{display:'none'}}>
                                    <textarea ref={"custom"+this.props.id+this.state.response[item].id} style={{width:'100%'}} name={"CustomField_" + this.state.response[item].key}
                                     placeholder="Write notes about traditional beliefs, customs, and stories on this tree"
                                     title="Write notes about traditional beliefs, customs, and stories on this tree"
                                    >
                                    </textarea>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="editCustomField btn btn-small btn-primary" ref={"submit"+this.state.response[item].key + this.props.id} onClick={this.customFieldPost.bind(this,this.state.response[item].key,this.state.response[item].id)} style={{display:'none'}} >Submit</div>
                        <div className="editCustomField btn btn-small btn-primary" ref={"edit"+this.state.response[item].key + this.props.id} onClick={this.show.bind(this,this.state.response[item].key,this.props.id,)} style={{display:'block'}}>Edit</div>
                    </div>
                </div>
              )
            })

          ):(
            <h5 style={{color:'red'}}>No custom fields for this observation</h5>
          )
        ):null
        }
        </div>
      )
    }
  }

  export default CustomFields;
