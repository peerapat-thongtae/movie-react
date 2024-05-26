import tmdbService from '@/services/tmdb-service'
import { getConfigTMDB, setConfigState } from '@/stores/slice'
import { ConfigTMDB, ImageType } from '@/types/media.type'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forkJoin } from 'rxjs'
import NotFoundImage from '@/assets/images/image-not-found.png'
import NoImageBackdrop from '@/assets/images/no-image-backdrop.png'
import { union } from 'lodash'
import { WatchProvider } from 'moviedb-promise'
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
      watchProvidersTV: tmdbService.tvWatchProviderList({}),
      watchProvidersMovie: tmdbService.movieWatchProviderList({}),
    }).subscribe({
      next: (resp) => {
        const providerTV = resp.watchProvidersTV.results?.filter((val: any) => val.display_priorities?.['TH'] !== undefined)
        const providerMovie = resp.watchProvidersMovie.results?.filter((val: any) => val.display_priorities?.['TH'] !== undefined)
        const watchProviders = union(providerMovie, providerTV)
        const configObj: ConfigTMDB = {
          genreMovies: resp.genreMovies.genres || [],
          genreTV: resp.genreTV.genres || [],
          countries: resp.countries,
          jobs: resp.jobs,
          languages: resp.languages,
          images: { ...resp.config.images },
          watchProviders,
        }

        console.log('tasdadsac', watchProviders.map(val => val.provider_name))
        setConfig(configObj)
        dispatch(setConfigState(configObj))
      },
    })
  }

  const getImagePath = (imagePath: string, type: ImageType) => {
    const posterSize = type === 'poster' ? 'w780' : 'original'
    return imagePath ? `${config.images.base_url}/${posterSize}${imagePath}` : (type === 'poster' ? NotFoundImage : NoImageBackdrop)
  }

  const getLogoPath = (providerName: string) => {
    const findProviderLogo: WatchProvider | undefined = config.watchProviders.find(val => val.provider_name === providerName)

    console.log(providerName, config.watchProviders, findProviderLogo)
    return providerName ? `${config.images.base_url}/w92${findProviderLogo?.logo_path}` : ''
  }

  return { config, getConfiguration, getImagePath, getLogoPath }
}
