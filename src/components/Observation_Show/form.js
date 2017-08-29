import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import {ROOT_URL} from '../../actions/index.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchLanguages} from '../../actions/index';

var Csuggest = []
var Ssuggest = []

class Formsuggest extends React.Component {
  constructor() {
    super();
    this.state = {
      Cvalue:'',
      Svalue:'',
      Csuggestions: [],
      Ssuggestions: []
    };
    this.theme={
      input:{
        width:'100%'
      }
    }
    this.theme1={
      input:{
        width:'100%'
      }
    }

  }
componentDidMount(){
  {this.props?this.props.fetchLanguages():null}
}
  suggestIdPost(e){
    e.preventDefault();
    var token=this.props.Login
    var cName1="cName"+this.props.id2
    var cNameValue=this.refs[cName1].autowhatever.input.defaultValue
    var lang1="lang"+this.props.id2
    var langValue=this.refs[lang1].value
    var sName1="sName"+this.props.id2
    var sNameValue=this.refs[sName1].autowhatever.input.defaultValue
    var recId
    var suggestIdComment1="suggestIdComment"+this.props.id2
    var value1=this.refs[suggestIdComment1].value
    var obvId=this.props.id2

    var options={
      method:'POST',
      url :   ROOT_URL+"/api/observation/addRecommendationVote?commonName="+cNameValue+"&languageName="+langValue+"&recoName="+sNameValue+"&recoId=&recoComment="+value1+"&obvId="+obvId+"&format=json",
      headers :{
        'X-Auth-Token' : token,
        'X-AppKey'     : "87aae8c4-7b84-4539-b8a3-42ff737eda0a",
        'Accept'        :"application/json"
      },
      json: 'true'
    }

    axios(options)
        .then((response)=>{
          console.log("comment",response)
        })

  }

 getC_Suggestions = (value,C_Callback) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       console.log("got")
       console.log(inputValue)
        inputLength===0?C_Callback([]):

        (axios.get(ROOT_URL+"/recommendation/suggest?term="+inputValue+"&nameFilter=commonNames&format=json")
        .then(function (response) {


                Csuggest=response.data.model.instanceList
                const new_suggest=Csuggest.filter(common =>
                   common.value.toLowerCase().slice(0, inputLength) === inputValue)
                   console.log(new_suggest)
                 C_Callback(new_suggest);
        }))
  };


   getS_Suggestions = (value,S_Callback) => {
    console.log("got_s")
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        inputLength===0?S_Callback([]):

        (axios.get(ROOT_URL+"/recommendation/suggest?term="+inputValue+"&nameFilter=scientificNames&format=json")
        .then(function (response) {


                Ssuggest=response.data.model.instanceList
                const new1_suggest=Ssuggest.filter(sci =>
                   sci.value.toLowerCase().slice(0, inputLength) === inputValue)
                 S_Callback(new1_suggest);
        }))

  };


   getSuggestionValue_C = (suggestion) => {
     this.setState({
       Svalue:suggestion.acceptedName
     })
     return suggestion.value
   } ;

   renderSuggestion_c = (suggestion,{ query, isHighlighted }) => {
     return(
    <div className="dropdown">
    {console.log("chalrh hai")}
        <img src={suggestion.icon } width="40" height="40"/>
        {suggestion.value}
      {"["+suggestion.acceptedName+"]"}
    </div>
  )
  };

   getSuggestionValue_S = (suggestion) => {
     return suggestion.value
   };

   renderSuggestion_s = (suggestion,{ query, isHighlighted }) => {
     return(
    <div className="dropdown">
        <img src={suggestion.icon } width="40" height="40"/>
        {suggestion.value}
    </div>
  )
  };


  onChange1 = (event, { newValue }) => {
    var x=(event.target).getAttribute('id')
    this.setState({
      Cvalue: newValue,
    });
  };

  onChange2 = (event, { newValue }) => {
    var x=(event.target).getAttribute('id')
    this.setState({
      Svalue: newValue,

    });
  };

  C_Callback =(suggestions)=> {
   this.setState({
     Csuggestions: suggestions

   });
  };

  S_Callback =(suggestions)=> {

   this.setState({
     Ssuggestions: suggestions

   });
   console.log(this.state.Ssuggestions)
  };

onSuggestionsFetchRequested_C = ({ value }) => {
  console.log(value)
   this.getC_Suggestions(value,this.C_Callback);

  };

  onSuggestionsFetchRequested_S = ({ value }) => {
 console.log(value)
     this.getS_Suggestions(value,this.S_Callback);

    };


  onSuggestionsClearRequested = () => {
    this.setState({
      Csuggestions: [],
      Ssuggestions: [],
      currentChangedId:''
    });
  };

  render() {

    const  {Cvalue,Svalue,Csuggestions,Ssuggestions}=this.state;

    const inputPropsC = {
      id: "cInput",
      placeholder: 'Type a common name',
      value: Cvalue,
      onChange: this.onChange1,

    };

    const inputPropsS = {
      id: "sInput",
      placeholder: 'Type a scientific name',
      value:Svalue,
      onChange: this.onChange2
    };



    return (
      <div>
      <form  className="form-horizontal" onSubmit={this.suggestIdPost.bind(this)}>
          <div className="form-group row">
            <label className="control-label col-sm-2" htmlFor="email">Common_Name:</label>
            <div className="col-sm-7">
                <Autosuggest
                  id="cInput"
                  theme={this.theme}
                  ref={"cName"+this.props.id2}
                  suggestions={Csuggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested_C}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue_C}
                  renderSuggestion={this.renderSuggestion_c}
                  inputProps={inputPropsC}
                />
             </div>
             <div className="col-sm-3 ">
                   <input  type="text" list="browsers" defaultValue="English" ref={"lang"+this.props.id2} style={{width:'100%'}}/>
                   <datalist id="browsers">
                   {
                       this.props.Languages>0?(
                         this.props.Languages.map((item)=>{
                           return(
                           <div><option value={item}/></div>
                         )
                         }
                       )

                    ):null
                  }
                   </datalist>
             </div>
          </div>
          <div className="form-group row">
            <label className="control-label col-sm-2" htmlFor="email">Scientific_Name:</label>
            <div className="col-sm-10">
                  <Autosuggest
                    id="sInput"
                    theme={this.theme1}
                    ref={"sName"+this.props.id2}
                    suggestions={Ssuggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested_S}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue_S}
                    renderSuggestion={this.renderSuggestion_s}
                    inputProps={inputPropsS}
                  />
            </div>
          </div>
          <div className="form-group row">
              <label className="control-label col-sm-2" htmlFor="comments">Comments:</label>
              <div className="col-sm-10">
                  <input type="text" className="form-control" id="comments" placeholder="give Comments" ref={"suggestIdComment"+this.props.id2} style={{width:'100%'}}/>
              </div>
          </div>
          <div className="form-group row">
              <div className="col-sm-offset-10 col-sm-10">
                  <input  type="submit" value="Add" className="btn btn-default" />
              </div>
          </div>
      </form>
      </div>
    );
  }
}

function mapStateToProps(state){
return {Login:state.Login,Languages:state.Languages};
}

function mapDispatchToProps(dispatch){

return bindActionCreators({fetchLanguages},dispatch);
}

 export default connect(mapStateToProps,mapDispatchToProps)(Formsuggest);
