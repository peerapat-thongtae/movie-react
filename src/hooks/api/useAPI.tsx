import todoApi from '@/services/client/todo-client'
import { getToken } from '@/stores/slice'
import { useSelector } from 'react-redux'

export const useAPI = () => {
  const token = useSelector(getToken)

  const getImdbRating = (imdbId: string) => {
    return todoApi.get(`/rating/${imdbId}`)
  }

  const getImdbRatingByIds = (imdbIds: string[]) => {
    return todoApi.post(`/rating/imdb`, { ids: imdbIds })
  }

  const getAccountState = (media_type: string, media_id: string | number) => {
    return todoApi.get(`/${media_type}/${media_id}`, { headers: { Authorization: `Bearer ${token}` } })
  }

  const getAccountStates = (media_type: string | number) => {
    return todoApi.get(`/${media_type}`, { headers: { Authorization: `Bearer ${token}` } })
  }

  const addToWatchlist = (media_type: string, media_id: string | number, status: string) => {
    return todoApi.post(`/${media_type}`, { id: media_id, status }, { headers: { Authorization: `Bearer ${token}` } })
  }

  const getAccountStatePaginate = (media_type: string, status: string, page: number) => {
    return todoApi.get(`/${media_type}/paginate/${status}?page=${page}`, { headers: { Authorization: `Bearer ${token}` } })
  }

  const updateTVEpisodes = (payload: any) => {
    return todoApi.post(`/tv/episodes`, payload, { headers: { Authorization: `Bearer ${token}` } })
  }

  return { getImdbRating, getAccountState, getAccountStates, addToWatchlist, getAccountStatePaginate, updateTVEpisodes, token, getImdbRatingByIds }
}
