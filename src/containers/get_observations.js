import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';
import ObservationListComponent from '../components/Observation_Show/observation_list_component';
import {ClearObservationPage} from '../actions/index';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Right_stats from '../components/right_material';
import createHistory from 'history/createBrowserHistory';
import EllipsisText  from 'react-ellipsis-text';
import  queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import  deepEqual  from 'deep-equal';
import _ from "lodash";
import $ from "jquery-param";
const history=createHistory();
class GetObservations extends Component{
    constructor(props){
      super(props);
      this.state={
        params:{
          max:10,
          offset:0,
          taxon:[],
          sGroup:[],
          classification:undefined,
          userGroupList:[],
          isFlagged:undefined,
          speciesName:undefined,
          isMediaFilter:undefined,
          sort:"lastRevised",
          webaddress:undefined

        },
        title:[],
        groupName:[],
        userGroupName:[],
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
      let search1=queryString.stringify(newparams);


       let search2 = decodeURIComponent( search1 );
       const {groupName}=this.props.match.params;
       if(!groupName){
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

      }
      else{
        const newparams=this.state.params;
        newparams.webaddress=groupName;
        this.props.fetchObservations(newparams)
          
       }
      
      this.loadMore=this.loadMore.bind(this);
    };

      taxonFilterEventListner(e){
        const params=this.state.params;
        let title=this.state.title;
        if(!params.taxon){
          params.taxon=[];
        }
        if(e.detail.checked){
          let titleobject={};
          titleobject.title=e.detail.title;
          titleobject.taxon=e.detail.taxon;
          title.push(titleobject);
          params.taxon=e.detail.taxon
        }
        else{
          params.taxon=e.detail.taxon
          const title=this.state.title;
          const indexoftitile=title.indexOf(e.detail.title);
          title.splice(indexoftitile,1);
        }
          var titleobject={};
          titleobject.taxon=e.detail.taxon;
          let newtitle=_.uniqBy(title,"taxon")
          params.classification=e.detail.classification;
          let sGroup=params.sGroup;
          let isFlagged=params.isFlagged;
          let speciesName=params.speciesName;
          let MediaFilter=params.isMediaFilter;
          this.setState({
              params:{
                taxon:params.taxon,
                classification:params.classification,
                offset:0,
                sGroup:sGroup,
                userGroupList:params.userGroupList,
                isFlagged:isFlagged,
                speciesName:speciesName,
                isMediaFilter:MediaFilter,
                sort:params.sort
              },
                title:newtitle
          })

          params.taxon=params.taxon.join(",");
          params.sGroup=params.sGroup.join(",");
          params.userGroupList=params.userGroupList.join(",");
          const seacrh=queryString.stringify(params)
          const search1=decodeURIComponent(seacrh);
          history.push({
            pathname:'/observation/list',
            search:search1
          })
          this.props.fetchObservations(params);
      }



      sGroupFilterEventListner(e){
        
        
        const params=this.state.params;
        if(e.detail.sGroup){
        this.props.ClearObservationPage();
        if(!params.sGroup){
          params.sGroup=[];
        }

        params.sGroup=e.detail.sGroup;
        let groupName=e.detail.groupName;

        params.classification=params.classification;
        let isFlagged=params.isFlagged;
        let speciesName=params.speciesName;
        let MediaFilter=params.isMediaFilter;
        let taxonparams=params.taxon;
        taxonparams= taxonparams.join(",");
        let sGroupParams=params.sGroup;
            sGroupParams=sGroupParams.join(",");
        let userGroupParams=params.userGroupList;
         userGroupParams=userGroupParams.join(",");
        let newparams={
                  max:10,
                  sGroup:sGroupParams,
                  classification:params.classification,
                  offset:0,
                  taxon:taxonparams,
                  userGroupList:userGroupParams,
                  isFlagged:isFlagged,
                  speciesName:speciesName,
                  isMediaFilter:MediaFilter,
                  sort:params.sort
                }
                const seacrh=queryString.stringify(newparams)
                const search1=decodeURIComponent(seacrh);
                history.push({
                  pathname:'/observation/list',
                  search:search1
                })
        this.props.fetchObservations(newparams);
        this.setState({
                params:{
                  max:10,
                  sGroup:params.sGroup,
                  classification:params.classification,
                  offset:0,
                  taxon:params.taxon,
                  userGroupList:params.userGroupList,
                  isFlagged:isFlagged,
                  speciesName:speciesName,
                  isMediaFilter:MediaFilter,
                  sort:params.sort
                },
              groupName:groupName
        })
      }
      else{
        this.setState({
                params:{
                  max:params.max,
                  sGroup:params.sGroup,
                  classification:params.classification,
                  offset:params.offset,
                  taxon:params.taxon,
                  userGroupList:params.userGroupList,
                  isFlagged:params.isFlagged,
                  speciesName:params.peciesName,
                  isMediaFilter:params.MediaFilter,
                  sort:params.sort
                },
              groupName:e.detail.groupName
        })
      }

      }

    userGroupFilterEventListner(e){
      let params=this.state.params;
      let userGroupName=this.state.userGroupName;
      if(!params.userGroupList){
        params.userGroupList=[];
      }
        params.userGroupList.push(e.detail.id)
          params.userGroupList=_.uniqBy(params.userGroupList)

        const title=this.state.title;
        var titleobject={};
        titleobject.userGroupList=e.detail.id;
        titleobject.userGroupName=e.detail.userGroupName;

        userGroupName.push(titleobject);
        let newuserGroupName=_.uniqBy(  userGroupName,"userGroupName")

        params.offset=0;
        let isFlagged=params.isFlagged;
        let speciesName=params.speciesName;
        let MediaFilter=params.isMediaFilter;

        let taxon=params.taxon;
        taxon=taxon.join(",");
        let sGroup=params.sGroup;
        sGroup=sGroup.join(",");
        let userGroupList=params.userGroupList;
        userGroupList=userGroupList.join(",");

      let newparams={
        max:10,
        offset:0,
        classification:params.classification,
        sGroup:sGroup,
        taxon:taxon,
        userGroupList:userGroupList,
        isFlagged:isFlagged,
        speciesName:speciesName,
        isMediaFilter:MediaFilter,
        sort:params.sort
      }
      const seacrh=queryString.stringify(newparams)
      const search1=decodeURIComponent(seacrh);
      history.push({
        pathname:'/observation/list',
        search:search1
      })

      this.props.fetchObservations(newparams);
      this.setState({
      params:{
        max:10,
        offset:0,
        classification:params.classification,
        sGroup:params.sGroup,
        taxon:params.taxon,
        userGroupList:params.userGroupList,
        isFlagged:isFlagged,
        speciesName:speciesName,
        isMediaFilter:MediaFilter,
        sort:params.sort
      },
      userGroupName:newuserGroupName
      })
    }

    isMediaFilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;
      let taxon=params.taxon;
      taxon=taxon.join(",");
      let sGroup=params.sGroup;
      sGroup=sGroup.join(",");
      let userGroupList=params.userGroupList;
      userGroupList=userGroupList.join(",");
        let speciesNameFilter=params.speciesName;
      let newparams={
        max:10,
        classification:params.classification,
        offset:0,
        taxon:taxon,
        sGroup:sGroup,
        userGroupList:userGroupList,
        speciesName:speciesNameFilter,
        isMediaFilter:e.detail.MediaFilter,
        sort:params.sort
      }
      const seacrh=queryString.stringify(newparams)
      const search1=decodeURIComponent(seacrh);
      history.push({
        pathname:'/observation/list',
        search:search1
      })
      this.props.fetchObservations(newparams);
      this.setState({
              params:{
                max:10,
                classification:params.classification,
                offset:0,
                taxon:params.taxon,
                sGroup:params.sGroup,
                userGroupList:params.userGroupList,
                speciesName:speciesNameFilter,
                isMediaFilter:e.detail.MediaFilter,
                sort:params.sort
              }
      })
    }

    allFilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;

      params.speciesName=e.detail.SpeciesName;
      let taxon=params.taxon;
      taxon=taxon.join(",");
      let sGroup=params.sGroup;
      sGroup=sGroup.join(",");
      let userGroupList=params.userGroupList;
      userGroupList=userGroupList.join(",");
      history.push({
        pathname:'/observation/list',
        search:queryString.stringify(params)
      })
      let newparams={
        max:10,
        classification:params.classification,
        offset:0,
        taxon:taxon,
        sGroup:sGroup,
        userGroupList:userGroupList,
        speciesName:e.detail.SpeciesName,
        sort:params.sort,
        isMediaFilter:params.isMediaFilter
      }
      const seacrh=queryString.stringify(newparams)
      const search1=decodeURIComponent(seacrh);
      history.push({
        pathname:'/observation/list',
        search:search1
      })
      this.props.fetchObservations(newparams);
      this.setState({
              params:{
                max:10,
                classification:params.classification,
                offset:0,
                taxon:params.taxon,
                sGroup:params.sGroup,
                userGroupList:params.userGroupList,
                speciesName:e.detail.SpeciesName,
                sort:params.sort,
                isMediaFilter:params.isMediaFilter
              }
      })
    }

      removeTaxon(taxonid,item){

        const params=this.state.params;
        const index1=params.taxon.indexOf(taxonid);
        console.log("params",params)
        params.taxon.splice(index1, 1);

        const title=this.state.title;
        const indexoftitile=title.indexOf(item);
        title.splice(indexoftitile,1);

        this.props.ClearObservationPage();

          let sGroupParams=params.sGroup;
          let isFlagged=params.isFlagged;
          let speciesName=params.speciesName;
          let MediaFilter=params.isMediaFilter;
          sGroupParams= sGroupParams.join(",");
          let taxonparams=params.taxon;
          taxonparams=taxonparams.join(",");
          let userGroup=params.userGroupList;
          userGroup=userGroup.join(",");

        const newparams={
            max:10,
            offset:0,
            classification:params.classification,
            sGroup:sGroupParams,
            taxon:taxonparams,
            userGroupList:userGroup,
            isFlagged:isFlagged,
            speciesName:speciesName,
            isMediaFilter:MediaFilter,
            sort:params.sort
        }
        const seacrh=queryString.stringify(newparams)
        const search1=decodeURIComponent(seacrh);
        history.push({
          pathname:'/observation/list',
          search:search1
        })
        this.props.fetchObservations(newparams);
          this.setState({
            params:{
                  max:10,
                  offset:0,
                  classification:params.classification,
                  sGroup:params.sGroup,
                  taxon:params.taxon,
                  userGroupList:params.userGroupList,
                  isFlagged:isFlagged,
                  speciesName:speciesName,
                  isMediaFilter:MediaFilter,
                  sort:params.sort
            },
            title:title,
            groupName:this.state.groupName
          })
      }
      removesGroup(sGroup,item){
        const params=this.state.params;

        const index1=params.sGroup.indexOf(sGroup);
        params.sGroup.splice(index1, 1);
        const groupName=this.state.groupName;

        const indexoftitile=groupName.indexOf(item);
        groupName.splice(indexoftitile,1);
        let isFlagged=params.isFlagged;

        let speciesName=params.speciesName;
        let MediaFilter=params.isMediaFilter;
        let taxon=params.taxon;

        taxon=taxon.join(",");
        let sGroupName=params.sGroup;
        sGroupName=sGroupName.join(",");
        let userGroupNew=params.userGroupList;
        userGroupNew=userGroupNew.join(",");
        const newparams={
            max:10,
            offset:0,
            classification:params.classification,
            sGroup:sGroupName,
            taxon,
            userGroupList:userGroupNew,
            isFlagged:isFlagged,
            speciesName:speciesName,
            isMediaFilter:MediaFilter,
            sort:params.sort
        }
        this.props.ClearObservationPage();
        const seacrh=queryString.stringify(newparams)
        const search1=decodeURIComponent(seacrh);
        history.push({
          pathname:'/observation/list',
          search:search1
        })
        this.props.fetchObservations(newparams)

        this.setState({
          params:{
            max:10,
            offset:0,
            classification:params.classification,
            sGroup:params.sGroup,
            taxon:params.taxon,
            userGroupList:params.userGroupList,
            isFlagged:isFlagged,
            speciesName:speciesName,
            isMediaFilter:MediaFilter,
            sort:params.sort
          },
          title:this.state.title,
          groupName:groupName
        })

      }


      removeUserGroup(userGroup,item){
        this.props.ClearObservationPage();
        const params=this.state.params;
        const index1=params.userGroupList.indexOf(userGroup);
        params.userGroupList.splice(index1, 1);

        const userGroupName=this.state.userGroupName;
        const indexoftitile=userGroupName.indexOf(item);
        userGroupName.splice(indexoftitile,1);

        let userGroupid=params.userGroupList;
        let isFlagged=params.isFlagged;
        let speciesName=params.speciesName;
        let MediaFilter=params.isMediaFilter;

        userGroupid=userGroupid.join(",");
        let taxon=params.taxon;
        taxon=taxon.join(",");
        let sGroup=params.sGroup;
        sGroup=sGroup.join(",");

        const newparams={
            max:10,
            offset:0,
            classification:params.classification,
            sGroup,
            taxon,
            userGroupList:userGroupid,
            isFlagged:isFlagged,
            speciesName:speciesName,
            isMediaFilter:MediaFilter,
            sort:params.sort
        }
        this.props.ClearObservationPage();
        const seacrh=queryString.stringify(newparams)
        const search1=decodeURIComponent(seacrh);
        history.push({
          pathname:'/observation/list',
          search:search1
        })
        this.props.fetchObservations(newparams);
        this.setState({
            params:{
              max:10,
              offset:0,
              classification:params.classification,
              sGroup:params.sGroup,
              taxon:params.taxon,
              userGroupList:params.userGroupList,
              isFlagged:isFlagged,
              speciesName:speciesName,
              isMediaFilter:MediaFilter,
              sort:params.sort
            },
            userGroupName:userGroupName
        })
      }


      showtaxonButton(item,index){
      return  <button className="btn btn-default btn-xs " key={index}  ><EllipsisText text={item.title} length={10} />     <span>&nbsp;&nbsp;</span></button>
      }
      showGroupNameButton(item,index){
        return <button  className="btn btn-danger btn-xs"  key={index} ><EllipsisText text={item?item:null} length={10} /> </button>
      }
      showUserGroupNameButton(item,index){
        return <button className="btn btn-warning btn-xs " onClick={this.removeUserGroup.bind(this,item.userGroup,item)} key={index} ><EllipsisText text={item.userGroupName} length={10} /> <span className="glyphicon glyphicon-remove"></span></button>
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
        if(groupName){
          newparams.webaddress=groupName;
        }
        if(!newparams.max){
          newparams.max=10;
        }

        if(!newparams.offset){
          newparams.offset=0;
        }
        console.log("console.logoooooooooooooooooooo",newparams)
        this.setState({
          params:newparams
        })

      }
      componentDidMount(){
        this.setParameter();
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("isMediaFilter-filter", this.isMediaFilterEventListner.bind(this));
        document.addEventListener("getTaxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));

      }
      componentWillUnmount(){
        document.addEventListener("speciesName-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("get-taxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
        document.addEventListener("isMediaFilter-filter", this.isMediaFilterEventListner.bind(this));

        this.props.ClearObservationPage();

      }
      displayData(view,objs,count){

          return(
          <div key={objs.id}>
            <ObservationListComponent objs={objs} view={view} count={count}/>
          </div>
        )
      }
      loadMore(){
        let params=this.state.params;
          let count=params.offset;
          count=count+1;
          let offset=count*10;
          let newtaxon=params.taxon;
            newtaxon=newtaxon.join(",");
          let newsGroup=params.sGroup;
            newsGroup=newsGroup.join(",");
          let newUserGroup=params.userGroupList;
            newUserGroup=newUserGroup.join(",");
            console.log(params.sortBy,"pahjfdshgjkdfsgh")
              let newparams={
                max:10,
                offset:offset,
                sGroup:newsGroup,
                taxon:newtaxon,
                classification:params.classification,
                userGroupList:newUserGroup,
                sort:params.sort,
                speciesName:params.speciesName,
                isMediaFilter:params.isMediaFilter,
                webaddress:params.webaddress
              }
              const seacrh=queryString.stringify(newparams)
              const search1=decodeURIComponent(seacrh);
              history.push({
                pathname:'/observation/list',
                search:search1
              })
          this.props.fetchObservations(newparams);
          this.setState({
            params:{
              max:10,
              offset:count,
              sGroup:params.sGroup,
              taxon:params.taxon,
              classification:params.classification,
              userGroupList:params.userGroupList,
              sort:params.sort,
              speciesName:params.speciesName,
              isMediaFilter:params.isMediaFilter,
              webaddress:params.webaddress

            }
          })

        }
        componentWillReceiveProps(nextProps){
          if(!deepEqual(this.props.location.search,nextProps.location.search)){


          }
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
        sortObservation(sortby){

          const params=this.state.params;
          let newTaxon=params.taxon;
          let newsGroup=params.sGroup;
          let newUsergroupList=params.userGroupList;
          newTaxon=newTaxon.join(",");
          newsGroup=newsGroup.join(",");
          newUsergroupList=newUsergroupList.join(",");

          let newparams={
            max:params.max,
            offset:params.offset,
            taxon:newTaxon,
            sGroup:newsGroup,
            userGroupList:newUsergroupList,

            classification:params.classification,
              sort:sortby,
            isFlagged:params.isFlagged,
            speciesName:params.speciesName,
            isMediaFilter:params.MediaFilter
          }
          this.props.ClearObservationPage();

            this.setState({
            params:{
              max:params.max,
              offset:params.offset,
              taxon:params.taxon,
              sGroup:params.sGroup,
              userGroupList:params.userGroupList,
              sort:sortby,
              classification:params.classification,
              isFlagged:params.isFlagged,
              speciesName:params.speciesName,
              isMediaFilter:params.MediaFilter
            }

            })
              this.props.fetchObservations(newparams)
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
            <div className="pull-right">
              <Right_stats />
            </div>


            {this.props.Observation.count?<button className="btn btn-success btn-xs text-primary">{this.props.Observation.count}</button>:(this.props.Observation.count===0)?"No result found":null}

            {this.state.title.length?this.state.title.map(this.showtaxonButton.bind(this)):null}
            {console.log("this.state.groupNameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",this.state.groupName)}
            {this.state.groupName?this.state.groupName.map(this.showGroupNameButton.bind(this)):null}
            {this.state.userGroupName?this.state.userGroupName.map(this.showUserGroupNameButton.bind(this)):null}
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
  Observation:state.Observation,
  queryParams:state.Observation.queryParameter

};
}
export default  withRouter(connect(mapStateToProps, {fetchObservations,ClearObservationPage})(GetObservations));
