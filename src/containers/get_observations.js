import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';
import ObservationListComponent from '../components/observation_list_component';

import {ClearObservationPage} from '../actions/index';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Right_stats from '../components/right_material';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();

class GetObservations extends Component{
    constructor(props,match){
      super(props);
      this.state={
        params:{
          max:10,
          offset:0,
          taxon:[],
          sGroup:[],
          classification:null,
          userGroup:[]
        },
        title:[],
        groupName:[],
        userGroupName:[],
        view:1
      }
      this.props.fetchObservations(this.state.params);
      this.loadMore=this.loadMore.bind(this);

          let paramsForUrl=this.state.params;
          let strParams = Object.keys(paramsForUrl).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(paramsForUrl[key]);
    }).join('&');

          history.push({
            pathname:'/observations/list',
             search:strParams
          })
          history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            console.log(`The last navigation action was ${action}`)
          })
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

          {/* */}
          let paramsForUrl=params;
          let strParams = Object.keys(paramsForUrl).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(paramsForUrl[key]);
      }).join('&');

          history.push({
            pathname:'/observations/list',
             search:strParams
          })


          this.setState({
              params:{
                taxon:params.taxon,
                classification:265799,
                offset:0,
                sGroup:sGroup,
                userGroup:params.userGroup
              },
                title:title
          })
          params.taxon=params.taxon.join(",");
          params.sGroup=params.sGroup.join(",");
          params.userGroup=params.userGroup.join(",");
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

        let taxonparams=params.taxon;
        taxonparams= taxonparams.join(",");
        let sGroupParams=params.sGroup;
            sGroupParams=sGroupParams.join(",");
        let userGroupParams=params.userGroup;
         userGroupParams=userGroupParams.join(",");
        let newparams={
                  max:10,
                  sGroup:sGroupParams,
                  classification:265799,
                  offset:0,
                  taxon:taxonparams,
                  userGroup:userGroupParams
                }

        this.props.fetchObservations(newparams);
        this.setState({
                params:{
                  max:10,
                  sGroup:params.sGroup,
                  classification:265799,
                  offset:0,
                  taxon:params.taxon,
                  userGroup:params.userGroup
                },
              groupName:groupName
        })
      }

    userGroupFilterEventListner(e){
      let params=this.state.params;
      let userGroupName=this.state.userGroupName;
      if(!params.userGroup){
        params.userGroup=[];
      }
        params.userGroup.push(e.detail.id)
        console.log(params.userGroup,"params.userGroup")
        const title=this.state.title;
        var titleobject={};
        titleobject.userGroup=e.detail.id;
        titleobject.userGroupName=e.detail.userGroupName;
        userGroupName.push(titleobject);

        params.offset=0;
        let taxon=params.taxon;
        taxon=taxon.join(",");
        let sGroup=params.sGroup;
        sGroup=sGroup.join(",");
        let userGroup=params.userGroup;
        userGroup=userGroup.join(",");

      let newparams={
        max:10,
        offset:0,
        classification:265799,
        sGroup:sGroup,
        taxon:taxon,
        userGroup:userGroup
      }

      this.props.fetchObservations(newparams);
      this.setState({
      params:{
        max:10,
        offset:0,
        classification:265799,
        sGroup:params.sGroup,
        taxon:params.taxon,
        userGroup:params.userGroup
      },
      userGroupName:userGroupName
      })
    }


    allFilterEventListner(e){
      this.props.ClearObservationPage();
      const params=this.state.params;
      params.SpeciesName=e.detail.SpeciesName;
      this.props.fetchObservations(params);
      this.setState({
              params:{
                max:10,
                classification:265799,
                offset:0,
                SpeciesName:e.detail.SpeciesName
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
          sGroupParams= sGroupParams.join(",");
          let taxonparams=params.taxon;
          taxonparams=taxonparams.join(",");
          let userGroup=params.userGroup;
          userGroup=userGroup.join(",");

        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup:sGroupParams,
            taxon:taxonparams,
            userGroup:userGroup
        }

        this.props.fetchObservations(newparams);
          this.setState({
            params:{
                  max:10,
                  offset:0,
                  classification:265799,
                  sGroup:params.sGroup,
                  taxon:params.taxon,
                  userGroup:params.userGroup
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


        let taxon=params.taxon;
        taxon=taxon.join(",");
        let sGroupName=params.sGroup;
        sGroupName=sGroupName.join(",");
        let userGroupNew=params.userGroup;
        userGroupNew=userGroupNew.join(",");
        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup:sGroupName,
            taxon,
            userGroup:userGroupNew
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
            userGroup:params.userGroup
          },
          title:this.state.title,
          groupName:groupName
        })

      }


      removeUserGroup(userGroup,item){
        this.props.ClearObservationPage();
        const params=this.state.params;
        const index1=params.userGroup.indexOf(userGroup);
        params.userGroup.splice(index1, 1);

        const userGroupName=this.state.userGroupName;
        const indexoftitile=userGroupName.indexOf(item);
        userGroupName.splice(indexoftitile,1);

        let userGroupid=params.userGroup;
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
            userGroup:userGroupid
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
              userGroup:params.userGroup
            },
            userGroupName:userGroupName
        })
      }


      showtaxonButton(item,index){
      return  <button className="btn btn-default btn-xs " key={index}  onClick={this.removeTaxon.bind(this,item.taxon,item)} >{item.title} <span className="glyphicon glyphicon-remove"></span>    <span>&nbsp;&nbsp;</span></button>
      }
      showGroupNameButton(item,index){
        return <button  className="btn btn-danger btn-xs" onClick={this.removesGroup.bind(this,item.sGroup,item)} key={index} >{item.groupName} <span className="glyphicon glyphicon-remove"></span></button>
      }
      showUserGroupNameButton(item,index){
        return <button className="btn btn-warning btn-xs " onClick={this.removeUserGroup.bind(this,item.userGroup,item)} key={index} >{item.userGroupName} <span className="glyphicon glyphicon-remove"></span></button>
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
      displayData(view,objs){
          return(
          <div key={objs.id}>
            <ObservationListComponent objs={objs} view={view}/>
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
          let newUserGroup=params.userGroup;
            newUserGroup=newUserGroup.join(",");
              let newparams={
                max:10,
                offset:offset,
                sGroup:newsGroup,
                taxon:newtaxon,
                classification:265799,
                userGroup:newUserGroup
              }

          this.props.fetchObservations(newparams);
          this.setState({
            params:{
              max:10,
              offset:count,
              sGroup:params.sGroup,
              taxon:params.taxon,
              classification:265799,
              userGroup:params.userGroup
            }
          })

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
  render(){
    return(
      <div>
            <div className="pull-right">
              <Right_stats />
            </div>

            
            {this.props.Observation.count?<button className="btn btn-success btn-xs text-primary">{this.props.Observation.count}</button>:(this.props.Observation.count===0)?"No result found":null}

            {this.state.title.length?this.state.title.map(this.showtaxonButton.bind(this)):null}
            {this.state.groupName?this.state.groupName.map(this.showGroupNameButton.bind(this)):null}
            {this.state.userGroupName?this.state.userGroupName.map(this.showUserGroupNameButton.bind(this)):null}
            <br />
            <br />
            <div className="btn-group">
            <button className="btn btn-default" onClick={this.showListView.bind(this,1)} ><span className="glyphicon glyphicon-th-list"> </span>List</button>
            <button className="btn btn-default" onClick={this.showGridView.bind(this,0)} > <span className="glyphicon glyphicon-th"> </span> Grid</button>
            </div>
            <br />
            <br />

            {this.props.Observation.all?this.displayData(this.state.view,this.props.Observation.all):null}
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
export default connect(mapStateToProps, {fetchObservations,ClearObservationPage})(GetObservations);
