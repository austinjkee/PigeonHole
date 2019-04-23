module.exports = function(app, connection, twitterApi, bcrypt, clientkey) {
    app.post('/create', function(req,res) {
        console.log("Passed Data",req);
        var sql = "SELECT 1 FROM LOGIN_DATA WHERE Username=" + connection.escape(req.body.uname) + ";";
        connection.query(sql, function(err, data) {
            console.log("data", data)
            if(err) {
                res.send(err);
            }
            else {
                if(data.length === 0){
                    sql = "INSERT INTO LOGIN_DATA VALUES (" + connection.escape(req.body.uname) + ", " + connection.escape(req.body.pword) + ");";
                    connection.query(sql, function(err) {
                        if(err){
                            res.send(err);
                        }
                        else {
                            sql = "INSERT INTO USER_DATA VALUES (" + connection.escape(req.body.uname) + ", " + connection.escape(req.body.name) + ", " + connection.escape(req.body.surname) + ", " + connection.escape(req.body.email) + ");";
                            connection.query(sql, function(err) {
                                if(err){
                                    res.send(err);
                                }
                                else{
                                    res.header("Access-Control-Allow-Origin", "*");
                                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                    res.statusMessage = "SUCCESS";
                                    res.send("SUCCESS");
                                }
                            });
                        }
                    });
                }
                else{
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.statusMessage = "FAIL";
                    res.send("FAIL");
                }
            }
        });
    });
    app.get('/init', function(req,res){
        connection.query("CREATE TABLE IF NOT EXISTS LOGIN_DATA ( Username varchar(255), Password varchar(255) );", function(err) {
            if(err){
                res.send(err);
            }
            else{
                connection.query("CREATE TABLE IF NOT EXISTS USER_DATA ( Username varchar(255), Name varchar(255), Surname varchar(255), Email varchar(255) );", function(err) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.statusMessage = "SUCCESS";
                        res.send("SUCCESS");
                    }
                });
            }
        });
    });
    app.post('/verif', function(req, res){
        console.log("Passed Data", req);
        var sql = "SELECT Password FROM LOGIN_DATA WHERE Username=" + connection.escape(req.body.uname) + ";";
        var dat = connection.query(sql, function(err, data) {
            console.log("data", data);
            if(err){
                console.log("Got an error.", err);
                res.send(err);
            }
            else if(data.length === 0){
                console.log("Uh oh.");
                res.cookie("uname", '', { maxAge: 7200000 });
                res.cookie("clientkey", '', { maxAge: 7200000 });
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.statusMessage = "BAD";
                res.send("BAD");
            }
            else{
                bcrypt.compare(req.body.pword, data[0].Password, function(err, response) {
                    if(response) {
                        //If passwords match, we are in!
                        //route user into the site.
                        var hash = bcrypt.hash(clientkey, 10, function(err, hash){
                            console.log("hash", hash);
                            if(err){
                                res.send(err);
                            }
                            else{
                                console.log("Compare finished.");
                                res.cookie("uname", req.body.uname , { maxAge: 7200000 });
                                res.cookie("clientkey", hash, { maxAge: 7200000 });
                                res.header("Access-Control-Allow-Origin", "*");
                                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                res.statusMessage = "GOOD";
                                res.send("GOOD");
                            }
                        });
                    }
                    else {
                        //print out some sort of error, invalid password
                        //clear fields, start over.
                        res.cookie("uname", '', { maxAge: 7200000 });
                        res.cookie("clientkey", '', { maxAge: 7200000 });
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        res.statusMessage = "BAD";
                        res.send("BAD");
                    }
                });
            }
        });
    });
    app.get('/twitter', function(req, res){
        var cookieData = req.cookies;
        bcrypt.compare(clientkey, req.clientkey, function(err, response) {
            if(response) {
                console.log("twitter has been called");
                const twitterData = twitterApi.get("statuses/show", {
                    id: "1016078154497048576"
                })
                .then(results => {
                    console.log("results", results);
                    //res.send({ express: results.id });
                    res.json({express: results});
                })
                .catch(console.error);
            }
            else {
                res.statusMessage = "NOAUTH";
                res.send("NOAUTH");
            }
        });
    });

}
