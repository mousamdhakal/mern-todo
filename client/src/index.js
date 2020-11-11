import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/global.css';
import './styles/index.css';
import './styles/layout.css';

import Routes from './routes';
import store from './store';
import setAuthorizationToken from './utils/setAuthorizationToken';

setAuthorizationToken(localStorage.jwtToken);

const App = () => <Routes />;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
