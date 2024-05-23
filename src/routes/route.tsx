import DemoComponentPage from '@/pages/DemoComponentPage'
import HomePage from '@/pages/HomePage'
import MediaHomePage from '@/pages/MediaHomePage'
import { useLayoutEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Router } from 'react-router-dom'

const CustomRouter = ({ history, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie" element={<MediaHomePage mediaType="movie" />} />
      <Route path="/tv" element={<MediaHomePage mediaType="tv" />} />
      <Route path="/anime" element={<MediaHomePage mediaType="anime" />} />
      <Route path="/demo" element={<DemoComponentPage />} />
      {/* <Route path="/movie" element={<Discover mediaType="movie" />} />
      <Route path="/tv" element={<Discover mediaType="tv" />} />
      <Route path="/anime" element={<Discover mediaType="anime" />} />
      <Route path="/search" element={<SearchMoviePage />} />
      <Route path="/movie/:id" element={<MediaDetailPage mediaType="movie" />} />
      <Route path="/tv/:id" element={<MediaDetailPage mediaType="tv" />} />
      <Route path="/account" element={<AccountMediaPage />} /> */}
    </Routes>
  )
}

export default RouteList
