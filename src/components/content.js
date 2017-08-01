import React, {Component} from 'react';
import Right_Content from './content_right';
import Left_Content from './right_material';
import GetObservation from '../containers/get_observations';
class Content extends Component{
   render(){
     return (
           <div>
             <div className="col-xs-12 col-sm-3">
                   <Right_Content />
             </div>
             <div  style={{backgroundColor:'#EEF9FC'}}  className="col-xs-12 col-sm-9 ">
               <GetObservation />
             </div>
           </div>
     )
   }

}
export default Content;
