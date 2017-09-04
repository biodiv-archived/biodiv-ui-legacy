import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ROOT_URL} from '../../actions/index.js'

var id
class CustomFields extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null
    }
    console.log("custom called",this.props.id)
    id=this.props.id
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
    this.refs.hasOwnProperty(text)?(this.refs[text].style.display="block"):null
    this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="none"):null
    this.refs.hasOwnProperty(submit1)?(this.refs[submit1].style.display="block"):null
  }


  customFieldPost(cfId){

    var id=this.props.id
    var custom1="custom"+this.props.id+cfId
    var value1=this.refs[custom1].value
    var options={
      method:'POST',
      url :   ROOT_URL+"/api/observation/updateCustomField?fieldValue="+value1+"&cfId="+cfId+"&obvId="+id,
      headers :{
        'X-Auth-Token' : "1t2l9rdqkc3f899e4cvd159ibfk56h6j",
        'X-AppKey'     : "87aae8c4-7b84-4539-b8a3-42ff737eda0a",
        'Accept'        :"application/json"
      },
      json: 'true'
    }

    axios(options)
        .then((response)=>{
          console.log("comment",response)
        })
    }


  render(){
      console.log(this.state.response)
      return(
        <div>
        {  this.state.response?(
          Object.keys(this.state.response).length>0?
          (
            Object.keys(this.state.response).map((item)=>{
              return(
                <div className="row well well-sm">
                    <div className="col-sm-2">{this.state.response[item].key}</div>
                    <div className="col-sm-8">
                        <div className="cfInlineEdit" ref={"box"+this.state.response[item].key + this.props.id} style={{display:'none'}}>
                                    <textarea ref={"custom"+this.props.id+this.state.response[item].id} style={{width:'100%'}} name={"CustomField_" + this.state.response[item].key}
                                     placeholder="Write notes about traditional beliefs, customs, and stories on this tree"
                                     title="Write notes about traditional beliefs, customs, and stories on this tree"
                                    >
                                    </textarea>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="editCustomField btn btn-small btn-primary" ref={"submit"+this.state.response[item].key + this.props.id} onClick={this.customFieldPost.bind(this,this.state.response[item].id)} style={{display:'none'}} >Submit</div>
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
