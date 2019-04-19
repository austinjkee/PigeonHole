import React from 'react';
import './App.css';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Bar from './containers/Bar';
import Grid from './containers/Grid';
import Info from './containers/Info';

const App = () => (
    <div>
        <div className="App">
            <h1>Widget Dashboard</h1>

            <Grid/>
        </div>
    </div>
)

import React, { Component } from 'react'
import './App.css'
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Grid from './containers/Grid';

var server = require('./server.js');

class App extends Component {
    constructor() {
      super();
      this.state = { data: [], yes: 1 };
      console.log("asdhfkasj");
    }

    render() {
      function handleClick(){
        console.log(server.jsonData);
        alert("Hehe");
      }
      return (
          <div className="App">
          <h1>Widget Dashboard</h1>
          <Button type="Submit" className="submit" onClick={handleClick}>Welcome</Button>
          <Grid/>
          </div>
      );
  }

}

export default App;
