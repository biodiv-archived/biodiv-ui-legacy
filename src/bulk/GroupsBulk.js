import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import EllipsisText  from 'react-ellipsis-text';

import AuthUtils from '../auth/AuthUtils.js'
import { Config } from '../Config';

class GroupsBulk extends React.Component{
  constructor(props){
    super(props)
    this.state={
      responseUser:[],
      showPost:[],
      showUnpost:[],
      dropdown:[],
      flag:true
    }
    this.post=[];
    this.unpost=[];
    this.checked="Post to Groups";
    this.getUserGroupsWithWrite = this.getUserGroupsWithWrite.bind(this)
    this.state.responseUser.length==0?this.getUserGroupsWithWrite():null
    console.log("checking_id",this.props.ids)
    console.log(this.props.selectAll)
  }

  getUserGroupsWithWrite(){
    var options={
      method: 'GET',
      url :   Config.api.API_ROOT_URL +"/user/currentUserUserGroups",
      headers : AuthUtils.getAuthHeaders(),
    }

    axios(options)
      .then((response)=>{
        this.setState({
          responseUser:response.data
        });
        this.state.responseUser.map((it,index)=>{
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
      })
  }

  addGroupPost(val){
    let add={}
    if(val){
      add.description=val.description
      add.domainName=val.domainName
      add.foundedOn=val.foundedOn
      add.icon=val.icon
      add.id=val.id
      add.name=val.value
      add.webaddress=val.webaddress
      var arr=this.state.showPost

      if(arr.length>0){
        function checkIndex(gName){
          return gName.id==add.id
        }
        var index = arr.findIndex(checkIndex)
        if(index<0){
          if(index< 0)
          {
            this.setState({
              showPost:this.state.showPost.concat(add)
            })
          }
        }
      }
      else{
        this.setState({
          showPost:this.state.showPost.concat(add)
        })
      }

      if(this.post.length>0){
        function checkIndex1(gId){
          return gId===add.id
        }
        var index1=this.post.findIndex(checkIndex1)
        if(index1<0){
          this.post.push(add.id)
        }
      }
      else{
        this.post.push(add.id)
      }

    }
    console.log(this.post)
  }

  addGroupUnPost(val){
    let add={}
    if(val){
      add.description=val.description
      add.domainName=val.domainName
      add.foundedOn=val.foundedOn
      add.icon=val.icon
      add.id=val.id
      add.name=val.value
      add.webaddress=val.webaddress
      var arr=this.state.showUnpost

      if(arr.length>0){
        function checkIndex(gName){
          return gName.id==add.id
        }
        var index = arr.findIndex(checkIndex)
        if(index<0){
          if(index< 0)
          {
            this.setState({
              showUnpost:this.state.showUnpost.concat(add)
            })
          }
        }
      }
      else{
        this.setState({
          showUnpost:this.state.showUnpost.concat(add)
        })
      }

      if(this.unpost.length>0){
        function checkIndex1(gId){
          return gId===add.id
        }
        var index1=this.unpost.findIndex(checkIndex1)
        if(index1<0){
          this.unpost.push(add.id)
        }
      }
      else{
        this.unpost.push(add.id)
      }

    }
    console.log(this.unpost)
  }

  removeGroupPost(id){
    console.log(id)
    var arr1=this.state.showPost

    if(arr1.length>0){
       function checkIndex(gName){
         return gName.id==id
       }
       var index = arr1.findIndex(checkIndex)
       if(index>=0)
       {
         arr1.splice(index,1)
         this.setState({
             showPost:arr1
           })
       }
     }

     if(this.post.length>0){
       function checkIndex1(gId){
         console.log(gId)
         return gId==id
       }
       var index1 = this.post.findIndex(checkIndex1)
       console.log(index1)
       if(index>=0){
         this.post.splice(index1,1)
       }
     }
     console.log(this.post)
  }

  removeGroupUnPost(id){
    var arr1=this.state.showUnpost

    if(arr1.length>0){
       function checkIndex(gName){
         return gName.id==id
       }
       var index = arr1.findIndex(checkIndex)
       if(index>=0)
       {
         arr1.splice(index,1)
         this.setState({
             showUnpost:arr1
           })
       }
     }

     if(this.unpost.length>0){
       function checkIndex1(gId){
         return gId==id
       }
       var index1 = this.unpost.findIndex(checkIndex1)
       if(index>=0){
         this.unpost.splice(index1,1)
       }
     }
  }

  change(){
    if(document.getElementById('postRadio').checked) {
      if((document.getElementById('postRadio').value)!=this.checked)
        {
          this.checked = document.getElementById('postRadio').value
          this.setState({
            flag:!this.state.flag
          })
        }
    }
    else if(document.getElementById('unpostRadio').checked) {
      if((document.getElementById('unpostRadio').value)!=this.checked)
        {
          this.checked = document.getElementById('unpostRadio').value
          this.setState({
            flag:!this.state.flag
          })
        }
    }
  }

  submitPost(){
    var list1=this.post.toString()
    var ids=this.props.ids.toString()
    if(this.props.selectAll==true)
    {
      var optionsPost={
        method: 'POST',
        url :   Config.api.API_ROOT_URL+"/userGroup/bulkPost",
        params:{
          pullType:"bulk",
          selectionType:"selectAll",
          objectType:"species.participation.Observation",
          objectIds:'',
          submitType:"post",
          userGroups:list1,
          filterUrl:this.props.filterUrl
        },
        headers : AuthUtils.getAuthHeaders(),
        json: 'true'
      }
      if(this.post.length>0){
        axios(optionsPost)
          .then((response)=>{
              console.log(response)
          })
      }
    }
    else{
      var optionsPost={
        method: 'POST',
        url :   Config.api.API_ROOT_URL+"/userGroup/bulkPost",
        params:{
          pullType:"bulk",
          selectionType:"reset",
          objectType:"species.participation.Observation",
          objectIds:ids,
          submitType:"post",
          userGroups:list1,
          filterUrl:this.props.filterUrl
        },
        headers : AuthUtils.getAuthHeaders(),
        json: 'true'
      }
      if(this.post.length>0 && this.props.ids.length>0){
        axios(optionsPost)
          .then((response)=>{
              console.log(response)
          })
      }
    }
  }

  submitUnpost(){
    var list1=this.unpost.toString()
    var ids=this.props.ids.toString()
    if(this.props.selectAll==true){
      var optionsPost={
        method: 'POST',
        url :  Config.api.API_ROOT_URL+"/userGroup/bulkPost",
        params:{
          pullType:"bulk",
          selectionType:"selectAll",
          objectType:"species.participation.Observation",
          objectIds:'',
          submitType:"unpost",
          userGroups:list1,
          filterUrl:this.props.filterUrl
        },
        headers : AuthUtils.getAuthHeaders(),
        json: 'true'
      }
      if(this.unpost.length>0){
        axios(optionsPost)
          .then((response)=>{
              console.log(response)
          })
      }
    }
    else{
      var optionsUnpost={
        method: 'POST',
        url :   Config.api.API_ROOT_URL+"/userGroup/bulkPost",
        params:{
          pullType:"bulk",
          selectionType:"reset",
          objectType:"species.participation.Observation",
          objectIds:ids,
          submitType:"unpost",
          userGroups:list1,
          filterUrl:this.props.filterUrl
        },
        headers : AuthUtils.getAuthHeaders(),
        json: 'true'
      }
      if(this.unpost.length>0 && this.props.ids.length>0){
        axios(optionsUnpost)
          .then((response)=>{
              console.log(response)
          })
      }
    }
  }

  render(){
    return(
      <div className="well well-sm">
        <div className="row" style={{marginLeft:'2.5%'}}>
            <input type="radio" name="group" id={"postRadio"} value=" Post to Groups" defaultChecked onClick={this.change.bind(this)}/> Post to Groups
            <input type="radio" name="group" id={"unpostRadio"} value="Unpost from Groups" onClick={this.change.bind(this)}/> Unpost from Groups
        </div>
        <br/>
        {
          this.state.flag===true?
          (
            <div>
            <div className="row" ref={"userGroupsPost"}>
                <div className="col-sm-12">
                  {
                      (this.state.showPost.length>0)?
                      (
                        this.state.showPost.map((edt,index)=>{
                            return(
                              <div key={index} className="chip" id={"chip_select"+edt.id} ref={"chip_select"+edt.id}  onClick={this.removeGroupPost.bind(this,edt.id)}>
                                <img src={`${Config.api.ROOT_URL}/biodiv/userGroups${edt.icon}`}/>
                                <EllipsisText text={edt.name} length={13} />
                                <i className="glyphicon glyphicon-remove " style={{color:'blue'}}></i>
                              </div>
                            )
                        })
                      ):null
                  }
                </div>
            </div>
            <div className="row" ref={"buttonsPost"} >
              <div className="col-sm-6">
                  <Select
                      name="form-field-name"
                      value="one"
                      options={this.state.dropdown}
                      onChange={this.addGroupPost.bind(this)}
                      />
              </div>
              <div className="col-sm-6">
                <div className="row pull-right" style={{marginRight:'0.2%'}}>
                  <button   className="btn btn-primary btn-xs nameAgree" onClick={this.submitPost.bind(this)}>Post</button>
                </div>
              </div>
            </div>
            </div>
          ):
          (
            <div>
            <div className="row" ref={"userGroupsUnpost"}>
                <div className="col-sm-12">
                  {
                    (this.state.showUnpost.length>0)?
                    (
                      this.state.showUnpost.map((edt,index)=>{
                          return(
                            <div key={index} className="chip" id={"chip_select"+edt.id} ref={"chip_select"+edt.id}  onClick={this.removeGroupUnPost.bind(this,edt.id)}>
                              <img src={`${Config.api.ROOT_URL}/biodiv/userGroups${edt.icon}`}/>
                              <EllipsisText text={edt.name} length={13} />
                              <i className="glyphicon glyphicon-remove " style={{color:'blue'}}></i>
                            </div>
                          )
                      })
                    ):null
                  }
                </div>
            </div>
            <div className="row" ref={"buttonsUnpost"}>
              <div className="col-sm-6">
                  <Select
                      name="form-field-name"
                      value="one"
                      options={this.state.dropdown}
                      onChange={this.addGroupUnPost.bind(this)}
                      />
              </div>
              <div className="col-sm-6">
                <div className="row pull-right" style={{marginRight:'0.2%'}}>
                  <button   className="btn btn-primary btn-xs nameAgree" onClick={this.submitUnpost.bind(this)}>UnPost</button>
                </div>
              </div>
            </div>
            </div>
          )
        }
      </div>
    )
  }
}
export default GroupsBulk;
