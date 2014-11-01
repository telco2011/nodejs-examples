//File: controllers/todo.js
var mongoose = require('mongoose');
var tools = require('../utils/tools');
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
        _id: req.body.text,
        done: false
    }, function(err, todo){
        if(err) {
            console.error('Error creating TODO.');
            tools.printError(err);
            res.send(tools.errorMessage(err.code));
            throw err;
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