import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { generateCountriesData } from '@nivo/generators';
import Cookies from 'js-cookie';

class Bar extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidMount(){
        var tcache = Cookies.get('tcache');
        if(tcache !== undefined){
            this.setState({data: JSON.parse(tcache)}, function(){
                console.log("data", this.state.data);
            });
        }
        else{
            var z = this.props.info;

            //var z = JSON.parse(w);
            console.log("The Data Passed To Bar",z);
            let qwerty = "";
            //console.log("object", z);

            if (z != null)
            {
                console.log("The Data Passed To Bar",z);
                //qwerty = z.trends[0].trends;
                //data.sort("tweet_volume");
                var w = z;

                w.sort((a, b) => a.tweet_volume < b.tweet_volume);

                console.log(w);

                var data = w.slice(0, 10);
                this.setState({data: data.toArray()}, () => {
                    Cookies.set('tcache', this.state.data, { maxAge: 90000 });
                    console.log("Lots of Stuff",this.state.data);
                });

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
    }

    componentDidUpdate(){
        var z = this.props.info;

        //var z = JSON.parse(w);
        console.log("The Data Passed To Bar",z);
        let qwerty = "";
        //console.log("object", z);

        if (z != null)
        {
            console.log("Z has contents.");
            //qwerty = z.trends[0].trends;
            //data.sort("tweet_volume");
            var w = z;

            w.sort((a, b) => a.tweet_volume < b.tweet_volume);

            console.log(w);

            const data = w.slice(0, 10);

            Cookies.set('tcache', data, { maxAge: 90000 });
            console.log("Lots of Stuff", data);

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

    render(){
        var dispdat = [];
        var tcache = Cookies.get('tcache');
        if(tcache !== undefined){
            dispdat = JSON.parse(tcache);
        }
        else{
            dispdat = this.state.data;
        }
      return(
    <ResponsiveBar
    position="absolute"
    height={360}
    width={400}
    data={dispdat}
    keys={[
        "tweet_volume"
    ]}
    indexBy="name"
    margin={{
        "top": 30,
        "right": 10,
        "bottom": 100,
        "left": 90
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
        "legend": "hashtag",
        "legendPosition": "middle",
        "legendOffset": 90
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

export default Bar
