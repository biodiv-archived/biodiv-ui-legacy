import React, {Component} from 'react';
import Left_Content from './content_left';
import Right_Content from './content_right';
import GetObservation from '../containers/get_observations';
import ObservationList from '../containers/observation_list';

class Content extends Component{
   render(){
     return (
       <div>
         <div>
           <div className="row">
             <div className="col-xs-12 col-sm-2 ">
                 <Right_Content />
             </div>
             <div className="col-xs-12 col-sm-8 ">
               <ObservationList />
               <GetObservation />
             </div>
             <div className="col-xs-12 col-sm-2 ">
                <Left_Content />

             </div>
           </div>
         </div>
       </div>
     )
   }

}
export default Content;
