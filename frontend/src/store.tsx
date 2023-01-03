import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './features/auth/AuthSlice';
import movieReducer from './features/movies/movieSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		movie: movieReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
