import React, { useEffect, useState } from 'react';

const API_URL = "https://www.omdbapi.com?apikey=60634d76";

const MovieContainer = ({ imdbID }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch movie details using IMDb ID
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}&i=${imdbID}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  return (
    <div className="movie-details">
      {movieDetails ? (
        <div>
          <h2>{movieDetails.Title}</h2>
          <p>Year: {movieDetails.Year}</p>
          <p>Genre: {movieDetails.Genre}</p>
          <p>Director: {movieDetails.Director}</p>
          <p>Plot: {movieDetails.Plot}</p>
          {/* Add more movie details here */}
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieContainer;
