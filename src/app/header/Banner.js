import React,{Component} from 'react';



class Banner extends Component{

  constructor(){
    super()
  }

  render(){
    let userGroup=this.props.userGroupList?this.props.userGroupList.filter((item)=>{return item.webaddress==this.props.groupName})[0]:null;

    return(
      <div style={{marginTop:'0px',marginBottom:'5px',marginLeft:'18px',height:'100px','backgroundColor':'beige'}}>
         {userGroup?
        <div className="col-sm-12">
            <img  height="50" className="pull-left col-sm-2"  src={userGroup?"http://indiabiodiversity.org/biodiv/userGroups/"+userGroup.icon:null}></img>
            <h4 className="col-sm-6">{userGroup.name}</h4>
        </div>:
        <div className="col-sm-12">
          <img  height="50" className="pull-left col-sm-2" src={"http://indiabiodiversity.org/logo/IBP.png"}></img>
          <h4 className="col-sm-6">IndiaBiodiversity Portal</h4>
          <br />
        </div>}


      </div>
    )
  }
}
export default Banner
