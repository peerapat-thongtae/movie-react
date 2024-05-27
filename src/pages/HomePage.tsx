import Loading from '@/components/common/Loading'
import Hero from '@/components/media/Hero'
import { useConfigTMDB } from '@/hooks/useConfig'
import { useDiscoverMedia } from '@/hooks/useMedia'
import { DiscoverMediaRequest } from '@/types/media.type'
import dayjs from 'dayjs'
import { shuffle } from 'lodash'
import { useMemo, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

const HomePage = () => {
  const { config } = useConfigTMDB()
  const upcomingMovieRequest: DiscoverMediaRequest = {
    'release_date.gte': dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
    'release_date.lte': dayjs().add(3, 'week').startOf('week').format('YYYY-MM-DD'),
    'region': 'TH',
  }
  const upcomingTVRequest: DiscoverMediaRequest = {
    'air_date.gte': dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
    'air_date.lte': dayjs().add(3, 'week').startOf('week').format('YYYY-MM-DD'),
    'sort_by': 'popularity.desc',
    'with_watch_providers': config.watchProviders.map(val => val.provider_id).join('|'),
    'watch_region': 'TH',
    'page': 1,
  }

  const [autoPlay] = useState<boolean>(true)
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

  return (
    <div className="">
      {
        !isLoadingPopularTV && !isLoadingPopularMovies && popularMerges.length > 0 && (
          <Carousel stopOnHover={false} showStatus={false} autoPlay={autoPlay} interval={10000}>
            {popularMerges.map((media: any) => {
              return <div key={media.id} className="h-[94vh]"><Hero media={media} /></div>
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
