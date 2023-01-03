import { Box, AppBar, Toolbar, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { logout, selectedUser } from '../AuthSlice';

const HeaderComponent = () => {
	const { user } = useAppSelector(selectedUser);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	// Check user state and return
	const storedUser: string | null = localStorage.getItem('user');
	useEffect(() => {
		if (!storedUser) {
			navigate('/signin');
		}
	}, [navigate, storedUser]);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: '#131921',
					color: 'white',
					padding: '4px',
				}}
			>
				<Toolbar
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<h1>Favourite Movies</h1>
					<div style={{ display: 'flex' }}>
						<div>
							<div>Hello, {user?.name}</div>
							<Button
								onClick={logoutHandler}
								sx={{ padding: 0, marginRight: '16px' }}
								color="inherit"
							>
								Sign out
							</Button>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default HeaderComponent;
