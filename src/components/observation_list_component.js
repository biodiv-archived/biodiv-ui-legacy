import React from 'react';
import Img from 'react-image';
import ShowGallery from './imageGallery/image_display';
import objstyle from './objstyle.css';
const ObservationListComponent=(props)=>{

const imageArray=[];
props.objs.resource.map((images)=>{
  imageArray.push(images.url);
})

return(

      <div className="container-fluid">
          <div className="row" style={{border:'1px solid #acb3bf'}}>
                <div className="media">
                  <div className="col-xs-12 col-sm-3">
                    <div className="media-left">
                        <ShowGallery thumbnail={props.objs.thumbnail} pos={props.index} objid={props.objs.id} imageArray={imageArray} noofimages={imageArray.length} />
                    </div>
                  </div>
                  <div className=" col-xs-12 col-sm-9">
                    <div className="media-body">
                      <table className="table table-hover-success pull-right">
                           <tbody>
                            <tr>
                                <td className="col-sm-4"> <span className="glyphicon glyphicon-share-alt" aria-hidden="true">Name</span></td>
                                <td className="col-sm-6" dangerouslySetInnerHTML={{__html:props.objs.title}}></td>
                            </tr>
                            <tr>
                              <td className="col-sm-4"> <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Place </td>
                              <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} className="col-sm-8"> {props.objs.placeName} </td>
                            </tr>
                            <tr>
                              <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Observed On </td>
                              <td className="col-sm-8">{props.objs.fromDate }</td>
                           </tr>
                           <tr>
                             <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> CreatedOn </td>
                             <td className="col-sm-8">{props.objs.toDate }</td>
                          </tr>
                          <tr>
                            <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Updated On </td>
                            <td className="col-sm-8">{props.objs.createdOn }</td>
                         </tr>

                         <tr>
                           <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Notes </td>
                           <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} className="col-sm-8" dangerouslySetInnerHTML={{__html:props.objs.notes ?props.objs.notes:"Not Provided"}}></td>
                        </tr>
                      </tbody>
                      </table>
                      <table className="table table-hover-success ">
                        <tbody>
                          <tr>
                            <td>
                              <Img src={props.objs.author.icon} style={{height:'30px',width:'30px',padding:'2px'}} title={props.objs.author.name} />
                            </td>
                            <td>
                             <span className="glyphicon glyphicon-check" aria-hidden="true" title={"species call"}></span> <span> {"   "}</span> {props.objs.recoVotes.length}
                            </td>
                            <td>
                              <div className="pull-right">
                               <strong>{props.objs.group.name}</strong>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>



                            <ul className="list list-unstyled list-inline">
                               {props.objs.userGroups.map((item)=>{
                                 return <li key={item.name} className="list-inline-item"><img className="img-circle btn-success" src={`http://indiabiodiversity.org/biodiv/userGroups/${item.icon}`} style={{height:'30px',width:'30px'}} title={item.name}/></li>
                               })}
                             </ul>
                   </div>
                 </div>
              </div>
            </div>
          <br />
        </div>
)

}
export default ObservationListComponent;
