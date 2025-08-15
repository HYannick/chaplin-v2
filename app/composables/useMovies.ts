import type {Movie} from '~/domain/Movie';

export const  useMovies = () => {
  const {public: {apiUrl, apiKey}} = useRuntimeConfig();

  const authHeaders = {
    'x-api-key': apiKey,
  }

  const getAllMovies = () => {
    return useFetch<Movie[]>(`${apiUrl}/movies`, {
      headers: {
        ...authHeaders,
      },
      server: false
    });
  }

  const getFeaturedMovies = () => {
    return useFetch<Movie[]>(`${apiUrl}/movies/featured`, {
      headers: {
        ...authHeaders,
      },
      server: false
    });
  }

  const getUpcomingMovies = () => {
    return useFetch<Movie[]>(`${apiUrl}/movies/upcoming`, {
      headers: {
        ...authHeaders,
      },
      server: false
    });
  }

  const getMovieById = (id: string) => {
    return useFetch<Movie>(`${apiUrl}/movies/${id}`, {
      headers: {
        ...authHeaders,
      },
      server: false
    });
  }

  return {
    getAllMovies,
    getFeaturedMovies,
    getUpcomingMovies,
    getMovieById
  }
}