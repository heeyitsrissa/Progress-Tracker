import React from 'react';
import TodosWidget from '../components/TodoWidget';
import WorkoutWidget from '../components/WorkoutWidget';
import MacrosWidget from '../components/MacrosWidget';

const Dashboard = () => {
    return (
       <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className='widgets-container'>
            <TodosWidget />
            <WorkoutWidget />
            <MacrosWidget />
        </div>
       </div>
    )
}

export default Dashboard;