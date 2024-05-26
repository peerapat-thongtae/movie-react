import Loading from '@/components/common/Loading'
import Hero from '@/components/media/Hero'
import { useConfigTMDB } from '@/hooks/useConfig'
import { useDiscoverMedia } from '@/hooks/useMedia'
import dayjs from 'dayjs'
import { shuffle } from 'lodash'
import { DiscoverMovieRequest, DiscoverTvRequest } from 'moviedb-promise'
import { useMemo, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { usePageLeave } from 'react-use'

const HomePage = () => {
  const { config } = useConfigTMDB()
  const upcomingMovieRequest: DiscoverMovieRequest = {
    'release_date.gte': dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
    'release_date.lte': dayjs().add(3, 'week').startOf('week').format('YYYY-MM-DD'),
    'region': 'TH',
  }
  const upcomingTVRequest: DiscoverTvRequest = {
    'air_date.gte': dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
    'air_date.lte': dayjs().add(3, 'week').startOf('week').format('YYYY-MM-DD'),
    'sort_by': 'popularity.desc',
    'with_watch_providers': config.watchProviders.map(val => val.provider_id).join('|'),
    'watch_region': 'TH',
  }

  const [autoPlay, setAutoPlay] = useState<boolean>(true)
  const { data: popularMovies, isLoading: isLoadingPopularMovies } = useDiscoverMedia('movie', upcomingMovieRequest)
  const { data: popularTV, isLoading: isLoadingPopularTV } = useDiscoverMedia('tv', upcomingTVRequest)

  const popularMerges = useMemo(() => {
    if (popularMovies && popularTV) {
      const arr = [...popularMovies.results, ...popularTV.results]
      return shuffle(arr)
    }
    else {
      return []
    }
  }, [isLoadingPopularMovies, isLoadingPopularTV])
  usePageLeave(() => {
    setAutoPlay(false)
  }, [])

  return (
    <div className="">
      {
        !isLoadingPopularTV && !isLoadingPopularMovies && popularMerges.length > 0 && (
          <Carousel showStatus={false} autoPlay={autoPlay} interval={5000}>
            {popularMerges.map((media: any) => {
              return <div className="h-[100vh]"><Hero media={media} /></div>
            })}
          </Carousel>
        )
      }
      {(isLoadingPopularMovies || isLoadingPopularTV)
      && <div className="h-screen"><Loading /></div>}
    </div>
  )
}

export default HomePage
