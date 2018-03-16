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
     let fullUrl = window.location.host;
     let parts=fullUrl.split(".");

       if(this.props.groupName!= "" && this.props.groupName!=undefined){

           UserGroupName.list().then(data=>{

               let group=data.find((item)=>{
                   return item.webaddress==this.props.groupName
               })
               console.log(group);
               this.getNewsLetters(group.id);
           })
       } else {
         if(parts.length>=3){
           if(parts[0]=="assambiodiversity"){
             this.getNewsLetters(4087136);
           }
           if(parts[0]=="treesindia"){
             this.getNewsLetters(18);
           }
           if(parts[0]=="thewesternghats"){
           this.getNewsLetters(1);
           }
         }
         else{
           this.getNewsLetters(null);

         }
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
                         <span><a href={Config.api.IBP_URL+"/page/"+item1.id}><b>{item1.title.toUpperCase()}</b></a></span>
                         <ul className="list list-unstyled">
                         {
                           (this.state.children.get(item1.id) != null)?
                            (
                             this.state.children.get(item1.id).map((item2,index2)=>{
                               return(
                                  <li key={index2} className="list-item"><a href={Config.api.IBP_URL+"/page/"+item2.id}>{item2.title}</a></li>
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
                    <span><a href={Config.api.IBP_URL+"/page/4250187"}>POLICY</a></span>
                         <ul className="list list-unstyled">
                           <li className="list-item"><a href={Config.api.IBP_URL+"/page/4250189"}>Data Sharing</a></li>
                           <li className="list-item"><a href={Config.api.IBP_URL+"/page/4250212"}>Licenses</a></li>
                           <li className="list-item"><a href={Config.api.IBP_URL+"/page/4250246"}>Terms & Conditions</a></li>
                         </ul>
                 </div>
                <div  className="col-xs-6 col-sm-2 footer-item">
                         <span>OTHERS</span>
                         <ul className="list list-unstyled">
                           <li className="list-item"><a href={"https://blog.indiabiodiversity.org/"}>Blog</a></li>
                           <li className="list-item"><a href={Config.api.IBP_URL+"/sitemap"}>Sitemap</a></li>
                           <li className="list-item"><a href={Config.api.IBP_URL+"/biodiv/docs"}>API Docs</a></li>
                           <li className="list-item"><a href={Config.api.IBP_URL+"/feedback_form"}>Feedback</a></li>
                           <li className="list-item"><a href={Config.api.IBP_URL+"/contact"}>Contact Us</a></li>
                         </ul>
                 </div>
                 <div className="col-sm-2">

                 </div>
           </div>
           <br />
           <div className="row">
                     <div className="text-center">

                       <a title="India Biodiversity Portal Mobile App" href="https://play.google.com/store/apps/details?id=com.mobisys.android.ibp&hl=en">
                       <img src="https://indiabiodiversity.org/assets/all/googleplayicon1-dfb7ffc7e3bfab995218fdf01dbed0ae.png" />
                       </a>
                       <a title="India Biodiversity Portal Mobile App" href="https://itunes.apple.com/in/app/india-biodiversity-portal/id1072650706?mt=8&ign-mpt=uo%3D4" >
                       <img src="https://indiabiodiversity.org/assets/all/apple_store1-03ab4e6fdf9b341c1a3455956f127fca.png"/>
                       </a>
                     </div>
           </div>
         <div className="row">
                   <div className="text-center">

                     <a href="https://facebook.com/indiabiodiversity" className="btn btn-social-icon btn-facebook"><i className="fa fa-facebook"></i></a>
                     <a href="https://twitter.com/indiabiodiversity" className="btn btn-social-icon btn-twitter"><i className="fa fa-twitter"></i></a>
                     <a href="https://plus.google.com/110731547233656611783" className="btn btn-social-icon btn-google-plus"><i className="fa fa-google-plus"></i></a>
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
  publicUrl:state.PublicUrl.url,
  groupName:state.PublicUrl.groupName
};
}



 export default connect(mapStateToProps)(Footer);
