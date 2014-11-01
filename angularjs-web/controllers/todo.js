//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Todo  = mongoose.model('Todo');

// GET de todos los TODOs
exports.findAllTodos = function(req, res) {				
    Todo.find(function(err, todos) {
        if(err) {
            res.send(err);
        }
        res.json(todos);
    });
};

// POST que crea un TODO y devuelve todos tras la creación
exports.addTodo = function(req, res) {				
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        if(err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });
    });
};

// DELETE un TODO específico y devuelve todos tras borrarlo.
exports.deleteTodo = function(req, res) {		
    Todo.remove({
        _id: req.params.todo
    }, function(err, todo) {
        if(err){
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });

    })
};