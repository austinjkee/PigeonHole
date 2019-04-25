import React, {Component} from "react";
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Cookies from 'js-cookie';

//const Info = () => (
class Info extends Component {
    constructor() {
        super()
        this.state = {
            data: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    componentDidMount(){
        var tcache = Cookies.get('tcache');
        this.setState({data: tcache});
    }

    shouldComponentUpdate(nextProps) {
        const differentTrends = this.data !== nextProps.info;
        return differentTrends;
    }

    render() {
      var z = this.props.info
      let qwerty = "";
      console.log("object", z);
      if (z != null)
      {
          this.setState({data: this.props.info});
          console.log("z is not null");

        if (z != null)
        {
          this.state.data.sort((a, b) => a.tweet_volume < b.tweet_volume);
          this.state.data = this.state.data.slice(0, 10);
          qwerty = this.state.data.map((item, i) => {
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
