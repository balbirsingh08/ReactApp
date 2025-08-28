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
  if (!path) {
    // Use SVG data URI as fallback instead of external URL
    const width = size === "w500" ? 500 : size === "w300" ? 300 : 185;
    const height = size === "w500" ? 750 : size === "w300" ? 450 : 278;

    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'><rect width='${width}' height='${height}' fill='%232c3e50'/><text x='50%' y='50%' font-family='Arial, sans-serif' font-size='18' fill='%23ecf0f1' text-anchor='middle' dominant-baseline='middle'>No Image</text></svg>`;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
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
