import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';
import ObservationListComponent from '../components/observation_list_component';
import {ClearObservationPage} from '../actions/index';

class GetObservations extends Component{
    constructor(props){
      super(props);
      this.state={
        params:{
          max:12,
          offset:0,
          taxon:null,
          sGroup:null,
          classification:null
        },
        title:null,
        groupName:null
      }
      {/* */}
      document.addEventListener('name-of-event', (e)=>{
        const params=this.state.params;
          params.taxon=e.detail.taxonid;
          params.classification=265799;
          let sGroup=params.sGroup;
          console.log("  params.taxon",  params);

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
          {/*  */}
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
          <ObservationListComponent  objs={objs} index={index}/>
        
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
            taxon:params.taxon,
            sGroup:params.sGroup,
            classification:265799
          }
        })
          console.log("params in loadMore",params)
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
  render(){
    return(
       <div>
         <div className="text-center">
         {this.state.title?<button onClick={this.removeTaxon.bind(this)} id="singlebutton" name="singlebutton" className="btn btn-xs btn-danger">{this.state.title} <span className="glyphicon glyphicon-remove"></span></button>:null}

         {this.state.groupName?<button onClick={this.removeGroup.bind(this)} id="singlebutton" name="singlebutton" className="btn btn-xs btn-danger">{this.state.groupName} <span className="glyphicon glyphicon-remove"></span></button>:null}

         </div>
         <hr />
          <br />
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
