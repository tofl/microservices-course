import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/header';
import buildClient from '../api/buildClient';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header currentUser={currentUser} />
			<div className="container">
				<Component currentUser={currentUser} {...pageProps} />
			</div>
		</div>
	)
}

AppComponent.getInitialProps = async (context) => {
	const client = buildClient(context.ctx);
	const { data } = await client.get('/api/users/currentuser');

	// Permet d'exécuter la fonction getInitialProps de chaque composant qui en comporte une
	// et de transmettre à ces composants des informations (context et currentUser)
	let pageProps = {};
	if (context.Component.getInitialProps) {
		// Alternative (?) : transmettre des données d'un composant à l'autre en utilisant le store
		pageProps = await context.Component.getInitialProps({
			context: context.ctx,
			currentUser: data.currentUser,
			client,
		});
	}

	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
