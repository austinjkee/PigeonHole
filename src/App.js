import React from 'react'
import './App.css'
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Bar from './containers/Bar';
import Grid from './containers/Grid';
import Info from './containers/Info';

const App = () => (
    <div>
        <div className="App">
            <h1>Bar title</h1>
            
            <Grid/>
        </div>
    </div>
)

export default App
