import React, { useState, useEffect } from 'react';

const GoalForm = ({ goal, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {
        if(goal) {
            setTitle(goal.title);
            setDescription(goal.description);
            setTargetDate(goal.targetDate ? new Date(goal.targetDate).toIDODtring().slice(0, 10) : '');

        }
    }, [goal]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit(title, description, targetDate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Target Date</label>
                <input
                type='date'
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
                />
            </div>
            <div>
                <button type='submit'>{goal ? 'Update Goal' : 'Add Goal'}</button>
                <button type='button' onclick={onCancel}>Cancel</button>
            </div>
        </form>
    )
};

export default GoalForm;