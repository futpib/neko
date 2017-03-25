
const crypto = require('crypto');

const {FileDb} = require('./abstract.js');

class HashFileDb extends FileDb {
	_getNextIdFor(str) {
		const hash = crypto.createHash('sha512');
		hash.update(str);
		return hash.digest('hex');
	}
}

module.exports = {HashFileDb};
