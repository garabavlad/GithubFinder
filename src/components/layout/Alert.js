import React from 'react';
// import PropTypes from 'prop-types';

// Alert.propTypes = {
// 	alert : PropTypes.object.isRequired
// };

const Alert = (props) => {
	return (
		props.alert !== null && (
			<div className={`alert alert-${props.alert.type}`}>
				<i className='fas fa-info-circle' />
				{props.alert.msg}
			</div>
		)
	);
};

export default Alert;
