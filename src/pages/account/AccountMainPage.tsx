import TabLists from '@/components/common/TabLists'
import AccountMediaStatePage from '@/pages/account/AccountMediaStatePage'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'

interface IAccountMainPageProps {
  initialTab: 'main' | 'movie' | 'tv'
}
const AccountMainPage = (props: IAccountMainPageProps) => {
  const { user } = useAuth0()
  const [initialTab] = useState<string | null>(props.initialTab || null)
  const tabs = [
    {
      value: 'main',
      title: 'Overview',
      panel: <div>MainTab</div>,
    },
    {
      value: 'movie',
      title: 'Movies',
      panel: <div className="w-full p-12"><AccountMediaStatePage mediaType="movie" /></div>,
    },
    {
      value: 'tv',
      title: 'TV Series',
      panel: <div className="w-full p-12"><AccountMediaStatePage mediaType="tv" /></div>,
    },
  ]
  return (
    <div className="mt-24">
      <div className="flex justify-center items-center text-2xl font-bold pt-12">{user?.name}</div>
      <div className="pt-12">
        <TabLists defaultTab={initialTab} tabs={tabs} />
      </div>
    </div>
  )
}

export default AccountMainPage
