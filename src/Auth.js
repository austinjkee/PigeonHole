import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button } from 'react-bootstrap';

const bcrypt = require('bcryptjs'),
    fetch = require('node-fetch');

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {uname: '', pword: ''};

    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.handlePwordChange = this.handlePwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleUnameChange(event) {
    this.setState({uname: event.target.value});
  }

  handlePwordChange(event) {
    this.setState({pword: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.uname == '' || this.state.pword == ''){
        alert('Missing fields!');
    }
    else{
        var packet;
        //bcrypt.hash(this.state.pword, 10, function(err, hash) {
            packet = {uname: this.state.uname, pword: this.state.pword};
        //});
        var dat = fetch('http://localhost:3001/check',{
            method: 'post',
            body : JSON.stringify(packet),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));

        if(dat != undefined && dat.id != undefined){
            //Passed the test!  Go to dash!
            //window.location.href = "http://team5-pigeonhole.s3-website-us-east-1.amazonaws.com/";
            window.location.pathname = "/dash/";
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
    if(this.state.uname == '' || this.state.pword == ''){
        alert('Missing fields!');
    }
    else{
        var packet;
        //bcrypt.hash(this.state.pword, 10, function(err, hash) {
            //account creation
            packet = {id: 10, uname: this.state.uname, pword: this.state.pword};
        //});
        fetch('http://localhost:3001/create',{
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
        window.location.pathname = "/dash/";

    }
    // store password as it is taken in from the LOGIN/CREATION page here.
    //THIS METHOD IS ACCOUNT CREATION. (do not forget username as well for storing in DB)
    bcrypt.hash(this.state.pword, 0, function(err, hash){
        //store the "hash" into the database along with the username.
    });
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <div id="text-fields" align="center">
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control type="text" placeholder="U S E R N A M E" value={this.state.uname} onChange={this.handleUnameChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="P A S S W O R D" value={this.state.pword} onChange={this.handlePwordChange} />
                </Form.Group>
            </Form>
        </div>
        <div id="buttons">
            <br />
                <Button variant="outline-light" type="Submit">
                Sign In
                </Button>
            <br />
            <br />
                <Button variant="outline-light" onClick={this.handleAdd}>
                Create Account
                </Button>
            <br />
        </div>
        </form>
    );
  }
}
export default Auth
