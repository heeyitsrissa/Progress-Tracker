import React, {useState} from 'react';
import {  useQuery, useMutation } from '@apollo/client';
import { GET_GOALS } from '../utils/queries';
import { ADD_GOAL, REMOVE_GOAL, UPDATE_GOAL } from '../utils/mutation';
import GoalForm from '../components/GoalForm';

const Goals = () => {
    const { loading, error, data } = useQuery(GET_GOALS);
    const [addGoal] = useMutation(ADD_GOAL);
    const [removeGoal] = useMutation(REMOVE_GOAL);
    const [updateGoal] = useMutation(UPDATE_GOAL);

    const [showForm, setShowForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    if(loading) return <p>Loading goals...</p>
    if(error) return <p>Error fetching goals!</p>

    const handleAddGoal = async (title, description, targetDate) => {
        await addGoal({
            variables: { title, description, targetDate },
            refetchQueries: [{ query: GET_GOALS }],
        });
        setShowForm(false);
    };

    const handleUpdateGoal = async (id, title, description, targetDate, completed) => {
        await updateGoal({
            variables: { id, title, description, targetDate, completed },
            refetchQueries: [{ query: GET_GOALS }],
        });
        setEditingGoal(null);
    };
    
    const handleRemoveGoal = async (id) => {
        await removeGoal({
            variables: { id },
            refetchQueries: [{ query: GET_GOALS }]
        })
    };

    const activeGoals = data.goals.filter(goal => !goal.completed);
    const completedGoals = data.goals.filter(goal => goal.completed);

    return (
        <div className="goals-page">
            <h1>Your Goals</h1>

            <button onClick={() => setShowForm(true)}>Add New Goal</button>

            {showForm && <GoalForm onSubmit={handleAddGoal} onCancel={() => setShowForm(false)} />}
                {editingGoal && (
                    <GoalForm
                    goal={editingGoal}
                    onSubmit={(title, description, targetDate) => handleUpdateGoal(editingGoal.id, title, description, targetDate, editingGoal.completed)}
                    onCancel={() => setEditingGoal(null)}
                    />
                )}

                <h2>Active Goals</h2>
                <ul>
                    {activeGoals.map(goal => {
                        <li key={goal._id}>
                            <h3>{goal.title}</h3>
                            <p>{goal.description}</p>
                            <p>Target Date: {newDate(goal.targetDate).toLocaleDateString()}</p>
                            <button onClick={() => setEditingGoal(goal)}>Edit</button>
                            <button onClick={() => handleUpdateGoal(goal._id, goal.title. goal.description, goal.targetDate, true)}>Mark as Completed</button>
                            <button onclick={() => handleRemoveGoal(goal._id)}>Delete</button>
                        </li>
                    })}
                </ul>
        </div>
    )
}

export default Goals;