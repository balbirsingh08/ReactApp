import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import { getPopularMovies, searchMovies } from '../api/tmdb';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('Popular Movies');

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPopularMovies();
      setMovies(response.data.results);
      setPageTitle('Popular Movies');
    } catch (err) {
      setError('Failed to fetch popular movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await searchMovies(query);
      setMovies(response.data.results);
      setPageTitle(`Search Results for "${query}"`);
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Movie Discovery</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <MovieList movies={movies} title={pageTitle} />
      )}
    </div>
  );
};

export default HomePage;
