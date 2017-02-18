const sort = require('sort-json');
const jsonfile = require('jsonfile');

const pending = {};
const busy = {};

module.exports = (path, obj) => new Promise((resolve, reject) => {
	busy[path] = obj;
	obj = sort(obj);
	jsonfile.writeFile(path, { spaces: 2 }, (err) => {
		if(err)
			return reject(err);
		delete busy[obj];
		resolve();
	});
});
