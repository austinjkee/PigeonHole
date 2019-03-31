import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import '../css/gridLayoutStyle.css';
import '../css/resizableStyle.css';
import BarBar from './Bar.js';
import Info from './Info.js';

class Grid extends Component {
  render() {
    //https://github.com/STRML/react-grid-layout

    var layout = [
      {i: 'a', x: 0, y: 0, w: 11, h: 11.5, minW: 11, maxW: 11, minH: 11.5, maxH: 11.5/*static: true /*static item*/},
      {i: 'b', x: 11, y: 0, w: 6, h: 6/*, minW: 3, maxW: 6 /*restrict the size of the item with min/max*/},
      {i: 'c', x: 17, y: 0, w: 3, h: 3 /*does whatever it wants*/}
    ];
    function handleClick() {
      alert("Lasers deployed []-----");
    }

    return (
      <div>
        <button onClick={handleClick}>Activate Lasers</button>


        <GridLayout className="layout" layout={layout} cols={20} rowHeight={30} width={1200}>
          {/*sets the size of the grid*/}
          <div key="a" class="BarBar"><BarBar/></div>
          <div key="b" class="Info"><Info/></div>
          <div key="c">c</div>
        </GridLayout>
      </div>
    );
  }
}
export default Grid;
