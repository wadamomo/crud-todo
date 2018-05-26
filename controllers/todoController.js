const Todo = require("../models/todo");

const todoController = {
  getTodos(req, res) {
    Todo.find({}, (err, foundTodos) => {
      if (err) return res.status(500).send(err);
      res.json(foundTodos);
    });
  },
  addTodo(req, res) {
    Todo.create({ item: req.body.todo }, (err, createdTodo) => {
      if (err) return res.status(500).send(err);
      res.json(createdTodo);
    });
  },
  deleteTodo(req, res) {
    console.log('id:   ', req.params.id)
    Todo.deleteOne({ _id: req.params.id }, (err) => {
      if (err) return res.status(500).send(err);
    });
  }
};

module.exports = todoController;
