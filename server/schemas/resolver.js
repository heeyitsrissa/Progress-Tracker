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

        addGoal: async (parent, { userId, title, description, targetDate }, context) => {
            if(!context.user) {
                throw new AuthenticationError('You need ti be logged in!');
            }

            const goal = await Goal.create({ title, description, targetDate, user: userId});
            const user = await User.findById(userId);
            user.goals.push(goal._id);
            await user.save();

            return goal;
        },

        addMacro: async(parent, { userId, date, calories, protein, carbs, fat}, context) => {
            if(!context.user){
                throw new AuthenticationError('You need to be logged in!')
            }

            const macro = await Macro.create({ date, calories, protein, carbs, fat, user: userId})
            const user = await User.findById(userId);
            user.macros.push(macro._id);
            await user.save();
            return macro;
        }, 

        addWorkout: async(parent, { userId, title, description, date, exercises}, context) => {
            if(!context.user){
                throw new Error("You need to be logged in!")
            }

            const workout = await Workout.create({ title, description, date, exercises, user: userId  })
            const user = await User.findById(userId);
            user.workouts.push(workout._id);
            await user.save()
            return workout;
        },

        updateMacro: async (parent, { id, newProtein, mewCarbs, newFats }, context) => {
            if(!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            return await Macro.findByIdAndUpdate(
                id,
                { protein: newProtein, carbs: newCarbs, fat: newFats },
                { new: true }
            );
        },

        removeTodo: async (parent, { todoId }, context) => {
            if(!context.user){
                throw new AuthenticationError('You need to log in!')
            }

            const todo = await todo.findByIdAndRemove(todoId);
            if(!todo) {
                throw new Error('Todo not found');
            }

            const user = await User.findById(todo.user);
            user.todos.pull(todoId);
            await user.save();

            return user;
        },

        removeGoal: async (parent, { goalId }, context) => {
            if(!context.user){
                throw new AuthenticationError('You need to be logged in!');
            }
            const goal = await Goal.findByIdAndRemove(goalId);
            if(!goal){
                throw new Error('Goal not Found');
            },

            const user= await User.findById(goal.user);
            user.goals.pull(goalid);
            await user.save();
            return user;
        },
    },
    // Resolver functions for resolving nested data (relationships between types)
    User: {
        todos: async (parent) => {
            return await Todo.find({ user: parent._id });
        },
        goals: async (parent) => {
            return await Goal.find({ user: parent._id });
        },
        workouts: async (parent)=> {
            return await Workout.find({ user: parent._id})
        },
        macros: async (parent) => {
            return await Macro.find({ user: parent._id })
        },
    },

    Todo: {
        user: async (parent) => {
            return await User.findById(parent.user);
        },
    },
    Goal: {
        user: async(parent) => {
            return await User.findById(parent.user)
        },
    },
    Workout: {
        user: async(parent) => {
            return await User.findById(parent.user);
        },
    },
    Macro: {
        user: async (parent) => {
            return await User.findById(parent.user);
        },
    },
};

module.exports = resolvers;