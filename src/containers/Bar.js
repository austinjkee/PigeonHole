import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'

class TrendBar extends React.Component{
    constructor() {
        super();
        this.state = {
            data: null,
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    componentDidMount(){

    }

    shouldComponentUpdate(nextProps) {
        const differentTrends = this.props.info !== nextProps.info;
        return differentTrends;
    }

    render(){
      var z = this.props.info;
      //var z = JSON.parse(w);
      console.log("The Data Passed To Bar",z);
      let qwerty = "";
      //console.log("object", z);

      let data=[];


      if (z != null)
      {
          console.log("z is not null");
          //this.setState({data: z});

        if (z != null)
        {
            console.log("qwert");
            //qwerty = z.trends[0].trends;
            qwerty = JSON.stringify(z);
            data = z;
            //data.sort("tweet_volume");
            data.sort((a, b) => a.tweet_volume < b.tweet_volume);
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
    <ResponsiveBar
    position="absolute"
    maxHeight={"70%"}
    maxWidth={"80%"}
    data={data}
    keys={[
        "tweet_volume"
    ]}
    indexBy="name"
    margin={{
        "top": 10,
        "right": 10,
        "bottom": 10,
        "left": 10
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
        "tickRotation": -50,
        "legend": "country",
        "legendPosition": "middle",
        "legendOffset": 70
    }}
    axisLeft={{
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "tweet volume",
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
  );
}
}

export default TrendBar
