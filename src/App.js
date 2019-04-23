/*
*   Front End of the Pigeon Hole Twitter Dashboard.
*   Authentication by Austin Kee <austinjkee-at-ufl-dot-edu> and Tyler Maiello <tmaiello-at-ufl-dot-edu>
*   Dashboard by Teresa Cheung <tcheung15-at-ufl-dot-edu>, Ganna Voytseshko <gvoytseshko-at-ufl-dot-edu> and Austin Kee <austinjkee-at-ufl-dot-edu>
*/

import React from 'react';
import Cookies from 'js-cookie';
import RGL, {WidthProvider} from 'react-grid-layout';
import ReactDOM from 'react-dom';
import { Form, Button, Container, Row, Col, ButtonToolbar, Table} from 'react-bootstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Bar from './containers/Bar';
import Grid from './containers/Grid';
import Info from './containers/Info';
import WTable from './containers/Table';

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
        data: null,
    };

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
            }
            else{
                alert("ah");
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

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
          console.log("Success:", res.express);
          this.setState(
          { data: res.express.id })})

      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/twitter');
    console.log(response);
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) {
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
                    </div>
                </div>
            );
        }
    }
    else{
        header = (
            <header className="navbar navbar-default fixed-top navbar-inner home">
                <nav className="hidden-xs navbar-light navbar-expand-lg navbar-header">
                    <ul className="nav navbar-nav">
                        <Container className="navbar navbar-default navbar-header">
                            <Col href="#top" role="button" className="navbar-brand">
                                <img id="navbarBrand" src="resources/drawing.svg" alt=""/>
                            </Col>
                            <Col className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Chart
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" onClick={Grid.handleClickBar}>Toggle Chart View</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={Grid.handleClickUpdateChart}>Update Chart</a>
                                </div>
                            </Col>
                            <Col className="nav-item">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Table
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" onClick={Grid.handleClickTable}>Toggle Table View</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={Grid.handleClickUpdateTable}>Update Table</a>
                                </div>
                            </Col>
                            <Col className="nav-item">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Trending
                                </a>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <div onClick={Grid.handleClickTrending}>
                                            Toggle Trending View
                                        </div>
                                    </DropdownItem>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={Grid.handleClickUpdateTrending}>Update Table</a>
                                </DropdownMenu>
                            </Col>
                        </Container>
                    </ul>
                </nav>
                <nav className="hidden-ms navbar-light navbar-expand-lg ml-auto">
                    <Container className="nav navbar-nav">
                        <Col className="nav-item">
                            <a href="/" role="button" className="nav-link">
                                <li>Log Out</li>
                            </a>
                        </Col>
                    </Container>
                </nav>
            </header>
        );
        const layout = [
             {i: 'a', x: 1, y: 0, w: 8, h: 9.5, minW: 9, maxW: 9, minH: 9.5, maxH: 9.5/*static: true /*static item*/},
             {i: 'b', x: 9.5, y: 0, w: 13, h: 7.5, minW: 13, minH: 7.5 /*restrict the size of the item with min/max*/},
             {i: 'c', x: 9.5, y: 12.5, w: 13, h: 7.5, minW: 13, minH: 7.5 /*does whatever it wants*/}
        ];
        display = (
            <ReactGridLayout className="layout grid-bounds" layout={layout} cols={24} rowHeight={30} width={1300}>
              {/*sets the size of the grid*/}
              <div key="a" className="Bar" id = "barChart"><Bar/></div>
              <div key="b" className="Info" id= "trendingChart"><Info/></div>
              <div key="c" className="Table" id = "tableChart"><WTable/></div>
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
