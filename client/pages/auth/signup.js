import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/useRequest';

export default () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: { email, password },
		onSuccess: () => Router.push('/'),
	})

	const submitSignUpForm = async (e) => {
		e.preventDefault();

		doRequest();
	};

	return (
			<form onSubmit={submitSignUpForm}>
				<h1>Sign up</h1>

				<div className="form-group">
					<label>Email address</label>
					<input
						type="text"
						className="form-control"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				{errors}

				<button
					className="btn btn-primary"
					onClick={submitSignUpForm}
				>
					Sign up
				</button>
			</form>
	);
}