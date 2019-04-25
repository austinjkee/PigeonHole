import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { generateCountriesData } from '@nivo/generators';
import Cookies from 'js-cookie';

class Info extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidMount(){
        var tcache = Cookies.get('dcache');
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
                console.log("z is not null");
                console.log("object345", z);
                //this.setState({data: z});

                Cookies.set('dcache', JSON.stringify(z), { maxAge: 90000 });
                console.log("Lots of Stuff", JSON.stringify(z));

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
            console.log("z is not null");
            console.log("object345", z);
            Cookies.set('dcache', JSON.stringify(z), { maxAge: 90000 });

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
        var qwerty = [];
        var tcache = Cookies.get('dcache');
        if(tcache !== undefined){
            qwerty = JSON.parse(tcache).map((item, i) => {
            //console.log(item.name);
              return (
                  <tr>
                      <td>{item.name}</td>
                      <td>{item.tweet_volume}</td>
                  </tr>

              );
            });
        }
        else{
            qwerty = this.state.data.map((item, i) => {
            //console.log(item.name);
              return (
                  <tr>
                      <td>{item.name}</td>
                      <td>{item.tweet_volume}</td>
                  </tr>

              );
            });
        }
      return(
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

export default Info
