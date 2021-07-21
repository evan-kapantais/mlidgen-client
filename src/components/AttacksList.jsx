import React from 'react';
import ListItem from './ListItem';

const AttacksList = ({ attacks, deleteAll, copy }) => {
	const hasAttacks = attacks.length > 0;

	return (
		<div id='attacks'>
			{!hasAttacks && <p>Added attacks will show up here.</p>}
			{hasAttacks && (
				<>
					<header>
						<h2 id='attacks-heading'>Attacks</h2>
						<button type='button' id='clear-list-button' onClick={deleteAll}>
							Delete All
						</button>
					</header>
					<div className='attacks'>
						<ul className='list'>
							{attacks.map((attack) => (
								<ListItem key={attack.id} attack={attack} copy={copy} />
							))}
						</ul>
						<ul className='list'>
							{/* {attacks.map((attack) => (
									<ListItem key={attack.id} attack={attack} />
								))} */}
						</ul>
					</div>
				</>
			)}
		</div>
	);
};

export default AttacksList;
