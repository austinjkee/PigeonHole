/*
* Database server interface for Pigeon Hole Twitter Dashboard
* MySQL Interface by Austin Kee <austinjkee@ufl.edu>
* Twitter Interface by Ganna Voytseshko <gvoytseshko@ufl.edu>
*/

const express = require('express'),
        mysql = require('mysql'),
        fetch = require('node-fetch');
        bodyParser = require('body-parser');
        config = require('./config');
        Twitter = require('twitter-lite');

module.exports.init = function() {
    var T = new Twitter(config.twit);
    var connection = mysql.createConnection({
        host: 'localhost', //HOSTNAME (localhost)
        user: 'root',
        password: '',
        database: 'userstor', //TODO: name.
        debug: false,
    });

    connection.connect(function(err){
        if(err) {
            console.log('Database error: ' + err);
        }
    }); //creates connection

    //initialize app
    var mariadb = express();

    //body parsing middleware
    mariadb.use(bodyParser.json());

    require('../routes/html-routes')(mariadb, connection, T);

    /*
    mariadb.listen(PORT, () => {
        console.log("App is running on: " + PORT);
    });
    */

    return mariadb;
};
