import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';
import ObservationListComponent from '../components/observation_list_component';

class GetObservations extends Component{

    constructor(props){
      super(props);
      this.state={
        count:0,
        taxonid:undefined,
        sGroup:0
      }
        let taxonid;

      document.addEventListener('name-of-event', (e)=>{
        console.log("count",this.state.count)
        this.setState({
              count:0,
              sGroup:0,
              taxonid:e.detail.taxonid

        })
        this.props.fetchObservations(this.state.count,e.detail.taxonid);


        });
        document.addEventListener('group-event', (e)=>{
          this.props.fetchObservations(this.state.count,null,e.detail.sGroup);

          this.setState({
                sGroup:e.detail.sGroup
          })
          });

      this.props.fetchObservations(this.state.count);
      this.loadMore=this.loadMore.bind(this);
    }
    displayData(objs,index){
      return(
        <div key={objs.id}>
          <ObservationListComponent  objs={objs} index={index}/>
        </div>
      )
    }
    loadMore(counts){

      let count=this.state.count;
      count=count+1;

      this.setState({
        count:count
      })

    if(this.state.sGroup){
      console.log("this.state.sGroup",this.state.sGroup)
        this.props.fetchObservations(count,null,this.state.sGroup)
    }
    else {
      if(this.state.taxonid==0){
          this.props.fetchObservations(count)
      }
      else{
        this.props.fetchObservations(count,this.state.taxonid)
      }
    }

      }
  render(){
    return(
       <div>
              {this.props.Observation.map(this.displayData)}

              {this.props.Observation.length ?<button onClick={this.loadMore} type="submit" className="btn btn-secondry">LoadMore</button>:null }
       </div>
    )
  }
}
function mapStateToProps(state){
return {
  Observation:state.Observation,

};
}
export default connect(mapStateToProps, {fetchObservations})(GetObservations);
