import DemoComponentPage from '@/pages/DemoComponentPage'
import HomePage from '@/pages/HomePage'
import MediaDetailPage from '@/pages/MediaDetailPage'
import MediaHomePage from '@/pages/MediaHomePage'
import SearchMediaPage from '@/pages/SearchPage'
import { Routes, Route } from 'react-router-dom'

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie" element={<MediaHomePage mediaType="movie" />} />
      <Route path="/movie/:id" element={<MediaDetailPage mediaType="movie" />} />
      <Route path="/tv" element={<MediaHomePage mediaType="tv" />} />
      <Route path="/tv/:id" element={<MediaDetailPage mediaType="tv" />} />
      <Route path="/anime" element={<MediaHomePage mediaType="anime" />} />
      <Route path="/anime/:id" element={<MediaDetailPage mediaType="anime" />} />
      <Route path="/demo" element={<DemoComponentPage />} />
      <Route path="/search" element={<SearchMediaPage />} />
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
