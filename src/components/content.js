import React, {Component} from 'react';
import Left_Content_Menu from './content_left_menu';
import GetObservation from '../containers/get_observations';
class Content extends Component{
   render(){
     return (
           <div>
             <div className="col-xs-12 col-sm-3">
               <Left_Content_Menu />
             </div>
             <div  style={{backgroundColor:'#EEF9FC'}}  className="col-xs-12 col-sm-9 ">
               <GetObservation />
             </div>
           </div>
     )
   }

}
export default Content;
