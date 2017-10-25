import React,{Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { Config } from '../Config';

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
      value: '',
      suggestions: []
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

        inputLength===0?S_Callback([]):


        axios.get(Config.api.baseURL+"/recommendation/suggest?term="+inputValue1+"&nameFilter=scientificNames&format=json")
        .then(function (response) {


                Ssuggest=response.data.model.instanceList
                const new1_suggest=Ssuggest.filter(sci =>
                   sci.value.toLowerCase().slice(0, inputLength) === inputValue)
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
     return suggestion.value
   };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      taxonValue:[]
    });
  };


renderSuggestion = (suggestion,{query}) => {
     return(

    <div className="dropdown">
        <img src={suggestion.icon } width="40" height="40"/>
        {suggestion.value}
    </div>

  )
  };

 handleSubmit(event){
     event.preventDefault();
     const data= this.refs["sunil"].autowhatever.input.defaultValue;
     axios.get(`${Config.api.baseUrl}/taxon/search?str=${data}`).then((response)=>{
      this.setState({
        taxonValue:response.data
      },()=>{
         var event = new CustomEvent("getSearchNode",{ "detail":{
        taxonValue:response.data
    }
  });
  document.dispatchEvent(event);
      })
     })
    };


  render() {
    const handleSubmit=this.props.handleSubmit;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange
    };


    return (
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

    );
  }
}
export default  Example
