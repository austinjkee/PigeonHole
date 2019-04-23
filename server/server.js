const express = require('express'),
        mysql = require('mysql'),
        fetch = require('node-fetch');
const Twitter = require('twitter-lite');


const PORT = process.env.PORT || 3001;

const mariadb = express();

const connection = mysql.createConnection({
    host: 'localhost', //HOSTNAME (localhost)
    user: 'root',
    password: '',
    database: 'userstor', //TODO: name.
    debug: false,
});

const T = new Twitter({
    consumer_key: 'Ayl6GGBwJ4m8fhZ7CXWljsgvF',
    consumer_secret: 'PkVV4LGTKTw1eegLi9DoiJvQ60M9ozdRy2kSrGeYDZupfPACrc',
    access_token_key: '1105912383346757634-U7nyH07Ajiz3bFyixsIWwaUEa5dX4f',
    access_token_secret: 'HZHk3jTGzdrHsuqMptfUXgr5T701xLiuztpfh2AQqLcNL'
});

connection.connect(function(err){
    if(err) {
        console.log('Database error: ' + err);
    }
}); //creates connection

require('./routes/html-routes')(mariadb, connection);

mariadb.listen(PORT, () => {
    console.log("App is running on: " + PORT);
});

app.get('/twitter/:user', (req, res) => {

console.log(req.params);
const q = req.params.user;
console.log("Statuses");

const z = T
    .get("statuses/show", {
    id: q
    })
    .then(results => {
    res.json({express: results});

    })
    .catch(console.error);
});

app.get('/trends/:woeid', (req, res) => {

console.log(req.params);
const q = req.params.woeid;
console.log("trends");

const z = T

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
