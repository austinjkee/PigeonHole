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
    function handleClickBar() {
      //alert("An element should be added.");
      var x = document.getElementById("myBar");
      if(x.style.display === "none"){
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
    function handleClickChart1() {
      //alert("An element should be added.");
      var x = document.getElementById("chart1");
      if(x.style.display === "none"){
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
    function handleClickChart2() {
      //alert("An element should be added.");
      var x = document.getElementById("chart2");
      if(x.style.display === "none"){
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }

    return (
      <div>
        <div align = "center">
          <Button onClick={handleClickBar}>Add Graph</Button>
          <Button onClick={handleClickChart1}>Add Table1</Button>
          <Button onClick={handleClickChart2}>Add Table2</Button>
        </div>
        <GridLayout className="layout" layout={layout} cols={24} rowHeight={30} width={1300}>
          {/*sets the size of the grid*/}
          <div key="a" className="BarBar" id = "myBar"><BarBar/></div>
          <div key="b" className="Info" id="chart1"><Info/></div>
          <div key="c" className="Info2" id = "chart2"><Info2/></div>
        </GridLayout>
      </div>
    );
  }
}
export default Grid;
