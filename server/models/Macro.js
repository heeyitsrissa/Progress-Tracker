const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const macroSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    carlories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Macro = mongoose.model('Macro', macroSchema);

module.exports = Macro;