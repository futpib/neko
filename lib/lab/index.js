
const {Experiments} = require('../experiments');
const {Blueprints} = require('../blueprints');

class Lab {
	constructor() {
		this._experiments = new Experiments();
		this._blueprints = new Blueprints();
	}

	make() {
		const blueprints = this._getBlueprintsToTry();
		for (const blueprint of blueprints) {
			try {
				return this._performExperiment(blueprint);
			} catch (e) {
				continue;
			}
		}
		throw new Error('Nothing worked');
	}

	* _getBlueprintsToTry() {
		yield * this._blueprints.getFavourites();

		const favourites = new Set(this._blueprints.getFavourites());

		const successfulBlueprints = this._experiments.getSuccessfulBlueprints();

		for (const successful of successfulBlueprints) {
			if (!favourites.has(successful)) {
				yield successful;
			}
		}
	}

	_performExperiment(blueprint) {
		const experiment = this._experiments.create(blueprint);
		return experiment.perform();
	}
}

module.exports = {Lab};
