import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../slices/posts/postsSlice'
import notificationsReducer from '../slices/notifications/notificationsSlice';
import userAuthReducer from '../slices/auth/userAuthSlice ';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    notifications : notificationsReducer,
    userAuth: userAuthReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch