import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';


import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';
import Checkbox from 'rc-checkbox';


import 'rc-checkbox/assets/index.css';

import {Config} from '../Config';
let Ssuggest = [];
class Example extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      userName: [],
      userIds: [],
      values:{}
    };
      this.onSuggestionSelected=this.onSuggestionSelected.bind(this);
      this.onChange=this.onChange.bind(this);
      this.S_Callback=this.S_Callback.bind(this);
  }

  getSuggestions (value, S_Callback) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const inputValue1 = decodeURIComponent(inputValue);
    let url = `search/select?aq.object_type=SUser&aq.user=${inputValue1}&format=json`
    inputLength === 0
      ? S_Callback([])
      : axios.get(url).then(function(response) {
        Ssuggest = response.data.model.instanceList
        //const new1_suggest = Ssuggest.filter(sci => sci.instance.name.toLowerCase().slice(0, inputLength) === inputValue)
        S_Callback(Ssuggest);
      })

  };

  S_Callback (suggestions) {
    this.setState({suggestions: suggestions});
  };

  onSuggestionsFetchRequested ({value}) {
    this.getSuggestions(value, this.S_Callback);

  }

  onChange (event, {newValue}) {
    this.setState({value: newValue});
  };

  getSuggestionValue (suggestion) {

    this.setState({
      value:""
    })
    return suggestion.instance.name + ":" + suggestion.id
  }

  onSuggestionsClearRequested () {
    this.setState({suggestions: []});
  };

  renderSuggestion (suggestion,{query}) {

    const suggestionText = `${suggestion.instance.name}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    console.log(suggestion);
    return (
      <div>
        <img src={suggestion.instance.icon} width="40" height="40"/>
        {parts.map((part, index) => {
          const className = part.highlight ? 'highlight' : null;
          return (
              <span className={className} key={index}>{part.text}</span>
          );
        })}
        {suggestion.instance.id}
      </div>

    )

  };
  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
     this.setState({
       values:suggestion
     })
     let userName = this.state.userName;
     let userIds = this.state.userIds;
     let singleUser = {};
     singleUser.uid = suggestion.instance.id;
     singleUser.uName = suggestion.instance.name;
     userName.push(singleUser)
     userIds.push(suggestion.instance.id);
     userName = _.uniqBy(userName, "uid");
     userIds = _.uniqBy(userIds);
     this.setState({userName, userIds})
     var event = new CustomEvent("user-filter", {
       "detail": {
         userIds: userIds
       }
     });
     document.dispatchEvent(event);

   }



  handleUrlParameters() {
    const newparams = queryString.parse(document.location.search);

    if (newparams.user) {
      let newuser = newparams.user.split(",");
      let userIds1 = [];
      let userName1 = [];
      newuser.forEach((item) => {
        let url = `${Config.api.ROOT_URL}/user/show/${item}`;
        axios.get(url).then((user) => {
          let temp = {};
          userIds1.push(user.data.instance.id);
          temp.uid = user.data.instance.id;
          temp.uName = user.data.instance.name;
          userName1.push(temp);
          this.setState({userIds: userIds1, userName: userName1})
        })
      })
    }
  }
  componentDidMount() {
    this.handleUrlParameters();
  }

  onChanges(e) {
    if (!e.target.checked) {
      let userName = this.state.userName;
      let userIds = this.state.userIds;
      userName = _.uniqBy(userName, "uid");
      userIds = _.uniqBy(userIds);
      let index = userName.findIndex(x => x.uid == parseInt(e.target.id));
      userName.splice(index, 1);
      let index1 = userIds.findIndex(x => x == parseInt(e.target.id));
      userIds.splice(index1, 1);
      this.setState({userIds, userName})
      let event = new CustomEvent("user-filter", {
        "detail": {
          userIds: userIds
        }
      });
      document.dispatchEvent(event);
    }
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const {value, suggestions} = this.state;
    const inputProps = {
      placeholder: 'Enter the userName',
      value,
      onChange: this.onChange
    };
    const userName = this.state.userName;
    return (
      <div>
        {userName
          ? userName.map((userName, index) => {
            return (
              <div key={index}>
                <label>
                  <Checkbox checked id={userName.uid} onChange={this.onChanges.bind(this)}/> {userName.uName}
                </label>
              </div>
            )
          })
          : null}

          <div>
            <Autosuggest
              theme={this.theme}
              suggestions={suggestions}
              ref={"sunil"}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
              getSuggestionValue={this.getSuggestionValue.bind(this)}
              renderSuggestion={this.renderSuggestion.bind(this)}
              inputProps={inputProps}
              onSuggestionSelected={this.onSuggestionSelected.bind(this)}
            />

          </div>

      </div>
    );
  }
}
export default Example
