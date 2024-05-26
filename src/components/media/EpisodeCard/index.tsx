import Image from '@/components/common/Image'
import { useConfigTMDB } from '@/hooks/useConfig'
import { useTVEpisodeAccountState } from '@/hooks/useMedia'
import { Media, MediaType } from '@/types/media.type'
import { cn } from '@/utils/tailwind.helper'
import dayjs from 'dayjs'
import { Episode } from 'moviedb-promise'
import { FaSpinner } from 'react-icons/fa'
import { IoMdEye } from 'react-icons/io'

interface EpisodeCardProps {
  media: Media
  mediaType: MediaType
  item: Episode & { account_status?: string | undefined }
}
const EpisodeCard = (props: EpisodeCardProps) => {
  const episode = props.item
  const { data: accountState, addWatched, isLoading } = useTVEpisodeAccountState(props.media.id || '', Number(episode.season_number), Number(episode.episode_number), props.mediaType)
  const { getImagePath } = useConfigTMDB()
  return (
    <div>
      <div className="flex gap-24">
        <div className="min-w-[500px] w-[500px] h-[280px] min-h-[280px]">
          <Image
            className={cn('w-full h-full rounded-lg')}
            src={getImagePath(episode?.still_path?.toString() || '', 'backdrop')}
            alt={episode.name}
            effect="zoomIn"
            loadIcon
          />
        </div>
        <div className="">
          <div className="text-lg font-bold text-yellow-500 pb-2">{`${episode.episode_number} : ${episode.name}`}</div>
          <div className="pb-4 text-md">
            Air Date :
            {episode.air_date ? dayjs(episode.air_date).format('DD/MM/YYYY') : ''}
          </div>
          <div className="line-clamp-4">{ episode.overview }</div>

          <div className="flex justify-start gap-8 my-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default EpisodeCard
