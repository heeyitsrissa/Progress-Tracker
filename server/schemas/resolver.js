const bcrypt = require('bcyptjs');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");
const User = require('../models/User');
const Todo = require('../models/Todo')
const Goal = require('../models/Goal');
const Workout = require('../models/Workout');
const Macro = require('../models/Macro');
const { sign } = require('jsonwebtoken');

const resolvers = {
    // resolver function for fetching data
    Query: {
        users: async () => {
            return await User.find({}); // fetches all users from the user collection
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id); // fetch a specific user by id
        },
        todos: async () => {
            return await Todo.find({});
        },
        goals: async () => {
            return await Goal.find({});
        },
        workouts: async () => {
            return await Workout.find({});
        },
        macros: async () => {
            return await Macro.find({})
        },
    },

    Mutation: {
        // resolver function for creating updating or deleting data
        addUser: async (parent, { name, email, password}) => { 
            const existingUser = await User.findOne({ email });
            if(existingUser) {
                throw new Error('User with this email already exists');
            }
            const hashedPass = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPass })

            const token = signToken(user);

            return { token, user };

        },
        login: async (parent, { email, password })  => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('User not found')
            }

            const valid = await bcrypt.compare(password, user.password);
            if(!valid) {
                throw new AuthenticationError('Incorrect password')
            }
            const token = signToken(user);
            return { token, user };
        },

        addToDo: async(parent, { userId, title, description, dueDate }, context) => {
            if(!context.user){
                throw new AuthenticationError('You need to be logged in!')
            }
            const todo = await Todo.create({ title, description, dueDate, user: userId });
            const user = await User.findById(userId);
            user.todos.push(todo._id);
            await user.save();

            return todo;
        },

        
    }
}
