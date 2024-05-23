import tmdbService from '@/services/tmdb-service'
import { getConfigTMDB, setConfigState } from '@/stores/slice'
import { ConfigTMDB } from '@/types/media.type'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forkJoin } from 'rxjs'
export const useConfigTMDB = () => {
  const defaultConfig = useSelector(getConfigTMDB)
  const dispatch = useDispatch()
  const [config, setConfig] = useState<ConfigTMDB>(defaultConfig)

  const getConfiguration = () => {
    forkJoin({
      config: tmdbService.configuration(),
      countries: tmdbService.countries(),
      jobs: tmdbService.jobs(),
      languages: tmdbService.languages(),
      genreMovies: tmdbService.genreMovieList(),
      genreTV: tmdbService.genreTvList(),
    }).subscribe({
      next: (resp) => {
        const configObj: ConfigTMDB = {
          genreMovies: resp.genreMovies.genres || [],
          genreTV: resp.genreTV.genres || [],
          countries: resp.countries,
          jobs: resp.jobs,
          languages: resp.languages,
          images: resp.config.images,
        }
        setConfig(configObj)
        dispatch(setConfigState(configObj))
      },
    })
  }

  useEffect(() => {
    if (!config) {
      getConfiguration()
    }
  }, [])

  return config
}
