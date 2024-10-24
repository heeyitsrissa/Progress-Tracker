import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($name: String!, $email: String!, $password: String!){
    addUser(name: $name, email: $email, password: $password){
        token 
        user {
            _id
            name
            email
        }
    }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user{
            _id
            name
            email
        }
    }
}
`;

export const ADD_TODO = gql`
mutation addToDo($userID: ID!, $title: String!, $description: String, $start: Date!, $end: Date! ){
    addToDo(userId: $userId, title: $title, description: $description, start: $start, end: $end){
        _id
        title
        description
        dueDate
        completed
        user{
            _id
            name
        }
    }
}
`;

export const ADD_GOAL = gql`
mutation addGoal ($userId: ID!, $title: String!, $description: String, $date: String!, $duration: Int!){
    addGoal(userId: $userId, title: $title, description: $descrpition, date: $date, duration: $duration){
        _id
        title
        description
        targetDate
        user {
            _id
            name
        }
    }
}
`;

export const ADD_MACRO = gql`
mutation addMacro($userId: ID!, $date: String!, $calories: Int, $protein: Int, $carbs: Int, $fat: Int) {
    addMacro(userId: $userId, date: $date, calories: $calories, protein: $protein, carbs: $carbs, fat: $fat){
        _id
        date
        calories
        protein
        carbs
        fat
        user{
            _id
            name
        }
    }
}
`;

export const ADD_WORKOUT = gql`
mutation addWorkout($userId: ID!, $title: String!, $description: String, $date: String!, $exercises: [ExerciseInput]) {
    addWorkout(userId: $userId, title: $title, description: $description, date: $date, exercises: $exercises){
        _id
        title
        description
        date
        exercises{
            name
            reps
            sets
        }
        user {
            _id
            name
        }
    }
}
`;

export const UPDATE_MACRO = gql`
mutation updateMacro($id: ID!, $newProtein: Int, newCarbs: Int, newFats: Int){
    updateMacro(id: $id, newProtein: $newProtein, newCarbs: $newCarbs, newFats: $newFats){
        _id
        date
        calories
        protein
        carbs
        fat
        user {
            _id
            name
        }
    }
}
`;

export const UPDATE_GOAL = gql`
mutation updateGoal($id: ID!, $title: String!, $description: String, $targetDate: Date!, $completed: Boolean!){
    updateGoal(id: $id, title: $title, description: $description, targetDate: $targetDate, completed: $completed) {
        _id
        title
        completed
    }
}
`;

export const REMOVE_TODO = gql`
mutation removeTodo($todoId: ID!){
    removeTodo(todoId: $todoId){
        _id
        name
        email
        todos {
            _id
            title
        }
    }
}
`;

export const REMOVE_GOAL = gql`
mutation removeGoal($goalId: ID!){
    removeGoal(goalId: $goalId){
        _id
        name
        email
        goals {
            _id
            title
        }
    }
}
`;

