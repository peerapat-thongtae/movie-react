import { MediaType } from '@/types/media.type'

interface MediaHomePageProps {
  mediaType: MediaType
}
const MediaHomePage = (props: MediaHomePageProps) => {
  return (
    <div className="!m-0 !p-0">{props.mediaType}</div>
  )
}

export default MediaHomePage
