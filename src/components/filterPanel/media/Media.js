import React from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';



import 'rc-checkbox/assets/index.css';

class MediaFilter extends React.Component {
  constructor(){
    super();
    this.state={
      mediaFilter:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    if (newparams.mediaFilter) {
      const data = newparams.mediaFilter.split(",");
      this.setState({
        mediaFilter:data
      })

    }
  }
  componentDidMount(){
    this.setParameter();
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
                value={"noofaudio"}
                checked={ this.state.mediaFilter.includes("noofaudio")?true:false }
                onChange={this.handleCheckboxes.bind(this)}
            />{" Audio"}
        </label>
        <br />
        <label>
            <Checkbox
                checked={ this.state.mediaFilter.includes("noofvideos")?true:false }
                value={"noofvideos"}
                onChange={this.handleCheckboxes.bind(this)}
            />{" Video"}
        </label>
        <br />
        <label>
            <Checkbox
                checked={ this.state.mediaFilter.includes("noofimages")?true:false }
                value={"noofimages"}
                onChange={this.handleCheckboxes.bind(this)}
            />{" Images"}
        </label>
      </div>
    )
  }
}

export default MediaFilter;
