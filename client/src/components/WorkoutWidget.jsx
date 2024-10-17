import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WORKOUTS_FOR_DAY } from '../utils/queries';
import { AuthProvider } from '../context/AuthContext';

const WorkoutWidget = () => {
    const { user } = AuthProvider();
    const today = new Date().toISOString().split('T')[0];

    const { loading, error, data } = useQuery(GET_WORKOUTS_FOR_DAY, {
        variables: { userId: user._id, date: today},
    });

    if(loading) return <p>Loading workouts...</p>;
    if(error) return <p>Error loaing workouts</p>;

    return(
        <div className='workouts-widget'>
            <h3>Today's Workouts</h3>
            {data.workouts.length === 0 ? (
                <p>No workouts scheduled for today.</p>
            ) : (
                data.workouts.map(workout => (
                    <div key={workout._id}>
                        <h4>{workout.title}</h4>
                        <p>{workout.description}</p>
                        <p>Duration: {workout.duration} mins</p>
                        <h5>Exercises</h5>
                        <ul>
                            {workout.exercises.map((exercise, index) => (
                                <li key={index}>
                                    {exercise.name} - {exercise.reps} reps x {exercise.sets} sets
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    )
}

export default WorkoutWidget;