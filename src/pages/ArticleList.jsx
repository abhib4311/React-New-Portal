import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setCurrentPage } from '../stores/slices/newsSlice';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';

import { quantum } from 'ldrs'
import ErrorPage from '../components/Error';
import LoadingPage from '../components/Loading';

quantum.register()


// Default values shown


const ArticleList = () => {
    const dispatch = useDispatch();
    const { articles, status, category, searchQuery, currentPage, totalResults } = useSelector(state => state.news);
    const articlesPerPage = 16;


    useEffect(() => {
        // Fetch news based on category or search query whenever the current page, category, or search query changes
        dispatch(fetchNews({ category, searchQuery }));
    }, [dispatch, category, searchQuery, currentPage]);

    const totalPages = Math.ceil(totalResults / articlesPerPage);

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    if (status === 'loading') {
        return <LoadingPage />;
    }

    if (status === 'failed') {
        return <ErrorPage />;
    }

    if (articles.length === 0) {
        return (
            <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-white">No articles found.</h1>
            </div>
        );
    }

    return (
        <div className='bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 pb-4'>

            <div className="flex flex-col items-center justify-center h-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    {searchQuery
                        ? `Showing results for: "${searchQuery}"`
                        : `Showing results for: ${category.charAt(0).toUpperCase() + category.slice(1)} category`}
                </h1>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage).map((article) => (
                    <ArticleCard key={article.title} article={article} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default ArticleList;
