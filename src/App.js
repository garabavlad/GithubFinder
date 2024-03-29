import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Search from './components/layout/Search';
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/pages/User';
import axios from 'axios';
import './App.css';

import GithubState from './context/github/GithubState';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState(null);

	const searchUsers = async (text) => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&\
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		setUsers(res.data.items);
		setLoading(false);
	};

	const getRepos = async (username) => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process
			.env.REACT_APP_GITHUB_CLIENT_ID}&\
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		setRepos(res.data);
		setLoading(false);
	};

	const getUser = async (username) => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&\
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		setUser(res.data);
		setLoading(false);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		setTimeout(setAlert(null), 4000);
	};

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar title='Github Finder' icon='fab fa-github' />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											setAlert={showAlert}
											searchUser={searchUsers}
											clearUsers={clearUsers}
											showClearBtn={users.length > 0 ? true : false}
										/>
										<Users users={users} loading={loading} />
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={getUser}
										user={user}
										loading={loading}
										getRepos={getRepos}
										repos={repos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
