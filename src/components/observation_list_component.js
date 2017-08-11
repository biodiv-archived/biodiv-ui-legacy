import React from 'react';

import ShowGallery from './imageGallery/image_display';
import objstyle from './objstyle.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import EllipsisText  from 'react-ellipsis-text';
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
                        <ShowGallery thumbnail={props.objs.thumbnail} objs={props.objs} pos={props.index} objid={props.objs.id} imageArray={imageArray} noofimages={imageArray.length} />
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
                              <td className="col-sm-8"> <EllipsisText text={props.objs.placeName} length={30} /> </td>
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
                           <td className="col-sm-8" dangerouslySetInnerHTML={{__html:props.objs.notes ? <EllipsisText text={props.objs.notes} length={13} />:"Not Provided"}}></td>
                        </tr>
                      </tbody>
                      </table>
                      <table className="table table-hover-success ">
                        <tbody>
                          <tr>
                            <td>
                              <img src={props.objs.author.icon} style={{height:'30px',width:'30px',padding:'2px'}} title={props.objs.author.name} />
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


                      </div>

                 </div>
              </div>
              {props.objs.userGroups.map((item,index)=>{
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
export default ObservationListComponent;
