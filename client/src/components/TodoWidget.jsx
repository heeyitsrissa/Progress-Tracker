import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS_FOR_DAY } from '../utils/queries';
import { AuthProvider } from '../context/AuthContext';

const TodosWidget = () => {
    const { user } = AuthProvider();
    const today = new Date().toISOString().split('T')[0];

    const { loading, error, data } = useQuery(GET_TODOS_FOR_DAY, {
        variables: { userId: user._id, date: today },
    });

    if(loading) return <p>Loading Todos...</p>;
    if(error) return <p>Error loading todos.</p>;

    return (
        <div className="todos-widget">
            <h3>Today's Todos</h3>
            <ul>
                {data.todos.map(todo => (
                    <li key={todo._id}>
                        <h4>{todo.title}</h4>
                        <p>{todo.description}</p>
                        <p>Status: {todo.completed ? 'completed' : 'incomplete'}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TodosWidget;