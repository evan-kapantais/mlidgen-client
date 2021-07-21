import React from 'react';

const InitialForm = ({ submitId, initialId, setInitialId }) => {
	return (
		<form onSubmit={submitId}>
			<label htmlFor='id' className='primary-label'>
				Initial Id
			</label>
			<div className='input-container'>
				<input
					type='text'
					value={initialId}
					onChange={(e) => setInitialId(e.target.value)}
					className='primary-input'
					pattern='^[0-9]+$'
					title='Only numbers are allowed.'
					required
				/>
				<input type='submit' value='submit' className='primary-submit' />
			</div>
		</form>
	);
};

export default InitialForm;
