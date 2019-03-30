import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import '../css/gridLayoutStyle.css';
import '../css/resizableStyle.css';

class Grid extends Component {
  render() {
    //https://github.com/STRML/react-grid-layout
    var layout = [
      {i: 'a', x: 0, y: 0, w: 3, h: 3, static: true /*static item*/},
      {i: 'b', x: 3, y: 0, w: 3, h: 3, minW: 3, maxW: 6 /*restrict the size of the item with min/max*/},
      {i: 'c', x: 6, y: 0, w: 3, h: 3 /*does whatever it wants*/}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        {/*sets the size of the grid*/}
        <div key="a">hello</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </GridLayout>
    )
  }
}
export default Grid;
