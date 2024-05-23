import { useAPI } from '@/hooks/api/useAPI'
import { useConfigTMDB } from '@/hooks/useConfig'
import { getAccountStateById, setAccountStates } from '@/stores/slice'
import { IRootState } from '@/stores/store'
import { DiscoverMediaRequest, MediaType } from '@/types/media.type'
import { discoverMedia$ } from '@/utils/observable'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { catchError, forkJoin, from, lastValueFrom, map, of } from 'rxjs'

export const useAccountStateAll = () => {
  const { getAccountStates, token } = useAPI()
  const dispatch = useDispatch()

  const [data, setDatas] = useState<any[]>([])
  const { isLoading, isAuthenticated } = useAuth0()

  const fetchAccountStates = () => {
    console.log('token', token)
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

export const useMediaAccountStateById = (mediaType: MediaType, id: string) => {
  const { addToWatchlist: addStateApi } = useAPI()
  const accountState = useSelector((state: IRootState) => getAccountStateById(state, mediaType, id))
  const [isLoading, setIsLoading] = useState(false)

  const addRated = async (rate: number) => {
    setIsLoading(true)
    const api = addStateApi(mediaType, id, rate ? 'watched' : '')
    from(api).subscribe()
  }

  const addToWatchlist = async (status: boolean) => {
    setIsLoading(true)
    from(addStateApi(mediaType, id, status ? 'watchlist' : '')).pipe(
      // delay(2000),
    ).subscribe(() => {
      setIsLoading(false)
    })
  }

  return { data: accountState, isLoading: isLoading, addRated, addToWatchlist }
}

export const useTMDBParam = () => {
  const config = useConfigTMDB()
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

export const useDiscoverMedia = (mediaType: string, initialSearchParam?: DiscoverMediaRequest) => {
  const defaultPage = 1
  const { tvShowParams, tvAnimeParams } = useTMDBParam()
  const [page, setPage] = useState<number>(defaultPage || 1)
  const [searchParam, setSearch] = useState<DiscoverMediaRequest>({
    ...initialSearchParam,
  })

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
  }, [page, searchParam])

  const query = useQuery(['discovers', mediaType, page, setPage], async () => {
    return lastValueFrom(handleDiscover())
  })

  console.log(query.isFetchedAfterMount)
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
