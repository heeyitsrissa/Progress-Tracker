import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

const Navbar = ()=> {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to='/'>Progress Tacker</Link>
            </div>
            <ul classnName='navbar-links'>
                <li>
                    <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link to='/macros'>Macros</Link>
                </li>
                <li>
                    <Link to='/workouts'>Workouts</Link>
                </li>
                <li>
                    <Link to='/goals'>Goals</Link>
                </li>
                <li>
                    <Link to='/todos'>To-dos</Link>
                </li>
                {AuthService.loggedIn() ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                )}

            </ul>
        </nav>
    )
};

export default Navbar;