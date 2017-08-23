import React from 'react';
import Content from './content';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <Content />
      </div>
      </div>
    );
  }
}
