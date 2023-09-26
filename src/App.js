import React, { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
//60634d76
const API_URL = "https://www.omdbapi.com?apikey=60634d76";
const movie1 = {
    "Title": "Spiderman",
    "Year": "1990",
    "imdbID": "tt0100669",
    "Type": "movie",
    "Poster": "N/A"
}
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies('marvel');
    }, [])
    return (
        <div className='app'>
            <h1>CineFresco</h1>
            <div className='search'>
                <input
                    placeholder='Search your movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                >
                </input>
                <img src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)} />
            </div>
            {
                movies?.length > 0 ? (<div
                    className='container'>
                    {movies.map((movie) =>
                        <MovieCard movie={movie} />
                    )}
                </div>) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>

                )
            }

        </div>
    )
}

export default App;