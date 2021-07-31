import { useEffect, useState } from 'react';
import AttacksList from './components/AttacksList';
import Settings from './components/Settings';
import InitialForm from './components/InitialForm';
import Form from './components/Form';

import settingsIcon from './icons/settings.svg';

import attacksService from './services/attacks';
import baseService from './services/base';

//TODO: display error when unable to fetch attacks from server
//TODO: sync form message with server response
//TODO: input hook

function App() {
	const [initialId, setInitialId] = useState('');
	const [id, setId] = useState(null);
	const [input, setInput] = useState('');
	const [attacks, setAttacks] = useState([]);
	const [error, setError] = useState(null);

	const [paste, setPaste] = useState(false);
	const [spacesRpl, setSpacesRpl] = useState('underscores');
	const [hasLimit, setHasLimit] = useState(false);
	const [limit, setLimit] = useState(20);
	const [prefix, setPrefix] = useState('_mc_attack_');
	const [newId, setNewId] = useState(0);

	// Show the container once the page loads
	useEffect(() => {
		const container = document.querySelector('#container');
		container.classList.remove('panel--hidden');
	}, []);

	// Get all data from the server
	useEffect(() => {
		baseService.getAll().then((base) => {
			setId(base);
			setNewId(base.current_id);
		});

		attacksService
			.getAll()
			.then((attacks) => {
				setAttacks([...attacks]);
			})
			.catch((error) => console.log(error));
	}, []);

	// Get / Set local settings
	useEffect(() => {
		setPaste(getLocalItem('mlidgen-setting-hover') || false);
		setSpacesRpl(getLocalItem('mlidgen-setting-replace') || 'underscores');
		setPrefix(getLocalItem('mlidgen-setting-prefix') || '_mc_attack_');
		setHasLimit(getLocalItem('mlidgen-setting-has-limit' || false));
		setLimit(getLocalItem('mlidgen-setting-limit') || 20);
		setHasLimit(getLocalItem('mlidgen-setting-has-limit') || false);
	}, []);

	const getLocalItem = (key) => {
		return JSON.parse(localStorage.getItem(key));
	};

	const handleMouseEnter = () => {
		if (paste) {
			navigator.clipboard.readText().then((text) => setInput(text));
		}
	};

	const handleInputChange = (e) => {
		let format = e.target.value.toLowerCase();

		format =
			spacesRpl === 'underscores'
				? format.replace(' ', '_')
				: format.replace(' ', '-');

		setInput(format);
	};

	const resetId = (e) => {
		e.preventDefault();

		setNewId(e.target.value);

		baseService
			.updateOne(id.id, { current_id: Number(e.target.value) })
			.then((base) => setId(base));
	};

	const submitId = (e) => {
		e.preventDefault();

		setId(Number(initialId));
		localStorage.setItem('ml-id', JSON.stringify(Number(initialId)));
	};

	const copy = (attack) => {
		navigator.clipboard.writeText(attack.name);
		const span = document.getElementById(attack.id).querySelector('span');

		span.classList.toggle('shown');

		setTimeout(() => {
			span.classList.toggle('shown');
		}, 2000);
	};

	const submit = (e) => {
		e.preventDefault();

		if (input === '') {
			return;
		}

		baseService
			.updateOne(id.id, { current_id: Number(id.current_id + 1) })
			.then((base) => {
				setId(base);
				setNewId(base.current_id);
			});

		const formattedId =
			id.current_id < 10 ? `0${id.current_id}` : id.current_id;

		const name = formattedId + prefix + input;

		attacksService.addOne({ name }).then((attack) => {
			setAttacks([attack, ...attacks]);
			copy(attack);

			setInput('');
		});
	};

	const toggleSettings = () => {
		const settings = document.querySelector('#settings');
		const container = document.querySelector('#container');

		settings.classList.toggle('panel--hidden');
		container.classList.toggle('panel--hidden');
	};

	const deleteAll = () => {
		attacks.forEach((attack) => attacksService.deleteOne(attack.id));
		setAttacks([]);
	};

	const settingsProps = {
		toggleSettings,
		paste,
		setPaste,
		spacesRpl,
		setSpacesRpl,
		newId,
		setNewId,
		resetId,
		prefix,
		setPrefix,
		hasLimit,
		setHasLimit,
		limit,
		setLimit,
	};

	const formProps = {
		submit,
		input,
		handleInputChange,
		handleMouseEnter,
		id,
		prefix,
	};

	return (
		<div className='App'>
			<div id='container' className='panel panel--hidden'>
				<section>
					<header className='panel__header'>
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
						<AttacksList
							copy={copy}
							attacks={hasLimit ? attacks.slice(0, limit) : attacks}
							deleteAll={deleteAll}
						/>
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
			{id !== null && <Settings {...settingsProps} />}
		</div>
	);
}

export default App;
