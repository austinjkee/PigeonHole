/*
*   Front End of the Pigeon Hole Twitter Dashboard.
*   Authentication by Austin Kee <austinjkee-at-ufl-dot-edu> and Tyler Maiello <tmaiello-at-ufl-dot-edu>
*   Dashboard by Teresa Cheung <tcheung15-at-ufl-dot-edu>, Ganna Voytseshko <gvoytseshko-at-ufl-dot-edu> and Austin Kee <austinjkee-at-ufl-dot-edu>
*/

import React from 'react';
import Cookies from 'js-cookie';
import RGL, {WidthProvider} from 'react-grid-layout';
import ReactDOM from 'react-dom';
import { Form, Button, Container, Row, Col, ButtonToolbar, Table, Nav, NavDropdown} from 'react-bootstrap';
import { } from 'reactstrap';
import Bar from './containers/Bar';
import Info from './containers/Info';
import TweetTable from './containers/Table';
import './css/gridLayoutStyle.css';
import './css/resizableStyle.css';

const bcrypt = require('bcryptjs'),
     fetch = require('node-fetch');

const ReactGridLayout = WidthProvider(RGL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        uname: '',
        pword: '',
        name: '',
        surname: '',
        email: '',
        vpword: '',
        agree: false,
        creatingAccount: false,
        loggedIn: false,
        data: [],
        trends: [],
        statuses: [],
        query: '',
    };

    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.handlePwordChange = this.handlePwordChange.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleVPwordChange = this.handleVPwordChange.bind(this);
    this.handleAgreeChange = this.handleAgreeChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);

    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.callBackendAPI2 = this.callBackendAPI2.bind(this);
    this.callBackendAPI3 = this.callBackendAPI3.bind(this);

    this.handleClickChart = this.handleClickChart.bind(this);
    this.handleClickTable = this.handleClickTable.bind(this);
    this.handleClickTrending = this.handleClickTrending.bind(this);

    this.handleClickUpdateChart = this.handleClickUpdateChart.bind(this);
    this.handleClickUpdateTable = this.handleClickUpdateTable.bind(this);
    this.handleClickUpdateTrending = this.handleClickUpdateTrending.bind(this);

    this.handleLogout = this.handleLogout.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleUnameChange(event) {
    this.setState({uname: event.target.value});
  }

  handlePwordChange(event) {
    this.setState({pword: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSurnameChange(event) {
    this.setState({surname: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleVPwordChange(event) {
    this.setState({vpword: event.target.value});
  }

  handleAgreeChange(event) {
    this.setState({agree: event.target.checked});
  }

  handleQueryChange(event) {
    this.setState({query: event.target.value});
    console.log("Search", this.state.query);
    this.handleClickUpdateTrending();
  }

  handleSubmit(event) {
    if(this.state.uname === '' || this.state.pword === ''){
        alert('Missing fields!');
    }
    else{
        const packet ={
            uname: this.state.uname,
            pword: this.state.pword,
        };
        fetch('db/verif', {
            method: 'POST',
            mode: 'same-origin',
            redirect: 'follow',
            credentials: 'include',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(packet),
        })
        .then(res => {return res;})
        .then(res => {
            var dat = res.statusText;
            if (dat === "BAD"){
                alert("Bad username or password.  Please try again.");
            }
            else if (dat === "GOOD"){
                this.setState({loggedIn: true});
                // Call our fetch functions
                this.handleClickUpdateChart();
                this.handleClickUpdateTable();
                this.handleClickUpdateTrending();
            }
            else{
                alert("Error: There was a problem contacting the database.  Please try again later.");
            }
            console.log('Success:', res);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error: There was a problem contacting the database.  Please try again later.");
        });
    }
    event.preventDefault();
  }

  handleCancel(event) {
      this.setState({creatingAccount: false});
      event.preventDefault();
  }

  handleAdd(event) {
      this.setState({creatingAccount: true});
      event.preventDefault();
  }

  handleAddSubmit(event){
      const packet = {
          uname: this.state.uname,
          pword: this.state.pword,
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
      }
      //Check to make sure the form is filled out.
      if(packet.uname !== '' && packet.name !== '' && packet.surname !== '' && packet.email !== '' && packet.pword !== ''){
          //Check to make sure the password meets the requirements
          if(packet.pword !== this.state.vpword){
              alert("Your passwords don't match.");
          }
          else if(packet.pword.length < 8){
              alert("Your password must be at least 8 characters long.");
          }
          else if (packet.pword.length > 71){
              alert("Your password must be shorter than 71 characters long.");
          }
          else{
              var hashedPacket = packet;
              var context = this;
              // store password as it is taken in from the LOGIN/CREATION page here.
              //THIS METHOD IS ACCOUNT CREATION. (do not forget username as well for storing in DB)
              bcrypt.hash(packet.pword, 10, function(err, hash){
                  //store the "hash" into the database along with the username.
                  if(err){
                      console.error("Error:", err);
                  }
                  else{
                      hashedPacket.pword = hash;
                      console.log(hashedPacket);
                      fetch('db/create',{
                            method: 'POST',
                            redirect: 'follow',
                            mode: 'same-origin',
                            credentials: 'include',
                            body : JSON.stringify(hashedPacket),
                            headers:{
                                'Content-Type': 'application/json',
                            },
                      })
                      .then(res => {return res})
                      .then(res => {
                          var dat = res.statusText;
                          if(dat === "SUCCESS"){
                               context.setState({loggedIn: true});
                               // Call our fetch functions
                               this.handleClickUpdateChart();
                               this.handleClickUpdateTable();
                               this.handleClickUpdateTrending();
                          }
                          else if(dat === "FAIL"){
                                alert("This username is already taken.");
                          }
                          else{
                                alert("Error: There was a problem contacting the database.  Please try again later.");
                          }
                          console.log('Success:', res);
                       })
                       .catch(error => console.error('Error:', error));
                  }
              });
          }
      }
      else{
          alert("Please fill out all required fields.");
      }

      event.preventDefault();

  }

  handleLogout(){
      Cookies.remove('uname', { path: '' });
      Cookies.remove('clientkey', { path: '' });
      Cookies.remove('tcache', { path: '' });
      Cookies.remove('dcache', { path: '' });
      Cookies.remove('scache', { path: '' });
  }

  handleClickChart() {
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

  handleClickUpdateChart() {
      //if(Cookies.get('tcache') === undefined){
      this.callBackendAPI2()
        .then(res => this.setState({ trends: res.trends[0].trends }))
        .catch(err => console.log(err));
    //}
  }

  handleClickUpdateTable() {
      //if(Cookies.get('dcache') === undefined){
      this.callBackendAPI()
        .then(function(res) {
            this.setState({ data: res.express.id });
        })
        .catch(err => console.log(err));
    //}
  }

  handleClickUpdateTrending() {
      //if(Cookies.get('scache') === undefined){
      this.callBackendAPI3()
        .then(function(res) {
            this.setState({ statuses: res.trends.statuses });
            console.log(res.trends.statuses);
        })
        .catch(err => console.log(err));
    //}
  }

  componentDidMount() {
      var user = Cookies.get('uname');
      if(user !== undefined && user !== ''){
          this.setState({loggedIn: true});
          this.handleClickUpdateChart();
          this.handleClickUpdateTable();
          this.handleClickUpdateTrending();
      }
  }

   // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
 async callBackendAPI() {
   const response = await fetch('db/twitter/1016078154497048576');

   //console.log(response);
   const body = await response.json();
   //console.log(body);

   if (response.status !== 200) {
     throw Error(body.message)
   }
   return body;
 };

 async callBackendAPI2() {
   const respo = await fetch('db/trends/638242');

   //console.log(respo);
   const body = await respo.json();
   console.log(body);
   console.log(body.trends[0]);
   //var b = JSON.stringify(body);
   //console.log(body.as_of);

   if (respo.status !== 200) {
     throw Error(body.message)
   }
   return body;
 };

 async callBackendAPI3() {
  const respo = await fetch('db/search/' + this.state.query);
  console.log("3 has been called");

  //console.log(respo);
  const body = await respo.json();
  //console.log(body);
  //console.log(body.trends[0]);
  //var b = JSON.stringify(body);
  console.log("Search",body);
  //console.log(body[0].as_of);

  if (respo.status !== 200) {
    throw Error(body.message)
  }
  return body;
};

  render() {
    const creatingAccount = this.state.creatingAccount;
    const loggedIn = this.state.loggedIn;
    const agree = this.state.agree;

    let display;
    let header;

    if (!loggedIn){
        header = (
            <div className="login">
                <span style={{position:"relative", float:"left", top:"45%", left:"2%"}}>P I G E O N&nbsp;&nbsp;&nbsp;&nbsp;H O L E</span>
                <img id="logo" src="./resources/drawing.svg" alt="" align="right"/>
            </div>
        );
        if(!creatingAccount){
            display = (
                <div align="center">
                    <div id="text-fields" align="center">
                    <Form onSubmit={this.handleSubmit}>
                        <h2 style={{color: `rgb(255, 255, 255)`}}> L O G I N </h2>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Control type="text" placeholder="U S E R N A M E" value={this.state.uname} onChange={this.handleUnameChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="P A S S W O R D" value={this.state.pword} onChange={this.handlePwordChange} />
                        </Form.Group>

                        <Button variant="outline-light" type="Submit">
                        Sign In
                        </Button>

                        <div className="divider"/>

                        <Button variant="outline-light" onClick={this.handleAdd}>
                        Create Account
                        </Button>
                    </Form>
                    </div>
                </div>
            );
        }
        else{
            display = (
                <div align="center">
                    <div id="text-fields" align="center">
                    <Form  onSubmit={this.handleAddSubmit}>
                        <h2 style={{color: `rgb(255, 255, 255)`}}> S I G N - U P </h2>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label><span style={{color: `rgb(255, 255, 255)`}}>Username </span><span style={{color: `rgb(255, 0, 0)`}}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={this.state.uname} onChange={this.handleUnameChange} />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                            <Form.Group controlId="formBasicName">
                                <Form.Label><span style={{color: `rgb(255, 255, 255)`}}>First Name </span><span style={{color: `rgb(255, 0, 0)`}}>*</span></Form.Label>
                                <Form.Control type="text" placeholder="First name" value={this.state.name} onChange={this.handleNameChange}/>
                            </Form.Group>
                            </Col>

                            <Col>
                            <Form.Group controlId="formBasicName">
                                <Form.Label><span style={{color: `rgb(255, 255, 255)`}}>Last Name </span><span style={{color: `rgb(255, 0, 0)`}}>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Last name" value={this.state.surname} onChange={this.handleSurnameChange}/>
                            </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><span style={{color: `rgb(255, 255, 255)`}}>Email address </span><span style={{color: `rgb(255, 0, 0)`}}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><span style={{color: `rgb(255, 255, 255)`}}>Password </span><span style={{color: `rgb(255, 0, 0)`}}>*</span></Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={this.state.pword} onChange={this.handlePwordChange}/>
                        </Form.Group>

                        <Form.Group controlId="formPasswordCheck">
                            <Form.Label><span style={{color: `rgb(255, 255, 255)`}}>Confirm Password </span><span style={{color: `rgb(255, 0, 0)`}}>*</span></Form.Label>
                            <Form.Control type="password" placeholder="Enter password again" value={this.state.vpword} onChange={this.handleVPwordChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="I agree to not abuse this service in any way." style={{color: `rgb(255, 255, 255)`, left: '20px'}} value={this.state.agree} onChange={this.handleAgreeChange}/>
                        </Form.Group>

                        <Button variant="outline-light" type="Submit" className={agree ? "visible" : "collapse"}>
                        Sign Up
                        </Button>

                        <Button variant="outline-light" onClick={this.handleCancel} className={agree ? "collapse" : "visible"}>
                        Cancel
                        </Button>

                        <Form.Text className="text-muted">
                        <span style={{color: `rgb(255, 0, 0)`}}>*</span>
                        <span style={{color: `rgb(255, 255, 255)`}}> Required Fields</span>
                        </Form.Text>

                        <ul></ul>

                        <Form.Text className="text-muted">
                        <span style={{color: `rgb(255, 255, 255)`}}>We'll never willingly share your information with anyone else.</span>
                        </Form.Text>

                    </Form>
                    </div>
                </div>
            );
        }
    }
    else{
        header = (
                <Nav variant="pills" id="navbar">
                            <Nav.Item>
                                <img id="navbarBrand" src="resources/drawing.svg" alt=""/>
                            </Nav.Item>
                            <NavDropdown className="dashbar" title="Chart">
                                <NavDropdown.Item onClick={this.handleClickChart}>Toggle Chart View</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={this.handleClickUpdateChart}>Update Chart</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="dashbar" title="Table">
                                <NavDropdown.Item onClick={this.handleClickTable}>Toggle Table View</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={this.handleClickUpdateTrending}>Update Table</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="dashbar" title="Trending">
                                <NavDropdown.Item onClick={this.handleClickTrending}>Toggle Trending View</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={this.handleClickUpdateChart}>Update Trending</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item className="dashbar">
                                <Form>
                                    <Form.Group controlId="formBasicSearch" value={this.state.query} onChange={this.handleQueryChange}>
                                        <Form.Control type="text" placeholder="s e a r c h  t w e e t s" />
                                    </Form.Group>
                                </Form>
                            </Nav.Item>
                            <Nav.Item className="searchbar">
                                <Button variant="outline-primary" type="Submit">
                                Search
                                </Button>
                            </Nav.Item>
                    <Nav.Item className="ml-auto logout">
                            <Button  variant="outline-primary" href='/' onClick={this.handleLogout}>
                                Log Out
                            </Button>
                    </Nav.Item>
                </Nav>
        );
        const layout = [
             {i: 'a', x: 1, y: 0, w: 8, h: 9.5, minW: 9, maxW: 9, minH: 9.5, maxH: 9.5/*static: true /*static item*/},
             {i: 'b', x: 9.5, y: 0, w: 13, h: 7.5, minW: 13, minH: 7.5 /*restrict the size of the item with min/max*/},
             {i: 'c', x: 9.5, y: 12.5, w: 13, h: 7.5, minW: 13, minH: 7.5 /*does whatever it wants*/}
        ];
        display = (
            <ReactGridLayout className="layout" layout={layout} cols={24} rowHeight={30} width={1300}>
              {/*sets the size of the grid*/}
              <div key="a" className="Bar" id="barChart"><Bar info={this.state.trends}/></div>
              <div key="b" className="Info" id="trendingChart"><Info info={this.state.trends}/></div>
              <div key="c" className="Table" id="tableChart"><TweetTable info={this.state.search}/></div>
            </ReactGridLayout>
        );
    }

    return (
        <>
        {header}
        {display}
        </>
    );
  }
}
export default App
