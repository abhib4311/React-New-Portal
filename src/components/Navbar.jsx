import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };
    return (
        <nav className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-4  w-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Left Section (Logo and Title) */}
                <div className="flex items-center space-x-2 h-10" onClick={handleClick}>
                    <button className="flex items-center space-x-2 h-10 bg-transparent border-none text-white cursor-pointer" onClick={handleClick}>
                        <FontAwesomeIcon icon={faNewspaper} className="text-white text-2xl" />
                        <h1 className="text-white text-lg font-semibold">React News Portal</h1>
                    </button>
                </div>

                {/* Right Section (Search Bar and Toggle Button) */}
                <div className="flex items-center space-x-4">
                    {/* Search Bar */}
                    <div className={`${isSearchVisible ? 'block' : 'hidden'} md:flex items-center w-full md:w-auto`}>
                        <SearchBar />
                    </div>

                    {/* Toggle Button for Search Bar */}
                    <button
                        onClick={toggleSearch}
                        className="text-white hover:text-gray-300 focus:outline-none md:hidden"
                    >
                        <FontAwesomeIcon icon={isSearchVisible ? faTimes : faSearch} className="text-xl" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
