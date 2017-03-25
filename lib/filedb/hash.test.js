
const test = require('ava');

const fs = require('fs-promise');
const mzfs = require('mz/fs');

test.beforeEach(async t => {
	const tmp = await mzfs.mkdtemp('filedb-test-');
	t.context.tmp = tmp;

	const {HashFileDb} = require('./hash');
	t.context.db = new HashFileDb(tmp);
});

test.afterEach.always(async t => {
	const {tmp} = t.context;
	await fs.remove(tmp);
});

test('stable against key order', async t => {
	const {db} = t.context;

	const id1 = await db.dump({foo: 'bar', top: 'kek'});
	const id2 = await db.dump({top: 'kek', foo: 'bar'});

	t.is(id1, id2);
});

test('throws on not found id', async t => {
	const {db} = t.context;

	t.throws(db.load('topkek'), Error);
});
