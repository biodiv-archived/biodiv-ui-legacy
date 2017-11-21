import React,{Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
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
    this.theme={
      input:{
        width:'100%'
      },
      suggestionsContainerOpen:{
        padding:'3px',
        margin:'0px',
        color:' #336699',
        border:'1px solid #D89922',
        height:'200px',
        overflowY:'scroll'
      },
      suggestionHighlighted:{
        backgroundColor: '#FFFF00'
      },
      examplesContainer: {
        'display': 'flex',
        'flex-direction': 'column'
      }
    }
    this.onSuggestionSelected=this.onSuggestionSelected.bind(this);
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
                 S_Callback(Ssuggest);
        })
  };

  S_Callback =(suggestions)=> {
   this.setState({
     suggestions: suggestions
   });
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
      suggestions: []
    });
  };

  renderSuggestion = (suggestion,{query}) => {
     return(
    <div className="Dropdown-autosuggest">
        {suggestion.name}   <br /> {suggestion.status}| {suggestion.position} |{suggestion.rank}
        <br/>
        <br />
    </div>

  )
  };
 onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
    this.setState({
      values:suggestion
    })
  }
 handleSubmit(event){
     event.preventDefault();
     let data1=this.state.values?this.state.values:"";

     const data= this.refs["input"].autowhatever.input.defaultValue;

    if(data1.name){
      axios.get(`${Config.api.API_ROOT_URL}/taxon/retrieve/specificSearch?term=${data1.name}&taxonid=${data1.id}`).then((response)=>{
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
    }
    else{
      axios.get(`${Config.api.API_ROOT_URL}/taxon/retrieve/specificSearch?term=${data}`).then((response)=>{
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
    }
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
            suggestions={this.state.suggestions}
            ref={"input"}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
    </form>
    );
  }
}
export default  Example
