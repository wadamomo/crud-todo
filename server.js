const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

const todoController = require('./controllers/todoController');
const PORT = 3001;

const uri = "mongodb://melania:trump@ds135750.mlab.com:35750/crud-todo"

mongoose.connect(uri).then(() => console.log('connected to melania'));

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'controllers')))

app.get('/todo', todoController.getTodos)
app.post('/todo', todoController.addTodo)
app.delete('/todo/:id', todoController.deleteTodo)

app.listen(PORT, () => console.log('listening on 3001.....'))