import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import redux promise middleware
import ReduxPromise from 'redux-promise';
import App from './components/app';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger'
const createStoreWithMiddleware = applyMiddleware(ReduxPromise,logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
