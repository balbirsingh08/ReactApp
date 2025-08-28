import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../contexts/WatchlistContext';
import { getImageUrl } from '../api/tmdb';

const MovieCard = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={getImageUrl(movie.poster_path, 'w300')} 
          alt={movie.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/2c3e50/ecf0f1?text=No+Image';
          }}
        />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p className="release-date">{movie.release_date}</p>
          <div className="rating">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </Link>
      <button 
        className={`watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
        onClick={handleWatchlistToggle}
      >
        {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
};

export default MovieCard;