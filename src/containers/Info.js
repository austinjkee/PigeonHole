import React, {Component} from "react";
import { Button, ButtonToolbar, Table } from 'react-bootstrap';

//const Info = () => (
class Info extends Component {
    constructor() {
        super()
        this.state = {
            data: null
        }
    }

    render() {
      var z = this.props.info
      let qwerty = "";
      console.log("object", z);
      if (z != null)
      {
          console.log("z is not null");
          //this.setState({data: z});

        if (z.trends[0].trends != null)
        {
          qwerty = z.trends[0].trends.map((item, i) => {
              console.log(item.name);
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.tweet_volume}</td>
                    </tr>

                );
              });
          }

      }
    return (

    <div>
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

export default Info;
