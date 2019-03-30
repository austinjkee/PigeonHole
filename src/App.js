import React from 'react'
import './App.css'
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Bar from './containers/Bar';
import MyFirstGrid from './containers/MyFirstGrid';
import Info from './containers/Info';

const App = () => (
    <div>
        <div className="App">
            <h1>Bar title</h1>


            <MyFirstGrid />
        </div>
    </div>
)

export default App
