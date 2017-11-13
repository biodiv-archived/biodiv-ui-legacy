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
        axios.get(`${Config.api.API_ROOT_URL}/taxon/search?term=${inputValue1}&format=json`)
        .then(function (response) {
                Ssuggest=response.data
                const new1_suggest=Ssuggest.filter(sci =>
                   sci.name.toLowerCase().slice(0, inputLength) === inputValue)
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
     return suggestion.name
   };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      taxonValue:[]
    });
  };


renderSuggestion = (suggestion,{query}) => {
     return(
    <div className="Dropdown-autosuggest">
        {suggestion.name}   <br /> {suggestion.status}| {suggestion.position}
        <br />
    </div>

  )
  };

 handleSubmit(event){
     event.preventDefault();
     const data= this.refs["sunil"].autowhatever.input.defaultValue;
     axios.get(`${Config.api.API_ROOT_URL}/taxon/retrieve/specificSearch?term=${data}`).then((response)=>{
      this.setState({
        taxonValue:response.data,
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
      placeholder: 'Press enter button to search',
      value,
      onChange: this.onChange
    };
    return (
    <form onSubmit={this.handleSubmit.bind(this)}>
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
    </form>
    );
  }
}
export default  Example
