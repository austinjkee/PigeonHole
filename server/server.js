const express = require('express'),
        mysql = require('mysql'),
        fetch = require('node-fetch');
const mariadb = express();
const Twitter = require('twitter-lite');

const T = new Twitter({
    consumer_key: 'Ayl6GGBwJ4m8fhZ7CXWljsgvF',
    consumer_secret: 'PkVV4LGTKTw1eegLi9DoiJvQ60M9ozdRy2kSrGeYDZupfPACrc',
    access_token_key: '1105912383346757634-U7nyH07Ajiz3bFyixsIWwaUEa5dX4f',
    access_token_secret: 'HZHk3jTGzdrHsuqMptfUXgr5T701xLiuztpfh2AQqLcNL'
});

const PORT = process.env.PORT || 3001;

const connection = mysql.createConnection({
    host: 'localhost', //HOSTNAME (localhost)
    user: 'root',
    password: 'root',
    database: 'userstor', //TODO: name.
    debug: false,
});

connection.connect(function(err){
    if(err) {
        console.log('Database error: ' + err);
    }
}); //creates connection

require('./routes/html-routes')(mariadb, connection, T);

mariadb.listen(PORT, () => {
    console.log("App is running on: " + PORT);
});
