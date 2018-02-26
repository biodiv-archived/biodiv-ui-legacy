import React from 'react';
import Content from './Content';

export default class App extends React.Component {
  render() {
    return (
      <div id="container" style={{"padding-left":"3px"}}>
        <div className="row">
        <Content />
      </div>

      </div>
    );
  }
}
