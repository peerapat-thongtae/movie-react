import '@/components/media/MediaCard/style.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import NotFoundImage from '@/assets/images/image-not-found.png'
import { MediaType } from '@/types/media.type'

interface MediaCardProps {
  url?: string
  title: string
  imagePath: string
  mediaType: MediaType
}
const MediaCard = (props: MediaCardProps) => {
  return (
    <SkeletonTheme>
      <div
        className="rounded-lg transition duration-300 ease-in-out hover:opacity-90"
      >
        <img
          src={props.imagePath ? `https://www.themoviedb.org/t/p/w1280/${props.imagePath}` : NotFoundImage}
          className="w-auto object-cover rounded-t-lg lg:h-96"
        />
        <div className="h-auto">
          <h2 className="text-md mt-2 pb-2 font-semibold text-neutral">
            {props.title}
          </h2>
        </div>
      </div>
    </SkeletonTheme>
  )
}

{ /* <div className=" w-[400px] h-[600px] border ">
        <LazyLoadImage
          src="https://www.themoviedb.org/t/p/w1280/pKaA8VvfkNfEMUPMiiuL5qSPQYy.jpg"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </div> */ }
export default MediaCard
