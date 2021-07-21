import React from 'react';

const Form = (props) => {
	const {
		submit,
		input,
		handleInputChange,
		handleMouseEnter,
		id,
		prefix,
	} = props;

	const handleFocus = () => {
		const inputContainer = document.querySelector('#primary-input-container');
		inputContainer.classList.add('primary-input-container__focused');
	};

	const handleBlur = () => {
		const inputContainer = document.querySelector('#primary-input-container');
		inputContainer.classList.remove('primary-input-container__focused');
	};

	const formattedId =
		id.current_id < 10
			? id.current_id !== 0
				? `0${id.current_id}`
				: 0
			: id.current_id;

	return (
		<form id='primary-form' onSubmit={submit}>
			<div id='primary-input-container' className='input-container'>
				<p>
					{formattedId}
					{prefix}
				</p>
				<input
					type='text'
					className='primary-input'
					value={input}
					onChange={handleInputChange}
					onMouseEnter={handleMouseEnter}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required
				/>
				<input type='submit' value='submit' className='primary-submit' />
			</div>
			<p id='next-id'>
				Next Id: <b>{formattedId}</b>
			</p>
		</form>
	);
};

export default Form;
