import React,{Component} from 'react';

class ObservationGridView extends Component{

getUrl(thumbnail){
  var res = thumbnail.split(".");
  return `/biodiv/observations/`+res[0]+"_th1."+res[1];
}

display(objs,index){


let title=objs.name;
  return (
    <li key= {index}>
                <div style={{height:'280px',width:'200px'}} className="card ">
                    <img className="card-img-top" src={this.getUrl(objs.thumbnail)} />
                    <div className="card-block">
                        <figure className="profile"  style={{height:'40px',width:'40px'}}>
                            <img src={objs.authorprofilepic} className="profile-avatar" alt="" />
                        </figure>
                        <i className="card-title"> {title}</i>
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
export default ObservationGridView
