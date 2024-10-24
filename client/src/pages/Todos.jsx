import React, { useState } from 'react';
import MyCalendar from '../components/MyCalendar';
import TodoForm from '../components/TodoForm';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS } from '../utils/queries';
import { ADD_TODO, REMOVE_TODO} from '../utils/mutation';

const Todos = () => {
    const { loading, error, data } = useQuery(GET_TODOS);
    const [addTodo] = useMutation(ADD_TODO);
    const[removeTodo] = useMutation(REMOVE_TODO);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false);

    if(loading) return <p>Loading todos...</p>;
    if(error) return <p>Error fetching Todos!</p>;

    const handleAddTodo = async (title, description, start, end) => {
        await addTodo({
            variables: { title, description, start, end },
            refetchQueries: [{ query: GET_TODOS}],
        
        })
        setShowForm(false);
    };

    const handleRemoveTodo = async (id) => {
        await removeTodo({
            variables: { todoId: id },
            refetchQueries: [{ query: GET_TODOS }],
        });
    };

    return (
        <div className='todo-page'>
            <h1>Todo</h1>

            <MyCalendar todos={data.todos} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <button onClick={() => setShowForm(true)}>Add Todo</button>

            {showForm && <TodoForm onSubmit={handleAddTodo} onCancel={() => setShowForm(false)} />}

                <ul>
                    {data.todos.map((todo) => (
                        <li key={todo._id}>
                            <span>{todo.title} - {new Date(todo.start).toLocaleString()}</span>
                            <button onClick={() => handleRemoveTodo(todo._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default Todos;