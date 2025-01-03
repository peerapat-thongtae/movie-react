import Dropdown from '@/components/common/Dropdown/Dropdown'
import Loading from '@/components/common/Loading'
import TabLists, { TabProp } from '@/components/common/TabLists'
import MediaHeroDetail from '@/components/media/MediaHeroDetail'
import EpisodeCard from '@/components/media/EpisodeCard'
import { useCredits, useMediaAccountStateById, useMediaDetail, useRecommendationMedias, useSimilarMedias, useTVSeasonDetail } from '@/hooks/useMedia'
import { CreditType, Media, MediaType } from '@/types/media.type'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import MediaGrid from '@/components/media/MediaGrid'
import { Person } from 'moviedb-promise'
import PersonCard from '@/components/media/PersonCard'
import CompanyCard from '@/components/media/CompanyCard'
import { first, take } from 'lodash'
import { Button, Checkbox } from '@mantine/core'

interface MediaDetailPageProps {
  mediaType: MediaType
}
const MediaDetailPage = (props: MediaDetailPageProps) => {
  const param = useParams()
  const mediaId: number = Number(param.id)
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
          value: 'company',
          title: 'Companies',
          panel: <>{media && <CompanyTab media={media} mediaType={props.mediaType} />}</>,
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
          value: 'company',
          title: 'Companies',
          panel: <>{media && <CompanyTab media={media} mediaType={props.mediaType} />}</>,
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

const CompanyTab = ({ media }: { media: Media, mediaType: MediaType }) => {
  return (
    <div className="px-8 py-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {media.production_companies && media.production_companies.map((company) => {
          return (
            <CompanyCard company={company} />
          )
        })}
      </div>

    </div>
  )
}

const PersonTab = ({ media, mediaType, creditType }: { media: Media, mediaType: MediaType, creditType: CreditType }) => {
  const mediaId = media.id || ''
  const { data: persons, isLoading } = useCredits(mediaType, mediaId)
  const [showAll, setShowAll] = useState(false)

  const personCredit = useMemo(() => {
    return persons?.[creditType] || []
  }, [persons])

  const currentShowPerson = useMemo(() => {
    if (showAll) {
      return personCredit
    }
    else {
      return take(personCredit, 12)
    }
  }, [personCredit, showAll, setShowAll])

  const onClickLoadmore = () => {
    setShowAll(!showAll)
  }

  return (
    <div className="px-12 py-8">
      <MediaGrid
        items={currentShowPerson as Person[]}
        isLoading={isLoading}
        mediaType="person"
        size="SMALL"
        pagination={false}
        mediaElement={currentShowPerson && currentShowPerson.map((person) => {
          return (
            <PersonCard key={person.id} person={person} type={creditType} />
          )
        })}
      />

      {personCredit.length > 12
      && (
        <div className="flex justify-center my-8">
          <Button
            variant="outline"
            color="yellow"
            onClick={onClickLoadmore}
          >
            {showAll ? 'Show only main' : 'Load more...'}
          </Button>
        </div>
      )}
    </div>
  )
}

const EpisodeTab = ({ media, mediaType }: { media: Media, mediaType: MediaType }) => {
  const mediaId = media.id || ''
  const [onlyUnwatched, setOnlyUnwatched] = useState(false)
  const { data: accState } = useMediaAccountStateById(mediaType, mediaId)
  const seasonOptions = useMemo(() => {
    return media?.seasons?.map(val => ({
      label: `${val.season_number} : ${val.name}`,
      value: val.season_number?.toString() || '',
    })).filter((val) => {
      if (onlyUnwatched) {
        console.log('ol', accState?.watched_seasons)
        return val.value !== '0' && !accState?.watched_seasons?.includes(+val.value)
      }
      return val.value !== '0'
    }) || []
  }, [media, onlyUnwatched, accState])
  const [seasonNumber, setSeasonNumber] = useState<string>('1')

  useEffect(() => {
    if (!seasonOptions.find(val => val.value === seasonNumber)) {
      setSeasonNumber(first(seasonOptions)?.value || '')
    }
  }, [seasonOptions])
  const { data: seasonDetail, isLoading } = useTVSeasonDetail(mediaType, mediaId, seasonNumber)
  const episodes = useMemo(() => {
    const eps = seasonDetail?.episodes || []
    if (onlyUnwatched) {
      return eps?.filter(val => val.account_status !== 'watched')
    }
    return eps
  }, [seasonDetail, onlyUnwatched])
  const parentRef = useRef<HTMLDivElement | null>(null)

  // The virtualizer
  const virtualizer = useWindowVirtualizer({
    count: episodes.length,
    estimateSize: () => 320,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  })

  return (
    <div className="px-8 md:px-24 py-8" ref={parentRef}>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
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
              <div className="flex gap-4 items-center">
                <Dropdown
                  all
                  labelAll="All Seasons"
                  label="Seasons"
                  placeholder="Select Seasons"
                  options={seasonOptions}
                  value={seasonNumber}
                  onChange={val => setSeasonNumber(val || '')}
                />
                <Checkbox
                  checked={onlyUnwatched}
                  onChange={() => setOnlyUnwatched(!onlyUnwatched)}
                  label="Only Unwatched"
                  color="yellow"
                  variant="outline"
                  className="pt-6 "
                  classNames={{ input: '!bg-transparent !border-1 !border-yellow-500' }}
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
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${
                item.start - virtualizer.options.scrollMargin
              }px)`,
            }}
            className="h-48 md:h-2"
          >
            {episodes?.[item.index]
            && (
              <div className="">
                <EpisodeCard media={media} item={episodes[item.index]} mediaType={mediaType} />
              </div>
            )}
          </div>
        ))}
      </div>

    </div>

  )
}

const RecommendationTab = ({ media, mediaType }: { media: Media, mediaType: MediaType }) => {
  const { data: recommendationMedias, isLoading } = useRecommendationMedias(Number(media?.id), mediaType)
  return (
    <div className="px-4 md:px-12 py-8">
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
  const { data: similarMedias, isLoading } = useSimilarMedias(Number(media?.id), mediaType)
  return (
    <div className="px-4 md:px-12 py-8">
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
