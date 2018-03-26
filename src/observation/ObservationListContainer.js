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

const history = createHistory();

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName]==="") {
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
          max:10,
          offset:0,
          count:0,
          taxon:[],
          sGroup:[],
          user:[],
          classification:undefined,
          userGroupList:[],
          isFlagged:[],
          speciesName:[],
          mediaFilter:[],
          sort:"lastrevised",
          minDate:undefined,
          maxDate:undefined,
          months:[],
          validate:[],
          hasMore:true,
          trait_8:[],
          trait_9:[],
          trait_10:[],
          trait_11:[],
          trait_12:[],
          trait_13:[],
          trait_15:[],

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
      this.url;
      let newparams=  queryString.parse(document.location.search);
      let {groupName}=this.props.match.params;


      if(groupName){

          UserGroupName.list().then(data=>{
            let group=data.find((item)=>{
                return item.webaddress==groupName
            })

            newparams.userGroupList=group.id;

            if(!newparams.sort){
              newparams.sort="lastrevised"
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
            newparams=clean(newparams);
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

            let url="/search/observation/observation?"+search2;
            let url1="/observation/observation?"+search2;
            let userGroupList=this.state.params.userGroupList;
            userGroupList.push(group.id);
            this.props.fetchFilterCount(url1);
            this.setState({
              userGroupList:userGroupList,
              urlforPassing:url,
              openModal:false
            })
          });

      }
      else{
          let fullUrl = window.location.host;
          let parts=fullUrl.split(".");
            let userGroupList=this.state.params.userGroupList;
          if(parts.length>=3){
            if(parts[0]=="assambiodiversity"){
                newparams.userGroupList="4087136";
                userGroupList.push("4087136")
            }
            if(parts[0]=="treesindia"){
              newparams.userGroupList="18";
              userGroupList.push("18")
            }
            if(parts[0]=="thewesternghats"){
              newparams.userGroupList="1";
              userGroupList.push("1");
            }
          }
        if(!newparams.sort){
          newparams.sort="lastrevised"
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
        newparams=clean(newparams);
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
          console.log(search1);
          history.push({
            pathname:this.props.location.pathname,
            search:search2
          })

          this.props.fetchObservations(this.state.params)
        }


        let url="/search/observation/observation?"+search2;
        let url1="/observation/observation?"+search2;
        this.props.fetchFilterCount(url1);
        this.setState({
          urlforPassing:url,
          openModal:false,
          userGroupList:userGroupList
        })
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
          let sGroup=params.sGroup;
          let isFlagged=params.isFlagged;
          let speciesName=params.speciesName;
          let mediaFilter=params.mediaFilter;
          let userGroupList=params.userGroupList;
          let taxon=params.taxon;
          let classification=params.classification;
          let user=params.user;
          let offset=params.offset;
          let count=params.count;

          let minDate=params.minDate;
          let maxDate=params.maxDate;

          let months=params.months;
          let hasMore=params.hasMore;
          let validate=params.validate;
          let trait_8=params.trait_8;
          let trait_9=params.trait_9;
          let trait_10=params.trait_10;
          let trait_11=params.trait_11;
          let trait_12=params.trait_12;
          let trait_13=params.trait_13;
          let trait_15=params.trait_15;

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
                mediaFilter:mediaFilter,
                sort:params.sort,
                user:user,

                minDate:minDate,
                maxDate:maxDate,

                months:months,
                hasMore:hasMore,
                validate:validate,
                trait_8:trait_8,
                trait_9:trait_9,
                trait_10:trait_10,
                trait_11:trait_11,
                trait_12:trait_12,
                trait_13:trait_13,
                trait_15:trait_15
              }
          })

          params.taxon=params.taxon.join(",");
          params.sGroup=params.sGroup.join(",");
          params.userGroupList=params.userGroupList.join(",");
          params.user=params.user.join(",");
          params.months=params.months.join(",");
          params.speciesName=params.speciesName.join(",");
          params.mediaFilter=params.mediaFilter.join(",");
          params.isFlagged=params.isFlagged.join(",");
          params.validate=params.validate.join(",");
          params.trait_8=params.trait_8.join(",");
          params.trait_9=params.trait_9.join(",");
          params.trait_10=params.trait_10.join(",");
          params.trait_11=params.trait_11.join(",");
          params.trait_12=params.trait_12.join(",");
          params.trait_13=params.trait_13.join(",");
          params.trait_15=params.trait_15.join(",");
          params.count=0;
          params.offset=0;
          params=clean(params);
          const seacrh=queryString.stringify(params)
          const search1=decodeURIComponent(seacrh);
          history.push({
            pathname:this.props.location.pathname,
            search:search1
          })
          let url="/search/observation/observation?"+search1;
          let url1="/observation/observation?"+search1;
          this.props.fetchFilterCount(url1);
          this.setState({
            urlforPassing:url,
            openModal:false
          })

          this.props.fetchObservations(params);
          this.props.clearRecommendations();
          this.fetchReco = true;
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

    mediaFilterEventListner(e){
      this.props.ClearObservationPage();

      const params=this.state.params;
      if(!params.mediaFilter){
        params.mediaFilter=[];
      }
      params.mediaFilter=e.detail.MediaFilter;
      this.GlobalCall(params);
    }

    allFilterEventListner(e){

      this.props.ClearObservationPage();

      const params=this.state.params;
      if(!params.speciesName){
        params.speciesName=[];
      }
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
      params.maxDate=e.detail.maxDate;
      params.minDate=e.detail.minDate;
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
    validateFilterEventListner(e){
      this.props.ClearObservationPage();

      const params=this.state.params;
      if(!params.validate){
        params.validate=[];
      }
      params.validate=e.detail.ValidateFilter;
      this.GlobalCall(params);
    }
    flagFilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.isFlagged){
        params.isFlagged=[];
      }
      params.isFlagged=e.detail.isFlagged;
      this.GlobalCall(params);

    }
    trait_8FilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.trait_8){
        params.trait_8=[];
      }
      params.trait_8=e.detail.trait_8;
      this.GlobalCall(params);

    }
    trait_9FilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.trait_9){
        params.trait_9=[];
      }
      params.trait_9=e.detail.trait_9;
      this.GlobalCall(params);

    }
    trait_10FilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.trait_10){
        params.trait_10=[];
      }
      params.trait_10=e.detail.trait_10;
      this.GlobalCall(params);

    }
    trait_11FilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.trait_11){
        params.trait_11=[];
      }
      params.trait_11=e.detail.trait_11;
      this.GlobalCall(params);

    }
    trait_12FilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.trait_12){
        params.trait_12=[];
      }
      params.trait_12=e.detail.trait_12;
      this.GlobalCall(params);

    }
    trait_13FilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.trait_13){
        params.trait_13=[];
      }
      params.trait_13=e.detail.trait_13;
      this.GlobalCall(params);

    }
    trait_15FilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      if(!params.trait_15){
        params.trait_15=[];
      }
      params.trait_15=e.detail.trait_15;
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
        if(newparams.speciesName){
          newparams.speciesName=newparams.speciesName.split(",");
        }
        else{
          newparams.speciesName=[];
        }
        if(newparams.mediaFilter){
          newparams.mediaFilter=newparams.mediaFilter.split(",");
        }
        else{
          newparams.mediaFilter=[];
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
        if(newparams.isFlagged){
          newparams.isFlagged=newparams.isFlagged.split(",");
        }
        else{
          newparams.isFlagged=[];
        }
        if(newparams.validate){
          newparams.validate=newparams.validate.split(",");
        }
        else{
          newparams.validate=[];
        }
        if(newparams.trait_8){
          newparams.trait_8=newparams.trait_8.split(",");
        }
        else{
          newparams.trait_8=[];
        }
        if(newparams.trait_9){
          newparams.trait_9=newparams.trait_9.split(",");
        }
        else{
          newparams.trait_9=[];
        }
        if(newparams.trait_10){
          newparams.trait_10=newparams.trait_10.split(",");
        }
        else{
          newparams.trait_10=[];
        }
        if(newparams.trait_11){
          newparams.trait_11=newparams.trait_11.split(",");
        }
        else{
          newparams.trait_11=[];
        }
        if(newparams.trait_12){
          newparams.trait_12=newparams.trait_12.split(",");
        }
        else{
          newparams.trait_12=[];
        }
        if(newparams.trait_13){
          newparams.trait_13=newparams.trait_13.split(",");
        }
        else{
          newparams.trait_13=[];
        }
        if(newparams.trait_15){
          newparams.trait_15=newparams.trait_15.split(",");
        }
        else{
          newparams.trait_15=[];
        }
        const seacrh=queryString.stringify(newparams)
        const search1=decodeURIComponent(seacrh);
        let url="/search/observation/observation?"+search1;
        let url1="/observation/observation?"+search1;
        this.props.fetchFilterCount(url1);
        this.setState({
          params:newparams,
          urlforPassing:url,
          openModal:false
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
        let mediaFilter=params.mediaFilter;
        let userGroupList=params.userGroupList;
        let taxon=params.taxon;
        let classification=params.classification;

        let user=params.user;


        let minDate=params.minDate;
        let maxDate=params.maxDate;

        let months=params.months;
        let hasMore=params.hasMore;
        let validate=params.validate;

        let trait_8=params.trait_8;
        let trait_9=params.trait_9;
        let trait_10=params.trait_10;
        let trait_11=params.trait_11;
        let trait_12=params.trait_12;
        let trait_13=params.trait_13;
        let trait_15=params.trait_15;


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
              mediaFilter:mediaFilter,
              sort:params.sort,
              user:user,
              minDate:minDate,
              maxDate:maxDate,

              months:months,
              hasMore:hasMore,
              validate:validate,
              trait_8:trait_8,
              trait_9:trait_9,
              trait_10:trait_10,
              trait_11:trait_11,
              trait_12:trait_12,
              trait_13:trait_13,
              trait_15:trait_15
            }
        })
        params.taxon=params.taxon.join(",");
        params.sGroup=params.sGroup.join(",");
        params.userGroupList=params.userGroupList.join(",");
        params.user=params.user.join(",");
        params.months=params.months.join(",");
        params.speciesName=params.speciesName.join(",");
        params.mediaFilter=params.mediaFilter.join(",");
        params.isFlagged=params.isFlagged.join(",");
        params.validate=params.validate.join(",");
        params.trait_8=params.trait_8.join(",");
        params.trait_9=params.trait_9.join(",");
        params.trait_10=params.trait_10.join(",");
        params.trait_11=params.trait_11.join(",");
        params.trait_12=params.trait_12.join(",");
        params.trait_13=params.trait_13.join(",");
        params.trait_15=params.trait_15.join(",");
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

        document.addEventListener("trait_8-filter", this.trait_8FilterEventListner.bind(this));
        document.addEventListener("trait_9-filter", this.trait_9FilterEventListner.bind(this));
        document.addEventListener("trait_10-filter", this.trait_10FilterEventListner.bind(this));
        document.addEventListener("trait_11-filter", this.trait_11FilterEventListner.bind(this));
        document.addEventListener("trait_12-filter", this.trait_12FilterEventListner.bind(this));
        document.addEventListener("trait_13-filter", this.trait_13FilterEventListner.bind(this));
        document.addEventListener("trait_15-filter", this.trait_15FilterEventListner.bind(this));




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

        document.addEventListener("trait_8-filter", this.trait_8FilterEventListner.bind(this));
        document.addEventListener("trait_9-filter", this.trait_9FilterEventListner.bind(this));
        document.addEventListener("trait_10-filter", this.trait_10FilterEventListner.bind(this));
        document.addEventListener("trait_11-filter", this.trait_11FilterEventListner.bind(this));
        document.addEventListener("trait_12-filter", this.trait_12FilterEventListner.bind(this));
        document.addEventListener("trait_13-filter", this.trait_13FilterEventListner.bind(this));
        document.addEventListener("trait_15-filter", this.trait_15FilterEventListner.bind(this));

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
            var lastTenObvs = allObvs.slice(allObvs.length-10)

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
