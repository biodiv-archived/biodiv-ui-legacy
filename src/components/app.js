import React from 'react';
import Content from './content';
import Footer from './footer/footer';
import Header from './header/header';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Header title="IBP" />
        </div>
        <div className="row">
        <Content />
        </div>
        <div className="row">
        <Footer />
        </div>
    </div>
    );
  }
}
