import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import MovieDetail from './MovieDetail';

const API_URL = "https://www.omdbapi.com?apikey=60634d76";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null); // State for selected movie IMDb ID

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    // Reset selected movie when performing a new search
    setSelectedMovieId(null);
  };

  useEffect(() => {
    searchMovies('marvel');
  }, []);

  return (
    <div className='app'>
      <h1>CineFresco</h1>
      <div className='search'>
        <input
          placeholder='Search your movie'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {selectedMovieId && (
        <MovieDetail imdbID={selectedMovieId} />
      )}
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onCardClick={() => setSelectedMovieId(movie.imdbID)}
            />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
