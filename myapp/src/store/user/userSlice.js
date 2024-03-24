import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  createList: [],
  likeList: [],
}

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setEmailId: ( state, action ) => {
        state.email = action.payload;
    },
    setCreateList: (state, action) => {
      state.createList = action.payload;
    },
    setLikeList: (state, action) => {
      state.likeList = action.payload;
    },
  },
})

export const { setCreateList, setLikeList, setEmailId } = userSlice.actions

export default userSlice.reducer
