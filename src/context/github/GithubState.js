import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './GithubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_REPOS, GET_USER } from '../types';

const GithubState = (props) => {
	const initialState = {
		users   : [],
		user    : {},
		repos   : [],
		loading : false
	};

	const [ state, dispatch ] = useReducer(GithubReducer, initialState);

	//search users

	// set laoding

	// clear users

	//get user

	//get repos

	return (
		<GithubContext.Provider
			value={{
				users   : state.users,
				user    : state.user,
				repos   : state.repos,
				loading : state.loading
			}}>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
