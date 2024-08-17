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
    watchProviders: [],
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
      const mediaType = action.payload.media_type === 'anime' ? 'tv' : action.payload.media_type
      const findIndex = state.medias.findIndex(val => val.id === action.payload.id && mediaType === val.media_type)
      if (mediaType === 'movie') {
        if (findIndex >= 0) {
          state.medias[findIndex] = { ...action.payload, media_type: mediaType }
        }
        else {
          state.medias.push({ ...action.payload, media_type: mediaType })
        }
      }
      else {
        if (findIndex >= 0) {
          state.medias[findIndex] = { ...action.payload, media_type: mediaType }
        }
        else {
          state.medias.push({ ...action.payload, media_type: mediaType })
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
      state.stateRoute
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
  return { path: path, state: state?.accountState.stateRoute[path] || {} }
}

export default accountStateSlice.reducer
