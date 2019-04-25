import React, { Component } from 'react';

class SearchTable extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
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
          console.log("z is not null in search");
          console.log("object search", z);
          console.log("object within:", z.trends.statuses);
          //this.setState({data: z});

        if (z.trends.statuses != null)
        {
          qwerty = z.trends.statuses.map((item, i) => {
              //console.log(item.name);
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
 export default SearchTable;
