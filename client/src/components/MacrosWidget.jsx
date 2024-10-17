import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MACROS_UP_TO_DAY } from '../utils/queries';
import { AuthProvider } from '../context/AuthContext';

const MacrosWidget = () => {
    const { user } = AuthProvider();
    const today = new Date().toISOString().split('T')[0];

    const { loading, error, data } = useQuery(GET_MACROS_UP_TO_DAY, {
        variabales: {userId: user._id, date: today},
    });

    if(loading) return <p>Loading macros</p>;
    if(error) return <p>Error loading macros</p>;

    const totalMacros = data.macros.reduce(
        (totals, macro) => {
            return {
                calories: totals.calories + macro.calories,
                protein: totals.protein + macro.protein,
                carbs: totals.carbs + macro.carbs,
                fat: totals.fat + macro.fat,
            };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    return (
        <div className='macros-widget'>
            <h3>Today's Macros</h3>
            <p>Calories: {totalMacros.calories}</p>
            <p>Protein: {totalMacros.protein}</p>
            <p>Carbs: {totalMacros.carbs}</p>
            <p>Fat: {totalMacros.fat}</p>
        </div>
    )
};

export default MacrosWidget;