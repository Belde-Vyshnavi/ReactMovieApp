import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';
const IMAGE_BASE_URL = 'https://static.tvmaze.com/uploads/images';

const tvmaze = axios.create({
  baseURL: BASE_URL,
});

export const fetchPopularMovies = async () => {
  // TVMaze doesn't have a direct "popular movies" endpoint
  // We'll search for popular shows/movies
  const response = await tvmaze.get('/search/shows', { params: { q: 'popular' } });
  return response.data.slice(0, 20).map(formatShow);
};

export const fetchTopRatedMovies = async () => {
  // Get shows with high ratings
  const response = await tvmaze.get('/search/shows', { params: { q: 'breaking bad' } });
  return response.data.slice(0, 20).map(formatShow);
};

export const searchMovies = async (query) => {
  const response = await tvmaze.get('/search/shows', { params: { q: query } });
  return response.data.map(formatShow);
};

export const fetchMovieDetails = async (movieId) => {
  const response = await tvmaze.get(`/shows/${movieId}`);
  return formatShow({ show: response.data }, true);
};

function formatShow(item, detailed = false) {
  const show = item.show || item;
  return {
    id: show.id,
    title: show.name,
    release_date: show.premiered || show.status,
    overview: show.summary ? show.summary.replace(/<[^>]*>/g, '') : 'No description available',
    poster_path: show.image?.medium || show.image?.original,
    backdrop_path: show.image?.original,
    vote_average: show.rating?.average || 0,
    vote_count: show.rating?.count || 0,
    genre_ids: show.genres || [],
    url: show.image?.medium || null,
    backdrop_url: show.image?.original || null,
    ...(detailed && {
      genres: show.genres,
      runtime: show.runtime,
      network: show.network,
      status: show.status,
    }),
  };
}

export { IMAGE_BASE_URL };