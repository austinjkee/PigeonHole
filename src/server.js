/*
var Twit = require('twit');

var jsonData;

      var T = new Twit({
          consumer_key: 'Ayl6GGBwJ4m8fhZ7CXWljsgvF',
          consumer_secret: 'PkVV4LGTKTw1eegLi9DoiJvQ60M9ozdRy2kSrGeYDZupfPACrc',
          access_token: '1105912383346757634-U7nyH07Ajiz3bFyixsIWwaUEa5dX4f',
          access_token_secret: 'HZHk3jTGzdrHsuqMptfUXgr5T701xLiuztpfh2AQqLcNL'
      })

      T.get('account/verify_credentials', {
        include_entities: false,
        skip_status: true,
        include_email: false
      }, onAuthenticated)

      T.get('search/tweets', { q: 'university of florida since:2011-07-11', count: 100 }, function(err, data, response) {
        jsonData = data;
        console.log(jsonData);
      })

    function onAuthenticated(err, res) {
        if (err) {
            throw err
        }

        console.log('Authentication successful. Running bot...\r\n')
    }
    */
