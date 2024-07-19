import dayjs from 'dayjs'
import ButtonMediaAccount from '../ButtonMediaAccount/v2'
// import { useMemo } from 'react'
// import PosterImage from '../common/PosterImage'
import { Tooltip } from 'react-tooltip'
// import { useIMDB } from '@/shared/hooks/useMedia'
import { FaStar } from 'react-icons/fa'
import { FaImdb } from 'react-icons/fa'
import { SiThemoviedatabase } from 'react-icons/si'
import { useAuth0 } from '@auth0/auth0-react'
import { Media, MediaType } from '@/types/media.type'
import Image from '@/components/common/Image'
import { useNavigate } from 'react-router-dom'

interface MediaCardProps {
  item: Media
  mediaType: MediaType
  size?: string
}

const MediaCard2 = (props: MediaCardProps) => {
  const navigate = useNavigate()
  const item = props.item
  // const disabledImdb = import.meta.env.MODE !== 'development'
  const mediaType = props.mediaType || item.media_type || ''

  const title = item.title || item.name
  const { isAuthenticated } = useAuth0()

  const goToDetail = () => {
    navigate(`/${mediaType}/${item.id}`)
  }

  const mediaYear = (item.release_date || item.first_air_date) ? dayjs(item.release_date || item.first_air_date).format('YYYY') : '-'
  return (
    <div className="w-full h-full relative aspect-[1_/_1.54] cursor-pointer">
      <div className="group relative text-center w-full aspect-[1_/_1.54] shadow-[0px_4px_5px_0px_hsla(0,0%,0%,0.14),0px_1px_10px_0px_hsla(0,0%,0%,0.12),0px_2px_4px_-1px_hsla(0,0%,0%,0.2)] overflow-hidden rounded-xl">
        <div className="absolute z-20 w-full">
          <div className="flex justify-between">
            <div
              className="text-white w-auto h-auto font-bold text-sm rounded-full bg-black px-2 py-1 opacity-100 m-2 transition duration-300 ease-in-out"
            >
              {mediaYear}
            </div>
            {isAuthenticated
            && (
              <div
                className="pointer-events-auto rounded-full bg-black px-1.5 py-1 opacity-100 m-2 transition duration-300 ease-in-out group-hover:opacity-100"
              >
                <div className="flex items-center justify-center">
                  <ButtonMediaAccount media={item} />
                </div>
              </div>
            )}

          </div>
        </div>
        <Image
          src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
          alt="poster"
          className="object-cover h-full w-full"
          effect="zoomIn"
          reEffect
          onClick={goToDetail}
        />

        <div
          className="bg-grey-90 px-2 py-1 absolute bottom-0 z-20 transition duration-300 ease-in-out opacity-0 group-hover:opacity-90 min-h-8 w-full rounded-xl rounded-t-none"
        >
          {item.vote_average
            ? (
              <div className="flex justify-between text-white font-bold md:text-sm text-xs">
                <div className="flex gap-2 align-middle items-center">
                  {
                    item
                      ? <FaImdb size={22} color="yellow" />
                      : <SiThemoviedatabase size={22} color="yellow" />
                  }
                  <span>
                    { item.vote_average ? item.vote_average?.toFixed(1) : '' }
                  </span>
                  <span><FaStar color="yellow" /></span>
                </div>
                <span>
                  { item.vote_count?.toLocaleString() }
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

      <div className="truncate text-left text-md font-bold hover:cursor-pointer dark:text-black hover:text-yellow-500 my-2 w-auto">

        <Tooltip id="my-tooltip" className="z-[99]" />
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={title}
          data-tooltip-place="top"
        >
          <a href={`/${mediaType}/${item.id}`}>
            { title }
          </a>
        </span>
      </div>

    </div>
  )
}

export default MediaCard2
