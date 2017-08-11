import React,{Component} from 'react';

class HomeMainContent extends Component{

  render(){

    return(
      <div className="container">
<div className="row">
  <div className="col-sm-1">

  </div>
  <div className="col-sm-2">
    <div className="thumbnail">
      <img src="http://indiabiodiversity.org/biodiv/observations//11d3a9bf-e204-46ad-8266-470ec0aa3c8c/363_gall.jpg"  style={{height:'200px',width:'200px'}} />
      <div  style={{backgroundColor:'#89A1A9'}} className="caption">
        <h3>Species</h3>
        <h1> <strong>{this.props.data.speciesCount}</strong></h1>
      </div>
    </div>
  </div>
  <div className="col-sm-2">
    <Link to="/observations">
    <div className="thumbnail">
      <img src="http://indiabiodiversity.org/biodiv/observations//93c65065-0bac-44e6-a035-b16bff154556/587_gall.jpg" style={{height:'200px',width:'200px'}} />
      <div  style={{backgroundColor:'#5ae84a'}} className="caption">
        <h3>Observations</h3>
        <h1> <strong>{this.props.data.observationCount}</strong></h1>
      </div>
    </div>
    </Link>
  </div>
  <div className="col-sm-2">
    <div className="thumbnail">
      <img src="https://goo.gl/JHtg96" style={{height:'200px',width:'200px'}}  />
      <div  style={{backgroundColor:'#1b68a3'}} className="caption">
        <h3>Documents</h3>
        <h1> <strong>{this.props.data.documentCount}</strong></h1>
      </div>
    </div>
  </div>
  <div className="col-sm-2">
    <div className="thumbnail">
      <img src="https://www.zsl.org/sites/default/files/media/2014-10/SG9A8359.jpg" style={{height:'200px',width:'200px'}}  />
      <div  style={{backgroundColor:'#e51bd8'}} className="caption">
        <h3>Checklists</h3>
        <h1> <strong>{this.props.data.checklistsCount}</strong></h1>
      </div>
    </div>
  </div>
  <div className="col-sm-2">
    <div className="thumbnail">
      <img src="http://images.clipartpanda.com/user-clipart-kTKRngjTj.png" style={{height:'200px',width:'200px'}}  />
      <div  style={{backgroundColor:'#ad251b'}} className="caption">
        <h3>Users</h3>
        <h1> <strong>{this.props.data.userCount}</strong></h1>
      </div>
    </div>
  </div>
</div>
</div>
    )
  }
}
export default HomeMainContent
