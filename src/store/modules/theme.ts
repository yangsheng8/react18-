import { createSlice } from '@reduxjs/toolkit'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

interface IThemeState {
  themeType: string
}

const initialState: IThemeState = {
  themeType: THEME_LIGHT
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeAction(state, { payload }) {
      state.themeType = payload
    }
  }
})
export const { changeThemeAction } = themeSlice.actions
export default themeSlice.reducer
