
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import ArticleList from './pages/ArticleList';

const App = () => {

  return (
    <Router>
      <div>
        <Navbar />
        <CategoryFilter />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:title" element={<ArticlePage />} />
          <Route path="/myfavorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
