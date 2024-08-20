import Image from '@/components/common/Image'
import { useTVEpisodeAccountState } from '@/hooks/useMedia'
import { Media, MediaType } from '@/types/media.type'
import { cn } from '@/utils/tailwind.helper'
import { useAuth0 } from '@auth0/auth0-react'
import dayjs from 'dayjs'
import { Episode } from 'moviedb-promise'
import { FaSpinner } from 'react-icons/fa'
import { IoMdEye } from 'react-icons/io'

interface EpisodeCardProps {
  media: Media
  mediaType: MediaType
  item: (Episode & { account_status?: string | undefined }) | any
}
const EpisodeCard = (props: EpisodeCardProps) => {
  const { isAuthenticated } = useAuth0()
  const episode = props.item
  const { data: accountState, addWatched, isLoading } = useTVEpisodeAccountState(props.media.id || '', Number(episode.season_number), Number(episode.episode_number), Number(episode.id), props.mediaType)
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-24">
      <div className="w-auto h-48 min-h-48 md:min-w-[28rem] md:w-[28rem] md:h-64 md:min-h-64">
        <Image
          className={cn('w-full h-full rounded-lg')}
          src={`https://image.tmdb.org/t/p/w780${episode?.still_path}`}
          alt={episode.name}
          effect="zoomIn"
          type="backdrop"
          loadIcon
          reEffect
        />
      </div>
      <span className="">
        <div className="text-lg font-bold text-yellow-500 pb-4">{`${episode.episode_number} : ${episode.name}`}</div>
        <div className="mb-4 text-sm flex flex-col gap-1">
          <div className="">
            Air Date :
            { ' ' }
            {episode.air_date ? dayjs(episode.air_date).format('DD/MM/YYYY') : ''}
          </div>
          <div className="">
            Runtime :
            { ' ' }
            {episode.runtime}
            {' '}
            minutes
          </div>
        </div>
        <div className="line-clamp-4">{ episode.overview }</div>

        <div className="flex justify-start gap-8 my-4">
          {isAuthenticated
          && (
            <div onClick={() => addWatched()} className="flex flex-col items-center gap-2 cursor-pointer hover:text-yellow-500">
              {isLoading && (
                <>
                  <FaSpinner className="animate-spin text-yellow-500" size="24" />
                  <span className="text-xs">
                    Loading...
                  </span>
                </>
              )}
              {!isLoading
              && (
                <>
                  <IoMdEye size="24" className={cn(accountState && 'text-yellow-500')} />
                  <span className="text-xs">
                    Watched
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </span>
    </div>
  )
}

export default EpisodeCard
