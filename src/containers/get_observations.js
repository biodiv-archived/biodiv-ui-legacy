import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';
import ObservationListComponent from '../components/observation_list_component';
import {ClearObservationPage} from '../actions/index';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Right_stats from '../components/right_material';
import createHistory from 'history/createBrowserHistory';
import EllipsisText  from 'react-ellipsis-text';
import  queryString from 'query-string';
import {withRouter} from 'react-router-dom';
const history=createHistory();
class GetObservations extends Component{
    constructor(props,match){
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
          MediaFilter:undefined
        },
        title:[],
        groupName:[],
        userGroupName:[]
      }

      const query=queryString.stringify(this.state.params);


      this.props.fetchObservations(this.state.params);

      this.loadMore=this.loadMore.bind(this);
    };

      taxonFilterEventListner(e){
        const params=this.state.params;
        if(!params.taxon){
          params.taxon=[];
        }
        params.taxon.push(e.detail.taxon)

          const title=this.state.title;
          var titleobject={};
          titleobject.taxon=e.detail.taxon;
          titleobject.title=e.detail.title;
          title.push(titleobject);
          params.classification=265799;
          let sGroup=params.sGroup;
          let isFlagged=params.isFlagged;
          let speciesName=params.speciesName;
          let MediaFilter=params.MediaFilter;
          this.setState({
              params:{
                taxon:params.taxon,
                classification:265799,
                offset:0,
                sGroup:sGroup,
                userGroupList:params.userGroupList,
                isFlagged:isFlagged,
                speciesName:speciesName,
                MediaFilter:MediaFilter
              },
                title:title
          })

          params.taxon=params.taxon.join(",");
          params.sGroup=params.sGroup.join(",");
          params.userGroupList=params.userGroupList.join(",");

          this.props.fetchObservations(params);
      }

      sGroupFilterEventListner(e){
        const params=this.state.params;
        if(!params.sGroup){
          params.sGroup=[];
        }
        console.log("params.sGroup",params.taxon)
        params.sGroup.push(e.detail.sGroup)

        const groupName=this.state.groupName;
        var titleobject={};
        titleobject.sGroup=e.detail.sGroup;
        titleobject.groupName=e.detail.groupName;
        groupName.push(titleobject);
        params.classification=265799;
        let isFlagged=params.isFlagged;
        let speciesName=params.speciesName;
        let MediaFilter=params.MediaFilter;

        let taxonparams=params.taxon;
        taxonparams= taxonparams.join(",");
        let sGroupParams=params.sGroup;
            sGroupParams=sGroupParams.join(",");
        let userGroupParams=params.userGroupList;
         userGroupParams=userGroupParams.join(",");

        let newparams={
                  max:10,
                  sGroup:sGroupParams,
                  classification:265799,
                  offset:0,
                  taxon:taxonparams,
                  userGroupList:userGroupParams,
                  isFlagged:isFlagged,
                  speciesName:speciesName,
                  MediaFilter:MediaFilter

                }

        this.props.fetchObservations(newparams);
        this.setState({
                params:{
                  max:10,
                  sGroup:params.sGroup,
                  classification:265799,
                  offset:0,
                  taxon:params.taxon,
                  userGroupList:params.userGroupList,
                  isFlagged:isFlagged,
                  speciesName:speciesName,
                  MediaFilter:MediaFilter

                },
              groupName:groupName
        })
      }

    userGroupFilterEventListner(e){
      let params=this.state.params;
      let userGroupName=this.state.userGroupName;
      if(!params.userGroupList){
        params.userGroupList=[];
      }
        params.userGroupList.push(e.detail.id)
        console.log(params.userGroupList,"params.userGroupList")
        const title=this.state.title;
        var titleobject={};
        titleobject.userGroupList=e.detail.id;
        titleobject.userGroupName=e.detail.userGroupName;
        userGroupName.push(titleobject);

        params.offset=0;
        let isFlagged=params.isFlagged;
        let speciesName=params.speciesName;
        let MediaFilter=params.MediaFilter;

        let taxon=params.taxon;
        taxon=taxon.join(",");
        let sGroup=params.sGroup;
        sGroup=sGroup.join(",");
        let userGroupList=params.userGroupList;
        userGroupList=userGroupList.join(",");

      let newparams={
        max:10,
        offset:0,
        classification:265799,
        sGroup:sGroup,
        taxon:taxon,
        userGroupList:userGroupList,
        isFlagged:isFlagged,
        speciesName:speciesName,
        MediaFilter:MediaFilter
      }

      this.props.fetchObservations(newparams);
      this.setState({
      params:{
        max:10,
        offset:0,
        classification:265799,
        sGroup:params.sGroup,
        taxon:params.taxon,
        userGroupList:params.userGroupList,
        isFlagged:isFlagged,
        speciesName:speciesName,
        MediaFilter:MediaFilter
      },
      userGroupName:userGroupName
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

      let newparams={
        max:10,
        classification:265799,
        offset:0,
        taxon:taxon,
        sGroup:sGroup,
        userGroupList:userGroupList,
        speciesName:e.detail.SpeciesName
      }

      this.props.fetchObservations(newparams);
      this.setState({
              params:{
                max:10,
                classification:265799,
                offset:0,
                taxon:params.taxon,
                sGroup:params.sGroup,
                userGroupList:params.userGroupList,
                speciesName:e.detail.SpeciesName
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
          let MediaFilter=params.MediaFilter;
          sGroupParams= sGroupParams.join(",");
          let taxonparams=params.taxon;
          taxonparams=taxonparams.join(",");
          let userGroup=params.userGroupList;
          userGroup=userGroup.join(",");

        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup:sGroupParams,
            taxon:taxonparams,
            userGroupList:userGroup,
            isFlagged:isFlagged,
            speciesName:speciesName,
            MediaFilter:MediaFilter
        }

        this.props.fetchObservations(newparams);
          this.setState({
            params:{
                  max:10,
                  offset:0,
                  classification:265799,
                  sGroup:params.sGroup,
                  taxon:params.taxon,
                  userGroupList:params.userGroupList,
                  isFlagged:isFlagged,
                  speciesName:speciesName,
                  MediaFilter:MediaFilter
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
        let MediaFilter=params.MediaFilter;

        let taxon=params.taxon;

        taxon=taxon.join(",");
        let sGroupName=params.sGroup;
        sGroupName=sGroupName.join(",");
        let userGroupNew=params.userGroupList;
        userGroupNew=userGroupNew.join(",");
        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup:sGroupName,
            taxon,
            userGroupList:userGroupNew,
            isFlagged:isFlagged,
            speciesName:speciesName,
            MediaFilter:MediaFilter
        }
        this.props.ClearObservationPage();
        this.props.fetchObservations(newparams)

        this.setState({
          params:{
            max:10,
            offset:0,
            classification:265799,
            sGroup:params.sGroup,
            taxon:params.taxon,
            userGroupList:params.userGroupList,
            isFlagged:isFlagged,
            speciesName:speciesName,
            MediaFilter:MediaFilter
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
        let MediaFilter=params.MediaFilter;

        userGroupid=userGroupid.join(",");
        let taxon=params.taxon;
        taxon=taxon.join(",");
        let sGroup=params.sGroup;
        sGroup=sGroup.join(",");

        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup,
            taxon,
            userGroupList:userGroupid,
            isFlagged:isFlagged,
            speciesName:speciesName,
            MediaFilter:MediaFilter
        }
        this.props.ClearObservationPage();

        this.props.fetchObservations(newparams);
        this.setState({
            params:{
              max:10,
              offset:0,
              classification:265799,
              sGroup:params.sGroup,
              taxon:params.taxon,
              userGroupList:params.userGroupList,
              isFlagged:isFlagged,
              speciesName:speciesName,
              MediaFilter:MediaFilter
            },
            userGroupName:userGroupName
        })
      }


      showtaxonButton(item,index){
      return  <button className="btn btn-default btn-xs " key={index}  onClick={this.removeTaxon.bind(this,item.taxon,item)} ><EllipsisText text={item.title} length={10} /> <span className="glyphicon glyphicon-remove"></span>    <span>&nbsp;&nbsp;</span></button>
      }
      showGroupNameButton(item,index){
        return <button  className="btn btn-danger btn-xs" onClick={this.removesGroup.bind(this,item.sGroup,item)} key={index} ><EllipsisText text={item.groupName} length={10} /> <span className="glyphicon glyphicon-remove"></span></button>
      }
      showUserGroupNameButton(item,index){
        return <button className="btn btn-warning btn-xs " onClick={this.removeUserGroup.bind(this,item.userGroup,item)} key={index} ><EllipsisText text={item.userGroupName} length={10} /> <span className="glyphicon glyphicon-remove"></span></button>
      }
      componentDidMount(){
        document.addEventListener("all-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("getTaxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.userGroupFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));
      }
      componentWillUnMount(){
        document.addEventListener("all-filter", this.allFilterEventListner.bind(this));
        document.addEventListener("get-taxon-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("userGroup-filter", this.taxonFilterEventListner.bind(this));
        document.addEventListener("sGroup-filter", this.sGroupFilterEventListner.bind(this));

      }
      displayData(objs,index){
        return(
          <div key={objs.id}>
            <ObservationListComponent objs={objs} index={index}/>
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
              let newparams={
                max:10,
                offset:offset,
                sGroup:newsGroup,
                taxon:newtaxon,
                classification:265799,
                userGroupList:newUserGroup
              }

          this.props.fetchObservations(newparams);
          this.setState({
            params:{
              max:10,
              offset:count,
              sGroup:params.sGroup,
              taxon:params.taxon,
              classification:265799,
              userGroupList:params.userGroupList
            }
          })

        }
        componentWillReceiveProps(nextProps){
          if(this.props!=nextProps.location.search){
          const params=queryString.parse(nextProps.location.search)
            if(queryString.parse(this.props.location.search)!=queryString.parse(nextProps.location.search)){
                  console.log("this.props.location.search)",this.props.location.search
                ,"queryString.parse(nextProps.location.search)",nextProps.location.search)
            }
          }
        }

  render(){
    return(
       <div>
          <div className="pull-right">
            <Right_stats />
          </div>
          {this.props.Observation.count?<button className="btn btn-success btn-xs text-primary">{this.props.Observation.count}</button>:(this.props.Observation.count===0)?"No result found":null}
          <span>&nbsp;&nbsp;</span>
         {this.state.title.length?this.state.title.map(this.showtaxonButton.bind(this)):null}
         <span>&nbsp;&nbsp;</span>
         {this.state.groupName?this.state.groupName.map(this.showGroupNameButton.bind(this)):null}
         <span>&nbsp;&nbsp;</span>
         {this.state.userGroupName?this.state.userGroupName.map(this.showUserGroupNameButton.bind(this)):null}
         <hr />
         {this.props.Observation.all?this.props.Observation.all.map(this.displayData):null}
         {this.props.Observation.all.length ?(this.props.Observation.count)>(this.state.params.offset*10+10)?<button onClick={this.loadMore} type="submit" className="btn btn-primary">LoadMore</button>:null:null }
            </div>
    )
  }
}
function mapStateToProps(state){
  console.log("inside observation",state.Observation)
return {
  Observation:state.Observation
};
}
export default  withRouter(connect(mapStateToProps, {fetchObservations,ClearObservationPage})(GetObservations));
