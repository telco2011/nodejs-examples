var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');
    log4js = require('log4js');
    logger = require('morgan');

var log4jsLogger = log4js.getLogger();

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/angular-todo');

// Localización de los ficheros estáticos
app.use(express.static(__dirname + '/public'));
// Middlewares
// Permite cambiar el HTML con el método POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Simula DELETE y PUT
app.use(methodOverride());
// Muestra un log de todos los request en la consola		
app.use(logger('dev'));

// Import models
var models = require('./models/todo')(app, mongoose);
var TodoCtrl = require('./controllers/todo');

var router = express.Router();
router.get('/', function(req, res) {
   res.sendfile('./public/index.html');	
});
app.use(router);

// API routes
var todos = express.Router();

todos.route('/todos')
  .get(TodoCtrl.findAllTodos)
  .post(TodoCtrl.addTodo);

todos.route('/todos/:todo')
  .delete(TodoCtrl.deleteTodo);

app.use('/api', todos);

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
    console.log('App listening on port 8080');
});

// Handlers ERROR
process.on('uncaughtException', function(err) {
  log4jsLogger.error('Exception: ', err);
});