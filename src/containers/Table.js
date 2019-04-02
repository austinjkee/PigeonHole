import React, {Component} from "react";
import { Button, ButtonToolbar, Table } from 'react-bootstrap';

import * as data from '../json/search_university.json';

const stuff = data[0].name;
console.log(stuff);

class Info2 extends Component{
  render(){
    function hi(){
      console.log("hi");
    }
    return(
      <div>
          <div className="Info">
              <table class="table">
                  <thead class="thead-dark">
                  <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Tweet</th>
                      <th scope="col">Time</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Twitter University</th>
                      <th>SRT @ElliottSaslow: TWITTER ELECTION INTEGRITY DATASETS\n\nWe are very lucky @galvanize to be hosting @Twitter\u2019s own @ivantures discussing the\u2026</th>
                      <th>Fri Feb 22 22:45:04 +0000 2019</th>
                    </tr>
                    <tr>
                      <th>Columbia University</th>
                      <th>RT @Columbia_Biz: Tomorrow\u2019s business leaders are today\u2019s MBAs. This week on @ColumbiaBizcast: Why Dean Glenn Hubbard believes \"we\u2019re in ex\u2026</th>
                      <th>Tue Feb 26 17:54:54 +0000 2019</th>
                    </tr>
                  </tbody>
              </table>
          </div>
      </div>
    );
  }
}

export default Info2;
