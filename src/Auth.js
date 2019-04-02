import React from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap';

const Auth = () => (
    <form>
    <div id="text-fields">
        <br />
            <input class="login-text" type="text" name="username" placeholder="U S E R N A M E" />
        <br />
        <br />
            <input class="login-text" type="password" name="password" placeholder="P A S S W O R D" />
        <br />
    </div>
    <div id="buttons">
        <br />
            <input class="login-button" type="submit" name="uauth-submit" value="S I G N  I N" />
        <br />
        <br />
            <input class="login-button" type="submit" name="uauth-create" value="C R E A T E  A C C O U N T" />
        <br />
    </div>
    </form>
)

export default Auth
