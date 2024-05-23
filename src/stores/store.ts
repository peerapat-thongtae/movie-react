import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import accountStateReducer from './slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'movizius',
  storage,
}

const reducers = combineReducers({
  accountState: accountStateReducer,
})

export type IRootState = ReturnType<typeof reducers>

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
export const persistor = persistStore(store)
