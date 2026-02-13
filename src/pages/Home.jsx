import MovieGrid from '../components/MovieGrid';
import { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayMovies= searchResults || movies

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const movieData = await getPopularMovies();
      setMovies(movieData);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if(loading) {
  return (
    <main className="main-content">
      <LoadingSpinner />
    </main>
  );
};
return (
  <main className="main-content">
    <div className="content-header">
      <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
      <p>Discover and save your favorite films</p>
    </div>
    <MovieGrid movies={displayMovies} />
  </main>
);
};

export default Home;