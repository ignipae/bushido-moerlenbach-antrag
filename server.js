//Install express server
const express = require('express');

const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/bushido-moerlenbach-antrag'));

// Start the app by listening on the default Heroku port
app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log('API Up and running on port ' + port);
});