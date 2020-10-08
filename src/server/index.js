const express = require('express'); // lightweight server module
const bodyParser = require("body-parser"); //a tool necessary to parse POST values
const cors = require('cors');
const ENV = require('../common/env');

const PORT = ENV.Settings.Dev.SERVER_PORT;

//Initialize the app values
const app = express();

// enable CORS cross origin
app.use(cors());

//Allow the app to parse values
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('This is base server path'));

// game module
require('./game/game.js')(app);

app.listen(PORT, () => console.log('Example app listening on port', PORT));