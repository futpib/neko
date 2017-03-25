
const fs = require('fs-promise');

const {FileDb} = require('./abstract.js');

class AutoincrementFileDb extends FileDb {
	async _getNextIdFor() {
		const filenames = await fs.readdir(this._dir);
		const filenamesNoExt = filenames.map(s => s.split('.')[0]);
		const numbers = filenamesNoExt.map(Number);
		const [max] = numbers.sort((a, b) => b - a);
		return String(Number.isInteger(max) ? (max + 1) : 0);
	}
}

module.exports = {AutoincrementFileDb};
