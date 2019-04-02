import React from 'react'
import { Button } from 'react-bootstrap';
import { MySQL } from 'mysql';
import { Bcrypt } from 'bcryptjs';

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
        alert('A name was submitted: ' + this.state.uname + this.state.pword);
    }
    event.preventDefault();
  }

  handleAdd(event) {
    alert('An entry was added: ' + this.state.uname + this.state.pword);
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <div id="text-fields">
            <br />
                <input class="login-text" type="text" name="username" placeholder="U S E R N A M E" value={this.state.uname} onChange={this.handleUnameChange} />
            <br />
            <br />
                <input class="login-text" type="password" name="password" placeholder="P A S S W O R D" value={this.state.pword} onChange={this.handlePwordChange} />
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
