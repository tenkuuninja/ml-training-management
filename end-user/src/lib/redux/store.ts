import { LOCALSTORAGE_REDUX_PERSIST } from '@/configs/app'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AuthSlice } from './slices/auth'

const rootReducer = {
  auth: AuthSlice.reducer,
}

const combinedReducer = combineReducers(rootReducer)

const persistConfig = {
  key: LOCALSTORAGE_REDUX_PERSIST,
  storage,
  whitelist: [AuthSlice.name],
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: persistedReducer,
})
export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export default store
