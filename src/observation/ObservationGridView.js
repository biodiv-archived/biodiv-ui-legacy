import React,{Component} from 'react';
import UserAvatar from '../util/userIcon';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import isAbsoluteUrl  from 'is-absolute-url';
import {Config} from '../Config';

class ObservationGridView extends Component{

  getUrl(thumbnail,speciesGroup,videos){


          let group=speciesGroup.toLowerCase();
          let groupIcon=null;
          if(group=="bird"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/birds_th1.png';
          }
          if(group=="fish"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/fish_th1.png';
          }
          if(group=="fungi"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/fungi_th1.png';
          }
          if(group=="mammals"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/mammals_th1.png';
          }
          if(group=="all"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/all_th1.png';
          }
          if(group=="amphibians"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/amphibians_th1.png';
          }
          if(group=="reptiles"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/reptiles_th1.png';
          }
          if(group=="molluscs"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/molluscs_th1.png';
          }
          if(group=="arthropods"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/arthropods_th1.png';
          }
          if(group=="plants"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/plants_th1.png';
          }
          if(group=="others"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/others_th1.png';
          }
          if(group=="birds"){
            groupIcon=Config.api.ROOT_URL+'/biodiv/group_icons/speciesGroups/birds_th1.png';
          }
          let res = thumbnail?thumbnail.split("."):null;

          if(res){
            if(res[1]=="mp3" || res[1]=="wav"){
                return `${Config.api.ROOT_URL}/biodiv/assets/all/audioicon.png`;
              }
              else if(res[0]=="v"){
                let url = videos[0];
                let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if(videoid != null) {
                  let imageUrl="https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
                  return imageUrl
                }
              }
              else{
                return `${Config.api.ROOT_URL}/biodiv/observations/`+res[0]+"_th1.jpg"
              }
            }
          else {
            return groupIcon
          }
  }

getUserPhotoUrl(images){
    if(images){
      if(isAbsoluteUrl(images)){
        return images;
      }
      else{
        let url=`${Config.api.ROOT_URL}/biodiv/users${images}`;
        return url;
      }
    }
    else{
      return null;
    }
}

display(objs,index){
  return (
    <li key= {index}>
                <div style={{height:'280px',width:'200px'}} className="card ">
                    <NavLink to={`/${this.props.PublicUrl}observation/show/${objs.id}`}>
                    <img className="card-img-top" style={{height:'220px',width:'200px'}} src={this.getUrl(objs.thumbnail,objs.speciesgroupname,objs.urlresource)} />
                    </NavLink>
                    <div className="card-block">
                        <figure className="profile"  style={{height:'40px',width:'40px'}}>
                          <NavLink to={`/${this.props.PublicUrl}user/show/${objs.authorid}`}> <UserAvatar title={objs.authorname} src={this.getUserPhotoUrl(objs.authorprofilepic)} name={objs.authorname} size="40"  ></UserAvatar>
                        </NavLink>
                        </figure>
                        <i className="card-title"> {objs.name?objs.name:"Unknown"} {objs.name?null: <NavLink to={`/observation/show/${objs.id}`}>Help Identify</NavLink>}</i>
                    </div>
                </div>
        </li>
  )

}

render(){

return(
<ul className="list-inline responsive">
    {this.props.objsa.map(this.display.bind(this))}
</ul>

)
}

}

function mapStateToProps(state,ownProps) {
  return {
    PublicUrl:state.PublicUrl.url,

  };
}
export default withRouter(connect(mapStateToProps,null)(ObservationGridView ));
