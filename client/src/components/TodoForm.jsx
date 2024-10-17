import React, { useState } from 'react';

const TodoForm = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ start, setStart] = useState('');
    const[end, setEnd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, description, start, end);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Start Date</label>
                <input type='datetime-local' value={start} onChange={(e) => setStart(e.target.value)} required />
            </div>
            <div>
                <label>Due Date</label>
                <input type='datetime-local' value={end} onChange={(e) => setEnd(e.target.value)} required />
            </div>
            <div>
                <button type='submit'>Add Todo</button>
                <buttong type='button' onClick={onCancel}>Cancel</buttong>
            </div>
        </form>
    )
}

export default TodoForm;