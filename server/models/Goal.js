const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    targetDate: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Goal = mongoose.model('Goals', goalSchema);

module.exports = Goal;