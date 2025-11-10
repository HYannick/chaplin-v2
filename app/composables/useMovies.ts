import type {Movie} from '~/domain/Movie';

export const  useMovies = () => {
  const {public: {apiUrl, apiKey}} = useRuntimeConfig();

  const authHeaders = {
    'x-api-key': apiKey,
  }

  const getAllMovies = async () => {
    const response = await fetch(`${apiUrl}/movies`, {
      headers: {
        ...authHeaders,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    return response.json();
  }

  const getFeaturedMovies = async () => {
    const response = await fetch(`${apiUrl}/movies/featured`, {
      headers: {
        ...authHeaders,
      },
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    return response.json();
  }

  const getUpcomingMovies = async () => {
    const response = await fetch(`${apiUrl}/movies/upcoming`, {
      headers: {
        ...authHeaders,
      },
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    return response.json();
  }

  const getMovieById = async (id: string) => {
    const response = await fetch(`${apiUrl}/movies/${id}`, {
      headers: {
        ...authHeaders,
      },
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    return response.json();
  }

  return {
    getAllMovies,
    getFeaturedMovies,
    getUpcomingMovies,
    getMovieById
  }
}