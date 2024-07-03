const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: Date,
    duration: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User'};
})

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;