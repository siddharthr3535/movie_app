
import React, { useEffect, useState } from 'react';
import './MovieDetail.css'; // Import the CSS file for MovieDetail styling

const API_URL = "https://www.omdbapi.com?apikey=60634d76";

const MovieDetail = ({ imdbID }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
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
    <div className="movie-detail-card"> {/* Apply the "movie-detail-card" class */}
      {movieDetails ? (
        <div className="movie-detail-content"> {/* Apply the "movie-detail-content" class */}
         <h2>{movieDetails.Title}</h2>
          <p><h3>Year:</h3> {movieDetails.Year}</p>
          <p><h3>Genre:</h3> {movieDetails.Genre}</p>
          <p><h3>Director:</h3> {movieDetails.Director}</p>
          <p><h3>Plot:</h3> {movieDetails.Plot}</p>
          {/* Add more movie details here */}
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
      </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetail;

