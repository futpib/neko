
const {Lab} = require('./lab');

function main() {
	const lab = new Lab();
	const Neko = lab.make();
	const neko = new Neko();
	neko.launch();
}

main();
