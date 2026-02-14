import MovieGrid from "../components/MovieGrid";
import { useWatchList } from "../contexts/MovieContext.jsx";

function Watchlist () {
    const { watchList} = useWatchList();

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>Watchlist</h2>
                <p>Movies that you still gotta watch!</p>
            </div>
            {watchList.length > 0 ? (
                <MovieGrid movies={watchList} /> ) : (
                    <div className="empty-state">
                        <p>No movies in your watchlist. Go find some and add them!</p>
                    </div>
                )}
        </main>
    );
};

export default Watchlist;