const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const Twitter = require('twitter-lite');
//const Twit = require('twit');


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  //res.send({ express: 'YOUR EXPRESS!! BACKEND IS CONNECTED TO REACT' });
});


const T = new Twitter({
    consumer_key: 'Ayl6GGBwJ4m8fhZ7CXWljsgvF',
    consumer_secret: 'PkVV4LGTKTw1eegLi9DoiJvQ60M9ozdRy2kSrGeYDZupfPACrc',
    access_token_key: '1105912383346757634-U7nyH07Ajiz3bFyixsIWwaUEa5dX4f',
    access_token_secret: 'HZHk3jTGzdrHsuqMptfUXgr5T701xLiuztpfh2AQqLcNL'
});

// async function m() {
// const w = await T
// .get("statuses/show", {
//   id: "1016078154497048576"
// });
//
//   console.log("reuslts:");
//   console.log(w);
// }


app.get('/twitter/:user', (req, res) => {

// async function m() {
// const rateLimits = await T.get("statuses/show", {
//   id: "1016078154497048576"
// });
// console.log(rateLimits);
// console.log("ahahah");
// };
console.log(req.params);
const q = req.params.user;
console.log("zxcvbn");
//console.log(rateLimits);
//var a = m();
const z = T
.get("statuses/show", {
  id: q
})
// .get("trends/place", {
//   id: "638242"
// })
  .then(results => {
    //console.log("results", results);
    //console.log("result: ", results.id);
    //console.log("a: ", results);
    //res.send({ express: results.id });
    res.json({express: results});

  })
  .catch(console.error);

 // console.log("reuslts:");
  //console.log(z.id);

//res.send({ express: z.id });

});

app.get('/trends/:woeid', (req, res) => {

console.log(req.params);
const q = req.params.woeid;
console.log("trends");

const z = T
// .get("statuses/show", {
//   id: q
// })
.get("trends/place", {
  id: q
})
  .then(results => {
      console.log("results", results);

    res.json({trends: results});

  })
  .catch(console.error);

});


app.get('/search/:keyword', (req, res) => {

console.log(req.params);
const q = req.params.keyword;
console.log("search by keyword");

const z = T
// .get("statuses/show", {
//   id: q
// })
.get("search/tweets", {
  q: q,
  result_type: "popular",
  tweet_mode: "extended"
})
  .then(results => {
      console.log("results", results);

    res.json({trends: results});

  })
  .catch(console.error);

});


// T.get('account/verify_credentials', {
//   include_entities: false,
//   skip_status: true,
//   include_email: false
// }, onAuthenticated)
//
//
// app.get('/twitter', (req, res) => {
//     var jsonData = "qwertyuio";
//     async function m() {
//     const getData = await T.get('search/tweets', { q: 'university of florida since:2011-07-11', count: 100 }, function(err, data, response) {
//       jsonData = data;
//       console.log(jsonData);
//       console.log("function getData was called");
//       return jsonData;
//     });
// }
//   res.send({ express: getData });
// });
//
//
//
//
// function onAuthenticated(err, res) {
//   if (err) {
//       throw err
//   }
//
//   console.log('Authentication successful. Running bot...\r\n')
// }
