//Survey Field contains logic to render a single label and text input

import React from 'react';

// ...input here signifies input tag that we have various props that
//can be passed. JSX ...input passes all keys and values
export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label> {label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
