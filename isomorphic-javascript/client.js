import 'babel-core/register';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

function run() {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState)) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}