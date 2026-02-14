import { useState, useEffect } from "react";
import { useWatchList } from "../contexts/MovieContext.jsx";

const MovieCard = ({ movie }) => {
  const {addToWatchList, removeFromWatchList, isInWatchList} = useWatchList();
  const[isFavorite, setIsFavorite] = useState(false);
  const inWatchList = isInWatchList(movie.id);

  useEffect (() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
    const isFavoriteMovie = favorites.some(fav => fav.id === movie.id);
    setIsFavorite(isFavoriteMovie);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovie')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovie', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favoriteMovie', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const handleWatchListClick = () => {
    if (inWatchList) {
      removeFromWatchList(movie.id);
    } else{
      addToWatchList(movie);
    }
  }; 

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src= {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button 
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
        <button 
        className={`watchlist-button ${inWatchList ? 'added' : ''}`}
        onClick={handleWatchListClick}>
          {inWatchList ? '✓ Add to Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;