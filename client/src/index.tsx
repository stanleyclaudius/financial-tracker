import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store'

ReactDOM.render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReduxProvider>,
  document.getElementById('root')
);