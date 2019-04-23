/*
* Database server interface for Pigeon Hole Twitter Dashboard
* MySQL Interface by Austin Kee <austinjkee-at-ufl-dot-edu>
* Twitter Interface by Ganna Voytseshko <gvoytseshko-at-ufl-dot-edu>
*/

const express = require('express'),
        mysql = require('mysql'),
        fetch = require('node-fetch'),
        bodyParser = require('body-parser'),
        bcrypt = require('bcryptjs'),
        cookieParser = require('cookie-parser')
        config = require('./config'),
        Twitter = require('twitter-lite');

module.exports.init = function() {
    var T = new Twitter(config.twit);
    var connection = mysql.createConnection({
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

    //initialize app
    var mariadb = express();

    mariadb.use(bodyParser.urlencoded({ extended: true }));

    //body parsing middleware
    mariadb.use(bodyParser.json());

    //cookie parsing middleware
    mariadb.use(cookieParser());

    require('../routes/html-routes')(mariadb, connection, T, bcrypt, config.clientkey);

    /*
    mariadb.listen(PORT, () => {
        console.log("App is running on: " + PORT);
    });
    */

    return mariadb;
};
