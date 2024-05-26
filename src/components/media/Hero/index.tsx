import Image from '@/components/common/Image'
import { useConfigTMDB } from '@/hooks/useConfig'
import { Media } from '@/types/media.type'
import { DateHelper } from '@/utils/date.helper'
import { useMemo } from 'react'

const Hero2 = ({ media }: { media: Media }) => {
  const { getImagePath, getLogoPath } = useConfigTMDB()

  const logoProvider = useMemo(() => {
    if (media.media_type === 'movie') {
      const providerName = media?.release_dates?.results?.find(val => val.iso_3166_1 === 'TH')?.release_dates?.[0]?.note || ''
      return media?.release_dates?.results?.find(val => val.iso_3166_1 === 'TH')?.release_dates?.[0]?.note ? getLogoPath(providerName) : ''
    }
    else {
      return getLogoPath(media.watch_providers.results?.TH?.flatrate?.[0]?.provider_name || '') || ''
    }
  }, [media])

  const title = media.title || media.name || ''
  return (
    <>
      <div className="w-full max-w-full relative flex items-center md:h-full">
        <div className="top-0 h-full w-full">
          <div className="flex relative w-full  h-full left-1/4 md:left-0">
            <Image
              src={getImagePath(media.backdrop_path || '', 'backdrop')}
              alt={title}
              className="w-full  h-full"
              effect="zoomIn"
            />

            <div className="h-full w-3/4 absolute bottom-0 left-0 bg-gradient-to-r from-main to-transparent"></div>
            <div className="h-[80vh] w-full absolute bottom-0 left-0 bg-gradient-to-t from-main to-transparent"></div>
          </div>
        </div>
        <div className="absolute flex flex-col h-full justify-center items-start z-10 gap-y-4 px-12">
          <span className="text-6xl font-bold">{title}</span>
          <span className="flex gap-2 items-center text-lg">
            <div>
              {logoProvider
              && (
                <Image
                  src={logoProvider}
                  alt="Provider"
                  className="w-16 h-10 rounded-xl"
                />
              )}

            </div>
            <span>
              {media.media_type === 'movie' ? DateHelper.formatDate(media.release_date_th, 'DD MMM YYYY') : DateHelper.formatDate(media.next_episode_to_air?.air_date || media.last_air_date || media.first_air_date || '', 'DD MMM YYYY')}

            </span>
          </span>
        </div>
      </div>
      {/* <div>Test</div> */}
    </>

  )
}

export default Hero2
