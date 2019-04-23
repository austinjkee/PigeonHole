import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cool from './Cool';
import Bar from './Bar';
import SearchTable from './SearchTable'
import SearchBarFavorites from './SearchBarFavorites'
import SearchBarRetweets from './SearchBarRetweets'


class App extends Component {
    constructor(props) {
  super(props);
  this.state = {
      value: '',
      keyword: '',
      trendSearch: '',
  data: null,
  trends: null,
  search: null,
  random: 'RANDOM'};

  this.handleChangeSearch = this.handleChangeSearch.bind(this);
  this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  this.handleChangeTrend = this.handleChangeTrend.bind(this);
  this.handleSubmitTrend = this.handleSubmitTrend.bind(this);
}
// state = {
//     data: null,
//     trends: null,
//     search: null
//   };

  componentDidMount() {
      console.log("VOMPONENT DID MOUNT", this.state.random);
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
          //console.log("aasdfasdf:", res.express);
          this.setState(
          { data: res.express.id })})

      .catch(err => console.log(err));

      this.callBackendAPI2(this.state.trendSearch)
        .then(res => {
            //console.log("qwerdtf:", res.trends);
            this.setState(
            { trends: res })})

        .catch(err => console.log(err));

        this.callBackendAPI3(this.state.keyword)
          .then(res => {
              console.log("qwerdtf:", res.trends);
              this.setState(
              { search: res })})

          .catch(err => console.log(err));
  }

  getData() {
      console.log("getDATA", this.state.keyword);
      return this.state.keyword;
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/twitter/1016078154497048576');
    //const response = await fetch('/search/nasa');

    //console.log(response);
    const body = await response.json();
    //console.log(body);
    //console.log("1");

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  callBackendAPI2 = async (w) => {
    const respo = await fetch('/trends/' + w);

    //console.log(respo);
    const body = await respo.json();
    //console.log(body);
    //console.log(body.trends[0]);
    var b = JSON.stringify(body);
    //console.log(body[0].as_of);

    if (respo.status !== 200) {
      throw Error(body.message)
    }
    return b;
  };

  callBackendAPI3 = async (q) => {
      var t = 'nasa';
      var y = '/search/' + t;
      console.log("T IS HERE", y);
    const respo = await fetch('/search/' + q);
    //console.log("3 has been called");

    console.log("q", q);


    //console.log(respo);
    const body = await respo.json();
    //console.log(body);
    //console.log(body.trends[0]);
    var b = JSON.stringify(body);
    //console.log(body[0].as_of);

    if (respo.status !== 200) {
      throw Error(body.message)
    }
    return b;
  };

  handleChangeSearch(event) {
    this.setState({keyword: event.target.value});
  }

  handleSubmitSearch(event) {
    //alert('Akeyword: ' + this.state.keyword);
    this.componentDidMount();
    event.preventDefault();
  }

  handleChangeTrend(event) {
    this.setState({trendSearch: event.target.value});
  }

  handleSubmitTrend(event) {
      console.log("submit trend", this.state.trendSearch);
    //alert('trend: ' + this.state.trendSearch);
    this.componentDidMount();
    //callBackendAPI3("qwerttr");
    event.preventDefault();
  }

  render() {
      //console.log("render", this.state.search);
    return (
      <div className="App">
      <form onSubmit={this.handleSubmitSearch}>
        <label>
          Keyword:
          <input type="text" value={this.state.keyword} onChange={this.handleChangeSearch} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={this.handleSubmitTrend}>
        <label>
          Trend:
          <input type="text" value={this.state.trendSearch} onChange={this.handleChangeTrend} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <Cool info={this.state.trends}/>
        <Bar info={this.state.trends}/>
        <SearchTable info={this.state.search}/>
        <SearchBarFavorites info={this.state.search}/>
        <SearchBarRetweets info={this.state.search}/>
      </div>
    );
  }
}

export default App;
