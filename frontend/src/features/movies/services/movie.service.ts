import axios from 'axios';
import { MovieDocument, Movie } from '../models/Movie';

const getMovies = async () => {
	const response = await axios.get<MovieDocument[]>(
		`${process.env.REACT_APP_BASE_API}/movie`
	);

	return response;
};

const addMovie = async (data: Movie) => {
	const response = await axios.post<MovieDocument>(
		`${process.env.REACT_APP_BASE_API}/movie`,
		data
	);

	return response;
};
const updateMovie = async (id: string, data: Movie) => {
	const response = await axios.patch<MovieDocument>(
		`${process.env.REACT_APP_BASE_API}/movie/${id}`,
		data
	);

	return response;
};
const deleteMovie = async (id: string) => {
	const response = await axios.delete<MovieDocument>(
		`${process.env.REACT_APP_BASE_API}/movie/${id}`,
		{}
	);

	return response;
};

const movieService = {
	getMovies,
	addMovie,
	updateMovie,
	deleteMovie,
};

export default movieService;
