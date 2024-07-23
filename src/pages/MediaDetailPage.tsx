import Dropdown from '@/components/common/Dropdown/Dropdown'
import Loading from '@/components/common/Loading'
import TabLists, { TabProp } from '@/components/common/TabLists'
import MediaHeroDetail from '@/components/media/MediaHeroDetail'
import EpisodeCard from '@/components/media/EpisodeCard'
import { useCredits, useMediaDetail, useRecommendationMedias, useSimilarMedias, useTVSeasonDetail } from '@/hooks/useMedia'
import { CreditType, Media, MediaType } from '@/types/media.type'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import MediaGrid from '@/components/media/MediaGrid'
import { Person } from 'moviedb-promise'
import PersonCard from '@/components/media/PersonCard'

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
        {
          value: 'recommendations',
          title: 'Recommendations',
          panel: <>{media && <RecommendationTab media={media} mediaType={props.mediaType} />}</>,
        },
        {
          value: 'similars',
          title: 'Similars',
          panel: <>{media && <SimilarTab media={media} mediaType={props.mediaType} />}</>,
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
    <div className="px-12 py-8">
      <MediaGrid
        items={personCredit as Person[]}
        isLoading={isLoading}
        mediaType="person"
        size="SMALL"
        pagination={false}
        mediaElement={personCredit && personCredit.map((person) => {
          return (
            <PersonCard person={person} type={creditType} />
          )
        })}
      />
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
  // const [filterEpisode, setFilterEpisode] = useState<string>('')
  const { data: seasonDetail, isLoading } = useTVSeasonDetail(mediaType, mediaId, seasonNumber)
  const episodes = useMemo(() => {
    const eps = seasonDetail?.episodes || []
    // eps = eps?.filter(val => val.account_status !== 'watched')
    // if (!seasonNumber) {
    //   eps = media?.seasons?.filter(val => val.season_number !== 0)
    // }
    return eps
  }, [seasonDetail])
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
        {/* <div>
          <Input.Wrapper label="Go to episode">
            <Input
              classNames={inputClassNames({ wrapper: 'w-24' })}
              placeholder="Go to ..."
              value={filterEpisode}
              onChange={event => setFilterEpisode(event.currentTarget.value)}
            />
          </Input.Wrapper>
        </div> */}
        { isLoading
          ? <></>
          : (
            <>
              <div className="text-2xl font-bold">{`${seasonDetail?.season_number} : ${seasonDetail?.name}`}</div>
              <div>
                <Dropdown
                  all
                  labelAll="All Seasons"
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
        className="mt-12"
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

const RecommendationTab = ({ media, mediaType }: { media: Media, mediaType: MediaType }) => {
  const { data: recommendationMedias, isLoading } = useRecommendationMedias(media?.id || '', mediaType)
  return (
    <div className="px-12 py-8">
      <MediaGrid
        items={recommendationMedias?.results || []}
        isLoading={isLoading}
        size="MEDIUM"
        mediaType={mediaType}
        gridCols={6}
        pagination={false}
      />

    </div>
  )
}

const SimilarTab = ({ media, mediaType }: { media: Media, mediaType: MediaType }) => {
  const { data: similarMedias, isLoading } = useSimilarMedias(media?.id || '', mediaType)
  return (
    <div className="px-12 py-8">
      <MediaGrid
        items={similarMedias?.results || []}
        isLoading={isLoading}
        size="MEDIUM"
        mediaType={mediaType}
        gridCols={6}
        pagination={false}
      />

    </div>
  )
}

export default MediaDetailPage
