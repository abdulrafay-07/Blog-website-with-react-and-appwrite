import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { logout } from '../../store/authSlice.js';

const Logout = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout());
        })
    }

    return (
        <button 
            onClick={logoutHandler} 
            className="flex justify-start w-full md:inline-block px-6 py-2 duration-200 hover:bg-orange-400 md:rounded-full"
        >
            Log out
        </button>
    )
    }

export default Logout;