import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuthStore {
  isAuthenticated: boolean
  isInitialized: boolean
  profile: any
}

const initialState: IAuthStore = {
  isAuthenticated: false,
  isInitialized: false,
  profile: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        profile: action.payload,
      }
    },
    removeAuth: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        isInitialized: true,
        profile: null,
      }
    },
  },
})

export const { updateAuth, removeAuth } = AuthSlice.actions
