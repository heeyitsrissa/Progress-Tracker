const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    }
});

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    duration: Number,
    exercises: [exerciseSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User'};
})

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;