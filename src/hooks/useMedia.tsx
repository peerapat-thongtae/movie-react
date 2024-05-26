import { useAPI } from '@/hooks/api/useAPI'
import { useConfigTMDB } from '@/hooks/useConfig'
import tmdbService from '@/services/tmdb-service'
import { getAccountStateById, setAccountStateById, setAccountStates } from '@/stores/slice'
import { IRootState } from '@/stores/store'
import { DiscoverMediaRequest, Media, MediaType, SearchType } from '@/types/media.type'
import { discoverMedia$, mediaInfo$, searchMedia$ } from '@/utils/observable'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { catchError, delay, forkJoin, from, lastValueFrom, map, of } from 'rxjs'

export const useAccountStateAll = () => {
  const { getAccountStates } = useAPI()
  const dispatch = useDispatch()

  const [data, setDatas] = useState<any[]>([])
  const { isLoading, isAuthenticated } = useAuth0()

  const fetchAccountStates = () => {
    forkJoin({ movies: getAccountStates('movie'), tv: getAccountStates('tv') }).subscribe({
      next: (resp) => {
        const { movies, tv } = resp
        const states = [...movies.data.results, ...tv.data.results]
        dispatch(setAccountStates(states))
        setDatas(states || [])
      },
    })
  }

  const clearAccountStates = () => {
    dispatch(setAccountStates([]))
    setDatas([])
  }

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        fetchAccountStates()
      }
      else {
        clearAccountStates()
      }
    }
  }, [isLoading, isAuthenticated])

  return { data, fetch: fetchAccountStates, clearAccountStates }
}

export const useMediaAccountStateById = (mediaType: MediaType, id: string | number) => {
  const { addToWatchlist: addStateApi } = useAPI()
  const dispatch = useDispatch()
  const defaultAccountState = useSelector((state: IRootState) => getAccountStateById(state, mediaType, id))
  const [accountState, setAccountState] = useState(defaultAccountState)
  const [isLoading, setIsLoading] = useState(false)

  const addRated = async () => {
    setIsLoading(true)
    const api = addStateApi(mediaType, id, !accountState?.watched ? 'watched' : '')
    from(api).subscribe({
      next: (resp) => {
        setAccountState(resp.data)
        setIsLoading(false)
      },
    })
  }

  const addToWatchlist = async (status: boolean) => {
    setIsLoading(true)
    from(addStateApi(mediaType, id, status ? 'watchlist' : '')).pipe(
    ).subscribe({
      next: (resp) => {
        setAccountState(resp.data)
        setIsLoading(false)
        toast('Success')
      },
      error: () => {
        toast('')
      },
    })
  }

  useEffect(() => {
    if (accountState) {
      dispatch(setAccountStateById(accountState))
    }
  }, [accountState])

  return { data: accountState, isLoading: isLoading, addRated, addToWatchlist }
}

export const useTVEpisodeAccountState = (id: string | number, seasonNumber: number, episodeNumber: number, mediaType: MediaType) => {
  const { updateTVEpisodes } = useAPI()
  const dispatch = useDispatch()
  const accountState = useSelector((state: IRootState) => {
    const tvState = getAccountStateById(state, mediaType, id)
    return tvState?.episode_watched.find((val) => {
      return val.episode_number === episodeNumber && val.season_number === seasonNumber
    }) || null
  })
  const [isLoading, setIsLoading] = useState(false)

  const addWatched = async () => {
    setIsLoading(true)
    const api = updateTVEpisodes({ id: id, episode_watched: [{ season_number: seasonNumber, episode_number: episodeNumber }] })
    from(api).pipe(delay(2000)).subscribe({
      next: (resp) => {
        dispatch(setAccountStateById({ ...resp.data, mediaType }))
        setIsLoading(false)
      },
    })
  }

  return { data: accountState, isLoading: isLoading, addWatched }
}

export const usePopularMedia = (mediaType: MediaType) => {
  const fetch = () => {
    const func = mediaType === 'movie' ? tmdbService.moviePopular() : tmdbService.moviePopular()
    return lastValueFrom(from(func))
  }

  return useQuery(['popular', mediaType], fetch)
}

export const useMediaDetail = (id: string, mediaType: string) => {
  const getDetail = () => {
    return mediaInfo$(mediaType, id).pipe(
      catchError(() => {
        return of(null)
      }),
    )
  }

  const query = useQuery<Media | undefined>(['media_detail', id, mediaType], () => lastValueFrom(getDetail()))

  return query
}

export const useTVSeasonDetail = (mediaType: MediaType, mediaId: number | string, seasonNumber: number) => {
  const { data: tvState } = useMediaAccountStateById(mediaType, mediaId)
  const fetch = () => {
    return lastValueFrom(from(tmdbService.seasonInfo({ id: mediaId, season_number: +seasonNumber })).pipe(
      map((resp) => {
        const episodes = resp.episodes
          ? resp.episodes.map((val) => {
            const findWatched = tvState?.episode_watched?.find((state) => {
              return state.season_number === seasonNumber && state.episode_number === val.episode_number
            })
            return {
              ...val,
              account_status: findWatched ? 'watched' : '',
            }
          })
          : []

        return {
          ...resp,
          episodes,
        }
      }),
    ))
  }

  const query = useQuery(['tv_season', mediaId, seasonNumber], fetch)
  return query
}

export const useSearch = (searchString: string, searchType: SearchType) => {
  const [page, setPage] = useState<number>(1)

  const fetch = () => {
    return searchMedia$(searchType, searchString, page)
  }

  const query = useQuery(['search', searchType, searchString, page], async () => lastValueFrom(fetch()))

  return { ...query, page, setPage }
}

export const useTMDBParam = () => {
  const { config } = useConfigTMDB()
  const withoutJp = config.languages.filter(val => val.iso_639_1 !== 'ja')

  const tvShowParams = useMemo(() => {
    return {
      with_type: '2|4',
      with_original_language: withoutJp.map(val => val.iso_639_1).join('|'),
      without_genres: '16',
    }
  }, [config])
  const tvAnimeParams = useMemo(() => {
    return {
      with_original_language: 'ja',
      with_genres: '16',
    }
  }, [config])

  return { tvAnimeParams, tvShowParams }
}

export const useCredits = (mediaType: MediaType, mediaId: string | number) => {
  const fetch = () => {
    const creditFn = mediaType === 'movie' ? tmdbService.movieCredits({ id: mediaId }) : tmdbService.tvCredits({ id: mediaId })
    return lastValueFrom(
      from(creditFn).pipe(
      ),
    )
  }

  const query = useQuery(['credit', mediaId, mediaType], fetch)
  return query
}

export const useDiscoverMedia = (mediaType: string, initialSearchParam?: DiscoverMediaRequest) => {
  const defaultPage: number = 1
  const { tvShowParams, tvAnimeParams } = useTMDBParam()
  const [searchParam, setSearch] = useState<DiscoverMediaRequest>({
    ...initialSearchParam,
    page: initialSearchParam?.page || defaultPage,
  })

  const { page } = searchParam

  const setPage = (page: number) => {
    setSearch({ ...searchParam, page })
  }

  const setSearchParam = (param: DiscoverMediaRequest) => {
    setSearch({ ...param })
    setPage(1)
  }

  const initialDiscoverParam = useMemo(() => {
    if (mediaType === 'tv') {
      return tvShowParams
    }

    if (mediaType === 'anime') {
      return tvAnimeParams
    }

    return {}
  }, [mediaType])

  const handleDiscover = () => {
    return discoverMedia$(mediaType, {
      ...initialDiscoverParam,
      ...searchParam,
      page,
    })
  }

  useEffect(() => {
    setSearchParam({})
  }, [mediaType])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [searchParam])

  const query = useQuery(['discovers', mediaType, page, setPage], async () => {
    return lastValueFrom(handleDiscover())
  })

  return { ...query, page, setPage, searchParam, setSearchParam }
}

export const useIMDBRating = (imdbId: string | undefined, disabled = false) => {
  const { getImdbRating } = useAPI()

  const fetch = () => {
    if (!imdbId) {
      return of(null)
    }
    if (disabled) {
      return of(null)
    }
    return from(getImdbRating(imdbId)).pipe(
      catchError(() => of(null)),
      map(resp => ({
        ...resp,
        vote_average: resp?.data?.rating,
        vote_count: resp?.data?.votes,
      })),
    )
  }

  useEffect(() => {
    fetch()
  }, [imdbId])

  return useQuery(['imdb_rating', imdbId, disabled], async () => await lastValueFrom(fetch()))
}
