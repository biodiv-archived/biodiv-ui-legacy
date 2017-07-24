import React from 'react';
import Content from './content';
import Footer from './footer/footer';
import Header from './header/header';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header title="IBP" />

        <div className="container">
        <Content />
        </div>
          <div className="container">
            <Footer />
        </div>
    </div>
    );
  }
}
