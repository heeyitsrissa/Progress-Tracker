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

type Todo {
    _id: ID!
    title: String!
    description: String
    dueDate: Date
    completed: Boolean
    user: User
}

type Goal {
    _id: ID!
    title: String!
    description: String
    targetDate: Date
    user: User
}

type Workout {
    _id: ID!
    title: String!
    description: String
    date: Date
    duration: Number
    user: User
}

type Macro {
    _id: ID!
    date: Date!
    calories: Number
    protein: Number
    carbs: Number
    fat: Number
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
`