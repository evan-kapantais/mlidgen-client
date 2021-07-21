import React from 'react';

const ListItem = ({ attack, copy }) => {
	return (
		<li id={attack.id} className='list-item' onClick={() => copy(attack)}>
			{attack.name}
			<span>Copied ✔︎</span>
		</li>
	);
};

export default ListItem;
