import React from 'react';
import mystyle from './style/footerstyle.css';
import {connect} from 'react-redux';
import { Config } from '../../Config';
import axios from 'axios';
import _ from "lodash";


import UserGroupName from '../../util/UserGroup';

 class Footer extends React.Component {

   constructor(props){
      super(props);
      this.state={
        parents:null,
        children:null
      }
      this.children = new Map();
      this.parents = [];
   }

   componentDidMount(){
     //console.log("public url",this.props.publicUrl)
     if(this.props.publicUrl.groupName != ""){
       let groupName=this.props.publicUrl.url.split("/")[1];
       UserGroupName.list().then(data=>{

         let group=data.find((item)=>{
             return item.webaddress==groupName
         })
         this.getNewsLetters(group.id);
       })
     }else{
       this.getNewsLetters(null);
     }
   }

   getNewsLetters(ugId){
     var options;
     if(ugId == null){
       options={
         method: 'GET',
         url :   Config.api.API_ROOT_URL+"/newsletters/pages",
         params:{
           showInFooter:true
         },
         //headers : AuthUtils.getAuthHeaders(),
         json: 'true'
       }
     }else{
       options={
         method: 'GET',
         url :   Config.api.API_ROOT_URL+"/newsletters/pages",
         params:{
           userGroupId:ugId,
           showInFooter:true
         },
         //headers : AuthUtils.getAuthHeaders(),
         json: 'true'
       }
     }

     axios(options)
       .then((response)=>{
         //console.log("#######################################",response)
           if(response.status == 200){
            // console.log("response",response.data)
             var grouped = _.orderBy((_.groupBy(response.data, 'parentId')),['displayOrder'],['desc'])
            // console.log("grouped response",grouped)

             for(var i=0;i<response.data.length;i++){
               if(response.data[i].parentId == 0){
                  this.parents.push(response.data[i])
               }else{
                 if(this.children.get(response.data[i].parentId) == null){
                   this.children.set(response.data[i].parentId,[response.data[i]])
                 }else{
                   var array=this.children.get(response.data[i].parentId);
                   array.push(response.data[i])
                   this.children.set(response.data[i].paraentId,array);
                 }
               }
             }


             this.setState({
               parents:this.parents,
               children:this.children
             })
           }
       })
   }

   render(){
    let groupName=this.props.groupName;
    console.log(groupName);
     return (
         <footer>
           <div className="row">
             <div className={`col-sm-2 ${(groupName)?'col-sm-offset-2':null}` }>

             </div>
               {
                 this.state.parents != null?
                 (
                   this.state.parents.map((item1,index1)=>{
                     return(
                       <div key={index1} className="col-xs-6 col-sm-2">
                         <span><a href={"http://indiabiodiversity.org/page/"+item1.id}><b>{item1.title.toUpperCase()}</b></a></span>
                         <ul className="list list-unstyled">
                         {
                           (this.state.children.get(item1.id) != null)?
                            (
                             this.state.children.get(item1.id).map((item2,index2)=>{
                               return(
                                  <li key={index2} className="list-item"><a href={"http://indiabiodiversity.org/page/"+item2.id}>{item2.title}</a></li>
                               )
                             })
                           ):null

                         }
                         </ul>
                       </div>
                     )
                   })
                 ):null
               }
                <div className={this.state.parents == null?'col-xs-6 col-sm-2 footer-item col-md-offset-2':'col-xs-6 col-sm-2 footer-item'}>
                    <span><a href={"http://indiabiodiversity.org/page/4250187"}>POLICY</a></span>
                         <ul className="list list-unstyled">
                           <li className="list-item"><a href={"http://indiabiodiversity.org/page/4250189"}>Data Sharing</a></li>
                           <li className="list-item"><a href={"http://indiabiodiversity.org/page/4250212"}>Licenses</a></li>
                           <li className="list-item"><a href={"http://indiabiodiversity.org/page/4250246"}>Terms & Conditions</a></li>
                         </ul>
                 </div>
                <div  className="col-xs-6 col-sm-2 footer-item">
                         <span>OTHERS</span>
                         <ul className="list list-unstyled">
                           <li className="list-item"><a href={"http://blog.indiabiodiversity.org/"}>Blog</a></li>
                           <li className="list-item"><a href={"http://indiabiodiversity.org/sitemap"}>Sitemap</a></li>
                           <li className="list-item"><a href={"http://indiabiodiversity.org/biodiv/docs"}>API Docs</a></li>
                           <li className="list-item"><a href={"http://indiabiodiversity.org/feedback_form"}>Feedback</a></li>
                           <li className="list-item"><a href={"http://indiabiodiversity.org/contact"}>Contact Us</a></li>
                         </ul>
                 </div>
                 <div className="col-sm-2">

                 </div>
           </div>
           <br />
         <div className="row">
                   <div className="text-center">

                     <a href="http://facebook.com" className="btn btn-social-icon btn-facebook"><i className="fa fa-facebook"></i></a>
                     <a className="btn btn-social-icon btn-twitter"><i className="fa fa-twitter"></i></a>
                     <a className="btn btn-social-icon btn-google-plus"><i className="fa fa-google-plus"></i></a>
                   </div>
         </div>
         <div className="row">
           <div className="col-sm-3"></div>
           <div className="text-center col-sm-6">
           Best supported on Google Chrome, Firefox 3.0+, Internet Explorer 8.0+, Safari 4.0+, Opera 10+.
   Powered by the open source <a href="">Biodiversity Informatics Platform.</a> Technology partner <a href="">Strand Life Sciences </a>
         </div>
           <div className="col-sm-3">

           </div>
         </div>
         </footer>
     )
   }

}
//export default Footer;
function mapStateToProps(state){
return {
  publicUrl:state.PublicUrl,
  groupName:state.PublicUrl.groupName
};
}



 export default connect(mapStateToProps)(Footer);
