// import Input from '@/components/common/Input'
import Dropdown from '@/components/common/Dropdown/Dropdown'
import Loading from '@/components/common/Loading'
import NoData from '@/components/common/NoData'
import MediaCard from '@/components/media/MediaCard'
import PersonCard from '@/components/media/PersonCard'
import { Media, MediaType } from '@/types/media.type'
import { cn } from '@/utils/tailwind.helper'
import { useAuth0 } from '@auth0/auth0-react'
import { Group, Pagination } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Person } from 'moviedb-promise'
import { ReactNode, useEffect, useMemo, useState } from 'react'

interface IMediaGridProps {
  items: (Media | Person | any)[]
  page?: number
  isLoading?: boolean
  pagination?: boolean
  setPage?: (_page: number) => void
  goToDetail?: (_id: number, _media_type: MediaType) => void
  totalResults?: number
  totalPages?: number
  mediaType: MediaType
  gridCols?: number
  size?: 'LARGE' | 'MEDIUM' | 'SMALL'
  className?: string
  mediaElement?: ReactNode
  setSort?: (_sort: string) => void
}

const MediaGrid = (props: IMediaGridProps) => {
  const items = props.items || []
  const [sort, setSorting] = useState('')
  const page = props.page || 1
  const size = props.size || 'LARGE'
  const mediaType = props.mediaType
  const isLoading = props.isLoading || false
  const pagination = props.pagination !== undefined ? props.pagination : true
  const totalPages = props?.totalPages || 1
  // const gridCols = props.gridCols || 5
  const totalResults = props?.totalResults || items.length || 0
  const setPage = (page: number) => {
    if (pagination && props.setPage) {
      props.setPage(page)
    }
  }

  const auth = useAuth0()
  useEffect(() => {
    if (props.setSort) {
      props.setSort(sort)
    }
  }, [sort])

  const isMobile = useMediaQuery('only screen and (max-width : 640px)')

  const sortOptions = useMemo(() => {
    const opts = [
      {
        group: 'Vote Average',
        items: [
          {
            label: 'Vote Average : Descending',
            value: 'vote_average.desc',
          },
          {
            label: 'Vote Average : Ascending',
            value: 'vote_average.asc',
          },
        ],
      },
      {
        group: 'Vote Count',
        items: [
          {
            label: 'Vote Count : Descending',
            value: 'vote_count.desc',
          },
          {
            label: 'Vote Count : Ascending',
            value: 'vote_count.asc',
          },
        ],
      },
    ]
    if (mediaType === 'tv') {
      opts.push({
        group: 'Number of episodes',
        items: [
          {
            label: 'Descending',
            value: 'number_of_episodes.desc',
          },
          {
            label: 'Ascending',
            value: 'number_of_episodes.asc',
          },
        ],
      })

      if (auth.isAuthenticated) {
        opts.push({
          group: 'Latest State',
          items: [
            {
              label: 'Descending',
              value: 'latest_state.desc',
            },
            {
              label: 'Ascending',
              value: 'latest_state.asc',
            },
          ],
        })
      }
    }

    return opts
  }, [mediaType])

  return (
    <>
      {!isLoading
      && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm md:text-lg">
            {`Total : ${totalResults?.toLocaleString() || ''}`}
          </div>
          <div>
            <Dropdown
              placeholder="Select Sort"
              options={sortOptions}
              value={sort}
              onChange={sorts => setSorting(sorts || '')}
            />
          </div>
        </div>
      )}

      {
        isLoading
        && (
          <div className="flex items-center justify-center min-h-[50vh] md:min-h-[76vh] w-auto">
            <Loading />
          </div>
        )
      }

      {!isLoading && items.length > 0
      && (
        <div className={cn(
          'grid place-items-center gap-[clamp(20px,3vw,32px)]',
          `grid-cols-2`,
          `${size === 'LARGE' && 'md:grid-cols-4'}`,
          `${size === 'MEDIUM' && ' md:grid-cols-5'}`,
          `${size === 'SMALL' && 'md:grid-cols-6'}`,
          // `md:grid-cols-${gridCols - 2}`,
          // `grid-cols-${gridCols - 3}`,
        )}
        >
          {props?.mediaElement
            ? props.mediaElement
            : (
              items.map((media) => {
                return (
                  mediaType === 'person'
                    ? <PersonCard key={media.id} person={media as Person} />
                    : <MediaCard key={media.id} item={media as Media} mediaType={props.mediaType} />
                )
              })
            )}
        </div>
      )}

      {items.length === 0 && !isLoading
      && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <NoData />
        </div>
      )}

      {pagination && totalResults > 0
      && (
        <div className="flex justify-center items-center md:w-full py-8">
          <Pagination.Root
            siblings={1}
            classNames={{ root: '', control: '!text-white !bg-main data-active:!bg-yellow-500 data-active:!border-0 hover:!bg-white data-active:!bg-yellow-500 data-active:!text-black hover:!text-black' }}
            total={(totalPages > 500 ? 500 : totalPages)}
            value={page}
            onChange={setPage}
            size={isMobile ? 'xs' : 'md'}
          >
            <Group gap={5} justify="center">
              <Pagination.First />
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
              <Pagination.Last />
              {/* <div className="px-2">
                    <Input />
                  </div> */}
            </Group>
          </Pagination.Root>
        </div>
      )}
    </>
  )
}

export default MediaGrid
