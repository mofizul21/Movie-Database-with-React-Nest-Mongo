import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MovieDocument } from './models/Movie';
import movieService from './services/movie.service';

interface AsyncState {
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
}

interface MovieState extends AsyncState {
	movies: MovieDocument[];
}

const initialState: MovieState = {
	movies: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
};

export const getMovies = createAsyncThunk('movie', async () => {
	try {
		return await movieService.getMovies();
	} catch (error) {
		console.log('Error: ', error);
	}
});

export const createMovies = createAsyncThunk('movie/add', async (data: any) => {
	try {
		return await movieService.addMovie(data);
	} catch (error) {
		console.log('Error: ', error);
	}
});

export const updateMovies = createAsyncThunk('movie/update', async (data: any) => {
		try {
			return await movieService.updateMovie(data.id, data.data);
		} catch (error) {
			console.log('Error: ', error);
		}
	}
);

export const deleteMovies = createAsyncThunk( 'movie/delete', async ({ id }: any) => {
		try {
			return await movieService.deleteMovie(id);
		} catch (error) {
			console.log('Error: ', error);
		}
	}
);

export const movieSlice = createSlice ({
	name: 'movie',
	initialState,
	reducers: {
        
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMovies.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.movies = action.payload?.data || [];
			})
			.addCase(getMovies.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.movies = [];
			})
			.addCase(createMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createMovies.fulfilled, (state, action: any) => {
				state.isLoading = false;
				state.isSuccess = true;
				const {
					arg: { onAdd },
				} = action.meta;

				state.movies = [...state.movies, action.payload.data];
				onAdd();
			})
			.addCase(createMovies.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.movies = [...state.movies];
			})
			.addCase(updateMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateMovies.fulfilled, (state, action: any) => {
				state.isLoading = false;
				const {
					arg: { id, data, onUpdate },
				} = action.meta;

				state.isSuccess = true;
				if (id) {
					state.movies = state.movies.map((item) =>
						item._id === id ? { ...item, ...data } : item
					);
					onUpdate();
				}
			})
			.addCase(updateMovies.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.movies = [...state.movies];
			})
			.addCase(deleteMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteMovies.fulfilled, (state, action: any) => {
				state.isLoading = false;
				const {
					arg: { id },
				} = action.meta;

				state.isSuccess = true;
				if (id) {
					state.movies = state.movies.filter(
						(item) => item._id !== id
					);
				}
			})
			.addCase(deleteMovies.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.movies = [...state.movies];
			});
	},
});

export default movieSlice.reducer;
