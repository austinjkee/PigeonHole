import React, {Component} from "react";
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import ReactTable from "react-table";

//import * as data from '../json/search_university.json';

//const stuff = data[0].name;
//console.log(stuff);

class Info extends Component{
  render(){
    function hi(){
      console.log("hi");
    }
    return(
      <div className="Info">
          <div>
              <Table class="table">
                  <thead class="thead-dark">
                  <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Location</th>
                      <th scope="col">Followers</th>
                      <th scope="col">Friends</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Twitter University</th>
                      <th>San Francisco, CA</th>
                      <th>39260</th>
                      <th>82</th>
                    </tr>
                    <tr>
                      <th>Columbia University</th>
                      <th>New York, New York</th>
                      <th>305118</th>
                      <th>538</th>
                    </tr>
                    <tr>
                      <th>Stanford University</th>
                      <th>Stanford, CA</th>
                      <th>657354</th>
                      <th>512</th>
                    </tr>
                    <tr>
                      <th>Harvard University</th>
                      <th>Cambridge, MA</th>
                      <th>923678</th>
                      <th>768</th>
                    </tr>
                    <tr>
                      <th>Oxford University</th>
                      <th>Oxford, UK</th>
                      <th>499708</th>
                      <th>989</th>
                    </tr>
                  </tbody>
              </Table>
          </div>
      </div>
    );
  }
}

export default Info;
