import { Country, DiscoverMovieRequest, DiscoverTvRequest, Genre, Job, Language, MovieResponse, TvResult } from 'moviedb-promise'

export type MediaType = 'movie' | 'tv' | 'anime'

export type Media = (MovieResponse & TvResult) & {
  media_type: MediaType | string
  release_date_th: Date | string
  directors: any[]
  writers: any[]
  trailers: any[]
}

export type ConfigTMDB = {
  genreMovies: Array<Genre>
  genreTV: Array<Genre>
  countries: Array<Country>
  jobs: Array<Job>
  languages: Array<Language>
  images: {
    base_url?: string
    secure_base_url?: string
    backdrop_sizes?: string[]
    logo_sizes?: string[]
    poster_sizes?: string[]
    profile_sizes?: string[]
    still_sizes?: string[]
  }
}

export type DiscoverMediaRequest = DiscoverMovieRequest & DiscoverTvRequest

export type ImageType = 'poster' | 'backdrop'
