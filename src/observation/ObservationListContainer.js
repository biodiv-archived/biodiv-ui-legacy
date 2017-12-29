import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {Button} from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory';
import EllipsisText  from 'react-ellipsis-text';
import  queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import  deepEqual  from 'deep-equal';
import _ from "lodash";

import InfiniteScroll from 'react-infinite-scroll-component';

import {fetchObservations} from './ObservationActions';
import {ClearObservationPage} from '../actions';

import ObservationListWrapper from './ObservationListWrapper';

import Right_stats from '../app/RightMaterial';
import MobileRightSidebar from '../app/MobileRightSidebar';
import AuthUtils from '../auth/AuthUtils.js';

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
          minYear:undefined,
          maxYear:undefined,
          months:[],
          minDay:undefined,
          maxDay:undefined,
          hasMore:true
        },
        view:1,
        selectAll:false,
        urlforPassing:undefined
      }
      this.url;
      const newparams=  queryString.parse(document.location.search);
      let {groupName}=this.props.match.params;

      let host = window.location.host;

      let parts = host.split(".");
      if (parts.length >= 4) {
        newparams.webaddress=parts[0];
        }
      if(groupName){
        newparams.webaddress=groupName;
      }
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
      if(!newparams.hasMore){
        newparams.hasMore=true;
      }
      let search1=queryString.stringify(newparams);
       let search2 = decodeURIComponent( search1 );
          if(!deepEqual(this.state.params,newparams) ){
            history.push({
          pathname:this.props.location.pathname,
          search:search2
        })
      this.props.fetchObservations(newparams);
      }
      else {
        history.push({
          pathname:this.props.location.pathname,
          search:search2
        })

        this.props.fetchObservations(this.state.params)
      }

      this.url="/observation/list?"+search2;
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
          let user=params.user;
          let offset=params.offset;
          let count=params.count;
          let webaddress=params.webaddress;

          let minYear=params.minYear;
          let maxYear=params.maxYear;
          let minDay=params.minDay;
          let maxDay=params.maxDay;
          let months=params.months;
          let hasMore=params.hasMore;
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
                user:user,
                webaddress:webaddress,
                minYear:minYear,
                maxYear:maxYear,
                minDay:minDay,
                maxDay:maxDay,
                months:months,
                hasMore:hasMore
              }
          })
          params.taxon=params.taxon.join(",");
          params.sGroup=params.sGroup.join(",");
          params.userGroupList=params.userGroupList.join(",");
          params.user=params.user.join(",");
          params.months=params.months.join(",");
          params.count=0;
          params.offset=0;
          const seacrh=queryString.stringify(params)
          const search1=decodeURIComponent(seacrh);
          history.push({
            pathname:this.props.location.pathname,
            search:search1
          })
          let url="/observation/list?"+search1;
          this.setState({
            urlforPassing:url
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
    yearFilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;
      params.maxYear=e.detail.maxYear;
      params.minYear=e.detail.minYear;
      this.GlobalCall(params);
    }
    monthsFilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.months){
        params.months=[];
      }
      params.months=e.detail.months;
      this.GlobalCall(params);


    }
    dayFilterEventListner(e){
      this.props.ClearObservationPage();

      const params=this.state.params;
      params.maxDay=e.detail.maxDay;
      params.minDay=e.detail.minDay;
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
        if(newparams.months){
          newparams.months=newparams.months.split(",");
        }
        else{
          newparams.months=[];
        }

        if(groupName){
          newparams.webaddress=groupName;
        }
        if(!newparams.max){
          newparams.max=10;
        }
        if(!newparams.count){
          newparams.count=0;
        }
        if(!newparams.hasMore){
          newparams.hasMore=true;
        }
        if(!newparams.offset){
          newparams.offset=0;
        }
        this.setState({
          params:newparams,
          urlforPassing:this.url
        })

      }
      loadMore(){
        let params=this.state.params;
       let count= parseInt(params.count);
       count=count+1;
       let offset=count*10;
        params.count=count;
        params.offset=offset;
        let sGroup=params.sGroup;
        let isFlagged=params.isFlagged;
        let speciesName=params.speciesName;
        let MediaFilter=params.isMediaFilter;
        let userGroupList=params.userGroupList;
        let taxon=params.taxon;
        let classification=params.classification;

        let user=params.user;
        let webaddress=params.webaddress;

        let minYear=params.minYear;
        let maxYear=params.maxYear;
        let minDay=params.minDay;
        let maxDay=params.maxDay;
        let months=params.months;
        let hasMore=params.hasMore;
        hasMore=this.props.Observation?this.props.Observation.count>offset+10?true:false:true;

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
              user:user,
              webaddress:webaddress,
              minYear:minYear,
              maxYear:maxYear,
              minDay:minDay,
              maxDay:maxDay,
              months:months,
              hasMore:hasMore
            }
        })
        params.taxon=params.taxon.join(",");
        params.sGroup=params.sGroup.join(",");
        params.userGroupList=params.userGroupList.join(",");
        params.user=params.user.join(",");
        params.months=params.months.join(",");
        const seacrh=queryString.stringify(params)
        const search1=decodeURIComponent(seacrh);
        // history.push({
        //   pathname:this.props.location.pathname,
        //   search:search1
        // })
        let url="/observation/list?"+search1;
        this.setState({
          urlforPassing:url
        })

        this.props.fetchObservations(params);

        }

      componentDidMount(){
        this.setParameter();
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("isMediaFilter-filter", this.isMediaFilterEventListner.bind(this));
        document.addEventListener("getTaxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
        document.addEventListener("user-filter", this.userFilterEventListner.bind(this));

        document.addEventListener("year-filter", this.yearFilterEventListner.bind(this));
        document.addEventListener("months-filter", this.monthsFilterEventListner.bind(this));
        document.addEventListener("day-filter", this.dayFilterEventListner.bind(this));



      }
      componentWillUnmount(){
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("get-taxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
        document.addEventListener("isMediaFilter-filter", this.isMediaFilterEventListner.bind(this));
        document.addEventListener("user-filter", this.userFilterEventListner.bind(this));

        document.addEventListener("year-filter", this.yearFilterEventListner.bind(this));
        document.addEventListener("months-filter", this.monthsFilterEventListner.bind(this));
        document.addEventListener("day-filter", this.dayFilterEventListner.bind(this));

        this.props.ClearObservationPage();

      }
      displayData(view,objs,count,selectAll){

          return(
          <div key={objs.id}>
            <ObservationListWrapper filterUrl={this.state.urlforPassing} objs={objs} view={view} count={count} selectAll={selectAll} resetSelectAll={this.resetAll.bind(this)}/>
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

        selectAll(){
          this.setState({
            selectAll:true
          })
        }
        resetAll(){
          this.setState({
            selectAll:false
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

            {this.props.Observation.count?
              <div>
                <div className="hidden-sm hidden-md hidden-lg">
                  <MobileRightSidebar />
                  </div>
                <div className="pull-right">
                  <Right_stats filterParams={this.state.params}/>
                </div>

                <button className="btn btn-success btn-xs text-primary">{this.props.Observation.count}</button>
                <br /><br />
                <div className="btn-group">
                <button className={`btn ${this.state.view?"btn-success":"btn-default"}`}  onClick={this.showListView.bind(this,1)} ><span className="glyphicon glyphicon-th-list"> </span>List</button>
               <button className={`btn ${this.state.view?"btn-default":"btn-success"}`} onClick={this.showGridView.bind(this,0)} ><span className="glyphicon glyphicon-th"> </span>Grid</button>
                {
                  (AuthUtils.isUserGroupExpert() || AuthUtils.isUserGroupFounder())?
                  (
                    <button className="btn btn-info" onClick={this.selectAll.bind(this)}>Select All</button>
                  ):null
                }
                {
                  (AuthUtils.isUserGroupExpert() || AuthUtils.isUserGroupFounder())?
                  (
                    <button className="btn btn-info" onClick={this.resetAll.bind(this)}>Reset All</button>
                  ):null
                }
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

              <ObservationListWrapper filterUrl={this.state.urlforPassing} objs={this.props.Observation.all} view={this.state.view} count={this.props.Observation.count} selectAll={this.state.selectAll} resetSelectAll={this.resetAll.bind(this)}/>
              <br />
              <InfiniteScroll
                next={this.loadMore.bind(this)}
                hasMore={this.state.params.hasMore}
                loader={ <Button bsStyle="success" bsSize="small" block>Loading ............</Button>}
                >
              </InfiniteScroll>
              </div>

            :(this.props.Observation.count===0)?"No result found":<div style={{height:'600px',width:'660x',marginTop:'80px'}} className="container-fluid">
                <div className="row">
                    <div className="col-sm-5">
                    </div>
                    <div className={`col-sm-2 loader`}>
                    </div>
                    <div className="col-sm-5">
                    </div>
                </div>
            </div>}
            <br />
            <br />
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
