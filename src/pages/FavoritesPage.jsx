import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from '../components/ArticleCard';

const FavoritesPage = () => {
    const favorites = useSelector((state) => state.news.favorites);
    const articlesPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const sortedFavorites = [...favorites].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const totalPages = Math.ceil(sortedFavorites.length / articlesPerPage);
    const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    useEffect(() => {
        if (favorites.length === 0) {
            setCurrentPage(1);
        } else if ((currentPage - 1) * articlesPerPage >= sortedFavorites.length) {
            setCurrentPage(totalPages);
        }
    }, [favorites, currentPage, articlesPerPage, totalPages]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const prePage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        handlePageChange(page);
    };


    return (
        <div className='bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 pb-4 min-h-screen flex flex-col items-center '>


            {sortedFavorites.length === 0 ? (
                <div className=" h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-white">No articles found in Favorites.</h1>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">Showing results for: My Favorites</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {sortedFavorites
                            .slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage)
                            .map((article) => (
                                <div key={article.url}>
                                    <ArticleCard article={article} />
                                </div>
                            ))}
                    </div>
                    <nav className="flex justify-center mt-4">
                        <ul className='pagination flex space-x-2'>
                            <li className='page-item'>
                                <button
                                    className='page-link bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800'
                                    onClick={prePage}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                            </li>
                            {numbers.map((n) => (
                                <li
                                    className={`page-item ${currentPage === n ? 'active' : ''}`}
                                    key={n}
                                >
                                    <button
                                        className={`page-link px-4 py-2 rounded ${currentPage === n ? 'bg-gray-900 text-white' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                                        onClick={() => handlePageClick(n)}
                                    >
                                        {n}
                                    </button>
                                </li>
                            ))}
                            <li className='page-item'>
                                <button
                                    className='page-link bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800'
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );

};

export default FavoritesPage;
