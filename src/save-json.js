const sort = require('sort-json');
const jsonfile = require('jsonfile');

module.exports = (path, obj) => new Promise((resolve, reject) => {
	obj = sort(obj);
	jsonfile.writeFile(path, { spaces: 2 }, (err) => {
		if(err)
			return reject(err);
		resolve();
	});
});
