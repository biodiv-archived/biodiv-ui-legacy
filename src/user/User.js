import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';
import Checkbox from 'rc-checkbox';

import {Config} from '../Config';
let Ssuggest = [];
class Example extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      userName: [],
      userIds: []
    };

    this.theme = {
      input: {
        width: '100%'
      },
      suggestionsContainerOpen: {
        padding: '2px',
        color: 'red',
        border: '5px solid #D89922',
        height: '150px',
        overflowY: 'scroll'
      },
      suggestionHighlighted: {
        backgroundColor: '#D5D822'
      }
    }
  }

  getSuggestions = (value, S_Callback) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const inputValue1 = decodeURIComponent(inputValue);
    let url = `http://indiabiodiversity.org/search/select?aq.object_type=SUser&aq.user=${inputValue1}&format=json`
    inputLength === 0
      ? S_Callback([])
      : axios.get(url).then(function(response) {
        Ssuggest = response.data.model.instanceList
        const new1_suggest = Ssuggest.filter(sci => sci.instance.name.toLowerCase().slice(0, inputLength) === inputValue)
        S_Callback(new1_suggest);
      })

  };

  S_Callback = (suggestions) => {
    this.setState({suggestions: suggestions});
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.getSuggestions(value, this.S_Callback);

  }

  onChange = (event, {newValue}) => {
    this.setState({value: newValue});
  };

  getSuggestionValue = (suggestion) => {
    return suggestion.instance.name + ":" + suggestion.id
  }

  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  renderSuggestion = (suggestion) => {
    return (
      <div className="dropdown">
        <img src={suggestion.instance.icon} width="40" height="40"/> {suggestion.instance.name}
        <br/> {suggestion.instance.id}
      </div>

    )
  };

  handleSubmit(event) {
    event.preventDefault();
    let userName = this.state.userName;
    let userIds = this.state.userIds;
    let singleUser = {};
    const data = this.refs["sunil"].autowhatever.input.defaultValue.split(":");
    singleUser.uid = data[1];
    singleUser.uName = data[0];
    userName.push(singleUser)
    userIds.push(data[1]);
    userName = _.uniqBy(userName, "uid");
    userIds = _.uniqBy(userIds);
    this.setState({userName, userIds})
    var event = new CustomEvent("user-filter", {
      "detail": {
        userIds: userIds
      }
    });
    document.dispatchEvent(event);
  };

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
    console.log('checkbox checked:', (e.target.checked), e);
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <Autosuggest theme={this.theme} suggestions={suggestions} ref={"sunil"} onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} onSuggestionsClearRequested={this.onSuggestionsClearRequested} getSuggestionValue={this.getSuggestionValue} renderSuggestion={this.renderSuggestion} inputProps={inputProps}/>
            <span className="input-group-btn">
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
export default Example
