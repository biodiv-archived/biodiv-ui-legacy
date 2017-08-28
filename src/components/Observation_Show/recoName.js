import React, {Component} from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../actions/index.js'
import RecoComment from './recoComment.js'



class RecoName extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      response:''
    }
    this.getRecoName=this.getRecoName.bind(this)
    this.getRecoName(this.props.id)
  }

  getRecoName(id){
    axios.get(ROOT_URL+"/api/observation/getRecommendationVotes?id="+ id)
        .then((response)=>{
          this.setState({
            response:response.data.model
          });
        })
  }




  render(){

    return(<div>{
      this.state.response.hasOwnProperty('recoVotes')?(
      this.state.response.recoVotes.length>0?
      (

        this.state.response.recoVotes.map((item)=>{
            return(

          <div className="well well-sm row " style={{width:'100%',margin:'0.5%'}}>
              <div className="highlight ellipsis dropdown col-sm-10">

                {
                  item.isScientificName===true?
                    (
                      item.hasOwnProperty('speciesId')?
                      (
                          item.speciesId!=null?
                          (
                              <a href={"http://indiabiodiversity.org/species/show/"+item.speciesId}>
                                <i>
                                    {item.hasOwnProperty('normalizedForm') ? item.normalizedForm:null}
                                    {"    "}
                                </i>
                             </a>
                          ):
                          (
                              <a>
                                <i>
                                    {item.hasOwnProperty('normalizedForm') ? item.normalizedForm:null}
                                    {"    "}
                                </i>
                             </a>
                          )
                      ):
                      (
                            <a>
                              <i>
                                  {item.hasOwnProperty('normalizedForm') ? item.normalizedForm:(item.hasOwnProperty('name')?item.name:null)}
                                  {"    "}
                              </i>
                           </a>
                      )
                  ):
                  (
                    <a >
                      <i>
                          {item.hasOwnProperty('name') ? item.name:null}
                          {"    "}
                      </i>
                   </a>
                  )
                }
                {item.hasOwnProperty('commonNames') ?item.commonNames:null}


                    <a className="dropdown-toggle" data-toggle="dropdown"><span className="badge" style={{backgroudColor:'red'}}>{item.authors.length}</span></a>
                    <ul className="dropdown-menu row " style={{backgroundColor:'#99E0EE'}}>
                        {
                          item.authors.map((aut)=>{
                              return(
                                <div className="col-sm-1">
                                <li >
                                <a  href={"http://indiabiodiversity.org/user/show/" + aut[0].id}   title={aut[0].name} >
                                <img className="small-profile-pic img-circle"  src={aut[0].icon} width="30" height="30" />
                                </a>
                                </li>
                                </div>
                              )
                            })
                        }
                    </ul>
               </div>
               <div className="col-sm-2 ">
                        <RecoComment id1={item.recoId} id2={this.props.id} speciesId={item.hasOwnProperty('speciesId')?(item.speciesId!=null?item.speciesId:"no"):"no"} name={item.name} votes={item.authors.length}/>
                </div>

          </div>

        )}
        )
      )
      :null
    ):null
    }
      </div>
    )
  }
}

export default RecoName;
