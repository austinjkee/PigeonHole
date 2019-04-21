/*
*   Front End of the Pigeon Hole Twitter Dashboard.
*   Authentication by Austin Kee <austinjkee@ufl.edu> and Tyler Maiello <tmaiello@ufl.edu>
*   Dashboard by Teresa Cheung <tcheung15@ufl.edu> and Austin Kee <austinjkee@ufl.edu>
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Col, ButtonToolbar, Table } from 'react-bootstrap';
import Bar from './containers/Bar';
import Grid from './containers/Grid';
import Info from './containers/Info';


const bcrypt = require('bcryptjs'),
    fetch = require('node-fetch');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {uname: '', pword: '', name: '', surname: '', email: '', vpword: '', agree: false, creatingAccount: false, loggedIn: false};

    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.handlePwordChange = this.handlePwordChange.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleVPwordChange = this.handleVPwordChange.bind(this);
    this.handleAgreeChange = this.handleAgreeChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
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

  handleSubmit(event) {
    if(this.state.uname === '' || this.state.pword === ''){
        alert('Missing fields!');
    }
    else{
        var packet;
        //bcrypt.hash(this.state.pword, 10, function(err, hash) {
            packet = {uname: this.state.uname, pword: this.state.pword};
        //});
        var dat = fetch('/db/check',{
            method: 'post',
            body : JSON.stringify(packet),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));

        if(dat !== undefined && dat.id !== undefined){
            //Passed the test!  Go to dash!
            this.setState({loggedIn: true});
        }
        else{
            alert('Bad username or password.');
        }
    }
    /*
    //now to "compare" when pulling from the database. First, match username in the database and pull down the hashed password.
    //store the hashed password corresponding to the username's that match into the "hash" variable.
    //THIS WILL BE THE PASSWORD OF WHATEVER IS STORED IN THE DB AFTER MATCHING USERNAMES.
    bcrypt.compare(this.state.pword, hash, function(err, res) {
        if(res) {
            //If passwords match, we are in!
            //route user into the site.
        }
        else {
            //print out some sort of error, invalid password
            //clear fields, start over.
        }
    });
    */
    event.preventDefault();
  }

  handleAdd(event) {
      this.setState({creatingAccount: true});
      event.preventDefault();
  }

  handleAddSubmit(event){
      var packet;
      //bcrypt.hash(this.state.pword, 10, function(err, hash) {
          //account creation
          packet = {id: 10, uname: this.state.uname, pword: this.state.pword};
      //});
      fetch('/db/create',{
          method: 'put',
          body : JSON.stringify(packet),
          headers:{
              'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
      //window.location.href = "http://team5-pigeonhole.s3-website-us-east-1.amazonaws.com/";
      this.setState({loggedIn: true});

      // store password as it is taken in from the LOGIN/CREATION page here.
      //THIS METHOD IS ACCOUNT CREATION. (do not forget username as well for storing in DB)
      bcrypt.hash(this.state.pword, 0, function(err, hash){
          //store the "hash" into the database along with the username.
      });
      event.preventDefault();

  }

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
            );
        }
        else{
            display = (
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

                        <Button variant="outline-light" type="Submit" className={agree ? "collapse.show" : "collapse"}>
                        Sign In
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
            );
        }
    }
    else{
        header = (
            <header class="navbar navbar-default fixed-top navbar-inner home">
                <nav class="hidden-ms navbar-light navbar-expand-lg navbar-header" ng-controller="ViewController">
                    <ul class="nav navbar-nav">
                        <a href="#top" role="button" class="navbar-brand">
                            <img id="navbarBrand" src="resources/drawing.svg"/>
                        </a>
                        <div class="navbar navbar-default navbar-header" id="navbarDesktop">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Widgets
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#chart">Chart</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#toptweet">Top Tweet</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#map">Map</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#" role="button" class="nav-link">
                                    <li>Beep</li>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#about" role="button" class="nav-link">
                                    <li>Boop</li>
                                </a>
                            </li>
                        </div>
                    </ul>
                </nav>
                <nav class="hidden-ms navbar-light navbar-expand-lg ml-auto">
                    <ul class="nav navbar-nav">
                        <li class="nav-item">
                            <a href="/" role="button" class="nav-link">
                                <li>Log Out</li>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
        display = (
            <div className="App">
              <h1>Widget Dashboard</h1>

              <Grid/>

              <p className="App-intro">{this.state.data}</p>
            </div>
        );

    }

    return (
        <>
        {header}
        <div align="center">
            <div id="text-fields" align="center">
                {display}
            </div>
        </div>
        </>
    );
  }
}
export default App
