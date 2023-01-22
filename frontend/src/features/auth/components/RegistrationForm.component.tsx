import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, FormEvent, useEffect } from 'react';
import useInput from '../../../hooks/input/use-inputs';
import {
	validateNameLength,
	validatePasswordLength,
} from '../../../shared/utils/validation/length';
import { validateEmail } from '../../../shared/utils/validation/email';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { register, reset } from '../AuthSlice';
import { CircularProgress } from '@mui/material';
import { NewUser } from '../model/NewUser';

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
				https://mofizul.com
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

const RegistrationFormcomponent: FC = () => {
	const {
		text: name,
		shouldDisplayError: nameHasError,
		textChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		clearHandler: nameClearHandler,
	} = useInput(validateNameLength);

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

	const {
		text: confirmPassword,
		shouldDisplayError: confirmPasswordHasError,
		textChangeHandler: confirmPasswordChangeHandler,
		inputBlurHandler: confirmPasswordBlurHandler,
		clearHandler: confirmPasswordClearHandler,
	} = useInput(validatePasswordLength);

	const clearForm = () => {
		nameClearHandler();
		emailClearHandler();
		passwordClearHandler();
		confirmPasswordClearHandler();
	};

	const dispatch = useAppDispatch();
	const { isLoading, isSuccess, isError } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();
    
	// Check user state and return
	const storedUser: string | null = localStorage.getItem('user');
	useEffect(() => {
		if (storedUser) {
			navigate('/');
		}
	}, [navigate, storedUser]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(reset());
			clearForm();
			navigate('/signin');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isSuccess]);

	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) return;

		if (
			nameHasError ||
			emailHasError ||
			passwordHasError ||
			confirmPasswordHasError
		)
			return;

		if (
			name.length === 0 ||
			email.length === 0 ||
			password.length === 0 ||
			confirmPassword.length === 0
		)
			return;

		const newUser: NewUser = { name, email, password };

		// clearForm();
		// console.log('New user: ', newUser);
		dispatch(register(newUser));
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
						Registration
					</Typography>

					<Box
						onSubmit={onSubmitHandler}
						component="form"
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							type="text"
							name="name"
							id="name"
							margin="normal"
							required
							fullWidth
							label="Full Name"
							autoComplete="name"
							autoFocus
							value={name}
							onChange={nameChangeHandler}
							onBlur={nameBlurHandler}
							error={nameHasError}
							helperText={nameHasError ? 'Enter your name' : ''}
						/>
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
						<TextField
							margin="normal"
							required
							fullWidth
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							id="confirmPassword"
							autoComplete="confirmPassword"
							value={confirmPassword}
							onChange={confirmPasswordChangeHandler}
							onBlur={confirmPasswordBlurHandler}
							error={
								confirmPassword.length > 0 &&
								password !== confirmPassword
							}
							helperText={
								confirmPassword.length > 0 &&
								password !== confirmPassword
									? 'Confirm password must be matched'
									: ''
							}
						/>

						{isError && !isSuccess && (
							<Alert severity="error">
								Maybe the email is already taken! Please try with different one.
							</Alert>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>

						<Grid container>
							<Grid item>
								Already have an account?{' '}
								<Link
									style={{ color: 'rgba(0, 0, 0, 0.6)' }}
									to="/signin"
								>
									{'Sign-in.'}
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
export default RegistrationFormcomponent;
