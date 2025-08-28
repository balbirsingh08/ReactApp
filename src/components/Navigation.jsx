import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../contexts/WatchlistContext';

const Navigation = () => {
  const { watchlist } = useWatchlist();

  return (
    <nav className="navigation">
      <Link to="/" className="nav-brand">Movie Discovery</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/watchlist">
          Watchlist {watchlist.length > 0 && <span className="watchlist-count">{watchlist.length}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;