import axios from "axios";

const API_KEY = "2b3f7a502c10436812da7a6deb0e09ed"; // Get from https://www.themoviedb.org/settings/api
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Helper function to build image URLs
export const getImageUrl = (path, size = "w500") => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder-movie.png";
};

// API calls
export const getPopularMovies = (page = 1) => {
  return tmdb.get("/movie/popular", { params: { page } });
};

export const searchMovies = (query, page = 1) => {
  return tmdb.get("/search/movie", { params: { query, page } });
};

export const getMovieDetails = (movieId) => {
  return tmdb.get(`/movie/${movieId}`);
};

export const getMovieCredits = (movieId) => {
  return tmdb.get(`/movie/${movieId}/credits`);
};

export default tmdb;
