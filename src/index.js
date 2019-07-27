import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'shopify-buy';
import './app.scss';

const client = Client.buildClient({
  storefrontAccessToken: 'ae80b4d934a4714ee047be0a4bfb3d31',
  domain: 'air-canada-test.myshopify.com'
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
