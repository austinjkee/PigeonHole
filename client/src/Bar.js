import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'

class Bar extends React.Component{
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

      let data=[];


      if (z != null)
      {
          console.log("z is not null");
          //this.setState({data: z});

        if (z.trends[0].trends != null)
        {
            console.log("qwert");
            //qwerty = z.trends[0].trends;
            qwerty = JSON.stringify(z.trends[0].trends);
            data = z.trends[0].trends;
            //data.sort("tweet_volume");
            data.sort((a, b) => a.tweet_volume < b.tweet_volume);
            console.log("after sort", data);
            data = data.slice(0, 10);

            //console.log(qwerty);
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
        "tweet_volume"
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
            "rotation": -45,
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

export default Bar
