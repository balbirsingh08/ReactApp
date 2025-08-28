import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, title }) => {
  if (!movies || movies.length === 0) {
    return <div className="no-movies">No movies found</div>;
  }

  return (
    <div className="movie-list">
      {title && <h2>{title}</h2>}
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;