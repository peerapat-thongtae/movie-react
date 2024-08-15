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
import { FaCheck } from 'react-icons/fa6'
import { TbProgressCheck } from 'react-icons/tb'
import { useAuth0 } from '@auth0/auth0-react'
import GenreChip from '@/components/media/GenreChip'

// Local interface
interface IProps {
  media: Media | any
  mediaType: MediaType
}

const MediaHeroDetail = ({ media, mediaType }: IProps) => {
  // Variables
  const { isAuthenticated } = useAuth0()
  const title = media.title || media.name
  const releaseDate = dayjs(media.release_date_th || media.release_date || media.first_air_date).format('DD/MM/YYYY') || ''
  const originalName = media.original_name || media.title || media.name
  const [isOpenTrailer, setIsOpenTrailer] = useState(false)
  const { data: accountState, addToWatchlist, addRated, isLoading: isLoadingAccountState } = useMediaAccountStateById(mediaType, media.id || '')

  const getTrailers = (videos: any) => {
    const trailers = videos?.results?.filter((video: any) => video.type === 'Trailer') || []

    if (trailers.length === 0) {
      return videos?.results?.filter((video: any) => video.type === 'Teaser') || []
    }

    return trailers
  }

  const getDirectors = (crews: any) => {
    return crews ? crews.filter((val: any) => val.job === 'Director') : []
  }

  const getWriters = (crews: any) => {
    return crews ? crews.filter((val: any) => val.job === 'Writer' || val.job === 'Novel' || val.job === 'Screenplay') : []
  }

  const director = getDirectors(media.casts?.crew)?.[0]?.name || '-'
  const writer = getWriters(media.casts?.crew)?.[0]?.name || '-'

  // Error image

  return (
    <>
      {/* Banner */}
      <div className="relative hidden md:block">
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 1 }}
          isOpen={isOpenTrailer}
          videoId={getTrailers((media as any)?.videos)?.[0]?.key}
          onClose={() => setIsOpenTrailer(false)}
        />
        <Image
          src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${media.backdrop_path}`}
          alt={media.name}
          className="w-full h-full min-h-auto max-h-auto md:min-h-[800px] md:h-[800px] object-cover bg-center"
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
        className={`relative flex justify-center ${media.backdrop_path ? 'md:-mt-52 mt-32' : 'mt-32'} z-10`}
      >
        <div className="mx-8 md:mx-48 pb-24">
          <div className="flex flex-col gap-4 md:flex-row justify-between">
            <span className="text-4xl text-left font-extrabold truncate ">{title}</span>
          </div>
          <hr className="my-8" />
          <div className="flex flex-col md:flex-row w-auto h-auto md:w-[64rem] md:max-w-[64rem] gap-8">
            <div className="">
              <div className="w-full flex justify-center ">
                <Image
                  src={media?.poster_path ? `https://www.themoviedb.org/t/p/w1280/${media.poster_path}` : ''}
                  alt={media?.title || ''}
                  effect="zoomIn"
                  className="h-64 w-auto md:min-h-[400px] md:w-[400px] rounded-lg"
                />
              </div>
              {/* Section Account State */}
              <div className="flex justify-around my-4">
                {!isLoadingAccountState && isAuthenticated
                && (
                  <>
                    <div onClick={() => addToWatchlist(!accountState?.watchlist)} className="flex flex-col gap-2 items-center cursor-pointer hover:text-yellow-500">
                      <FaBookmark size="24" className={cn(accountState?.account_status === 'watchlist' && 'text-yellow-500')} />
                      <span className="text-xs">Watchlist</span>
                    </div>
                    {mediaType === 'tv'
                    && (
                      <div className="flex flex-col gap-2 items-center">
                        <TbProgressCheck size="24" className={cn(accountState?.account_status === 'watching' && 'text-yellow-500')} />
                        <span className="text-xs">
                          Watching
                        </span>
                      </div>
                    )}
                    <div onClick={() => addRated()} className="flex flex-col gap-2 items-center cursor-pointer hover:text-yellow-500">
                      <FaCheck size="24" className={cn(accountState?.account_status === 'watched' && 'text-yellow-500')} />
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

              {accountState?.account_status === 'watching'
              && (
                <div className="justify-center flex gap-2 text-sm items-center">
                  <TbProgressCheck size="24" className={cn(accountState?.account_status === 'watching' && 'text-yellow-500')} />
                  <span>{`Watching ${accountState.episode_watched.length} EP. of ${accountState.number_of_episodes} EP.`}</span>
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="pb-4">
                <div className="flex gap-2">
                  {media?.genres?.map((genre: any) => {
                    if (!genre) return
                    // onClick={() => discoverByGenre(genre.id)}
                    return <GenreChip genre={genre} />
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
                  {mediaType === 'tv'
                  && (
                    <div className="flex gap-2 py-1">
                      <span>Seasons:</span>
                      <span className="text-gray-400 ">{`${media.number_of_seasons} Seasons ; ${media.number_of_episodes} Episodes`}</span>
                    </div>
                  )}

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
