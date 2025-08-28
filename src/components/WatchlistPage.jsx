import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../contexts/WatchlistContext';
import MovieList from './MovieList';

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="watchlist-page">
      <div className="header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>My Watchlist</h1>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty</p>
          <Link to="/" className="cta-button">Discover Movies</Link>
        </div>
      ) : (
        <MovieList movies={watchlist} title={`My Watchlist (${watchlist.length})`} />
      )}
    </div>
  );
};

export default WatchlistPage;