import React,{Component} from 'react';
import UserAvatar from '../util/userIcon';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class ObservationGridView extends Component{

getUrl(thumbnail){
  var res = thumbnail.split(".");
  return `http://indiabiodiversity.org/biodiv/observations/`+res[0]+"_th1.jpg";
}

display(objs,index){



  return (
    <li key= {index}>
                <div style={{height:'280px',width:'200px'}} className="card ">
                    <img className="card-img-top" style={{height:'220px',width:'200px'}} src={this.getUrl(objs.thumbnail)} />
                    <div className="card-block">
                        <figure className="profile"  style={{height:'40px',width:'40px'}}>
                          <NavLink to={`/${this.props.PublicUrl}user/show/${objs.authorid}`}> <UserAvatar title={objs.authorname} src={objs.authorprofilepic} name={objs.authorname} size="40"  ></UserAvatar>
                        </NavLink>
                        </figure>
                        <i className="card-title"> {objs.name?objs.name:"Unknown"} {objs.name?null: <NavLink to={`/observation/show/${objs.id}`}>Help Identify</NavLink>}</i>
                    </div>
                </div>
        </li>
  )

}

render(){

return(
<ul className="list-inline responsive">
    {this.props.objsa.map(this.display.bind(this))}
</ul>

)
}

}

function mapStateToProps(state,ownProps) {
  return {
    PublicUrl:state.PublicUrl.url,

  };
}
export default withRouter(connect(mapStateToProps,null)(ObservationGridView ));
