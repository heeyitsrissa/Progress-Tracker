const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo'}],
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout'}],
    macros: [{ types: Schema.Types.ObjectId, ref: 'Macro'}]
})

userSchema.pre("save", async function(next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;