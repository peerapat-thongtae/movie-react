import { MovieDb } from 'moviedb-promise'

class TMDBService extends MovieDb {
  constructor() {
    super(import.meta.env.VITE_TMDB_API_KEY || '')
  }
}

const tmdbService = new TMDBService()

export default tmdbService
