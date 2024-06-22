
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorPage from '../components/Error';

const ArticlePage = () => {
    const { state } = useLocation();
    const { article } = state || {};
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            if (article) {
                try {
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch article content.');
                }
            } else {
                setError('Article not found.');
                setLoading(false);
            }
        };

        fetchContent();
    }, [article]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className='w-full bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 pb-4'>   <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 ">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-10">
                {(
                    <img className="w-full h-96 object-cover" src={article.urlToImage ? article.urlToImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7KG7xLTZLgP9i_LV32xiC6ysQID3Fx5wq3Q'} alt={article.title} />
                )}
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">{article.title}</h1>
                    <p className="text-sm text-gray-500 mb-4">
                        {new Date(article.publishedAt).toLocaleDateString()} by {article.author}
                    </p>
                    <p className="text-lg text-gray-700 mb-4">{article.description}</p>

                    <a
                        href={article.url}
                        className="text-blue-500 hover:underline mt-4 inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read more on {article.source.name}
                    </a>
                </div>
            </div>
        </div></div>
    );
};

export default ArticlePage;
