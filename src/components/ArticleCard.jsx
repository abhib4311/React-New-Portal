import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../stores/slices/newsSlice';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ArticleCard = ({ article }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector(state => state.news.favorites) || [];

    const isFavorite = favorites.some(favArticle => favArticle.url === article.url);

    const handleFavoriteToggle = () => {
        console.log('Favorites:', favorites);

        if (isFavorite) {
            dispatch(removeFromFavorites(article));
        } else {
            dispatch(addToFavorites(article));
        }
    };

    const handleReadMore = () => {
        navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
    };

    return (

        <div className="bg-gray-100 p-7 m-3 rounded shadow-md flex flex-col justify-between">
            <img src={article.urlToImage ? article.urlToImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7KG7xLTZLgP9i_LV32xiC6ysQID3Fx5wq3Q'} alt={article.title} className="w-full h-60 object-cover rounded mb-4" />
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-center mb-2 line-clamp-4">{article.title}</h2>
                <p className="text-sm text-center mb-4">{new Date(article.publishedAt).toLocaleDateString()} by {article.author}</p>
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={handleReadMore}
                    className="text-blue-500 hover:underline"
                >
                    Read more
                </button>
                <button
                    onClick={handleFavoriteToggle}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors"
                >
                    {isFavorite ? <FaHeart className="text-red-600" /> : <FaRegHeart className="text-red-600" />}
                </button>
            </div>
        </div>
    );
};

export default ArticleCard;
