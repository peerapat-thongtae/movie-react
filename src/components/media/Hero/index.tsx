import Image from '@/components/common/Image'
import { useConfigTMDB } from '@/hooks/useConfig'
import { Media } from '@/types/media.type'
import { DateHelper } from '@/utils/date.helper'
import { Button } from '@mantine/core'
import { useMemo } from 'react'
import { GoDotFill } from 'react-icons/go'
import { Link } from 'react-router-dom'

// const Hero2 = ({ media }: { media: Media }) => {
//   const navigate = useNavigate()
//   const { getImagePath, getLogoPath } = useConfigTMDB()

//   const provider = useMemo(() => {
//     if (media.media_type === 'movie') {
//       // const providerName = media?.release_dates?.results?.find(val => val.iso_3166_1 === 'TH')?.release_dates?.[0]?.note || ''
//       const findProvider = media?.release_dates?.results?.find(val => val.iso_3166_1 === 'TH')?.release_dates?.[0]
//       if (findProvider) {
//         return {
//           ...findProvider,
//           provider_name: findProvider.note,
//         }
//       }

//       return null
//     }
//     else {
//       return media.watch_providers?.results?.TH?.flatrate?.[0]
//     }
//   }, [media])

//   const title = media.title || media.name || ''
//   return (
//     <>
//       <div className="w-full max-w-full relative flex items-center md:h-full">
//         <div className="top-0 h-full w-full">
//           <div className="flex relative w-full h-full left-1/4 md:left-0">
//             <Image
//               src={getImagePath(media.backdrop_path || '', 'backdrop')}
//               alt={title}
//               lazy={false}
//               className="w-full h-full object-cover object-right-top"
//               effect="zoomIn"
//             />

//             <div className="h-full w-3/4 absolute bottom-0 left-0 bg-gradient-to-r from-main to-transparent"></div>
//             <div className="h-[80vh] w-full absolute bottom-0 left-0 bg-gradient-to-t from-main to-transparent"></div>
//           </div>
//         </div>
//         <div className="absolute flex flex-col h-full justify-center items-start z-10 gap-y-4 px-12">
//           <div className="text-6xl font-bold w-[50vw] text-left">
//             {title}
//           </div>
//           <span className="flex gap-2 items-center text-md">
//             <div>
//               {provider?.provider_name
//               && (
//                 <span className="flex gap-2 items-center">
//                   <div className="">
//                     <Image
//                       src={getLogoPath(provider?.provider_name)}
//                       alt="Provider"
//                       className="w-8 h-8 rounded-xl "
//                       effect="zoomIn"
//                     />
//                   </div>
//                   <span>{provider?.provider_name}</span>
//                   <span><GoDotFill className="text-yellow-500" /></span>
//                 </span>
//               )}
//             </div>
//             <span className="flex gap-4 items-center">
//               {media.media_type === 'movie' && DateHelper.formatDate(media.release_date_th, 'DD MMM YYYY')}
//               {media.media_type === 'tv'
//               && (
//                 <>
//                   <span className="">
//                     {DateHelper.formatDate(media.next_episode_to_air?.air_date || media.last_episode_to_air?.air_date || media.first_air_date || '', 'DD MMM YYYY')}
//                   </span>
//                   <span><GoDotFill className="text-yellow-500" /></span>
//                   { media.next_episode_to_air
//                   && (
//                     <span>
//                       {`Season ${media.next_episode_to_air.season_number} EP. ${media.next_episode_to_air.episode_number} Coming..`}
//                     </span>
//                   )}
//                   {!media.next_episode_to_air && media.last_episode_to_air
//                   && (
//                     <span>
//                       {`Latest on Season ${media.last_episode_to_air.season_number} EP. ${media.last_episode_to_air.episode_number}`}
//                     </span>
//                   )}

//                 </>
//               )}
//               <span><GoDotFill className="text-yellow-500" /></span>
//               <span>{media.status}</span>
//             </span>
//           </span>
//           <div className="m-4 w-36">
//             <Button
//               onClick={() => navigate(`/${media.media_type}/${media.id}`)}
//               variant="outline"
//               color="yellow"
//               fullWidth
//             >
//               Full Details
//             </Button>
//           </div>
//         </div>
//       </div>
//       {/* <div>Test</div> */}
//     </>

//   )
// }

const Hero = ({ media }: { media: Media }) => {
  const { getImagePath, getLogoPath } = useConfigTMDB()

  const provider = useMemo(() => {
    if (media.media_type === 'movie') {
      // const providerName = media?.release_dates?.results?.find(val => val.iso_3166_1 === 'TH')?.release_dates?.[0]?.note || ''
      const findProvider = media?.release_dates?.results?.find(val => val.iso_3166_1 === 'TH')?.release_dates?.[0]
      if (findProvider) {
        return {
          ...findProvider,
          provider_name: findProvider.note,
        }
      }

      return null
    }
    else {
      return media.watch_providers?.results?.TH?.flatrate?.[0]
    }
  }, [media])

  const providerImage = useMemo(() => {
    return getLogoPath(provider?.provider_name || '')
  }, [provider, media])

  const bgUrl = useMemo(() => {
    return getImagePath(media.backdrop_path || '', 'backdrop')
  }, [media])

  const title = media.title || media.name || ''
  return (
    <section
      style={{ backgroundImage: `url(${bgUrl})` }}
      className="relative bg-cover h-full min-h-screen bg-center bg-no-repeat"
    >
      <div className="h-full w-3/4 absolute bottom-0 left-0 bg-gradient-to-r from-main to-transparent"></div>
      <div className="h-[20vh] md:h-[80vh] w-full absolute bottom-0 left-0 bg-gradient-to-t from-main to-transparent"></div>

      <div
        className="relative mx-auto md:mx-8 max-w-screen-xl px-4 sm:px-6 items-end py-24 flex h-screen lg:flex lg:h-screen lg:items-center lg:px-8"
      >
        <div className="max-w-full text-left ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            {title}
          </h1>

          <span className="flex gap-2 items-center text-xs md:text-base my-4">
            <div>
              {providerImage
              && (
                <span className="flex gap-2 items-center">
                  <Image
                    src={providerImage}
                    alt="Provider"
                    className="rounded-xl w-8 h-8 min-w-8 min-h-8 max-w-8 max-h-8"
                    height={8}
                    width={8}
                    effect="zoomIn"
                  />
                  <span>{provider?.provider_name}</span>
                </span>
              )}
            </div>
            <span className="flex gap-2 md:gap-4 items-center">
              {media.media_type === 'movie' && DateHelper.formatDate(media.release_date || '', 'DD MMM YYYY')}
              <span><GoDotFill className="text-yellow-500" /></span>
              <span>{media.status}</span>
            </span>
          </span>

          <span className="flex gap-2 md:gap-4 items-center text-xs md:text-base">
            {media.media_type === 'tv'
            && (
              <>
                <span className="">
                  {DateHelper.formatDate(media.next_episode_to_air?.air_date || media.last_episode_to_air?.air_date || media.first_air_date || '', 'DD MMM YYYY')}
                </span>
                <span><GoDotFill className="text-yellow-500" /></span>
                { media.next_episode_to_air
                && (
                  <span>
                    {`Season ${media.next_episode_to_air.season_number} EP. ${media.next_episode_to_air.episode_number} Coming..`}
                  </span>
                )}
                {!media.next_episode_to_air && media.last_episode_to_air
                && (
                  <span>
                    {`Latest on Season ${media.last_episode_to_air.season_number} EP. ${media.last_episode_to_air.episode_number}`}
                  </span>
                )}

              </>
            )}
          </span>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Button
              variant="outline"
              color="yellow"
            >
              <Link to={`/${media.media_type}/${media.id}`}>
                Full Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
