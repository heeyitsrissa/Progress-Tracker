const { gql } = require('@apollo/server');

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email: String!
    todos: [Todo]
    goals: [Goal]
    workouts: [Workout]
    macros: [Macro]
}

type Auth {
    token: ID!
    user: User!
}

type Todo {
    _id: ID!
    title: String!
    description: String
    start: Date
    end: Date
    dueDate: Date
    completed: Boolean
    user: User
}

type Goal {
    _id: ID!
    title: String!
    description: String
    targetDate: String
    user: User
}

type Workout {
    _id: ID!
    title: String!
    description: String
    date: String
    duration: Int
    exercises: [exercise]
    user: User
}

type Exercise {
    name: String!
    reps: Int!
    sets: Int!
}

input ExerciseInput {
    name: String!
    reps: Int!
    sets: Int!
}

type Macro {
    _id: ID!
    date: String!
    calories: Int
    protein: Int
    carbs: Int
    fat: Int
    user: User
}

type Query {
    users: [User]
    user(_id: ID!): User
    todos: [Todo]
    goals: [Goal]
    workouts: [Workout]
    macros: [Macro]
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToDo(
        userId: ID!,
        title: String!,
        description: String,
        date: Date!,
        start: Date!,
        end: Date!
    ): Todo
    addGoal(
        userId: ID!,
        title: String!,
        description: String,
        date: String!,
        duration: Int
    ): Goal
    addMacro(
        userId: ID!,
        date: String!,
        calories: Int,
        protein: Int,
        carbs: Int,
        fat: Int
    ): Macro
    addWorkout(
        userId: ID!,
        title: String!,
        description: String,
        date: String!,
        exercises: [ExerciseInput]
    ): Workout
    updateMacro(id: ID!, newProtein: Int, newCarbs: Int, newFats: Int): Macro
    removeTodo(todoId: ID!): User
    removeGoal(goalId: ID!): User
}
`;

module.exports = typeDefs;