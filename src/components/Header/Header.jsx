import React from 'react';
import { Container, Logo, Logout } from '../index.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Blogs",
            slug: "/all-blogs",
            active: authStatus,
        },
        {
            name: "Add Blog",
            slug: "/add-blog",
            active: authStatus,
        }
    ]

    return (
        <header className="bg-black text-white fixed top-0 left-0 right-0 py-4 px-6">
            <nav className="flex items-center">
                <div className="mr-4">
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <ul className="flex ml-auto">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button 
                                    onClick={() => navigate(item.slug)}
                                    className="inline-block px-6 py-2 duration-200 hover:bg-orange-400 rounded-full"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}
                    {authStatus && (
                        <li>
                            <Logout />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;