import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setSearchQuery, setCategory } from '../stores/slices/newsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        try {

            if (trimmedQuery) {
                dispatch(setSearchQuery(trimmedQuery));
                dispatch(setCurrentPage(1));
                dispatch(setCategory(''));
                navigate('/');
            } else {
                console.log('Please enter a search query');
            }
        } catch (error) {
            console.error('Error setting search query:', error);
            // Handle error as needed, such as displaying an error message to the user
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center w-full flex-grow gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for news..."
                className="p-2 rounded border border-gray-300 flex-grow min-w-0 w-full sm:w-1/2 md:w-2/3 lg:w-1/3 xl:w-1/4 h-10" // Adjusted height to h-10
            />
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded flex items-center h-10" // Adjusted height to h-10
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    );
};

export default SearchBar;
