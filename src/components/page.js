import React from 'react';
import Footer from './footer/footer';
import Header from './header/header';

class Page extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <Header title="IBP" />
        {this.props.children}
        <Footer />
        </div>
      </div>
    );
  }
}
export default Page
