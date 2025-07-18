import type {Movie} from '~/domain/Movie';

export const  useMovies = () => {
  const {public: {apiUrl, apiKey}} = useRuntimeConfig();

  const authHeaders = {
    'x-api-key': apiKey,
  }

  const getAllMovies = async () => {
    return useFetch<Movie[]>(`${apiUrl}/movies`, {
      headers: {
        ...authHeaders,
      },
    });
  }

  const getFeaturedMovies = async () => {
    return useFetch<Movie[]>(`${apiUrl}/movies/featured`, {
      headers: {
        ...authHeaders,
      },
    });
  }

  const getUpcomingMovies = async () => {
    return useFetch<Movie[]>(`${apiUrl}/movies/upcoming`, {
      headers: {
        ...authHeaders,
      },
    });
  }

  const getMovieById = async (id: string) => {
    return useFetch<Movie>(`${apiUrl}/movies/${id}`, {
      headers: {
        ...authHeaders,
      },
    });
  }

  return {
    getAllMovies,
    getFeaturedMovies,
    getUpcomingMovies,
    getMovieById
  }
}