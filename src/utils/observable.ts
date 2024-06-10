import tmdbService from '@/services/tmdb-service'
import TodoService from '@/services/todo.service'
import { DiscoverMediaRequest, MediaType, SearchType } from '@/types/media.type'
import dayjs from 'dayjs'
import { DiscoverMovieRequest, DiscoverMovieResponse, DiscoverTvResponse, SearchMultiResponse } from 'moviedb-promise'
import { forkJoin, from, map, Observable, of, switchMap, tap } from 'rxjs'

export const mediaInfo$ = (media_type: string, id: any) => {
  const tmdb = tmdbService

  const accountStatus = (acc: any) => {
    if (!acc) {
      return ''
    }
    if (acc.watchlist === true)
      return 'watchlist'
    else if (acc.rated)
      return 'watched'
    else
      return ''
  }

  const getDirectors = (crews: any) => {
    return crews ? crews.filter((val: any) => val.job === 'Director') : []
  }

  const getWriters = (crews: any) => {
    return crews ? crews.filter((val: any) => val.job === 'Writer' || val.job === 'Novel' || val.job === 'Screenplay') : []
  }

  const getTrailers = (videos: any) => {
    const trailers = videos?.results?.filter((video: any) => video.type === 'Trailer') || []

    if (trailers.length === 0) {
      return videos?.results?.filter((video: any) => video.type === 'Teaser') || []
    }

    return trailers
  }

  const releaseDateTH = (releaseDates: any) => {
    const dateResults = releaseDates?.results || []
    const findTH = dateResults.find((val: any) => val.iso_3166_1 === 'TH')
    return findTH?.release_dates?.[0]?.release_date ? dayjs(findTH?.release_dates?.[0]?.release_date).format('YYYY-MM-DD') : ''
  }

  if (media_type === 'tv' || media_type === 'anime') {
    return from(tmdb.tvInfo({ id: id || '', append_to_response: 'credits,account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch_providers,watch-providers,videos,release_dates,watch/providers,season/episode' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          account_status: accountStatus(resp?.account_states),
          media_type,
          directors: getDirectors(resp?.credits?.crew).length > 0 ? getDirectors(resp?.credits?.crew) : resp.created_by,
          writers: getWriters(resp?.credits?.crew),
          trailers: getTrailers(resp?.videos),
          release_date_th: resp.release_date,
          watch_providers: resp?.['watch/providers'],
          // release_date:
        }
      }),
    )
  }
  else if (media_type === 'person') {
    return from(tmdb.personInfo({ id: id || '' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          media_type,
        }
      }),
    )
  }
  else {
    return from(tmdb.movieInfo({ id: id || '', append_to_response: 'account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch-providers,videos,release_dates,watch/providers' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          account_status: accountStatus(resp?.account_states),
          media_type,
          directors: getDirectors(resp?.casts?.crew),
          writers: getWriters(resp?.casts?.crew),
          trailers: getTrailers(resp?.videos),
          release_date: resp.release_date,
          release_date_th: releaseDateTH(resp.release_dates) || resp.release_date,
        }
      }),
    )
  }
}

export const mediaInfos$ = (respResults: DiscoverMovieResponse | DiscoverTvResponse | SearchMultiResponse, media_type?: MediaType) => {
  return of(respResults.results || []).pipe(
    switchMap(results => forkJoin(results?.map(val => mediaInfo$(media_type || val.media_type, val.id)))),
    switchMap((results) => {
      const todoService = new TodoService()
      return from(todoService.getImdbRatingByIds(results.map(val => val.imdb_id))).pipe(
        map(resp => resp.data),
        map((imdbs) => {
          const resultsWithIMDB = results.map((tmdb) => {
            const findIMDB = imdbs.find((imdb: any) => imdb.id === tmdb.imdb_id)
            if (findIMDB) {
              // console.log('imdb', findIMDB)
              tmdb.vote_average = findIMDB.rating
              tmdb.vote_count = findIMDB.votes
            }
            console.log('tmdb', tmdb)
            return tmdb
          })

          return resultsWithIMDB
        }),
      )
    }),
    map(val => ({ ...respResults, results: val })),
    tap(console.log),
  )
}

export const discoverMedia$ = (mediaType: MediaType, searchParam: DiscoverMediaRequest): Observable<any> => {
  const tmdb = tmdbService

  if (mediaType === 'movie') {
    return from(tmdb.discoverMovie(searchParam as DiscoverMovieRequest)).pipe(
      switchMap((resp) => {
        return mediaInfos$(resp, 'movie')
      }),
    )
  }
  else {
    return from(tmdb.discoverTv(searchParam)).pipe(
      switchMap((resp) => {
        return mediaInfos$(resp, mediaType)
      }),
    )
  }
}

export const searchMedia$ = (searchType: SearchType, searchParam: string, page: number): Observable<any> => {
  const tmdb = tmdbService

  const searchFn = () => {
    if (searchType === 'movie') {
      return tmdb.searchMovie({ query: searchParam, page })
    }
    else if (searchType === 'tv') {
      return tmdb.searchTv({ query: searchParam, page })
    }
    else if (searchType === 'person') {
      return tmdb.searchPerson({ query: searchParam, page })
    }
    else {
      return tmdb.searchMulti({ query: searchParam, page })
    }
  }
  return from(searchFn()).pipe(
    switchMap((resp) => {
      return mediaInfos$(resp, searchType as MediaType)
    }),
  )
}
