import dayjs from 'dayjs'
import ButtonMediaAccount from '../ButtonMediaAccount/v2'
import { useMemo } from 'react'
// import PosterImage from '../common/PosterImage'
import { Tooltip } from 'react-tooltip'
// import { useIMDB } from '@/shared/hooks/useMedia'
import { FaStar } from 'react-icons/fa'
import { FaImdb } from 'react-icons/fa'
import { useAuth0 } from '@auth0/auth0-react'
import { Media, MediaType } from '@/types/media.type'
import NotFoundImage from '@/assets/images/image-not-found.png'
import Image from '@/components/common/Image'
import { useConfigTMDB } from '@/hooks/useConfig'
import { useRoute } from '@/hooks/useRoute'

interface MediaCardProps {
  item: Media
  mediaType: MediaType
  size?: string
}
export const MediaCard = (props: MediaCardProps) => {
  const { navigate } = useRoute()
  const item = props.item
  // const disabledImdb = import.meta.env.MODE !== 'development'
  const mediaType = props.mediaType || item.media_type || ''
  const imagePath = item.poster_path

  // const { data: imdbData, isLoading: isLoadingImdb } = useIMDBRating(item.imdb_id)

  const ratingObj = useMemo(() => {
    return {
      vote_average: item.vote_average || 0,
      vote_count: item.vote_count || 0,
    }
  }, [])

  const title = item.title || item.name
  const size = props.size || 'MEDIUM'
  const { isAuthenticated } = useAuth0()
  const imageHeight = useMemo(() => {
    if (size === 'MEDIUM') {
      return `w-auto h-[12rem] md:h-[28rem]`
    }
    else if (size === 'SMALL') {
      return 'w-auto h-[8rem] md:h-[20rem]'
    }
    else {
      return 'w-auto h-[28rem]'
    }
  }, [])

  const { getImagePath } = useConfigTMDB()

  const goToDetail = () => {
    navigate(`/${mediaType}/${item.id}`)
  }

  const mediaYear = (item.release_date || item.first_air_date) ? dayjs(item.release_date || item.first_air_date).format('YYYY') : '-'
  return (
    // <Link href={`/${mediaType}/${item.id}`} className="">
    <div className="w-auto">
      <div
        className={`cursor-pointer group relative m-0 flex rounded-xl ring-gray-900/5 sm:mx-auto ${imageHeight}`}
      >
        {isAuthenticated
        && (
          <div
            className="pointer-events-auto rounded-full bg-black px-1.5 py-1 opacity-100 absolute top-0 right-0 z-20 m-2 transition duration-300 ease-in-out group-hover:opacity-100"
          >
            <div className="flex items-center justify-center">
              <ButtonMediaAccount media={item} />
            </div>
          </div>
        )}
        <div
          className="text-white font-bold text-sm rounded-full bg-black px-2 py-1 opacity-100 absolute top-0 left-0 z-20 m-2 transition duration-300 ease-in-out group-hover:opacity-100"
        >
          { mediaYear }
        </div>
        <div className="z-10 h-full overflow-hidden rounded-xl w-full" onClick={goToDetail}>
          {/* <PosterImage url={`/${mediaType}/${item.id}`} image_path={imagePath} /> */}
          {/* <img
            onClick={() => navigate(`/${mediaType}/${item.id}`)}
            src={imagePath ? `https://www.themoviedb.org/t/p/w1280/${imagePath}` : NotFoundImage}
            className="w-full object-cover rounded-t-lg h-full"
          /> */}
          <Image
            src={imagePath ? getImagePath(imagePath, 'poster') : NotFoundImage}
            alt={item.name || ''}
            className="w-full object-cover rounded-t-lg h-full"
            effect="zoomIn"
            reEffect
          />
        </div>
        <div
          className="bg-grey-90 px-2 py-1 absolute bottom-0 z-20 transition duration-300 ease-in-out opacity-0 group-hover:opacity-90 min-h-8 w-full rounded-xl rounded-t-none"
        >
          {ratingObj.vote_average
            ? (
              <div className="flex justify-between text-white font-bold md:text-sm text-xs">
                <div className="flex gap-2 align-middle items-center">
                  <FaImdb size={22} color="yellow" />
                  <span>
                    { ratingObj.vote_average ? ratingObj.vote_average?.toFixed(1) : '' }
                  </span>
                  <span><FaStar color="yellow" /></span>
                </div>
                <span>
                  { ratingObj.vote_count?.toLocaleString() }
                  {' '}
                  Votes
                </span>
              </div>
            )
            : (
              <div className="text-xs md:text-sm">
                Release Date:
                {' '}
                {item.release_date_th || item.first_air_date ? dayjs(item.release_date_th || item.first_air_date).format('DD/MM/YYYY') : ''}
              </div>
            )}
        </div>
      </div>
      <div className="truncate text-left font-bold hover:cursor-pointer dark:text-black hover:text-yellow-500 py-2">
        <Tooltip id="my-tooltip" className="z-[99]" />
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={title}
          data-tooltip-place="top"
        >
          { title }
        </span>
      </div>
    </div>
  )
}
