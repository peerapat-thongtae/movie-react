import Loading from '@/components/common/Loading'
import MediaHeroDetail from '@/components/media/MediaHeroDetail'
import { useMediaDetail } from '@/hooks/useMedia'
import { MediaType } from '@/types/media.type'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface MediaDetailPageProps {
  mediaType: MediaType
}
const MediaDetailPage = (props: MediaDetailPageProps) => {
  const param = useParams()
  const { data: media, isLoading, isFetched } = useMediaDetail(param.id || '', props.mediaType)

  useEffect(() => {
    if (media)
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [isFetched])
  return (
    <div className="min-h-screen">
      {!isLoading
        ? <MediaHeroDetail media={media} mediaType={props.mediaType} />
        : <div className="h-screen"><Loading /></div>}
    </div>
  )
}

export default MediaDetailPage
