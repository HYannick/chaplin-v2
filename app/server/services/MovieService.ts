export class MovieError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'MovieError'
  }
}

class MovieService {
  private readonly apiUrl: string
  private readonly apiKey: string

  constructor() {
    const config = useRuntimeConfig()
    this.apiUrl = config.public.apiUrl
    this.apiKey = config.public.apiKey
  }

  private async fetchMovies(endpoint: string) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new MovieError(
          `Failed to fetch movies: ${response.statusText}`,
          response.status
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof MovieError) throw error
      throw new MovieError(
        'Failed to fetch movies',
        500,
        error instanceof Error ? error : undefined
      )
    }
  }

  async getFeaturedMovies() {
    return this.fetchMovies('/movies/featured')
  }

  async getUpcomingMovies() {
    return this.fetchMovies('/movies/upcoming')
  }

  async getMovieById(id: string) {
    return this.fetchMovies(`/movies/${id}`)
  }
}

export function createMovieService() {
  return new MovieService()
}