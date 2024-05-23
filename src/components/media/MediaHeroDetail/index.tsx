// Interfaces
import { Media, MediaType } from '@/types/media.type'
// Images
import Image from '@/components/common/Image'
import dayjs from 'dayjs'
import ModalVideo from 'react-modal-video'
import { FaPlayCircle } from 'react-icons/fa'
import { useState } from 'react'

// Local interface
interface IProps {
  media: Media
  mediaType: MediaType
}

const MediaHeroDetail = ({ media }: IProps) => {
  // Variables
  const title = media.title || media.name
  const releaseDate = dayjs(media.release_date_th || media.release_date || media.first_air_date).format('DD/MM/YYYY') || ''
  const originalName = media.original_name || media.title || media.name
  const director = media.directors?.[0]?.name || '-'
  const writer = media.writers?.[0]?.name || '-'
  const [isOpenTrailer, setIsOpenTrailer] = useState(false)
  // Error image

  const ModalTrailer = () => {
    return (
      <>
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 1 }}
          isOpen={isOpenTrailer}
          videoId={media.trailers?.[0]?.key}
          onClose={() => setIsOpenTrailer(false)}
        />
      </>
    )
  }

  return (
    <>
      {/* Banner */}
      <ModalTrailer />
      <div className="relative">
        <Image
          src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${media.backdrop_path}`}
          alt={media.name}
          className="w-full md:h-[800px] object-cover bg-center"
          effect="zoomIn"
        />
        <div className="absolute z-[1] top-0 flex justify-center h-full w-full items-center">
          <FaPlayCircle className="cursor-pointer hover:text-yellow-500" onClick={() => setIsOpenTrailer(true)} size={50} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t dark:from-background from-main dark:via-background/90 via-main/20 dark:via-20% via-50% dark:to-background/10 to-main/5 to-70%" />
      </div>

      <div
        className={`relative flex justify-center ${media.backdrop_path ? 'md:-mt-52 -mt-28' : 'mt-32'} z-10`}
      >

        <div className="mx-48 pb-24">
          <div className="flex justify-between">
            <span className="text-4xl text-left font-extrabold truncate ">{title}</span>
            <span className="text-4xl text-left font-extrabold truncate ">{releaseDate}</span>
          </div>
          <hr className="my-8" />
          <div className="flex gap-8">
            <div className="">
              <div className="h-full w-full">
                {/* <PosterImage image_path={media?.poster_path} /> */}
                <Image
                  src={media?.poster_path ? `https://www.themoviedb.org/t/p/w1280/${media.poster_path}` : ''}
                  alt={media?.title || ''}
                  effect="zoomIn"
                  className="h-auto w-[400px]"
                />
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
