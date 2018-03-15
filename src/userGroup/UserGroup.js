import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';
import queryString from 'query-string';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import UserGroupName from '../util/UserGroup';

import {ClearObservationPage} from '../actions/index';

function comparer(otherArray){
  return function(current){
    return otherArray.filter(function(other){
      return other.value == current.value && other.display == current.display
    }).length == 0;
  }
}
class UserGroup extends Component{

constructor(){
  super();
  this.state={
    selectValues:[],
    AllUserGroup:[],
    value: '',
    suggestions: [],
  }
  this.onChangeCheck=this.onChangeCheck.bind(this)
  this.onChange=this.onChange.bind(this);
  this.getSuggestions=this.getSuggestions.bind(this)
}

  getUrlParameter(){
    const newparams = queryString.parse(document.location.search);
    if(newparams.userGroupList){
      let ids=newparams.userGroupList.split(",").map(item=>  parseInt(item,10));

    UserGroupName.list().then(data=>{
      let groupName=data.filter((item)=>{
          return ids.indexOf(item.id) >-1;
      })
      this.setState({
        selectValues:groupName
      })
    })
    }
  }
  componentDidMount(){
      this.getUrlParameter();
  }



 getSuggestions (value){
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : this.props.UserGroupList.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};


 getSuggestionValue (suggestion) {
   this.setState({
     value:""
   })
   return suggestion.name
 }

 onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
   let selectValues=this.state.selectValues;
   selectValues.push(suggestion);
  selectValues=_.uniqBy(selectValues,"id");
   this.setState({
     selectValues
   },()=>{
     let arr=[];
     selectValues.map(item=>{
       arr.push(item.id);
     })
    this.props.ClearObservationPage();
    var event = new CustomEvent("userGroup-filter",{ "detail":{
          id:arr
    }
    });
    document.dispatchEvent(event);
   })
 }

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
   </div>

 )
 };
onChange (event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };


  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

onChangeCheck(event){
   if(!event.target.checked){
      let item=event.target.item;
      let selectValues=this.state.selectValues;
      let newValues=selectValues.filter((item1)=>{
        return item1.id!=item.id;
      })
      newValues=_.uniqBy(newValues,"id");
      this.setState({
        selectValues:newValues
      },()=>{
        let arr=[];
        newValues.map(item=>{
          arr.push(item.id);
        })
       this.props.ClearObservationPage();
       var event = new CustomEvent("userGroup-filter",{ "detail":{
             id:arr
       }
       });
       document.dispatchEvent(event);
      })
    }
    else{
        let item=event.target.item;
        let selectValues=this.state.selectValues;
        selectValues.push(event.target.item);
        selectValues=_.uniqBy(selectValues,"id");
         this.setState({
           selectValues
         },()=>{
           let arr=[];
           selectValues.map(item=>{
             arr.push(item.id);
           })
          this.props.ClearObservationPage();
          var event = new CustomEvent("userGroup-filter",{ "detail":{
                id:arr
          }
          });
          document.dispatchEvent(event);
         })
    }
       event.preventDefault();

}

  render(){

  let result1=this.props.UserGroupList;
  let result2=this.state.selectValues;

  let newList = result1.filter(function(obj) {
      return !result2.some(function(obj2) {
          return obj.id == obj2.id;
      });
  });


     const { value, suggestions } = this.state;
     const inputProps = {
      placeholder: 'Type a group Name',
      value,
      onChange: this.onChange
    };
    return(
      <div>
        {this.state.selectValues.length>0?this.state.selectValues.map((item)=>{
          return (
            <div key={item.id}>
            <div >
            <Checkbox
              defaultChecked={true}
              onChange={this.onChangeCheck}
              item={item}
            />
            &nbsp;{item.name}
        </div>
        </div>
          )

        }):null}

        <Autosuggest
          theme={this.theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          inputProps={inputProps}
        />
        <br />
        <div>


          {newList.map((item,index)=>{
            return(
              (this.state.selectValues.length+index)<10?
              <div key={index}>
                  <div >
                <Checkbox
                  checked={false}
                  item={item}
                  onChange={this.onChangeCheck.bind(this)}
                />
                &nbsp;{item.name}
              </div>
              </div>
                :null
            )

          })}
        </div>
      </div>

    )
  } //render




} //class
function mapStateToProps(state){
return {
  UserGroupList:state.UserGroupList,
};
}
export default connect(mapStateToProps, {ClearObservationPage})(UserGroup);
