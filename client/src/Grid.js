/*
*   Toggle chart visibility
*   Authors: Austin Kee <austinjkee-at-ufl-dot-edu> & Teresa Cheung <tcheung15-at-ufl-dot-edu>
*/

import React, { Component } from 'react';
import RGL, {WidthProvider} from 'react-grid-layout';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import '../css/gridLayoutStyle.css';
import '../css/resizableStyle.css';
import Bar from './Bar.js';
import Info from './Info.js';
import WTable from './Table.js';

const ReactGridLayout = WidthProvider(RGL);

class Grid extends Component {

    constructor(props) {
      super(props);

      this.handleClickBar = this.handleClickBar.bind(this);
      this.handleClickTable = this.handleClickTable.bind(this);
      this.handleClickTrending = this.handleClickTrending.bind(this);

      this.handleClickUpdateBar = this.handleClickUpdateBar.bind(this);
      this.handleClickUpdateTable = this.handleClickUpdateTable.bind(this);
      this.handleClickUpdateTrending = this.handleClickUpdateTrending.bind(this);
    };

    handleClickBar() {
      //alert("An element should be added.");
      var x = document.getElementById("barChart");
      if(x.style.display === "none"){
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }

    handleClickTable() {
      //alert("An element should be added.");
      var x = document.getElementById("tableChart");
      if(x.style.display === "none"){
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }

    handleClickTrending() {
      //alert("An element should be added.");
      var x = document.getElementById("trendingChart");
      if(x.style.display === "none"){
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }

    handleClickUpdateBar() {

    }

    handleClickUpdateTable() {

    }

    handleClickUpdateTrending() {

    }

  render() {


    //https://github.com/STRML/react-grid-layout
    return (
        <>
        </>
    );
  }
}
export default Grid;
