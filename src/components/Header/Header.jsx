import React, { useState } from 'react';
import { Logo, Logout } from '../index.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaXmark } from "react-icons/fa6";

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

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
        <header className="bg-black text-white fixed top-0 left-0 right-0 py-4 px-6 z-50">
            <nav className="flex items-center justify-between">
                <div className="mr-4">
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <ul className="md:flex ml-auto hidden">
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
                <div className="md:hidden flex items-center mt-1">
                    <button 
                        onClick={toggleMenu} 
                        className="cursor-pointer"
                    >
                        {isMenuOpen ? <FaXmark className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                    </button>
                </div>

                <ul 
                    className={`block gap-12 text-lg space-y-4 py-6 mt-14 bg-black text-white md:hidden
                    ${isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden"}
                `}>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button 
                                    onClick={() => navigate(item.slug)}
                                    className="flex justify-start w-full px-6 py-2 duration-200 hover:bg-orange-400"
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