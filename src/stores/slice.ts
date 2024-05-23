import { IRootState } from '@/stores/store'
import { ConfigTMDB, MediaType } from '@/types/media.type'
import { createSlice } from '@reduxjs/toolkit'

type StateInterface = {
  medias: any[]
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
} = accountStateSlice.actions

export const getAccountStateById = (state: IRootState, mediaType: MediaType, id: string) => {
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
