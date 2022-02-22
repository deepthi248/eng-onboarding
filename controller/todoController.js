const { resetWatchers } = require('nodemon/lib/monitor/watch');
const Todo = require('../modal/ToDo')

//create todo 
const createTodo = (req, res) => {
    const todo = new Todo(req.body);

    todo.save((err, task) => {
        if (err) {
            return res.status(404).json({
                message: "something went wrong"
            })
        }
        res.json({ task })

    })
}

//getTodoById
const getTodoById = (req, res, next, todoId) => {
    Todo.findById(todoId).exec((err, todo) => {
        if (err || !todo) {
            return res.status(404).json({
                error: "something went wrong"
            })
        }
        req.todo = todo;
        next();
    })
}

//getAllTodos 
const getAllTodos = (req, res) => {
    Todo.find().sort('createdAt')
        .exec((err, todos) => {
            if (err || !todos) {
                return res.status(404).json({
                    error: "something went wrong"
                })
            }
            res.json(todos);
        })
}

//getTodo
const getTodo = (req, res) => {
    res.json(req.todo)
}

//updateTodo
const updateTodo = (req, res) => {
    const todo = req.todo;
    todo.task = req.body.task;
    todo.save((err, t) => {
        if (err || !t) {
            return res.status(404).json({
                error: "something went wrong"
            })
        }
        res.json(t);
    })

}

//deleteTodo 
const deleteTodo = (req, res) => {
    const todo = req.todo;
    todo.remove((err, task) => {
        if (err || !task) {
            return res.status(400).json({
                error: "something went wrong while deleting the category",
            });
        }
        // send deleted todo and success message as a json response
        res.json({
            task_deleted: task,
            message: "Todo deleted successfully!",
        });
    });
};

module.exports = {
    createTodo,
    getTodo,
    getTodoById,
    getAllTodos,
    deleteTodo,
    updateTodo
}