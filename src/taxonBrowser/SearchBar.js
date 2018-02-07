import React,{Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';


import theme from './theme.css';

import { Config } from '../Config';

let Ssuggest=[];
class Example extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      values:{}
    };
    this.onSuggestionSelected=this.onSuggestionSelected.bind(this);
    this.onChange=this.onChange.bind(this);
    this.S_Callback=this.S_Callback.bind(this);
  }

getSuggestions(value,S_Callback){
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const inputValue1= decodeURIComponent(inputValue);
        inputLength===0?S_Callback([]):
        axios.get(`${Config.api.API_ROOT_URL}/taxon/search?term=${inputValue1}&format=json`)
        .then(function (response) {
                Ssuggest=response.data
                const new1_suggest=Ssuggest.filter(sci =>
                   sci.name.toLowerCase().slice(0, inputLength) === inputValue)
                 S_Callback(Ssuggest);
        })
  };

  S_Callback (suggestions) {
   this.setState({
     suggestions: suggestions
   });
  };

onSuggestionsFetchRequested ({ value }) {
     this.getSuggestions(value,this.S_Callback);

  };
  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  getSuggestionValue (suggestion) {
     return suggestion.name
   };

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion (suggestion,{query}) {
    const suggestionText = `${suggestion.name}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
     return(
    <div>
      {
        parts.map((part, index) => {
          const className = part.highlight ? 'highlight' : null;
          return (
              <span className={className} key={index}>{part.text}</span>
          );
        })
      }
      <br />
      {suggestion.status} | {suggestion.position} | {suggestion.rank}
    </div>

  )
  };
 onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
    this.setState({
      values:suggestion
    })
  }
 handleSubmit(event){

     let data1=this.state.values?this.state.values:"";
     const data= this.refs["input"].autowhatever.input.defaultValue;
    // if(data1.name){
    //   axios.get(`${Config.api.API_ROOT_URL}/taxon/retrieve/specificSearch?term=${data1.name}&taxonid=${data1.id}`).then((response)=>{
    //    this.setState({
    //      taxonValue:response.data,
    //    },()=>{
    //       var event = new CustomEvent("getSearchNode",{ "detail":{
    //            taxonValue:response.data
    //          }
    //       });
    //       document.dispatchEvent(event);
    //      this.onSuggestionsClearRequested();
    //    })
    //   })
    // }
    // else{
      axios.get(`${Config.api.API_ROOT_URL}/taxon/retrieve/specificSearch?term=${data}`).then((response)=>{
        console.log(response.data);
       this.setState({
         taxonValue:response.data,
       },()=>{
          var event = new CustomEvent("getSearchNode",{ "detail":{
               taxonValue:response.data
             }
          });
          document.dispatchEvent(event);
         this.onSuggestionsClearRequested();
       })
      })
    // }
    event.preventDefault();
    };


  render() {
    const handleSubmit=this.props.handleSubmit;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'type to search',
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <span className="pull-right">
          <button  onClick={this.handleSubmit.bind(this)} style={{height:'25px',borderRadius:'5px',marginLeft:'-10px'}} className="btn btn-xs btn-default">
            <i className="fa fa-search"></i>
          </button>
        </span>
          <Autosuggest
            theme={this.theme}
            suggestions={this.state.suggestions}
            ref={"input"}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            getSuggestionValue={this.getSuggestionValue.bind(this)}
            renderSuggestion={this.renderSuggestion.bind(this)}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          />
    </form>
  </div>
    );
  }
}
export default  Example
