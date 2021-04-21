import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Home } from './components/Home';
import { VanillaHome } from "./components/VanillaHome";

ReactDOM.render(
  <React.StrictMode>
    {/*<Home />*/}
    <VanillaHome />
  </React.StrictMode>,
  document.getElementById('root')
);
