import axios from 'axios';

const API_KEY = '1a9c898f05de4cb5985938a3693c4812';
const BASE_URL = 'https://newsapi.org/v2';
const LANG = 'en';
const COUNTRY = 'in';

export const fetchArticles = async (category, searchQuery) => {
    const params = {
        pageSize: 100,
        apiKey: API_KEY,
        language: LANG,
        country: COUNTRY,
    };

    if (category) {
        params.category = category;
    }

    if (searchQuery) {
        params.q = searchQuery;
    }

    try {
        const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
        console.log('Full response:', response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        throw error;
    }
};
