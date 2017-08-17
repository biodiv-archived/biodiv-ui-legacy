import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';
import App from './components/app';
import ShowPage from './components/show_observation_page';

import {
  BrowserRouter,
   Route,
   Switch
  } from 'react-router-dom';
const createStoreWithMiddleware = applyMiddleware(ReduxPromise,logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Route exact path="/observation/list" component={App} />
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
