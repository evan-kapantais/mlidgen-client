import React from 'react';

const Container = (props) => {
	return (
		<div id='container' className='panel panel--hidden'>
			<section>
				<header className='brand'>
					<h1>Attacks</h1>
				</header>
				<main>
					{id === null ? (
						<InitialForm
							submitId={submitId}
							initialId={initialId}
							setInitialId={setInitialId}
						/>
					) : (
						<Form {...formProps} />
					)}
					<AttacksList copy={copy} attacks={attacks} deleteAll={deleteAll} />
				</main>
			</section>
			<footer>
				<button
					type='button'
					className='settings-button'
					onClick={toggleSettings}
				>
					<img src={settingsIcon} alt='settings' />
				</button>
			</footer>
		</div>
	);
};

export default Container;
