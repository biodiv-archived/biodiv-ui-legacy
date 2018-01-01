import React,{Component} from 'react';

class Banner extends Component{

  constructor(){
    super()
  }
  render(){
    return(
      <div style={{marginTop:'0px',marginBottom:'5px',marginLeft:'18px',width:'100%',height:'100px'}} className="jumbotron">
        {this.props.userGroup?
        <div className="col-sm-12">
            <img  height="50" className="pull-left col-sm-2"  src={this.props.userGroup?"http://indiabiodiversity.org/biodiv/userGroups/"+this.props.userGroup.icon:null}></img>
            <h4 className="col-sm-6">{this.props.userGroup.name}</h4>
        </div>:
        <div className="col-sm-12">
          <img  height="50" className="pull-left col-sm-2" src={"http://indiabiodiversity.org/logo/IBP.png"}></img>
          <h4 className="col-sm-6">IndiaBiodiversity Portal</h4>
          <br />
        </div>}


      </div>
    )
  }
}
export default Banner
