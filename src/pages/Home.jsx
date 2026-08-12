import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { fetchPopularMovies } from '../services/movieApi';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchPopularMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError('Failed to load movies. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error-message">
          <p>{error}</p>
          <p className="error-hint">
            Get a free API key from{' '}
            <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">
              TMDB
            </a>{' '}
            and add it to your .env file as VITE_TMDB_API_KEY
          </p>
          <button onClick={loadMovies} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <h2 className="section-title">Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;