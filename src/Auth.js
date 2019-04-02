import React from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

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
        //Bcrypt.hash(this.state.pword, 10, function(err, hash) {
            packet = {uname: this.state.uname, pword: this.state.pword};
        //});
        var dat = fetch('/check',{
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
            var landing = document.getElementById("landing");
            landing.classList.add("hide");
            var element = document.getElementById("dash");
            element.classList.add("authorized");
        }
        else{
            alert('Bad username or password.');
        }
    }
    event.preventDefault();
  }

  handleAdd(event) {
    if(this.state.uname == '' || this.state.pword == ''){
        alert('Missing fields!');
    }
    else{
        var packet;
        //Bcrypt.hash(this.state.pword, 10, function(err, hash) {
            //account creation
            packet = {id: 10, uname: this.state.uname, pword: this.state.pword};
        //});
        fetch('/create',{
            method: 'put',
            body : JSON.stringify(packet),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));

        var landing = document.getElementById("landing");
        landing.classList.add("hide");
        var element = document.getElementById("dash");
        element.classList.add("authorized");
    }
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <div id="text-fields">
            <br />
                <input className="login-text" type="text" name="username" placeholder="U S E R N A M E" value={this.state.uname} onChange={this.handleUnameChange} />
            <br />
            <br />
                <input className="login-text" type="password" name="password" placeholder="P A S S W O R D" value={this.state.pword} onChange={this.handlePwordChange} />
            <br />
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
