import React,{Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import {ROOT_URL} from '../../actions/index.js'
let Ssuggest=[];
class Example extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value:'',
      suggestions: [],
        userId:[],
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
     let userId=this.state.userId;
     let userName=this.state.userName;
     const data= this.refs["sunil"].autowhatever.input.defaultValue.split(":");
      if(!userId.includes(data[1])){
        userId.push(data[1])
        userName.push(data[0])
      }
      else{
        return;
      }
      this.setState({
        userId
      })
      console.log(this.state.userId)
      var event = new CustomEvent("userFilter",{ "detail":{
        userId:userId
      }
    });
  document.dispatchEvent(event);




    };

handleCheckboxes(event){
  event.preventDefault();
  console.log(event)
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
      <input type="checkbox" value={userName} onChange={this.handleCheckboxes.bind(this)} defaultChecked={false} />{userName}
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