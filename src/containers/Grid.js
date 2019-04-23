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

      

      this.handleClickUpdateBar = this.handleClickUpdateBar.bind(this);
      this.handleClickUpdateTable = this.handleClickUpdateTable.bind(this);
      this.handleClickUpdateTrending = this.handleClickUpdateTrending.bind(this);
    };



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
