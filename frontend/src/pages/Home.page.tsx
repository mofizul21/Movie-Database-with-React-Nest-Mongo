import {
	Box,
	Button,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import HeaderComponent from '../features/auth/components/Header.component';
import MovieComponent from '../features/movies/components/Movie.component';
import {
	getMovies,
	createMovies,
	updateMovies,
	deleteMovies,
} from '../features/movies/movieSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';

const HomePage = () => {
	const dispatch = useAppDispatch();

	const { movies } = useAppSelector((state) => state.movie);

	useEffect(() => {
		dispatch(getMovies());
	}, [dispatch]);

	const [open, setOpen] = useState(false);
	const addMovieHandleOpen = () => setOpen(true);
	const addMovieHandleClose = () => {
		setOpen(false);
	};

	const [updateData, setUpdateData] = useState<any>({
		_id: null,
		title: null,
		year: null,
	});
	const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
	const updateMovieHandleOpen = () => setOpenUpdatePopup(true);
	const updateMovieHandleClose = () => setOpenUpdatePopup(false);

	const [deleteData, setDeleteData] = useState<any>({
		_id: null,
		title: null,
	});
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const deleteMovieHandleOpen = () => setOpenDeletePopup(true);
	const deleteMovieHandleClose = () => setOpenDeletePopup(false);

	const onMovieAdd = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		dispatch(
			createMovies({
				title: data.get('title'),
				year: data.get('year'),
				onAdd: () => {
					addMovieHandleClose();
				},
			})
		);
		event.currentTarget.reset();
	};

	const onDelete = () => {
		dispatch(
			deleteMovies({
				id: deleteData._id,
			})
		);
		deleteMovieHandleClose();
		setDeleteData({ _id: null, title: null });
	};

	const onMovieUpdate = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(
			updateMovies({
				id: updateData._id,
				data: {
					title: updateData.title,
					year: updateData.year,
				},
				onUpdate: () => {
					updateMovieHandleClose();
					setUpdateData({ _id: null, title: null, year: null });
				},
			})
		);
	};
	const modalStyle = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		borderRadius: 2,
		boxShadow: '0 2px 18px #00000026',
		p: 4,
	};

	return (
		<>
			<HeaderComponent />

			<Typography
				variant="h3"
				component="h3"
				style={{ textAlign: 'center', margin: '15px 0px' }}
			>
				Your Favourite Movies
			</Typography>

			<Button
				sx={{ display: 'block', margin: '0 auto' }}
				variant="contained"
				size="large"
				onClick={addMovieHandleOpen}
			>
				Add Movie
			</Button>

			<Modal
				keepMounted
				open={open}
				onClose={addMovieHandleClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<Box sx={modalStyle}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Typography
							id="keep-mounted-modal-title"
							variant="h6"
							component="h2"
						>
							Add a Movie
						</Typography>
						<Button
							onClick={addMovieHandleClose}
							style={{ padding: 0, margin: 0 }}
						>
							X
						</Button>
					</Box>

					<Box
						component="form"
						onSubmit={onMovieAdd}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="title"
							label="Title"
							name="title"
							autoComplete="title"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="year"
							label="Year"
							type="number"
							id="year"
							autoComplete="year"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3 }}
						>
							Add Movie
						</Button>
					</Box>
				</Box>
			</Modal>

			<Modal
				keepMounted
				open={openUpdatePopup}
				onClose={updateMovieHandleClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography
						id="keep-mounted-modal-title"
						variant="h6"
						component="h2"
					>
						Update a Movie
					</Typography>
					<Button
						onClick={updateMovieHandleClose}
						style={{ float: 'right', marginTop: '-32px' }}
					>
						X
					</Button>
					<Box
						component="form"
						onSubmit={onMovieUpdate}
						noValidate
						autoComplete="off"
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="outlined-title"
							label="Title"
							name="title"
							autoComplete="title"
							// autoFocus
							InputLabelProps={{ shrink: true }}
							onChange={(e) =>
								setUpdateData({
									...updateData,
									title: e.target.value,
								})
							}
							value={updateData.title || ''}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="year"
							label="Year"
							type="number"
							id="outlined-year"
							autoComplete="year"
							InputLabelProps={{ shrink: true }}
							onChange={(e) =>
								setUpdateData({
									...updateData,
									year: e.target.value,
								})
							}
							value={updateData.year || ''}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Update Movie
						</Button>
					</Box>
				</Box>
			</Modal>

			<Modal
				keepMounted
				open={openDeletePopup}
				onClose={deleteMovieHandleClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography
						id="keep-mounted-modal-title"
						variant="h6"
						component="h2"
					>
						Are you sure to delete "
						<b>
							<i>{deleteData.title}</i>
						</b>
						"?
					</Typography>
					<Box sx={{ mt: 1, display: 'flex', justifyContent: 'end' }}>
						<Button
							type="button"
							sx={{ mt: 3, mr: 2 }}
							onClick={deleteMovieHandleClose}
						>
							No
						</Button>
						<Button
							type="button"
							variant="contained"
							sx={{ mt: 3 }}
							onClick={onDelete}
						>
							Yes
						</Button>
					</Box>
				</Box>
			</Modal>

			<TableContainer
				style={{
					paddingTop: '48px',
					width: '800px',
					margin: '0 auto',
				}}
			>
				<Table sx={{ minWidth: 650, border: 1 }}>
					<TableHead style={{ fontSize: '1.5rem' }}>
						<TableRow>
							<TableCell style={{ fontSize: '1.5rem' }}>
								ID
							</TableCell>
							<TableCell style={{ fontSize: '1.5rem' }}>
								Title
							</TableCell>
							<TableCell style={{ fontSize: '1.5rem' }}>
								Year
							</TableCell>
							<TableCell style={{ fontSize: '1.5rem' }}>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{movies.length > 0 &&
							movies.map((movie, id: number) => (
								<MovieComponent
									key={movie._id}
									movie={movie}
									serial={id}
									onDelete={() => {
										setDeleteData({
											_id: movie._id,
											title: movie.title,
										});
										deleteMovieHandleOpen();
									}}
									updatePopup={() => {
										setUpdateData({
											_id: movie._id,
											title: movie.title,
											year: movie.year,
										});
										updateMovieHandleOpen();
									}}
								/>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '48px',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '48px',
				}}
			></div>
		</>
	);
};

export default HomePage;
