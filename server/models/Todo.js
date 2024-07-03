const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String, 
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;