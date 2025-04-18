import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './modules/notificationStore'

const store = configureStore({
  reducer: {
    notifications: notificationReducer
  }
})

export default store
