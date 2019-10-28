import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

const User = ({ user, getUser, getRepos, match, loading, repos }) => {
	useEffect(() => {
		getUser(match.params.login);
		getRepos(match.params.login);
		// eslint-disable-next-line
	}, []);

	const {
		name,
		company,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable
	} = user;

	if (loading) return <Spinner />;
	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back To Search
			</Link>
			Hireable: {' '}
			{hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
			<div className='card grid-2'>
				<div className='all-center'>
					<img src={avatar_url} className='round-img' alt='avatar' style={{ width: '150px' }} />
					<h1>{name}</h1>
					<p>
						<b>Location:</b> {location}
					</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio Details</h3>
							<p>{bio}</p>
						</Fragment>
					)}

					<a href={html_url} className='btn btn-dark my-1 '>
						Visit Github Profile
					</a>

					<ul>
						{login && (
							<li>
								<Fragment>
									<b>Username:</b> {login}
								</Fragment>
							</li>
						)}
						{company && (
							<li>
								<Fragment>
									<b>Company:</b> {company}
								</Fragment>
							</li>
						)}
						{blog && (
							<li>
								<Fragment>
									<b>Blog:</b> {blog}
								</Fragment>
							</li>
						)}
					</ul>
				</div>
			</div>
			<div className='card text-center'>
				<div className='badge badge-primary'>Followers: {followers}</div>
				<div className='badge badge-success'>Following: {following}</div>
				<div className='badge badge-dark'>Public Repos: {public_repos}</div>
				<div className='badge badge-light'>Public Gists: {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

User.propTypes = {
	loading  : PropTypes.bool,
	user     : PropTypes.object.isRequired,
	getUser  : PropTypes.func.isRequired,
	getRepos : PropTypes.func.isRequired,
	repos    : PropTypes.array.isRequired
};

export default User;
