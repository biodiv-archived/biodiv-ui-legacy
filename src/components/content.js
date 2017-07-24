import React, {Component} from 'react';
import Right_Content from './content_right';
import Left_Content from './content_left';
import GetObservation from '../containers/get_observations';
class Content extends Component{
   render(){
     return (
       <div>
           <div className="row">

             <div className="col-xs-12 col-sm-3">
               <Right_Content />
             </div>
             <div className=" col-sm-12 col-sm-7 ">
               <GetObservation />
             </div>
             <div className="col-xs-12 col-sm-2">
             <Left_Content />
             </div>

         </div>
    </div>
     )
   }

}
export default Content;
