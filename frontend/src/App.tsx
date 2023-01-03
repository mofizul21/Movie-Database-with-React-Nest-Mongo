import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './shared/utils/validation/themes';
import RegisterPage from './pages/Register.page';
import SigninPage from './pages/Signin.page';
import HomePage from './pages/Home.page';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/register" element={<RegisterPage />}></Route>
					<Route path="/signin" element={<SigninPage />}></Route>
					<Route path="*" element={<Navigate to="/signin" />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
