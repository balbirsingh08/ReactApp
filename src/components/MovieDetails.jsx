import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits, getImageUrl } from "../api/tmdb";
import { useWatchlist } from "../contexts/WatchlistContext";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(parseInt(id));

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [detailsResponse, creditsResponse] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
        ]);

        setMovie(detailsResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("Failed to fetch movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-details">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="movie-details-content">
        <div className="movie-poster">
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x750/2c3e50/ecf0f1?text=No+Image";
            }}
          />
        </div>

        <div className="movie-info">
          <h1>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>

          <div className="details-top">
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="runtime">{movie.runtime} min</span>
            <button
              className={`watchlist-btn ${inWatchlist ? "in-watchlist" : ""}`}
              onClick={handleWatchlistToggle}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>

          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="overview">{movie.overview}</p>

          <div className="cast-section">
            <h3>Top Cast</h3>
            <div className="cast-list">
              {credits.cast.slice(0, 6).map((actor) => (
                <div key={actor.id} className="cast-member">
                  <img
                    src={getImageUrl(actor.profile_path, "w185")}
                    alt={actor.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/185x278/2c3e50/ecf0f1?text=No+Image";
                    }}
                  />
                  <p className="actor-name">{actor.name}</p>
                  <p className="character">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
