
const path = require('path');

const {app} = require('electron');

class Provider {
	constructor() {
	}
}

class CoreAndUserPartsProvider extends CombineProvider {
	constructor() {
		const corePartsDir = path.join(app.getPath('exe'), 'parts');
		const userPartsDir = path.join(app.getPath('userData'), 'parts');

		const corePartsProvider = new PartsDirProvider(corePartsDir);
		const userPartsProvider = new PartsDirProvider(userPartsDir);

		super([
			corePartsProvider,
			userPartsProvider
		]);
	}
}

module.exports = CoreAndUserProvider;
