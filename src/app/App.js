import React from 'react';
import Content from './Content';
import {withRouter} from 'react-router-dom';

class App extends React.Component {

componentDidMount(){

}
  render() {
      return (
        <Content />
      );
  }
}
export default withRouter(App);
