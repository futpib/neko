
const path = require('path');
const fs = require('fs-promise');
const yaml = require('js-yaml');

class FileDb {
	constructor(dir) {
		this._dir = path.normalize(dir);
	}

	async dump(js) {
		await this._initOnce();

		const str = yaml.dump(js, {
			sortKeys: true
		});

		const id = await this._getNextIdFor(str);
		const filename = this._getFilenameForId(id);

		await fs.writeFile(filename, str, {encoding: 'utf8'});
		return id;
	}

	async load(id) {
		await this._initOnce();

		const filename = this._getFilenameForId(id);

		const str = await fs.readFile(filename, {encoding: 'utf8'});
		return yaml.load(str);
	}

	_initOnce() {
		if (!this._initPromise) {
			this._initPromise = this._init();
		}
		return this._initPromise;
	}

	_init() {
		return fs.ensureDir(this._dir);
	}

	_getFilenameForId(id) {
		return path.join(this._dir, `${id}.yaml`);
	}

	_getNextIdFor(str) {
		throw new Error('Not implemented');
	}
}

module.exports = {FileDb};
