import React, { Component } from 'react';
import './App.css';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Bar from './containers/Bar';
import Grid from './containers/Grid';
import Info from './containers/Info';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
          console.log("aasdfasdf:", res.express);
          this.setState(
          { data: res.express.id })})

      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/twitter');
    console.log(response);
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
        <div className="App">
              <h1>Widget Dashboard</h1>

              <Grid/>

              <p className="App-intro">{this.state.data}</p>
          </div>
    );
  }
}

export default App
