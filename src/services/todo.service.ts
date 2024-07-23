import todoApi from '@/services/client/todo-client'

class TodoService {
  private token = ''
  constructor(payload?: { token?: string }) {
    this.token = payload?.token || ''
  }

  getImdbRating(imdbId: string) {
    return todoApi.get(`/rating/imdb/${imdbId}`)
  }

  getImdbRatingByIds(imdbIds: string[]) {
    return todoApi.post(`/rating/imdb`, { ids: imdbIds })
  }

  getAccountState(media_type: string, media_id: string | number) {
    return todoApi.get(`/${media_type}/${media_id}`, { headers: { Authorization: `Bearer ${this.token}` } })
  }

  getAccountStates(media_type: string | number) {
    return todoApi.get(`/${media_type}`, { headers: { Authorization: `Bearer ${this.token}` } })
  }

  addToWatchlist(media_type: string, media_id: string | number, status: string) {
    return todoApi.post(`/${media_type}`, { id: media_id, status }, { headers: { Authorization: `Bearer ${this.token}` } })
  }

  getAccountStatePaginate(media_type: string, status: string, page: number) {
    return todoApi.get(`/v2/${media_type}/paginate/${status}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      params: { page, with_imdb_rating: true },
    })
  }

  updateTVEpisodes(payload: any) {
    return todoApi.post(`/tv/episodes`, payload, { headers: { Authorization: `Bearer ${this.token}` } })
  }
}

export default TodoService
