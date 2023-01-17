var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
require("dotenv/config")


var usersRouter = require('./routes/auth');
var playersRouter = require('./routes/Player');
var multiRouter = require('./routes/multi');
var scoreRouter = require('./routes/score');
const authMiddl = require('./middelwares/auth')
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connection to MongoDB.

// Ejs 
app.use(expressLayouts);
app.set('veiw engine', 'ejs')


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', usersRouter);
app.use('/players', playersRouter);
app.use('/multiplicateur', multiRouter);
app.use('/score', scoreRouter);

app.use(authMiddl);


const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

module.exports = app;
