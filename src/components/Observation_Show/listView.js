import React,{Component} from 'react';
import ShowGallery from '../imageGallery/image_display';
import objstyle from './objstyle.css';
import EllipsisText  from 'react-ellipsis-text';
import Parser from 'html-react-parser';
import Moment from 'react-moment';
import {getEditUserGroup} from '../../Utils/Observations_API/index';
import Tabs from './tabs';
import {getAllUserGroup} from '../../Utils/Observations_API/index';
import {ROOT_URL} from '../../actions';
class ListComponent extends Component{

constructor(){
  super();
}




changeStyle(id){

  let sid1=id+"1";
  let sid2=id+"2"
this.refs[sid1].style.display='none';
this.refs[sid2].style.display='block';
}
changeStyle2(id){

  let sid1=id+"1";
  let sid2=id+"2"
this.refs[sid1].style.display='block';
this.refs[sid2].style.display='none';
}
textBackground(position){
  if(position=="working"){

    let x={
       "backgroundColor":"red"
    }
    return x;

  }
}
display(objs,index){
  const imageArray=[];
objs.resource.map((images)=>{
  imageArray.push(images.url);
})


  return (
    <div key= {index} className="container-fluid">

          <div className="row" style={{border:'1px solid #acb3bf',borderRadius: '25px'}}>
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
                                <td className="col-sm-4" dangerouslySetInnerHTML={{__html:objs.title}}></td>
                                <td  className={` col-sm-2 ${objs.recoVotes.length?objs.recoVotes[0].recommendation.taxonomyDefinition?objs.recoVotes[0].recommendation.taxonomyDefinition.position==="Working"?"showWorking":
                                   objs.recoVotes[0].recommendation.taxonomyDefinition.position==="Clean"?"showClean":
                                   objs.recoVotes[0].recommendation.taxonomyDefinition.position==="Raw"?"showRaw":null:null:null}`} >
                                  {objs.recoVotes.length?objs.recoVotes[0].recommendation.taxonomyDefinition?objs.recoVotes[0].recommendation.taxonomyDefinition.nameStatus:null:null}
                                </td>

                            </tr>
                            <tr>
                              <td className="col-sm-4"> <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Place </td>
                              <td className="col-sm-8"> <EllipsisText text={objs.placeName} length={30} /> </td>
                            </tr>
                          <tr>
                            <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Observed On </td>
                            <td className="col-sm-8"><Moment format=" Do MMMM YYYY">{objs.fromDate }</Moment></td>
                         </tr>

                         <tr>
                           <td className="col-sm-4"> <span className="glyphicon glyphicon-time" aria-hidden="true"></span> Notes </td>
                           <td className="col-sm-8" ><EllipsisText text={objs.notes?objs.notes:"Not Provided"} length={50} /> </td>
                        </tr>
                      </tbody>
                      </table>
                      <table className="table table-hover-success ">
                        <tbody>
                          <tr>
                            <td className="col-sm-4" >
                              <img className="img-circle" src={objs.author.icon} style={{height:'40px',width:'40px',padding:'2px'}} title={objs.author.name} />
                            </td>
                            <td className="col-sm-1">
                             <span className="glyphicon glyphicon-check" aria-hidden="true" title={`species call: ${objs.recoVotes.length}`}></span>
                            </td>
                            <td className="col-sm-1"> <span  title={`Submitted On: ${objs.createdOn}` }  className="glyphicon glyphicon-time" aria-hidden="true"></span>  </td>
                            <td className="col-sm-1"> <span title={`Updated On: ${objs.lastRevised}` } className="glyphicon glyphicon-hourglass" aria-hidden="true"></span> </td>
                            <td >

                              <table className="table">
                                <tbody>
                                  <tr className="pull-right" >
                                    <td >
                                      <div style={{display:"block"}} ref={objs.id+"1"} >
                                        <strong>{objs.group.name}</strong> <span>{'\u00A0'}</span>
                                        <button onClick={this.changeStyle.bind(this,objs.id)} className="btn btn-danger btn-xs">Edit</button>
                                      </div>
                                    </td>
                                    <td>
                                      <div  style={{display:"none"}} ref={objs.id+"2"}>
                                        <div  className="form-group form-inline"  >

                                          <select defaultValue={objs.group.name} className="bg-primary form-control-sm" >

                                                <option  value="All">All</option>
                                                <option value="Mammals">Mammals</option>
                                                <option value="Birds">Birds</option>
                                                <option  value="Fish">Fish</option>
                                                <option value="Amphibians">Amphibians</option>
                                                <option value="Reptiles">Reptiles</option>
                                                <option  value="Molluscs">Molluscs</option>
                                                <option  value="Arthropods">Arthropods</option>
                                                <option  value="Plants">Plants</option>
                                                <option value="Fungi">Fungi</option>
                                                <option  value="Others">Others</option>

                                            </select>
                                            <button className={"btn btn-warning btn-xs"} onClick={this.changeStyle2.bind(this,objs.id)}>Cancel</button>
                                            <button className={"btn btn-success btn-xs"} onClick={this.changeStyle.bind(this,objs.id)}>Save</button>
                                        </div>
                                    </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
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
                    <img src={`${ROOT_URL}/biodiv/userGroups/${item.icon}`}title={item.name}/>
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
export default ListComponent
