import React from 'react';
import Img from 'react-image';

const ObservationListComponent=(props)=>{

return(
  <div key={props.index} className="container">
          <div className="row">
            <div className="col-sm-8">
                <div className="media">
                  <div className="col-xs-12 col-sm-3">
                    <div className="media-left">
                      <a href="#"><Img src={props.objs.thumbnail} className="media-object img-responsive " /></a>
                    </div>
                  </div>
                  <div className=" col-xs-12 col-sm-9">
                    <div className="media-body">
                      <table className="table table-striped pull-right">
                           <tbody>
                            <tr>
                                <td className="col-sm-3"> <span className="glyphicon glyphicon-share-alt" aria-hidden="true">Name</span></td>
                                <td className="col-sm-9" dangerouslySetInnerHTML={{__html:props.objs.title}}></td>
                            </tr>
                            <tr>
                              <td className="col-sm-3"> <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Place </td>
                              <td className="col-sm-9"> {props.objs.placeName} </td>
                            </tr>
                            <tr>
                              <td className="col-sm-3"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Submitted On </td>
                              <td className="col-sm-9">{props.objs.createdOn }</td>
                           </tr>
                           </tbody>
                     </table>

                         <a href="#"> <Img src={props.objs.author.icon} style={{height:'30px',width:'30px'}} title={props.objs.author.name} /> </a>
                          {/* <div className="pull-right">
                           <Getgroup initialgroup={this.props.props.objs.group.name}/>
                           </div>
                           */}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

)

}
export default ObservationListComponent;
