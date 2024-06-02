import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import Posters from '@/components/media/Posters/index'

const SchedulePage = () => {
  const { getAccessTokenSilently } = useAuth0()
  useEffect(() => {
    getAccessTokenSilently().then(val => console.log(val))
  }, [])

  const posters = [
    {
      file_path: 'https://www.themoviedb.org/t/p/w1280/zDi2U7WYkdIoGYHcYbM9X5yReVD.jpg',
    },
    {
      file_path: 'https://www.themoviedb.org/t/p/w1280/zDi2U7WYkdIoGYHcYbM9X5yReVD.jpg',
    },
    {
      file_path: 'https://www.themoviedb.org/t/p/w1280/zDi2U7WYkdIoGYHcYbM9X5yReVD.jpg',
    },
    {
      file_path: 'https://www.themoviedb.org/t/p/w1280/zDi2U7WYkdIoGYHcYbM9X5yReVD.jpg',
    },
    {
      file_path: 'https://www.themoviedb.org/t/p/w1280/zDi2U7WYkdIoGYHcYbM9X5yReVD.jpg',
    },
  ]
  return (
    <div className="my-24 px-8">
      <Posters posters={posters} />
    </div>
  )
}

export default SchedulePage
