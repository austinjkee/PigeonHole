const express = require('express'),
        mysql = require('mysql'),
        fetch = require('node-fetch');

const PORT = process.env.PORT || 3001;

const mariadb = express();

const connection = mysql.createConnection({
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

require('./routes/html-routes')(mariadb, connection);

mariadb.listen(PORT, () => {
    console.log("App is running on: " + PORT);
});
