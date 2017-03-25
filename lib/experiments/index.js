
const path = require('path');

const {app} = require('electron');

const {AutoincrementFileDb} = require('../filedb');

class Experiments {
	constructor() {
		const userData = app.getPath('userData');
		this._db = new AutoincrementFileDb(path.join(userData, 'experiments'));
	}

	getSuccessfulBlueprints() {

	}
}
