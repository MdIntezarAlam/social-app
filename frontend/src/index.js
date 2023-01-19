import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store/store'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  // offset: '30px',
  transition: transitions.SCALE
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
