import React, { Component } from 'react';
import DataContainer from '../DataContainer/DataContainer';
import './AdminPanel.css';
import PropTypes from 'prop-types';

export default class AdminPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			worldSelected: null,
			createNewWorldOn: false,
			heroSelected: null,
			createNewHeroOn: false,
			worldDatabaseResponse: null,
			heroDatabaseResponse: null,
		};
	}

	addInstance = async (type, obejctToAdd) => {
		const response = await this.props.addInstance(type, obejctToAdd);
		if (type === 'world') {
			const worldDatabaseResponse = response;
			this.setState({ createNewWorldOn: false, worldDatabaseResponse });
		} else if (type === 'hero') {
			const heroDatabaseResponse = response;
			this.setState({ createNewHeroOn: false, heroDatabaseResponse });
		}
	};

	updateInstance = async (type, updatedObjectData) => {
		if (type === 'world') {
			const updatedInstance = {
				...updatedObjectData,
				id: this.state.worldSelected.id,
			};
			const response = await this.props.updateInstance(type, updatedInstance);
			this.setState({ worldSelected: null, worldDatabaseResponse: response });
		} else if (type === 'hero') {
			const updatedInstance = {
				...updatedObjectData,
				id: this.state.heroSelected.id,
			};
			const response = await this.props.updateInstance(type, updatedInstance);
			this.setState({ heroSelected: null, heroDatabaseResponse: response });
		}
	};

	deleteInstance = async (type) => {
		if (type === 'world') {
			const worldDatabaseResponse = await this.props.deleteInstance(
				type,
				this.state.worldSelected
			);
			this.setState({ worldSelected: null, worldDatabaseResponse });
		} else if (type === 'hero') {
			const heroDatabaseResponse = await this.props.deleteInstance(
				type,
				this.state.heroSelected
			);
			this.setState({ heroSelected: null, heroDatabaseResponse });
		}
	};

	selectWorld = (world) =>
		this.setState({
			worldSelected: world,
			worldDatabaseResponse: null,
			createNewWorldOn: false,
		});

	worldCreatorOpenClose = () =>
		this.setState({
			worldSelected: null,
			worldDatabaseResponse: null,
			createNewWorldOn: !this.state.createNewWorldOn,
		});

	selectHero = (hero) =>
		this.setState({
			heroSelected: hero,
			heroDatabaseResponse: null,
			createNewHeroOn: false,
		});

	heroCreatorOpenClose = () =>
		this.setState({
			createNewHeroOn: !this.state.createNewHeroOn,
			heroSelected: null,
			heroDatabaseResponse: null,
		});

	render() {
		return (
			<div className="admin-panel">
				<header>
					<h1>Manage HA's Database</h1>
					<button onClick={this.props.startGame}>Start game</button>
				</header>
				<DataContainer
					selectWorld={this.selectWorld}
					isCreateWorldOn={this.state.createNewWorldOn}
					worldCreatorOpenClose={this.worldCreatorOpenClose}
					selectedWorld={this.state.worldSelected}
					worldResponse={this.state.worldDatabaseResponse}
					worlds={this.props.worlds}
					addInstance={this.addInstance}
					updateInstance={this.updateInstance}
					deleteInstance={this.deleteInstance}
				/>
				<DataContainer
					selectHero={this.selectHero}
					isCreateHeroOn={this.state.createNewHeroOn}
					heroCreatorOpenClose={this.heroCreatorOpenClose}
					selectedHero={this.state.heroSelected}
					heroResponse={this.state.heroDatabaseResponse}
					heroes={this.props.heroes}
					worldsList={this.props.worlds}
					addInstance={this.addInstance}
					updateInstance={this.updateInstance}
					deleteInstance={this.deleteInstance}
				/>
			</div>
		);
	}
}

AdminPanel.propTypes = {
	addInstance: PropTypes.func.isRequired,
	updateInstance: PropTypes.func.isRequired,
	deleteInstance: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
	worlds: PropTypes.array.isRequired,
};