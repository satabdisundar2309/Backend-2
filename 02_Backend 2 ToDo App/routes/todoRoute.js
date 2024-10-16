const express = require('express')
const router = express.Router()

// importing controller
const createTodo = require('../controllers/createTodo');
const getTodos = require('../controllers/getTodos');
const updateTodo = require('../controllers/updateTodo');
const deleteTodo = require('../controllers/deleteTodo');

// defining API routes and mapping them with respective controllers
router.post("/createTodo", createTodo);
router.get("/getTodos/:_id", getTodos);
router.put("/updateTodo", updateTodo);
router.delete("/deleteTodo", deleteTodo);

module.exports = router;