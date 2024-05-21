import HomePage from '@/pages/HomePage'
import { Routes, Route } from 'react-router-dom'

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
