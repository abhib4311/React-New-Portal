import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '../../services/newsService';

const initialState = {
    articles: [],
    category: 'general',
    searchQuery: '',
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    status: 'idle',
    error: null,
    totalResults: 0,
    currentPage: 1,
};
export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async ({ category, searchQuery }, { rejectWithValue }) => {
        try {
            const data = await fetchArticles(category, searchQuery);
            return {
                articles: data.articles,
                totalResults: data.totalResults,
            };
        } catch (error) {
            // Return the detailed error message from the API response
            return rejectWithValue(error.response.data);
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        addToFavorites(state, action) {
            state.favorites.push(action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFromFavorites(state, action) {
            state.favorites = state.favorites.filter((item) => item.url !== action.payload.url);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload.articles;
                state.totalResults = action.payload.totalResults;
                state.error = null;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            });
    },
});

export const {
    setCategory,
    setSearchQuery,
    addToFavorites,
    removeFromFavorites,
    setCurrentPage,
} = newsSlice.actions;

export default newsSlice.reducer;
