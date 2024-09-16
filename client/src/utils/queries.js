import { gql } from "@apollo/client";

// Query to get all users
export const GET_USERS = gql `
query GetUsers {
    users {
        _id
        name
        email
        todos {
            _id
            title
            description
            completed
        }
        goals {
            _id
            title
            description
            targetDate
        }
        workouts {
            _id
            title
            description
            date 
            duration
            exercises {
                name
                reps
                sets
            }
        }
        macros {
            _id
            date
            calories
            protein
            carbs
            fat
        }
    }
}
`;

//query to get specific user by id

export const GET_USER = gql`
query GetUser($userId: ID!) {
    user(_id: $userID){
        _id
        name
        email 
        workouts {
            _id
            title
            description
            date
            exercises {
                name
                reps
                sets
            }
        }
        todo {
            _id
            title
            description
            completed
        }
        goals {
            _id
            title
            description
            targetDate
        }
        macros {
            _id 
            date
            calories
            protein
            carbs
            fat
        }
    }
}
`;

export const GET_TODOS = gql`
query GetTodos {
    todos{
        _id
        title
        description
        dueDate
        completed
    }
}
`;

export const GET_GOALS = gql`
query GetGoals {
    goals {
        _id
        title
        description
        targetDate

    }
}
`

export const GET_WORKOUTS = gql `
query FetWorkouts {
    workouts {
        _id
        title
        description
        date 
        duration
        exercises {
            name
            reps
            sets
        }
    }
}
`;

export const GET_MACROS = gql`
query GetMacros {
    macros {
        _id
        date
        calories
        protein
        carbs
        fat
    }
}
`;


