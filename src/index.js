import React from 'react';
import ReactDOM from 'react-dom';
import `${process.env.PUBLIC_URL}/index.css`;
import Auth from `${process.env.PUBLIC_URL}/Auth`;
import * as serviceWorker from `${process.env.PUBLIC_URL}/serviceWorker`;

ReactDOM.render(<Auth />, document.getElementById('login-form'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
