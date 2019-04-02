import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'

class Bar extends React.Component{
    componentDidMount(){
      let {clientHeight, clientWidth} = this.refs.BarBar;
      console.log(clientHeight, clientWidth);
    }
    render(){
      return(
    <div ref="BarBar" style={{height: '25em', width: '40em'}}>
    <ResponsiveBar
    data={[
  {
    "country": "AD",
    "hot dog": 58,
    "hot dogColor": "hsl(354, 70%, 50%)",
    "burger": 78,
    "burgerColor": "hsl(307, 70%, 50%)",
    "sandwich": 157,
    "sandwichColor": "hsl(337, 70%, 50%)",
    "kebab": 63,
    "kebabColor": "hsl(127, 70%, 50%)",
    "fries": 82,
    "friesColor": "hsl(207, 70%, 50%)",
    "donut": 61,
    "donutColor": "hsl(360, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 180,
    "hot dogColor": "hsl(41, 70%, 50%)",
    "burger": 178,
    "burgerColor": "hsl(140, 70%, 50%)",
    "sandwich": 154,
    "sandwichColor": "hsl(85, 70%, 50%)",
    "kebab": 111,
    "kebabColor": "hsl(300, 70%, 50%)",
    "fries": 151,
    "friesColor": "hsl(285, 70%, 50%)",
    "donut": 169,
    "donutColor": "hsl(64, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 110,
    "hot dogColor": "hsl(16, 70%, 50%)",
    "burger": 54,
    "burgerColor": "hsl(96, 70%, 50%)",
    "sandwich": 197,
    "sandwichColor": "hsl(34, 70%, 50%)",
    "kebab": 30,
    "kebabColor": "hsl(210, 70%, 50%)",
    "fries": 18,
    "friesColor": "hsl(197, 70%, 50%)",
    "donut": 192,
    "donutColor": "hsl(66, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 73,
    "hot dogColor": "hsl(229, 70%, 50%)",
    "burger": 142,
    "burgerColor": "hsl(139, 70%, 50%)",
    "sandwich": 135,
    "sandwichColor": "hsl(230, 70%, 50%)",
    "kebab": 121,
    "kebabColor": "hsl(88, 70%, 50%)",
    "fries": 68,
    "friesColor": "hsl(332, 70%, 50%)",
    "donut": 175,
    "donutColor": "hsl(255, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 169,
    "hot dogColor": "hsl(145, 70%, 50%)",
    "burger": 194,
    "burgerColor": "hsl(253, 70%, 50%)",
    "sandwich": 55,
    "sandwichColor": "hsl(342, 70%, 50%)",
    "kebab": 119,
    "kebabColor": "hsl(319, 70%, 50%)",
    "fries": 129,
    "friesColor": "hsl(109, 70%, 50%)",
    "donut": 147,
    "donutColor": "hsl(34, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 95,
    "hot dogColor": "hsl(330, 70%, 50%)",
    "burger": 62,
    "burgerColor": "hsl(143, 70%, 50%)",
    "sandwich": 190,
    "sandwichColor": "hsl(231, 70%, 50%)",
    "kebab": 58,
    "kebabColor": "hsl(129, 70%, 50%)",
    "fries": 5,
    "friesColor": "hsl(190, 70%, 50%)",
    "donut": 140,
    "donutColor": "hsl(124, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 70,
    "hot dogColor": "hsl(260, 70%, 50%)",
    "burger": 67,
    "burgerColor": "hsl(215, 70%, 50%)",
    "sandwich": 51,
    "sandwichColor": "hsl(296, 70%, 50%)",
    "kebab": 102,
    "kebabColor": "hsl(13, 70%, 50%)",
    "fries": 3,
    "friesColor": "hsl(85, 70%, 50%)",
    "donut": 50,
    "donutColor": "hsl(135, 70%, 50%)"
  }
]}
    keys={[
        "hot dog",
        "burger",
        "sandwich",
        "kebab",
        "fries",
        "donut"
    ]}
    indexBy="country"
    margin={{
        "top": 50,
        "right": 130,
        "bottom": 50,
        "left": 60
    }}
    padding={0.3}
    colors="nivo"
    colorBy="id"
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
    fill={[
        {
            "match": {
                "id": "fries"
            },
            "id": "dots"
        },
        {
            "match": {
                "id": "sandwich"
            },
            "id": "lines"
        }
    ]}
    borderColor="inherit:darker(1.6)"

    axisBottom={{
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "country",
        "legendPosition": "middle",
        "legendOffset": 32
    }}
    axisLeft={{
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "food",
        "legendPosition": "middle",
        "legendOffset": -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="inherit:darker(1.6)"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    legends={[
        {
            "dataFrom": "keys",
            "anchor": "bottom-right",
            "direction": "column",
            "justify": false,
            "translateX": 120,
            "translateY": 0,
            "itemsSpacing": 2,
            "itemWidth": 100,
            "itemHeight": 20,
            "itemDirection": "left-to-right",
            "itemOpacity": 0.85,
            "symbolSize": 20,
            "effects": [
                {
                    "on": "hover",
                    "style": {
                        "itemOpacity": 1
                    }
                }
            ]
        }
    ]}
/>
        <div className="Title">BAR</div>
    </div>
  );
}
}

export default Bar
