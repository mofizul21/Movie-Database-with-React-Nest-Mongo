import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { LoginUser } from '../model/LoginUser.interface';
import { CircularProgress } from '@mui/material';
import useInput from '../../../hooks/input/use-inputs';
import { login, reset } from '../AuthSlice';


function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link
				style={{ color: 'rgba(0, 0, 0, 0.6)' }}
				to="https://mofizul.com/"
			>
				https://mofizul.com/
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

const SigninFormComponent: FC = () => {
	const navigate = useNavigate();

    // Check user state and return
    const storedUser: string | null = localStorage.getItem('user');
    useEffect(() => {
		if (storedUser) {
			navigate('/');
		}
	}, [navigate, storedUser]);

	const {
		text: email,
		shouldDisplayError: emailHasError,
		textChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		clearHandler: emailClearHandler,
	} = useInput(validateEmail);

	const {
		text: password,
		shouldDisplayError: passwordHasError,
		textChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		clearHandler: passwordClearHandler,
	} = useInput(validatePasswordLength);

	const clearForm = () => {
		emailClearHandler();
		passwordClearHandler();
	};

	const dispatch = useAppDispatch();

	const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
		(state) => state.auth
	);


	useEffect(() => {
		if (isSuccess) {
			dispatch(reset());
			clearForm();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isSuccess]);

	useEffect(() => {
		if (!isAuthenticated) return;
		navigate('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (emailHasError || passwordHasError) return;

		if (email.length === 0 || password.length === 0) return;

		// clearForm();
		// console.log('User: ', email, password);

		const loginUser: LoginUser = { email, password };
		dispatch(login(loginUser));
	};

	if (isLoading)
		return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />;

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign-in
					</Typography>
					<Box
						component="form"
						onSubmit={onSubmitHandler}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							type="email"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							value={email}
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
							error={emailHasError}
							helperText={
								emailHasError ? 'Enter a valid email' : ''
							}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="password"
							value={password}
							onChange={passwordChangeHandler}
							onBlur={passwordBlurHandler}
							error={passwordHasError}
							helperText={
								passwordHasError
									? 'Minimum 6 chars required'
									: ''
							}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								Don't have an account?{' '}
								<Link
									style={{ color: 'rgba(0, 0, 0, 0.6)' }}
									to="/register"
								>
									{'Register Now.'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default SigninFormComponent;
