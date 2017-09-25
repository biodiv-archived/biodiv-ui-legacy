import React,{Component} from 'react';
import Parser from 'html-react-parser';

class ObservationGridView extends Component{
display(objs,index){

let title=Parser(objs.title);
  return (
    <li key= {index}>
                 <div >

                <div style={{height:'280px',width:'200px'}} className="card ">
                    <img className="card-img-top" style={{height:'200px',width:'200px'}} src={objs.thumbnail} />
                    <div className="card-block">
                        <figure className="profile"  style={{height:'40px',width:'40px'}}>
                            <img src={objs.author.icon} className="profile-avatar" alt="" />
                        </figure>
                        <p className="card-title"> {title}</p>
                    </div>
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
