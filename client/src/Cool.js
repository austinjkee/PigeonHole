import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Cool extends Component {
    constructor() {
        super()
        this.state = {
            data: null
        }
        //this.handleSelect = this.handleSelect.bind(this);
    }

  render() {
      var q = JSON.stringify(this.props.info);
      var w = this.props.info
//this.setState({data: w});
      //console.log("w", w);
      //console.log("Asda", w);
      var z = JSON.parse(w);
      let qwerty = "";
      console.log("object", z);
      if (z != null)
      {
          console.log("z is not null");
          console.log("object345", z.trends[0].trends);
          //this.setState({data: z});

        if (z.trends[0].trends != null)
        {
          qwerty = z.trends[0].trends.map((item, i) => {
              //console.log(item.name);
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.tweet_volume}</td>
                    </tr>

                );
              });
          }

      }
      //console.log("object2", JSON.stringify(z));
      // <option key={i} value={item}>
      //   {item.name}{ item.tweet_volume}
      // </option>
      //<th scope="row">1</th>
      //

    return (

        <div>
        <div>
        </div>
          <div className="Info">
              <table class="table">
                  <thead class="thead-dark">
                      <tr>
                          <th scope="col">Trend</th>
                          <th scope="col">Tweet Volume</th>

                      </tr>
                  </thead>
                  <tbody>
                  {qwerty}
                  </tbody>

              </table>

      </div>
  </div>
    );
  }
 }
 export default Cool;
