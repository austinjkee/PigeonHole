import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import '../css/gridLayoutStyle.css';
import '../css/resizableStyle.css';
import BarBar from './Bar.js';
import Info from './Info.js';

class Grid extends Component {
    state = {
    data: null,
    trends: null
  };

    componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
          //console.log("aasdfasdf:", res.express);
          this.setState(
          { data: res.express.id })})

      .catch(err => console.log(err));

      this.callBackendAPI2()
        .then(res => {
            //console.log("qwerdtf:", res.trends);
            this.setState(
            { trends: res.trends[0].trends })})

        .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/twitter/1016078154497048576');

    //console.log(response);
    const body = await response.json();
    //console.log(body);

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  callBackendAPI2 = async () => {
    const respo = await fetch('/trends/638242');

    //console.log(respo);
    const body = await respo.json();
    console.log(body);
    console.log(body.trends[0]);
    //var b = JSON.stringify(body);
    //console.log(body[0].as_of);

    if (respo.status !== 200) {
      throw Error(body.message)
    }
    return body;
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
      <div>
        <button onClick={handleClick}>Add Graph</button>
        <button onClick={handleClick}>Add Table</button>
        <button onClick={handleClick}>Add Map</button>

        <GridLayout className="layout" layout={layout} cols={20} rowHeight={30} width={1200}>
          {/*sets the size of the grid*/}
          <div key="a" class="BarBar"><BarBar info={this.state.trends}/></div>
          <div key="b" class="Info"><Info info={this.state.trends}/></div>
          <div key="c">c</div>
        </GridLayout>
      </div>
    );
  }
}
export default Grid;
