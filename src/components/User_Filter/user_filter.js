import React,{Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import {ROOT_URL} from '../../actions/index.js'
let Ssuggest=[];
class Example extends Component {
  constructor() {
    super();
    this.state = {
      value:'',
      suggestions: [],
        userName:[]
    };

    this.theme={
      input:{
        width:'100%'
      },
      suggestionsContainerOpen:{
        padding:'2px',
        color:'red',
        border:'5px solid #D89922',
        height:'150px',
        overflowY:'scroll',

      },
      suggestionHighlighted:{
        backgroundColor: '#D5D822'
      }
    }
  }

getSuggestions = (value,S_Callback) => {
    
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const inputValue1= decodeURIComponent(inputValue);
        let url=`http://indiabiodiversity.org/search/select?aq.object_type=SUser&aq.user=${inputValue1}&format=json`

        inputLength===0?S_Callback([]):

        axios.get(url)
        .then(function (response) {

                Ssuggest=response.data.model.instanceList
                const new1_suggest=Ssuggest.filter(sci =>
                   sci.instance.name.toLowerCase().slice(0, inputLength) === inputValue)
                 S_Callback(new1_suggest);
        })

  };

  S_Callback =(suggestions)=> {
   this.setState({
     suggestions: suggestions

   });
   console.log(suggestions)
  };

onSuggestionsFetchRequested = ({ value }) => {
     this.getSuggestions(value,this.S_Callback);
  
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  getSuggestionValue = (suggestion) => {
     return suggestion.instance.name+":"+suggestion.id
   };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    
    });
  };


renderSuggestion = (suggestion) => {
     return(
    <div className="dropdown">
        <img src={suggestion.instance.icon } width="40" height="40"/>
        {suggestion.instance.name}
        <br />
        {suggestion.instance.id}
    </div>
  
  )
  };

 handleSubmit(event){
     event.preventDefault();
     let userName=this.state.userName;
     let singleUser={};
     const data= this.refs["sunil"].autowhatever.input.defaultValue.split(":");
        singleUser.uid=data[1];
        singleUser.uName=data[0];
        userName.push(singleUser)
      this.setState({
        userName
      })
      var event = new CustomEvent("userFilter",{ "detail":{
        userName:userName
      }
    });
  document.dispatchEvent(event);




    };

handleCheckboxes(event){

  console.log(event.target.checked,event.target.value)

}


  render() {
    const handleSubmit=this.props.handleSubmit;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Enter the userName',
      value,
      onChange: this.onChange
    };

    
    return (

    <div>
   
    {this.state.userName.map((userName,index)=>{
      return  (
      <div key={index}>
      <input type="checkbox" name={userName.uid} value={userName.uid} onChange={this.handleCheckboxes.bind(this)} defaultChecked={true?this.handleCheckboxes.bind(this):null} />{userName.uName}
      </div>
      )
    })}
  
    <form onSubmit={this.handleSubmit.bind(this)}>
      <div className="input-group">
      <Autosuggest 
        theme={this.theme}
        suggestions={suggestions}
         ref={"sunil"}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
       <span className="input-group-btn" >
        <button className="btn btn-primary btn-xs" type="submit">
       <span className="glyphicon glyphicon-search"></span>
       </button>
      </span>

       </div>
    </form>

    </div>

    );
  }
}
export default  Example