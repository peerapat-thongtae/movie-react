import todoApi from '@/services/client/todo-client'
import { MediaType } from '@/types/media.type'

class TodoService {
  private token = ''
  constructor(payload?: { token?: string }) {
    this.token = payload?.token || ''
  }

  getMediaInfo(payload: { media_type: MediaType, id: number }) {
    return todoApi.get(`/v2/${payload.media_type}/${payload.id}`)
  }

  getRecommendationMedias(payload: { media_type: MediaType, id: number }) {
    return todoApi.get(`/v2/${payload.media_type}/${payload.id}/recommendations`)
  }

  getSimilarMedias(payload: { media_type: MediaType, id: number }) {
    return todoApi.get(`/v2/${payload.media_type}/${payload.id}/similar`)
  }

  getImdbRating(imdbId: string) {
    return todoApi.get(`/v2/rating/${imdbId}`)
  }

  getImdbRatingByIds(imdbIds: string[]) {
    return todoApi.post(`/v2/rating`, { ids: imdbIds })
  }

  discoverMovie(payload: any) {
    return todoApi.get(`/v2/movie/discover`, {
      params: payload,
    })
  }

  discoverTV(payload: any) {
    return todoApi.get(`/v2/tv/discover`, {
      params: payload,
    })
  }

  getAccountStates(media_type: string | number) {
    return todoApi.get(`/v2/${media_type}`, { headers: { Authorization: `Bearer ${this.token}` } })
  }

  addToWatchlist(media_type: string, media_id: string | number, status: string) {
    return todoApi.post(`/v2/${media_type}`, { id: media_id, status }, { headers: { Authorization: `Bearer ${this.token}` } })
  }

  getAccountStatePaginate(payload: { media_type: string, status: string, page: number, is_anime?: boolean }) {
    return todoApi.get(`/v2/${payload.media_type}/paginate/${payload.status}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      params: { page: payload.page, is_anime: payload?.is_anime, with_imdb_rating: true },
    })
  }

  updateTVEpisodes(payload: any) {
    return todoApi.post(`/v2/tv/episodes`, payload, { headers: { Authorization: `Bearer ${this.token}` } })
  }
}

export default TodoService
