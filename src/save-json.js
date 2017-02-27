const sort = require('sort-json');
const jsonfile = require('jsonfile');
const mkdirp = require('mkdirp');

module.exports = (path, filename, obj) => new Promise((resolve, reject) => {
	obj = sort(obj);
	mkdirp(path, (err) => {
		if(err) console.log(err);
		jsonfile.writeFile(require('path').resolve(path, filename), obj, { spaces: 2 }, (err) => {
			if(err)
				return reject(err);
			resolve();
		});
	});
});
