import { Country, DiscoverMovieRequest, DiscoverTvRequest, Genre, Job, Language, MovieReleaseDatesResponse, MovieResponse, ShowResponse, WatchProvider, WatchProviderResponse } from 'moviedb-promise'

export type MediaType = 'movie' | 'tv' | 'anime' | 'person'
export type SearchType = 'movie' | 'tv' | 'person' | 'multi'

export type CreditType = 'cast' | 'crew'

export type Media = (MovieResponse & ShowResponse) & {
  media_type: MediaType | string
  release_date_th: Date | string
  directors: any[]
  writers: any[]
  trailers: any[]
  release_dates: MovieReleaseDatesResponse
  watch_providers: WatchProviderResponse
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
  watchProviders: Array<WatchProvider>
}

export type AccountState = {
  id: number
  media_type: string
  number_of_seasons: number
  number_of_episodes: number
  user_id: string
  watchlist: boolean
  watched: boolean
  watchlisted_at: string
  updated_at: string
  episode_watched: any[]
  account_status?: string
}

export type DiscoverMediaRequest = DiscoverMovieRequest & DiscoverTvRequest

export type ImageType = 'poster' | 'backdrop'
