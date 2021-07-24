import React from 'react';
import settingsOff from '../icons/settings-off.svg';

const Settings = (props) => {
	const {
		paste,
		setPaste,
		spacesRpl,
		setSpacesRpl,
		newId,
		resetId,
		toggleSettings,
		prefix,
		setPrefix,
		hasLimit,
		setHasLimit,
		limit,
		setLimit,
	} = props;

	const handleSettingChange = (e) => {
		storeLocalSetting(e.target);
		showFormMessage(e.target.name === 'reset-id' ? 'globally' : 'locally');
	};

	const storeLocalSetting = (target) => {
		const localSettingName = `mlidgen-setting-${target.name}`;

		switch (target.name) {
			case 'reset-id':
				return localStorage.setItem(
					localSettingName,
					JSON.stringify(target.value)
				);
			case 'hover':
			case 'has-limit':
				return localStorage.setItem(localSettingName, target.checked);
			case 'limit':
			default:
				return localStorage.setItem(localSettingName, target.value);
		}
	};

	const showFormMessage = (settingState) => {
		const message = document.querySelector('.form-message');

		if (message.classList.contains('form-message--shown')) {
			return;
		}

		message.innerText = `Setting updated ${settingState} ✔︎`;
		message.classList.add('form-message--shown');

		setTimeout(() => {
			message.classList.remove('form-message--shown');
		}, 2000);
	};

	const formatAndSetPrefix = (e) => {
		const text = e.target.value;

		setPrefix(
			spacesRpl === 'dashes' ? text.replace(' ', '-') : text.replace(' ', '_')
		);
	};

	return (
		<div id='settings' className='panel panel--hidden'>
			<form onChange={handleSettingChange}>
				<header className='panel__header'>
					<h1>Settings</h1>
				</header>
				<div className='setting'>
					<label htmlFor='hover'>
						Paste from clipboard when hovering input
					</label>
					<input
						type='checkbox'
						name='hover'
						id='hover'
						checked={paste}
						onChange={(e) => setPaste(!paste)}
					/>
				</div>
				<div className='setting'>
					<label htmlFor='replace'>Replace spaces with</label>
					<select
						name='replace'
						id='replace'
						value={spacesRpl}
						onChange={(e) => setSpacesRpl(e.target.value)}
					>
						<option value='underscores'>underscores</option>
						<option value='dashes'>dashes</option>
					</select>
				</div>
				<div className='setting'>
					<label htmlFor='has-limit'>Limit displayed attacks</label>
					<input
						type='checkbox'
						name='has-limit'
						id='has-limit'
						checked={hasLimit}
						onChange={(e) => setHasLimit(!hasLimit)}
					/>
				</div>
				{hasLimit && (
					<div className='setting'>
						<label htmlFor='limit'>Number of attacks to show</label>
						<select
							name='limit'
							id='limit'
							value={limit}
							onChange={(e) => setLimit(e.target.value)}
						>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='20'>20</option>
						</select>
					</div>
				)}
				<div className='setting' id='reset-setting'>
					<label htmlFor='reset-id'>Reset current Id to</label>
					<input
						type='number'
						id='reset-id'
						name='reset-id'
						value={newId}
						onChange={resetId}
					/>
				</div>
				<div className='setting' id='prefix'>
					<label htmlFor='prefix'>Change prefix to</label>
					<input
						type='text'
						id='prefix'
						name='prefix'
						value={prefix}
						onChange={(e) => formatAndSetPrefix(e)}
					/>
				</div>
			</form>
			<div className='form-message'></div>
			<button
				type='button'
				className='settings-button'
				onClick={toggleSettings}
			>
				<img src={settingsOff} alt='settings' />
			</button>
		</div>
	);
};

export default Settings;
