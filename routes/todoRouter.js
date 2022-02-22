
const express = require("express");
const router = express.Router();


const {
    createTodo,
    getTodo,
    getTodoById,
    getAllTodos,
    deleteTodo,
    updateTodo
} = require('../controller/todoController')

//params
router.param("todoId", getTodoById);

router.get('/todos/', getAllTodos);
router.get('/todo/:todoId', getTodo);
router.post('/todo/create', createTodo);
router.put('/todo/:todoId/update', updateTodo)
router.delete('/todo/:todoId/delete', deleteTodo)

module.exports = router;
