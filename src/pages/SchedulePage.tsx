import MediaGrid from '@/components/media/MediaGrid'
// import { useConfigTMDB } from '@/hooks/useConfig'
import { useDiscoverMedia } from '@/hooks/useMedia'
import { DiscoverMediaRequest } from '@/types/media.type'
import dayjs from 'dayjs'

const SchedulePage = () => {
  const currentDate = dayjs().format('YYYY-MM-DD')
  // const { config } = useConfigTMDB()
  const movieTodayRequest: DiscoverMediaRequest = {
    'release_date.gte': currentDate,
    'release_date.lte': currentDate,
    'region': 'TH',
  }
  const tvTodayRequest: DiscoverMediaRequest = {
    'air_date.gte': currentDate,
    'air_date.lte': currentDate,
    'sort_by': 'popularity.desc',
    // 'with_watch_providers': config.watchProviders.map(val => val.provider_id).join('|'),
    // 'region': 'TH',
    // 'timezone': 'Asia/Bangkok',
    // 'watch_region': 'TH',
    'page': 1,
  }
  const movieTodayQuery = useDiscoverMedia('movie', movieTodayRequest)
  const tvTodayQuery = useDiscoverMedia('tv_anime', tvTodayRequest)
  return (
    <div className="my-24 px-8">
      <div className="flex justify-center text-2xl font-bold mt-36 mb-4">Movie Release Today</div>
      <MediaGrid
        mediaType="movie"
        size="MEDIUM"
        gridCols={4}
        items={movieTodayQuery?.data?.results}
        page={movieTodayQuery.page}
        isLoading={movieTodayQuery.isLoading}
        setPage={movieTodayQuery.setPage}
        totalPages={movieTodayQuery.data?.total_pages}
        totalResults={movieTodayQuery.data?.total_results}
      />
      {/* <MediaGrid
        mediaType="tv"
        size="MEDIUM"
        gridCols={4}
        items={tvTodayQuery?.data?.results}
        page={tvTodayQuery.page}
        isLoading={tvTodayQuery.isLoading}
        setPage={tvTodayQuery.setPage}
        totalPages={tvTodayQuery.data?.total_pages}
        totalResults={tvTodayQuery.data?.total_results}
      /> */}
    </div>
  )
}
//
export default SchedulePage
