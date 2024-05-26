// Interfaces
import { Media, MediaType } from '@/types/media.type'
// Images
import Image from '@/components/common/Image'
import dayjs from 'dayjs'
import ModalVideo from 'react-modal-video'
import { FaBookmark, FaPlayCircle, FaSpinner } from 'react-icons/fa'
import { useState } from 'react'
import { useMediaAccountStateById } from '@/hooks/useMedia'
import { cn } from '@/utils/tailwind.helper'
import { IoMdEye } from 'react-icons/io'

// Local interface
interface IProps {
  media: Media
  mediaType: MediaType
}

const MediaHeroDetail = ({ media, mediaType }: IProps) => {
  // Variables
  const title = media.title || media.name
  const releaseDate = dayjs(media.release_date_th || media.release_date || media.first_air_date).format('DD/MM/YYYY') || ''
  const originalName = media.original_name || media.title || media.name
  const director = media.directors?.[0]?.name || '-'
  const writer = media.writers?.[0]?.name || '-'
  const [isOpenTrailer, setIsOpenTrailer] = useState(false)
  const { data: accountState, addToWatchlist, addRated, isLoading: isLoadingAccountState } = useMediaAccountStateById(mediaType, media.id || '')

  // Error image

  return (
    <>
      {/* Banner */}
      <div className="relative">
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 1 }}
          isOpen={isOpenTrailer}
          videoId={media.trailers?.[0]?.key}
          onClose={() => setIsOpenTrailer(false)}
        />
        <Image
          src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${media.backdrop_path}`}
          alt={media.name}
          className="w-full md:min-h-[800px] md:h-[800px] object-cover bg-center pointer"
          effect="zoomIn"
        />
        {/* <div className="md:min-h-[800px] md:h-[800px]">
          <DemoComponent muted={false} width="100%" height="800px" videoKey={media.trailers?.[0]?.key} />
        </div> */}
        <div className="absolute z-[1] top-0 flex justify-center h-full w-full items-center">
          <FaPlayCircle className="cursor-pointer hover:text-yellow-500" onClick={() => setIsOpenTrailer(!isOpenTrailer)} size={50} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t dark:from-background from-main dark:via-background/90 via-main/20 dark:via-20% via-50% dark:to-background/10 to-main/5 to-70%" />
      </div>

      {/* Detail */}
      <div
        className={`relative flex justify-center ${media.backdrop_path ? 'md:-mt-52 -mt-28' : 'mt-32'} z-10`}
      >
        <div className="mx-48 pb-24">
          <div className="flex justify-between">
            <span className="text-4xl text-left font-extrabold truncate ">{title}</span>
            <span className="text-4xl text-left font-extrabold truncate ">{releaseDate}</span>
          </div>
          <hr className="my-8" />
          <div className="flex w-[64rem] max-w-[64rem] gap-8">
            <div className="">
              <div className="w-full">
                {/* <PosterImage image_path={media?.poster_path} /> */}
                <Image
                  src={media?.poster_path ? `https://www.themoviedb.org/t/p/w1280/${media.poster_path}` : ''}
                  alt={media?.title || ''}
                  effect="zoomIn"
                  className="min-h-[400px] h-auto w-[400px] rounded-lg"
                />
              </div>
              {/* Section Account State */}
              <div className="flex justify-around my-4">
                {!isLoadingAccountState
                && (
                  <>
                    <div onClick={() => addToWatchlist(!accountState?.watchlist)} className="flex flex-col gap-2 items-center cursor-pointer hover:text-yellow-500">
                      <FaBookmark size="24" className={cn(accountState?.watchlist && 'text-yellow-500')} />
                      <span className="text-xs">Watchlist</span>
                    </div>
                    <div onClick={() => addRated()} className="flex flex-col gap-2 items-center cursor-pointer hover:text-yellow-500">
                      <IoMdEye size="24" className={cn(accountState?.watched && 'text-yellow-500')} />
                      <span className="text-xs">Watched</span>
                    </div>
                  </>
                )}

                {isLoadingAccountState && (
                  <div className="flex justify-center my-4 gap-2">
                    <FaSpinner size="24" className="text-yellow-500 animate-spin" />
                    <span>Loading...</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="pb-4">
                <div className="flex gap-2">
                  {media?.genres?.map((genre: any) => {
                    if (!genre) return
                    // onClick={() => discoverByGenre(genre.id)}
                    return <div key={genre.id} className="cursor-pointer truncate px-2 py-0.5 text-center items-center rounded-lg text-xs bg-pink-600 hover:text-yellow-500 text-white font-bold">{genre.name}</div>
                  })}
                </div>
                {media.tagline
                && (
                  <div className="pt-4 text-sm">
                    {media.tagline}
                  </div>
                )}
              </div>
              <hr className="" />
              <div className="py-4">
                <div className="text-2xl">Details</div>
                <div className="text-sm py-4">
                  <div className="flex gap-2 py-1">
                    <span>Original Name:</span>
                    <span className="text-gray-400 ">{originalName}</span>
                  </div>
                  <div className="flex gap-2 py-1">
                    <span>Director:</span>
                    <span className="text-gray-400 hover:text-yellow-500 link">{director}</span>
                  </div>
                  <div className="flex gap-2 py-1">
                    <span>Writers:</span>
                    <span className="text-gray-400 hover:text-yellow-500 link">{writer}</span>
                  </div>
                  <div className="flex gap-2 py-1">
                    <span>Language:</span>
                    <span className="text-gray-400 hover:text-yellow-500 link">{media.original_language?.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-2 py-1">
                    <span>Status:</span>
                    <span className="text-gray-400 ">{media.status}</span>
                  </div>
                  <div className="flex gap-2 py-1">
                    <span>Release Date:</span>
                    <span className="text-gray-400 ">{releaseDate}</span>
                    <span className="text-gray-200 hover:text-yellow-500 cursor-pointer">See more..</span>
                  </div>

                </div>
              </div>
              <hr className="" />
              <div className="py-4">
                <div className="text-2xl">Overview</div>
                <div className="text-sm py-4">
                  <p className="line-clamp-4 break-words text-sm text-gray-400 w-auto text-left">
                    {media.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MediaHeroDetail
