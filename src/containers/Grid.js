import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import '../css/gridLayoutStyle.css';
import '../css/resizableStyle.css';
import BarBar from './Bar.js';
import Info from './Info.js';
import Info2 from './Table.js';

class Grid extends Component {

  render() {
    //https://github.com/STRML/react-grid-layout
    var layout = [
      {i: 'a', x: 0, y: 0, w: 9, h: 9.5, minW: 9, maxW: 9, minH: 9.5, maxH: 9.5/*static: true /*static item*/},
      {i: 'b', x: 9.5, y: 0, w: 13, h: 7.5, minW: 13, minH: 7.5 /*restrict the size of the item with min/max*/},
      {i: 'c', x: 9.5, y: 12.5, w: 15, h: 7, minW: 15, minH: 7 /*does whatever it wants*/}
    ];
    function handleClick() {
      alert("An element should be added.");
    }

    return (
      <div>
        <Button onClick={handleClick}>Add Graph</Button>
        <Button onClick={handleClick}>Add Table</Button>
        <Button onClick={handleClick}>Add Map</Button>

        <GridLayout className="layout" layout={layout} cols={24} rowHeight={30} width={1300}>
          {/*sets the size of the grid*/}
          <div key="a" className="BarBar"><BarBar/></div>
          <div key="b" className="Info"><Info/></div>
          <div key="c" className="Info2"><Info2/></div>
        </GridLayout>
      </div>
    );
  }
}
export default Grid;
