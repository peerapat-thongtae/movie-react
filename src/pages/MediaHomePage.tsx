import MediaGrid from '@/components/media/MediaGrid'
import { useDiscoverMedia } from '@/hooks/useMedia'
import { MediaType } from '@/types/media.type'
import { useEffect } from 'react'

interface MediaHomePageProps {
  mediaType: MediaType
}
const MediaHomePage = (props: MediaHomePageProps) => {
  const { data: medias, page, setPage, isLoading, searchParam } = useDiscoverMedia(props.mediaType)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [searchParam])
  return (
    <div className="px-8 my-32">

      <MediaGrid
        mediaType={props.mediaType}
        size="FULL"
        isLoading={isLoading}
        items={medias?.results}
        totalResults={medias?.total_results}
        totalPages={medias?.total_pages}
        page={page || 1}
        setPage={setPage}
      />
    </div>

  )
}

export default MediaHomePage
