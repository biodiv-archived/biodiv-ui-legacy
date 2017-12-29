import React,{Component} from 'react';

class Banner extends Component{

  constructor(){
    super()
  }
  render(){
    return(
      <div className="jumbotron">
          {this.props.userGroup?this.props.userGroup.name:null}
          <img height="50" src={this.props.userGroup?"http://indiabiodiversity.org/biodiv/userGroups/"+this.props.userGroup.icon:null}></img>
      </div>
    )
  }
}
export default Banner
