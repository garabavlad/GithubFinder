import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUser, setAlert, clearUsers, showClearBtn }) => {
	const [ text, setText ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		}
		else {
			searchUser(text);
			setText('');
		}
	};

	const handleChange = (e) => setText(e.target.value);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='text'
					placeholder='type user name here..'
					value={text}
					onChange={handleChange}
				/>
				<input type='submit' value='Search' className='btn btn-dark btn-block' />
			</form>
			{showClearBtn && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	searchUser   : PropTypes.func.isRequired,
	clearUsers   : PropTypes.func.isRequired,
	showClearBtn : PropTypes.bool.isRequired,
	setAlert     : PropTypes.func.isRequired
};

export default Search;
