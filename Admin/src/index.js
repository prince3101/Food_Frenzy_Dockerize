import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import './config/axios'
import  { Toaster } from 'react-hot-toast';
import * as serviceWorker from './serviceWorker';


window.helicore = window.helicore || {};
window.cn = function (o) { return "undefined" === typeof o || null === o || "" === o.toString().trim() };
window.cb = function (o) { if (o === 'true') { return true } else { return false } };

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Toaster  position="top-right"/>
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();