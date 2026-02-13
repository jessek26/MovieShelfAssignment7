const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function getPopularMovies() {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results; 
};

export async function searchMovies(query) {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    )
    const data = await response.json();
    return data.results;
};