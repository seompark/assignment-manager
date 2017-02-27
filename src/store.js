const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const saveJSON = require('./save-json');
const config = require('../config');
const User = require('./user');

let instance;

class Store {
	constructor() {
		this.data = {};
		this.cache = {
			1: {},
			2: {},
			3: {}
		};
		this.isChanged = false;
		this.listToBeSaved = {
			1: new Set(),
			2: new Set(),
			3: new Set()
		};
		this.sPath = path.resolve(__dirname, '..', config.dataFolder, 'user');
		if(!instance) {
			instance = this;
			process.on('exit', this.saveAll);
			setInterval(() => {
				this.saveAll();
			}, 1000);
		}
		this.loadAll();
	}

	loadAll() {
		fs.readdirSync(path.resolve(this.sPath))
			.forEach((i) => fs.readdirSync(path.join(this.sPath, '' + i))
				.forEach((v) => this.load(i, v.replace('.json', '').replace('반', ''))));
	}

	load(grade, clazz) {
		let data = jsonfile.readFileSync(path.join(__dirname, '..', config.dataFolder, 'user', grade, clazz + '반.json'));
		Object.keys(data).forEach((v) => {
			let user = new User('' + grade + clazz + v, data[v]['비밀번호'], data[v]['이름']);
			this.data[user.getFullId()] = user;
		});
	}

	set(key, value) {
		if(!(key && value))
			return false;
		this.isChanged = true;
		this.data[key] = value;
		this.listToBeSaved[value.getGrade()].add(value.getClass());
	}

	get(key, defaultv) {
		return this.data[key] || defaultv;
	}

	/**
	 * @description User Objct를 분류하여 반환합니다. 아래는 구조
	 * 
	 * {
	 *  	1: { // 1학년
	 * 			1: { // 1반
	 * 				1: { // 1번
	 * 					"이름": 이름,
	 * 					"비밀번호": 비밀번호,
	 * 				}
	 * 				2: { ... },
	 * 				3: { ... },
	 * 				...
	 * 			},
	 * 			2: { ... },
	 * 			3: { ... },
	 * 			...
	 * 		},
	 * 		2: { ... },
	 * 		3: { ... }
	 * }
	 */
	getCategorizedData() {
		return !this.isChanged ? this.cache : this.categorize();
	}

	categorize() {
		let categorizedData = {
			1: {},
			2: {},
			3: {}
		};
		Object.keys(this.data).forEach((v) => {
			let user = this.data[v];
			if(!categorizedData[user.getGrade()][user.getClass()])
				categorizedData[user.getGrade()][user.getClass()] = {};
			categorizedData[user.getGrade()][user.getClass()][user.getNumber()] = user.getData();
		});
		this.isChanged = false;
		return this.cache = categorizedData;
	}

	saveAll() {
		Object.keys(this.listToBeSaved).forEach((v) => this.listToBeSaved[v].forEach((c) => {
			this.save(v, c);
		}));
	}

	save(grade, clazz) {
		return new Promise((resolve, reject) => {
			let data = this.getCategorizedData()[grade][clazz];
			saveJSON(path.join(this.sPath, grade), '' + clazz + '반.json', data)
				.then(() => resolve())
				.then(() => this.listToBeSaved[grade].delete(clazz))
				.catch((err) => reject(err));
		});
	}

	static getInstance() {
		return instance || new Store();
	}
}

module.exports = Store;
