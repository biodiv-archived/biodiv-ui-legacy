import React,{Component} from "react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUniqueSpecies} from '../actions/index';
import {ROOT_URL} from '../Config'

var previousParams=''
var list=[]
var count=0
class UniqueSpecies extends React.Component {
  constructor(props){
    super(props)

    this.count = 0;
    this.fetchUnique=this.fetchUnique.bind(this)
    console.log("called again",this.props.params)
    if(this.props.params!==previousParams)
    {
      count=0;
    this.fetchUnique(this.props.params,count,"newFilter")
    previousParams=this.props.params
    }
  }
  fetchUnique(params,count,flag){
    this.props.fetchUniqueSpecies(params,count,flag);
  }

   increment(){
    count = count + 10;
     this.fetchUnique(this.props.params,count,"loadMore");
   }

  render() {
    console.log("datatTest",this.props.UniqueList)
          return (
            <div className = "table-responsive pre-scrollable" >
              <table className = "table table-hover table-striped table-bordered table-condensed">
              <thead className = "thead-inverse">
                  <tr>
                    <th>{"Unique Species"+"("+(this.props.UniqueList.totalRecoCount?this.props.UniqueList.totalRecoCount:null)+")"}</th>
                  </tr>
              </thead>
              <tbody >
                  {
                    this.props.UniqueList.data?
                    (
                      this.props.UniqueList.data.map((item, key)=> {
                         return (
                                    <tr key = {key}>
                                        {
                                        item.speciesId!==null?
                                        (
                                          <td className="danger"><a href={ROOT_URL+"/species/show/"+item.speciesId}>{item.name}</a></td>
                                        )
                                        :(
                                          <td className="danger"><a>{item.name}</a></td>
                                        )
                                      }
                                         <td className="success"><a href={ROOT_URL+"/observation/list?recom="+item.recoId}>{item.count}</a></td>
                                    </tr>
                                  )
                        })
                    ):null
                 }
              </tbody>
              </table>
              <button onClick = {this.increment.bind(this)}> Load More</button>
           </div>
      )
  }
}
function mapStateToProps(state){
return {UniqueList:state.UniqueSpeciesList};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUniqueSpecies},dispatch);
}

 export default connect(mapStateToProps,mapDispatchToProps)(UniqueSpecies);
