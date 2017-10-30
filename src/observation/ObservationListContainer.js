import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import createHistory from 'history/createBrowserHistory';
import EllipsisText  from 'react-ellipsis-text';
import  queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import  deepEqual  from 'deep-equal';
import _ from "lodash";


import {fetchObservations} from './ObservationActions';
import {ClearObservationPage} from '../actions';

import ObservationListWrapper from './ObservationListWrapper';

import Right_stats from '../components/right_material';
import MobileRightSidebar from '../app/MobileRightSidebar';

const history = createHistory();

class ObservationListContainer extends Component {
    constructor(props){
      super(props);
      this.state={
        params:{
          max:10,
          offset:0,
          count:0,
          taxon:[],
          sGroup:[],
          user:[],
          classification:undefined,
          userGroupList:[],
          isFlagged:undefined,
          speciesName:undefined,
          isMediaFilter:undefined,
          sort:"lastRevised",
          webaddress:undefined,

        },
        view:1
      }
      const newparams=  queryString.parse(document.location.search);
      if(!newparams.sort){
        newparams.sort="lastRevised"
      }
      if(!newparams.max){
        newparams.max=10;
      }
      if(!newparams.offset){
        newparams.offset=0
      }
      if(!newparams.count){
        newparams.count=0;
      }
      let search1=queryString.stringify(newparams);


       let search2 = decodeURIComponent( search1 );
          if(!deepEqual(this.state.params,newparams) ){
        history.push({
          pathname:'/observation/list',
          search:search2
        })
        this.props.fetchObservations(newparams)
      }
      else {
        history.push({
          pathname:'/observation/list',
          search:search2
        })
        this.props.fetchObservations(this.state.params)
      }


      this.loadMore=this.loadMore.bind(this);
    };


    GlobalCall(params){
          let sGroup=params.sGroup;
          let isFlagged=params.isFlagged;
          let speciesName=params.speciesName;
          let MediaFilter=params.isMediaFilter;
          let userGroupList=params.userGroupList;
          let taxon=params.taxon;
          let classification=params.classification;
          let offset=params.offset;
          let count=params.count;
          let user=params.user;
          this.setState({
              params:{
                taxon:taxon,
                count:count,
                classification:classification,
                offset:offset,
                sGroup:sGroup,
                userGroupList:userGroupList,
                isFlagged:isFlagged,
                speciesName:speciesName,
                isMediaFilter:MediaFilter,
                sort:params.sort,
                user:user
              }
          })
          params.taxon=params.taxon.join(",");
          params.sGroup=params.sGroup.join(",");
          params.userGroupList=params.userGroupList.join(",");
          params.user=params.user.join(",");
          const seacrh=queryString.stringify(params)
          const search1=decodeURIComponent(seacrh);
          history.push({
            pathname:'/observation/list',
            search:search1
          })
          this.props.fetchObservations(params);

    }

      taxonFilterEventListner(e){
            this.props.ClearObservationPage();
            const params=this.state.params;
            if(!params.taxon){
              params.taxon=[];
            }
            params.classification=e.detail.classification;
            params.taxon=e.detail.taxon
            this.GlobalCall(params);
      }
      sGroupFilterEventListner(e){
        this.props.ClearObservationPage();
        const params=this.state.params;
        if(!params.sGroup){
          params.sGroup=[];
        }
        params.sGroup=e.detail.sGroup;
          this.GlobalCall(params);
      }

    userGroupFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;
      if(!params.userGroupList){
        params.userGroupList=[];
      }
        params.userGroupList= e.detail.id;
        this.GlobalCall(params);

    }

    isMediaFilterEventListner(e){
      this.props.ClearObservationPage();

      const params=this.state.params;
      params.isMediaFilter=e.detail.MediaFilter;
      this.GlobalCall(params);
    }

    allFilterEventListner(e){
      this.props.ClearObservationPage();

      const params=this.state.params;
      params.speciesName=e.detail.SpeciesName;
          this.GlobalCall(params);

    }

    userFilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;
      if(!params.user){
        params.user=[];
      }
      params.user=e.detail.userIds;
      this.GlobalCall(params);

    }
    sortObservation(sortby){
      this.props.ClearObservationPage();

      const params=this.state.params;
      params.sort=sortby;
      this.GlobalCall(params);

    }

      setParameter(){
        const {groupName}=this.props.match.params;
        const newparams=  queryString.parse(document.location.search);
        if(newparams.sGroup){
          newparams.sGroup=newparams.sGroup.split(",");
        }
        else{
          newparams.sGroup=[];
        }
        if(newparams.taxon){
          newparams.taxon=newparams.taxon.split(",");
        }
        else{
          newparams.taxon=[];
        }
        if(newparams.userGroupList){
          newparams.userGroupList=newparams.userGroupList.split(",");
        }
        else{
          newparams.userGroupList=[]
        }

        if(newparams.user){
          newparams.user=newparams.user.split(",");
        }
        else{
          newparams.user=[];
        }

        if(groupName){
          newparams.webaddress=groupName;
        }
        if(!newparams.max){
          newparams.max=10;
        }
        if(!newparams.offset){
          newparams.offset=0;
        }
        this.setState({
          params:newparams
        })

      }
      loadMore(){
        let params=this.state.params;
       let count= parseInt(params.count);
       count=count+1;
       let offset=count*10;
        params.count=count;
        params.offset=offset;
       this.GlobalCall(params)
        }

      componentDidMount(){
        this.setParameter();
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("isMediaFilter-filter", this.isMediaFilterEventListner.bind(this));
        document.addEventListener("getTaxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
        document.addEventListener("user-filter", this.userFilterEventListner.bind(this));



      }
      componentWillUnmount(){
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("get-taxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
        document.addEventListener("isMediaFilter-filter", this.isMediaFilterEventListner.bind(this));
        document.addEventListener("user-filter", this.userFilterEventListner.bind(this));
        this.props.ClearObservationPage();

      }
      displayData(view,objs,count){
          return(
          <div key={objs.id}>
            <ObservationListWrapper objs={objs} view={view} count={count}/>
          </div>
        )
      }

        showGridView(){
          this.setState({
            view:0
          })
        }
         showListView(){
          this.setState({
            view:1
          })
        }

        handleChangeCheckbox(event){
        if(event.target.value.trim()==="Last Visited".trim()){
        this.sortObservation("lastRevised")
        }
        else if(event.target.value.trim()==="Latest".trim()){
        this.sortObservation("createdOn")
        }
        else if(event.target.value.trim()==="Most Viewed".trim()){
          this.sortObservation("visitCount")
        }
        }

  render(){
    return(
      <div>
            <div className="hidden-sm hidden-md hidden-lg">
              <MobileRightSidebar />
              </div>
            <div className="pull-right">
              <Right_stats filterParams={this.state.params}/>
            </div>
            {this.props.Observation.count?<button className="btn btn-success btn-xs text-primary">{this.props.Observation.count}</button>:(this.props.Observation.count===0)?"No result found":null}
            <br />
            <br />
            <div className="btn-group">
            <button className={`btn ${this.state.view?"btn-success":"btn-default"}`}  onClick={this.showListView.bind(this,1)} ><span className="glyphicon glyphicon-th-list"> </span>List</button>
           <button className={`btn ${this.state.view?"btn-default":"btn-success"}`} onClick={this.showGridView.bind(this,0)} ><span className="glyphicon glyphicon-th"> </span>Grid</button>
            </div>
            <div className="pull-right">
              <select className="form-control btn-default"  onChange={this.handleChangeCheckbox.bind(this)}>
                 <option  value="Last Visited">Last Visited</option>
                 <option value="Latest">Latest</option>
                 <option value="Most Viewed">Most Viewed</option>
               </select>
            </div>
            <br />
            <br />
            {this.props.Observation.all?this.displayData(this.state.view,this.props.Observation.all,this.props.Observation.count):null}
            {this.props.Observation.all.length ?(this.props.Observation.count)>(this.state.params.offset*10+10)?<button onClick={this.loadMore} type="submit" className="btn btn-primary">LoadMore</button>:null:null }
      </div>
    )
  }
}
function mapStateToProps(state){
return {
  Observation:state.Observation
};
}
export default  withRouter(connect(mapStateToProps, {fetchObservations,ClearObservationPage})(ObservationListContainer));
