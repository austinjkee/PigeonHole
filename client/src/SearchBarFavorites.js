import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'

class SearchBarFavorites extends React.Component{
    constructor() {
        super()
        this.state = {
            data: null
        }
    }

    componentDidMount(){
      let {clientHeight, clientWidth} = this.refs.BarBar;
      console.log(clientHeight, clientWidth);
    }
    render(){
        var w = this.props.info
      var z = JSON.parse(w);
      let qwerty = "";
      //console.log("object", z);

      let data2=[];
      let name=[];
      let data=[];


      if (z != null)
      {
          console.log("z is not null");
          //this.setState({data: z});

        if (z.trends.statuses != null)
        {
            console.log("search bar favorites");
            //qwerty = z.trends[0].trends;
            qwerty = JSON.stringify(z.trends.statuses);
            data2 = z.trends.statuses;
            //data.sort("tweet_volume");
            data2.sort((a, b) => a.favorite_count < b.favorite_count);
            data2 = data2.slice(0, 20);


            qwerty = z.trends.statuses.map((item, i) => {
                var obj = new Object();
                obj.name = item.user.name;
                obj.favorite_count = item.favorite_count
                data.push(obj);
                });

                console.log("data1", data);

            console.log("data", data2);
            //name = data.user;
          // qwerty = z.trends[0].trends.map((item, i) => {
          //     console.log(item.name);
          //       return (
          //           <tr>
          //               <td>{item.name}</td>
          //               <td>{item.tweet_volume}</td>
          //           </tr>
          //
          //       );
          //     });
           }

      }



      return(
    <div ref="BarBar" style={{height: '25em', width: '40em'}}>
    <ResponsiveBar
    data={data}
    keys={[
        "favorite_count"
    ]}
    indexBy="name"
    margin={{
        "top": 50,
        "right": 130,
        "bottom": 50,
        "left": 60
    }}
    padding={0.3}
    colors="#38bcb2"
    colorBy="index"
    color= "#38bcb2"
    defs={[
        {
            "id": "dots",
            "type": "patternDots",
            "background": "inherit",
            "color": "#38bcb2",
            "size": 4,
            "padding": 1,
            "stagger": true
        },
        {
            "id": "lines",
            "type": "patternLines",
            "background": "inherit",
            "color": "#eed312",
            "rotation": -15,
            "lineWidth": 6,
            "spacing": 10
        }
    ]}

    borderColor="inherit:darker(1.6)"

    axisBottom={{
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": -15,
        "legend": "",
        "legendPosition": "middle",
        "legendOffset": 50
    }}
    axisLeft={{
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "",
        "legendPosition": "middle",
        "legendOffset": -70
    }}
    enableLabel={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="inherit:darker(1.6)"
    animate={true}
    motionStiffness={90}
    motionDamping={15}

/>
    </div>
  );
}
}

export default SearchBarFavorites
