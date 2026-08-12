import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites">
        <h2 className="section-title">My Favorites</h2>
        <div className="empty-favorites">
          <p>No favorites yet. Click the heart on a movie to add it!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2 className="section-title">My Favorites ({favorites.length})</h2>
      <div className="movie-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;