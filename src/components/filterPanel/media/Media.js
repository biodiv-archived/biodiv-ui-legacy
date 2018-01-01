import React from 'react';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class MediaFilter extends React.Component {
  constructor(){
    super();
    this.state={
      mediaFilter:[]
    }

  }
  handleCheckboxes(event){

    let mediaFilter=this.state.mediaFilter;
    if(event.target.checked){
      mediaFilter.push(event.target.value);
      let set=new Set(mediaFilter);
      mediaFilter=Array.from(set);
      set.clear();
    }
    else{
      let set =new Set(mediaFilter);
      set.delete(event.target.value);
      mediaFilter=Array.from(set);
      set.clear();
    }
    this.setState({
      mediaFilter
    })

       let events = new CustomEvent("media-filter",{ "detail":{
           MediaFilter:mediaFilter
       }
       });
       document.dispatchEvent(events);
         event.preventDefault();
  }

  render() {
    return (
      <div>
        <label>
            <Checkbox
                value={"audio"}
                onChange={this.handleCheckboxes.bind(this)}
            />{ "Audio"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"video"}
                onChange={this.handleCheckboxes.bind(this)}
            />{ "Video"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"image"}
                onChange={this.handleCheckboxes.bind(this)}
            />{ "Images"}
        </label>
      </div>
    )
  }
}

export default MediaFilter;
