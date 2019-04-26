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

    }

    render(){
        var qwerty = "";
        var tcache = Cookies.get('tcache');
        if(tcache !== undefined){
            var stcache = JSON.parse(tcache).slice(0,5);
            qwerty = stcache.map((item, i) => {
            console.log(item.name);
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
            console.log(item.name);
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
