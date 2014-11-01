var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/tvshows', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import models
var models = require('./models/tvshow')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
   res.send("TVShows Example!");
});
app.use(router);

// API routes
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);

// Start Server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

// Handlers ERROR
process.on('uncaughtException', function(err) {
    console.log('Threw Exception: ', err);
});