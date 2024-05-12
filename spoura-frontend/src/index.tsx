import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { Footer } from './components/Footer.js';
import "./index.css"
import { Product } from './pages/Product/index.js';
import { AuthWrapper } from './components/Auth.js';
import { useEffect, useState } from 'preact/hooks';
import { Shop } from './pages/Shop/index.js';

export function App() {

	const [user, setUser] = useState({
		ID: null,
		Nickname: null,
		Cart: null,
		Favourites: null
	});
  	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchUser = async () => {
		try {
			const userData = await AuthWrapper();
			setUser({
				ID: userData["ID"],
				Nickname: userData["Nickname"],
				Cart: userData["Cart"],
				Favourites: userData["Favourites"]
			});
		} catch (error) {
			console.error('Authentication failed:', error);
		} finally {
			setLoading(false);
		}
		};

		fetchUser();
	}, []);
	
	return (
		<LocationProvider>
			<Header user={user} loading={loading} setUser={setUser} />
			<main class="min-h-screen">
				<Router>
					<Route path="/" component={Home} />
					<Product path='/product/:slug' user={user} setUser={setUser} loading={loading} />
					<Shop path='/shop' user={user} setUser={setUser} loading={loading} />
					<Route path="*" component={NotFound} />
				</Router>
			</main>
			<Footer />
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
