import React, {Component} from 'react';
import Left_Content_Menu from './content_left_menu';
import GetObservation from '../containers/get_observations';
import  Right_stats from './mobile_right_slider';
class Content extends Component{

constructor(){
  super();
}
  showSidebar(){
  this.setState({
    open:true
  })
  }

   render(){
     return (
           <div>
              
             <div className={`col-sm-3 hidden-xs`}>
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
