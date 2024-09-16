import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import App from './App.jsx';
import Error from './pages/Error'
import Dashboard from './pages/Dashboard';
import Todos from './pages/Todos';
import Macros from './pages/Macros';
import Goals from './pages/Goals';
import Workouts from './pages/Workouts';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/', { replace: true, state: { from: location.pathname } })
        }
    }, [isAuthenticated, navigate, location.pathname]);
    return isAuthenticated ? children : null;
}

const router = createBrowserRouter([
{
    path: '/',
    element: <App/>,
    errorElement: <Error/>,
    children: [
        {
            index: true,
            element: <Dashboard />,
        },
        {
            path: '/todos',
            element: (
                <ProtectedRoute>
                    <Todos />
                </ProtectedRoute>
            ),
        },
        {
            path: '/macros',
            element: (
                <ProtectedRoute>
                    <Macros />
                </ProtectedRoute>
            ),
        },
        {
            path: '/goals',
            element: (
                <ProtectedRoute>
                    <Goals />
                </ProtectedRoute>
            ),
        },
        {
            path: '/workouts',
            element: (
                <ProtectedRoute>
                    <Workouts />
                </ProtectedRoute>
            )
        }

    ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
   </React.StrictMode>
);