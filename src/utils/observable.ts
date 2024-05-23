import tmdbService from '@/services/tmdb-service'
import { DiscoverMediaRequest } from '@/types/media.type'
import dayjs from 'dayjs'
import { forkJoin, from, map, Observable, of, switchMap } from 'rxjs'

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
    return from(tmdb.tvInfo({ id: id || '', append_to_response: 'credits,account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch_providers,watch-providers,videos,release_dates,watch/providers' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          account_status: accountStatus(resp?.account_states),
          media_type,
          directors: getDirectors(resp?.credits?.crew).length > 0 ? getDirectors(resp?.credits?.crew) : resp.created_by,
          writers: getWriters(resp?.credits?.crew),
          trailers: getTrailers(resp?.videos),
          release_date_th: releaseDateTH(resp.release_dates) || resp.release_date,
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
    return from(tmdb.movieInfo({ id: id || '', append_to_response: 'account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch-providers,videos,release_dates' })).pipe(
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

export const discoverMedia$ = (mediaType: string, searchParam: DiscoverMediaRequest): Observable<any> => {
  const tmdb = tmdbService

  if (mediaType === 'movie') {
    return from(tmdb.discoverMovie(searchParam)).pipe(
      switchMap((resp) => {
        return of(resp.results || []).pipe(
          switchMap(results => forkJoin(results.map(val => mediaInfo$(mediaType, val.id)))),
          map(val => ({ ...resp, results: val })),
        )
      }),
    )
  }
  else {
    return from(tmdb.discoverTv(searchParam)).pipe(
      switchMap((resp) => {
        return of(resp.results || []).pipe(
          switchMap(results => forkJoin(results.map(val => mediaInfo$(mediaType, val.id)))),
          map(val => ({ ...resp, results: val })),
        )
      }),
    )
  }
}
