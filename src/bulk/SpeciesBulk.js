import React, {Component} from 'react';
import axios from 'axios';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
// import EllipsisText  from 'react-ellipsis-text';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import AuthUtils from '../auth/AuthUtils.js'
import { Config } from '../Config';

class SpeciesBulk extends React.Component{
  constructor(props){
    super(props)
    this.state={
      loading:false
    }
    this.newSpeciesGroup=null;
  }

  selectOfAll(){
    this.props.selectAllFunc();
  }

  resetSelectOfAll(){
    this.props.resetSelectAllFunc();
    //this.props.resetBulk();

  }

  pushSpecies(event){
    //console.log(event.target.value)
    this.newSpeciesGroup=event.target.value;
        // this.setState({
        //     updateUserGroup:event.target.value,
        //     ObservationId:id
        // })
        //
  }

  updateSpeciesGroup(){
    let obj = this.props.SpeciesGroup.find(x => x.name === this.newSpeciesGroup);
    if(obj){

        document.body.style.cursor = "wait";
        this.setState({
            loading:true
          })
          var total;

      //console.log("objobj",obj)
      if(this.props.selectAllHack === true){
        var obvIds = []
        this.props.allObvs.map((item,index)=>{
          obvIds.push(item.id)
        })
        total=obvIds.length;

        var options={
          method: 'POST',
          url :   Config.api.API_ROOT_URL+"/observation/updategroup",
          params:{
            newGroupId:obj.id,
            objectIds:obvIds.toString()
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }

      }else{
        var ids=this.props.ids.toString()
        total=this.props.ids.length
        var options={
          method: 'POST',
          url :   Config.api.API_ROOT_URL+"/observation/updategroup",
          params:{
            newGroupId:obj.id,
            objectIds:ids
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }

      }
      if(this.newSpeciesGroup!==null){
        axios(options)
          .then((response)=>{
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            alert(total+ " observation(s) updated succesfully.Please refresh the page to see changes.")
            //document.location.reload()
              //console.log(response)
          })
      }
    }
  }


  render(){
    return(
      <div className="well well-sm">
        <div className="row" style={{marginLeft:'4%'}}>
              <button   className="btn btn-primary btn-xs nameAgree" onClick={this.selectOfAll.bind(this)} disabled={this.state.loading}>Select All</button>
              &nbsp;
              <button   className="btn btn-primary btn-xs nameAgree" onClick={this.resetSelectOfAll.bind(this)} disabled={this.state.loading}>Reset All</button>
        </div>
        <br/>
        <div>
            <div className="row" ref={"buttonsUnpost"}>
              <div className="col-sm-6">
                  <select   className="bg-primary form-control-sm" style={{marginLeft:'8%',width:'80%'}} ref={"bulkSpecies"} onChange={this.pushSpecies.bind(this)}>
                    {this.props.SpeciesGroup?this.props.SpeciesGroup.map((item)=>{
                    return   <option key={item.name}   value={item.name}>{item.name}</option>
                    }):null}
                  </select>
              </div>
              <div className="col-sm-6">
                <div className="row pull-right" style={{marginRight:'0.2%'}}>
                  <button   className="btn btn-primary btn-xs nameAgree" disabled={this.state.loading} onClick={this.updateSpeciesGroup.bind(this)}>Post</button>
                </div>
              </div>
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    SpeciesGroup:state.SpeciesGroup,
  };
}
export default withRouter(connect(mapStateToProps)(SpeciesBulk));
