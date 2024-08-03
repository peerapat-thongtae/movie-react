import MediaGrid from '@/components/media/MediaGrid'
import { useDiscoverMedia } from '@/hooks/useMedia'
import { MediaType } from '@/types/media.type'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSessionStorage } from 'react-use'

interface MediaHomePageProps {
  mediaType: MediaType
}
const MediaHomePage = (props: MediaHomePageProps) => {
  const location = useLocation()
  const [prevState, setPrevState] = useSessionStorage<any>(location.pathname)
  const { data: medias, page, setPage, isLoading, searchParam } = useDiscoverMedia(props.mediaType)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPrevState(searchParam)
  }, [searchParam])

  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
    }
    else {
      setPrevState(prevState)
      setPage(prevState?.page || 1)
    }
  }, [props.mediaType])

  return (
    <div className="px-8 my-32">
      <MediaGrid
        mediaType={props.mediaType}
        size="MEDIUM"
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
