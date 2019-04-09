import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './Auth';
import * as serviceWorker from './serviceWorker';

<<<<<<< HEAD
ReactDOM.render(<Auth />, document.getElementById('login-form'));

=======
ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> 2feafb147a280c70af28337190565d96fbe0f3a7
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
