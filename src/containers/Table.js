import React, { Component } from 'react';
import Cookies from 'js-cookie';

class TweetTable extends Component {
    constructor() {
        super()
        this.state = {
            data: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidMount() {
        const z = this.props.info;
        console.log("Search Mounted.", this.props.info);
        Cookies.set('search', z, { maxAge: 90000 });
    }

    componentDidUpdate() {
        const z = this.props.info;
        console.log("Search Updated.", this.props.info);
        Cookies.set('search', z, { maxAge: 90000 });
    }

  render() {
      const z = this.props.info;
      var qwerty = '';
      if( z !== []){
          console.log("object that was in cookie.", z);
          qwerty = z.map((item, i) => {
              console.log(item.name);
              return (
                  <tr>
                      <td>{item.user.name}</td>
                      <td>{item.full_text}</td>
                      <td>{item.favorite_count}</td>
                      <td>{item.retweet_count}</td>
                  </tr>
              );
          });
      }
      else{
          qwerty = () => {
             return (<></>);
          };
      }

    return (

        <div>
        <div>
        </div>
          <div className="Info">
              <table class="table">
                  <thead class="thead-dark">
                      <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Tweet</th>
                          <th scope="col">Favorite Count</th>
                          <th scope="col">Retweet Count</th>
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
 export default TweetTable;
