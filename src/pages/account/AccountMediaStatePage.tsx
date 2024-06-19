import MediaGrid from '@/components/media/MediaGrid'
import { useMediaAccountStates } from '@/hooks/useMedia'
import { MediaType } from '@/types/media.type'
import { Tabs } from '@mantine/core'
import { useEffect, useState } from 'react'

const AccountMediaStatePage = ({ mediaType }: { mediaType: MediaType }) => {
  const [statusTab, setStatusTab] = useState<string>('watchlist')
  return (
    <Tabs keepMounted={false} unstyled onChange={val => setStatusTab(val || '')} classNames={{ root: 'flex', panel: '', tabSection: 'w-auto flex flex-col text-center text-white font-bold p-1 mx-4', tab: 'data-[active=true]:bg-pink-500 w-[20vw] h-[6vh] border-yellow-200 border-[0.5px] text-white py-4 cursor-pointer hover:bg-pink-500' }} value={statusTab}>
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
        <TabData mediaType={mediaType} status={statusTab} />
      </Tabs.Panel>

      <Tabs.Panel value="watched">
        <TabData mediaType={mediaType} status={statusTab} />
      </Tabs.Panel>

      <Tabs.Panel value="watching">
        <TabData mediaType={mediaType} status={statusTab} />
      </Tabs.Panel>
    </Tabs>
  )
}

const TabData = (props: { mediaType: MediaType, status: string }) => {
  const mediaType = props.mediaType
  const status = props.status

  const dataQuery = useMediaAccountStates({ mediaType, status })

  useEffect(() => {
    dataQuery.setPage(1)
  }, [mediaType, status])
  useEffect(() => {
    if (dataQuery.isFetched) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [dataQuery.page, dataQuery.isFetched])

  return (
    <div className="px-4 w-[70vw]">
      <MediaGrid
        mediaType={mediaType}
        size="MEDIUM"
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
