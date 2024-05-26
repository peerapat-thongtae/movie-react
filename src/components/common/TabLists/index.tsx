import { Tabs } from '@mantine/core'
import { ReactNode, useState } from 'react'

export interface TabProp {
  value: string
  title: string
  headerChildren?: ReactNode
  panel: ReactNode
}
interface TabListsProp {
  defaultTab: string
  tabs: TabProp[]
}
const TabLists = (props: TabListsProp) => {
  const [activeTab, setActiveTab] = useState<string | null>(props.defaultTab)
  return (
    <Tabs
      keepMounted={false}
      value={activeTab}
      onChange={setActiveTab}
      unstyled
      classNames={{
        panel: 'bg-gray-500 bg-opacity-10 min-h-[64vh]',
        tabLabel: 'mx-2',
        list: 'grid grid-flow-col text-center bg-gray-500 bg-opacity-10 text-white font-bold p-1',
        tab: 'data-[active=true]:bg-pink-500 border-yellow-200 border-[0.5px] flex justify-center items-center py-4 cursor-pointer hover:bg-pink-500',
      }}
    >
      <Tabs.List>
        {props.tabs.map((val) => {
          return (
            <Tabs.Tab key={val.value} value={val.value}>
              {val.headerChildren
                ? val.headerChildren
                : <span>{val.title}</span>}
            </Tabs.Tab>

          )
        })}
      </Tabs.List>

      {props.tabs.map((val) => {
        return (
          <Tabs.Panel key={val.value} value={val.value}>
            {val.panel}
          </Tabs.Panel>
        )
      })}
    </Tabs>
  )
}

export default TabLists