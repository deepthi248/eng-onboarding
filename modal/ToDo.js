const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: ['true', 'please enter the title '],
        maxlength: 30,

    }
}
    , { timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)