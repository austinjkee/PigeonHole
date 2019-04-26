import React from 'react';
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
            var stcache = JSON.parse(tcache).slice(0,10);
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
                 <table className="table">
                     <thead className="thead-dark">
                         <tr>
                             <th scope="col">Trending Topics</th>
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
