import MediaGrid from '@/components/media/MediaGrid'
import { useMediaAccountStates } from '@/hooks/useMedia'
import { MediaType } from '@/types/media.type'
import { Tabs } from '@mantine/core'
import { useEffect, useState } from 'react'

const AccountMediaStatePage = ({ mediaType, is_anime }: { mediaType: MediaType, is_anime?: boolean }) => {
  const [statusTab, setStatusTab] = useState<string>('watchlist')
  return (
    <Tabs
      keepMounted={false}
      unstyled
      onChange={val => setStatusTab(val || '')}
      classNames={{ root: 'flex flex-col md:flex-row items-center md:items-start justify-center', panel: '',
        tabSection: 'w-auto flex flex-col text-center text-white font-bold p-1 mx-4 text-center',
        tab: 'data-[active=true]:bg-pink-500 w-auto md:w-[20vw] items-center text-center h-auto md:h-[6vh] border-yellow-200 border-[0.5px] text-white py-4 cursor-pointer hover:bg-pink-500' }}
      value={statusTab}
      orientation="vertical"
    >
      <Tabs.List>
        <Tabs.Tab value="watchlist">
          <div className="flex justify-between px-4">
            <div>Watchlist</div>
            {/* <span className="">{!dataQueryMovies.isLoading ? dataQueryMovies.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
          </div>
        </Tabs.Tab>
        <Tabs.Tab value="watched">
          <div className="flex justify-between px-4">
            <div>Watched</div>
            {/* <span className="">{ !dataQueryTV.isLoading ? dataQueryTV?.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
          </div>
        </Tabs.Tab>

        {(mediaType === 'tv' || mediaType === 'anime')
        && (
          <Tabs.Tab value="watching">
            <div className="flex justify-between px-4">
              <div>Watching</div>
              {/* <span className="">{ !dataQueryTV.isLoading ? dataQueryTV?.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
            </div>
          </Tabs.Tab>
        )}
      </Tabs.List>

      <Tabs.Panel value="watchlist">
        <TabData mediaType={mediaType} is_anime={is_anime} status={statusTab} />
      </Tabs.Panel>

      <Tabs.Panel value="watched">
        <TabData mediaType={mediaType} is_anime={is_anime} status={statusTab} />
      </Tabs.Panel>

      <Tabs.Panel value="watching">
        <TabData mediaType={mediaType} is_anime={is_anime} status={statusTab} />
      </Tabs.Panel>
    </Tabs>
  )
}

const TabData = (props: { mediaType: MediaType, status: string, is_anime?: boolean }) => {
  const mediaType = props.mediaType
  const status = props.status

  const dataQuery = useMediaAccountStates({ mediaType, status, is_anime: props?.is_anime })

  useEffect(() => {
    dataQuery.setPage(1)
  }, [mediaType, status])
  useEffect(() => {
    if (dataQuery.isFetched) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [dataQuery.page, dataQuery.isFetched])

  return (
    <div className="px-4 py-4 md:py-0 w-auto md:w-[70vw]">
      <MediaGrid
        mediaType={mediaType}
        size="LARGE"
        gridCols={4}
        items={dataQuery?.data?.results}
        page={dataQuery.page}
        isLoading={dataQuery.isLoading}
        setPage={dataQuery.setPage}
        totalPages={dataQuery.data?.total_pages}
        totalResults={dataQuery.data?.total_results}
      />
    </div>
  )
}

export default AccountMediaStatePage
