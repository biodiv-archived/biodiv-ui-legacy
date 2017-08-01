import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';
import ObservationListComponent from '../components/observation_list_component';
import {ClearObservationPage} from '../actions/index';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Right_stats from '../components/right_material'
class GetObservations extends Component{
    constructor(props){
      super(props);
      this.state={
        params:{
          max:12,
          offset:0,
          taxon:null,
          sGroup:null,
          classification:null,
          userGroup:null
        },
        title:null,
        groupName:null,
        userGroupName:null
      }
      {/* Listening to event in ../taxon_browser/main.js*/}
      document.addEventListener('name-of-event', (e)=>{
        const params=this.state.params;
          params.taxon=e.detail.taxonid;
          params.classification=265799;
          let sGroup=params.sGroup;
          console.log("  params.taxon",  params)
            this.props.fetchObservations(params);
          this.setState({
              params:{
                taxon:e.detail.taxonid,
                classification:265799,
                offset:0,
                sGroup:sGroup
              },
                title:e.detail.title
          })
        });
        document.addEventListener('group-observation', (e)=>{
                  var params={};
                  params.userGroup=e.detail.id;
                  params.offset=0,
              this.props.fetchObservations(params);
              this.setState({
                params:params,
                userGroupName:e.detail.userGroupName
              })

          });
          {/*Listening to event in ../FilterPanel/filter.js  */}
        document.addEventListener('group-event', (e)=>{
          const params=this.state.params;
          params.sGroup=e.detail.sGroup;
          let taxon=params.taxon;
          this.props.fetchObservations(params);
          this.setState({
                  params:{
                    max:10,
                    sGroup:e.detail.sGroup,
                    classification:265799,
                    offset:0,
                    taxon:taxon
                  },
                groupName:e.detail.groupName
          })
          });
      this.props.fetchObservations(this.state.params);
      this.loadMore=this.loadMore.bind(this);
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
        params.offset=count*12;
        console.log("params inside loadmore",params)
        this.props.fetchObservations(params)
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
      removeTaxon(){
        const params=this.state.params;
        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup:params.sGroup,
            taxon:undefined
        }
        this.setState({
          params:newparams,
          title:null
        })

        this.props.ClearObservationPage();
        console.log(this.state.params,newparams);
      this.props.fetchObservations(newparams)

      }


      removeGroup(){
        const params=this.state.params;
        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup:undefined,
            taxon:params.taxon
        }
        this.setState({
          params:newparams,
          groupName:null
        })

        this.props.ClearObservationPage();
        console.log(this.state.params,newparams);
      this.props.fetchObservations(newparams)

      }


      removeUserGroup(){
        this.props.ClearObservationPage();
        const params=this.state.params;
        const newparams={
            max:10,
            offset:0,
            classification:265799,
            sGroup:params.sGroup,
            taxon:params.taxon
        }
        this.props.fetchObservations(newparams);
        this.setState({
            params:newparams,
            userGroupName:null
        })
      }

  render(){


    return(
       <div>
          <div className="pull-right">
            <Right_stats />
          </div>
         {this.state.title?<Button raised color="accent" style={{ fontSize: '13px' }} onClick={this.removeTaxon.bind(this)} >{this.state.title} <span className="glyphicon glyphicon-remove"></span></Button>:null}
         <span>&nbsp;&nbsp;</span>
         {this.state.groupName?<Button  raised color="accent" onClick={this.removeGroup.bind(this)} >{this.state.groupName} <span className="glyphicon glyphicon-remove"></span></Button>:null}
         {this.state.userGroupName?<Button  raised color="accent" onClick={this.removeUserGroup.bind(this)} >{this.state.userGroupName} <span className="glyphicon glyphicon-remove"></span></Button>:null}

         <hr />
              {this.props.Observation.map(this.displayData)}

              {this.props.Observation.length ?<button onClick={this.loadMore} type="submit" className="btn btn-secondry">LoadMore</button>:null }
       </div>
    )
  }


}
function mapStateToProps(state){
return {
  Observation:state.Observation
};
}
export default connect(mapStateToProps, {fetchObservations,ClearObservationPage})(GetObservations);
