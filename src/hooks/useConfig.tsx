import tmdbService from '@/services/tmdb-service'
import { getConfigTMDB, setConfigState } from '@/stores/slice'
import { ConfigTMDB, ImageType } from '@/types/media.type'
import { useState } from 'react'
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
          images: { ...resp.config.images },
        }
        setConfig(configObj)
        dispatch(setConfigState(configObj))
      },
    })
  }

  const getImagePath = (imagePath: string, type: ImageType) => {
    const posterSize = type === 'poster' ? 'w780' : 'w1280'
    return `${config.images.base_url}/${posterSize}${imagePath}`
  }

  return { config, getConfiguration, getImagePath }
}
