import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import EllipsisText  from 'react-ellipsis-text';

import { Config } from '../Config';
import ModalPopup from '../auth/Modal.js';
import AuthUtils from '../auth/AuthUtils.js';



class Groups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responseObv:null,
      responseUser:null,
      login_modal:false,
      options:'',
      mapped:false,
      intersected:[],
      final:false,
      dropdown:[],
      loading:false
    }
    this.userGrp = [];
    this.post=[];
    this.unpost=[];
    this.getUserGroups = this.getUserGroups.bind(this)
    this.getUserGroupsWithWrite = this.getUserGroupsWithWrite.bind(this)
    this.hide = this.hide.bind(this)
    this.cleanup =this.cleanup.bind(this)
    this.getUserGroups()
  }
  getUserGroups(){
    document.body.style.cursor = "wait";
    var options={
      method: 'GET',
      url:  Config.api.API_ROOT_URL+"/observation/"+this.props.id+"/userGroups",
      // params:{
      //   id:this.props.id
      // }
    }
    axios(options)
        .then((response)=>{
          document.body.style.cursor = "default";
          this.setState({
            responseObv:response.data,
          });
          })

  }

  getUserGroupsWithWrite(){
    console.log("gggggg")
    document.body.style.cursor = "wait";
    var options={
      method: 'GET',
      url :  Config.api.API_ROOT_URL +"/user/currentUserUserGroups",
      headers : AuthUtils.getAuthHeaders(),
    }
    axios(options)
        .then((response)=>{
          document.body.style.cursor = "default";
          this.setState({
            responseUser:response.data
          });
          this.state.responseUser.map((it,index)=>{
            this.userGrp=this.userGrp.concat(it.id)
            let it1={}
            it1.description=it.description
            it1.domainName=it.domainName
            it1.foundedOn=it.foundedOn
            it1.icon=it.icon
            it1.id=it.id
            it1.value=it.name
            it1.webaddress=it.webaddress
            it1.label=it.name
            this.setState({
              dropdown:this.state.dropdown.concat(it1)
            })
          })
          this.setState({
            mapped:true
          });
          (this.state.responseUser && this.state.mapped)?
          (
            this.state.responseObv.map((edt,index)=>{
                this.setState({
                  intersected:this.state.intersected.concat(edt)
                })
            })
          ):null
          this.setState({
            final:true
          })
          console.log(this.state.intersected)
        })
  }

  show(id){
    console.log("jsjsjs")
    var obvGroups1 = 'obvGroups'+id
    var userGroups1 = 'userGroups'+id
    var buttons1='buttons'+id
    if(AuthUtils.isLoggedIn())
    {
      this.getUserGroupsWithWrite()
    }
    else {
      this.setState({
        login_modal:!(this.state.login_modal)
      });
    }
    this.refs.hasOwnProperty(obvGroups1)?(this.refs[obvGroups1].style.display="none"):null
    this.refs.hasOwnProperty(userGroups1)?(this.refs[userGroups1].style.display="block"):null
    this.refs.hasOwnProperty(buttons1)?(this.refs[buttons1].style.display="block"):null

  }

  hide(id){
    var obvGroups1 = 'obvGroups'+id
    var userGroups1 = 'userGroups'+id
    var buttons1='buttons'+id

    this.refs.hasOwnProperty(userGroups1)?(this.refs[userGroups1].style.display="none"):null
    this.refs.hasOwnProperty(buttons1)?(this.refs[buttons1].style.display="none"):null
    this.refs.hasOwnProperty(obvGroups1)?(this.refs[obvGroups1].style.display="block"):null
    this.cleanup();
  }

  cleanup(){
    this.setState({
     intersected:[],
     dropdown:[]
    })
  }

  removeGroup(id){
    console.log(this.state.intersected)
    //var x = 'chip_select'+id
    //this.refs[x].style.display="none"
    var arr1=this.state.intersected
    console.log(arr1)
    console.log(this.state.intersected)

    if(this.unpost.length>0){
        function checkIndex1(gId){
          return gId==id
        }

        var index1 = this.unpost.findIndex(checkIndex1)
        if (index1<0){
          this.unpost.push(id)
          var index2 = this.post.findIndex(checkIndex1)
          if(index2>=0){
            this.post.splice(index2,1)
          }
        }
     }
    else{
        this.unpost.push(id)
        function checkIndex2(gId){
          return gId==id
        }
        var index2 = this.post.findIndex(checkIndex2)
        if(index2>=0){
          this.post.splice(index2,1)
        }
      }
   if(arr1.length>0){
      function checkIndex(gName){
        return gName.id==id
      }
      var index = arr1.findIndex(checkIndex)
      if(index>=0)
      {
        arr1.splice(index,1)
        this.setState({
            intersected:arr1
          })
      }
    }
  }

  addGroup(val) {
   console.log(val)
    let flag=false
    let add={}
      if(val)
      {
      add.description=val.description
      add.domainName=val.domainName
      add.foundedOn=val.foundedOn
      add.icon=val.icon
      add.id=val.id
      add.name=val.value
      add.webaddress=val.webaddress
      var arr=this.state.intersected

      if(this.post.length>0){
        function checkIndex1(gId){
          return gId===add.id
        }
        var index1=this.post.findIndex(checkIndex1)
        if(index1<0){
          this.post.push(add.id)
          var index2 = this.unpost.findIndex(checkIndex1)
          if(index2>=0){
            this.unpost.splice(index2,1)
          }
        }
      }
      else{
        this.post.push(add.id)
        function checkIndex2(gId){
          return gId===add.id
        }
        var index2 = this.unpost.findIndex(checkIndex2)
        if(index2>=0){
          this.unpost.splice(index2,1)
        }
      }
      if(arr.length>0){

          function checkIndex(gName){
            return gName.id==add.id
          }
          var index = arr.findIndex(checkIndex)
            if(index< 0)
            {
              this.setState({
                intersected:this.state.intersected.concat(add)
              })
            }
       }
       else{
         this.setState({
           intersected:this.state.intersected.concat(add)
         })
       }
    }
  //console.log("Selected: " + JSON.stringify(val));
  }

  submitGroups(){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    console.log("post",this.post)
    console.log("unpost",this.unpost)
    var list1=this.post.toString()
    var list2=this.unpost.toString()
    var optionsUnpost={
      method: 'POST',
      url :   Config.api.API_ROOT_URL+"/userGroup/bulkPost",
      params:{
        pullType:"single",
        selectionType:"reset",
        objectType:"biodiv.observation.Observation",
        objectIds:this.props.id,
        submitType:"unpost",
        userGroups:list2,
        filterUrl:Config.api.ROOT_URL+"/observation/show/"+this.props.id
      },
      headers : AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    var optionsPost={
      method: 'POST',
      url :     Config.api.API_ROOT_URL+"/userGroup/bulkPost",
      params:{
        pullType:"single",
        selectionType:"reset",
        objectType:"biodiv.observation.Observation",
        objectIds:this.props.id,
        submitType:"post",
        userGroups:list1,
        filterUrl:Config.api.ROOT_URL+"/observation/show/"+this.props.id
      },
      headers : AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    this.hide(this.props.id);

    if(this.post.length>0 ||this.unpost.length>0 )
    {
        if(this.post.length>0 && this.unpost.length>0)
        {
          axios(optionsUnpost)
            .then((response)=>{
              axios(optionsPost)
                  .then((response)=>{
                    //console.log("#######################################",response)
                    document.body.style.cursor = "default";
                    this.setState({
                      loading:false
                    })
                      if(response.status == 200){
                        this.getUserGroups()
                      }

                  })
            })
        }
        else if(this.post.length==0 && this.unpost.length>0)
        {
          axios(optionsUnpost)
            .then((response)=>{
              //console.log("#######################################",response)
              document.body.style.cursor = "default";
              this.setState({
                loading:false
              })
              if(response.status == 200){
                this.getUserGroups()
              }
            })
        }
        else {
          axios(optionsPost)
            .then((response)=>{
              //console.log("#######################################",response)
              document.body.style.cursor = "default";
              this.setState({
                loading:false
              })
              if(response.status == 200){
                this.getUserGroups()
              }
            })
        }
    }
    this.post=[];
    this.unpost=[];
  }

  render(){
    return(

      <div className="well well-sm" style={{width:'99%',marginLeft:'0.5%',marginBottom:'0%'}}>
        {this.state.login_modal==true?(<ModalPopup key={this.state.options}   id={this.props.id} func={this.getUserGroupsWithWrite}/>):null}
        <div className="row" ref={"obvGroups"+this.props.id} style={{display:'block'}}>
          <div className="col-sm-10">
          {
            this.state.responseObv?
            (
              this.state.responseObv.length>0?
              (
                <div className="obvUserGroup">
                  {
                    this.state.responseObv.map((grp,index)=>{
                      return(
                        <a title={grp.name} href={grp.domainName?grp.domainName:Config.api.ROOT_URL+"/group/"+grp.webaddress+"/show"} style={{color:'#333'}}>
                        <div key={index} className="chip" >
                          <img src={`${Config.api.ROOT_URL}/biodiv/userGroups${grp.icon}`}/>
                          <EllipsisText text={grp.name} length={13} />
                        </div>
                        </a>
                      )
                    })
                  }
                </div>
              ):null
            ):null
          }
          </div>
          <div className="col-sm-2">
              <button  className="btn btn-primary btn-xs pull-right" onClick={this.show.bind(this,this.props.id)}>Edit</button>
          </div>
        </div>
        <div className="row" ref={"userGroups"+this.props.id} style={{display:'none'}}>
        <div className="col-sm-12">
         {
           (this.state.final)?
           (
             this.state.intersected.map((edt,index)=>{
              if($.inArray(edt.id,this.userGrp)>=0)
              {
                 return(
                   <div key={index} className="chip" id={"chip_select"+edt.id} ref={"chip_select"+edt.id}  onClick={this.removeGroup.bind(this,edt.id)}>
                     <img src={`${Config.api.ROOT_URL}/biodiv/userGroups${edt.icon}`}/>
                     <EllipsisText text={edt.name} length={13} />
                     <i className="glyphicon glyphicon-remove " style={{color:'blue'}}></i>
                   </div>
                 )
               }
               else{
                 return(
                   <div key={index} className="chip" id={"chip_select"+edt.id} ref={"chip_select"+edt.id} >
                     <img src={`${Config.api.ROOT_URL}/biodiv/userGroups${edt.icon}`}/>
                     <EllipsisText text={edt.name} length={13} />
                   </div>
                 )
               }
             })
           )
           :null
         }
         </div>
        </div>
        <div className="row" ref={"buttons"+this.props.id} style={{display:'none'}}>
          <div className="col-sm-6">
              <Select
                  name="form-field-name"
                  value="one"
                  options={this.state.dropdown}
                  onChange={this.addGroup.bind(this)}
                  />
          </div>
          <div className="col-sm-6">
            <div className="row pull-right" style={{marginRight:'0.2%'}}>
              <button   className="btn btn-primary btn-xs nameAgree" onClick={this.submitGroups.bind(this)} disabled={this.state.loading}>Submit</button>
              <button   className="btn btn-primary btn-xs nameAgree" onClick={this.hide.bind(this,this.props.id)} disabled={this.state.loading}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default Groups;
