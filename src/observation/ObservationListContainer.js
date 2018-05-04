import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory';
import EllipsisText  from 'react-ellipsis-text';
import  queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import  deepEqual  from 'deep-equal';
import _ from "lodash";

import InfiniteScroll from 'react-infinite-scroll-component';

import {fetchObservations} from './ObservationActions';
import {fetchRecommendations,ClearObservationPage,clearRecommendations,fetchFilterCount} from '../actions'


import ObservationListWrapper from './ObservationListWrapper';

import Right_stats from '../app/RightMaterial';
import MobileRightSidebar from '../app/MobileRightSidebar';
import AuthUtils from '../auth/AuthUtils.js';
import UserGroupName from '../util/UserGroup';
import DownloadModal from './DownloadModal';
import Navigate from '../bulk/Navigation.js'
import ModalPopup from '../auth/Modal.js';

import ReactGA from 'react-ga';

const history = createHistory();

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName]=="") {
      delete obj[propName];
    }
  }
  return obj
}

class ObservationListContainer extends Component {

    constructor(props){
      super(props);

      this.state={
        params:{
          sort:"lastrevised",
          minDate:undefined,
          maxDate:undefined,
          hasMore:true
        },
        view:1,
        showMap:false,
        selectAll:false,
        urlforPassing:undefined,
        openModal:false,
        bulkId:[],
        bulk:false,
        login_modal:false,
      }

      this.loadMore=this.loadMore.bind(this);
      this.fetchReco = true;
      this.obvResponse = this.obvResponse.bind(this);
      this.fetchRecos = this.fetchRecos.bind(this);
      this.launchBulk = this.launchBulk.bind(this);
      this.resetBulk = this.resetBulk.bind(this);
      this.setOpenModal = this.setOpenModal.bind(this);
      this.selectAll = this.selectAll.bind(this);
      this.resetSelectAll = this.resetSelectAll.bind(this);
      this.resetSingleCheckboxes = this.resetSingleCheckboxes.bind(this);
    };

    GlobalCall(params){

          params=clean(params);
          params["offset"]=0;
          params["count"]=0;
          const seacrh=queryString.stringify(params)
          const search1=decodeURIComponent(seacrh);
          history.push({
            pathname:this.props.location.pathname,
            search:search1
          })

          ReactGA.pageview(this.props.location.pathname + search1);

          let url="/search/observation/observation?"+search1;
          let url1="/observation/observation?"+search1;
          this.props.fetchFilterCount(url1);
          this.setState({
            params:params,
            urlforPassing:url,
            openModal:false
          })
          this.props.fetchObservations(params);
          this.props.clearRecommendations();
          this.fetchReco = true;
    }

      taxonFilterEventListner(e){
            let params=this.state.params;
            params.classification=e.detail.classification;
            params.taxon=e.detail.taxon.join(",");
            console.log(params);
            this.GlobalCall(params);
            this.props.ClearObservationPage();
      }
      sGroupFilterEventListner(e){
        this.props.ClearObservationPage();
        let params=this.state.params;

        params.sGroup=e.detail.sGroup.join(",");
          this.GlobalCall(params);
      }

    userGroupFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;

        params.userGroupList= e.detail.id.join(",");
        this.GlobalCall(params);

    }

    mediaFilterEventListner(e){
      this.props.ClearObservationPage();

      let params=this.state.params;

      params.mediaFilter=e.detail.MediaFilter.join(",");
      this.GlobalCall(params);
    }

    allFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;

      params.speciesName=e.detail.SpeciesName.join(",");
          this.GlobalCall(params);

    }

    userFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;

      params.user=e.detail.userIds.join(",");
      this.GlobalCall(params);

    }
    yearFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;
      params.maxDate=e.detail.maxDate;
      params.minDate=e.detail.minDate;
      this.GlobalCall(params);
    }
    monthsFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;


      params.months=e.detail.months.join(",");
      this.GlobalCall(params);
    }
    validateFilterEventListner(e){
      this.props.ClearObservationPage();

      let params=this.state.params;

      params.validate=e.detail.ValidateFilter.join(",");
      this.GlobalCall(params);
    }
    flagFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;

      params.isFlagged=e.detail.isFlagged.join(",");
      this.GlobalCall(params);
    }


    traitsEventListner(e){
      let params=this.state.params;
      console.log("params from taxon",params);
      this.props.ClearObservationPage();
      e.detail.traitsMap.forEach((value, key, map)=>{
        if(value.constructor === Array){
          params["trait_"+key]=value.join(",");

        }
      });
      this.GlobalCall(params);
    }
    customFieldsEventListner(e){
      let params=this.state.params;
      console.log("params from custom",params);
      this.props.ClearObservationPage();
      e.detail.customFieldMap.forEach((value, key, map)=>{
        if(value.constructor === Array){
          params["custom_"+key]=value.join(",");
        }
      });
      this.GlobalCall(params);
    }

    sortObservation(sortby){
      this.props.ClearObservationPage();
      let params=this.state.params;
      params.sort=sortby;
      this.GlobalCall(params);
    }

      setParameter(){

        let {groupName}=this.props.match.params;
        let newparams=  queryString.parse(document.location.search);

        if(groupName){
            UserGroupName.list().then(data=>{
              let group=data.find((item)=>{
                  return item.webaddress==groupName
              })
              newparams.userGroupList=group.id;
              if(!newparams.sort){
                newparams.sort="lastrevised"
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
              let url="/search/observation/observation?"+search2;
              let url1="/observation/observation?"+search2;

              history.push({
            pathname:this.props.location.pathname,
            search:search2
          })

          console.log(newparams);

          this.setState({
            params:newparams,
            urlforPassing:url,
            openModal:false
          })
          console.log("andar aayeaaye................");
          this.props.fetchObservations(newparams);
          this.props.fetchFilterCount(url1);

            });

        }
        else{
            let fullUrl = window.location.host;
            let parts=fullUrl.split(".");

            if(parts.length>=3){
              if(parts[0]=="assambiodiversity"){
                  newparams.userGroupList="4087136";

              }
              if(parts[0]=="treesindia"){
                newparams.userGroupList="18";

              }
              if(parts[0]=="thewesternghats"){
                newparams.userGroupList="1";
              }
            }
          if(!newparams.sort){
            newparams.sort="lastrevised"
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
          let url="/search/observation/observation?"+search2;
          let url1="/observation/observation?"+search2;

          history.push({
            pathname:this.props.location.pathname,
            search:search2
          })

          console.log(newparams);
          this.props.fetchObservations(newparams);
          this.props.fetchFilterCount(url1);
          this.setState({
            params:newparams,
            urlforPassing:url,
            openModal:false
          })
        }

      }

      loadMore(){
        let params=this.state.params;
        console.log(params);
        let count= parseInt(params.count);
        count=count+1;
       let offset=count*10;
        params.count=count;
        params.offset=offset;
        let hasMore=params.hasMore;
        params.hasMore=this.props.Observation?this.props.Observation.count>offset+10?true:false:true;
        this.setState({
            params
        })
        const seacrh=queryString.stringify(params)
        const search1=decodeURIComponent(seacrh);
        let url="/search/observation/observation?"+search1;
        this.setState({
          urlforPassing:url,
          openModal:false
        })
        this.props.fetchObservations(params);
        this.fetchReco = true;
        }

      componentDidMount(){
        this.setParameter();
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("media-filter", this.mediaFilterEventListner.bind(this));
        document.addEventListener("getTaxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
        document.addEventListener("user-filter", this.userFilterEventListner.bind(this));
        document.addEventListener("year-filter", this.yearFilterEventListner.bind(this));
        document.addEventListener("months-filter", this.monthsFilterEventListner.bind(this));
        document.addEventListener("Validate-filter", this.validateFilterEventListner.bind(this));
        document.addEventListener("flag-filter", this.flagFilterEventListner.bind(this));
        document.addEventListener("traits",this.traitsEventListner.bind(this));
        document.addEventListener("customFields",this.customFieldsEventListner.bind(this));


      }
      componentWillUnmount(){
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("get-taxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
        document.addEventListener("media-filter", this.mediaFilterEventListner.bind(this));
        document.addEventListener("user-filter", this.userFilterEventListner.bind(this));
        document.addEventListener("year-filter", this.yearFilterEventListner.bind(this));
        document.addEventListener("months-filter", this.monthsFilterEventListner.bind(this));
        document.addEventListener("Validate-filter", this.validateFilterEventListner.bind(this));
        document.addEventListener("flag-filter", this.flagFilterEventListner.bind(this));
        document.addEventListener("traits",this.traitsEventListner.bind(this));
        document.addEventListener("customFields",this.customFieldsEventListner.bind(this));

        this.props.ClearObservationPage();
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
        showMapView(){
          this.setState({
            view:2,
            showMap:true
          })
        }

        selectAll(){
          this.setState({
            selectAll:true
          })
          alert("Any observation loaded on the list page will be selected")
        }
        resetSelectAll(){
          this.setState({
            selectAll:false,
            bulkId:[]
          })
          this.resetSingleCheckboxes();
        }

        resetSingleCheckboxes(){
          if(!this.state.selectAll){
            var i;
            for(i=0;i<this.props.Observation.all.length;i++){
              document.getElementById("check1SelectAll"+this.props.Observation.all[i].id).checked = false;
            }
          }
        }

        handleChangeCheckbox(event){
          this.setState({ sortValue: event.target.value });
          if(event.target.value.trim()==="Last Updated".trim()){
            this.sortObservation("lastrevised")
        }
        else if(event.target.value.trim()==="Latest".trim()){
        this.sortObservation("createdon")
        }
        else{
          this.sortObservation("visitcount")
        }

        }

        fetchRecos(){
            var allObvs = this.props.Observation.all

            var lastTenObvs = allObvs.slice(allObvs.length<11?0:allObvs.length-10)

              var obvIds = []
              lastTenObvs.map((item,index)=>{
                obvIds.push(item.id)
              })
                this.props.fetchRecommendations(obvIds.toString());
                this.fetchReco = false;
        }

        obvResponse(){
          if(this.props.Observation){
            if(this.props.Observation.all.length>0){
              if(this.fetchReco === true){
                this.fetchRecos();
              }
            }
          }
        }
        setOpenModal(){
          if(AuthUtils.isLoggedIn()){
            let openModal=this.state.openModal;
            openModal=!openModal;
            this.setState({
              openModal
            })
          }else{
            this.setState({
              login_modal:true
            });
          }

        }



        launchBulk(obvId){
          console.log("inside the launch  bulk action",this.state.bulkId)
            let _bulkId=this.state.bulkId
            // function checkIndex(id){
            //     return id==obvId
            // }
            // let index = _bulkId.findIndex(checkIndex)
            let index = _bulkId.indexOf(obvId)
            if(index<0)
            {
                _bulkId=_bulkId.concat(obvId)
                this.setState({
                    bulkId:_bulkId,
                })
            }
            else{
                _bulkId.splice(index,1)
                this.setState({
                    bulkId:_bulkId,
                })
            }
            this.setState({
                bulk:true,
            })

            console.log("all the Ids",this.state.bulkId)

        }

        resetBulk(){
            this.setState({
                bulk:false,
                bulkId:[]
            })
        }

  render(){


    let list = this.props.Observation.all?this.props.Observation.all.map(item => {
return   <ObservationListWrapper  uniqueKey={item.id} showMap={this.state.showMap} key={item.id} filterUrl={this.state.urlforPassing} view={this.state.view}  selectAll={this.state.selectAll}  launchBulk={this.launchBulk}/>
}):null;
    return(
      <div>
            {this.state.login_modal==true?(<ModalPopup key={"downloadLogin"}   id={"downloads login"} func={this.setOpenModal}/>):null}
            {this.state.openModal?<DownloadModal/>:""}
            {(this.props.Observation.all && this.props.Observation.all.length>0)?(this.fetchReco===true?this.obvResponse():null):null}
            {this.props.Observation.count?
              <div>
                <div>
                </div>
              <div className="panel panel-success">
                  <div className="panel-heading vertical-align">
                      <ul className="nav nav-tabs" style={{display:'inline-block'}}>
                          <li role="presentation" className={`${this.state.view===1?"active":""}`}><a href="#"  onClick={this.showListView.bind(this,1)} ><span className="glyphicon glyphicon-th-list">List</span></a></li>
                          <li role="presentation" className={`${this.state.view===0?"active":""}`}><a href="#" onClick={this.showGridView.bind(this,0)} ><span className="glyphicon glyphicon-th">Grid</span></a></li>
                          <li role="presentation" className={`${this.state.view===2?"active":""}`}><a href="#" onClick={this.showMapView.bind(this,2)} ><span className="glyphicon glyphicon-map-marker"> Map</span></a></li>
                      </ul>
                      <div className="panel-title">
                          <h5 className="text-primary">{this.props.Observation.count} result(s) found</h5>
                      </div>
                      <div className="pull-right">
                        <button style={{marginRight:'5px'}} onClick={this.setOpenModal.bind(this)} className="btn btn-default">Download</button>

                        <select className="btn btn-default"  onChange={this.handleChangeCheckbox.bind(this)} value={this.state.sortValue}>
                            <option  value="Last Updated">Last Updated</option>
                            <option  value="Latest">Latest</option>
                            <option  value="Most Viewed">Most Viewed</option>
                        </select>
                      </div>



                  </div>


              {/* <ObservationListWrapper filterUrl={this.state.urlforPassing} objs={this.props.Observation.all} view={this.state.view} count={this.props.Observation.count} selectAll={this.state.selectAll} resetSelectAll={this.resetAll.bind(this)}/> */}
              <div className="panel-body">{this.state.view==2?<ObservationListWrapper view={this.state.view} filterUrl={this.state.urlforPassing} />:this.state.view==0?<ObservationListWrapper view={this.state.view} objs={this.props.Observation.all} filterUrl={this.state.urlforPassing} />:list}</div>


              {this.state.view===2?null:<InfiniteScroll
                next={this.loadMore.bind(this)}
                hasMore={this.state.params.hasMore}
                loader={ <Button bsStyle="success" bsSize="small" block>Loading ............</Button>}
                >
              </InfiniteScroll>}

              </div>
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
            {(this.state.bulk===true || this.state.selectAll===true)?(<Navigate selectAllHack={this.state.selectAll} filterUrl={this.props.filterUrl} ids={this.state.bulkId} selectAllFunc={this.selectAll} resetBulk={this.resetBulk} resetSelectAllFunc={this.resetSelectAll} allObvs={this.props.Observation.all}/>):null }
      </div>
    )
  }
}
function mapStateToProps(state){

return {
  Observation:state.Observation,
  Recommendations:state.Recommendations,
  UserGroupList:state.UserGroupList
};
}
export default  withRouter(connect(mapStateToProps, {fetchObservations,ClearObservationPage,fetchRecommendations,clearRecommendations,fetchFilterCount})(ObservationListContainer));
