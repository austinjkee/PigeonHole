import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import '../css/gridLayoutStyle.css';
import '../css/resizableStyle.css';
import Bar from './TrendBar.js';
import Info from './Info.js';
import WTable from './TrendTable.js';

class Grid extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            trends: null,
        };
        this.handleClickBar = this.handleClickBar.bind(this);
        this.handleClickTable = this.handleClickTable.bind(this);
        this.handleClickTrending = this.handleClickTrending.bind(this);

        this.handleClickUpdateBar = this.handleClickUpdateBar.bind(this);
        this.handleClickUpdateTable = this.handleClickUpdateTable.bind(this);
        this.handleClickUpdateTrending = this.handleClickUpdateTrending.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);
    }

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

    componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
          //console.log("aasdfasdf:", res.express);
          this.setState({ data: res.express.id })
      })
      .catch(err => console.log(err));

      this.callBackendAPI2()
        .then(res => {
            //console.log("qwerdtf:", res.trends);
            this.setState({ trends: res })
        })
        .catch(err => console.log(err));

        this.callBackendAPI3()
          .then(res => {
              console.log("qwerdtf:", res.trends);
              this.setState(
              { search: res })})

          .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('db/twitter/1016078154497048576');

    //console.log(response);
    const body = await response.json();
    //console.log(body);

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  callBackendAPI2 = async () => {
    const respo = await fetch('http://localhost:3001/trends/638242');

    //console.log(respo);
    const body = await respo.json();
    console.log(body);
    console.log(body.trends[0]);
    var b = JSON.stringify(body);
    //console.log(body[0].as_of);

    if (respo.status !== 200) {
      throw Error(body.message)
    }
    return b;
  };

  callBackendAPI3 = async () => {
   const respo = await fetch('/search/nasa');
   console.log("3 has been called");

   //console.log(respo);
   const body = await respo.json();
   console.log(body);
   //console.log(body.trends[0]);
   var b = JSON.stringify(body);
   //console.log(body[0].as_of);

   if (respo.status !== 200) {
     throw Error(body.message)
   }
   return b;
 };

  render() {
    //https://github.com/STRML/react-grid-layout
    var layout = [
      {i: 'a', x: 0, y: 0, w: 11, h: 11.5, minW: 11, maxW: 11, minH: 11.5, maxH: 11.5/*static: true /*static item*/},
      {i: 'b', x: 11, y: 0, w: 6, h: 6, minW: 6, minH: 6 /*restrict the size of the item with min/max*/},
      {i: 'c', x: 17, y: 0, w: 3, h: 3 /*does whatever it wants*/}
    ];
    function handleClick() {
      alert("An element should be added.");
    }

    return (
      <div className="grid-bounds">
        <GridLayout className="layout" layout={layout} cols={22} rowHeight={30} width={1400}>
          {/*sets the size of the grid*/}
          <div key="a" id="barChart" className="BarBar"><Bar info={this.state.trends}/></div>
          <div key="b" id="tableChart" className="Info"><Info info={this.state.trends}/></div>
          <div key="c" id="trendingChart" className="Info2"><WTable info={this.state.trends}/></div>
        </GridLayout>
      </div>
    );
  }
}
export default Grid;
