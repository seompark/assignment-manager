let instance;

class Store {
	constructor(obj = {}) {
		this.data = obj;
		instance = instance || this;
	}

	save() {
		return false;
	}

	set(key, value) {
		if(!(key && value))
			return false;
		return !!(this.data[key] = value);
	}

	get(key, defaultv) {
		return this.data[key] || defaultv;
	}

	static getInstance() {
		return instance || new Store();
	}
}

module.exports = Store;
