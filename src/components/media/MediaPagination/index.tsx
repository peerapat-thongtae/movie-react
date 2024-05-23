// import Input from '@/components/common/Input'
import Loading from '@/components/common/Loading'
import MediaCard from '@/components/media/MediaCard'
import { MediaType } from '@/types/media.type'
import { cn } from '@/utils/tailwind.helper'
import { Group, Pagination } from '@mantine/core'

interface IMediaGridProps {
  items: []
  page: number
  isLoading: boolean
  setPage: (_page: number) => void
  totalResults: number
  totalPages: number
  mediaType: MediaType
  gridCols?: number
  size?: 'FULL' | 'MEDIUM'
}

const MediaPagination = (props: IMediaGridProps) => {
  const items = props.items || []
  const page = props.page || 1
  const isLoading = props.isLoading || false

  const setPage = (page: number) => {
    props.setPage(page)
  }

  const size = props.size || 'FULL'

  const gridCols = size === 'FULL' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'

  return (
    <div className="w-full">
      {!isLoading
        ? (
          <>
            <div className="flex justify-between mb-4">
              <div>
                Total :
                {props?.totalResults?.toLocaleString() || ''}
              </div>
              <div>
                {/* <Select /> */}
              </div>
            </div>
            <div className={cn('grid gap-8', gridCols)}>
              {
                items.length > 0 && items.map((media: any, index: number) => {
                  return <MediaCard key={index} item={media} mediaType={props.mediaType} />
                })
              }
            </div>
            <div className="flex justify-center items-center md:w-full py-8">
              <Pagination.Root
                classNames={{ root: '', control: '!text-white !bg-main data-active:!bg-yellow-500 data-active:!border-0 hover:!bg-white data-active:!bg-yellow-500 data-active:!text-black hover:!text-black' }}
                total={props.totalPages > 500 ? 500 : props.totalPages}
                value={page}
                onChange={setPage}
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
          </>
        )
        : (
          <div className="flex items-center justify-center min-h-[76vh] w-full">
            <Loading />
          </div>
        )}

    </div>
  )
}

export default MediaPagination
