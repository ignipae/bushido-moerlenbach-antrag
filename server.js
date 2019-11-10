//Install express server
const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/bushido-moerlenbach-antrag'));
app.use('/api', require('./server/routes'));

// Start the app by listening on the default Heroku port
app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log('API Up and running on port ' + port);
});