import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';
import App from './components/app';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import HomePage from './components/home_page';

import {
  BrowserRouter,
   Route
  } from 'react-router-dom';
const createStoreWithMiddleware = applyMiddleware(ReduxPromise,logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header title={"IBP"}/>
        <div className="container-fluid">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/observation/list" component={App} />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
