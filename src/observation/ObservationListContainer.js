import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import EllipsisText  from 'react-ellipsis-text-x';
import  queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import  deepEqual  from 'deep-equal';
import _ from "lodash";

import InfiniteScroll from 'react-infinite-scroll-component';

import {fetchObservations} from './ObservationActions';
import {fetchRecommendations,ClearObservationPage,clearRecommendations,fetchFilterCount} from '../actions'
import ObservationListWrapper from './ObservationListWrapper';
import AnalyticsDrawer from '../app/AnalyticsDrawer';
import AuthUtils from '../auth/AuthUtils.js';
import UserGroupName from '../util/UserGroup';
import DownloadModal from './DownloadModal';
import Navigate from '../bulk/Navigation.js'
import ModalPopup from '../auth/Modal.js';

import ReactGA from 'react-ga';
import './ObservationListContainer.css'

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
          hasMore:true,
          max:10,
          view:'list',
          lan:'en'
        },
        showMap:false,
        selectAll:false,
        urlforPassing:undefined,
        openModal:false,
        bulkId:[],
        bulk:false,
        login_modal:false,
        openRightSideBar:true
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
          params["max"]=10;
          const seacrh=queryString.stringify(params)
          const search1=decodeURIComponent(seacrh);
          let newSearchParams="?"+search1;
          if(decodeURIComponent(this.props.location.search)!=newSearchParams){
             this.props.history.push(this.props.location.pathname+"?"+search1);
          }

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
          console.log("fobs-GlobalCall")
          this.props.clearRecommendations();
          this.fetchReco = true;
    }

      taxonFilterEventListner(e){
            let params=this.state.params;
            params.classification=e.detail.classification;
            params.taxon=e.detail.taxon.join(",");
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
    recoNameFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;
        params.recoName= e.detail.recoName;
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
    statusEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;
      params.status=e.detail.status.join(",");
      this.GlobalCall(params);
    }
    yearFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;
      params.maxDate=e.detail.maxDate;
      params.minDate=e.detail.minDate;
      this.GlobalCall(params);
    }
    taxonIdEventListner(e){
        this.props.ClearObservationPage();
        let params=this.state.params;
        params.taxonId=e.detail.taxonId.join(",");
        this.GlobalCall(params);
    }
    createdOnEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;
      params.createdOnMaxDate=e.detail.createdOnMaxDate;
      params.createdOnMinDate=e.detail.createdOnMinDate;
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
    locationFilterEventListner(e){
      this.props.ClearObservationPage();
      let params=this.state.params;
      params.location=e.detail.location;
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
              if(!newparams.view){
                newparams.view="list"
              }
              if(!newparams.count){
                newparams.count=0;
              }
              if(!newparams.hasMore){
                newparams.hasMore=true;
              }
              if(!newparams.max){
                newparams.max=10;
              }

              let search1=queryString.stringify(newparams);
              let search2 = decodeURIComponent( search1 );
              let url="/search/observation/observation?"+search2;
              let url1="/observation/observation?"+search2;

              let newSearchParams="?"+search2;
              if(decodeURIComponent(this.props.location.search)!=newSearchParams){
                this.props.history.push(this.props.location.pathname+"?"+search2);
              }

          this.setState({
            params:newparams,
            urlforPassing:url,
            openModal:false
          })
          this.props.fetchObservations(newparams);
          console.log("fobs-setParameter")
          this.props.fetchFilterCount(url1);
            });
        }
        else{
            let fullUrl = window.location.host;
            let parts=fullUrl.split(".");

            if(parts.length>=3){
              if(parts[0]==="assambiodiversity"){
                  newparams.userGroupList="4087136";

              }
              if(parts[0]==="treesindia"){
                newparams.userGroupList="18";

              }
              if(parts[0]==="thewesternghats"){
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
          if(!newparams.view){
            newparams.view="list"
          }
          if(!newparams.max){
            newparams.max=10;
          }
          let search1=queryString.stringify(newparams);
          let search2 = decodeURIComponent( search1 );
          let url="/search/observation/observation?"+search2;
          let url1="/observation/observation?"+search2;

            let newSearchParams="?"+search2;

            if(decodeURIComponent(this.props.location.search)!=newSearchParams){
               this.props.history.push(this.props.location.pathname+"?"+search2);
            }

          this.props.fetchObservations(newparams);
          console.log("fobs-setParameter2")
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
        let count= parseInt(params.count);
        count=count+1;
       let offset=count*this.state.params.max;
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
        console.log("fobs-loadMore");
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
        document.addEventListener("created-on-filter",this.createdOnEventListner.bind(this));
        document.addEventListener("status-filter",this.statusEventListner.bind(this));
        document.addEventListener("taxonId-filter",this.taxonIdEventListner.bind(this));
        document.addEventListener("recoName-filter",this.recoNameFilterEventListner.bind(this));
        document.addEventListener("location-filter",this.locationFilterEventListner.bind(this));


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
        document.addEventListener("created-on-filter",this.createdOnEventListner.bind(this));
        document.addEventListener("status-filter",this.statusEventListner.bind(this));
        document.addEventListener("taxonId-filter",this.taxonIdEventListner.bind(this));
        document.addEventListener("recoName-filter",this.recoNameFilterEventListner.bind(this));
        document.addEventListener("location-filter",this.locationFilterEventListner.bind(this));

        this.props.ClearObservationPage();
      }
        setView(view){
          let params=this.state.params;
          params['view']=view;
          this.setState({
              params:params
          })
          const seacrh=queryString.stringify(params)
          const search1=decodeURIComponent(seacrh);
          let newSearchParams="?"+search1;
          if(decodeURIComponent(this.props.location.search)!=newSearchParams){
             this.props.history.push(this.props.location.pathname+"?"+search1);
          }
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

            let lastTenObvs;
            // var lastTenObvs = allObvs.slice(allObvs.length<11?0:allObvs.length-10)

            if(this.props.Observation.count<this.state.params.max){
              lastTenObvs=allObvs;
            }
            else{
                lastTenObvs=allObvs.slice(this.state.params.offset);
            }



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


        }

        resetBulk(){
            this.setState({
                bulk:false,
                bulkId:[]
            })
        }

  render(){
    let list = this.props.Observation.all?this.props.Observation.all.map(item => {
return   <ObservationListWrapper  uniqueKey={item.id} showMap={this.state.showMap} key={item.id} filterUrl={this.state.urlforPassing} view={this.state.params.view}  selectAll={this.state.selectAll}  launchBulk={this.launchBulk}/>
}):null;
    return(
            <div className="container-fluid" style={{paddingRight:'15px',paddingLeft:'15px',paddingTop:'auto',paddingBottom:'auto'}}>
            {this.state.login_modal==true?(<ModalPopup key={"downloadLogin"}   id={"downloads login"} func={this.setOpenModal}/>):null}
            {this.state.openModal?<DownloadModal/>:""}
            {(this.props.Observation.all && this.props.Observation.all.length>0)?(this.fetchReco===true?this.obvResponse():null):null}
            {this.props.Observation.count?
              <div>
                  <div className="row" style={{marginBottom:'5px'}}>
                    <div className="col-sm-4 " style={{paddingRight:'0px'}}>
                      <ul className="nav nav-tabs" style={{border:'0px'}}>
                          <li role="presentation" ><button style={{fontSize:'1em'}}  className={`btn  ${this.state.params.view==="list"?"btn-success successNewColor btn-xs":"btn-default btn-xs"}`} onClick={this.setView.bind(this,"list")} ><span className="glyphicon glyphicon-th-list">{" "+this.props.LocaleData['default.instance.list']}</span></button></li>
                          <li role="presentation" ><button style={{fontSize:'1em'}} className={`btn  ${this.state.params.view==="grid"?"btn-success successNewColor btn-xs":"btn-default btn-xs"}`} onClick={this.setView.bind(this,"grid")} ><span className="glyphicon glyphicon-th">{" "+this.props.LocaleData['default.instance.grid']}</span></button></li>
                          <li role="presentation" ><button style={{fontSize:'1em'}} className={`btn  ${this.state.params.view==="map"?"btn-success successNewColor btn-xs":"btn-default btn-xs"}`} onClick={this.setView.bind(this,"map")} ><span className="glyphicon glyphicon-map-marker">{" "+this.props.LocaleData['default.instance.map']}</span></button></li>
                      </ul>
                    </div>
                    <div className="col-sm-4 " style={{paddingRight:'0px',paddingLeft:'0px'}}>
                      <div className="alignLeftCenter" style={{display:'block',textAlign:'-webkit-center'}}><h5 className="text-primary" style={{marginTop:'4px',marginBottom:'4px'}}>{this.props.Observation.count} result(s) found</h5></div>
                    </div>
                    <div className="col-sm-4" style={{paddingLeft:'0px'}}>
                      <div className="alignLeft" style={{float:'right'}}>
                        <button style={{marginRight:'5px',fontSize:'1em'}} onClick={this.setOpenModal.bind(this)} className="btn btn-default btn-xs">{this.props.LocaleData['button.download']}</button>
                        <select className="btn btn-default btn-xs" style={{fontSize:'1em'}} onChange={this.handleChangeCheckbox.bind(this)} value={this.state.sortValue}>
                            <option  value="Last Updated">{this.props.LocaleData['button.last.updated']}</option>
                            <option  value="Latest">{this.props.LocaleData['button.latest']}</option>
                            <option  value="Most Viewed">{this.props.LocaleData['button.most.viewed']}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row" >
                    <div className="col-sm-12">
                    {this.state.params.view=="map"?
                    <ObservationListWrapper view={this.state.params.view} filterUrl={this.state.urlforPassing} />
                    :
                    this.state.params.view=="grid"?
                    <ObservationListWrapper view={this.state.params.view} objs={this.props.Observation.all} filterUrl={this.state.urlforPassing} />
                    :
                    list}
                  </div>
                  </div>
                  {this.state.params.view==="map"?null:<InfiniteScroll
                    next={this.loadMore.bind(this)}
                    hasMore={this.state.params.hasMore}
                    loader={ <Button bsStyle="success" bsSize="small" block>{this.props.LocaleData['button.loading']}</Button>}
                    >
                  </InfiniteScroll>}

              </div>
            :(this.props.Observation.count===0)?"No result found":<div style={{height:'600px',width:'660x',marginTop:'80px'}} className="container-fluid">
                <div className="row">
                  <div className="col-sm-offset-5 col-sm-2">
                    <div className="loader"></div>
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
  UserGroupList:state.UserGroupList,
  LocaleData:state.LocaleData
};
}
export default  withRouter(connect(mapStateToProps, {fetchObservations,ClearObservationPage,fetchRecommendations,clearRecommendations,fetchFilterCount})(ObservationListContainer));
