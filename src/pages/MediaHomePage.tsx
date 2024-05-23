import MediaPagination from '@/components/media/MediaPagination'
import { useDiscoverMedia } from '@/hooks/useMedia'
import { useRoute } from '@/hooks/useRoute'
import { MediaType } from '@/types/media.type'

interface MediaHomePageProps {
  mediaType: MediaType
}
const MediaHomePage = (props: MediaHomePageProps) => {
  const { data: medias, page, setPage, isLoading } = useDiscoverMedia(props.mediaType)

  useRoute()
  return (
    <div className="px-8">
      <MediaPagination
        mediaType={props.mediaType}
        size=""
        isLoading={isLoading}
        items={medias?.results}
        totalResults={medias?.total_results}
        totalPages={medias?.total_pages}
        page={page}
        setPage={setPage}
      />
    </div>

  )
}

export default MediaHomePage
