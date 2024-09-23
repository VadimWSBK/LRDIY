// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Adjust path if necessary
import Calculator from './components/Calculator'; // Adjust path if necessary

ReactDOM.render(
  <Provider store={store}>
            <Calculator />
            </Provider>,
  document.getElementById('root')
);