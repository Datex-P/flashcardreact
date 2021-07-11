import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Deck/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from './Context';

ReactDOM.render(

  <ContextProvider>
     
        <App/>
    
  </ContextProvider>,
  document.getElementById('root')
);




