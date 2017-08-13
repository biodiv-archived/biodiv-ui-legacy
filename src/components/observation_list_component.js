import React, {Component} from 'react';

import ShowGallery from './imageGallery/image_display';
import objstyle from './objstyle.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import EllipsisText  from 'react-ellipsis-text';
import Parser from 'html-react-parser';
import ReactHtmlParser from 'react-html-parser';

class ObservationListComponent extends Component{

  render(){
   return(
   <div>
    {this.props.view?
      <ListComponent objsa={this.props.objs} />
            :
      <GridComponent objsa={this.props.objs} />}
   </div>
   ) 
  }

}





class ListComponent extends Component{



display(objs,index){
  const imageArray=[];
objs.resource.map((images)=>{
  imageArray.push(images.url);
})
  return (
    <div key= {index} className="container-fluid">

          <div className="row" style={{border:'1px solid #acb3bf'}}>
                <div className="media">
                  <div className="col-xs-12 col-sm-3">
                    <div className="media-left">
                        <ShowGallery thumbnail={objs.thumbnail} objs={objs} pos={index} objid={objs.id} imageArray={imageArray} noofimages={imageArray.length} />
                    </div>
                  </div>
                  <div className=" col-xs-12 col-sm-9">
                    <div className="media-body">
                      <table className="table table-hover-success pull-right">
                           <tbody>
                            <tr>
                                <td className="col-sm-4"> <span className="glyphicon glyphicon-share-alt" aria-hidden="true">Name</span></td>
                                <td className="col-sm-6" dangerouslySetInnerHTML={{__html:objs.title}}></td>
                            </tr>
                            <tr>
                              <td className="col-sm-4"> <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Place </td>
                              <td className="col-sm-8"> <EllipsisText text={objs.placeName} length={30} /> </td>
                            </tr>
                            <tr>
                              <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Observed On </td>
                              <td className="col-sm-8">{objs.fromDate }</td>
                           </tr>
                           <tr>
                             <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> CreatedOn </td>
                             <td className="col-sm-8">{objs.toDate }</td>
                          </tr>
                          <tr>
                            <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Updated On </td>
                            <td className="col-sm-8">{objs.createdOn }</td>
                         </tr>

                         <tr>
                           <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Notes </td>
                           <td className="col-sm-8" dangerouslySetInnerHTML={{__html:objs.notes ? <EllipsisText text={objs.notes} length={13} />:"Not Provided"}}></td>
                        </tr>
                      </tbody>
                      </table>
                      <table className="table table-hover-success ">
                        <tbody>
                          <tr>
                            <td>
                              <img src={objs.author.icon} style={{height:'30px',width:'30px',padding:'2px'}} title={objs.author.name} />
                            </td>
                            <td>
                             <span className="glyphicon glyphicon-check" aria-hidden="true" title={"species call"}></span> <span> {"   "}</span> {objs.recoVotes.length}
                            </td>
                            <td>
                              <div className="pull-right">
                               <strong>{objs.group.name}</strong>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>


                      </div>

                 </div>
              </div>
              {objs.userGroups.map((item,index)=>{
              return  (
                  <div key={index} className="chip">

                    <img src={"http://indiabiodiversity.org/biodiv/userGroups"+item.icon} title={item.name}/>
                    <EllipsisText text={item.name} length={13} />

                  </div>
              )
          })}

            </div>
          <br />


        </div>

  )

}

render(){

return(
<div>
    {this.props.objsa.map(this.display.bind(this))}

</div>
      
)
}

}


class GridComponent extends Component{



display(objs,index){

let title=ReactHtmlParser(objs.title);
  return (
    <li key= {index}>
                 <div >
                      
                <div style={{height:'280px',width:'200px'}} className="card ">
                    <img className="card-img-top" src={objs.thumbnail} />
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
export default ObservationListComponent;
