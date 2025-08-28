import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import HomePage from "./components/HomePage.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import WatchlistPage from "./components/WatchlistPage.jsx";
import { WatchlistProvider } from "./contexts/WatchlistContext.jsx";
import "./App.css";

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WatchlistProvider>
  );
}

export default App;
