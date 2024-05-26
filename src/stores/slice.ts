import { IRootState } from '@/stores/store'
import { AccountState, ConfigTMDB, MediaType } from '@/types/media.type'
import { createSlice } from '@reduxjs/toolkit'

type StateInterface = {
  medias: AccountState[]
  config: ConfigTMDB
  token: string
  stateRoute: {
    [path: string]: any
  }
}
const initialState: StateInterface = {
  medias: [],
  config: {
    genreMovies: [],
    genreTV: [],
    countries: [],
    jobs: [],
    languages: [],
    images: {},
  },
  token: '',
  stateRoute: {},
}
export const accountStateSlice = createSlice({
  name: 'accountStates',
  initialState: initialState,
  reducers: {
    setAccountStates: (state, action) => {
      state.medias = action.payload
    },
    setAccountStateById: (state, action) => {
      const mediaType = action.payload.mediaType === 'anime' ? 'tv' : action.payload.mediaType
      const findMedia = state.medias.findIndex(val => val.id === action.payload.id && mediaType === val.media_type)
      if (mediaType === 'movie') {
        if (findMedia) {
          state.medias[findMedia].watchlist = action.payload
        }
        else {
          state.medias.push(action.payload)
        }
      }
      else {
        if (findMedia) {
          state.medias[findMedia] = { ...action.payload }
        }
        else {
          state.medias.push(action.payload)
        }
      }
    },
    setConfigState: (state, action) => {
      state.config = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setStateRoute: (state, action) => {
      state.stateRoute[action.payload.path] = action.payload.state
    },
  },
})

export const {
  setAccountStates,
  setConfigState,
  setToken,
  setStateRoute,
  setAccountStateById,
} = accountStateSlice.actions

export const getAccountStateById = (state: IRootState, mediaType: MediaType, id: string | number | undefined) => {
  mediaType = mediaType === 'anime' ? 'tv' : mediaType
  const findState = state?.accountState?.medias.find((val: any) => val.media_type === mediaType && val.id?.toString() === id?.toString())
  return findState || null
}

export const getConfigTMDB = (state: IRootState) => {
  return state?.accountState.config
}

export const getToken = (state: IRootState) => {
  return state?.accountState.token
}

export const getStateRouteFromPath = (state: IRootState, path: string) => {
  return state?.accountState.stateRoute[path]
}

export default accountStateSlice.reducer
