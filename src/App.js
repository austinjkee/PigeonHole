import React, { Component } from 'react'
import './App.css'
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Bar from './containers/Bar';
import Info from './containers/Info';



class App extends Component {
    constructor() {
  super();
  this.state = { data: [], yes: 1 };
  console.log("asdhfkasj");
}

function handleClick(){
    
}

    render() {

            return (
                <div className="App">
                <h1>Bar title</h1>
                <Button type="Submit" className="submit" onClick={handleClick}>cool</Button>

                <Info />
                <Bar />


                </div>
            );
        }

}


export default App
