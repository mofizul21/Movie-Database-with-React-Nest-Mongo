import { FC } from 'react';
import { TableCell, TableRow, Button, Stack } from '@mui/material';
import { MovieDocument } from '../models/Movie';

interface MovieComponentProps {
	movie: MovieDocument;
	updatePopup: Function;
	onDelete: Function;
	serial: number;
}

const MovieComponent: FC<MovieComponentProps> = ({
	movie,
	updatePopup,
	onDelete,
    serial,
}) => {
	return (
		<TableRow>
			<TableCell style={{ fontSize: '1.3rem' }}>{serial + 1}</TableCell>
			<TableCell style={{ fontSize: '1.3rem' }}>{movie.title}</TableCell>
			<TableCell style={{ fontSize: '1.3rem' }}>{movie.year}</TableCell>
			<TableCell>
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						color="success"
						onClick={() => updatePopup()}
					>
						Edit
					</Button>
					<Button
						variant="outlined"
						color="error"
						onClick={() => onDelete(movie._id)}
					>
						Delete
					</Button>
				</Stack>
			</TableCell>
		</TableRow>
	);
};

export default MovieComponent;
