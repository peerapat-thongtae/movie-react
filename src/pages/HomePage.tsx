import Loading from '@/components/common/Loading'
import Slider from '@/components/common/Slider'
import Hero from '@/components/media/Hero'
import { MediaCard } from '@/components/media/MediaCard/test'
import { useConfigTMDB } from '@/hooks/useConfig'
import { useDiscoverMedia, useMediasByStatus } from '@/hooks/useMedia'
import { DiscoverMediaRequest } from '@/types/media.type'
import { useAuth0 } from '@auth0/auth0-react'
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
  const { data: continueWatchingTV } = useMediasByStatus('tv', 'watching')
  const { isAuthenticated } = useAuth0()

  const popularMerges = useMemo(() => {
    if (popularMovies && popularTV) {
      const arr = []
      if (popularMovies?.results.length > 0) {
        arr.push(...popularMovies.results)
      }

      if (popularTV?.results.length > 0) {
        arr.push(...popularTV.results)
      }
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
          <Carousel showThumbs={false} stopOnHover={false} showStatus={false} autoPlay={autoPlay} interval={10000}>
            {popularMerges.map((media: any) => {
              return <div key={media.id} className="h-[98vh]"><Hero media={media} /></div>
            })}
          </Carousel>
        )
      }
      {(isLoadingPopularMovies && isLoadingPopularTV)
      && <div className="h-screen"><Loading /></div>}

      {isAuthenticated
      && (
        <div className="my-12 px-16 text-xl font-bold flex flex-col gap-8">
          <div>
            <Slider
              header={(
                <div className="flex justify-between">
                  <span>
                    Continue Watching
                    {continueWatchingTV?.total_results && ` (${continueWatchingTV?.total_results})`}
                  </span>
                  <span>See All...</span>
                </div>
              )}
              isLoading={!!(isLoadingPopularMovies && isLoadingPopularTV)}
              children={(
                <div className="flex gap-8">
                  {continueWatchingTV?.results.map((item: any) => {
                    return (
                      <div className="w-[300px] h-[550px]  overflow-hidden">
                        <MediaCard item={item} mediaType="tv" />
                      </div>
                    )
                  })}
                </div>
              )}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default HomePage
