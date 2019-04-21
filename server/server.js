/*
* Database server interface for Pigeon Hole Twitter Dashboard
* MySQL Interface by Austin Kee <austinjkee@ufl.edu>
* Twitter Interface by Ganna Voytseshko <gvoytseshko@ufl.edu>
*/

const express = require('express'),
        mysql = require('mysql'),
        fetch = require('node-fetch');
        config = require('./config/config.js');
        Twitter = require('twitter-lite');

const mariadb = express();
const PORT = process.env.PORT || config.port;

const T = new Twitter(config.twit);

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
