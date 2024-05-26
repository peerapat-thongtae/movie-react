import Dropdown from '@/components/common/Dropdown/Dropdown'
import Loading from '@/components/common/Loading'
import TabLists, { TabProp } from '@/components/common/TabLists'
import MediaHeroDetail from '@/components/media/MediaHeroDetail'
import PersonCard from '@/components/media/PersonCard'
import EpisodeCard from '@/components/media/EpisodeCard'
import { useCredits, useMediaDetail, useTVSeasonDetail } from '@/hooks/useMedia'
import { CreditType, Media, MediaType } from '@/types/media.type'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

interface MediaDetailPageProps {
  mediaType: MediaType
}
const MediaDetailPage = (props: MediaDetailPageProps) => {
  const param = useParams()
  const mediaId = param.id || ''
  const { data: media, isLoading, isFetched } = useMediaDetail(mediaId, props.mediaType)
  const tabs: TabProp[] = useMemo(() => {
    if (props.mediaType === 'movie') {
      return [
        {
          value: 'cast',
          title: 'Casts',
          panel: <>{media && <PersonTab media={media} mediaType={props.mediaType} creditType="cast" />}</>,
        },
        {
          value: 'crew',
          title: 'Crews',
          panel: <>{media && <PersonTab media={media} mediaType={props.mediaType} creditType="crew" />}</>,
        },
      ]
    }
    else {
      return [
        {
          value: 'cast',
          title: 'Casts',
          panel: <>{media && <PersonTab media={media} mediaType={props.mediaType} creditType="cast" />}</>,
        },
        {
          value: 'crew',
          title: 'Crews',
          panel: <>{media && <PersonTab media={media} mediaType={props.mediaType} creditType="crew" />}</>,
        },
        {
          value: 'episode',
          title: 'Episodes',
          panel: <>{media && <EpisodeTab mediaType={props.mediaType} media={media} />}</>,
        },
      ]
    }
  }, [media])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [isFetched])
  return (
    <div className="min-h-screen">
      {isLoading
      && (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Loading />
        </div>
      )}

      { !isLoading && media

      && (
        <>
          <MediaHeroDetail media={media} mediaType={props.mediaType} />
          <div className="">
            <TabLists defaultTab="cast" tabs={tabs} />
          </div>
        </>
      )}

    </div>
  )
}

const PersonTab = ({ media, mediaType, creditType }: { media: Media, mediaType: MediaType, creditType: CreditType }) => {
  const mediaId = media.id || ''
  const { data: persons, isLoading } = useCredits(mediaType, mediaId)

  const personCredit = useMemo(() => {
    return persons?.[creditType] || []
  }, [persons])

  return (
    <div>
      <div className="grid grid-cols-6 gap-6 px-12 py-8">
        {!isLoading && personCredit && personCredit.map((person) => {
          return (
            <div key={person.id} className="min-h-[32vh]">
              <PersonCard person={person} type={creditType} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const EpisodeTab = ({ media, mediaType }: { media: Media, mediaType: MediaType }) => {
  const mediaId = media.id || ''
  const seasonOptions = media?.seasons?.map(val => ({
    label: `${val.season_number} : ${val.name}`,
    value: val.season_number?.toString() || '',
  })).filter(val => val.value !== '0') || []
  const [seasonNumber, setSeasonNumber] = useState<string>('1')
  const { data: seasonDetail, isLoading } = useTVSeasonDetail(mediaType, mediaId, +seasonNumber)
  const episodes = seasonDetail?.episodes || []
  const parentRef = useRef<HTMLDivElement | null>(null)

  // The virtualizer
  const virtualizer = useWindowVirtualizer({
    count: episodes.length,
    estimateSize: () => 320,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  })

  return (
    <div className="px-24 py-8" ref={parentRef}>
      <div className="flex justify-between items-center">
        { isLoading
          ? <></>
          : (
            <>
              <div className="text-2xl font-bold">{`${seasonDetail?.season_number} : ${seasonDetail?.name}`}</div>
              <div>
                <Dropdown
                  label="Seasons"
                  placeholder="Select Seasons"
                  options={seasonOptions}
                  value={seasonNumber}
                  onChange={val => setSeasonNumber(val || '')}
                />
              </div>
            </>
          )}
      </div>

      {/* Episode Lists */}
      <div
        className="mt-4"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(item => (
          <div
            key={item.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${item.size}px`,
              transform: `translateY(${
                item.start - virtualizer.options.scrollMargin
              }px)`,
            }}
          >
            {episodes?.[item.index]
            && (
              <EpisodeCard media={media} item={episodes[item.index]} mediaType={mediaType} />
            )}
          </div>
        ))}
      </div>

    </div>

  )
}

export default MediaDetailPage
