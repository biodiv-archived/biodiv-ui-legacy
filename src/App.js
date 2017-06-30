import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div>
            <Header  title="Assam Biodiv"/>
             <div className="container">
               <Content />
             </div>
            <div>
                <hr />
                <Footer />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
