

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setCurrentPage, setSearchQuery } from '../stores/slices/newsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronDown, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = ['business', 'technology', 'entertainment', 'health', 'science', 'sports'];

const CategoryFilter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = useSelector((state) => state.news.category);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleCategoryChange = (category) => {
        dispatch(setCategory(category));
        dispatch(setSearchQuery(''))
        dispatch(setCurrentPage(1));
        setDropdownOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleFavoriteClick = () => {
        dispatch(setCategory('fav'));
        navigate('/myfavorites');
    };

    return (
        <div className="flex font-semibold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 justify-center items-center space-x-2 w-full p-5">
            <button
                key={'general'}
                onClick={() => handleCategoryChange('general')}
                className={`w-1/4 flex-grow py-2 rounded-lg ${selectedCategory === 'general' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white hover:bg-gray-800 transition-all duration-300 ease-in-out'}`}
            >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
            </button>

            <div className="hidden md:flex space-x-2 w-4/5">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`flex-grow py-2 rounded-lg ${selectedCategory === category ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white hover:bg-gray-800 transition-all duration-300 ease-in-out'}`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div className="relative md:hidden flex-grow">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full py-2 px-3 rounded-lg  bg-gray-800 text-white hover:bg-gray-500 transition-all duration-300 ease-in-out flex justify-between items-center ${dropdownOpen ? 'bg-gray-400' : ''}`}
                >
                    <span>{selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'Choose Category'}</span>
                    <FontAwesomeIcon icon={faChevronDown} className={`ml-2 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg border-gray-300 rounded-lg shadow-lg z-10">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`block w-full text-left py-2 px-4 border border-gray-300 ${selectedCategory === category ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white hover:bg-gray-800 transition-all duration-300 ease-in-out'}`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={handleFavoriteClick}
                className={`w-1/4 flex-grow py-2 rounded-lg ${selectedCategory === 'fav' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white hover:bg-gray-800 transition-all duration-300 ease-in-out'}`}
            >
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                <span className="hidden md:inline">My Favorite</span>
                <span className="md:hidden">Favourite</span>
            </button>
        </div>
    );
};

export default CategoryFilter;
