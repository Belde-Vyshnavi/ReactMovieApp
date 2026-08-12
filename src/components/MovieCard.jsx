import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.stopPropagation();
    toggleFavorite(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.url} alt={movie.title} />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorite ? '❤' : '🤍'}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
export default MovieCard;