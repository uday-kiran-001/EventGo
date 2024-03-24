import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './user/userSlice'
import eventListReducer from './events/eventSlice'

const store = configureStore({
  reducer: {
    'userInfo': userInfoReducer,
    'eventList': eventListReducer,
  },
})


export { store }