import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCategory } from '@/services/modules/home'
import { ALL_CATEGORY_ITEM } from '@/constants'

export const fetchCategoryDataAction = createAsyncThunk(
  'category',
  async () => {
    const res = await getCategory()
    return res
  }
)

interface IHomeState {
  list: any[]
}

const initialState: IHomeState = {
  list: []
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategoryDataAction.fulfilled.type](state, { payload }) {
      state.list = payload.list
      state.list.unshift(ALL_CATEGORY_ITEM)
    }
  }
})

export default homeSlice.reducer
