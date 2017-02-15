const sort = require('sort-json');
const jsonfile = require('jsonfile');

module.exports = (clazz, obj) => new Promise((resolve, reject) => {
	obj = sort(obj);
	jsonfile.writeFile(__dirname + `/database/users/${clazz}.json`, obj, { spaces: 2 }, (err) => {
		if(err)
			return reject(err);
		resolve();
	});
});
