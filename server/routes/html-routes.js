module.exports = function(app, connection, twitterApi) {
    app.post('/check', function(req,res) {
        var sql = "SELECT id FROM LOGIN_DATA WHERE Username=" + connection.escape(req.uname) + " && Password= " + connection.escape(req.pword) + ';';
        connection.query(sql, function(err, data) {
            (err)?res.send(err):res.json({id: data});
        });
    });
    app.put('/create', function(req,res) {
        var sql = "INSERT INTO LOGIN_DATA VALUES (" + connection.escape(req.id) + ", " + connection.escape(req.uname) + ", " + connection.escape(req.pword) + ") SELECT LD1.id, LD1.Username, LD1.Password FROM LOGIN_DATA LD1 WHERE NOT EXISTS (SELECT Username FROM LOGIN_DATA LD2 WHERE LD2.Username=LD1.Username);";
        connection.query(sql, function(err) {
            (err)?res.send(err):res.send("Success");
        });
    });
    app.get('/init', function(req,res){
        connection.query("CREATE TABLE IF NOT EXISTS LOGIN_DATA ( id int, Username varchar(255), Password varchar(255) );", function(err) {
            (err)?res.send(err):res.send("Success");
        });
    });
    app.get('/twitter', function(req, res){
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
    });
}
