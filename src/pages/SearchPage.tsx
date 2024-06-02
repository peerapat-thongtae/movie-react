import { Tabs } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useSearch } from '@/hooks/useMedia'
import MediaGrid from '@/components/media/MediaGrid'
import { useSearchParams } from 'react-router-dom'

const SearchMediaPage = () => {
  const [searchParams] = useSearchParams()

  const searchString = searchParams?.get('name') as string
  const [activeTab, setActiveTab] = useState<string | null>('movies')

  return (
    <div className="p-12 mt-24">
      <div>
        <Tabs keepMounted={false} unstyled onChange={setActiveTab} classNames={{ root: 'flex', panel: '', tabSection: 'w-auto flex flex-col text-center text-white font-bold p-1 mx-4', tab: 'data-[active=true]:bg-pink-500 w-[20vw] h-[6vh] border-yellow-200 border-[0.5px] text-white py-4 cursor-pointer hover:bg-pink-500' }} value={activeTab}>
          <Tabs.List>
            <Tabs.Tab value="movies">
              <div className="flex justify-between px-4">
                <div>Movies</div>
                {/* <span className="">{!dataQueryMovies.isLoading ? dataQueryMovies.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="tv">
              <div className="flex justify-between px-4">
                <div>TV</div>
                {/* <span className="">{ !dataQueryTV.isLoading ? dataQueryTV?.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="person">
              <div className="flex justify-between px-4">
                <div>Person</div>
                {/* <span className="">{ !dataQueryTV.isLoading ? dataQueryTV?.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
              </div>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="movies">
            <TabData mediaType="movie" searchString={searchString} />
          </Tabs.Panel>

          <Tabs.Panel value="tv">
            <TabData mediaType="tv" searchString={searchString} />
          </Tabs.Panel>

          <Tabs.Panel value="person">
            <TabData mediaType="person" searchString={searchString} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

const TabData = (props: any) => {
  const mediaType = props.mediaType
  const searchString = props.searchString

  const dataQuery = useSearch(searchString, mediaType)

  useEffect(() => {
    dataQuery.setPage(1)
  }, [searchString])
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

export default SearchMediaPage
